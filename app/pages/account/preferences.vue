<!-- pages/account/preferences.vue -->
<template>
  <AuthGuard>
    <NuxtLink to="/account" class="text-luxury-green hover:text-gold dark:text-gold dark:hover:text-luxury-green mb-6 inline-block">
      ← Back to Dashboard
    </NuxtLink>

    <h1 class="text-3xl font-serif-display font-bold text-luxury-green dark:text-white mb-8">Scent Preferences</h1>

    <div class="max-w-2xl">
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
        <p class="text-gray-600 dark:text-gray-400 mb-6">
          Tell us about your fragrance preferences to receive personalized recommendations.
        </p>

        <form @submit.prevent="savePreferences">
          <!-- Favorite Fragrance Families -->
          <div class="mb-8">
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Favorite Fragrance Families
            </h3>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
              <button
                v-for="family in fragranceFamilies"
                :key="family.id"
                type="button"
                @click="togglePreference('fragranceFamilies', family.id)"
                :class="[
                  'p-4 rounded-lg border-2 text-left transition-all',
                  preferences.fragranceFamilies.includes(family.id)
                    ? 'border-luxury-green bg-luxury-green/10 dark:bg-luxury-green/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-luxury-green/50'
                ]"
              >
                <span class="text-2xl mb-2 block">{{ family.icon }}</span>
                <span class="font-medium text-gray-900 dark:text-white">{{ family.name }}</span>
                <p class="text-xs text-gray-600 dark:text-gray-400 mt-1">{{ family.description }}</p>
              </button>
            </div>
          </div>

          <!-- Preferred Concentration -->
          <div class="mb-8">
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Preferred Concentration
            </h3>
            <div class="space-y-3">
              <label
                v-for="concentration in concentrations"
                :key="concentration.id"
                :class="[
                  'flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all',
                  preferences.preferredConcentration === concentration.id
                    ? 'border-luxury-green bg-luxury-green/10 dark:bg-luxury-green/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-luxury-green/50'
                ]"
              >
                <input
                  v-model="preferences.preferredConcentration"
                  type="radio"
                  :value="concentration.id"
                  class="h-4 w-4 text-luxury-green focus:ring-gold border-gray-300"
                />
                <div class="ml-3 flex-grow">
                  <span class="font-medium text-gray-900 dark:text-white">{{ concentration.name }}</span>
                  <p class="text-sm text-gray-600 dark:text-gray-400">{{ concentration.description }}</p>
                </div>
              </label>
            </div>
          </div>

          <!-- Preferred Gender Category -->
          <div class="mb-8">
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Preferred Gender Category
            </h3>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
              <button
                v-for="gender in genderCategories"
                :key="gender.id"
                type="button"
                @click="togglePreference('genderCategories', gender.id)"
                :class="[
                  'p-4 rounded-lg border-2 transition-all',
                  preferences.genderCategories.includes(gender.id)
                    ? 'border-luxury-green bg-luxury-green/10 dark:bg-luxury-green/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-luxury-green/50'
                ]"
              >
                <span class="text-2xl mb-2 block">{{ gender.icon }}</span>
                <span class="font-medium text-gray-900 dark:text-white">{{ gender.name }}</span>
              </button>
            </div>
          </div>

          <!-- Favorite Notes -->
          <div class="mb-8">
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Favorite Scent Notes
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Select the scent notes you enjoy most
            </p>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="note in scentNotes"
                :key="note.id"
                type="button"
                @click="togglePreference('scentNotes', note.id)"
                :class="[
                  'px-4 py-2 rounded-full border transition-all',
                  preferences.scentNotes.includes(note.id)
                    ? 'bg-luxury-green text-white border-luxury-green'
                    : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-luxury-green'
                ]"
              >
                {{ note.name }}
              </button>
            </div>
          </div>

          <!-- Seasonal Preferences -->
          <div class="mb-8">
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Seasonal Preferences
            </h3>
            <div class="grid grid-cols-2 gap-3">
              <label
                v-for="season in seasons"
                :key="season.id"
                :class="[
                  'flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all',
                  preferences.seasons.includes(season.id)
                    ? 'border-luxury-green bg-luxury-green/10 dark:bg-luxury-green/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-luxury-green/50'
                ]"
              >
                <input
                  type="checkbox"
                  :checked="preferences.seasons.includes(season.id)"
                  @change="toggleSeason(season.id)"
                  class="h-4 w-4 text-luxury-green focus:ring-gold border-gray-300"
                />
                <div class="ml-3 flex-grow">
                  <span class="font-medium text-gray-900 dark:text-white">{{ season.name }}</span>
                  <p class="text-sm text-gray-600 dark:text-gray-400">{{ season.description }}</p>
                </div>
              </label>
            </div>
          </div>

          <!-- Save Button -->
          <div class="flex gap-4">
            <button
              type="submit"
              :disabled="saving || loading"
              class="flex-1 bg-luxury-green text-white px-6 py-3 rounded-full hover:bg-gold hover:text-luxury-green transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ saving ? 'Saving...' : (loading ? 'Loading...' : 'Save Preferences') }}
            </button>
            <button
              type="button"
              @click="resetForm"
              class="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  </AuthGuard>
</template>

<script setup>
import { useAuth } from '~/composables/useAuth'

definePageMeta({
  layout: 'default'
})

const toast = useToast()
const { user, checkAuth } = useAuth()
const saving = ref(false)
const loading = ref(false)

