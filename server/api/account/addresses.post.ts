// server/api/account/addresses.post.ts
import { defineEventHandler, readBody, getHeader, createError } from 'h3'
import { findUserById, updateUser } from '../../utils/user-store'
import type { Address } from './addresses.get'
import { v4 as uuidv4 } from 'uuid'

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

    const body = await readBody(event)
    const {
      type = 'shipping',
      firstName,
      lastName,
      company,
      addressLine1,
      addressLine2,
      city,
      state,
      postalCode,
      country,
      phone,
      isDefault = false
    } = body

    // Validate required fields
    if (!firstName || !lastName || !addressLine1 || !city || !state || !postalCode || !country) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing required address fields'
      })
    }

    // Create new address
    const newAddress: Address = {
      id: uuidv4(),
      customerId: tokenData.userId,
      type: type as 'shipping' | 'billing' | 'both',
      firstName,
      lastName,
      company,
      addressLine1,
      addressLine2,
      city,
      state,
      postalCode,
      country,
      phone,
      isDefault,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    // If this is set as default, unset other defaults
    if (isDefault) {
      if (user.shippingAddresses) {
        user.shippingAddresses.forEach(addr => addr.isDefault = false)
      }
      if (user.billingAddresses && type !== 'billing') {
        user.billingAddresses.forEach(addr => addr.isDefault = false)
      }
    }

    // Add to appropriate address array(s)
    const updatedUser = { ...user }
    
    if (type === 'shipping' || type === 'both') {
      updatedUser.shippingAddresses = [
        ...(updatedUser.shippingAddresses || []),
        { ...newAddress, type: 'shipping' }
      ]
    }
    
    if (type === 'billing' || type === 'both') {
      updatedUser.billingAddresses = [
        ...(updatedUser.billingAddresses || []),
        { ...newAddress, type: 'billing' }
      ]
    }

    // Update user
    const updated = updateUser(tokenData.userId, {
      shippingAddresses: updatedUser.shippingAddresses,
      billingAddresses: updatedUser.billingAddresses
    })

    if (!updated) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to save address'
      })
    }

    console.log(`[Addresses API] Added new address for user ${tokenData.userId}`)

    return {
      success: true,
      message: 'Address added successfully',
      data: newAddress
    }
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }
    console.error('Add address error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to add address'
    })
  }
})
