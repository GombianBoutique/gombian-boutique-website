// composables/useAddresses.ts
import type { Ref } from 'vue'

export interface Address {
  id: string
  customerId: string
  type: 'shipping' | 'billing' | 'both'
  firstName: string
  lastName: string
  company?: string
  addressLine1: string
  addressLine2?: string
  city: string
  state: string
  postalCode: string
  country: string
  phone?: string
  isDefault: boolean
  createdAt?: string
  updatedAt?: string
}

export const useAddresses = () => {
  const addresses: Ref<Address[]> = ref([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Get token from cookie
  const getToken = (): string | null => {
    if (typeof window === 'undefined') return null
    const cookies = document.cookie.split(';')
    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split('=')
      if (name === 'auth_token') {
        return value
      }
    }
    return null
  }

  // Fetch addresses from API
  const fetchAddresses = async () => {
    const token = getToken()
    if (!token) {
      addresses.value = []
      return []
    }

    loading.value = true
    error.value = null

    try {
      const response = await $fetch('/api/account/addresses', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      addresses.value = response.data || []
      console.log(`Loaded ${addresses.value.length} addresses from API`)
      return addresses.value
    } catch (err: any) {
      console.error('Failed to fetch addresses:', err)
      error.value = err.message || 'Failed to fetch addresses'
      addresses.value = []
      return []
    } finally {
      loading.value = false
    }
  }

  // Add new address
  const addAddress = async (address: Omit<Address, 'id' | 'customerId' | 'createdAt' | 'updatedAt'>) => {
    const token = getToken()
    if (!token) {
      throw new Error('Authentication required')
    }

    loading.value = true
    error.value = null

    try {
      const response = await $fetch('/api/account/addresses', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: address
      })

      if (response.data) {
        addresses.value.push(response.data)
        console.log('Address added successfully')
      }

      return response.data
    } catch (err: any) {
      console.error('Failed to add address:', err)
      error.value = err.message || 'Failed to add address'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Update address
  const updateAddress = async (addressId: string, updates: Partial<Address>) => {
    const token = getToken()
    if (!token) {
      throw new Error('Authentication required')
    }

    loading.value = true
    error.value = null

    try {
      const response = await $fetch('/api/account/addresses', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: {
          id: addressId,
          ...updates
        }
      })

      // Update local state
      const index = addresses.value.findIndex(a => a.id === addressId)
      if (index !== -1) {
        addresses.value[index] = { ...addresses.value[index], ...updates }
      }

      console.log('Address updated successfully')
      return response.data
    } catch (err: any) {
      console.error('Failed to update address:', err)
      error.value = err.message || 'Failed to update address'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Delete address
  const deleteAddress = async (addressId: string) => {
    const token = getToken()
    if (!token) {
      throw new Error('Authentication required')
    }

    loading.value = true
    error.value = null

    try {
      await $fetch(`/api/account/addresses?id=${addressId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      // Remove from local state
      addresses.value = addresses.value.filter(a => a.id !== addressId)
      console.log('Address deleted successfully')

      return true
    } catch (err: any) {
      console.error('Failed to delete address:', err)
      error.value = err.message || 'Failed to delete address'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Get default shipping address
  const getDefaultShippingAddress = computed(() => {
    return addresses.value.find(a => a.isDefault && (a.type === 'shipping' || a.type === 'both')) ||
      addresses.value.find(a => a.type === 'shipping' || a.type === 'both')
  })

  // Get default billing address
  const getDefaultBillingAddress = computed(() => {
    return addresses.value.find(a => a.isDefault && (a.type === 'billing' || a.type === 'both')) ||
      addresses.value.find(a => a.type === 'billing' || a.type === 'both')
  })

  return {
    addresses,
    loading,
    error,
    fetchAddresses,
    addAddress,
    updateAddress,
    deleteAddress,
    getDefaultShippingAddress,
    getDefaultBillingAddress
  }
}
