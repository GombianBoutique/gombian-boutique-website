<!-- components/ProductReviews.vue -->
<template>
  <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
    <div class="flex justify-between items-center mb-6">
      <h3 class="text-xl font-bold text-luxury-green dark:text-white">Customer Reviews</h3>
      <button 
        @click="showWriteReview = true"
        class="px-4 py-2 bg-luxury-green text-white rounded-lg hover:bg-gold hover:text-luxury-green transition-colors"
      >
        Write Review
      </button>
    </div>

    <!-- Overall Rating Summary -->
    <div class="flex items-center mb-8 p-4 bg-luxury-green/5 dark:bg-gray-700 rounded-lg">
      <div class="text-center mr-6">
        <div class="text-5xl font-bold text-luxury-green dark:text-gold">{{ averageRating }}</div>
        <div class="flex justify-center mt-1">
          <StarRating :rating="averageRating" />
        </div>
        <div class="text-gray-600 dark:text-gray-400 text-sm">{{ totalReviews }} reviews</div>
      </div>
      <div class="flex-grow">
        <div 
          v-for="n in 5" 
          :key="n" 
          class="flex items-center mb-1"
        >
          <span class="text-sm text-gray-600 dark:text-gray-400 w-8">{{ 6 - n }}</span>
          <div class="flex-grow mx-2">
            <div class="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
              <div 
                class="bg-gold h-2 rounded-full" 
                :style="{ width: `${getRatingPercentage(6 - n)}%` }"
              ></div>
            </div>
          </div>
          <span class="text-sm text-gray-600 dark:text-gray-400 w-10">{{ getRatingCount(6 - n) }}</span>
        </div>
      </div>
    </div>

    <!-- Write Review Modal -->
    <div v-if="showWriteReview" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div class="p-6">
          <div class="flex justify-between items-center mb-4">
            <h4 class="text-lg font-bold text-luxury-green dark:text-white">Write a Review</h4>
            <button 
              @click="showWriteReview = false"
              class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          <form @submit.prevent="submitReview">
            <div class="mb-4">
              <label class="block text-gray-700 dark:text-gray-300 mb-2">Your Rating</label>
              <div class="flex space-x-1">
                <button 
                  v-for="n in 5" 
                  :key="n"
                  type="button"
                  @click="newReview.rating = n"
                  :class="[
                    'text-2xl',
                    n <= newReview.rating ? 'text-yellow-400' : 'text-gray-300'
                  ]"
                >
                  ★
                </button>
              </div>
            </div>

            <div class="mb-4">
              <label for="review-title" class="block text-gray-700 dark:text-gray-300 mb-2">Review Title</label>
              <input 
                id="review-title"
                v-model="newReview.title"
                type="text"
                class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Summarize your experience"
              >
            </div>

            <div class="mb-4">
              <label for="review-comment" class="block text-gray-700 dark:text-gray-300 mb-2">Your Review</label>
              <textarea 
                id="review-comment"
                v-model="newReview.comment"
                rows="4"
                class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Share your experience with this product"
              ></textarea>
            </div>

            <div class="flex justify-end space-x-3">
              <button 
                type="button" 
                @click="showWriteReview = false"
                class="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button 
                type="submit"
                :disabled="!canSubmitReview"
                :class="[
                  'px-4 py-2 rounded-lg',
                  canSubmitReview 
                    ? 'bg-luxury-green text-white hover:bg-gold hover:text-luxury-green' 
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                ]"
              >
                Submit Review
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Reviews List -->
    <div v-if="reviews.length > 0" class="space-y-6">
      <div 
        v-for="review in reviews" 
        :key="review.id"
        class="pb-6 border-b border-gray-200 dark:border-gray-700 last:border-0 last:pb-0"
      >
        <div class="flex justify-between">
          <div class="flex items-center">
            <div class="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
            <div class="ml-4">
              <h4 class="font-bold text-gray-900 dark:text-white">{{ review.customerName }}</h4>
              <div class="flex items-center">
                <StarRating :rating="review.rating" />
                <span class="ml-2 text-gray-500 dark:text-gray-400 text-sm">
                  {{ formatDate(review.createdAt) }}
                </span>
              </div>
            </div>
          </div>
          <span 
            v-if="review.verifiedPurchase" 
            class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-400"
          >
            Verified Purchase
          </span>
        </div>

        <div class="mt-4">
          <h5 class="font-bold text-gray-900 dark:text-white">{{ review.title }}</h5>
          <p class="mt-2 text-gray-600 dark:text-gray-400">{{ review.comment }}</p>
        </div>

        <div class="mt-4 flex space-x-4">
          <button 
            @click="toggleHelpful(review.id)"
            class="flex items-center text-sm text-gray-500 hover:text-luxury-green dark:hover:text-gold"
          >
            <svg 
              :class="[review.helpful ? 'text-luxury-green dark:text-gold' : '']" 
              class="w-4 h-4 mr-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905a3.61 3.61 0 01-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
            </svg>
            Helpful ({{ review.helpfulCount }})
          </button>
          <button class="text-sm text-gray-500 hover:text-luxury-green dark:hover:text-gold">
            Report
          </button>
        </div>
      </div>

      <!-- Load More Button -->
      <div v-if="hasMoreReviews" class="mt-8 text-center">
        <button 
          @click="loadMoreReviews"
          class="px-6 py-3 border border-luxury-green text-luxury-green rounded-full hover:bg-luxury-green hover:text-white transition-colors"
        >
          Load More Reviews
        </button>
      </div>
    </div>

    <!-- No Reviews Message -->
    <div v-else class="text-center py-8">
      <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
      <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-white">No reviews yet</h3>
      <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
        Be the first to review this product!
      </p>
    </div>
  </div>
