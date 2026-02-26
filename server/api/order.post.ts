// server/api/order.post.ts

import { defineEventHandler, readBody, getHeader, createError } from 'h3';
import { createTransport } from 'nodemailer';
import sanitizeHtml from 'sanitize-html';
import { verifyRecaptcha } from '../utils/recaptcha';
import { createOrder as storeOrder } from '../utils/order-store';
import { v4 as uuidv4 } from 'uuid';

export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
}

export interface OrderAddress {
  firstName: string;
  lastName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface OrderData {
  orderNumber?: string; // Optional - generated on server if not provided
  email: string;
  paymentMethod: string;
  paymentStatus: string;
  shippingAddress: OrderAddress;
  billingAddress: OrderAddress;
  items: OrderItem[];
  totals: {
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
  };
  hasPopUpload: boolean;
  proofOfPayment?: string; // Base64 encoded file data
  proofOfPaymentFileName?: string;
  recaptchaToken: string;
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody<OrderData>(event).catch(() => null);

  try {
    // Validate body exists
    if (!body) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid request body',
        data: {}
      });
    }

    // Validate required fields (orderNumber is optional - generated on server if not provided)
    const requiredFields: Array<keyof OrderData> = ['email', 'paymentMethod', 'paymentStatus', 'shippingAddress', 'billingAddress', 'items', 'totals', 'recaptchaToken'];
    const missingFields: string[] = [];

    requiredFields.forEach(field => {
      if (!body[field]) {
        missingFields.push(field);
      }
    });

    if (missingFields.length > 0) {
      throw createError({
        statusCode: 400,
        statusMessage: `Missing required fields: ${missingFields.join(', ')}`,
        data: body
      });
    }

    // Verify reCAPTCHA
    await verifyRecaptcha(body.recaptchaToken);

    // Generate order number
    const orderNumber = `GB-${Date.now()}-${Math.floor(100000 + Math.random() * 900000)}`;

    // Generate order ID for internal tracking
    const orderId = uuidv4()

    // Sanitize inputs
    const sanitized = {
      orderNumber,
      email: sanitizeHtml(body.email),
      paymentMethod: sanitizeHtml(body.paymentMethod),
      paymentStatus: sanitizeHtml(body.paymentStatus),
      shippingAddress: {
        firstName: sanitizeHtml(body.shippingAddress.firstName),
        lastName: sanitizeHtml(body.shippingAddress.lastName),
        addressLine1: sanitizeHtml(body.shippingAddress.addressLine1),
        addressLine2: body.shippingAddress.addressLine2 ? sanitizeHtml(body.shippingAddress.addressLine2) : '',
        city: sanitizeHtml(body.shippingAddress.city),
        state: sanitizeHtml(body.shippingAddress.state),
        postalCode: sanitizeHtml(body.shippingAddress.postalCode),
        country: sanitizeHtml(body.shippingAddress.country)
      },
      billingAddress: {
        firstName: sanitizeHtml(body.billingAddress.firstName),
        lastName: sanitizeHtml(body.billingAddress.lastName),
        addressLine1: sanitizeHtml(body.billingAddress.addressLine1),
        addressLine2: body.billingAddress.addressLine2 ? sanitizeHtml(body.billingAddress.addressLine2) : '',
        city: sanitizeHtml(body.billingAddress.city),
        state: sanitizeHtml(body.billingAddress.state),
        postalCode: sanitizeHtml(body.billingAddress.postalCode),
        country: sanitizeHtml(body.billingAddress.country)
      },
      items: body.items.map(item => ({
        productId: sanitizeHtml(item.productId),
        productName: sanitizeHtml(item.productName),
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        totalPrice: item.totalPrice
      })),
      totals: body.totals
    };

    // Format order items for email
    const itemsHtml = sanitized.items.map(item => `
      <tr>
        <td style="padding: 12px 8px; border-bottom: 1px solid #e5e7eb;">${item.productName}</td>
        <td style="padding: 12px 8px; border-bottom: 1px solid #e5e7eb; text-align: center;">${item.quantity}</td>
        <td style="padding: 12px 8px; border-bottom: 1px solid #e5e7eb; text-align: right;">R ${item.unitPrice.toFixed(2)}</td>
        <td style="padding: 12px 8px; border-bottom: 1px solid #e5e7eb; text-align: right;">R ${item.totalPrice.toFixed(2)}</td>
      </tr>
    `).join('');

    // Format order items for text email
    const itemsText = sanitized.items.map(item => 
      `${item.productName} (Qty: ${item.quantity}) - R ${item.unitPrice.toFixed(2)} = R ${item.totalPrice.toFixed(2)}`
    ).join('\n');

    // Determine payment instructions based on method
    let paymentInstructionsHtml = '';
    let paymentInstructionsText = '';

    if (body.paymentMethod === 'manual') {
      paymentInstructionsHtml = `
        <div style="background: linear-gradient(135deg, #fef3c7 0%, #fef9c3 100%); padding: 30px; border-radius: 12px; margin: 30px 0; border-left: 5px solid #f59e0b; box-shadow: 0 2px 8px rgba(245, 158, 11, 0.15);">
          <h3 style="color: #92400e; margin-top: 0; font-size: 20px; font-weight: 700; display: flex; align-items: center;">
            <span style="background: #f59e0b; color: #fff; width: 32px; height: 32px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-right: 12px; font-size: 16px;">🏦</span>
            Payment Instructions (Manual Payment)
          </h3>
          <p style="color: #78350f; margin: 15px 0 0 0; font-size: 15px;">Please make payment to the following account:</p>
          <div style="background: white; padding: 25px; border-radius: 10px; margin: 20px 0; border: 2px dashed #f59e0b; box-shadow: inset 0 2px 4px rgba(0,0,0,0.03);">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; font-size: 15px; color: #6b7280; width: 40%;"><strong>Bank:</strong></td>
                <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; font-size: 15px; color: #1f2937; font-weight: 600;">FNB</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; font-size: 15px; color: #6b7280;"><strong>Account Name:</strong></td>
                <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; font-size: 15px; color: #1f2937; font-weight: 600;">Gombian Boutique</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; font-size: 15px; color: #6b7280;"><strong>Account Number:</strong></td>
                <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; font-size: 15px; color: #1f2937; font-weight: 600; font-family: 'Courier New', monospace;">123456789</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; font-size: 15px; color: #6b7280;"><strong>Branch Code:</strong></td>
                <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; font-size: 15px; color: #1f2937; font-weight: 600; font-family: 'Courier New', monospace;">250655</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; font-size: 15px; color: #6b7280;"><strong>Reference:</strong></td>
                <td style="padding: 12px 0; font-size: 15px; color: #2d5016; font-weight: 700; font-family: 'Courier New', monospace; background: #f0f9f0; padding: 8px 12px; border-radius: 6px; display: inline-block;">${orderNumber}</td>
              </tr>
            </table>
          </div>
          <div style="background: #fee2e2; border-left: 4px solid #dc2626; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #991b1b; font-size: 14px; font-weight: 600;">
              <strong>⚠️ Important:</strong> Please send proof of payment to <a href="mailto:orders@gombianboutique.co.za" style="color: #dc2626; text-decoration: none; font-weight: 700;">orders@gombianboutique.co.za</a> within 24 hours.
            </p>
          </div>
          <p style="color: #78350f; margin: 15px 0 0 0; font-size: 15px;">Your order will be processed once payment is confirmed.</p>
        </div>
      `;

      paymentInstructionsText = `
╔═══════════════════════════════════════════════════════════╗
║     PAYMENT INSTRUCTIONS (Manual Payment)                 ║
╚═══════════════════════════════════════════════════════════╝

Please make payment to the following account:

┌───────────────────────────────────────────────────────────┐
│  Bank:            FNB                                     │
│  Account Name:    Gombian Boutique                        │
│  Account Number:  123456789                               │
│  Branch Code:     250655                                  │
│  Reference:       ${orderNumber}           │
└───────────────────────────────────────────────────────────┘

⚠️  IMPORTANT: Please send proof of payment to 
   orders@gombianboutique.co.za within 24 hours.

Your order will be processed once payment is confirmed.
      `;
    } else {
      const paymentStatusColor = body.paymentStatus === 'completed' ? '#059669' : '#d97706';
      const paymentStatusBg = body.paymentStatus === 'completed' ? '#d1fae5' : '#fef3c7';
      const paymentStatusIcon = body.paymentStatus === 'completed' ? '✅' : '⏳';
      const paymentStatusText = body.paymentStatus === 'completed' ? 'Payment Confirmed' : 'Payment Pending';
      
      paymentInstructionsHtml = `
        <div style="background: linear-gradient(135deg, ${paymentStatusBg} 0%, ${body.paymentStatus === 'completed' ? '#ecfdf5' : '#fef9c3'} 100%); padding: 30px; border-radius: 12px; margin: 30px 0; border-left: 5px solid ${paymentStatusColor}; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">
          <h3 style="color: ${paymentStatusColor}; margin-top: 0; font-size: 20px; font-weight: 700; display: flex; align-items: center;">
            <span style="background: ${paymentStatusColor}; color: #fff; width: 32px; height: 32px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-right: 12px; font-size: 16px;">${paymentStatusIcon}</span>
            Payment Status: ${body.paymentStatus === 'completed' ? 'Paid' : 'Pending'}
          </h3>
          <p style="color: #374151; margin: 15px 0 0 0; font-size: 16px; line-height: 1.7;">
            ${paymentStatusIcon} Your payment has been ${body.paymentStatus === 'completed' ? '<strong style="color: #059669;">successfully processed</strong> and your order is being prepared.' : '<strong style="color: #d97706;">received and is being verified</strong>. You will receive a confirmation email once payment is confirmed.'}
          </p>
        </div>
      `;

      paymentInstructionsText = `
╔═══════════════════════════════════════════════════════════╗
║  PAYMENT STATUS: ${body.paymentStatus === 'completed' ? 'PAID ✅' : 'PENDING ⏳'}                          ║
╚═══════════════════════════════════════════════════════════╝

Your payment has been ${body.paymentStatus === 'completed' ? 'successfully processed' : 'received and is being verified'}.
${body.paymentStatus === 'completed' ? 'Your order is being prepared for shipment.' : 'You will receive a confirmation email once payment is confirmed.'}
      `;
    }

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
    });

    // Prepare attachments array
    const attachments: any[] = [];
    
    // Add proof of payment attachment if provided
    if (body.proofOfPayment && body.proofOfPaymentFileName) {
      // Extract base64 data from data URL (remove "data:image/jpeg;base64," prefix)
      const base64Data = body.proofOfPayment.replace(/^data:.*;base64,/, '');
      attachments.push({
        filename: body.proofOfPaymentFileName,
        content: base64Data,
        encoding: 'base64'
      });
    }

    // Send order confirmation email to customer (HTML + Text)
    await transporter.sendMail({
      from: `"Gombian Boutique" <${config.mailUser}>`,
      to: sanitized.email,
      subject: `Order Confirmation - ${orderNumber}`,
      text: `
╔═══════════════════════════════════════════════════════════╗
║                    GOMBIAN BOUTIQUE                        ║
║              Luxury Perfumes | Crafted with Excellence     ║
╚═══════════════════════════════════════════════════════════╝

Thank you for your order!

ORDER NUMBER: ${orderNumber}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                        ORDER DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${itemsText}

┌───────────────────────────────────────────────────────────┐
│  Subtotal:  R ${sanitized.totals.subtotal.toFixed(2).padStart(12, ' ')}                         │
│  Shipping:  R ${sanitized.totals.shipping.toFixed(2).padStart(12, ' ')}                         │
│  Tax:       R ${sanitized.totals.tax.toFixed(2).padStart(12, ' ')}                         │
│  ─────────────────────────────────────────────────────    │
│  TOTAL:     R ${sanitized.totals.total.toFixed(2).padStart(12, ' ')}                         │
└───────────────────────────────────────────────────────────┘

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                      SHIPPING ADDRESS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${sanitized.shippingAddress.firstName} ${sanitized.shippingAddress.lastName}
${sanitized.shippingAddress.addressLine1}
${sanitized.shippingAddress.addressLine2 ? sanitized.shippingAddress.addressLine2 + ', ' : ''}${sanitized.shippingAddress.city}, ${sanitized.shippingAddress.state} ${sanitized.shippingAddress.postalCode}
${sanitized.shippingAddress.country}

${paymentInstructionsText}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Questions? Contact us at gombianholdings@gmail.com

Thank you for shopping with Gombian Boutique!
      `,
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Confirmation - Gombian Boutique</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Inter', 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #374151; background: linear-gradient(180deg, #f0f9f0 0%, #f9fafb 100%);">
  <table role="presentation" style="width: 100%; border-collapse: collapse; background: linear-gradient(180deg, #f0f9f0 0%, #f9fafb 100%); min-height: 100vh;">
    <tr>
      <td align="center" style="padding: 40px 20px 60px 20px;">
        <table role="presentation" style="max-width: 640px; width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 40px rgba(45, 80, 22, 0.15);">
          
          <!-- Brand Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #1a3009 0%, #2d5016 50%, #3d6b1f 100%); padding: 50px 40px; text-align: center; position: relative;">
              <div style="background: rgba(255,255,255,0.1); border-radius: 50%; width: 80px; height: 80px; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; border: 3px solid rgba(255,255,255,0.3);">
                <span style="font-size: 36px; color: #fff; font-weight: 700;">GB</span>
              </div>
              <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 700; letter-spacing: -0.5px; text-shadow: 0 2px 4px rgba(0,0,0,0.2);">Gombian Boutique</h1>
              <p style="margin: 12px 0 0 0; color: #d1fae5; font-size: 14px; letter-spacing: 1px; text-transform: uppercase; opacity: 0.9;">Luxury Perfumes | Crafted with Excellence</p>
            </td>
          </tr>

          <!-- Order Confirmation Banner -->
          <tr>
            <td style="background: linear-gradient(135deg, #2d5016 0%, #3d6b1f 100%); padding: 35px 40px; text-align: center; border-bottom: 4px solid #4a8f2d;">
              <h2 style="margin: 0; color: #ffffff; font-size: 26px; font-weight: 600; letter-spacing: -0.3px;">Order Confirmation</h2>
              <p style="margin: 12px 0 0 0; color: #d1fae5; font-size: 15px; background: rgba(255,255,255,0.15); display: inline-block; padding: 8px 24px; border-radius: 20px; font-family: 'Courier New', monospace; letter-spacing: 1px;">Order #${orderNumber}</p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 45px 40px;">
              <p style="margin: 0 0 10px 0; font-size: 18px; color: #1f2937; font-weight: 600;">Dear ${sanitized.shippingAddress.firstName} ${sanitized.shippingAddress.lastName},</p>
              <p style="margin: 0 0 35px 0; font-size: 16px; color: #6b7280; line-height: 1.7;">Thank you for your order! We've received your order and will process it shortly. You'll receive another email when your order ships.</p>

              <!-- Order Details Section -->
              <div style="background: linear-gradient(135deg, #f0f9f0 0%, #f5f5f5 100%); border-radius: 12px; padding: 30px; margin: 30px 0; border: 1px solid #e5e7eb;">
                <h3 style="color: #2d5016; font-size: 22px; margin: 0 0 20px 0; font-weight: 600; display: flex; align-items: center;">
                  <span style="background: #2d5016; color: #fff; width: 32px; height: 32px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-right: 12px; font-size: 16px;">📦</span>
                  Order Details
                </h3>
                <table style="width: 100%; border-collapse: collapse; margin: 0;">
                  <thead>
                    <tr style="background: linear-gradient(135deg, #2d5016 0%, #3d6b1f 100%); color: #ffffff;">
                      <th style="padding: 14px 12px; text-align: left; font-weight: 600; font-size: 14px; border-radius: 8px 0 0 0;">Product</th>
                      <th style="padding: 14px 8px; text-align: center; font-weight: 600; font-size: 14px;">Qty</th>
                      <th style="padding: 14px 8px; text-align: right; font-weight: 600; font-size: 14px;">Price</th>
                      <th style="padding: 14px 12px; text-align: right; font-weight: 600; font-size: 14px; border-radius: 0 8px 0 0;">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${sanitized.items.map((item: any, index: number) => `
                    <tr style="background-color: ${index % 2 === 0 ? '#ffffff' : '#f9fafb'};">
                      <td style="padding: 16px 12px; border-bottom: 1px solid #e5e7eb; font-size: 15px; color: #1f2937;">${item.productName}</td>
                      <td style="padding: 16px 8px; border-bottom: 1px solid #e5e7eb; text-align: center; font-size: 15px; color: #6b7280;">${item.quantity}</td>
                      <td style="padding: 16px 8px; border-bottom: 1px solid #e5e7eb; text-align: right; font-size: 15px; color: #6b7280;">R ${item.unitPrice.toFixed(2)}</td>
                      <td style="padding: 16px 12px; border-bottom: 1px solid #e5e7eb; text-align: right; font-size: 15px; color: #1f2937; font-weight: 600;">R ${item.totalPrice.toFixed(2)}</td>
                    </tr>
                    `).join('')}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colspan="3" style="padding: 14px 12px; text-align: right; border-top: 2px solid #e5e7eb; font-size: 15px; color: #6b7280;"><strong>Subtotal:</strong></td>
                      <td style="padding: 14px 12px; text-align: right; border-top: 2px solid #e5e7eb; font-size: 15px; color: #1f2937;">R ${sanitized.totals.subtotal.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td colspan="3" style="padding: 14px 12px; text-align: right; font-size: 15px; color: #6b7280;"><strong>Shipping:</strong></td>
                      <td style="padding: 14px 12px; text-align: right; font-size: 15px; color: #1f2937;">R ${sanitized.totals.shipping.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td colspan="3" style="padding: 14px 12px; text-align: right; font-size: 15px; color: #6b7280;"><strong>Tax:</strong></td>
                      <td style="padding: 14px 12px; text-align: right; font-size: 15px; color: #1f2937;">R ${sanitized.totals.tax.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td colspan="3" style="padding: 20px 12px; text-align: right; font-size: 22px; font-weight: 700; color: #ffffff; background: linear-gradient(135deg, #2d5016 0%, #3d6b1f 100%); border-radius: 8px; border-top: 3px solid #1a3009;">Total:</td>
                      <td style="padding: 20px 12px; text-align: right; font-size: 22px; font-weight: 700; color: #ffffff; background: linear-gradient(135deg, #2d5016 0%, #3d6b1f 100%); border-radius: 0 8px 8px 0; border-top: 3px solid #1a3009;">R ${sanitized.totals.total.toFixed(2)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              <!-- Shipping Address Section -->
              <div style="background: #f9fafb; border: 2px dashed #d1d5db; border-radius: 12px; padding: 25px; margin: 30px 0;">
                <h3 style="color: #2d5016; font-size: 18px; margin: 0 0 15px 0; font-weight: 600; display: flex; align-items: center;">
                  <span style="background: #2d5016; color: #fff; width: 28px; height: 28px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-right: 10px; font-size: 14px;">📍</span>
                  Shipping Address
                </h3>
                <p style="margin: 0; line-height: 1.8; font-size: 15px; color: #374151;">
                  <strong style="color: #1f2937; font-size: 16px;">${sanitized.shippingAddress.firstName} ${sanitized.shippingAddress.lastName}</strong><br>
                  ${sanitized.shippingAddress.addressLine1}<br>
                  ${sanitized.shippingAddress.addressLine2 ? sanitized.shippingAddress.addressLine2 + '<br>' : ''}
                  ${sanitized.shippingAddress.city}, ${sanitized.shippingAddress.state} ${sanitized.shippingAddress.postalCode}<br>
                  ${sanitized.shippingAddress.country}
                </p>
              </div>

              <!-- Payment Instructions -->
              ${paymentInstructionsHtml}

              <!-- Support Banner -->
              <div style="background: linear-gradient(135deg, #f0f9f0 0%, #e0f2e0 100%); border-radius: 12px; padding: 25px; margin: 30px 0; text-align: center; border: 1px solid #86efac;">
                <p style="margin: 0 0 10px 0; font-size: 15px; color: #6b7280;">Need help with your order?</p>
                <p style="margin: 0; font-size: 16px; color: #1f2937;">
                  <strong style="color: #2d5016;">📧</strong> 
                  <a href="mailto:gombianholdings@gmail.com" style="color: #2d5016; text-decoration: none; font-weight: 600; border-bottom: 2px solid #86efac;">gombianholdings@gmail.com</a>
                </p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background: linear-gradient(135deg, #1f2937 0%, #374151 100%); color: #ffffff; padding: 35px 40px; text-align: center;">
              <p style="margin: 0 0 15px 0; font-size: 14px; color: #d1d5db;">&copy; 2026 Gombian Boutique. All rights reserved.</p>
              <p style="margin: 0; font-size: 13px; color: #9ca3af; letter-spacing: 0.5px;">LUXURY PERFUMES | CRAFTED WITH EXCELLENCE</p>
              <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1);">
                <p style="margin: 0; font-size: 12px; color: #6b7280;">This email was sent to ${sanitized.email}</p>
              </div>
            </td>
          </tr>
          
        </table>
        <p style="margin: 20px 0 0 0; text-align: center; font-size: 12px; color: #9ca3af;">If you have any questions about this email, please contact our support team.</p>
      </td>
    </tr>
  </table>
</body>
</html>
      `,
      attachments
    });

    // Send notification email to admin (HTML + Text)
    await transporter.sendMail({
      from: `"Gombian Boutique Orders" <${config.mailUser}>`,
      to: config.contactEmail,
      subject: `🛍️ New Order Received - ${orderNumber}`,
      text: `
╔═══════════════════════════════════════════════════════════╗
║           GOMBIAN BOUTIQUE - ORDER NOTIFICATION           ║
╚═══════════════════════════════════════════════════════════╝

NEW ORDER ALERT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Order Number: ${orderNumber}
Order Date: ${new Date().toLocaleString('en-ZA')}
Customer: ${sanitized.shippingAddress.firstName} ${sanitized.shippingAddress.lastName}
Email: ${sanitized.email}
Phone: ${sanitized.shippingAddress.phone || 'Not provided'}
Payment Method: ${body.paymentMethod === 'manual' ? 'Manual Payment (EFT)' : 'Online Payment'}
Payment Status: ${body.paymentStatus}
Total Amount: R ${sanitized.totals.total.toFixed(2)}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ORDER ITEMS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${sanitized.items.map((item: any, index: number) => 
  `${index + 1}. ${item.productName}
   Quantity: ${item.quantity} x R ${item.unitPrice.toFixed(2)} = R ${item.totalPrice.toFixed(2)}`
).join('\n\n')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SHIPPING ADDRESS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${sanitized.shippingAddress.firstName} ${sanitized.shippingAddress.lastName}
${sanitized.shippingAddress.addressLine1}
${sanitized.shippingAddress.addressLine2 ? sanitized.shippingAddress.addressLine2 + ', ' : ''}${sanitized.shippingAddress.city}
${sanitized.shippingAddress.state} ${sanitized.shippingAddress.postalCode}
${sanitized.shippingAddress.country}
Phone: ${sanitized.shippingAddress.phone || 'Not provided'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BILLING ADDRESS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${sanitized.billingAddress.firstName} ${sanitized.billingAddress.lastName}
${sanitized.billingAddress.addressLine1}
${sanitized.billingAddress.addressLine2 ? sanitized.billingAddress.addressLine2 + ', ' : ''}${sanitized.billingAddress.city}
${sanitized.billingAddress.state} ${sanitized.billingAddress.postalCode}
${sanitized.billingAddress.country}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ORDER TOTALS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Subtotal:  R ${sanitized.totals.subtotal.toFixed(2)}
Shipping:  R ${sanitized.totals.shipping.toFixed(2)}
Tax (15%): R ${sanitized.totals.tax.toFixed(2)}
────────────────────────────────────────────────────────────
TOTAL:     R ${sanitized.totals.total.toFixed(2)}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${body.paymentMethod === 'manual' && body.hasPopUpload ? '⚠️ NOTE: Customer has uploaded proof of payment. Check attachments.' : ''}
${body.paymentMethod === 'manual' && !body.hasPopUpload ? '⚠️ NOTE: Manual payment - awaiting proof of payment from customer.' : ''}

Please process this order promptly.
      `,
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Order Received - Gombian Boutique</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Inter', 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #374151; background: linear-gradient(180deg, #f0f9f0 0%, #f9fafb 100%);">
  <table role="presentation" style="width: 100%; border-collapse: collapse; background: linear-gradient(180deg, #f0f9f0 0%, #f9fafb 100%); min-height: 100vh;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 40px rgba(45, 80, 22, 0.15);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #1a3009 0%, #2d5016 50%, #3d6b1f 100%); padding: 40px 35px; text-align: center;">
              <div style="background: rgba(255,255,255,0.15); border-radius: 50%; width: 70px; height: 70px; margin: 0 auto 15px; display: flex; align-items: center; justify-content: center; border: 3px solid rgba(255,255,255,0.4);">
                <span style="font-size: 32px;">🛍️</span>
              </div>
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">New Order Received</h1>
              <p style="margin: 12px 0 0 0; color: #d1fae5; font-size: 14px; background: rgba(255,255,255,0.15); display: inline-block; padding: 6px 20px; border-radius: 15px; font-family: 'Courier New', monospace; letter-spacing: 0.5px;">Order #${orderNumber}</p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px 35px;">
              <div style="background: linear-gradient(135deg, #fef3c7 0%, #fef9c3 100%); border-left: 4px solid #f59e0b; border-radius: 8px; padding: 20px; margin-bottom: 25px;">
                <p style="margin: 0; color: #92400e; font-size: 14px; font-weight: 600;">⚠️ Action Required: Please process this order promptly</p>
              </div>

              <!-- Payment Alert for Manual Payment -->
              ${body.paymentMethod === 'manual' ? `
              <div style="background: ${body.paymentStatus === 'verifying' && body.hasPopUpload ? 'linear-gradient(135deg, #dbeafe 0%, #eff6ff 100%)' : body.paymentStatus === 'pending' && !body.hasPopUpload ? 'linear-gradient(135deg, #fee2e2 0%, #fef2f2 100%)' : 'linear-gradient(135deg, #d1fae5 0%, #ecfdf5 100%)'}; border-left: 4px solid ${body.paymentStatus === 'verifying' && body.hasPopUpload ? '#2563eb' : body.paymentStatus === 'pending' && !body.hasPopUpload ? '#dc2626' : '#059669'}; border-radius: 8px; padding: 20px; margin-bottom: 25px;">
                <p style="margin: 0; color: ${body.paymentStatus === 'verifying' && body.hasPopUpload ? '#1e40af' : body.paymentStatus === 'pending' && !body.hasPopUpload ? '#991b1b' : '#065f46'}; font-size: 14px; font-weight: 600;">
                  ${body.paymentStatus === 'verifying' && body.hasPopUpload ? '🔍 Proof of Payment Received: Customer has uploaded proof of payment. Please verify and confirm.' : body.paymentStatus === 'pending' && !body.hasPopUpload ? '⏳ Payment Pending: Awaiting proof of payment from customer.' : '✅ Payment Confirmed: Payment has been successfully processed.'}
                </p>
                ${body.paymentStatus === 'verifying' && body.hasPopUpload ? '<p style="margin: 8px 0 0 0; color: #1e40af; font-size: 13px; font-style: italic;">📎 Check email attachments for proof of payment document.</p>' : ''}
              </div>
              ` : ''}

              <!-- Order Information -->
              <div style="background: #f9fafb; border-radius: 12px; padding: 25px; margin: 20px 0;">
                <h2 style="color: #2d5016; font-size: 18px; margin: 0 0 20px 0; font-weight: 600; display: flex; align-items: center;">
                  <span style="background: #2d5016; color: #fff; width: 28px; height: 28px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-right: 10px; font-size: 14px;">📋</span>
                  Order Information
                </h2>

                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-size: 14px; color: #6b7280; width: 40%;"><strong>Order Number:</strong></td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-size: 14px; color: #1f2937; font-weight: 600;">${orderNumber}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-size: 14px; color: #6b7280;"><strong>Order Date:</strong></td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-size: 14px; color: #1f2937;">${new Date().toLocaleString('en-ZA')}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-size: 14px; color: #6b7280;"><strong>Customer:</strong></td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-size: 14px; color: #1f2937; font-weight: 600;">${sanitized.shippingAddress.firstName} ${sanitized.shippingAddress.lastName}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-size: 14px; color: #6b7280;"><strong>Email:</strong></td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-size: 14px; color: #1f2937;">
                      <a href="mailto:${sanitized.email}" style="color: #2d5016; text-decoration: none;">${sanitized.email}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-size: 14px; color: #6b7280;"><strong>Phone:</strong></td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-size: 14px; color: #1f2937;">${sanitized.shippingAddress.phone || 'Not provided'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-size: 14px; color: #6b7280;"><strong>Payment Method:</strong></td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-size: 14px;">
                      <span style="background: ${body.paymentMethod === 'manual' ? '#fef3c7' : '#d1fae5'}; color: ${body.paymentMethod === 'manual' ? '#92400e' : '#065f46'}; padding: 6px 14px; border-radius: 12px; font-size: 13px; font-weight: 600; display: inline-block;">
                        ${body.paymentMethod === 'manual' ? '📄 Manual Payment (EFT)' : '💳 Online Payment'}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-size: 14px; color: #6b7280;"><strong>Payment Status:</strong></td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-size: 14px;">
                      <span style="background: ${body.paymentStatus === 'completed' ? '#d1fae5' : body.paymentStatus === 'verifying' ? '#dbeafe' : body.paymentStatus === 'pending' ? '#fef3c7' : '#fee2e2'}; color: ${body.paymentStatus === 'completed' ? '#065f46' : body.paymentStatus === 'verifying' ? '#1e40af' : body.paymentStatus === 'pending' ? '#92400e' : '#991b1b'}; padding: 6px 14px; border-radius: 12px; font-size: 13px; font-weight: 600; display: inline-block;">
                        ${body.paymentStatus === 'verifying' ? '🔍 Verifying' : body.paymentStatus.charAt(0).toUpperCase() + body.paymentStatus.slice(1)}
                      </span>
                    </td>
                  </tr>
                </table>
              </div>

              <!-- Order Items -->
              <div style="background: #ffffff; border: 2px solid #e5e7eb; border-radius: 12px; padding: 25px; margin: 20px 0;">
                <h2 style="color: #2d5016; font-size: 18px; margin: 0 0 20px 0; font-weight: 600; display: flex; align-items: center;">
                  <span style="background: #2d5016; color: #fff; width: 28px; height: 28px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-right: 10px; font-size: 14px;">📦</span>
                  Order Items (${sanitized.items.length})
                </h2>
                <table style="width: 100%; border-collapse: collapse;">
                  <thead>
                    <tr style="background: linear-gradient(135deg, #2d5016 0%, #3d6b1f 100%); color: #ffffff;">
                      <th style="padding: 12px 10px; text-align: left; font-weight: 600; font-size: 13px; border-radius: 8px 0 0 0;">Product</th>
                      <th style="padding: 12px 8px; text-align: center; font-weight: 600; font-size: 13px;">Qty</th>
                      <th style="padding: 12px 8px; text-align: right; font-weight: 600; font-size: 13px;">Price</th>
                      <th style="padding: 12px 10px; text-align: right; font-weight: 600; font-size: 13px; border-radius: 0 8px 0 0;">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${sanitized.items.map((item: any, index: number) => `
                    <tr style="background-color: ${index % 2 === 0 ? '#f9fafb' : '#ffffff'};">
                      <td style="padding: 14px 10px; border-bottom: 1px solid #e5e7eb; font-size: 14px; color: #1f2937; font-weight: 500;">${item.productName}</td>
                      <td style="padding: 14px 8px; border-bottom: 1px solid #e5e7eb; text-align: center; font-size: 14px; color: #6b7280;">${item.quantity}</td>
                      <td style="padding: 14px 8px; border-bottom: 1px solid #e5e7eb; text-align: right; font-size: 14px; color: #6b7280;">R ${item.unitPrice.toFixed(2)}</td>
                      <td style="padding: 14px 10px; border-bottom: 1px solid #e5e7eb; text-align: right; font-size: 14px; color: #1f2937; font-weight: 600;">R ${item.totalPrice.toFixed(2)}</td>
                    </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>

              <!-- Shipping & Billing Addresses -->
              <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                <tr>
                  <td style="width: 50%; padding: 0 10px; vertical-align: top;">
                    <div style="background: #f0f9f0; border-radius: 12px; padding: 20px; border: 1px solid #86efac;">
                      <h3 style="color: #2d5016; font-size: 16px; margin: 0 0 15px 0; font-weight: 600; display: flex; align-items: center;">
                        <span style="background: #2d5016; color: #fff; width: 26px; height: 26px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-right: 8px; font-size: 13px;">📍</span>
                        Shipping Address
                      </h3>
                      <p style="margin: 0; line-height: 1.8; font-size: 14px; color: #374151;">
                        <strong style="color: #1f2937; font-size: 15px;">${sanitized.shippingAddress.firstName} ${sanitized.shippingAddress.lastName}</strong><br>
                        ${sanitized.shippingAddress.addressLine1}<br>
                        ${sanitized.shippingAddress.addressLine2 ? sanitized.shippingAddress.addressLine2 + '<br>' : ''}
                        ${sanitized.shippingAddress.city}, ${sanitized.shippingAddress.state} ${sanitized.shippingAddress.postalCode}<br>
                        ${sanitized.shippingAddress.country}<br>
                        ${sanitized.shippingAddress.phone ? `<span style="margin-top: 8px; display: block;">📞 ${sanitized.shippingAddress.phone}</span>` : ''}
                      </p>
                    </div>
                  </td>
                  <td style="width: 50%; padding: 0 10px; vertical-align: top;">
                    <div style="background: #f0f9f0; border-radius: 12px; padding: 20px; border: 1px solid #86efac;">
                      <h3 style="color: #2d5016; font-size: 16px; margin: 0 0 15px 0; font-weight: 600; display: flex; align-items: center;">
                        <span style="background: #2d5016; color: #fff; width: 26px; height: 26px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-right: 8px; font-size: 13px;">💳</span>
                        Billing Address
                      </h3>
                      <p style="margin: 0; line-height: 1.8; font-size: 14px; color: #374151;">
                        <strong style="color: #1f2937; font-size: 15px;">${sanitized.billingAddress.firstName} ${sanitized.billingAddress.lastName}</strong><br>
                        ${sanitized.billingAddress.addressLine1}<br>
                        ${sanitized.billingAddress.addressLine2 ? sanitized.billingAddress.addressLine2 + '<br>' : ''}
                        ${sanitized.billingAddress.city}, ${sanitized.billingAddress.state} ${sanitized.billingAddress.postalCode}<br>
                        ${sanitized.billingAddress.country}
                      </p>
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Order Totals -->
              <div style="background: linear-gradient(135deg, #2d5016 0%, #3d6b1f 100%); border-radius: 12px; padding: 25px; margin: 20px 0; color: #ffffff;">
                <h3 style="color: #ffffff; font-size: 18px; margin: 0 0 20px 0; font-weight: 600; text-align: center;">
                  💰 Order Summary
                </h3>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.2); font-size: 15px; opacity: 0.9;">Subtotal:</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.2); font-size: 15px; text-align: right; font-weight: 500;">R ${sanitized.totals.subtotal.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.2); font-size: 15px; opacity: 0.9;">Shipping:</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.2); font-size: 15px; text-align: right; font-weight: 500;">R ${sanitized.totals.shipping.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.2); font-size: 15px; opacity: 0.9;">Tax (15%):</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.2); font-size: 15px; text-align: right; font-weight: 500;">R ${sanitized.totals.tax.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td style="padding: 15px 0 0 0; font-size: 20px; font-weight: 700; color: #ffffff;">TOTAL:</td>
                    <td style="padding: 15px 0 0 0; font-size: 24px; font-weight: 700; text-align: right; color: #ffffff;">R ${sanitized.totals.total.toFixed(2)}</td>
                  </tr>
                </table>
              </div>

              <!-- Quick Actions -->
              <div style="background: linear-gradient(135deg, #f0f9f0 0%, #e0f2e0 100%); border-radius: 12px; padding: 20px; margin: 20px 0; text-align: center; border: 1px solid #86efac;">
                <p style="margin: 0 0 15px 0; font-size: 14px; color: #6b7280; font-weight: 600;">Quick Actions</p>
                <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
                  <a href="mailto:${sanitized.email}" style="background: #2d5016; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-size: 14px; font-weight: 500; display: inline-block;">📧 Contact Customer</a>
                  <a href="mailto:orders@gombianboutique.co.za" style="background: #ffffff; color: #2d5016; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-size: 14px; font-weight: 500; border: 2px solid #2d5016; display: inline-block;">📦 Process Order</a>
                </div>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background: linear-gradient(135deg, #1f2937 0%, #374151 100%); color: #ffffff; padding: 25px 35px; text-align: center;">
              <p style="margin: 0 0 10px 0; font-size: 13px; color: #d1d5db;">Gombian Boutique Order Management System</p>
              <p style="margin: 0; font-size: 11px; color: #6b7280;">This is an automated notification. Please do not reply to this email.</p>
              <p style="margin: 10px 0 0 0; font-size: 11px; color: #9ca3af;">For support, contact: ${config.contactEmail}</p>
            </td>
          </tr>

        </table>
        <p style="margin: 20px 0 0 0; text-align: center; font-size: 12px; color: #9ca3af;">Order ID: ${orderId}</p>
      </td>
    </tr>
  </table>
</body>
</html>
      `,
      attachments
    });

    // Get user ID from token if authenticated
    let userId: string | undefined
    const authHeader = getHeader(event, 'authorization')
    if (authHeader) {
      try {
        const tokenValue = authHeader.startsWith('Bearer ') ? authHeader.substring(7) : authHeader
        const parts = tokenValue.split('.')
        if (parts.length === 3) {
          const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString())
          userId = payload.sub
          console.log(`[Order API] Order ${orderNumber} linked to user ${userId}`)
        }
      } catch (e) {
        console.log('[Order API] Could not extract user ID from token')
      }
    }

    // Store order in order store
    storeOrder({
      id: orderId,
      userId,
      orderNumber,
      email: sanitized.email,
      paymentMethod: body.paymentMethod,
      paymentStatus: body.paymentStatus as 'pending' | 'verifying' | 'completed' | 'failed' | 'refunded',
      shippingAddress: sanitized.shippingAddress,
      billingAddress: sanitized.billingAddress,
      items: sanitized.items,
      totals: sanitized.totals,
      status: body.paymentStatus === 'completed' ? 'processing' : 'pending',
      hasPopUpload: body.hasPopUpload,
      proofOfPaymentFileName: body.proofOfPaymentFileName,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    })

    return {
      success: true,
      message: 'Order placed successfully',
      orderNumber,
      orderId
    };

  } catch (error: any) {
    console.error('Order submission error:', error);

    // Don't expose internal errors
    if (error.statusCode === 400 || error.statusCode === 403) {
      throw error;
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to place order. Please try again later.',
      data: {}
    });
  }
});
