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
      <h1 class="text-3xl font-serif-display font-bold text-luxury-green dark:text-gold">Welcome Back</h1>
      <p class="text-neutral-dark mt-2 dark:text-gray-300">Sign in to access your account</p>
    </div>

    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 transition-colors duration-300">
        <form @submit.prevent="handleLogin">
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
            <div class="flex justify-between items-center mb-2">
              <label for="password" class="block text-sm font-medium text-neutral-dark dark:text-gray-200">Password</label>
              <NuxtLink to="/forgot-password" class="text-sm text-luxury-green hover:text-gold transition-colors duration-300 dark:text-gold dark:hover:text-luxury-green">Forgot password?</NuxtLink>
            </div>
            <input
              id="password"
              v-model="password"
              type="password"
              required
              class="w-full px-4 py-3 border border-neutral-light rounded-lg focus:ring-2 focus:ring-luxury-green focus:border-transparent transition-colors duration-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="••••••••"
            >
          </div>

          <div class="mb-6 flex items-center">
            <input
              id="remember-me"
              v-model="rememberMe"
              type="checkbox"
              class="h-4 w-4 text-luxury-green border-neutral-light rounded focus:ring-luxury-green dark:focus:ring-gold dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
            >
            <label for="remember-me" class="ml-2 block text-sm text-neutral-dark dark:text-gray-300">Remember me</label>
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
              Signing in...
            </span>
            <span v-else>Sign in</span>
          </button>
        </form>

        <div class="mt-6 text-center">
          <p class="text-sm text-neutral-dark dark:text-gray-300">
            Don't have an account?
            <NuxtLink to="/register" class="font-medium text-luxury-green hover:text-gold transition-colors duration-300 dark:text-gold dark:hover:text-luxury-green">
              Register here
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

const email = ref('')
const password = ref('')
const rememberMe = ref(false)

const { login, error, loading } = useAuth()
const router = useRouter()
const route = useRoute()
const toast = useToast()

const handleLogin = async () => {
  // Prevent double submission
  if (loading.value) return

  try {
    await login(email.value, password.value)

    toast.success('Welcome back!', 'Login Successful')

    // Redirect to return URL or account dashboard
    const redirect = route.query.redirect || '/account'
    await navigateTo(redirect)
  } catch (err) {
    toast.error(error.value || 'Login failed. Please check your credentials.', 'Login Error')
  }
}

useHead({
  title: 'Login - Gombian Boutique',
  meta: [
    {
      name: 'description',
      content: 'Sign in to your Gombian Boutique account to access exclusive features and manage your perfume collection.'
    }
  ]
})
</script>