<!-- pages/sustainability.vue -->
<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Hero Section -->
    <div class="relative h-96 rounded-2xl overflow-hidden mb-12">
      <NuxtImg
        src="/images/backgrounds/Background 01.jpeg"
        alt="Sustainability at Gombian Boutique"
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-gradient-to-r from-luxury-green/90 to-luxury-green/50 flex items-center">
        <div class="max-w-2xl px-8">
          <h1 class="text-4xl md:text-5xl font-serif-display font-bold text-white mb-4">
            Our Commitment to Sustainability
          </h1>
          <p class="text-xl text-white/90">
            Crafting luxury fragrances while protecting our planet for future generations
          </p>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
      <!-- Main Content Area -->
      <div class="lg:col-span-2 space-y-12">
        <!-- Our Mission -->
        <section class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
          <h2 class="text-2xl font-serif-display font-bold text-luxury-green dark:text-white mb-6">
            Our Sustainability Mission
          </h2>
          <p class="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            At Gombian Boutique, we believe that luxury and sustainability can coexist harmoniously. 
            Our commitment to the environment is woven into every aspect of our business, from sourcing 
            ingredients to packaging and delivery.
          </p>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
            We are dedicated to minimizing our environmental footprint while creating exceptional 
            fragrances that bring joy to our customers. Through innovative practices and responsible 
            sourcing, we strive to set new standards for sustainability in the luxury perfume industry.
          </p>
        </section>

        <!-- Eco-Friendly Practices -->
        <section class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
          <h2 class="text-2xl font-serif-display font-bold text-luxury-green dark:text-white mb-6">
            Eco-Friendly Practices
          </h2>
          
          <div class="space-y-6">
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center flex-shrink-0">
                <svg class="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <div>
                <h3 class="font-bold text-gray-900 dark:text-white mb-2">Responsibly Sourced Ingredients</h3>
                <p class="text-gray-700 dark:text-gray-300">
                  We partner with suppliers who share our commitment to sustainable farming and ethical 
                  harvesting practices. Our ingredients are sourced from farms that prioritize biodiversity 
                  and soil health.
                </p>
              </div>
            </div>

            <div class="flex items-start gap-4">
              <div class="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center flex-shrink-0">
                <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <div>
                <h3 class="font-bold text-gray-900 dark:text-white mb-2">Recyclable Packaging</h3>
                <p class="text-gray-700 dark:text-gray-300">
                  Our packaging is designed with the environment in mind. We use recyclable glass bottles, 
                  biodegradable materials, and minimal plastic. Our shipping boxes are made from recycled 
                  content and are fully recyclable.
                </p>
              </div>
            </div>

            <div class="flex items-start gap-4">
              <div class="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center flex-shrink-0">
                <svg class="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 class="font-bold text-gray-900 dark:text-white mb-2">Carbon-Neutral Shipping</h3>
                <p class="text-gray-700 dark:text-gray-300">
                  We offset the carbon emissions from all our shipments through verified carbon credit 
                  programs. Every order contributes to reforestation and renewable energy projects worldwide.
                </p>
              </div>
            </div>

            <div class="flex items-start gap-4">
              <div class="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/20 flex items-center justify-center flex-shrink-0">
                <svg class="w-6 h-6 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div>
                <h3 class="font-bold text-gray-900 dark:text-white mb-2">Energy-Efficient Production</h3>
                <p class="text-gray-700 dark:text-gray-300">
                  Our production facilities utilize renewable energy sources and energy-efficient equipment 
                  to minimize our carbon footprint while maintaining the highest quality standards.
                </p>
              </div>
            </div>
          </div>
        </section>

        <!-- Certifications -->
        <section class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
          <h2 class="text-2xl font-serif-display font-bold text-luxury-green dark:text-white mb-6">
            Certifications & Partnerships
          </h2>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div class="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div class="text-4xl mb-2">🌿</div>
              <p class="font-medium text-gray-900 dark:text-white">Cruelty-Free</p>
              <p class="text-sm text-gray-600 dark:text-gray-400">Never tested on animals</p>
            </div>
            <div class="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div class="text-4xl mb-2">♻️</div>
              <p class="font-medium text-gray-900 dark:text-white">Recyclable</p>
              <p class="text-sm text-gray-600 dark:text-gray-400">100% recyclable packaging</p>
            </div>
            <div class="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div class="text-4xl mb-2">🌱</div>
              <p class="font-medium text-gray-900 dark:text-white">Vegan Options</p>
              <p class="text-sm text-gray-600 dark:text-gray-400">Plant-based ingredients</p>
            </div>
          </div>
        </section>
      </div>

      <!-- Sidebar -->
      <div class="space-y-8">
        <!-- Impact Stats -->
        <div class="bg-gradient-to-br from-luxury-green to-luxury-green/80 rounded-xl shadow-md p-6 text-white">
          <h3 class="text-xl font-bold mb-6">Our Environmental Impact</h3>
          <div class="space-y-4">
            <div>
              <div class="flex justify-between mb-1">
                <span class="text-sm">Carbon Offset</span>
                <span class="text-sm font-bold">150 tons</span>
              </div>
              <div class="w-full bg-white/20 rounded-full h-2">
                <div class="bg-white rounded-full h-2" style="width: 75%"></div>
              </div>
            </div>
            <div>
              <div class="flex justify-between mb-1">
                <span class="text-sm">Recycled Materials</span>
                <span class="text-sm font-bold">85%</span>
              </div>
              <div class="w-full bg-white/20 rounded-full h-2">
                <div class="bg-white rounded-full h-2" style="width: 85%"></div>
              </div>
            </div>
            <div>
              <div class="flex justify-between mb-1">
                <span class="text-sm">Trees Planted</span>
                <span class="text-sm font-bold">5,000+</span>
              </div>
              <div class="w-full bg-white/20 rounded-full h-2">
                <div class="bg-white rounded-full h-2" style="width: 60%"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Join Our Mission -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h3 class="text-xl font-bold text-luxury-green dark:text-white mb-4">
            Join Our Mission
          </h3>
          <p class="text-gray-700 dark:text-gray-300 mb-4">
            Together, we can make a difference. Here's how you can contribute:
          </p>
          <ul class="space-y-3">
            <li class="flex items-start gap-3">
              <svg class="w-5 h-5 text-luxury-green mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              <span class="text-gray-700 dark:text-gray-300">Recycle your perfume bottles</span>
            </li>
            <li class="flex items-start gap-3">
              <svg class="w-5 h-5 text-luxury-green mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              <span class="text-gray-700 dark:text-gray-300">Choose refillable options</span>
            </li>
            <li class="flex items-start gap-3">
              <svg class="w-5 h-5 text-luxury-green mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              <span class="text-gray-700 dark:text-gray-300">Participate in our bottle return program</span>
            </li>
          </ul>
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
  title: 'Sustainability - Gombian Boutique',
  meta: [
    {
      name: 'description',
      content: 'Learn about Gombian Boutique\'s commitment to sustainability and eco-friendly practices in luxury perfume creation.'
    }
  ]
})
</script>