// Fragrance families data
const fragranceFamilies = [
  { id: 'floral', name: 'Floral', icon: '🌸', description: 'Romantic & feminine' },
  { id: 'woody', name: 'Woody', icon: '🌲', description: 'Warm & earthy' },
  { id: 'citrus', name: 'Citrus', icon: '🍊', description: 'Fresh & energizing' },
  { id: 'oriental', name: 'Oriental', icon: '✨', description: 'Exotic & sensual' },
  { id: 'fresh', name: 'Fresh', icon: '💧', description: 'Clean & crisp' },
  { id: 'gourmand', name: 'Gourmand', icon: '🍯', description: 'Sweet & edible' }
]

// Concentration options
const concentrations = [
  { id: 'edt', name: 'Eau de Toilette (EDT)', description: 'Light, fresh, 5-15% fragrance oil' },
  { id: 'edp', name: 'Eau de Parfum (EDP)', description: 'Moderate intensity, 15-20% fragrance oil' },
  { id: 'parfum', name: 'Parfum', description: 'Most intense, 20-30% fragrance oil' }
]

// Gender categories
const genderCategories = [
  { id: 'male', name: 'Masculine', icon: '♂️' },
  { id: 'female', name: 'Feminine', icon: '♀️' },
  { id: 'unisex', name: 'Unisex', icon: '⚧' },
  { id: 'couple', name: 'Couple', icon: '💑' }
]

// Scent notes
const scentNotes = [
  { id: 'bergamot', name: 'Bergamot' },
  { id: 'citrus', name: 'Citrus' },
  { id: 'lavender', name: 'Lavender' },
  { id: 'jasmine', name: 'Jasmine' },
  { id: 'rose', name: 'Rose' },
  { id: 'vanilla', name: 'Vanilla' },
  { id: 'musk', name: 'Musk' },
  { id: 'sandalwood', name: 'Sandalwood' },
  { id: 'cedar', name: 'Cedar' },
  { id: 'amber', name: 'Amber' },
  { id: 'patchouli', name: 'Patchouli' },
  { id: 'vetiver', name: 'Vetiver' }
]

// Seasons
const seasons = [
  { id: 'spring', name: 'Spring', description: 'Light, fresh florals' },
  { id: 'summer', name: 'Summer', description: 'Citrus and aquatic notes' },
  { id: 'fall', name: 'Fall', description: 'Warm spices and woods' },
  { id: 'winter', name: 'Winter', description: 'Rich, intense fragrances' }
]

// User preferences - reactive state
const preferences = ref({
  fragranceFamilies: [],
  preferredConcentration: '',
  genderCategories: [],
  scentNotes: [],
  seasons: []
})

// Toggle array preference
const togglePreference = (key, value) => {
  const index = preferences.value[key].indexOf(value)
  if (index === -1) {
    preferences.value[key].push(value)
  } else {
    preferences.value[key].splice(index, 1)
  }
}

// Toggle season
const toggleSeason = (seasonId) => {
  const index = preferences.value.seasons.indexOf(seasonId)
  if (index === -1) {
    preferences.value.seasons.push(seasonId)
  } else {
    preferences.value.seasons.splice(index, 1)
  }
}

// Load preferences from user data
const loadPreferencesFromUser = () => {
  if (!user.value?.preferences) return
  
  const userPrefs = user.value.preferences
  
  // Load preferred concentration
  if (userPrefs.preferredConcentration) {
    preferences.value.preferredConcentration = userPrefs.preferredConcentration
  }
  
  // Load scent preferences if they exist
  if (userPrefs.scentPreferences) {
    if (userPrefs.scentPreferences.fragranceFamilies) {
      preferences.value.fragranceFamilies = [...userPrefs.scentPreferences.fragranceFamilies]
    }
    if (userPrefs.scentPreferences.genderCategories) {
      preferences.value.genderCategories = [...userPrefs.scentPreferences.genderCategories]
    }
    if (userPrefs.scentPreferences.scentNotes) {
      preferences.value.scentNotes = [...userPrefs.scentPreferences.scentNotes]
    }
    if (userPrefs.scentPreferences.seasons) {
      preferences.value.seasons = [...userPrefs.scentPreferences.seasons]
    }
  }
  
  console.log('Loaded preferences from user data:', preferences.value)
}

// Save preferences
const savePreferences = async () => {
  // Prevent double submission
  if (saving.value || loading.value) return

  saving.value = true

  try {
    // Build preferences object matching backend structure
    const preferencesData = {
      preferredConcentration: preferences.value.preferredConcentration,
      scentPreferences: {
        fragranceFamilies: preferences.value.fragranceFamilies,
        genderCategories: preferences.value.genderCategories,
        scentNotes: preferences.value.scentNotes,
        seasons: preferences.value.seasons
      }
    }
    
    // Save to API
    const { data } = await useFetch('/api/account/preferences', {
      method: 'PUT',
      body: preferencesData
    })

    if (data.value?.success) {
      toast.success('Preferences saved successfully!', 'Success')
      // Refresh user data to ensure sync
      await checkAuth()
    }
  } catch (error) {
    console.error('Failed to save preferences:', error)
    toast.error('Failed to save preferences', 'Error')
  } finally {
    saving.value = false
  }
}

// Reset form
const resetForm = () => {
  preferences.value = {
    fragranceFamilies: [],
    preferredConcentration: '',
    genderCategories: [],
    scentNotes: [],
    seasons: []
  }
}

// Load user preferences on mount
onMounted(async () => {
  loading.value = true
  try {
    // Ensure we have the latest user data
    await checkAuth()
    // Load preferences from user data
    loadPreferencesFromUser()
  } catch (error) {
    console.error('Failed to load preferences:', error)
    toast.error('Failed to load preferences', 'Error')
  } finally {
    loading.value = false
  }
})

useHead({
  title: 'Scent Preferences - Gombian Boutique'
})
</script>
