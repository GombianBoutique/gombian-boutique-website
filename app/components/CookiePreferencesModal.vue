<!-- components/CookiePreferencesModal.vue -->
<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition ease-out duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition ease-in duration-300"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="showPreferencesModal"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        @click="closePreferences"
      >
        <Transition
          enter-active-class="transition ease-out duration-300"
          enter-from-class="scale-95 opacity-0 translate-y-4"
          enter-to-class="scale-100 opacity-100 translate-y-0"
          leave-active-class="transition ease-in duration-300"
          leave-from-class="scale-100 opacity-100 translate-y-0"
          leave-to-class="scale-95 opacity-0 translate-y-4"
        >
          <div
            class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            @click.stop
          >
            <!-- Header -->
            <div class="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
              <h2 class="text-2xl font-serif-display font-bold text-gray-900 dark:text-white">
                Cookie Preferences
              </h2>
              <button
                @click="closePreferences"
                class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white transition-colors"
                aria-label="Close"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <!-- Content -->
            <div class="p-6 space-y-6">
              <p class="text-gray-700 dark:text-gray-300">
                Customize your cookie preferences. You can enable or disable different types of cookies. 
                Note that essential cookies cannot be disabled as they are necessary for the website to function.
              </p>

              <!-- Essential Cookies -->
              <div class="border border-gray-200 dark:border-gray-700 rounded-xl p-4">
                <div class="flex items-start justify-between">
                  <div class="flex-1">
                    <div class="flex items-center gap-3 mb-2">
                      <h3 class="font-bold text-gray-900 dark:text-white">Essential Cookies</h3>
                      <span class="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs rounded-full font-medium">
                        Required
                      </span>
                    </div>
                    <p class="text-sm text-gray-700 dark:text-gray-300">
                      These cookies are necessary for the website to function properly. They enable basic functions 
                      like page navigation, secure access, and shopping cart functionality.
                    </p>
                  </div>
                  <div class="flex-shrink-0 ml-4">
                    <div class="relative inline-flex items-center cursor-not-allowed">
                      <input
                        type="checkbox"
                        :checked="true"
                        disabled
                        class="w-6 h-6 text-luxury-green rounded focus:ring-luxury-green disabled:opacity-50"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <!-- Performance Cookies -->
              <div class="border border-gray-200 dark:border-gray-700 rounded-xl p-4">
                <div class="flex items-start justify-between">
                  <div class="flex-1">
                    <h3 class="font-bold text-gray-900 dark:text-white mb-2">Performance Cookies</h3>
                    <p class="text-sm text-gray-700 dark:text-gray-300 mb-3">
                      These cookies help us understand how visitors interact with our website by collecting 
                      anonymous information about pages visited, time spent, and errors encountered.
                    </p>
                    <div class="flex flex-wrap gap-2">
                      <span class="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded">
                        Google Analytics
                      </span>
                      <span class="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded">
                        Heatmaps
                      </span>
                    </div>
                  </div>
                  <div class="flex-shrink-0 ml-4">
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input
                        v-model="localPreferences.performance"
                        type="checkbox"
                        class="sr-only peer"
                      />
                      <div class="w-14 h-7 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-luxury-green/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-luxury-green"></div>
                    </label>
                  </div>
                </div>
              </div>

              <!-- Functional Cookies -->
              <div class="border border-gray-200 dark:border-gray-700 rounded-xl p-4">
                <div class="flex items-start justify-between">
                  <div class="flex-1">
                    <h3 class="font-bold text-gray-900 dark:text-white mb-2">Functional Cookies</h3>
                    <p class="text-sm text-gray-700 dark:text-gray-300 mb-3">
                      These cookies remember your choices (such as language preference, region, or login information) 
                      to provide enhanced, personalized features.
                    </p>
                    <div class="flex flex-wrap gap-2">
                      <span class="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded">
                        User Preferences
                      </span>
                      <span class="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded">
                        Language Settings
                      </span>
                    </div>
                  </div>
                  <div class="flex-shrink-0 ml-4">
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input
                        v-model="localPreferences.functional"
                        type="checkbox"
                        class="sr-only peer"
                      />
                      <div class="w-14 h-7 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-luxury-green/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-luxury-green"></div>
                    </label>
                  </div>
                </div>
              </div>

              <!-- Marketing Cookies -->
              <div class="border border-gray-200 dark:border-gray-700 rounded-xl p-4">
                <div class="flex items-start justify-between">
                  <div class="flex-1">
                    <h3 class="font-bold text-gray-900 dark:text-white mb-2">Marketing Cookies</h3>
                    <p class="text-sm text-gray-700 dark:text-gray-300 mb-3">
                      These cookies track your browsing habits to deliver relevant advertisements and marketing 
                      content. They are usually placed by advertising networks with our permission.
                    </p>
                    <div class="flex flex-wrap gap-2">
                      <span class="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded">
                        Facebook Pixel
                      </span>
                      <span class="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded">
                        Google Ads
                      </span>
                      <span class="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded">
                        Retargeting
                      </span>
                    </div>
                  </div>
                  <div class="flex-shrink-0 ml-4">
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input
                        v-model="localPreferences.marketing"
                        type="checkbox"
                        class="sr-only peer"
                      />
                      <div class="w-14 h-7 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-luxury-green/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-luxury-green"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <!-- Footer Actions -->
            <div class="sticky bottom-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-6 py-4 flex flex-col sm:flex-row gap-3 justify-between">
              <button
                @click="handleReset"
                class="px-6 py-3 text-gray-700 dark:text-gray-300 font-medium hover:underline transition-colors text-sm"
              >
                Reset to Defaults
              </button>
              <div class="flex gap-3">
                <button
                  @click="closePreferences"
                  class="px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-full font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  @click="handleSavePreferences"
                  class="px-6 py-3 bg-luxury-green text-white rounded-full font-medium hover:bg-gold hover:text-luxury-green transition-colors shadow-md"
                >
                  Save Preferences
                </button>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
const { showPreferencesModal, preferences, closePreferences, savePreferences, resetPreferences, setPreferences } = useCookieConsent()

// Local state for the modal that syncs with the composable
const localPreferences = ref({ ...preferences.value })

// Sync local state when modal opens
watch(showPreferencesModal, (isOpen) => {
  if (isOpen) {
    localPreferences.value = { ...preferences.value }
  }
}, { immediate: true })

// Update local state when preferences change
watch(preferences, (newPrefs) => {
  localPreferences.value = { ...newPrefs }
})

// Save preferences from local state
const handleSavePreferences = () => {
  setPreferences(localPreferences.value)
  savePreferences()
}

// Reset to defaults
const handleReset = () => {
  localPreferences.value = {
    essential: true,
    performance: false,
    functional: false,
    marketing: false
  }
}
</script>
