<!-- pages/cart.vue -->
<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-serif-display font-bold text-luxury-green dark:text-white mb-8">Your Shopping Cart</h1>

    <!-- Empty Cart Message -->
    <div v-if="cartStore.items.length === 0" class="text-center py-16">
      <svg class="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
      <h3 class="mt-4 text-xl font-bold text-luxury-green dark:text-white">Your cart is empty</h3>
      <p class="mt-2 text-gray-600 dark:text-gray-400">
        Looks like you haven't added anything to your cart yet
      </p>
      <div class="mt-6">
        <NuxtLink to="/products" class="luxury-button">
          Continue Shopping
        </NuxtLink>
      </div>
    </div>

    <!-- Cart Items -->
    <div v-else class="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
      <div class="p-4 bg-luxury-green/10 dark:bg-gray-700 flex justify-between items-center">
        <h2 class="text-lg font-bold text-luxury-green dark:text-white">{{ cartStore.itemCount }} items in cart</h2>
        <button
          @click="clearCart"
          class="text-sm text-red-600 dark:text-red-400 hover:underline"
        >
          Clear All
        </button>
      </div>

      <ul class="divide-y divide-gray-200 dark:divide-gray-700">
        <li 
          v-for="item in cartStore.items" 
          :key="item.productId"
          class="p-6 flex flex-col md:flex-row items-center"
        >
          <NuxtLink :to="`/products/${item.productId}`" class="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
            <NuxtImg 
              :src="item.productImage" 
              :alt="item.productName" 
              class="w-32 h-32 object-contain"
              :modifiers="{ fit: 'contain', width: 150, height: 150 }"
            />
          </NuxtLink>

          <div class="flex-grow text-center md:text-left">
            <h3 class="text-lg font-bold text-luxury-green dark:text-white">
              <NuxtLink :to="`/products/${item.productId}`" class="hover:text-gold">
                {{ item.productName }}
              </NuxtLink>
            </h3>
            <p class="text-gray-600 dark:text-gray-400 mt-1">SKU: {{ item.productId }}</p>
            <div class="mt-2 text-xl font-bold text-luxury-green dark:text-gold">
              {{ formatCurrency(item.unitPrice, cartStore.currency) }}
            </div>
          </div>

          <div class="mt-6 md:mt-0 flex flex-col items-center">
            <div class="flex items-center border border-gray-300 dark:border-gray-600 rounded-md">
              <button 
                @click="decreaseQuantity(item.productId)"
                :disabled="item.quantity <= 1"
                class="px-4 py-2 text-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
              >
                -
              </button>
              <span class="px-4 py-2 text-gray-700 dark:text-gray-300">{{ item.quantity }}</span>
              <button 
                @click="increaseQuantity(item.productId)"
                :disabled="item.quantity >= item.inventoryCount"
                class="px-4 py-2 text-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
              >
                +
              </button>
            </div>
            <button 
              @click="removeFromCart(item.productId)"
              class="mt-4 text-red-600 dark:text-red-400 hover:underline"
            >
              Remove
            </button>
          </div>

          <div class="mt-6 md:mt-0 text-xl font-bold text-luxury-green dark:text-gold">
            {{ formatCurrency(item.totalPrice, cartStore.currency) }}
          </div>
        </li>
      </ul>

      <!-- Cart Summary -->
      <div class="p-6 bg-gray-50 dark:bg-gray-700/50">
        <div class="flex flex-col md:flex-row justify-between">
          <div class="mb-6 md:mb-0">
            <h3 class="text-lg font-bold text-luxury-green dark:text-white mb-4">Cart Summary</h3>
            <div class="space-y-2">
              <div class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-300">Subtotal</span>
                <span class="text-gray-900 dark:text-white">{{ formatCurrency(cartStore.subtotal, cartStore.currency) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-300">Shipping</span>
                <span class="text-gray-900 dark:text-white">{{ formatCurrency(cartStore.shippingCost, cartStore.currency) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-300">Tax</span>
                <span class="text-gray-900 dark:text-white">{{ formatCurrency(cartStore.taxAmount, cartStore.currency) }}</span>
              </div>
              <div class="border-t border-gray-200 dark:border-gray-600 pt-2 mt-2 flex justify-between font-bold">
                <span class="text-luxury-green dark:text-white">Total</span>
                <span class="text-luxury-green dark:text-gold">{{ formatCurrency(cartStore.totalPriceWithTaxAndShipping, cartStore.currency) }}</span>
              </div>
            </div>
          </div>

          <div class="flex flex-col space-y-4 w-full md:w-auto">
            <NuxtLink 
              to="/products" 
              class="px-6 py-3 border border-luxury-green text-luxury-green rounded-full hover:bg-luxury-green hover:text-white transition-colors text-center"
            >
              Continue Shopping
            </NuxtLink>
            <NuxtLink 
              to="/checkout" 
              class="px-6 py-3 bg-luxury-green text-white rounded-full hover:bg-gold hover:text-luxury-green transition-colors text-center"
            >
              Proceed to Checkout
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { formatCurrency } from '~/utils'

definePageMeta({
  layout: 'default'
})

const cartStore = useCartStore()
const toast = useToast()

// Methods
const increaseQuantity = (productId) => {
  const item = cartStore.items.find(i => i.productId === productId)
  if (item && item.quantity < item.inventoryCount) {
    cartStore.updateItemQuantity(productId, item.quantity + 1)
    toast.success('Quantity updated', 'Updated')
  }
}

const decreaseQuantity = (productId) => {
  const item = cartStore.items.find(i => i.productId === productId)
  if (item && item.quantity > 1) {
    cartStore.updateItemQuantity(productId, item.quantity - 1)
    toast.success('Quantity updated', 'Updated')
  }
}

const removeFromCart = (productId) => {
  const item = cartStore.items.find(i => i.productId === productId)
  const itemName = item ? item.productName : 'Item'
  cartStore.removeItem(productId)
  toast.success(`${itemName} removed from cart`, 'Removed')
}

const clearCart = () => {
  cartStore.clearCart()
  toast.info('Cart cleared', 'Cleared')
}

// Set page title
useHead({
  title: 'Your Shopping Cart - Gombian Boutique',
  meta: [
    {
      hid: 'description',
      name: 'description',
      content: 'Review and manage items in your shopping cart at Gombian Boutique'
    }
  ]
})
</script>