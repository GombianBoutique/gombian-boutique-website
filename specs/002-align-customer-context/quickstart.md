# Quickstart Guide: Gombian Boutique Development

## Prerequisites

- Node.js 18.x or higher
- pnpm package manager (recommended) or npm/yarn
- Git version control
- Stripe account for payment processing
- SendGrid account for email notifications

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/your-org/gombian-boutique.git
cd gombian-boutique
```

### 2. Install Dependencies
```bash
# Using pnpm (recommended)
pnpm install

# Or using npm
npm install
```

### 3. Environment Configuration
Create a `.env` file in the project root with the following variables:

```env
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_signing_secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key

# Email Service (SendGrid)
SENDGRID_API_KEY=your_sendgrid_api_key
EMAIL_FROM_ADDRESS=noreply@gombianboutique.com

# Database (if using external database)
DATABASE_URL=your_database_connection_string

# Authentication
JWT_SECRET=your_jwt_secret_for_session_management

# Image Optimization
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### 4. Initialize the Database
```bash
# If using Prisma
npx prisma db push
npx prisma generate
```

### 5. Run the Application

#### Development Mode
```bash
# Start the development server
pnpm dev
# or
npm run dev

# The application will be available at http://localhost:3000
```

#### Production Build
```bash
# Build the application
pnpm build
# or
npm run build

# Preview the production build locally
pnpm preview
# or
npm run preview
```

## Key Features Implementation

### 1. Product Catalog
The product catalog is managed through the `app/data/products.json` file. To add new products:

1. Edit the `app/data/products.json` file
2. Follow the existing product structure with required fields
3. Add high-quality images to the `public/images/products/` directory

### 2. Shopping Cart
The shopping cart functionality is implemented using Vue composables:
- Located in `app/composables/useCart.ts`
- Persists data in localStorage for guest users
- Syncs with user account when logged in

### 3. Checkout Process
The checkout process includes:
- Guest checkout option
- Multiple payment methods (configured via Stripe)
- Order confirmation and email notifications
- Inventory management to prevent overselling

### 4. User Accounts
User account features include:
- Registration and login
- Order history
- Saved addresses
- Wishlist functionality
- Personalized recommendations

## API Endpoints

### Product Endpoints
- `GET /api/products` - Get all products with filtering
- `GET /api/products/:id` - Get specific product details
- `GET /api/categories` - Get product categories

### Cart Endpoints
- `GET /api/cart` - Get current cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:id` - Update cart item
- `DELETE /api/cart/:id` - Remove item from cart

### Checkout Endpoints
- `POST /api/checkout` - Process checkout
- `POST /api/payment/intent` - Create payment intent

### User Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/account` - Get user account details
- `PUT /api/account` - Update user account details

## Testing

### Unit Tests
```bash
# Run all unit tests
pnpm test
# or
npm run test

# Run tests in watch mode
pnpm test:watch
# or
npm run test:watch
```

### End-to-End Tests
```bash
# Run e2e tests
pnpm test:e2e
# or
npm run test:e2e

# Run e2e tests in UI mode
pnpm test:e2e:ui
# or
npm run test:e2e:ui
```

## Deployment

### Environment Variables for Production
```env
# Production environment
NODE_ENV=production

# Stripe Configuration
STRIPE_SECRET_KEY=sk_live_your_live_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_live_webhook_signing_secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_live_publishable_key

# Database
DATABASE_URL=your_production_database_url

# Domain-specific configurations
APP_URL=https://www.gombianboutique.com
```

### Deployment Steps
1. Build the application: `pnpm build`
2. Set production environment variables
3. Run the application: `pnpm start`

## Troubleshooting

### Common Issues

#### 1. Stripe Payment Issues
- Ensure webhook endpoints are properly configured in Stripe Dashboard
- Verify webhook signing secret matches the environment variable
- Check that payment methods are enabled in Stripe

#### 2. Email Notifications Not Sending
- Verify SendGrid API key is correctly configured
- Check that sender email is verified in SendGrid
- Ensure recipient email domains are not blacklisted

#### 3. Performance Issues
- Enable image optimization and CDN
- Implement proper caching strategies
- Monitor database queries for optimization opportunities

### Development Tips
- Use the Nuxt DevTools for debugging and performance monitoring
- Leverage the built-in Tailwind CSS utility classes for rapid styling
- Follow the component composition pattern for maintainable code
- Use composables for shared logic across components