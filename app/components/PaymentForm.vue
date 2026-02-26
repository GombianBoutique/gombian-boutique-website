<!-- components/PaymentForm.vue -->
<template>
  <div class="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
    <div class="mb-6">
      <label for="card-element" class="block text-sm font-medium text-luxury-green dark:text-gold mb-2">
        Credit or debit card
      </label>
      <div id="card-element" ref="cardElementRef" class="p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
        <!-- Stripe Elements will create form elements here -->
      </div>
      <div v-if="cardErrors" class="mt-2 text-sm text-red-600">{{ cardErrors }}</div>
    </div>

    <div class="mb-6">
      <label for="name-on-card" class="block text-sm font-medium text-luxury-green dark:text-gold mb-2">
        Name on card
      </label>
      <input
        id="name-on-card"
        v-model="cardholderName"
        type="text"
        required
        placeholder="Full name as it appears on card"
        class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
      >
    </div>

    <div class="flex items-center">
      <input
        id="save-card"
        v-model="saveCard"
        type="checkbox"
        class="h-4 w-4 text-luxury-green focus:ring-gold border-gray-300 rounded"
      >
      <label for="save-card" class="ml-2 text-sm text-gray-700 dark:text-gray-300">
        Save card for future purchases
      </label>
    </div>

    <div class="mt-6">
      <button
        @click="processPayment"
        :disabled="!isComplete || processing"
        :class="[
          'w-full py-3 px-4 rounded-full text-white font-medium transition-colors',
          !isComplete || processing
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-luxury-green hover:bg-gold hover:text-luxury-green'
        ]"
      >
        <span v-if="processing" class="flex items-center justify-center">
          <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Processing...
        </span>
        <span v-else>Pay {{ formatCurrency(totalAmount, currency) }}</span>
      </button>
    </div>

    <!-- Payment Status -->
    <div v-if="paymentStatus" :class="['mt-4 p-4 rounded-lg', paymentStatus.success ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20']">
      <p :class="['text-sm', paymentStatus.success ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200']">
        {{ paymentStatus.message }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { loadStripe } from '@stripe/stripe-js'
import { formatCurrency } from '~/utils/formatting'

const props = defineProps({
  totalAmount: {
    type: Number,
    default: 0
  },
  currency: {
    type: String,
    default: 'ZAR'
  }
})

const emit = defineEmits(['payment-complete', 'payment-error'])

// Stripe elements
let stripe = null
let elements = null
let cardElement = null

const cardholderName = ref('')
const cardErrors = ref('')
const saveCard = ref(false)
const isComplete = ref(false)
const processing = ref(false)
const paymentStatus = ref(null)

// Refs
const cardElementRef = ref(null)

// Initialize Stripe Elements
onMounted(async () => {
  const config = useRuntimeConfig()
  const stripePublicKey = config.public.stripePublicKey

  if (!stripePublicKey) {
    cardErrors.value = 'Stripe is not configured. Please contact support.'
    return
  }

  try {
    // Load Stripe
    stripe = await loadStripe(stripePublicKey)

    if (stripe) {
      elements = stripe.elements()
      cardElement = elements.create('card', {
        hidePostalCode: true,
        style: {
          base: {
            color: '#000',
            fontFamily: 'Inter, sans-serif',
            fontSmoothing: 'antialiased',
            fontSize: '16px',
            '::placeholder': {
              color: 'rgba(0,0,0,0.5)'
            }
          },
          invalid: {
            color: '#fa755a',
            iconColor: '#fa755a'
          }
        }
      })

      cardElement.mount('#card-element')

      cardElement.on('change', ({ error }) => {
        if (error) {
          cardErrors.value = error.message
          isComplete.value = false
        } else {
          cardErrors.value = ''
          isComplete.value = true
        }
      })
    }
  } catch (error) {
    console.error('Failed to load Stripe:', error)
    cardErrors.value = 'Failed to load payment form. Please refresh the page.'
  }
})

// Process payment
const processPayment = async () => {
  if (!stripe || !elements) {
    cardErrors.value = 'Payment system not loaded. Please refresh the page.'
    return
  }

  if (!cardholderName.value.trim()) {
    cardErrors.value = 'Please enter the name on the card'
    return
  }

  processing.value = true
  paymentStatus.value = null

  try {
    // Step 1: Create Payment Intent on server
    const { data: intentData } = await useFetch('/api/payment/create-intent', {
      method: 'POST',
      body: {
        amount: props.totalAmount * 100, // Convert to cents
        currency: props.currency.toLowerCase(),
        customerId: saveCard.value ? 'user-' + Date.now() : undefined
      }
    })

    if (!intentData.value?.success) {
      throw new Error('Failed to initialize payment')
    }

    const { clientSecret, paymentIntentId } = intentData.value.data

    // Step 2: Confirm payment with Stripe
    const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: cardholderName.value
        }
      }
    })

    if (confirmError) {
      throw new Error(confirmError.message)
    }

    if (paymentIntent.status === 'succeeded') {
      paymentStatus.value = {
        success: true,
        message: 'Payment successful! Your order is confirmed.'
      }
      
      emit('payment-complete', {
        paymentMethodId: paymentIntent.payment_method,
        paymentIntentId: paymentIntent.id,
        status: 'completed'
      })
    } else if (paymentIntent.status === 'requires_action') {
      // Handle 3D Secure authentication if needed
      const { error: actionError } = await stripe.confirmCardPayment(clientSecret)
      if (actionError) {
        throw new Error(actionError.message)
      }
      
      paymentStatus.value = {
        success: true,
        message: 'Payment successful! Your order is confirmed.'
      }
      
      emit('payment-complete', {
        paymentMethodId: paymentIntent.payment_method,
        paymentIntentId: paymentIntent.id,
        status: 'completed'
      })
    }
  } catch (error) {
    console.error('Payment error:', error)
    const errorMessage = error.message || 'Payment failed. Please try again.'
    
    paymentStatus.value = {
      success: false,
      message: errorMessage
    }
    
    emit('payment-error', error)
  } finally {
    processing.value = false
  }
}

// Cleanup
onUnmounted(() => {
  if (cardElement) {
    cardElement.destroy()
  }
})
</script>