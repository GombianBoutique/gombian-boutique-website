<!-- pages/products/[id].vue -->
<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Breadcrumbs -->
    <Breadcrumbs :crumbs="breadcrumbItems" />

    <!-- Product Detail Section -->
    <div v-if="product" class="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <!-- Product Images Carousel -->
      <div>
        <div class="bg-white dark:bg-gray-800 rounded-xl p-4 mb-4">
          <NuxtImg 
            :src="selectedImage" 
            :alt="product.name" 
            class="w-full h-96 object-contain"
            :modifiers="{ fit: 'contain', width: 600, height: 600 }"
          />
        </div>
        
        <!-- Thumbnails -->
        <div class="grid grid-cols-4 gap-4">
          <button 
            v-for="(image, index) in product.images" 
            :key="index"
            @click="selectImage(image)"
            :class="['rounded-lg overflow-hidden', selectedImage === image ? 'ring-2 ring-gold' : '']"
          >
            <NuxtImg 
              :src="image" 
              :alt="`Thumbnail ${index + 1}`" 
              class="w-full h-24 object-cover"
              :modifiers="{ fit: 'cover', width: 150, height: 150 }"
            />
          </button>
        </div>
      </div>

      <!-- Product Information -->
      <div>
        <div class="mb-6">
          <span class="inline-block px-3 py-1 bg-luxury-green/10 text-luxury-green dark:text-gold rounded-full text-sm font-medium mb-4">
            {{ product.category }}
          </span>
          <h1 class="text-3xl md:text-4xl font-serif-display font-bold text-luxury-green dark:text-white mb-4">
            {{ product.name }}
          </h1>
          <div class="flex items-center mb-6">
            <div class="flex text-yellow-400 mr-2">
              <svg v-for="star in 5" :key="star" 
                   :class="[star <= Math.round(product.rating) ? 'text-yellow-400' : 'text-gray-300', 'w-5 h-5']" 
                   xmlns="http://www.w3.org/2000/svg" 
                   viewBox="0 0 20 20" 
                   fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <span class="text-gray-600 dark:text-gray-400">
              {{ product.rating }} ({{ product.reviewCount }} reviews)
            </span>
          </div>
          <div class="text-3xl font-bold text-luxury-green dark:text-gold mb-6">
            {{ formatCurrency(product.price, product.currency) }}
          </div>
        </div>

        <!-- Volume and Availability -->
        <div class="mb-8">
          <div class="flex items-center mb-4">
            <span class="text-gray-700 dark:text-gray-300 mr-4">Volume:</span>
            <div class="flex space-x-2">
              <button 
                v-for="vol in product.availableVolumes" 
                :key="vol"
                @click="selectedVolume = vol"
                :class="[
                  'px-4 py-2 rounded-full border',
                  selectedVolume === vol 
                    ? 'border-luxury-green bg-luxury-green text-white' 
                    : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300'
                ]"
              >
                {{ vol }}
              </button>
            </div>
          </div>

          <div class="flex items-center">
            <span class="text-gray-700 dark:text-gray-300 mr-4">Availability:</span>
            <span 
              :class="[
                product.inStock ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
              ]"
            >
              {{ product.inStock ? 'In Stock' : 'Out of Stock' }}
            </span>
            <span v-if="product.inStock" class="text-gray-600 dark:text-gray-400 ml-2">
              ({{ product.inventoryCount }} available)
            </span>
          </div>
        </div>

        <!-- Quantity Selector and Add to Cart -->
        <div class="mb-8">
          <div class="flex items-center mb-6">
            <span class="text-gray-700 dark:text-gray-300 mr-4">Quantity:</span>
            <div class="flex items-center border border-gray-300 dark:border-gray-600 rounded-md">
              <button 
                @click="decreaseQuantity"
                class="px-4 py-2 text-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                -
              </button>
              <span class="px-4 py-2 text-gray-700 dark:text-gray-300">{{ quantity }}</span>
              <button 
                @click="increaseQuantity"
                class="px-4 py-2 text-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                +
              </button>
            </div>
          </div>

          <div class="flex flex-wrap gap-4">
            <button 
              @click="addToCart"
              :disabled="!product.inStock"
              class="luxury-button flex-1 min-w-[200px]"
            >
              {{ product.inStock ? 'Add to Cart' : 'Out of Stock' }}
            </button>
            
            <button 
              @click="toggleWishlist"
              :class="[
                'p-3 rounded-full border',
                isWishlisted 
                  ? 'bg-red-100 border-red-300 text-red-600' 
                  : 'bg-gray-100 border-gray-300 text-gray-600 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300'
              ]"
              aria-label="Add to wishlist"
            >
              <svg 
                :class="[isWishlisted ? 'fill-current' : '']" 
                class="w-6 h-6" 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
              </svg>
            </button>
            
            <button 
              @click="shareProduct"
              class="p-3 rounded-full border bg-gray-100 border-gray-300 text-gray-600 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
              aria-label="Share product"
            >
              <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Product Description -->
        <div class="mb-8">
          <h2 class="text-xl font-serif-display font-bold text-luxury-green dark:text-white mb-4">Description</h2>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
            {{ product.description }}
          </p>
        </div>
      </div>
    </div>

    <!-- Product Details Tabs -->
    <div class="mt-16">
      <div class="border-b border-gray-200 dark:border-gray-700">
        <nav class="flex space-x-8">
          <button
            v-for="tab in tabs"
            :key="tab.name"
            @click="activeTab = tab.name"
            :class="[
              'py-4 px-1 border-b-2 font-medium text-sm',
              activeTab === tab.name
                ? 'border-luxury-green text-luxury-green dark:text-gold'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
            ]"
          >
            {{ tab.label }}
          </button>
        </nav>
      </div>

      <div class="py-8">
        <!-- Scent Notes Tab -->
        <div v-show="activeTab === 'scent-notes'" class="space-y-6">
          <h3 class="text-xl font-serif-display font-bold text-luxury-green dark:text-white">Scent Profile</h3>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h4 class="font-bold text-luxury-green dark:text-gold mb-4">Top Notes</h4>
              <ul class="space-y-2">
                <li v-for="note in product?.scentNotes?.top || []" :key="note" class="flex items-center">
                  <span class="w-2 h-2 bg-luxury-green rounded-full mr-3"></span>
                  {{ capitalize(note) }}
                </li>
              </ul>
            </div>

            <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h4 class="font-bold text-luxury-green dark:text-gold mb-4">Middle Notes</h4>
              <ul class="space-y-2">
                <li v-for="note in product?.scentNotes?.middle || []" :key="note" class="flex items-center">
                  <span class="w-2 h-2 bg-luxury-green rounded-full mr-3"></span>
                  {{ capitalize(note) }}
                </li>
              </ul>
            </div>

            <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h4 class="font-bold text-luxury-green dark:text-gold mb-4">Base Notes</h4>
              <ul class="space-y-2">
                <li v-for="note in product?.scentNotes?.base || []" :key="note" class="flex items-center">
                  <span class="w-2 h-2 bg-luxury-green rounded-full mr-3"></span>
                  {{ capitalize(note) }}
                </li>
              </ul>
            </div>
          </div>
          
          <div class="bg-luxury-green/10 dark:bg-gray-800 p-6 rounded-lg">
            <h4 class="font-bold text-luxury-green dark:text-gold mb-2">Longevity</h4>
            <p class="text-gray-700 dark:text-gray-300">{{ product?.longevity || 'Not specified' }}</p>
          </div>
        </div>

        <!-- Ingredients Tab -->
        <div v-show="activeTab === 'ingredients'" class="space-y-6">
          <h3 class="text-xl font-serif-display font-bold text-luxury-green dark:text-white">Ingredients</h3>
          <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              <li
                v-for="ingredient in product?.ingredients || []"
                :key="ingredient"
                class="px-4 py-2 bg-neutral-light dark:bg-gray-700 rounded-full text-sm"
              >
                {{ capitalize(ingredient) }}
              </li>
            </ul>
          </div>
        </div>

        <!-- Details Tab -->
        <div v-show="activeTab === 'details'" class="space-y-6">
          <h3 class="text-xl font-serif-display font-bold text-luxury-green dark:text-white">Product Details</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 class="font-bold text-luxury-green dark:text-gold mb-2">Fragrance Family</h4>
              <p class="text-gray-700 dark:text-gray-300">{{ product?.fragranceFamily || 'Not specified' }}</p>
            </div>
            <div>
              <h4 class="font-bold text-luxury-green dark:text-gold mb-2">Gender</h4>
              <p class="text-gray-700 dark:text-gray-300">
                {{ product?.gender === 'unisex' ? 'Unisex' : capitalize(product?.gender) || 'Not specified' }}
              </p>
            </div>
            <div>
              <h4 class="font-bold text-luxury-green dark:text-gold mb-2">Season</h4>
              <p class="text-gray-700 dark:text-gray-300">{{ product?.season || 'Not specified' }}</p>
            </div>
            <div>
              <h4 class="font-bold text-luxury-green dark:text-gold mb-2">Concentration</h4>
              <p class="text-gray-700 dark:text-gray-300">{{ product?.concentration || 'Not specified' }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Related Products Section -->
    <div v-if="relatedProducts.length > 0" class="mt-16">
      <h2 class="text-2xl font-serif-display font-bold text-luxury-green dark:text-white mb-8">You May Also Like</h2>
      <ProductGrid :products="relatedProducts" :show-pagination="false" />
    </div>
  </div>
</template>

<script setup>
import { formatCurrency, capitalize } from '~/utils/formatting'

definePageMeta({
  layout: 'default'
})

const route = useRoute()
const { products } = useProducts()
const cartStore = useCartStore()

// Product data - get from composable
const product = computed(() => {
  if (!products.value) return null
  return products.value.find(p => p.id === route.params.id)
})

// State
const selectedImage = ref('')
const selectedVolume = ref('')
const quantity = ref(1)
const isWishlisted = ref(false)
const activeTab = ref('scent-notes')

// Initialize state
onMounted(() => {
  if (product.value) {
    selectedImage.value = product.value.images[0]
    selectedVolume.value = product.value.volume
  }
})

// Computed properties
const tabs = [
  { name: 'scent-notes', label: 'Scent Notes' },
  { name: 'ingredients', label: 'Ingredients' },
  { name: 'details', label: 'Details' }
]

const relatedProducts = computed(() => {
  if (!product.value) return []
  
  // Get related products based on category or fragrance family
  return products.value
    .filter(p => 
      p.category === product.value.category && 
      p.id !== product.value.id
    )
    .slice(0, 4) // Limit to 4 related products
})

// Methods
const selectImage = (image) => {
  selectedImage = image
}

const increaseQuantity = () => {
  if (quantity.value < product.value.inventoryCount) {
    quantity.value++
  }
}

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--
  }
}

