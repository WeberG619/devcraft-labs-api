import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

// Simple API key validation
function validateApiKey(authHeader: string | null): boolean {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return false
  }
  
  const apiKey = authHeader.replace('Bearer ', '')
  return apiKey.startsWith('dcl_sk_') && apiKey.length > 10
}

interface SocialPost {
  id: string
  content: string
  platforms: string[]
  scheduledTime: string
  contentType: string
  status: 'scheduled' | 'published' | 'failed'
  createdAt: string
  mediaUrls?: string[]
  hashtags?: string[]
  mentions?: string[]
}

export async function POST(request: Request) {
  try {
    // Validate API key
    const headersList = headers()
    const authorization = headersList.get('authorization')
    
    if (!validateApiKey(authorization)) {
      return NextResponse.json(
        { error: 'Invalid or missing API key. Please provide a valid API key in the Authorization header.' },
        { status: 401 }
      )
    }

    const { content, platforms, scheduledTime, contentType, mediaUrls, hashtags } = await request.json()

    // Validate required fields
    if (!content || !platforms || !Array.isArray(platforms) || platforms.length === 0) {
      return NextResponse.json(
        { error: 'Missing required fields: content and platforms (array) are required.' },
        { status: 400 }
      )
    }

    // Validate platforms
    const supportedPlatforms = [
      'facebook', 'instagram', 'twitter', 'linkedin', 'tiktok', 'youtube',
      'threads', 'snapchat', 'mastodon', 'pinterest', 'reddit', 'discord'
    ]
    
    const invalidPlatforms = platforms.filter((p: string) => !supportedPlatforms.includes(p))
    if (invalidPlatforms.length > 0) {
      return NextResponse.json(
        { error: `Unsupported platforms: ${invalidPlatforms.join(', ')}. Supported platforms: ${supportedPlatforms.join(', ')}` },
        { status: 400 }
      )
    }

    // Generate optimized content for each platform
    const optimizedContent = generatePlatformOptimizedContent(content, platforms, contentType)
    
    // Create social media post
    const socialPost: SocialPost = {
      id: `post_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`,
      content: content,
      platforms: platforms,
      scheduledTime: scheduledTime || new Date(Date.now() + 3600000).toISOString(), // Default to 1 hour from now
      contentType: contentType || 'text',
      status: 'scheduled',
      createdAt: new Date().toISOString(),
      mediaUrls: mediaUrls || [],
      hashtags: extractHashtags(content),
      mentions: extractMentions(content)
    }

    // Generate engagement predictions
    const engagementPredictions = generateEngagementPredictions(platforms, contentType, content)
    
    // Get optimal posting times
    const optimalTimes = getOptimalPostingTimes(platforms)
    
    // Generate content suggestions
    const suggestions = generateContentSuggestions(content, platforms, contentType)

    return NextResponse.json({
      success: true,
      post: socialPost,
      optimizedContent: optimizedContent,
      engagementPredictions: engagementPredictions,
      optimalTimes: optimalTimes,
      suggestions: suggestions,
      message: 'Social media post scheduled successfully'
    })

  } catch (error) {
    console.error('Social media scheduling error:', error)
    return NextResponse.json(
      { error: 'Failed to schedule social media post. Please try again.' },
      { status: 500 }
    )
  }
}

