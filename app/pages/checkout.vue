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
            currentStep === index ? 'bg-gold text-luxury-green dark:bg-luxury-green dark:text-white' :
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
                :disabled="!config.public.canPersist"
                class="h-4 w-4 text-luxury-green focus:ring-gold border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed"
              >
              <label for="guest-checkout" class="ml-2 text-sm text-gray-700 dark:text-gray-300">
                Continue as guest
              </label>
            </div>
          </div>
          
          <!-- Email validation error -->
          <div v-if="emailError" class="mt-2 text-red-600 dark:text-red-400 text-sm">
            {{ emailError }}
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
          :disabled="!config.public.canPersist"
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
          :disabled="!config.public.canPersist"
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

        <!-- Payment Method Options -->
        <div class="space-y-4 mb-6">
          <!-- Online Payment Option -->
          <div
            v-if="config.public.multiplePaymentMethods"
            @click="selectPaymentMethod('credit_card')"
            :class="[
              'border-2 rounded-xl p-6 cursor-pointer transition-all',
              checkoutData.paymentMethod === 'credit_card'
                ? 'border-luxury-green bg-luxury-green/5 dark:bg-luxury-green/10'
                : 'border-gray-200 dark:border-gray-700 hover:border-luxury-green/50'
            ]"
          >
            <div class="flex items-center">
              <input
                id="payment-credit"
                v-model="checkoutData.paymentMethod"
                type="radio"
                value="credit_card"
                class="h-4 w-4 text-luxury-green focus:ring-gold border-gray-300"
              >
              <label for="payment-credit" class="ml-3 flex-grow cursor-pointer">
                <span class="block text-lg font-bold text-luxury-green dark:text-white">Credit/Debit Card</span>
                <span class="block text-sm text-gray-600 dark:text-gray-400">Pay securely with PayFast</span>
              </label>
            </div>
          </div>

          <!-- Manual Payment Option -->
          <div
            @click="!config.public.multiplePaymentMethods ? null : selectPaymentMethod('manual')"
            :class="[
              'border-2 rounded-xl p-6 transition-all',
              checkoutData.paymentMethod === 'manual'
                ? 'border-luxury-green bg-luxury-green/5 dark:bg-luxury-green/10'
                : 'border-gray-200 dark:border-gray-700',
              !config.public.multiplePaymentMethods ? 'cursor-not-allowed opacity-75' : 'cursor-pointer hover:border-luxury-green/50'
            ]"
          >
            <div class="flex items-center">
              <input
                id="payment-manual"
                v-model="checkoutData.paymentMethod"
                type="radio"
                value="manual"
                :disabled="!config.public.multiplePaymentMethods"
                class="h-4 w-4 text-luxury-green focus:ring-gold border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
              <label 
                :for="config.public.multiplePaymentMethods ? 'payment-manual' : ''"
                :class="config.public.multiplePaymentMethods ? 'ml-3 flex-grow cursor-pointer' : 'ml-3 flex-grow cursor-not-allowed'"
              >
                <span class="block text-lg font-bold text-luxury-green dark:text-white">Manual Payment (EFT / Bank Transfer)</span>
                <span class="block text-sm text-gray-600 dark:text-gray-400">
                  {{ config.public.multiplePaymentMethods ? 'Pay via bank transfer and send proof of payment' : 'Payment method - Pay via bank transfer' }}
                </span>
              </label>
              <svg class="w-8 h-8 text-luxury-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <!-- Online Payment Details -->
        <div v-if="checkoutData.paymentMethod === 'credit_card'" class="ml-6">
          <PaymentForm @payment-complete="onPaymentComplete" />
        </div>

        <!-- Manual Payment Details -->
        <div v-if="checkoutData.paymentMethod === 'manual'" class="space-y-6">
          <div class="bg-luxury-green/10 dark:bg-gray-700 rounded-xl p-6">
            <h3 class="text-lg font-bold text-luxury-green dark:text-white mb-4">Bank Details for EFT</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p class="text-sm text-gray-600 dark:text-gray-400">Bank Name</p>
                <p class="font-bold text-gray-900 dark:text-white">FNB</p>
              </div>
              <div>
                <p class="text-sm text-gray-600 dark:text-gray-400">Account Name</p>
                <p class="font-bold text-gray-900 dark:text-white">Gombian Boutique</p>
              </div>
              <div>
                <p class="text-sm text-gray-600 dark:text-gray-400">Account Number</p>
                <p class="font-bold text-gray-900 dark:text-white">123456789</p>
              </div>
              <div>
                <p class="text-sm text-gray-600 dark:text-gray-400">Branch Code</p>
                <p class="font-bold text-gray-900 dark:text-white">250655</p>
              </div>
              <div>
                <p class="text-sm text-gray-600 dark:text-gray-400">Reference</p>
                <p class="font-bold text-gray-900 dark:text-white">{{ getReferenceNumber() }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-600 dark:text-gray-400">Account Type</p>
                <p class="font-bold text-gray-900 dark:text-white">Current</p>
              </div>
            </div>
          </div>

          <div class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4">
            <div class="flex">
              <svg class="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div class="ml-3">
                <h4 class="text-sm font-bold text-yellow-800 dark:text-yellow-300">Important Instructions</h4>
                <ul class="mt-2 text-sm text-yellow-700 dark:text-yellow-400 space-y-1">
                  <li>• Use your order number as the payment reference</li>
                  <li>• Send proof of payment to orders@gombianboutique.co.za</li>
                  <li>• Your order will be processed once payment is confirmed</li>
                  <li>• Payment must be made within 24 hours</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <label for="pop-upload" class="block text-sm font-medium text-luxury-green dark:text-gold mb-2">
              Upload Proof of Payment (Optional - can also email)
            </label>
            <input
              id="pop-upload"
              type="file"
              accept="image/*,.pdf"
              @change="handlePopUpload"
              class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
            <p v-if="popFile" class="mt-2 text-sm text-green-600 dark:text-green-400">
              ✓ {{ popFile.name }} uploaded
            </p>
            <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Accepted formats: JPG, PNG, PDF. Max size: 5MB
            </p>
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
            :disabled="!canPlaceOrder || placingOrder"
            :class="[
              'px-6 py-3 rounded-full',
              canPlaceOrder && !placingOrder
                ? 'bg-luxury-green text-white hover:bg-gold hover:text-luxury-green'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            ]"
          >
            <span v-if="placingOrder" class="flex items-center justify-center gap-2">
              <svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
            <span v-else>
              {{ checkoutData.paymentMethod === 'manual' ? 'Place Order (Pay Later)' : 'Place Order' }}
            </span>
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
          
          <!-- Payment Method Specific Instructions -->
          <div v-if="checkoutData.paymentMethod === 'manual'" class="mt-6 max-w-md mx-auto">
            <div class="bg-luxury-green/10 dark:bg-gray-700 rounded-xl p-6 text-left">
              <h3 class="font-bold text-luxury-green dark:text-white mb-3">Next Steps for Payment:</h3>
              <ol class="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li class="flex items-start">
                  <span class="font-bold mr-2">1.</span>
                  <span>Transfer the total amount to our bank account (details were shown on previous screen)</span>
                </li>
                <li class="flex items-start">
                  <span class="font-bold mr-2">2.</span>
                  <span>Use <strong>{{ orderNumber }}</strong> as your payment reference</span>
                </li>
                <li class="flex items-start">
                  <span class="font-bold mr-2">3.</span>
                  <span>Send proof of payment to <a href="mailto:orders@gombianboutique.co.za" class="text-luxury-green hover:underline">orders@gombianboutique.co.za</a></span>
                </li>
                <li class="flex items-start">
                  <span class="font-bold mr-2">4.</span>
                  <span>We'll process your order once payment is confirmed (within 24-48 hours)</span>
                </li>
              </ol>
            </div>
            <p v-if="popFile" class="mt-4 text-sm text-green-600 dark:text-green-400">
              ✓ Proof of payment ({{ popFileName }}) has been attached to your order confirmation email.
            </p>
          </div>
          
          <p v-else class="mt-4 text-gray-600 dark:text-gray-400">
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
import { useAddresses } from '~/composables/useAddresses'

