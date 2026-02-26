# User Account Sync Audit Report

**Date:** 2026-01-22  
**Scope:** Complete website review for user account synchronization opportunities

---

## Executive Summary

This audit identifies features that should sync with user accounts for logged-in users while maintaining guest support. The goal is to provide seamless cross-device experiences without compromising security or breaking existing functionality.

---

## Current Implementation Status

### ✅ Already Synced (Completed)

| Feature | Storage | Auth Required | Status |
|---------|---------|---------------|--------|
| **Wishlist** | API + localStorage fallback | No (guest support) | ✅ Fixed |
| **User Preferences** | API | Yes | ✅ Fixed |
| **User Profile** | API | Yes | ✅ Working |
| **Authentication** | Cookie (JWT) | Yes | ✅ Working |

### ⚠️ Needs Implementation (Identified in this audit)

| Feature | Current Storage | Recommended Storage | Priority |
|---------|----------------|--------------------|----------|
| **Shopping Cart** | localStorage only | API + localStorage | 🔴 HIGH |
| **Product Comparison** | useState (session only) | API + localStorage | 🟡 MEDIUM |
| **Order History** | Not implemented for users | API | 🟢 LOW |
| **Recently Viewed** | Not implemented | API + localStorage | 🟢 LOW |
| **Shipping Addresses** | Not synced | API | 🟡 MEDIUM |
| **Billing Addresses** | Not synced | API | 🟡 MEDIUM |

---

## Detailed Analysis

### 1. Shopping Cart Sync (HIGH PRIORITY)

**Current State:**
- Uses Pinia store (`app/stores/cart.ts`)
- Only persists to localStorage
- No API sync for logged-in users
- **Problem:** Users lose cart when switching devices

**Recommended Implementation:**

```typescript
// app/stores/cart.ts - Add API sync
export const useCartStore = defineStore('cart', () => {
  const { getToken, isAuthenticated } = useAuth()
  
  // Fetch cart from API on auth change
  const syncCartWithApi = async () => {
    const token = getToken()
    if (token) {
      // Fetch cart from API
      const response = await $fetch('/api/cart', {
        headers: { Authorization: `Bearer ${token}` }
      })
      // Merge with local cart or replace
      state.value.items = response.data.items || []
    }
  }
  
  // Save cart to API
  const saveCartToApi = async () => {
    const token = getToken()
    if (token && isAuthenticated.value) {
      await $fetch('/api/cart', {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
        body: { items: state.value.items }
      })
    }
  }
  
  // Watch auth state
  watch(isAuthenticated, (newVal) => {
    if (newVal) syncCartWithApi()
  })
})
```

**New API Endpoints Needed:**
- `GET /api/cart` - Fetch user's cart
- `PUT /api/cart` - Save/update cart
- `DELETE /api/cart` - Clear cart

**Security Considerations:**
- Cart operations require valid JWT token
- Rate limit cart updates to prevent abuse
- Validate product IDs and quantities server-side

---

### 2. Product Comparison Sync (MEDIUM PRIORITY)

**Current State:**
- Uses `useState` (session-only, lost on refresh)
- No persistence at all
- **Problem:** Users lose comparison list on page refresh

**Recommended Implementation:**

```typescript
// app/composables/useProductComparison.ts
export const useProductComparison = () => {
  const { getToken } = useAuth()
  const comparisonList = useState<Product[]>('productComparison', () => [])
  
  // Load from localStorage or API
  const initialize = async () => {
    const token = getToken()
    if (token) {
      // Try API first
      try {
        const response = await $fetch('/api/comparison', {
          headers: { Authorization: `Bearer ${token}` }
        })
        comparisonList.value = response.data || []
        return
      } catch (e) {
        // Fallback to localStorage
      }
    }
    // Load from localStorage
    const saved = localStorage.getItem('productComparison')
    if (saved) comparisonList.value = JSON.parse(saved)
  }
  
  // Save on changes
  const saveComparison = async () => {
    const token = getToken()
    if (token) {
      await $fetch('/api/comparison', {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
        body: { products: comparisonList.value }
      })
    }
    localStorage.setItem('productComparison', JSON.stringify(comparisonList.value))
  }
  
  watch(comparisonList, saveComparison, { deep: true })
  
  return { comparisonList, addToComparison, removeFromComparison, ... }
}
```

---

### 3. Order History (LOW PRIORITY - Nice to Have)

**Current State:**
- Orders are sent via email only
- No user account order history
- `app/pages/account/orders.vue` shows empty state

**Recommended Implementation:**

```typescript
// server/utils/order-store.ts
interface Order {
  id: string
  userId: string
  orderNumber: string
  email: string
  items: OrderItem[]
  totals: OrderTotals
  shippingAddress: Address
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  createdAt: string
  updatedAt: string
}

const orders: Order[] = []

export function findOrdersByUserId(userId: string): Order[] {
  return orders.filter(o => o.userId === userId)
}

export function createOrder(order: Order): void {
  orders.push(order)
}
```

**New API Endpoints:**
- `GET /api/account/orders` - List user's orders
- `GET /api/account/orders/:id` - Get order details

