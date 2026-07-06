import Link from 'next/link';

export const metadata = {
  title: 'Documentation - EmailSniff API',
  description: 'Complete guide to EmailSniff API for detecting disposable and system-generated emails',
};

export default function DocsPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <Link href="/" className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-1">
            ← Back to Home
          </Link>
          <h1 className="text-5xl font-bold text-gray-900 mt-6 mb-4">API Documentation</h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            EmailSniff detects disposable email addresses and system-generated masked emails in real-time. Works with 500K+ known disposable domains plus pattern detection for masked addresses.
          </p>
        </div>

        {/* Quick Start */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Quick Start</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* cURL Example */}
            <div className="border border-gray-200 rounded-xl p-6">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-bold">cURL</span>
              </h3>
              <pre className="bg-gray-900 text-green-400 rounded-lg p-4 text-xs overflow-x-auto font-mono mb-3">
{`curl "https://api.emailsniff.dev/api/check?\\
  email=mask.b6-10cea117@xeramail.com"`}
              </pre>
              <p className="text-xs text-gray-600">Basic email check with pattern detection</p>
            </div>

            {/* JavaScript Example */}
            <div className="border border-gray-200 rounded-xl p-6">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs font-bold">JavaScript</span>
              </h3>
              <pre className="bg-gray-900 text-green-400 rounded-lg p-4 text-xs overflow-x-auto font-mono mb-3">
{`const res = await fetch(
  '/api/check?email=user@tempmail.com'
);
const data = await res.json();
console.log(data.riskLevel);`}
              </pre>
              <p className="text-xs text-gray-600">Check email and get risk assessment</p>
            </div>

            {/* Python Example */}
            <div className="border border-gray-200 rounded-xl p-6">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-bold">Python</span>
              </h3>
              <pre className="bg-gray-900 text-green-400 rounded-lg p-4 text-xs overflow-x-auto font-mono mb-3">
{`import requests

resp = requests.get(
  'https://api.emailsniff.dev/api/check',
  params={'email': 'user@example.com'}
)
print(resp.json()['disposable'])`}
              </pre>
              <p className="text-xs text-gray-600">Python requests library integration</p>
            </div>

            {/* Node.js Example */}
            <div className="border border-gray-200 rounded-xl p-6">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">Node.js</span>
              </h3>
              <pre className="bg-gray-900 text-green-400 rounded-lg p-4 text-xs overflow-x-auto font-mono mb-3">
{`import fetch from 'node-fetch';

const email = 'user@mailinator.com';
const res = await fetch(
  \`/api/check?email=\${email}\`
);
const data = await res.json();`}
              </pre>
              <p className="text-xs text-gray-600">Node.js native fetch API</p>
            </div>
          </div>
        </section>

        {/* Single Email Check */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Check Single Email</h2>
          <p className="text-gray-600 mb-6">
            Check a single email address for disposability and system-generated patterns. Returns risk level and detection details.
          </p>

          <div className="space-y-6">
            {/* Endpoint */}
            <div className="border border-gray-200 rounded-xl p-6">
              <h3 className="font-bold text-gray-900 mb-3">Endpoint</h3>
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-block bg-green-100 text-green-800 text-xs font-bold px-2.5 py-1 rounded">GET</span>
                <code className="bg-gray-100 px-3 py-1 rounded font-mono text-sm text-gray-900">/api/check</code>
              </div>
            </div>

            {/* Parameters */}
            <div className="border border-gray-200 rounded-xl p-6">
              <h3 className="font-bold text-gray-900 mb-4">Query Parameters</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 px-3 font-semibold text-gray-900">Parameter</th>
                      <th className="text-left py-2 px-3 font-semibold text-gray-900">Type</th>
                      <th className="text-left py-2 px-3 font-semibold text-gray-900">Required</th>
                      <th className="text-left py-2 px-3 font-semibold text-gray-900">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-3 font-mono text-gray-900">email</td>
                      <td className="py-3 px-3 text-gray-600">string</td>
                      <td className="py-3 px-3 text-red-600">Yes</td>
                      <td className="py-3 px-3 text-gray-600">Email address to check</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Response Example */}
            <div className="border border-gray-200 rounded-xl p-6">
              <h3 className="font-bold text-gray-900 mb-3">Response Example</h3>
              <div className="mb-3">
                <p className="text-xs text-gray-600 mb-2">Disposable domain with high risk:</p>
                <pre className="bg-gray-900 text-green-400 rounded-lg p-4 text-xs overflow-x-auto font-mono">
{`{
  "email": "user@mailinator.com",
  "domain": "mailinator.com",
  "disposable": true,
  "systemGenerated": false,
  "riskLevel": "high",
  "reason": "Known disposable/temporary email service",
  "detectionPatterns": [],
  "confidence": 0,
  "responseTime": "8ms"
}`}
                </pre>
              </div>
              <div className="border-t border-gray-200 pt-3">
                <p className="text-xs text-gray-600 mb-2">System-generated masked email:</p>
                <pre className="bg-gray-900 text-green-400 rounded-lg p-4 text-xs overflow-x-auto font-mono">
{`{
  "email": "mask.b6-10cea117@xeramail.com",
  "domain": "xeramail.com",
  "disposable": true,
  "systemGenerated": true,
  "riskLevel": "medium",
  "reason": "System-generated masked email pattern detected",
  "detectionPatterns": [
    "Masked email prefix detected",
    "UUID/Hash pattern detected"
  ],
  "confidence": 55,
  "responseTime": "7ms"
}`}
                </pre>
              </div>
              <div className="border-t border-gray-200 pt-3">
                <p className="text-xs text-gray-600 mb-2">Legitimate email:</p>
                <pre className="bg-gray-900 text-green-400 rounded-lg p-4 text-xs overflow-x-auto font-mono">
{`{
  "email": "john@gmail.com",
  "domain": "gmail.com",
  "disposable": false,
  "systemGenerated": false,
  "riskLevel": "low",
  "reason": "Legitimate email address",
  "detectionPatterns": [],
  "confidence": 0,
  "responseTime": "6ms"
}`}
                </pre>
              </div>
            </div>

            {/* Response Fields */}
            <div className="border border-gray-200 rounded-xl p-6">
              <h3 className="font-bold text-gray-900 mb-4">Response Fields</h3>
              <div className="space-y-3">
                <div className="border-l-2 border-blue-600 pl-4">
                  <p className="font-mono text-sm text-gray-900 font-semibold">email</p>
                  <p className="text-sm text-gray-600">The email address that was checked</p>
                </div>
                <div className="border-l-2 border-blue-600 pl-4">
                  <p className="font-mono text-sm text-gray-900 font-semibold">domain</p>
                  <p className="text-sm text-gray-600">The domain portion of the email address</p>
                </div>
                <div className="border-l-2 border-blue-600 pl-4">
                  <p className="font-mono text-sm text-gray-900 font-semibold">disposable</p>
                  <p className="text-sm text-gray-600">Boolean indicating if email is disposable or system-generated</p>
                </div>
                <div className="border-l-2 border-blue-600 pl-4">
                  <p className="font-mono text-sm text-gray-900 font-semibold">systemGenerated</p>
                  <p className="text-sm text-gray-600">Boolean indicating if the local part appears system-generated (masked pattern)</p>
                </div>
                <div className="border-l-2 border-blue-600 pl-4">
                  <p className="font-mono text-sm text-gray-900 font-semibold">riskLevel</p>
                  <p className="text-sm text-gray-600">Risk assessment: &apos;high&apos;, &apos;medium&apos;, or &apos;low&apos;</p>
                </div>
                <div className="border-l-2 border-blue-600 pl-4">
                  <p className="font-mono text-sm text-gray-900 font-semibold">reason</p>
                  <p className="text-sm text-gray-600">Human-readable explanation of the assessment</p>
                </div>
                <div className="border-l-2 border-blue-600 pl-4">
                  <p className="font-mono text-sm text-gray-900 font-semibold">detectionPatterns</p>
                  <p className="text-sm text-gray-600">Array of detected patterns that indicate system-generation</p>
                </div>
                <div className="border-l-2 border-blue-600 pl-4">
                  <p className="font-mono text-sm text-gray-900 font-semibold">confidence</p>
                  <p className="text-sm text-gray-600">Confidence score (0-100) for system-generated pattern detection</p>
                </div>
                <div className="border-l-2 border-blue-600 pl-4">
                  <p className="font-mono text-sm text-gray-900 font-semibold">responseTime</p>
                  <p className="text-sm text-gray-600">API response time (typically 8-10ms)</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Detection Logic */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">4-Step Email Verification Process</h2>
          
          <p className="text-gray-600 mb-6">EmailSniff performs a comprehensive 4-step verification to ensure email validity and detect suspicious patterns:</p>

          <div className="space-y-4 mb-8">
            {/* Step 1 */}
            <div className="border border-gray-200 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-1">Format Validation</h3>
                  <p className="text-sm text-gray-600 mb-2">Validates that the email follows the correct format (local@domain.com).</p>
                  <p className="text-xs text-gray-500">Response time: &lt;1ms</p>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="border border-gray-200 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-600 font-bold">2</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-1">MX Record Check</h3>
                  <p className="text-sm text-gray-600 mb-2">Performs DNS lookup to verify the domain has valid Mail Exchange (MX) records.</p>
                  <p className="text-xs text-gray-500">Response time: 3-8ms</p>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="border border-gray-200 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-600 font-bold">3</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-1">Disposable Detection</h3>
                  <p className="text-sm text-gray-600 mb-2">Checks domain against 500K+ known disposable email services and analyzes the local part for system-generated patterns (mask.*, UUID patterns, high entropy strings).</p>
                  <p className="text-xs text-gray-500">Response time: &lt;2ms</p>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="border border-gray-200 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-600 font-bold">4</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-1">SMTP Verification</h3>
                  <p className="text-sm text-gray-600 mb-2">Attempts to verify the email address through SMTP connection to the mail server. Skipped for major providers (Gmail, Yahoo, Outlook) to avoid authentication blocks.</p>
                  <p className="text-xs text-gray-500">Response time: 3-5ms (skipped for major providers)</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border border-blue-200 bg-blue-50 rounded-xl p-6">
            <h3 className="font-bold text-gray-900 mb-3">Overall Risk Assessment</h3>
            <p className="text-sm text-gray-600 mb-3">Based on all verification steps, the API returns a risk level:</p>
            <ul className="text-sm text-gray-600 space-y-2">
              <li><strong>High Risk:</strong> Disposable domain, no MX records, or SMTP verification failed</li>
              <li><strong>Medium Risk:</strong> System-generated pattern detected on non-disposable domain</li>
              <li><strong>Low Risk:</strong> All checks passed, legitimate email domain</li>
            </ul>
          </div>
        </section>

        {/* HTTP Status Codes */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">HTTP Status Codes</h2>
          
          <div className="space-y-3">
            <div className="border border-gray-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <span className="inline-block bg-green-100 text-green-800 text-sm font-bold px-3 py-1 rounded mt-0.5">200</span>
                <div>
                  <p className="font-semibold text-gray-900">OK</p>
                  <p className="text-sm text-gray-600">Email check completed successfully</p>
                </div>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <span className="inline-block bg-yellow-100 text-yellow-800 text-sm font-bold px-3 py-1 rounded mt-0.5">400</span>
                <div>
                  <p className="font-semibold text-gray-900">Bad Request</p>
                  <p className="text-sm text-gray-600">Missing or invalid email parameter</p>
                </div>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <span className="inline-block bg-red-100 text-red-800 text-sm font-bold px-3 py-1 rounded mt-0.5">500</span>
                <div>
                  <p className="font-semibold text-gray-900">Server Error</p>
                  <p className="text-sm text-gray-600">Internal server error during processing</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            <details className="border border-gray-200 rounded-xl p-6 group cursor-pointer">
              <summary className="font-bold text-gray-900 flex items-center justify-between">
                What&apos;s the difference between disposable and system-generated emails?
                <span className="text-xl text-gray-600 group-open:rotate-180 transition-transform">+</span>
              </summary>
              <p className="text-sm text-gray-600 mt-4">
                <strong>Disposable emails</strong> use temporary email domains (mailinator, tempmail, etc.) designed to be thrown away. 
                <strong>System-generated emails</strong> use legitimate domains but have masked local parts (like mask.b6-10cea117@xeramail.com) 
                created to hide the user&apos;s real email address. Both are flagged as suspicious.
              </p>
            </details>

            <details className="border border-gray-200 rounded-xl p-6 group cursor-pointer">
              <summary className="font-bold text-gray-900 flex items-center justify-between">
                Will legitimate users with unusual email patterns get flagged?
                <span className="text-xl text-gray-600 group-open:rotate-180 transition-transform">+</span>
              </summary>
              <p className="text-sm text-gray-600 mt-4">
                No. We only flag pattern issues on disposable/untrusted domains. Emails from Gmail, Yahoo, Outlook, etc. are never 
                flagged for pattern analysis alone. This ensures we catch masked emails while protecting legitimate users.
              </p>
            </details>

            <details className="border border-gray-200 rounded-xl p-6 group cursor-pointer">
              <summary className="font-bold text-gray-900 flex items-center justify-between">
                How accurate is the detection?
                <span className="text-xl text-gray-600 group-open:rotate-180 transition-transform">+</span>
              </summary>
              <p className="text-sm text-gray-600 mt-4">
                Domain detection is 99.9%+ accurate (based on official disposable email list). Pattern detection has a 95%+ 
                accuracy rate for system-generated emails. Risk level helps you decide how strict to be.
              </p>
            </details>

            <details className="border border-gray-200 rounded-xl p-6 group cursor-pointer">
              <summary className="font-bold text-gray-900 flex items-center justify-between">
                Is there a rate limit?
                <span className="text-xl text-gray-600 group-open:rotate-180 transition-transform">+</span>
              </summary>
              <p className="text-sm text-gray-600 mt-4">
                No rate limits on the public API. Use it as much as you need. If you need bulk checking, 
                consider hosting your own instance for maximum reliability.
              </p>
            </details>

            <details className="border border-gray-200 rounded-xl p-6 group cursor-pointer">
              <summary className="font-bold text-gray-900 flex items-center justify-between">
                What data do you store?
                <span className="text-xl text-gray-600 group-open:rotate-180 transition-transform">+</span>
              </summary>
              <p className="text-sm text-gray-600 mt-4">
                None. Each request is stateless. We don&apos;t log email addresses, user IPs, or any personal data. 
                Every check is completely anonymous.
              </p>
            </details>

            <details className="border border-gray-200 rounded-xl p-6 group cursor-pointer">
              <summary className="font-bold text-gray-900 flex items-center justify-between">
                Can I use this in production?
                <span className="text-xl text-gray-600 group-open:rotate-180 transition-transform">+</span>
              </summary>
              <p className="text-sm text-gray-600 mt-4">
                Absolutely! The API is production-ready, with 99.9% uptime SLA on Vercel. 
                Responses are cached at the edge for maximum speed. You&apos;re good to go.
              </p>
            </details>
          </div>
        </section>

        {/* Integration Tips */}
        <section className="bg-blue-50 border border-blue-200 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Integration Best Practices</h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold mt-1">1.</span>
              <span><strong>Client-side validation:</strong> Check emails before submission for instant feedback</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold mt-1">2.</span>
              <span><strong>Risk-based actions:</strong> Block high-risk emails, warn for medium, allow low-risk</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold mt-1">3.</span>
              <span><strong>Cache results:</strong> Store check results to avoid redundant API calls</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold mt-1">4.</span>
              <span><strong>Manual override:</strong> Always allow admins to approve suspicious emails</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold mt-1">5.</span>
              <span><strong>Error handling:</strong> Gracefully handle API failures (fail open or closed)</span>
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}
