import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import defaultLogo from "../assets/dorabel-logo.png";
import { tinaField } from "tinacms/dist/react";

const Navbar = ({ headerData }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const logoSrc = headerData?.logo || defaultLogo;
  const companyName = headerData?.companyName || "Dorabel";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Services", path: "/services" },
    { name: "Booking", path: "/booking" },
    { name: "Process", path: "/#process", isHash: true, hidden: true },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  // Helper function to scroll to element with retries
  const scrollToElement = (hash, retries = 10) => {
    const element = document.getElementById(hash);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else if (retries > 0) {
      setTimeout(() => scrollToElement(hash, retries - 1), 200);
    }
  };

  const handleNavClick = (e, link) => {
    if (link.isHash) {
      e.preventDefault();
      const hash = link.path.split("#")[1];
      if (location.pathname === "/") {
        scrollToElement(hash);
      } else {
        navigate("/");
        setTimeout(() => scrollToElement(hash), 100);
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} // Slower, cinematic ease
      className={`fixed w-full z-50 transition-all duration-700 py-6 ${
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-8 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-4 group">
          <img
            src={logoSrc}
            alt={companyName}
            data-tina-field={headerData ? tinaField(headerData, "logo") : ""}
            className="h-12 w-auto"
          />
          <span className="font-heading font-semibold text-2xl tracking-tight text-dorabel-purple">
            {companyName === "Dorabel" ? (
              <>
                Dorabel <span className="text-dorabel-gold italic">Intl.</span>
              </>
            ) : (
              <span
                data-tina-field={
                  headerData ? tinaField(headerData, "companyName") : ""
                }
              >
                {companyName}
              </span>
            )}
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-12">
          {navLinks.map((link) =>
            link.isHash ? (
              <a
                key={link.name}
                href={link.path}
                onClick={(e) => handleNavClick(e, link)}
                className={`text-dorabel-purple hover:text-dorabel-gold transition-colors font-sans text-sm font-medium tracking-wide uppercase relative group cursor-pointer ${
                  link.hidden ? "hidden" : ""
                }`}
              >
                {link.name}
                <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-dorabel-gold transition-all duration-500 group-hover:w-full"></span>
              </a>
            ) : (
              <Link
                key={link.name}
                to={link.path}
                className={`text-dorabel-purple hover:text-dorabel-gold transition-colors font-sans text-sm font-medium tracking-wide uppercase relative group ${
                  link.hidden ? "hidden" : ""
                }`}
              >
                {link.name}
                <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-dorabel-gold transition-all duration-500 group-hover:w-full"></span>
              </Link>
            )
          )}
          <a
            href="#contact"
            className="px-8 py-3 bg-dorabel-purple hover:bg-dorabel-gold text-white font-medium rounded-none transition-all duration-500 shadow-sm text-sm tracking-wide"
          >
            Get a Quote
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-dorabel-purple focus:outline-none relative z-50"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <div className="w-8 h-6 flex flex-col justify-between">
            <span
              className={`w-full h-[2px] bg-current transition-transform duration-500 ${
                isMobileMenuOpen ? "rotate-45 translate-y-2.5" : ""
              }`}
            ></span>
            <span
              className={`w-full h-[2px] bg-current transition-opacity duration-500 ${
                isMobileMenuOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`w-full h-[2px] bg-current transition-transform duration-500 ${
                isMobileMenuOpen ? "-rotate-45 -translate-y-3" : ""
              }`}
            ></span>
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden bg-white fixed inset-0 z-40 pt-32 px-8"
          >
            <div className="flex flex-col gap-10">
              {navLinks.map((link) =>
                link.isHash ? (
                  <a
                    key={link.name}
                    href={link.path}
                    className="text-4xl font-heading font-bold text-dorabel-purple"
                    onClick={(e) => handleNavClick(e, link)}
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="text-4xl font-heading font-bold text-dorabel-purple"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                )
              )}
              <a
                href="#contact"
                className="px-8 py-4 bg-dorabel-purple text-center text-white font-medium rounded-sm mt-8"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Get a Quote
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
