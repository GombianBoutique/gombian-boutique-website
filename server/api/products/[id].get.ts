// server/api/products/[id].get.ts
import { products } from '../../data/products'

export default defineEventHandler((event) => {
  const id = getRouterParam(event, 'id')
  
  const product = products.find(p => p.id === id)
  
  if (!product) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Product not found'
    })
  }
  
  return product
})