<!-- components/ProductGrid.vue -->
<template>
  <div>
    <!-- Grid Header -->
    <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
      <h2 class="text-2xl font-serif-display font-bold text-luxury-green dark:text-white mb-4 md:mb-0">
        {{ title || 'Our Collection' }}
      </h2>
      
      <div class="flex flex-wrap gap-4">
        <!-- Sort Options -->
        <div class="flex items-center">
          <label for="sort-options" class="mr-2 text-luxury-green dark:text-gray-300">Sort by:</label>
          <select 
            id="sort-options"
            v-model="selectedSort"
            class="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-luxury-green dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-gold"
          >
            <option value="featured">Featured</option>
            <option value="newest">Newest Arrivals</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="top-rated">Top Rated</option>
            <option value="alphabetical">Alphabetical</option>
          </select>
        </div>
        
        <!-- View Options -->
        <div class="flex items-center space-x-2">
          <button
            @click="viewMode = 'grid'"
            :class="['p-2 rounded-md', viewMode === 'grid' ? 'bg-gold text-luxury-green dark:bg-luxury-green dark:text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300']"
            aria-label="Grid view"
          >
            <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>
          <button
            @click="viewMode = 'list'"
            :class="['p-2 rounded-md', viewMode === 'list' ? 'bg-gold text-luxury-green dark:bg-luxury-green dark:text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300']"
            aria-label="List view"
          >
            <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
    
    <!-- Product Grid -->
    <div 
      :class="[
        'transition-all duration-300',
        viewMode === 'grid' 
          ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8' 
          : 'flex flex-col gap-6'
      ]"
    >
      <div v-for="product in displayedProducts" :key="product.id" :class="viewMode === 'list' ? 'flex' : ''">
        <ProductCard 
          :product="product" 
          :class="viewMode === 'list' ? 'w-1/3 flex-shrink-0' : ''"
        />
        
        <!-- Additional info for list view -->
        <div v-if="viewMode === 'list'" class="ml-6 flex-grow">
          <h3 class="text-xl font-serif-display font-bold text-luxury-green dark:text-white mb-2">
            {{ product.name }}
          </h3>
          <p class="text-gray-600 dark:text-gray-300 mb-4">
            {{ product.description }}
          </p>
          <div class="flex items-center mb-4">
            <div class="flex text-yellow-400 mr-2">
              <svg v-for="star in 5" :key="star"
                   :class="[star <= Math.round(product.rating ?? 0) ? 'text-yellow-400' : 'text-gray-300', 'w-4 h-4']"
                   xmlns="http://www.w3.org/2000/svg"
                   viewBox="0 0 20 20"
                   fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <span class="text-sm text-gray-500 dark:text-gray-400">({{ product.reviewCount ?? 0 }} reviews)</span>
          </div>
          <div class="flex items-center justify-between">
            <div class="text-xl font-bold text-luxury-green dark:text-gold">
              {{ formatCurrency(product.price, product.currency || 'ZAR') }}
            </div>
            <button 
              @click="addToCart(product)"
              class="luxury-button px-6 py-2"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Pagination Controls -->
    <div v-if="showPagination && !infiniteScrollEnabled" class="mt-12 flex justify-center">
      <nav class="flex items-center space-x-2">
        <button
          @click="currentPage = Math.max(1, currentPage - 1)"
          :disabled="currentPage === 1"
          :class="[
            'px-4 py-2 rounded-md',
            currentPage === 1
              ? 'bg-gray-200 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
              : 'bg-luxury-green text-white hover:bg-gold hover:text-luxury-green dark:hover:bg-luxury-green dark:hover:text-white'
          ]"
        >
          Previous
        </button>

        <span class="mx-2 text-luxury-green dark:text-gray-300">
          Page {{ currentPage }} of {{ totalPages }}
        </span>

        <button
          @click="currentPage = Math.min(totalPages, currentPage + 1)"
          :disabled="currentPage === totalPages"
          :class="[
            'px-4 py-2 rounded-md',
            currentPage === totalPages
              ? 'bg-gray-200 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
              : 'bg-luxury-green text-white hover:bg-gold hover:text-luxury-green dark:hover:bg-luxury-green dark:hover:text-white'
          ]"
        >
          Next
        </button>
      </nav>
    </div>

    <!-- Infinite Scroll Loading Indicator -->
    <div v-if="infiniteScrollEnabled && isLoading" class="mt-12 text-center">
      <div class="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-luxury-green"></div>
      <p class="mt-4 text-luxury-green dark:text-gold">Loading more products...</p>
    </div>

    <!-- Infinite Scroll Trigger -->
    <div v-if="infiniteScrollEnabled" ref="sentinel" class="h-1"></div>
  </div>
