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
      invoice_id, 
      send_reminders = true, 
      reminder_schedule = [7, 3, 1], 
      custom_message 
    } = await request.json()

    // Validate required fields
    if (!invoice_id) {
      return createErrorResponse('Missing required field: invoice_id', 400)
    }

    // Mock email sending - in production, integrate with Resend, SendGrid, etc.
    const emailSentAt = new Date().toISOString()
    
    // Calculate reminder dates
    const reminderDates = reminder_schedule.map(days => {
      const date = new Date()
      date.setDate(date.getDate() + days)
      return date.toISOString()
    })

    const response = {
      status: 'sent',
      invoice_id,
      email_sent_at: emailSentAt,
      custom_message,
      send_reminders,
      reminder_schedule: send_reminders ? reminderDates : [],
      delivery_status: 'delivered',
      email_id: `email_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      tracking: {
        opened: false,
        clicked: false,
        bounced: false
      }
    }

    return NextResponse.json(response)

  } catch (error) {
    console.error('Email sending error:', error)
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