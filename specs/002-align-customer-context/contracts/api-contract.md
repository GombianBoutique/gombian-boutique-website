# API Contract: Gombian Boutique Perfume Store

## Overview
This document defines the API contract for the Gombian Boutique perfume store, specifying endpoints for product browsing, cart management, checkout, and user functionality.

## Base URL
`https://api.gombianboutique.com/v1`

## Authentication
Most endpoints require authentication using Bearer tokens. Guest functionality is available for cart operations.

## Common Headers
- `Content-Type: application/json`
- `Authorization: Bearer {token}` (for authenticated endpoints)

## API Endpoints

### Products

#### GET /products
Retrieve a list of products with optional filtering and pagination.

**Query Parameters:**
- `page` (integer, optional): Page number (default: 1)
- `limit` (integer, optional): Items per page (default: 20, max: 100)
- `category` (string, optional): Filter by category (e.g., 'best-seller', 'premium')
- `gender` (string, optional): Filter by gender ('male', 'female', 'unisex', 'couple')
- `fragranceFamily` (string, optional): Filter by fragrance family
- `minPrice` (number, optional): Minimum price filter
- `maxPrice` (number, optional): Maximum price filter
- `search` (string, optional): Search term for name or description

**Response (200 OK):**
```json
{
  "data": [
    {
      "id": "60ml-perfume",
      "name": "60ml Perfume",
      "description": "Our premium 60ml perfume bottle...",
      "price": 15000,
      "currency": "ZAR",
      "formattedPrice": "R 150",
      "volume": "60ml",
      "gender": "unisex",
      "fragranceFamily": "floral",
      "season": "year-round",
      "longevity": "8-10 hours",
      "concentration": "EDP",
      "scentNotes": {
        "top": ["bergamot", "citrus"],
        "middle": ["jasmine", "rose"],
        "base": ["vanilla", "musk"]
      },
      "ingredients": ["alcohol denat.", "water", "fragrance", "limonene", "linalool", "citronellol"],
      "images": ["/images/products/Ladies 60ml Perfume.jpg", "/images/products/Mens 60ml Perfume.jpg"],
      "category": "premium",
      "inStock": true,
      "inventoryCount": 42,
      "isFeatured": true,
      "rating": 4.5,
      "reviewCount": 24
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "pages": 8
  }
}
```

#### GET /products/{id}
Retrieve details for a specific product.

**Path Parameters:**
- `id` (string): Product ID

**Response (200 OK):**
```json
{
  "data": {
    "id": "60ml-perfume",
    "name": "60ml Perfume",
    "description": "Our premium 60ml perfume bottle...",
    "price": 15000,
    "currency": "ZAR",
    "formattedPrice": "R 150",
    "volume": "60ml",
    "gender": "unisex",
    "fragranceFamily": "floral",
    "season": "year-round",
    "longevity": "8-10 hours",
    "concentration": "EDP",
    "scentNotes": {
      "top": ["bergamot", "citrus"],
      "middle": ["jasmine", "rose"],
      "base": ["vanilla", "musk"]
    },
    "ingredients": ["alcohol denat.", "water", "fragrance", "limonene", "linalool", "citronellol"],
    "images": ["/images/products/Ladies 60ml Perfume.jpg", "/images/products/Mens 60ml Perfume.jpg"],
    "category": "premium",
    "inStock": true,
    "inventoryCount": 42,
    "isFeatured": true,
    "relatedProducts": [
      {
        "id": "30ml-perfume",
        "name": "30ml Perfume",
        "price": 10000,
        "image": "/images/products/30ml Perfumes.jpeg"
      }
    ],
    "reviews": [
      {
        "id": "review-123",
        "customerId": "customer-456",
        "customerName": "J. Smith",
        "rating": 5,
        "title": "Amazing scent!",
        "comment": "This perfume smells wonderful and lasts all day.",
        "createdAt": "2026-01-10T12:30:00Z",
        "verifiedPurchase": true
      }
    ],
    "rating": 4.5,
    "reviewCount": 24
  }
}
```

### Shopping Cart

#### GET /cart
Retrieve the current user's shopping cart or guest cart.

**Headers:**
- `Authorization: Bearer {token}` (optional for registered users, session ID in cookie for guests)

