// server/api/account.put.ts
import { defineEventHandler, readBody, getHeader, createError } from 'h3'
import { findUserById, updateUser } from '../utils/user-store'

// Simple token verification
const verifyToken = (token: string): { userId: string } | null => {
  try {
    if (!token || !token.startsWith('Bearer ')) {
      return null
    }
    
    const tokenValue = token.substring(7)
    const parts = tokenValue.split('.')
    
    if (parts.length !== 3) {
      return null
    }
    
    const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString())
    
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
    const { firstName, lastName, phone, dateOfBirth, preferences } = body

    // Update user data
    const updated = updateUser(tokenData.userId, {
      firstName,
      lastName,
      phone,
      dateOfBirth,
      preferences
    })

    if (!updated) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to update user'
      })
    }

    const updatedUser = findUserById(tokenData.userId)

    return {
      success: true,
      message: 'Profile updated successfully',
      data: {
        id: updatedUser.id,
        email: updatedUser.email,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        phone: updatedUser.phone,
        dateOfBirth: updatedUser.dateOfBirth,
        preferences: updatedUser.preferences
      }
    }
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }
    
    console.error('Update account error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to update account'
    })
  }
})
