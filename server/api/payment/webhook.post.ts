// server/api/payment/webhook.post.ts
import { defineEventHandler, readRawBody, createError, getHeader } from 'h3'
import Stripe from 'stripe'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  
  try {
    const body = await readRawBody(event)
    const signature = getHeader(event, 'stripe-signature')
    
    if (!signature) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing Stripe signature'
      })
    }

    // Initialize Stripe
    const stripe = new Stripe(config.stripeSecretKey, {
      apiVersion: '2024-12-18.acacia'
    })

    // Verify webhook signature
    let stripeEvent: Stripe.Event
    
    try {
      stripeEvent = stripe.webhooks.constructEvent(
        body!,
        signature,
        config.stripeWebhookSecret
      )
    } catch (err: any) {
      console.error('Webhook signature verification failed:', err.message)
      throw createError({
        statusCode: 400,
        statusMessage: `Webhook Error: ${err.message}`
      })
    }

    // Handle the event
    switch (stripeEvent.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = stripeEvent.data.object as Stripe.PaymentIntent
        console.log('PaymentIntent was successful!', paymentIntent.id)
        // TODO: Update order status to paid
        break
      
      case 'payment_intent.payment_failed':
        const failedIntent = stripeEvent.data.object as Stripe.PaymentIntent
        console.error('PaymentIntent failed:', failedIntent.id)
        // TODO: Update order status to failed, notify customer
        break
      
      case 'charge.refunded':
        const charge = stripeEvent.data.object as Stripe.Charge
        console.log('Charge was refunded:', charge.id)
        // TODO: Update order status to refunded
        break
      
      default:
        console.log(`Unhandled event type: ${stripeEvent.type}`)
    }

    return {
      success: true,
      received: true
    }
  } catch (error: any) {
    console.error('Webhook error:', error)
    
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || 'Webhook processing failed'
    })
  }
})
