<!-- pages/account/orders.vue -->
<template>
  <AuthGuard>
    <NuxtLink to="/account" class="text-luxury-green hover:text-gold dark:text-gold dark:hover:text-luxury-green mb-6 inline-block">
      ← Back to Dashboard
    </NuxtLink>

    <h1 class="text-3xl font-serif-display font-bold text-luxury-green dark:text-white mb-8">Order History</h1>

    <!-- Empty State -->
    <div v-if="orders.length === 0" class="text-center py-16">
      <svg class="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
      <h3 class="mt-4 text-xl font-bold text-luxury-green dark:text-white">No orders yet</h3>
      <p class="mt-2 text-gray-600 dark:text-gray-400">
        You haven't placed any orders yet. Start shopping to see your order history here.
      </p>
      <div class="mt-6">
        <NuxtLink to="/products" class="luxury-button">
          Start Shopping
        </NuxtLink>
      </div>
    </div>

    <!-- Orders List -->
    <div v-else class="space-y-6">
      <div
        v-for="order in orders"
        :key="order.id"
        class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
      >
        <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <div>
            <div class="flex items-center gap-3">
              <h3 class="text-lg font-bold text-gray-900 dark:text-white">
                Order #{{ order.orderNumber }}
              </h3>
              <span
                :class="[
                  'px-3 py-1 rounded-full text-xs font-medium',
                  getStatusClass(order.status)
                ]"
              >
                {{ order.status }}
              </span>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Placed on {{ formatDate(order.createdAt) }}
            </p>
          </div>
          <div class="mt-4 md:mt-0 text-right">
            <p class="text-lg font-bold text-luxury-green dark:text-gold">
              {{ formatCurrency(order.totalAmount, order.currency) }}
            </p>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              {{ order.items.length }} item{{ order.items.length !== 1 ? 's' : '' }}
            </p>
          </div>
        </div>

        <!-- Order Items Preview -->
        <div class="flex gap-4 mb-4 overflow-x-auto">
          <div
            v-for="item in order.items.slice(0, 4)"
            :key="item.productId"
            class="flex-shrink-0 w-20"
          >
            <NuxtImg
              :src="item.productImage"
              :alt="item.productName"
              class="w-20 h-20 object-contain rounded-lg bg-gray-50 dark:bg-gray-700"
              :modifiers="{ fit: 'contain', width: 80, height: 80 }"
            />
          </div>
          <div v-if="order.items.length > 4" class="flex-shrink-0 w-20 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-lg h-20">
            <span class="text-gray-600 dark:text-gray-400 font-medium">
              +{{ order.items.length - 4 }}
            </span>
          </div>
        </div>

        <div class="flex flex-wrap gap-3">
          <NuxtLink
            :to="`/orders/${order.id}`"
            class="px-4 py-2 bg-luxury-green text-white rounded-full text-sm hover:bg-gold hover:text-luxury-green transition-colors"
          >
            View Details
          </NuxtLink>
          <button
            v-if="canTrackOrder(order)"
            @click="trackOrder(order)"
            class="px-4 py-2 border border-luxury-green text-luxury-green rounded-full text-sm hover:bg-luxury-green hover:text-white transition-colors"
          >
            Track Order
          </button>
          <button
            v-if="canReorder(order)"
            @click="reorder(order)"
            class="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            Reorder
          </button>
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="flex justify-center gap-2 mt-8">
        <button
          v-for="page in totalPages"
          :key="page"
          @click="currentPage = page"
          :class="[
            'px-4 py-2 rounded-full text-sm font-medium transition-colors',
            currentPage === page
              ? 'bg-luxury-green text-white'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          ]"
        >
          {{ page }}
        </button>
      </div>
    </div>
  </AuthGuard>
</template>

<script setup>
import { formatCurrency } from '~/utils/formatting'
import { useAuth } from '~/composables/useAuth'

definePageMeta({
  layout: 'default'
})

const router = useRouter()
const cartStore = useCartStore()
const { getToken } = useAuth()
const toast = useToast()

// Orders state
const orders = ref([])
const loading = ref(true)
const error = ref(null)
const currentPage = ref(1)
const totalPages = ref(1)

// Fetch orders from API
const fetchOrders = async () => {
  loading.value = true
  error.value = null
  
  try {
    const token = getToken()
    if (!token) {
      throw new Error('Not authenticated')
    }

    const response = await $fetch('/api/account/orders', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    orders.value = response.data || []
    console.log(`Loaded ${orders.value.length} orders from API`)
  } catch (err) {
    console.error('Failed to fetch orders:', err)
    error.value = err.message || 'Failed to load orders'
    toast.error('Failed to load order history', 'Error')
  } finally {
    loading.value = false
  }
}

// Get status class
const getStatusClass = (status) => {
  const classes = {
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    processing: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    shipped: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    delivered: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    cancelled: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    refunded: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
  }
  return classes[status] || classes.pending
}

// Format date helper
const formatDate = (dateString) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-ZA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Check if order can be tracked
const canTrackOrder = (order) => {
  return ['processing', 'shipped', 'delivered'].includes(order.status) && order.trackingNumber
}

// Check if order can be reordered
const canReorder = (order) => {
  return order.status !== 'cancelled'
}

// Track order
const trackOrder = (order) => {
  if (order.trackingNumber && order.trackingCarrier) {
    const carriers = {
      'DHL': `https://www.dhl.com/en/express/tracking.html?AWB=${order.trackingNumber}`,
      'FedEx': `https://www.fedex.com/fedextrack/?trknbr=${order.trackingNumber}`,
      'UPS': `https://www.ups.com/track?tracknum=${order.trackingNumber}`
    }
    const trackingUrl = carriers[order.trackingCarrier] || '#'
    window.open(trackingUrl, '_blank')
  }
}

// Reorder
const reorder = async (order) => {
  for (const item of order.items) {
    cartStore.addItem({
      productId: item.productId,
      productName: item.productName,
      productImage: item.productImage,
      unitPrice: item.unitPrice,
      quantity: 1,
      inventoryCount: 10,
      totalPrice: item.unitPrice
    })
  }

  toast.success('All items added to cart!', 'Reorder')
  router.push('/cart')
}

// Load orders on mount
onMounted(async () => {
  await fetchOrders()
})

useHead({
  title: 'Order History - Gombian Boutique'
})
</script>
