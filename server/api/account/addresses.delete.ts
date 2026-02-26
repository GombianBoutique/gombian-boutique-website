// server/api/account/addresses.delete.ts
import { defineEventHandler, getHeader, createError, getQuery } from 'h3'
import { findUserById, updateUser } from '../../utils/user-store'

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

    const user = findUserById(tokenData.userId)

    if (!user) {
      throw createError({
        statusCode: 404,
        statusMessage: 'User not found'
      })
    }

    const query = getQuery(event)
    const addressId = query.id as string

    if (!addressId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Address ID is required (pass as ?id=xxx)'
      })
    }

    const updatedUser = { ...user }
    let found = false

    // Remove from shipping addresses
    if (updatedUser.shippingAddresses) {
      const beforeLength = updatedUser.shippingAddresses.length
      updatedUser.shippingAddresses = updatedUser.shippingAddresses.filter(
        addr => addr.id !== addressId
      )
      if (updatedUser.shippingAddresses.length < beforeLength) {
        found = true
      }
    }

    // Remove from billing addresses
    if (updatedUser.billingAddresses) {
      const beforeLength = updatedUser.billingAddresses.length
      updatedUser.billingAddresses = updatedUser.billingAddresses.filter(
        addr => addr.id !== addressId
      )
      if (updatedUser.billingAddresses.length < beforeLength) {
        found = true
      }
    }

    if (!found) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Address not found'
      })
    }

    // Update user
    const updated = updateUser(tokenData.userId, {
      shippingAddresses: updatedUser.shippingAddresses,
      billingAddresses: updatedUser.billingAddresses
    })

    if (!updated) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to delete address'
      })
    }

    console.log(`[Addresses API] Deleted address ${addressId} for user ${tokenData.userId}`)

    return {
      success: true,
      message: 'Address deleted successfully'
    }
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }
    console.error('Delete address error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to delete address'
    })
  }
})
