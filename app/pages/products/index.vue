<!-- pages/products/index.vue -->
<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Page Header -->
    <div class="mb-12 text-center">
      <h1 class="text-4xl font-serif-display font-bold text-luxury-green dark:text-white mb-4">
        Our Collection
      </h1>
      <p class="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
        Discover our exquisite range of luxury perfumes crafted with the finest ingredients
      </p>
    </div>

    <!-- Filters and Sorting Section -->
    <div class="mb-8 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- Category Filter -->
        <div>
          <label class="block text-sm font-medium text-luxury-green dark:text-gold mb-2">Category</label>
          <select 
            v-model="filters.category"
            class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="">All Categories</option>
            <option value="best-seller">Best Sellers</option>
            <option value="premium">Premium</option>
            <option value="complementary">Complementary</option>
            <option value="gift-set">Gift Sets</option>
            <option value="limited-edition">Limited Edition</option>
          </select>
        </div>

        <!-- Gender Filter -->
        <div>
          <label class="block text-sm font-medium text-luxury-green dark:text-gold mb-2">Gender</label>
          <select 
            v-model="filters.gender"
            class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="">All Genders</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="unisex">Unisex</option>
            <option value="couple">Couple</option>
          </select>
        </div>

        <!-- Fragrance Family Filter -->
        <div>
          <label class="block text-sm font-medium text-luxury-green dark:text-gold mb-2">Fragrance Family</label>
          <select 
            v-model="filters.fragranceFamily"
            class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="">All Families</option>
            <option value="floral">Floral</option>
            <option value="woody">Woody</option>
            <option value="citrus">Citrus</option>
            <option value="oriental">Oriental</option>
            <option value="fresh">Fresh</option>
            <option value="earthy">Earthy</option>
          </select>
        </div>

        <!-- Price Range Filter -->
        <div>
          <label class="block text-sm font-medium text-luxury-green dark:text-gold mb-2">Price Range</label>
          <select 
            v-model="filters.priceRange"
            class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="">Any Price</option>
            <option value="0-100">Under R100</option>
            <option value="100-200">R100 - R200</option>
            <option value="200-500">R200 - R500</option>
            <option value="500+">Over R500</option>
          </select>
        </div>
      </div>

      <!-- Additional Filters Row -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        <!-- Availability -->
        <div>
          <label class="block text-sm font-medium text-luxury-green dark:text-gold mb-2">Availability</label>
          <select 
            v-model="filters.inStock"
            class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="">All Products</option>
            <option value="true">In Stock</option>
            <option value="false">Out of Stock</option>
          </select>
        </div>

        <!-- Concentration -->
        <div>
          <label class="block text-sm font-medium text-luxury-green dark:text-gold mb-2">Concentration</label>
          <select 
            v-model="filters.concentration"
            class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="">All Concentrations</option>
            <option value="EDT">Eau de Toilette</option>
            <option value="EDP">Eau de Parfum</option>
            <option value="Parfum">Parfum</option>
            <option value="Body Lotion">Body Lotion</option>
          </select>
        </div>

        <!-- Volume -->
        <div>
          <label class="block text-sm font-medium text-luxury-green dark:text-gold mb-2">Volume</label>
          <select 
            v-model="filters.volume"
            class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="">All Volumes</option>
            <option value="30ml">30ml</option>
            <option value="60ml">60ml</option>
            <option value="100ml">100ml</option>
            <option value="200ml">200ml</option>
          </select>
        </div>

        <!-- Sorting -->
        <div>
          <label class="block text-sm font-medium text-luxury-green dark:text-gold mb-2">Sort By</label>
          <select 
            v-model="sortBy"
            class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="featured">Featured</option>
            <option value="newest">Newest Arrivals</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="top-rated">Top Rated</option>
            <option value="alphabetical">Alphabetical</option>
          </select>
        </div>
      </div>

      <!-- Reset Filters Button -->
      <div class="mt-6 flex justify-end">
        <button 
          @click="resetFilters"
          class="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          Reset Filters
        </button>
      </div>
    </div>

    <!-- Results Summary -->
    <div class="mb-6 flex justify-between items-center">
      <p class="text-gray-600 dark:text-gray-400">
        Showing {{ filteredProducts.length }} of {{ allProducts.length }} products
      </p>
      <div class="text-gray-600 dark:text-gray-400">
        Sorted by: {{ getSortLabel(sortBy) }}
      </div>
    </div>

    <!-- Product Grid -->
    <ProductGrid 
      :products="filteredProducts" 
      :items-per-page="12"
      :show-pagination="true"
      title="Our Collection"
    />

    <!-- Empty State -->
    <div v-if="filteredProducts.length === 0" class="text-center py-16">
      <h3 class="text-xl font-bold text-luxury-green dark:text-white mb-2">No products found</h3>
      <p class="text-gray-600 dark:text-gray-400 mb-6">
        Try adjusting your filters to find what you're looking for
      </p>
      <button 
        @click="resetFilters"
        class="luxury-button"
      >
        Reset Filters
      </button>
    </div>
  </div>
