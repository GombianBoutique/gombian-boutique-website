<!-- components/FilterControls.vue -->
<template>
  <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
    <h3 class="text-lg font-bold text-luxury-green dark:text-white mb-6">Filter Products</h3>
    
    <!-- Category Filter -->
    <div class="mb-6">
      <h4 class="font-medium text-luxury-green dark:text-gold mb-3">Category</h4>
      <div class="space-y-2">
        <label 
          v-for="category in categories" 
          :key="category.value" 
          class="flex items-center cursor-pointer"
        >
          <input 
            type="radio" 
            :value="category.value" 
            v-model="selectedFilters.category"
            @change="updateFilters"
            class="h-4 w-4 text-luxury-green focus:ring-gold border-gray-300"
          >
          <span class="ml-2 text-gray-700 dark:text-gray-300">{{ category.label }}</span>
          <span class="ml-auto text-gray-500 dark:text-gray-400">({{ getCategoryCount(category.value) }})</span>
        </label>
      </div>
    </div>
    
    <!-- Gender Filter -->
    <div class="mb-6">
      <h4 class="font-medium text-luxury-green dark:text-gold mb-3">Gender</h4>
      <div class="space-y-2">
        <label 
          v-for="gender in genders" 
          :key="gender.value" 
          class="flex items-center cursor-pointer"
        >
          <input 
            type="radio" 
            :value="gender.value" 
            v-model="selectedFilters.gender"
            @change="updateFilters"
            class="h-4 w-4 text-luxury-green focus:ring-gold border-gray-300"
          >
          <span class="ml-2 text-gray-700 dark:text-gray-300">{{ gender.label }}</span>
          <span class="ml-auto text-gray-500 dark:text-gray-400">({{ getGenderCount(gender.value) }})</span>
        </label>
      </div>
    </div>
    
    <!-- Fragrance Family Filter -->
    <div class="mb-6">
      <h4 class="font-medium text-luxury-green dark:text-gold mb-3">Fragrance Family</h4>
      <div class="space-y-2">
        <label 
          v-for="family in fragranceFamilies" 
          :key="family.value" 
          class="flex items-center cursor-pointer"
        >
          <input 
            type="checkbox" 
            :value="family.value" 
            v-model="selectedFilters.fragranceFamilies"
            @change="updateFilters"
            class="h-4 w-4 text-luxury-green focus:ring-gold border-gray-300 rounded"
          >
          <span class="ml-2 text-gray-700 dark:text-gray-300">{{ family.label }}</span>
          <span class="ml-auto text-gray-500 dark:text-gray-400">({{ getFragranceFamilyCount(family.value) }})</span>
        </label>
      </div>
    </div>
    
    <!-- Price Range Filter -->
    <div class="mb-6">
      <h4 class="font-medium text-luxury-green dark:text-gold mb-3">Price Range</h4>
      <div class="space-y-4">
        <div>
          <label class="block text-sm text-gray-700 dark:text-gray-300 mb-2">Min: R{{ selectedFilters.priceRange.min }}</label>
          <input 
            type="range" 
            min="0" 
            :max="maxPrice" 
            v-model.number="selectedFilters.priceRange.min"
            @change="updateFilters"
            class="w-full accent-luxury-green"
          >
        </div>
        <div>
          <label class="block text-sm text-gray-700 dark:text-gray-300 mb-2">Max: R{{ selectedFilters.priceRange.max }}</label>
          <input 
            type="range" 
            min="0" 
            :max="maxPrice" 
            v-model.number="selectedFilters.priceRange.max"
            @change="updateFilters"
            class="w-full accent-luxury-green"
          >
        </div>
        <div class="flex justify-between text-sm text-gray-600 dark:text-gray-400">
          <span>R{{ selectedFilters.priceRange.min }}</span>
          <span>R{{ selectedFilters.priceRange.max }}</span>
        </div>
      </div>
    </div>
    
    <!-- Availability Filter -->
    <div class="mb-6">
      <h4 class="font-medium text-luxury-green dark:text-gold mb-3">Availability</h4>
      <div class="space-y-2">
        <label class="flex items-center cursor-pointer">
          <input 
            type="checkbox" 
            value="in-stock" 
            v-model="selectedFilters.availability"
            @change="updateFilters"
            class="h-4 w-4 text-luxury-green focus:ring-gold border-gray-300 rounded"
          >
          <span class="ml-2 text-gray-700 dark:text-gray-300">In Stock</span>
          <span class="ml-auto text-gray-500 dark:text-gray-400">({{ getInStockCount() }})</span>
        </label>
      </div>
    </div>
    
    <!-- Concentration Filter -->
    <div class="mb-6">
      <h4 class="font-medium text-luxury-green dark:text-gold mb-3">Concentration</h4>
      <div class="space-y-2">
        <label 
          v-for="concentration in concentrations" 
          :key="concentration.value" 
          class="flex items-center cursor-pointer"
        >
          <input 
            type="checkbox" 
            :value="concentration.value" 
            v-model="selectedFilters.concentrations"
            @change="updateFilters"
            class="h-4 w-4 text-luxury-green focus:ring-gold border-gray-300 rounded"
          >
          <span class="ml-2 text-gray-700 dark:text-gray-300">{{ concentration.label }}</span>
          <span class="ml-auto text-gray-500 dark:text-gray-400">({{ getConcentrationCount(concentration.value) }})</span>
        </label>
      </div>
    </div>
    
    <!-- Volume Filter -->
    <div class="mb-6">
      <h4 class="font-medium text-luxury-green dark:text-gold mb-3">Volume</h4>
      <div class="grid grid-cols-2 gap-2">
        <label 
          v-for="volume in volumes" 
          :key="volume.value" 
          class="flex items-center cursor-pointer"
        >
          <input 
            type="checkbox" 
            :value="volume.value" 
            v-model="selectedFilters.volumes"
            @change="updateFilters"
            class="h-4 w-4 text-luxury-green focus:ring-gold border-gray-300 rounded"
          >
          <span class="ml-2 text-gray-700 dark:text-gray-300">{{ volume.label }}</span>
          <span class="ml-auto text-gray-500 dark:text-gray-400">({{ getVolumeCount(volume.value) }})</span>
        </label>
      </div>
    </div>
    
    <!-- Reset Filters Button -->
    <div class="pt-4 border-t border-gray-200 dark:border-gray-700">
      <button 
        @click="resetFilters"
        class="w-full py-2 px-4 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
      >
        Reset Filters
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  products: {
    type: Array,
    required: true
  }
})

