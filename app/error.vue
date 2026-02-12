<template>
  <div class="min-h-screen flex items-center justify-center bg-neutral-light dark:bg-gray-900 transition-colors duration-300">
    <div class="text-center max-w-md mx-auto px-4">
      <div v-if="error && (error.statusCode === 401 || (error.message && error.message.includes('401')))">
        <h1 class="text-6xl font-serif-display font-bold text-luxury-green mb-4 dark:text-gold">401</h1>
        <h2 class="text-2xl font-serif-display text-luxury-green mb-6 dark:text-gold">Unauthorized Access</h2>
        <p class="text-neutral-dark mb-8 dark:text-gray-300">
          Sorry, you don't have permission to access this resource. You may need to log in or your session may have expired.
        </p>
        <div class="space-y-4">
          <NuxtLink to="/login" class="luxury-button inline-block">Log In</NuxtLink>
          <NuxtLink to="/" class="text-luxury-green hover:text-gold ml-4 transition-colors dark:text-gold dark:hover:text-luxury-green">Return Home</NuxtLink>
        </div>
      </div>
      <div v-else-if="error && error.statusCode === 404" class="text-center max-w-md mx-auto px-4">
        <h1 class="text-6xl font-serif-display font-bold text-luxury-green mb-4 dark:text-gold">404</h1>
        <h2 class="text-2xl font-serif-display text-luxury-green mb-6 dark:text-gold">Page Not Found</h2>
        <p class="text-neutral-dark mb-8 dark:text-gray-300">
          The page you're looking for doesn't exist or may have been removed.
        </p>
        <NuxtLink to="/" class="luxury-button">Return Home</NuxtLink>
      </div>
      <div v-else class="text-center max-w-md mx-auto px-4">
        <h1 class="text-6xl font-serif-display font-bold text-luxury-green mb-4 dark:text-gold">{{ error?.statusCode || 500 }}</h1>
        <h2 class="text-2xl font-serif-display text-luxury-green mb-6 dark:text-gold">Oops! Something went wrong</h2>
        <p class="text-neutral-dark mb-8 dark:text-gray-300">
          {{ error?.message || 'An unexpected error occurred.' }}
        </p>
        <div class="space-y-4">
          <NuxtLink to="/" class="luxury-button inline-block">Return Home</NuxtLink>
          <button @click="handleError" class="luxury-button bg-neutral-dark text-white ml-4 dark:bg-gray-700">Try Again</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  error: {
    type: Object,
    default: () => ({})
  }
})

const handleError = () => {
  // Clear the error and redirect to home
  clearError({ redirect: '/' })
}
</script>