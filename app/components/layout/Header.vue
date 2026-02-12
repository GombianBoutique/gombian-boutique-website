<!-- components/layout/Header.vue -->
<template>
  <header class="sticky top-0 z-50 w-full border-b bg-white/90 backdrop-blur-sm dark:bg-gray-900/90">
    <div class="container flex h-16 items-center justify-between px-4">
      <!-- Logo and Site Name -->
      <div class="flex items-center space-x-2">
        <NuxtLink to="/" class="flex items-center space-x-2">
          <img 
            src="/images/logos/Logo 01.png" 
            alt="Gombian Boutique Logo" 
            class="h-10 w-10"
          >
          <span class="text-2xl font-serif-display font-bold text-luxury-green transition-colors duration-300 dark:text-gold">
            Gombian Boutique
          </span>
        </NuxtLink>
      </div>

      <!-- Desktop Navigation -->
      <nav class="hidden md:flex items-center space-x-8">
        <NuxtLink to="/" class="text-luxury-green hover:text-gold transition-colors duration-300 dark:text-gray-200 dark:hover:text-gold">
          Home
        </NuxtLink>
        <NuxtLink to="/products" class="text-luxury-green hover:text-gold transition-colors duration-300 dark:text-gray-200 dark:hover:text-gold">
          Collection
        </NuxtLink>
        <NuxtLink to="/about" class="text-luxury-green hover:text-gold transition-colors duration-300 dark:text-gray-200 dark:hover:text-gold">
          About
        </NuxtLink>
        <NuxtLink to="/contact" class="text-luxury-green hover:text-gold transition-colors duration-300 dark:text-gray-200 dark:hover:text-gold">
          Contact
        </NuxtLink>
        <NuxtLink to="/policies" class="text-luxury-green hover:text-gold transition-colors duration-300 dark:text-gray-200 dark:hover:text-gold">
          Policies
        </NuxtLink>
      </nav>

      <!-- Right side actions -->
      <div class="flex items-center space-x-4">
        <!-- Search Icon -->
        <button class="text-luxury-green hover:text-gold transition-colors duration-300 dark:text-gray-200 dark:hover:text-gold">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>

        <!-- Cart with badge -->
        <NuxtLink to="/cart" class="relative text-luxury-green hover:text-gold transition-colors duration-300 dark:text-gray-200 dark:hover:text-gold">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span 
            v-if="cartStore.itemCount > 0" 
            class="absolute -top-2 -right-2 bg-gold text-luxury-green rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold dark:bg-luxury-green dark:text-white"
          >
            {{ cartStore.itemCount }}
          </span>
        </NuxtLink>

        <!-- User Menu -->
        <div class="flex items-center space-x-2">
          <NuxtLink to="/login" class="text-luxury-green hover:text-gold transition-colors duration-300 dark:text-gray-200 dark:hover:text-gold">
            Login
          </NuxtLink>
          <NuxtLink to="/register" class="hidden md:block bg-luxury-green text-white px-4 py-2 rounded-full hover:bg-gold hover:text-luxury-green transition-colors duration-300 dark:bg-gold dark:text-luxury-green dark:hover:bg-luxury-green dark:hover:text-white">
            Sign Up
          </NuxtLink>
        </div>

        <!-- Color Mode Toggle -->
        <ClientOnly>
          <ColorModeToggle />
        </ClientOnly>

        <!-- Mobile Menu Button -->
        <button 
          @click="toggleMobileMenu" 
          class="md:hidden text-luxury-green focus:outline-none transition-colors duration-300 dark:text-gray-200"
        >
          <svg v-if="!mobileMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
          <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Navigation -->
    <div v-if="mobileMenuOpen" class="md:hidden border-t bg-white dark:bg-gray-800">
      <div class="container py-4 px-4 space-y-3">
        <NuxtLink 
          to="/" 
          class="block py-2 text-luxury-green hover:text-gold transition-colors duration-300 dark:text-gray-200 dark:hover:text-gold"
          @click="mobileMenuOpen = false"
        >
          Home
        </NuxtLink>
        <NuxtLink 
          to="/products" 
          class="block py-2 text-luxury-green hover:text-gold transition-colors duration-300 dark:text-gray-200 dark:hover:text-gold"
          @click="mobileMenuOpen = false"
        >
          Collection
        </NuxtLink>
        <NuxtLink 
          to="/about" 
          class="block py-2 text-luxury-green hover:text-gold transition-colors duration-300 dark:text-gray-200 dark:hover:text-gold"
          @click="mobileMenuOpen = false"
        >
          About
        </NuxtLink>
        <NuxtLink 
          to="/contact" 
          class="block py-2 text-luxury-green hover:text-gold transition-colors duration-300 dark:text-gray-200 dark:hover:text-gold"
          @click="mobileMenuOpen = false"
        >
          Contact
        </NuxtLink>
        <NuxtLink 
          to="/policies" 
          class="block py-2 text-luxury-green hover:text-gold transition-colors duration-300 dark:text-gray-200 dark:hover:text-gold"
          @click="mobileMenuOpen = false"
        >
          Policies
        </NuxtLink>
        <NuxtLink 
          to="/login" 
          class="block py-2 text-luxury-green hover:text-gold transition-colors duration-300 dark:text-gray-200 dark:hover:text-gold"
          @click="mobileMenuOpen = false"
        >
          Login
        </NuxtLink>
        <NuxtLink 
          to="/register" 
          class="block py-2 text-center bg-luxury-green text-white rounded-full hover:bg-gold hover:text-luxury-green transition-colors duration-300 dark:bg-gold dark:text-luxury-green dark:hover:bg-luxury-green dark:hover:text-white"
          @click="mobileMenuOpen = false"
        >
          Sign Up
        </NuxtLink>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const mobileMenuOpen = ref(false)
const cartStore = useCartStore()

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

// Close mobile menu when route changes
const route = useRoute()
watch(() => route.path, () => {
  mobileMenuOpen.value = false
})
</script>