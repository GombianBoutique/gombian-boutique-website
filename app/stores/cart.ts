import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

interface CartItem {
  productId: string;
  productName: string;
  productImage: string;
  unitPrice: number;
  quantity: number;
  inventoryCount: number;
  totalPrice: number;
}

interface CartState {
  items: CartItem[];
  currency: string;
}

export const useCartStore = defineStore('cart', () => {
  // State
  const state = ref<CartState>({
    items: [],
    currency: 'USD'
  });

  // Getters
  const itemCount = computed(() => {
    return state.value.items.reduce((total, item) => total + item.quantity, 0);
  });

  const subtotal = computed(() => {
    return state.value.items.reduce((total, item) => total + item.totalPrice, 0);
  });

  const shippingCost = computed(() => {
    // Free shipping for orders over $50, otherwise $5.99
    return subtotal.value > 50 ? 0 : 5.99;
  });

  const taxRate = computed(() => 0.08); // 8% tax rate

  const taxAmount = computed(() => {
    return subtotal.value * taxRate.value;
  });

  const totalPriceWithTaxAndShipping = computed(() => {
    return subtotal.value + taxAmount.value + shippingCost.value;
  });

  // Actions
  const addItem = (item: Omit<CartItem, 'totalPrice'> & { totalPrice?: number }) => {
    const existingItem = state.value.items.find(i => i.productId === item.productId);

    if (existingItem) {
      // If item exists, update quantity
      const newQuantity = Math.min(existingItem.quantity + item.quantity, existingItem.inventoryCount);
      existingItem.quantity = newQuantity;
      existingItem.totalPrice = existingItem.unitPrice * newQuantity;
    } else {
      // If item doesn't exist, add new item
      const newItem: CartItem = {
        ...item,
        totalPrice: item.totalPrice || item.unitPrice * item.quantity
      };
      state.value.items.push(newItem);
    }

    // Save to localStorage
    saveCartToLocalStorage();
  };

  const removeItem = (productId: string) => {
    state.value.items = state.value.items.filter(item => item.productId !== productId);
    saveCartToLocalStorage();
  };

  const updateItemQuantity = (productId: string, quantity: number) => {
    const item = state.value.items.find(item => item.productId === productId);
    if (item) {
      item.quantity = Math.max(1, Math.min(quantity, item.inventoryCount));
      item.totalPrice = item.unitPrice * item.quantity;
      saveCartToLocalStorage();
    }
  };

  const clearCart = () => {
    state.value.items = [];
    saveCartToLocalStorage();
  };

  const setCurrency = (currency: string) => {
    state.value.currency = currency;
    saveCartToLocalStorage();
  };

  // Save cart to localStorage
  const saveCartToLocalStorage = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(state.value));
    }
  };

  // Initialize from localStorage if available
  if (typeof window !== 'undefined') {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        state.value = parsedCart;
      } catch (error) {
        console.error('Failed to parse cart from localStorage:', error);
      }
    }
  }

  return {
    // State
    items: state.value.items,
    currency: state.value.currency,

    // Getters
    itemCount,
    subtotal,
    shippingCost,
    taxRate,
    taxAmount,
    totalPriceWithTaxAndShipping,

    // Actions
    addItem,
    removeItem,
    updateItemQuantity,
    clearCart,
    setCurrency
  };
});