<!-- components/PaymentForm.vue -->
<template>
  <div class="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
    <div class="mb-6">
      <label for="card-element" class="block text-sm font-medium text-luxury-green dark:text-gold mb-2">
        Credit or debit card
      </label>
      <div id="card-element" ref="cardElement" class="p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
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
        :disabled="!isComplete"
        :class="[
          'w-full py-3 px-4 rounded-full text-white font-medium',
          isComplete 
            ? 'bg-luxury-green hover:bg-gold hover:text-luxury-green' 
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        ]"
      >
        Pay {{ formatCurrency(totalAmount, currency) }}
      </button>
    </div>
  </div>
</template>

<script setup>
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

const emit = defineEmits(['payment-complete'])

// Stripe elements
let stripe = null
let elements = null
let cardElement = null

const cardholderName = ref('')
const cardErrors = ref('')
const saveCard = ref(false)
const isComplete = ref(false)

// Refs
const cardElementRef = ref(null)

// Initialize Stripe Elements
onMounted(async () => {
  // Load Stripe.js dynamically
  const stripePublicKey = useRuntimeConfig().public.stripePublicKey
  
  if (!stripePublicKey) {
    console.error('Stripe public key is not configured')
    return
  }

  // Dynamically load Stripe
  const stripeJs = await loadStripe(stripePublicKey)
  stripe = stripeJs

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
})

// Process payment
const processPayment = async () => {
  if (!stripe || !elements) {
    console.error('Stripe.js hasn\'t loaded yet')
    return
  }

  const { error, paymentMethod } = await stripe.createPaymentMethod({
    type: 'card',
    card: cardElement,
    billing_details: {
      name: cardholderName.value,
    },
  })

  if (error) {
    cardErrors.value = error.message
  } else {
    // Payment method created successfully
    console.log('Payment method created:', paymentMethod)
    
    // In a real application, you would send the paymentMethod.id to your server
    // to complete the payment process
    
    // Emit payment complete event
    emit('payment-complete', paymentMethod)
  }
}

// Cleanup
onUnmounted(() => {
  if (cardElement) {
    cardElement.destroy()
  }
})
</script>