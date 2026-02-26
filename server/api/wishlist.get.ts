// server/api/wishlist.get.ts
import { defineEventHandler, getHeader, createError, setHeader } from 'h3'
import { checkRateLimit, RateLimitPresets } from '../utils/rate-limiter'
import { logger } from '../utils/logger'

// In-memory wishlist store
interface WishlistItem {
  productId: string
  productName: string
  productImage: string
  price: number
  addedAt: string
}

const wishlists: Record<string, WishlistItem[]> = {}

// Simple token verification
const verifyToken = (token: string): { userId: string } | null => {
  try {
    if (!token || !token.startsWith('Bearer ')) return null
    const tokenValue = token.substring(7)
    const parts = tokenValue.split('.')
    if (parts.length !== 3) return null
    const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString())
    const now = Math.floor(Date.now() / 1000)
    if (payload.exp < now) return null
    return { userId: payload.sub }
  } catch {
    return null
  }
}

export default defineEventHandler(async (event) => {
  const startTime = Date.now()
  logger.request(event, 'GET', '/api/wishlist')
  
  try {
    // Apply rate limiting
    const { remaining, resetTime } = checkRateLimit(event, RateLimitPresets.wishlist, 'wishlist:get')
    setHeader(event, 'X-RateLimit-Limit', RateLimitPresets.wishlist.maxRequests.toString())
    setHeader(event, 'X-RateLimit-Remaining', remaining.toString())
    setHeader(event, 'X-RateLimit-Reset', Math.ceil(resetTime / 1000).toString())

    const authHeader = getHeader(event, 'authorization')
    let userId = 'guest'
    let isAuthenticated = false

    if (authHeader) {
      const tokenData = verifyToken(authHeader)
      if (tokenData) {
        userId = tokenData.userId
        isAuthenticated = true
      }
    }

    const items = wishlists[userId] || []

    const duration = Date.now() - startTime
    logger.response(event, 'GET', '/api/wishlist', 200, duration)
    logger.info('WISHLIST_FETCH', `Fetched wishlist for user ${userId}`, { 
      itemCount: items.length, 
      isAuthenticated 
    }, event)

    return {
      success: true,
      data: items,
      meta: {
        itemCount: items.length,
        timestamp: new Date().toISOString()
      }
    }
  } catch (error: any) {
    const duration = Date.now() - startTime
    logger.errorDetail('WISHLIST_FETCH_ERROR', error.message || error, error, event)
    logger.response(event, 'GET', '/api/wishlist', error.statusCode || 500, duration)
    
    if (error.statusCode === 429) throw error
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch wishlist',
      data: { message: 'An unexpected error occurred while fetching your wishlist' }
    })
  }
})

export { wishlists }
