import { ref, computed } from 'vue';

interface WishlistItem {
  productId: string;
  productName: string;
  productImage: string;
  price: number;
  addedAt: Date;
}

// Global wishlist state
const wishlistItems = ref<WishlistItem[]>([]);

/**
 * Composable to manage wishlist functionality
 */
export const useWishlist = () => {
  /**
   * Add an item to the wishlist
   */
  const addItem = (item: Omit<WishlistItem, 'addedAt'>) => {
    // Check if item is already in wishlist
    const existingItem = wishlistItems.value.find(i => i.productId === item.productId);
    
    if (!existingItem) {
      wishlistItems.value.push({
        ...item,
        addedAt: new Date()
      });
      
      // Save to localStorage
      saveWishlistToLocalStorage();
    }
  };

  /**
   * Remove an item from the wishlist
   */
  const removeItem = (productId: string) => {
    wishlistItems.value = wishlistItems.value.filter(item => item.productId !== productId);
    
    // Save to localStorage
    saveWishlistToLocalStorage();
  };

  /**
   * Check if an item is in the wishlist
   */
  const isInWishlist = (productId: string) => {
    return wishlistItems.value.some(item => item.productId === productId);
  };

  /**
   * Toggle an item in the wishlist
   */
  const toggleItem = (item: Omit<WishlistItem, 'addedAt'>) => {
    if (isInWishlist(item.productId)) {
      removeItem(item.productId);
    } else {
      addItem(item);
    }
  };

  /**
   * Clear the entire wishlist
   */
  const clearWishlist = () => {
    wishlistItems.value = [];
    
    // Save to localStorage
    saveWishlistToLocalStorage();
  };

  /**
   * Get the wishlist items
   */
  const getWishlistItems = computed(() => wishlistItems.value);

  /**
   * Get the wishlist item count
   */
  const getItemCount = computed(() => wishlistItems.value.length);

  /**
   * Save wishlist to localStorage
   */
  const saveWishlistToLocalStorage = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('wishlist', JSON.stringify(wishlistItems.value));
    }
  };

  /**
   * Load wishlist from localStorage
   */
  const loadWishlistFromLocalStorage = () => {
    if (typeof window !== 'undefined') {
      const savedWishlist = localStorage.getItem('wishlist');
      if (savedWishlist) {
        try {
          wishlistItems.value = JSON.parse(savedWishlist).map((item: any) => ({
            ...item,
            addedAt: new Date(item.addedAt) // Convert string back to Date
          }));
        } catch (error) {
          console.error('Failed to parse wishlist from localStorage:', error);
        }
      }
    }
  };

  // Initialize wishlist from localStorage when composable is used
  if (typeof window !== 'undefined') {
    loadWishlistFromLocalStorage();
  }

  return {
    addItem,
    removeItem,
    isInWishlist,
    toggleItem,
    clearWishlist,
    getWishlistItems,
    getItemCount
  };
};