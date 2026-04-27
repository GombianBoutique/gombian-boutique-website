// server/api/payment/create-intent.post.ts
import { defineEventHandler, readBody, createError } from 'h3'
import { useRuntimeConfig } from '#imports'
import Stripe from 'stripe'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  try {
    const body = await readBody(event)
    const { amount, currency, customerId } = body as { amount?: number; currency?: string; customerId?: string }

    // Validate required fields
    if (!amount || !currency) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Amount and currency are required'
      })
    }

    // Initialize Stripe
    const stripeSecretKey = typeof config.stripeSecretKey === 'string' ? config.stripeSecretKey : 'sk_test_placeholder'
    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2026-01-28.clover'
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