definePageMeta({
  layout: 'default'
})

const config = useRuntimeConfig()
const cartStore = useCartStore()
const { data: user } = useAuth()
const toast = useToast()
const recaptchaSiteKey = config.public.recaptchaSiteKey
const { addresses, fetchAddresses, getDefaultShippingAddress, getDefaultBillingAddress } = useAddresses()

// Load saved addresses on mount for logged-in users
onMounted(async () => {
  if (user.value) {
    await fetchAddresses()
    // Pre-fill shipping address with default
    const defaultShipping = getDefaultShippingAddress.value
    if (defaultShipping) {
      checkoutData.shippingAddress = {
        firstName: defaultShipping.firstName,
        lastName: defaultShipping.lastName,
        addressLine1: defaultShipping.addressLine1,
        addressLine2: defaultShipping.addressLine2 || '',
        city: defaultShipping.city,
        state: defaultShipping.state,
        postalCode: defaultShipping.postalCode,
        country: defaultShipping.country,
        phone: defaultShipping.phone || '',
        isDefault: defaultShipping.isDefault
      }
    }
    // Pre-fill billing address with default
    const defaultBilling = getDefaultBillingAddress.value
    if (defaultBilling) {
      checkoutData.billingAddress = {
        firstName: defaultBilling.firstName,
        lastName: defaultBilling.lastName,
        addressLine1: defaultBilling.addressLine1,
        addressLine2: defaultBilling.addressLine2 || '',
        city: defaultBilling.city,
        state: defaultBilling.state,
        postalCode: defaultBilling.postalCode,
        country: defaultBilling.country,
        phone: defaultBilling.phone || '',
        isDefault: defaultBilling.isDefault
      }
    }
  }
})

