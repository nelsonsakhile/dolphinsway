import { create } from 'zustand';

export interface Product {
  id: string;
  name: string;
  category: 'Shoes' | "Men's Clothing" | "Women's Clothing" | 'iPhones' | 'Electronic Accessories';
  price: number;
  compareAtPrice?: number;
  stock: number;
  description: string;
  image: string;
  images?: string[];
  badge?: 'New Drop' | 'Low Stock' | 'Sale';
  variants?: string[];
  createdAt: string;
}

interface ProductStore {
  products: Product[];
  addProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  getProductsByCategory: (category: Product['category']) => Product[];
  getLowStockProducts: () => Product[];
  getTotalRevenue: () => number;
  getTotalStock: () => number;
  getOutOfStockCount: () => number;
}

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [
    {
      id: '1',
      name: 'Premium Air Runners',
      category: 'Shoes',
      price: 249.99,
      compareAtPrice: 349.99,
      stock: 15,
      description: 'Lightweight ultra-responsive running shoes with advanced cushioning technology',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop',
      badge: 'New Drop',
      variants: ['Size 7', 'Size 8', 'Size 9', 'Size 10', 'Size 11', 'Size 12'],
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      name: 'Carbon Tech Jacket',
      category: "Men's Clothing",
      price: 199.99,
      stock: 8,
      description: 'Weather-resistant technical jacket with innovative carbon-fiber reinforced panels',
      image: 'https://images.unsplash.com/photo-1551028719-00167b16ebc5?w=500&h=500&fit=crop',
      badge: 'Low Stock',
      variants: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      createdAt: new Date().toISOString(),
    },
    {
      id: '3',
      name: 'Quantum Pro Wireless Earbuds',
      category: 'Electronic Accessories',
      price: 179.99,
      compareAtPrice: 249.99,
      stock: 32,
      description: 'Noise-cancelling earbuds with 48-hour battery and premium sound quality',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
      variants: ['Black', 'Silver', 'White'],
      createdAt: new Date().toISOString(),
    },
    {
      id: '4',
      name: 'Women\'s Futuristic Crop Top',
      category: "Women's Clothing",
      price: 89.99,
      stock: 24,
      description: 'Minimalist design with premium sustainable fabric technology',
      image: 'https://images.unsplash.com/photo-1508272936778-10b2b12f0a16?w=500&h=500&fit=crop',
      variants: ['XS', 'S', 'M', 'L', 'XL'],
      createdAt: new Date().toISOString(),
    },
    {
      id: '5',
      name: 'iPhone 15 Pro Max',
      category: 'iPhones',
      price: 1199.99,
      stock: 5,
      description: 'Latest generation with advanced A17 Pro chip and titanium construction',
      image: 'https://images.unsplash.com/photo-1592286927505-1fed6c2d4e5b?w=500&h=500&fit=crop',
      badge: 'Low Stock',
      variants: ['128GB Black', '256GB Black', '512GB Silver', '1TB Gold'],
      createdAt: new Date().toISOString(),
    },
  ],
  addProduct: (product) =>
    set((state) => ({
      products: [product, ...state.products],
    })),
  deleteProduct: (id) =>
    set((state) => ({
      products: state.products.filter((p) => p.id !== id),
    })),
  updateProduct: (id, productData) =>
    set((state) => ({
      products: state.products.map((p) => (p.id === id ? { ...p, ...productData } : p)),
    })),
  getProductsByCategory: (category) => {
    return get().products.filter((p) => p.category === category);
  },
  getLowStockProducts: () => {
    return get().products.filter((p) => p.stock < 10);
  },
  getTotalRevenue: () => {
    return get().products.reduce((total, p) => total + p.price * (100 - p.stock), 0);
  },
  getTotalStock: () => {
    return get().products.reduce((total, p) => total + p.stock, 0);
  },
  getOutOfStockCount: () => {
    return get().products.filter((p) => p.stock === 0).length;
  },
}));