</template>

<script setup>
import { formatDate } from '~/utils/formatting'

const props = defineProps({
  productId: {
    type: String,
    required: true
  }
})

// Sample reviews data - in a real app this would come from an API
const reviews = ref([
  {
    id: 'review-1',
    customerId: 'customer-1',
    customerName: 'Sarah J.',
    rating: 5,
    title: 'Absolutely love this scent!',
    comment: 'This perfume has become my signature scent. It\'s elegant and long-lasting with a beautiful floral bouquet that turns heads wherever I go.',
    createdAt: new Date('2026-01-10'),
    verifiedPurchase: true,
    helpfulCount: 12
  },
  {
    id: 'review-2',
    customerId: 'customer-2',
    customerName: 'Michael T.',
    rating: 4,
    title: 'Great everyday fragrance',
    comment: 'A lovely, subtle scent that\'s perfect for daily wear. Not too overpowering, and it lasts a good 6-8 hours.',
    createdAt: new Date('2026-01-08'),
    verifiedPurchase: true,
    helpfulCount: 5
  },
  {
    id: 'review-3',
    customerId: 'customer-3',
    customerName: 'Emma L.',
    rating: 5,
    title: 'Worth every penny',
    comment: 'The quality of this perfume is exceptional. The packaging is beautiful too, making it perfect as a gift.',
    createdAt: new Date('2026-01-05'),
    verifiedPurchase: true,
    helpfulCount: 8
  }
])

const showWriteReview = ref(false)
const newReview = ref({
  rating: 5,
  title: '',
  comment: ''
})

// Computed properties
const totalReviews = computed(() => reviews.value.length)
const averageRating = computed(() => {
  if (reviews.value.length === 0) return 0
  const sum = reviews.value.reduce((acc, review) => acc + review.rating, 0)
  return (sum / reviews.value.length).toFixed(1)
})

const hasMoreReviews = computed(() => {
  // In a real app, this would check if there are more reviews to load
  return false
})

const canSubmitReview = computed(() => {
  return newReview.value.title.trim() !== '' && newReview.value.comment.trim() !== ''
})

// Methods
const getRatingCount = (rating) => {
  return reviews.value.filter(r => r.rating === rating).length
}

const getRatingPercentage = (rating) => {
  if (reviews.value.length === 0) return 0
  return Math.round((getRatingCount(rating) / reviews.value.length) * 100)
}

const toggleHelpful = (reviewId) => {
  const review = reviews.value.find(r => r.id === reviewId)
  if (review) {
    review.helpful = !review.helpful
    review.helpfulCount = review.helpful ? review.helpfulCount + 1 : review.helpfulCount - 1
  }
}

const submitReview = () => {
  // In a real app, this would submit the review to an API
  const reviewToAdd = {
    id: `review-${reviews.value.length + 1}`,
    customerId: 'current-customer', // Would come from auth
    customerName: 'Current Customer', // Would come from auth
    rating: newReview.value.rating,
    title: newReview.value.title,
    comment: newReview.value.comment,
    createdAt: new Date(),
    verifiedPurchase: true, // Assuming verified purchase
    helpfulCount: 0
  }
  
  reviews.value.unshift(reviewToAdd)
  
  // Reset form
  newReview.value = {
    rating: 5,
    title: '',
    comment: ''
  }
  
  showWriteReview.value = false
  
  // Show success message
  const toast = useToast()
  toast.success('Thank you for your review!')
}

const loadMoreReviews = () => {
  // In a real app, this would load more reviews from an API
  console.log('Loading more reviews...')
}
</script>