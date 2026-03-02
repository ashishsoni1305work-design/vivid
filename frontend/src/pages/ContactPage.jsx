import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import axios from "axios";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  Send,
  Loader2,
  MessageSquare
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ContactPage = () => {
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    inquiry_type: "general",
    message: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value) => {
    setFormData(prev => ({ ...prev, inquiry_type: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await axios.post(`${API}/inquiries`, formData);
      toast.success("Message sent successfully! We'll get back to you soon.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        inquiry_type: "general",
        message: ""
      });
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Us",
      details: ["09, Kundan Nagar, Baghmugalya", "Bhopal - 402026, MP, India"]
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["+91-755-XXXXXXX", "Mon - Sat: 9AM - 6PM"]
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["info@vividh2osolutions.com", "sales@vividh2osolutions.com"]
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Monday - Saturday", "9:00 AM - 6:00 PM"]
    }
  ];

  return (
    <div className="contact-page min-h-screen bg-white" data-testid="contact-page">
      {/* Header */}
      <section className="bg-slate-50 py-16 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-cyan-600 text-sm font-semibold tracking-wider uppercase">Contact Us</span>
            <h1 className="font-heading font-bold text-3xl lg:text-4xl text-[#0f172a] mt-2 mb-4">
              Get in Touch
            </h1>
            <p className="text-slate-600 max-w-2xl">
              Have questions about our products or services? Need a quote? 
              We're here to help. Reach out to us and our team will respond promptly.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="font-heading font-bold text-2xl text-[#0f172a] mb-6">
                Contact Information
              </h2>
              
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-cyan-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-cyan-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0f172a] mb-1">{item.title}</h3>
                    {item.details.map((detail, idx) => (
                      <p key={idx} className="text-slate-600 text-sm">{detail}</p>
                    ))}
                  </div>
                </div>
              ))}

              {/* Map */}
              <div className="mt-8" data-testid="contact-map">
                <h3 className="font-semibold text-[#0f172a] mb-4">Our Location</h3>
                <div className="aspect-video rounded-lg overflow-hidden border border-slate-200">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3666.8307689774966!2d77.4126!3d23.2599!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDE1JzM1LjYiTiA3N8KwMjQnNDUuNCJF!5e0!3m2!1sen!2sin!4v1635000000000!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: 'grayscale(1)' }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Vivid H2O Solutions Location"
                  />
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <Card className="border-slate-200" data-testid="contact-form-card">
                <CardHeader>
                  <CardTitle className="font-heading flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-cyan-500" />
                    Send Us a Message
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6" data-testid="contact-form">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input 
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="John Doe"
                          required
                          data-testid="contact-name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input 
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="john@company.com"
                          required
                          data-testid="contact-email"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input 
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+91 98765 43210"
                          required
                          data-testid="contact-phone"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company">Company Name</Label>
                        <Input 
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          placeholder="Your Company"
                          data-testid="contact-company"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="inquiry_type">Inquiry Type</Label>
                      <Select 
                        value={formData.inquiry_type} 
                        onValueChange={handleSelectChange}
                      >
                        <SelectTrigger data-testid="contact-inquiry-type">
                          <SelectValue placeholder="Select inquiry type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General Inquiry</SelectItem>
                          <SelectItem value="product">Product Inquiry</SelectItem>
                          <SelectItem value="service">Service Request</SelectItem>
                          <SelectItem value="quotation">Request Quotation</SelectItem>
                          <SelectItem value="support">Technical Support</SelectItem>
                          <SelectItem value="amc">AMC Inquiry</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Your Message *</Label>
                      <Textarea 
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={5}
                        placeholder="Please describe your requirements, including water source, required capacity, and any specific needs..."
                        required
                        data-testid="contact-message"
                      />
                    </div>

                    <Button 
                      type="submit" 
                      size="lg"
                      className="w-full md:w-auto bg-cyan-500 hover:bg-cyan-600 gap-2"
                      disabled={submitting}
                      data-testid="contact-submit-btn"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Quick */}
      <section className="py-16 bg-slate-50 border-t border-slate-200" data-testid="faq-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-2xl text-[#0f172a]">
              Frequently Asked Questions
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                q: "What is the delivery time for RO plants?",
                a: "Standard delivery is 7-15 days depending on the capacity and customization required."
              },
              {
                q: "Do you provide installation services?",
                a: "Yes, we provide complete turnkey installation including civil work and commissioning."
              },
              {
                q: "What warranty do you offer?",
                a: "We offer 1-year warranty on all our products with comprehensive after-sales support."
              },
              {
                q: "Do you serve outside Madhya Pradesh?",
                a: "Yes, we supply and service clients across India. Contact us for availability in your area."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-lg border border-slate-200"
              >
                <h4 className="font-semibold text-[#0f172a] mb-2">{faq.q}</h4>
                <p className="text-slate-600 text-sm">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
