// server/api/account/orders.get.ts
import { defineEventHandler, getHeader, createError } from 'h3'
import { findUserById } from '../../utils/user-store'
import { findOrdersByUserId, getRecentOrders } from '../../utils/order-store'

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
  try {
    const authHeader = getHeader(event, 'authorization')

    if (!authHeader) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Authentication required'
      })
    }

    const tokenData = verifyToken(authHeader)

    if (!tokenData) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid or expired token'
      })
    }

    // Verify user exists
    const user = findUserById(tokenData.userId)

    if (!user) {
      throw createError({
        statusCode: 404,
        statusMessage: 'User not found'
      })
    }

    // Get orders for user
    const orders = findOrdersByUserId(tokenData.userId)

    // Sort by date (newest first)
    orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    console.log(`[Orders API] Fetched ${orders.length} orders for user ${tokenData.userId}`)

    return {
      success: true,
      data: orders
    }
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }
    console.error('Fetch orders error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch orders'
    })
  }
})
