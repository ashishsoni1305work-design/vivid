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
  ArrowRight
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";

const AboutPage = () => {
  const values = [
    {
      icon: Award,
      title: "Quality Excellence",
      description: "We never compromise on quality. Every product undergoes rigorous testing before delivery."
    },
    {
      icon: Users,
      title: "Customer First",
      description: "Our clients' success is our success. We build long-term relationships based on trust."
    },
    {
      icon: Target,
      title: "Innovation",
      description: "We continuously upgrade our technology to provide the most efficient solutions."
    },
    {
      icon: Eye,
      title: "Transparency",
      description: "Honest pricing, clear communication, and ethical business practices guide everything we do."
    }
  ];

  const milestones = [
    { year: "2014", title: "Company Founded", description: "Started operations in Bhopal with focus on RO plants" },
    { year: "2016", title: "Expanded Product Line", description: "Added ETP and STP to our offerings" },
    { year: "2018", title: "100+ Installations", description: "Crossed 100 successful project completions" },
    { year: "2020", title: "Regional Expansion", description: "Extended services across Madhya Pradesh" },
    { year: "2023", title: "500+ Projects", description: "Achieved milestone of 500+ successful projects" }
  ];

  const certifications = [
    "ISO 9001:2015 Quality Management",
    "MSME Registered Enterprise",
    "GST Registered (23CCQPS3136K1Z7)",
    "CPCB Compliant Products",
    "IndiaMART Verified Supplier"
  ];

  return (
    <div className="about-page min-h-screen bg-white" data-testid="about-page">
      {/* Header */}
      <section className="bg-slate-50 py-16 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-cyan-600 text-sm font-semibold tracking-wider uppercase">About Us</span>
            <h1 className="font-heading font-bold text-3xl lg:text-4xl text-[#0f172a] mt-2 mb-4">
              Your Trusted Water Treatment Partner
            </h1>
            <p className="text-slate-600 max-w-2xl">
              Since 2014, Vivid H2O Solutions has been delivering excellence in industrial water 
              treatment across India. Our commitment to quality and customer satisfaction drives everything we do.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-20" data-testid="company-overview">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-heading font-bold text-3xl text-[#0f172a] mb-6">
                A Decade of Water Treatment Excellence
              </h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Vivid H2O Solutions was founded in 2014 with a mission to provide high-quality, 
                reliable water treatment solutions to industries across India. Under the leadership 
                of Mr. Ashish Soni, we have grown from a small operation to a trusted name in the 
                water treatment industry.
              </p>
              <p className="text-slate-600 mb-6 leading-relaxed">
                We specialize in designing, manufacturing, and supplying industrial RO plants, 
                effluent treatment plants, sewage treatment systems, and various water purification 
                equipment. Our products are known for their durability, efficiency, and low maintenance requirements.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-cyan-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Location</p>
                    <p className="font-medium text-[#0f172a]">Bhopal, MP</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-cyan-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Established</p>
                    <p className="font-medium text-[#0f172a]">2014</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-cyan-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Team Size</p>
                    <p className="font-medium text-[#0f172a]">10+ Experts</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center">
                    <Building className="w-5 h-5 text-cyan-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Annual Revenue</p>
                    <p className="font-medium text-[#0f172a]">₹5-10 Crore</p>
                  </div>
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
                className="rounded-xl shadow-lg"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-slate-50" data-testid="mission-vision">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-slate-200">
                <CardContent className="p-8">
                  <div className="w-14 h-14 bg-cyan-100 rounded-xl flex items-center justify-center mb-6">
                    <Target className="w-7 h-7 text-cyan-600" />
                  </div>
                  <h3 className="font-heading font-bold text-2xl text-[#0f172a] mb-4">Our Mission</h3>
                  <p className="text-slate-600 leading-relaxed">
                    To provide innovative, reliable, and cost-effective water treatment solutions 
                    that help industries meet their water quality requirements while contributing 
                    to environmental sustainability. We strive to be the most trusted partner for 
                    all water treatment needs.
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
              <Card className="h-full border-slate-200">
                <CardContent className="p-8">
                  <div className="w-14 h-14 bg-cyan-100 rounded-xl flex items-center justify-center mb-6">
                    <Eye className="w-7 h-7 text-cyan-600" />
                  </div>
                  <h3 className="font-heading font-bold text-2xl text-[#0f172a] mb-4">Our Vision</h3>
                  <p className="text-slate-600 leading-relaxed">
                    To become a leading water treatment company in India, recognized for our 
                    technical expertise, product quality, and exceptional customer service. 
                    We envision a future where every industry has access to clean, safe water 
                    through sustainable treatment solutions.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-white" data-testid="core-values">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-cyan-600 text-sm font-semibold tracking-wider uppercase">Our Values</span>
            <h2 className="font-heading font-bold text-3xl text-[#0f172a] mt-2">
              What Drives Us
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-cyan-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-cyan-600" />
                </div>
                <h3 className="font-heading font-semibold text-lg text-[#0f172a] mb-2">
                  {value.title}
                </h3>
                <p className="text-slate-600 text-sm">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-slate-50" data-testid="company-timeline">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-cyan-600 text-sm font-semibold tracking-wider uppercase">Our Journey</span>
            <h2 className="font-heading font-bold text-3xl text-[#0f172a] mt-2">
              Key Milestones
            </h2>
          </div>

          <div className="relative">
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 -translate-x-1/2"></div>
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`flex flex-col md:flex-row items-center gap-8 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                    <div className="font-mono text-cyan-600 font-bold text-lg mb-1">{milestone.year}</div>
                    <h3 className="font-heading font-semibold text-xl text-[#0f172a] mb-2">{milestone.title}</h3>
                    <p className="text-slate-600">{milestone.description}</p>
                  </div>
                  <div className="w-4 h-4 bg-cyan-500 rounded-full border-4 border-white shadow z-10"></div>
                  <div className="flex-1"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 bg-white" data-testid="certifications">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-cyan-600 text-sm font-semibold tracking-wider uppercase">Credentials</span>
              <h2 className="font-heading font-bold text-3xl text-[#0f172a] mt-2 mb-6">
                Certifications & Recognition
              </h2>
              <p className="text-slate-600 mb-8">
                Our commitment to quality and compliance is reflected in our certifications and 
                registrations. We adhere to industry standards and regulatory requirements.
              </p>
              <ul className="space-y-3">
                {certifications.map((cert, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-cyan-500 flex-shrink-0" />
                    <span className="text-slate-700">{cert}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-slate-50 rounded-xl p-8"
            >
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                  <Factory className="w-10 h-10 text-cyan-600 mx-auto mb-3" />
                  <p className="font-heading font-bold text-2xl text-[#0f172a]">500+</p>
                  <p className="text-sm text-slate-500">Projects Delivered</p>
                </div>
                <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                  <Users className="w-10 h-10 text-cyan-600 mx-auto mb-3" />
                  <p className="font-heading font-bold text-2xl text-[#0f172a]">200+</p>
                  <p className="text-sm text-slate-500">Happy Clients</p>
                </div>
                <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                  <MapPin className="w-10 h-10 text-cyan-600 mx-auto mb-3" />
                  <p className="font-heading font-bold text-2xl text-[#0f172a]">MP</p>
                  <p className="text-sm text-slate-500">Serving Region</p>
                </div>
                <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                  <Award className="w-10 h-10 text-cyan-600 mx-auto mb-3" />
                  <p className="font-heading font-bold text-2xl text-[#0f172a]">10+</p>
                  <p className="text-sm text-slate-500">Years Experience</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#0f172a] relative noise-overlay" data-testid="about-cta">
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading font-bold text-3xl text-white mb-4">
            Let's Work Together
          </h2>
          <p className="text-slate-300 mb-8">
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
