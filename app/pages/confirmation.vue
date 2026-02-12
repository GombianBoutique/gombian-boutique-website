<!-- pages/confirmation.vue -->
<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-3xl mx-auto text-center">
      <svg class="mx-auto h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
      </svg>
      <h1 class="mt-4 text-3xl font-serif-display font-bold text-luxury-green dark:text-white">Thank You for Your Order!</h1>
      <p class="mt-4 text-xl text-gray-600 dark:text-gray-400">Your order #{{ orderNumber }} has been confirmed</p>
      
      <div class="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 text-left">
        <h2 class="text-xl font-bold text-luxury-green dark:text-white mb-6">Order Summary</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 class="font-bold text-luxury-green dark:text-gold mb-4">Shipping Address</h3>
            <p class="text-gray-700 dark:text-gray-300">{{ shippingAddress.firstName }} {{ shippingAddress.lastName }}</p>
            <p class="text-gray-700 dark:text-gray-300">{{ shippingAddress.addressLine1 }}</p>
            <p class="text-gray-700 dark:text-gray-300">{{ shippingAddress.addressLine2 }}</p>
            <p class="text-gray-700 dark:text-gray-300">{{ shippingAddress.city }}, {{ shippingAddress.state }} {{ shippingAddress.postalCode }}</p>
            <p class="text-gray-700 dark:text-gray-300">{{ shippingAddress.country }}</p>
          </div>
          
          <div>
            <h3 class="font-bold text-luxury-green dark:text-gold mb-4">Billing Address</h3>
            <p class="text-gray-700 dark:text-gray-300">{{ billingAddress.firstName }} {{ billingAddress.lastName }}</p>
            <p class="text-gray-700 dark:text-gray-300">{{ billingAddress.addressLine1 }}</p>
            <p class="text-gray-700 dark:text-gray-300">{{ billingAddress.addressLine2 }}</p>
            <p class="text-gray-700 dark:text-gray-300">{{ billingAddress.city }}, {{ billingAddress.state }} {{ billingAddress.postalCode }}</p>
            <p class="text-gray-700 dark:text-gray-300">{{ billingAddress.country }}</p>
          </div>
        </div>
        
        <div class="mt-8">
          <h3 class="font-bold text-luxury-green dark:text-gold mb-4">Order Items</h3>
          <ul class="divide-y divide-gray-200 dark:divide-gray-700">
            <li 
              v-for="item in orderItems" 
              :key="item.productId"
              class="py-4 flex items-center"
            >
              <NuxtImg 
                :src="item.productImage" 
                :alt="item.productName" 
                class="w-16 h-16 object-contain mr-4"
                :modifiers="{ fit: 'contain', width: 80, height: 80 }"
              />
              <div class="flex-grow">
                <h4 class="font-medium text-gray-900 dark:text-white">{{ item.productName }}</h4>
                <p class="text-gray-600 dark:text-gray-400">Qty: {{ item.quantity }}</p>
              </div>
              <div class="text-luxury-green dark:text-gold font-bold">
                {{ formatCurrency(item.totalPrice, currency) }}
              </div>
            </li>
          </ul>
        </div>
        
        <div class="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div class="grid grid-cols-2 gap-4 max-w-xs ml-auto">
            <div class="text-gray-600 dark:text-gray-400">Subtotal</div>
            <div class="text-right text-gray-900 dark:text-white">{{ formatCurrency(subtotal, currency) }}</div>
            
            <div class="text-gray-600 dark:text-gray-400">Shipping</div>
            <div class="text-right text-gray-900 dark:text-white">{{ formatCurrency(shippingCost, currency) }}</div>
            
            <div class="text-gray-600 dark:text-gray-400">Tax</div>
            <div class="text-right text-gray-900 dark:text-white">{{ formatCurrency(taxAmount, currency) }}</div>
            
            <div class="font-bold text-luxury-green dark:text-white">Total</div>
            <div class="text-right font-bold text-luxury-green dark:text-gold">{{ formatCurrency(total, currency) }}</div>
          </div>
        </div>
      </div>
      
      <div class="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
        <h2 class="text-xl font-bold text-luxury-green dark:text-white mb-4">Tracking Information</h2>
        <div class="flex items-center justify-center">
          <div class="flex items-center">
            <div class="flex flex-col items-center mr-4">
              <div class="w-10 h-10 rounded-full bg-luxury-green text-white flex items-center justify-center">1</div>
              <span class="mt-2 text-sm text-gray-600 dark:text-gray-400">Processing</span>
            </div>
            <div class="h-1 w-16 bg-gray-300 dark:bg-gray-600"></div>
            <div class="flex flex-col items-center mx-4">
              <div class="w-10 h-10 rounded-full bg-luxury-green text-white flex items-center justify-center">2</div>
              <span class="mt-2 text-sm text-gray-600 dark:text-gray-400">Shipped</span>
            </div>
            <div class="h-1 w-16 bg-gray-300 dark:bg-gray-600"></div>
            <div class="flex flex-col items-center ml-4">
              <div class="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600 text-white flex items-center justify-center">3</div>
              <span class="mt-2 text-sm text-gray-600 dark:text-gray-400">Delivered</span>
            </div>
          </div>
        </div>
        <div class="mt-6">
          <p class="text-gray-600 dark:text-gray-400">Estimated delivery: {{ estimatedDeliveryDate }}</p>
          <p class="text-gray-600 dark:text-gray-400 mt-2">Tracking number: <span class="font-mono">{{ trackingNumber }}</span></p>
        </div>
      </div>
      
      <div class="mt-8">
        <NuxtLink to="/" class="luxury-button mr-4">Continue Shopping</NuxtLink>
        <NuxtLink to="/orders" class="px-6 py-3 border border-luxury-green text-luxury-green rounded-full hover:bg-luxury-green hover:text-white transition-colors">View Order History</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { formatCurrency } from '~/utils/formatting'

definePageMeta({
  layout: 'default'
})

// Mock data for demonstration
const orderNumber = ref('GB-2026-123456')
const shippingAddress = ref({
  firstName: 'John',
  lastName: 'Doe',
  addressLine1: '123 Main Street',
  addressLine2: '',
  city: 'Cape Town',
  state: 'Western Cape',
  postalCode: '8001',
  country: 'South Africa'
})
const billingAddress = ref({
  firstName: 'John',
  lastName: 'Doe',
  addressLine1: '123 Main Street',
  addressLine2: '',
  city: 'Cape Town',
  state: 'Western Cape',
  postalCode: '8001',
  country: 'South Africa'
})
const orderItems = ref([
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
])
const currency = ref('ZAR')
const subtotal = ref(25000)
const shippingCost = ref(2500)
const taxAmount = ref(4125) // 15% of subtotal
const total = ref(31625)
const estimatedDeliveryDate = ref('January 21, 2026')
const trackingNumber = ref('1Z999AA1234567890')

// Set page title
useHead({
  title: `Order Confirmation #${orderNumber.value} - Gombian Boutique`,
  meta: [
    {
      hid: 'description',
      name: 'description',
      content: `Confirmation for order #${orderNumber.value} at Gombian Boutique`
    }
  ]
})
</script>