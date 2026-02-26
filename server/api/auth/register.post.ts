// server/api/auth/register.post.ts
import { defineEventHandler, readBody, createError, setHeader } from 'h3'
import { v4 as uuidv4 } from 'uuid'
import { addUser, findUserByEmail } from '../../utils/user-store'
import { checkRateLimit, RateLimitPresets } from '../../utils/rate-limiter'
import { logger } from '../../utils/logger'

// Simple password hashing (use bcrypt in production)
const hashPassword = async (password: string): Promise<string> => {
  const encoder = new TextEncoder()
  const data = encoder.encode(password + 'gombian-salt-2026')
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

// Generate JWT-like token
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

// Email validation
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Password validation (min 8 chars, at least one uppercase, one lowercase, one number)
const isValidPassword = (password: string): boolean => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
  return passwordRegex.test(password)
}

export default defineEventHandler(async (event) => {
  const startTime = Date.now()
  logger.request(event, 'POST', '/api/auth/register')
  
  try {
    // Apply rate limiting
    const { remaining, resetTime } = checkRateLimit(event, RateLimitPresets.auth, 'auth:register')
    setHeader(event, 'X-RateLimit-Limit', RateLimitPresets.auth.maxRequests.toString())
    setHeader(event, 'X-RateLimit-Remaining', remaining.toString())
    setHeader(event, 'X-RateLimit-Reset', Math.ceil(resetTime / 1000).toString())

    const body = await readBody(event)
    const { email, password, firstName, lastName, phone, dateOfBirth, preferences } = body

    // Validate required fields
    if (!email || !password || !firstName || !lastName) {
      logger.warn('REGISTER_FAILED', 'Missing required fields', { email: email ? '[REDACTED]' : 'missing' }, event)
      throw createError({
        statusCode: 400,
        statusMessage: 'Email, password, first name, and last name are required',
        data: { message: 'Please provide all required fields' }
      })
    }

    // Validate email format
    if (!isValidEmail(email)) {
      logger.warn('REGISTER_FAILED', 'Invalid email format', { email }, event)
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid email format',
        data: { message: 'Please provide a valid email address' }
      })
    }

    // Validate password strength
    if (!isValidPassword(password)) {
      logger.warn('REGISTER_FAILED', 'Weak password', { email }, event)
      throw createError({
        statusCode: 400,
        statusMessage: 'Password must be at least 8 characters with uppercase, lowercase, and number',
        data: { message: 'Password does not meet security requirements' }
      })
    }

    // Check if user already exists
    const existingUser = findUserByEmail(email)
    if (existingUser) {
      logger.warn('REGISTER_FAILED', 'User already exists', { email }, event)
      throw createError({
        statusCode: 409,
        statusMessage: 'An account with this email already exists',
        data: { message: 'An account with this email already exists' }
      })
    }

    // Create new user
    const newUser = {
      id: uuidv4(),
      email: email.toLowerCase(),
      passwordHash: await hashPassword(password),
      firstName,
      lastName,
      phone: phone || '',
      dateOfBirth: dateOfBirth || '',
      preferences: preferences || {},
      shippingAddresses: [],
      billingAddresses: [],
      orderHistory: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isActive: true
    }

    // Add user to store
    addUser(newUser)

    // Generate token
    const token = generateToken(newUser.id)

    const duration = Date.now() - startTime
    logger.response(event, 'POST', '/api/auth/register', 200, duration)
    logger.auth('register', true, newUser.id, { email: newUser.email }, event)

    // Return user data (excluding sensitive fields)
    return {
      success: true,
      message: 'Registration successful',
      data: {
        id: newUser.id,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        phone: newUser.phone,
        preferences: newUser.preferences,
        token
      },
      meta: {
        timestamp: new Date().toISOString()
      }
    }
  } catch (error: any) {
    const duration = Date.now() - startTime
    logger.errorDetail('REGISTER_ERROR', error.message || error, error, event)
    logger.response(event, 'POST', '/api/auth/register', error.statusCode || 500, duration)
    
    // Log failed registration
    if (error.statusCode !== 400 && error.statusCode !== 409) {
      logger.auth('register', false, undefined, { email: body?.email, reason: error.message }, event)
    }
    
    if (error.statusCode === 429) throw error
    if (error.statusCode === 400 || error.statusCode === 409) throw error
    throw createError({
      statusCode: 500,
      statusMessage: 'Registration failed',
      data: { message: 'An unexpected error occurred during registration' }
    })
  }
})