</template>

<script setup>
const { products } = useProductsStore()

// Initialize products if not already loaded
if (!products.value || products.value.length === 0) {
  await useProductsStore().fetchProducts()
}

// Get all products from the store
const allProducts = computed(() => products.value || [])

// Filter state
const filters = reactive({
  category: '',
  gender: '',
  fragranceFamily: '',
  priceRange: '',
  inStock: '',
  concentration: '',
  volume: ''
})

// Sort state
const sortBy = ref('featured')

// Computed property for filtered products
const filteredProducts = computed(() => {
  let result = [...allProducts.value]
  
  // Apply category filter
  if (filters.category) {
    result = result.filter(product => product.category === filters.category)
  }
  
  // Apply gender filter
  if (filters.gender) {
    result = result.filter(product => product.gender === filters.gender)
  }
  
  // Apply fragrance family filter
  if (filters.fragranceFamily) {
    result = result.filter(product => product.fragranceFamily === filters.fragranceFamily)
  }
  
  // Apply price range filter
  if (filters.priceRange) {
    const [min, max] = filters.priceRange.split('-').map(val => val.replace('+', ''));
    if (max) {
      result = result.filter(product => product.price >= parseInt(min) && product.price <= parseInt(max))
    } else {
      result = result.filter(product => product.price >= parseInt(min))
    }
  }
  
  // Apply availability filter
  if (filters.inStock !== '') {
    result = result.filter(product => product.inStock === (filters.inStock === 'true'))
  }
  
  // Apply concentration filter
  if (filters.concentration) {
    result = result.filter(product => product.concentration === filters.concentration)
  }
  
  // Apply volume filter
  if (filters.volume) {
    result = result.filter(product => product.volume === filters.volume)
  }
  
  // Apply sorting
  switch (sortBy.value) {
    case 'newest':
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      break
    case 'price-low':
      result.sort((a, b) => a.price - b.price)
      break
    case 'price-high':
      result.sort((a, b) => b.price - a.price)
      break
    case 'top-rated':
      result.sort((a, b) => b.rating - a.rating)
      break
    case 'alphabetical':
      result.sort((a, b) => a.name.localeCompare(b.name))
      break
    default:
      // 'featured' - keep original order or sort by featured flag if available
      result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0))
  }
  
  return result
})

// Methods
const resetFilters = () => {
  filters.category = ''
  filters.gender = ''
  filters.fragranceFamily = ''
  filters.priceRange = ''
  filters.inStock = ''
  filters.concentration = ''
  filters.volume = ''
  sortBy.value = 'featured'
}

const getSortLabel = (sortValue) => {
  const labels = {
    'featured': 'Featured',
    'newest': 'Newest Arrivals',
    'price-low': 'Price: Low to High',
    'price-high': 'Price: High to Low',
    'top-rated': 'Top Rated',
    'alphabetical': 'Alphabetical'
  }
  return labels[sortValue] || sortValue
}

// Set page title
useHead({
  title: 'Our Collection - Gombian Boutique',
  meta: [
    {
      hid: 'description',
      name: 'description',
      content: 'Discover our exquisite range of luxury perfumes crafted with the finest ingredients'
    }
  ]
})
</script>