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
      businessType, 
      emailType, 
      tone = 'professional',
      customizations = {}
    } = await request.json()

    // Validate required fields
    if (!businessType || !emailType) {
      return createErrorResponse('Missing required fields: businessType, emailType', 400)
    }

    // Email templates based on your existing email generator
    const emailTemplates = generateEmailTemplate(businessType, emailType, tone, customizations)

    const response = {
      templates: [emailTemplates],
      metadata: {
        businessType,
        emailType,
        tone,
        estimatedOpenRate: calculateOpenRate(emailType, tone),
        estimatedClickRate: calculateClickRate(emailType, tone),
        readingTime: Math.ceil(emailTemplates.body.length / 200) + ' minutes',
        wordCount: emailTemplates.body.split(' ').length
      },
      suggestions: [
        'Test different subject lines for better open rates',
        'Personalize the email with recipient-specific details',
        'Include a clear call-to-action',
        'Keep the email concise and scannable'
      ]
    }

    return NextResponse.json(response)

  } catch (error) {
    console.error('Email generation error:', error)
    return createErrorResponse('Internal server error', 500)
  }
}

function generateEmailTemplate(businessType: string, emailType: string, tone: string, customizations: any) {
  const { companyName = '[Your Company]', recipientName = '[Customer Name]' } = customizations

  const subjects = {
    'Welcome Email': `Welcome to ${companyName}!`,
    'Sales Pitch': `Transform Your Business with Our ${businessType} Solutions`,
    'Follow-up': `Following Up on Our Recent Conversation`,
    'Newsletter': `This Week in ${businessType}: Must-Know Updates`,
    'Product Launch': `Introducing: The Future of ${businessType}`
  }

  const intros = {
    professional: {
      'Welcome Email': `We're thrilled to have you join our ${businessType} community. Your journey with us begins today, and we're committed to providing you with exceptional service.`,
      'Sales Pitch': `I hope this email finds you well. I'm reaching out because I believe our ${businessType} solutions can significantly benefit your organization.`,
      'Follow-up': `Thank you for taking the time to speak with me earlier. As promised, I'm following up with additional information about our ${businessType} services.`
    },
    friendly: {
      'Welcome Email': `Welcome aboard! We're so excited to have you as part of our ${businessType} family. Get ready for an amazing experience!`,
      'Sales Pitch': `I noticed you've been looking for ways to improve your business operations. I think I have just the solution for you!`,
      'Follow-up': `It was great chatting with you! As we discussed, I wanted to send over some more details about how we can help.`
    },
    casual: {
      'Welcome Email': `Hey there! Welcome to the team! We're pumped to have you join our ${businessType} crew.`,
      'Sales Pitch': `Quick question - are you tired of dealing with inefficient processes? Because we've got something that might just change your game.`,
      'Follow-up': `Hey! Just wanted to follow up on our conversation. Here's that info I mentioned.`
    }
  }

  const bodies = {
    'Welcome Email': `Here's what you can expect:\n• Access to exclusive ${businessType} resources\n• Regular updates and insights\n• Dedicated support team\n• Special member benefits\n\nTo get started, simply log in to your account and explore all the features available to you.`,
    'Sales Pitch': `Our ${businessType} solution offers:\n• 30% increase in efficiency\n• Seamless integration with existing systems\n• 24/7 customer support\n• Competitive pricing\n\nI'd love to schedule a quick 15-minute demo to show you exactly how this can transform your operations.`,
    'Follow-up': `As we discussed, our ${businessType} service can help you:\n• Streamline your processes\n• Reduce operational costs\n• Improve customer satisfaction\n\nI've attached a detailed proposal for your review. Please let me know if you have any questions.`
  }

  const closings = {
    professional: 'We look forward to a long and successful partnership.',
    friendly: 'Looking forward to helping you succeed!',
    casual: 'Let\'s do this!'
  }

  const toneIntros = intros[tone as keyof typeof intros] || intros.professional
  const intro = toneIntros[emailType as keyof typeof toneIntros] || `Thank you for your interest in our ${businessType} services.`
  const body = bodies[emailType as keyof typeof bodies] || `We're here to help you succeed in your ${businessType} journey.`
  const closing = closings[tone as keyof typeof closings] || 'Thank you for your time and consideration.'

  return {
    subject: subjects[emailType as keyof typeof subjects] || `Important ${businessType} Update`,
    body: `Dear ${recipientName},\n\n${intro}\n\n${body}\n\n${closing}\n\nBest regards,\n[Your Name]\n${companyName}`,
    tone,
    emailType
  }
}

function calculateOpenRate(emailType: string, tone: string): string {
  const baseRates = {
    'Welcome Email': 45,
    'Sales Pitch': 22,
    'Follow-up': 28,
    'Newsletter': 25,
    'Product Launch': 35
  }
  
  const toneModifier = tone === 'friendly' ? 1.1 : tone === 'casual' ? 1.05 : 1.0
  const rate = (baseRates[emailType as keyof typeof baseRates] || 24) * toneModifier
  
  return `${Math.round(rate)}%`
}

function calculateClickRate(emailType: string, tone: string): string {
  const baseRates = {
    'Welcome Email': 8,
    'Sales Pitch': 3,
    'Follow-up': 5,
    'Newsletter': 4,
    'Product Launch': 6
  }
  
  const toneModifier = tone === 'friendly' ? 1.15 : tone === 'casual' ? 1.1 : 1.0
  const rate = (baseRates[emailType as keyof typeof baseRates] || 4.2) * toneModifier
  
  return `${rate.toFixed(1)}%`
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