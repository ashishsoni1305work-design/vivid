import { Link } from "react-router-dom";
import { Droplets, MapPin, Phone, Mail, Clock } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0f172a] text-white relative noise-overlay" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-cyan-500 rounded-md flex items-center justify-center">
                <Droplets className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="font-heading font-bold text-lg">Vivid H2O</span>
                <span className="block text-xs text-slate-400 -mt-1">Solutions</span>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Leading manufacturer and supplier of industrial water treatment solutions. 
              Trusted by industries across India since 2014.
            </p>
            <p className="text-xs text-slate-500">
              GST: 23CCQPS3136K1Z7
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold text-white mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/products" className="footer-link text-slate-400 text-sm hover:text-cyan-400">
                  Our Products
                </Link>
              </li>
              <li>
                <Link to="/services" className="footer-link text-slate-400 text-sm hover:text-cyan-400">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/about" className="footer-link text-slate-400 text-sm hover:text-cyan-400">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="footer-link text-slate-400 text-sm hover:text-cyan-400">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-heading font-semibold text-white mb-6">Products</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/products?category=RO Plants" className="footer-link text-slate-400 text-sm hover:text-cyan-400">
                  RO Plants
                </Link>
              </li>
              <li>
                <Link to="/products?category=Treatment Plants" className="footer-link text-slate-400 text-sm hover:text-cyan-400">
                  Treatment Plants
                </Link>
              </li>
              <li>
                <Link to="/products?category=Water Softeners" className="footer-link text-slate-400 text-sm hover:text-cyan-400">
                  Water Softeners
                </Link>
              </li>
              <li>
                <Link to="/products?category=Coolers & Chillers" className="footer-link text-slate-400 text-sm hover:text-cyan-400">
                  Coolers & Chillers
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading font-semibold text-white mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span className="text-slate-400 text-sm">
                  09, Kundan Nagar, Baghmugalya,<br />
                  Bhopal - 402026, MP, India
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                <a href="tel:+917550000000" className="footer-link text-slate-400 text-sm hover:text-cyan-400">
                  +91-755-XXXXXXX
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                <a href="mailto:info@vividh2osolutions.com" className="footer-link text-slate-400 text-sm hover:text-cyan-400">
                  info@vividh2osolutions.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                <span className="text-slate-400 text-sm">
                  Mon - Sat: 9:00 AM - 6:00 PM
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © {currentYear} Vivid H2O Solutions. All rights reserved.
          </p>
          <p className="text-slate-500 text-sm">
            Proprietor: Ashish Soni | Est. 2014
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
