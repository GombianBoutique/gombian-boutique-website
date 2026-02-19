<template>
  <header class="bg-white shadow-md transition-colors duration-300 dark:bg-gray-800 dark:shadow-gray-900">
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center py-4">
        <div class="flex items-center">
          <NuxtLink to="/" class="flex items-center">
            <img src="/images/logos/logo.png" alt="Gombian Boutique Logo" class="h-12 w-auto mr-2">
          </NuxtLink>
        </div>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex space-x-8 items-center">
          <NuxtLink to="/" class="text-luxury-green hover:text-gold transition-colors duration-300 dark:text-gray-200 dark:hover:text-gold">Home</NuxtLink>

          <!-- Collection dropdown menu -->
          <div class="relative group">
            <button class="text-luxury-green hover:text-gold transition-colors duration-300 dark:text-gray-200 dark:hover:text-gold flex items-center">
              Collections
              <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>

            <!-- Dropdown menu -->
            <div class="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 rounded-md">
              <NuxtLink to="/collections/best-seller" class="block px-4 py-2 text-luxury-green hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200 dark:hover:text-gold transition-colors duration-300">Best Sellers</NuxtLink>
              <NuxtLink to="/collections/premium" class="block px-4 py-2 text-luxury-green hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200 dark:hover:text-gold transition-colors duration-300">Premium</NuxtLink>
              <NuxtLink to="/collections/complementary" class="block px-4 py-2 text-luxury-green hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200 dark:hover:text-gold transition-colors duration-300">Complementary</NuxtLink>
              <NuxtLink to="/collections/gift-set" class="block px-4 py-2 text-luxury-green hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200 dark:hover:text-gold transition-colors duration-300">Gift Sets</NuxtLink>
            </div>
          </div>

          <NuxtLink to="/products" class="text-luxury-green hover:text-gold transition-colors duration-300 dark:text-gray-200 dark:hover:text-gold">All Products</NuxtLink>
          <NuxtLink to="/about" class="text-luxury-green hover:text-gold transition-colors duration-300 dark:text-gray-200 dark:hover:text-gold">About</NuxtLink>
          <NuxtLink to="/contact" class="text-luxury-green hover:text-gold transition-colors duration-300 dark:text-gray-200 dark:hover:text-gold">Contact</NuxtLink>
          <NuxtLink to="/policies" class="text-luxury-green hover:text-gold transition-colors duration-300 dark:text-gray-200 dark:hover:text-gold">Policies</NuxtLink>
          <NuxtLink to="/cart" class="text-luxury-green hover:text-gold transition-colors duration-300 dark:text-gray-200 dark:hover:text-gold relative">
            Cart
            <span v-if="cart.itemCount > 0" class="absolute -top-2 -right-3 bg-gold text-luxury-green rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold animate-pop-in dark:bg-luxury-green dark:text-white">{{ cart.itemCount }}</span>
          </NuxtLink>
          <div class="flex space-x-4 items-center">
            <NuxtLink to="/login" class="text-luxury-green hover:text-gold transition-colors duration-300 dark:text-gray-200 dark:hover:text-gold">Login</NuxtLink>
            <NuxtLink to="/register" class="bg-luxury-green text-white px-4 py-2 rounded-full hover:bg-gold hover:text-luxury-green transition-colors duration-300 dark:bg-gold dark:text-luxury-green dark:hover:bg-luxury-green dark:hover:text-white">Sign Up</NuxtLink>
          </div>
          <ColorModeToggle class="ml-4" />
        </nav>

        <!-- Mobile menu button -->
        <div class="md:hidden flex items-center">
          <button @click="toggleMenu" class="text-luxury-green focus:outline-none transition-colors duration-300 dark:text-gray-200">
            <svg v-if="!mobileMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
            <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>

          <ColorModeToggle class="ml-4" />
        </div>
      </div>

      <!-- Mobile Navigation -->
      <div v-if="mobileMenuOpen" class="md:hidden pb-4 transition-colors duration-300 dark:bg-gray-800">
        <nav class="flex flex-col space-y-3">
          <NuxtLink to="/" class="text-luxury-green hover:text-gold transition-colors duration-300 py-2 dark:text-gray-200 dark:hover:text-gold">Home</NuxtLink>

          <!-- Collection submenu for mobile -->
          <div>
            <div @click="toggleCollectionMenu" class="text-luxury-green font-semibold py-2 dark:text-gray-200 flex items-center cursor-pointer">
              Collections
              <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="mobileCollectionOpen ? 'M5 15l7-7 7 7' : 'M19 9l-7 7-7-7'" />
              </svg>
            </div>
            <div :class="{ 'max-h-0 overflow-hidden': !mobileCollectionOpen, 'max-h-60': mobileCollectionOpen }" class="transition-all duration-300 pl-4">
              <NuxtLink to="/collections/best-seller" class="block py-2 text-luxury-green hover:text-gold transition-colors duration-300 dark:text-gray-300 dark:hover:text-gold">Best Sellers</NuxtLink>
              <NuxtLink to="/collections/premium" class="block py-2 text-luxury-green hover:text-gold transition-colors duration-300 dark:text-gray-300 dark:hover:text-gold">Premium</NuxtLink>
              <NuxtLink to="/collections/complementary" class="block py-2 text-luxury-green hover:text-gold transition-colors duration-300 dark:text-gray-300 dark:hover:text-gold">Complementary</NuxtLink>
              <NuxtLink to="/collections/gift-set" class="block py-2 text-luxury-green hover:text-gold transition-colors duration-300 dark:text-gray-300 dark:hover:text-gold">Gift Sets</NuxtLink>
            </div>
          </div>

          <NuxtLink to="/products" class="text-luxury-green hover:text-gold transition-colors duration-300 py-2 dark:text-gray-200 dark:hover:text-gold">All Products</NuxtLink>
          <NuxtLink to="/about" class="text-luxury-green hover:text-gold transition-colors duration-300 py-2 dark:text-gray-200 dark:hover:text-gold">About</NuxtLink>
          <NuxtLink to="/contact" class="text-luxury-green hover:text-gold transition-colors duration-300 py-2 dark:text-gray-200 dark:hover:text-gold">Contact</NuxtLink>
          <NuxtLink to="/policies" class="text-luxury-green hover:text-gold transition-colors duration-300 py-2 dark:text-gray-200 dark:hover:text-gold">Policies</NuxtLink>
          <NuxtLink to="/cart" class="text-luxury-green hover:text-gold transition-colors duration-300 py-2 dark:text-gray-200 dark:hover:text-gold relative">
            Cart
            <span v-if="cart.itemCount > 0" class="absolute -top-2 -right-3 bg-gold text-luxury-green rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold animate-pop-in dark:bg-luxury-green dark:text-white">{{ cart.itemCount }}</span>
          </NuxtLink>
          <div class="pt-2 border-t border-gray-200 dark:border-gray-700 flex flex-col space-y-3">
            <NuxtLink to="/login" class="text-luxury-green hover:text-gold transition-colors duration-300 py-1 dark:text-gray-200 dark:hover:text-gold">Login</NuxtLink>
            <NuxtLink to="/register" class="bg-luxury-green text-white px-4 py-2 rounded-full hover:bg-gold hover:text-luxury-green transition-colors duration-300 text-center dark:bg-gold dark:text-luxury-green dark:hover:bg-luxury-green dark:hover:text-white">Sign Up</NuxtLink>
          </div>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup>
const mobileMenuOpen = ref(false)
const mobileCollectionOpen = ref(false)
const { cart, syncCartFromStorage } = useCart()

// On component mount, sync cart from localStorage to ensure we have the latest state
onMounted(() => {
  syncCartFromStorage()
})

const toggleMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const toggleCollectionMenu = () => {
  mobileCollectionOpen.value = !mobileCollectionOpen.value
}
</script>

<style scoped>
@keyframes popIn {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  80% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.animate-pop-in {
  animation: popIn 0.3s ease-out forwards;
  pointer-events: none; /* Prevent animation from interfering with clicks */
}
</style>