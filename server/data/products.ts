// server/data/products.ts
// Mock product data - matches the structure in /public/data/products.json
// This allows for easy switching between mock and real API data

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  formattedPrice: string;
  volume: string;
  availableVolumes?: string[];
  gender: string;
  fragranceFamily: string;
  season: string;
  longevity: string;
  concentration: string;
  scentNotes: {
    top: string[];
    middle: string[];
    base: string[];
  };
  ingredients: string[];
  images: string[];
  category: string;
  inStock: boolean;
  inventoryCount: number;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
}

// Mock products data - same structure as /public/data/products.json
export const products: Product[] = [
  {
    id: '30ml-perfume',
    name: '30ml Perfume',
    description: 'Our signature 30ml perfume bottle, perfect for everyday wear or as a thoughtful gift. Experience our nature-inspired scents that transport and transform any space.',
    price: 120,
    currency: 'ZAR',
    formattedPrice: 'R 120',
    volume: '30ml',
    availableVolumes: ['30ml'],
    gender: 'unisex',
    fragranceFamily: 'various',
    season: 'year-round',
    longevity: '6-8 hours',
    concentration: 'EDT',
    scentNotes: {
      top: ['bergamot', 'citrus'],
      middle: ['jasmine', 'rose'],
      base: ['vanilla', 'musk']
    },
    ingredients: ['alcohol denat.', 'water', 'fragrance', 'limonene', 'linalool', 'citronellol'],
    images: ['/images/products/30ml_perfumes.jpeg'],
    category: 'perfume',
    inStock: true,
    inventoryCount: 50,
    rating: 4.5,
    reviewCount: 28,
    createdAt: '2026-01-10T00:00:00.000Z',
    updatedAt: '2026-01-10T00:00:00.000Z'
  },
  {
    id: '60ml-perfume',
    name: '60ml Perfume',
    description: 'Our premium 60ml perfume bottle, offering extended wear and luxury. Experience our nature-inspired scents that connect you with fashion, relaxation, escape, and a touch of luxury.',
    price: 170,
    currency: 'ZAR',
    formattedPrice: 'R 170',
    volume: '60ml',
    availableVolumes: ['60ml'],
    gender: 'unisex',
    fragranceFamily: 'various',
    season: 'year-round',
    longevity: '8-10 hours',
    concentration: 'EDP',
    scentNotes: {
      top: ['bergamot', 'citrus'],
      middle: ['jasmine', 'rose'],
      base: ['vanilla', 'musk']
    },
    ingredients: ['alcohol denat.', 'water', 'fragrance', 'limonene', 'linalool', 'citronellol'],
    images: ['/images/products/60ml_perfumes.jpg'],
    category: 'perfume',
    inStock: true,
    inventoryCount: 35,
    rating: 4.7,
    reviewCount: 42,
    createdAt: '2026-01-10T00:00:00.000Z',
    updatedAt: '2026-01-10T00:00:00.000Z'
  },
  {
    id: 'tissue-oil',
    name: 'Tissue Oil',
    description: 'Luxurious tissue oil enriched with natural ingredients. Perfect for moisturizing and nourishing your skin while leaving a subtle, elegant fragrance.',
    price: 80,
    currency: 'ZAR',
    formattedPrice: 'R 80',
    volume: 'standard',
    availableVolumes: ['standard'],
    gender: 'unisex',
    fragranceFamily: 'various',
    season: 'year-round',
    longevity: '4-6 hours',
    concentration: 'Tissue Oil',
    scentNotes: {
      top: ['bergamot', 'citrus'],
      middle: ['jasmine', 'rose'],
      base: ['vanilla', 'musk']
    },
    ingredients: ['mineral oil', 'fragrance', 'vitamin E', 'aloe vera extract'],
    images: ['/images/products/tissue_oil_lotions.jpg'],
    category: 'body-care',
    inStock: true,
    inventoryCount: 40,
    rating: 4.4,
    reviewCount: 15,
    createdAt: '2026-01-10T00:00:00.000Z',
    updatedAt: '2026-01-10T00:00:00.000Z'
  },
  {
    id: '100ml-lotion',
    name: '100ml Lotion',
    description: 'Our luxurious 100ml body lotion enriched with natural ingredients. Perfect for daily moisturizing and complementing your fragrance routine.',
    price: 60,
    currency: 'ZAR',
    formattedPrice: 'R 60',
    volume: '100ml',
    availableVolumes: ['100ml'],
    gender: 'unisex',
    fragranceFamily: 'various',
    season: 'year-round',
    longevity: '4-6 hours',
    concentration: 'Body Lotion',
    scentNotes: {
      top: ['bergamot', 'citrus'],
      middle: ['jasmine', 'rose'],
      base: ['vanilla', 'musk']
    },
    ingredients: ['water', 'glycerin', 'fragrance', 'aloe vera', 'vitamin E'],
    images: ['/images/products/tissue_oil_lotions.jpg'],
    category: 'body-care',
    inStock: true,
    inventoryCount: 60,
    rating: 4.3,
    reviewCount: 19,
    createdAt: '2026-01-10T00:00:00.000Z',
    updatedAt: '2026-01-10T00:00:00.000Z'
  },
  {
    id: '200ml-lotion',
    name: '200ml Lotion',
    description: 'Our premium 200ml body lotion, offering extended use and deep hydration. Enriched with natural ingredients to complement your fragrance routine.',
    price: 100,
    currency: 'ZAR',
    formattedPrice: 'R 100',
    volume: '200ml',
    availableVolumes: ['200ml'],
    gender: 'unisex',
    fragranceFamily: 'various',
    season: 'year-round',
    longevity: '4-6 hours',
    concentration: 'Body Lotion',
    scentNotes: {
      top: ['bergamot', 'citrus'],
      middle: ['jasmine', 'rose'],
      base: ['vanilla', 'musk']
    },
    ingredients: ['water', 'glycerin', 'fragrance', 'aloe vera', 'vitamin E', 'shea butter'],
    images: ['/images/products/tissue_oil_lotions.jpg'],
    category: 'body-care',
    inStock: true,
    inventoryCount: 45,
    rating: 4.5,
    reviewCount: 22,
    createdAt: '2026-01-10T00:00:00.000Z',
    updatedAt: '2026-01-10T00:00:00.000Z'
  },
  {
    id: 'his-hers-30ml-combo',
    name: 'His & Hers 30ml Perfume Combo',
    description: 'Perfect gift set featuring both masculine and feminine interpretations of our signature scents in 30ml bottles. An ideal present for couples.',
    price: 200,
    currency: 'ZAR',
    formattedPrice: 'R 200',
    volume: '30ml each',
    availableVolumes: ['30ml each'],
    gender: 'couple',
    fragranceFamily: 'various',
    season: 'year-round',
    longevity: '6-8 hours',
    concentration: 'EDT',
    scentNotes: {
      top: ['bergamot', 'citrus'],
      middle: ['jasmine', 'rose'],
      base: ['vanilla', 'musk']
    },
    ingredients: ['alcohol denat.', 'water', 'fragrance', 'limonene', 'linalool', 'citronellol'],
    images: ['/images/products/combo.jpg'],
    category: 'combo',
    inStock: true,
    inventoryCount: 25,
    rating: 4.8,
    reviewCount: 35,
    createdAt: '2026-01-10T00:00:00.000Z',
    updatedAt: '2026-01-10T00:00:00.000Z'
  },
  {
    id: 'his-hers-60ml-combo',
    name: 'His & Hers 60ml Perfume Combo',
    description: 'Premium gift set featuring both masculine and feminine interpretations of our signature scents in 60ml bottles. A luxurious present for special occasions.',
    price: 300,
    currency: 'ZAR',
    formattedPrice: 'R 300',
    volume: '60ml each',
    availableVolumes: ['60ml each'],
    gender: 'couple',
    fragranceFamily: 'various',
    season: 'year-round',
    longevity: '8-10 hours',
    concentration: 'EDP',
    scentNotes: {
      top: ['bergamot', 'citrus'],
      middle: ['jasmine', 'rose'],
      base: ['vanilla', 'musk']
    },
    ingredients: ['alcohol denat.', 'water', 'fragrance', 'limonene', 'linalool', 'citronellol'],
    images: ['/images/products/combo.jpg'],
    category: 'combo',
    inStock: true,
    inventoryCount: 20,
    rating: 4.9,
    reviewCount: 28,
    createdAt: '2026-01-10T00:00:00.000Z',
    updatedAt: '2026-01-10T00:00:00.000Z'
  },
  {
    id: 'ladies-30ml-essential-combo',
    name: 'Ladies 30ml Perfume + 100ml Lotion Essential Combo',
    description: 'Essential combo set for her featuring a 30ml perfume and matching 100ml body lotion. Perfect for daily fragrance layering.',
    price: 150,
    currency: 'ZAR',
    formattedPrice: 'R 150',
    volume: '30ml + 100ml',
    availableVolumes: ['30ml + 100ml'],
    gender: 'female',
    fragranceFamily: 'various',
    season: 'year-round',
    longevity: '6-8 hours',
    concentration: 'EDT + Lotion',
    scentNotes: {
      top: ['bergamot', 'citrus'],
      middle: ['jasmine', 'rose'],
      base: ['vanilla', 'musk']
    },
    ingredients: ['alcohol denat.', 'water', 'fragrance', 'glycerin', 'aloe vera'],
    images: ['/images/products/combo.jpg'],
    category: 'combo',
    inStock: true,
    inventoryCount: 30,
    rating: 4.6,
    reviewCount: 24,
    createdAt: '2026-01-10T00:00:00.000Z',
    updatedAt: '2026-01-10T00:00:00.000Z'
  },
  {
    id: 'gents-30ml-essential-combo',
    name: 'Gents 30ml Perfume + 100ml Lotion Essential Combo',
    description: 'Essential combo set for him featuring a 30ml perfume and matching 100ml body lotion. Perfect for daily fragrance layering.',
    price: 150,
    currency: 'ZAR',
    formattedPrice: 'R 150',
    volume: '30ml + 100ml',
    availableVolumes: ['30ml + 100ml'],
    gender: 'male',
    fragranceFamily: 'various',
    season: 'year-round',
    longevity: '6-8 hours',
    concentration: 'EDT + Lotion',
    scentNotes: {
      top: ['bergamot', 'citrus'],
      middle: ['sandalwood', 'cedar'],
      base: ['musk', 'amber']
    },
    ingredients: ['alcohol denat.', 'water', 'fragrance', 'glycerin', 'aloe vera'],
    images: ['/images/products/combo.jpg'],
    category: 'combo',
    inStock: true,
    inventoryCount: 30,
    rating: 4.6,
    reviewCount: 22,
    createdAt: '2026-01-10T00:00:00.000Z',
    updatedAt: '2026-01-10T00:00:00.000Z'
  },
  {
    id: 'ladies-60ml-essential-combo',
    name: 'Ladies 60ml Perfume + 200ml Lotion Essential Combo',
    description: 'Premium combo set for her featuring a 60ml perfume and matching 200ml body lotion. Extended wear luxury for the discerning woman.',
    price: 250,
    currency: 'ZAR',
    formattedPrice: 'R 250',
    volume: '60ml + 200ml',
    availableVolumes: ['60ml + 200ml'],
    gender: 'female',
    fragranceFamily: 'various',
    season: 'year-round',
    longevity: '8-10 hours',
    concentration: 'EDP + Lotion',
    scentNotes: {
      top: ['bergamot', 'citrus'],
      middle: ['jasmine', 'rose'],
      base: ['vanilla', 'musk']
    },
    ingredients: ['alcohol denat.', 'water', 'fragrance', 'glycerin', 'aloe vera', 'shea butter'],
    images: ['/images/products/combo.jpg'],
    category: 'combo',
    inStock: true,
    inventoryCount: 20,
    rating: 4.7,
    reviewCount: 18,
    createdAt: '2026-01-10T00:00:00.000Z',
    updatedAt: '2026-01-10T00:00:00.000Z'
  },
  {
    id: 'gents-60ml-essential-combo',
    name: 'Gents 60ml Perfume + 200ml Lotion Essential Combo',
    description: 'Premium combo set for him featuring a 60ml perfume and matching 200ml body lotion. Extended wear luxury for the discerning gentleman.',
    price: 250,
    currency: 'ZAR',
    formattedPrice: 'R 250',
    volume: '60ml + 200ml',
    availableVolumes: ['60ml + 200ml'],
    gender: 'male',
    fragranceFamily: 'various',
    season: 'year-round',
    longevity: '8-10 hours',
    concentration: 'EDP + Lotion',
    scentNotes: {
      top: ['bergamot', 'citrus'],
      middle: ['sandalwood', 'cedar'],
      base: ['musk', 'amber']
    },
    ingredients: ['alcohol denat.', 'water', 'fragrance', 'glycerin', 'aloe vera', 'shea butter'],
    images: ['/images/products/combo.jpg'],
    category: 'combo',
    inStock: true,
    inventoryCount: 20,
    rating: 4.7,
    reviewCount: 16,
    createdAt: '2026-01-10T00:00:00.000Z',
    updatedAt: '2026-01-10T00:00:00.000Z'
  },
  {
    id: 'ladies-ultimate-combo',
    name: 'Ladies Ultimate Combo + Roll On',
    description: 'The ultimate luxury set for her featuring perfume, lotion, roll-on applicator, and decorative cap. A complete fragrance experience in one elegant package.',
    price: 500,
    currency: 'ZAR',
    formattedPrice: 'R 500',
    volume: 'complete set',
    availableVolumes: ['complete set'],
    gender: 'female',
    fragranceFamily: 'various',
    season: 'year-round',
    longevity: '8-12 hours',
    concentration: 'Ultimate Set',
    scentNotes: {
      top: ['bergamot', 'citrus'],
      middle: ['jasmine', 'rose'],
      base: ['vanilla', 'musk']
    },
    ingredients: ['alcohol denat.', 'water', 'fragrance', 'glycerin', 'aloe vera', 'vitamin E'],
    images: ['/images/products/gift_sets_01.jpg', '/images/products/gift_sets_00.jpg'],
    category: 'gift-set',
    inStock: true,
    inventoryCount: 15,
    rating: 4.9,
    reviewCount: 12,
    createdAt: '2026-01-10T00:00:00.000Z',
    updatedAt: '2026-01-10T00:00:00.000Z'
  },
  {
    id: 'gents-ultimate-combo',
    name: 'Gents Ultimate Combo - Perfume, Lotion, Roll On & Cap',
    description: 'The ultimate luxury set for him featuring perfume, lotion, roll-on applicator, and decorative cap. A complete fragrance experience in one elegant package.',
    price: 450,
    currency: 'ZAR',
    formattedPrice: 'R 450',
    volume: 'complete set',
    availableVolumes: ['complete set'],
    gender: 'male',
    fragranceFamily: 'various',
    season: 'year-round',
    longevity: '8-12 hours',
    concentration: 'Ultimate Set',
    scentNotes: {
      top: ['bergamot', 'citrus'],
      middle: ['sandalwood', 'cedar'],
      base: ['musk', 'amber']
    },
    ingredients: ['alcohol denat.', 'water', 'fragrance', 'glycerin', 'aloe vera', 'vitamin E'],
    images: ['/images/products/gift_sets_01.jpg','/images/products/gift_sets_00.jpg'],
    category: 'gift-set',
    inStock: true,
    inventoryCount: 15,
    rating: 4.9,
    reviewCount: 10,
    createdAt: '2026-01-10T00:00:00.000Z',
    updatedAt: '2026-01-10T00:00:00.000Z'
  },
  {
    id: 'his-hers-ultimate-combo',
    name: 'His & Hers Ultimate Combo',
    description: 'The ultimate couples gift set featuring complete fragrance collections for both him and her. The perfect luxury gift for special occasions.',
    price: 500,
    currency: 'ZAR',
    formattedPrice: 'R 500',
    volume: 'complete set',
    availableVolumes: ['complete set'],
    gender: 'couple',
    fragranceFamily: 'various',
    season: 'year-round',
    longevity: '8-12 hours',
    concentration: 'Ultimate Set',
    scentNotes: {
      top: ['bergamot', 'citrus'],
      middle: ['jasmine', 'rose', 'sandalwood'],
      base: ['vanilla', 'musk', 'amber']
    },
    ingredients: ['alcohol denat.', 'water', 'fragrance', 'glycerin', 'aloe vera', 'vitamin E'],
    images: ['/images/products/gift_sets_01.jpg','/images/products/gift_sets_00.jpg'],
    category: 'gift-set',
    inStock: true,
    inventoryCount: 12,
    rating: 5.0,
    reviewCount: 8,
    createdAt: '2026-01-10T00:00:00.000Z',
    updatedAt: '2026-01-10T00:00:00.000Z'
  },
  {
    id: 'caps',
    name: 'Caps',
    description: 'Decorative perfume bottle caps available in various colors. Add a personal touch to your fragrance collection with these elegant accessories.',
    price: 50,
    currency: 'ZAR',
    formattedPrice: 'R 50',
    volume: 'standard',
    availableVolumes: ['standard'],
    gender: 'unisex',
    fragranceFamily: 'accessory',
    season: 'year-round',
    longevity: 'N/A',
    concentration: 'Accessory',
    scentNotes: {
      top: [],
      middle: [],
      base: []
    },
    ingredients: ['plastic', 'metal alloy'],
    images: ['/images/products/caps.jpeg'],
    category: 'accessory',
    inStock: true,
    inventoryCount: 100,
    rating: 4.2,
    reviewCount: 8,
    createdAt: '2026-01-10T00:00:00.000Z',
    updatedAt: '2026-01-10T00:00:00.000Z'
  }
];
