<!-- pages/checkout.vue -->
<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-serif-display font-bold text-luxury-green dark:text-white mb-8">Checkout</h1>

    <!-- Multi-step indicator -->
    <div class="flex items-center justify-center mb-12">
      <div 
        v-for="(step, index) in steps" 
        :key="index"
        class="flex items-center"
      >
        <div 
          :class="[
            'w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold',
            currentStep > index ? 'bg-luxury-green text-white' : 
            currentStep === index ? 'bg-gold text-luxury-green' : 
            'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
          ]"
        >
          {{ index + 1 }}
        </div>
        <span 
          :class="[
            'ml-2 text-sm hidden md:inline',
            currentStep >= index ? 'text-luxury-green dark:text-white' : 'text-gray-500 dark:text-gray-400'
          ]"
        >
          {{ step.title }}
        </span>
        <div 
          v-if="index < steps.length - 1" 
          :class="[
            'h-0.5 w-16 md:w-24',
            currentStep > index ? 'bg-luxury-green' : 'bg-gray-200 dark:bg-gray-700'
          ]"
        ></div>
      </div>
    </div>

    <!-- Cart Items Summary (always visible) -->
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
      <h2 class="text-xl font-bold text-luxury-green dark:text-white mb-4">Order Summary</h2>
      <ul class="divide-y divide-gray-200 dark:divide-gray-700">
        <li 
          v-for="item in cartStore.items" 
          :key="item.productId"
          class="py-4 flex items-center"
        >
          <NuxtImg 
            :src="item.productImage" 
            :alt="item.productName" 
            class="w-16 h-16 object-contain mr-4"
            :modifiers="{ fit: 'contain', width: 80, height: 80 }"
          />
          <div class="flex-grow">
            <h3 class="font-medium text-gray-900 dark:text-white">{{ item.productName }}</h3>
            <p class="text-gray-600 dark:text-gray-400">Qty: {{ item.quantity }}</p>
          </div>
          <div class="text-luxury-green dark:text-gold font-bold">
            {{ formatCurrency(item.totalPrice, cartStore.currency) }}
          </div>
        </li>
      </ul>
      
      <div class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div class="flex justify-between mb-2">
          <span class="text-gray-600 dark:text-gray-400">Subtotal</span>
          <span class="text-gray-900 dark:text-white">{{ formatCurrency(cartStore.subtotal, cartStore.currency) }}</span>
        </div>
        <div class="flex justify-between mb-2">
          <span class="text-gray-600 dark:text-gray-400">Shipping</span>
          <span class="text-gray-900 dark:text-white">{{ formatCurrency(cartStore.shippingCost, cartStore.currency) }}</span>
        </div>
        <div class="flex justify-between mb-2">
          <span class="text-gray-600 dark:text-gray-400">Tax</span>
          <span class="text-gray-900 dark:text-white">{{ formatCurrency(cartStore.taxAmount, cartStore.currency) }}</span>
        </div>
        <div class="flex justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 font-bold">
          <span class="text-luxury-green dark:text-white">Total</span>
          <span class="text-luxury-green dark:text-gold">{{ formatCurrency(cartStore.totalPriceWithTaxAndShipping, cartStore.currency) }}</span>
        </div>
      </div>
    </div>

    <!-- Step Content -->
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
      <!-- Step 1: Contact Information -->
      <div v-if="currentStep === 0">
        <h2 class="text-xl font-bold text-luxury-green dark:text-white mb-6">Contact Information</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label for="email" class="block text-sm font-medium text-luxury-green dark:text-gold mb-2">Email</label>
            <input 
              id="email"
              v-model="checkoutData.email"
              type="email"
              required
              class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="your@email.com"
            >
          </div>
          <div class="flex items-end">
            <div class="flex items-center">
              <input 
                id="guest-checkout"
                v-model="checkoutData.isGuestCheckout"
                type="checkbox"
                class="h-4 w-4 text-luxury-green focus:ring-gold border-gray-300 rounded"
              >
              <label for="guest-checkout" class="ml-2 text-sm text-gray-700 dark:text-gray-300">
                Continue as guest
              </label>
            </div>
          </div>
        </div>
        
        <div class="mt-8 flex justify-end">
          <button 
            @click="nextStep"
            :disabled="!checkoutData.email"
            :class="[
              'px-6 py-3 rounded-full',
              checkoutData.email 
                ? 'bg-luxury-green text-white hover:bg-gold hover:text-luxury-green' 
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            ]"
          >
            Continue to Shipping
          </button>
        </div>
      </div>

      <!-- Step 2: Shipping Address -->
      <div v-if="currentStep === 1">
        <h2 class="text-xl font-bold text-luxury-green dark:text-white mb-6">Shipping Address</h2>
        <AddressForm 
          :address="checkoutData.shippingAddress"
          @update-address="updateShippingAddress"
        />
        
        <div class="mt-8 flex justify-between">
          <button 
            @click="prevStep"
            class="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Back
          </button>
          <button 
            @click="nextStep"
            :disabled="!isShippingValid"
            :class="[
              'px-6 py-3 rounded-full',
              isShippingValid 
                ? 'bg-luxury-green text-white hover:bg-gold hover:text-luxury-green' 
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            ]"
          >
            Continue to Billing
          </button>
        </div>
      </div>

      <!-- Step 3: Billing Address -->
      <div v-if="currentStep === 2">
        <h2 class="text-xl font-bold text-luxury-green dark:text-white mb-6">Billing Address</h2>
        
        <div class="mb-6">
          <div class="flex items-center">
            <input 
              id="same-as-shipping"
              v-model="checkoutData.sameAsShipping"
              type="checkbox"
              class="h-4 w-4 text-luxury-green focus:ring-gold border-gray-300 rounded"
            >
            <label for="same-as-shipping" class="ml-2 text-sm text-gray-700 dark:text-gray-300">
              Same as shipping address
            </label>
          </div>
        </div>
        
        <AddressForm 
          v-if="!checkoutData.sameAsShipping"
          :address="checkoutData.billingAddress"
          @update-address="updateBillingAddress"
        />
        <div v-else class="p-4 bg-luxury-green/10 dark:bg-gray-700 rounded-lg">
          <p class="text-luxury-green dark:text-gold font-medium">Using same address as shipping</p>
          <div class="mt-2 text-gray-700 dark:text-gray-300">
            <p>{{ checkoutData.shippingAddress.firstName }} {{ checkoutData.shippingAddress.lastName }}</p>
            <p>{{ checkoutData.shippingAddress.addressLine1 }}</p>
            <p>{{ checkoutData.shippingAddress.addressLine2 && checkoutData.shippingAddress.addressLine2 + ',' }} {{ checkoutData.shippingAddress.city }}, {{ checkoutData.shippingAddress.state }} {{ checkoutData.shippingAddress.postalCode }}</p>
            <p>{{ checkoutData.shippingAddress.country }}</p>
          </div>
        </div>
        
        <div class="mt-8 flex justify-between">
          <button 
            @click="prevStep"
            class="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Back
          </button>
          <button 
            @click="nextStep"
            class="px-6 py-3 bg-luxury-green text-white rounded-full hover:bg-gold hover:text-luxury-green"
          >
            Continue to Payment
          </button>
        </div>
      </div>

      <!-- Step 4: Payment -->
      <div v-if="currentStep === 3">
        <h2 class="text-xl font-bold text-luxury-green dark:text-white mb-6">Payment Method</h2>
        
        <div class="mb-6">
          <div class="flex items-center mb-4">
            <input 
              id="payment-credit"
              v-model="checkoutData.paymentMethod"
              type="radio"
              value="credit_card"
              class="h-4 w-4 text-luxury-green focus:ring-gold border-gray-300"
            >
            <label for="payment-credit" class="ml-2 text-sm text-gray-700 dark:text-gray-300">
              Credit/Debit Card
            </label>
          </div>
          
          <div v-if="checkoutData.paymentMethod === 'credit_card'" class="ml-6">
            <PaymentForm @payment-complete="onPaymentComplete" />
          </div>
        </div>
        
        <div class="mt-8 flex justify-between">
          <button 
            @click="prevStep"
            class="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Back
          </button>
          <button 
            @click="placeOrder"
            :disabled="!paymentCompleted"
            :class="[
              'px-6 py-3 rounded-full',
              paymentCompleted 
                ? 'bg-luxury-green text-white hover:bg-gold hover:text-luxury-green' 
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            ]"
          >
            Place Order
          </button>
        </div>
      </div>

      <!-- Step 5: Confirmation -->
      <div v-if="currentStep === 4">
        <div v-if="orderPlaced" class="text-center py-12">
          <svg class="mx-auto h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          <h2 class="mt-4 text-2xl font-bold text-luxury-green dark:text-white">Thank You for Your Order!</h2>
          <p class="mt-2 text-gray-600 dark:text-gray-400">Order #{{ orderNumber }}</p>
          <p class="mt-4 text-gray-600 dark:text-gray-400">
            We've emailed your order confirmation to {{ checkoutData.email }}.
          </p>
          <div class="mt-8">
            <NuxtLink to="/" class="luxury-button">
              Continue Shopping
            </NuxtLink>
          </div>
        </div>
        <div v-else-if="placingOrder" class="text-center py-12">
          <div class="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-luxury-green"></div>
          <p class="mt-4 text-luxury-green dark:text-gold">Processing your order...</p>
        </div>
        <div v-else class="text-center py-12">
          <p class="text-gray-600 dark:text-gray-400">There was an issue processing your order. Please try again.</p>
          <button 
            @click="retryOrder"
            class="mt-4 luxury-button"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { formatCurrency } from '~/utils/formatting'

