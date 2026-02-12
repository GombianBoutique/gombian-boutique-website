<!-- pages/collections/[category].vue -->
<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Page Header -->
    <div class="mb-12 text-center">
      <h1 class="text-4xl font-serif-display font-bold text-luxury-green dark:text-white mb-4 capitalize">
        {{ categoryName }} Collection
      </h1>
      <p class="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
        Explore our exclusive {{ categoryName }} collection crafted with the finest ingredients
      </p>
    </div>

    <!-- Product Grid -->
    <ProductGrid
      :products="filteredProducts"
      :items-per-page="12"
      :show-pagination="true"
      :title="`${categoryName} Collection`"
    />

    <!-- Empty State -->
    <div v-if="filteredProducts.length === 0" class="text-center py-16">
      <h3 class="text-xl font-bold text-luxury-green dark:text-white mb-2">No products found</h3>
      <p class="text-gray-600 dark:text-gray-400 mb-6">
        The {{ categoryName }} collection is currently empty
      </p>
      <NuxtLink to="/products" class="luxury-button">
        Browse All Products
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const { products } = useProductsStore()

// Initialize products if not already loaded
if (!products.value || products.value.length === 0) {
  await useProductsStore().fetchProducts()
}

// Get the category from the route
const category = computed(() => route.params.category)

// Get all products from the store
const allProducts = computed(() => products.value || [])

// Filter products by the current category
const filteredProducts = computed(() => {
  return allProducts.value.filter(product => product.category === category.value)
})

// Get the human-readable category name
const categoryName = computed(() => {
  const categoryNames = {
    'best-seller': 'Best Seller',
    'premium': 'Premium',
    'complementary': 'Complementary',
    'gift-set': 'Gift Set',
    'limited-edition': 'Limited Edition'
  }
  
  return categoryNames[category.value] || category.value
})

// Set page title dynamically
useHead({
  title: `${categoryName.value} Collection - Gombian Boutique`,
  meta: [
    {
      hid: 'description',
      name: 'description',
      content: `Explore our exclusive ${categoryName.value} collection crafted with the finest ingredients`
    }
  ]
})
</script>