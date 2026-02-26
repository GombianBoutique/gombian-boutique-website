<!-- pages/track-order.vue -->
<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-3xl mx-auto">
      <!-- Page Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-serif-display font-bold text-luxury-green dark:text-white mb-4">
          Track Your Order
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          Enter your order number and email to track your shipment
        </p>
      </div>

      <!-- Tracking Form -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 mb-8">
        <form @submit.prevent="trackOrder">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label for="orderNumber" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Order Number
              </label>
              <input
                id="orderNumber"
                v-model="orderNumber"
                type="text"
                required
                placeholder="GB-2026-123456"
                class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-luxury-green focus:border-transparent"
              />
            </div>
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>
              <input
                id="email"
                v-model="email"
                type="email"
                required
                placeholder="your@email.com"
                class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-luxury-green focus:border-transparent"
              />
            </div>
          </div>
          <button
            type="submit"
            :disabled="loading"
            class="w-full bg-luxury-green text-white px-6 py-3 rounded-full font-medium hover:bg-gold hover:text-luxury-green transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ loading ? 'Tracking...' : 'Track Order' }}
          </button>
        </form>
      </div>

      <!-- Tracking Results -->
      <div v-if="trackingResult" class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
        <div class="flex items-center justify-between mb-8">
          <div>
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Order #{{ trackingResult.orderNumber }}</h2>
            <p class="text-gray-600 dark:text-gray-400">Placed on {{ formatDate(trackingResult.createdAt) }}</p>
          </div>
          <span
            :class="[
              'px-4 py-2 rounded-full text-sm font-medium',
              getStatusClass(trackingResult.status)
            ]"
          >
            {{ trackingResult.status }}
          </span>
        </div>

        <!-- Progress Timeline -->
        <div class="relative">
          <div class="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"></div>
          <div class="space-y-8 relative">
            <div
              v-for="(step, index) in trackingSteps"
              :key="step.id"
              class="flex items-start"
            >
              <div
                :class="[
                  'w-8 h-8 rounded-full flex items-center justify-center z-10',
                  step.completed
                    ? 'bg-luxury-green text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                ]"
              >
                <svg v-if="step.completed" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span v-else class="text-sm font-bold">{{ index + 1 }}</span>
              </div>
              <div class="ml-4 flex-grow">
                <p
                  :class="[
                    'font-medium',
                    step.completed
                      ? 'text-luxury-green dark:text-gold'
                      : 'text-gray-500 dark:text-gray-400'
                  ]"
                >
                  {{ step.name }}
                </p>
                <p v-if="step.date" class="text-sm text-gray-600 dark:text-gray-400">
                  {{ step.date }}
                </p>
                <p v-if="step.description" class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {{ step.description }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Shipping Info -->
        <div v-if="trackingResult.trackingNumber" class="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <h3 class="font-bold text-gray-900 dark:text-white mb-4">Shipping Information</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p class="text-sm text-gray-600 dark:text-gray-400">Tracking Number</p>
              <p class="font-mono text-gray-900 dark:text-white">{{ trackingResult.trackingNumber }}</p>
            </div>
            <div v-if="trackingResult.trackingCarrier">
              <p class="text-sm text-gray-600 dark:text-gray-400">Carrier</p>
              <p class="text-gray-900 dark:text-white">{{ trackingResult.trackingCarrier }}</p>
            </div>
            <div v-if="trackingResult.estimatedDelivery">
              <p class="text-sm text-gray-600 dark:text-gray-400">Estimated Delivery</p>
              <p class="text-gray-900 dark:text-white">{{ formatDate(trackingResult.estimatedDelivery) }}</p>
            </div>
          </div>
          <a
            v-if="trackingResult.trackingNumber && trackingResult.trackingCarrier"
            :href="getTrackingLink()"
            target="_blank"
            rel="noopener noreferrer"
            class="mt-4 inline-flex items-center text-luxury-green hover:text-gold dark:text-gold dark:hover:text-luxury-green font-medium"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Track on Carrier Website
          </a>
        </div>
      </div>

      <!-- Not Found State -->
      <div v-if="notFound" class="text-center py-12">
        <svg class="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 class="mt-4 text-xl font-bold text-gray-900 dark:text-white">Order Not Found</h3>
        <p class="mt-2 text-gray-600 dark:text-gray-400">
          We couldn't find an order with that number and email combination.
        </p>
        <p class="mt-4 text-sm text-gray-500 dark:text-gray-500">
          Please check your order number and email address, or contact support for assistance.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'default'
})

const orderNumber = ref('')
const email = ref('')
const loading = ref(false)
const trackingResult = ref(null)
const notFound = ref(false)

const trackingSteps = computed(() => {
  if (!trackingResult.value) return []
  
  const steps = [
    { id: 'pending', name: 'Order Placed', completed: true, date: formatDate(trackingResult.value.createdAt) },
    { id: 'processing', name: 'Processing', completed: ['processing', 'shipped', 'delivered'].includes(trackingResult.value.status), description: 'Your order is being prepared' },
    { id: 'shipped', name: 'Shipped', completed: ['shipped', 'delivered'].includes(trackingResult.value.status), description: trackingResult.value.shippedAt ? `Shipped on ${formatDate(trackingResult.value.shippedAt)}` : '' },
    { id: 'delivered', name: 'Delivered', completed: trackingResult.value.status === 'delivered', description: trackingResult.value.deliveredAt ? `Delivered on ${formatDate(trackingResult.value.deliveredAt)}` : '' }
  ]
  
  return steps
})

const trackOrder = async () => {
  // Prevent double submission
  if (loading.value) return

  loading.value = true
  notFound.value = false
  trackingResult.value = null

  try {
    // In production, call API to track order
    // const { data } = await useFetch('/api/orders/track', {
    //   method: 'POST',
    //   body: { orderNumber: orderNumber.value, email: email.value }
    // })

    // Mock response for demonstration
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Simulate order found
    trackingResult.value = {
      orderNumber: orderNumber.value,
      status: 'shipped',
      createdAt: new Date().toISOString(),
      shippedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      trackingNumber: '1Z999AA1234567890',
      trackingCarrier: 'DHL',
      estimatedDelivery: new Date(Date.now() + 86400000 * 3).toISOString()
    }
  } catch (error) {
    notFound.value = true
  } finally {
    loading.value = false
  }
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-ZA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

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

const getTrackingLink = () => {
  if (!trackingResult.value?.trackingNumber) return '#'
  
  const carriers = {
    'DHL': `https://www.dhl.com/en/express/tracking.html?AWB=${trackingResult.value.trackingNumber}`,
    'FedEx': `https://www.fedex.com/fedextrack/?trknbr=${trackingResult.value.trackingNumber}`,
    'UPS': `https://www.ups.com/track?tracknum=${trackingResult.value.trackingNumber}`
  }
  
  return carriers[trackingResult.value.trackingCarrier] || '#'
}

useHead({
  title: 'Track Order - Gombian Boutique',
  meta: [
    {
      name: 'description',
      content: 'Track your Gombian Boutique order status and shipment in real-time.'
    }
  ]
})
</script>
