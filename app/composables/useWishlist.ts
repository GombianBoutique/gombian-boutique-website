import { ref, computed } from 'vue';

interface WishlistItem {
  productId: string;
  productName: string;
  productImage: string;
  price: number;
  addedAt: Date;
}

// Global wishlist state using useState for SSR compatibility
const useWishlistState = () => useState<WishlistItem[]>('wishlist', () => [])

/**
 * Composable to manage wishlist functionality
 */
export const useWishlist = () => {
  const wishlistItems = useWishlistState()

  // Initialize from localStorage on client side
  if (process.client && typeof window !== 'undefined') {
    const savedWishlist = localStorage.getItem('wishlist')
    if (savedWishlist && wishlistItems.value.length === 0) {
      try {
        const parsed = JSON.parse(savedWishlist)
        wishlistItems.value = parsed.map((item: any) => ({
          ...item,
          addedAt: new Date(item.addedAt)
        }))
      } catch (error) {
        console.error('Failed to load wishlist from localStorage:', error)
      }
    }
  }

  // Save to localStorage whenever wishlist changes
  watch(wishlistItems, (newItems) => {
    if (process.client && typeof window !== 'undefined') {
      localStorage.setItem('wishlist', JSON.stringify(newItems))
    }
  }, { deep: true })

  /**
   * Add an item to the wishlist
   */
  const addItem = (item: Omit<WishlistItem, 'addedAt'>) => {
    const existingItem = wishlistItems.value.find(i => i.productId === item.productId)

    if (!existingItem) {
      wishlistItems.value.push({
        ...item,
        addedAt: new Date()
      })
    }
  }

  /**
   * Remove an item from the wishlist
   */
  const removeItem = (productId: string) => {
    wishlistItems.value = wishlistItems.value.filter(item => item.productId !== productId)
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
  const toggleItem = (item: Omit<WishlistItem, 'addedAt'>) => {
    if (isInWishlist(item.productId)) {
      removeItem(item.productId)
    } else {
      addItem(item)
    }
  }

  /**
   * Clear the entire wishlist
   */
  const clearWishlist = () => {
    wishlistItems.value = []
  }

  /**
   * Get the wishlist items
   */
  const wishlist = computed(() => wishlistItems.value)

  /**
   * Get the wishlist item count
   */
  const getItemCount = computed(() => wishlistItems.value.length)

  return {
    wishlist,
    addItem,
    removeItem,
    isInWishlist,
    toggleItem,
    clearWishlist,
    getItemCount
  }
}