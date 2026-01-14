import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  typescript: {
    strict: true,
    shim: false
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@nuxtjs/robots'
  ],
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
        // Open Graph / Facebook
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://gombianboutique.com/' },
        { property: 'og:title', content: 'Gombian Boutique - Luxury Perfume Collection' },
        { property: 'og:description', content: 'Gombian Boutique - where the art of fragrance meets the luxury of villa-inspired fragrances. Experience our exclusive line of nature-inspired scents that transport and transform any space, crafted with high-quality, natural ingredients for a true luxury experience.' },
        { property: 'og:image', content: 'https://gombianboutique.com/images/products/Ladies 60ml Perfume.jpg' },

        // Twitter
        { property: 'twitter:card', content: 'summary_large_image' },
        { property: 'twitter:url', content: 'https://gombianboutique.com/' },
        { property: 'twitter:title', content: 'Gombian Boutique - Luxury Perfume Collection' },
        { property: 'twitter:description', content: 'Gombian Boutique - where the art of fragrance meets the luxury of villa-inspired fragrances. Experience our exclusive line of nature-inspired scents that transport and transform any space.' },
        { property: 'twitter:image', content: 'https://gombianboutique.com/images/products/Ladies Ultimate Combo.jpeg' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/images/logos/Logo 01.png' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@300;400;500;600;700&display=swap' }
      ]
    }
  },
  nitro: {
    prerender: {
      routes: ['/sitemap.xml']
    }
  }
})