"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { Search, Home, Star, ArrowRight, Phone, Mail, MapPin, CheckCircle, TrendingUp, Users, Award, ChevronRight, Bed, Bath, Square } from 'lucide-react';
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  scaleIn,
  slideInLeft,
  slideInRight,
} from "@/lib/motion";
import { BRAND, agents, testimonials } from "@/lib/data";
import { useTranslations } from "next-intl";

// ─── Inline Data ──────────────────────────────────────────────────────────────

const featuredProperties = [
  {
    id: "p1",
    title: "Coastal Craftsman Estate",
    address: "28 Seabreeze Lane",
    city: "Maplewood Heights",
    price: 1_295_000,
    priceType: "sale",
    beds: 4,
    baths: 3,
    sqft: 2_840,
    type: "house",
    image: "https://onekindesign.com/wp-content/uploads/2023/05/Coastal-Craftsman-Style-Home-Clark-Co-Home-01-1-Kindesign.jpg",
    badge: "Featured",
  },
  {
    id: "p2",
    title: "Harborside Modern Condo",
    address: "501 Marina View Dr, Unit 12A",
    city: "Harborside District",
    price: 689_000,
    priceType: "sale",
    beds: 2,
    baths: 2,
    sqft: 1_180,
    type: "condo",
    image: "https://landcast-nwmls-listing-images.s3.us-west-2.amazonaws.com/2518966/2518966_02.webp",
    badge: "New",
  },
  {
    id: "p3",
    title: "Riverside Townhouse",
    address: "77 Willowbrook Terrace",
    city: "Riverside Commons",
    price: 4_800,
    priceType: "rent",
    beds: 3,
    baths: 2,
    sqft: 1_620,
    type: "townhouse",
    image: "https://photos.zillowstatic.com/fp/8bf29962bf614151ea041c46865b4676-cc_ft_960.jpg",
    badge: "For Rent",
  },
  {
    id: "p4",
    title: "Sunlit Bungalow Retreat",
    address: "14 Amber Oak Court",
    city: "Maplewood",
    price: 875_000,
    priceType: "sale",
    beds: 3,
    baths: 2,
    sqft: 1_950,
    type: "house",
    image: "https://a0.muscache.com/im/pictures/hosting/Hosting-1668221787137807247/original/7844f3cb-de2f-4130-a55a-ce8069c86b4a.jpeg?im_w=720",
    badge: "Open House",
  },
];

const stats = [
  { label: "Homes Sold", value: "1,200+", icon: Home },
  { label: "Happy Families", value: "980+", icon: Users },
  { label: "Years in Market", value: "18", icon: TrendingUp },
  { label: "Industry Awards", value: "14", icon: Award },
];

const whyUs = [
  {
    title: "Deep Local Knowledge",
    body: "Our agents live and breathe Maplewood. From school districts to hidden pocket listings, we know every block.",
    icon: MapPin,
  },
  {
    title: "Transparent Process",
    body: "No surprises, no pressure. We walk you through every step with clear timelines and honest guidance.",
    icon: CheckCircle,
  },
  {
    title: "Proven Track Record",
    body: "Over 1,200 successful closings and a 98% client satisfaction rate speak louder than any promise.",
    icon: TrendingUp,
  },
  {
    title: "Full-Service Support",
    body: "From your first search to the final signature, our team handles staging, negotiation, and paperwork.",
    icon: Award,
  },
];

