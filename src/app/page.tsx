'use client'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { MessageCircle, X, Send, Bot, Copy, CheckCircle, Key, ExternalLink } from 'lucide-react'

interface ChatMessage {
  text: string
  isUser: boolean
  timestamp: Date
}

export default function APIHomePage() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [chatInput, setChatInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [mounted, setMounted] = useState(false)
  const chatEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
    setChatMessages([{
      text: "Hi! I'm your DevCraft Labs API assistant. I can help you with API endpoints, authentication, code examples, and getting your API key. What would you like to know?",
      isUser: false,
      timestamp: new Date()
    }])
  }, [])

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [chatMessages])

  const getAIResponse = (message: string) => {
    const lowerMessage = message.toLowerCase()
    
    if (lowerMessage.includes('api key') || lowerMessage.includes('authentication') || lowerMessage.includes('auth')) {
      return "To get your API key: 1) Click the 'Get API Key' button on this page, 2) Sign up for a free account, 3) Generate your API key from the dashboard. Free tier includes 100 requests/hour. All keys start with 'dcl_sk_' for security. Need help with authentication? I can show you examples!"
    }
    
    if (lowerMessage.includes('invoice') || lowerMessage.includes('billing')) {
      return "Our Invoice API generates professional invoices with AI descriptions! Use POST /api/v1/invoices/generate with client_name, amount, and description. Example: curl -X POST https://devcraft-labs-api.vercel.app/api/v1/invoices/generate -H 'Authorization: Bearer YOUR_KEY' -d '{\"client_name\":\"Test Corp\",\"amount\":100.00}'"
    }
    
    if (lowerMessage.includes('email') || lowerMessage.includes('content')) {
      return "Generate professional emails with POST /api/v1/email/generate! Specify businessType, emailType, tone, and customizations. Perfect for sales, marketing, and business communications. Want to see a full example?"
    }
    
    if (lowerMessage.includes('landing') || lowerMessage.includes('page')) {
      return "Create high-converting landing pages with POST /api/v1/landing/generate! Specify industry, goal, target audience, and brand colors. Get conversion optimization tips and estimated conversion rates. Try it now!"
    }
    
    if (lowerMessage.includes('rate limit') || lowerMessage.includes('pricing')) {
      return "Rate limits: Free (100/hr), Pro (1,000/hr), Enterprise (10,000/hr). All plans include 24/7 support and enterprise security. Upgrade anytime from your dashboard. No setup fees!"
    }
    
    if (lowerMessage.includes('example') || lowerMessage.includes('demo')) {
      return "Here's a quick example: curl -X POST https://devcraft-labs-api.vercel.app/api/v1/invoices/generate -H 'Authorization: Bearer dcl_sk_YOUR_KEY' -H 'Content-Type: application/json' -d '{\"client_name\":\"Demo Client\",\"amount\":99.99,\"description\":\"Professional services\"}'. Want examples for other endpoints?"
    }
    
    if (lowerMessage.includes('error') || lowerMessage.includes('help') || lowerMessage.includes('support')) {
      return "Common solutions: 1) Check your API key format (starts with dcl_sk_), 2) Verify request headers include Authorization and Content-Type, 3) Ensure JSON is valid, 4) Check rate limits. Still need help? Visit our docs at /docs or contact support!"
    }
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return "Hello! Welcome to DevCraft Labs API! I can help you with endpoints, authentication, examples, and getting started. Try asking about API keys, invoice generation, email content, or landing pages. What interests you most?"
    }
    
    return "I can help you with API endpoints, authentication, code examples, rate limits, and getting your API key. Try asking about specific endpoints like invoices, emails, or landing pages. Or ask 'how do I get an API key?' to get started!"
  }

  const handleSendMessage = () => {
    if (!chatInput.trim()) return
    
    const userMessage = { text: chatInput, isUser: true, timestamp: new Date() }
    setChatMessages(prev => [...prev, userMessage])
    setChatInput('')
    setIsTyping(true)
    
    setTimeout(() => {
      const aiResponse = getAIResponse(chatInput)
      const aiMessage = { text: aiResponse, isUser: false, timestamp: new Date() }
      setChatMessages(prev => [...prev, aiMessage])
      setIsTyping(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/DCL-logo.png"
                alt="DevCraft Labs Logo"
                width={80}
                height={80}
                className="w-full h-full object-contain"
              />
            </div>
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
          <p className="text-gray-600 mb-6">
            All API endpoints require authentication using API keys. Get started with your free API key below.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/api-keys" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-all inline-flex items-center space-x-2"
            >
              <Key className="w-4 h-4" />
              <span>Get Your API Key</span>
            </a>
            <a 
              href="/docs" 
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium px-6 py-3 rounded-lg transition-all inline-flex items-center space-x-2"
            >
              <ExternalLink className="w-4 h-4" />
              <span>View Documentation</span>
            </a>
          </div>
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

      {/* Chatbot Widget */}
      {mounted && (
        isChatOpen ? (
          <div className="fixed bottom-6 right-6 w-80 h-96 bg-white rounded-xl shadow-2xl border border-gray-200 flex flex-col z-50">
            <div className="bg-blue-600 text-white p-4 rounded-t-xl flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bot className="w-5 h-5" />
                <span className="font-medium">API Assistant</span>
              </div>
              <button
                onClick={() => setIsChatOpen(false)}
                className="text-white/80 hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {chatMessages.map((message, index) => (
                <div key={index} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[75%] px-3 py-2 rounded-lg text-sm ${
                    message.isUser 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    <p>{message.text}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 px-3 py-2 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={chatEndRef} />
            </div>
            
            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask about API keys, endpoints..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!chatInput.trim()}
                  className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setIsChatOpen(true)}
            className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center z-50 transition-all duration-200 hover:scale-110"
          >
            <MessageCircle className="w-6 h-6" />
          </button>
        )
      )}
    </div>
  )
}