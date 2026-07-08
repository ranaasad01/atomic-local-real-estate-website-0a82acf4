"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  scaleIn,
  slideInLeft,
  slideInRight,
} from "@/lib/motion";
import { BRAND } from "@/lib/data";
import { CheckCircle, Home, Camera, TrendingUp, Award, Users, Star, DollarSign, Clock, BarChart2, Shield, Zap, Phone } from 'lucide-react';

// ─── Process Steps ─────────────────────────────────────────────────────────────
const steps = [
  {
    number: "01",
    icon: Home,
    title: "Free Home Valuation",
    description:
      "Our agents conduct a comprehensive comparative market analysis of your property. You receive a detailed report with a realistic price range backed by real data.",
  },
  {
    number: "02",
    icon: Camera,
    title: "Strategic Pricing & Staging",
    description:
      "We advise on high-impact improvements and professional staging to maximize buyer appeal. Our pricing strategy is designed to attract strong offers quickly.",
  },
  {
    number: "03",
    icon: TrendingUp,
    title: "Maximum Market Exposure",
    description:
      "Your listing goes live on MLS, Zillow, Realtor.com, and our own high-traffic website. Professional photography and targeted digital ads drive qualified buyers to your door.",
  },
  {
    number: "04",
    icon: Award,
    title: "Negotiate & Close",
    description:
      "We review every offer with you, negotiate fiercely on your behalf, and manage all inspections, contingencies, and paperwork through to a smooth closing day.",
  },
];

// ─── Pricing Tiers ─────────────────────────────────────────────────────────────
const tiers = [
  {
    name: "Standard",
    rate: "5.5%",
    subtitle: "Commission",
    popular: false,
    features: [
      "Full MLS listing",
      "Professional yard signage",
      "Online listing syndication",
      "Open house coordination",
      "Offer review & negotiation",
      "Transaction management",
    ],
  },
  {
    name: "Premium",
    rate: "6%",
    subtitle: "Commission",
    popular: true,
    features: [
      "Everything in Standard",
      "Professional photography & video",
      "Staging consultation",
      "Targeted social media ads",
      "Featured placement on website",
      "Weekly seller progress reports",
      "Pre-listing home inspection",
    ],
  },
  {
    name: "Elite",
    rate: "6.5%",
    subtitle: "Commission",
    popular: false,
    features: [
      "Everything in Premium",
      "Dedicated concierge agent",
      "Luxury print marketing",
      "Drone aerial photography",
      "3D virtual tour",
      "Exclusive buyer network outreach",
      "White-glove closing coordination",
    ],
  },
];

// ─── Why Sell With Us Stats ────────────────────────────────────────────────────
const stats = [
  { value: "98%", label: "List-to-Sale Ratio" },
  { value: "21", label: "Avg. Days on Market" },
  { value: "$1.2B+", label: "Total Sales Volume" },
];

const features = [
  { icon: Shield, text: "Transparent commission with no hidden fees" },
  { icon: Zap, text: "Listings go live within 48 hours of signing" },
  { icon: Users, text: "Access to our network of 4,000+ pre-qualified buyers" },
  { icon: Star, text: "5-star rated service across 1,200+ closed transactions" },
];

// ─── Form Initial State ────────────────────────────────────────────────────────
const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  propertyType: "",
  bedrooms: "",
  yearBuilt: "",
  notes: "",
};

