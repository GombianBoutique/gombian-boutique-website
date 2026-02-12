<!-- composables/useProductComparison.js -->
export const useProductComparison = () => {
  const MAX_COMPARISON_ITEMS = 4
  const comparisonList = useState('productComparison', () => [])

  const addToComparison = (product) => {
    // Check if product is already in comparison list
    const existingIndex = comparisonList.value.findIndex(p => p.id === product.id)
    if (existingIndex !== -1) {
      // Product already in comparison list
      return false
    }

    // Check if we've reached the maximum number of items
    if (comparisonList.value.length >= MAX_COMPARISON_ITEMS) {
      // Remove the first item to make space
      comparisonList.value.shift()
    }

    // Add product to comparison list
    comparisonList.value.push(product)
    return true
  }

  const removeFromComparison = (productId) => {
    const index = comparisonList.value.findIndex(p => p.id === productId)
    if (index !== -1) {
      comparisonList.value.splice(index, 1)
      return true
    }
    return false
  }

  const clearComparison = () => {
    comparisonList.value = []
  }

  const isInComparison = (productId) => {
    return comparisonList.value.some(p => p.id === productId)
  }

  const getComparisonCount = () => {
    return comparisonList.value.length
  }

  return {
    comparisonList: readonly(comparisonList),
    addToComparison,
    removeFromComparison,
    clearComparison,
    isInComparison,
    getComparisonCount,
    MAX_COMPARISON_ITEMS
  }
}