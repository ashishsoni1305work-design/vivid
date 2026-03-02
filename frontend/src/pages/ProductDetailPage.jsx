import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "sonner";
import { 
  ArrowLeft, 
  CheckCircle, 
  Phone, 
  Mail, 
  MessageSquare,
  Loader2,
  Download,
  Share2
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ProductDetailPage = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: ""
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${API}/products/${slug}`);
        setProduct(response.data);
        
        // Fetch related products
        const allProducts = await axios.get(`${API}/products`);
        const related = allProducts.data
          .filter(p => p.category === response.data.category && p.slug !== slug)
          .slice(0, 3);
        setRelatedProducts(related);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [slug]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await axios.post(`${API}/inquiries`, {
        ...formData,
        product_id: product.id,
        inquiry_type: "product"
      });
      toast.success("Inquiry submitted successfully! We'll contact you soon.");
      setFormData({ name: "", email: "", phone: "", company: "", message: "" });
    } catch (error) {
      toast.error("Failed to submit inquiry. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#0d47a1] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="font-heading font-bold text-2xl text-gray-900 mb-4">Product Not Found</h2>
        <Link to="/products">
          <Button variant="outline">Back to Products</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="product-detail-page min-h-screen bg-gray-50" data-testid="product-detail-page">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-gray-500 hover:text-[#0d47a1]">Home</Link>
            <span className="text-gray-300">/</span>
            <Link to="/products" className="text-gray-500 hover:text-[#0d47a1]">Products</Link>
            <span className="text-gray-300">/</span>
            <span className="text-[#0d47a1] font-medium">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Product Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
                <div className="aspect-square">
                  <img 
                    src={product.image_url} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <span className="inline-block px-3 py-1 bg-[#0d47a1]/10 text-[#0d47a1] text-sm font-semibold rounded-full mb-4">
                {product.category}
              </span>
              <h1 className="font-heading font-bold text-3xl lg:text-4xl text-gray-900 mb-4" data-testid="product-title">
                {product.name}
              </h1>
              
              {product.price_range && (
                <p className="text-2xl font-bold text-[#0d47a1] mb-6" data-testid="product-price">
                  {product.price_range}
                </p>
              )}

              <p className="text-gray-600 mb-8 leading-relaxed">
                {product.description}
              </p>

              {/* Features */}
              <div className="mb-8">
                <h3 className="font-heading font-semibold text-lg text-gray-900 mb-4">Key Features</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quick Actions */}
              <div className="flex flex-wrap gap-4">
                <a href="tel:+918770828302">
                  <Button className="bg-[#0d47a1] hover:bg-[#0a3d8f] gap-2" data-testid="call-now-btn">
                    <Phone className="w-4 h-4" /> Call Now
                  </Button>
                </a>
                <a href="https://wa.me/918770828302" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="border-green-500 text-green-600 hover:bg-green-50 gap-2">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    WhatsApp
                  </Button>
                </a>
              </div>
            </motion.div>
          </div>

          {/* Specifications & Inquiry Form */}
          <div className="grid lg:grid-cols-2 gap-8 mt-12">
            {/* Specifications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="border-0 shadow-lg" data-testid="specifications-card">
                <CardHeader className="bg-gradient-to-r from-[#0d47a1] to-[#1976d2] text-white rounded-t-lg">
                  <CardTitle className="font-heading">Technical Specifications</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <table className="w-full">
                    <tbody>
                      {Object.entries(product.specifications).map(([key, value], index) => (
                        <tr key={key} className={`border-b border-gray-100 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                          <td className="py-4 px-6 font-medium text-gray-600">{key}</td>
                          <td className="py-4 px-6 text-gray-900">{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            </motion.div>

            {/* Inquiry Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="border-0 shadow-lg" data-testid="inquiry-form-card">
                <CardHeader className="bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-t-lg">
                  <CardTitle className="font-heading flex items-center gap-2">
                    <MessageSquare className="w-5 h-5" />
                    Get Quote for This Product
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input 
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="border-gray-200"
                          data-testid="inquiry-name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input 
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="border-gray-200"
                          data-testid="inquiry-email"
                        />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone *</Label>
                        <Input 
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          className="border-gray-200"
                          data-testid="inquiry-phone"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company">Company</Label>
                        <Input 
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          className="border-gray-200"
                          data-testid="inquiry-company"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea 
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={4}
                        placeholder="Please share your requirements, quantity, and any specific needs..."
                        required
                        className="border-gray-200"
                        data-testid="inquiry-message"
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-[#0d47a1] hover:bg-[#0a3d8f]"
                      disabled={submitting}
                      data-testid="submit-inquiry-btn"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Submit Inquiry"
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-16">
              <h2 className="font-heading font-bold text-2xl text-gray-900 mb-8">Related Products</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedProducts.map((item) => (
                  <Link key={item.id} to={`/products/${item.slug}`}>
                    <Card className="product-card-v2 h-full bg-white border-0">
                      <div className="aspect-video overflow-hidden">
                        <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-heading font-semibold text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">{item.short_description}</p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ProductDetailPage;
