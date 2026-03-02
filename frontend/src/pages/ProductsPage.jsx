import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { Search, Filter, ArrowRight, Grid, List } from "lucide-react";
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
    <div className="products-page min-h-screen bg-gray-50" data-testid="products-page">
      {/* Hero Header */}
      <section className="bg-gradient-to-r from-[#0d47a1] to-[#1976d2] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="font-heading font-bold text-3xl lg:text-4xl text-white mb-4">
              Our Products
            </h1>
            <p className="text-blue-100 max-w-2xl mx-auto">
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
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              {/* Categories */}
              <div className="flex flex-wrap gap-2" data-testid="category-filters">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      activeCategory === category 
                        ? "bg-[#0d47a1] text-white shadow-lg" 
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                    data-testid={`category-${category.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Search */}
              <div className="relative w-full lg:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-gray-200 focus:border-[#0d47a1] focus:ring-[#0d47a1]"
                  data-testid="product-search"
                />
              </div>
            </div>
          </div>

          {/* Results Info */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-600">
              Showing <span className="font-semibold text-[#0d47a1]">{filteredProducts.length}</span> products
              {activeCategory !== "All" && (
                <> in <span className="font-semibold text-[#0d47a1]">{activeCategory}</span></>
              )}
            </p>
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-12 h-12 border-4 border-[#0d47a1] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-xl">
              <Filter className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="font-heading font-semibold text-xl text-gray-700 mb-2">No products found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" data-testid="products-grid">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link to={`/products/${product.slug}`}>
                    <Card className="product-card-v2 h-full bg-white border-0" data-testid={`product-${product.slug}`}>
                      <div className="aspect-square overflow-hidden bg-gray-100">
                        <img 
                          src={product.image_url} 
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                      <CardContent className="p-5">
                        <span className="text-xs font-semibold text-[#0d47a1] uppercase tracking-wider">
                          {product.category}
                        </span>
                        <h3 className="font-heading font-semibold text-gray-900 mt-2 mb-2 line-clamp-2">
                          {product.name}
                        </h3>
                        <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                          {product.short_description}
                        </p>
                        
                        {/* Quick Specs */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {Object.entries(product.specifications).slice(0, 2).map(([key, value]) => (
                            <span key={key} className="text-xs font-mono bg-gray-100 text-gray-600 px-2 py-1 rounded">
                              {value}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                          {product.price_range && (
                            <p className="font-semibold text-sm text-gray-900">
                              {product.price_range}
                            </p>
                          )}
                          <span className="text-[#0d47a1] text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                            View Details <ArrowRight className="w-4 h-4" />
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
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading font-bold text-2xl text-gray-900 mb-4">
            Need Help Choosing the Right Solution?
          </h2>
          <p className="text-gray-600 mb-6">
            Our experts can help you select the perfect water treatment system for your specific requirements.
          </p>
          <Link to="/contact">
            <Button className="bg-[#0d47a1] hover:bg-[#0a3d8f]" data-testid="contact-expert-btn">
              Contact Our Experts
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;
