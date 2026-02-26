<!-- pages/account/profile.vue -->
<template>
  <AuthGuard>
    <NuxtLink to="/account" class="text-luxury-green hover:text-gold dark:text-gold dark:hover:text-luxury-green mb-6 inline-block">
      ← Back to Dashboard
    </NuxtLink>

    <h1 class="text-3xl font-serif-display font-bold text-luxury-green dark:text-white mb-8">Profile Settings</h1>

    <div class="max-w-2xl">
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
        <form @submit.prevent="saveProfile">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label for="firstName" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">First Name</label>
              <input
                id="firstName"
                v-model="profile.firstName"
                type="text"
                required
                class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-luxury-green focus:border-transparent"
              />
            </div>

            <div>
              <label for="lastName" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Last Name</label>
              <input
                id="lastName"
                v-model="profile.lastName"
                type="text"
                required
                class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-luxury-green focus:border-transparent"
              />
            </div>
          </div>

          <div class="mb-6">
            <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
            <input
              id="email"
              v-model="profile.email"
              type="email"
              required
              disabled
              class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-500 cursor-not-allowed"
            />
            <p class="mt-1 text-xs text-gray-500">Email cannot be changed</p>
          </div>

          <div class="mb-6">
            <label for="phone" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone Number</label>
            <input
              id="phone"
              v-model="profile.phone"
              type="tel"
              class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-luxury-green focus:border-transparent"
            />
          </div>

          <div class="mb-6">
            <label for="dateOfBirth" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Date of Birth</label>
            <input
              id="dateOfBirth"
              v-model="profile.dateOfBirth"
              type="date"
              class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-luxury-green focus:border-transparent"
            />
          </div>

          <div class="flex gap-4">
            <button
              type="submit"
              :disabled="saving"
              class="flex-1 bg-luxury-green text-white px-6 py-3 rounded-full hover:bg-gold hover:text-luxury-green transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ saving ? 'Saving...' : 'Save Changes' }}
            </button>
            <button
              type="button"
              @click="resetForm"
              class="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
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

const { user, refreshProfile, checkAuth } = useAuth()
const toast = useToast()

const saving = ref(false)
const loading = ref(false)
const profile = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  dateOfBirth: ''
})

// Load user data
const loadProfile = () => {
  if (user.value) {
    profile.value = {
      firstName: user.value.firstName || '',
      lastName: user.value.lastName || '',
      email: user.value.email || '',
      phone: user.value.phone || '',
      dateOfBirth: user.value.dateOfBirth || ''
    }
  }
}

// Load profile data on mount
onMounted(async () => {
  loading.value = true
  try {
    // Ensure we have the latest user data
    await checkAuth()
    loadProfile()
  } catch (error) {
    console.error('Failed to load profile:', error)
    toast.error('Failed to load profile', 'Error')
  } finally {
    loading.value = false
  }
})

// Save profile
const saveProfile = async () => {
  // Prevent double submission
  if (saving.value) return

  saving.value = true

  try {
    // Call API to update profile
    const { data } = await useFetch('/api/account', {
      method: 'PUT',
      body: {
        firstName: profile.value.firstName,
        lastName: profile.value.lastName,
        phone: profile.value.phone,
        dateOfBirth: profile.value.dateOfBirth
      }
    })

    if (data.value?.success) {
      await refreshProfile()
      toast.success('Profile updated successfully', 'Success')
    }
  } catch (error) {
    toast.error('Failed to update profile', 'Error')
  } finally {
    saving.value = false
  }
}

// Reset form
const resetForm = () => {
  loadProfile()
}

useHead({
  title: 'Profile Settings - Gombian Boutique'
})
</script>
