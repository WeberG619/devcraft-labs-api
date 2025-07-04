export default function APIHomePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
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

        <div className="bg-white p-8 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold mb-4">Quick Start</h2>
          <div className="bg-gray-100 p-4 rounded-lg mb-4">
            <pre className="text-sm whitespace-pre-wrap">
{`curl -X POST https://api.devcraft-labs.com/v1/invoices/generate \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"client_name": "Test Client", "amount": 100.00}'`}
            </pre>
          </div>
          <p className="text-gray-600">
            All API endpoints require authentication using API keys. Get your API key from the{' '}
            <a href="https://devcraft-labs.com/docs" className="text-blue-600 hover:underline">
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