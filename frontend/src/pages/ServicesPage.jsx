import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { 
  Wrench, 
  FileCheck, 
  TestTube, 
  RefreshCw, 
  TrendingUp,
  ArrowRight,
  CheckCircle,
  Phone,
  Settings,
  Truck,
  Shield
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const iconMap = {
  Wrench: Wrench,
  FileCheck: FileCheck,
  TestTube: TestTube,
  RefreshCw: RefreshCw,
  TrendingUp: TrendingUp
};

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`${API}/services`);
        setServices(response.data);
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const whyChooseUs = [
    { icon: Shield, title: "Quality Assurance", description: "ISO certified processes" },
    { icon: Truck, title: "Timely Delivery", description: "On-time project completion" },
    { icon: Settings, title: "Expert Team", description: "Skilled technicians" },
    { icon: Phone, title: "24/7 Support", description: "Round the clock assistance" }
  ];

  return (
    <div className="services-page min-h-screen bg-gray-50" data-testid="services-page">
      {/* Hero Header */}
      <section className="bg-gradient-to-r from-[#0d47a1] to-[#1976d2] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="font-heading font-bold text-3xl lg:text-4xl text-white mb-4">
              Our Services
            </h1>
            <p className="text-blue-100 max-w-2xl mx-auto">
              From installation to maintenance, we provide end-to-end services to keep your 
              water treatment systems running at peak performance.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-12 h-12 border-4 border-[#0d47a1] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" data-testid="services-grid">
              {services.map((service, index) => {
                const IconComponent = iconMap[service.icon] || Wrench;
                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow overflow-hidden group" data-testid={`service-${service.slug}`}>
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={service.image_url} 
                          alt={service.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <CardContent className="p-6">
                        <div className="w-14 h-14 bg-gradient-to-br from-[#0d47a1] to-[#1976d2] rounded-xl flex items-center justify-center mb-4 -mt-12 relative shadow-lg">
                          <IconComponent className="w-7 h-7 text-white" />
                        </div>
                        <h3 className="font-heading font-semibold text-xl text-gray-900 mb-3">
                          {service.name}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                          {service.short_description}
                        </p>
                        <ul className="space-y-2">
                          {service.features.slice(0, 3).map((feature, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-sm">
                              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                              <span className="text-gray-700">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white" data-testid="why-choose-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl text-gray-900">Why Choose Our Services</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#0d47a1] to-[#1976d2] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-heading font-semibold text-lg text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AMC Highlight */}
      <section className="py-16 bg-gray-50" data-testid="amc-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img 
                src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800"
                alt="Service Engineer"
                className="rounded-xl shadow-2xl"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="section-title-icon"></div>
              <span className="text-[#0d47a1] text-sm font-semibold tracking-wider uppercase">Annual Maintenance</span>
              <h2 className="font-heading font-bold text-3xl text-gray-900 mt-2 mb-6">
                Keep Your Systems Running Smoothly
              </h2>
              <p className="text-gray-600 mb-6">
                Our comprehensive Annual Maintenance Contract (AMC) ensures your water treatment 
                plants operate at peak efficiency year-round.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Quarterly preventive maintenance visits",
                  "Priority emergency response",
                  "Discounted spare parts",
                  "Performance optimization",
                  "Compliance documentation"
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/contact">
                <Button className="bg-[#0d47a1] hover:bg-[#0a3d8f] gap-2" data-testid="amc-enquiry-btn">
                  Enquire About AMC <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-[#0d47a1] to-[#1976d2]" data-testid="services-cta">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading font-bold text-3xl text-white mb-4">
            Need Service Support?
          </h2>
          <p className="text-blue-100 mb-8">
            Our technical team is available to help you with installation, maintenance, or any service queries.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:+917550000000">
              <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-white gap-2">
                <Phone className="w-4 h-4" /> Call Us Now
              </Button>
            </a>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Send Inquiry
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
