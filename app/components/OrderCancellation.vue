<!-- components/OrderCancellation.vue -->
<template>
  <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
    <h3 class="text-xl font-bold text-luxury-green dark:text-white mb-4">Cancel Order</h3>
    
    <div v-if="order.status === 'processing'" class="mb-6">
      <p class="text-gray-600 dark:text-gray-400 mb-4">
        You can cancel your order if it hasn't been shipped yet. Once cancelled, you'll receive a refund according to our refund policy.
      </p>
      
      <div class="flex items-start mb-4">
        <input 
          id="confirm-cancel" 
          v-model="confirmCancellation" 
          type="checkbox" 
          class="mt-1 h-4 w-4 text-luxury-green focus:ring-gold border-gray-300 rounded"
        >
        <label for="confirm-cancel" class="ml-2 text-sm text-gray-700 dark:text-gray-300">
          I confirm that I want to cancel this order
        </label>
      </div>
      
      <button 
        @click="requestCancellation"
        :disabled="!confirmCancellation"
        :class="[
          'px-6 py-3 rounded-full',
          confirmCancellation 
            ? 'bg-red-600 text-white hover:bg-red-700' 
            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
        ]"
      >
        Request Cancellation
      </button>
    </div>
    
    <div v-else-if="order.status === 'delivered'" class="mb-6">
      <p class="text-gray-600 dark:text-gray-400 mb-4">
        Your order has been delivered. You can initiate a return if you're not satisfied with the products.
      </p>
      
      <button 
        @click="initiateReturn"
        class="px-6 py-3 bg-luxury-green text-white rounded-full hover:bg-gold hover:text-luxury-green"
      >
        Initiate Return
      </button>
    </div>
    
    <div v-else class="text-gray-600 dark:text-gray-400">
      <p>Order cancellation is only available for orders in the "processing" status.</p>
      <p class="mt-2">Current status: <span class="font-semibold">{{ order.status }}</span></p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  order: {
    type: Object,
    required: true
  }
})

const confirmCancellation = ref(false)

const requestCancellation = () => {
  // In a real app, this would call an API to request cancellation
  console.log('Cancellation requested for order:', props.order.id)
  
  // Show success message
  const toast = useToast()
  toast.success('Cancellation request submitted. You will receive an email confirmation shortly.')
  
  // Update order status locally (in a real app, this would come from API)
  props.order.status = 'cancelled'
}

const initiateReturn = () => {
  // In a real app, this would open a return request form
  console.log('Initiating return for order:', props.order.id)
  
  // Show success message
  const toast = useToast()
  toast.info('Return process initiated. You will receive instructions via email.')
}
</script>