**Response (200 OK):**
```json
{
  "data": {
    "id": "cart-789",
    "items": [
      {
        "productId": "60ml-perfume",
        "productName": "60ml Perfume",
        "quantity": 1,
        "unitPrice": 15000,
        "totalPrice": 15000,
        "productImage": "/images/products/Ladies 60ml Perfume.jpg",
        "inStock": true,
        "inventoryCount": 42
      }
    ],
    "itemCount": 1,
    "totalPrice": 15000,
    "currency": "ZAR",
    "updatedAt": "2026-01-14T10:30:00Z"
  }
}
```

#### POST /cart/items
Add an item to the shopping cart.

**Request Body:**
```json
{
  "productId": "60ml-perfume",
  "quantity": 1
}
```

**Response (200 OK):**
```json
{
  "data": {
    "id": "cart-789",
    "items": [
      {
        "productId": "60ml-perfume",
        "productName": "60ml Perfume",
        "quantity": 1,
        "unitPrice": 15000,
        "totalPrice": 15000,
        "productImage": "/images/products/Ladies 60ml Perfume.jpg",
        "inStock": true,
        "inventoryCount": 42
      }
    ],
    "itemCount": 1,
    "totalPrice": 15000,
    "currency": "ZAR",
    "updatedAt": "2026-01-14T10:30:00Z"
  }
}
```

#### PUT /cart/items/{itemId}
Update the quantity of an item in the cart.

**Path Parameters:**
- `itemId` (string): ID of the cart item to update

**Request Body:**
```json
{
  "quantity": 2
}
```

**Response (200 OK):**
```json
{
  "data": {
    "id": "cart-789",
    "items": [
      {
        "productId": "60ml-perfume",
        "productName": "60ml Perfume",
        "quantity": 2,
        "unitPrice": 15000,
        "totalPrice": 30000,
        "productImage": "/images/products/Ladies 60ml Perfume.jpg",
        "inStock": true,
        "inventoryCount": 42
      }
    ],
    "itemCount": 1,
    "totalPrice": 30000,
    "currency": "ZAR",
    "updatedAt": "2026-01-14T10:35:00Z"
  }
}
```

#### DELETE /cart/items/{itemId}
Remove an item from the cart.

**Path Parameters:**
- `itemId` (string): ID of the cart item to remove

**Response (200 OK):**
```json
{
  "data": {
    "id": "cart-789",
    "items": [],
    "itemCount": 0,
    "totalPrice": 0,
    "currency": "ZAR",
    "updatedAt": "2026-01-14T10:40:00Z"
  }
}
```

### Checkout

#### POST /checkout
Process the checkout and create an order.

**Request Body:**
```json
{
  "shippingAddress": {
    "firstName": "John",
    "lastName": "Doe",
    "addressLine1": "123 Main St",
    "city": "Cape Town",
    "state": "Western Cape",
    "postalCode": "8001",
    "country": "South Africa"
  },
  "billingAddress": {
    "firstName": "John",
    "lastName": "Doe",
    "addressLine1": "123 Main St",
    "city": "Cape Town",
    "state": "Western Cape",
    "postalCode": "8001",
    "country": "South Africa"
  },
  "paymentMethod": {
    "type": "credit_card",
    "stripeToken": "tok_visa123456"
  },
  "createAccount": false,
  "newsletterSignup": true
}
```

**Response (201 Created):**
```json
{
  "data": {
    "id": "order-abc123",
    "orderNumber": "GB-2026-001234",
    "status": "pending",
    "items": [
      {
        "productId": "60ml-perfume",
        "productName": "60ml Perfume",
        "quantity": 1,
        "unitPrice": 15000,
        "totalPrice": 15000
      }
    ],
    "totalAmount": 17500,
    "currency": "ZAR",
    "shippingCost": 2500,
    "taxAmount": 0,
    "paymentStatus": "paid",
    "paymentMethod": "credit_card",
    "createdAt": "2026-01-14T11:00:00Z",
    "estimatedDelivery": "2026-01-21T00:00:00Z"
  }
}
```

### Orders

#### GET /orders
Retrieve the current user's order history.

