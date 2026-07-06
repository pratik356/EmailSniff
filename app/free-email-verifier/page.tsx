import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Check, ExternalLink } from 'lucide-react';

export const metadata = {
  title: 'Free Email Verifier & Validation API | EmailSniff',
  description: 'Validate and check if any email address is valid, active, and safe to contact. A free real-time email verification tool for developers.',
};

export default function FreeEmailVerifierPage() {
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
            Free Email Verifier
          </h1>
          <p className="text-lg text-neutral-600 max-w-3xl leading-relaxed">
            Ensure your user list is clean and active. EmailSniff offers a developer-first, free email verification tool and API to check syntax, MX servers, and SMTP existence in less than 15ms.
          </p>
        </div>

        {/* Content Card */}
        <div className="bg-white/40 backdrop-blur-xl border border-white/60 shadow-xl rounded-2xl p-6 sm:p-8 mb-12">
          <h2 className="text-xl font-bold text-neutral-900 mb-6">Core Verification Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-neutral-900">Syntax Format Inspection</h4>
                  <p className="text-xs text-neutral-500 mt-1">Runs a full format check adhering to the official RFC 5322 syntax standards to capture illegal or mistyped emails.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-neutral-900">Active Domain MX Resolving</h4>
                  <p className="text-xs text-neutral-500 mt-1">Queries domain DNS settings to ensure there is a mail server active and configured to receive incoming traffic.</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-neutral-900">Stateless and Private</h4>
                  <p className="text-xs text-neutral-500 mt-1">We value privacy. We do not store, log, or track checked email address values. Every query is processed stateless.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-neutral-900">SMTP Handshake Probe</h4>
                  <p className="text-xs text-neutral-500 mt-1">Pings target server boxes directly without sending actual emails. Ensures the mailbox is active and ready.</p>
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
                q: "Is this email verifier tool free?",
                a: "Yes, it is 100% free. We don't require credit cards, signups, or auth keys. Just use the playground or send API queries. No cap."
              },
              {
                q: "How accurate is the verification?",
                a: "Extremely accurate. By combining syntax rules, live DNS MX lookup, real-time SMTP handshakes, and a blacklist of 500K+ temp domains, we capture nearly all junk addresses."
              },
              {
                q: "Why shouldn't I use a paid validator?",
                a: "Most paid services charge massive premiums for simple queries. EmailSniff does it in real-time, cached, and with zero cost. Great code and database hygiene should be free."
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
          <h3 className="text-lg font-bold text-neutral-900 mb-2">Check your addresses now</h3>
          <p className="text-xs text-neutral-500 max-w-md mx-auto mb-6">
            Input list items in our live interactive verifier interface or query our API from your codebase.
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
