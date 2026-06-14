'use client';

import { useProductStore } from '@/lib/store/productStore';
import {
  DollarSign,
  Package,
  ShoppingCart,
  AlertTriangle,
  TrendingUp,
} from 'lucide-react';

export default function AdminDashboard() {
  const {
    products,
    getTotalStock,
    getOutOfStockCount,
    getTotalRevenue,
    getLowStockProducts,
  } = useProductStore();

  const totalStock = getTotalStock();
  const outOfStockCount = getOutOfStockCount();
  const totalRevenue = getTotalRevenue();
  const lowStockProducts = getLowStockProducts();

  const metrics = [
    {
      label: 'Total Revenue',
      value: `R${totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      color: 'text-green-400',
      bgColor: 'bg-green-400/10',
      trend: '+12.5%',
      trendColor: 'text-green-400',
    },
    {
      label: 'Active Orders',
      value: Math.floor(Math.random() * 50) + 10,
      icon: ShoppingCart,
      color: 'text-accent-blue',
      bgColor: 'bg-accent-blue/10',
      trend: '+8.2%',
      trendColor: 'text-accent-blue',
    },
    {
      label: 'Total Stock',
      value: totalStock,
      icon: Package,
      color: 'text-accent-silver',
      bgColor: 'bg-accent-silver/10',
      trend: '-2.4%',
      trendColor: 'text-red-400',
    },
    {
      label: 'Low Stock Items',
      value: lowStockProducts.length,
      icon: AlertTriangle,
      color: 'text-red-400',
      bgColor: 'bg-red-400/10',
      trend: outOfStockCount > 0 ? `${outOfStockCount} Out of Stock` : 'All Stocked',
      trendColor: outOfStockCount > 0 ? 'text-red-400' : 'text-green-400',
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome back, Merchant</h1>
        <p className="text-text-secondary">
          Here's what's happening with your store today.
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, idx) => {
          const Icon = metric.icon;
          return (
            <div
              key={idx}
              className="card-dark"
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`${metric.bgColor} p-3 rounded-lg`}
                >
                  <Icon size={24} className={metric.color} />
                </div>
                <div className={`text-sm font-semibold ${metric.trendColor} flex items-center gap-1`}>
                  <TrendingUp size={14} />
                  {metric.trend}
                </div>
              </div>
              <p className="text-text-secondary text-sm mb-1">{metric.label}</p>
              <p className="text-3xl font-bold">{metric.value}</p>
            </div>
          );
        })}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <div className="card-dark">
          <h3 className="text-lg font-bold mb-4">Top Products</h3>
          <div className="space-y-3">
            {products.slice(0, 5).map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between p-3 bg-dark-bg rounded"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-10 h-10 rounded object-cover"
                  />
                  <div>
                    <p className="font-semibold text-sm">{product.name}</p>
                    <p className="text-xs text-text-secondary">{product.category}</p>
                  </div>
                </div>
                <span className="text-accent-blue font-bold">R{product.price.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card-dark">
          <h3 className="text-lg font-bold mb-4">Inventory Status</h3>
          <div className="space-y-3">
            <div className="p-3 bg-green-400/10 rounded">
              <p className="text-green-400 font-semibold text-sm">
                ✓ {products.length} Products Active
              </p>
            </div>
            <div className="p-3 bg-yellow-400/10 rounded">
              <p className="text-yellow-400 font-semibold text-sm">
                ⚠ {lowStockProducts.length} Low Stock Items
              </p>
            </div>
            <div className="p-3 bg-red-400/10 rounded">
              <p className="text-red-400 font-semibold text-sm">
                ✕ {outOfStockCount} Out of Stock
              </p>
            </div>
            <div className="p-3 bg-accent-blue/10 rounded">
              <p className="text-accent-blue font-semibold text-sm">
                → Average Stock Level: {Math.round(totalStock / products.length)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