**Response (200 OK):**
```json
{
  "data": [
    {
      "id": "order-abc123",
      "orderNumber": "GB-2026-001234",
      "status": "delivered",
      "totalAmount": 17500,
      "currency": "ZAR",
      "createdAt": "2026-01-14T11:00:00Z",
      "deliveredAt": "2026-01-21T14:30:00Z",
      "trackingNumber": "1Z999AA1234567890",
      "trackingCarrier": "DHL"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 5,
    "pages": 1
  }
}
```

#### GET /orders/{id}
Retrieve details for a specific order.

**Path Parameters:**
- `id` (string): Order ID

**Response (200 OK):**
```json
{
  "data": {
    "id": "order-abc123",
    "orderNumber": "GB-2026-001234",
    "status": "delivered",
    "items": [
      {
        "productId": "60ml-perfume",
        "productName": "60ml Perfume",
        "quantity": 1,
        "unitPrice": 15000,
        "totalPrice": 15000,
        "productImage": "/images/products/Ladies 60ml Perfume.jpg"
      }
    ],
    "totalAmount": 17500,
    "currency": "ZAR",
    "shippingAddress": {
      "firstName": "John",
      "lastName": "Doe",
      "addressLine1": "123 Main St",
      "city": "Cape Town",
      "state": "Western Cape",
      "postalCode": "8001",
      "country": "South Africa"
    },
    "billingAddress": {
      "firstName": "John",
      "lastName": "Doe",
      "addressLine1": "123 Main St",
      "city": "Cape Town",
      "state": "Western Cape",
      "postalCode": "8001",
      "country": "South Africa"
    },
    "paymentMethod": "credit_card",
    "paymentStatus": "paid",
    "shippingCost": 2500,
    "taxAmount": 0,
    "discountAmount": 0,
    "createdAt": "2026-01-14T11:00:00Z",
    "shippedAt": "2026-01-18T09:15:00Z",
    "deliveredAt": "2026-01-21T14:30:00Z",
    "trackingNumber": "1Z999AA1234567890",
    "trackingCarrier": "DHL"
  }
}
```

### Reviews

#### POST /products/{productId}/reviews
Submit a review for a product.

**Path Parameters:**
- `productId` (string): ID of the product being reviewed

**Request Body:**
```json
{
  "rating": 5,
  "title": "Amazing scent!",
  "comment": "This perfume smells wonderful and lasts all day."
}
```

**Response (201 Created):**
```json
{
  "data": {
    "id": "review-789",
    "productId": "60ml-perfume",
    "customerId": "customer-456",
    "customerName": "J. Smith",
    "rating": 5,
    "title": "Amazing scent!",
    "comment": "This perfume smells wonderful and lasts all day.",
    "verifiedPurchase": true,
    "helpfulCount": 0,
    "createdAt": "2026-01-14T12:00:00Z"
  }
}
```

### User Account

#### POST /auth/register
Register a new user account.

**Request Body:**
```json
{
  "email": "john.doe@example.com",
  "password": "SecurePassword123",
  "firstName": "John",
  "lastName": "Doe",
  "dateOfBirth": "1990-01-01",
  "preferences": {
    "favoriteScents": ["floral", "citrus"],
    "preferredConcentration": "EDP"
  }
}
```

**Response (201 Created):**
```json
{
  "data": {
    "id": "customer-456",
    "email": "john.doe@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### POST /auth/login
Log in to an existing account.

**Request Body:**
```json
{
  "email": "john.doe@example.com",
  "password": "SecurePassword123"
}
```

**Response (200 OK):**
```json
{
  "data": {
    "id": "customer-456",
    "email": "john.doe@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

## Error Responses

All error responses follow this structure:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input parameters",
    "details": [
      {
        "field": "email",
        "issue": "Invalid email format"
      }
    ]
  }
}
```

### Common Error Codes
- `VALIDATION_ERROR`: Request validation failed
- `NOT_FOUND`: Requested resource not found
- `UNAUTHORIZED`: Authentication required or failed
- `FORBIDDEN`: Insufficient permissions
- `PAYMENT_ERROR`: Payment processing failed
- `OUT_OF_STOCK`: Requested item is out of stock
- `SERVER_ERROR`: Internal server error