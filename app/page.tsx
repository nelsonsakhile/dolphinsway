import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import CategoryShowcase from '@/components/CategoryShowcase';
import ProductsSection from '@/components/ProductsSection';
import BrandNarrativeSection from '@/components/BrandNarrativeSection';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Dolphin Sway - Premium Tech & Apparel Marketplace',
  description: 'Shop premium footwear, apparel, and cutting-edge technology at Dolphin Sway.',
};

export default function Home() {
  return (
    <main className="min-h-screen bg-dark-bg">
      <Navbar />
      <HeroSection />
      <CategoryShowcase />
      <ProductsSection />
      <BrandNarrativeSection />
      <Footer />
    </main>
  );
}
