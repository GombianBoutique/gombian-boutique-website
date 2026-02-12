// Define types for cart functionality
type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  volume: string;
  gender: string;
  fragranceFamily: string;
  season: string;
  longevity: string;
  concentration: string;
  scentNotes: {
    top: string[];
    middle: string[];
    base: string[];
  };
  ingredients: string[];
  images: string[];
  category: string;
  inStock: boolean;
  createdAt: string;
  updatedAt: string;
}

type CartItem = {
  id: string;
  product: Product;
  quantity: number;
  subtotal: number;
}

type Cart = {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  shippingCost: number;
  tax: number;
  total: number;
  lastUpdated?: number; // Add a timestamp to help with reactivity
}

// Cart composable
export const useCart = () => {
  // Initialize cart from localStorage or as empty
  const cart = useState<Cart>('cart', () => {
    // Try to load from localStorage on client side
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        try {
          return JSON.parse(savedCart);
        } catch (error) {
          console.error('Error parsing cart from localStorage:', error);
        }
      }
    }

    // Default empty cart
    return {
      items: [],
      itemCount: 0,
      subtotal: 0,
      shippingCost: 0,
      tax: 0,
      total: 0,
      lastUpdated: Date.now()
    };
  });

  // Update localStorage whenever cart changes
  watch(cart, (newCart) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(newCart));
    }
  }, { deep: true });

  // Method to sync cart from localStorage
  const syncCartFromStorage = () => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        try {
          const parsedCart = JSON.parse(savedCart);

          // Create a new cart object to ensure proper reactivity
          const newCart = {
            items: parsedCart.items || [],
            itemCount: parsedCart.itemCount || 0,
            subtotal: parsedCart.subtotal || 0,
            shippingCost: parsedCart.shippingCost || 0,
            tax: parsedCart.tax || 0,
            total: parsedCart.total || 0,
            lastUpdated: parsedCart.lastUpdated || Date.now()
          };

          // Replace the entire cart object to ensure reactivity
          Object.assign(cart.value, newCart);
        } catch (error) {
          console.error('Error parsing cart from localStorage:', error);
        }
      }
    }
  };

  // Add item to cart
  const addItem = (product: Product, quantity: number = 1): void => {
    // Check if item already exists in cart
    const existingItemIndex = cart.value.items.findIndex(item => item.product.id === product.id);

    if (existingItemIndex !== -1) {
      // Update quantity if item exists
      cart.value.items[existingItemIndex].quantity += quantity;
      cart.value.items[existingItemIndex].subtotal = cart.value.items[existingItemIndex].product.price * cart.value.items[existingItemIndex].quantity;
    } else {
      // Add new item to cart
      const newItem: CartItem = {
        id: `cart-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, // Generate unique ID
        product,
        quantity,
        subtotal: product.price * quantity
      };
      cart.value.items.push(newItem);
    }

    updateCartTotals();
  };

  // Update item quantity
  const updateQuantity = (itemId: string, quantity: number): void => {
    if (quantity < 1) {
      removeItem(itemId);
      return;
    }

    const itemIndex = cart.value.items.findIndex(item => item.id === itemId);
    if (itemIndex !== -1) {
      cart.value.items[itemIndex].quantity = quantity;
      cart.value.items[itemIndex].subtotal = cart.value.items[itemIndex].product.price * quantity;
      updateCartTotals();
    }
  };

  // Remove item from cart
  const removeItem = (itemId: string): void => {
    const itemIndex = cart.value.items.findIndex(item => item.id === itemId);
    if (itemIndex !== -1) {
      cart.value.items.splice(itemIndex, 1);
      updateCartTotals();
    }
  };

  // Clear entire cart
  const clearCart = (): void => {
    cart.value.items = [];
    updateCartTotals();
  };

  // Update cart totals
  const updateCartTotals = (): void => {
    const newItemCount = cart.value.items.reduce((count, item) => count + item.quantity, 0);
    const newSubtotal = cart.value.items.reduce((sum, item) => sum + item.subtotal, 0);

    // Calculate shipping (free over R500, otherwise R89.50)
    const newShippingCost = newSubtotal >= 500 ? 0 : 89.50;

    // Calculate tax (assuming 15% VAT)
    const newTax = newSubtotal * 0.15;

    const newTotal = newSubtotal + newShippingCost + newTax;

    // Update values individually to ensure reactivity
    // Use a temporary variable to prevent intermediate states
    const updatedCart = {
      ...cart.value,
      itemCount: newItemCount,
      subtotal: newSubtotal,
      shippingCost: newShippingCost,
      tax: newTax,
      total: newTotal,
      lastUpdated: Date.now() // Update timestamp to force reactivity
    };

    // Assign the entire object to ensure atomic update
    Object.assign(cart.value, updatedCart);
  };

  // Initialize cart totals
  updateCartTotals();

  return {
    cart: readonly(cart) as Readonly<Ref<Cart>>,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    updateCartTotals,
    syncCartFromStorage
  };
};