// composables/useAuth.ts
import type { Customer } from '~/types/user'

// Key for useState - ensures shared state across all components
const AUTH_STATE_KEY = 'auth-state'

export interface AuthState {
  user: Customer | null
  isAuthenticated: boolean
  loading: boolean
  error: string | null
}

export const useAuth = () => {
  // Use useState for shared reactive state across all components
  const user = useState<Customer | null>(`${AUTH_STATE_KEY}-user`, () => null)
  const isAuthenticated = useState<boolean>(`${AUTH_STATE_KEY}-authenticated`, () => false)
  const loading = useState<boolean>(`${AUTH_STATE_KEY}-loading`, () => false)
  const error = useState<string | null>(`${AUTH_STATE_KEY}-error`, () => null)

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
    loading.value = true
    const token = getToken()
    
    if (!token) {
      isAuthenticated.value = false
      user.value = null
      loading.value = false
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
    } finally {
      loading.value = false
    }
  }

  // Login function with cart merge
  const login = async (email: string, password: string) => {
    loading.value = true
    error.value = null

    try {
      // Get guest cart before login (for merging later)
      let guestCart = null
      if (typeof window !== 'undefined') {
        const savedCart = localStorage.getItem('cart')
        if (savedCart) {
          try {
            guestCart = JSON.parse(savedCart)
            console.log(`[Auth] Found guest cart with ${guestCart.items?.length || 0} items before login`)
          } catch (e) {
            console.error('[Auth] Failed to parse guest cart:', e)
          }
        }
      }

      const response = await $fetch('/api/auth/login', {
        method: 'POST',
        body: { email, password }
      })

      if (response.data?.token) {
        setToken(response.data.token)
        isAuthenticated.value = true

        // Fetch full user profile from account endpoint
        await checkAuth()

        // Merge guest cart with user's cart if guest had items
        if (guestCart && guestCart.items && guestCart.items.length > 0) {
          await mergeGuestCartWithUserCart(guestCart)
        }
      }
    } catch (err: any) {
      error.value = err.message || 'Login failed'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Merge guest cart with user's cart on login
  const mergeGuestCartWithUserCart = async (guestCart: any) => {
    try {
      const token = getToken()
      if (!token) return

      // Fetch user's existing cart from API
      let userCart = null
      try {
        const userCartResponse = await $fetch('/api/cart', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        userCart = userCartResponse.data
      } catch (e) {
        console.log('[Auth] User has no existing cart, creating new one')
      }

      // Merge carts by combining items
      const mergedItems = [...(userCart?.items || [])]
      
      for (const guestItem of guestCart.items || []) {
        const existingIndex = mergedItems.findIndex(
          item => item.productId === guestItem.productId
        )
        
        if (existingIndex !== -1) {
          // Item exists in both carts - keep the higher quantity
          mergedItems[existingIndex].quantity = Math.max(
            mergedItems[existingIndex].quantity,
            guestItem.quantity
          )
          mergedItems[existingIndex].totalPrice = 
            mergedItems[existingIndex].unitPrice * mergedItems[existingIndex].quantity
          console.log(`[Auth] Merged duplicate item ${guestItem.productId}, quantity: ${mergedItems[existingIndex].quantity}`)
        } else {
          // New item - add to merged cart
          mergedItems.push({
            ...guestItem,
            addedAt: new Date().toISOString()
          })
          console.log(`[Auth] Added new item ${guestItem.productId} from guest cart`)
        }
      }

      // Save merged cart to API
      if (mergedItems.length > 0) {
        await $fetch('/api/cart', {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: {
            items: mergedItems,
            currency: guestCart.currency || 'ZAR'
          }
        })
        console.log(`[Auth] Merged cart saved: ${mergedItems.length} total items`)
        
        // Clear guest cart from localStorage
        localStorage.removeItem('cart')
      }
    } catch (error) {
      console.error('[Auth] Cart merge failed:', error)
      // Don't throw - cart merge failure shouldn't break login
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
      loading.value = false
      error.value = null
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