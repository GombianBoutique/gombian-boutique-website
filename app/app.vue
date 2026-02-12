<template>
  <div class="min-h-screen bg-neutral-light text-neutral-dark transition-colors duration-300 dark:bg-gray-900 dark:text-gray-200">
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <ToastNotification />
  </div>
</template>

<script setup>
import ToastNotification from '~/components/ToastNotification.vue'
</script>

<style lang="postcss">
@import '~/assets/css/main.css';
</style>