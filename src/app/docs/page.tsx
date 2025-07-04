export default function DocsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            API Documentation
          </h1>
          <p className="text-xl text-gray-600">
            Complete guide to using the DevCraft Labs API
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6">Getting Started</h2>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3">Authentication</h3>
            <p className="text-gray-600 mb-4">
              All API requests require authentication using API keys. Include your API key in the Authorization header:
            </p>
            <div className="bg-gray-100 p-4 rounded-lg">
              <pre className="text-sm">
{`Authorization: Bearer YOUR_API_KEY`}
              </pre>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3">Base URL</h3>
            <div className="bg-gray-100 p-4 rounded-lg">
              <pre className="text-sm">
{`https://api.devcraft-labs.com/v1`}
              </pre>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3">Rate Limits</h3>
            <ul className="text-gray-600 space-y-1">
              <li>• Free tier: 100 requests per hour</li>
              <li>• Pro tier: 1,000 requests per hour</li>
              <li>• Enterprise tier: 10,000 requests per hour</li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">📧 Email Generation</h3>
            <p className="text-gray-600 mb-4">Generate professional email content</p>
            <div className="bg-gray-100 p-4 rounded-lg text-sm">
              <pre>
{`POST /v1/email/generate

{
  "type": "business",
  "subject": "Meeting Request",
  "tone": "professional",
  "recipient": "client"
}`}
              </pre>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">🧾 Invoice Generation</h3>
            <p className="text-gray-600 mb-4">Create professional invoices</p>
            <div className="bg-gray-100 p-4 rounded-lg text-sm">
              <pre>
{`POST /v1/invoices/generate

{
  "client_name": "ABC Corp",
  "amount": 1500.00,
  "description": "Web Development",
  "due_date": "2024-01-15"
}`}
              </pre>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">🚀 Landing Pages</h3>
            <p className="text-gray-600 mb-4">Generate landing page content</p>
            <div className="bg-gray-100 p-4 rounded-lg text-sm">
              <pre>
{`POST /v1/landing/generate

{
  "business_type": "SaaS",
  "product_name": "TaskManager Pro",
  "target_audience": "small businesses",
  "goal": "conversions"
}`}
              </pre>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">📝 Content Generation</h3>
            <p className="text-gray-600 mb-4">Create various content types</p>
            <div className="bg-gray-100 p-4 rounded-lg text-sm">
              <pre>
{`POST /v1/content/generate

{
  "type": "blog-post",
  "topic": "Digital Marketing",
  "tone": "professional",
  "length": "medium"
}`}
              </pre>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold mb-6">Response Format</h2>
          <p className="text-gray-600 mb-4">
            All successful API responses follow this format:
          </p>
          <div className="bg-gray-100 p-4 rounded-lg">
            <pre className="text-sm">
{`{
  "success": true,
  "data": {
    // Response data here
  },
  "metadata": {
    "generated_at": "2024-01-01T00:00:00Z",
    "api_version": "1.0",
    "model": "devcraft-v1"
  }
}`}
            </pre>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mt-8">
          <h2 className="text-2xl font-semibold mb-6">Error Handling</h2>
          <p className="text-gray-600 mb-4">
            Error responses include detailed information to help debug issues:
          </p>
          <div className="bg-gray-100 p-4 rounded-lg">
            <pre className="text-sm">
{`{
  "success": false,
  "error": "Invalid API key",
  "code": "INVALID_AUTH",
  "message": "Please provide a valid API key"
}`}
            </pre>
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-6 mt-8">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Need Help?</h3>
          <p className="text-blue-800">
            Contact our support team at{' '}
            <a href="mailto:support@devcraft-labs.com" className="font-medium underline">
              support@devcraft-labs.com
            </a>
            {' '}for assistance with the API.
          </p>
        </div>
      </div>
    </div>
  );
}