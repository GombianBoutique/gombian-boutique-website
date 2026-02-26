<!-- pages/faq.vue -->
<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Page Header -->
    <div class="text-center mb-12">
      <h1 class="text-4xl font-serif-display font-bold text-luxury-green dark:text-white mb-4">
        Frequently Asked Questions
      </h1>
      <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        Find answers to common questions about our products, shipping, and services
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <!-- Sidebar Navigation -->
      <div class="lg:col-span-1">
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 sticky top-4">
          <h3 class="font-bold text-gray-900 dark:text-white mb-4">Categories</h3>
          <nav class="space-y-2">
            <button
              @click="activeCategory = 'products'"
              :class="[
                'w-full text-left px-4 py-2 rounded-lg transition-colors',
                activeCategory === 'products'
                  ? 'bg-luxury-green text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              ]"
            >
              Products & Fragrances
            </button>
            <button
              @click="activeCategory = 'shipping'"
              :class="[
                'w-full text-left px-4 py-2 rounded-lg transition-colors',
                activeCategory === 'shipping'
                  ? 'bg-luxury-green text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              ]"
            >
              Shipping & Delivery
            </button>
            <button
              @click="activeCategory = 'orders'"
              :class="[
                'w-full text-left px-4 py-2 rounded-lg transition-colors',
                activeCategory === 'orders'
                  ? 'bg-luxury-green text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              ]"
            >
              Orders & Returns
            </button>
            <button
              @click="activeCategory = 'payment'"
              :class="[
                'w-full text-left px-4 py-2 rounded-lg transition-colors',
                activeCategory === 'payment'
                  ? 'bg-luxury-green text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              ]"
            >
              Payment
            </button>
            <button
              @click="activeCategory = 'general'"
              :class="[
                'w-full text-left px-4 py-2 rounded-lg transition-colors',
                activeCategory === 'general'
                  ? 'bg-luxury-green text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              ]"
            >
              General
            </button>
          </nav>
        </div>
      </div>

      <!-- FAQ Content -->
      <div class="lg:col-span-3 space-y-8">
        <!-- Products & Fragrances -->
        <section v-if="activeCategory === 'products' || activeCategory === 'all'" class="space-y-4">
          <h2 class="text-2xl font-serif-display font-bold text-luxury-green dark:text-white mb-6">
            Products & Fragrances
          </h2>

          <div
            v-for="faq in faqs.products"
            :key="faq.id"
            class="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
          >
            <button
              @click="toggleFaq(faq.id)"
              class="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <span class="font-medium text-gray-900 dark:text-white pr-4">{{ faq.question }}</span>
              <svg
                :class="[
                  'w-5 h-5 text-gray-500 transition-transform flex-shrink-0',
                  openFaq === faq.id ? 'rotate-180' : ''
                ]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div
              v-show="openFaq === faq.id"
              class="px-6 pb-4 text-gray-700 dark:text-gray-300"
            >
              {{ faq.answer }}
            </div>
          </div>
        </section>

        <!-- Shipping & Delivery -->
        <section v-if="activeCategory === 'shipping' || activeCategory === 'all'" class="space-y-4">
          <h2 class="text-2xl font-serif-display font-bold text-luxury-green dark:text-white mb-6">
            Shipping & Delivery
          </h2>

          <div
            v-for="faq in faqs.shipping"
            :key="faq.id"
            class="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
          >
            <button
              @click="toggleFaq(faq.id)"
              class="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <span class="font-medium text-gray-900 dark:text-white pr-4">{{ faq.question }}</span>
              <svg
                :class="[
                  'w-5 h-5 text-gray-500 transition-transform flex-shrink-0',
                  openFaq === faq.id ? 'rotate-180' : ''
                ]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div
              v-show="openFaq === faq.id"
              class="px-6 pb-4 text-gray-700 dark:text-gray-300"
            >
              {{ faq.answer }}
            </div>
          </div>
        </section>

        <!-- Orders & Returns -->
        <section v-if="activeCategory === 'orders' || activeCategory === 'all'" class="space-y-4">
          <h2 class="text-2xl font-serif-display font-bold text-luxury-green dark:text-white mb-6">
            Orders & Returns
          </h2>

          <div
            v-for="faq in faqs.orders"
            :key="faq.id"
            class="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
          >
            <button
              @click="toggleFaq(faq.id)"
              class="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <span class="font-medium text-gray-900 dark:text-white pr-4">{{ faq.question }}</span>
              <svg
                :class="[
                  'w-5 h-5 text-gray-500 transition-transform flex-shrink-0',
                  openFaq === faq.id ? 'rotate-180' : ''
                ]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div
              v-show="openFaq === faq.id"
              class="px-6 pb-4 text-gray-700 dark:text-gray-300"
            >
              {{ faq.answer }}
            </div>
          </div>
        </section>

        <!-- Payment -->
        <section v-if="activeCategory === 'payment' || activeCategory === 'all'" class="space-y-4">
          <h2 class="text-2xl font-serif-display font-bold text-luxury-green dark:text-white mb-6">
            Payment
          </h2>

          <div
            v-for="faq in faqs.payment"
            :key="faq.id"
            class="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
          >
            <button
              @click="toggleFaq(faq.id)"
              class="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <span class="font-medium text-gray-900 dark:text-white pr-4">{{ faq.question }}</span>
              <svg
                :class="[
                  'w-5 h-5 text-gray-500 transition-transform flex-shrink-0',
                  openFaq === faq.id ? 'rotate-180' : ''
                ]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div
              v-show="openFaq === faq.id"
              class="px-6 pb-4 text-gray-700 dark:text-gray-300"
            >
              {{ faq.answer }}
            </div>
          </div>
        </section>

        <!-- General -->
        <section v-if="activeCategory === 'general' || activeCategory === 'all'" class="space-y-4">
          <h2 class="text-2xl font-serif-display font-bold text-luxury-green dark:text-white mb-6">
            General
          </h2>

          <div
            v-for="faq in faqs.general"
            :key="faq.id"
            class="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
          >
            <button
              @click="toggleFaq(faq.id)"
              class="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <span class="font-medium text-gray-900 dark:text-white pr-4">{{ faq.question }}</span>
              <svg
                :class="[
                  'w-5 h-5 text-gray-500 transition-transform flex-shrink-0',
                  openFaq === faq.id ? 'rotate-180' : ''
                ]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div
              v-show="openFaq === faq.id"
              class="px-6 pb-4 text-gray-700 dark:text-gray-300"
            >
              {{ faq.answer }}
            </div>
          </div>
        </section>

        <!-- Still Have Questions -->
        <div class="bg-gradient-to-r from-luxury-green to-luxury-green/80 rounded-xl shadow-md p-8 text-white text-center">
          <h3 class="text-2xl font-bold mb-4">Still Have Questions?</h3>
          <p class="mb-6 opacity-90">
            Can't find the answer you're looking for? Our customer service team is here to help.
          </p>
          <NuxtLink
            to="/contact"
            class="inline-block bg-white text-luxury-green px-8 py-3 rounded-full font-medium hover:bg-gold hover:text-luxury-green transition-colors"
          >
            Contact Us
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

