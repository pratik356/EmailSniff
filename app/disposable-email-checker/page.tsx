import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Check, Shield, Zap, ExternalLink } from 'lucide-react';

export const metadata = {
  title: 'Free Disposable Email Checker & Detector | EmailSniff',
  description: 'Instantly check if an email address belongs to a disposable or temporary domain. Banish 10-minute inbox generators and prevent fake signups in real-time.',
};

export default function DisposableEmailCheckerPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Moving Glass Background Orbs */}
      <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-blue-200/30 blur-[120px] mix-blend-multiply" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-sky-200/30 blur-[120px] mix-blend-multiply" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Navigation */}
        <div className="flex items-center justify-between mb-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neutral-900 to-neutral-400 flex items-center justify-center overflow-hidden">
              <Image src="/logo.png" alt="EmailSniff Logo" width={32} height={32} className="w-full h-full object-cover" />
            </div>
            <span className="text-[16px] font-bold tracking-tight text-neutral-900">EmailSniff</span>
          </Link>
          <Link href="/" className="text-xs font-semibold text-neutral-500 hover:text-neutral-900 transition-colors">
            Back to Home
          </Link>
        </div>

        {/* Hero Section */}
        <div className="mb-12 text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
            Free Disposable Email Checker
          </h1>
          <p className="text-lg text-neutral-600 max-w-3xl leading-relaxed">
            Protect your sign-up pipeline from spam bots and bad actors. EmailSniff provides a high-speed, free verification service to identify temporary mailboxes in under 15ms.
          </p>
        </div>

        {/* Content Card */}
        <div className="bg-white/40 backdrop-blur-xl border border-white/60 shadow-xl rounded-2xl p-6 sm:p-8 mb-12">
          <h2 className="text-xl font-bold text-neutral-900 mb-6">Why check for disposable emails?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-neutral-900">Prevent Fake Accounts</h4>
                  <p className="text-xs text-neutral-500 mt-1">Stop users from registering multiple trial accounts using 10-minute temporary inboxes.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-neutral-900">Maintain Email Deliverability</h4>
                  <p className="text-xs text-neutral-500 mt-1">High bounce rates from dead mailboxes ruin your sender reputation with ESPs like Gmail and Outlook.</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-neutral-900">Real-Time Detection</h4>
                  <p className="text-xs text-neutral-500 mt-1">Our API responds in milliseconds, allowing you to reject fake domains directly on your signup form.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-neutral-900">500K+ Tracked Domains</h4>
                  <p className="text-xs text-neutral-500 mt-1">We track and update over 500,000 active burner/temp email providers hourly. No cap.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-neutral-900 mb-6 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              {
                q: "WTF is a disposable email address anyway?",
                a: "It's a temporary, short-lived mailbox (like Mailinator or 10MinuteMail) that self-destructs after a few minutes. Users use them to grab your freebies or verify signups without giving their real email. Sus behavior fr."
              },
              {
                q: "How do you detect them?",
                a: "We track a massive database of 500,000+ known temporary email domains, updated hourly. We also analyze domain structures for known burner patterns automatically."
              },
              {
                q: "Is there a rate limit on checks?",
                a: "No, we don't do limits. Check 1 or 1,000,000 emails, it's free. No keys needed, no billing, no cap."
              }
            ].map((faq, i) => (
              <div key={i} className="bg-white/30 backdrop-blur-md border border-white/40 p-5 rounded-xl shadow-sm">
                <h4 className="font-bold text-sm text-neutral-900 mb-2">{faq.q}</h4>
                <p className="text-xs text-neutral-500 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-br from-blue-50 to-sky-50 rounded-2xl p-8 border border-blue-100/50">
          <h3 className="text-lg font-bold text-neutral-900 mb-2">Ready to clean your database?</h3>
          <p className="text-xs text-neutral-500 max-w-md mx-auto mb-6">
            Test your email lists in our live interactive playground or integrate our free API in minutes.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 max-w-xs sm:max-w-none mx-auto w-full">
            <Link
              href="/"
              className="bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition-colors inline-flex items-center justify-center gap-1.5 shadow-sm w-full sm:w-auto"
            >
              Test Live Playground <ArrowRight className="w-3 h-3" />
            </Link>
            <Link
              href="/docs"
              className="bg-white hover:bg-neutral-50 text-neutral-700 text-xs font-semibold px-4 py-2.5 rounded-lg border border-neutral-200 transition-colors inline-flex items-center justify-center gap-1.5 shadow-sm w-full sm:w-auto"
            >
              Read API Docs <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-neutral-100 mt-16 pt-8 text-center text-xs text-neutral-400">
          <p>© {new Date().getFullYear()} EmailSniff</p>
        </div>
      </div>
    </main>
  );
}
