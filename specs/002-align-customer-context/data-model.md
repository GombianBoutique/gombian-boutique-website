# Data Model: Gombian Boutique Perfume Store

## Overview
This document defines the data models for the Gombian Boutique perfume store, based on the entities identified in the feature specification.

## Core Entities

### Customer
Represents a person purchasing perfumes

**Fields:**
- `id` (string): Unique identifier for the customer
- `email` (string): Customer's email address (unique, required)
- `passwordHash` (string): Hashed password for registered users
- `firstName` (string): Customer's first name (required)
- `lastName` (string): Customer's last name (required)
- `phone` (string): Customer's phone number (optional)
- `dateOfBirth` (date): Customer's date of birth (optional)
- `preferences` (object): Customer's scent preferences and interests (optional)
- `shippingAddresses` (array<Address>): List of shipping addresses
- `billingAddresses` (array<Address>): List of billing addresses
- `orderHistory` (array<Order>): List of customer's past orders
- `createdAt` (datetime): Timestamp when customer account was created
- `updatedAt` (datetime): Timestamp when customer record was last updated
- `isActive` (boolean): Whether the customer account is active

**Validation Rules:**
- Email must be valid email format
- Password must meet security requirements (min 8 chars, mixed case, numbers)
- At least one shipping address required for account holders

### Address
Represents a physical address for shipping or billing

**Fields:**
- `id` (string): Unique identifier for the address
- `customerId` (string): Reference to the customer who owns this address
- `type` (enum): 'shipping' | 'billing'
- `firstName` (string): Recipient's first name
- `lastName` (string): Recipient's last name
- `company` (string): Company name (optional)
- `addressLine1` (string): Street address line 1 (required)
- `addressLine2` (string): Street address line 2 (optional)
- `city` (string): City name (required)
- `state` (string): State/province name (required)
- `postalCode` (string): Postal/ZIP code (required)
- `country` (string): Country name (required)
- `isDefault` (boolean): Whether this is the default address for the customer

### Product
Represents a perfume item

**Fields:**
- `id` (string): Unique identifier for the product
- `name` (string): Product name (required)
- `description` (string): Detailed product description (required)
- `price` (number): Price in cents (required, positive)
- `currency` (string): Currency code (e.g., 'USD', 'EUR', 'ZAR') (required)
- `formattedPrice` (string): Human-readable price (e.g., 'R 150') (computed)
- `volume` (string): Product volume (e.g., '30ml', '60ml', '100ml') (required)
- `gender` (enum): 'male' | 'female' | 'unisex' | 'couple' (required)
- `fragranceFamily` (string): Fragrance family classification (e.g., 'floral', 'woody') (required)
- `season` (string): Recommended season(s) for use (e.g., 'year-round', 'summer') (required)
- `longevity` (string): Expected longevity (e.g., '6-8 hours') (required)
- `concentration` (string): Concentration type (e.g., 'EDT', 'EDP', 'Parfum') (required)
- `scentNotes` (object): Object containing scent notes
  - `top` (array<string>): Top notes
  - `middle` (array<string>): Middle notes
  - `base` (array<string>): Base notes
- `ingredients` (array<string>): List of ingredients (required)
- `images` (array<string>): Array of image URLs (required, min 1)
- `category` (enum): 'best-seller' | 'premium' | 'complementary' | 'gift-set' | 'limited-edition' (required)
- `inStock` (boolean): Whether product is currently in stock (required)
- `inventoryCount` (number): Number of items in stock (required, non-negative)
- `createdAt` (datetime): Timestamp when product was added
- `updatedAt` (datetime): Timestamp when product was last updated
- `isFeatured` (boolean): Whether product is featured on homepage
- `rating` (number): Average customer rating (0-5 scale)
- `reviewCount` (number): Number of customer reviews

**Validation Rules:**
- Price must be positive
- At least one image required
- Inventory count cannot be negative

### Shopping Cart
Temporary container for items selected by an anonymous or logged-in user before purchase

