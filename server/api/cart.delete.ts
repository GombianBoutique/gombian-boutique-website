// server/api/cart.delete.ts
import { defineEventHandler, getHeader, createError, setHeader } from 'h3'
import { checkRateLimit, RateLimitPresets } from '../utils/rate-limiter'
import { logger } from '../utils/logger'
import { carts } from './cart.get'

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
  logger.request(event, 'DELETE', '/api/cart')
  
  try {
    // Apply rate limiting
    const { remaining, resetTime } = checkRateLimit(event, RateLimitPresets.cart, 'cart:delete')
    setHeader(event, 'X-RateLimit-Limit', RateLimitPresets.cart.maxRequests.toString())
    setHeader(event, 'X-RateLimit-Remaining', remaining.toString())
    setHeader(event, 'X-RateLimit-Reset', Math.ceil(resetTime / 1000).toString())

    const authHeader = getHeader(event, 'authorization')
    
    if (!authHeader) {
      logger.warn('CART_DELETE', 'Authentication required - no token provided', null, event)
      throw createError({
        statusCode: 401,
        statusMessage: 'Authentication required',
        data: { message: 'Please provide a valid authentication token' }
      })
    }

    const tokenData = verifyToken(authHeader)

    if (!tokenData) {
      logger.warn('CART_DELETE', 'Invalid or expired token', null, event)
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid or expired token',
        data: { message: 'Token verification failed. Please login again.' }
      })
    }

    const userId = tokenData.userId

    // Delete cart
    if (carts[userId]) {
      const itemCount = carts[userId].items.length
      const totalValue = carts[userId].items.reduce((sum, item) => sum + item.totalPrice, 0)
      delete carts[userId]
      logger.cart('delete', userId, itemCount, { 
        totalValue: `R${totalValue.toFixed(2)}`,
        action: 'cleared'
      }, event)
    } else {
      logger.debug('CART_DELETE', `No cart found for user ${userId}`, null, event)
    }

    const duration = Date.now() - startTime
    logger.response(event, 'DELETE', '/api/cart', 200, duration)

    return {
      success: true,
      message: 'Cart cleared successfully',
      meta: {
        timestamp: new Date().toISOString()
      }
    }
  } catch (error: any) {
    const duration = Date.now() - startTime
    logger.errorDetail('CART_DELETE_ERROR', error.message || error, error, event)
    logger.response(event, 'DELETE', '/api/cart', error.statusCode || 500, duration)
    
    if (error.statusCode === 429) throw error
    if (error.statusCode === 401) throw error
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to clear cart',
      data: { message: 'An unexpected error occurred while clearing your cart' }
    })
  }
})
