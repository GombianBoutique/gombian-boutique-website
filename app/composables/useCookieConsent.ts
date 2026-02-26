// composables/useCookieConsent.ts
import type { Ref } from 'vue'

export interface CookiePreferences {
  essential: boolean
  performance: boolean
  functional: boolean
  marketing: boolean
}

export interface CookieConsentState {
  hasConsented: boolean
  preferences: CookiePreferences
  consentDate?: string
}

const COOKIE_CONSENT_KEY = 'gombian_cookie_consent'
const DEFAULT_PREFERENCES: CookiePreferences = {
  essential: true, // Always true, cannot be disabled
  performance: false,
  functional: false,
  marketing: false
}

// Use a module-level variable to ensure singleton pattern
let sharedState: {
  hasConsented: Ref<boolean>
  showBanner: Ref<boolean>
  showPreferencesModal: Ref<boolean>
  preferences: Ref<CookiePreferences>
} | null = null

export const useCookieConsent = () => {
  // Initialize shared state only once
  if (!sharedState) {
    const hasConsented = ref(false)
    const showBanner = ref(false)
    const showPreferencesModal = ref(false)
    const preferences = ref<CookiePreferences>({ ...DEFAULT_PREFERENCES })

    // Load consent state from localStorage on mount
    const loadConsent = () => {
      if (import.meta.server) {
        return
      }

      try {
        const stored = localStorage.getItem(COOKIE_CONSENT_KEY)
        if (stored) {
          const state: CookieConsentState = JSON.parse(stored)
          hasConsented.value = state.hasConsented
          preferences.value = state.preferences || DEFAULT_PREFERENCES
          // Don't show banner if already consented
          if (!state.hasConsented) {
            showBanner.value = true
          }
        } else {
          // No consent recorded, show banner
          showBanner.value = true
        }
      } catch (error) {
        console.error('Failed to load cookie consent:', error)
        showBanner.value = true
      }
    }

    // Call loadConsent on mount
    if (import.meta.client) {
      onMounted(() => {
        loadConsent()
      })
    }

    sharedState = {
      hasConsented,
      showBanner,
      showPreferencesModal,
      preferences
    }
  }

  // Save consent state to localStorage
  const saveConsent = (prefs: CookiePreferences) => {
    const state: CookieConsentState = {
      hasConsented: true,
      preferences: prefs,
      consentDate: new Date().toISOString()
    }

    try {
      localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(state))
      sharedState!.hasConsented.value = true
      sharedState!.preferences.value = prefs
      sharedState!.showBanner.value = false
      sharedState!.showPreferencesModal.value = false

      // Trigger cookie initialization based on preferences
      initializeCookies(prefs)
    } catch (error) {
      console.error('Failed to save cookie consent:', error)
    }
  }

  // Initialize cookies based on preferences
  const initializeCookies = (prefs: CookiePreferences) => {
    if (import.meta.server) return

    // Performance cookies (Google Analytics)
    if (!prefs.performance) {
      // Disable Google Analytics
      window['ga-disable-G-XXXXXXXXXX'] = true
    }

    // Marketing cookies
    if (!prefs.marketing) {
      // Disable marketing/tracking pixels
      // Add your marketing script disabling logic here
    }
  }

  // Accept all cookies
  const acceptAll = () => {
    saveConsent({
      essential: true,
      performance: true,
      functional: true,
      marketing: true
    })
  }

  // Reject non-essential cookies
  const rejectAll = () => {
    saveConsent({
      essential: true,
      performance: false,
      functional: false,
      marketing: false
    })
  }

  // Open preferences modal
  const openPreferences = () => {
    sharedState!.showBanner.value = false
    sharedState!.showPreferencesModal.value = true
  }

  // Close preferences modal
  const closePreferences = () => {
    sharedState!.showPreferencesModal.value = false
  }

  // Save custom preferences from modal
  const savePreferences = () => {
    saveConsent(sharedState!.preferences.value)
  }

  // Reset to default preferences
  const resetPreferences = () => {
    sharedState!.preferences.value = { ...DEFAULT_PREFERENCES }
  }

  // Withdraw consent (for use in footer/settings)
  const withdrawConsent = () => {
    if (import.meta.server) return

    try {
      localStorage.removeItem(COOKIE_CONSENT_KEY)
      sharedState!.hasConsented.value = false
      sharedState!.showBanner.value = true
      sharedState!.preferences.value = { ...DEFAULT_PREFERENCES }
    } catch (error) {
      console.error('Failed to withdraw consent:', error)
    }
  }

  // Check if a specific cookie category is allowed
  const isAllowed = (category: keyof CookiePreferences) => {
    return sharedState!.preferences.value[category]
  }

  return {
    // State
    hasConsented: readonly(sharedState.hasConsented),
    showBanner: readonly(sharedState.showBanner),
    showPreferencesModal: readonly(sharedState.showPreferencesModal),
    preferences: sharedState.preferences, // Return as-is so it can be modified by the modal

    // Actions
    acceptAll,
    rejectAll,
    openPreferences,
    closePreferences,
    savePreferences,
    resetPreferences,
    withdrawConsent,
    isAllowed,
    loadConsent: () => {
      if (import.meta.client) {
        const stored = localStorage.getItem(COOKIE_CONSENT_KEY)
        if (stored) {
          const state: CookieConsentState = JSON.parse(stored)
          sharedState!.hasConsented.value = state.hasConsented
          sharedState!.preferences.value = state.preferences || DEFAULT_PREFERENCES
        }
      }
    },
    setPreferences: (prefs: CookiePreferences) => {
      sharedState!.preferences.value = prefs
    }
  }
}
