// server/api/wishlist.delete.ts
import { defineEventHandler, readBody, getHeader, createError, setHeader } from 'h3'
import { checkRateLimit, RateLimitPresets } from '../utils/rate-limiter'
import { logger } from '../utils/logger'
import { wishlists } from './wishlist.get'

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
  logger.request(event, 'DELETE', '/api/wishlist')
  
  try {
    // Apply rate limiting
    const { remaining, resetTime } = checkRateLimit(event, RateLimitPresets.wishlist, 'wishlist:delete')
    setHeader(event, 'X-RateLimit-Limit', RateLimitPresets.wishlist.maxRequests.toString())
    setHeader(event, 'X-RateLimit-Remaining', remaining.toString())
    setHeader(event, 'X-RateLimit-Reset', Math.ceil(resetTime / 1000).toString())

    const authHeader = getHeader(event, 'authorization')
    let userId = 'guest'

    if (authHeader) {
      const tokenData = verifyToken(authHeader)
      if (tokenData) {
        userId = tokenData.userId
      }
    }

    const body = await readBody(event)
    const { productId } = body

    if (!productId) {
      logger.warn('WISHLIST_REMOVE', 'Product ID is required', { body }, event)
      throw createError({
        statusCode: 400,
        statusMessage: 'Product ID is required',
        data: { message: 'Product ID is required to remove from wishlist' }
      })
    }

    if (!wishlists[userId]) {
      logger.debug('WISHLIST_REMOVE', 'No wishlist found for user', { userId }, event)
      return {
        success: true,
        data: []
      }
    }

    const index = wishlists[userId].findIndex(item => item.productId === productId)

    if (index !== -1) {
      wishlists[userId].splice(index, 1)
      logger.info('WISHLIST_REMOVE', `Removed item from wishlist for user ${userId}`, { 
        productId, 
        itemCount: wishlists[userId].length 
      }, event)
    } else {
      logger.debug('WISHLIST_REMOVE', 'Item not found in wishlist', { userId, productId }, event)
    }

    const duration = Date.now() - startTime
    logger.response(event, 'DELETE', '/api/wishlist', 200, duration)

    return {
      success: true,
      data: wishlists[userId],
      message: 'Item removed from wishlist',
      meta: {
        itemCount: wishlists[userId].length,
        timestamp: new Date().toISOString()
      }
    }
  } catch (error: any) {
    const duration = Date.now() - startTime
    logger.errorDetail('WISHLIST_REMOVE_ERROR', error.message || error, error, event)
    logger.response(event, 'DELETE', '/api/wishlist', error.statusCode || 500, duration)
    
    if (error.statusCode === 429) throw error
    if (error.statusCode === 400) throw error
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to remove from wishlist',
      data: { message: 'An unexpected error occurred while removing from your wishlist' }
    })
  }
})
