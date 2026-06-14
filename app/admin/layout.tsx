'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  BarChart3,
  Grid3x3,
  LogOut,
  Menu,
  X,
  Store,
} from 'lucide-react';


const navItems = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Inventory', href: '/admin/inventory', icon: Package },
  { label: 'Upload Product', href: '/admin/upload', icon: Grid3x3 },
  { label: 'Orders', href: '/admin/orders', icon: ShoppingCart },
  { label: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = localStorage.getItem('dolphinSwayUser');
    if (!stored) {
      router.replace('/login');
      return;
    }
    try {
      const user = JSON.parse(stored);
      if (user.role !== 'admin') {
        router.replace('/profile');
        return;
      }
      setAuthorized(true);
    } catch {
      localStorage.removeItem('dolphinSwayUser');
      router.replace('/login');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('dolphinSwayUser');
    router.push('/login');
  };

  if (!authorized) {
    return null;
  }


  return (
    <div className="flex h-screen bg-dark-bg text-text-primary">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? 'w-64' : 'w-20'
        } bg-dark-card border-r border-dark-border transition-all duration-300 flex flex-col`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-dark-border">
          {isSidebarOpen && (
            <h1 className="text-xl font-bold text-accent-blue">ADMIN</h1>
          )}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1 hover:bg-dark-bg rounded transition-colors"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-text-secondary hover:bg-dark-bg hover:text-accent-blue transition-colors group"
              >
                <Icon size={20} className="group-hover:text-accent-blue transition-colors" />
                {isSidebarOpen && <span>{item.label}</span>}
              </Link>
            );
          })}

          <div className="border-t border-dark-border/50 my-4 pt-4">
            <Link
              href="/"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-text-secondary hover:bg-dark-bg hover:text-accent-blue transition-colors group"
            >
              <Store size={20} className="group-hover:text-accent-blue transition-colors" />
              {isSidebarOpen && <span>Back to Store</span>}
            </Link>
          </div>
        </nav>

        {/* Footer */}
        <div className="border-t border-dark-border p-4">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-text-secondary hover:bg-dark-bg hover:text-red-400 transition-colors"
          >
            <LogOut size={20} />
            {isSidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto flex flex-col">
        {/* Header */}
        <header className="h-16 bg-dark-card border-b border-dark-border flex items-center justify-between px-8">
          <h2 className="text-2xl font-bold">Admin Dashboard</h2>
          <div className="flex items-center gap-4">
            <button className="w-10 h-10 rounded-full bg-accent-blue text-dark-bg flex items-center justify-center font-bold">
              A
            </button>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto">{children}</div>
      </main>
    </div>
  );
}
