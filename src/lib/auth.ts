import { NextRequest } from 'next/server'

export interface APIKeyData {
  userId: string
  plan: 'free' | 'pro' | 'enterprise'
  rateLimit: number
  usage: number
  lastReset: Date
}

// Mock API key database - in production, use a real database
const API_KEYS: Record<string, APIKeyData> = {
  'dcl_sk_test_123456789': {
    userId: 'user_test_123',
    plan: 'pro',
    rateLimit: 1000,
    usage: 0,
    lastReset: new Date()
  },
  'dcl_sk_demo_987654321': {
    userId: 'user_demo_456',
    plan: 'free',
    rateLimit: 100,
    usage: 0,
    lastReset: new Date()
  }
}

export function validateAPIKey(apiKey: string): APIKeyData | null {
  if (!apiKey || !apiKey.startsWith('dcl_sk_')) {
    return null
  }
  
  return API_KEYS[apiKey] || null
}

export function checkRateLimit(apiKeyData: APIKeyData): boolean {
  const now = new Date()
  const hoursSinceReset = (now.getTime() - apiKeyData.lastReset.getTime()) / (1000 * 60 * 60)
  
  // Reset usage every hour
  if (hoursSinceReset >= 1) {
    apiKeyData.usage = 0
    apiKeyData.lastReset = now
  }
  
  return apiKeyData.usage < apiKeyData.rateLimit
}

export function incrementUsage(apiKeyData: APIKeyData): void {
  apiKeyData.usage += 1
}

export function extractAPIKey(request: NextRequest): string | null {
  const authHeader = request.headers.get('authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null
  }
  
  return authHeader.substring(7)
}

export function createErrorResponse(message: string, status: number) {
  return Response.json({ error: message }, { status })
}