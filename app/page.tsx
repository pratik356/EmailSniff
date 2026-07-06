'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  CheckCircle2, 
  XCircle, 
  Zap, 
  Shield, 
  Copy, 
  Check, 
  AlertCircle, 
  Search, 
  ArrowRight, 
  Terminal as TerminalIcon, 
  Loader2, 
  RefreshCw, 
  ExternalLink, 
  Globe, 
  Database,
  Mail,
  Lock,
  Code
} from 'lucide-react';

export default function Home() {
  const [email, setEmail] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [baseUrl, setBaseUrl] = useState('');
  const [copied, setCopied] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // Redesign states
  const [apiTab, setApiTab] = useState<'curl' | 'js' | 'python'>('curl');
  const [animationStep, setAnimationStep] = useState<'idle' | 'checking' | 'completed'>('idle');
  const [resultTab, setResultTab] = useState<'summary' | 'json'>('summary');
  const [checkingProgress, setCheckingProgress] = useState<{
    format: 'pending' | 'active' | 'success' | 'fail';
    mx: 'pending' | 'active' | 'success' | 'fail';
    disposable: 'pending' | 'active' | 'success' | 'fail';
    smtp: 'pending' | 'active' | 'success' | 'fail';
  }>({
    format: 'pending',
    mx: 'pending',
    disposable: 'pending',
    smtp: 'pending',
  });

  useEffect(() => {
    setBaseUrl(window.location.origin);
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getFunnyReason = (reason: string, checkedEmail: string) => {
    const rLower = reason.toLowerCase();
    const eLower = checkedEmail.toLowerCase();
    if (eLower.includes('skibidi')) return 'Caught lacking. Straight to jail, do not pass go, do not collect $200.';
    if (eLower.includes('impostor')) return 'Suspicious behavior detected. Voted out of the database.';
    if (rLower.includes('disposable')) return 'WTF is this temp mail? 100% disposable. Banned from the database vibes.';
    if (rLower.includes('no mx') || rLower.includes('dns')) return 'Domain has no MX records. Dead on arrival fr.';
    if (rLower.includes('invalid syntax') || rLower.includes('format')) return 'Goofy format. RFC 5322 is crying.';
    return reason;
  };

  const performCheck = async (targetEmail: string) => {
    if (!targetEmail) return;
    setEmail(targetEmail);
    setLoading(true);
    setResult(null);
    setAnimationStep('checking');
    setResultTab('summary');
    setCheckingProgress({
      format: 'active',
      mx: 'pending',
      disposable: 'pending',
      smtp: 'pending',
    });

    try {
      const response = await fetch(`/api/check?email=${encodeURIComponent(targetEmail)}`);
      const data = await response.json();
      
      // Step 1: Format check animation (short delay)
      await new Promise((resolve) => setTimeout(resolve, 500));
      setCheckingProgress(prev => ({ ...prev, format: 'success', mx: 'active' }));
      
      // Step 2: MX Record check animation
      await new Promise((resolve) => setTimeout(resolve, 600));
      const hasMxIssue = data.reason?.toLowerCase().includes('mx') || data.reason?.toLowerCase().includes('no mx');
      const mxStatus = hasMxIssue ? 'fail' : 'success';
      setCheckingProgress(prev => ({ ...prev, mx: mxStatus, disposable: 'active' }));
      
      // Step 3: Disposable detection animation
      await new Promise((resolve) => setTimeout(resolve, 500));
      const dispStatus = data.disposable ? 'fail' : 'success';
      setCheckingProgress(prev => ({ ...prev, disposable: dispStatus, smtp: 'active' }));
      
      // Step 4: SMTP validation animation
      await new Promise((resolve) => setTimeout(resolve, 600));
      const isHighRisk = data.riskLevel === 'high';
      const smtpStatus = isHighRisk ? 'fail' : 'success';
      setCheckingProgress(prev => ({ ...prev, smtp: smtpStatus }));
      
      // Final reveal
      await new Promise((resolve) => setTimeout(resolve, 400));
      setResult(data);
      setAnimationStep('completed');
    } catch (err) {
      console.error('Error:', err);
      setAnimationStep('idle');
    } finally {
      setLoading(false);
    }
  };

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    performCheck(email);
  };

  const handleReset = () => {
    setEmail('');
    setResult(null);
    setAnimationStep('idle');
    setCheckingProgress({
      format: 'pending',
      mx: 'pending',
      disposable: 'pending',
      smtp: 'pending',
    });
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const getCodeSnippet = () => {
    const formattedUrl = baseUrl || 'https://emailsniff.com';
    switch (apiTab) {
      case 'curl':
        return `curl -X GET "${formattedUrl}/api/check?email=user@mailinator.com"`;
      case 'js':
        return `fetch("${formattedUrl}/api/check?email=user@mailinator.com")\n  .then(res => res.json())\n  .then(data => console.log(data));`;
      case 'python':
        return `import requests\n\nresponse = requests.get(\n    "${formattedUrl}/api/check",\n    params={"email": "user@mailinator.com"}\n)\ndata = response.json()\nprint(data)`;
      default:
        return '';
    }
  };

  return (
    <main className="relative min-h-screen bg-white text-neutral-900 font-sans antialiased overflow-hidden z-0">
      
      {/* Moving Glass Background Orbs */}
      <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-[-1]">
        <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-blue-400/30 blur-[120px] mix-blend-multiply animate-blob" />
        <div className="absolute top-[20%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-sky-300/30 blur-[120px] mix-blend-multiply animate-blob animation-delay-2000" />
        <div className="absolute bottom-[-20%] left-[20%] w-[70vw] h-[70vw] rounded-full bg-indigo-200/30 blur-[120px] mix-blend-multiply animate-blob animation-delay-4000" />
      </div>

      {/* Nav */}
      <nav 
        className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isScrolled 
            ? 'top-4 w-[85vw] max-w-4xl' 
            : 'top-6 w-[85vw] max-w-[85vw]'
        }`}
      >
        <div className="bg-white/40 backdrop-blur-xl border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-full px-6 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-neutral-900 to-neutral-400 flex items-center justify-center overflow-hidden shadow-sm">
              <Image src="/logo.png" alt="EmailSniff Logo" width={36} height={36} className="w-full h-full object-cover" />
            </div>
            <span className="text-[17px] font-bold tracking-tight text-neutral-900">EmailSniff</span>
          </Link>
          <div className="flex items-center gap-6 text-sm">
            <Link href="/docs" className="text-neutral-600 hover:text-neutral-900 transition-colors font-medium">
              Docs
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero — text left, terminal right on desktop */}
      <section className="w-full px-6 md:px-12 lg:px-20 mx-auto pt-32 pb-10 md:pt-40 md:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left — copy */}
          <div>
            <p className="text-[13px] font-mono text-neutral-400 mb-4">100% Free · No Sign Up · No Cap</p>
            <h1 className="text-[2.5rem] md:text-5xl font-extrabold leading-[1.1] tracking-tight text-neutral-900">
              Banish fake emails.<br />Keep database vibes clean.
            </h1>
            <p className="mt-5 text-neutral-500 text-[15px] leading-relaxed max-w-sm">
              Real-time disposable email checker & validation API. Detect trash addresses in under 15ms. fr.
            </p>
            <div className="mt-8 flex items-center gap-3 flex-wrap">
              <Link
                href="/docs"
                className="bg-neutral-900 hover:bg-neutral-800 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors inline-flex items-center gap-1.5 shadow-sm"
              >
                Docs (It's free fr) <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right — terminal */}
          <div className="w-full">
            <div className="relative bg-transparent backdrop-blur-[40px] rounded-xl border border-white/50 shadow-[0_20px_50px_rgba(0,0,0,0.12)] overflow-hidden group transition-all duration-500 hover:shadow-[0_30px_60px_rgba(0,0,0,0.2)] hover:border-white/80">
              
              {/* Interactive glow overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              {/* Terminal chrome */}
              <div className="bg-transparent px-4 py-2.5 border-b border-white/40 flex items-center justify-between relative z-10">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                </div>
                <span className="text-[11px] font-mono text-neutral-500">email-verify.sh</span>
                <div className="w-12" />
              </div>

              {/* Terminal body */}
              <div className="p-5 sm:p-6 min-h-[340px] flex flex-col justify-between text-neutral-900">
                
                {/* IDLE STATE */}
                {animationStep === 'idle' && (
                  <div className="flex-1 flex flex-col justify-center animate-fade-in">
                    <div className="text-center mb-6 flex flex-col items-center justify-center">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-100/60 text-blue-600 text-[10px] font-mono font-bold uppercase tracking-widest mb-2.5 w-max">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-500"></span>
                        </span>
                        SANDBOX_LIVE
                      </div>
                      <h3 className="text-base font-extrabold text-neutral-900 tracking-tight">Interactive Email Verifier</h3>
                      <p className="text-xs text-neutral-500 mt-1 max-w-[220px] leading-relaxed">
                        Input an address to test verification pipelines instantly
                      </p>
                    </div>

                    <form onSubmit={handleCheck} className="space-y-3 max-w-sm mx-auto w-full">
                      <div className="relative">
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="user@example.com"
                          className="w-full pl-9 pr-4 py-2.5 bg-white/50 rounded-lg border border-white/60 text-neutral-900 placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm font-mono shadow-sm"
                        />
                        <Search className="absolute left-3 top-2.5 w-4 h-4 text-neutral-500" />
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition-colors text-sm disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
                      >
                        Verify
                      </button>
                    </form>

                    <div className="mt-4 flex flex-wrap gap-1.5 justify-center">
                      <span className="text-[10px] text-neutral-400 font-mono self-center mr-1">Quick check:</span>
                      {[
                        { email: 'chad@gmail.com', label: 'chad (safe)' },
                        { email: 'impostor@temp-mail.org', label: 'sus (temp)' },
                        { email: 'skibidi@mailinator.com', label: 'trash (junk)' }
                      ].map(chip => (
                        <button
                          key={chip.email}
                          type="button"
                          onClick={() => performCheck(chip.email)}
                          className="text-[10px] font-mono bg-white/40 border border-white/60 text-neutral-700 hover:bg-white/70 px-2 py-0.5 rounded transition-all hover:border-blue-300 active:scale-95"
                        >
                          {chip.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* CHECKING STATE */}
                {animationStep === 'checking' && (
                  <div className="flex-1 flex flex-col justify-center animate-fade-in font-mono text-[13px]">
                    <div className="bg-white/30 text-neutral-900 rounded-lg p-4 border border-white/50 shadow-sm flex-1 flex flex-col justify-between min-h-[240px]">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 text-neutral-500 border-b border-white/40 pb-1.5 mb-1.5">
                          <TerminalIcon className="w-3.5 h-3.5 text-neutral-500 animate-pulse" />
                          <span className="text-[11px]">emailsniff v1.0</span>
                        </div>
                        <div className="text-blue-600 font-semibold">
                          $ check {email}
                        </div>

                        {checkingProgress.format !== 'pending' && (
                          <div className="flex items-center gap-2">
                            {checkingProgress.format === 'active' ? (
                              <><Loader2 className="w-3 h-3 text-neutral-500 animate-spin" /><span className="text-neutral-500">syntax...</span></>
                            ) : (
                              <><span className="text-emerald-400">✓</span><span>format ok</span></>
                            )}
                          </div>
                        )}

                        {checkingProgress.mx !== 'pending' && (
                          <div className="flex items-center gap-2">
                            {checkingProgress.mx === 'active' ? (
                              <><Loader2 className="w-3 h-3 text-neutral-500 animate-spin" /><span className="text-neutral-500">mx records...</span></>
                            ) : checkingProgress.mx === 'success' ? (
                              <><span className="text-emerald-400">✓</span><span>mx verified</span></>
                            ) : (
                              <><span className="text-red-400">✗</span><span className="text-red-300">no mx</span></>
                            )}
                          </div>
                        )}

                        {checkingProgress.disposable !== 'pending' && (
                          <div className="flex items-center gap-2">
                            {checkingProgress.disposable === 'active' ? (
                              <><Loader2 className="w-3 h-3 text-neutral-500 animate-spin" /><span className="text-neutral-500">disposable check...</span></>
                            ) : checkingProgress.disposable === 'success' ? (
                              <><span className="text-emerald-400">✓</span><span>not disposable</span></>
                            ) : (
                              <><span className="text-red-400">✗</span><span className="text-red-300">disposable detected</span></>
                            )}
                          </div>
                        )}

                        {checkingProgress.smtp !== 'pending' && (
                          <div className="flex items-center gap-2">
                            {checkingProgress.smtp === 'active' ? (
                              <><Loader2 className="w-3 h-3 text-neutral-500 animate-spin" /><span className="text-neutral-500">smtp handshake...</span></>
                            ) : checkingProgress.smtp === 'success' ? (
                              <><span className="text-emerald-400">✓</span><span>smtp ok</span></>
                            ) : (
                              <><span className="text-red-400">✗</span><span className="text-red-300">smtp failed</span></>
                            )}
                          </div>
                        )}
                      </div>
                      
                      <div className="text-[11px] text-neutral-500 border-t border-white/40 pt-1.5 flex justify-between items-center mt-3">
                        <span>running...</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                      </div>
                    </div>
                  </div>
                )}

                {/* COMPLETED STATE */}
                {animationStep === 'completed' && result && (
                  <div className="flex-1 flex flex-col justify-between animate-fade-in text-neutral-900">
                    
                    {/* Result Text */}
                    <div className="flex items-start justify-between mb-4 pb-4 border-b border-white/40">
                      <div className="flex items-start gap-2.5">
                        <div className="mt-0.5">
                          {result.riskLevel === 'high' ? (
                            <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                          ) : result.riskLevel === 'medium' ? (
                            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
                          ) : (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                          )}
                        </div>
                        <div>
                          <p className={`font-bold text-[15px] leading-tight ${
                            result.riskLevel === 'high' 
                              ? 'text-rose-600' 
                              : result.riskLevel === 'medium'
                              ? 'text-amber-600'
                              : 'text-emerald-600'
                          }`}>
                            {result.riskLevel === 'high' && 'High Risk'}
                            {result.riskLevel === 'medium' && 'Medium Risk'}
                            {result.riskLevel === 'low' && 'Low Risk'}
                          </p>
                          <p className="text-xs text-neutral-600 mt-1 leading-relaxed">{getFunnyReason(result.reason, result.email)}</p>
                        </div>
                      </div>
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                        result.riskLevel === 'high' 
                          ? 'bg-rose-100 text-rose-700 border border-rose-200' 
                          : result.riskLevel === 'medium'
                          ? 'bg-amber-100 text-amber-700 border border-amber-200'
                          : 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                      }`}>
                        {result.riskLevel}
                      </span>
                    </div>

                    {/* Tabs */}
                    <div className="flex border-b border-white/40 mb-3">
                      <button
                        onClick={() => setResultTab('summary')}
                        className={`pb-2 text-xs font-medium border-b-2 px-3 transition-colors ${
                          resultTab === 'summary' 
                            ? 'border-neutral-900 text-neutral-900' 
                            : 'border-transparent text-neutral-500 hover:text-neutral-700'
                        }`}
                      >
                        Summary
                      </button>
                      <button
                        onClick={() => setResultTab('json')}
                        className={`pb-2 text-xs font-medium border-b-2 px-3 transition-colors ${
                          resultTab === 'json' 
                            ? 'border-neutral-900 text-neutral-900' 
                            : 'border-transparent text-neutral-500 hover:text-neutral-700'
                        }`}
                      >
                        JSON
                      </button>
                    </div>

                    <div className="flex-1">
                      {resultTab === 'summary' ? (
                        <div className="space-y-2 bg-white/30 rounded-lg p-3 border border-white/50 shadow-sm text-[13px]">
                          <div className="flex justify-between text-xs border-b border-white/40 pb-1.5">
                            <span className="text-neutral-500">Domain</span>
                            <span className="font-mono text-neutral-900 font-semibold">{result.domain}</span>
                          </div>
                          {[
                            { label: 'Format', pass: true },
                            { label: 'MX Records', pass: checkingProgress.mx !== 'fail' },
                            { label: 'Disposable', pass: !result.disposable },
                            { label: 'SMTP', pass: result.riskLevel !== 'high' },
                          ].map((item) => (
                            <div key={item.label} className="flex justify-between text-xs">
                              <span className="text-neutral-500">{item.label}</span>
                              {item.pass ? (
                                <span className="text-emerald-400 flex items-center gap-1"><Check className="w-3 h-3" /> pass</span>
                              ) : (
                                <span className="text-red-400 flex items-center gap-1"><XCircle className="w-3 h-3" /> fail</span>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="relative">
                          <pre className="bg-white/40 text-emerald-700 rounded-lg p-3 text-xs font-mono overflow-x-auto max-h-[150px] border border-white/60 shadow-sm">
{`{
  "email": "${result.email}",
  "domain": "${result.domain}",
  "disposable": ${result.disposable},
  "riskLevel": "${result.riskLevel}",
  "reason": "${result.reason}",
  "responseTime": "${result.responseTime}"
}`}
                          </pre>
                          <button
                            onClick={() => copyToClipboard(JSON.stringify(result, null, 2), 'json_res')}
                            className="absolute right-2 top-2 p-1 bg-white/80 border border-white hover:bg-white text-neutral-500 hover:text-neutral-900 rounded shadow-sm transition-colors"
                          >
                            {copied === 'json_res' ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between border-t border-white/40 pt-3 mt-3">
                      <span className="text-[11px] text-neutral-500 font-mono">{result.responseTime}</span>
                      <button
                        onClick={handleReset}
                        className="flex items-center gap-1 text-[11px] text-neutral-500 hover:text-neutral-900 font-medium transition-colors"
                      >
                        <RefreshCw className="w-3 h-3" /> Again
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why fake emails are sus */}
      <section className="border-t border-white/50 bg-white/10 backdrop-blur-sm">
        <div className="w-full px-6 md:px-12 lg:px-20 mx-auto py-10 md:py-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-neutral-900">
              Why fake emails are sus AF
            </h2>
            <p className="text-neutral-500 mt-2.5 text-xs md:text-sm max-w-lg mx-auto leading-relaxed">
              We asked real developers why they check emails. Here is why fake signups ruin the vibe.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/40 backdrop-blur-md border border-white/50 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
              <div className="font-mono text-[10px] font-bold text-rose-500 uppercase tracking-widest mb-3 bg-rose-50 border border-rose-100/60 rounded px-2 py-0.5 w-max">
                ERR_DB_BLOAT
              </div>
              <h3 className="text-sm font-bold text-neutral-900 mb-1.5">Database Bloat</h3>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Storing millions of <code className="bg-white/60 px-1 rounded text-[11px]">xX_john_Xx@getnada.com</code> rows in your PostgreSQL database costs real money. Stop hosting ghosts.
              </p>
            </div>

            <div className="bg-white/40 backdrop-blur-md border border-white/50 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
              <div className="font-mono text-[10px] font-bold text-amber-600 uppercase tracking-widest mb-3 bg-amber-50 border border-amber-100/60 rounded px-2 py-0.5 w-max">
                STAT_ERR_SUS
              </div>
              <h3 className="text-sm font-bold text-neutral-900 mb-1.5">Analytics Ruined</h3>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Fake users register, inflate your sign-up stats, never verify their account, and completely wreck your retention graphs. Bruh, that's sad.
              </p>
            </div>

            <div className="bg-white/40 backdrop-blur-md border border-white/50 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
              <div className="font-mono text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-3 bg-blue-50 border border-blue-100/60 rounded px-2 py-0.5 w-max">
                SMTP_IP_BANNED
              </div>
              <h3 className="text-sm font-bold text-neutral-900 mb-1.5">Spam Traps</h3>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Mailing dead or fake domains triggers bounces and gets your IP blacklisted by Gmail. Don't end up in the spam folder forever.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works — simple horizontal flow */}
      <section className="border-t border-white/50 bg-white/20 backdrop-blur-sm">
        <div className="w-full px-6 md:px-12 lg:px-20 mx-auto py-16 md:py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-900">
              How this magic happens
            </h2>
            <p className="text-neutral-500 mt-3 text-sm md:text-base max-w-lg mx-auto leading-relaxed">
              We run every input through a 4-step bullshit-detector pipeline in milliseconds. No cap.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 lg:gap-8">
            {[
              { step: 'Syntax Check', desc: "RFC 5322 verification. Basically making sure they didn't write something goofy like user@@gmail.com." },
              { step: 'MX Lookup', desc: "Resolving DNS/MX mail exchange records. If the domain has no MX servers, they ain't receiving mail." },
              { step: 'Trash Detector', desc: "Checking 500K+ temporary email checker list. Banish 10-minute spammers to the shadow realm." },
              { step: 'SMTP Ping', desc: "Knocking on the mail server directly. Verify emails actually exist, sneaky but clean code approved." },
            ].map((item, i, arr) => (
              <div key={item.step} className="relative">
                <div className="group h-full relative bg-white/40 backdrop-blur-md border border-white/50 p-5 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 hover:bg-white/60 transition-all duration-300">
                  <div className="text-xs font-mono font-bold text-neutral-400 group-hover:text-blue-500 mb-2 transition-colors">{String(i + 1).padStart(2, '0')}</div>
                  <h3 className="text-sm font-semibold text-neutral-900 group-hover:text-blue-700 transition-colors">{item.step}</h3>
                  <p className="text-xs text-neutral-500 mt-1 leading-relaxed">{item.desc}</p>
                </div>
                
                {/* Connecting Arrow for Desktop */}
                {i < arr.length - 1 && (
                  <div className="hidden md:flex absolute top-1/2 -right-4 lg:-right-6 -translate-y-1/2 text-blue-300 z-10 pointer-events-none">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                )}
                
                {/* Connecting Arrow for Mobile (vertical) */}
                {i < arr.length - 1 && (
                  <div className="flex md:hidden absolute -bottom-6 left-1/2 -translate-x-1/2 text-blue-300 z-10 pointer-events-none rotate-90">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* API reference */}
      <section className="border-t border-white/50 bg-white/30 backdrop-blur-md">
        <div className="w-full px-6 md:px-12 lg:px-20 mx-auto py-14">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            
            {/* Left — endpoint info */}
            <div className="lg:col-span-2">
              <code className="text-xs font-mono px-2 py-1 rounded bg-emerald-50 text-emerald-700 border border-emerald-100">GET /api/check</code>
              <h2 className="text-lg font-semibold text-neutral-900 mt-3">Integration is easy fr</h2>
              <p className="text-sm text-neutral-500 mt-2 leading-relaxed">
                Send a GET request, get the JSON response. No auth keys, no billing setup, just vibes and clean databases.
              </p>
              
              <div className="mt-6">
                <h4 className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 mb-2">The only param you need</h4>
                <div className="bg-white/50 backdrop-blur-sm border border-white/60 shadow-sm rounded-lg overflow-hidden text-xs">
                  <div className="px-3 py-2 flex items-baseline gap-3">
                    <code className="font-mono font-bold text-neutral-900">email</code>
                    <span className="text-neutral-400 font-mono">string</span>
                    <span className="text-[9px] uppercase font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">required</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right — code block */}
            <div className="lg:col-span-3">
              <div className="bg-[#0a0a0a] rounded-xl border border-neutral-800 overflow-hidden">
                <div className="px-4 py-2 border-b border-neutral-800 flex items-center justify-between">
                  <div className="flex gap-1">
                    {(['curl', 'js', 'python'] as const).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setApiTab(tab)}
                        className={`px-2.5 py-1 text-[11px] font-mono font-medium rounded transition-colors ${
                          apiTab === tab ? 'bg-neutral-800 text-white' : 'text-neutral-500 hover:text-neutral-300'
                        }`}
                      >
                        {tab === 'js' ? 'fetch' : tab}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => copyToClipboard(getCodeSnippet(), 'code_play')}
                    className="text-neutral-500 hover:text-white transition-colors p-1"
                  >
                    {copied === 'code_play' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <pre className="p-4 text-[12px] font-mono text-neutral-300 leading-relaxed overflow-x-auto">
                  {getCodeSnippet()}
                </pre>
                <div className="border-t border-neutral-800 px-4 py-3">
                  <div className="text-[10px] uppercase font-bold text-neutral-600 tracking-wider mb-1.5">Response</div>
                  <pre className="text-[11px] font-mono text-emerald-500/80 overflow-x-auto">
{`{ "email": "...", "disposable": true, "riskLevel": "high", "reason": "..." }`}
                  </pre>
                </div>
              </div>
            </div>
          </div>

          {/* Response Definitions */}
          <div className="mt-6 border-t border-white/20 pt-6 max-w-3xl mx-auto w-full text-center">
            <h3 className="text-2xl font-bold text-neutral-900 mb-8">Response Definitions</h3>
            <div className="bg-white/50 backdrop-blur-sm border border-white/60 shadow-sm rounded-xl overflow-hidden divide-y divide-white/40 text-left">
              {[
                { field: 'email', type: 'string', desc: 'The checked address' },
                { field: 'domain', type: 'string', desc: 'Extracted domain' },
                { field: 'disposable', type: 'boolean', desc: 'Whether the domain is disposable' },
                { field: 'riskLevel', type: 'string', desc: 'high · medium · low' },
                { field: 'reason', type: 'string', desc: 'Human-readable explanation' },
              ].map((row) => (
                <div key={row.field} className="px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-[15px]">
                  <code className="font-mono font-bold text-neutral-900 w-32 shrink-0">{row.field}</code>
                  <span className="font-mono text-neutral-500 w-16 shrink-0">{row.type}</span>
                  <span className="text-neutral-700">{row.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/50 bg-white/20 backdrop-blur-sm">
        <div className="w-full px-6 md:px-12 lg:px-20 mx-auto py-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h3 className="text-lg font-semibold text-neutral-900">Stop getting clowned by fake signups</h3>
            <p className="text-sm text-neutral-500 mt-1">Zero signups, no keys, no cap. Just verify.</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/docs"
              className="bg-neutral-900 hover:bg-neutral-800 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors inline-flex items-center gap-1.5"
            >
              Documentation <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/50 bg-white/40 backdrop-blur-md">
        <div className="w-full px-6 md:px-12 lg:px-20 mx-auto py-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-neutral-400">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-neutral-900 to-neutral-400 flex items-center justify-center overflow-hidden">
              <Image src="/logo.png" alt="EmailSniff Logo" width={24} height={24} className="w-full h-full object-cover" />
            </div>
            <p>© {new Date().getFullYear()} EmailSniff</p>
          </div>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-2 sm:mt-0 font-medium justify-center sm:justify-end">
            <Link href="/disposable-email-checker" className="hover:text-neutral-900 transition-colors">
              Disposable Checker
            </Link>
            <Link href="/smtp-verifier" className="hover:text-neutral-900 transition-colors">
              SMTP Verifier
            </Link>
            <Link href="/mx-record-checker" className="hover:text-neutral-900 transition-colors">
              MX Checker
            </Link>
            <Link href="/free-email-verifier" className="hover:text-neutral-900 transition-colors">
              Free Verifier
            </Link>
            <Link href="/spam-email-checker" className="hover:text-neutral-900 transition-colors">
              Spam Checker
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
