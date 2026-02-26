<!-- pages/wishlist.vue -->
<template>
  <AuthGuard>
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
        <div class="flex space-x-2">
          <button
            @click="clearWishlist"
            class="text-sm text-red-600 dark:text-red-400 hover:underline"
          >
            Clear All
          </button>
          <span class="text-gray-400">|</span>
          <button
            @click="resetWishlistData"
            class="text-sm text-orange-600 dark:text-orange-400 hover:underline"
            title="Completely reset wishlist including localStorage"
          >
            Reset
          </button>
        </div>
      </div>

      <ul class="divide-y divide-gray-200 dark:divide-gray-700">
        <li
          v-for="item in wishlist"
          :key="item.productId"
          class="p-6 flex flex-col md:flex-row items-center"
        >
          <NuxtLink :to="`/products/${item.productId || ''}`" class="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
            <NuxtImg
              :src="getProductImage(item)"
              :alt="item.productName"
              class="w-32 h-32 object-contain"
              :modifiers="{ fit: 'contain', width: 150, height: 150 }"
            />
          </NuxtLink>

          <div class="flex-grow text-center md:text-left">
            <h3 class="text-lg font-bold text-luxury-green dark:text-white">
              <NuxtLink :to="`/products/${item.productId || ''}`" class="hover:text-gold">
                {{ item.productName }}
              </NuxtLink>
            </h3>
            <p v-if="getProduct(item.productId)" class="text-gray-600 dark:text-gray-400 mt-1">
              {{ getProduct(item.productId)?.category }}
            </p>
            <div class="mt-2 flex items-center justify-center md:justify-start">
              <StarRating :rating="getProduct(item.productId)?.rating ?? 0" />
              <span class="ml-2 text-gray-600 dark:text-gray-400">({{ getProduct(item.productId)?.reviewCount ?? 0 }} reviews)</span>
            </div>
            <div class="mt-2 text-xl font-bold text-luxury-green dark:text-gold">
              {{ formatCurrency(getProductPrice(item), 'ZAR') }}
            </div>
          </div>

          <div class="mt-6 md:mt-0 flex flex-col space-y-3">
            <button
              @click="removeFromWishlist(item.productId)"
              class="px-4 py-2 border border-red-500 text-red-500 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              Remove
            </button>
            <button
              @click="addToCart(item)"
              class="px-4 py-2 bg-luxury-green text-white rounded-full hover:bg-gold hover:text-luxury-green transition-colors"
            >
              Add to Cart
            </button>
            <NuxtLink
              :to="`/products/${item.productId || ''}`"
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
  </AuthGuard>
</template>

<script setup>
import { formatCurrency } from '~/utils/formatting'

definePageMeta({
  layout: 'default'
})

const wishlistStore = useWishlist()
const cartStore = useCartStore()
const toast = useToast()
const { products } = useProducts()

// Get full product data from products store
const getProduct = (productId) => {
  if (!productId || !products.value) return null
  return products.value.find(p => p.id === productId)
}

// Get product image - fallback to first product image if wishlist item image is missing
const getProductImage = (item) => {
  if (item.productImage) {
    return item.productImage
  }
  const product = getProduct(item.productId)
  return product?.images?.[0] || '/images/products/placeholder.jpg'
}

// Get product price - fallback to product price if wishlist item price is missing/invalid
const getProductPrice = (item) => {
  if (item.price && typeof item.price === 'number') {
    return item.price
  }
  const product = getProduct(item.productId)
  return product?.price || 0
}

const removeFromWishlist = (productId) => {
  console.log('Removing from wishlist:', productId)
  wishlistStore.removeItem(productId)
  toast.success('Item removed from wishlist', 'Removed')
}

const clearWishlist = () => {
  console.log('Clearing wishlist')
  wishlistStore.clearWishlist()
  toast.info('Wishlist cleared', 'Cleared')
}

const resetWishlistData = () => {
  console.log('Resetting wishlist data')
  wishlistStore.resetWishlist()
  toast.success('Wishlist data completely reset', 'Reset')
}

const addToCart = (item) => {
  console.log('Adding to cart:', item)
  const product = getProduct(item.productId)
  const productImage = getProductImage(item)
  const price = getProductPrice(item)

  cartStore.addItem({
    productId: item.productId,
    productName: item.productName,
    productImage,
    unitPrice: price,
    quantity: 1,
    inventoryCount: product?.inventoryCount || 10,
    totalPrice: price
  })

  // Remove from wishlist after adding to cart
  wishlistStore.removeItem(item.productId)

  toast.success(`${item.productName} added to cart!`, 'Added to Cart')
}

// Use the computed wishlist from the store
const wishlist = wishlistStore.wishlist

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