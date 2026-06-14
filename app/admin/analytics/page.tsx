'use client';

import { useProductStore } from '@/lib/store/productStore';
import { TrendingUp, BarChart3, PieChart } from 'lucide-react';

export default function AnalyticsPage() {
  const {
    products,
    getTotalRevenue,
    getTotalStock,
    getProductsByCategory,
  } = useProductStore();

  const totalRevenue = getTotalRevenue();
  const totalStock = getTotalStock();
  const avgPrice = products.length > 0 
    ? (products.reduce((sum, p) => sum + p.price, 0) / products.length).toFixed(2)
    : 0;

  const categoryStats = [
    'Shoes',
    "Men's Clothing",
    "Women's Clothing",
    'iPhones',
    'Electronic Accessories',
  ].map((cat) => ({
    category: cat,
    count: getProductsByCategory(cat as any).length,
    totalValue: getProductsByCategory(cat as any).reduce((sum, p) => sum + p.price * p.stock, 0),
  }));

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Analytics Dashboard</h1>
        <p className="text-text-secondary">
          Insights and metrics about your store performance
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card-dark">
          <div className="flex items-center justify-between mb-4">
            <p className="text-text-secondary text-sm">Total Revenue</p>
            <TrendingUp className="text-green-400" size={24} />
          </div>
          <p className="text-3xl font-bold text-accent-blue">R{totalRevenue.toFixed(2)}</p>
          <p className="text-xs text-green-400 mt-2">+12.5% from last month</p>
        </div>

        <div className="card-dark">
          <div className="flex items-center justify-between mb-4">
            <p className="text-text-secondary text-sm">Total Stock Value</p>
            <BarChart3 className="text-accent-silver" size={24} />
          </div>
          <p className="text-3xl font-bold">R{(totalStock * 10).toFixed(2)}</p>
          <p className="text-xs text-text-secondary mt-2">{totalStock} units</p>
        </div>

        <div className="card-dark">
          <div className="flex items-center justify-between mb-4">
            <p className="text-text-secondary text-sm">Avg Product Price</p>
            <TrendingUp className="text-accent-blue" size={24} />
          </div>
          <p className="text-3xl font-bold text-accent-blue">R{avgPrice}</p>
          <p className="text-xs text-text-secondary mt-2">{products.length} products</p>
        </div>

        <div className="card-dark">
          <div className="flex items-center justify-between mb-4">
            <p className="text-text-secondary text-sm">Conversion Rate</p>
            <PieChart className="text-accent-silver" size={24} />
          </div>
          <p className="text-3xl font-bold">3.24%</p>
          <p className="text-xs text-text-secondary mt-2">+0.45% vs last week</p>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Category Performance */}
        <div className="card-dark">
          <h3 className="text-lg font-bold mb-6">Category Performance</h3>
          <div className="space-y-4">
            {categoryStats.map((stat) => (
              <div key={stat.category}>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm font-semibold">{stat.category}</p>
                  <p className="text-sm text-accent-blue font-bold">R{stat.totalValue.toFixed(2)}</p>
                </div>
                <div className="w-full h-2 bg-dark-bg rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-accent rounded-full"
                    style={{
                      width: `${(stat.count / 50) * 100}%`,
                    }}
                  />
                </div>
                <p className="text-xs text-text-secondary mt-1">{stat.count} products</p>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performers */}
        <div className="card-dark">
          <h3 className="text-lg font-bold mb-6">Top Performing Products</h3>
          <div className="space-y-3">
            {products
              .sort((a, b) => (b.price * b.stock) - (a.price * a.stock))
              .slice(0, 5)
              .map((product, idx) => (
                <div key={product.id} className="flex items-center justify-between p-3 bg-dark-bg rounded">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-accent-blue/20 flex items-center justify-center text-accent-blue font-bold text-sm">
                      {idx + 1}
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{product.name}</p>
                      <p className="text-xs text-text-secondary">{product.category}</p>
                    </div>
                  </div>
                  <p className="text-accent-blue font-bold">
                    R{(product.price * product.stock).toFixed(2)}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Detailed Stats */}
      <div className="card-dark">
        <h3 className="text-lg font-bold mb-6">Detailed Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-dark-bg rounded">
            <p className="text-text-secondary text-sm mb-2">Average Order Value</p>
            <p className="text-2xl font-bold text-accent-blue">R287.50</p>
            <p className="text-xs text-green-400 mt-2">↑ 5.2% increase</p>
          </div>
          <div className="p-4 bg-dark-bg rounded">
            <p className="text-text-secondary text-sm mb-2">Customer Satisfaction</p>
            <p className="text-2xl font-bold text-accent-blue">4.8 ★</p>
            <p className="text-xs text-text-secondary mt-2">Based on 234 reviews</p>
          </div>
          <div className="p-4 bg-dark-bg rounded">
            <p className="text-text-secondary text-sm mb-2">Return Rate</p>
            <p className="text-2xl font-bold text-accent-blue">2.1%</p>
            <p className="text-xs text-green-400 mt-2">↓ 0.8% decrease</p>
          </div>
        </div>
      </div>
    </div>
  );
}
