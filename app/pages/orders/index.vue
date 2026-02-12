<!-- pages/orders/index.vue -->
<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-serif-display font-bold text-luxury-green dark:text-white mb-8">My Orders</h1>

    <!-- Empty Orders Message -->
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
    <div v-else class="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
      <ul class="divide-y divide-gray-200 dark:divide-gray-700">
        <li 
          v-for="order in orders" 
          :key="order.id"
          class="p-6"
        >
          <div class="flex flex-col md:flex-row md:items-center md:justify-between">
            <div class="mb-4 md:mb-0">
              <div class="flex items-center">
                <h3 class="text-lg font-bold text-luxury-green dark:text-white">Order #{{ order.orderNumber }}</h3>
                <span 
                  :class="[
                    'ml-4 px-3 py-1 rounded-full text-xs font-medium',
                    getStatusClass(order.status)
                  ]"
                >
                  {{ order.status }}
                </span>
              </div>
              <p class="text-gray-600 dark:text-gray-400 mt-1">
                Placed on {{ formatDate(order.createdAt) }}
              </p>
            </div>
            
            <div class="flex flex-col items-start md:items-end space-y-2">
              <p class="text-lg font-bold text-luxury-green dark:text-gold">
                {{ formatCurrency(order.totalAmount, order.currency) }}
              </p>
              <div class="flex space-x-3">
                <NuxtLink 
                  :to="`/orders/${order.id}`" 
                  class="px-4 py-2 border border-luxury-green text-luxury-green rounded-full hover:bg-luxury-green hover:text-white transition-colors"
                >
                  View Details
                </NuxtLink>
                <button 
                  @click="trackOrder(order.trackingNumber)"
                  class="px-4 py-2 bg-luxury-green text-white rounded-full hover:bg-gold hover:text-luxury-green transition-colors"
                  :disabled="!order.trackingNumber"
                >
                  Track Order
                </button>
              </div>
            </div>
          </div>
          
          <!-- Order Items Preview -->
          <div class="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            <div 
              v-for="item in order.items.slice(0, 5)" 
              :key="item.productId"
              class="text-center"
            >
              <NuxtImg 
                :src="item.productImage" 
                :alt="item.productName" 
                class="w-full h-24 object-contain mx-auto"
                :modifiers="{ fit: 'contain', width: 100, height: 100 }"
              />
              <p class="mt-2 text-sm text-gray-600 dark:text-gray-400 truncate">{{ item.productName }}</p>
            </div>
            <div v-if="order.items.length > 5" class="flex items-center justify-center">
              <span class="text-gray-500 dark:text-gray-400">+{{ order.items.length - 5 }} more</span>
            </div>
          </div>
        </li>
      </ul>
      
      <!-- Pagination -->
      <div class="p-6 bg-gray-50 dark:bg-gray-700/50 flex justify-between items-center">
        <p class="text-gray-600 dark:text-gray-400">
          Showing {{ Math.min(itemsPerPage, orders.length) }} of {{ orders.length }} orders
        </p>
        <div class="flex space-x-2">
          <button 
            @click="currentPage = Math.max(1, currentPage - 1)"
            :disabled="currentPage === 1"
            :class="[
              'px-4 py-2 rounded-md',
              currentPage === 1 
                ? 'bg-gray-200 dark:bg-gray-700 text-gray-500 cursor-not-allowed' 
                : 'bg-luxury-green text-white hover:bg-gold hover:text-luxury-green'
            ]"
          >
            Previous
          </button>
          
          <span class="mx-2 text-luxury-green dark:text-gray-300">
            Page {{ currentPage }} of {{ totalPages }}
          </span>
          
          <button 
            @click="currentPage = Math.min(totalPages, currentPage + 1)"
            :disabled="currentPage === totalPages"
            :class="[
              'px-4 py-2 rounded-md',
              currentPage === totalPages 
                ? 'bg-gray-200 dark:bg-gray-700 text-gray-500 cursor-not-allowed' 
                : 'bg-luxury-green text-white hover:bg-gold hover:text-luxury-green'
            ]"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { formatCurrency, formatDate } from '~/utils/formatting'

definePageMeta({
  layout: 'default'
})

// Mock data for demonstration
const orders = ref([
  {
    id: 'order-1',
    orderNumber: 'GB-2026-123456',
    status: 'delivered',
    totalAmount: 31625,
    currency: 'ZAR',
    createdAt: new Date('2026-01-14T11:00:00Z'),
    shippedAt: new Date('2026-01-18T09:15:00Z'),
    deliveredAt: new Date('2026-01-21T14:30:00Z'),
    trackingNumber: '1Z999AA1234567890',
    trackingCarrier: 'DHL',
    items: [
      {
        productId: '60ml-perfume',
        productName: '60ml Premium Perfume',
        quantity: 1,
        unitPrice: 15000,
        totalPrice: 15000,
        productImage: '/images/products/Ladies 60ml Perfume.jpg'
      },
      {
        productId: 'body-lotion',
        productName: '100ml Body Lotion',
        quantity: 2,
        unitPrice: 5000,
        totalPrice: 10000,
        productImage: '/images/products/Ladies Ultimate Combo.jpeg'
      }
    ]
  },
  {
    id: 'order-2',
    orderNumber: 'GB-2026-123457',
    status: 'processing',
    totalAmount: 17500,
    currency: 'ZAR',
    createdAt: new Date('2026-01-12T15:30:00Z'),
    shippedAt: null,
    deliveredAt: null,
    trackingNumber: null,
    trackingCarrier: null,
    items: [
      {
        productId: '30ml-perfume',
        productName: '30ml Signature Perfume',
        quantity: 1,
        unitPrice: 10000,
        totalPrice: 10000,
        productImage: '/images/products/30ml Perfumes.jpeg'
      },
      {
        productId: 'gift-set',
        productName: 'His & Hers 30ml Perfume Combo',
        quantity: 1,
        unitPrice: 20000,
        totalPrice: 20000,
        productImage: '/images/products/His & Hers Ultimate Combo.jpeg'
      }
    ]
  }
])

const currentPage = ref(1)
const itemsPerPage = 5

const totalPages = computed(() => {
  return Math.ceil(orders.value.length / itemsPerPage)
})

const getStatusClass = (status) => {
  switch (status) {
    case 'delivered':
      return 'bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-400'
    case 'shipped':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-400'
    case 'processing':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800/30 dark:text-yellow-400'
    case 'cancelled':
      return 'bg-red-100 text-red-800 dark:bg-red-800/30 dark:text-red-400'
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400'
  }
}

const trackOrder = (trackingNumber) => {
  if (trackingNumber) {
    // In a real app, this would redirect to a tracking page
    alert(`Tracking number: ${trackingNumber}\nIn a real application, this would open the carrier's tracking page.`)
  } else {
    alert('Tracking information not available yet.')
  }
}

// Set page title
useHead({
  title: 'My Orders - Gombian Boutique',
  meta: [
    {
      hid: 'description',
      name: 'description',
      content: 'View your order history and track your shipments at Gombian Boutique'
    }
  ]
})
</script>