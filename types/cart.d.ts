// types/cart.d.ts
export interface Cart {
  id: string;
  customerId?: string; // Reference to customer if logged in (optional for guest carts)
  sessionId?: string; // Session identifier for guest carts (required if no customerId)
  items: CartItem[];
  totalPrice: number; // Sum of all item prices
  currency: string;
  createdAt: Date;
  updatedAt: Date;
  expiresAt?: Date; // Timestamp when cart expires (for guest carts)
}

export interface CartItem {
  productId: string;
  productName: string;
  quantity: number; // Quantity of this product in the cart (required, positive)
  unitPrice: number; // Price per unit at time of adding to cart (for historical accuracy)
  totalPrice: number; // Total price for this item (quantity * unitPrice)
  productImage: string;
  inStock: boolean;
  inventoryCount: number;
  customizations?: object; // Any customizations applied to the product (optional)
}

export interface CartUpdatePayload {
  quantity: number;
}