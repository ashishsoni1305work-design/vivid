import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Droplets, Phone, Mail, MapPin, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Services", path: "/services" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Top Bar */}
      <div className="top-bar text-white py-2 hidden lg:block" data-testid="top-bar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-6">
              <a href="tel:+917550000000" className="flex items-center gap-2 hover:text-cyan-300 transition-colors">
                <Phone className="w-4 h-4" />
                <span>+91-755-XXXXXXX</span>
              </a>
              <a href="mailto:info@vividh2osolutions.com" className="flex items-center gap-2 hover:text-cyan-300 transition-colors">
                <Mail className="w-4 h-4" />
                <span>info@vividh2osolutions.com</span>
              </a>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>Bhopal - 402026, MP, India</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header 
        className={`sticky top-0 z-50 bg-white transition-all duration-300 ${
          isScrolled ? "shadow-lg" : "shadow-sm"
        }`} 
        data-testid="navbar"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3" data-testid="logo">
              <div className="w-12 h-12 bg-gradient-to-br from-[#0d47a1] to-[#1976d2] rounded-lg flex items-center justify-center shadow-lg">
                <Droplets className="w-7 h-7 text-white" />
              </div>
              <div>
                <span className="font-heading font-bold text-xl text-[#0d47a1] block leading-tight">Vivid H2O</span>
                <span className="text-xs text-gray-500 font-medium">Solutions</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1" data-testid="desktop-nav">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 text-sm font-medium transition-all rounded-md ${
                    isActive(link.path)
                      ? "text-[#0d47a1] bg-blue-50"
                      : "text-gray-700 hover:text-[#0d47a1] hover:bg-blue-50"
                  }`}
                  data-testid={`nav-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center gap-3">
              <Link to="/contact">
                <Button className="bg-gradient-to-r from-[#0d47a1] to-[#1976d2] hover:from-[#0a3d8f] hover:to-[#1565c0] text-white shadow-lg" data-testid="get-quote-btn">
                  Get Free Quote
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-gray-700"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              data-testid="mobile-menu-btn"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="lg:hidden py-4 border-t border-gray-100" data-testid="mobile-nav">
              <nav className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      isActive(link.path)
                        ? "bg-blue-50 text-[#0d47a1]"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="px-4 py-3 space-y-2 border-t border-gray-100 mt-2">
                  <a href="tel:+917550000000" className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4 text-[#0d47a1]" />
                    +91-755-XXXXXXX
                  </a>
                  <a href="mailto:info@vividh2osolutions.com" className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="w-4 h-4 text-[#0d47a1]" />
                    info@vividh2osolutions.com
                  </a>
                </div>
                <Link to="/contact" onClick={() => setIsOpen(false)} className="mx-4 mt-2">
                  <Button className="w-full bg-gradient-to-r from-[#0d47a1] to-[#1976d2] text-white">
                    Get Free Quote
                  </Button>
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Navbar;
