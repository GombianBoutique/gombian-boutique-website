// server/api/newsletter/subscribe.post.ts
import { defineEventHandler, readBody, createError } from 'h3'
import { $fetch } from 'ofetch'

// Rate limiting configuration
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000 // 1 hour
const RATE_LIMIT_MAX_REQUESTS = 5 // Max 5 requests per IP per hour

// In-memory storage (replace with database in production)
const subscribers: string[] = []
const rateLimitStore: Map<string, { count: number; resetTime: number }> = new Map()

// reCAPTCHA verification
async function verifyRecaptcha(token: string): Promise<boolean> {
  const config = useRuntimeConfig()
  const recaptchaSecretKey = config.recaptchaSecretKey

  if (!recaptchaSecretKey || !token) {
    return false
  }

  try {
    const response = await $fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      body: {
        secret: recaptchaSecretKey,
        response: token
      }
    })

    // reCAPTCHA v3 returns a score (0.0 - 1.0)
    // Score > 0.5 means likely human
    return response.success && response.score >= 0.5
  } catch (error) {
    console.error('[Newsletter] reCAPTCHA verification error:', error)
    return false
  }
}

// Rate limiting middleware
function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now()
  const record = rateLimitStore.get(ip)

  if (!record || now > record.resetTime) {
    // Reset the counter
    rateLimitStore.set(ip, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW_MS
    })
    return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS - 1 }
  }

  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return { allowed: false, remaining: 0 }
  }

  record.count++
  rateLimitStore.set(ip, record)
  return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS - record.count }
}

