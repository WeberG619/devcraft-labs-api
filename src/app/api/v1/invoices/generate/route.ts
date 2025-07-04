import { NextRequest, NextResponse } from 'next/server'
import { validateAPIKey, checkRateLimit, incrementUsage, extractAPIKey, createErrorResponse } from '@/lib/auth'

export async function POST(request: NextRequest) {
  // API Authentication
  const apiKey = extractAPIKey(request)
  if (!apiKey) {
    return createErrorResponse('Missing API key. Include Authorization: Bearer YOUR_API_KEY', 401)
  }

  const apiKeyData = validateAPIKey(apiKey)
  if (!apiKeyData) {
    return createErrorResponse('Invalid API key', 401)
  }

  if (!checkRateLimit(apiKeyData)) {
    return createErrorResponse('Rate limit exceeded. Please upgrade your plan or try again later.', 429)
  }

  incrementUsage(apiKeyData)

  try {
    const { 
      client_name, 
      client_email, 
      amount, 
      description, 
      due_date, 
      currency = 'USD',
      enhance_description = false 
    } = await request.json()

    // Validate required fields
    if (!client_name || !amount) {
      return createErrorResponse('Missing required fields: client_name, amount', 400)
    }

    // Generate invoice
    const invoiceId = `inv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const issueDate = new Date().toISOString()
    const calculatedDueDate = due_date || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]

    // AI enhancement for description (mock implementation)
    let enhancedDescription = description
    if (enhance_description && description) {
      enhancedDescription = `Professional ${description.toLowerCase()} services including comprehensive analysis, implementation, and ongoing support with detailed documentation and best practices`
    }

    const invoice = {
      invoice_id: invoiceId,
      status: 'created',
      client_name,
      client_email,
      amount: parseFloat(amount),
      currency,
      description: enhancedDescription || description,
      issue_date: issueDate,
      due_date: calculatedDueDate,
      pdf_url: `https://invoices.devcraft-labs.com/${invoiceId}.pdf`,
      payment_link: `https://pay.devcraft-labs.com/${invoiceId}`,
      created_at: issueDate,
      enhanced_description: enhance_description,
      recommendations: [
        'Include clear payment terms and late fee policy',
        'Add your business contact information',
        'Specify scope of work to avoid disputes',
        'Consider offering early payment discounts'
      ]
    }

    return NextResponse.json(invoice)

  } catch (error) {
    console.error('Invoice generation error:', error)
    return createErrorResponse('Internal server error', 500)
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}