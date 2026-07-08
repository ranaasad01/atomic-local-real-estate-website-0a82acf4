"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Bed, Bath, Square, Car, Calendar, MapPin, Heart, Share2, Phone, Mail, ChevronRight, Star, Check, ArrowLeft, ArrowRight, Home, Eye } from 'lucide-react';
import { fadeInUp, fadeIn, staggerContainer, scaleIn, slideInLeft, slideInRight } from "@/lib/motion";
import { useTranslations } from "next-intl";

// ─── Inline Mock Data ──────────────────────────────────────────────────────────

const property = {
  id: "prop-001",
  title: "Sunlit Colonial on Maple Ridge",
  address: "48 Maple Ridge Drive",
  city: "Maplewood, CA 94102",
  price: 1_295_000,
  priceType: "sale" as const,
  beds: 4,
  baths: 3,
  sqft: 2_840,
  type: "house" as const,
  yearBuilt: 2008,
  garage: 2,
  lotSize: "0.34 acres",
  description:
    "Nestled on a quiet tree-lined street in the heart of Maplewood Heights, this beautifully maintained colonial offers the perfect blend of classic architecture and modern living. Soaring ceilings, wide-plank hardwood floors, and an open-concept kitchen with quartz countertops set the tone throughout. The primary suite features a spa-inspired bath and a walk-in closet with custom built-ins. Step outside to a professionally landscaped backyard with a bluestone patio — ideal for entertaining or simply unwinding after a long day. Walking distance to top-rated schools, Harborside Park, and the weekend farmers market.",
  features: [
    "Open-concept kitchen with quartz countertops",
    "Wide-plank hardwood floors throughout",
    "Primary suite with spa bath and walk-in closet",
    "Bluestone patio and landscaped backyard",
    "Two-car attached garage with EV charger",
    "New roof (2022) and updated HVAC",
    "Smart home system with Nest thermostat",
    "Walking distance to top-rated schools",
  ],
  images: [
    "/images/colonial-house-exterior-front.jpg",
    "/images/modern-kitchen-quartz-countertops.jpg",
    "/images/bright-living-room-hardwood-floors.jpg",
    "/images/primary-bedroom-suite-luxury.jpg",
    "/images/backyard-patio-landscaped.jpg",
  ],
  agent: {
    name: "Sarah Whitmore",
    title: "Senior Listing Agent",
    phone: "(555) 842-9101",
    email: "sarah@harborviewrealty.com",
    image: "/images/real-estate-agent-woman-professional.jpg",
    listings: 24,
    sold: 312,
  },
  openHouses: [
    { day: "Saturday, July 12", time: "1:00 PM – 4:00 PM" },
    { day: "Sunday, July 13", time: "11:00 AM – 2:00 PM" },
  ],
  similarProperties: [
    {
      id: "sp-1",
      title: "Craftsman Bungalow on Elm Court",
      address: "22 Elm Court, Maplewood",
      price: 1_085_000,
      beds: 3,
      baths: 2,
      sqft: 2_100,
      image: "/images/craftsman-bungalow-exterior.jpg",
    },
    {
      id: "sp-2",
      title: "Modern Townhouse at Harbor Walk",
      address: "7 Harbor Walk, Harborside",
      price: 1_175_000,
      beds: 3,
      baths: 2.5,
      sqft: 2_350,
      image: "/images/modern-townhouse-exterior.jpg",
    },
    {
      id: "sp-3",
      title: "Riverside Contemporary Estate",
      address: "91 Riverside Lane, Maplewood",
      price: 1_450_000,
      beds: 5,
      baths: 4,
      sqft: 3_400,
      image: "/images/contemporary-estate-exterior.jpg",
    },
  ],
};

// ─── Stat Badge ────────────────────────────────────────────────────────────────
function StatBadge({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5 px-5 py-4 bg-white rounded-2xl shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.10)] border border-black/5 min-w-[100px]">
      <div className="text-[#c9a84c]">{icon}</div>
      <span className="text-[#1a3c5e] font-bold text-lg leading-none">{value}</span>
      <span className="text-gray-400 text-xs font-medium uppercase tracking-wide">{label}</span>
    </div>
  );
}

