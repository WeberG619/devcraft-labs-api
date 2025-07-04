export default function APIHomePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <svg width="80" height="80" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 6h8c8.284 0 15 6.716 15 15s-6.716 15-15 15H8V6z" fill="url(#gradient1)"/>
              <path d="M12 12h4v2h-4v-2zm6 0h4v2h-4v-2zm-6 4h4v2h-4v-2zm6 4h4v2h-4v-2zm-6 4h4v2h-4v-2z" fill="white" opacity="0.3"/>
              <circle cx="20" cy="20" r="3" fill="none" stroke="white" strokeWidth="1" opacity="0.4"/>
              <path d="M20 15l1.5 1.5-1.5 1.5-1.5-1.5L20 15zm5 5l-1.5 1.5-1.5-1.5 1.5-1.5L25 20zm-5 5l-1.5-1.5 1.5-1.5 1.5 1.5L20 25zm-5-5l1.5-1.5 1.5 1.5-1.5 1.5L15 20z" fill="white" opacity="0.2"/>
              <defs>
                <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1e40af"/>
                  <stop offset="100%" stopColor="#3b82f6"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            DevCraft Labs API
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Professional AI tools API for businesses, developers, and AEC professionals
          </p>
          <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
            ✅ Status: Operational
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">🧾 Invoice API</h2>
            <p className="text-gray-600 mb-4">Generate and send professional invoices with AI-powered descriptions</p>
            <ul className="text-sm text-gray-500 space-y-1">
              <li>• POST /v1/invoices/generate</li>
              <li>• POST /v1/invoices/send</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">📧 Email API</h2>
            <p className="text-gray-600 mb-4">Generate professional email content for any business type</p>
            <ul className="text-sm text-gray-500 space-y-1">
              <li>• POST /v1/email/generate</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">🚀 Landing Page API</h2>
            <p className="text-gray-600 mb-4">Create high-converting landing pages with optimization tips</p>
            <ul className="text-sm text-gray-500 space-y-1">
              <li>• POST /v1/landing/generate</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">📝 Content API</h2>
            <p className="text-gray-600 mb-4">Generate blog posts, social media content, and marketing copy</p>
            <ul className="text-sm text-gray-500 space-y-1">
              <li>• POST /v1/content/generate</li>
            </ul>
          </div>
        </div>

        <div className="bg-blue-50 p-6 rounded-lg mb-8 border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Complete DevCraft Labs Platform</h3>
              <p className="text-blue-800 text-sm">This is the API service. Visit our main website for the full platform, documentation, and business tools.</p>
            </div>
            <a 
              href="https://devcraft-labs-nun39sfl4-weber1.vercel.app" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              target="_blank"
            >
              Main Website →
            </a>
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold mb-4">Quick Start</h2>
          <div className="bg-gray-100 p-4 rounded-lg mb-4">
            <pre className="text-sm whitespace-pre-wrap">
{`curl -X POST https://devcraft-labs-api.vercel.app/api/v1/invoices/generate \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"client_name": "Test Client", "amount": 100.00}'`}
            </pre>
          </div>
          <p className="text-gray-600">
            All API endpoints require authentication using API keys. Get your API key from the{' '}
            <a href="/docs" className="text-blue-600 hover:underline">
              documentation
            </a>.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Rate Limits</h3>
            <div className="text-sm text-gray-600">
              <div>Free: 100/hr</div>
              <div>Pro: 1,000/hr</div>
              <div>Enterprise: 10,000/hr</div>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Uptime SLA</h3>
            <div className="text-sm text-gray-600">
              <div>99.9% uptime</div>
              <div>Enterprise support</div>
              <div>24/7 monitoring</div>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Support</h3>
            <div className="text-sm text-gray-600">
              <a href="mailto:support@devcraft-labs.com" className="text-blue-600 hover:underline block">
                support@devcraft-labs.com
              </a>
              <div>Documentation</div>
              <div>Live chat</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}