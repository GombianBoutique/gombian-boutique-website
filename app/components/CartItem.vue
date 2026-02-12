<!-- components/CartItem.vue -->
<template>
  <li class="p-6 flex flex-col md:flex-row items-center border-b border-gray-200 dark:border-gray-700">
    <NuxtLink :to="`/products/${item.productId}`" class="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
      <NuxtImg 
        :src="item.productImage" 
        :alt="item.productName" 
        class="w-32 h-32 object-contain"
        :modifiers="{ fit: 'contain', width: 150, height: 150 }"
      />
    </NuxtLink>

    <div class="flex-grow text-center md:text-left">
      <h3 class="text-lg font-bold text-luxury-green dark:text-white">
        <NuxtLink :to="`/products/${item.productId}`" class="hover:text-gold">
          {{ item.productName }}
        </NuxtLink>
      </h3>
      <p class="text-gray-600 dark:text-gray-400 mt-1">SKU: {{ item.productId }}</p>
      <div class="mt-2 text-xl font-bold text-luxury-green dark:text-gold">
        {{ formatCurrency(item.unitPrice, currency) }}
      </div>
    </div>

    <div class="mt-6 md:mt-0 flex flex-col items-center">
      <div class="flex items-center border border-gray-300 dark:border-gray-600 rounded-md">
        <button 
          @click="decreaseQuantity"
          :disabled="item.quantity <= 1"
          class="px-4 py-2 text-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
        >
          -
        </button>
        <span class="px-4 py-2 text-gray-700 dark:text-gray-300">{{ item.quantity }}</span>
        <button 
          @click="increaseQuantity"
          :disabled="item.quantity >= item.inventoryCount"
          class="px-4 py-2 text-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
        >
          +
        </button>
      </div>
      <button 
        @click="removeFromCart"
        class="mt-4 text-red-600 dark:text-red-400 hover:underline"
      >
        Remove
      </button>
    </div>

    <div class="mt-6 md:mt-0 text-xl font-bold text-luxury-green dark:text-gold">
      {{ formatCurrency(item.totalPrice, currency) }}
    </div>
  </li>
</template>

<script setup>
import { formatCurrency } from '~/utils/formatting'

const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  currency: {
    type: String,
    default: 'ZAR'
  }
})

const emit = defineEmits(['quantity-change', 'remove-item'])

const increaseQuantity = () => {
  if (props.item.quantity < props.item.inventoryCount) {
    emit('quantity-change', props.item.productId, props.item.quantity + 1)
  }
}

const decreaseQuantity = () => {
  if (props.item.quantity > 1) {
    emit('quantity-change', props.item.productId, props.item.quantity - 1)
  }
}

const removeFromCart = () => {
  emit('remove-item', props.item.productId)
}
</script>