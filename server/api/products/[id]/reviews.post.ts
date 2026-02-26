// server/api/products/[id]/reviews.post.ts
import { defineEventHandler, readBody, createError, getRouterParam } from 'h3'

// In-memory reviews store (replace with database in production)
interface Review {
  id: string
  productId: string
  customerId: string
  customerName: string
  orderId?: string
  rating: number
  title?: string
  comment?: string
  verifiedPurchase: boolean
  helpfulCount: number
  createdAt: string
  updatedAt: string
}

const reviews: Review[] = []

export default defineEventHandler(async (event) => {
  try {
    const productId = getRouterParam(event, 'id')
    const body = await readBody(event)
    const { rating, title, comment, customerId, customerName, orderId, verifiedPurchase } = body

    // Validate required fields
    if (!productId || !rating || !customerName) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Product ID, rating, and customer name are required'
      })
    }

    // Validate rating
    if (rating < 1 || rating > 5) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Rating must be between 1 and 5'
      })
    }

    // Create review
    const newReview: Review = {
      id: `review-${Date.now()}`,
      productId,
      customerId: customerId || 'anonymous',
      customerName,
      orderId,
      rating,
      title,
      comment,
      verifiedPurchase: verifiedPurchase || false,
      helpfulCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    reviews.push(newReview)

    return {
      success: true,
      data: newReview
    }
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }
    
    console.error('Review submission error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to submit review'
    })
  }
})

export { reviews }
