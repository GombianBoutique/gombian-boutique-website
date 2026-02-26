<template>
  <div class="w-full max-w-md">
    <div class="text-center mb-10">
      <NuxtLink to="/" class="inline-block">
        <img
          src="/images/logos/logo.png"
          alt="Gombian Boutique Logo"
          class="w-20 h-auto mx-auto mb-4"
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
            :disabled="loading"
            class="w-full bg-luxury-green hover:bg-gold text-white font-medium py-3 px-4 rounded-lg transition-colors duration-300 dark:hover:bg-gold dark:hover:text-luxury-green dark:bg-gold dark:text-luxury-green disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="loading" class="flex items-center justify-center gap-2">
              <svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending...
            </span>
            <span v-else>Send Reset Link</span>
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
</template>

<script setup>
definePageMeta({
  layout: 'auth'
})

const email = ref('')
const loading = ref(false)
const toast = useToast()

const handleResetPassword = async () => {
  // Prevent double submission
  if (loading.value) return

  loading.value = true

  try {
    // Call API to send password reset email
    await $fetch('/api/auth/reset-password', {
      method: 'POST',
      body: { email: email.value }
    })

    toast.success(`Password reset link sent to ${email.value}. Please check your inbox.`, 'Reset Link Sent')

    // Redirect to login page
    await navigateTo('/login')
  } catch (error) {
    // Even if email doesn't exist, show success message for security
    toast.success('If an account exists with this email, a reset link has been sent.', 'Reset Link Sent')
    await navigateTo('/login')
  } finally {
    loading.value = false
  }
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