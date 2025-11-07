import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Menu,
  X,
  Sun,
  Moon,
  Instagram,
  Linkedin,
  MessageCircle,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        isMenuOpen &&
        !target.closest(".mobile-menu") &&
        !target.closest(".mobile-menu-button")
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Clients", path: "/clients" },
    { name: "About Us", path: "/about" },
    { name: "Contact Us", path: "/contact" },
    { name: "Careers", path: "/careers" },
  ];

  return (
    <div
      className={`min-h-screen text-foreground transition-colors duration-300 font-sans overflow-x-hidden ${
        isDark ? "dark" : "light"
      }`}
    >
      {" "}
      {/* Navigation - Mobile Responsive */}{" "}
      <nav
        className={`fixed w-full z-50 transition-all duration-500 ${
          isScrolled ? "py-1 sm:py-2" : "py-1.5 sm:py-2 lg:py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          {" "}
          <div
            className={`nav-glass rounded-xl sm:rounded-2xl px-3 sm:px-4 lg:px-6 transition-all duration-500 ${
              isScrolled
                ? "py-1.5 sm:py-2 lg:py-3 shadow-2xl backdrop-blur-3xl"
                : "py-2 sm:py-3 lg:py-4 shadow-xl backdrop-blur-2xl"
            }`}
          >
            <div className="flex justify-between items-center">
              {/* Logo - Mobile Responsive */}
              <Link
                to="/"
                className="flex items-center space-x-2 sm:space-x-3 group"
              >
                <img
                  src={isDark ? "/Asset 2.png" : "/Asset 1.png"}
                  alt="AdGrades Logo"
                  className={`w-auto object-contain transition-all duration-300 group-hover:brightness-110 ${
                    isScrolled ? "h-6 sm:h-8" : "h-8 sm:h-10"
                  }`}
                />
              </Link>

              {/* Desktop Navigation - Hidden on mobile */}
              <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`font-medium transition-all duration-300 relative group px-2 xl:px-3 py-2 rounded-lg flex items-center whitespace-nowrap ${
                      location.pathname === item.path
                        ? "text-primary bg-primary/10 shadow-lg shadow-primary/20"
                        : "text-foreground hover:text-primary hover:bg-primary/5"
                    } ${isScrolled ? "text-sm" : "text-base"}`}
                  >
                    <span className="truncate">{item.name}</span>
                    {location.pathname === item.path && (
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
                    )}
                  </Link>
                ))}
              </div>

              {/* Right side buttons - Mobile Responsive */}
              <div className="flex items-center space-x-2 sm:space-x-3">
                {" "}
                <button
                  onClick={toggleTheme}
                  className={`rounded-lg text-muted-foreground hover:text-primary transition-all duration-300 flex items-center justify-center flex-shrink-0 ${
                    isScrolled ? "p-1.5 w-7 h-7" : "p-2 w-8 h-8 sm:w-9 sm:h-9"
                  }`}
                  aria-label="Toggle dark mode"
                >
                  {isDark ? (
                    <Sun size={isScrolled ? 14 : 16} />
                  ) : (
                    <Moon size={isScrolled ? 14 : 16} />
                  )}
                </button>{" "}
                {/* Desktop CTA Button - Custom styling to avoid brand-button interference */}
                <Link
                  to="/contact"
                  className={`hidden lg:inline-flex items-center justify-center whitespace-nowrap flex-shrink-0 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105 ${
                    isScrolled ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm"
                  }`}
                >
                  Start a Project
                </Link>
                {/* Mobile Menu Button - Smaller and more proportional */}
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className={`lg:hidden mobile-menu-button rounded-lg text-muted-foreground hover:text-primary transition-all duration-300 flex items-center justify-center ${
                    isScrolled ? "p-1.5 w-7 h-7" : "p-2 w-8 h-8"
                  }`}
                  aria-label="Toggle menu"
                >
                  {isMenuOpen ? (
                    <X size={isScrolled ? 16 : 18} />
                  ) : (
                    <Menu size={isScrolled ? 16 : 18} />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>{" "}
        {/* Mobile Sidebar - Improved Responsive Design */}
        {isMenuOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
              onClick={() => setIsMenuOpen(false)}
            />

            <div className="mobile-menu absolute top-0 right-0 h-full w-80 max-w-[85vw] nav-glass transform transition-transform duration-300 ease-out border-l border-primary/20">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-4 sm:p-6 border-b border-border/50">
                  <img
                    src={isDark ? "/Asset 2.png" : "/Asset 1.png"}
                    alt="AdGrades Logo"
                    className="h-6 sm:h-8 w-auto object-contain"
                  />{" "}
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300"
                    aria-label="Close menu"
                  >
                    <X size={24} />
                  </button>
                </div>
                <div className="flex-1 px-4 sm:px-6 py-4 sm:py-6 space-y-2 overflow-y-auto">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex items-center px-3 sm:px-4 py-3 sm:py-4 rounded-xl font-medium transition-all duration-300 relative group ${
                        location.pathname === item.path
                          ? "text-primary bg-gradient-to-r from-primary/10 to-secondary/5 border border-primary/20"
                          : "text-foreground hover:text-primary hover:bg-primary/5"
                      }`}
                    >
                      <span className="text-base sm:text-lg">{item.name}</span>
                      {location.pathname === item.path && (
                        <div className="absolute right-3 w-1 h-6 bg-gradient-to-b from-primary to-secondary rounded-full"></div>
                      )}
                    </Link>
                  ))}
                </div>{" "}
                <div className="p-4 sm:p-6 border-t border-border/50 space-y-4">
                  {" "}
                  <Link
                    to="/contact"
                    onClick={() => setIsMenuOpen(false)}
                    className="w-full bg-gradient-to-r from-primary to-secondary text-white font-semibold px-4 py-3 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center justify-center"
                  >
                    Start a Project
                  </Link>
                  <div className="text-center">
                    {" "}
                    <button
                      onClick={toggleTheme}
                      className="p-3 rounded-xl text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300 inline-flex items-center space-x-2"
                      aria-label={
                        isDark ? "Switch to light mode" : "Switch to dark mode"
                      }
                    >
                      {isDark ? <Sun size={20} /> : <Moon size={20} />}
                      <span className="text-sm">
                        {isDark ? "Light Mode" : "Dark Mode"}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>      {/* Main Content with Overlay for Non-Hero Sections */}
      <main className="overflow-x-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          {React.Children.map(children, (child, index) => {
            if (React.isValidElement(child)) {
              return React.cloneElement(
                child as React.ReactElement<React.HTMLAttributes<HTMLElement>>,
                {
                  key: index,
                }
              );
            }
            return child;
          })}
        </motion.div>
      </main>
      {/* Footer with Content Overlay */}
      <footer className="content-overlay border-t border-border overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand - Mobile Responsive */}
            <div className="col-span-1 sm:col-span-2 lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <img
                  src={isDark ? "/Asset 2.png" : "/Asset 1.png"}
                  alt="AdGrades Logo"
                  className="h-8 sm:h-10 w-auto object-contain"
                />
              </div>
              <p className="text-muted-foreground mb-6 sm:mb-8 max-w-md leading-relaxed text-sm sm:text-base description-text">
                We help startups become the next big name through creative
                marketing, data-driven ads, and stunning web design.
              </p>

              {/* Contact Info - Mobile Responsive */}
              <div className="space-y-3 mb-6 sm:mb-8">
                <div className="flex items-start text-muted-foreground text-sm sm:text-base">
                  <Phone className="h-4 w-4 mr-3 mt-0.5 text-primary flex-shrink-0" />
                  <div>
                    <div>+91 80736 98913</div>
                    <div>+91 9686314869</div>
                  </div>
                </div>
                <div className="flex items-start text-muted-foreground text-sm sm:text-base">
                  <Mail className="h-4 w-4 mr-3 mt-0.5 text-primary flex-shrink-0" />
                  <div>
                    <div>info@adgrades.in</div>
                    <div>adgradesweb@gmail.com</div>
                  </div>
                </div>
                <div className="flex items-start text-muted-foreground text-sm sm:text-base">
                  <MapPin className="h-4 w-4 mr-3 mt-1 text-primary flex-shrink-0" />
                  <div>
                    <div>Vinayaka Industries</div>
                    <div>Behind KMF Cattle Feed Factory</div>
                    <div>K Hoskoppalu, Hassan 573201</div>
                    <div>Karnataka, India</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links - Mobile Responsive */}
            <div className="col-span-1">
              <h4 className="font-semibold text-foreground mb-6 text-base sm:text-lg">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.path}
                      className="text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center text-sm sm:text-base"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Links & Hours - Mobile Responsive */}
            <div className="col-span-1">
              <h4 className="font-semibold text-foreground mb-6 text-base sm:text-lg">
                Connect & Hours
              </h4>{" "}
              <div className="flex space-x-3 sm:space-x-4 mb-6">
                <a
                  href="https://www.linkedin.com/company/ad-grades"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 sm:p-3 bg-muted rounded-xl text-muted-foreground hover:text-primary hover:bg-primary/10 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 transform hover:scale-105"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={16} className="sm:w-[18px] sm:h-[18px]" />
                </a>
                <a
                  href="#"
                  className="p-2 sm:p-3 bg-muted rounded-xl text-muted-foreground hover:text-secondary hover:bg-secondary/10 hover:shadow-lg hover:shadow-secondary/20 transition-all duration-300 transform hover:scale-105"
                  aria-label="Instagram"
                >
                  <Instagram size={16} className="sm:w-[18px] sm:h-[18px]" />
                </a>
                <a
                  href="https://wa.me/919686314869"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 sm:p-3 bg-muted rounded-xl text-muted-foreground hover:text-secondary hover:bg-secondary/10 hover:shadow-lg hover:shadow-secondary/20 transition-all duration-300 transform hover:scale-105"
                  aria-label="WhatsApp"
                >
                  <MessageCircle
                    size={16}
                    className="sm:w-[18px] sm:h-[18px]"
                  />
                </a>
              </div>
              <div className="text-sm text-muted-foreground">
                <div className="font-medium text-foreground mb-2">
                  Business Hours
                </div>
                <div>Mon - Sat: 9:00 AM - 9:00 PM</div>
                <div>Sun: 9:00 AM - 1:30 PM</div>
              </div>
            </div>
          </div>

          <div className="border-t border-border mt-8 sm:mt-12 pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-muted-foreground text-xs sm:text-sm text-center md:text-left">
              © {new Date().getFullYear()} AdGrades. All rights reserved.
            </p>
            <div className="flex space-x-4 sm:space-x-6">
              <a
                href="#"
                className="text-muted-foreground hover:text-primary text-xs sm:text-sm transition-colors duration-300"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary text-xs sm:text-sm transition-colors duration-300"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
