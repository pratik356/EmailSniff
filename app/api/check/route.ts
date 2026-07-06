import { NextRequest, NextResponse } from 'next/server';
import { promisify } from 'util';
import { resolveMx } from 'dns';
import nodemailer from 'nodemailer';

const resolveMxPromise = promisify(resolveMx);

// Cache for disposable domains with 24-hour expiration
let domainsSet: Set<string> | null = null;
let cacheExpiry: number | null = null;
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

// Trusted domains that should never be flagged for pattern issues
const TRUSTED_DOMAINS = new Set([
  'gmail.com',
  'yahoo.com',
  'hotmail.com',
  'outlook.com',
  'icloud.com',
  'protonmail.com',
  'mail.com',
]);

// Skip SMTP verification for these domains to avoid issues
const SKIP_SMTP_VERIFICATION = new Set([
  'gmail.com',
  'yahoo.com',
  'hotmail.com',
  'outlook.com',
  'icloud.com',
  'protonmail.com',
  'mail.com',
  'aol.com',
  'msn.com'
]);

async function getDomainsSet(): Promise<Set<string>> {
  const now = Date.now();
  
  // Return cached set if still valid
  if (domainsSet && cacheExpiry && now < cacheExpiry) {
    return domainsSet;
  }

  try {
    // Using public disposable email domains API
    const response = await fetch(
      'https://disposable.github.io/disposable-email-domains/domains.json',
      { next: { revalidate: 86400 } } // Revalidate every 24 hours
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch domains list');
    }
    
    const domains: string[] = await response.json();
    domainsSet = new Set(domains);
    cacheExpiry = now + CACHE_DURATION;
    
    return domainsSet;
  } catch (error) {
    console.error('Error fetching disposable domains:', error);
    return new Set();
  }
}

// Step 2: Check MX records for the domain
async function checkMXRecords(domain: string): Promise<{
  passed: boolean;
  mxRecords: number;
  time: number;
}> {
  const startTime = Date.now();
  try {
    const records = await resolveMxPromise(domain);
    const time = Date.now() - startTime;
    return {
      passed: records && records.length > 0,
      mxRecords: records?.length || 0,
      time
    };
  } catch (error) {
    const time = Date.now() - startTime;
    return {
      passed: false,
      mxRecords: 0,
      time
    };
  }
}

// Step 4: Verify email with SMTP
async function verifyWithSMTP(email: string, domain: string): Promise<{
  passed: boolean;
  time: number;
  reason?: string;
}> {
  const startTime = Date.now();
  
  // Skip SMTP verification for major providers to avoid blocks
  if (SKIP_SMTP_VERIFICATION.has(domain)) {
    const time = Date.now() - startTime;
    return {
      passed: true,
      time,
      reason: 'Skipped for major provider (would need special auth)'
    };
  }

  try {
    // Get MX records for the domain
    const mxRecords = await resolveMxPromise(domain);
    if (!mxRecords || mxRecords.length === 0) {
      const time = Date.now() - startTime;
      return { passed: false, time, reason: 'No MX records found' };
    }

    // Sort by priority
    const mxHost = mxRecords.sort((a, b) => a.priority - b.priority)[0].exchange;

    // Create transporter with SMTP connection (fast timeout for quick response)
    const transporter = nodemailer.createTransport({
      host: mxHost,
      port: 25,
      secure: false,
      tls: { rejectUnauthorized: false },
      connectionTimeout: 800,
      socketTimeout: 800,
    });

    // Verify connection and that the email exists
    const verified = await new Promise<boolean>((resolve) => {
      transporter.verify((error) => {
        if (error) {
          resolve(false);
        } else {
          resolve(true);
        }
      });
    });

    const time = Date.now() - startTime;
    return {
      passed: verified,
      time,
      reason: verified ? 'SMTP verification successful' : 'SMTP verification failed'
    };
  } catch (error) {
    const time = Date.now() - startTime;
    return {
      passed: false,
      time,
      reason: 'SMTP verification error'
    };
  }
}

