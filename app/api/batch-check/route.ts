import { NextRequest, NextResponse } from 'next/server';

// Cache for disposable domains with 24-hour expiration
let domainsSet: Set<string> | null = null;
let cacheExpiry: number | null = null;
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

async function getDomainsSet(): Promise<Set<string>> {
  const now = Date.now();
  
  // Return cached set if still valid
  if (domainsSet && cacheExpiry && now < cacheExpiry) {
    return domainsSet;
  }

  try {
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
    // Return empty set as fallback - at least basic validation will work
    return new Set();
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { emails } = body;

    if (!emails || !Array.isArray(emails)) {
      return NextResponse.json(
        { error: 'Missing or invalid emails array' },
        { status: 400 }
      );
    }

    if (emails.length > 1000) {
      return NextResponse.json(
        { error: 'Maximum 1000 emails per batch' },
        { status: 400 }
      );
    }

    // Check if email format looks system-generated or suspicious
    function checkEmailFormat(email: string): {
      isSuspicious: boolean;
      reasons: string[];
      score: number;
    } {
      const localPart = email.split('@')[0].toLowerCase();
      const reasons: string[] = [];
      let score = 0;

      // Check for common test/system accounts
      const testPatterns = [
        /^test/, /^admin/, /^noreply/, /^no-reply/, /^info/, 
        /^support/, /^help/, /^contact/, /^webmaster/, /^postmaster/,
        /^system/, /^auto/, /^bot/, /^mail/, /^notification/
      ];
      
      if (testPatterns.some(p => p.test(localPart))) {
        reasons.push('System/test account pattern detected');
        score += 2;
      }

      // Check for random string patterns (high entropy - unusual ratio of numbers/special chars)
      const digitCount = (localPart.match(/\d/g) || []).length;
      const totalLength = localPart.length;
      const digitRatio = digitCount / totalLength;

      if (digitRatio > 0.5) {
        reasons.push('Unusually high number ratio (system-generated pattern)');
        score += 2;
      }

      // Check for gibberish patterns (long random string with numbers and letters mixed)
      if (totalLength > 15 && /[a-z]{3,}[0-9]{2,}[a-z]{2,}|[a-z0-9]{12,}/.test(localPart)) {
        reasons.push('Random gibberish pattern detected');
        score += 1;
      }

      // Check for excessive use of numbers (looks automated)
      if (digitRatio > 0.4 && digitCount >= 3) {
        reasons.push('Multiple numbers suggest auto-generated format');
        score += 1;
      }

      // Check for consecutive numbers (often in generated emails)
      if (/\d{3,}/.test(localPart)) {
        reasons.push('Long consecutive number sequence detected');
        score += 2; // Increased weight for this pattern
      }

      // Check for repeating characters
      if (/(.)\1{3,}/.test(localPart)) {
        reasons.push('Repeating character pattern (unusual)');
        score += 2; // Increased weight
      }

      // Check email entropy - too random can indicate generation
      if (/^[a-z0-9]{10,}$/.test(localPart) && /[0-9]/.test(localPart)) {
        reasons.push('High entropy random string pattern');
        score += 2; // Increased weight
      }

      // Check for masked/random ID patterns (e.g., mask.xxxxx or user.xxxxx with hex)
      if (/^[a-z]+\.[a-z0-9-]{8,}$|^[a-z]+\d{5,}/.test(localPart)) {
        reasons.push('Masked identifier pattern (system-generated)');
        score += 2;
      }

      return {
        isSuspicious: score >= 2,
        reasons: [...new Set(reasons)], // Remove duplicates
        score
      };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const domainsSet = await getDomainsSet();

    const results = emails.map((email: string) => {
      const trimmedEmail = email.trim().toLowerCase();

      if (!emailRegex.test(trimmedEmail)) {
        return {
          email: trimmedEmail,
          valid: false,
          error: 'Invalid email format',
        };
      }

      const domain = trimmedEmail.split('@')[1];
      const isDisposable = domainsSet.has(domain);
      const formatCheck = checkEmailFormat(trimmedEmail);

      // Generate verdict
      const isReal = !isDisposable && !formatCheck.isSuspicious;
      const verdictReasons: string[] = [];

      if (isDisposable) {
        verdictReasons.push('Domain is a known disposable/temporary email service');
      }
      if (formatCheck.isSuspicious) {
        verdictReasons.push('Email format appears system-generated or masked');
      }

      return {
        email: trimmedEmail,
        valid: true,
        domain,
        disposable: isDisposable,
        format: {
          isSuspicious: formatCheck.isSuspicious,
          reasons: formatCheck.reasons,
          suspicionScore: formatCheck.score,
        },
        verdict: {
          isReal,
          text: isReal ? 'Real' : 'Not Real',
          reasons: verdictReasons,
        },
        risk: isDisposable || formatCheck.isSuspicious ? 'high' : 'low',
      };
    });

    return NextResponse.json(
      {
        results,
        total: results.length,
        disposable_count: results.filter((r) => r.disposable).length,
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error checking emails:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
