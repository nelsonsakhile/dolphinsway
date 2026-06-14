'use client';

import { type ChangeEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';


const emptyProfile = {
  fullName: '',
  email: '',
  phone: '',
  shippingAddress: '',
  cardNumber: '',
  expiry: '',
  cvc: '',
};

function maskCard(card: string) {
  if (!card) return 'No payment method saved';
  const digits = card.replace(/\D/g, '');
  const last4 = digits.slice(-4);
  return digits.length >= 4 ? `**** **** **** ${last4}` : 'Invalid card number';
}

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState(emptyProfile);
  const [role, setRole] = useState<'customer' | 'admin' | null>(null);
  const [message, setMessage] = useState('');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = localStorage.getItem('dolphinSwayUser');
    if (!stored) {
      router.replace('/login');
      return;
    }

    try {
      const user = JSON.parse(stored);
      if (user.role === 'admin') {
        router.replace('/admin');
        return;
      }

      const details = user.details ?? {};
      setRole('customer');
      setProfile({
        fullName: user.name || details.fullName || '',
        email: user.email || details.email || '',
        phone: details.phone || '',
        shippingAddress: details.shippingAddress || '',
        cardNumber: details.cardNumber || '',
        expiry: details.expiry || '',
        cvc: details.cvc || '',
      });
      setLoaded(true);
    } catch {
      localStorage.removeItem('dolphinSwayUser');
      router.replace('/login');
    }
  }, [router]);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!role) return;
    const stored = localStorage.getItem('dolphinSwayUser');
    if (!stored) return router.replace('/login');

    const user = JSON.parse(stored);
    user.details = { ...profile };
    user.name = profile.fullName;
    user.email = profile.email;
    localStorage.setItem('dolphinSwayUser', JSON.stringify(user));
    setMessage('Your profile was saved successfully.');
    window.setTimeout(() => setMessage(''), 3500);
  };

  const handleLogout = () => {
    localStorage.removeItem('dolphinSwayUser');
    router.push('/login');
  };

  if (!loaded) {
    return null;
  }

  return (
    <main className="min-h-screen bg-dark-bg flex flex-col">
      <Navbar />
      <div className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm text-accent-blue uppercase tracking-[0.35em] mb-2">Customer profile</p>
              <h1 className="text-4xl font-bold text-text-primary">Your Dolphin Sway account</h1>
              <p className="text-text-secondary mt-3 max-w-2xl">
                Manage your shipping, billing, and payment details in one place. Your updates are stored locally for this demo.
              </p>
            </div>

            <div className="space-y-3 text-right">
              <button onClick={handleSave} className="btn-primary w-full md:w-auto">
                Save changes
              </button>
              <button onClick={handleLogout} className="btn-secondary w-full md:w-auto">
                Logout
              </button>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
            <div className="card-dark">
              <h2 className="text-2xl font-semibold mb-5">Account details</h2>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-text-primary mb-2">Full name</label>
                  <input
                    name="fullName"
                    value={profile.fullName}
                    onChange={handleChange}
                    className="input-dark"
                    placeholder="Jane Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-text-primary mb-2">Email address</label>
                  <input
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                    className="input-dark"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-text-primary mb-2">Phone</label>
                  <input
                    name="phone"
                    value={profile.phone}
                    onChange={handleChange}
                    className="input-dark"
                    placeholder="(123) 456-7890"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-text-primary mb-2">Shipping address</label>
                  <textarea
                    name="shippingAddress"
                    value={profile.shippingAddress}
                    onChange={handleChange}
                    className="input-dark min-h-[120px] resize-none"
                    placeholder="123 Ocean Drive, Cape Town, South Africa"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="card-dark">
                <h2 className="text-2xl font-semibold mb-5">Payment method</h2>
                <div className="space-y-4">
                  <div className="rounded-2xl border border-dark-border bg-dark-bg p-5">
                    <p className="text-sm text-text-secondary mb-1">Saved card</p>
                    <p className="text-lg font-semibold text-text-primary">{maskCard(profile.cardNumber)}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-text-primary mb-2">Card number</label>
                    <input
                      name="cardNumber"
                      value={profile.cardNumber}
                      onChange={handleChange}
                      className="input-dark"
                      placeholder="4242 4242 4242 4242"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-text-primary mb-2">Expiry</label>
                      <input
                        name="expiry"
                        value={profile.expiry}
                        onChange={handleChange}
                        className="input-dark"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-text-primary mb-2">CVC</label>
                      <input
                        name="cvc"
                        value={profile.cvc}
                        onChange={handleChange}
                        className="input-dark"
                        placeholder="123"
                      />
                    </div>
                  </div>
                  <p className="text-sm text-text-secondary">
                    This demo stores your details locally in the browser. Never store real card data in local storage in production.
                  </p>
                </div>
              </div>

              <div className="card-dark">
                <h2 className="text-2xl font-semibold mb-5">Order summary</h2>
                <div className="space-y-3 text-text-secondary text-sm">
                  <p>Welcome back, {profile.fullName || 'valued customer'}.</p>
                  <p>Update your shipping information, review recent purchases, or add a new payment method anytime.</p>
                  <p>Your Dolphin Sway account is ready for fast checkout and order tracking.</p>
                </div>
              </div>
            </div>
          </div>

          {message && (
            <div className="rounded-xl border border-green-500/30 bg-green-500/10 p-4 text-green-200 text-sm">
              {message}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
}
