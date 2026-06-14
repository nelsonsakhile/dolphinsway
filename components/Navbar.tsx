'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Search, Heart, Menu, X } from 'lucide-react';
import { useCartStore } from '@/lib/store/cartStore';

const categories = [
  { name: 'Shoes', href: '/category/shoes' },
  { name: "Men's Clothing", href: '/category/mens' },
  { name: "Women's Clothing", href: '/category/womens' },
  { name: 'iPhones', href: '/category/iphones' },
  { name: 'Electronic Accessories', href: '/category/accessories' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const cartItems = useCartStore((state) => state.items);
  const totalItems = useCartStore((state) => state.getTotalItems());
  const totalPrice = useCartStore((state) => state.getTotalPrice());

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = localStorage.getItem('dolphinSwayUser');
    if (!stored) return;

    try {
      const user = JSON.parse(stored);
      setUserRole(user.role || null);
    } catch {
      localStorage.removeItem('dolphinSwayUser');
    }
  }, []);

  return (
    <>
      <nav className="navbar-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 bg-gradient-accent rounded-lg flex items-center justify-center group-hover:shadow-glow-blue transition-all">
                <span className="text-dark-bg font-bold text-lg">A</span>
              </div>
              <span className="text-xl font-bold text-text-primary tracking-widest hidden sm:inline">
                DOLPHIN SWAY
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <div className="relative group">
                <button className="text-text-secondary hover:text-accent-blue transition-colors flex items-center space-x-1">
                  <span>Categories</span>
                  <span>▼</span>
                </button>
                <div className="absolute left-0 mt-2 w-48 bg-dark-card border border-dark-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-40">
                  {categories.map((cat) => (
                    <Link
                      key={cat.href}
                      href={cat.href}
                      className="block px-4 py-3 text-text-secondary hover:text-accent-blue hover:bg-dark-bg transition-colors first:rounded-t-lg last:rounded-b-lg"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-4">
              <button className="p-2 text-text-secondary hover:text-accent-blue transition-colors">
                <Search size={20} />
              </button>
              <button className="p-2 text-text-secondary hover:text-accent-blue transition-colors">
                <Heart size={20} />
              </button>
              <button
                onClick={() => setShowCart(true)}
                className="relative p-2 text-text-secondary hover:text-accent-blue transition-colors"
              >
                <ShoppingCart size={20} />
                {totalItems > 0 && (
                  <span className="absolute top-0 right-0 w-5 h-5 bg-accent-blue text-dark-bg text-xs font-bold rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
              {userRole ? (
                <Link
                  href={userRole === 'admin' ? '/admin' : '/profile'}
                  className="hidden md:inline-flex items-center px-4 py-2 rounded-lg border border-accent-blue text-accent-blue hover:bg-accent-blue hover:text-dark-bg transition-colors"
                >
                  My Account
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="hidden md:inline-flex items-center px-4 py-2 rounded-lg bg-accent-blue text-dark-bg hover:shadow-glow-blue transition-all"
                >
                  Login
                </Link>
              )}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 text-text-secondary hover:text-accent-blue"
              >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden pb-4 border-t border-dark-border">
              {categories.map((cat) => (
                <Link
                  key={cat.href}
                  href={cat.href}
                  className="block py-2 text-text-secondary hover:text-accent-blue transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Cart Sidebar */}
      {showCart && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setShowCart(false)}
          />
          <div className="fixed right-0 top-0 h-full w-full max-w-md bg-dark-card border-l border-dark-border z-50 flex flex-col shadow-lg">
            <div className="flex justify-between items-center p-6 border-b border-dark-border">
              <h2 className="text-xl font-bold">Shopping Cart</h2>
              <button
                onClick={() => setShowCart(false)}
                className="text-text-secondary hover:text-accent-blue"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-auto p-6">
              {cartItems.length === 0 ? (
                <p className="text-text-secondary text-center py-8">Your cart is empty</p>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4 bg-dark-bg p-4 rounded-lg border border-dark-border">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 rounded object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-text-primary">{item.name}</h3>
                        <p className="text-sm text-text-secondary">R{item.price.toFixed(2)}</p>
                        <p className="text-sm text-accent-blue">Qty: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="border-t border-dark-border p-6 space-y-4">
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total:</span>
                <span className="text-accent-blue">R{totalPrice.toFixed(2)}</span>
              </div>
              <button className="btn-primary w-full">Proceed to Checkout</button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
