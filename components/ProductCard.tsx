'use client';

import { useState } from 'react';
import { ShoppingCart, Heart } from 'lucide-react';
import { Product } from '@/lib/store/productStore';
import { useCartStore } from '@/lib/store/cartStore';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      category: product.category,
    });
  };

  const savings = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  return (
    <div
      className="product-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden bg-dark-bg">
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-full object-cover transition-transform duration-500 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
        />

        {/* Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          {product.badge && (
            <span className={`badge ${product.badge === 'New Drop' ? 'badge-blue' : 'badge-secondary'}`}>
              {product.badge}
            </span>
          )}
          {savings > 0 && (
            <span className="badge badge-blue">-{savings}%</span>
          )}
        </div>

        {/* Add to Cart Button - appears on hover */}
        {isHovered && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <button
              onClick={handleAddToCart}
              className="btn-primary flex items-center gap-2"
            >
              <ShoppingCart size={18} />
              Add to Cart
            </button>
          </div>
        )}

        {/* Wishlist Button */}
        <button className="absolute top-4 right-4 p-2 bg-dark-bg/80 rounded-full hover:bg-accent-blue hover:text-dark-bg transition-colors backdrop-blur-sm">
          <Heart size={18} />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-sm text-text-secondary mb-2">{product.category}</p>
        <h3 className="text-lg font-semibold text-text-primary mb-2 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-sm text-text-secondary mb-4 line-clamp-2">
          {product.description}
        </p>

        {/* Price */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xl font-bold text-accent-blue">
            R{product.price.toFixed(2)}
          </span>
          {product.compareAtPrice && (
            <span className="text-sm text-text-secondary line-through">
              R{product.compareAtPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Stock Status */}
        <div className="flex items-center justify-between">
          <span className={`text-sm font-semibold ${product.stock > 10 ? 'text-green-400' : 'text-red-400'}`}>
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of Stock'}
          </span>
        </div>

        {/* Variants */}
        {product.variants && product.variants.length > 0 && (
          <div className="mt-3 pt-3 border-t border-dark-border">
            <p className="text-xs text-text-secondary mb-2">Variants available:</p>
            <div className="flex flex-wrap gap-2">
              {product.variants.slice(0, 3).map((variant, idx) => (
                <span key={idx} className="text-xs bg-dark-bg px-2 py-1 rounded">
                  {variant}
                </span>
              ))}
              {product.variants.length > 3 && (
                <span className="text-xs bg-dark-bg px-2 py-1 rounded text-accent-blue">
                  +{product.variants.length - 3}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
