'use client';

import { useProductStore, Product } from '@/lib/store/productStore';
import ProductCard from '@/components/ProductCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const categoryMap: Record<string, Product['category']> = {
  'shoes': 'Shoes',
  'mens': "Men's Clothing",
  'womens': "Women's Clothing",
  'iphones': 'iPhones',
  'accessories': 'Electronic Accessories',
};

const categoryDescriptions: Record<string, string> = {
  'shoes': 'Premium streetwear and athletic footwear engineered for performance and style.',
  'mens': 'Modern apparel, jackets, and essentials for the contemporary man.',
  'womens': 'High-fashion and contemporary streetwear for the modern woman.',
  'iphones': 'Latest Apple devices with comprehensive specs and condition variants.',
  'accessories': 'Chargers, cases, audio gear, and premium peripherals.',
};

export default function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const { category } = params;
  const categoryName = categoryMap[category] || 'Shoes';
  const description = categoryDescriptions[category] || '';

  const products = useProductStore((state) =>
    state.getProductsByCategory(categoryName)
  );

  return (
    <main className="min-h-screen bg-dark-bg">
      <Navbar />

      {/* Category Header */}
      <div className="bg-gradient-dark border-b border-dark-border py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="section-title mb-4">{categoryName}</h1>
          <p className="section-subtitle max-w-2xl">{description}</p>
          <p className="text-text-secondary mt-4">
            Showing {products.length} product{products.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {products.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-text-secondary text-lg mb-4">
                No products available in this category yet.
              </p>
              <a href="/" className="btn-primary inline-block">
                Back to Home
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
