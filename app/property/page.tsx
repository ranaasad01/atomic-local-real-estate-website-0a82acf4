"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Bed, Bath, Square, Car, Calendar, MapPin, Phone, Mail, ChevronRight, Heart, Share2, Check, ArrowLeft, ArrowRight, Star } from 'lucide-react';
import { BRAND, agents } from "@/lib/data";
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  scaleIn,
  slideInLeft,
  slideInRight,
} from "@/lib/motion";
import { useTranslations } from "next-intl";

// ─── Mock Property Data ────────────────────────────────────────────────────────
const mockProperty = {
  id: "prop-001",
  title: "Elegant Craftsman Estate with Harbor Views",
  address: "2847 Ridgecrest Lane",
  city: "Maplewood, CA 94102",
  price: 1_485_000,
  priceType: "sale" as const,
  beds: 4,
  baths: 3,
  sqft: 3_240,
  type: "house" as const,
  yearBuilt: 2008,
  garage: 2,
  lotSize: "0.34 acres",
  agentId: "agent-1",
  description: `Perched above the Maplewood harbor corridor, this stunning Craftsman estate blends timeless architectural character with thoughtfully updated interiors. Soaring ceilings, wide-plank white oak floors, and an abundance of natural light define every room.

The chef's kitchen features Calacatta marble countertops, a 48-inch dual-fuel range, custom cabinetry, and a generous island that opens seamlessly to the great room — perfect for entertaining. The primary suite occupies the entire upper west wing, offering a spa-inspired bath with a soaking tub, walk-in steam shower, and a private balcony with sweeping harbor views.

Three additional bedrooms, a dedicated home office, and a finished lower level with a media room round out this exceptional offering. The landscaped grounds include a bluestone terrace, mature olive trees, and a built-in outdoor kitchen.`,
  features: [
    "Calacatta marble kitchen countertops",
    "48-inch dual-fuel professional range",
    "Wide-plank white oak hardwood floors",
    "Primary suite with private harbor-view balcony",
    "Spa bath with soaking tub and steam shower",
    "Finished lower level with media room",
    "Built-in outdoor kitchen and bluestone terrace",
    "Smart home automation (lighting, climate, security)",
    "Solar panels with battery backup",
    "Two-car garage with EV charging",
    "Mature landscaping with drip irrigation",
    "Walking distance to Harbor Blvd shops and dining",
  ],
  images: [
    "/images/craftsman-estate-exterior-harbor-view.jpg",
    "/images/craftsman-estate-living-room-interior.jpg",
    "/images/craftsman-estate-kitchen-marble.jpg",
    "/images/craftsman-estate-primary-bedroom-suite.jpg",
    "/images/craftsman-estate-backyard-terrace.jpg",
  ],
  mapEmbedSrc:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019!2d-122.4194!3d37.7749!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDQ2JzI5LjYiTiAxMjLCsDI1JzA5LjgiVw!5e0!3m2!1sen!2sus!4v1680000000000!5m2!1sen!2sus",
};

const agent = agents[0];

// ─── Helpers ───────────────────────────────────────────────────────────────────
function formatPrice(price: number) {
  return "$" + (price ?? 0).toLocaleString("en-US");
}

