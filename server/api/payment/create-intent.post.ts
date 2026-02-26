// server/api/payment/create-intent.post.ts
import { defineEventHandler, readBody, createError } from 'h3'
import Stripe from 'stripe'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  
  try {
    const body = await readBody(event)
    const { amount, currency, customerId } = body

    // Validate required fields
    if (!amount || !currency) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Amount and currency are required'
      })
    }

    // Initialize Stripe
    const stripe = new Stripe(config.stripeSecretKey, {
      apiVersion: '2024-12-18.acacia'
    })

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount), // Amount in cents
      currency: currency.toLowerCase(),
      metadata: {
        customerId: customerId || 'guest'
      },
      automatic_payment_methods: {
        enabled: true
      }
    })

    return {
      success: true,
      data: {
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id
      }
    }
  } catch (error: any) {
    console.error('Payment intent creation error:', error)
    
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || 'Failed to create payment intent'
    })
  }
})
