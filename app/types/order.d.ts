// types/order.d.ts
export interface Order {
  id: string;
  customerId: string; // Reference to the customer who placed the order
  orderNumber: string; // Human-readable order number (auto-generated)
  items: OrderItem[]; // Array of items in the order
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded'; // Required
  totalAmount: number; // Total amount charged (required)
  currency: string; // Currency code (required)
  shippingAddress: Address; // Shipping address for the order
  billingAddress: Address; // Billing address for the order
  paymentMethod: string; // Payment method used (e.g., 'credit_card', 'paypal')
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded'; // Required
  paymentIntentId?: string; // Reference to payment processor's intent ID
  shippingCost: number; // Cost of shipping
  taxAmount: number; // Tax amount applied
  discountAmount: number; // Discount applied (if any)
  createdAt: Date; // Timestamp when order was created
  updatedAt: Date; // Timestamp when order was last updated
  shippedAt?: Date; // Timestamp when order was shipped (optional)
  deliveredAt?: Date; // Timestamp when order was delivered (optional)
  trackingNumber?: string; // Shipping carrier's tracking number (optional)
  trackingCarrier?: string; // Shipping carrier name (optional)
  notes?: string; // Additional notes about the order (optional)
}

export interface OrderItem {
  productId: string;
  productName: string; // Product name at time of purchase (for historical accuracy)
  quantity: number; // Quantity of this product in the order (required)
  unitPrice: number; // Price per unit at time of purchase
  totalPrice: number; // Total price for this item (quantity * unitPrice)
  customizations?: object; // Any customizations applied to the product (optional)
}

export interface OrderFilter {
  status?: string;
  dateFrom?: Date;
  dateTo?: Date;
  page?: number;
  limit?: number;
}