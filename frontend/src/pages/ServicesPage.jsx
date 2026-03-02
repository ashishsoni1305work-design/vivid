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
  Phone
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

  const processSteps = [
    { step: "01", title: "Site Assessment", description: "Our experts visit your location to understand your water treatment requirements" },
    { step: "02", title: "Custom Solution", description: "We design a tailored solution based on your water quality and capacity needs" },
    { step: "03", title: "Installation", description: "Professional installation with proper civil, electrical, and plumbing work" },
    { step: "04", title: "Commissioning", description: "System testing, optimization, and operator training for smooth operation" }
  ];

  return (
    <div className="services-page min-h-screen bg-white" data-testid="services-page">
      {/* Header */}
      <section className="bg-slate-50 py-16 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-cyan-600 text-sm font-semibold tracking-wider uppercase">Our Services</span>
            <h1 className="font-heading font-bold text-3xl lg:text-4xl text-[#0f172a] mt-2 mb-4">
              Complete Water Treatment Services
            </h1>
            <p className="text-slate-600 max-w-2xl">
              From installation to maintenance, we provide end-to-end services to keep your 
              water treatment systems running at peak performance.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="spinner"></div>
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
                    <Card className="h-full border-slate-200 hover:border-cyan-200 transition-colors" data-testid={`service-${service.slug}`}>
                      <CardContent className="p-6">
                        <div className="w-14 h-14 bg-cyan-50 rounded-xl flex items-center justify-center mb-6">
                          <IconComponent className="w-7 h-7 text-cyan-600" />
                        </div>
                        <h3 className="font-heading font-semibold text-xl text-[#0f172a] mb-3">
                          {service.name}
                        </h3>
                        <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                          {service.description}
                        </p>
                        <ul className="space-y-2">
                          {service.features.slice(0, 4).map((feature, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-sm">
                              <CheckCircle className="w-4 h-4 text-cyan-500 flex-shrink-0" />
                              <span className="text-slate-700">{feature}</span>
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

      {/* Process Section */}
      <section className="py-20 bg-slate-50" data-testid="process-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-cyan-600 text-sm font-semibold tracking-wider uppercase">Our Process</span>
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-[#0f172a] mt-2">
              How We Work
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="text-6xl font-heading font-extrabold text-cyan-100 mb-4">
                  {item.step}
                </div>
                <h3 className="font-heading font-semibold text-lg text-[#0f172a] mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-600 text-sm">
                  {item.description}
                </p>
                {index < processSteps.length - 1 && (
                  <ArrowRight className="hidden lg:block absolute top-8 -right-4 w-8 h-8 text-slate-300" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AMC Highlight */}
      <section className="py-20 bg-white" data-testid="amc-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img 
                src="https://images.unsplash.com/photo-1735494032948-14ef288fc9d3?w=800"
                alt="Service Engineer"
                className="rounded-xl shadow-lg"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-cyan-600 text-sm font-semibold tracking-wider uppercase">Annual Maintenance</span>
              <h2 className="font-heading font-bold text-3xl text-[#0f172a] mt-2 mb-6">
                Keep Your Systems Running Smoothly
              </h2>
              <p className="text-slate-600 mb-6">
                Our comprehensive Annual Maintenance Contract (AMC) ensures your water treatment 
                plants operate at peak efficiency year-round. Preventive maintenance saves you 
                from costly breakdowns and extends equipment life.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Quarterly preventive maintenance visits",
                  "Priority emergency response",
                  "Discounted spare parts",
                  "Performance optimization",
                  "Compliance documentation support"
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-cyan-500 flex-shrink-0" />
                    <span className="text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/contact">
                <Button className="bg-[#0f172a] hover:bg-[#1e293b] gap-2" data-testid="amc-enquiry-btn">
                  Enquire About AMC <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#0f172a] relative noise-overlay" data-testid="services-cta">
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading font-bold text-3xl text-white mb-4">
            Need Service Support?
          </h2>
          <p className="text-slate-300 mb-8">
            Our technical team is available to help you with installation, maintenance, or any service queries.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:+917550000000">
              <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-white gap-2">
                <Phone className="w-4 h-4" /> Call Us Now
              </Button>
            </a>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-slate-400 text-white hover:bg-white/10">
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
