<!-- components/CookieConsentBanner.vue -->
<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition ease-out duration-300"
      enter-from-class="translate-y-full opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition ease-in duration-300"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="translate-y-full opacity-0"
    >
      <div
        v-if="showBanner"
        class="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 shadow-2xl border-t border-gray-200 dark:border-gray-700"
      >
        <div class="container mx-auto px-4 py-6">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <!-- Content -->
            <div class="lg:col-span-8">
              <div class="flex items-start gap-4">
                <div class="flex-shrink-0">
                  <svg class="w-8 h-8 text-luxury-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div>
                  <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    We Value Your Privacy
                  </h3>
                  <p class="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                    We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. 
                    By clicking "Accept All", you consent to our use of cookies. Visit our 
                    <NuxtLink to="/cookies" class="text-luxury-green hover:text-gold dark:text-gold dark:hover:text-luxury-green underline font-medium">
                      Cookie Policy
                    </NuxtLink> 
                    to learn more or customize your preferences.
                  </p>
                </div>
              </div>
            </div>

            <!-- Actions -->
            <div class="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <button
                @click="acceptAll"
                class="w-full px-6 py-3 bg-luxury-green text-white rounded-full font-medium hover:bg-gold hover:text-luxury-green transition-colors shadow-md"
              >
                Accept All
              </button>
              <button
                @click="rejectAll"
                class="w-full px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-full font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                Reject Non-Essential
              </button>
              <button
                @click="openPreferences"
                class="w-full px-6 py-3 text-luxury-green dark:text-gold font-medium hover:underline transition-colors text-sm"
              >
                Customize Preferences
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
const { showBanner, acceptAll, rejectAll, openPreferences } = useCookieConsent()
</script>
