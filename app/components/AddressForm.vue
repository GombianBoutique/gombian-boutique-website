<!-- components/AddressForm.vue -->
<template>
  <form class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div class="md:col-span-2">
      <h3 class="text-lg font-bold text-luxury-green dark:text-white mb-4">Address Information</h3>
    </div>
    
    <div>
      <label for="firstName" class="block text-sm font-medium text-luxury-green dark:text-gold mb-2">First Name</label>
      <input 
        id="firstName"
        v-model="localAddress.firstName"
        type="text"
        required
        class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        @input="updateAddress"
      >
    </div>
    
    <div>
      <label for="lastName" class="block text-sm font-medium text-luxury-green dark:text-gold mb-2">Last Name</label>
      <input 
        id="lastName"
        v-model="localAddress.lastName"
        type="text"
        required
        class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        @input="updateAddress"
      >
    </div>
    
    <div class="md:col-span-2">
      <label for="addressLine1" class="block text-sm font-medium text-luxury-green dark:text-gold mb-2">Address Line 1</label>
      <input 
        id="addressLine1"
        v-model="localAddress.addressLine1"
        type="text"
        required
        class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        @input="updateAddress"
      >
    </div>
    
    <div class="md:col-span-2">
      <label for="addressLine2" class="block text-sm font-medium text-luxury-green dark:text-gold mb-2">Address Line 2 (Optional)</label>
      <input 
        id="addressLine2"
        v-model="localAddress.addressLine2"
        type="text"
        class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        @input="updateAddress"
      >
    </div>
    
    <div>
      <label for="city" class="block text-sm font-medium text-luxury-green dark:text-gold mb-2">City</label>
      <input 
        id="city"
        v-model="localAddress.city"
        type="text"
        required
        class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        @input="updateAddress"
      >
    </div>
    
    <div>
      <label for="state" class="block text-sm font-medium text-luxury-green dark:text-gold mb-2">State/Province</label>
      <input 
        id="state"
        v-model="localAddress.state"
        type="text"
        required
        class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        @input="updateAddress"
      >
    </div>
    
    <div>
      <label for="postalCode" class="block text-sm font-medium text-luxury-green dark:text-gold mb-2">Postal Code</label>
      <input 
        id="postalCode"
        v-model="localAddress.postalCode"
        type="text"
        required
        class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        @input="updateAddress"
      >
    </div>
    
    <div>
      <label for="country" class="block text-sm font-medium text-luxury-green dark:text-gold mb-2">Country</label>
      <select 
        id="country"
        v-model="localAddress.country"
        required
        class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        @change="updateAddress"
      >
        <option value="South Africa">South Africa</option>
        <option value="United States">United States</option>
        <option value="United Kingdom">United Kingdom</option>
        <option value="Canada">Canada</option>
        <option value="Australia">Australia</option>
        <option value="Germany">Germany</option>
        <option value="France">France</option>
        <option value="Italy">Italy</option>
        <option value="Japan">Japan</option>
        <option value="Other">Other</option>
      </select>
    </div>
    
    <div class="md:col-span-2 flex items-center">
      <input 
        id="isDefault"
        v-model="localAddress.isDefault"
        type="checkbox"
        class="h-4 w-4 text-luxury-green focus:ring-gold border-gray-300 rounded"
        @change="updateAddress"
      >
      <label for="isDefault" class="ml-2 text-sm text-gray-700 dark:text-gray-300">
        Save as default address
      </label>
    </div>
  </form>
</template>

<script setup>
const props = defineProps({
  address: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update-address'])

// Create a local copy of the address to avoid direct mutation
const localAddress = ref({ ...props.address })

// Watch for changes in the prop and update local copy
watch(() => props.address, (newAddress) => {
  localAddress.value = { ...newAddress }
})

// Update the parent when local address changes
const updateAddress = () => {
  emit('update-address', { ...localAddress.value })
}
</script>