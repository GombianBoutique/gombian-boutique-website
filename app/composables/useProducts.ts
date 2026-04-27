// Define types for product functionality
type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  formattedPrice: string;
  volume: string;
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
  inventoryCount?: number;
  rating?: number;
  reviewCount?: number;
  createdAt: string;
  updatedAt: string;
}

type ProductsResponse = {
  products: Product[];
  pagination?: {
    currentPage: number;
    totalPages: number;
    totalProducts: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export const useProducts = () => {
  const productsData = ref<ProductsResponse | null>(null);
  const loading = ref<boolean>(true);
  const error = ref<string | null>(null);

  const fetchProducts = async (): Promise<void> => {
    try {
      loading.value = true;
      // Fetch from API endpoint - with fallback to static JSON for SSG
      let data: ProductsResponse;
      try {
        data = await $fetch('/api/products') as unknown as ProductsResponse;
      } catch {
        // Fallback to static JSON file for SSG
        const products = await $fetch('/data/products.json') as unknown as Product[];
        data = { products, pagination: undefined };
      }
      productsData.value = data;
      error.value = null;
    } catch (err) {
      console.error('Error fetching products:', err);
      error.value = 'Failed to load products';
    } finally {
      loading.value = false;
    }
  };

  const getProductById = (id: string): Product | null => {
    if (!productsData.value || !productsData.value.products) return null;
    return productsData.value.products.find(product => product.id === id) || null;
  };

  const getProductsByCategory = (category: string): Product[] => {
    if (!productsData.value || !productsData.value.products) return [];
    return productsData.value.products.filter(product => product.category === category);
  };

  const getProductsByGender = (gender: string): Product[] => {
    if (!productsData.value || !productsData.value.products) return [];
    return productsData.value.products.filter(product => product.gender === gender);
  };

  const getProductsByFragranceFamily = (family: string): Product[] => {
    if (!productsData.value || !productsData.value.products) return [];
    return productsData.value.products.filter(product => product.fragranceFamily === family);
  };

  // Initialize data
  if (!productsData.value) {
    fetchProducts();
  }

  return {
    products: computed<Product[]>(() => productsData.value?.products || []),
    loading: computed<boolean>(() => loading.value),
    error: computed<string | null>(() => error.value),
    getProductById,
    getProductsByCategory,
    getProductsByGender,
    getProductsByFragranceFamily,
    fetchProducts
  };
};