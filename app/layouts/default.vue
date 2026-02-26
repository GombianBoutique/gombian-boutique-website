<template>
  <div class="layout min-h-screen flex flex-col bg-neutral-light transition-colors duration-300 dark:bg-gray-900">
    <Navigation />
    <main class="container mx-auto px-4 py-8 flex-grow">
      <slot />
    </main>
    <Footer />
    
    <!-- Cookie Consent Components -->
    <CookieConsentBanner />
    <CookiePreferencesModal />
  </div>
</template>

<script setup>
// Default layout component
// Cookie consent is automatically initialized via the composable
</script>