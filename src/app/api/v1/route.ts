import { NextResponse } from 'next/server'

export async function GET() {
  const apiInfo = {
    name: 'DevCraft Labs API',
    version: '1.0.0',
    description: 'Professional AI tools API for businesses, developers, and AEC professionals',
    status: 'operational',
    uptime: '99.9%',
    endpoints: {
      authentication: '/v1/auth',
      invoices: {
        generate: '/v1/invoices/generate',
        send: '/v1/invoices/send'
      },
      email: {
        generate: '/v1/email/generate'
      },
      landing: {
        generate: '/v1/landing/generate'
      },
      content: {
        generate: '/v1/content/generate'
      },
      revit: {
        prompts: '/v1/revit/prompts'
      }
    },
    rate_limits: {
      free: '100 requests/hour',
      pro: '1,000 requests/hour',
      enterprise: '10,000 requests/hour'
    },
    documentation: 'https://devcraft-labs.com/docs',
    support: 'support@devcraft-labs.com',
    timestamp: new Date().toISOString()
  }

  return NextResponse.json(apiInfo)
}

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}