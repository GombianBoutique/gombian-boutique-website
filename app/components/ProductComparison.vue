<!-- components/ProductComparison.vue -->
<template>
  <div v-if="comparisonList.length > 0" class="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
    <div class="p-4 bg-luxury-green/10 dark:bg-gray-700 flex justify-between items-center">
      <h3 class="text-lg font-bold text-luxury-green dark:text-white">Product Comparison</h3>
      <button 
        @click="clearComparison" 
        class="text-sm text-red-600 dark:text-red-400 hover:underline"
      >
        Clear All
      </button>
    </div>
    
    <!-- Comparison Table -->
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead>
          <tr class="border-b border-gray-200 dark:border-gray-700">
            <th class="p-4 text-left text-gray-500 dark:text-gray-400 font-normal">Feature</th>
            <td 
              v-for="product in comparisonList" 
              :key="product.id"
              class="p-4 text-center"
            >
              <div class="flex flex-col items-center">
                <NuxtImg 
                  :src="product.images[0]" 
                  :alt="product.name" 
                  class="w-16 h-16 object-contain mb-2"
                  :modifiers="{ fit: 'contain', width: 80, height: 80 }"
                />
                <span class="text-sm font-medium text-gray-900 dark:text-white truncate max-w-[120px]">
                  {{ product.name }}
                </span>
                <button 
                  @click="removeFromComparison(product.id)"
                  class="mt-2 text-xs text-red-600 dark:text-red-400 hover:underline"
                >
                  Remove
                </button>
              </div>
            </td>
          </tr>
        </thead>
        <tbody>
          <!-- Name -->
          <tr class="border-b border-gray-100 dark:border-gray-700">
            <td class="p-4 font-medium text-gray-700 dark:text-gray-300">Name</td>
            <td 
              v-for="product in comparisonList" 
              :key="`${product.id}-name`"
              class="p-4 text-center text-gray-900 dark:text-white"
            >
              {{ product.name }}
            </td>
          </tr>
          
          <!-- Price -->
          <tr class="border-b border-gray-100 dark:border-gray-700">
            <td class="p-4 font-medium text-gray-700 dark:text-gray-300">Price</td>
            <td 
              v-for="product in comparisonList" 
              :key="`${product.id}-price`"
              class="p-4 text-center text-luxury-green dark:text-gold font-bold"
            >
              {{ formatCurrency(product.price, product.currency) }}
            </td>
          </tr>
          
          <!-- Category -->
          <tr class="border-b border-gray-100 dark:border-gray-700">
            <td class="p-4 font-medium text-gray-700 dark:text-gray-300">Category</td>
            <td 
              v-for="product in comparisonList" 
              :key="`${product.id}-category`"
              class="p-4 text-center text-gray-900 dark:text-white"
            >
              <span class="px-2 py-1 bg-luxury-green/10 text-luxury-green dark:text-gold rounded-full text-xs">
                {{ product.category }}
              </span>
            </td>
          </tr>
          
          <!-- Gender -->
          <tr class="border-b border-gray-100 dark:border-gray-700">
            <td class="p-4 font-medium text-gray-700 dark:text-gray-300">Gender</td>
            <td 
              v-for="product in comparisonList" 
              :key="`${product.id}-gender`"
              class="p-4 text-center text-gray-900 dark:text-white"
            >
              {{ product.gender === 'unisex' ? 'Unisex' : capitalize(product.gender) }}
            </td>
          </tr>
          
          <!-- Fragrance Family -->
          <tr class="border-b border-gray-100 dark:border-gray-700">
            <td class="p-4 font-medium text-gray-700 dark:text-gray-300">Fragrance Family</td>
            <td 
              v-for="product in comparisonList" 
              :key="`${product.id}-fragrance`"
              class="p-4 text-center text-gray-900 dark:text-white"
            >
              {{ capitalize(product.fragranceFamily) }}
            </td>
          </tr>
          
          <!-- Volume -->
          <tr class="border-b border-gray-100 dark:border-gray-700">
            <td class="p-4 font-medium text-gray-700 dark:text-gray-300">Volume</td>
            <td 
              v-for="product in comparisonList" 
              :key="`${product.id}-volume`"
              class="p-4 text-center text-gray-900 dark:text-white"
            >
              {{ product.volume }}
            </td>
          </tr>
          
          <!-- Concentration -->
          <tr class="border-b border-gray-100 dark:border-gray-700">
            <td class="p-4 font-medium text-gray-700 dark:text-gray-300">Concentration</td>
            <td 
              v-for="product in comparisonList" 
              :key="`${product.id}-concentration`"
              class="p-4 text-center text-gray-900 dark:text-white"
            >
              {{ product.concentration }}
            </td>
          </tr>
          
          <!-- Longevity -->
          <tr class="border-b border-gray-100 dark:border-gray-700">
            <td class="p-4 font-medium text-gray-700 dark:text-gray-300">Longevity</td>
            <td 
              v-for="product in comparisonList" 
              :key="`${product.id}-longevity`"
              class="p-4 text-center text-gray-900 dark:text-white"
            >
              {{ product.longevity }}
            </td>
          </tr>
          
          <!-- Rating -->
          <tr class="border-b border-gray-100 dark:border-gray-700">
            <td class="p-4 font-medium text-gray-700 dark:text-gray-300">Rating</td>
            <td 
              v-for="product in comparisonList" 
              :key="`${product.id}-rating`"
              class="p-4 text-center"
            >
              <div class="flex flex-col items-center">
                <div class="flex text-yellow-400">
                  <svg v-for="star in 5" :key="star" 
                       :class="[star <= Math.round(product.rating) ? 'text-yellow-400' : 'text-gray-300', 'w-4 h-4']" 
                       xmlns="http://www.w3.org/2000/svg" 
                       viewBox="0 0 20 20" 
                       fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <span class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {{ product.rating }}/5 ({{ product.reviewCount }} reviews)
                </span>
              </div>
            </td>
          </tr>
          
          <!-- Availability -->
          <tr class="border-b border-gray-100 dark:border-gray-700">
            <td class="p-4 font-medium text-gray-700 dark:text-gray-300">Availability</td>
            <td 
              v-for="product in comparisonList" 
              :key="`${product.id}-availability`"
              class="p-4 text-center"
            >
              <span 
                :class="[
                  product.inStock 
                    ? 'text-green-600 dark:text-green-400' 
                    : 'text-red-600 dark:text-red-400'
                ]"
              >
                {{ product.inStock ? 'In Stock' : 'Out of Stock' }}
              </span>
            </td>
          </tr>
          
          <!-- Action Buttons -->
          <tr>
            <td class="p-4 font-medium text-gray-700 dark:text-gray-300">Actions</td>
            <td 
              v-for="product in comparisonList" 
              :key="`${product.id}-actions`"
              class="p-4 text-center"
            >
              <div class="flex flex-col gap-2">
                <NuxtLink 
                  :to="`/products/${product.id}`"
                  class="px-4 py-2 bg-luxury-green text-white rounded-full text-sm hover:bg-gold hover:text-luxury-green transition-colors"
                >
                  View Details
                </NuxtLink>
                <button 
                  @click="addToCart(product)"
                  class="px-4 py-2 border border-luxury-green text-luxury-green rounded-full text-sm hover:bg-luxury-green hover:text-white transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  
  <!-- Empty State -->
  <div v-else class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">
    <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 002 2h2a2 2 0 002-2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
    </svg>
    <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-white">No products to compare</h3>
    <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
      Add products to compare their features and differences.
    </p>
  </div>
</template>

<script setup>
import { formatCurrency, capitalize } from '~/utils/formatting'
import { useProductComparison } from '~/composables/useProductComparison'
import { useCartStore } from '~/stores/cart'

const { 
  comparisonList, 
  removeFromComparison, 
  clearComparison,
  addToComparison
} = useProductComparison()

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
  
  const toast = useToast()
  toast.success(`${product.name} added to cart!`)
}
</script>