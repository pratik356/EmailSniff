import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Check, ExternalLink } from 'lucide-react';

export const metadata = {
  title: 'Free Domain MX Record Checker & Lookup | EmailSniff',
  description: 'Resolve mail exchange (MX) DNS records for any domain name. Check domain setup validity and determine if it can receive incoming emails.',
};

export default function MxRecordCheckerPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Moving Glass Background Orbs */}
      <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-15%] left-[-15%] w-[60vw] h-[60vw] rounded-full bg-blue-200/30 blur-[120px] mix-blend-multiply" />
        <div className="absolute bottom-[-15%] right-[-15%] w-[50vw] h-[50vw] rounded-full bg-sky-200/30 blur-[120px] mix-blend-multiply" />
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
            Domain MX Record Checker
          </h1>
          <p className="text-lg text-neutral-600 max-w-3xl leading-relaxed">
            Instantly query and verify DNS Mail Exchange (MX) records. If a domain does not resolve any MX servers, it is dead on arrival and cannot receive emails. We check MX records instantly.
          </p>
        </div>

        {/* Content Card */}
        <div className="bg-white/40 backdrop-blur-xl border border-white/60 shadow-xl rounded-2xl p-6 sm:p-8 mb-12">
          <h2 className="text-xl font-bold text-neutral-900 mb-6">The Importance of MX Lookup</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-sky-100 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-sky-600" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-neutral-900">Verify Mail Receivability</h4>
                  <p className="text-xs text-neutral-500 mt-1">If a domain has no configured MX records, any email sent to it will bounce. Our lookup checks these servers instantly.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-sky-100 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-sky-600" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-neutral-900">Prevent Inactive Registrations</h4>
                  <p className="text-xs text-neutral-500 mt-1">Blocks users registering with fake domain formats or inactive host names right at signup.</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-sky-100 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-sky-600" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-neutral-900">DNS Validation</h4>
                  <p className="text-xs text-neutral-500 mt-1">Check priorities and targets of remote exchange servers to ensure the domain is correctly routed and active.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-sky-100 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-sky-600" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-neutral-900">Lightweight API</h4>
                  <p className="text-xs text-neutral-500 mt-1">Perform quick, stateless MX lookup query requests alongside syntax format validation via a single endpoint.</p>
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
                q: "What are MX records?",
                a: "MX (Mail Exchange) records are DNS configurations that identify which mail server is responsible for accepting email messages on behalf of a domain. No MX records = domain cannot receive mail. Period."
              },
              {
                q: "Why check MX records on signup?",
                a: "If a user signs up with a domain that doesn't have active MX records (like user@fakecompany1234.com), any authentication or password reset email you send will immediately bounce. Verifying MX records prevents this."
              },
              {
                q: "Can it check custom domain configs?",
                a: "Yes, our API returns the list of resolved MX hosts and their priority levels so you can inspect remote mail server setups in real-time."
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
          <h3 className="text-lg font-bold text-neutral-900 mb-2">Check domain routing</h3>
          <p className="text-xs text-neutral-500 max-w-md mx-auto mb-6">
            Test any domain setup or query our API in your production software without any limit.
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
          <p>© {new Date().getFullYear()} EmailSniff · Open Source MIT</p>
        </div>
      </div>
    </main>
  );
}