definePageMeta({
  layout: 'default'
})

const cartStore = useCartStore()
const { data: user } = useAuth()

const currentStep = ref(0)
const paymentCompleted = ref(false)
const orderPlaced = ref(false)
const placingOrder = ref(false)
const orderNumber = ref('')

// Define steps
const steps = [
  { title: 'Contact' },
  { title: 'Shipping' },
  { title: 'Billing' },
  { title: 'Payment' },
  { title: 'Confirmation' }
]

// Initialize checkout data
const checkoutData = reactive({
  email: user?.value?.email || '',
  isGuestCheckout: true,
  shippingAddress: {
    firstName: '',
    lastName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'South Africa',
    isDefault: false
  },
  billingAddress: {
    firstName: '',
    lastName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'South Africa',
    isDefault: false
  },
  sameAsShipping: true,
  paymentMethod: 'credit_card'
})

// Computed properties
const isShippingValid = computed(() => {
  const addr = checkoutData.shippingAddress
  return addr.firstName && addr.lastName && addr.addressLine1 && 
         addr.city && addr.state && addr.postalCode && addr.country
})

// Methods
const nextStep = () => {
  if (currentStep.value < steps.length - 1) {
    currentStep.value++
  }
}

const prevStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--
  }
}

const updateShippingAddress = (address) => {
  Object.assign(checkoutData.shippingAddress, address)
}

const updateBillingAddress = (address) => {
  Object.assign(checkoutData.billingAddress, address)
}

const onPaymentComplete = () => {
  paymentCompleted.value = true
}

const placeOrder = async () => {
  placingOrder.value = true
  
  // Simulate order placement
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  // Generate a mock order number
  orderNumber.value = `GB-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`
  
  // Clear cart after successful order
  cartStore.clearCart()
  
  placingOrder.value = false
  orderPlaced.value = true
  currentStep.value = 4
}

const retryOrder = () => {
  placeOrder()
}

// Set page title
useHead({
  title: 'Checkout - Gombian Boutique',
  meta: [
    {
      hid: 'description',
      name: 'description',
      content: 'Complete your purchase at Gombian Boutique'
    }
  ]
})
</script>