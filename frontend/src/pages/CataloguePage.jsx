import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, Phone, Mail, MapPin, Shield, Award, Clock, 
  Users, Factory, CheckCircle, Zap, ChevronDown, ExternalLink,
  Droplets, Settings, Wrench, Cpu, Star
} from "lucide-react";
import { Button } from "../components/ui/button";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const CataloguePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API}/products`);
        const data = await res.json();
        setProducts(data);
        const cats = [...new Set(data.map(p => p.category))];
        setCategories(cats);
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filtered = activeCategory === "All" 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const categoryIcons = {
    "RO Plants": Droplets,
    "Treatment Plants": Factory,
    "Water Softeners": Settings,
    "Coolers & Chillers": Zap,
    "Instruments": Cpu,
    "Automation": Cpu,
    "Pumps & Equipment": Wrench,
    "Water Dispensing": Droplets,
    "Waste Management": Factory,
    "Accessories": Settings,
  };

  const stats = [
    { num: "500+", label: "Projects Completed", icon: Factory },
    { num: "200+", label: "Happy Clients", icon: Users },
    { num: "10+", label: "Years Experience", icon: Clock },
    { num: "30+", label: "Products Range", icon: Droplets },
  ];

  const industries = [
    "Pharmaceutical", "Food & Beverage", "Textile", "Automobile",
    "Power Plants", "Chemical", "Steel & Metal", "IT & Electronics",
    "Hospitals", "Hotels & Resorts", "Real Estate", "Government Bodies"
  ];

  const whyUs = [
    { icon: Shield, title: "ISO 9001:2015", desc: "Quality certified processes & products" },
    { icon: Award, title: "CPCB Compliant", desc: "Meeting all pollution control norms" },
    { icon: Wrench, title: "End-to-End Solutions", desc: "Design, manufacturing, installation & AMC" },
    { icon: Zap, title: "Energy Efficient", desc: "Power-saving innovative solutions" },
    { icon: Users, title: "Expert Team", desc: "Skilled engineers & technicians" },
    { icon: Clock, title: "24/7 Support", desc: "Round the clock service backup" },
  ];

  return (
    <div className="catalogue-page bg-white" data-testid="catalogue-page">
      
      {/* HERO - Premium Full Screen */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#0d47a1] to-[#0a2e6e]" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-400 rounded-full blur-[120px]" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400 rounded-full blur-[150px]" />
        </div>
        
        {/* Animated water drops pattern */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyan-300/30 rounded-full"
              style={{ left: `${15 + i * 15}%`, top: "-5%" }}
              animate={{ y: ["0vh", "110vh"], opacity: [0, 1, 0] }}
              transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.8 }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <div className="flex items-center gap-4 mb-8">
                <img src="/logo-hd.png" alt="VIVID" className="h-20 w-auto bg-white/10 backdrop-blur-sm rounded-xl p-2" />
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] mb-6">
                Product
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-cyan-500">
                  Catalogue
                </span>
                <span className="block text-2xl md:text-3xl font-light text-blue-200 mt-4">
                  2025 Edition
                </span>
              </h1>
              <p className="text-lg text-blue-100/80 mb-10 max-w-lg leading-relaxed">
                India's trusted manufacturer & supplier of industrial water treatment solutions. 
                Precision-engineered systems for every water challenge.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#products">
                  <Button size="lg" className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-10 py-7 rounded-full text-lg shadow-2xl shadow-cyan-500/30" data-testid="browse-catalogue-btn">
                    Browse Catalogue <ArrowRight className="ml-2" />
                  </Button>
                </a>
                <a href="tel:+918770828302">
                  <Button size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 font-semibold px-10 py-7 rounded-full text-lg backdrop-blur-sm">
                    <Phone className="mr-2 w-5 h-5" /> Contact Us
                  </Button>
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="hidden lg:grid grid-cols-2 gap-4"
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.15 }}
                  className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all"
                >
                  <stat.icon className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
                  <div className="text-3xl font-extrabold text-white">{stat.num}</div>
                  <div className="text-sm text-blue-200 mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.a 
          href="#products"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 hover:text-white transition-colors"
        >
          <ChevronDown className="w-8 h-8" />
        </motion.a>
      </section>

      {/* COMPANY INTRO STRIP */}
      <section className="py-6 bg-gradient-to-r from-cyan-500 to-[#0d47a1]">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-6 text-white text-sm">
            <span className="flex items-center gap-2"><Phone className="w-4 h-4" /> +91-8770828302</span>
            <span className="flex items-center gap-2"><Mail className="w-4 h-4" /> vividh2osolutions@gmail.com</span>
          </div>
          <div className="text-white text-sm flex items-center gap-2">
            <MapPin className="w-4 h-4" /> Bhopal, Madhya Pradesh | GST: 23CCQPS3136K1Z7
          </div>
        </div>
      </section>

      {/* PRODUCTS CATALOGUE */}
      <section id="products" className="py-24 bg-gray-50" data-testid="catalogue-products">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-1.5 bg-[#0d47a1]/10 text-[#0d47a1] text-sm font-semibold rounded-full mb-4">
              Our Complete Range
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              Product Catalogue
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Explore our comprehensive range of water treatment products, systems, and accessories
            </p>
          </motion.div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-16" data-testid="category-filters">
            <button
              onClick={() => setActiveCategory("All")}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                activeCategory === "All"
                  ? "bg-[#0d47a1] text-white shadow-lg shadow-blue-500/30"
                  : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
              }`}
              data-testid="filter-all"
            >
              All Products ({products.length})
            </button>
            {categories.map(cat => {
              const count = products.filter(p => p.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                    activeCategory === cat
                      ? "bg-[#0d47a1] text-white shadow-lg shadow-blue-500/30"
                      : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                  }`}
                  data-testid={`filter-${cat}`}
                >
                  {cat} ({count})
                </button>
              );
            })}
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-14 h-14 border-4 border-[#0d47a1] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              <AnimatePresence>
                {filtered.map((product, i) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: i * 0.03 }}
                  >
                    <Link to={`/products/${product.slug}`} className="block group">
                      <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-[#0d47a1]/20 h-full" data-testid={`catalogue-product-${product.slug}`}>
                        <div className="aspect-square overflow-hidden relative bg-gray-50">
                          <img
                            src={product.image_url}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          <div className="absolute top-3 left-3">
                            <span className="inline-block px-3 py-1 bg-[#0d47a1] text-white text-xs font-semibold rounded-full shadow-lg">
                              {product.category}
                            </span>
                          </div>
                          {product.is_featured && (
                            <div className="absolute top-3 right-3">
                              <span className="inline-block px-3 py-1 bg-amber-500 text-white text-xs font-semibold rounded-full shadow-lg flex items-center gap-1">
                                <Star className="w-3 h-3 fill-white" /> Featured
                              </span>
                            </div>
                          )}
                          <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                            <Button size="sm" className="w-full bg-white text-[#0d47a1] hover:bg-cyan-50 font-semibold rounded-full shadow-xl gap-2">
                              View Details <ArrowRight className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="p-5">
                          <h3 className="font-bold text-gray-900 text-lg leading-snug group-hover:text-[#0d47a1] transition-colors">
                            {product.name}
                          </h3>
                          <p className="text-gray-500 text-sm mt-2 line-clamp-2">{product.short_description}</p>
                          <div className="mt-4 flex items-center justify-between">
                            <span className="text-[#0d47a1] font-semibold text-sm">{product.price_range}</span>
                            <span className="text-cyan-600 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                              Details <ArrowRight className="w-3.5 h-3.5" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-24 bg-white" data-testid="why-us-section">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-1.5 bg-cyan-50 text-cyan-700 text-sm font-semibold rounded-full mb-4">
              Why Vivid H2O
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
              Why Choose Us
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyUs.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-5 p-6 rounded-2xl bg-gray-50 hover:bg-gradient-to-br hover:from-[#0d47a1] hover:to-[#1976d2] group transition-all duration-500 cursor-pointer"
              >
                <div className="w-14 h-14 bg-[#0d47a1]/10 group-hover:bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors">
                  <item.icon className="w-7 h-7 text-[#0d47a1] group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 group-hover:text-white text-lg transition-colors">{item.title}</h3>
                  <p className="text-gray-500 group-hover:text-blue-100 text-sm mt-1 transition-colors">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* INDUSTRIES WE SERVE */}
      <section className="py-24 bg-gradient-to-br from-[#0a1628] via-[#0d47a1] to-[#0a2e6e] text-white" data-testid="industries-section">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-extrabold">Industries We Serve</h2>
            <p className="text-blue-200 mt-4 max-w-xl mx-auto">Our solutions power critical water treatment infrastructure across diverse sectors</p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {industries.map((ind, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 text-center hover:bg-white/15 hover:border-cyan-400/30 transition-all cursor-pointer group"
              >
                <CheckCircle className="w-6 h-6 text-cyan-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-semibold text-white/90">{ind}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - GET IN TOUCH */}
      <section className="py-24 bg-white" data-testid="catalogue-cta">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl p-12 md:p-16 text-center border border-gray-100 shadow-xl"
          >
            <img src="/logo-hd.png" alt="VIVID" className="h-16 mx-auto mb-8" />
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
              Interested in Our Products?
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto mb-10">
              Get customized quotations, technical specifications, and expert consultation for your water treatment requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <Link to="/contact">
                <Button size="lg" className="bg-[#0d47a1] hover:bg-[#0a3d8f] text-white font-bold px-12 py-7 rounded-full text-lg shadow-xl shadow-blue-500/20 gap-2" data-testid="catalogue-enquiry-btn">
                  Send Enquiry <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <a href="tel:+918770828302">
                <Button size="lg" variant="outline" className="border-2 border-[#0d47a1] text-[#0d47a1] hover:bg-[#0d47a1] hover:text-white font-bold px-12 py-7 rounded-full text-lg gap-2">
                  <Phone className="w-5 h-5" /> +91-8770828302
                </Button>
              </a>
              <a href="https://wa.me/918770828302" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white font-bold px-12 py-7 rounded-full text-lg gap-2">
                  WhatsApp Us
                </Button>
              </a>
            </div>
            <div className="mt-10 pt-8 border-t border-gray-200 flex flex-wrap justify-center gap-8 text-sm text-gray-500">
              <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-[#0d47a1]" /> C-125, Vidhya Nagar, Bhopal - 462026</span>
              <span className="flex items-center gap-2"><Mail className="w-4 h-4 text-[#0d47a1]" /> vividh2osolutions@gmail.com</span>
              <span>GST: 23CCQPS3136K1Z7 | Est. 2014</span>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default CataloguePage;