// ─── Image Gallery ─────────────────────────────────────────────────────────────
function ImageGallery({ images }: { images: string[] }) {
  const [active, setActive] = useState(0);

  const prev = () => setActive((i) => (i === 0 ? images.length - 1 : i - 1));
  const next = () => setActive((i) => (i === images.length - 1 ? 0 : i + 1));

  return (
    <div className="space-y-3">
      {/* Main image */}
      <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-gray-100 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_16px_48px_-12px_rgba(0,0,0,0.18)]">
        <motion.img
          key={active}
          src={images[active] ?? "/images/colonial-house-exterior-front.jpg"}
          alt={`Property view ${active + 1}`}
          className="w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        />
        {/* Overlay controls */}
        <button
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-md hover:bg-white transition-all duration-200"
          aria-label="Previous image"
        >
          <ArrowLeft size={18} className="text-[#1a3c5e]" />
        </button>
        <button
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-md hover:bg-white transition-all duration-200"
          aria-label="Next image"
        >
          <ArrowRight size={18} className="text-[#1a3c5e]" />
        </button>
        {/* Counter */}
        <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-black/50 backdrop-blur-sm rounded-full text-white text-xs font-medium">
          {active + 1} / {images.length}
        </div>
      </div>
      {/* Thumbnails */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`flex-shrink-0 w-20 h-14 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
              i === active ? "border-[#c9a84c] shadow-md" : "border-transparent opacity-60 hover:opacity-90"
            }`}
          >
            <img src={img} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Contact Form ──────────────────────────────────────────────────────────────
function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "I'm interested in 48 Maple Ridge Drive and would like to schedule a viewing." });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
        className="flex flex-col items-center justify-center gap-4 py-10 text-center"
      >
        <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center">
          <Check size={28} className="text-green-500" />
        </div>
        <p className="font-serif font-semibold text-[#1a3c5e] text-lg">Message Sent!</p>
        <p className="text-gray-500 text-sm leading-relaxed">Sarah will be in touch within one business day.</p>
        <button
          onClick={() => setSubmitted(false)}
          className="text-[#c9a84c] text-sm font-medium hover:underline"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Your full name"
            className="w-full px-4 py-3 rounded-xl border border-black/10 text-sm text-[#1a3c5e] placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#c9a84c]/40 focus:border-[#c9a84c] transition-all duration-200"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Phone</label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="(555) 000-0000"
            className="w-full px-4 py-3 rounded-xl border border-black/10 text-sm text-[#1a3c5e] placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#c9a84c]/40 focus:border-[#c9a84c] transition-all duration-200"
          />
        </div>
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          placeholder="you@email.com"
          className="w-full px-4 py-3 rounded-xl border border-black/10 text-sm text-[#1a3c5e] placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#c9a84c]/40 focus:border-[#c9a84c] transition-all duration-200"
        />
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Message</label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-3 rounded-xl border border-black/10 text-sm text-[#1a3c5e] placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#c9a84c]/40 focus:border-[#c9a84c] transition-all duration-200 resize-none"
        />
      </div>
      <motion.button
        type="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-3.5 bg-[#c9a84c] text-white font-semibold rounded-xl shadow-sm hover:bg-[#b8943e] transition-all duration-200 text-sm"
      >
        Request a Showing
      </motion.button>
    </form>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function PropertyDetailPage() {
  const [saved, setSaved] = useState(false);
  const t = useTranslations();

  const formatPrice = (n: number) =>
    "$" + (n ?? 0).toLocaleString("en-US");

  return (
    <main className="bg-[#f8f6f1] min-h-screen pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Breadcrumb ── */}
        <motion.nav
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="flex items-center gap-2 text-sm text-gray-400 mb-6"
          aria-label="Breadcrumb"
        >
          <Link href="/" className="hover:text-[#c9a84c] transition-colors duration-200 flex items-center gap-1">
            <Home size={14} />
            <span>Home</span>
          </Link>
          <ChevronRight size={14} />
          <Link href="/listings" className="hover:text-[#c9a84c] transition-colors duration-200">Listings</Link>
          <ChevronRight size={14} />
          <span className="text-[#1a3c5e] font-medium truncate max-w-[200px]">{property.title}</span>
        </motion.nav>

        {/* ── Title Row ── */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8"
        >
          <div>
            <h1 className="font-serif font-bold text-3xl md:text-4xl text-[#1a3c5e] tracking-tight text-balance mb-2">
              {property.title}
            </h1>
            <div className="flex items-center gap-1.5 text-gray-500 text-sm">
              <MapPin size={15} className="text-[#c9a84c]" />
              <span>{property.address}, {property.city}</span>
            </div>
          </div>
          <div className="flex flex-col items-start md:items-end gap-3">
            <p className="font-serif font-bold text-3xl text-[#c9a84c]">{formatPrice(property.price)}</p>
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSaved((s) => !s)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl border text-sm font-medium transition-all duration-200 ${
                  saved
                    ? "bg-red-50 border-red-200 text-red-500"
                    : "bg-white border-black/10 text-gray-500 hover:border-[#c9a84c] hover:text-[#c9a84c]"
                }`}
              >
                <Heart size={15} fill={saved ? "currentColor" : "none"} />
                {saved ? "Saved" : "Save"}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-black/10 bg-white text-gray-500 text-sm font-medium hover:border-[#c9a84c] hover:text-[#c9a84c] transition-all duration-200"
              >
                <Share2 size={15} />
                Share
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* ── Main Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Column (2/3) */}
          <div className="lg:col-span-2 space-y-8">

            {/* Gallery */}
            <motion.div variants={scaleIn} initial="hidden" animate="visible">
              <ImageGallery images={property.images} />
            </motion.div>

            {/* Stats Row */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap gap-3"
            >
              {[
                { icon: <Bed size={20} />, label: "Beds", value: String(property.beds) },
                { icon: <Bath size={20} />, label: "Baths", value: String(property.baths) },
                { icon: <Square size={20} />, label: "Sq Ft", value: (property.sqft ?? 0).toLocaleString("en-US") },
                { icon: <Car size={20} />, label: "Garage", value: `${property.garage} Car` },
                { icon: <Calendar size={20} />, label: "Built", value: String(property.yearBuilt) },
                { icon: <Home size={20} />, label: "Lot", value: property.lotSize },
              ].map((s) => (
                <motion.div key={s.label} variants={fadeInUp}>
                  <StatBadge icon={s.icon} label={s.label} value={s.value} />
                </motion.div>
              ))}
            </motion.div>

            {/* Description */}
            <motion.section
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="bg-white rounded-2xl p-8 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.10)] border border-black/5"
            >
              <h2 className="font-serif font-bold text-xl text-[#1a3c5e] mb-4">About This Property</h2>
              <p className="text-gray-600 leading-relaxed text-[15px]">{property.description}</p>
            </motion.section>

            {/* Features */}
            <motion.section
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="bg-white rounded-2xl p-8 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.10)] border border-black/5"
            >
              <h2 className="font-serif font-bold text-xl text-[#1a3c5e] mb-6">Property Features</h2>
              <motion.ul
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-3"
              >
                {property.features.map((feat) => (
                  <motion.li
                    key={feat}
                    variants={fadeInUp}
                    className="flex items-start gap-3 text-sm text-gray-600"
                  >
                    <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-[#c9a84c]/15 flex items-center justify-center">
                      <Check size={12} className="text-[#c9a84c]" />
                    </span>
                    {feat}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.section>

            {/* Open Houses */}
            <motion.section
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="bg-[#1a3c5e] rounded-2xl p-8 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.18)]"
            >
              <h2 className="font-serif font-bold text-xl text-white mb-6">Open Houses</h2>
              <div className="space-y-3">
                {property.openHouses.map((oh) => (
                  <div
                    key={oh.day}
                    className="flex items-center justify-between bg-white/10 rounded-xl px-5 py-4 border border-white/10"
                  >
                    <div className="flex items-center gap-3">
                      <Calendar size={18} className="text-[#c9a84c]" />
                      <span className="text-white font-medium text-sm">{oh.day}</span>
                    </div>
                    <span className="text-white/70 text-sm">{oh.time}</span>
                  </div>
                ))}
              </div>
              <p className="text-white/50 text-xs mt-4">No appointment needed. Walk-ins welcome.</p>
            </motion.section>

            {/* Map Placeholder */}
            <motion.section
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="bg-white rounded-2xl overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.10)] border border-black/5"
            >
              <div className="p-6 border-b border-black/5">
                <h2 className="font-serif font-bold text-xl text-[#1a3c5e]">Location</h2>
                <div className="flex items-center gap-1.5 text-gray-400 text-sm mt-1">
                  <MapPin size={14} className="text-[#c9a84c]" />
                  <span>{property.address}, {property.city}</span>
                </div>
              </div>
              <div className="relative w-full h-64 bg-gradient-to-br from-[#e8f0e8] to-[#d4e4d4] flex items-center justify-center">
                <img
                  src="/images/maplewood-neighborhood-aerial-map.jpg"
                  alt="Neighborhood map"
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white rounded-2xl px-5 py-3 shadow-lg flex items-center gap-2 border border-black/5">
                    <MapPin size={18} className="text-[#c9a84c]" />
                    <span className="text-[#1a3c5e] font-semibold text-sm">48 Maple Ridge Drive</span>
                  </div>
                </div>
              </div>
              <div className="p-6 grid grid-cols-3 gap-4 text-center">
                {[
                  { label: "Schools", value: "Top 10%" },
                  { label: "Walk Score", value: "82" },
                  { label: "Transit", value: "Excellent" },
                ].map((item) => (
                  <div key={item.label}>
                    <p className="font-bold text-[#1a3c5e] text-lg">{item.value}</p>
                    <p className="text-gray-400 text-xs uppercase tracking-wide font-medium">{item.label}</p>
                  </div>
                ))}
              </div>
            </motion.section>
          </div>

          {/* Right Column (1/3) — Sticky Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-6">

              {/* Agent Card */}
              <motion.div
                variants={slideInRight}
                initial="hidden"
                animate="visible"
                className="bg-white rounded-2xl p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.10)] border border-black/5"
              >
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-4">Listed by</p>
                <div className="flex items-center gap-4 mb-5">
                  <img
                    src={property.agent.image}
                    alt={property.agent.name}
                    className="w-14 h-14 rounded-full object-cover ring-2 ring-[#c9a84c]/30"
                  />
                  <div>
                    <p className="font-serif font-bold text-[#1a3c5e] text-base">{property.agent.name}</p>
                    <p className="text-gray-400 text-xs">{property.agent.title}</p>
                    <div className="flex items-center gap-1 mt-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} size={11} fill="#c9a84c" className="text-[#c9a84c]" />
                      ))}
                      <span className="text-gray-400 text-xs ml-1">{property.agent.sold} sold</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2 mb-5">
                  <a
                    href={`tel:${property.agent.phone}`}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#f8f6f1] hover:bg-[#c9a84c]/10 transition-colors duration-200 group"
                  >
                    <Phone size={16} className="text-[#c9a84c]" />
                    <span className="text-[#1a3c5e] text-sm font-medium group-hover:text-[#c9a84c] transition-colors duration-200">
                      {property.agent.phone}
                    </span>
                  </a>
                  <a
                    href={`mailto:${property.agent.email}`}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#f8f6f1] hover:bg-[#c9a84c]/10 transition-colors duration-200 group"
                  >
                    <Mail size={16} className="text-[#c9a84c]" />
                    <span className="text-[#1a3c5e] text-sm font-medium group-hover:text-[#c9a84c] transition-colors duration-200 truncate">
                      {property.agent.email}
                    </span>
                  </a>
                </div>
                <div className="border-t border-black/5 pt-5">
                  <p className="font-serif font-semibold text-[#1a3c5e] text-base mb-4">Send a Message</p>
                  <ContactForm />
                </div>
              </motion.div>

              {/* Quick Stats */}
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                className="bg-white rounded-2xl p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.10)] border border-black/5"
              >
                <h3 className="font-serif font-bold text-[#1a3c5e] text-base mb-4">Property Details</h3>
                <dl className="space-y-3">
                  {[
                    { label: "Property Type", value: "Single Family Home" },
                    { label: "Status", value: "For Sale" },
                    { label: "Year Built", value: String(property.yearBuilt) },
                    { label: "Lot Size", value: property.lotSize },
                    { label: "Garage", value: `${property.garage}-Car Attached` },
                    { label: "Price per Sq Ft", value: "$" + Math.round((property.price ?? 0) / (property.sqft || 1)).toLocaleString("en-US") },
                  ].map((row) => (
                    <div key={row.label} className="flex items-center justify-between text-sm">
                      <dt className="text-gray-400">{row.label}</dt>
                      <dd className="font-medium text-[#1a3c5e]">{row.value}</dd>
                    </div>
                  ))}
                </dl>
              </motion.div>

              {/* Views badge */}
              <motion.div
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex items-center gap-2 px-4 py-3 bg-[#c9a84c]/10 rounded-xl border border-[#c9a84c]/20"
              >
                <Eye size={16} className="text-[#c9a84c]" />
                <span className="text-[#1a3c5e] text-sm font-medium">
                  <strong>142 people</strong> viewed this listing this week
                </span>
              </motion.div>
            </div>
          </div>
        </div>

        {/* ── Similar Properties ── */}
        <motion.section
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-20"
        >
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-[#c9a84c] text-sm font-semibold uppercase tracking-widest mb-1">You May Also Like</p>
              <h2 className="font-serif font-bold text-2xl md:text-3xl text-[#1a3c5e] tracking-tight">Similar Properties</h2>
            </div>
            <Link
              href="/listings"
              className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-[#c9a84c] hover:text-[#b8943e] transition-colors duration-200"
            >
              View all listings <ChevronRight size={16} />
            </Link>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {property.similarProperties.map((sp) => (
              <motion.div
                key={sp.id}
                variants={scaleIn}
                whileHover={{ y: -4, transition: { duration: 0.25 } }}
                className="bg-white rounded-2xl overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.10)] border border-black/5 group cursor-pointer"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={sp.image}
                    alt={sp.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 bg-[#c9a84c] text-white text-xs font-semibold rounded-full">For Sale</span>
                  </div>
                </div>
                <div className="p-5">
                  <p className="font-serif font-bold text-[#1a3c5e] text-base mb-1 leading-snug">{sp.title}</p>
                  <div className="flex items-center gap-1 text-gray-400 text-xs mb-3">
                    <MapPin size={12} className="text-[#c9a84c]" />
                    <span>{sp.address}</span>
                  </div>
                  <p className="font-bold text-[#c9a84c] text-lg mb-3">${(sp.price ?? 0).toLocaleString("en-US")}</p>
                  <div className="flex items-center gap-4 text-gray-400 text-xs border-t border-black/5 pt-3">
                    <span className="flex items-center gap-1"><Bed size={13} /> {sp.beds} bd</span>
                    <span className="flex items-center gap-1"><Bath size={13} /> {sp.baths} ba</span>
                    <span className="flex items-center gap-1"><Square size={13} /> {(sp.sqft ?? 0).toLocaleString("en-US")} sqft</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* ── Bottom CTA ── */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-16 bg-[#1a3c5e] rounded-3xl p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_16px_48px_-12px_rgba(0,0,0,0.22)]"
        >
          <div>
            <p className="text-[#c9a84c] text-sm font-semibold uppercase tracking-widest mb-2">Ready to Move Forward?</p>
            <h2 className="font-serif font-bold text-2xl md:text-3xl text-white tracking-tight text-balance">
              Schedule a private tour today.
            </h2>
            <p className="text-white/60 text-sm mt-2 leading-relaxed max-w-md">
              Our agents are available seven days a week. Tours typically last 30 to 45 minutes and can be arranged on short notice.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <motion.a
              href={`tel:${property.agent.phone}`}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-6 py-3.5 bg-[#c9a84c] text-white font-semibold rounded-xl shadow-sm hover:bg-[#b8943e] transition-all duration-200 text-sm"
            >
              <Phone size={16} />
              Call {property.agent.phone}
            </motion.a>
            <Link
              href="/contact"
              className="flex items-center gap-2 px-6 py-3.5 bg-white/10 text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-200 text-sm"
            >
              <Mail size={16} />
              Email Us
            </Link>
          </div>
        </motion.div>

      </div>
    </main>
  );
}