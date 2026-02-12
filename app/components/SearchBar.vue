<!-- components/SearchBar.vue -->
<template>
  <div class="relative" ref="searchContainerRef">
    <div class="relative">
      <input
        v-model="searchQuery"
        @input="debouncedSearch"
        @focus="showSuggestions = true"
        @keydown.enter="handleEnter"
        @keydown.down.prevent="moveDown"
        @keydown.up.prevent="moveUp"
        type="text"
        placeholder="Search for perfumes, scents, brands..."
        class="w-full px-4 py-3 pl-12 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
        aria-label="Search products"
      />
      <div class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
        <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <button 
        v-if="searchQuery"
        @click="clearSearch"
        class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
        aria-label="Clear search"
      >
        <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Search Suggestions Dropdown -->
    <div 
      v-if="showSuggestions && suggestions.length > 0 && searchQuery.length > 0"
      class="absolute z-10 mt-2 w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
    >
      <ul class="py-2 max-h-80 overflow-y-auto">
        <li 
          v-for="(suggestion, index) in suggestions" 
          :key="suggestion.id"
          @mousedown="selectSuggestion(suggestion)"
          :class="[
            'px-4 py-3 cursor-pointer flex items-center',
            index === selectedSuggestionIndex ? 'bg-luxury-green/10 dark:bg-gold/10' : 'hover:bg-gray-100 dark:hover:bg-gray-700'
          ]"
        >
          <div class="flex-shrink-0 mr-3">
            <NuxtImg 
              :src="suggestion.images[0]" 
              :alt="suggestion.name" 
              class="w-12 h-12 object-cover rounded-md"
              :modifiers="{ fit: 'cover', width: 50, height: 50 }"
            />
          </div>
          <div class="flex-grow min-w-0">
            <div class="font-medium text-gray-900 dark:text-white truncate">{{ suggestion.name }}</div>
            <div class="text-sm text-gray-500 dark:text-gray-400 truncate">{{ formatCurrency(suggestion.price, suggestion.currency) }}</div>
            <div class="text-xs text-gray-500 dark:text-gray-400">{{ suggestion.category }}</div>
          </div>
        </li>
      </ul>
    </div>

    <!-- Popular Searches -->
    <div 
      v-else-if="showSuggestions && searchQuery.length === 0"
      class="absolute z-10 mt-2 w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
    >
      <div class="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
        <h3 class="font-medium text-gray-900 dark:text-white">Popular Searches</h3>
      </div>
      <ul class="py-2">
        <li 
          v-for="popularSearch in popularSearches" 
          :key="popularSearch.term"
          @mousedown="selectPopularSearch(popularSearch.term)"
          class="px-4 py-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
        >
          <svg class="w-5 h-5 text-gray-400 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span class="text-gray-700 dark:text-gray-300">{{ popularSearch.term }}</span>
          <span class="ml-auto text-xs text-gray-500 dark:text-gray-400">{{ popularSearch.count }} searches</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { formatCurrency } from '~/utils/formatting'
import { debounce } from '~/utils'

const searchQuery = ref('')
const showSuggestions = ref(false)
const suggestions = ref([])
const selectedSuggestionIndex = ref(-1)
const searchContainerRef = ref(null)

// Popular searches data
const popularSearches = ref([
  { term: 'floral perfumes', count: 124 },
  { term: 'citrus scents', count: 98 },
  { term: 'unisex fragrances', count: 87 },
  { term: 'gift sets', count: 76 },
  { term: 'EDP concentration', count: 65 },
  { term: 'luxury perfumes', count: 54 }
])

// All products for search
const { products } = useProductsStore()

// Debounced search function
const debouncedSearch = debounce(async () => {
  if (searchQuery.value.length < 2) {
    suggestions.value = []
    selectedSuggestionIndex.value = -1
    return
  }

  // Filter products based on search query
  suggestions.value = products.value.filter(product => {
    const query = searchQuery.value.toLowerCase()
    return (
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query) ||
      product.fragranceFamily.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      product.ingredients.some(ing => ing.toLowerCase().includes(query))
    )
  }).slice(0, 8) // Limit to 8 suggestions

  selectedSuggestionIndex.value = -1
}, 300)

// Methods
const selectSuggestion = (suggestion) => {
  // Navigate to product page
  navigateTo(`/products/${suggestion.id}`)
  searchQuery.value = ''
  showSuggestions.value = false
  suggestions.value = []
}

const selectPopularSearch = (term) => {
  searchQuery.value = term
  showSuggestions.value = false
  // Trigger search for the popular term
  debouncedSearch()
}

const clearSearch = () => {
  searchQuery.value = ''
  suggestions.value = []
  showSuggestions.value = false
}

const handleEnter = (event) => {
  if (suggestions.value.length > 0 && selectedSuggestionIndex.value >= 0) {
    selectSuggestion(suggestions.value[selectedSuggestionIndex.value])
  } else if (searchQuery.value) {
    // Perform search
    performSearch(searchQuery.value)
  }
}

const performSearch = (query) => {
  // Navigate to search results page
  navigateTo(`/search?q=${encodeURIComponent(query)}`)
  showSuggestions.value = false
}

const moveDown = () => {
  if (suggestions.value.length > 0) {
    selectedSuggestionIndex.value = (selectedSuggestionIndex.value + 1) % suggestions.value.length
  }
}

const moveUp = () => {
  if (suggestions.value.length > 0) {
    selectedSuggestionIndex.value = selectedSuggestionIndex.value <= 0 
      ? suggestions.value.length - 1 
      : selectedSuggestionIndex.value - 1
  }
}

// Close suggestions when clicking outside
onClickOutside(searchContainerRef, () => {
  showSuggestions.value = false
})
</script>