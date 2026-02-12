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
      // Simulate API call
      // In a real application, you would fetch from an API endpoint
      await new Promise(resolve => setTimeout(resolve, 500));

      // Mock data - in a real app, this would come from an API
      const mockProducts: Product[] = [
        {
          id: '1',
          name: 'Ocean Breeze',
          description: 'A refreshing scent reminiscent of ocean waves and sea salt.',
          price: 89.99,
          category: 'perfume',
          gender: 'unisex',
          fragranceFamily: 'fresh',
          size: '100ml',
          inStock: true,
          inventoryCount: 15,
          images: ['/images/products/ocean-breeze.jpg'],
          scentNotes: ['bergamot', 'sea salt', 'white musk'],
          ingredients: ['alcohol denat.', 'fragrance', 'water'],
          rating: 4.7,
          reviewCount: 42
        },
        {
          id: '2',
          name: 'Royal Musk',
          description: 'Rich and warm with a luxurious touch of royal elegance.',
          price: 129.99,
          category: 'perfume',
          gender: 'men',
          fragranceFamily: 'woody',
          size: '100ml',
          inStock: true,
          inventoryCount: 8,
          images: ['/images/products/royal-musk.jpg'],
          scentNotes: ['musk', 'amber', 'cedar'],
          ingredients: ['alcohol denat.', 'fragrance', 'water'],
          rating: 4.9,
          reviewCount: 31
        },
        {
          id: '3',
          name: 'Spring Garden',
          description: 'A floral bouquet capturing the essence of a blooming spring garden.',
          price: 79.99,
          category: 'perfume',
          gender: 'women',
          fragranceFamily: 'floral',
          size: '80ml',
          inStock: true,
          inventoryCount: 22,
          images: ['/images/products/spring-garden.jpg'],
          scentNotes: ['jasmine', 'rose', 'lily of the valley'],
          ingredients: ['alcohol denat.', 'fragrance', 'water'],
          rating: 4.5,
          reviewCount: 56
        },
        {
          id: '4',
          name: 'Midnight Noir',
          description: 'Mysterious and seductive, perfect for evening wear.',
          price: 119.99,
          category: 'perfume',
          gender: 'unisex',
          fragranceFamily: 'oriental',
          size: '100ml',
          inStock: false,
          inventoryCount: 0,
          images: ['/images/products/midnight-noir.jpg'],
          scentNotes: ['vanilla', 'tonka bean', 'oud'],
          ingredients: ['alcohol denat.', 'fragrance', 'water'],
          rating: 4.8,
          reviewCount: 38
        }
      ];

      state.value.products = mockProducts;
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

  // Initialize products if empty
  if (state.value.products.length === 0) {
    fetchProducts();
  }

  return {
    // State
    products: state.value.products,
    loading: state.value.loading,
    error: state.value.error,

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