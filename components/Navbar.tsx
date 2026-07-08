"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from 'lucide-react';
import { navLinks, BRAND } from "@/lib/data";
import { useTranslations } from "next-intl";

export default function Navbar() {
  const t = useTranslations();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("#") && pathname === "/") {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getHref = (href: string) => {
    if (href.startsWith("#")) {
      return pathname === "/" ? href : `/${href}`;
    }
    return href;
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.10)] border-b border-black/5"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 py-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-[#c9a84c] flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-sm font-serif">H</span>
              </div>
              <span
                className={`font-serif font-bold text-lg tracking-tight transition-colors duration-300 ${
                  scrolled ? "text-[#1a3c5e]" : "text-white"
                }`}
              >
                {BRAND.name}
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-0.5">
              {navLinks.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={getHref(link.href)}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`relative px-3 py-2 text-xs font-medium rounded-lg transition-all duration-200 group whitespace-nowrap ${
                      scrolled
                        ? isActive
                          ? "text-[#c9a84c]"
                          : "text-[#1a3c5e] hover:text-[#c9a84c]"
                        : isActive
                        ? "text-[#c9a84c]"
                        : "text-white/90 hover:text-white"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#c9a84c] rounded-full"
                      />
                    )}
                  </Link>
                );
              })}
              <Link
                href="/listings"
                className="ml-2 px-4 py-2 bg-[#c9a84c] text-white text-xs font-semibold rounded-xl shadow-sm hover:bg-[#b8943e] transition-all duration-200 whitespace-nowrap flex-shrink-0"
              >
                {t("nav.viewListings")}
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className={`md:hidden p-2 rounded-lg transition-colors duration-200 ${
                scrolled
                  ? "text-[#1a3c5e] hover:bg-[#1a3c5e]/5"
                  : "text-white hover:bg-white/10"
              }`}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="md:hidden bg-white border-t border-black/5 shadow-lg overflow-hidden"
            >
              <nav className="px-4 py-4 flex flex-col gap-1">
                {navLinks.map((link) => {
                  const isActive =
                    link.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(link.href);
                  return (
                    <Link
                      key={link.href}
                      href={getHref(link.href)}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? "bg-[#1a3c5e]/5 text-[#c9a84c]"
                          : "text-[#1a3c5e] hover:bg-[#1a3c5e]/5 hover:text-[#c9a84c]"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
                <Link
                  href="/listings"
                  className="mt-2 px-4 py-3 bg-[#c9a84c] text-white text-sm font-semibold rounded-xl text-center hover:bg-[#b8943e] transition-all duration-200"
                >
                  {t("nav.viewListings")}
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