const activeCategory = ref('products')
const openFaq = ref(null)

const faqs = {
  products: [
    {
      id: 'p1',
      question: 'What is the difference between EDT, EDP, and Parfum?',
      answer: 'EDT (Eau de Toilette) contains 5-15% fragrance oil and lasts 3-5 hours. EDP (Eau de Parfum) contains 15-20% fragrance oil and lasts 6-8 hours. Parfum contains 20-30% fragrance oil and can last 8-12 hours or more. Higher concentration means longer-lasting scent.'
    },
    {
      id: 'p2',
      question: 'How long do your perfumes last?',
      answer: 'Our perfumes are crafted for longevity. Depending on the concentration and your skin chemistry, our fragrances can last anywhere from 6 to 12 hours. EDP and Parfum concentrations offer the longest-lasting scent.'
    },
    {
      id: 'p3',
      question: 'Are your perfumes cruelty-free?',
      answer: 'Yes! All Gombian Boutique perfumes are 100% cruelty-free. We never test on animals, and we only work with suppliers who share our commitment to ethical practices.'
    },
    {
      id: 'p4',
      question: 'Do you offer vegan perfumes?',
      answer: 'Yes, we offer a selection of vegan perfumes that contain no animal-derived ingredients. Look for the "Vegan" label on product pages to identify these fragrances.'
    },
    {
      id: 'p5',
      question: 'How should I store my perfume?',
      answer: 'Store your perfume in a cool, dry place away from direct sunlight and heat. Keep the bottle tightly closed when not in use. Proper storage helps maintain the fragrance\'s quality and longevity.'
    }
  ],
  shipping: [
    {
      id: 's1',
      question: 'What are your shipping options?',
      answer: 'We offer standard shipping (5-7 business days) and express shipping (2-3 business days) within South Africa. International shipping is available to select countries.'
    },
    {
      id: 's2',
      question: 'How much does shipping cost?',
      answer: 'Standard shipping is R50 for orders under R500, and free for orders over R500. Express shipping is R100. International shipping rates vary by destination.'
    },
    {
      id: 's3',
      question: 'Do you ship internationally?',
      answer: 'Yes, we ship to select countries worldwide. International shipping rates and delivery times vary by destination. Please note that customs duties and taxes may apply.'
    },
    {
      id: 's4',
      question: 'How can I track my order?',
      answer: 'Once your order ships, you\'ll receive a tracking number via email. You can use this number to track your package on our website or the carrier\'s website.'
    }
  ],
  orders: [
    {
      id: 'o1',
      question: 'Can I cancel or modify my order?',
      answer: 'You can cancel or modify your order within 24 hours of placing it. After that, the order enters our fulfillment process and cannot be changed. Contact us immediately if you need to make changes.'
    },
    {
      id: 'o2',
      question: 'What is your return policy?',
      answer: 'We accept returns within 30 days of delivery for unopened, unused products in their original packaging. Refunds are processed within 5-7 business days after we receive the return.'
    },
    {
      id: 'o3',
      question: 'What if my order arrives damaged?',
      answer: 'If your order arrives damaged, please contact us within 48 hours with photos of the damage. We\'ll arrange a replacement or refund at no additional cost to you.'
    },
    {
      id: 'o4',
      question: 'Do you offer gift wrapping?',
      answer: 'Yes! Gift wrapping is available for R25 per item. You can add gift wrapping during checkout and include a personalized message.'
    }
  ],
  payment: [
    {
      id: 'pa1',
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, MasterCard, American Express), debit cards, and bank transfers (EFT). All payments are processed securely through our payment partners.'
    },
    {
      id: 'pa2',
      question: 'Is my payment information secure?',
      answer: 'Absolutely! We use industry-standard encryption and secure payment gateways. Your payment information is never stored on our servers.'
    },
    {
      id: 'pa3',
      question: 'Can I pay in installments?',
      answer: 'Currently, we require full payment at the time of purchase. We\'re exploring installment payment options for the future.'
    }
  ],
  general: [
    {
      id: 'g1',
      question: 'Where is Gombian Boutique located?',
      answer: 'Gombian Boutique is based in Cape Town, South Africa. We ship worldwide from our fulfillment center.'
    },
    {
      id: 'g2',
      question: 'How can I contact customer service?',
      answer: 'You can reach our customer service team via email at gombianholdings@gmail.com or through our contact page. We typically respond within 24 hours.'
    },
    {
      id: 'g3',
      question: 'Do you have a loyalty program?',
      answer: 'Yes! Our loyalty program rewards you with points for every purchase. Points can be redeemed for discounts on future orders. Sign up for an account to start earning points.'
    },
    {
      id: 'g4',
      question: 'Can I request a custom fragrance?',
      answer: 'Currently, we offer our curated collection of fragrances. Custom fragrance requests are not available at this time, but it\'s something we\'re exploring for the future.'
    }
  ]
}

const toggleFaq = (id) => {
  openFaq.value = openFaq.value === id ? null : id
}

useHead({
  title: 'FAQ - Gombian Boutique',
  meta: [
    {
      name: 'description',
      content: 'Find answers to frequently asked questions about Gombian Boutique perfumes, shipping, orders, and more.'
    }
  ]
})
</script>
