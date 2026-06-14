import Link from 'next/link';

const categories = [
  {
    name: 'Shoes',
    href: '/category/shoes',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop',
    color: 'from-accent-blue/20',
  },
  {
    name: "Men's Clothing",
    href: '/category/mens',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16ebc5?w=600&h=600&fit=crop',
    color: 'from-accent-silver/20',
  },
  {
    name: "Women's Clothing",
    href: '/category/womens',
    image: 'https://images.unsplash.com/photo-1508272936778-10b2b12f0a16?w=600&h=600&fit=crop',
    color: 'from-accent-blue/20',
  },
  {
    name: 'iPhones',
    href: '/category/iphones',
    image: 'https://images.unsplash.com/photo-1592286927505-1fed6c2d4e5b?w=600&h=600&fit=crop',
    color: 'from-accent-silver/20',
  },
  {
    name: 'Electronic Accessories',
    href: '/category/accessories',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop',
    color: 'from-accent-blue/20',
  },
];

export default function CategoryShowcase() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-bg">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="section-title mb-4">Explore Collections</h2>
          <p className="section-subtitle">Discover our premium curated categories</p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {categories.map((category) => (
            <Link
              key={category.href}
              href={category.href}
              className="group relative h-72 rounded-xl overflow-hidden border border-dark-border transition-all duration-300 hover:border-accent-blue hover:shadow-glow-blue"
            >
              {/* Background Image */}
              <img
                src={category.image}
                alt={category.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />

              {/* Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-t ${category.color} to-dark-bg/80 group-hover:to-dark-bg/60 transition-all duration-300`} />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                <h3 className="text-2xl font-bold text-text-primary text-center mb-3 group-hover:text-accent-blue transition-colors">
                  {category.name}
                </h3>
                <div className="h-1 w-12 bg-gradient-accent group-hover:w-20 transition-all duration-300 rounded-full" />
              </div>

              {/* Hover Arrow */}
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-accent-blue text-2xl">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
