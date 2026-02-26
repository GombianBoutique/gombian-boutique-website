// server/api/contact.post.ts

import { defineEventHandler, readBody } from 'h3';
import { createTransport } from 'nodemailer';
import sanitizeHtml from 'sanitize-html';
import { verifyRecaptcha } from '../utils/recaptcha';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody(event).catch(() => {});

  try {
    // Validate required fields
    const requiredFields = ['name', 'email', 'subject', 'message', 'recaptchaToken'];
    const missingFields = requiredFields.filter(field => !body[field]);
    
    if (missingFields.length > 0) {
      throw createError({
        statusCode: 400,
        statusMessage: `Missing required fields: ${missingFields.join(', ')}`,
        data: body
      });
    }

    // Verify reCAPTCHA
    await verifyRecaptcha(body.recaptchaToken);

    // Sanitize inputs
    const sanitized = {
      name: sanitizeHtml(body.name),
      email: sanitizeHtml(body.email),
      subject: sanitizeHtml(body.subject),
      message: sanitizeHtml(body.message)
    };

    // Create Nodemailer transporter
    const transporter = createTransport({
      service: config.mailService,
      host: config.mailHost,
      port: config.mailPort,
      secure: config.mailPort === 465, // true for 465, false for other ports
      auth: {
        user: config.mailUser,
        pass: config.mailPassword
      }
    });

    // Send email (HTML + Text)
    await transporter.sendMail({
      from: `"${sanitized.name}" <${sanitized.email}>`,
      to: config.contactEmail,
      subject: `Contact Form: ${sanitized.subject}`,
      text: `
NEW CONTACT FORM SUBMISSION
============================

Name: ${sanitized.name}
Email: ${sanitized.email}
Subject: ${sanitized.subject}
Message: ${sanitized.message}
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
    .info-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #2d5016; }
    .footer { background: #374151; color: white; padding: 15px; text-align: center; border-radius: 0 0 8px 8px; font-size: 12px; }
    .label { color: #6b7280; font-size: 14px; margin-bottom: 5px; }
    .value { color: #111827; font-size: 16px; font-weight: 500; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin: 0;">New Contact Form Submission</h1>
      <p style="margin: 10px 0 0 0; opacity: 0.9;">Gombian Boutique</p>
    </div>
    <div class="content">
      <div class="info-box">
        <p class="label">From:</p>
        <p class="value">${sanitized.name}</p>
        <p style="margin: 10px 0 0 0;"><a href="mailto:${sanitized.email}" style="color: #2d5016; text-decoration: none;">${sanitized.email}</a></p>
      </div>
      
      <div class="info-box">
        <p class="label">Subject:</p>
        <p class="value" style="color: #2d5016;">${sanitized.subject}</p>
      </div>
      
      <div class="info-box">
        <p class="label">Message:</p>
        <p class="value" style="white-space: pre-wrap; line-height: 1.8;">${sanitized.message}</p>
      </div>
      
      <p style="color: #6b7280; margin-top: 30px; text-align: center;">Please respond to this inquiry as soon as possible.</p>
    </div>
    <div class="footer">
      <p style="margin: 0;">Gombian Boutique Contact Management System</p>
      <p style="margin: 10px 0 0 0; opacity: 0.8;">Luxury Perfumes | Crafted with Excellence</p>
    </div>
  </div>
</body>
</html>
      `
    });

    return { 
      success: true,
      message: 'Message sent successfully'
    };

  } catch (error: any) {
    console.error('Contact form error:', error);

    // Don't expose internal errors
    if (error.statusCode === 400 || error.statusCode === 403) {
      throw error;
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to send message. Please try again later.',
      data: {}
    });
  }
});
