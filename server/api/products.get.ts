// server/api/products.get.ts
import { products } from '../data/products'

export default defineEventHandler((event) => {
  // Extract query parameters
  const query = getQuery(event)
  
  let filteredProducts = [...products]
  
  // Filter by category if provided
  if (query.category) {
    filteredProducts = filteredProducts.filter(
      product => product.category.toLowerCase().includes(query.category!.toString().toLowerCase())
    )
  }
  
  // Filter by gender if provided
  if (query.gender) {
    filteredProducts = filteredProducts.filter(
      product => product.gender.toLowerCase() === query.gender!.toString().toLowerCase()
    )
  }
  
  // Filter by fragrance family if provided
  if (query.fragranceFamily) {
    filteredProducts = filteredProducts.filter(
      product => product.fragranceFamily.toLowerCase().includes(query.fragranceFamily!.toString().toLowerCase())
    )
  }
  
  // Filter by inStock status if provided
  if (query.inStock !== undefined) {
    const inStockOnly = query.inStock === 'true'
    filteredProducts = filteredProducts.filter(
      product => product.inStock === inStockOnly
    )
  }
  
  // Apply search query if provided
  if (query.q) {
    const searchTerm = query.q.toString().toLowerCase()
    filteredProducts = filteredProducts.filter(
      product =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.scentNotes.some(note => note.toLowerCase().includes(searchTerm))
    )
  }
  
  // Pagination
  const page = parseInt(query.page as string) || 1
  const limit = parseInt(query.limit as string) || 12
  const startIndex = (page - 1) * limit
  const endIndex = page * limit
  
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex)
  const totalPages = Math.ceil(filteredProducts.length / limit)
  
  return {
    products: paginatedProducts,
    pagination: {
      currentPage: page,
      totalPages,
      totalProducts: filteredProducts.length,
      hasNext: endIndex < filteredProducts.length,
      hasPrev: startIndex > 0
    }
  }
})