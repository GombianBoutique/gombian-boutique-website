<!-- components/Breadcrumbs.vue -->
<template>
  <nav class="mb-6" aria-label="Breadcrumb">
    <ol class="flex items-center space-x-2 text-sm">
      <li>
        <NuxtLink to="/" class="text-luxury-green hover:text-gold transition-colors">
          Home
        </NuxtLink>
      </li>
      <li v-for="(crumb, index) in crumbs" :key="index" class="flex items-center">
        <svg class="w-4 h-4 text-gray-400 mx-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
        </svg>
        <NuxtLink 
          v-if="crumb.to" 
          :to="crumb.to" 
          class="text-luxury-green hover:text-gold transition-colors"
        >
          {{ crumb.label }}
        </NuxtLink>
        <span v-else class="text-gray-500 dark:text-gray-400">{{ crumb.label }}</span>
      </li>
    </ol>
  </nav>
</template>

<script setup>
const props = defineProps({
  crumbs: {
    type: Array,
    required: true,
    validator: (value) => {
      return value.every(crumb => 
        typeof crumb.label === 'string' && 
        (typeof crumb.to === 'string' || crumb.to === undefined)
      )
    }
  }
})
</script>