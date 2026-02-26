<!-- pages/orders/[id].vue -->
<template>
  <AuthGuard>
    <div class="container mx-auto px-4 py-8">
    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center py-32">
      <div class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-luxury-green"></div>
      <span class="ml-4 text-lg text-luxury-green dark:text-white">Loading order details...</span>
    </div>

    <!-- Order Not Found -->
    <div v-else-if="!order" class="text-center py-16">
      <svg class="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h3 class="mt-4 text-xl font-bold text-luxury-green dark:text-white">Order not found</h3>
      <p class="mt-2 text-gray-600 dark:text-gray-400">
        We couldn't find the order you're looking for.
      </p>
      <div class="mt-6">
        <NuxtLink to="/orders" class="luxury-button">
          Back to Orders
        </NuxtLink>
      </div>
    </div>

    <!-- Order Details -->
    <div v-else class="max-w-4xl mx-auto">
      <!-- Page Header -->
      <div class="mb-8">
        <NuxtLink to="/orders" class="text-luxury-green hover:text-gold dark:text-gold dark:hover:text-luxury-green mb-4 inline-block">
          ← Back to Orders
        </NuxtLink>
        <div class="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 class="text-3xl font-serif-display font-bold text-luxury-green dark:text-white">
              Order #{{ order.orderNumber }}
            </h1>
            <p class="text-gray-600 dark:text-gray-400 mt-1">
              Placed on {{ formatDate(order.createdAt) }}
            </p>
          </div>
          <div class="mt-4 md:mt-0">
            <span
              :class="[
                'px-4 py-2 rounded-full text-sm font-medium',
                getStatusClass(order.status)
              ]"
            >
              {{ order.status }}
            </span>
          </div>
        </div>
      </div>

      <!-- Order Status Timeline -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
        <h2 class="text-xl font-bold text-luxury-green dark:text-white mb-6">Order Status</h2>
        <div class="relative">
          <div class="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"></div>
          <div class="space-y-6 relative">
            <div
              v-for="(step, index) in statusSteps"
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
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Order Items -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
        <h2 class="text-xl font-bold text-luxury-green dark:text-white mb-6">Order Items</h2>
        <ul class="divide-y divide-gray-200 dark:divide-gray-700">
          <li
            v-for="item in order.items"
            :key="item.productId"
            class="py-6 flex"
          >
            <NuxtImg
              :src="item.productImage"
              :alt="item.productName"
              class="w-24 h-24 object-contain flex-shrink-0"
              :modifiers="{ fit: 'contain', width: 120, height: 120 }"
            />
            <div class="ml-6 flex-grow">
              <div class="flex justify-between">
                <div>
                  <h3 class="font-medium text-gray-900 dark:text-white">
                    {{ item.productName }}
                  </h3>
                  <p class="text-gray-600 dark:text-gray-400 mt-1">
                    Quantity: {{ item.quantity }}
                  </p>
                </div>
                <p class="font-bold text-luxury-green dark:text-gold">
                  {{ formatCurrency(item.totalPrice, order.currency) }}
                </p>
              </div>
              <div class="mt-2">
                <NuxtLink
                  :to="`/products/${item.productId}`"
                  class="text-sm text-luxury-green hover:text-gold dark:text-gold dark:hover:text-luxury-green"
                >
                  View Product →
                </NuxtLink>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <!-- Order Summary -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
        <h2 class="text-xl font-bold text-luxury-green dark:text-white mb-6">Order Summary</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Shipping Address -->
          <div>
            <h3 class="font-bold text-luxury-green dark:text-gold mb-4 flex items-center">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Shipping Address
            </h3>
            <div class="text-gray-700 dark:text-gray-300">
              <p>{{ order.shippingAddress.firstName }} {{ order.shippingAddress.lastName }}</p>
              <p>{{ order.shippingAddress.addressLine1 }}</p>
              <p v-if="order.shippingAddress.addressLine2">{{ order.shippingAddress.addressLine2 }}</p>
              <p>{{ order.shippingAddress.city }}, {{ order.shippingAddress.state }} {{ order.shippingAddress.postalCode }}</p>
              <p>{{ order.shippingAddress.country }}</p>
              <p v-if="order.shippingAddress.phone" class="mt-2">
                <span class="font-medium">Phone:</span> {{ order.shippingAddress.phone }}
              </p>
            </div>
          </div>

          <!-- Billing Address -->
          <div>
            <h3 class="font-bold text-luxury-green dark:text-gold mb-4 flex items-center">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Billing Address
            </h3>
            <div class="text-gray-700 dark:text-gray-300">
              <p>{{ order.billingAddress.firstName }} {{ order.billingAddress.lastName }}</p>
              <p>{{ order.billingAddress.addressLine1 }}</p>
              <p v-if="order.billingAddress.addressLine2">{{ order.billingAddress.addressLine2 }}</p>
              <p>{{ order.billingAddress.city }}, {{ order.billingAddress.state }} {{ order.billingAddress.postalCode }}</p>
              <p>{{ order.billingAddress.country }}</p>
            </div>
          </div>
        </div>

        <!-- Payment Information -->
        <div class="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <h3 class="font-bold text-luxury-green dark:text-gold mb-4 flex items-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
            Payment Information
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p class="text-sm text-gray-600 dark:text-gray-400">Payment Method</p>
              <p class="font-medium text-gray-900 dark:text-white capitalize">
                {{ order.paymentMethod === 'credit_card' ? 'Credit/Debit Card' : order.paymentMethod === 'manual' ? 'Bank Transfer (EFT)' : order.paymentMethod }}
              </p>
            </div>
            <div>
              <p class="text-sm text-gray-600 dark:text-gray-400">Payment Status</p>
              <span
                :class="[
                  'inline-block px-3 py-1 rounded-full text-xs font-medium mt-1',
                  order.paymentStatus === 'paid'
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : order.paymentStatus === 'pending'
                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                ]"
              >
                {{ order.paymentStatus }}
              </span>
            </div>
          </div>
        </div>

        <!-- Order Totals -->
        <div class="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div class="space-y-3 max-w-xs ml-auto">
            <div class="flex justify-between text-gray-600 dark:text-gray-400">
              <span>Subtotal</span>
              <span>{{ formatCurrency(order.totalAmount - order.shippingCost - order.taxAmount, order.currency) }}</span>
            </div>
            <div class="flex justify-between text-gray-600 dark:text-gray-400">
              <span>Shipping</span>
              <span>{{ formatCurrency(order.shippingCost, order.currency) }}</span>
            </div>
            <div class="flex justify-between text-gray-600 dark:text-gray-400">
              <span>Tax</span>
              <span>{{ formatCurrency(order.taxAmount, order.currency) }}</span>
            </div>
            <div class="flex justify-between text-lg font-bold text-luxury-green dark:text-white pt-3 border-t border-gray-200 dark:border-gray-700">
              <span>Total</span>
              <span>{{ formatCurrency(order.totalAmount, order.currency) }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Tracking Information -->
      <div v-if="order.trackingNumber" class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
        <h2 class="text-xl font-bold text-luxury-green dark:text-white mb-6">Tracking Information</h2>
        <div class="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <p class="text-gray-600 dark:text-gray-400">
              <span class="font-medium">Tracking Number:</span>
              <span class="font-mono ml-2">{{ order.trackingNumber }}</span>
            </p>
            <p v-if="order.trackingCarrier" class="text-gray-600 dark:text-gray-400 mt-1">
              <span class="font-medium">Carrier:</span> {{ order.trackingCarrier }}
            </p>
            <p v-if="order.estimatedDelivery" class="text-gray-600 dark:text-gray-400 mt-1">
              <span class="font-medium">Estimated Delivery:</span> {{ formatDate(order.estimatedDelivery) }}
            </p>
          </div>
          <div class="mt-4 md:mt-0">
            <a
              v-if="order.trackingCarrier"
              :href="getTrackingLink(order.trackingNumber, order.trackingCarrier)"
              target="_blank"
              rel="noopener noreferrer"
              class="px-6 py-3 bg-luxury-green text-white rounded-full hover:bg-gold hover:text-luxury-green transition-colors inline-flex items-center"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Track Package
            </a>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-wrap gap-4">
        <NuxtLink
          to="/products"
          class="px-6 py-3 bg-luxury-green text-white rounded-full hover:bg-gold hover:text-luxury-green transition-colors"
        >
          Continue Shopping
        </NuxtLink>
        <button
          v-if="canCancelOrder"
          @click="cancelOrder"
          class="px-6 py-3 border border-red-600 text-red-600 rounded-full hover:bg-red-600 hover:text-white transition-colors"
        >
          Cancel Order
        </button>
        <button
          @click="reorder"
          class="px-6 py-3 border border-luxury-green text-luxury-green rounded-full hover:bg-luxury-green hover:text-white transition-colors"
        >
          Reorder
        </button>
      </div>
    </div>
  </div>
  </AuthGuard>
</template>

<script setup>
import { formatCurrency } from '~/utils/formatting'

definePageMeta({
  layout: 'default',
  middleware: 'auth' // Require authentication
})

const route = useRoute()
const router = useRouter()
const cartStore = useCartStore()
const toast = useToast()

// Mock order data - in production, fetch from API
const loading = ref(true)
const order = ref(null)

// Sample order data structure
const sampleOrder = {
  id: route.params.id,
  orderNumber: `GB-2026-${String(route.params.id).padStart(6, '0')}`,
  status: 'processing', // pending, processing, shipped, delivered, cancelled, refunded
  items: [
    {
      productId: '60ml-perfume',
      productName: '60ml Premium Perfume',
      quantity: 1,
      unitPrice: 15000,
      totalPrice: 15000,
      productImage: '/images/products/Ladies 60ml Perfume.jpg'
    }
  ],
  totalAmount: 31625,
  currency: 'ZAR',
  shippingAddress: {
    firstName: 'John',
    lastName: 'Doe',
    addressLine1: '123 Main Street',
    addressLine2: '',
    city: 'Cape Town',
    state: 'Western Cape',
    postalCode: '8001',
    country: 'South Africa',
    phone: '+27 12 345 6789'
  },
  billingAddress: {
    firstName: 'John',
    lastName: 'Doe',
    addressLine1: '123 Main Street',
    addressLine2: '',
    city: 'Cape Town',
    state: 'Western Cape',
    postalCode: '8001',
    country: 'South Africa'
  },
  paymentMethod: 'manual',
  paymentStatus: 'pending',
  shippingCost: 2500,
  taxAmount: 4125,
  createdAt: new Date('2026-01-14').toISOString(),
  trackingNumber: '1Z999AA1234567890',
  trackingCarrier: 'DHL',
  estimatedDelivery: new Date('2026-01-21').toISOString()
}

// Status steps for timeline
const statusSteps = computed(() => {
  if (!order.value) return []
  
  const steps = [
    { id: 'pending', name: 'Order Placed', completed: true },
    { id: 'processing', name: 'Processing', completed: ['processing', 'shipped', 'delivered'].includes(order.value.status) },
    { id: 'shipped', name: 'Shipped', completed: ['shipped', 'delivered'].includes(order.value.status) },
    { id: 'delivered', name: 'Delivered', completed: order.value.status === 'delivered' }
  ]
  
  // Add dates
  if (order.value.createdAt) {
    steps[0].date = formatDate(order.value.createdAt)
  }
  if (order.value.shippedAt) {
    steps[2].date = formatDate(order.value.shippedAt)
  }
  if (order.value.deliveredAt) {
    steps[3].date = formatDate(order.value.deliveredAt)
  }
  
  return steps
})

// Check if order can be cancelled
const canCancelOrder = computed(() => {
  if (!order.value) return false
  return ['pending', 'processing'].includes(order.value.status)
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
    cancelled: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    refunded: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
  }
  return classes[status] || classes.pending
}

// Get tracking link
const getTrackingLink = (trackingNumber, carrier) => {
  const carriers = {
    'DHL': `https://www.dhl.com/en/express/tracking.html?AWB=${trackingNumber}`,
    'FedEx': `https://www.fedex.com/fedextrack/?trknbr=${trackingNumber}`,
    'UPS': `https://www.ups.com/track?tracknum=${trackingNumber}`,
    'PostNet': `https://www.postnet.co.za/track-trace?tracking=${trackingNumber}`
  }
  return carriers[carrier] || '#'
}

// Cancel order
const cancelOrder = async () => {
  if (!confirm('Are you sure you want to cancel this order?')) return
  
  try {
    // In production, call API to cancel order
    // await $fetch(`/api/orders/${order.value.id}/cancel`, { method: 'POST' })
    
    order.value.status = 'cancelled'
    toast.success('Order cancelled successfully', 'Order Cancelled')
  } catch (error) {
    toast.error('Failed to cancel order. Please contact support.', 'Error')
  }
}

// Reorder
const reorder = () => {
  if (!order.value) return
  
  // Add all items to cart
  order.value.items.forEach(item => {
    cartStore.addItem({
      productId: item.productId,
      productName: item.productName,
      productImage: item.productImage,
      unitPrice: item.unitPrice,
      quantity: item.quantity,
      totalPrice: item.totalPrice
    })
  })
  
  toast.success('All items added to cart!', 'Reorder')
  router.push('/cart')
}

// Load order data
onMounted(async () => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500))
  
  // In production, fetch from API:
  // try {
  //   const data = await $fetch(`/api/orders/${route.params.id}`)
  //   order.value = data
  // } catch (error) {
  //   toast.error('Order not found', 'Error')
  // }
  
  order.value = sampleOrder
  loading.value = false
})

// Set page title
useHead({
  title: order.value ? `Order #${order.value.orderNumber} - Gombian Boutique` : 'Order Details - Gombian Boutique',
  meta: [
    {
      hid: 'description',
      name: 'description',
      content: order.value ? `View details for order #${order.value.orderNumber}` : ''
    }
  ]
})
</script>