export async function GET(request: Request) {
  try {
    // Validate API key
    const headersList = headers()
    const authorization = headersList.get('authorization')
    
    if (!validateApiKey(authorization)) {
      return NextResponse.json(
        { error: 'Invalid or missing API key. Please provide a valid API key in the Authorization header.' },
        { status: 401 }
      )
    }

    // Get query parameters
    const url = new URL(request.url)
    const status = url.searchParams.get('status')
    const platform = url.searchParams.get('platform')
    const limit = parseInt(url.searchParams.get('limit') || '50')

    // Mock scheduled posts data (in real implementation, this would come from a database)
    const scheduledPosts: SocialPost[] = [
      {
        id: 'post_example_1',
        content: 'Exciting news! Our AI tools are helping businesses automate workflows and boost productivity by 40%. Try our free trial today! #AI #Productivity #Business',
        platforms: ['facebook', 'linkedin', 'twitter'],
        scheduledTime: new Date(Date.now() + 7200000).toISOString(),
        contentType: 'text',
        status: 'scheduled',
        createdAt: new Date(Date.now() - 3600000).toISOString(),
        hashtags: ['#AI', '#Productivity', '#Business'],
        mentions: []
      },
      {
        id: 'post_example_2',
        content: 'Behind the scenes: How we build AI solutions that make a difference 🚀',
        platforms: ['instagram', 'facebook'],
        scheduledTime: new Date(Date.now() + 10800000).toISOString(),
        contentType: 'image',
        status: 'scheduled',
        createdAt: new Date(Date.now() - 1800000).toISOString(),
        hashtags: ['#BehindTheScenes', '#AI', '#Innovation'],
        mentions: []
      }
    ]

    // Filter posts based on query parameters
    let filteredPosts = scheduledPosts
    
    if (status) {
      filteredPosts = filteredPosts.filter(post => post.status === status)
    }
    
    if (platform) {
      filteredPosts = filteredPosts.filter(post => post.platforms.includes(platform))
    }

    // Limit results
    filteredPosts = filteredPosts.slice(0, limit)

    return NextResponse.json({
      success: true,
      posts: filteredPosts,
      total: filteredPosts.length,
      message: 'Scheduled posts retrieved successfully'
    })

  } catch (error) {
    console.error('Scheduled posts retrieval error:', error)
    return NextResponse.json(
      { error: 'Failed to retrieve scheduled posts. Please try again.' },
      { status: 500 }
    )
  }
}