const addToCart = () => {
  if (!product.value || !product.value.inStock) return

  cartStore.addItem({
    productId: product.value.id,
    productName: product.value.name,
    productImage: selectedImage.value,
    unitPrice: product.value.price,
    quantity: quantity.value,
    inventoryCount: product.value.inventoryCount,
    totalPrice: product.value.price * quantity.value
  })

  // Show success message
  const toast = useToast()
  toast.success(`${product.value.name} added to cart!`)
}

const toggleWishlist = () => {
  isWishlisted.value = !isWishlisted.value
  // In a real app, you would add/remove from wishlist
}

const shareProduct = () => {
  if (navigator.share) {
    navigator.share({
      title: product.value.name,
      text: product.value.description,
      url: window.location.href
    })
  } else {
    // Fallback: Copy to clipboard
    navigator.clipboard.writeText(window.location.href)
    const toast = useToast()
    toast.info('Link copied to clipboard!')
  }
}

// Computed property for breadcrumbs
const breadcrumbItems = computed(() => {
  const items = [
    { label: 'Home', to: '/' },
    { label: 'Products', to: '/products' }
  ]

  if (product.value) {
    items.push({ label: product.value.name })
  }

  return items
})

// Set page title
useHead(() => {
  if (product.value) {
    return {
      title: `${product.value.name} - Gombian Boutique`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: product.value.description
        }
      ]
    }
  }
  return {}
})
</script>