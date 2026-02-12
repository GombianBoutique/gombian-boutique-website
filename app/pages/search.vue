<!-- pages/search.vue -->
<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Search Header -->
    <div class="mb-8 text-center">
      <h1 class="text-3xl font-serif-display font-bold text-luxury-green dark:text-white mb-2">
        Search Results
      </h1>
      <p class="text-gray-600 dark:text-gray-400">
        <span v-if="searchQuery">Results for "{{ searchQuery }}"</span>
        <span v-else>All Products</span>
        <span v-if="filteredProducts.length > 0"> ({{ filteredProducts.length }} products)</span>
      </p>
    </div>

    <!-- Search Bar -->
    <div class="mb-8">
      <SearchBar />
    </div>

    <!-- Results Section -->
    <div v-if="filteredProducts.length > 0">
      <ProductGrid 
        :products="filteredProducts" 
        :items-per-page="12"
        :show-pagination="true"
        :title="`Search Results for '${searchQuery}'`"
      />
    </div>

    <!-- No Results Message -->
    <div v-else-if="searchQuery && productsLoaded" class="text-center py-16">
      <svg class="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h3 class="mt-4 text-xl font-bold text-luxury-green dark:text-white">No products found</h3>
      <p class="mt-2 text-gray-600 dark:text-gray-400">
        We couldn't find any products matching "<span class="font-semibold">{{ searchQuery }}</span>"
      </p>
      <div class="mt-6">
        <h4 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Try searching for:</h4>
        <div class="flex flex-wrap justify-center gap-2">
          <button 
            v-for="suggestion in suggestions" 
            :key="suggestion"
            @click="searchQuery = suggestion; performSearch(suggestion)"
            class="px-4 py-2 bg-luxury-green/10 text-luxury-green dark:text-gold rounded-full hover:bg-luxury-green/20 transition-colors"
          >
            {{ suggestion }}
          </button>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-else-if="!productsLoaded" class="text-center py-16">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-luxury-green mx-auto"></div>
      <p class="mt-4 text-gray-600 dark:text-gray-400">Searching products...</p>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const { products } = useProductsStore()
const searchQuery = ref('')

// Initialize search query from route
onMounted(() => {
  if (route.query.q) {
    searchQuery.value = decodeURIComponent(route.query.q)
  }
})

// Watch for route changes
watch(() => route.query.q, (newQuery) => {
  if (newQuery) {
    searchQuery.value = decodeURIComponent(newQuery)
  } else {
    searchQuery.value = ''
  }
})

// Computed properties
const productsLoaded = computed(() => products.value && products.value.length > 0)

const filteredProducts = computed(() => {
  if (!searchQuery.value || !products.value) return []

  const query = searchQuery.value.toLowerCase()
  return products.value.filter(product => {
    return (
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query) ||
      product.fragranceFamily.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      product.ingredients.some(ing => ing.toLowerCase().includes(query))
    )
  })
})

// Suggestions for when no results are found
const suggestions = [
  'floral perfumes',
  'citrus scents',
  'unisex fragrances',
  'gift sets',
  'EDP concentration',
  'luxury perfumes'
]

// Method to perform search
const performSearch = (query) => {
  navigateTo(`/search?q=${encodeURIComponent(query)}`)
}

// Set page title
useHead({
  title: `Search Results - ${searchQuery.value || 'All Products'} - Gombian Boutique`,
  meta: [
    {
      hid: 'description',
      name: 'description',
      content: `Search results for ${searchQuery.value || 'all products'} at Gombian Boutique`
    }
  ]
})
</script>