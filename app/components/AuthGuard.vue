<!-- components/AuthGuard.vue -->
<template>
  <div v-if="!isAuthChecked" class="container mx-auto px-4 py-8 flex items-center justify-center min-h-screen">
    <div class="text-center">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-luxury-green mx-auto"></div>
      <p class="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
    </div>
  </div>

  <div v-else-if="!isAuthenticated" class="container mx-auto px-4 py-8 flex items-center justify-center min-h-screen">
    <div class="text-center">
      <p class="text-gray-600 dark:text-gray-400">Redirecting to login...</p>
    </div>
  </div>

  <slot v-else />
</template>

<script setup>
import { useRequireAuth } from '~/composables/useRequireAuth'

// Pass false to disable auto-check, we'll do it manually with proper awaiting
const { isAuthenticated, isAuthChecked, performAuthCheck } = useRequireAuth(false)

// Perform auth check on mount
onMounted(async () => {
  await performAuthCheck()
})
</script>
