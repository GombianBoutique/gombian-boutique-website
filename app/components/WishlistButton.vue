<!-- components/WishlistButton.vue -->
<template>
  <button 
    @click="toggleWishlist(product)"
    :class="[
      'p-3 rounded-full border',
      isInWishlist(product.id) 
        ? 'bg-red-100 border-red-300 text-red-600' 
        : 'bg-gray-100 border-gray-300 text-gray-600 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300'
    ]"
    :aria-label="isInWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'"
  >
    <svg 
      :class="[isInWishlist(product.id) ? 'fill-current' : '']" 
      class="w-6 h-6" 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 20 20" 
      fill="currentColor"
    >
      <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
    </svg>
  </button>
</template>

<script setup>
import { useWishlist } from '~/composables/useWishlist'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const { isInWishlist, toggleWishlist } = useWishlist()
</script>