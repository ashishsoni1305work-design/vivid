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
  MessageSquare,
  Building,
  User
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
      title: "Our Office",
      details: ["C-125, Vidhya Nagar", "Hoshangabad Road, Bhopal - 462026"],
      color: "bg-blue-500"
    },
    {
      icon: Phone,
      title: "Phone",
      details: ["+91-8770828302"],
      color: "bg-green-500"
    },
    {
      icon: Mail,
      title: "Email",
      details: ["vividh2osolutions@gi.com"],
      color: "bg-purple-500"
    },
    {
      icon: Clock,
      title: "Working Hours",
      details: ["Monday - Saturday", "9:00 AM - 6:00 PM"],
      color: "bg-orange-500"
    }
  ];

  return (
    <div className="contact-page min-h-screen bg-gray-50" data-testid="contact-page">
      {/* Hero Header */}
      <section className="bg-gradient-to-r from-[#0d47a1] to-[#1976d2] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="font-heading font-bold text-3xl lg:text-4xl text-white mb-4">
              Contact Us
            </h1>
            <p className="text-blue-100 max-w-2xl mx-auto">
              Have questions about our products or services? Get in touch with us 
              and our team will respond promptly.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 -mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="border-0 shadow-lg h-full">
                  <CardContent className="p-6 text-center">
                    <div className={`w-14 h-14 ${item.color} rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                      <item.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="font-heading font-semibold text-gray-900 mb-2">{item.title}</h3>
                    {item.details.map((detail, idx) => (
                      <p key={idx} className="text-gray-600 text-sm">{detail}</p>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="border-0 shadow-xl" data-testid="contact-form-card">
                <CardHeader className="bg-gradient-to-r from-[#0d47a1] to-[#1976d2] text-white rounded-t-xl">
                  <CardTitle className="font-heading flex items-center gap-2">
                    <MessageSquare className="w-5 h-5" />
                    Send Us a Message
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-5" data-testid="contact-form">
                    <div className="grid md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="flex items-center gap-2">
                          <User className="w-4 h-4 text-gray-400" />
                          Full Name *
                        </Label>
                        <Input 
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="John Doe"
                          required
                          className="border-gray-200"
                          data-testid="contact-name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-gray-400" />
                          Email *
                        </Label>
                        <Input 
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="john@company.com"
                          required
                          className="border-gray-200"
                          data-testid="contact-email"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-gray-400" />
                          Phone *
                        </Label>
                        <Input 
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+91 98765 43210"
                          required
                          className="border-gray-200"
                          data-testid="contact-phone"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company" className="flex items-center gap-2">
                          <Building className="w-4 h-4 text-gray-400" />
                          Company
                        </Label>
                        <Input 
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          placeholder="Your Company"
                          className="border-gray-200"
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
                        <SelectTrigger className="border-gray-200" data-testid="contact-inquiry-type">
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
                        placeholder="Please describe your requirements..."
                        required
                        className="border-gray-200"
                        data-testid="contact-message"
                      />
                    </div>

                    <Button 
                      type="submit" 
                      size="lg"
                      className="w-full bg-[#0d47a1] hover:bg-[#0a3d8f] gap-2"
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

            {/* Map & Additional Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Map */}
              <Card className="border-0 shadow-xl overflow-hidden" data-testid="contact-map">
                <div className="aspect-video">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3666.5!2d77.45!3d23.27!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zVmlkeWEgTmFnYXIsIEhvc2hhbmdhYmFkIFJvYWQsIEJob3BhbA!5e0!3m2!1sen!2sin!4v1635000000000!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Vivid H2O Solutions - C-125 Vidhya Nagar, Hoshangabad Road, Bhopal"
                  />
                </div>
              </Card>

              {/* WhatsApp CTA */}
              <Card className="border-0 shadow-xl bg-gradient-to-r from-green-500 to-green-600 text-white">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="white" className="w-8 h-8">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading font-semibold text-lg">Chat on WhatsApp</h3>
                    <p className="text-green-100 text-sm">Quick response guaranteed</p>
                  </div>
                  <a 
                    href="https://wa.me/918770828302" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-white text-green-600 px-4 py-2 rounded-lg font-semibold hover:bg-green-50 transition-colors"
                  >
                    Chat Now
                  </a>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white" data-testid="faq-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-2xl text-gray-900">
              Frequently Asked Questions
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                q: "What is the delivery time for RO plants?",
                a: "Standard delivery is 7-15 days depending on capacity and customization."
              },
              {
                q: "Do you provide installation services?",
                a: "Yes, complete turnkey installation including civil work and commissioning."
              },
              {
                q: "What warranty do you offer?",
                a: "1-year warranty on all products with comprehensive after-sales support."
              },
              {
                q: "Do you serve outside Madhya Pradesh?",
                a: "Yes, we supply and service clients across India."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="border-0 shadow-md h-full">
                  <CardContent className="p-6">
                    <h4 className="font-heading font-semibold text-gray-900 mb-2">{faq.q}</h4>
                    <p className="text-gray-600 text-sm">{faq.a}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
