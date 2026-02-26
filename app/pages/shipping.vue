<!-- pages/shipping.vue -->
<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-4xl mx-auto">
      <!-- Page Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-serif-display font-bold text-luxury-green dark:text-white mb-4">
          Shipping Policy
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          <strong>Last Updated:</strong> January 21, 2026
        </p>
      </div>

      <!-- Content -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 space-y-8">
        <!-- Overview -->
        <section>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
            At Gombian Boutique, we are committed to delivering your luxury fragrances with care and efficiency. 
            We offer multiple shipping options to meet your needs, with careful packaging to ensure your products 
            arrive in perfect condition.
          </p>
        </section>

        <!-- Shipping Options -->
        <section>
          <h2 class="text-2xl font-serif-display font-bold text-luxury-green dark:text-white mb-6">
            Shipping Options & Rates
          </h2>
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="border-b border-gray-200 dark:border-gray-700">
                  <th class="text-left py-3 text-luxury-green dark:text-gold">Shipping Method</th>
                  <th class="text-left py-3 text-luxury-green dark:text-gold">Delivery Time</th>
                  <th class="text-left py-3 text-luxury-green dark:text-gold">Cost</th>
                </tr>
              </thead>
              <tbody class="text-gray-700 dark:text-gray-300">
                <tr class="border-b border-gray-200 dark:border-gray-700">
                  <td class="py-4">Standard Shipping (South Africa)</td>
                  <td class="py-4">3-5 business days</td>
                  <td class="py-4">Free for orders over R500, otherwise R50</td>
                </tr>
                <tr class="border-b border-gray-200 dark:border-gray-700">
                  <td class="py-4">Express Shipping (South Africa)</td>
                  <td class="py-4">1-2 business days</td>
                  <td class="py-4">R100</td>
                </tr>
                <tr>
                  <td class="py-4">International Shipping</td>
                  <td class="py-4">7-14 business days</td>
                  <td class="py-4">Calculated at checkout</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- Processing Time -->
        <section>
          <h2 class="text-2xl font-serif-display font-bold text-luxury-green dark:text-white mb-6">
            Order Processing
          </h2>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            Orders are processed within 1-2 business days after payment confirmation. Orders placed on weekends 
            or public holidays will be processed on the next business day.
          </p>
          <div class="bg-luxury-green/10 dark:bg-luxury-green/20 rounded-lg p-4">
            <p class="text-gray-700 dark:text-gray-300">
              <strong>Note:</strong> During peak seasons (holidays, sales), processing times may be extended. 
              We will notify you of any significant delays.
            </p>
          </div>
        </section>

        <!-- Shipping Destinations -->
        <section>
          <h2 class="text-2xl font-serif-display font-bold text-luxury-green dark:text-white mb-6">
            Shipping Destinations
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 class="font-bold text-gray-900 dark:text-white mb-3">South Africa</h3>
              <p class="text-gray-700 dark:text-gray-300">
                We ship to all major cities and towns across South Africa. Remote areas may experience 
                extended delivery times.
              </p>
            </div>
            <div>
              <h3 class="font-bold text-gray-900 dark:text-white mb-3">International</h3>
              <p class="text-gray-700 dark:text-gray-300">
                We ship to select countries worldwide. International shipping rates and delivery times 
                vary by destination. Customs duties and taxes may apply.
              </p>
            </div>
          </div>
        </section>

        <!-- Order Tracking -->
        <section>
          <h2 class="text-2xl font-serif-display font-bold text-luxury-green dark:text-white mb-6">
            Order Tracking
          </h2>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            Once your order ships, you will receive a shipping confirmation email with a tracking number. 
            You can use this number to track your package on our website or the carrier's website.
          </p>
          <NuxtLink
            to="/track-order"
            class="inline-block bg-luxury-green text-white px-6 py-3 rounded-full font-medium hover:bg-gold hover:text-luxury-green transition-colors"
          >
            Track Your Order
          </NuxtLink>
        </section>

        <!-- Delivery Issues -->
        <section>
          <h2 class="text-2xl font-serif-display font-bold text-luxury-green dark:text-white mb-6">
            Delivery Issues
          </h2>
          <div class="space-y-4">
            <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h3 class="font-bold text-gray-900 dark:text-white mb-2">Damaged Packages</h3>
              <p class="text-gray-700 dark:text-gray-300">
                If your package arrives damaged, please contact us within 48 hours with photos of the damage. 
                We will arrange a replacement or refund at no additional cost.
              </p>
            </div>
            <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h3 class="font-bold text-gray-900 dark:text-white mb-2">Lost Packages</h3>
              <p class="text-gray-700 dark:text-gray-300">
                If your tracking shows delivered but you haven't received your package, please contact us 
                within 7 days. We will investigate with the carrier and resolve the issue.
              </p>
            </div>
          </div>
        </section>

        <!-- Contact -->
        <section class="pt-8 border-t border-gray-200 dark:border-gray-700">
          <h2 class="text-2xl font-serif-display font-bold text-luxury-green dark:text-white mb-6">
            Questions?
          </h2>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            For any shipping-related questions, please contact our customer support team:
          </p>
          <div class="p-4 bg-luxury-green/10 dark:bg-luxury-green/20 rounded-lg">
            <p class="text-gray-700 dark:text-gray-300">
              <strong>Email:</strong> <a href="mailto:gombianholdings@gmail.com" class="text-luxury-green hover:text-gold dark:text-gold dark:hover:text-luxury-green underline">gombianholdings@gmail.com</a><br>
              <strong>Phone:</strong> +27 12 345 6789 (Mon-Fri, 9AM-5PM SAST)
            </p>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'default'
})

useHead({
  title: 'Shipping Policy - Gombian Boutique',
  meta: [
    {
      name: 'description',
      content: 'Learn about Gombian Boutique shipping options, rates, delivery times, and tracking information.'
    }
  ]
})
</script>