</template>

<script setup>
import { formatCurrency } from '~/utils/formatting'

// Props with infinite scroll option
const props = defineProps({
  products: {
    type: Array,
    required: true
  },
  title: {
    type: String,
    default: 'Our Collection'
  },
  itemsPerPage: {
    type: Number,
    default: 8
  },
  showPagination: {
    type: Boolean,
    default: true
  },
  infiniteScroll: {
    type: Boolean,
    default: false
  }
})

// Reactive state
const selectedSort = ref('featured')
const viewMode = ref('grid') // 'grid' or 'list'
const currentPage = ref(1)
const isLoading = ref(false)
const sentinel = ref(null)
const observer = ref(null)

// Computed properties
const totalPages = computed(() => {
  return Math.ceil(props.products.length / props.itemsPerPage)
})

const infiniteScrollEnabled = computed(() => {
  return props.infiniteScroll && props.showPagination
})

const displayedProducts = computed(() => {
  // Apply sorting
  let sortedProducts = [...props.products]

  switch (selectedSort.value) {
    case 'newest':
      sortedProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      break
    case 'price-low':
      sortedProducts.sort((a, b) => a.price - b.price)
      break
    case 'price-high':
      sortedProducts.sort((a, b) => b.price - a.price)
      break
    case 'top-rated':
      sortedProducts.sort((a, b) => b.rating - a.rating)
      break
    case 'alphabetical':
      sortedProducts.sort((a, b) => a.name.localeCompare(b.name))
      break
    default:
      // 'featured' - keep original order or sort by featured flag if available
      sortedProducts.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0))
  }

  // Apply pagination or infinite scroll
  if (infiniteScrollEnabled.value) {
    // For infinite scroll, show products up to current page
    const endIndex = currentPage.value * props.itemsPerPage
    return sortedProducts.slice(0, endIndex)
  } else if (props.showPagination) {
    // For regular pagination
    const startIndex = (currentPage.value - 1) * props.itemsPerPage
    const endIndex = startIndex + props.itemsPerPage
    return sortedProducts.slice(startIndex, endIndex)
  }

  return sortedProducts
})

// Infinite scroll handler
const loadMoreProducts = async () => {
  if (currentPage.value >= totalPages.value || isLoading.value) return

  isLoading.value = true

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800))

  currentPage.value++
  isLoading.value = false
}

// Set up intersection observer for infinite scroll
onMounted(() => {
  if (infiniteScrollEnabled.value) {
    observer.value = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !isLoading.value && currentPage.value < totalPages.value) {
        loadMoreProducts()
      }
    }, {
      rootMargin: '100px'
    })

    if (sentinel.value) {
      observer.value.observe(sentinel.value)
    }
  }
})

// Clean up observer
onUnmounted(() => {
  if (observer.value) {
    observer.value.disconnect()
  }
})

const addToCart = (product) => {
  const cartStore = useCartStore()
  cartStore.addItem({
    productId: product.id,
    productName: product.name,
    quantity: 1,
    unitPrice: product.price,
    productImage: product.images[0],
    inStock: product.inStock,
    inventoryCount: product.inventoryCount
  })
}
</script>