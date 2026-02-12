// plugins/stripe.client.js
import { loadStripe } from '@stripe/stripe-js'

export default defineNuxtPlugin({
  name: 'stripe',
  enforce: 'pre', // Load before other plugins
  async setup() {
    const config = useRuntimeConfig()
    let stripe = null

    try {
      stripe = await loadStripe(config.public.stripePublicKey)
    } catch (error) {
      console.error('Failed to initialize Stripe:', error)
    }

    return {
      provide: {
        stripe: stripe
      }
    }
  }
})