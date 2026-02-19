// services/api.ts
import type { Product, ProductFilter } from '~/types/product'
import type { Cart, CartItem, CartUpdatePayload } from '~/types/cart'
import type { Order } from '~/types/order'
import type { Customer, Address } from '~/types/user'
import type { ApiResponse, PaginatedResponse } from '~/types/common'

// Base API service class
class ApiService {
  protected baseUrl: string
  
  constructor() {
    // In Nuxt, we can access the runtime config
    const config = useRuntimeConfig()
    this.baseUrl = config.public.apiBaseUrl || '/api'
  }

  protected async request<T>(
    endpoint: string, 
    options: { method?: string; body?: any; params?: Record<string, any> } = {}
  ): Promise<T> {
    const { method = 'GET', body, params } = options
    
    const url = params 
      ? `${this.baseUrl}${endpoint}?${new URLSearchParams(params).toString()}`
      : `${this.baseUrl}${endpoint}`
    
    try {
      const response = await $fetch(url, {
        method,
        body: method !== 'GET' ? body : undefined,
        headers: {
          'Content-Type': 'application/json',
        },
      })
      
      return response as T
    } catch (error: any) {
      console.error(`API request failed: ${method} ${url}`, error)
      throw error
    }
  }
}

// Product API service
export class ProductService extends ApiService {
  async getProducts(filters?: ProductFilter): Promise<PaginatedResponse<Product>> {
    return this.request<PaginatedResponse<Product>>('/products', { params: filters })
  }

  async getProductById(id: string): Promise<ApiResponse<Product>> {
    return this.request<ApiResponse<Product>>(`/products/${id}`)
  }

  async searchProducts(query: string): Promise<PaginatedResponse<Product>> {
    return this.request<PaginatedResponse<Product>>('/products', { 
      params: { search: query } 
    })
  }
}

// Cart API service
export class CartService extends ApiService {
  async getCart(): Promise<ApiResponse<Cart>> {
    return this.request<ApiResponse<Cart>>('/cart')
  }

  async addToCart(productId: string, quantity: number): Promise<ApiResponse<Cart>> {
    return this.request<ApiResponse<Cart>>('/cart/items', {
      method: 'POST',
      body: { productId, quantity }
    })
  }

  async updateCartItem(itemId: string, payload: CartUpdatePayload): Promise<ApiResponse<Cart>> {
    return this.request<ApiResponse<Cart>>(`/cart/items/${itemId}`, {
      method: 'PUT',
      body: payload
    })
  }

  async removeFromCart(itemId: string): Promise<ApiResponse<Cart>> {
    return this.request<ApiResponse<Cart>>(`/cart/items/${itemId}`, {
      method: 'DELETE'
    })
  }

  async clearCart(): Promise<ApiResponse<Cart>> {
    return this.request<ApiResponse<Cart>>('/cart', {
      method: 'DELETE'
    })
  }
}

// Order API service
export class OrderService extends ApiService {
  async getOrders(): Promise<PaginatedResponse<Order>> {
    return this.request<PaginatedResponse<Order>>('/orders')
  }

  async getOrderById(id: string): Promise<ApiResponse<Order>> {
    return this.request<ApiResponse<Order>>(`/orders/${id}`)
  }

  async createOrder(orderData: any): Promise<ApiResponse<Order>> {
    return this.request<ApiResponse<Order>>('/checkout', {
      method: 'POST',
      body: orderData
    })
  }

  async cancelOrder(orderId: string): Promise<ApiResponse<Order>> {
    return this.request<ApiResponse<Order>>(`/orders/${orderId}/cancel`, {
      method: 'POST'
    })
  }
}

// User API service
export class UserService extends ApiService {
  async register(userData: any): Promise<ApiResponse<Customer>> {
    return this.request<ApiResponse<Customer>>('/auth/register', {
      method: 'POST',
      body: userData
    })
  }

  async login(credentials: { email: string; password: string }): Promise<ApiResponse<Customer>> {
    return this.request<ApiResponse<Customer>>('/auth/login', {
      method: 'POST',
      body: credentials
    })
  }

  async logout(): Promise<void> {
    await this.request('/auth/logout', { method: 'POST' })
  }

  async getProfile(): Promise<ApiResponse<Customer>> {
    return this.request<ApiResponse<Customer>>('/account')
  }

  async updateProfile(profileData: Partial<Customer>): Promise<ApiResponse<Customer>> {
    return this.request<ApiResponse<Customer>>('/account', {
      method: 'PUT',
      body: profileData
    })
  }

  async getAddresses(): Promise<ApiResponse<Address[]>> {
    return this.request<ApiResponse<Address[]>>('/account/addresses')
  }

  async addAddress(addressData: Omit<Address, 'id' | 'customerId'>): Promise<ApiResponse<Address>> {
    return this.request<ApiResponse<Address>>('/account/addresses', {
      method: 'POST',
      body: addressData
    })
  }

  async updateAddress(addressId: string, addressData: Partial<Address>): Promise<ApiResponse<Address>> {
    return this.request<ApiResponse<Address>>(`/account/addresses/${addressId}`, {
      method: 'PUT',
      body: addressData
    })
  }

  async deleteAddress(addressId: string): Promise<void> {
    await this.request(`/account/addresses/${addressId}`, { method: 'DELETE' })
  }
}

// Export singleton instances
export const productService = new ProductService()
export const cartService = new CartService()
export const orderService = new OrderService()
export const userService = new UserService()