const propertyTypes = [
  {
    label: "Single-Family Homes",
    count: "142 listings",
    image: "https://careerpathwaysconsulting.com/wp-content/uploads/2023/01/Full-Service.png",
    href: "/listings?type=house",
  },
  {
    label: "Condos & Lofts",
    count: "87 listings",
    image: "https://d32ijn7u0aqfv4.cloudfront.net/wp/wp-content/uploads/raw/SOHL0122005_1560x880_desktop.jpg",
    href: "/listings?type=condo",
  },
  {
    label: "Townhouses",
    count: "54 listings",
    image: "https://sharedeasy.club/wp-content/uploads/blog/condo-loft-and-apartment.jpg",
    href: "/listings?type=townhouse",
  },
  {
    label: "Rental Properties",
    count: "63 listings",
    image: "https://www.architecturaldesigns.com/cdn-cgi/image/width=3840,quality=75,format=auto,slow-connection-quality=50/https://images.ctfassets.net/jpa39mk6svwx/3HzP31TfWV1yZ3uBMMAdgU/d91d891bdc7b994a8b6d9884bd290afe/623200DJ_Render-02.jpg",
    href: "/listings?type=rent",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatPrice(price: number, priceType: string) {
  if (priceType === "rent") {
    return `$${price.toLocaleString("en-US")}/mo`;
  }
  return `$${price.toLocaleString("en-US")}`;
}

// ─── Sub-components (inline) ──────────────────────────────────────────────────

function PropertyCard({
  property,
  index,
}: {
  property: (typeof featuredProperties)[0];
  index: number;
}) {
  const cardVariant: Variants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut", delay: index * 0.1 },
    },
  };

  return (
    <motion.div
      variants={cardVariant}
      whileHover={{ y: -6, transition: { duration: 0.25, ease: "easeOut" } }}
      className="group bg-white rounded-2xl overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.10)] border border-black/5 flex flex-col"
    >
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute top-3 left-3 px-3 py-1 bg-[#c9a84c] text-white text-xs font-semibold rounded-full shadow-sm">
          {property.badge}
        </span>
        <span className="absolute top-3 right-3 px-3 py-1 bg-white/90 backdrop-blur-sm text-[#1a3c5e] text-xs font-semibold rounded-full shadow-sm capitalize">
          {property.type}
        </span>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <p className="text-xs text-[#c9a84c] font-semibold uppercase tracking-wider mb-1">
          {property.city}
        </p>
        <h3 className="font-serif font-bold text-[#1a3c5e] text-lg leading-snug mb-1 text-balance">
          {property.title}
        </h3>
        <p className="text-sm text-gray-500 mb-4">{property.address}</p>
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-5">
          <span className="flex items-center gap-1.5">
            <Bed size={14} className="text-[#c9a84c]" />
            {property.beds} bd
          </span>
          <span className="flex items-center gap-1.5">
            <Bath size={14} className="text-[#c9a84c]" />
            {property.baths} ba
          </span>
          <span className="flex items-center gap-1.5">
            <Square size={14} className="text-[#c9a84c]" />
            {property.sqft.toLocaleString("en-US")} sqft
          </span>
        </div>
        <div className="mt-auto flex items-center justify-between">
          <span className="font-serif font-bold text-[#1a3c5e] text-xl">
            {formatPrice(property.price, property.priceType)}
          </span>
          <Link
            href={`/listings`}
            className="flex items-center gap-1 text-sm font-semibold text-[#c9a84c] hover:text-[#b8943e] transition-colors duration-200"
          >
            View <ChevronRight size={14} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const t = useTranslations();
  const shouldReduceMotion = useReducedMotion();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("buy");

  const motionProps = shouldReduceMotion
    ? { initial: "visible", animate: "visible", whileInView: undefined }
    : {};

  return (
    <main className="overflow-x-hidden">
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section
        id="hero"
        className="relative min-h-[92vh] flex items-center justify-center"
      >
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://c8.alamy.com/comp/E6HGT5/aerial-view-of-maplewood-new-jersey-E6HGT5.jpg"
            alt="Maplewood neighborhood aerial view"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a3c5e]/85 via-[#1a3c5e]/70 to-[#0d2438]/80" />
          {/* Subtle radial glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(201,168,76,0.08),transparent)]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 text-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center"
          >
            <motion.span
              variants={fadeIn}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#c9a84c]/20 border border-[#c9a84c]/40 text-[#c9a84c] text-sm font-semibold mb-6 backdrop-blur-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#c9a84c] animate-pulse" />
              Maplewood's Most Trusted Realty
            </motion.span>

            <motion.h1
              variants={fadeInUp}
              className="font-serif font-bold text-white text-5xl sm:text-6xl lg:text-7xl leading-tight tracking-tight text-balance max-w-4xl mb-6"
            >
              Find Your Place
              <br />
              <span className="text-[#c9a84c]">to Call Home</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-white/75 text-lg sm:text-xl leading-relaxed max-w-2xl mb-10 text-pretty"
            >
              Harborview Realty connects buyers, sellers, and renters with the
              finest properties across Maplewood and the surrounding coast.
              Expert guidance, every step of the way.
            </motion.p>

            {/* Search Bar */}
            <motion.div
              variants={scaleIn}
              className="w-full max-w-2xl bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-2 shadow-[0_8px_32px_rgba(0,0,0,0.24)]"
            >
              {/* Tabs */}
              <div className="flex gap-1 mb-2 px-1 pt-1">
                {["buy", "rent"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setSearchType(tab)}
                    className={`px-5 py-1.5 rounded-lg text-sm font-semibold capitalize transition-all duration-200 ${
                      searchType === tab
                        ? "bg-[#c9a84c] text-white shadow-sm"
                        : "text-white/70 hover:text-white"
                    }`}
                  >
                    {tab === "buy" ? "Buy" : "Rent"}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <div className="flex-1 flex items-center gap-3 bg-white rounded-xl px-4 py-3">
                  <Search size={18} className="text-gray-400 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by city, neighborhood, or address..."
                    className="flex-1 text-sm text-gray-700 placeholder-gray-400 bg-transparent outline-none"
                  />
                </div>
                <Link
                  href="/listings"
                  className="px-6 py-3 bg-[#c9a84c] hover:bg-[#b8943e] text-white font-semibold text-sm rounded-xl transition-all duration-200 shadow-sm whitespace-nowrap flex items-center gap-2"
                >
                  Search <ArrowRight size={15} />
                </Link>
              </div>
            </motion.div>

            {/* Quick stats */}
            <motion.div
              variants={fadeIn}
              className="flex flex-wrap justify-center gap-6 mt-10"
            >
              {stats.map((s) => (
                <div key={s.label} className="flex items-center gap-2 text-white/80">
                  <s.icon size={16} className="text-[#c9a84c]" />
                  <span className="text-sm font-semibold">{s.value}</span>
                  <span className="text-sm text-white/50">{s.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <svg
            viewBox="0 0 1440 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
            preserveAspectRatio="none"
          >
            <path
              d="M0 60L60 50C120 40 240 20 360 15C480 10 600 20 720 28C840 36 960 40 1080 36C1200 32 1320 20 1380 14L1440 8V60H0Z"
              fill="#f8f7f4"
            />
          </svg>
        </div>
      </section>

      {/* ── Browse by Type ─────────────────────────────────────────────────── */}
      <section id="browse" className="bg-[#f8f7f4] py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div variants={fadeInUp} className="mb-12">
              <p className="text-[#c9a84c] font-semibold text-sm uppercase tracking-widest mb-2">
                Explore
              </p>
              <h2 className="font-serif font-bold text-[#1a3c5e] text-4xl md:text-5xl tracking-tight text-balance">
                Browse by Property Type
              </h2>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-2 lg:grid-cols-4 gap-4"
            >
              {propertyTypes.map((pt, i) => (
                <motion.a
                  key={pt.label}
                  href={pt.href}
                  variants={scaleIn}
                  whileHover={{ scale: 1.03, transition: { duration: 0.22 } }}
                  className="group relative rounded-2xl overflow-hidden aspect-[3/4] shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.12)] border border-black/5 cursor-pointer"
                >
                  <img
                    src={pt.image}
                    alt={pt.label}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a3c5e]/80 via-[#1a3c5e]/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="font-serif font-bold text-white text-lg leading-snug">
                      {pt.label}
                    </p>
                    <p className="text-[#c9a84c] text-sm font-semibold mt-0.5">
                      {pt.count}
                    </p>
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Featured Listings ──────────────────────────────────────────────── */}
      <section id="listings" className="bg-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12"
            >
              <div>
                <p className="text-[#c9a84c] font-semibold text-sm uppercase tracking-widest mb-2">
                  Hand-Picked
                </p>
                <h2 className="font-serif font-bold text-[#1a3c5e] text-4xl md:text-5xl tracking-tight text-balance">
                  Featured Properties
                </h2>
              </div>
              <Link
                href="/listings"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#c9a84c] hover:text-[#b8943e] transition-colors duration-200 shrink-0"
              >
                View all listings <ArrowRight size={15} />
              </Link>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProperties.map((p, i) => (
                <PropertyCard key={p.id} property={p} index={i} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Why Harborview ─────────────────────────────────────────────────── */}
      <section id="about" className="bg-[#f8f7f4] py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Image stack */}
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5] shadow-[0_1px_2px_rgba(0,0,0,0.04),0_16px_48px_-12px_rgba(0,0,0,0.18)] border border-black/5">
                <img
                  src="https://cdn.agentimagehosting.com/3eZmPYFGMsc8Ef0gPnFPW/2025/03/29030617/Elena-Yakovleva.jpg"
                  alt="Harborview Realty team"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a3c5e]/30 to-transparent" />
              </div>
              {/* Floating stat card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.88 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.35, duration: 0.5, ease: "easeOut" }}
                className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-5 shadow-[0_4px_24px_rgba(0,0,0,0.12)] border border-black/5 flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-[#c9a84c]/10 flex items-center justify-center">
                  <TrendingUp size={22} className="text-[#c9a84c]" />
                </div>
                <div>
                  <p className="font-serif font-bold text-[#1a3c5e] text-2xl leading-none">
                    98%
                  </p>
                  <p className="text-gray-500 text-xs mt-0.5">
                    Client Satisfaction
                  </p>
                </div>
              </motion.div>
              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.45, ease: "easeOut" }}
                className="absolute -top-4 -left-4 bg-[#1a3c5e] text-white rounded-xl px-4 py-2 shadow-lg"
              >
                <p className="text-xs font-semibold text-[#c9a84c] uppercase tracking-wider">
                  Est. 2006
                </p>
                <p className="font-serif font-bold text-sm">18 Years Strong</p>
              </motion.div>
            </motion.div>

            {/* Right: Copy */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              <motion.p
                variants={fadeIn}
                className="text-[#c9a84c] font-semibold text-sm uppercase tracking-widest mb-3"
              >
                Why Choose Us
              </motion.p>
              <motion.h2
                variants={fadeInUp}
                className="font-serif font-bold text-[#1a3c5e] text-4xl md:text-5xl tracking-tight leading-tight text-balance mb-5"
              >
                A Realty Partner You Can Trust
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-gray-600 text-lg leading-relaxed mb-10 text-pretty"
              >
                Since 2006, Harborview Realty has been the go-to name for
                buyers, sellers, and renters across Maplewood. We combine
                neighborhood expertise with a client-first philosophy to deliver
                results that matter.
              </motion.p>

              <motion.ul variants={staggerContainer} className="space-y-5">
                {whyUs.map((item) => (
                  <motion.li
                    key={item.title}
                    variants={fadeInUp}
                    className="flex items-start gap-4"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#c9a84c]/10 flex items-center justify-center shrink-0 mt-0.5">
                      <item.icon size={18} className="text-[#c9a84c]" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#1a3c5e] text-base mb-0.5">
                        {item.title}
                      </p>
                      <p className="text-gray-500 text-sm leading-relaxed">
                        {item.body}
                      </p>
                    </div>
                  </motion.li>
                ))}
              </motion.ul>

              <motion.div variants={fadeInUp} className="mt-10">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#1a3c5e] hover:bg-[#15304d] text-white font-semibold text-sm rounded-xl transition-all duration-200 shadow-sm"
                >
                  Meet Our Team <ArrowRight size={15} />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Meet the Agents ────────────────────────────────────────────────── */}
      <section id="agents" className="bg-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div variants={fadeInUp} className="text-center mb-14">
              <p className="text-[#c9a84c] font-semibold text-sm uppercase tracking-widest mb-2">
                Our People
              </p>
              <h2 className="font-serif font-bold text-[#1a3c5e] text-4xl md:text-5xl tracking-tight text-balance">
                Expert Agents, Real Results
              </h2>
              <p className="text-gray-500 text-lg mt-4 max-w-xl mx-auto text-pretty">
                Our agents are more than salespeople. They are neighbors,
                advisors, and advocates who put your goals first.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {agents.map((agent, i) => (
                <motion.div
                  key={agent.id}
                  variants={scaleIn}
                  whileHover={{
                    y: -5,
                    transition: { duration: 0.22, ease: "easeOut" },
                  }}
                  className="group bg-[#f8f7f4] rounded-2xl overflow-hidden border border-black/5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)]"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={agent.image}
                      alt={agent.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a3c5e]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-6">
                    <p className="text-[#c9a84c] text-xs font-semibold uppercase tracking-wider mb-1">
                      {agent.title}
                    </p>
                    <h3 className="font-serif font-bold text-[#1a3c5e] text-xl mb-2">
                      {agent.name}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-5 line-clamp-2">
                      {agent.bio}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-5">
                      <span>
                        <span className="font-bold text-[#1a3c5e]">
                          {agent.listings}
                        </span>{" "}
                        Active
                      </span>
                      <span className="w-px h-4 bg-gray-200" />
                      <span>
                        <span className="font-bold text-[#1a3c5e]">
                          {agent.sold}
                        </span>{" "}
                        Sold
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <a
                        href={`tel:${agent.phone}`}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-[#1a3c5e]/8 text-[#1a3c5e] text-xs font-semibold hover:bg-[#1a3c5e] hover:text-white transition-all duration-200"
                      >
                        <Phone size={13} /> Call
                      </a>
                      <a
                        href={`mailto:${agent.email}`}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-[#c9a84c]/10 text-[#c9a84c] text-xs font-semibold hover:bg-[#c9a84c] hover:text-white transition-all duration-200"
                      >
                        <Mail size={13} /> Email
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Testimonials ───────────────────────────────────────────────────── */}
      <section id="testimonials" className="bg-[#1a3c5e] py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div variants={fadeInUp} className="text-center mb-14">
              <p className="text-[#c9a84c] font-semibold text-sm uppercase tracking-widest mb-2">
                Client Stories
              </p>
              <h2 className="font-serif font-bold text-white text-4xl md:text-5xl tracking-tight text-balance">
                What Our Clients Say
              </h2>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {testimonials.map((t, i) => (
                <motion.div
                  key={t.id}
                  variants={fadeInUp}
                  whileHover={{
                    y: -4,
                    transition: { duration: 0.22, ease: "easeOut" },
                  }}
                  className={`bg-white/8 backdrop-blur-sm border border-white/10 rounded-2xl p-7 flex flex-col ${
                    i === 1 ? "md:mt-6" : ""
                  }`}
                >
                  {/* Stars */}
                  <div className="flex gap-1 mb-5">
                    {Array.from({ length: t.rating }).map((_, si) => (
                      <Star
                        key={si}
                        size={15}
                        className="text-[#c9a84c] fill-[#c9a84c]"
                      />
                    ))}
                  </div>
                  <p className="text-white/80 text-sm leading-relaxed flex-1 mb-6 text-pretty">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <img
                      src={t.image}
                      alt={t.name}
                      className="w-10 h-10 rounded-full object-cover border-2 border-[#c9a84c]/40"
                    />
                    <div>
                      <p className="font-semibold text-white text-sm">
                        {t.name}
                      </p>
                      <p className="text-white/50 text-xs">{t.location}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA Banner ─────────────────────────────────────────────────────── */}
      <section id="contact" className="bg-[#f8f7f4] py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="relative bg-[#1a3c5e] rounded-3xl overflow-hidden px-8 py-16 md:px-16 md:py-20 text-center"
          >
            {/* Background texture */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgba(201,168,76,0.12),transparent)]" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#c9a84c]/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#c9a84c]/5 rounded-full blur-3xl" />

            <div className="relative z-10">
              <motion.p
                variants={fadeIn}
                className="text-[#c9a84c] font-semibold text-sm uppercase tracking-widest mb-3"
              >
                Ready to Begin?
              </motion.p>
              <motion.h2
                variants={fadeInUp}
                className="font-serif font-bold text-white text-4xl md:text-5xl tracking-tight text-balance mb-5 max-w-2xl mx-auto"
              >
                Your Next Chapter Starts Here
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-white/65 text-lg leading-relaxed max-w-xl mx-auto mb-10 text-pretty"
              >
                Whether you are buying your first home, selling a cherished
                property, or searching for the perfect rental, our team is ready
                to guide you.
              </motion.p>
              <motion.div
                variants={fadeInUp}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Link
                  href="/listings"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#c9a84c] hover:bg-[#b8943e] text-white font-semibold text-sm rounded-xl transition-all duration-200 shadow-[0_4px_16px_rgba(201,168,76,0.35)]"
                >
                  Browse Listings <ArrowRight size={15} />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm rounded-xl transition-all duration-200 backdrop-blur-sm"
                >
                  <Phone size={15} /> Talk to an Agent
                </Link>
              </motion.div>

              {/* Contact details */}
              <motion.div
                variants={fadeIn}
                className="flex flex-col sm:flex-row gap-6 justify-center mt-12 pt-10 border-t border-white/10"
              >
                <a
                  href={`tel:${BRAND.phone}`}
                  className="flex items-center gap-2 text-white/60 hover:text-[#c9a84c] text-sm transition-colors duration-200"
                >
                  <Phone size={14} /> {BRAND.phone}
                </a>
                <a
                  href={`mailto:${BRAND.email}`}
                  className="flex items-center gap-2 text-white/60 hover:text-[#c9a84c] text-sm transition-colors duration-200"
                >
                  <Mail size={14} /> {BRAND.email}
                </a>
                <span className="flex items-center gap-2 text-white/60 text-sm">
                  <MapPin size={14} /> {BRAND.address}
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}