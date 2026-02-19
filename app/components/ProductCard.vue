<!-- components/ProductCard.vue -->
<template>
  <div class="luxury-card group overflow-hidden bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col">
    <div class="relative">
      <!-- Product Image -->
      <NuxtImg 
        :src="product.images[0]" 
        :alt="product.name" 
        class="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
        :modifiers="{ fit: 'cover', width: 400, height: 400 }"
      />
      
      <!-- Sale Badge -->
      <div v-if="product.onSale" class="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
        SALE
      </div>
      
      <!-- Favorite Button -->
      <button 
        @click="toggleFavorite"
        class="absolute top-4 right-4 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-gold hover:text-luxury-green transition-colors"
        :aria-label="isFavorite ? 'Remove from favorites' : 'Add to favorites'"
      >
        <svg 
          :class="[isFavorite ? 'text-gold fill-current' : 'text-gray-500', 'w-5 h-5']" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 20 20" 
          fill="currentColor"
        >
          <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
        </svg>
      </button>
      
      <!-- Quick Actions -->
      <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          @click="quickView"
          class="p-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full hover:bg-gold hover:text-luxury-green transition-colors"
          aria-label="Quick view"
        >
          <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        </button>
        <button
          @click="addToCart"
          class="p-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full hover:bg-gold hover:text-luxury-green transition-colors"
          aria-label="Add to cart"
        >
          <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </button>
        <button
          @click="addToComparison"
          class="p-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full hover:bg-gold hover:text-luxury-green transition-colors"
          :aria-label="isInComparison ? 'Remove from comparison' : 'Add to comparison'"
        >
          <svg
            :class="[isInComparison ? 'text-gold fill-current' : 'text-gray-500', 'w-5 h-5']"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
          </svg>
        </button>
      </div>
    </div>
    
    <!-- Product Info -->
    <div class="p-4 flex-grow flex flex-col">
      <div class="mb-2">
        <span class="text-xs font-semibold text-gold uppercase">{{ product.category }}</span>
      </div>
      
      <h3 class="text-lg font-serif-display font-bold text-luxury-green dark:text-white mb-1 line-clamp-1">
        {{ product.name }}
      </h3>
      
      <p class="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2 flex-grow">
        {{ product.description }}
      </p>
      
      <div class="flex justify-between items-center mt-auto">
        <div class="flex items-center">
          <!-- Rating -->
          <div class="flex text-yellow-400 mr-2">
            <svg v-for="star in 5" :key="star" 
                 :class="[star <= Math.round(product.rating) ? 'text-yellow-400' : 'text-gray-300', 'w-4 h-4']" 
                 xmlns="http://www.w3.org/2000/svg" 
                 viewBox="0 0 20 20" 
                 fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
          <span class="text-xs text-gray-500 dark:text-gray-400">({{ product.reviewCount }})</span>
        </div>
        
        <div class="text-lg font-bold text-luxury-green dark:text-gold">
          {{ formatCurrency(product.price, product.currency) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { formatCurrency, capitalize } from '~/utils'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

// Initialize favorite state from wishlist
const wishlist = useWishlist()
const isFavorite = computed(() => wishlist.isInWishlist(props.product.id))

const {
  comparisonList,
  addToComparison: addToComparisonList,
  removeFromComparison,
  isInComparison: checkInComparison
} = useProductComparison()

const isInComparison = computed(() => {
  return checkInComparison(props.product.id)
})

const toggleFavorite = () => {
  wishlist.toggleItem({
    productId: props.product.id,
    productName: props.product.name,
    productImage: props.product.images[0],
    price: props.product.price
  })
}

const addToComparison = () => {
  if (isInComparison.value) {
    removeFromComparison(props.product.id)
  } else {
    addToComparisonList(props.product)
  }
}

const quickView = async () => {
  // Navigate to product detail page
  await navigateTo(`/products/${props.product.id}`)
}

const addToCart = () => {
  const cartStore = useCartStore()
  cartStore.addItem({
    productId: props.product.id,
    productName: props.product.name,
    productImage: props.product.images[0],
    unitPrice: props.product.price,
    quantity: 1,
    inventoryCount: props.product.inventoryCount,
    totalPrice: props.product.price
  })
}
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>