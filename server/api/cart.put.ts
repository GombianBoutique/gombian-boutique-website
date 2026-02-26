// server/api/cart.put.ts
import { defineEventHandler, readBody, getHeader, createError, setHeader } from 'h3'
import { checkRateLimit, RateLimitPresets } from '../utils/rate-limiter'
import { logger } from '../utils/logger'
import { carts } from './cart.get'

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
  logger.request(event, 'PUT', '/api/cart')
  
  try {
    // Apply rate limiting
    const { remaining, resetTime } = checkRateLimit(event, RateLimitPresets.cart, 'cart:put')
    setHeader(event, 'X-RateLimit-Limit', RateLimitPresets.cart.maxRequests.toString())
    setHeader(event, 'X-RateLimit-Remaining', remaining.toString())
    setHeader(event, 'X-RateLimit-Reset', Math.ceil(resetTime / 1000).toString())

    const authHeader = getHeader(event, 'authorization')

    if (!authHeader) {
      logger.warn('CART_SAVE', 'Authentication required - no token provided', null, event)
      throw createError({
        statusCode: 401,
        statusMessage: 'Authentication required',
        data: { message: 'Please provide a valid authentication token' }
      })
    }

    const tokenData = verifyToken(authHeader)

    if (!tokenData) {
      logger.warn('CART_SAVE', 'Invalid or expired token', null, event)
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid or expired token',
        data: { message: 'Token verification failed. Please login again.' }
      })
    }

    const userId = tokenData.userId
    const body = await readBody(event)
    const { items, currency } = body

    if (!items || !Array.isArray(items)) {
      logger.warn('CART_SAVE', 'Invalid cart items format', { received: typeof items }, event)
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid cart items',
        data: { 
          message: 'Cart items must be an array',
          received: typeof items
        }
      })
    }

    // Validate cart items count
    if (items.length > 100) {
      logger.warn('CART_SAVE', 'Cart too large', { itemCount: items.length }, event)
      throw createError({
        statusCode: 400,
        statusMessage: 'Cart too large',
        data: { 
          message: 'Cart cannot contain more than 100 items',
          maxItems: 100,
          received: items.length
        }
      })
    }

    // Validate and sanitize cart items
    const validatedItems: CartItem[] = items.map((item: any, index: number) => {
      // Validate required fields
      if (!item.productId) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Invalid cart item',
          data: { message: `Item at index ${index} missing productId` }
        })
      }

      return {
        productId: String(item.productId || '').slice(0, 100),
        productName: String(item.productName || '').slice(0, 200),
        productImage: String(item.productImage || '').slice(0, 500),
        unitPrice: typeof item.unitPrice === 'number' ? Math.max(0, item.unitPrice) : 0,
        quantity: typeof item.quantity === 'number' ? Math.max(1, Math.min(item.quantity, 999)) : 1,
        inventoryCount: typeof item.inventoryCount === 'number' ? Math.max(1, item.inventoryCount) : 10,
        totalPrice: typeof item.totalPrice === 'number' ? Math.max(0, item.totalPrice) : 0
      }
    })

    // Calculate total value
    const totalValue = validatedItems.reduce((sum, item) => sum + item.totalPrice, 0)

    // Save cart
    carts[userId] = {
      items: validatedItems,
      currency: currency || 'ZAR'
    }

    const duration = Date.now() - startTime
    logger.response(event, 'PUT', '/api/cart', 200, duration)
    logger.cart('save', userId, validatedItems.length, { 
      totalValue: `R${totalValue.toFixed(2)}`,
      currency: currency || 'ZAR'
    }, event)

    return {
      success: true,
      data: carts[userId],
      message: 'Cart saved successfully',
      meta: {
        itemCount: validatedItems.length,
        totalValue: `R${totalValue.toFixed(2)}`,
        timestamp: new Date().toISOString()
      }
    }
  } catch (error: any) {
    const duration = Date.now() - startTime
    logger.errorDetail('CART_SAVE_ERROR', error.message || error, error, event)
    logger.response(event, 'PUT', '/api/cart', error.statusCode || 500, duration)
    
    if (error.statusCode === 429) throw error
    if (error.statusCode === 400 || error.statusCode === 401) throw error
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to save cart',
      data: { message: 'An unexpected error occurred while saving your cart' }
    })
  }
})
