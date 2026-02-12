# Quickstart Guide: Perfume Store Website

## Prerequisites

- Node.js 18.x or higher
- pnpm package manager (recommended) or npm/yarn
- Git for version control

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. **Install dependencies**
   ```bash
   # Using pnpm (recommended)
   pnpm install
   
   # Or using npm
   npm install
   
   # Or using yarn
   yarn install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory with the following variables:
   ```env
   # Base URL for the application
   NUXT_PUBLIC_BASE_URL=http://localhost:3000
   
   # Analytics ID (optional)
   NUXT_PUBLIC_ANALYTICS_ID=
   
   # Site metadata
   NUXT_PUBLIC_SITE_NAME="Gombian Boutique Perfume Store"
   NUXT_PUBLIC_SITE_DESCRIPTION="Luxury perfume collection featuring exquisite fragrances"
   ```

4. **Development Server**
   ```bash
   # Start development server
   pnpm dev
   # or
   npm run dev
   # or
   yarn dev
   
   # The site will be available at http://localhost:3000
   ```

## Project Structure

```
.
├── app/
│   ├── assets/           # Stylesheets, images, fonts
│   ├── components/       # Reusable Vue components
│   ├── composables/      # Shared logic (Vue composables)
│   ├── layouts/          # Layout wrappers
│   ├── pages/            # Route components
│   └── app.vue          # Root application component
├── public/              # Static assets
├── server/              # API routes (if needed)
├── nuxt.config.ts       # Nuxt configuration
├── tailwind.config.js   # Tailwind CSS configuration
└── package.json         # Project dependencies and scripts
```

## Key Commands

```bash
# Development server
pnpm dev

# Build for production
pnpm build

# Generate static site
pnpm generate

# Preview production build
pnpm preview

# Lint code
pnpm lint

# Run tests
pnpm test
```

## Adding New Perfume Products

1. Navigate to the appropriate content directory (likely `app/content/products` or similar)
2. Create a new markdown or JSON file with the product details
3. Follow the data model structure defined in `data-model.md`
4. Include all required fields: name, description, scent notes, images, etc.

## Customizing the Design

1. Modify `app/assets/css/main.css` to adjust global styles
2. Update `tailwind.config.js` to customize the Tailwind theme
3. Adjust color variables in the CSS file to match the perfume brand
4. Modify component styles as needed

## Deployment

The site can be deployed as a static site or server-rendered application depending on requirements:

```bash
# Generate static site
pnpm generate

# Build for server deployment
pnpm build
```

The output will be in the `.output` directory for server deployments or `dist` for static sites.