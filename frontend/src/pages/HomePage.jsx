import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Phone, Zap, Shield, Award, Factory } from "lucide-react";
import { Button } from "../components/ui/button";
import GoogleReviews from "../components/GoogleReviews";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const HomePage = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, -300]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -150]);

  const heroSlides = [
    { title: "Pure Water. Pure Power.", subtitle: "Industrial RO Plants up to 100 KLD", image: "/banners/banner-1.png" },
    { title: "Zero Liquid Discharge", subtitle: "CPCB Approved ETP & STP Solutions", image: "/banners/banner-2.png" },
    { title: "Engineered for Excellence", subtitle: "Since 2014 • 500+ Projects • PAN India", image: "/banners/banner-3.png" },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API}/products`);
        const data = await res.json();
        setProducts(data.slice(0, 6));
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  return (
    <>
      {/* HERO - Image Background + Parallax */}
      <section className="relative h-screen overflow-hidden" data-testid="hero-section">
        {heroSlides.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-1000 ${currentSlide === i ? 'opacity-100' : 'opacity-0'}`}
          >
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          </div>
        ))}

        <motion.div 
          style={{ y: y1 }}
          className="absolute inset-0 flex items-center justify-center text-center px-6"
        >
          <div className="max-w-5xl">
            <motion.h1 
              key={`title-${currentSlide}`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-white drop-shadow-2xl leading-tight"
              data-testid="hero-title"
            >
              {heroSlides[currentSlide].title}
            </motion.h1>
            <motion.p 
              key={`sub-${currentSlide}`}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 1 }}
              className="text-xl md:text-3xl text-cyan-300 font-light mt-6 drop-shadow-lg"
              data-testid="hero-subtitle"
            >
              {heroSlides[currentSlide].subtitle}
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="flex flex-col sm:flex-row gap-6 justify-center mt-12"
            >
              <Link to="/contact">
                <Button size="lg" className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-lg px-12 py-8 rounded-full shadow-2xl hover:scale-105 transition" data-testid="hero-quote-btn">
                  Get Free Quote <ArrowRight className="ml-2" />
                </Button>
              </Link>
              <a href="tel:+918770828302">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-black font-bold text-lg px-12 py-8 rounded-full backdrop-blur-lg" data-testid="hero-call-btn">
                  <Phone className="mr-3" /> Call +91-8770828302
                </Button>
              </a>
            </motion.div>
          </div>
        </motion.div>

        {/* Slide Indicators */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-cyan-400 w-10' : 'bg-white/50 w-2'
              }`}
              data-testid={`slide-indicator-${index}`}
            />
          ))}
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white"
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2" />
          </div>
        </motion.div>
      </section>

      {/* Floating Stats */}
      <motion.section 
        style={{ y: y2 }}
        className="relative -mt-32 z-10 px-6"
        data-testid="stats-section"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { num: "500+", label: "Projects Delivered", icon: Factory },
            { num: "10+", label: "Years of Trust", icon: Award },
            { num: "200+", label: "Happy Clients", icon: Shield },
            { num: "24/7", label: "Support", icon: Zap },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 text-center border border-white/20"
              data-testid={`stat-card-${i}`}
            >
              <stat.icon className="w-12 h-12 text-cyan-600 mx-auto mb-4" />
              <div className="text-4xl font-bold text-[#0d47a1]">{stat.num}</div>
              <div className="text-gray-600 mt-2">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Premium Products Grid */}
      <section className="py-32 bg-gradient-to-b from-gray-50 to-white" data-testid="products-section">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-20">Our Premium Products</h2>
          <div className="grid md:grid-cols-3 gap-10">
            {products.map((p, i) => (
              <motion.div
                key={p.id || i}
                whileHover={{ y: -20, scale: 1.05 }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-3xl shadow-2xl bg-white"
                data-testid={`product-card-${i}`}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={p.image_url} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <h3 className="text-2xl font-bold mb-2">{p.name}</h3>
                  <p className="text-cyan-300">{p.category}</p>
                  <Link to={`/products/${p.slug}`} className="inline-flex items-center mt-4 text-cyan-300 hover:text-white transition">
                    Explore <ArrowRight className="ml-2" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
          <Link to="/products" className="inline-block mt-16">
            <Button size="lg" className="bg-[#0d47a1] hover:bg-cyan-600 text-white text-xl px-16 py-8 rounded-full shadow-2xl" data-testid="view-all-products-btn">
              View All Products
            </Button>
          </Link>
        </div>
      </section>

      <GoogleReviews />

      {/* Final CTA */}
      <section className="py-32 bg-gradient-to-r from-[#0d47a1] to-cyan-600 text-white" data-testid="cta-section">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-5xl md:text-6xl font-bold mb-8">Ready for Pure Water?</h2>
          <p className="text-xl mb-12 text-blue-100">Join 200+ industries who trust VIVID for their water treatment needs.</p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/contact">
              <Button size="lg" className="bg-white text-[#0d47a1] hover:bg-gray-100 font-bold text-xl px-16 py-8 rounded-full" data-testid="cta-start-btn">
                Start Your Project Now
              </Button>
            </Link>
            <a href="https://wa.me/918770828302" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white font-bold text-xl px-12 py-8 rounded-full" data-testid="cta-whatsapp-btn">
                WhatsApp Us
              </Button>
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
