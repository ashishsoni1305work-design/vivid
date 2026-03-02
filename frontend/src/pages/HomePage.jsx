import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { 
  ArrowRight, 
  Shield, 
  Award, 
  Users, 
  Factory,
  Droplets,
  Wrench,
  Clock,
  CheckCircle,
  Star
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, testimonialsRes] = await Promise.all([
          axios.get(`${API}/products?featured=true`),
          axios.get(`${API}/testimonials`)
        ]);
        setFeaturedProducts(productsRes.data.slice(0, 3));
        setTestimonials(testimonialsRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const stats = [
    { number: "500+", label: "Projects Completed", icon: Factory },
    { number: "10+", label: "Years Experience", icon: Clock },
    { number: "200+", label: "Happy Clients", icon: Users },
    { number: "50+", label: "Products Range", icon: Droplets }
  ];

  const features = [
    {
      icon: Shield,
      title: "Premium Quality",
      description: "Industrial-grade materials with corrosion and abrasion resistance"
    },
    {
      icon: Wrench,
      title: "Expert Installation",
      description: "Professional setup with commissioning and operator training"
    },
    {
      icon: Award,
      title: "Certified Systems",
      description: "CPCB compliant solutions meeting all regulatory standards"
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Round-the-clock technical support and maintenance services"
    }
  ];

  return (
    <div className="homepage" data-testid="homepage">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center" data-testid="hero-section">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url(https://images.unsplash.com/photo-1675093022653-59233299f8ba?w=1600)` 
          }}
        />
        <div className="absolute inset-0 hero-gradient" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="inline-block px-4 py-1.5 bg-cyan-500/20 text-cyan-300 text-sm font-medium rounded-md mb-6">
              Industrial Water Treatment Experts
            </span>
            <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white leading-tight mb-6">
              Pure Water.<br />
              <span className="text-cyan-400">Pure Excellence.</span>
            </h1>
            <p className="text-lg text-slate-300 mb-8 max-w-xl">
              Leading manufacturer of RO plants, effluent treatment systems, and 
              water purification solutions for industries across India since 2014.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/products">
                <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-white gap-2" data-testid="explore-products-btn">
                  Explore Products <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" data-testid="get-quote-hero-btn">
                  Get Free Quote
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-[#0f172a]" data-testid="stats-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <stat.icon className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
                <div className="stat-number text-3xl lg:text-4xl mb-1">{stat.number}</div>
                <p className="text-slate-400 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-white" data-testid="featured-products-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12">
            <div>
              <span className="text-cyan-600 text-sm font-semibold tracking-wider uppercase">Our Products</span>
              <h2 className="font-heading font-bold text-3xl lg:text-4xl text-[#0f172a] mt-2">
                Featured Solutions
              </h2>
            </div>
            <Link to="/products" className="mt-4 lg:mt-0">
              <Button variant="outline" className="gap-2" data-testid="view-all-products-btn">
                View All Products <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="spinner"></div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link to={`/products/${product.slug}`}>
                    <Card className="product-card overflow-hidden border border-slate-200 hover:border-cyan-200" data-testid={`product-card-${product.slug}`}>
                      <div className="aspect-[4/3] overflow-hidden bg-slate-100">
                        <img 
                          src={product.image_url} 
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                      </div>
                      <CardContent className="p-6">
                        <span className="text-xs font-medium text-cyan-600 uppercase tracking-wider">
                          {product.category}
                        </span>
                        <h3 className="font-heading font-semibold text-lg text-[#0f172a] mt-2 mb-2">
                          {product.name}
                        </h3>
                        <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                          {product.short_description}
                        </p>
                        {product.price_range && (
                          <p className="font-mono text-sm text-slate-800 font-medium">
                            {product.price_range}
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-slate-50" data-testid="why-choose-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-cyan-600 text-sm font-semibold tracking-wider uppercase">Why Choose Us</span>
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-[#0f172a] mt-2">
              Trusted by Industries Across India
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="feature-icon w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="font-heading font-semibold text-lg text-[#0f172a] mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600 text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Promise */}
      <section className="py-20 bg-white" data-testid="quality-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-cyan-600 text-sm font-semibold tracking-wider uppercase">Quality Assurance</span>
              <h2 className="font-heading font-bold text-3xl lg:text-4xl text-[#0f172a] mt-2 mb-6">
                Commitment to Purity
              </h2>
              <p className="text-slate-600 mb-6">
                Every product from Vivid H2O Solutions undergoes rigorous quality testing. 
                We use premium grade materials that ensure durability, efficiency, and 
                consistent performance for years to come.
              </p>
              <ul className="space-y-3">
                {[
                  "Premium SS 304/316 grade construction",
                  "High-rejection membranes from leading brands",
                  "CPCB compliant treatment systems",
                  "ISO standard manufacturing processes"
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-cyan-500 flex-shrink-0" />
                    <span className="text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/about" className="inline-block mt-8">
                <Button className="bg-[#0f172a] hover:bg-[#1e293b]" data-testid="learn-more-btn">
                  Learn More About Us
                </Button>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img 
                src="https://images.unsplash.com/photo-1660303438028-b59af33c618c?w=800"
                alt="Pure water quality"
                className="rounded-xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center">
                    <Award className="w-6 h-6 text-cyan-600" />
                  </div>
                  <div>
                    <p className="font-heading font-bold text-2xl text-[#0f172a]">10+</p>
                    <p className="text-slate-500 text-sm">Years of Excellence</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-slate-50" data-testid="testimonials-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-cyan-600 text-sm font-semibold tracking-wider uppercase">Testimonials</span>
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-[#0f172a] mt-2">
              What Our Clients Say
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-slate-200" data-testid={`testimonial-${index}`}>
                  <CardContent className="p-6">
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-slate-600 mb-6 italic">"{testimonial.content}"</p>
                    <div>
                      <p className="font-heading font-semibold text-[#0f172a]">{testimonial.name}</p>
                      <p className="text-sm text-slate-500">{testimonial.role}, {testimonial.company}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#0f172a] relative noise-overlay" data-testid="cta-section">
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading font-bold text-3xl lg:text-4xl text-white mb-6">
            Ready to Transform Your Water Treatment?
          </h2>
          <p className="text-slate-300 text-lg mb-8">
            Get a customized solution for your industrial water treatment needs. 
            Our experts will analyze your requirements and provide the best recommendation.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact">
              <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-white gap-2" data-testid="request-quote-btn">
                Request Free Quote <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/products">
              <Button size="lg" variant="outline" className="border-slate-400 text-white hover:bg-white/10">
                Browse Products
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