---

### 4. Recently Viewed Products (LOW PRIORITY)

**Current State:**
- Not implemented

**Recommended Implementation:**
- Store last 20 viewed products
- Sync to API for logged-in users
- Use localStorage for guests

---

### 5. Address Management (MEDIUM PRIORITY)

**Current State:**
- User model has `shippingAddresses` and `billingAddresses` arrays
- No API endpoints to manage addresses
- Checkout requires manual entry each time

**Recommended Implementation:**

**New API Endpoints:**
- `GET /api/account/addresses` - List addresses
- `POST /api/account/addresses` - Add address
- `PUT /api/account/addresses/:id` - Update address
- `DELETE /api/account/addresses/:id` - Delete address
- `POST /api/account/addresses/:id/set-default` - Set default

**Benefits:**
- Faster checkout for returning customers
- Multiple address support (home, work, etc.)
- Address validation before checkout

---

## Security Considerations

### Authentication Requirements

| Feature | Guest Access | Auth Required for Sync | Notes |
|---------|-------------|----------------------|-------|
| Cart | ✅ Yes | ❌ No | Sync optional |
| Wishlist | ✅ Yes | ❌ No | Sync optional |
| Comparison | ✅ Yes | ❌ No | Sync optional |
| Orders | ❌ No | ✅ Yes | Must be authenticated |
| Addresses | ❌ No | ✅ Yes | Must be authenticated |
| Preferences | ❌ No | ✅ Yes | Must be authenticated |

### Token Handling Best Practices

1. **Always validate tokens server-side**
2. **Use HTTPS in production**
3. **Implement token refresh mechanism**
4. **Set appropriate cookie flags:**
   - `HttpOnly` - Prevent XSS
   - `Secure` - HTTPS only
   - `SameSite=Strict` - CSRF protection

### Rate Limiting

Implement rate limiting for:
- Cart updates: 10 requests/minute
- Wishlist updates: 20 requests/minute
- Order placement: 5 requests/minute
- Address updates: 10 requests/minute

---

## Implementation Priority

### Phase 1: Critical (Do First)
1. **Shopping Cart Sync** - Highest user impact
2. **Address Management** - Improves checkout experience

### Phase 2: Important (Do Second)
3. **Product Comparison Sync** - Better UX
4. **Order History** - Customer support

### Phase 3: Nice to Have (Do Later)
5. **Recently Viewed Products** - Personalization
6. **Advanced Recommendations** - Cross-sell opportunities

---

## Code Changes Required

### Files to Modify

1. `app/stores/cart.ts` - Add API sync
2. `app/composables/useProductComparison.ts` - Add persistence
3. `app/pages/checkout.vue` - Load saved addresses
4. `app/pages/account/orders.vue` - Fetch from API

### Files to Create

1. `server/api/cart.get.ts` - Fetch cart
2. `server/api/cart.put.ts` - Save cart
3. `server/api/cart.delete.ts` - Clear cart
4. `server/api/comparison.get.ts` - Fetch comparison
5. `server/api/comparison.put.ts` - Save comparison
6. `server/api/account/addresses.get.ts` - List addresses
7. `server/api/account/addresses.post.ts` - Add address
8. `server/api/account/orders.get.ts` - List orders
9. `server/utils/order-store.ts` - Order storage

---

## Testing Checklist

### Cart Sync Tests
- [ ] Guest user can add items to cart
- [ ] Cart persists across page refreshes (localStorage)
- [ ] Logged-in user's cart syncs to API
- [ ] Cart merges on login (guest → user)
- [ ] Cart persists across devices for logged-in users
- [ ] Cart clears after successful order

### Wishlist Tests
- [ ] Guest user can add/remove items
- [ ] Wishlist syncs to API for logged-in users
- [ ] Wishlist persists across devices
- [ ] Wishlist count updates on account dashboard

### Address Tests
- [ ] User can add multiple addresses
- [ ] User can set default address
- [ ] Checkout pre-fills saved addresses
- [ ] User can delete addresses

---

## Migration Strategy

### For Existing Users

1. **Guest → User Migration:**
   - On login, merge guest cart with user's saved cart
   - Merge guest wishlist with user's saved wishlist
   - Prompt user to save guest data

2. **Data Consistency:**
   - Use timestamps to resolve conflicts
   - Prefer newer data when merging
   - Log all merge operations for debugging

---

## Conclusion

This audit identified **6 key features** that should sync with user accounts:

1. ✅ **Wishlist** - Already implemented
2. ✅ **User Preferences** - Already implemented
3. 🔴 **Shopping Cart** - HIGH priority
4. 🟡 **Product Comparison** - MEDIUM priority
5. 🟡 **Address Management** - MEDIUM priority
6. 🟢 **Order History** - LOW priority

Implementing these features will provide:
- **Seamless cross-device experience**
- **Improved customer retention**
- **Better checkout conversion rates**
- **Enhanced personalization opportunities**

All implementations maintain **backward compatibility** with guest users while providing **enhanced experiences** for authenticated users.
