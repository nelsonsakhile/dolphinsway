'use client';

import { type ChangeEvent, type FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const adminEmails = ['admin@dolphinsway.com', 'owner@dolphinsway.com'];

const defaultForm = {
  name: '',
  email: '',
  password: '',
};

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState(defaultForm);
  const [error, setError] = useState('');
  const [isBusy, setIsBusy] = useState(true);

  useEffect(() => {
    const storedUser = typeof window !== 'undefined' ? localStorage.getItem('dolphinSwayUser') : null;
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        if (user.role === 'admin') {
          router.replace('/admin');
          return;
        }
        router.replace('/profile');
        return;
      } catch {
        localStorage.removeItem('dolphinSwayUser');
      }
    }
    setIsBusy(false);
  }, [router]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (!form.name.trim() || !form.email.trim() || !form.password.trim()) {
      setError('Please fill in all fields.');
      return;
    }

    const normalizedEmail = form.email.trim().toLowerCase();
    const role = adminEmails.includes(normalizedEmail) ? 'admin' : 'customer';
    const user = {
      role,
      name: form.name.trim(),
      email: normalizedEmail,
      details: {
        fullName: form.name.trim(),
        email: normalizedEmail,
        phone: '',
        shippingAddress: '',
        cardNumber: '',
        expiry: '',
        cvc: '',
      },
    };

    localStorage.setItem('dolphinSwayUser', JSON.stringify(user));
    router.push(role === 'admin' ? '/admin' : '/profile');
  };

  if (isBusy) {
    return null;
  }

  return (
    <main className="min-h-screen bg-dark-bg flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-xl">
        <div className="card-dark">
          <div className="mb-8">
            <p className="text-sm text-accent-blue uppercase tracking-[0.35em] mb-3">Member login</p>
            <h1 className="text-4xl font-bold text-text-primary">Sign in to Dolphin Sway</h1>
            <p className="text-text-secondary mt-3">
              Enter your credentials to access your account. Admin users will be routed to the dashboard.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-text-primary mb-2">Full name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="input-dark"
                placeholder="Your full name"
                autoComplete="name"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-text-primary mb-2">Email address</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="input-dark"
                placeholder="you@example.com"
                autoComplete="email"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-text-primary mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="input-dark"
                placeholder="••••••••"
                autoComplete="current-password"
              />
            </div>

            {error && <p className="text-sm text-red-400">{error}</p>}

            <button type="submit" className="btn-primary w-full">
              Continue
            </button>
          </form>

          <div className="mt-8 text-sm text-text-secondary">
            <p>
              Not an admin? Use any email except <span className="text-text-primary">admin@dolphinsway.com</span> or{' '}
              <span className="text-text-primary">owner@dolphinsway.com</span> to sign in as a shopper.
            </p>
            <p className="mt-4">
              <Link href="/" className="text-accent-blue hover:underline">
                Return to home
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
