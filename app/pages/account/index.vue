<!-- pages/account/index.vue -->
<template>
  <AuthGuard>
    <h1 class="text-3xl font-serif-display font-bold text-luxury-green dark:text-white mb-8">My Account</h1>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Sidebar Navigation -->
      <div class="lg:col-span-1">
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <div class="flex items-center mb-6">
            <div class="w-16 h-16 rounded-full bg-luxury-green/10 dark:bg-luxury-green/20 flex items-center justify-center">
              <span class="text-2xl font-bold text-luxury-green dark:text-gold">
                {{ userInitials }}
              </span>
            </div>
            <div class="ml-4">
              <p class="font-bold text-gray-900 dark:text-white">{{ userName }}</p>
              <p class="text-sm text-gray-600 dark:text-gray-400">{{ user?.email }}</p>
            </div>
          </div>

          <nav class="space-y-2">
            <NuxtLink
              to="/account"
              class="block px-4 py-3 rounded-lg bg-luxury-green/10 text-luxury-green dark:bg-luxury-green/20 dark:text-gold font-medium"
            >
              Dashboard
            </NuxtLink>
            <NuxtLink
              to="/account/profile"
              class="block px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              Profile Settings
            </NuxtLink>
            <NuxtLink
              to="/account/orders"
              class="block px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              Order History
            </NuxtLink>
            <NuxtLink
              to="/account/preferences"
              class="block px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              Scent Preferences
            </NuxtLink>
            <NuxtLink
              to="/wishlist"
              class="block px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              Wishlist
            </NuxtLink>
            <button
              @click="handleLogout"
              class="w-full text-left px-4 py-3 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              Logout
            </button>
          </nav>
        </div>
      </div>

      <!-- Main Content -->
      <div class="lg:col-span-2">
        <!-- Welcome Card -->
        <div class="bg-gradient-to-r from-luxury-green to-luxury-green/80 dark:from-luxury-green dark:to-luxury-green/80 rounded-xl shadow-md p-8 text-white mb-8">
          <h2 class="text-2xl font-bold mb-2">Welcome back, {{ user?.firstName }}!</h2>
          <p class="opacity-90">Manage your account and track your orders all in one place.</p>
        </div>

        <!-- Quick Stats -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-600 dark:text-gray-400">Total Orders</p>
                <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ orderCount }}</p>
              </div>
              <div class="w-12 h-12 rounded-full bg-luxury-green/10 flex items-center justify-center">
                <svg class="w-6 h-6 text-luxury-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
            </div>
          </div>

          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-600 dark:text-gray-400">Wishlist Items</p>
                <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ wishlistCount }}</p>
              </div>
              <div class="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
                <svg class="w-6 h-6 text-gold" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-600 dark:text-gray-400">Member Since</p>
                <p class="text-lg font-bold text-gray-900 dark:text-white">{{ memberSince }}</p>
              </div>
              <div class="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
                <svg class="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Orders -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white">Recent Orders</h3>
            <NuxtLink to="/account/orders" class="text-sm text-luxury-green hover:text-gold dark:text-gold dark:hover:text-luxury-green">
              View All →
            </NuxtLink>
          </div>

          <div v-if="recentOrders.length > 0" class="space-y-4">
            <div
              v-for="order in recentOrders"
              :key="order.id"
              class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <div>
                <p class="font-medium text-gray-900 dark:text-white">Order #{{ order.orderNumber }}</p>
                <p class="text-sm text-gray-600 dark:text-gray-400">{{ formatDate(order.createdAt) }}</p>
              </div>
              <div class="text-right">
                <p class="font-bold text-luxury-green dark:text-gold">{{ formatCurrency(order.totalAmount, order.currency) }}</p>
                <span
                  :class="[
                    'text-xs px-2 py-1 rounded-full',
                    getStatusClass(order.status)
                  ]"
                >
                  {{ order.status }}
                </span>
              </div>
            </div>
          </div>
          <div v-else class="text-center py-8 text-gray-600 dark:text-gray-400">
            <p>No orders yet</p>
            <NuxtLink to="/products" class="text-luxury-green hover:text-gold dark:text-gold dark:hover:text-luxury-green mt-2 inline-block">
              Start Shopping →
            </NuxtLink>
          </div>
        </div>

        <!-- Account Actions -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <NuxtLink
            to="/products"
            class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div class="flex items-center">
              <div class="w-12 h-12 rounded-full bg-luxury-green/10 flex items-center justify-center mr-4">
                <svg class="w-6 h-6 text-luxury-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <div>
                <p class="font-bold text-gray-900 dark:text-white">Browse Products</p>
                <p class="text-sm text-gray-600 dark:text-gray-400">Explore our collection</p>
              </div>
            </div>
          </NuxtLink>

          <NuxtLink
            to="/contact"
            class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div class="flex items-center">
              <div class="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mr-4">
                <svg class="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div>
                <p class="font-bold text-gray-900 dark:text-white">Contact Support</p>
                <p class="text-sm text-gray-600 dark:text-gray-400">Get help with anything</p>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </AuthGuard>
</template>

<script setup>
import { formatCurrency } from '~/utils/formatting'
import { useAuth } from '~/composables/useAuth'
import { useWishlist } from '~/composables/useWishlist'

definePageMeta({
  layout: 'default'
})

const { user, logout, checkAuth, getToken } = useAuth()
const wishlistStore = useWishlist()
const router = useRouter()
const toast = useToast()

// Orders state
const recentOrders = ref([])
const orderCount = ref(0)

// Get real wishlist count from store
const wishlistCount = computed(() => wishlistStore.getItemCount.value)

// Fetch orders from API
const fetchOrders = async () => {
  try {
    const token = getToken()
    if (!token) return

    const response = await $fetch('/api/account/orders', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    const orders = response.data || []
    orderCount.value = orders.length
    recentOrders.value = orders.slice(0, 3) // Get last 3 orders
    console.log(`Loaded ${orderCount.value} orders for dashboard`)
  } catch (error) {
    console.error('Failed to fetch orders:', error)
    orderCount.value = 0
    recentOrders.value = []
  }
}

// Computed properties
const userName = computed(() => {
  if (!user.value) return ''
  return `${user.value.firstName} ${user.value.lastName}`
})

const userInitials = computed(() => {
  if (!user.value) return ''
  return `${user.value.firstName[0]}${user.value.lastName[0]}`.toUpperCase()
})

const memberSince = computed(() => {
  if (!user.value?.createdAt) return 'N/A'
  return new Date(user.value.createdAt).toLocaleDateString('en-ZA', {
    month: 'short',
    year: 'numeric'
  })
})

// Format date helper
const formatDate = (dateString) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-ZA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Get status class
const getStatusClass = (status) => {
  const classes = {
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    processing: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    shipped: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    delivered: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    cancelled: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
  }
  return classes[status] || classes.pending
}

// Handle logout
const handleLogout = async () => {
  try {
    await logout()
    toast.success('Logged out successfully', 'Logout')
    router.push('/')
  } catch (error) {
    toast.error('Failed to logout', 'Error')
  }
}

// Load user data and orders
onMounted(async () => {
  // Ensure user data is loaded from API
  await checkAuth()
  
  // Initialize wishlist to get accurate count
  await wishlistStore.initialize()
  
  // Fetch orders
  await fetchOrders()
})

// Set page title
useHead({
  title: 'My Account - Gombian Boutique'
})
</script>
