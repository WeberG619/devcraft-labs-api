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
    const { industry, goal, targetAudience, brandColors } = await request.json()

    // Validate required fields
    if (!industry || !goal) {
      return createErrorResponse('Missing required fields: industry, goal', 400)
    }

    // Landing page templates based on your existing landing page builder
    const landingPageTemplates = {
      'SaaS/Software': {
        'Start Free Trial': {
          headline: 'Transform Your Business with Cutting-Edge AI Technology',
          subheadline: 'Join 50,000+ companies using our platform to automate workflows and boost productivity by 40%',
          cta: 'Start Your Free 14-Day Trial',
          benefits: [
            'No Credit Card Required',
            'Setup in Under 5 Minutes', 
            'Cancel Anytime',
            'Enterprise-Grade Security'
          ],
          socialProof: 'Trusted by Fortune 500 companies',
          conversionTips: [
            'Remove navigation to reduce distractions',
            'Add customer logos for credibility',
            'Include money-back guarantee',
            'Use urgency with limited-time offers'
          ]
        },
        'Generate Leads': {
          headline: 'Download Our Free Guide: 10 Ways to Automate Your Business',
          subheadline: 'Learn the proven strategies that helped 1000+ businesses reduce manual work by 60%',
          cta: 'Get Your Free Guide Now',
          benefits: [
            '47-Page Comprehensive Guide',
            'Real Case Studies & Examples',
            'Step-by-Step Implementation',
            'Bonus: Templates & Checklists'
          ],
          socialProof: 'Downloaded by 25,000+ business owners',
          conversionTips: [
            'Gate content with just email address',
            'Preview guide contents to build value',
            'Add testimonials from guide users',
            'Include download count for social proof'
          ]
        }
      },
      'E-commerce': {
        'Sell Product': {
          headline: 'Revolutionary Fitness Tracker - Now 40% Off',
          subheadline: 'Track your health, reach your goals, and transform your life with advanced AI-powered insights',
          cta: 'Order Now - Limited Time',
          benefits: [
            '7-Day Heart Rate Monitoring',
            'Sleep Quality Analysis',
            'Workout Optimization',
            'Free Mobile App'
          ],
          socialProof: '15,000+ five-star reviews',
          conversionTips: [
            'Show product in use with lifestyle images',
            'Add scarcity with stock countdown',
            'Display customer reviews prominently',
            'Offer money-back guarantee'
          ]
        }
      }
    }

    const template = landingPageTemplates[industry as keyof typeof landingPageTemplates]?.[goal as keyof any] || 
                     landingPageTemplates['SaaS/Software']['Start Free Trial']

    const generatedPage = {
      elements: [
        {
          id: '1',
          type: 'header',
          content: template.headline,
          styles: {
            fontSize: '3rem',
            fontWeight: 'bold',
            textAlign: 'center',
            textColor: '#1F2937',
            padding: '4rem 2rem 2rem 2rem'
          }
        },
        {
          id: '2', 
          type: 'text',
          content: template.subheadline,
          styles: {
            fontSize: '1.25rem',
            textAlign: 'center',
            textColor: '#6B7280',
            padding: '0 2rem 2rem 2rem'
          }
        },
        {
          id: '3',
          type: 'button',
          content: template.cta,
          styles: {
            backgroundColor: brandColors?.primary || '#3B82F6',
            textColor: '#FFFFFF',
            fontSize: '1.125rem',
            fontWeight: 'bold',
            padding: '1rem 2rem',
            borderRadius: '0.5rem',
            textAlign: 'center',
            margin: '0 auto 3rem auto',
            width: 'fit-content'
          }
        },
        {
          id: '4',
          type: 'text',
          content: `✓ ${template.benefits.join('\\n✓ ')}`,
          styles: {
            fontSize: '1.125rem',
            textAlign: 'center',
            textColor: '#059669',
            padding: '2rem',
            backgroundColor: '#F0FDF4',
            borderRadius: '0.5rem',
            margin: '2rem'
          }
        },
        {
          id: '5',
          type: 'text',
          content: template.socialProof,
          styles: {
            fontSize: '1rem',
            textAlign: 'center',
            textColor: '#6B7280',
            padding: '1rem 2rem 3rem 2rem',
            fontStyle: 'italic'
          }
        }
      ],
      conversionOptimizations: template.conversionTips,
      estimatedConversionRate: calculateConversionRate(industry, goal),
      recommendations: generateRecommendations(industry, goal),
      metadata: {
        industry,
        goal,
        targetAudience,
        brandColors,
        generated_at: new Date().toISOString()
      }
    }

    return NextResponse.json({ landingPage: generatedPage })

  } catch (error) {
    console.error('Landing page generation error:', error)
    return createErrorResponse('Internal server error', 500)
  }
}

function calculateConversionRate(industry: string, goal: string): string {
  const rates = {
    'SaaS/Software': {
      'Start Free Trial': '8.5%',
      'Generate Leads': '12.3%',
      'Download App': '6.7%'
    },
    'E-commerce': {
      'Sell Product': '2.8%',
      'Collect Emails': '15.2%',
      'Generate Leads': '11.1%'
    },
    'Consulting': {
      'Book Appointments': '18.7%',
      'Generate Leads': '14.3%',
      'Request Quote': '9.2%'
    }
  }

  return rates[industry as keyof typeof rates]?.[goal as keyof any] || '8.5%'
}

function generateRecommendations(industry: string, goal: string): string[] {
  const baseRecommendations = [
    'Remove navigation menu to reduce distractions',
    'Add customer testimonials with photos for credibility',
    'Include money-back guarantee to reduce risk',
    'Use contrasting colors for call-to-action buttons',
    'Optimize for mobile devices (60% of traffic)',
    'Add security badges and trust signals'
  ]

  const industrySpecific = {
    'SaaS/Software': [
      'Offer free trial instead of demo',
      'Show integration logos for credibility',
      'Include ROI calculator or savings estimator',
      'Add live chat for immediate support'
    ],
    'E-commerce': [
      'Display product reviews and ratings',
      'Show shipping costs upfront',
      'Add cart abandonment recovery',
      'Include product comparison features'
    ]
  }

  return [
    ...baseRecommendations.slice(0, 4),
    ...(industrySpecific[industry as keyof typeof industrySpecific] || [])
  ]
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