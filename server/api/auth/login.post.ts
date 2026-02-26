// server/api/auth/login.post.ts
import { defineEventHandler, readBody, createError, setHeader } from 'h3'
import { v4 as uuidv4 } from 'uuid'
import { initializeUserStore, findUserByEmail } from '../../utils/user-store'
import { checkRateLimit, RateLimitPresets } from '../../utils/rate-limiter'
import { logger } from '../../utils/logger'

// Initialize user store on first load
initializeUserStore()

// Simple password hashing (use bcrypt in production)
const hashPassword = async (password: string): Promise<string> => {
  const encoder = new TextEncoder()
  const data = encoder.encode(password + 'gombian-salt-2026')
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

// Generate JWT-like token (use proper JWT in production)
const generateToken = (userId: string): string => {
  const header = { alg: 'HS256', typ: 'JWT' }
  const payload = {
    sub: userId,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7) // 7 days
  }

  const encodedHeader = Buffer.from(JSON.stringify(header)).toString('base64')
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64')

  return `${encodedHeader}.${encodedPayload}.${uuidv4().replace(/-/g, '')}`
}

export default defineEventHandler(async (event) => {
  const startTime = Date.now()
  logger.request(event, 'POST', '/api/auth/login')
  
  try {
    // Apply strict rate limiting for login attempts
    const { remaining, resetTime } = checkRateLimit(event, RateLimitPresets.auth, 'auth:login')
    setHeader(event, 'X-RateLimit-Limit', RateLimitPresets.auth.maxRequests.toString())
    setHeader(event, 'X-RateLimit-Remaining', remaining.toString())
    setHeader(event, 'X-RateLimit-Reset', Math.ceil(resetTime / 1000).toString())

    const body = await readBody(event)
    const { email, password } = body

    // Validate required fields
    if (!email || !password) {
      logger.warn('LOGIN_FAILED', 'Missing email or password', { email: email ? '[REDACTED]' : 'missing' }, event)
      throw createError({
        statusCode: 400,
        statusMessage: 'Email and password are required',
        data: { message: 'Please provide both email and password' }
      })
    }

    // Find user by email
    const user = findUserByEmail(email)

    if (!user) {
      logger.warn('LOGIN_FAILED', 'User not found', { email }, event)
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid email or password',
        data: { message: 'The email or password you entered is incorrect' }
      })
    }

    if (!user.isActive) {
      logger.warn('LOGIN_FAILED', 'Account deactivated', { email, userId: user.id }, event)
      throw createError({
        statusCode: 403,
        statusMessage: 'Account is deactivated',
        data: { message: 'Your account has been deactivated. Please contact support.' }
      })
    }

    // Verify password
    const passwordHash = await hashPassword(password)
    if (user.passwordHash !== passwordHash) {
      logger.warn('LOGIN_FAILED', 'Invalid password', { email, userId: user.id }, event)
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid email or password',
        data: { message: 'The email or password you entered is incorrect' }
      })
    }

    // Generate token
    const token = generateToken(user.id)

    const duration = Date.now() - startTime
    logger.response(event, 'POST', '/api/auth/login', 200, duration)
    logger.auth('login', true, user.id, { email }, event)

    // Return user data (excluding sensitive fields)
    return {
      success: true,
      message: 'Login successful',
      data: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        preferences: user.preferences,
        token
      },
      meta: {
        timestamp: new Date().toISOString()
      }
    }
  } catch (error: any) {
    const duration = Date.now() - startTime
    logger.errorDetail('LOGIN_ERROR', error.message || error, error, event)
    logger.response(event, 'POST', '/api/auth/login', error.statusCode || 500, duration)
    
    // Log failed login attempt (don't expose whether email exists)
    if (error.statusCode !== 400 && error.statusCode !== 401 && error.statusCode !== 403) {
      logger.auth('login', false, undefined, { email: body?.email, reason: error.message }, event)
    }
    
    if (error.statusCode === 429) throw error
    if (error.statusCode === 400 || error.statusCode === 401 || error.statusCode === 403) throw error
    throw createError({
      statusCode: 500,
      statusMessage: 'Login failed',
      data: { message: 'An unexpected error occurred during login' }
    })
  }
})

// Export users array for registration endpoint
export { users }
