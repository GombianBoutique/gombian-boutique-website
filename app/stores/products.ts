import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  gender: string;
  fragranceFamily: string;
  size: string;
  inStock: boolean;
  inventoryCount: number;
  images: string[];
  scentNotes: string[];
  ingredients: string[];
  rating: number;
  reviewCount: number;
}

interface ProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

export const useProductsStore = defineStore('products', () => {
  // State
  const state = ref<ProductsState>({
    products: [],
    loading: false,
    error: null
  });

  // Getters
  const getAllProducts = computed(() => state.value.products);
  
  const getProductById = computed(() => (id: string) => {
    return state.value.products.find(product => product.id === id);
  });

  const getProductsByCategory = computed(() => (category: string) => {
    return state.value.products.filter(product => product.category.toLowerCase() === category.toLowerCase());
  });

  const getProductsByGender = computed(() => (gender: string) => {
    return state.value.products.filter(product => product.gender.toLowerCase() === gender.toLowerCase());
  });

  const getInStockProducts = computed(() => {
    return state.value.products.filter(product => product.inStock);
  });

  const getOutOfStockProducts = computed(() => {
    return state.value.products.filter(product => !product.inStock);
  });

  const getFeaturedProducts = computed(() => {
    // Return top-rated products or featured products
    return [...state.value.products]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 8); // Return top 8 rated products
  });

  // Actions
  const setLoading = (loading: boolean) => {
    state.value.loading = loading;
  };

  const setError = (error: string | null) => {
    state.value.error = error;
  };

  const setProducts = (products: Product[]) => {
    state.value.products = products;
  };

  const addProduct = (product: Product) => {
    state.value.products.push(product);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    const index = state.value.products.findIndex(p => p.id === id);
    if (index !== -1) {
      state.value.products[index] = { ...state.value.products[index], ...updates };
    }
  };

  const removeProduct = (id: string) => {
    state.value.products = state.value.products.filter(p => p.id !== id);
  };

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);

    try {
      // Fetch from API endpoint - can be switched to real backend later
      const data = await $fetch('/api/products')
      
      state.value.products = data.products;
    } catch (error: any) {
      setError(error.message || 'Failed to fetch products');
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const searchProducts = (query: string) => {
    const lowerQuery = query.toLowerCase();
    return state.value.products.filter(product =>
      product.name.toLowerCase().includes(lowerQuery) ||
      product.description.toLowerCase().includes(lowerQuery) ||
      product.category.toLowerCase().includes(lowerQuery) ||
      product.fragranceFamily.toLowerCase().includes(lowerQuery)
    );
  };

  return {
    // State
    products: computed(() => state.value.products),
    loading: computed(() => state.value.loading),
    error: computed(() => state.value.error),

    // Getters
    getAllProducts,
    getProductById,
    getProductsByCategory,
    getProductsByGender,
    getInStockProducts,
    getOutOfStockProducts,
    getFeaturedProducts,

    // Actions
    setLoading,
    setError,
    setProducts,
    addProduct,
    updateProduct,
    removeProduct,
    fetchProducts,
    searchProducts
  };
});