<!-- pages/returns.vue -->
<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-4xl mx-auto">
      <!-- Page Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-serif-display font-bold text-luxury-green dark:text-white mb-4">
          Returns & Exchanges Policy
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
            We want you to be completely satisfied with your Gombian Boutique purchase. If you're not entirely 
            happy with your order, we offer a straightforward returns and exchanges process to make things right.
          </p>
        </section>

        <!-- Return Period -->
        <section>
          <h2 class="text-2xl font-serif-display font-bold text-luxury-green dark:text-white mb-6">
            Return Period
          </h2>
          <div class="bg-luxury-green/10 dark:bg-luxury-green/20 rounded-lg p-6">
            <div class="flex items-center">
              <div class="w-16 h-16 rounded-full bg-luxury-green text-white flex items-center justify-center text-2xl font-bold flex-shrink-0">
                30
              </div>
              <div class="ml-6">
                <p class="text-xl font-bold text-gray-900 dark:text-white">Days to Return</p>
                <p class="text-gray-700 dark:text-gray-300">
                  From the date of delivery for a full refund
                </p>
              </div>
            </div>
          </div>
        </section>

        <!-- Eligibility -->
        <section>
          <h2 class="text-2xl font-serif-display font-bold text-luxury-green dark:text-white mb-6">
            Return Eligibility
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <h3 class="font-bold text-green-800 dark:text-green-300 mb-3 flex items-center">
                <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                Accepted Returns
              </h3>
              <ul class="space-y-2 text-gray-700 dark:text-gray-300">
                <li>• Unopened, unused products</li>
                <li>• Original packaging included</li>
                <li>• Within 30 days of delivery</li>
                <li>• Proof of purchase provided</li>
                <li>• Seals and labels intact</li>
              </ul>
            </div>
            <div class="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
              <h3 class="font-bold text-red-800 dark:text-red-300 mb-3 flex items-center">
                <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                </svg>
                Non-Returnable Items
              </h3>
              <ul class="space-y-2 text-gray-700 dark:text-gray-300">
                <li>• Opened or used products</li>
                <li>• Damaged packaging</li>
                <li>• After 30 days</li>
                <li>• Without proof of purchase</li>
                <li>• Sale or clearance items*</li>
              </ul>
            </div>
          </div>
          <p class="text-sm text-gray-600 dark:text-gray-400 mt-4">
            *Sale items may be eligible for store credit only.
          </p>
        </section>

        <!-- How to Return -->
        <section>
          <h2 class="text-2xl font-serif-display font-bold text-luxury-green dark:text-white mb-6">
            How to Return an Item
          </h2>
          <div class="space-y-4">
            <div class="flex items-start">
              <div class="w-8 h-8 rounded-full bg-luxury-green text-white flex items-center justify-center font-bold flex-shrink-0">
                1
              </div>
              <div class="ml-4">
                <h3 class="font-bold text-gray-900 dark:text-white mb-2">Contact Us</h3>
                <p class="text-gray-700 dark:text-gray-300">
                  Email us at <a href="mailto:returns@gombianboutique.com" class="text-luxury-green hover:text-gold dark:text-gold dark:hover:text-luxury-green underline">returns@gombianboutique.com</a> with your order number and reason for return.
                </p>
              </div>
            </div>
            <div class="flex items-start">
              <div class="w-8 h-8 rounded-full bg-luxury-green text-white flex items-center justify-center font-bold flex-shrink-0">
                2
              </div>
              <div class="ml-4">
                <h3 class="font-bold text-gray-900 dark:text-white mb-2">Receive Return Label</h3>
                <p class="text-gray-700 dark:text-gray-300">
                  We'll send you a prepaid return shipping label and return instructions via email.
                </p>
              </div>
            </div>
            <div class="flex items-start">
              <div class="w-8 h-8 rounded-full bg-luxury-green text-white flex items-center justify-center font-bold flex-shrink-0">
                3
              </div>
              <div class="ml-4">
                <h3 class="font-bold text-gray-900 dark:text-white mb-2">Package Securely</h3>
                <p class="text-gray-700 dark:text-gray-300">
                  Pack the item(s) securely in the original packaging with all tags and seals intact.
                </p>
              </div>
            </div>
            <div class="flex items-start">
              <div class="w-8 h-8 rounded-full bg-luxury-green text-white flex items-center justify-center font-bold flex-shrink-0">
                4
              </div>
              <div class="ml-4">
                <h3 class="font-bold text-gray-900 dark:text-white mb-2">Ship Back</h3>
                <p class="text-gray-700 dark:text-gray-300">
                  Drop off your package at the designated carrier location. Keep the tracking number for reference.
                </p>
              </div>
            </div>
          </div>
        </section>

        <!-- Refunds -->
        <section>
          <h2 class="text-2xl font-serif-display font-bold text-luxury-green dark:text-white mb-6">
            Refund Process
          </h2>
          <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
            <h3 class="font-bold text-gray-900 dark:text-white mb-4">Timeline</h3>
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <span class="text-gray-700 dark:text-gray-300">Return received and inspected</span>
                <span class="font-bold text-luxury-green dark:text-gold">3-5 business days</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-gray-700 dark:text-gray-300">Refund processed</span>
                <span class="font-bold text-luxury-green dark:text-gold">5-7 business days</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-gray-700 dark:text-gray-300">Refund appears in account</span>
                <span class="font-bold text-luxury-green dark:text-gold">Depends on bank</span>
              </div>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-4">
              Refunds are processed to the original payment method. If you paid with a gift card, 
              the refund will be issued as store credit.
            </p>
          </div>
        </section>

        <!-- Exchanges -->
        <section>
          <h2 class="text-2xl font-serif-display font-bold text-luxury-green dark:text-white mb-6">
            Exchanges
          </h2>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            We offer exchanges for defective or damaged items. If you receive a defective product, 
            contact us immediately and we'll send a replacement at no additional cost.
          </p>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
            For size or scent exchanges, please return the original item and place a new order. 
            Once we receive and process your return, the refund will be issued.
          </p>
        </section>

        <!-- International Returns -->
        <section>
          <h2 class="text-2xl font-serif-display font-bold text-luxury-green dark:text-white mb-6">
            International Returns
          </h2>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            International customers are responsible for return shipping costs. We recommend using a 
            trackable shipping service as we cannot guarantee receipt of your returned item.
          </p>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
            Customs duties and taxes are non-refundable for international orders.
          </p>
        </section>

        <!-- Contact -->
        <section class="pt-8 border-t border-gray-200 dark:border-gray-700">
          <h2 class="text-2xl font-serif-display font-bold text-luxury-green dark:text-white mb-6">
            Need Help?
          </h2>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            For returns assistance, please contact our customer support team:
          </p>
          <div class="p-4 bg-luxury-green/10 dark:bg-luxury-green/20 rounded-lg">
            <p class="text-gray-700 dark:text-gray-300">
              <strong>Email:</strong> <a href="mailto:returns@gombianboutique.com" class="text-luxury-green hover:text-gold dark:text-gold dark:hover:text-luxury-green underline">returns@gombianboutique.com</a><br>
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
  title: 'Returns & Exchanges - Gombian Boutique',
  meta: [
    {
      name: 'description',
      content: 'Learn about Gombian Boutique returns and exchanges policy, including eligibility, process, and refund timeline.'
    }
  ]
})
</script>
