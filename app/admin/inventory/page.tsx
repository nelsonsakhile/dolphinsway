'use client';

import { useState } from 'react';
import { useProductStore } from '@/lib/store/productStore';
import { Trash2, Edit, Filter } from 'lucide-react';

export default function InventoryPage() {
  const products = useProductStore((state) => state.products);
  const deleteProduct = useProductStore((state) => state.deleteProduct);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [showLowStockOnly, setShowLowStockOnly] = useState(false);

  const categories = [
    'All Categories',
    'Shoes',
    "Men's Clothing",
    "Women's Clothing",
    'iPhones',
    'Electronic Accessories',
  ];

  const filteredProducts = products.filter((product) => {
    const categoryMatch =
      !selectedCategory || selectedCategory === 'All Categories' || product.category === selectedCategory;
    const stockMatch = !showLowStockOnly || product.stock < 10;
    return categoryMatch && stockMatch;
  });

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Inventory Management</h1>
        <p className="text-text-secondary">
          View and manage all products in your store
        </p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex items-center gap-2">
          <Filter size={20} className="text-accent-blue" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="input-dark"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat} className="bg-dark-card">
                {cat}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={() => setShowLowStockOnly(!showLowStockOnly)}
          className={`px-4 py-2 rounded-lg transition-all ${
            showLowStockOnly
              ? 'bg-red-400/20 border border-red-400 text-red-400'
              : 'bg-dark-card border border-dark-border text-text-secondary hover:text-accent-blue'
          }`}
        >
          {showLowStockOnly ? '⚠ Low Stock Only' : 'Show All'}
        </button>

        <div className="text-text-secondary text-sm flex items-center">
          Showing {filteredProducts.length} of {products.length} products
        </div>
      </div>

      {/* Products Table */}
      <div className="card-dark overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-dark-border">
                <th className="text-left px-6 py-4 text-sm font-semibold text-text-secondary">
                  Product
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-text-secondary">
                  Category
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-text-secondary">
                  Price
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-text-secondary">
                  Stock
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-text-secondary">
                  Status
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-text-secondary">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-text-secondary">
                    No products found
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b border-dark-border hover:bg-dark-bg transition-colors"
                  >
                    {/* Product */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 rounded object-cover border border-dark-border"
                        />
                        <div>
                          <p className="font-semibold text-text-primary truncate max-w-xs">
                            {product.name}
                          </p>
                          <p className="text-xs text-text-secondary">
                            ID: {product.id}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-6 py-4">
                      <span className="text-sm text-text-secondary">{product.category}</span>
                    </td>

                    {/* Price */}
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-accent-blue">
                          R{product.price.toFixed(2)}
                        </p>
                        {product.compareAtPrice && (
                          <p className="text-xs text-text-secondary line-through">
                            R{product.compareAtPrice.toFixed(2)}
                          </p>
                        )}
                      </div>
                    </td>

                    {/* Stock */}
                    <td className="px-6 py-4">
                      <p className="font-semibold">{product.stock}</p>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      {product.stock === 0 ? (
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-red-400/10 text-red-400">
                          Out of Stock
                        </span>
                      ) : product.stock < 10 ? (
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-yellow-400/10 text-yellow-400">
                          Low Stock
                        </span>
                      ) : (
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-green-400/10 text-green-400">
                          In Stock
                        </span>
                      )}
                      {product.badge && (
                        <p className="text-xs text-accent-blue mt-1">{product.badge}</p>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button className="p-2 text-text-secondary hover:text-accent-blue hover:bg-dark-bg rounded transition-colors">
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm('Delete this product?')) {
                              deleteProduct(product.id);
                            }
                          }}
                          className="p-2 text-text-secondary hover:text-red-400 hover:bg-dark-bg rounded transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
