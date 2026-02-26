import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';

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
    currency: 'ZAR'
  });

  const isInitialized = ref(false);
  const isSyncing = ref(false);

  // Get token from cookie (same as useAuth)
  const getToken = (): string | null => {
    if (typeof window === 'undefined') return null;
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (name === 'auth_token') {
        return value;
      }
    }
    return null;
  };

  // Getters
  const itemCount = computed(() => {
    return state.value.items.reduce((total, item) => total + item.quantity, 0);
  });

  const subtotal = computed(() => {
    return state.value.items.reduce((total, item) => total + item.totalPrice, 0);
  });

  const shippingCost = computed(() => {
    // Free shipping for orders over R500, otherwise R89.50
    return subtotal.value >= 500 ? 0 : 89.50;
  });

  const taxRate = computed(() => 0.15); // 15% VAT

  const taxAmount = computed(() => {
    return subtotal.value * taxRate.value;
  });

  const totalPriceWithTaxAndShipping = computed(() => {
    return subtotal.value + taxAmount.value + shippingCost.value;
  });

  // Save cart to localStorage
  const saveCartToLocalStorage = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(state.value));
    }
  };

  // Load cart from localStorage
  const loadCartFromLocalStorage = (): CartState | null => {
    if (typeof window === 'undefined') return null;
    const savedCart = localStorage.getItem('cart');
    if (!savedCart) return null;
    try {
      return JSON.parse(savedCart);
    } catch (error) {
      console.error('Failed to parse cart from localStorage:', error);
      return null;
    }
  };

  // Fetch cart from API for logged-in users
  const fetchCartFromApi = async (token: string): Promise<CartState | null> => {
    try {
      const response = await $fetch('/api/cart', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data || null;
    } catch (error) {
      console.error('Failed to fetch cart from API:', error);
      return null;
    }
  };

  // Sync cart to API for logged-in users
  const syncCartToApi = async (token: string): Promise<void> => {
    if (isSyncing.value) return; // Prevent duplicate requests
    
    isSyncing.value = true;
    try {
      await $fetch('/api/cart', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: state.value
      });
      console.log('Cart synced to API:', state.value.items.length, 'items');
    } catch (error) {
      console.error('Failed to sync cart to API:', error);
    } finally {
      isSyncing.value = false;
    }
  };

  // Initialize cart from localStorage or API
  const initializeCart = async () => {
    if (isInitialized.value) return;
    isInitialized.value = true;

    const token = getToken();
    
    if (token) {
      // Fetch cart from API for logged-in users
      console.log('Initializing cart from API for logged-in user');
      const apiCart = await fetchCartFromApi(token);
      if (apiCart) {
        state.value = apiCart;
        console.log(`Loaded ${apiCart.items.length} items from API`);
        return;
      }
    }
    
    // Fallback to localStorage
    const localCart = loadCartFromLocalStorage();
    if (localCart) {
      state.value = localCart;
      console.log(`Loaded ${localCart.items.length} items from localStorage`);
    }
  };

  // Watch for auth state changes and sync cart
  const setupAuthWatcher = () => {
    if (typeof window === 'undefined') return;
    
    // Check for auth token changes
    setInterval(() => {
      const token = getToken();
      if (token && isInitialized.value) {
        // Sync cart to API when user is logged in
        syncCartToApi(token);
      }
    }, 5000); // Check every 5 seconds
  };

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
    
    // Sync to API if logged in
    const token = getToken();
    if (token) {
      syncCartToApi(token);
    }
  };

  const removeItem = (productId: string) => {
    state.value.items = state.value.items.filter(item => item.productId !== productId);
    saveCartToLocalStorage();
    
    // Sync to API if logged in
    const token = getToken();
    if (token) {
      syncCartToApi(token);
    }
  };

  const updateItemQuantity = (productId: string, quantity: number) => {
    const index = state.value.items.findIndex(item => item.productId === productId);
    if (index !== -1) {
      const item = state.value.items[index];
      const newQuantity = Math.max(1, Math.min(quantity, item.inventoryCount));
      // Replace the item to trigger reactivity
      state.value.items[index] = {
        ...item,
        quantity: newQuantity,
        totalPrice: item.unitPrice * newQuantity
      };
      saveCartToLocalStorage();
      
      // Sync to API if logged in
      const token = getToken();
      if (token) {
        syncCartToApi(token);
      }
    }
  };

  const clearCart = async () => {
    state.value.items = [];
    saveCartToLocalStorage();
    
    // Clear from API if logged in
    const token = getToken();
    if (token) {
      try {
        await $fetch('/api/cart', {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      } catch (error) {
        console.error('Failed to clear cart from API:', error);
      }
    }
  };

  const setCurrency = (currency: string) => {
    state.value.currency = currency;
    saveCartToLocalStorage();
  };

  // Initialize from localStorage if available
  if (typeof window !== 'undefined') {
    initializeCart();
    setupAuthWatcher();
  }

  return {
    // State - return the reactive state object, not unwrapped values
    items: computed(() => state.value.items),
    currency: computed(() => state.value.currency),

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
    setCurrency,
    initializeCart
  };
});