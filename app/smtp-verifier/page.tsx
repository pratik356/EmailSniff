import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Check, Zap, ExternalLink } from 'lucide-react';

export const metadata = {
  title: 'Real-Time SMTP Email Verifier | EmailSniff',
  description: 'Validate if a mailbox exists and can receive emails in real-time. Direct SMTP server handshake checks without sending spam messages.',
};

export default function SmtpVerifierPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Moving Glass Background Orbs */}
      <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-blue-200/30 blur-[120px] mix-blend-multiply" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-sky-200/30 blur-[120px] mix-blend-multiply" />
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
            Real-Time SMTP Verifier
          </h1>
          <p className="text-lg text-neutral-600 max-w-3xl leading-relaxed">
            Go beyond simple syntax checks. Verify if an inbox actually exists on the remote mail server. EmailSniff performs direct, safe SMTP handshakes in milliseconds.
          </p>
        </div>

        {/* Content Card */}
        <div className="bg-white/40 backdrop-blur-xl border border-white/60 shadow-xl rounded-2xl p-6 sm:p-8 mb-12">
          <h2 className="text-xl font-bold text-neutral-900 mb-6">How SMTP Verification Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-neutral-900">No Emails Sent</h4>
                  <p className="text-xs text-neutral-500 mt-1">We ping the mail server, request mailbox status, and safely close the socket before sending any message. 100% spam-free.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-neutral-900">Catch Typos Instantly</h4>
                  <p className="text-xs text-neutral-500 mt-1">Easily find user typos (e.g. `gamil.com` or `yaho.com`) that syntactically pass but do not actually exist.</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-neutral-900">Deep SMTP Analysis</h4>
                  <p className="text-xs text-neutral-500 mt-1">Check response status codes returned directly by the server to diagnose soft/hard bounces before mailing.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-neutral-900">Cached Responses</h4>
                  <p className="text-xs text-neutral-500 mt-1">Repeated checks on the same server are cached to avoid rate limiting and speed up responses to under 10ms.</p>
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
                q: "What does SMTP verification actually do?",
                a: "We connect to the remote mail server (like Gmail's MX servers) and initiate an SMTP handshake. We ask the server 'Hey, does user@domain.com exist?' and read the response code. If the server says yes, we disconnect. It's direct proof of mailbox existence."
              },
              {
                q: "Do you send an actual email?",
                a: "Hell no. We close the connection right after checking the mailbox existence. Your users get zero spam, and your mail server reputation remains perfectly clean."
              },
              {
                q: "Does this block temporary burner inboxes too?",
                a: "Yes, our API checks SMTP status, format syntax, and MX records simultaneously to give you a complete, multi-layered anti-spam check."
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
          <h3 className="text-lg font-bold text-neutral-900 mb-2">Validate your list today</h3>
          <p className="text-xs text-neutral-500 max-w-md mx-auto mb-6">
            Test SMTP status in real-time or embed it into your login and register routes.
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
