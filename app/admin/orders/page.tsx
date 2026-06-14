 'use client';

import { useState, useEffect, type ChangeEvent, type FormEvent } from 'react';
import { ShoppingCart, CheckCircle, Clock, XCircle, Plus, X } from 'lucide-react';

type OrderForm = {
  customer: string;
  description: string;
  items: number;
  total: number;
  status: string;
  date: string;
};

export default function OrdersPage() {
  const [orders, setOrders] = useState([
    {
      id: 'ORD-001',
      customer: 'Alex Chen',
      total: 249.99,
      status: 'completed',
      date: '2024-06-01',
      items: 1,
      description: 'Premium Air Runners',
    },
    {
      id: 'ORD-002',
      customer: 'Jordan Martinez',
      total: 599.99,
      status: 'processing',
      date: '2024-06-02',
      items: 3,
      description: 'Carbon Tech Jacket',
    },
    {
      id: 'ORD-003',
      customer: 'Sam Park',
      total: 1199.99,
      status: 'pending',
      date: '2024-06-03',
      items: 1,
      description: 'iPhone 15 Pro Max',
    },
    {
      id: 'ORD-004',
      customer: 'Taylor Anderson',
      total: 89.99,
      status: 'cancelled',
      date: '2024-06-04',
      items: 1,
      description: 'Women\'s Futuristic Crop Top',
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOrderId, setEditingOrderId] = useState<string | null>(null);
  const [form, setForm] = useState<OrderForm>({
    customer: '',
    description: '',
    items: 1,
    total: 0,
    status: 'processing',
    date: '',
  });

  useEffect(() => {
    setForm((prev) => ({ ...prev, date: new Date().toISOString().slice(0, 10) }));
  }, []);

  const resetForm = () => {
    setForm({
      customer: '',
      description: '',
      items: 1,
      total: 0,
      status: 'processing',
      date: new Date().toISOString().slice(0, 10),
    });
    setEditingOrderId(null);
  };

  const openAddModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const openEditModal = (order: any) => {
    setEditingOrderId(order.id);
    setForm({
      customer: order.customer,
      description: order.description || '',
      items: order.items,
      total: order.total,
      status: order.status,
      date: order.date,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingOrderId(null);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'items' ? parseInt(value || '0', 10) : name === 'total' ? parseFloat(value || '0') : value,
    } as OrderForm));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const orderData = {
      id: editingOrderId ? editingOrderId : `ORD-${Date.now().toString().slice(-6)}`,
      customer: form.customer || 'Manual Order',
      description: form.description || 'N/A',
      total: form.total || 0,
      status: form.status,
      date: form.date,
      items: form.items || 0,
    };

    if (editingOrderId) {
      setOrders((s) => s.map((order) => (order.id === editingOrderId ? orderData : order)));
    } else {
      setOrders((s) => [orderData, ...s]);
    }

    resetForm();
    closeModal();
  };

  const statusConfig = {
    completed: { color: 'text-green-400', bg: 'bg-green-400/10', icon: CheckCircle },
    processing: { color: 'text-accent-blue', bg: 'bg-accent-blue/10', icon: Clock },
    pending: { color: 'text-yellow-400', bg: 'bg-yellow-400/10', icon: Clock },
    cancelled: { color: 'text-red-400', bg: 'bg-red-400/10', icon: XCircle },
  };

  const formatOrderDate = (value: string) => {
    const parts = value.split('-');
    if (parts.length !== 3) return value;
    return `${parts[0].slice(2)}-${parts[1]}-${parts[2]}`;
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Orders Tracker</h1>
        <p className="text-text-secondary">
          Manage and track customer orders
        </p>
      </div>

      {/* Add Order Button */}
      <div className="mb-6 flex justify-end gap-3">
        <button onClick={openAddModal} className="btn-primary inline-flex items-center gap-2">
          <Plus size={16} />
          Add Order
        </button>
      </div>

      {/* Orders Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="card-dark">
          <p className="text-text-secondary text-sm mb-1">Total Orders</p>
          <p className="text-3xl font-bold">{orders.length}</p>
        </div>
        <div className="card-dark">
          <p className="text-text-secondary text-sm mb-1">Completed</p>
          <p className="text-3xl font-bold text-green-400">
            {orders.filter((o) => o.status === 'completed').length}
          </p>
        </div>
        <div className="card-dark">
          <p className="text-text-secondary text-sm mb-1">Processing</p>
          <p className="text-3xl font-bold text-accent-blue">
            {orders.filter((o) => o.status === 'processing').length}
          </p>
        </div>
        <div className="card-dark">
          <p className="text-text-secondary text-sm mb-1">Pending</p>
          <p className="text-3xl font-bold text-yellow-400">
            {orders.filter((o) => o.status === 'pending').length}
          </p>
        </div>
      </div>

      {/* Orders Table */}
      <div className="card-dark overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-dark-border">
                <th className="text-left px-6 py-4 text-sm font-semibold text-text-secondary">
                  Order ID
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-text-secondary">
                  Customer
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-text-secondary">
                  Description
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-text-secondary">
                  Items
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-text-secondary">
                  Total
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-text-secondary">
                  Status
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-text-secondary">
                  Date
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-text-secondary">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
                {orders.map((order) => {
                const config = statusConfig[order.status as keyof typeof statusConfig];
                const Icon = config.icon;
                return (
                  <tr key={order.id} className="border-b border-dark-border hover:bg-dark-bg transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-accent-blue">{order.id}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-text-primary">{order.customer}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-text-secondary text-sm">{order.description}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-text-secondary">{order.items}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-semibold text-accent-blue">R{order.total.toFixed(2)}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`flex items-center gap-2 w-fit px-3 py-1 rounded ${config.bg}`}>
                        <Icon size={16} className={config.color} />
                        <span className={`text-sm font-semibold ${config.color} capitalize`}>
                          {order.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-text-secondary text-sm">{formatOrderDate(order.date)}</p>
                    </td>
                    <td className="px-6 py-4">
                      <button onClick={() => openEditModal(order)} className="btn-secondary text-sm px-4 py-2">
                        Edit
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for adding order */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={closeModal} />
          <div className="relative z-10 w-full max-w-lg p-6 bg-dark-card border border-dark-border rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">{editingOrderId ? 'Edit Order' : 'Add Manual Order'}</h3>
              <button onClick={closeModal} className="text-text-secondary hover:text-accent-blue"><X size={18} /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-semibold mb-1 block">Customer</label>
                <input name="customer" value={form.customer} onChange={handleChange} className="input-dark" placeholder="Customer name" required />
              </div>
              <div>
                <label className="text-sm font-semibold mb-1 block">Order Description</label>
                <textarea name="description" value={form.description} onChange={handleChange} className="input-dark" placeholder="What was ordered?" rows={3} />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-semibold mb-1 block">Items</label>
                  <input name="items" type="number" min={1} value={form.items} onChange={handleChange} className="input-dark" />
                </div>
                <div>
                  <label className="text-sm font-semibold mb-1 block">Total</label>
                  <input name="total" type="number" step="0.01" value={form.total} onChange={handleChange} className="input-dark" />
                </div>
                <div>
                  <label className="text-sm font-semibold mb-1 block">Date</label>
                  <input name="date" type="date" value={form.date} onChange={handleChange} className="input-dark" />
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold mb-1 block">Status</label>
                <select name="status" value={form.status} onChange={handleChange} className="input-dark">
                  <option value="completed">completed</option>
                  <option value="processing">processing</option>
                  <option value="pending">pending</option>
                  <option value="cancelled">cancelled</option>
                </select>
              </div>
              <div className="flex justify-end gap-2">
                <button type="button" onClick={closeModal} className="btn-secondary">Cancel</button>
                <button type="submit" className="btn-primary">{editingOrderId ? 'Save Changes' : 'Add Order'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