function generatePlatformOptimizedContent(content: string, platforms: string[], contentType: string) {
  const optimized: { [key: string]: { content: string, recommendations: string[] } } = {}

  platforms.forEach(platform => {
    let optimizedContent = content
    let recommendations: string[] = []

    switch (platform) {
      case 'twitter':
        // Twitter optimization
        if (content.length > 280) {
          optimizedContent = content.substring(0, 277) + '...'
          recommendations.push('Content truncated to fit Twitter\'s 280 character limit')
        }
        recommendations.push('Consider adding trending hashtags for better reach')
        recommendations.push('Tag relevant accounts to increase engagement')
        break

      case 'linkedin':
        // LinkedIn optimization
        if (!content.includes('#')) {
          recommendations.push('Add professional hashtags to increase visibility')
        }
        recommendations.push('Consider adding industry-specific insights')
        recommendations.push('Tag colleagues or business partners for better engagement')
        break

      case 'instagram':
        // Instagram optimization
        const hashtagCount = (content.match(/#/g) || []).length
        if (hashtagCount < 5) {
          recommendations.push('Add more hashtags (up to 30) for better discoverability')
        }
        recommendations.push('Consider adding emojis to increase engagement')
        recommendations.push('Add a call-to-action in your caption')
        break

      case 'facebook':
        // Facebook optimization
        recommendations.push('Ask a question to encourage comments')
        recommendations.push('Post when your audience is most active')
        recommendations.push('Use engaging visuals to increase reach')
        break

      case 'tiktok':
        // TikTok optimization
        recommendations.push('Use trending sounds and effects')
        recommendations.push('Include trending hashtags')
        recommendations.push('Keep content short and engaging (15-60 seconds)')
        break

      default:
        recommendations.push('Optimize content for platform-specific best practices')
    }

    optimized[platform] = {
      content: optimizedContent,
      recommendations: recommendations
    }
  })

  return optimized
}

function generateEngagementPredictions(platforms: string[], contentType: string, content: string) {
  const predictions: { [key: string]: { estimatedReach: number, estimatedEngagement: number, confidence: number } } = {}

  const basePredictions = {
    facebook: { reach: 1200, engagement: 3.2 },
    instagram: { reach: 1800, engagement: 5.8 },
    twitter: { reach: 800, engagement: 2.4 },
    linkedin: { reach: 1000, engagement: 4.1 },
    tiktok: { reach: 2500, engagement: 8.5 },
    youtube: { reach: 3000, engagement: 6.2 }
  }

  // Content type multipliers
  const contentMultipliers = {
    text: 1.0,
    image: 1.4,
    video: 2.1,
    carousel: 1.6,
    story: 1.2,
    live: 2.8
  }

  platforms.forEach(platform => {
    const base = basePredictions[platform as keyof typeof basePredictions] || { reach: 1000, engagement: 3.0 }
    const multiplier = contentMultipliers[contentType as keyof typeof contentMultipliers] || 1.0
    
    // Analyze content for engagement factors
    const hasHashtags = content.includes('#')
    const hasMentions = content.includes('@')
    const hasEmojis = /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]/u.test(content)
    const hasQuestion = content.includes('?')
    
    let engagementBoost = 1.0
    if (hasHashtags) engagementBoost += 0.15
    if (hasMentions) engagementBoost += 0.10
    if (hasEmojis) engagementBoost += 0.08
    if (hasQuestion) engagementBoost += 0.12

    predictions[platform] = {
      estimatedReach: Math.round(base.reach * multiplier * engagementBoost),
      estimatedEngagement: Math.round((base.engagement * multiplier * engagementBoost) * 100) / 100,
      confidence: Math.min(95, 70 + (engagementBoost - 1) * 50)
    }
  })

  return predictions
}

function getOptimalPostingTimes(platforms: string[]) {
  const optimalTimes: { [key: string]: { weekday: string[], weekend: string[] } } = {
    facebook: { 
      weekday: ['9:00 AM', '1:00 PM', '3:00 PM'], 
      weekend: ['12:00 PM', '2:00 PM'] 
    },
    instagram: { 
      weekday: ['6:00 AM', '12:00 PM', '7:00 PM'], 
      weekend: ['10:00 AM', '1:00 PM'] 
    },
    twitter: { 
      weekday: ['8:00 AM', '12:00 PM', '5:00 PM'], 
      weekend: ['9:00 AM', '12:00 PM'] 
    },
    linkedin: { 
      weekday: ['8:00 AM', '12:00 PM', '5:00 PM'], 
      weekend: ['Not recommended'] 
    },
    tiktok: { 
      weekday: ['6:00 AM', '10:00 AM', '7:00 PM'], 
      weekend: ['9:00 AM', '12:00 PM'] 
    },
    youtube: { 
      weekday: ['2:00 PM', '8:00 PM'], 
      weekend: ['9:00 AM', '11:00 AM'] 
    }
  }

  const result: { [key: string]: { weekday: string[], weekend: string[] } } = {}
  
  platforms.forEach(platform => {
    result[platform] = optimalTimes[platform] || { 
      weekday: ['9:00 AM', '12:00 PM', '6:00 PM'], 
      weekend: ['10:00 AM', '2:00 PM'] 
    }
  })

  return result
}

function generateContentSuggestions(content: string, platforms: string[], contentType: string) {
  const suggestions = []

  // General suggestions based on content analysis
  if (!content.includes('#')) {
    suggestions.push('Add relevant hashtags to increase discoverability')
  }

  if (!content.includes('?') && !content.includes('!')) {
    suggestions.push('Consider adding a call-to-action or engaging question')
  }

  if (!/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]/u.test(content)) {
    suggestions.push('Add emojis to make your content more engaging')
  }

  // Platform-specific suggestions
  if (platforms.includes('instagram') && contentType === 'text') {
    suggestions.push('Consider creating a visual element for Instagram')
  }

  if (platforms.includes('tiktok') && contentType !== 'video') {
    suggestions.push('TikTok performs best with video content')
  }

  if (platforms.includes('linkedin') && !content.includes('professional')) {
    suggestions.push('Add professional insights for better LinkedIn performance')
  }

  // Content type suggestions
  if (contentType === 'video') {
    suggestions.push('Include captions for accessibility and silent viewing')
  }

  if (contentType === 'image') {
    suggestions.push('Use high-quality, visually appealing images')
  }

  return suggestions
}

function extractHashtags(content: string): string[] {
  const hashtagRegex = /#[\w]+/g
  return content.match(hashtagRegex) || []
}

function extractMentions(content: string): string[] {
  const mentionRegex = /@[\w]+/g
  return content.match(mentionRegex) || []
}