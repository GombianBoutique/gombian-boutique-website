import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  compatibilityDate: '2026-01-14',

  // Static site generation for Netlify
  ssr: false,

  // Fallback for unknown dynamic routes (e.g., /products/new-slug)
  generate: {
    fallback: true
  },

  nitro: {
    preset: 'static',
    prerender: {
      crawlLinks: false,
      failOnError: false,
      routes: [
        '/',
        '/products',
        '/about',
        '/cart',
        '/checkout',
        '/contact',
        '/cookies',
        '/faq',
        '/login',
        '/register',
        '/policies',
        '/privacy',
        '/shipping',
        '/support',
        '/sustainability',
        '/terms',
        '/testimonials',
        '/track-order',
        '/wishlist',
        '/compare',
        '/confirmation',
        '/account',
        '/account/orders',
        '/account/profile',
        '/account/preferences',
        '/sitemap.xml'
      ]
    }
  },

  typescript: {
    strict: true,
    shim: false
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@nuxtjs/robots',
    '@nuxt/image',
    '~/modules/stripe.client.js',
    '@pinia/nuxt',
    '@nuxtjs/i18n'
  ],

  i18n: {
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    locales: [
      {
        code: 'en',
        name: 'English',
        iso: 'en-US'
      },
      {
        code: 'fr',
        name: 'Français',
        iso: 'fr-FR'
      }
    ]
  },

  plugins: [
    '~/plugins/accessibility.client.js',
    '~/plugins/errorHandler.js'
  ],

  runtimeConfig: {
    sendgridApiKey: process.env.SENDGRID_API_KEY || '',
    recaptchaSecretKey: process.env.NUXT_RECAPTCHA_SECRET_KEY || '',
    contactEmail: process.env.NUXT_CONTACT_EMAIL || 'gombianholdings@gmail.com',
    mailService: process.env.NUXT_MAIL_SERVICE || 'gmail',
    mailHost: process.env.NUXT_MAIL_HOST || 'smtp.gmail.com',
    mailPort: parseInt(process.env.NUXT_MAIL_PORT || '587'),
    mailUser: process.env.NUXT_MAIL_USER || '',
    mailPassword: process.env.NUXT_MAIL_PASSWORD || '',
    mailchimpApiKey: process.env.MAILCHIMP_API_KEY || '',
    mailchimpListId: process.env.MAILCHIMP_LIST_ID || '',
    mailchimpServerPrefix: process.env.MAILCHIMP_SERVER_PREFIX || 'us1',
    appUrl: process.env.APP_URL || 'http://localhost:3000',
    public: {
      stripePublicKey: process.env.STRIPE_PUBLIC_KEY || '',
      recaptchaSiteKey: process.env.NUXT_RECAPTCHA_SITE_KEY || '',
      canPersist: process.env.NUXT_CAN_PERSIST !== 'false',
      multiplePaymentMethods: process.env.NUXT_MULTIPLE_PAYMENT_METHODS !== 'false'
    }
  },

  colorMode: {
    classSuffix: '',
    preference: 'system',
    fallback: 'light',
    globalName: '__NUXT_COLOR_MODE__',
    storageKey: 'nuxt-color-mode'
  },

  app: {
    head: {
      title: 'Gombian Boutique - Luxury Perfume Collection',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'Gombian Boutique - where the art of fragrance meets the luxury of villa-inspired fragrances. Experience our exclusive line of nature-inspired scents that transport and transform any space, crafted with high-quality, natural ingredients for a true luxury experience.' },
        { name: 'keywords', content: 'perfume, luxury, fragrance, boutique, exclusive, elegant, sophisticated, artisanal' },
        { name: 'author', content: 'Gombian Boutique' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://gombianboutique.com/' },
        { property: 'og:title', content: 'Gombian Boutique - Luxury Perfume Collection' },
        { property: 'og:description', content: 'Gombian Boutique - where the art of fragrance meets the luxury of villa-inspired fragrances. Experience our exclusive line of nature-inspired scents that transport and transform any space, crafted with high-quality, natural ingredients for a true luxury experience.' },
        { property: 'og:image', content: 'https://gombianboutique.com/images/products/Ladies 60ml Perfume.jpg' },
        { property: 'twitter:card', content: 'summary_large_image' },
        { property: 'twitter:url', content: 'https://gombianboutique.com/' },
        { property: 'twitter:title', content: 'Gombian Boutique - Luxury Perfume Collection' },
        { property: 'twitter:description', content: 'Gombian Boutique - where the art of fragrance meets the luxury of villa-inspired fragrances. Experience our exclusive line of nature-inspired scents that transport and transform any space.' },
        { property: 'twitter:image', content: 'https://gombianboutique.com/images/products/Ladies Ultimate Combo.jpeg' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/images/logos/logo.png' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@300;400;500;600;700&display=swap' }
      ]
    }
  }
})
