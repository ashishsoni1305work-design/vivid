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
  Loader2
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
        <div className="spinner"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="font-heading font-bold text-2xl text-[#0f172a] mb-4">Product Not Found</h2>
        <Link to="/products">
          <Button variant="outline">Back to Products</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="product-detail-page min-h-screen bg-white" data-testid="product-detail-page">
      {/* Breadcrumb */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link 
            to="/products" 
            className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-[#0f172a]"
            data-testid="back-to-products"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </Link>
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
              <div className="aspect-square rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                <img 
                  src={product.image_url} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <span className="text-cyan-600 text-sm font-semibold tracking-wider uppercase">
                {product.category}
              </span>
              <h1 className="font-heading font-bold text-3xl lg:text-4xl text-[#0f172a] mt-2 mb-4" data-testid="product-title">
                {product.name}
              </h1>
              
              {product.price_range && (
                <p className="font-mono text-xl text-[#0f172a] font-medium mb-6" data-testid="product-price">
                  {product.price_range}
                </p>
              )}

              <p className="text-slate-600 mb-8 leading-relaxed">
                {product.description}
              </p>

              {/* Features */}
              <div className="mb-8">
                <h3 className="font-heading font-semibold text-lg text-[#0f172a] mb-4">Key Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-cyan-500 flex-shrink-0" />
                      <span className="text-slate-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quick Contact */}
              <div className="flex flex-wrap gap-4">
                <a href="tel:+917550000000">
                  <Button variant="outline" className="gap-2" data-testid="call-now-btn">
                    <Phone className="w-4 h-4" /> Call Now
                  </Button>
                </a>
                <a href="mailto:info@vividh2osolutions.com">
                  <Button variant="outline" className="gap-2" data-testid="email-btn">
                    <Mail className="w-4 h-4" /> Email Us
                  </Button>
                </a>
              </div>
            </motion.div>
          </div>

          {/* Specifications & Inquiry Form */}
          <div className="grid lg:grid-cols-2 gap-12 mt-16">
            {/* Specifications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="border-slate-200" data-testid="specifications-card">
                <CardHeader>
                  <CardTitle className="font-heading">Technical Specifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <table className="spec-table w-full text-sm">
                    <tbody>
                      {Object.entries(product.specifications).map(([key, value]) => (
                        <tr key={key} className="border-b border-slate-100">
                          <td className="py-3 font-medium text-slate-600 w-1/3">{key}</td>
                          <td className="py-3 text-[#0f172a]">{value}</td>
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
              <Card className="border-slate-200" data-testid="inquiry-form-card">
                <CardHeader>
                  <CardTitle className="font-heading flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-cyan-500" />
                    Get Quote for This Product
                  </CardTitle>
                </CardHeader>
                <CardContent>
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
                        data-testid="inquiry-message"
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-cyan-500 hover:bg-cyan-600"
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
        </div>
      </section>
    </div>
  );
};

export default ProductDetailPage;
