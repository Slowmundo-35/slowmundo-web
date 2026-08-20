"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Voyages", path: "/voyages" },
    { name: "Services", path: "/services" },
    { name: "À propos", path: "/a-propos" },
  ];

  return (
    <nav className="fixed w-full z-50 bg-background/80 backdrop-blur-md border-b border-primary/10">
      <div className="max-w-6xl mx-auto px-6 h-24 flex items-center justify-between">

        {/* Logo Mock */}
        <Link href="/" className="flex flex-col group items-start relative z-50">
          <div className="flex items-center text-primary font-bold text-3xl tracking-wider">
            <span>SL</span>
            <span className="relative flex items-center justify-center w-8">
              <MapPin className="absolute w-7 h-7 stroke-2" />
            </span>
            <span>W MUNDO</span>
          </div>
          <span className="text-primary text-xs font-medium tracking-widest uppercase mt-0.5 ml-1">
            Voyager autrement
          </span>
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-primary relative z-50"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Ouvrir le menu"
        >
          {isMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-[15px] font-semibold text-text-muted">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className="hover:text-primary transition-colors duration-300"
            >
              {link.name}
            </Link>
          ))}

          <Link
            href="/contact"
            className="bg-black text-white px-6 py-2.5 rounded-lg hover:bg-gray-900 transition-all duration-300 transform hover:scale-105 ml-2 font-bold shadow-md hover:shadow-lg"
          >
            Prendre contact
          </Link>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 w-full bg-white shadow-xl border-b border-gray-100 md:hidden"
          >
            <div className="flex flex-col px-6 py-6 gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-lg font-semibold text-text-main hover:text-primary transition-colors duration-300"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition-all duration-300 font-bold shadow-md text-center mt-2"
              >
                Prendre contact
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
