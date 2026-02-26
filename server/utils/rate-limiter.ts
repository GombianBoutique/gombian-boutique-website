// server/utils/rate-limiter.ts
/**
 * Rate Limiter - Prevents API abuse by limiting requests per time window
 */

interface RateLimitInfo {
  count: number
  resetTime: number
}

// In-memory rate limit store - use Redis in production
const rateLimitStore: Map<string, RateLimitInfo> = new Map()

export interface RateLimitConfig {
  windowMs: number      // Time window in milliseconds
  maxRequests: number   // Max requests per window
  message: string       // Error message when limit exceeded
}

// Default configurations for different endpoints
export const RateLimitPresets = {
  // Strict limits for authentication
  auth: {
    windowMs: 15 * 60 * 1000,      // 15 minutes
    maxRequests: 10,                // 10 requests per 15 min
    message: 'Too many login attempts, please try again later'
  },
  
  // Moderate limits for cart operations
  cart: {
    windowMs: 60 * 1000,           // 1 minute
    maxRequests: 30,                // 30 requests per minute
    message: 'Too many cart operations, please slow down'
  },
  
  // Moderate limits for wishlist
  wishlist: {
    windowMs: 60 * 1000,           // 1 minute
    maxRequests: 30,                // 30 requests per minute
    message: 'Too many wishlist operations, please slow down'
  },
  
  // Strict limits for order placement
  order: {
    windowMs: 5 * 60 * 1000,       // 5 minutes
    maxRequests: 10,                // 10 orders per 5 min
    message: 'Too many order attempts, please try again later'
  },
  
  // Lenient limits for data fetch
  fetch: {
    windowMs: 60 * 1000,           // 1 minute
    maxRequests: 60,                // 60 requests per minute
    message: 'Too many requests, please try again later'
  },
  
  // Strict limits for address changes
  address: {
    windowMs: 60 * 1000,           // 1 minute
    maxRequests: 20,                // 20 requests per minute
    message: 'Too many address operations, please slow down'
  }
}

/**
 * Generate rate limit key based on request
 */
const generateKey = (event: any, prefix: string = 'api'): string => {
  // Try to get IP address
  const ip = event.context.clientAddress || 'unknown'
  return `${prefix}:${ip}`
}

/**
 * Clean up expired entries from rate limit store
 */
const cleanupExpiredEntries = () => {
  const now = Date.now()
  for (const [key, info] of rateLimitStore.entries()) {
    if (info.resetTime < now) {
      rateLimitStore.delete(key)
    }
  }
}

// Clean up expired entries every 5 minutes
setInterval(cleanupExpiredEntries, 5 * 60 * 1000)

/**
 * Check rate limit and throw error if exceeded
 */
export const checkRateLimit = (
  event: any,
  config: RateLimitConfig = RateLimitPresets.fetch,
  prefix: string = 'api'
): { remaining: number; resetTime: number } => {
  const key = generateKey(event, prefix)
  const now = Date.now()
  
  let limitInfo = rateLimitStore.get(key)
  
  // Initialize or reset if expired
  if (!limitInfo || limitInfo.resetTime < now) {
    limitInfo = {
      count: 1,
      resetTime: now + config.windowMs
    }
    rateLimitStore.set(key, limitInfo)
    return {
      remaining: config.maxRequests - 1,
      resetTime: limitInfo.resetTime
    }
  }
  
  // Check if limit exceeded
  if (limitInfo.count >= config.maxRequests) {
    const error = createError({
      statusCode: 429,
      statusMessage: 'Too Many Requests',
      data: {
        message: config.message,
        retryAfter: Math.ceil((limitInfo.resetTime - now) / 1000),
        limit: config.maxRequests,
        windowMs: config.windowMs
      }
    })
    throw error
  }
  
  // Increment count
  limitInfo.count++
  rateLimitStore.set(key, limitInfo)
  
  return {
    remaining: config.maxRequests - limitInfo.count,
    resetTime: limitInfo.resetTime
  }
}

/**
 * Create rate limit headers for response
 */
export const getRateLimitHeaders = (remaining: number, resetTime: number, limit: number) => {
  return {
    'X-RateLimit-Limit': limit.toString(),
    'X-RateLimit-Remaining': Math.max(0, remaining).toString(),
    'X-RateLimit-Reset': Math.ceil(resetTime / 1000).toString()
  }
}

/**
 * Rate limit middleware factory
 */
export const createRateLimiter = (config: RateLimitConfig, prefix: string = 'api') => {
  return (event: any) => {
    try {
      const { remaining, resetTime } = checkRateLimit(event, config, prefix)
      
      // Set rate limit headers on response
      const headers = getRateLimitHeaders(remaining, resetTime, config.maxRequests)
      for (const [key, value] of Object.entries(headers)) {
        setHeader(event, key, value)
      }
      
      return { remaining, resetTime }
    } catch (error: any) {
      if (error.statusCode === 429) {
        // Add retry-after header
        setHeader(event, 'Retry-After', error.data.retryAfter.toString())
      }
      throw error
    }
  }
}

// Helper imports (will be imported from h3)
import { createError, setHeader } from 'h3'
