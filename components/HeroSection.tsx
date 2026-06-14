import Link from 'next/link';

export default function HeroSection() {
  return (
    <div className="relative w-full h-[600px] md:h-[800px] overflow-hidden bg-gradient-dark">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-96 h-96 bg-accent-blue/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-40 left-10 w-96 h-96 bg-accent-blue/5 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Animated gradient background */}
      <video
        autoPlay
        muted
        loop
        className="absolute inset-0 w-full h-full object-cover opacity-20"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1518611505867-48a109e84fa2?w=1200&h=800&fit=crop)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <img
        src="https://images.unsplash.com/photo-1518611505867-48a109e84fa2?w=1200&h=800&fit=crop"
        alt="Hero"
        className="absolute inset-0 w-full h-full object-cover opacity-30"
      />

      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        <div className="text-center space-y-6 px-4">
          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-bold text-text-primary tracking-wider drop-shadow-lg animate-float">
            DOLPHIN SWAY
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-2xl text-accent-blue tracking-widest font-light drop-shadow-lg">
            PREMIUM TECH × FUTURISTIC FASHION
          </p>

          {/* Description */}
          <p className="text-text-secondary text-center max-w-2xl mx-auto text-base md:text-lg drop-shadow-lg">
            Experience the future of e-commerce. Curated collections of premium footwear, cutting-edge apparel,
            and the latest technology. Elevate your style. Redefine tech.
          </p>

          {/* CTA Button */}
          <div className="flex gap-4 justify-center">
            <Link href="/category/shoes" className="btn-primary">
              Shop Latest Drops
            </Link>
            <button className="btn-secondary">
              Explore Collections
            </button>
          </div>
        </div>
      </div>

      {/* Bottom fade gradient */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-dark-bg to-transparent z-5" />
    </div>
  );
}
