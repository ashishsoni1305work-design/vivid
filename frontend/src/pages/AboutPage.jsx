import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Award, 
  Users, 
  Target, 
  Eye,
  Factory,
  MapPin,
  Calendar,
  Building,
  CheckCircle,
  ArrowRight,
  Shield,
  Clock,
  Droplets
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";

const AboutPage = () => {
  const values = [
    {
      icon: Shield,
      title: "Quality Excellence",
      description: "We never compromise on quality. Every product undergoes rigorous testing."
    },
    {
      icon: Users,
      title: "Customer First",
      description: "Our clients' success is our success. We build long-term relationships."
    },
    {
      icon: Target,
      title: "Innovation",
      description: "We continuously upgrade our technology for efficient solutions."
    },
    {
      icon: Clock,
      title: "On-Time Delivery",
      description: "Committed to meeting deadlines and project schedules."
    }
  ];

  const stats = [
    { number: "500+", label: "Projects Completed" },
    { number: "200+", label: "Happy Clients" },
    { number: "10+", label: "Years Experience" },
    { number: "50+", label: "Products" }
  ];

  const milestones = [
    { year: "2014", title: "Company Founded", description: "Started operations in Bhopal" },
    { year: "2016", title: "Expanded Product Line", description: "Added ETP and STP" },
    { year: "2018", title: "100+ Installations", description: "Major milestone achieved" },
    { year: "2020", title: "Regional Expansion", description: "Pan-MP operations" },
    { year: "2023", title: "500+ Projects", description: "Industry leader status" },
    { year: "2025", title: "Automation & SCADA", description: "Advanced technology integration" }
  ];

  return (
    <div className="about-page min-h-screen bg-gray-50" data-testid="about-page">
      {/* Hero Header */}
      <section className="bg-gradient-to-r from-[#0d47a1] to-[#1976d2] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="font-heading font-bold text-3xl lg:text-4xl text-white mb-4">
              About Us
            </h1>
            <p className="text-blue-100 max-w-2xl mx-auto">
              Your trusted partner in industrial water treatment solutions since 2014.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-16 bg-white" data-testid="company-overview">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="section-title-icon"></div>
              <span className="text-[#0d47a1] text-sm font-semibold tracking-wider uppercase">About Vivid H2O Solutions</span>
              <h2 className="font-heading font-bold text-3xl text-gray-900 mt-2 mb-6">
                A Decade of Water Treatment Excellence
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Vivid H2O Solutions was founded in 2014 with a mission to provide high-quality, 
                reliable water treatment solutions to industries across India. Under the leadership 
                of Mr. Ashish Soni, we have grown from a small operation to a trusted name in the 
                water treatment industry.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                We specialize in designing, manufacturing, and supplying industrial RO plants, 
                effluent treatment plants, sewage treatment systems, and various water purification 
                equipment.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <MapPin className="w-6 h-6 text-[#0d47a1] mb-2" />
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-semibold text-gray-900">Bhopal, MP</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <Calendar className="w-6 h-6 text-[#0d47a1] mb-2" />
                  <p className="text-sm text-gray-500">Established</p>
                  <p className="font-semibold text-gray-900">2014</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <Users className="w-6 h-6 text-[#0d47a1] mb-2" />
                  <p className="text-sm text-gray-500">Team Size</p>
                  <p className="font-semibold text-gray-900">10+ Experts</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <Building className="w-6 h-6 text-[#0d47a1] mb-2" />
                  <p className="text-sm text-gray-500">Turnover</p>
                  <p className="font-semibold text-gray-900">₹5-10 Crore</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img 
                src="https://images.unsplash.com/flagged/photo-1576485436509-a7d286952b65?w=800"
                alt="Our Team"
                className="rounded-xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 stats-bg">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="font-heading font-extrabold text-4xl lg:text-5xl text-white mb-2">{stat.number}</div>
                <p className="text-blue-100">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-white" data-testid="mission-vision">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-0 shadow-lg overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-[#0d47a1] to-[#1976d2]"></div>
                <CardContent className="p-8">
                  <div className="w-14 h-14 bg-[#0d47a1]/10 rounded-xl flex items-center justify-center mb-6">
                    <Target className="w-7 h-7 text-[#0d47a1]" />
                  </div>
                  <h3 className="font-heading font-bold text-2xl text-gray-900 mb-4">Our Mission</h3>
                  <p className="text-gray-600 leading-relaxed">
                    To provide innovative, reliable, and cost-effective water treatment solutions 
                    that help industries meet their water quality requirements while contributing 
                    to environmental sustainability.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-0 shadow-lg overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-cyan-500 to-cyan-600"></div>
                <CardContent className="p-8">
                  <div className="w-14 h-14 bg-cyan-500/10 rounded-xl flex items-center justify-center mb-6">
                    <Eye className="w-7 h-7 text-cyan-600" />
                  </div>
                  <h3 className="font-heading font-bold text-2xl text-gray-900 mb-4">Our Vision</h3>
                  <p className="text-gray-600 leading-relaxed">
                    To become a leading water treatment company in India, recognized for our 
                    technical expertise, product quality, and exceptional customer service.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-gray-50" data-testid="core-values">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl text-gray-900">Our Core Values</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-0 shadow-md hover:shadow-lg transition-shadow text-center">
                  <CardContent className="p-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#0d47a1] to-[#1976d2] rounded-xl flex items-center justify-center mx-auto mb-4">
                      <value.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="font-heading font-semibold text-lg text-gray-900 mb-2">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-white" data-testid="company-timeline">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl text-gray-900">Our Journey</h2>
          </div>

          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-[#0d47a1]/20 -translate-x-1/2"></div>
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={`relative flex items-center gap-8 mb-8 ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                <div className={`flex-1 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                  <div className="bg-white p-6 rounded-xl shadow-md inline-block">
                    <span className="font-mono text-[#0d47a1] font-bold">{milestone.year}</span>
                    <h4 className="font-heading font-semibold text-gray-900 mt-1">{milestone.title}</h4>
                    <p className="text-gray-600 text-sm">{milestone.description}</p>
                  </div>
                </div>
                <div className="w-4 h-4 bg-[#0d47a1] rounded-full border-4 border-white shadow z-10"></div>
                <div className="flex-1"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 bg-gray-50" data-testid="certifications">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl text-gray-900">Certifications & Credentials</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { title: "ISO 9001:2015", subtitle: "Quality Management" },
              { title: "MSME Registered", subtitle: "Government Certified" },
              { title: "CPCB Compliant", subtitle: "Pollution Control" },
              { title: "GST Registered", subtitle: "23CCQPS3136K1Z7" }
            ].map((cert, index) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-md flex items-center gap-4"
              >
                <div className="w-12 h-12 bg-[#0d47a1]/10 rounded-full flex items-center justify-center">
                  <Award className="w-6 h-6 text-[#0d47a1]" />
                </div>
                <div>
                  <p className="font-heading font-semibold text-gray-900">{cert.title}</p>
                  <p className="text-sm text-gray-500">{cert.subtitle}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-[#0d47a1] to-[#1976d2]" data-testid="about-cta">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading font-bold text-3xl text-white mb-4">
            Let's Work Together
          </h2>
          <p className="text-blue-100 mb-8">
            Partner with us for reliable, high-quality water treatment solutions.
          </p>
          <Link to="/contact">
            <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-white gap-2" data-testid="contact-cta-btn">
              Contact Us <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
