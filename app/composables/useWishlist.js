<!-- composables/useWishlist.js -->
export const useWishlist = () => {
  const wishlist = useState('wishlist', () => [])

  const addToWishlist = (product) => {
    // Check if product is already in wishlist
    const existingIndex = wishlist.value.findIndex(p => p.id === product.id)
    if (existingIndex !== -1) {
      // Product already in wishlist
      return false
    }

    // Add product to wishlist
    wishlist.value.push(product)
    return true
  }

  const removeFromWishlist = (productId) => {
    const index = wishlist.value.findIndex(p => p.id === productId)
    if (index !== -1) {
      wishlist.value.splice(index, 1)
      return true
    }
    return false
  }

  const clearWishlist = () => {
    wishlist.value = []
  }

  const isInWishlist = (productId) => {
    return wishlist.value.some(p => p.id === productId)
  }

  const getWishlistCount = () => {
    return wishlist.value.length
  }

  const toggleWishlist = (product) => {
    if (isInWishlist(product.id)) {
      return removeFromWishlist(product.id)
    } else {
      return addToWishlist(product)
    }
  }

  return {
    wishlist: readonly(wishlist),
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    isInWishlist,
    getWishlistCount,
    toggleWishlist
  }
}