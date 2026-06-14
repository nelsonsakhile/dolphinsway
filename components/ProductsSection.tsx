'use client';

import ProductCard from './ProductCard';
import { useProductStore } from '@/lib/store/productStore';

export default function ProductsSection() {
  const products = useProductStore((state) => state.products);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-bg">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="section-title mb-4">New Drops</h2>
          <p className="section-subtitle">Handpicked products from our latest collection</p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <button className="btn-primary">
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
}
