'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Copy, Eye, EyeOff, Key, Shield, Zap, RefreshCw, AlertCircle, CheckCircle, ExternalLink, ArrowLeft, CreditCard, Users, Activity } from 'lucide-react'

export default function APIKeysPage() {
  const [apiKey, setApiKey] = useState('')
  const [showKey, setShowKey] = useState(false)
  const [keyGenerated, setKeyGenerated] = useState(false)
  const [copied, setCopied] = useState(false)
  const [email, setEmail] = useState('')
  const [businessName, setBusinnessName] = useState('')
  const [plan, setPlan] = useState('free')
  const [isGenerating, setIsGenerating] = useState(false)

  // Generate a mock API key
  const generateApiKey = () => {
    if (!email || !businessName) {
      alert('Please fill in all required fields')
      return
    }
    
    setIsGenerating(true)
    
    // Simulate API call delay
    setTimeout(() => {
      const randomKey = 'dcl_sk_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
      setApiKey(randomKey)
      setKeyGenerated(true)
      setIsGenerating(false)
    }, 2000)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(apiKey)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const codeExamples = [
    {
      title: 'Generate Invoice',
      language: 'bash',
      code: `curl -X POST https://devcraft-labs-api.vercel.app/api/v1/invoices/generate \\
  -H "Authorization: Bearer ${apiKey || 'YOUR_API_KEY'}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "client_name": "Acme Corp",
    "amount": 1500.00,
    "description": "Web development services",
    "due_date": "2024-08-15"
  }'`
    },
    {
      title: 'Generate Email Content',
      language: 'bash',
      code: `curl -X POST https://devcraft-labs-api.vercel.app/api/v1/email/generate \\
  -H "Authorization: Bearer ${apiKey || 'YOUR_API_KEY'}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "businessType": "SaaS",
    "emailType": "Sales Pitch",
    "tone": "professional",
    "customizations": {
      "companyName": "Your Company",
      "recipientName": "John Smith"
    }
  }'`
    },
    {
      title: 'Generate Landing Page',
      language: 'bash',
      code: `curl -X POST https://devcraft-labs-api.vercel.app/api/v1/landing/generate \\
  -H "Authorization: Bearer ${apiKey || 'YOUR_API_KEY'}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "industry": "Technology",
    "goal": "Generate leads",
    "targetAudience": "small business owners",
    "brandColors": {
      "primary": "#3B82F6",
      "secondary": "#10B981"
    }
  }'`
    }
  ]

  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: '/month',
      requests: '100 requests/hour',
      features: [
        'All API endpoints',
        'Basic support',
        'Community access',
        'Standard rate limits'
      ],
      popular: false
    },
    {
      name: 'Pro',
      price: '$29',
      period: '/month',
      requests: '1,000 requests/hour',
      features: [
        'All API endpoints',
        'Priority support',
        'Advanced analytics',
        'Webhook notifications',
        'Custom integrations'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: '$99',
      period: '/month',
      requests: '10,000 requests/hour',
      features: [
        'All API endpoints',
        'Dedicated support',
        'Advanced analytics',
        'Webhook notifications',
        'Custom integrations',
        'SLA guarantee',
        'Custom rate limits'
      ],
      popular: false
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to API Home
          </Link>
          <div className="mb-6">
            <div className="flex justify-center mb-6">
              <Image
                src="/DCL-logo.png"
                alt="DevCraft Labs Logo"
                width={81}
                height={48}
              />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2 text-center">Get Your API Key</h1>
            <p className="text-xl text-gray-600 text-center">Start building with our API in minutes</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* API Key Generation */}
          <div className="bg-white rounded-xl shadow-md p-8">
            <div className="flex items-center mb-6">
              <Key className="w-6 h-6 text-blue-600 mr-3" />
              <h2 className="text-2xl font-semibold text-gray-900">Generate API Key</h2>
            </div>

            {!keyGenerated ? (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="your@business.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business/Company Name *
                  </label>
                  <input
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinnessName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your Business Name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Plan
                  </label>
                  <select
                    value={plan}
                    onChange={(e) => setPlan(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="free">Free - 100 requests/hour</option>
                    <option value="pro">Pro - 1,000 requests/hour ($29/mo)</option>
                    <option value="enterprise">Enterprise - 10,000 requests/hour ($99/mo)</option>
                  </select>
                </div>

                <button
                  onClick={generateApiKey}
                  disabled={isGenerating || !email || !businessName}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-4 px-6 rounded-lg transition-all flex items-center justify-center space-x-2"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Generating...</span>
                    </>
                  ) : (
                    <>
                      <Key className="w-4 h-4" />
                      <span>Generate Free API Key</span>
                    </>
                  )}
                </button>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <Shield className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-blue-900 mb-1">Secure & Instant</h4>
                      <p className="text-blue-700 text-sm">
                        Your API key is generated securely and ready to use immediately. 
                        Start with 100 free requests per hour.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                    <h3 className="font-medium text-green-900">API Key Generated Successfully!</h3>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your API Key
                  </label>
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 relative">
                      <input
                        type={showKey ? 'text' : 'password'}
                        value={apiKey}
                        readOnly
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 font-mono text-sm"
                      />
                    </div>
                    <button
                      onClick={() => setShowKey(!showKey)}
                      className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={copyToClipboard}
                      className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
                    >
                      <Copy className="w-4 h-4" />
                      {copied && <span className="text-xs">Copied!</span>}
                    </button>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-amber-900 mb-1">Keep Your API Key Secure</h4>
                      <ul className="text-amber-700 text-sm space-y-1">
                        <li>• Never expose your API key in client-side code</li>
                        <li>• Store it securely in environment variables</li>
                        <li>• Regenerate if compromised</li>
                        <li>• Monitor usage for unusual activity</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="font-semibold text-gray-900">Plan</div>
                    <div className="text-lg text-blue-600 capitalize">{plan}</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="font-semibold text-gray-900">Rate Limit</div>
                    <div className="text-lg text-blue-600">
                      {plan === 'free' ? '100/hr' : plan === 'pro' ? '1,000/hr' : '10,000/hr'}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Start Guide */}
          <div className="bg-white rounded-xl shadow-md p-8">
            <div className="flex items-center mb-6">
              <Zap className="w-6 h-6 text-green-600 mr-3" />
              <h2 className="text-2xl font-semibold text-gray-900">Quick Start</h2>
            </div>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium mr-4">
                  1
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Generate Your API Key</h3>
                  <p className="text-gray-600 text-sm">
                    Fill out the form on the left to get your free API key instantly.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium mr-4">
                  2
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Make Your First Request</h3>
                  <p className="text-gray-600 text-sm mb-2">
                    Test your API key with a simple request:
                  </p>
                  <div className="bg-gray-900 text-gray-100 p-3 rounded-lg text-xs font-mono overflow-x-auto">
                    <div className="text-green-400"># Test your API key</div>
                    <div>curl -H "Authorization: Bearer {apiKey || 'YOUR_API_KEY'}" \</div>
                    <div className="ml-4">https://devcraft-labs-api.vercel.app/api/v1/</div>
                  </div>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium mr-4">
                  3
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Explore Endpoints</h3>
                  <p className="text-gray-600 text-sm">
                    Check out our comprehensive documentation and code examples below.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <div className="flex space-x-4">
                  <Link href="/docs" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg text-center transition-all">
                    View Docs
                  </Link>
                  <Link href="/" className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg text-center transition-all">
                    API Home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Plans */}
        <div className="mt-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Plan</h2>
            <p className="text-xl text-gray-600">Start free, upgrade as you grow</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((planItem, index) => (
              <div key={index} className={`bg-white rounded-xl shadow-md p-8 relative ${planItem.popular ? 'ring-2 ring-blue-600' : ''}`}>
                {planItem.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{planItem.name}</h3>
                  <div className="flex items-center justify-center">
                    <span className="text-4xl font-bold text-gray-900">{planItem.price}</span>
                    <span className="text-gray-600 ml-1">{planItem.period}</span>
                  </div>
                  <p className="text-blue-600 font-medium mt-2">{planItem.requests}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {planItem.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className={`w-full py-3 px-4 rounded-lg font-medium transition-all ${
                  planItem.popular 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                }`}>
                  {planItem.name === 'Free' ? 'Get Started Free' : `Upgrade to ${planItem.name}`}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Code Examples */}
        {keyGenerated && (
          <div className="mt-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready-to-Use Examples</h2>
              <p className="text-xl text-gray-600">Copy and paste these examples to get started immediately</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {codeExamples.map((example, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="bg-gray-900 text-white p-4 flex items-center justify-between">
                    <h3 className="font-medium">{example.title}</h3>
                    <button
                      onClick={() => navigator.clipboard.writeText(example.code)}
                      className="text-gray-400 hover:text-white"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="p-4">
                    <pre className="text-xs text-gray-800 overflow-x-auto">
                      <code>{example.code}</code>
                    </pre>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Features Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Enterprise Security</h3>
            <p className="text-gray-600 text-sm">
              Bank-level encryption, secure authentication, and comprehensive monitoring
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <Activity className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">99.9% Uptime</h3>
            <p className="text-gray-600 text-sm">
              Reliable infrastructure with guaranteed uptime and 24/7 monitoring
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <Users className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">24/7 Support</h3>
            <p className="text-gray-600 text-sm">
              Expert support team ready to help with integration and troubleshooting
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}