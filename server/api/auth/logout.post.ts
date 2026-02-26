// server/api/auth/logout.post.ts
import { defineEventHandler, getHeader, setHeader } from 'h3'
import { checkRateLimit, RateLimitPresets } from '../../utils/rate-limiter'
import { logger } from '../../utils/logger'

export default defineEventHandler(async (event) => {
  const startTime = Date.now()
  logger.request(event, 'POST', '/api/auth/logout')
  
  try {
    // Apply rate limiting
    const { remaining, resetTime } = checkRateLimit(event, RateLimitPresets.auth, 'auth:logout')
    setHeader(event, 'X-RateLimit-Limit', RateLimitPresets.auth.maxRequests.toString())
    setHeader(event, 'X-RateLimit-Remaining', remaining.toString())
    setHeader(event, 'X-RateLimit-Reset', Math.ceil(resetTime / 1000).toString())

    // Get user info from token for logging
    const authHeader = getHeader(event, 'authorization')
    let userId = 'unknown'
    
    if (authHeader) {
      try {
        const tokenValue = authHeader.startsWith('Bearer ') ? authHeader.substring(7) : authHeader
        const parts = tokenValue.split('.')
        if (parts.length === 3) {
          const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString())
          userId = payload.sub
        }
      } catch (e) {
        // Token parsing failed, use 'unknown'
      }
    }

    const duration = Date.now() - startTime
    logger.response(event, 'POST', '/api/auth/logout', 200, duration)
    logger.auth('logout', true, userId, {}, event)

    // In a real application, you would:
    // 1. Invalidate the token on the server side
    // 2. Clear any server-side sessions
    // 3. Add token to a blacklist

    // For now, we just return success
    // The client will handle removing the token from cookies/localStorage

    return {
      success: true,
      message: 'Logout successful',
      meta: {
        timestamp: new Date().toISOString()
      }
    }
  } catch (error: any) {
    const duration = Date.now() - startTime
    logger.errorDetail('LOGOUT_ERROR', error.message || error, error, event)
    logger.response(event, 'POST', '/api/auth/logout', error.statusCode || 500, duration)
    
    if (error.statusCode === 429) throw error
    throw createError({
      statusCode: 500,
      statusMessage: 'Logout failed',
      data: { message: 'An unexpected error occurred during logout' }
    })
  }
})
