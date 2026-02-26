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
      <h1 class="text-3xl font-serif-display font-bold text-luxury-green dark:text-gold">Create Account</h1>
      <p class="text-neutral-dark mt-2 dark:text-gray-300">Sign up to join our exclusive community</p>
    </div>

    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 transition-colors duration-300">
        <form @submit.prevent="handleRegister">
          <div class="mb-6">
            <label for="fullName" class="block text-sm font-medium text-neutral-dark mb-2 dark:text-gray-200">Full Name</label>
            <input
              id="fullName"
              v-model="fullName"
              type="text"
              required
              class="w-full px-4 py-3 border border-neutral-light rounded-lg focus:ring-2 focus:ring-luxury-green focus:border-transparent transition-colors duration-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="John Doe"
            >
          </div>

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

          <div class="mb-6">
            <label for="password" class="block text-sm font-medium text-neutral-dark mb-2 dark:text-gray-200">Password</label>
            <input
              id="password"
              v-model="password"
              type="password"
              required
              minlength="8"
              class="w-full px-4 py-3 border border-neutral-light rounded-lg focus:ring-2 focus:ring-luxury-green focus:border-transparent transition-colors duration-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="••••••••"
            >
            <p class="mt-2 text-xs text-neutral-dark dark:text-gray-400">Password must be at least 8 characters</p>
          </div>

          <div class="mb-6">
            <label for="confirmPassword" class="block text-sm font-medium text-neutral-dark mb-2 dark:text-gray-200">Confirm Password</label>
            <input
              id="confirmPassword"
              v-model="confirmPassword"
              type="password"
              required
              class="w-full px-4 py-3 border border-neutral-light rounded-lg focus:ring-2 focus:ring-luxury-green focus:border-transparent transition-colors duration-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="••••••••"
            >
          </div>

          <div class="mb-6 flex items-center">
            <input
              id="terms"
              v-model="acceptTerms"
              type="checkbox"
              required
              class="h-4 w-4 text-luxury-green border-neutral-light rounded focus:ring-luxury-green dark:focus:ring-gold dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
            >
            <label for="terms" class="ml-2 block text-sm text-neutral-dark dark:text-gray-300">
              I agree to the <NuxtLink to="/policies" class="text-luxury-green hover:text-gold transition-colors duration-300 dark:text-gold dark:hover:text-luxury-green">Terms of Service</NuxtLink> and <NuxtLink to="/policies" class="text-luxury-green hover:text-gold transition-colors duration-300 dark:text-gold dark:hover:text-luxury-green">Privacy Policy</NuxtLink>
            </label>
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
              Creating account...
            </span>
            <span v-else>Create Account</span>
          </button>
        </form>

        <div class="mt-6 text-center">
          <p class="text-sm text-neutral-dark dark:text-gray-300">
            Already have an account?
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
import { useAuth } from '~/composables/useAuth'

definePageMeta({
  layout: 'auth'
})

const fullName = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const acceptTerms = ref(false)

const { register, error, loading } = useAuth()
const toast = useToast()

const handleRegister = async () => {
  // Prevent double submission
  if (loading.value) return

  // Validate passwords match
  if (password.value !== confirmPassword.value) {
    toast.error('Passwords do not match!', 'Registration Error')
    return
  }

  // Validate terms accepted
  if (!acceptTerms.value) {
    toast.error('You must accept the Terms of Service and Privacy Policy', 'Registration Error')
    return
  }

  // Split full name
  const nameParts = fullName.value.trim().split(' ')
  const firstName = nameParts[0] || ''
  const lastName = nameParts.slice(1).join(' ') || ''

  try {
    await register({
      email: email.value,
      password: password.value,
      firstName,
      lastName
    })

    toast.success('Account created successfully! Welcome to Gombian Boutique.', 'Registration Successful')

    // Redirect to account dashboard
    await navigateTo('/account')
  } catch (err) {
    toast.error(error.value || 'Registration failed. Please try again.', 'Registration Error')
  }
}

useHead({
  title: 'Register - Gombian Boutique',
  meta: [
    {
      name: 'description',
      content: 'Create an account with Gombian Boutique to access exclusive features and manage your perfume collection.'
    }
  ]
})
</script>