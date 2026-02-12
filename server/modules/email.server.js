// server/modules/email.server.js
import { defineNuxtModule, addPlugin } from '@nuxt/kit'

export default defineNuxtModule({
  meta: {
    name: 'email',
    configKey: 'email',
    compatibility: {
      nuxt: '^3.0.0 || ^4.0.0'
    }
  },
  setup(_options, nuxt) {
    // Add runtime config for SendGrid API key
    nuxt.options.runtimeConfig = nuxt.options.runtimeConfig || {}
    nuxt.options.runtimeConfig.sendgridApiKey = nuxt.options.runtimeConfig.sendgridApiKey || ''

    // Add plugin to initialize SendGrid
    addPlugin({
      src: '~/plugins/email.server.js',
      mode: 'server'
    })
  }
})