// Initialize filter state
const selectedFilters = ref({
  category: '',
  gender: '',
  fragranceFamilies: [],
  priceRange: {
    min: 0,
    max: 1000 // Will be updated based on max price in products
  },
  availability: [],
  concentrations: [],
  volumes: []
})

// Define filter options
const categories = [
  { value: '', label: 'All Categories' },
  { value: 'best-seller', label: 'Best Seller' },
  { value: 'premium', label: 'Premium' },
  { value: 'complementary', label: 'Complementary' },
  { value: 'gift-set', label: 'Gift Set' },
  { value: 'limited-edition', label: 'Limited Edition' }
]

const genders = [
  { value: '', label: 'All Genders' },
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'unisex', label: 'Unisex' },
  { value: 'couple', label: 'Couple' }
]

const fragranceFamilies = [
  { value: 'floral', label: 'Floral' },
  { value: 'woody', label: 'Woody' },
  { value: 'citrus', label: 'Citrus' },
  { value: 'oriental', label: 'Oriental' },
  { value: 'fresh', label: 'Fresh' },
  { value: 'earthy', label: 'Earthy' }
]

const concentrations = [
  { value: 'EDT', label: 'Eau de Toilette' },
  { value: 'EDP', label: 'Eau de Parfum' },
  { value: 'Parfum', label: 'Parfum' },
  { value: 'Body Lotion', label: 'Body Lotion' }
]

const volumes = [
  { value: '30ml', label: '30ml' },
  { value: '60ml', label: '60ml' },
  { value: '100ml', label: '100ml' },
  { value: '200ml', label: '200ml' }
]

// Computed properties for counts
const maxPrice = computed(() => {
  if (!props.products || props.products.length === 0) return 1000
  return Math.max(...props.products.map(p => p.price)) + 100
})

// Initialize max price
onMounted(() => {
  if (props.products && props.products.length > 0) {
    selectedFilters.value.priceRange.max = Math.max(...props.products.map(p => p.price)) + 100
  }
})

// Count methods
const getCategoryCount = (category) => {
  if (!category) return props.products.length
  return props.products.filter(p => p.category === category).length
}

const getGenderCount = (gender) => {
  if (!gender) return props.products.length
  return props.products.filter(p => p.gender === gender).length
}

const getFragranceFamilyCount = (family) => {
  return props.products.filter(p => p.fragranceFamily === family).length
}

const getInStockCount = () => {
  return props.products.filter(p => p.inStock).length
}

const getConcentrationCount = (concentration) => {
  return props.products.filter(p => p.concentration === concentration).length
}

const getVolumeCount = (volume) => {
  return props.products.filter(p => p.volume === volume).length
}

// Methods
const updateFilters = () => {
  // Emit event to parent component with current filter state
  emit('filters-changed', selectedFilters.value)
}

const resetFilters = () => {
  selectedFilters.value = {
    category: '',
    gender: '',
    fragranceFamilies: [],
    priceRange: {
      min: 0,
      max: maxPrice.value
    },
    availability: [],
    concentrations: [],
    volumes: []
  }
  
  // Emit event to parent component with reset filters
  emit('filters-changed', selectedFilters.value)
}

// Define emit
const emit = defineEmits(['filters-changed'])
</script>