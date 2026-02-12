// types/product.d.ts
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number; // Price in cents
  currency: string; // Currency code (e.g., 'USD', 'EUR', 'ZAR')
  formattedPrice: string; // Human-readable price (e.g., 'R 150')
  volume: string; // Product volume (e.g., '30ml', '60ml', '100ml')
  gender: 'male' | 'female' | 'unisex' | 'couple';
  fragranceFamily: string; // Fragrance family classification (e.g., 'floral', 'woody')
  season: string; // Recommended season(s) for use (e.g., 'year-round', 'summer')
  longevity: string; // Expected longevity (e.g., '6-8 hours')
  concentration: string; // Concentration type (e.g., 'EDT', 'EDP', 'Parfum')
  scentNotes: {
    top: string[];
    middle: string[];
    base: string[];
  };
  ingredients: string[]; // List of ingredients
  images: string[]; // Array of image URLs
  category: 'best-seller' | 'premium' | 'complementary' | 'gift-set' | 'limited-edition';
  inStock: boolean;
  inventoryCount: number; // Number of items in stock
  createdAt: Date;
  updatedAt: Date;
  isFeatured: boolean;
  rating?: number; // Average customer rating (0-5 scale)
  reviewCount?: number; // Number of customer reviews
}

export interface ProductFilter {
  category?: string;
  gender?: string;
  fragranceFamily?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  page?: number;
  limit?: number;
}