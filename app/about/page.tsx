"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  scaleIn,
  slideInLeft,
  slideInRight,
} from "@/lib/motion";
import { agents, BRAND } from "@/lib/data";
import { Award, Heart, Shield, Users, Home, TrendingUp, Star, CheckCircle, Phone, Mail } from 'lucide-react';
import { useTranslations } from "next-intl";

const milestones = [
  { value: "18+", label: "Years in Business", icon: TrendingUp },
  { value: "2,400+", label: "Homes Sold", icon: Home },
  { value: "3,100+", label: "Happy Clients", icon: Heart },
  { value: "12", label: "Expert Agents", icon: Users },
];

const values = [
  {
    icon: Shield,
    title: "Integrity First",
    description:
      "We believe every transaction should be built on honesty and transparency. Our clients always know exactly where they stand.",
  },
  {
    icon: Heart,
    title: "Client-Centered Care",
    description:
      "Your goals drive every decision we make. We listen deeply, advise honestly, and advocate fiercely on your behalf.",
  },
  {
    icon: Award,
    title: "Local Expertise",
    description:
      "Eighteen years of boots-on-the-ground experience in Maplewood means we know every neighborhood, school district, and hidden gem.",
  },
  {
    icon: TrendingUp,
    title: "Results That Matter",
    description:
      "We measure success by outcomes: faster closings, stronger offers, and clients who refer their friends and family to us.",
  },
  {
    icon: Users,
    title: "Community Roots",
    description:
      "Harborview Realty is woven into the fabric of Maplewood. We sponsor local events, support schools, and invest in the neighborhoods we serve.",
  },
  {
    icon: Star,
    title: "Continuous Excellence",
    description:
      "Our agents pursue ongoing education and market research so you always receive counsel grounded in the latest data and best practices.",
  },
];

