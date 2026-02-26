// server/utils/order-store.ts
/**
 * Order Store - Persists orders linked to user accounts
 */

export interface OrderItem {
  productId: string
  productName: string
  productImage: string
  unitPrice: number
  quantity: number
  totalPrice: number
}

export interface OrderAddress {
  firstName: string
  lastName: string
  addressLine1: string
  addressLine2?: string
  city: string
  state: string
  postalCode: string
  country: string
  phone?: string
}

export interface OrderTotals {
  subtotal: number
  shipping: number
  tax: number
  total: number
}

export interface Order {
  id: string
  userId?: string // Optional for guest orders
  orderNumber: string
  email: string
  paymentMethod: string
  paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded'
  shippingAddress: OrderAddress
  billingAddress: OrderAddress
  items: OrderItem[]
  totals: OrderTotals
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  hasPopUpload: boolean
  proofOfPaymentFileName?: string
  createdAt: string
  updatedAt: string
  shippedAt?: string
  deliveredAt?: string
}

// In-memory order store - in production, use a database
const orders: Order[] = []

/**
 * Get all orders
 */
export function getOrders(): Order[] {
  return orders
}

/**
 * Find orders by user ID
 */
export function findOrdersByUserId(userId: string): Order[] {
  return orders.filter(o => o.userId === userId)
}

/**
 * Find order by ID
 */
export function findOrderById(id: string): Order | undefined {
  return orders.find(o => o.id === id)
}

/**
 * Find order by order number
 */
export function findOrderByOrderNumber(orderNumber: string): Order | undefined {
  return orders.find(o => o.orderNumber === orderNumber)
}

/**
 * Create a new order
 */
export function createOrder(order: Order): void {
  orders.push(order)
  console.log(`[Order Store] Created order ${order.orderNumber} for user ${order.userId || 'guest'}`)
}

/**
 * Update order
 */
export function updateOrder(id: string, updates: Partial<Order>): boolean {
  const index = orders.findIndex(o => o.id === id)
  if (index === -1) return false

  orders[index] = {
    ...orders[index],
    ...updates,
    updatedAt: new Date().toISOString()
  }
  
  console.log(`[Order Store] Updated order ${orders[index].orderNumber}`)
  return true
}

/**
 * Update order status
 */
export function updateOrderStatus(id: string, status: Order['status']): boolean {
  const now = new Date().toISOString()
  const updates: Partial<Order> = { status }
  
  if (status === 'shipped') {
    updates.shippedAt = now
  } else if (status === 'delivered') {
    updates.deliveredAt = now
  }
  
  return updateOrder(id, updates)
}

/**
 * Get recent orders (for dashboard)
 */
export function getRecentOrders(limit: number = 5): Order[] {
  return orders
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit)
}
