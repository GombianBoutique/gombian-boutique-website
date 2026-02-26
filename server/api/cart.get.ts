// server/api/cart.get.ts
import { defineEventHandler, getHeader, createError, setHeader } from 'h3'
import { checkRateLimit, getRateLimitHeaders, RateLimitPresets } from '../utils/rate-limiter'
import { logger } from '../utils/logger'

interface CartItem {
  productId: string
  productName: string
  productImage: string
  unitPrice: number
  quantity: number
  inventoryCount: number
  totalPrice: number
}

interface Cart {
  items: CartItem[]
  currency: string
}

// In-memory cart store - key is userId or guest session id
const carts: Record<string, Cart> = {}

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
  logger.request(event, 'GET', '/api/cart')
  
  try {
    // Apply rate limiting
    const { remaining, resetTime } = checkRateLimit(event, RateLimitPresets.cart, 'cart:get')
    setHeader(event, 'X-RateLimit-Limit', RateLimitPresets.cart.maxRequests.toString())
    setHeader(event, 'X-RateLimit-Remaining', remaining.toString())
    setHeader(event, 'X-RateLimit-Reset', Math.ceil(resetTime / 1000).toString())

    const authHeader = getHeader(event, 'authorization')
    let userId = 'guest'
    let isAuthenticated = false

    // If authenticated, get user's cart
    if (authHeader) {
      const tokenData = verifyToken(authHeader)
      if (tokenData) {
        userId = tokenData.userId
        isAuthenticated = true
        logger.debug('CART_FETCH', `Authenticated user: ${userId}`, null, event)
      }
    }

    // Return cart or empty cart
    const cart = carts[userId] || { items: [], currency: 'ZAR' }

    const duration = Date.now() - startTime
    logger.response(event, 'GET', '/api/cart', 200, duration)
    logger.cart('fetch', userId, cart.items.length, { isAuthenticated }, event)

    return {
      success: true,
      data: cart,
      meta: {
        itemCount: cart.items.length,
        timestamp: new Date().toISOString()
      }
    }
  } catch (error: any) {
    const duration = Date.now() - startTime
    logger.errorDetail('CART_FETCH_ERROR', error.message || error, error, event)
    logger.response(event, 'GET', '/api/cart', error.statusCode || 500, duration)
    
    if (error.statusCode === 429) throw error
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch cart',
      data: { message: 'An unexpected error occurred while fetching your cart' }
    })
  }
})

export { carts }
