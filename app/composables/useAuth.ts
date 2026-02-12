// composables/useAuth.ts
import type { Customer } from '~/types/user'

export interface AuthState {
  user: Customer | null
  isAuthenticated: boolean
  loading: boolean
  error: string | null
}

export const useAuth = () => {
  const user = ref<Customer | null>(null)
  const isAuthenticated = ref(false)
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Get token from cookie
  const getToken = () => {
    const token = useCookie('auth_token')
    return token.value
  }

  // Set token in cookie
  const setToken = (token: string) => {
    const tokenCookie = useCookie('auth_token', {
      maxAge: 60 * 60 * 24 * 7, // 1 week
      sameSite: true,
      path: '/'
    })
    tokenCookie.value = token
  }

  // Remove token from cookie
  const removeToken = () => {
    const token = useCookie('auth_token')
    token.value = null
  }

  // Check if user is authenticated
  const checkAuth = async () => {
    const token = getToken()
    if (!token) {
      isAuthenticated.value = false
      return
    }

    try {
      // Verify token by fetching user profile
      const response = await $fetch('/api/account', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      user.value = response.data
      isAuthenticated.value = true
    } catch (err) {
      // Token is invalid or expired, remove it
      removeToken()
      isAuthenticated.value = false
      user.value = null
    }
  }

  // Login function
  const login = async (email: string, password: string) => {
    loading.value = true
    error.value = null

    try {
      const response = await $fetch('/api/auth/login', {
        method: 'POST',
        body: { email, password }
      })

      if (response.data?.token) {
        setToken(response.data.token)
        user.value = response.data
        isAuthenticated.value = true
      }
    } catch (err: any) {
      error.value = err.message || 'Login failed'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Register function
  const register = async (userData: {
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    dateOfBirth?: Date,
    preferences?: object
  }) => {
    loading.value = true
    error.value = null

    try {
      const response = await $fetch('/api/auth/register', {
        method: 'POST',
        body: userData
      })

      if (response.data?.token) {
        setToken(response.data.token)
        user.value = response.data
        isAuthenticated.value = true
      }
    } catch (err: any) {
      error.value = err.message || 'Registration failed'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Logout function
  const logout = async () => {
    try {
      // Call logout API to invalidate server-side session if needed
      await $fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${getToken()}`
        }
      })
    } catch (err) {
      // Even if API logout fails, clear local state
      console.error('Logout error (cleared local state anyway):', err)
    } finally {
      removeToken()
      user.value = null
      isAuthenticated.value = false
    }
  }

  // Refresh user profile
  const refreshProfile = async () => {
    if (!isAuthenticated.value) {
      throw new Error('User not authenticated')
    }

    try {
      const response = await $fetch('/api/account', {
        headers: {
          'Authorization': `Bearer ${getToken()}`
        }
      })

      user.value = response.data
    } catch (err) {
      console.error('Failed to refresh profile:', err)
      throw err
    }
  }

  return {
    user: readonly(user),
    isAuthenticated: readonly(isAuthenticated),
    loading: readonly(loading),
    error: readonly(error),
    getToken,
    setToken,
    removeToken,
    checkAuth,
    login,
    register,
    logout,
    refreshProfile
  }
}