const currentStep = ref(0)
const paymentCompleted = ref(false)
const orderPlaced = ref(false)
const placingOrder = ref(false)
const orderNumber = ref('')
const popFile = ref(null)
const popFileBase64 = ref(null)
const popFileName = ref('')
const emailError = ref('')
const form = reactive({
  recaptchaToken: ''
})

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
  isGuestCheckout: !config.public.canPersist, // Default based on flag
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
  paymentMethod: 'manual' // Default to manual payment
})

// Email validation function
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!email) {
    return 'Email is required'
  }
  if (!emailRegex.test(email)) {
    return 'Please enter a valid email address'
  }
  return ''
}

// Computed properties
const isShippingValid = computed(() => {
  const addr = checkoutData.shippingAddress
  return addr.firstName && addr.lastName && addr.addressLine1 &&
         addr.city && addr.state && addr.postalCode && addr.country
})

const canPlaceOrder = computed(() => {
  if (checkoutData.paymentMethod === 'manual') {
    return true // Manual payment doesn't require pre-payment
  }
  return paymentCompleted.value // Online payment requires payment completion
})

// Methods
const nextStep = () => {
  // Validate email on step 0
  if (currentStep.value === 0) {
    emailError.value = validateEmail(checkoutData.email)
    if (emailError.value) {
      toast.error(emailError.value, 'Invalid Email')
      return
    }
  }
  
  if (currentStep.value < steps.length - 1) {
    currentStep.value++
  }
}

// Load reCAPTCHA script on component mount
onMounted(() => {
  if (recaptchaSiteKey) {
    const script = document.createElement('script')
    script.src = `https://www.google.com/recaptcha/api.js?render=${recaptchaSiteKey}`
    script.async = true
    script.defer = true
    document.head.appendChild(script)
  }
})

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

