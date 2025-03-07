import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleTryNowClick = () => {
    navigate("/dashboard"); // This will navigate to the dashboard
  };

  const navLinks = [
    { href: "#hero", label: "Home" },
    { href: "#features", label: "Features" },
    { href: "#achievement-tracking", label: "Tracking" },
    { href: "#social-community", label: "Community" },
    { href: "#rewards-marketplace", label: "Rewards" },
    { href: "#pricing", label: "Pricing" },
  ];

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300
      ${scrolled ? "shadow-lg bg-opacity-95" : ""}`}
    >
      <div className="bg-[#090909] border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <span className="text-2xl font-bold bg-gradient-to-r from-[#00F0FF] to-[#FF006F] text-transparent bg-clip-text">
                Commit
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-8">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-gray-300 hover:text-[#00F0FF] transition-colors duration-300 text-sm font-medium"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400
                hover:text-white hover:bg-neutral-800 focus:outline-none transition-colors duration-300"
                aria-expanded={isMobileMenuOpen}
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className={`h-6 w-6 ${isMobileMenuOpen ? "hidden" : "block"}`}
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                <svg
                  className={`h-6 w-6 ${isMobileMenuOpen ? "block" : "hidden"}`}
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-[#00F0FF] to-[#FF006F] text-white px-6 py-2
                rounded-full hover:opacity-90 transition-all duration-300 font-medium text-sm"
              >
                Try Now
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: isMobileMenuOpen ? 1 : 0,
            height: isMobileMenuOpen ? "auto" : 0,
          }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden bg-[#090909] border-t border-neutral-800"
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300
                hover:text-[#00F0FF] hover:bg-neutral-800 transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full mt-4 bg-gradient-to-r from-[#00F0FF] to-[#FF006F]
              text-white px-6 py-2 rounded-full hover:opacity-90 transition-all duration-300
              font-medium text-sm"
              onClick={handleTryNowClick}
            >
              Try Now
            </motion.button>
          </div>
        </motion.div>
      </div>
    </nav>
  );
};

export default Navbar;
