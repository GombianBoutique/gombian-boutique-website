# Data Model: Perfume Store Website

## Perfume Product Entity

**Fields:**
- `id` (string): Unique identifier for the product
- `name` (string): Product name (e.g., "Midnight Bloom", "Ocean Breeze")
- `description` (string): Detailed product description
- `price` (number): Product price in local currency
- `volume` (string): Size/volume (e.g., "50ml", "100ml", "30ml EDT")
- `gender` (string): Target gender ("unisex", "men", "women", "n/a")
- `fragranceFamily` (string): Fragrance classification ("floral", "woody", "citrus", "oriental", etc.)
- `season` (string): Best seasons for use ("spring", "summer", "fall", "winter", "year-round")
- `longevity` (string): Duration of scent ("8-12 hours", "12+ hours", "24 hours")
- `concentration` (string): Fragrance concentration ("parfum", "EDP", "EDT", "cologne")
- `scentNotes` (object): Contains top, middle, and base notes
  - `top` (string[]): Array of top notes
  - `middle` (string[]): Array of middle/heart notes
  - `base` (string[]): Array of base notes
- `ingredients` (string[]): List of key ingredients
- `images` (string[]): Array of image URLs for the product
- `category` (string): Product category ("premium", "signature", "limited-edition", "best-seller")
- `inStock` (boolean): Availability status
- `createdAt` (date): Creation timestamp
- `updatedAt` (date): Last update timestamp

**Validation Rules:**
- `name` is required and must be 1-100 characters
- `price` must be a positive number
- `volume` must follow standard format (e.g., "50ml", "100ml")
- `scentNotes` must have at least one note in each category (top, middle, base)
- `images` must contain at least one valid image URL

## Navigation Menu Entity

**Fields:**
- `id` (string): Unique identifier for the menu item
- `title` (string): Display text for the menu item
- `path` (string): Route path (e.g., "/", "/products", "/about")
- `priority` (number): Order of appearance in navigation
- `isVisible` (boolean): Whether the item is visible in the menu
- `icon` (string): Optional icon identifier

**Validation Rules:**
- `title` is required and must be 1-50 characters
- `path` must be a valid URL path starting with "/"
- `priority` must be a positive integer

## Contact Information Entity

**Fields:**
- `phone` (string): Phone number in international format
- `email` (string): Business email address
- `address` (string): Physical address
- `city` (string): City name
- `country` (string): Country name
- `hours` (object): Business hours
  - `monday` (string): Hours for Monday
  - `tuesday` (string): Hours for Tuesday
  - `wednesday` (string): Hours for Wednesday
  - `thursday` (string): Hours for Thursday
  - `friday` (string): Hours for Friday
  - `saturday` (string): Hours for Saturday
  - `sunday` (string): Hours for Sunday

**Validation Rules:**
- `email` must be a valid email format
- `phone` must follow international format (+XX XXX XXX XXXX)
- `hours` values must be in HH:MM-HH:MM format

## Business Policies Entity

**Fields:**
- `id` (string): Policy identifier ("shipping", "returns", "privacy", "terms")
- `title` (string): Policy title
- `content` (string): Policy content in markdown format
- `lastUpdated` (date): Date of last policy update
- `isActive` (boolean): Whether the policy is currently active

**Validation Rules:**
- `id` must be one of the predefined values
- `title` is required and must be 1-100 characters
- `content` is required and must be at least 10 characters