// stores/user.ts
import { defineStore } from 'pinia'
import type { Customer, Address } from '~/types/user'

export interface UserState {
  currentUser: Customer | null
  isAuthenticated: boolean
  loading: boolean
  error: string | null
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    currentUser: null,
    isAuthenticated: false,
    loading: false,
    error: null
  }),

  getters: {
    isLoggedIn: (state) => state.isAuthenticated,
    getUser: (state) => state.currentUser,
    getUserAddresses: (state) => {
      if (!state.currentUser) return []
      return [...state.currentUser.shippingAddresses, ...state.currentUser.billingAddresses]
    },
    getDefaultShippingAddress: (state) => {
      if (!state.currentUser) return null
      return state.currentUser.shippingAddresses.find(addr => addr.isDefault) || 
             state.currentUser.shippingAddresses[0] || null
    },
    getDefaultBillingAddress: (state) => {
      if (!state.currentUser) return null
      return state.currentUser.billingAddresses.find(addr => addr.isDefault) || 
             state.currentUser.billingAddresses[0] || null
    }
  },

  actions: {
    async login(email: string, password: string) {
      this.loading = true
      this.error = null
      
      try {
        // In a real implementation, this would call an API
        // For now, we'll simulate the login process
        const response = await $fetch('/api/auth/login', {
          method: 'POST',
          body: { email, password }
        })
        
        this.currentUser = response.data
        this.isAuthenticated = true
        
        // Store token in cookie or localStorage
        const token = response.data.token
        if (token) {
          useCookie('auth_token').value = token
        }
      } catch (err: any) {
        this.error = err.message || 'Login failed'
        console.error('Login error:', err)
        throw err
      } finally {
        this.loading = false
      }
    },

    async register(userData: {
      email: string,
      password: string,
      firstName: string,
      lastName: string,
      dateOfBirth?: Date,
      preferences?: object
    }) {
      this.loading = true
      this.error = null
      
      try {
        const response = await $fetch('/api/auth/register', {
          method: 'POST',
          body: userData
        })
        
        this.currentUser = response.data
        this.isAuthenticated = true
        
        // Store token in cookie or localStorage
        const token = response.data.token
        if (token) {
          useCookie('auth_token').value = token
        }
      } catch (err: any) {
        this.error = err.message || 'Registration failed'
        console.error('Registration error:', err)
        throw err
      } finally {
        this.loading = false
      }
    },

    async logout() {
      this.currentUser = null
      this.isAuthenticated = false
      
      // Remove token from cookie or localStorage
      useCookie('auth_token').value = null
    },

    async fetchUserProfile() {
      if (!this.isAuthenticated || !this.currentUser?.id) {
        throw new Error('User not authenticated')
      }
      
      this.loading = true
      this.error = null
      
      try {
        const response = await $fetch(`/api/users/${this.currentUser.id}`)
        this.currentUser = response.data
      } catch (err: any) {
        this.error = err.message || 'Failed to fetch user profile'
        console.error('Error fetching user profile:', err)
        throw err
      } finally {
        this.loading = false
      }
    },

    async updateUserProfile(updates: Partial<Customer>) {
      if (!this.isAuthenticated || !this.currentUser?.id) {
        throw new Error('User not authenticated')
      }
      
      this.loading = true
      this.error = null
      
      try {
        const response = await $fetch(`/api/users/${this.currentUser.id}`, {
          method: 'PUT',
          body: updates
        })
        
        this.currentUser = { ...this.currentUser, ...response.data }
      } catch (err: any) {
        this.error = err.message || 'Failed to update user profile'
        console.error('Error updating user profile:', err)
        throw err
      } finally {
        this.loading = false
      }
    },

    async addAddress(address: Omit<Address, 'id' | 'customerId'>) {
      if (!this.isAuthenticated || !this.currentUser?.id) {
        throw new Error('User not authenticated')
      }
      
      this.loading = true
      this.error = null
      
      try {
        const response = await $fetch(`/api/users/${this.currentUser.id}/addresses`, {
          method: 'POST',
          body: address
        })
        
        // Update local state
        if (address.type === 'shipping') {
          this.currentUser.shippingAddresses.push(response.data)
        } else {
          this.currentUser.billingAddresses.push(response.data)
        }
      } catch (err: any) {
        this.error = err.message || 'Failed to add address'
        console.error('Error adding address:', err)
        throw err
      } finally {
        this.loading = false
      }
    },

    async updateAddress(addressId: string, updates: Partial<Address>) {
      if (!this.isAuthenticated || !this.currentUser?.id) {
        throw new Error('User not authenticated')
      }
      
      this.loading = true
      this.error = null
      
      try {
        const response = await $fetch(`/api/users/${this.currentUser.id}/addresses/${addressId}`, {
          method: 'PUT',
          body: updates
        })
        
        // Update local state
        const shippingIndex = this.currentUser.shippingAddresses.findIndex(addr => addr.id === addressId)
        if (shippingIndex !== -1) {
          this.currentUser.shippingAddresses[shippingIndex] = response.data
          return
        }
        
        const billingIndex = this.currentUser.billingAddresses.findIndex(addr => addr.id === addressId)
        if (billingIndex !== -1) {
          this.currentUser.billingAddresses[billingIndex] = response.data
        }
      } catch (err: any) {
        this.error = err.message || 'Failed to update address'
        console.error('Error updating address:', err)
        throw err
      } finally {
        this.loading = false
      }
    },

    async deleteAddress(addressId: string) {
      if (!this.isAuthenticated || !this.currentUser?.id) {
        throw new Error('User not authenticated')
      }
      
      this.loading = true
      this.error = null
      
      try {
        await $fetch(`/api/users/${this.currentUser.id}/addresses/${addressId}`, {
          method: 'DELETE'
        })
        
        // Update local state
        this.currentUser.shippingAddresses = this.currentUser.shippingAddresses.filter(addr => addr.id !== addressId)
        this.currentUser.billingAddresses = this.currentUser.billingAddresses.filter(addr => addr.id !== addressId)
      } catch (err: any) {
        this.error = err.message || 'Failed to delete address'
        console.error('Error deleting address:', err)
        throw err
      } finally {
        this.loading = false
      }
    }
  }
})