// ─── Gallery Component ─────────────────────────────────────────────────────────
function Gallery({ images }: { images: string[] }) {
  const [active, setActive] = useState(0);

  const prev = () => setActive((i) => (i === 0 ? images.length - 1 : i - 1));
  const next = () => setActive((i) => (i === images.length - 1 ? 0 : i + 1));

  return (
    <div className="space-y-3">
      {/* Main Image */}
      <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-stone-100 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.14)]">
        <motion.img
          key={active}
          src={images[active] ?? "/images/craftsman-estate-exterior-harbor-view.jpg"}
          alt={`Property view ${active + 1}`}
          className="w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        />
        {/* Overlay controls */}
        <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none">
          <button
            onClick={prev}
            className="pointer-events-auto w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md hover:bg-white transition-all duration-200 hover:scale-105"
            aria-label="Previous image"
          >
            <ArrowLeft size={18} className="text-[#1a3c5e]" />
          </button>
          <button
            onClick={next}
            className="pointer-events-auto w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md hover:bg-white transition-all duration-200 hover:scale-105"
            aria-label="Next image"
          >
            <ArrowRight size={18} className="text-[#1a3c5e]" />
          </button>
        </div>
        {/* Counter badge */}
        <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-white text-xs font-medium">
          {active + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnail Strip */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {images.map((src, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`flex-shrink-0 w-20 h-14 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
              i === active
                ? "border-[#c9a84c] shadow-md scale-105"
                : "border-transparent opacity-70 hover:opacity-100"
            }`}
            aria-label={`View image ${i + 1}`}
          >
            <img
              src={src}
              alt={`Thumbnail ${i + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Inquiry Form ──────────────────────────────────────────────────────────────
function InquiryForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "I'm interested in 2847 Ridgecrest Lane and would like to schedule a viewing.",
    tourDate: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        variants={scaleIn}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center justify-center gap-4 py-12 text-center"
      >
        <div className="w-14 h-14 rounded-full bg-[#c9a84c]/10 flex items-center justify-center">
          <Check size={28} className="text-[#c9a84c]" />
        </div>
        <h3 className="font-serif font-semibold text-[#1a3c5e] text-lg">
          Request Received
        </h3>
        <p className="text-stone-500 text-sm leading-relaxed max-w-xs">
          Thank you! An agent will reach out within one business day to confirm your tour.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="text-[#c9a84c] text-sm font-medium hover:underline"
        >
          Submit another inquiry
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-xs font-semibold text-[#1a3c5e] mb-1.5 uppercase tracking-wide">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Jane Smith"
            className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#c9a84c]/40 focus:border-[#c9a84c] transition-all duration-200"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#1a3c5e] mb-1.5 uppercase tracking-wide">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="jane@example.com"
            className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#c9a84c]/40 focus:border-[#c9a84c] transition-all duration-200"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#1a3c5e] mb-1.5 uppercase tracking-wide">
            Phone (optional)
          </label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="(555) 000-0000"
            className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#c9a84c]/40 focus:border-[#c9a84c] transition-all duration-200"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#1a3c5e] mb-1.5 uppercase tracking-wide">
            Preferred Tour Date
          </label>
          <input
            type="date"
            name="tourDate"
            value={form.tourDate}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#c9a84c]/40 focus:border-[#c9a84c] transition-all duration-200"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#1a3c5e] mb-1.5 uppercase tracking-wide">
            Message
          </label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#c9a84c]/40 focus:border-[#c9a84c] transition-all duration-200 resize-none"
          />
        </div>
      </div>
      <motion.button
        type="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-3 bg-[#c9a84c] text-white font-semibold rounded-xl shadow-sm hover:bg-[#b8943e] transition-all duration-200 text-sm"
      >
        Request a Tour
      </motion.button>
      <p className="text-center text-xs text-stone-400">
        No spam. Your information is never shared.
      </p>
    </form>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function PropertyDetailPage() {
  const t = useTranslations();
  const [saved, setSaved] = useState(false);

  const p = mockProperty;

  return (
    <main className="min-h-screen bg-stone-50 pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Breadcrumb ── */}
        <motion.nav
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="flex items-center gap-1.5 text-sm text-stone-500 mb-6"
          aria-label="Breadcrumb"
        >
          <Link href="/" className="hover:text-[#c9a84c] transition-colors duration-200">
            Home
          </Link>
          <ChevronRight size={14} className="text-stone-300" />
          <Link href="/listings" className="hover:text-[#c9a84c] transition-colors duration-200">
            Listings
          </Link>
          <ChevronRight size={14} className="text-stone-300" />
          <span className="text-[#1a3c5e] font-medium truncate max-w-[200px]">
            {p.address}
          </span>
        </motion.nav>

        {/* ── Title Row ── */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8"
        >
          <div>
            <h1 className="font-serif font-bold text-3xl md:text-4xl text-[#1a3c5e] tracking-tight text-balance leading-tight mb-2">
              {p.title}
            </h1>
            <div className="flex items-center gap-1.5 text-stone-500 text-sm">
              <MapPin size={14} className="text-[#c9a84c] flex-shrink-0" />
              <span>{p.address}, {p.city}</span>
            </div>
          </div>
          <div className="flex flex-col items-start sm:items-end gap-2 flex-shrink-0">
            <p className="font-serif font-bold text-3xl text-[#c9a84c]">
              {formatPrice(p.price)}
            </p>
            <span className="text-xs font-semibold uppercase tracking-widest text-stone-400">
              For Sale
            </span>
            <div className="flex items-center gap-2 mt-1">
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
                onClick={() => setSaved((s) => !s)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all duration-200 ${
                  saved
                    ? "bg-rose-50 border-rose-200 text-rose-500"
                    : "bg-white border-stone-200 text-stone-500 hover:border-rose-200 hover:text-rose-400"
                }`}
                aria-label="Save property"
              >
                <Heart size={13} fill={saved ? "currentColor" : "none"} />
                {saved ? "Saved" : "Save"}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-200 bg-white text-stone-500 text-xs font-medium hover:border-[#c9a84c] hover:text-[#c9a84c] transition-all duration-200"
                aria-label="Share property"
              >
                <Share2 size={13} />
                Share
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* ── Gallery ── */}
        <motion.div
          variants={scaleIn}
          initial="hidden"
          animate="visible"
          className="mb-10"
        >
          <Gallery images={p.images} />
        </motion.div>

        {/* ── Key Stats Bar ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10"
        >
          {[
            { icon: Bed, label: "Bedrooms", value: `${p.beds} Beds` },
            { icon: Bath, label: "Bathrooms", value: `${p.baths} Baths` },
            { icon: Square, label: "Living Area", value: `${(p.sqft ?? 0).toLocaleString("en-US")} sqft` },
            { icon: Car, label: "Garage", value: `${p.garage}-Car Garage` },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeInUp}
              className="flex items-center gap-3 bg-white rounded-2xl px-4 py-4 border border-black/5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_12px_-4px_rgba(0,0,0,0.08)]"
            >
              <div className="w-9 h-9 rounded-xl bg-[#c9a84c]/10 flex items-center justify-center flex-shrink-0">
                <stat.icon size={18} className="text-[#c9a84c]" />
              </div>
              <div>
                <p className="text-xs text-stone-400 font-medium">{stat.label}</p>
                <p className="text-sm font-semibold text-[#1a3c5e]">{stat.value}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Two-Column Layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          {/* ── LEFT: Description + Features + Map ── */}
          <div className="lg:col-span-2 space-y-8">

            {/* Description */}
            <motion.section
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="bg-white rounded-2xl p-6 md:p-8 border border-black/5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.10)]"
            >
              <h2 className="font-serif font-bold text-xl text-[#1a3c5e] mb-4">
                About This Property
              </h2>
              <div className="space-y-4">
                {p.description.split("\n\n").map((para, i) => (
                  <p key={i} className="text-stone-600 text-sm leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>
            </motion.section>

            {/* Property Details Grid */}
            <motion.section
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="bg-white rounded-2xl p-6 md:p-8 border border-black/5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.10)]"
            >
              <h2 className="font-serif font-bold text-xl text-[#1a3c5e] mb-5">
                Property Details
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-5 gap-x-4">
                {[
                  { label: "Property Type", value: "Single Family Home" },
                  { label: "Year Built", value: String(p.yearBuilt) },
                  { label: "Lot Size", value: p.lotSize },
                  { label: "Bedrooms", value: String(p.beds) },
                  { label: "Bathrooms", value: String(p.baths) },
                  { label: "Living Area", value: `${(p.sqft ?? 0).toLocaleString("en-US")} sqft` },
                  { label: "Garage", value: `${p.garage} Cars` },
                  { label: "Status", value: "Active" },
                  { label: "MLS #", value: "HVR-2024-0847" },
                ].map((detail) => (
                  <div key={detail.label} className="border-b border-stone-100 pb-3">
                    <p className="text-xs text-stone-400 font-medium mb-0.5">{detail.label}</p>
                    <p className="text-sm font-semibold text-[#1a3c5e]">{detail.value}</p>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Features & Amenities */}
            <motion.section
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="bg-white rounded-2xl p-6 md:p-8 border border-black/5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.10)]"
            >
              <h2 className="font-serif font-bold text-xl text-[#1a3c5e] mb-5">
                Features &amp; Amenities
              </h2>
              <motion.ul
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-3"
              >
                {p.features.map((feature) => (
                  <motion.li
                    key={feature}
                    variants={fadeInUp}
                    className="flex items-start gap-2.5 text-sm text-stone-600"
                  >
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-[#c9a84c]/10 flex items-center justify-center flex-shrink-0">
                      <Check size={11} className="text-[#c9a84c]" />
                    </span>
                    {feature}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.section>

            {/* Map */}
            <motion.section
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="bg-white rounded-2xl overflow-hidden border border-black/5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.10)]"
            >
              <div className="px-6 md:px-8 pt-6 pb-4">
                <h2 className="font-serif font-bold text-xl text-[#1a3c5e] mb-1">
                  Location
                </h2>
                <div className="flex items-center gap-1.5 text-stone-500 text-sm">
                  <MapPin size={13} className="text-[#c9a84c]" />
                  <span>{p.address}, {p.city}</span>
                </div>
              </div>
              <div className="w-full h-72 bg-stone-100">
                <iframe
                  title="Property Location Map"
                  src={p.mapEmbedSrc}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>
              <div className="px-6 md:px-8 py-4 bg-stone-50 border-t border-stone-100">
                <div className="flex flex-wrap gap-4 text-xs text-stone-500">
                  <span className="flex items-center gap-1"><Calendar size={12} className="text-[#c9a84c]" /> Walk Score: 88 — Very Walkable</span>
                  <span className="flex items-center gap-1"><Star size={12} className="text-[#c9a84c]" /> School Rating: 9/10</span>
                  <span className="flex items-center gap-1"><MapPin size={12} className="text-[#c9a84c]" /> 0.4 mi to Harbor Blvd</span>
                </div>
              </div>
            </motion.section>
          </div>

          {/* ── RIGHT: Sticky Sidebar ── */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-28 space-y-5">

              {/* Inquiry Form Card */}
              <motion.div
                variants={slideInRight}
                initial="hidden"
                animate="visible"
                className="bg-white rounded-2xl p-6 border border-black/5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.12)]"
              >
                <div className="mb-5">
                  <h2 className="font-serif font-bold text-lg text-[#1a3c5e]">
                    Schedule a Tour
                  </h2>
                  <p className="text-stone-500 text-xs mt-1">
                    Typically responds within a few hours.
                  </p>
                </div>
                <InquiryForm />
              </motion.div>

              {/* Agent Card */}
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                className="bg-white rounded-2xl p-6 border border-black/5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.12)]"
              >
                <h3 className="font-serif font-semibold text-base text-[#1a3c5e] mb-4">
                  Listed By
                </h3>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#c9a84c]/30 flex-shrink-0">
                    <img
                      src={agent?.image ?? "/images/real-estate-agent-woman-professional.jpg"}
                      alt={agent?.name ?? "Agent"}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-[#1a3c5e] text-sm">{agent?.name ?? "Sarah Whitmore"}</p>
                    <p className="text-stone-400 text-xs">{agent?.title ?? "Senior Listing Agent"}</p>
                    <div className="flex items-center gap-0.5 mt-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} size={10} fill="#c9a84c" className="text-[#c9a84c]" />
                      ))}
                      <span className="text-xs text-stone-400 ml-1">{agent?.sold ?? 312} sold</span>
                    </div>
                  </div>
                </div>
                <p className="text-stone-500 text-xs leading-relaxed mb-5">
                  {agent?.bio ?? "With over 14 years in the Maplewood market, Sarah specializes in luxury residential sales."}
                </p>
                <div className="space-y-2">
                  <a
                    href={`tel:${agent?.phone ?? BRAND.phone}`}
                    className="flex items-center gap-2.5 w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm text-[#1a3c5e] font-medium hover:border-[#c9a84c] hover:text-[#c9a84c] transition-all duration-200 group"
                  >
                    <Phone size={14} className="text-[#c9a84c]" />
                    {agent?.phone ?? BRAND.phone}
                  </a>
                  <a
                    href={`mailto:${agent?.email ?? BRAND.email}`}
                    className="flex items-center gap-2.5 w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm text-[#1a3c5e] font-medium hover:border-[#c9a84c] hover:text-[#c9a84c] transition-all duration-200 group"
                  >
                    <Mail size={14} className="text-[#c9a84c]" />
                    <span className="truncate">{agent?.email ?? BRAND.email}</span>
                  </a>
                </div>
              </motion.div>

              {/* Mortgage Estimator */}
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                className="bg-[#1a3c5e] rounded-2xl p-6 text-white"
              >
                <h3 className="font-serif font-semibold text-base mb-1">
                  Mortgage Estimate
                </h3>
                <p className="text-white/60 text-xs mb-4">
                  Based on 20% down, 30-year fixed at 6.8% APR
                </p>
                <div className="flex items-end gap-1 mb-4">
                  <span className="font-serif font-bold text-3xl text-[#c9a84c]">$7,720</span>
                  <span className="text-white/60 text-sm mb-1">/mo</span>
                </div>
                <div className="space-y-2 text-xs text-white/70">
                  <div className="flex justify-between">
                    <span>Principal &amp; Interest</span>
                    <span className="text-white font-medium">$7,720</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Property Tax (est.)</span>
                    <span className="text-white font-medium">$1,547</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Home Insurance (est.)</span>
                    <span className="text-white font-medium">$185</span>
                  </div>
                  <div className="border-t border-white/10 pt-2 flex justify-between font-semibold text-white">
                    <span>Total Monthly</span>
                    <span className="text-[#c9a84c]">$9,452</span>
                  </div>
                </div>
                <p className="text-white/40 text-xs mt-4">
                  Estimates only. Contact a lender for pre-approval.
                </p>
              </motion.div>

            </div>
          </div>
        </div>

        {/* ── Similar Listings CTA ── */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-16 text-center"
        >
          <p className="text-stone-500 text-sm mb-3">Looking for more options?</p>
          <Link
            href="/listings"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#1a3c5e] text-white font-semibold rounded-xl hover:bg-[#15304d] transition-all duration-200 text-sm shadow-sm"
          >
            Browse All Listings
            <ChevronRight size={16} />
          </Link>
        </motion.div>

      </div>
    </main>
  );
}