export default function SellPage() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <main className="bg-white overflow-x-hidden">
      {/* ── HERO ──────────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600"
          alt="Sell your home with Harborview Realty"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a3c5e]/80 via-[#1a3c5e]/70 to-[#1a3c5e]/80" />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="relative z-10 text-center px-4 max-w-3xl mx-auto"
        >
          <motion.span
            variants={fadeIn}
            className="inline-block bg-[#c9a84c]/20 border border-[#c9a84c]/50 text-[#c9a84c] text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-6"
          >
            Sell With Confidence
          </motion.span>

          <motion.h1
            variants={fadeInUp}
            className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-tight mb-6"
          >
            Get the Best Price for Your Home
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-white/80 text-lg leading-relaxed max-w-xl mx-auto mb-10"
          >
            Harborview Realty's proven selling system combines local expertise,
            strategic marketing, and relentless negotiation to deliver results
            that exceed expectations — every time.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="#valuation-form"
              onClick={(e) => {
                e.preventDefault();
                document
                  .querySelector("#valuation-form")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-8 py-4 bg-[#c9a84c] hover:bg-[#b8943e] text-white font-semibold rounded-xl shadow-lg transition-all duration-200 text-sm"
            >
              Get Free Valuation
            </a>
            <Link
              href="/agents"
              className="px-8 py-4 border-2 border-white/70 hover:border-white text-white font-semibold rounded-xl transition-all duration-200 text-sm hover:bg-white/10"
            >
              Meet Our Agents
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 bg-[#f5f5f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.span
              variants={fadeIn}
              className="inline-block text-[#c9a84c] text-sm font-semibold tracking-widest uppercase mb-3"
            >
              The Process
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1a3c5e] mb-4"
            >
              Our Proven Selling Process
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-gray-600 text-lg max-w-2xl mx-auto"
            >
              From your first call to closing day, we follow a structured,
              transparent process designed to maximize your sale price and
              minimize stress.
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {steps.map((step) => (
              <motion.div
                key={step.number}
                variants={scaleIn}
                className="bg-white rounded-2xl p-8 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.10)] border border-black/5 flex flex-col"
              >
                <span className="font-serif text-5xl font-bold text-[#c9a84c]/30 leading-none mb-4">
                  {step.number}
                </span>
                <div className="w-12 h-12 rounded-xl bg-[#1a3c5e]/8 flex items-center justify-center mb-5">
                  <step.icon size={22} className="text-[#1a3c5e]" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#1a3c5e] mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── COMMISSION & PRICING ──────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.span
              variants={fadeIn}
              className="inline-block text-[#c9a84c] text-sm font-semibold tracking-widest uppercase mb-3"
            >
              Transparent Fees
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1a3c5e] mb-4"
            >
              Simple, Transparent Pricing
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-gray-600 text-lg max-w-2xl mx-auto"
            >
              Choose the service level that fits your needs. No hidden fees, no
              surprises — just honest, results-driven representation.
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch"
          >
            {tiers.map((tier) => (
              <motion.div
                key={tier.name}
                variants={scaleIn}
                className={`relative rounded-2xl p-8 flex flex-col shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.10)] ${
                  tier.popular
                    ? "border-2 border-[#c9a84c] bg-white"
                    : "border border-black/8 bg-white"
                }`}
              >
                {tier.popular && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#c9a84c] text-white text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full shadow">
                    Most Popular
                  </span>
                )}

                <div className="mb-6">
                  <h3 className="font-serif text-2xl font-bold text-[#1a3c5e] mb-1">
                    {tier.name}
                  </h3>
                  <div className="flex items-end gap-1 mt-3">
                    <span className="font-serif text-4xl font-bold text-[#c9a84c]">
                      {tier.rate}
                    </span>
                    <span className="text-gray-500 text-sm mb-1">
                      {tier.subtitle}
                    </span>
                  </div>
                </div>

                <ul className="space-y-3 flex-1 mb-8">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <CheckCircle
                        size={17}
                        className="text-[#c9a84c] flex-shrink-0 mt-0.5"
                      />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#valuation-form"
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .querySelector("#valuation-form")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`w-full text-center py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
                    tier.popular
                      ? "bg-[#c9a84c] hover:bg-[#b8943e] text-white shadow-md"
                      : "bg-[#1a3c5e]/8 hover:bg-[#1a3c5e] hover:text-white text-[#1a3c5e]"
                  }`}
                >
                  Get Started
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FREE VALUATION FORM ───────────────────────────────────────────────── */}
      <section
        id="valuation-form"
        className="py-24 md:py-32 bg-[#1a3c5e]"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <motion.span
              variants={fadeIn}
              className="inline-block text-[#c9a84c] text-sm font-semibold tracking-widest uppercase mb-3"
            >
              Free Service
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4"
            >
              Request Your Free Home Valuation
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-white/70 text-lg max-w-xl mx-auto"
            >
              Fill out the form below and one of our senior listing agents will
              prepare a detailed market analysis for your property — completely
              free and with no obligation.
            </motion.p>
          </motion.div>

          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {submitted ? (
              <div className="bg-white/10 border border-white/20 rounded-2xl p-12 text-center">
                <div className="w-16 h-16 rounded-full bg-[#c9a84c]/20 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle size={32} className="text-[#c9a84c]" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-white mb-3">
                  Request Received!
                </h3>
                <p className="text-white/70 text-base leading-relaxed max-w-md mx-auto mb-8">
                  Thank you, {form.fullName || "valued homeowner"}. One of our
                  senior agents will reach out within one business day with your
                  personalized home valuation report.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm(initialForm);
                  }}
                  className="px-6 py-3 bg-[#c9a84c] hover:bg-[#b8943e] text-white font-semibold rounded-xl text-sm transition-all duration-200"
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white/10 border border-white/20 rounded-2xl p-8 md:p-10 space-y-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="flex flex-col gap-2">
                    <label className="text-white/80 text-sm font-medium">
                      Full Name <span className="text-[#c9a84c]">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={form.fullName}
                      onChange={handleChange}
                      required
                      placeholder="Jane Smith"
                      className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 text-sm focus:outline-none focus:border-[#c9a84c] transition-colors duration-200"
                    />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-2">
                    <label className="text-white/80 text-sm font-medium">
                      Email Address <span className="text-[#c9a84c]">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="jane@example.com"
                      className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 text-sm focus:outline-none focus:border-[#c9a84c] transition-colors duration-200"
                    />
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col gap-2">
                    <label className="text-white/80 text-sm font-medium">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="(555) 000-0000"
                      className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 text-sm focus:outline-none focus:border-[#c9a84c] transition-colors duration-200"
                    />
                  </div>

                  {/* Property Type */}
                  <div className="flex flex-col gap-2">
                    <label className="text-white/80 text-sm font-medium">
                      Property Type <span className="text-[#c9a84c]">*</span>
                    </label>
                    <select
                      name="propertyType"
                      value={form.propertyType}
                      onChange={handleChange}
                      required
                      className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#c9a84c] transition-colors duration-200 appearance-none"
                    >
                      <option value="" className="text-gray-800">
                        Select type…
                      </option>
                      <option value="house" className="text-gray-800">
                        House
                      </option>
                      <option value="condo" className="text-gray-800">
                        Condo
                      </option>
                      <option value="townhouse" className="text-gray-800">
                        Townhouse
                      </option>
                      <option value="land" className="text-gray-800">
                        Land
                      </option>
                    </select>
                  </div>

                  {/* Bedrooms */}
                  <div className="flex flex-col gap-2">
                    <label className="text-white/80 text-sm font-medium">
                      Bedrooms
                    </label>
                    <select
                      name="bedrooms"
                      value={form.bedrooms}
                      onChange={handleChange}
                      className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#c9a84c] transition-colors duration-200 appearance-none"
                    >
                      <option value="" className="text-gray-800">
                        Select…
                      </option>
                      {["1", "2", "3", "4", "5+"].map((n) => (
                        <option key={n} value={n} className="text-gray-800">
                          {n}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Year Built */}
                  <div className="flex flex-col gap-2">
                    <label className="text-white/80 text-sm font-medium">
                      Estimated Year Built
                    </label>
                    <input
                      type="text"
                      name="yearBuilt"
                      value={form.yearBuilt}
                      onChange={handleChange}
                      placeholder="e.g. 2005"
                      className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 text-sm focus:outline-none focus:border-[#c9a84c] transition-colors duration-200"
                    />
                  </div>
                </div>

                {/* Property Address — full width */}
                <div className="flex flex-col gap-2">
                  <label className="text-white/80 text-sm font-medium">
                    Property Address <span className="text-[#c9a84c]">*</span>
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    required
                    placeholder="123 Main Street, Maplewood, CA 94102"
                    className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 text-sm focus:outline-none focus:border-[#c9a84c] transition-colors duration-200"
                  />
                </div>

                {/* Additional Notes */}
                <div className="flex flex-col gap-2">
                  <label className="text-white/80 text-sm font-medium">
                    Additional Notes
                  </label>
                  <textarea
                    name="notes"
                    value={form.notes}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Tell us about recent renovations, unique features, or your timeline…"
                    className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 text-sm focus:outline-none focus:border-[#c9a84c] transition-colors duration-200 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-[#c9a84c] hover:bg-[#b8943e] disabled:opacity-70 text-white font-semibold rounded-xl shadow-lg transition-all duration-200 text-sm flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8H4z"
                        />
                      </svg>
                      Submitting…
                    </>
                  ) : (
                    "Request My Free Valuation"
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* ── WHY SELL WITH US ──────────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 bg-[#f5f5f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.span
              variants={fadeIn}
              className="inline-block text-[#c9a84c] text-sm font-semibold tracking-widest uppercase mb-3"
            >
              Our Track Record
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1a3c5e] mb-4"
            >
              Why Sellers Choose Harborview
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-gray-600 text-lg max-w-2xl mx-auto"
            >
              Our numbers tell the story. Sellers who list with Harborview
              Realty consistently achieve higher sale prices in less time.
            </motion.p>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-16"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={scaleIn}
                className="bg-white rounded-2xl p-10 text-center shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.10)] border border-black/5"
              >
                <span className="font-serif text-5xl font-bold text-[#c9a84c] block mb-2">
                  {stat.value}
                </span>
                <span className="text-[#1a3c5e] font-semibold text-base">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Feature Bullets */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto"
          >
            {features.map((feat) => (
              <motion.div
                key={feat.text}
                variants={fadeInUp}
                className="flex items-start gap-4 bg-white rounded-2xl p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_12px_-4px_rgba(0,0,0,0.08)] border border-black/5"
              >
                <div className="w-10 h-10 rounded-xl bg-[#1a3c5e]/8 flex items-center justify-center flex-shrink-0">
                  <feat.icon size={20} className="text-[#1a3c5e]" />
                </div>
                <p className="text-gray-700 text-sm leading-relaxed pt-1">
                  {feat.text}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <p className="text-gray-600 mb-6 text-base">
              Ready to take the next step? Our agents are standing by.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#valuation-form"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector("#valuation-form")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-8 py-4 bg-[#c9a84c] hover:bg-[#b8943e] text-white font-semibold rounded-xl shadow-md transition-all duration-200 text-sm"
              >
                Get Free Valuation
              </a>
              <Link
                href="/contact"
                className="px-8 py-4 border-2 border-[#1a3c5e] text-[#1a3c5e] hover:bg-[#1a3c5e] hover:text-white font-semibold rounded-xl transition-all duration-200 text-sm"
              >
                Talk to an Agent
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
