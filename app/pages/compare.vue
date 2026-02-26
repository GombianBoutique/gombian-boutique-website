<!-- pages/compare.vue -->
<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Page Header -->
    <div class="mb-8">
      <h1 class="text-4xl font-serif-display font-bold text-luxury-green dark:text-white mb-4">
        Compare Products
      </h1>
      <p class="text-gray-600 dark:text-gray-300">
        Compare features, prices, and specifications of up to {{ MAX_COMPARISON_ITEMS }} products
      </p>
    </div>

    <!-- Comparison Count Indicator -->
    <div v-if="comparisonList.length > 0 && comparisonList.length < MAX_COMPARISON_ITEMS" 
         class="mb-6 p-4 bg-luxury-green/10 dark:bg-gray-800 rounded-xl border border-luxury-green/20">
      <div class="flex items-center justify-between">
        <p class="text-luxury-green dark:text-gold">
          <span class="font-bold">{{ comparisonList.length }}</span> of {{ MAX_COMPARISON_ITEMS }} products selected
        </p>
        <NuxtLink 
          to="/products" 
          class="text-sm text-luxury-green dark:text-gold hover:underline font-medium"
        >
          + Add more products
        </NuxtLink>
      </div>
      <div class="mt-3 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div 
          class="h-full bg-gradient-to-r from-luxury-green to-gold transition-all duration-300"
          :style="{ width: `${(comparisonList.length / MAX_COMPARISON_ITEMS) * 100}%` }"
        ></div>
      </div>
    </div>

    <!-- Comparison Full Indicator -->
    <div v-if="comparisonList.length >= MAX_COMPARISON_ITEMS" 
         class="mb-6 p-4 bg-gold/10 dark:bg-luxury-green/20 rounded-xl border border-gold/20">
      <p class="text-gold dark:text-white font-medium">
        ✓ Maximum {{ MAX_COMPARISON_ITEMS }} products selected. Remove a product to add another.
      </p>
    </div>

    <!-- Product Comparison Component -->
    <ProductComparison />

    <!-- Continue Shopping -->
    <div v-if="comparisonList.length === 0" class="text-center py-12">
      <NuxtLink 
        to="/products" 
        class="inline-flex items-center px-6 py-3 bg-luxury-green text-white rounded-full hover:bg-gold hover:text-luxury-green transition-colors font-medium"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Browse Products to Compare
      </NuxtLink>
    </div>

    <!-- Quick Add Section -->
    <div v-if="comparisonList.length > 0 && comparisonList.length < MAX_COMPARISON_ITEMS" class="mt-12">
      <h2 class="text-2xl font-serif-display font-bold text-luxury-green dark:text-white mb-6">
        Quick Add More Products
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <ProductCard
          v-for="product in availableProducts"
          :key="product.id"
          :product="product"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useProductComparison } from '~/composables/useProductComparison'
import { useProducts } from '~/composables/useProducts'

definePageMeta({
  layout: 'default'
})

const {
  comparisonList,
  MAX_COMPARISON_ITEMS
} = useProductComparison()

const { products } = useProducts()

// Get products that are not in the comparison list
const availableProducts = computed(() => {
  if (!products.value) return []
  
  const comparisonIds = new Set(comparisonList.value.map(p => p.id))
  return products.value
    .filter(p => !comparisonIds.has(p.id))
    .slice(0, 4) // Show 4 available products
})

// Set page title
useHead({
  title: 'Compare Products - Gombian Boutique',
  meta: [
    {
      name: 'description',
      content: 'Compare luxury perfumes side by side to find your perfect scent'
    }
  ]
})
</script>