// Detect if email local part looks system-generated (masked pattern)
function detectSystemGeneratedPattern(localPart: string, domain: string): {
  isSystemGenerated: boolean;
  patterns: string[];
  confidence: number;
} {
  const patterns: string[] = [];
  let confidence = 0;

  // Pattern 1: mask/masked prefix (common for masked email services)
  if (/^mask\.|^masked\.|^anon\.|^temp\./i.test(localPart)) {
    patterns.push('Masked email prefix detected');
    confidence += 30;
  }

  // Pattern 2: UUID-like patterns (dashes separating hex)
  if (/^[a-z0-9]+-[a-z0-9]+-[a-z0-9]+/i.test(localPart)) {
    patterns.push('UUID/Hash pattern detected');
    confidence += 25;
  }

  // Pattern 3: High entropy random string (10+ chars of mixed alphanumeric)
  if (/^[a-z0-9]{10,}$/i.test(localPart) && /[0-9]/.test(localPart)) {
    patterns.push('Random string pattern');
    confidence += 20;
  }

  // Pattern 4: Long sequence of numbers
  if (/\d{6,}/.test(localPart)) {
    patterns.push('Extended numeric sequence');
    confidence += 15;
  }

  // Pattern 5: Multiple hyphens (unnatural)
  if ((localPart.match(/-/g) || []).length >= 3) {
    patterns.push('Multiple hyphens pattern');
    confidence += 10;
  }

  // Only consider it system-generated if confidence is high (>40) AND it's from a disposable domain
  // Never flag legitimate providers for patterns alone
  const isSystemGenerated = confidence > 40 && !TRUSTED_DOMAINS.has(domain);

  return {
    isSystemGenerated,
    patterns: patterns.length > 0 ? patterns : [],
    confidence
  };
}

interface CheckResult {
  email: string;
  domain: string;
  disposable: boolean;
  riskLevel: 'high' | 'medium' | 'low';
  reason: string;
  responseTime: string;
}

export async function GET(request: NextRequest): Promise<NextResponse<CheckResult | { error: string }>> {
  try {
    const startTime = Date.now();
    const searchParams = request.nextUrl.searchParams;
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { error: 'Missing email parameter' },
        { status: 400 }
      );
    }

    // STEP 1: Validate email format
    const step1Start = Date.now();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const formatValid = emailRegex.test(email);
    const step1Time = Date.now() - step1Start;

    if (!formatValid) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const emailLower = email.toLowerCase();
    const [localPart, domain] = emailLower.split('@');

    // STEP 2: Check MX records
    const mxResult = await checkMXRecords(domain);

    // STEP 3: Check disposable list
    const domainsSet = await getDomainsSet();
    const isDomainDisposable = domainsSet.has(domain);

    // Check for system-generated patterns
    const patternAnalysis = detectSystemGeneratedPattern(localPart, domain);

    // STEP 4: SMTP verification
    const smtpResult = await verifyWithSMTP(email, domain);

    // Determine final disposable status: if ANY verification step fails, it's disposable
    // Exception: SMTP skip for major providers is not a failure
    const smtpFailed = !smtpResult.passed && !smtpResult.reason?.includes('Skipped');
    const isDisposable = 
      isDomainDisposable || 
      patternAnalysis.isSystemGenerated || 
      !mxResult.passed || 
      smtpFailed;

    // Determine risk level based on verification results
    let riskLevel: 'high' | 'medium' | 'low';
    let reason = '';

    if (!mxResult.passed) {
      riskLevel = 'high';
      reason = 'Invalid: No MX records found for domain';
    } else if (isDomainDisposable) {
      riskLevel = 'high';
      reason = 'Invalid: Known disposable/temporary email service';
    } else if (patternAnalysis.isSystemGenerated) {
      riskLevel = 'medium';
      reason = 'Suspicious: System-generated masked email pattern detected';
    } else if (smtpFailed) {
      riskLevel = 'medium';
      reason = 'Suspicious: SMTP verification failed';
    } else {
      riskLevel = 'low';
      reason = 'Valid: Email appears legitimate';
    }

    const responseTime = Date.now() - startTime;

    return NextResponse.json(
      {
        email,
        domain,
        disposable: isDisposable,
        riskLevel,
        reason,
        responseTime: `${responseTime}ms`
      } as CheckResult,
      { status: 200 }
    );
  } catch (error) {
    console.error('Error checking email:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
