// server/api/account.get.ts
import { defineEventHandler, getHeader, createError } from 'h3'
import { findUserById } from '../utils/user-store'

// Simple token verification (use proper JWT verification in production)
const verifyToken = (token: string): { userId: string } | null => {
  try {
    if (!token || !token.startsWith('Bearer ')) {
      return null
    }

    const tokenValue = token.substring(7) // Remove 'Bearer ' prefix
    const parts = tokenValue.split('.')

    if (parts.length !== 3) {
      return null
    }

    // Decode payload
    const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString())

    // Check expiration
    const now = Math.floor(Date.now() / 1000)
    if (payload.exp < now) {
      return null
    }

    return { userId: payload.sub }
  } catch {
    return null
  }
}

export default defineEventHandler(async (event) => {
  try {
    // Get authorization header
    const authHeader = getHeader(event, 'authorization')

    if (!authHeader) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Authentication required'
      })
    }

    // Verify token
    const tokenData = verifyToken(authHeader)

    if (!tokenData) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid or expired token'
      })
    }

    // Find user
    const user = findUserById(tokenData.userId)

    if (!user) {
      throw createError({
        statusCode: 404,
        statusMessage: 'User not found'
      })
    }

    if (!user.isActive) {
      throw createError({
        statusCode: 403,
        statusMessage: 'Account is deactivated'
      })
    }

    // Log user data retrieval for debugging
    console.log('[Account API] User data retrieved:', {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      dateOfBirth: user.dateOfBirth,
      preferences: user.preferences,
      hasShippingAddresses: user.shippingAddresses?.length > 0,
      hasBillingAddresses: user.billingAddresses?.length > 0
    })

    // Return user data (excluding sensitive fields)
    return {
      success: true,
      data: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        dateOfBirth: user.dateOfBirth,
        preferences: user.preferences,
        shippingAddresses: user.shippingAddresses,
        billingAddresses: user.billingAddresses,
        orderHistory: user.orderHistory,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    }
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }

    console.error('[Account API] Error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to retrieve account information'
    })
  }
})
