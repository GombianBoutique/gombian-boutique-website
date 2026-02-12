<!-- components/HeroSlider.vue -->
<template>
  <div class="relative overflow-hidden rounded-xl">
    <!-- Slides Container -->
    <div 
      class="flex transition-transform duration-500 ease-in-out" 
      :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
    >
      <div 
        v-for="(slide, index) in slides" 
        :key="index" 
        class="w-full flex-shrink-0"
      >
        <div 
          class="relative h-[500px] md:h-[600px] bg-cover bg-center flex items-center"
          :style="{ backgroundImage: `linear-gradient(to right, rgba(45, 80, 22, 0.7), rgba(45, 80, 22, 0.4)), url(${slide.backgroundImage})` }"
        >
          <div class="container mx-auto px-4 md:px-8">
            <div class="max-w-2xl">
              <span class="inline-block px-4 py-1 bg-gold text-luxury-green rounded-full text-sm font-bold mb-4">
                {{ slide.badgeText }}
              </span>
              <h1 class="text-4xl md:text-6xl font-serif-display font-bold text-white leading-tight mb-4">
                {{ slide.title }}
              </h1>
              <p class="text-xl text-white mb-8 max-w-lg">
                {{ slide.description }}
              </p>
              <div class="flex flex-wrap gap-4">
                <NuxtLink 
                  :to="slide.primaryAction.link" 
                  class="luxury-button px-8 py-4 text-lg"
                >
                  {{ slide.primaryAction.text }}
                </NuxtLink>
                <NuxtLink 
                  v-if="slide.secondaryAction" 
                  :to="slide.secondaryAction.link" 
                  class="px-8 py-4 bg-white text-luxury-green rounded-full font-medium hover:bg-gold hover:text-luxury-green transition-colors"
                >
                  {{ slide.secondaryAction.text }}
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Navigation Arrows -->
    <button 
      @click="prevSlide"
      class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-3 rounded-full backdrop-blur-sm transition-colors"
      aria-label="Previous slide"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
      </svg>
    </button>
    <button 
      @click="nextSlide"
      class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-3 rounded-full backdrop-blur-sm transition-colors"
      aria-label="Next slide"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
      </svg>
    </button>

    <!-- Indicators -->
    <div class="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
      <button
        v-for="(slide, index) in slides"
        :key="index"
        @click="goToSlide(index)"
        :class="[
          'w-3 h-3 rounded-full transition-colors',
          currentIndex === index ? 'bg-gold' : 'bg-white/50'
        ]"
        :aria-label="`Go to slide ${index + 1}`"
      />
    </div>

    <!-- Slide Counter -->
    <div class="absolute bottom-4 right-4 bg-black/30 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
      {{ currentIndex + 1 }} / {{ slides.length }}
    </div>
  </div>
</template>

<script setup>
// Sample slides data - in a real app this would come from an API
const slides = [
  {
    backgroundImage: '/images/backgrounds/Background 01.jpeg',
    badgeText: 'NEW COLLECTION',
    title: 'Luxury Villa-Inspired Fragrances',
    description: 'Experience our exclusive line of nature-inspired scents that transport and transform any space.',
    primaryAction: {
      text: 'Explore Collection',
      link: '/products'
    },
    secondaryAction: {
      text: 'Learn More',
      link: '/about'
    }
  },
  {
    backgroundImage: '/images/products/Ladies Ultimate Combo.jpeg',
    badgeText: 'LIMITED EDITION',
    title: 'Exclusive Perfume Sets',
    description: 'Curated collections of our finest fragrances, available for a limited time only.',
    primaryAction: {
      text: 'Shop Limited Edition',
      link: '/products?category=limited-edition'
    },
    secondaryAction: {
      text: 'View All Sets',
      link: '/products?category=gift-set'
    }
  },
  {
    backgroundImage: '/images/products/Mens 60ml Perfume.jpg',
    badgeText: 'BEST SELLER',
    title: 'Signature Scents',
    description: 'Our most beloved fragrances loved by customers worldwide. Crafted with premium ingredients.',
    primaryAction: {
      text: 'Shop Best Sellers',
      link: '/products?category=best-seller'
    },
    secondaryAction: {
      text: 'See Reviews',
      link: '/products?category=best-seller'
    }
  }
]

const currentIndex = ref(0)
let slideInterval = null

// Auto-advance slides
const startAutoSlide = () => {
  slideInterval = setInterval(() => {
    nextSlide()
  }, 5000) // Change slide every 5 seconds
}

const stopAutoSlide = () => {
  if (slideInterval) {
    clearInterval(slideInterval)
    slideInterval = null
  }
}

// Navigation methods
const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % slides.length
}

const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + slides.length) % slides.length
}

const goToSlide = (index) => {
  currentIndex.value = index
}

// Start auto-slide on component mount
onMounted(() => {
  startAutoSlide()
})

// Stop auto-slide when component is unmounted
onUnmounted(() => {
  stopAutoSlide()
})

// Pause auto-slide when user interacts with slider
const pauseOnHover = () => {
  stopAutoSlide()
}

const resumeOnLeave = () => {
  startAutoSlide()
}
</script>