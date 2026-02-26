// server/api/account/addresses.put.ts
import { defineEventHandler, readBody, getHeader, createError } from 'h3'
import { findUserById, updateUser } from '../../utils/user-store'
import type { Address } from './addresses.get'

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
    const { id, ...updates } = body

    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Address ID is required'
      })
    }

    const updatedUser = { ...user }
    let found = false

    // Update in shipping addresses
    if (updatedUser.shippingAddresses) {
      const index = updatedUser.shippingAddresses.findIndex(addr => addr.id === id)
      if (index !== -1) {
        found = true
        // If setting as default, unset others
        if (updates.isDefault) {
          updatedUser.shippingAddresses.forEach(addr => addr.isDefault = false)
        }
        updatedUser.shippingAddresses[index] = {
          ...updatedUser.shippingAddresses[index],
          ...updates,
          updatedAt: new Date().toISOString()
        }
      }
    }

    // Update in billing addresses
    if (updatedUser.billingAddresses) {
      const index = updatedUser.billingAddresses.findIndex(addr => addr.id === id)
      if (index !== -1) {
        found = true
        // If setting as default, unset others
        if (updates.isDefault) {
          updatedUser.billingAddresses.forEach(addr => addr.isDefault = false)
        }
        updatedUser.billingAddresses[index] = {
          ...updatedUser.billingAddresses[index],
          ...updates,
          updatedAt: new Date().toISOString()
        }
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
        statusMessage: 'Failed to update address'
      })
    }

    console.log(`[Addresses API] Updated address ${id} for user ${tokenData.userId}`)

    return {
      success: true,
      message: 'Address updated successfully',
      data: {
        id,
        ...updates
      }
    }
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }
    console.error('Update address error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to update address'
    })
  }
})
