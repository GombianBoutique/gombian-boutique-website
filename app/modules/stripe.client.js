// modules/stripe.client.js
import { defineNuxtModule, addPlugin } from '@nuxt/kit'

export default defineNuxtModule({
  meta: {
    name: 'stripe',
    configKey: 'stripe',
    compatibility: {
      nuxt: '^3.0.0 || ^4.0.0'
    }
  },
  setup(_options, nuxt) {
    // Add runtime config for public key
    nuxt.options.runtimeConfig.public = nuxt.options.runtimeConfig.public || {}
    nuxt.options.runtimeConfig.public.stripePublicKey = nuxt.options.runtimeConfig.public.stripePublicKey || ''

    // Add plugin to initialize Stripe
    addPlugin({
      src: '~/plugins/stripe.client.js',
      mode: 'client'
    })
  }
})