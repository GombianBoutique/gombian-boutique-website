// server/api/account/addresses.get.ts
import { defineEventHandler, getHeader, createError } from 'h3'
import { findUserById } from '../../utils/user-store'

export interface Address {
  id: string
  customerId: string
  type: 'shipping' | 'billing' | 'both'
  firstName: string
  lastName: string
  company?: string
  addressLine1: string
  addressLine2?: string
  city: string
  state: string
  postalCode: string
  country: string
  phone?: string
  isDefault: boolean
  createdAt?: string
  updatedAt?: string
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

    // Combine shipping and billing addresses, removing duplicates
    const addresses: Address[] = []
    const seenIds = new Set<string>()

    // Add shipping addresses
    if (user.shippingAddresses) {
      for (const addr of user.shippingAddresses) {
        if (!seenIds.has(addr.id)) {
          addresses.push({ ...addr, type: 'shipping' })
          seenIds.add(addr.id)
        }
      }
    }

    // Add billing addresses (merge if same ID as shipping)
    if (user.billingAddresses) {
      for (const addr of user.billingAddresses) {
        const existing = addresses.find(a => a.id === addr.id)
        if (existing) {
          // Merge types
          existing.type = 'both'
        } else if (!seenIds.has(addr.id)) {
          addresses.push({ ...addr, type: 'billing' })
          seenIds.add(addr.id)
        }
      }
    }

    console.log(`[Addresses API] Fetched ${addresses.length} addresses for user ${tokenData.userId}`)

    return {
      success: true,
      data: addresses
    }
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }
    console.error('Fetch addresses error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch addresses'
    })
  }
})
