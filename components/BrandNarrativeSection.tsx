export default function BrandNarrativeSection() {
  const testimonials = [
    {
      name: 'Alex Chen',
      role: 'Tech Enthusiast',
      content: 'The quality and attention to detail at Dolphin Sway is unmatched. Every product feels premium.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    },
    {
      name: 'Jordan Martinez',
      role: 'Streetwear Artist',
      content: 'Finally a platform that understands the intersection of fashion and technology. Truly revolutionary.',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    },
    {
      name: 'Sam Park',
      role: 'Minimalist Curator',
      content: 'Clean design, curated selection, authentic products. Dolphin Sway sets the standard for modern retail.',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-dark relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-accent-blue/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-blue/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Brand Narrative */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="section-title mb-4">Dolphin Sway Philosophy</h2>
            <p className="section-subtitle">Engineered for authenticity. Crafted for excellence.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card-dark">
              <div className="text-4xl mb-4 text-accent-blue">🔬</div>
              <h3 className="text-xl font-bold mb-3 text-text-primary">Premium Manufacturing</h3>
              <p className="text-text-secondary">
                Every product undergoes rigorous quality control. We partner with the world's leading manufacturers
                to ensure uncompromising excellence.
              </p>
            </div>

            <div className="card-dark">
              <div className="text-4xl mb-4 text-accent-blue">🛡️</div>
              <h3 className="text-xl font-bold mb-3 text-text-primary">Authenticity Guarantee</h3>
              <p className="text-text-secondary">
                Advanced tracking technology ensures every item is 100% authentic. Every purchase comes with
                verifiable provenance.
              </p>
            </div>

            <div className="card-dark">
              <div className="text-4xl mb-4 text-accent-blue">♻️</div>
              <h3 className="text-xl font-bold mb-3 text-text-primary">Sustainable Practices</h3>
              <p className="text-text-secondary">
                Committed to eco-conscious sourcing and minimal environmental impact. Premium quality that lasts.
              </p>
            </div>
          </div>
        </div>

        {/* Testimonials Carousel */}
        <div>
          <div className="text-center mb-12">
            <h2 className="section-title mb-4">Customer Stories</h2>
            <p className="section-subtitle">Hear from our community</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="card-dark">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover border border-accent-blue"
                  />
                  <div>
                    <h4 className="font-semibold text-text-primary">{testimonial.name}</h4>
                    <p className="text-sm text-accent-blue">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-text-secondary italic">"{testimonial.content}"</p>
                <div className="mt-4 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-accent-blue">
                      ★
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
