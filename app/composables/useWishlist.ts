import { ref, computed, watch, onMounted } from 'vue';
import { useAuth } from './useAuth';

interface WishlistItem {
  productId: string;
  productName: string;
  productImage: string;
  price: number;
  addedAt: string;
}

// Global wishlist state using useState for SSR compatibility
const useWishlistState = () => useState<WishlistItem[]>('wishlist', () => [])

/**
 * Validate and migrate old wishlist items to the current format
 */
const validateWishlistItem = (item: any): WishlistItem | null => {
  // Must have productId to be valid
  if (!item || !item.productId) {
    return null;
  }

  // Migrate old format to new format with fallbacks
  return {
    productId: item.productId,
    productName: item.productName || 'Unknown Product',
    productImage: item.productImage || '',
    price: typeof item.price === 'number' ? item.price : 0,
    addedAt: item.addedAt || new Date().toISOString()
  };
};

/**
 * Save wishlist to localStorage
 */
const saveToLocalStorage = (items: WishlistItem[]) => {
  if (process.client && typeof window !== 'undefined') {
    localStorage.setItem('wishlist', JSON.stringify(items))
  }
}

/**
 * Load wishlist from localStorage
 */
const loadFromLocalStorage = (): WishlistItem[] | null => {
  if (!process.client || typeof window === 'undefined') {
    return null
  }

  const savedWishlist = localStorage.getItem('wishlist')
  if (!savedWishlist) {
    return null
  }

  try {
    const parsed = JSON.parse(savedWishlist)
    return parsed
      .map((item: any) => validateWishlistItem(item))
      .filter((item: WishlistItem | null): item is WishlistItem => item !== null)
  } catch (error) {
    console.error('Failed to load wishlist from localStorage:', error)
    localStorage.removeItem('wishlist')
    return null
  }
};

/**
 * Fetch wishlist from backend API for logged-in users
 */
const fetchWishlistFromApi = async (token: string): Promise<WishlistItem[]> => {
  try {
    const response = await $fetch('/api/wishlist', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    return response.data || []
  } catch (error) {
    console.error('Failed to fetch wishlist from API:', error)
    return []
  }
}

/**
 * Sync wishlist to backend API for logged-in users
 */
const syncWishlistToApi = async (token: string, items: WishlistItem[]) => {
  try {
    await $fetch('/api/wishlist', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: { items }
    })
    console.log('Synced wishlist to API:', items.length, 'items')
  } catch (error) {
    console.error('Failed to sync wishlist to API:', error)
  }
}

/**
 * Composable to manage wishlist functionality
 */
export const useWishlist = () => {
  const wishlistItems = useWishlistState()
  const isInitialized = ref(false)
  const isLoading = ref(false)
  const { user, getToken } = useAuth()

  // Initialize from localStorage or API on mount
  const initialize = async () => {
    if (isInitialized.value) return
    isInitialized.value = true
    isLoading.value = true

    try {
      // Check if user is logged in
      const token = getToken()
      
      if (token) {
        // Fetch wishlist from API for logged-in users
        console.log('Fetching wishlist from API for logged-in user')
        const apiItems = await fetchWishlistFromApi(token)
        if (apiItems && apiItems.length > 0) {
          wishlistItems.value = apiItems
          console.log(`Loaded ${apiItems.length} items from API`)
        }
      } else if (process.client) {
        // Load from localStorage for guest users
        const storedItems = loadFromLocalStorage()
        if (storedItems && storedItems.length > 0) {
          wishlistItems.value = storedItems
          console.log(`Loaded ${storedItems.length} items from localStorage`)
        }
      }
    } catch (error) {
      console.error('Failed to initialize wishlist:', error)
    } finally {
      isLoading.value = false
    }
  }

  // Watch for auth state changes and sync wishlist
  watch([wishlistItems, user], async (newItems) => {
    if (!isInitialized.value) return

    // Save to localStorage for guest users
    if (process.client) {
      const token = getToken()
      if (!token) {
        saveToLocalStorage(newItems[0])
        console.log(`Saved ${newItems[0].length} items to localStorage`)
      } else {
        // Sync to API for logged-in users
        await syncWishlistToApi(token, newItems[0])
      }
    }
  }, { deep: true })

  /**
   * Add an item to the wishlist
   */
  const addItem = async (item: Omit<WishlistItem, 'addedAt'>) => {
    const existingItem = wishlistItems.value.find(i => i.productId === item.productId)

    if (!existingItem) {
      const newItem: WishlistItem = {
        ...item,
        addedAt: new Date().toISOString()
      }
      wishlistItems.value = [...wishlistItems.value, newItem]
      console.log('Added item to wishlist:', item.productId)
      
      // Sync to API if logged in
      const token = getToken()
      if (token && process.client) {
        await syncWishlistToApi(token, wishlistItems.value)
      }
    } else {
      console.log('Item already in wishlist:', item.productId)
    }
  }

  /**
   * Remove an item from the wishlist
   */
  const removeItem = async (productId: string) => {
    const beforeCount = wishlistItems.value.length
    wishlistItems.value = wishlistItems.value.filter(item => item.productId !== productId)
    console.log(`Removed item from wishlist: ${productId} (before: ${beforeCount}, after: ${wishlistItems.value.length})`)
    
    // Sync to API if logged in
    const token = getToken()
    if (token && process.client) {
      await syncWishlistToApi(token, wishlistItems.value)
    }
  }

  /**
   * Check if an item is in the wishlist
   */
  const isInWishlist = (productId: string) => {
    return wishlistItems.value.some(item => item.productId === productId)
  }

  /**
   * Toggle an item in the wishlist
   */
  const toggleItem = async (item: Omit<WishlistItem, 'addedAt'>) => {
    if (isInWishlist(item.productId)) {
      await removeItem(item.productId)
    } else {
      await addItem(item)
    }
  }

  /**
   * Clear the entire wishlist
   */
  const clearWishlist = async () => {
    console.log('Clearing wishlist, was:', wishlistItems.value.length)
    wishlistItems.value = []
    
    // Sync to API if logged in
    const token = getToken()
    if (token && process.client) {
      await syncWishlistToApi(token, [])
    }
  }

  /**
   * Reset wishlist and clear localStorage
   */
  const resetWishlist = async () => {
    console.log('Resetting wishlist completely')
    wishlistItems.value = []
    if (process.client) {
      localStorage.removeItem('wishlist')
      // Also clear from API if logged in
      const token = getToken()
      if (token) {
        await syncWishlistToApi(token, [])
      }
    }
  }

  /**
   * Get the wishlist items
   */
  const wishlist = computed(() => wishlistItems.value)

  /**
   * Get the wishlist item count
   */
  const getItemCount = computed(() => wishlistItems.value.length)

  // Initialize on composable creation
  if (process.client) {
    initialize()
  }

  return {
    wishlist,
    addItem,
    removeItem,
    isInWishlist,
    toggleItem,
    clearWishlist,
    getItemCount,
    resetWishlist,
    initialize,
    isLoading
  }
}