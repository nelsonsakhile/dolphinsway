import Link from 'next/link';
import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-bg border-t border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-12">
          {/* Brand Section */}
          <div>
            <h3 className="text-xl font-bold text-accent-blue mb-4">DOLPHIN SWAY</h3>
            <p className="text-text-secondary mb-4">
              Premium tech and apparel marketplace for the modern era.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-text-secondary hover:text-accent-blue transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-text-secondary hover:text-accent-blue transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-text-secondary hover:text-accent-blue transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-text-secondary hover:text-accent-blue transition-colors"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold text-text-primary mb-4">Shop</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/category/shoes"
                  className="text-text-secondary hover:text-accent-blue transition-colors"
                >
                  Shoes
                </Link>
              </li>
              <li>
                <Link
                  href="/category/mens"
                  className="text-text-secondary hover:text-accent-blue transition-colors"
                >
                  Men's Clothing
                </Link>
              </li>
              <li>
                <Link
                  href="/category/womens"
                  className="text-text-secondary hover:text-accent-blue transition-colors"
                >
                  Women's Clothing
                </Link>
              </li>
              <li>
                <Link
                  href="/category/iphones"
                  className="text-text-secondary hover:text-accent-blue transition-colors"
                >
                  iPhones
                </Link>
              </li>
              <li>
                <Link
                  href="/category/accessories"
                  className="text-text-secondary hover:text-accent-blue transition-colors"
                >
                  Accessories
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-text-primary mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-text-secondary hover:text-accent-blue transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-text-secondary hover:text-accent-blue transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-text-secondary hover:text-accent-blue transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-text-secondary hover:text-accent-blue transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-text-primary mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-text-secondary hover:text-accent-blue transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-text-secondary hover:text-accent-blue transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-text-secondary hover:text-accent-blue transition-colors">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" className="text-text-secondary hover:text-accent-blue transition-colors">
                  Returns
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-dark-border py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-text-secondary text-sm">
              © {currentYear} Dolphin Sway. All rights reserved. Engineered for excellence.
            </p>
            <p className="text-text-secondary text-sm">
              Crafted with precision in the digital age.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