**Fields:**
- `id` (string): Unique identifier for the cart
- `customerId` (string): Reference to customer if logged in (optional for guest carts)
- `sessionId` (string): Session identifier for guest carts (required if no customerId)
- `items` (array<CartItem>): Array of items in the cart
- `totalPrice` (number): Sum of all item prices (computed)
- `currency` (string): Currency for the cart
- `createdAt` (datetime): Timestamp when cart was created
- `updatedAt` (datetime): Timestamp when cart was last updated
- `expiresAt` (datetime): Timestamp when cart expires (for guest carts)

### CartItem
Represents a single product entry in a shopping cart

**Fields:**
- `productId` (string): Reference to the product
- `quantity` (number): Quantity of this product in the cart (required, positive)
- `unitPrice` (number): Price per unit at time of adding to cart (for historical accuracy)
- `customizations` (object): Any customizations applied to the product (optional)

### Order
Represents a purchase transaction

**Fields:**
- `id` (string): Unique identifier for the order
- `customerId` (string): Reference to the customer who placed the order
- `orderNumber` (string): Human-readable order number (auto-generated)
- `items` (array<OrderItem>): Array of items in the order
- `status` (enum): 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded' (required)
- `totalAmount` (number): Total amount charged (required)
- `currency` (string): Currency code (required)
- `shippingAddress` (Address): Shipping address for the order
- `billingAddress` (Address): Billing address for the order
- `paymentMethod` (string): Payment method used (e.g., 'credit_card', 'paypal')
- `paymentStatus` (enum): 'pending' | 'paid' | 'failed' | 'refunded' (required)
- `paymentIntentId` (string): Reference to payment processor's intent ID
- `shippingCost` (number): Cost of shipping
- `taxAmount` (number): Tax amount applied
- `discountAmount` (number): Discount applied (if any)
- `createdAt` (datetime): Timestamp when order was created
- `updatedAt` (datetime): Timestamp when order was last updated
- `shippedAt` (datetime): Timestamp when order was shipped (optional)
- `deliveredAt` (datetime): Timestamp when order was delivered (optional)
- `trackingNumber` (string): Shipping carrier's tracking number (optional)
- `trackingCarrier` (string): Shipping carrier name (optional)
- `notes` (string): Additional notes about the order (optional)

### OrderItem
Represents a single product entry in an order

**Fields:**
- `productId` (string): Reference to the product
- `productName` (string): Product name at time of purchase (for historical accuracy)
- `quantity` (number): Quantity of this product in the order (required)
- `unitPrice` (number): Price per unit at time of purchase
- `totalPrice` (number): Total price for this item (quantity * unitPrice)
- `customizations` (object): Any customizations applied to the product (optional)

### Review
Represents a customer review for a product

**Fields:**
- `id` (string): Unique identifier for the review
- `productId` (string): Reference to the product being reviewed
- `customerId` (string): Reference to the customer who wrote the review
- `orderId` (string): Reference to the order associated with this review (to verify purchase)
- `rating` (number): Rating given (1-5 scale) (required)
- `title` (string): Review title (optional)
- `comment` (string): Review comment (optional)
- `verifiedPurchase` (boolean): Whether this is from a verified purchase
- `helpfulCount` (number): Number of users who found this review helpful
- `createdAt` (datetime): Timestamp when review was created
- `updatedAt` (datetime): Timestamp when review was last updated

## Relationships

### Customer Relationships
- One-to-many with Address (customer has multiple addresses)
- One-to-many with Order (customer places multiple orders)
- One-to-zero-or-one with Shopping Cart (customer may have one active cart)

### Product Relationships
- One-to-many with OrderItem (product appears in multiple order items)
- One-to-many with Review (product receives multiple reviews)

### Order Relationships
- Many-to-one with Customer (order belongs to one customer)
- One-to-many with OrderItem (order contains multiple items)

### Shopping Cart Relationships
- Many-to-one with Customer (cart belongs to one customer, optional)
- One-to-many with CartItem (cart contains multiple items)

## State Transitions

### Order Status Transitions
```
pending → processing → shipped → delivered
   ↓           ↓          ↓
cancelled ←──────────────────────┘
   ↓
refunded
```

### Payment Status Transitions
```
pending → paid
   ↓
failed ↔ refunded
```

## Indexes

### Required Indexes
- Customer.email (unique)
- Product.category
- Product.fragranceFamily
- Product.gender
- Order.customerId
- Order.status
- Order.createdAt
- Review.productId