export default function AboutPage() {
  const t = useTranslations();

  return (
    <main className="bg-white overflow-x-hidden">
      {/* ── Hero Banner ─────────────────────────────────────────────────────── */}
      <section className="relative h-[70vh] min-h-[520px] flex items-center justify-center overflow-hidden">
        <img
          src="https://c8.alamy.com/comp/E6HGT5/aerial-view-of-maplewood-new-jersey-E6HGT5.jpg"
          alt="Maplewood neighborhood aerial view"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a3c5e]/80 via-[#1a3c5e]/60 to-[#1a3c5e]/80" />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="relative z-10 text-center px-4 max-w-3xl mx-auto"
        >
          <motion.span
            variants={fadeIn}
            className="inline-block text-[#c9a84c] text-sm font-semibold tracking-widest uppercase mb-4"
          >
            Our Story
          </motion.span>
          <motion.h1
            variants={fadeInUp}
            className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight text-balance leading-tight mb-6"
          >
            Built on Trust, Driven by Community
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-white/80 text-lg leading-relaxed text-pretty max-w-xl mx-auto"
          >
            For nearly two decades, Harborview Realty has helped Maplewood
            families find the places they call home. Here is how we got here.
          </motion.p>
        </motion.div>
      </section>

      {/* ── Agency Story — Split Layout ──────────────────────────────────────── */}
      <section className="py-24 md:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image side */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-[0_4px_6px_rgba(0,0,0,0.04),0_20px_60px_-12px_rgba(0,0,0,0.18)]">
              <img
                src="https://cdn.agentimagehosting.com/3eZmPYFGMsc8Ef0gPnFPW/2025/03/29014712/Harborview-Realty-logo-v1.png"
                alt="Harborview Realty office"
                className="w-full h-[480px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a3c5e]/30 to-transparent" />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-6 bg-[#c9a84c] text-white rounded-2xl px-6 py-4 shadow-[0_8px_32px_rgba(201,168,76,0.35)]">
              <p className="font-serif font-bold text-3xl leading-none">18</p>
              <p className="text-xs font-semibold tracking-wide uppercase mt-1 text-white/90">
                Years Serving Maplewood
              </p>
            </div>
          </motion.div>

          {/* Text side */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="lg:pl-4"
          >
            <motion.span
              variants={fadeIn}
              className="inline-block text-[#c9a84c] text-sm font-semibold tracking-widest uppercase mb-4"
            >
              Who We Are
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="font-serif text-3xl sm:text-4xl font-bold text-[#1a3c5e] tracking-tight text-balance leading-snug mb-6"
            >
              A Boutique Agency with Deep Roots
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-gray-600 leading-relaxed mb-5 text-pretty"
            >
              Harborview Realty was founded in 2006 by a small team of agents
              who believed the Maplewood market deserved something different: a
              firm that combined the reach of a large brokerage with the
              personal attention of a neighborhood shop.
            </motion.p>
            <motion.p
              variants={fadeInUp}
              className="text-gray-600 leading-relaxed mb-5 text-pretty"
            >
              Over the years we have grown to twelve agents, each a specialist
              in their corner of the market. But our philosophy has never
              changed. Every client gets a dedicated advocate, clear
              communication, and a strategy tailored to their unique situation.
            </motion.p>
            <motion.p
              variants={fadeInUp}
              className="text-gray-600 leading-relaxed mb-8 text-pretty"
            >
              From first-time buyers navigating a competitive market to
              long-time homeowners ready to downsize, we have guided more than
              3,100 families through one of life's most significant decisions.
              That trust is something we never take for granted.
            </motion.p>
            <motion.div variants={fadeInUp}>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#1a3c5e] text-white font-semibold rounded-xl hover:bg-[#15304d] transition-all duration-300 shadow-sm hover:shadow-md"
              >
                Get in Touch
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Milestone Strip ──────────────────────────────────────────────────── */}
      <section className="bg-[#1a3c5e] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {milestones.map((m) => {
              const Icon = m.icon;
              return (
                <motion.div
                  key={m.label}
                  variants={scaleIn}
                  className="text-center group"
                >
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-[#c9a84c] transition-colors duration-300">
                    <Icon size={22} className="text-[#c9a84c] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <p className="font-serif font-bold text-4xl text-white tracking-tight mb-1">
                    {m.value}
                  </p>
                  <p className="text-white/60 text-sm font-medium">{m.label}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── Agent Profiles — Alternating Layout ─────────────────────────────── */}
      <section className="py-24 md:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-16"
        >
          <motion.span
            variants={fadeIn}
            className="inline-block text-[#c9a84c] text-sm font-semibold tracking-widest uppercase mb-4"
          >
            The Team
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="font-serif text-3xl sm:text-4xl font-bold text-[#1a3c5e] tracking-tight text-balance"
          >
            Meet the People Behind the Keys
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mt-4 text-gray-500 max-w-xl mx-auto leading-relaxed text-pretty"
          >
            Our agents are more than professionals. They are neighbors,
            advocates, and trusted guides through every step of your real
            estate journey.
          </motion.p>
        </motion.div>

        <div className="space-y-20">
          {agents.map((agent, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <motion.div
                key={agent.id}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  isEven ? "" : "lg:[&>*:first-child]:order-2"
                }`}
              >
                {/* Photo */}
                <div className="relative">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="rounded-2xl overflow-hidden shadow-[0_4px_6px_rgba(0,0,0,0.04),0_20px_60px_-12px_rgba(0,0,0,0.14)]"
                  >
                    <img
                      src={agent.image}
                      alt={agent.name}
                      className="w-full h-[400px] object-cover object-top"
                    />
                  </motion.div>
                  {/* Stats badge */}
                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl px-5 py-4 shadow-[0_4px_24px_rgba(0,0,0,0.10)] border border-black/5 flex items-center justify-between">
                    <div className="text-center">
                      <p className="font-serif font-bold text-xl text-[#1a3c5e]">
                        {agent.listings}
                      </p>
                      <p className="text-xs text-gray-500 font-medium">Active Listings</p>
                    </div>
                    <div className="w-px h-8 bg-gray-200" />
                    <div className="text-center">
                      <p className="font-serif font-bold text-xl text-[#1a3c5e]">
                        {agent.sold}
                      </p>
                      <p className="text-xs text-gray-500 font-medium">Homes Sold</p>
                    </div>
                    <div className="w-px h-8 bg-gray-200" />
                    <div className="flex items-center gap-1">
                      <Star size={14} className="text-[#c9a84c] fill-[#c9a84c]" />
                      <span className="font-semibold text-sm text-[#1a3c5e]">5.0</span>
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <div className={isEven ? "lg:pl-4" : "lg:pr-4"}>
                  <span className="inline-block text-[#c9a84c] text-xs font-semibold tracking-widest uppercase mb-3">
                    {agent.title}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1a3c5e] tracking-tight mb-4">
                    {agent.name}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6 text-pretty">
                    {agent.bio}
                  </p>
                  <ul className="space-y-2 mb-8">
                    {[
                      "Certified Residential Specialist (CRS)",
                      "Accredited Buyer's Representative (ABR)",
                      "Maplewood Board of Realtors Member",
                    ].map((cert) => (
                      <li key={cert} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle size={15} className="text-[#c9a84c] flex-shrink-0" />
                        {cert}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href={`tel:${agent.phone}`}
                      className="inline-flex items-center gap-2 px-4 py-2.5 border border-[#1a3c5e]/20 text-[#1a3c5e] text-sm font-medium rounded-xl hover:border-[#c9a84c] hover:text-[#c9a84c] transition-all duration-200"
                    >
                      <Phone size={14} />
                      {agent.phone}
                    </a>
                    <a
                      href={`mailto:${agent.email}`}
                      className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#c9a84c] text-white text-sm font-medium rounded-xl hover:bg-[#b8943e] transition-all duration-200 shadow-sm"
                    >
                      <Mail size={14} />
                      Email {agent.name.split(" ")[0]}
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── Brand Values ─────────────────────────────────────────────────────── */}
      <section className="bg-gray-50 py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <motion.span
              variants={fadeIn}
              className="inline-block text-[#c9a84c] text-sm font-semibold tracking-widest uppercase mb-4"
            >
              What We Stand For
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="font-serif text-3xl sm:text-4xl font-bold text-[#1a3c5e] tracking-tight text-balance"
            >
              Our Core Values
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="mt-4 text-gray-500 max-w-xl mx-auto leading-relaxed text-pretty"
            >
              These principles guide every conversation, every showing, and
              every closing we are privileged to be part of.
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {values.map((v, idx) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={v.title}
                  variants={fadeInUp}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="bg-white rounded-2xl p-7 border border-black/5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_6px_rgba(0,0,0,0.04),0_20px_40px_-12px_rgba(0,0,0,0.14)] transition-shadow duration-300"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#1a3c5e]/8 flex items-center justify-center mb-5" style={{ backgroundColor: "rgba(26,60,94,0.08)" }}>
                    <Icon size={20} className="text-[#c9a84c]" />
                  </div>
                  <h3 className="font-serif font-bold text-lg text-[#1a3c5e] mb-2 tracking-tight">
                    {v.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed text-pretty">
                    {v.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── CTA Strip ────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.h2
              variants={fadeInUp}
              className="font-serif text-3xl sm:text-4xl font-bold text-[#1a3c5e] tracking-tight text-balance mb-4"
            >
              Ready to Start Your Journey?
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-gray-500 leading-relaxed mb-8 max-w-lg mx-auto text-pretty"
            >
              Whether you are buying, selling, or simply exploring your options,
              our team is here to help. Reach out today for a no-pressure
              conversation.
            </motion.p>
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap gap-4 justify-center"
            >
              <Link
                href="/listings"
                className="px-7 py-3.5 bg-[#c9a84c] text-white font-semibold rounded-xl hover:bg-[#b8943e] transition-all duration-300 shadow-sm hover:shadow-md"
              >
                Browse Listings
              </Link>
              <Link
                href="/contact"
                className="px-7 py-3.5 border border-[#1a3c5e]/20 text-[#1a3c5e] font-semibold rounded-xl hover:border-[#1a3c5e] transition-all duration-300"
              >
                Contact an Agent
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}