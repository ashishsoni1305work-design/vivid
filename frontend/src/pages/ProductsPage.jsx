import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { Search, Filter, ArrowRight } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  
  const activeCategory = searchParams.get("category") || "All";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          axios.get(`${API}/products`),
          axios.get(`${API}/products/categories`)
        ]);
        setProducts(productsRes.data);
        setCategories(["All", ...categoriesRes.data.categories]);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleCategoryChange = (category) => {
    if (category === "All") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", category);
    }
    setSearchParams(searchParams);
  };

  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === "All" || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.short_description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="products-page min-h-screen bg-white" data-testid="products-page">
      {/* Header */}
      <section className="bg-slate-50 py-16 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-cyan-600 text-sm font-semibold tracking-wider uppercase">Our Products</span>
            <h1 className="font-heading font-bold text-3xl lg:text-4xl text-[#0f172a] mt-2 mb-4">
              Water Treatment Solutions
            </h1>
            <p className="text-slate-600 max-w-2xl">
              Explore our comprehensive range of industrial water treatment equipment. 
              From RO plants to effluent treatment systems, we have solutions for every need.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters & Products */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter Bar */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">
            {/* Categories */}
            <div className="flex flex-wrap gap-2" data-testid="category-filters">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`category-pill px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    activeCategory === category 
                      ? "active bg-[#0f172a] text-white" 
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                  data-testid={`category-${category.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full lg:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                data-testid="product-search"
              />
            </div>
          </div>

          {/* Results Info */}
          <div className="flex items-center justify-between mb-8">
            <p className="text-slate-600">
              Showing <span className="font-semibold text-[#0f172a]">{filteredProducts.length}</span> products
              {activeCategory !== "All" && (
                <> in <span className="font-semibold text-[#0f172a]">{activeCategory}</span></>
              )}
            </p>
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="spinner"></div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <Filter className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <h3 className="font-heading font-semibold text-xl text-slate-700 mb-2">No products found</h3>
              <p className="text-slate-500">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" data-testid="products-grid">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link to={`/products/${product.slug}`}>
                    <Card className="product-card h-full overflow-hidden border border-slate-200 hover:border-cyan-200" data-testid={`product-${product.slug}`}>
                      <div className="aspect-[4/3] overflow-hidden bg-slate-100">
                        <img 
                          src={product.image_url} 
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                          loading="lazy"
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
                        
                        {/* Quick Specs */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {Object.entries(product.specifications).slice(0, 2).map(([key, value]) => (
                            <span key={key} className="text-xs font-mono bg-slate-100 px-2 py-1 rounded">
                              {key}: {value}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center justify-between">
                          {product.price_range && (
                            <p className="font-mono text-sm text-slate-800 font-medium">
                              {product.price_range}
                            </p>
                          )}
                          <span className="text-cyan-600 text-sm font-medium flex items-center gap-1">
                            View Details <ArrowRight className="w-3 h-3" />
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading font-bold text-2xl text-[#0f172a] mb-4">
            Need Help Choosing the Right Solution?
          </h2>
          <p className="text-slate-600 mb-6">
            Our experts can help you select the perfect water treatment system for your specific requirements.
          </p>
          <Link to="/contact">
            <Button className="bg-[#0f172a] hover:bg-[#1e293b]" data-testid="contact-expert-btn">
              Contact Our Experts
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;
