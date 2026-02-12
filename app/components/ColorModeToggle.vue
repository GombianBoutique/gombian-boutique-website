<template>
  <ClientOnly>
    <button
      :aria-label="`Switch to ${oppositeMode} mode`"
      type="button"
      @click="toggleMode"
      class="p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-luxury-green transition-colors duration-300 bg-transparent hover:bg-gray-200 dark:hover:bg-gray-700"
    >
      <svg
        v-if="colorMode === 'dark'"
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 text-gold"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        />
      </svg>
      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 text-luxury-green"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
    </button>
    <template #fallback>
      <div class="p-2"></div>
    </template>
  </ClientOnly>
</template>

<script setup>
const colorMode = useColorMode()

const oppositeMode = computed(() => {
  return colorMode.value === 'dark' ? 'light' : 'dark'
})

const toggleMode = () => {
  colorMode.preference = oppositeMode.value
}
</script>