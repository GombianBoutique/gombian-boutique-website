<!-- pages/support.vue -->
<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-4xl mx-auto">
      <!-- Page Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-serif-display font-bold text-luxury-green dark:text-white mb-4">
          Customer Support
        </h1>
        <p class="text-gray-600 dark:text-gray-400 text-lg">
          We're here to help! Choose how you'd like to get in touch.
        </p>
      </div>

      <!-- Support Options -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <!-- Email Support -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow">
          <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-luxury-green/10 flex items-center justify-center">
            <svg class="w-8 h-8 text-luxury-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Email Us</h3>
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            Get personalized assistance via email
          </p>
          <a href="mailto:gombianholdings@gmail.com" class="text-luxury-green hover:text-gold dark:text-gold dark:hover:text-luxury-green font-medium">
            gombianholdings@gmail.com
          </a>
        </div>

        <!-- Phone Support -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow">
          <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-luxury-green/10 flex items-center justify-center">
            <svg class="w-8 h-8 text-luxury-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
          <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Call Us</h3>
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            Speak with our support team
          </p>
          <a href="tel:+27123456789" class="text-luxury-green hover:text-gold dark:text-gold dark:hover:text-luxury-green font-medium">
            +27 12 345 6789
          </a>
          <p class="text-sm text-gray-500 dark:text-gray-500 mt-2">
            Mon-Fri, 9AM-5PM SAST
          </p>
        </div>

        <!-- Contact Form -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow">
          <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-luxury-green/10 flex items-center justify-center">
            <svg class="w-8 h-8 text-luxury-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Send Message</h3>
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            Fill out our contact form
          </p>
          <NuxtLink to="/contact" class="text-luxury-green hover:text-gold dark:text-gold dark:hover:text-luxury-green font-medium">
            Go to Contact Form →
          </NuxtLink>
        </div>
      </div>

      <!-- FAQ Section -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 mb-12">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          Frequently Asked Questions
        </h2>
        <div class="space-y-4">
          <NuxtLink
            to="/faq"
            class="block p-4 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
          >
            <div class="flex items-center justify-between">
              <span class="font-medium text-gray-900 dark:text-white">Browse all FAQs</span>
              <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </NuxtLink>
        </div>
      </div>

      <!-- Help Topics -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Help Topics
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <NuxtLink
            to="/policies"
            class="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-luxury-green dark:hover:border-luxury-green transition-colors"
          >
            <h3 class="font-bold text-gray-900 dark:text-white mb-2">Policies</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">Shipping, returns, and privacy policies</p>
          </NuxtLink>
          <NuxtLink
            to="/track-order"
            class="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-luxury-green dark:hover:border-luxury-green transition-colors"
          >
            <h3 class="font-bold text-gray-900 dark:text-white mb-2">Track Order</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">Check your order status and tracking</p>
          </NuxtLink>
          <NuxtLink
            to="/account/orders"
            class="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-luxury-green dark:hover:border-luxury-green transition-colors"
          >
            <h3 class="font-bold text-gray-900 dark:text-white mb-2">My Orders</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">View your order history</p>
          </NuxtLink>
          <NuxtLink
            to="/faq"
            class="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-luxury-green dark:hover:border-luxury-green transition-colors"
          >
            <h3 class="font-bold text-gray-900 dark:text-white mb-2">FAQs</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">Find answers to common questions</p>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'default'
})

useHead({
  title: 'Customer Support - Gombian Boutique',
  meta: [
    {
      name: 'description',
      content: 'Get help with your Gombian Boutique orders, products, and account. Contact our support team.'
    }
  ]
})
</script>
