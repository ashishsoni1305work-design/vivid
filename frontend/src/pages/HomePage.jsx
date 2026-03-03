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
  Phone,
  Zap,
  Target,
  Settings,
  Building,
  Truck,
  HeartPulse,
  Utensils,
  Cpu
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import GoogleReviews from "../components/GoogleReviews";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      image: "/banners/banner-1.png",
      title: "Industrial RO Plants",
      subtitle: "High-capacity reverse osmosis systems for industries"
    },
    {
      image: "/banners/banner-2.png",
      title: "Water Treatment Solutions",
      subtitle: "Complete water purification systems for all needs"
    },
    {
      image: "/banners/banner-3.png",
      title: "Effluent & Sewage Treatment",
      subtitle: "CPCB compliant wastewater treatment solutions"
    }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsRes = await axios.get(`${API}/products`);
        setAllProducts(productsRes.data);
        setFeaturedProducts(productsRes.data.filter(p => p.is_featured));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Auto-slide hero banner
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const stats = [
    { number: "500+", label: "Finished Projects", icon: Factory },
    { number: "200+", label: "Satisfied Clients", icon: Users },
    { number: "10+", label: "Years Experience", icon: Clock },
    { number: "50+", label: "Products Range", icon: Droplets }
  ];

  const industries = [
    { name: "Manufacturing", icon: Factory, image: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=400" },
    { name: "Pharmaceutical", icon: HeartPulse, image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400" },
    { name: "Food & Beverage", icon: Utensils, image: "https://images.unsplash.com/photo-1567521464027-f127ff144326?w=400" },
    { name: "Power & Energy", icon: Zap, image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400" },
    { name: "Automotive", icon: Truck, image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400" },
    { name: "IT & Electronics", icon: Cpu, image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400" }
  ];

  const processSteps = [
    { step: "01", title: "Define Requirements", description: "Understanding your water treatment needs", icon: Target },
    { step: "02", title: "Design & Planning", description: "Custom solution design and prototyping", icon: Settings },
    { step: "03", title: "Manufacturing", description: "Quality-controlled production process", icon: Factory },
    { step: "04", title: "Installation", description: "Professional setup and commissioning", icon: Wrench }
  ];

  return (
    <div className="homepage" data-testid="homepage">
      {/* Hero Banner Slider */}
      <section className="hero-banner relative overflow-hidden" data-testid="hero-section">
        {heroSlides.map((slide, index) => (
          <div 
            key={index}
            className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
          >
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0d47a1]/90 to-[#0d47a1]/60" />
            <div className="relative z-10 h-full flex items-center">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <motion.div 
                  key={currentSlide}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="max-w-2xl"
                >
                  <span className="inline-block px-4 py-2 bg-cyan-500/20 text-cyan-300 text-sm font-semibold rounded-full mb-4">
                    Water Treatment Experts
                  </span>
                  <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white leading-tight mb-4">
                    {slide.title}
                  </h1>
                  <p className="text-lg text-blue-100 mb-8">
                    {slide.subtitle}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Link to="/products">
                      <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-white gap-2" data-testid="explore-products-btn">
                        Explore Products <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Link to="/contact">
                      <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                        Get Free Quote
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        ))}
        
        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? 'bg-cyan-400 w-8' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white" data-testid="about-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img 
                src="/images/about-team.png"
                alt="About Vivid H2O Solutions"
                className="rounded-xl shadow-2xl"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="section-title-icon"></div>
              <span className="text-[#0d47a1] text-sm font-semibold tracking-wider uppercase">About Vivid H2O Solutions</span>
              <h2 className="font-heading font-bold text-3xl lg:text-4xl text-gray-900 mt-2 mb-6">
                Experts in Water Treatment Equipment & Solutions
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Vivid H2O Solutions is a leading manufacturer and supplier of high-quality water treatment 
                equipment for industrial and commercial applications. With a focus on precision-engineered 
                systems, we provide comprehensive solutions for Effluent Treatment Plants (ETP), Sewage 
                Treatment Plants (STP), Reverse Osmosis (RO), and Water Treatment Plants (WTP) across India.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                We are trusted by industries, municipalities, and projects for delivering cutting-edge 
                technology and reliable components since 2014.
              </p>
              <Link to="/about">
                <Button className="bg-[#0d47a1] hover:bg-[#0a3d8f] gap-2" data-testid="explore-more-btn">
                  Explore More <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 bg-gray-50" data-testid="products-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="section-title-icon mx-auto"></div>
            <span className="text-[#0d47a1] text-sm font-semibold tracking-wider uppercase">What We Offer</span>
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-gray-900 mt-2">
              Our Products
            </h2>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="w-12 h-12 border-4 border-[#0d47a1] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {allProducts.slice(0, 8).map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link to={`/products/${product.slug}`}>
                    <div className="product-card-v2 bg-white h-full" data-testid={`product-card-${product.slug}`}>
                      <div className="aspect-square overflow-hidden">
                        <img 
                          src={product.image_url} 
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <span className="text-xs text-[#0d47a1] font-semibold uppercase">{product.category}</span>
                        <h3 className="font-heading font-semibold text-gray-900 mt-1 line-clamp-2">{product.name}</h3>
                        <div className="mt-3 flex items-center text-[#0d47a1] font-medium text-sm">
                          Read More <ArrowRight className="w-4 h-4 ml-1" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}

          <div className="text-center mt-10">
            <Link to="/products">
              <Button size="lg" className="bg-[#0d47a1] hover:bg-[#0a3d8f]" data-testid="view-all-products-btn">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="py-20 bg-white" data-testid="industries-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-gray-900">
              Industries We Serve
            </h2>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
            {industries.map((industry, index) => (
              <motion.div
                key={industry.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="industry-card group cursor-pointer"
              >
                <div className="aspect-[4/5] relative">
                  <img 
                    src={industry.image} 
                    alt={industry.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="content">
                    <industry.icon className="w-8 h-8 text-cyan-400 mb-2" />
                    <h3 className="font-heading font-semibold text-white text-sm">{industry.name}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 stats-bg" data-testid="stats-section">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-heading font-bold text-3xl text-white">Company Facts</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="counter-item text-center px-4"
              >
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-cyan-300" />
                </div>
                <div className="font-heading font-extrabold text-4xl lg:text-5xl text-white mb-2">{stat.number}</div>
                <p className="text-blue-100">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Work Process */}
      <section className="py-20 bg-gray-50" data-testid="process-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-gray-900">Work Process</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="process-step text-center"
              >
                <div className="relative inline-block mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#0d47a1] to-[#1976d2] rounded-full flex items-center justify-center shadow-lg">
                    <item.icon className="w-10 h-10 text-white" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {item.step}
                  </span>
                </div>
                <h3 className="font-heading font-semibold text-xl text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Google Reviews Section */}
      <GoogleReviews />

      {/* Certifications */}
      <section className="py-16 bg-white" data-testid="certifications-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-heading font-bold text-2xl text-gray-900">Our Certifications</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="bg-gray-50 p-6 rounded-xl flex items-center gap-4">
              <Shield className="w-12 h-12 text-[#0d47a1]" />
              <div>
                <p className="font-heading font-semibold text-gray-900">ISO 9001:2015</p>
                <p className="text-sm text-gray-500">Quality Management</p>
              </div>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl flex items-center gap-4">
              <Award className="w-12 h-12 text-[#0d47a1]" />
              <div>
                <p className="font-heading font-semibold text-gray-900">CPCB Compliant</p>
                <p className="text-sm text-gray-500">Pollution Control Board</p>
              </div>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl flex items-center gap-4">
              <CheckCircle className="w-12 h-12 text-[#0d47a1]" />
              <div>
                <p className="font-heading font-semibold text-gray-900">MSME Registered</p>
                <p className="text-sm text-gray-500">Government Certified</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#0d47a1]" data-testid="cta-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading font-bold text-3xl text-white mb-4">
            Need Water Treatment Solutions?
          </h2>
          <p className="text-blue-100 text-lg mb-8">
            Get in touch with our experts for customized solutions for your industry.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact">
              <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-white gap-2" data-testid="contact-cta-btn">
                Contact Us <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <a href="tel:+918770828302">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 gap-2">
                <Phone className="w-4 h-4" /> Call Now
              </Button>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
