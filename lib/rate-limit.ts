/**
 * Server-side rate limiting for API routes
 * Prevents abuse and DoS attacks
 */

import { NextRequest, NextResponse } from 'next/server'

interface RateLimitConfig {
  interval: number // Time window in milliseconds
  uniqueTokenPerInterval: number // Max number of unique tokens per interval
  maxRequestsPerToken: number // Max requests per token in the interval
}

// In-memory store for rate limiting
// In production, use Redis or similar distributed cache
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

// Cleanup old entries every 5 minutes
setInterval(() => {
  const now = Date.now()
  for (const [key, value] of rateLimitStore.entries()) {
    if (now > value.resetTime) {
      rateLimitStore.delete(key)
    }
  }
}, 5 * 60 * 1000)

/**
 * Get client identifier from request
 */
function getClientId(request: NextRequest): string {
  // Try to get IP from various headers (considering proxies)
  const forwarded = request.headers.get('x-forwarded-for')
  const realIp = request.headers.get('x-real-ip')
  const ip = forwarded?.split(',')[0] || realIp || 'unknown'

  return ip
}

/**
 * Rate limit middleware for API routes
 */
export function rateLimit(config: Partial<RateLimitConfig> = {}) {
  const {
    interval = 60 * 1000, // 1 minute default
    uniqueTokenPerInterval = 500,
    maxRequestsPerToken = 10,
  } = config

  return async (request: NextRequest): Promise<NextResponse | null> => {
    const clientId = getClientId(request)
    const now = Date.now()

    // Get or create rate limit record
    let record = rateLimitStore.get(clientId)

    if (!record || now > record.resetTime) {
      // Create new record
      record = {
        count: 1,
        resetTime: now + interval,
      }
      rateLimitStore.set(clientId, record)
      return null // Allow request
    }

    // Check if limit exceeded
    if (record.count >= maxRequestsPerToken) {
      const retryAfter = Math.ceil((record.resetTime - now) / 1000)

      return NextResponse.json(
        {
          error: 'Too many requests',
          message: 'Rate limit exceeded. Please try again later.',
          retryAfter,
        },
        {
          status: 429,
          headers: {
            'Retry-After': retryAfter.toString(),
            'X-RateLimit-Limit': maxRequestsPerToken.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': Math.ceil(record.resetTime / 1000).toString(),
          },
        }
      )
    }

    // Increment count
    record.count++

    // Add rate limit headers
    return null // Allow request
  }
}

/**
 * Apply rate limit to an API route handler
 */
export function withRateLimit(
  handler: (request: NextRequest) => Promise<NextResponse>,
  config?: Partial<RateLimitConfig>
) {
  const limiter = rateLimit(config)

  return async (request: NextRequest): Promise<NextResponse> => {
    const limitResponse = await limiter(request)

    if (limitResponse) {
      return limitResponse // Rate limit exceeded
    }

    return handler(request)
  }
}

/**
 * Preset configurations for different types of endpoints
 */
export const rateLimitPresets = {
  // Strict limits for auth endpoints
  auth: {
    interval: 15 * 60 * 1000, // 15 minutes
    maxRequestsPerToken: 5,
  },

  // Moderate limits for data mutation endpoints
  mutation: {
    interval: 60 * 1000, // 1 minute
    maxRequestsPerToken: 30,
  },

  // Lenient limits for read endpoints
  read: {
    interval: 60 * 1000, // 1 minute
    maxRequestsPerToken: 100,
  },

  // Very strict for public form submissions
  form: {
    interval: 60 * 60 * 1000, // 1 hour
    maxRequestsPerToken: 3,
  },
}
