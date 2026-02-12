<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-serif-display font-bold text-luxury-green mb-8 text-center dark:text-gold">Our Story</h1>
    
    <div class="max-w-4xl mx-auto">
      <!-- Owner Introduction Section -->
      <div class="mb-12 text-center">
        <div class="flex flex-col md:flex-row items-center justify-center gap-8">
          <div class="flex-shrink-0">
            <img
              src="/images/CT_Gomba.png"
              :alt="'CT Gomba - Owner of Gombian Boutique'"
              class="w-48 h-48 rounded-full object-cover border-4 border-gold shadow-lg"
            >
          </div>
          <div class="text-left">
            <h2 class="text-2xl font-serif-display font-bold text-luxury-green mb-4">Meet Our Owner</h2>
            <p class="text-lg mb-4">
              Hello! I'm CT Gomba, the passionate owner and founder of Gombian Boutique. My journey into the world of luxury fragrances began with a deep appreciation for the art of perfumery and the transformative power of scent.
            </p>
            <p class="text-lg">
              At Gombian Boutique, I'm dedicated to bringing you the finest villa-inspired fragrances that capture the essence of serene nature scents, stunning landscapes, and the spirit of relaxation found in the world's most captivating places.
            </p>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="prose prose-lg max-w-none">
        <h2 class="text-2xl font-serif-display font-bold text-luxury-green mt-10 mb-6">Our Heritage</h2>
        <p class="text-lg mb-6">
          Gombian Boutique, where the art of fragrance meets the luxury of villa-inspired fragrances. At Gombian Boutique, we believe that scent has the power to transport and transform any space. Our exclusive line of fragrances is crafted to evoke the essence of serene nature scents, stunning landscapes, and the spirit of relaxation found in the world's most captivating places.
        </p>

        <h2 class="text-2xl font-serif-display font-bold text-luxury-green mt-10 mb-6">Our Mission</h2>
        <p class="text-lg mb-6">
          Our mission is to offer a carefully curated selection of nature-inspired scents that connect customers with fashion, relaxation, escape, and a touch of luxury through signature fragrances available exclusively online. From the lush coasts of the Mediterranean to the tranquil hills of Tuscany, each fragrance in our collection is thoughtfully designed to bring the atmosphere of exquisite travel experiences into your space.
        </p>

        <h2 class="text-2xl font-serif-display font-bold text-luxury-green mt-10 mb-6">Our Values</h2>
        <p class="text-lg mb-6">
          We are committed to luxury, quality, authenticity, and sensory-driven experiences. We use only high-quality, natural ingredients, ensuring that each product is a true luxury experience. With Gombian Boutique, your body and your environment become a place of escape, elegance, and sensory indulgence.
        </p>

        <h2 class="text-2xl font-serif-display font-bold text-luxury-green mt-10 mb-6">The Art of Perfumery</h2>
        <p class="text-lg mb-6">
          Our master perfumers, known as "nez" (nose in French), possess an extraordinary sense of smell and years of training. They carefully balance top, middle, and base notes to create harmonious compositions that unfold beautifully on the skin throughout the day.
        </p>

        <p class="text-lg mb-6">
          We source ingredients from the most reputable suppliers, including rare absolutes from jasmine fields in Grasse, precious woods from sustainable forests, and unique botanicals that capture the essence of distant lands.
        </p>

        <h2 class="text-2xl font-serif-display font-bold text-luxury-green mt-10 mb-6">Sustainability Commitment</h2>
        <p class="text-lg mb-6">
          Gombian Boutique is committed to environmental responsibility. We partner with suppliers who practice sustainable harvesting, use recyclable packaging, and support communities where our ingredients are sourced.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'Our Story - Gombian Boutique',
  meta: [
    {
      name: 'description',
      content: 'Learn about Gombian Boutique, where the art of fragrance meets the luxury of villa-inspired fragrances. Discover our mission to offer nature-inspired scents that connect customers with fashion, relaxation, escape, and luxury through signature fragrances.'
    }
  ]
})
</script>