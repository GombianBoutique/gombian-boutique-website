<template>
  <div class="min-h-screen flex items-center justify-center bg-neutral-light dark:bg-gray-900 py-12 px-4 transition-colors duration-300">
    <div class="w-full max-w-md">
      <div class="text-center mb-10">
        <NuxtLink to="/" class="inline-block">
          <img 
            src="/images/logos/Logo 01.png" 
            alt="Gombian Boutique Logo" 
            class="w-16 h-16 mx-auto mb-4"
          >
        </NuxtLink>
        <h1 class="text-3xl font-serif-display font-bold text-luxury-green dark:text-gold">Reset Password</h1>
        <p class="text-neutral-dark mt-2 dark:text-gray-300">Enter your email to receive a reset link</p>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 transition-colors duration-300">
        <form @submit.prevent="handleResetPassword">
          <div class="mb-6">
            <label for="email" class="block text-sm font-medium text-neutral-dark mb-2 dark:text-gray-200">Email address</label>
            <input
              id="email"
              v-model="email"
              type="email"
              required
              class="w-full px-4 py-3 border border-neutral-light rounded-lg focus:ring-2 focus:ring-luxury-green focus:border-transparent transition-colors duration-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="you@example.com"
            >
          </div>

          <button
            type="submit"
            class="w-full bg-luxury-green hover:bg-gold text-white font-medium py-3 px-4 rounded-lg transition-colors duration-300 dark:hover:bg-gold dark:hover:text-luxury-green dark:bg-gold dark:text-luxury-green"
          >
            Send Reset Link
          </button>
        </form>

        <div class="mt-6 text-center">
          <p class="text-sm text-neutral-dark dark:text-gray-300">
            Remember your password?
            <NuxtLink to="/login" class="font-medium text-luxury-green hover:text-gold transition-colors duration-300 dark:text-gold dark:hover:text-luxury-green">
              Sign in here
            </NuxtLink>
          </p>
        </div>
      </div>

      <div class="mt-8 text-center">
        <NuxtLink to="/" class="text-sm text-luxury-green hover:text-gold transition-colors duration-300 dark:text-gold dark:hover:text-luxury-green">
          ← Back to Homepage
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
const email = ref('')

const handleResetPassword = () => {
  // In a real application, you would implement actual password reset logic here
  // For now, we'll just simulate a successful reset request
  
  // Show a success message
  alert(`Password reset link sent to ${email.value}. Please check your inbox.`)
  
  // In a real app, you would typically redirect to the login page after sending the reset email
  navigateTo('/login')
}

useHead({
  title: 'Reset Password - Gombian Boutique',
  meta: [
    {
      name: 'description',
      content: 'Reset your Gombian Boutique account password by entering your email address.'
    }
  ]
})
</script>