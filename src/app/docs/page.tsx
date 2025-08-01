'use client'
import { useState } from 'react'
import Image from 'next/image'
import { Copy, Play, Loader2 } from 'lucide-react'

export default function DocsPage() {
  const [apiKey, setApiKey] = useState('')
  const [testResult, setTestResult] = useState('')
  const [isTestinng, setIsTestinng] = useState(false)
  const [copiedCode, setCopiedCode] = useState('')

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(''), 2000)
  }

  const testApiEndpoint = async () => {
    if (!apiKey) {
      setTestResult('Please enter your API key first')
      return
    }

    setIsTestinng(true)
    setTestResult('')

    try {
      const response = await fetch('/api/v1/invoices/generate', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          client_name: 'Test Client',
          amount: 100.00,
          description: 'API Test Invoice'
        })
      })

      const data = await response.json()
      setTestResult(JSON.stringify(data, null, 2))
    } catch (error) {
      setTestResult(`Error: ${error}`)
    } finally {
      setIsTestinng(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <a href="/" className="flex items-center space-x-3">
              <Image
                src="/DCL-logo.png"
                alt="DevCraft Labs Logo"
                width={54}
                height={32}
              />
              <div>
                <span className="text-xl font-semibold text-gray-900">DevCraft Labs</span>
                <div className="text-xs text-gray-500 font-mono">API Documentation</div>
              </div>
            </a>
            <div className="flex items-center space-x-6">
              <a href="/" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">
                ← Back to API
              </a>
              <a 
                href="/api-keys" 
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition-all text-sm"
              >
                Get API Key
              </a>
            </div>
          </div>
        </div>
      </nav>

      <div className="py-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              API Documentation
            </h1>
          <p className="text-xl text-gray-600 mb-6">
            Complete guide to using the DevCraft Labs API
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/api-keys" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-all inline-flex items-center space-x-2"
            >
              <span>Get Your API Key</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </a>
            <a 
              href="/" 
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium px-6 py-3 rounded-lg transition-all inline-flex items-center space-x-2"
            >
              <span>← Back to API</span>
            </a>
          </div>
        </div>

        {/* Interactive API Tester */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6">🚀 Test the API Live</h2>
          <p className="text-gray-600 mb-6">
            Try our API right here! Enter your API key below to test the Invoice Generation endpoint.
          </p>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your API Key
              </label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="dcl_sk_your_api_key_here"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-sm text-gray-500 mt-1">
                Don't have an API key? <a href="/api-keys" className="text-blue-600 hover:underline">Get one free here</a>
              </p>
            </div>
            
            <button
              onClick={testApiEndpoint}
              disabled={isTestinng || !apiKey}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium px-6 py-3 rounded-lg transition-all flex items-center space-x-2"
            >
              {isTestinng ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Testing...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  <span>Test Invoice API</span>
                </>
              )}
            </button>
            
            {testResult && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  API Response
                </label>
                <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto">
                  {testResult}
                </pre>
              </div>
            )}
          </div>
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

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">📋 Proposal Generation</h3>
            <p className="text-gray-600 mb-4">Create professional business proposals</p>
            <div className="bg-gray-100 p-4 rounded-lg text-sm">
              <pre>
{`POST /v1/proposals/generate

{
  "businessType": "Software Development",
  "projectType": "Website Development",
  "clientInfo": "Acme Corp",
  "projectScope": "Modern responsive website"
}`}
              </pre>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">📱 Social Media Scheduler</h3>
            <p className="text-gray-600 mb-4">Schedule posts across multiple platforms</p>
            <div className="bg-gray-100 p-4 rounded-lg text-sm">
              <pre>
{`POST /v1/social/schedule

{
  "content": "Check out our new AI tools!",
  "platforms": ["facebook", "twitter"],
  "scheduledTime": "2024-07-04T14:00:00Z",
  "contentType": "text"
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