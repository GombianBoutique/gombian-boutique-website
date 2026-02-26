// server/api/wishlist.post.ts
import { defineEventHandler, readBody, getHeader, createError, setHeader } from 'h3'
import { checkRateLimit, RateLimitPresets } from '../utils/rate-limiter'
import { logger } from '../utils/logger'
import { wishlists } from './wishlist.get'

interface WishlistItem {
  productId: string
  productName: string
  productImage: string
  price: number
  addedAt: string
}

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
  logger.request(event, 'POST', '/api/wishlist')
  
  try {
    // Apply rate limiting
    const { remaining, resetTime } = checkRateLimit(event, RateLimitPresets.wishlist, 'wishlist:post')
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

    // Support both single item add and full wishlist sync
    if (body.items && Array.isArray(body.items)) {
      // Full wishlist sync - replace entire wishlist
      wishlists[userId] = body.items.map((item: any) => ({
        productId: item.productId,
        productName: item.productName || '',
        productImage: item.productImage || '',
        price: item.price || 0,
        addedAt: item.addedAt || new Date().toISOString()
      }))

      const duration = Date.now() - startTime
      logger.response(event, 'POST', '/api/wishlist', 200, duration)
      logger.info('WISHLIST_SYNC', `Synced wishlist for user ${userId}`, { 
        itemCount: body.items.length 
      }, event)

      return {
        success: true,
        data: wishlists[userId],
        message: 'Wishlist synced successfully',
        meta: {
          itemCount: body.items.length,
          timestamp: new Date().toISOString()
        }
      }
    }

    // Single item add (legacy behavior)
    const { productId, productName, productImage, price } = body

    if (!productId) {
      logger.warn('WISHLIST_ADD', 'Product ID is required', { body }, event)
      throw createError({
        statusCode: 400,
        statusMessage: 'Product ID is required',
        data: { message: 'Product ID is required to add to wishlist' }
      })
    }

    if (!wishlists[userId]) {
      wishlists[userId] = []
    }

    const existingIndex = wishlists[userId].findIndex(item => item.productId === productId)

    if (existingIndex !== -1) {
      logger.debug('WISHLIST_ADD', 'Product already in wishlist', { userId, productId }, event)
      return {
        success: false,
        message: 'Product already in wishlist'
      }
    }

    const newItem: WishlistItem = {
      productId,
      productName: productName || '',
      productImage: productImage || '',
      price: price || 0,
      addedAt: new Date().toISOString()
    }

    wishlists[userId].push(newItem)

    const duration = Date.now() - startTime
    logger.response(event, 'POST', '/api/wishlist', 200, duration)
    logger.info('WISHLIST_ADD', `Added item to wishlist for user ${userId}`, { 
      productId, 
      itemCount: wishlists[userId].length 
    }, event)

    return {
      success: true,
      data: wishlists[userId],
      message: 'Item added to wishlist',
      meta: {
        itemCount: wishlists[userId].length,
        timestamp: new Date().toISOString()
      }
    }
  } catch (error: any) {
    const duration = Date.now() - startTime
    logger.errorDetail('WISHLIST_ADD_ERROR', error.message || error, error, event)
    logger.response(event, 'POST', '/api/wishlist', error.statusCode || 500, duration)
    
    if (error.statusCode === 429) throw error
    if (error.statusCode === 400) throw error
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to add to wishlist',
      data: { message: 'An unexpected error occurred while adding to your wishlist' }
    })
  }
})