const selectPaymentMethod = (method) => {
  checkoutData.paymentMethod = method
  if (method === 'manual') {
    // For manual payment, no need to wait for payment completion
    paymentCompleted.value = true
  }
}

const onPaymentComplete = () => {
  paymentCompleted.value = true
}

const handlePopUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024
    if (file.size > maxSize) {
      toast.error('File size must be less than 5MB', 'File Too Large')
      return
    }
    
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf']
    if (!allowedTypes.includes(file.type)) {
      toast.error('Only JPG, PNG, and PDF files are allowed', 'Invalid File Type')
      return
    }
    
    // Convert file to base64
    const reader = new FileReader()
    reader.onload = (e) => {
      popFileBase64.value = e.target.result
      popFile.value = file
      popFileName.value = file.name
      toast.success('Proof of payment uploaded', 'Upload Successful')
    }
    reader.onerror = () => {
      toast.error('Failed to read file', 'Upload Error')
    }
    reader.readAsDataURL(file)
  }
}

const getReferenceNumber = () => {
  // Generate a reference number based on email or timestamp
  const uniqueId = Date.now().toString().slice(-6)
  return `GB-${uniqueId}`
}

const placeOrder = async () => {
  // Prevent double submission - CRITICAL for order placement
  if (placingOrder.value) return

  placingOrder.value = true

  try {
    // Execute reCAPTCHA
    if (recaptchaSiteKey && window.grecaptcha) {
      await new Promise((resolve, reject) => {
        window.grecaptcha.ready(() => {
          window.grecaptcha.execute(recaptchaSiteKey, {
            action: 'checkout'
          }).then((token) => {
            form.recaptchaToken = token
            resolve(true)
          }).catch((err) => {
            console.error('reCAPTCHA error:', err)
            reject(err)
          })
        })
      })
    }

    // Create order data
    const orderData = {
      orderNumber: '', // Will be generated on server
      email: checkoutData.email,
      paymentMethod: checkoutData.paymentMethod,
      // Determine payment status based on method and POP upload
      paymentStatus: checkoutData.paymentMethod === 'manual' 
        ? (popFile.value !== null ? 'verifying' : 'pending')  // POP uploaded = verifying, otherwise pending
        : (paymentCompleted.value ? 'completed' : 'pending'),  // Online payment status
      shippingAddress: checkoutData.shippingAddress,
      billingAddress: checkoutData.sameAsShipping ? checkoutData.shippingAddress : checkoutData.billingAddress,
      items: cartStore.items,
      totals: {
        subtotal: cartStore.subtotal,
        shipping: cartStore.shippingCost,
        tax: cartStore.taxAmount,
        total: cartStore.totalPriceWithTaxAndShipping
      },
      hasPopUpload: popFile.value !== null,
      proofOfPayment: popFileBase64.value, // Base64 encoded file
      proofOfPaymentFileName: popFileName.value,
      recaptchaToken: form.recaptchaToken
    }

    // Submit order to API
    const { data, error } = await useFetch('/api/order', {
      method: 'POST',
      body: orderData
    })

    if (error.value) {
      throw new Error(error.value.statusMessage || 'Failed to place order')
    }

    // Get order number from response
    orderNumber.value = data.value?.orderNumber || `GB-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`

    // Clear cart after successful order
    cartStore.clearCart()

    // Show appropriate message based on payment method
    if (checkoutData.paymentMethod === 'manual') {
      toast.success('Order placed! Please send proof of payment.', 'Order Received')
    } else {
      toast.success('Order placed successfully!', 'Payment Confirmed')
    }

    placingOrder.value = false
    orderPlaced.value = true
    currentStep.value = 4
  } catch (error) {
    console.error('Order placement failed:', error)
    placingOrder.value = false
    const errorMessage = error.message || 'Failed to place order. Please try again.'
    toast.error(errorMessage, 'Order Error')
  }
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