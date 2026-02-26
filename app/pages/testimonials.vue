<!-- pages/testimonials.vue -->
<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Page Header -->
    <div class="text-center mb-12">
      <h1 class="text-4xl font-serif-display font-bold text-luxury-green dark:text-white mb-4">
        What Our Customers Say
      </h1>
      <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        Real reviews from real customers who have experienced the luxury of Gombian Boutique
      </p>
    </div>

    <!-- Featured Testimonial -->
    <div class="bg-gradient-to-br from-luxury-green to-luxury-green/80 rounded-2xl shadow-xl p-8 md:p-12 mb-12 text-white">
      <div class="max-w-4xl mx-auto text-center">
        <svg class="w-12 h-12 mx-auto mb-6 opacity-75" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
        <blockquote class="text-2xl md:text-3xl font-light italic mb-8">
          "Gombian Boutique has completely transformed my fragrance collection. The quality and longevity of their perfumes are unmatched. I've received countless compliments since switching to their collection."
        </blockquote>
        <div class="flex items-center justify-center gap-4">
          <div class="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold">
            SJ
          </div>
          <div class="text-left">
            <p class="font-bold text-lg">Sarah Johnson</p>
            <p class="opacity-90">Cape Town, South Africa</p>
            <div class="flex text-gold mt-1">
              <svg v-for="n in 5" :key="n" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 text-center">
        <p class="text-4xl font-bold text-luxury-green dark:text-gold mb-2">5000+</p>
        <p class="text-gray-600 dark:text-gray-400">Happy Customers</p>
      </div>
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 text-center">
        <p class="text-4xl font-bold text-luxury-green dark:text-gold mb-2">4.9</p>
        <p class="text-gray-600 dark:text-gray-400">Average Rating</p>
      </div>
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 text-center">
        <p class="text-4xl font-bold text-luxury-green dark:text-gold mb-2">10000+</p>
        <p class="text-gray-600 dark:text-gray-400">Reviews</p>
      </div>
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 text-center">
        <p class="text-4xl font-bold text-luxury-green dark:text-gold mb-2">98%</p>
        <p class="text-gray-600 dark:text-gray-400">Would Recommend</p>
      </div>
    </div>

    <!-- Testimonials Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
      <div
        v-for="testimonial in testimonials"
        :key="testimonial.id"
        class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
      >
        <div class="flex mb-4">
          <svg v-for="n in 5" :key="n"
               :class="[
                 'w-5 h-5',
                 n <= testimonial.rating ? 'text-gold' : 'text-gray-300 dark:text-gray-600'
               ]"
               fill="currentColor"
               viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </div>
        <p class="text-gray-700 dark:text-gray-300 mb-4 line-clamp-4">
          "{{ testimonial.comment }}"
        </p>
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-luxury-green/10 flex items-center justify-center font-bold text-luxury-green dark:text-gold">
            {{ testimonial.initials }}
          </div>
          <div>
            <p class="font-medium text-gray-900 dark:text-white">{{ testimonial.name }}</p>
            <p class="text-sm text-gray-600 dark:text-gray-400">{{ testimonial.location }}</p>
          </div>
        </div>
        <p v-if="testimonial.product" class="text-sm text-luxury-green dark:text-gold mt-3">
          Purchased: {{ testimonial.product }}
        </p>
      </div>
    </div>

    <!-- Write Review CTA -->
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 text-center">
      <h2 class="text-2xl font-serif-display font-bold text-luxury-green dark:text-white mb-4">
        Share Your Experience
      </h2>
      <p class="text-gray-700 dark:text-gray-300 mb-6 max-w-xl mx-auto">
        Have you tried our perfumes? We'd love to hear about your experience. Your review helps others discover their perfect scent.
      </p>
      <NuxtLink
        to="/products"
        class="inline-block bg-luxury-green text-white px-8 py-3 rounded-full font-medium hover:bg-gold hover:text-luxury-green transition-colors"
      >
        Write a Review
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'default'
})

const testimonials = ref([
  {
    id: 1,
    name: 'Michael Thompson',
    initials: 'MT',
    location: 'Johannesburg',
    rating: 5,
    comment: 'The 60ml Premium Perfume is absolutely divine. The scent lasts all day and I\'ve received so many compliments. Worth every penny!',
    product: '60ml Premium Perfume'
  },
  {
    id: 2,
    name: 'Emma Wilson',
    initials: 'EW',
    location: 'Durban',
    rating: 5,
    comment: 'I\'ve been searching for the perfect signature scent for years. Gombian Boutique\'s collection exceeded all my expectations. The floral notes are perfectly balanced.',
    product: 'Floral Collection'
  },
  {
    id: 3,
    name: 'David Mokoena',
    initials: 'DM',
    location: 'Pretoria',
    rating: 5,
    comment: 'Fast delivery, beautiful packaging, and the fragrance is incredible. This is now my go-to brand for luxury perfumes.',
    product: 'Woody Essence'
  },
  {
    id: 4,
    name: 'Lisa van der Merwe',
    initials: 'LV',
    location: 'Stellenbosch',
    rating: 5,
    comment: 'The attention to detail in both the product and service is remarkable. I ordered the gift set for my mother and she absolutely loves it!',
    product: 'Gift Set'
  },
  {
    id: 5,
    name: 'James Peterson',
    initials: 'JP',
    location: 'Cape Town',
    rating: 4,
    comment: 'Great quality perfumes at reasonable prices. The only reason I\'m not giving 5 stars is because I wish the bottle was larger. Will definitely repurchase.',
    product: 'Citrus Fresh'
  },
  {
    id: 6,
    name: 'Nomsa Dlamini',
    initials: 'ND',
    location: 'East London',
    rating: 5,
    comment: 'I\'m impressed by how long the scent lasts. Even after a shower, I can still smell the beautiful fragrance. Highly recommend!',
    product: 'EDP Collection'
  }
])

useHead({
  title: 'Customer Reviews - Gombian Boutique',
  meta: [
    {
      name: 'description',
      content: 'Read real customer reviews and testimonials about Gombian Boutique luxury perfumes.'
    }
  ]
})
</script>

<style scoped>
.line-clamp-4 {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
