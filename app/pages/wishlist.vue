<!-- pages/wishlist.vue -->
<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-serif-display font-bold text-luxury-green dark:text-white mb-8">My Wishlist</h1>

    <!-- Empty Wishlist Message -->
    <div v-if="wishlist.length === 0" class="text-center py-16">
      <svg class="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
      <h3 class="mt-4 text-xl font-bold text-luxury-green dark:text-white">Your wishlist is empty</h3>
      <p class="mt-2 text-gray-600 dark:text-gray-400">
        Add items you love to your wishlist to save them for later
      </p>
      <div class="mt-6">
        <NuxtLink to="/products" class="luxury-button">
          Browse Products
        </NuxtLink>
      </div>
    </div>

    <!-- Wishlist Items -->
    <div v-else class="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
      <div class="p-4 bg-luxury-green/10 dark:bg-gray-700 flex justify-between items-center">
        <h2 class="text-lg font-bold text-luxury-green dark:text-white">{{ wishlist.length }} items in wishlist</h2>
        <button 
          @click="clearWishlist" 
          class="text-sm text-red-600 dark:text-red-400 hover:underline"
        >
          Clear All
        </button>
      </div>

      <ul class="divide-y divide-gray-200 dark:divide-gray-700">
        <li 
          v-for="product in wishlist" 
          :key="product.id"
          class="p-6 flex flex-col md:flex-row items-center"
        >
          <NuxtLink :to="`/products/${product.id}`" class="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
            <NuxtImg 
              :src="product.images[0]" 
              :alt="product.name" 
              class="w-32 h-32 object-contain"
              :modifiers="{ fit: 'contain', width: 150, height: 150 }"
            />
          </NuxtLink>

          <div class="flex-grow text-center md:text-left">
            <h3 class="text-lg font-bold text-luxury-green dark:text-white">
              <NuxtLink :to="`/products/${product.id}`" class="hover:text-gold">
                {{ product.name }}
              </NuxtLink>
            </h3>
            <p class="text-gray-600 dark:text-gray-400 mt-1">{{ product.category }}</p>
            <div class="mt-2 flex items-center justify-center md:justify-start">
              <StarRating :rating="product.rating" />
              <span class="ml-2 text-gray-600 dark:text-gray-400">({{ product.reviewCount }} reviews)</span>
            </div>
            <div class="mt-2 text-xl font-bold text-luxury-green dark:text-gold">
              {{ formatCurrency(product.price, product.currency) }}
            </div>
          </div>

          <div class="mt-6 md:mt-0 flex flex-col space-y-3">
            <button 
              @click="removeFromWishlist(product.id)"
              class="px-4 py-2 border border-red-500 text-red-500 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              Remove
            </button>
            <button 
              @click="addToCart(product)"
              class="px-4 py-2 bg-luxury-green text-white rounded-full hover:bg-gold hover:text-luxury-green transition-colors"
            >
              Add to Cart
            </button>
            <NuxtLink 
              :to="`/products/${product.id}`"
              class="px-4 py-2 border border-luxury-green text-luxury-green rounded-full hover:bg-luxury-green hover:text-white transition-colors text-center"
            >
              View Details
            </NuxtLink>
          </div>
        </li>
      </ul>

      <div class="p-6 bg-gray-50 dark:bg-gray-700/50 flex flex-col sm:flex-row justify-between items-center">
        <p class="text-gray-600 dark:text-gray-400 mb-4 sm:mb-0">
          {{ wishlist.length }} items in wishlist
        </p>
        <div class="flex space-x-3">
          <NuxtLink to="/products" class="px-6 py-3 border border-luxury-green text-luxury-green rounded-full hover:bg-luxury-green hover:text-white transition-colors">
            Continue Shopping
          </NuxtLink>
          <NuxtLink to="/cart" class="px-6 py-3 bg-luxury-green text-white rounded-full hover:bg-gold hover:text-luxury-green transition-colors">
            Go to Cart
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { formatCurrency } from '~/utils/formatting'
import { useWishlist } from '~/composables/useWishlist'
import { useCartStore } from '~/stores/cart'

definePageMeta({
  layout: 'default'
})

const { wishlist, removeFromWishlist, clearWishlist } = useWishlist()
const cartStore = useCartStore()

const addToCart = (product) => {
  cartStore.addItem({
    productId: product.id,
    productName: product.name,
    quantity: 1,
    unitPrice: product.price,
    productImage: product.images[0],
    inStock: product.inStock,
    inventoryCount: product.inventoryCount
  })
  
  // Remove from wishlist after adding to cart
  removeFromWishlist(product.id)
  
  const toast = useToast()
  toast.success(`${product.name} added to cart!`)
}

// Set page title
useHead({
  title: 'My Wishlist - Gombian Boutique',
  meta: [
    {
      hid: 'description',
      name: 'description',
      content: 'Your wishlist of favorite products at Gombian Boutique'
    }
  ]
})
</script>