// SendGrid email integration
async function sendWelcomeEmail(email: string): Promise<void> {
  const config = useRuntimeConfig()
  const sendgridApiKey = config.sendgridApiKey

  if (!sendgridApiKey) {
    console.log('[Newsletter] SendGrid not configured, skipping welcome email')
    return
  }

  try {
    await $fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${sendgridApiKey}`,
        'Content-Type': 'application/json'
      },
      body: {
        personalizations: [{
          to: [{ email }],
          subject: 'Welcome to Gombian Boutique Newsletter!'
        }],
        from: {
          email: config.contactEmail || 'noreply@gombianboutique.com',
          name: 'Gombian Boutique'
        },
        content: [{
          type: 'text/html',
          value: `
            <html>
              <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                  <h1 style="color: #1a3c1a;">Welcome to Gombian Boutique!</h1>
                  <p>Thank you for subscribing to our newsletter.</p>
                  <p>You'll now receive:</p>
                  <ul>
                    <li>Exclusive deals and promotions</li>
                    <li>New product announcements</li>
                    <li>Fragrance tips and inspiration</li>
                  </ul>
                  <p>Best regards,<br>The Gombian Boutique Team</p>
                  <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
                  <p style="font-size: 12px; color: #666;">
                    You received this email because you subscribed to our newsletter.
                    If you no longer wish to receive these emails, you can 
                    <a href="${config.appUrl}/unsubscribe?email=${encodeURIComponent(email)}">unsubscribe here</a>.
                  </p>
                </div>
              </body>
            </html>
          `
        }]
      }
    })

    console.log('[Newsletter] Welcome email sent to:', email)
  } catch (error) {
    console.error('[Newsletter] Failed to send welcome email:', error)
    // Don't throw - email failure shouldn't break subscription
  }
}

// Add to email marketing platform (Mailchimp example)
async function addToMailchimp(email: string): Promise<void> {
  const config = useRuntimeConfig()
  const mailchimpApiKey = config.mailchimpApiKey
  const mailchimpListId = config.mailchimpListId
  const mailchimpServerPrefix = config.mailchimpServerPrefix // e.g., 'us1'

  if (!mailchimpApiKey || !mailchimpListId) {
    console.log('[Newsletter] Mailchimp not configured, skipping')
    return
  }

  try {
    await $fetch(
      `https://${mailchimpServerPrefix}.api.mailchimp.com/3.0/lists/${mailchimpListId}/members`,
      {
        method: 'POST',
        headers: {
          'Authorization': `apikey ${mailchimpApiKey}`,
          'Content-Type': 'application/json'
        },
        body: {
          email_address: email,
          status: 'subscribed',
          merge_fields: {
            FNAME: '',
            LNAME: ''
          }
        }
      }
    )

    console.log('[Newsletter] Added to Mailchimp:', email)
  } catch (error: any) {
    // Member might already exist
    if (error.status === 400 && error.response?.data?.title === 'Member Exists') {
      console.log('[Newsletter] Already in Mailchimp:', email)
    } else {
      console.error('[Newsletter] Failed to add to Mailchimp:', error)
    }
  }
}

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { email, acceptPrivacyPolicy, recaptchaToken } = body

    // 1. Validate GDPR consent
    if (!acceptPrivacyPolicy) {
      throw createError({
        statusCode: 400,
        statusMessage: 'You must accept the privacy policy to subscribe'
      })
    }

    // 2. Validate email exists
    if (!email || typeof email !== 'string') {
      throw createError({
        statusCode: 400,
        statusMessage: 'Email is required'
      })
    }

    // 3. Normalize email
    const normalizedEmail = email.toLowerCase().trim()

    // 4. Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(normalizedEmail)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid email format'
      })
    }

    // 5. Get client IP for rate limiting
    const clientIP = event.node.req.socket.remoteAddress || 
                     event.node.req.headers['x-forwarded-for']?.toString().split(',')[0]?.trim() ||
                     'unknown'

    // 6. Check rate limit
    const rateLimitResult = checkRateLimit(clientIP)
    
    // Add rate limit headers to response
    event.node.res.setHeader('X-RateLimit-Limit', RATE_LIMIT_MAX_REQUESTS.toString())
    event.node.res.setHeader('X-RateLimit-Remaining', rateLimitResult.remaining.toString())

    if (!rateLimitResult.allowed) {
      const resetTime = rateLimitStore.get(clientIP)?.resetTime || Date.now() + RATE_LIMIT_WINDOW_MS
      event.node.res.setHeader('Retry-After', Math.ceil((resetTime - Date.now()) / 1000).toString())
      
      throw createError({
        statusCode: 429,
        statusMessage: 'Too many subscription attempts. Please try again later.'
      })
    }

    // 7. Verify reCAPTCHA
    if (recaptchaToken) {
      const isHuman = await verifyRecaptcha(recaptchaToken)
      if (!isHuman) {
        console.warn('[Newsletter] reCAPTCHA verification failed for IP:', clientIP)
        throw createError({
          statusCode: 400,
          statusMessage: 'Verification failed. Please try again.'
        })
      }
    } else {
      console.warn('[Newsletter] No reCAPTCHA token provided')
      // Optionally reject if reCAPTCHA is required
    }

    // 8. Log subscription attempt
    console.log('[Newsletter] Subscription attempt:', {
      email: normalizedEmail,
      timestamp: new Date().toISOString(),
      ip: clientIP
    })

    // 9. Check if already subscribed
    if (subscribers.includes(normalizedEmail)) {
      console.log('[Newsletter] Already subscribed:', normalizedEmail)
      return {
        success: true,
        message: 'Already subscribed',
        alreadySubscribed: true
      }
    }

    // 10. Add to subscribers list
    subscribers.push(normalizedEmail)

    // 11. Log successful subscription
    console.log('[Newsletter] New subscriber:', normalizedEmail)
    console.log('[Newsletter] Total subscribers:', subscribers.length)

    // ========================================================================
    // PRODUCTION INTEGRATIONS (executed in parallel, non-blocking)
    // ========================================================================
    
    // Execute integrations in parallel but don't wait for them to complete
    Promise.all([
      // 1. Send welcome email via SendGrid
      sendWelcomeEmail(normalizedEmail),
      
      // 2. Add to Mailchimp (if configured)
      addToMailchimp(normalizedEmail),
      
      // 3. Store in database (when database is configured)
      // await db.newsletterSubscribers.create({
      //   email: normalizedEmail,
      //   subscribedAt: new Date(),
      //   source: 'website_footer',
      //   ip: clientIP,
      //   consentGiven: true
      // })
      
      // 4. Track analytics
      // await analytics.track('Newsletter Subscription', { 
      //   email: normalizedEmail,
      //   timestamp: new Date().toISOString()
      // })
    ]).catch(error => {
      console.error('[Newsletter] Integration error:', error)
      // Don't fail the subscription if integrations fail
    })

    return {
      success: true,
      message: 'Successfully subscribed',
      subscriberCount: subscribers.length
    }
  } catch (error: any) {
    // Re-throw h3 errors
    if (error.statusCode) {
      throw error
    }

    // Log unexpected errors
    console.error('[Newsletter] Subscription error:', {
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    })

    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to subscribe'
    })
  }
})

// Helper function to get subscriber count (for admin endpoints)
export const getSubscriberCount = () => subscribers.length

// Helper function to export subscribers (for admin endpoints)
export const exportSubscribers = () => [...subscribers]

// Helper function to clear rate limit (for admin/testing)
export const clearRateLimit = (ip: string) => rateLimitStore.delete(ip)
