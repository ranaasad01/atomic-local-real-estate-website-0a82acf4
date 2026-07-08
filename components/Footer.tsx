"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Camera as Instagram, Globe as Facebook, Briefcase as Linkedin } from 'lucide-react';
import { navLinks, BRAND } from "@/lib/data";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations();
  const pathname = usePathname();

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
    <footer className="bg-[#1a3c5e] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 py-16"
        >
          {/* Brand Column */}
          <motion.div variants={fadeInUp} className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-[#c9a84c] flex items-center justify-center">
                <span className="text-white font-bold text-sm font-serif">H</span>
              </div>
              <span className="font-serif font-bold text-lg tracking-tight">
                {BRAND.name}
              </span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              {BRAND.tagline}. Serving Maplewood and surrounding communities with integrity, expertise, and care.
            </p>
            <div className="flex items-center gap-3">
              <a
                href={BRAND.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#c9a84c] transition-colors duration-200"
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </a>
              <a
                href={BRAND.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#c9a84c] transition-colors duration-200"
                aria-label="Facebook"
              >
                <Facebook size={16} />
              </a>
              <a
                href={BRAND.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#c9a84c] transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin size={16} />
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={fadeInUp}>
            <h3 className="font-serif font-semibold text-base mb-5 text-white">
              {t("footer.quickLinks")}
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={getHref(link.href)}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-white/60 text-sm hover:text-[#c9a84c] transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Property Types */}
          <motion.div variants={fadeInUp}>
            <h3 className="font-serif font-semibold text-base mb-5 text-white">
              {t("footer.propertyTypes")}
            </h3>
            <ul className="space-y-3">
              {[
                { label: t("footer.homesForSale"), href: "/listings?type=sale" },
                { label: t("footer.homesForRent"), href: "/listings?type=rent" },
                { label: t("footer.condos"), href: "/listings?category=condo" },
                { label: t("footer.townhouses"), href: "/listings?category=townhouse" },
                { label: t("footer.luxuryEstates"), href: "/listings?category=luxury" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-white/60 text-sm hover:text-[#c9a84c] transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={fadeInUp}>
            <h3 className="font-serif font-semibold text-base mb-5 text-white">
              {t("footer.contactUs")}
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-[#c9a84c] mt-0.5 shrink-0" />
                <span className="text-white/60 text-sm leading-relaxed">
                  {BRAND.address}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-[#c9a84c] shrink-0" />
                <a
                  href={`tel:${BRAND.phone}`}
                  className="text-white/60 text-sm hover:text-[#c9a84c] transition-colors duration-200"
                >
                  {BRAND.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-[#c9a84c] shrink-0" />
                <a
                  href={`mailto:${BRAND.email}`}
                  className="text-white/60 text-sm hover:text-[#c9a84c] transition-colors duration-200"
                >
                  {BRAND.email}
                </a>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-xs">
            {t("footer.copyright", { year: "2024", brand: BRAND.name })}
          </p>
          <div className="flex items-center gap-5">
            <Link
              href="/privacy"
              className="text-white/40 text-xs hover:text-white/70 transition-colors duration-200"
            >
              {t("footer.privacy")}
            </Link>
            <Link
              href="/terms"
              className="text-white/40 text-xs hover:text-white/70 transition-colors duration-200"
            >
              {t("footer.terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}