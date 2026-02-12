<template>
  <div>
    <!-- Hero Slider -->
    <HeroSlider />

    <!-- Featured Products -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-serif-display font-bold text-center text-luxury-green mb-12">
          Featured Perfumes
        </h2>

        <div class="product-grid">
          <ProductCard
            v-for="product in featuredProducts"
            :key="product.id"
            :product="product"
            class="fade-in-up"
          />
        </div>

        <div class="text-center mt-12">
          <NuxtLink to="/products" class="luxury-button">
            View All Perfumes
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section class="py-16 bg-neutral-light">
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row items-center">
          <div class="md:w-1/2 mb-10 md:mb-0 md:pr-10">
            <h2 class="text-3xl font-serif-display font-bold text-luxury-green mb-6">
              The Art of Perfumery
            </h2>
            <p class="mb-4 text-lg">
              Each fragrance in our collection tells a unique story, carefully crafted by master perfumers using traditional techniques and the finest ingredients sourced from around the world.
            </p>
            <p class="mb-4 text-lg">
              Our commitment to excellence ensures that every bottle represents the pinnacle of olfactory artistry, designed to evoke emotions and create lasting memories.
            </p>
            <NuxtLink to="/about" class="luxury-button mt-6 inline-block">
              Learn More
            </NuxtLink>
          </div>
          <div class="md:w-1/2">
            <img
              src="/images/backgrounds/Background 01.jpeg"
              alt="The art of perfumery"
              class="w-full h-auto rounded-lg shadow-lg"
            >
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const { products } = useProducts()

// Get the first 4 products as featured products
const featuredProducts = computed(() => {
  if (products.value && products.value.length > 0) {
    return products.value.slice(0, 4)
  }
  return []
})

useHead({
  title: 'Gombian Boutique - Luxury Perfume Collection',
  meta: [
    {
      name: 'description',
      content: 'Gombian Boutique - where the art of fragrance meets the luxury of villa-inspired fragrances. Experience our exclusive line of nature-inspired scents that transport and transform any space, crafted with high-quality, natural ingredients for a true luxury experience.'
    },
    // Open Graph tags for social sharing
    { property: 'og:title', content: 'Gombian Boutique - Luxury Perfume Collection' },
    { property: 'og:description', content: 'Gombian Boutique - where the art of fragrance meets the luxury of villa-inspired fragrances. Experience our exclusive line of nature-inspired scents that transport and transform any space, crafted with high-quality, natural ingredients for a true luxury experience.' },
    { property: 'og:image', content: '/images/products/Ladies 60ml Perfume.jpg' },
    { property: 'og:url', content: 'https://gombianboutique.com/' },
    { property: 'og:type', content: 'website' },
    // Twitter Card tags
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Gombian Boutique - Luxury Perfume Collection' },
    { name: 'twitter:description', content: 'Gombian Boutique - where the art of fragrance meets the luxury of villa-inspired fragrances. Experience our exclusive line of nature-inspired scents that transport and transform any space.' },
    { name: 'twitter:image', content: '/images/products/Ladies Ultimate Combo.jpeg' }
  ]
})
</script>