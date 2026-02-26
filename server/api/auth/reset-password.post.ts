// server/api/auth/reset-password.post.ts
import { defineEventHandler, readBody, createError } from 'h3'
import { createTransport } from 'nodemailer'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)
  const { email } = body

  try {
    // Validate email
    if (!email) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Email is required'
      })
    }

    // In production, you would:
    // 1. Check if user exists in database
    // 2. Generate a unique reset token
    // 3. Store token in database with expiration
    // 4. Send email with reset link

    // For now, generate a mock reset token
    const resetToken = Array.from({ length: 32 }, () => 
      Math.random().toString(36).charAt(2)
    ).join('')

    // Create reset link (in production, use actual domain)
    const resetLink = `https://gombianboutique.com/reset-password?token=${resetToken}&email=${encodeURIComponent(email)}`

    // Create Nodemailer transporter
    const transporter = createTransport({
      service: config.mailService,
      host: config.mailHost,
      port: config.mailPort,
      secure: config.mailPort === 465,
      auth: {
        user: config.mailUser,
        pass: config.mailPassword
      }
    })

    // Send password reset email
    await transporter.sendMail({
      from: `"Gombian Boutique" <${config.mailUser}>`,
      to: email,
      subject: 'Password Reset Request - Gombian Boutique',
      text: `
PASSWORD RESET REQUEST
======================

You requested to reset your password for Gombian Boutique.

Click the link below to reset your password:
${resetLink}

This link will expire in 1 hour.

If you did not request this password reset, please ignore this email.

Thank you,
Gombian Boutique Team
      `,
      html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #374151; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #2d5016 0%, #3d6b1f 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; }
    .content { background: #f9fafb; padding: 30px; }
    .button { display: inline-block; background: #2d5016; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; }
    .footer { background: #374151; color: white; padding: 15px; text-align: center; border-radius: 0 0 8px 8px; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin: 0;">Password Reset Request</h1>
      <p style="margin: 10px 0 0 0; opacity: 0.9;">Gombian Boutique</p>
    </div>
    <div class="content">
      <p>You requested to reset your password for Gombian Boutique.</p>
      <p style="text-align: center; margin: 30px 0;">
        <a href="${resetLink}" class="button">Reset Password</a>
      </p>
      <p style="color: #6b7280; font-size: 14px;">
        This link will expire in 1 hour. If you did not request this password reset, please ignore this email.
      </p>
    </div>
    <div class="footer">
      <p style="margin: 0;">Gombian Boutique - Luxury Perfumes</p>
      <p style="margin: 10px 0 0 0; opacity: 0.8;">Crafted with Excellence</p>
    </div>
  </div>
</body>
</html>
      `
    })

    return {
      success: true,
      message: 'Password reset email sent'
    }
  } catch (error: any) {
    console.error('Password reset error:', error)
    
    // For security, always return success even if email doesn't exist
    return {
      success: true,
      message: 'If an account exists, a reset link has been sent'
    }
  }
})
