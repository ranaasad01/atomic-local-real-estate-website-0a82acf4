"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, Mail, Star, Home, Award, Users, Search } from 'lucide-react';
import { fadeInUp, staggerContainer, scaleIn, fadeIn } from "@/lib/motion";
import { agents, BRAND } from "@/lib/data";

// ─── Extended Agent Type ───────────────────────────────────────────────────────
type AgentWithSpecialties = {
  id: string;
  name: string;
  title: string;
  phone: string;
  email: string;
  image: string;
  bio: string;
  listings: number;
  sold: number;
  specialties: string[];
};

// ─── All Agents (imported + inline extras) ─────────────────────────────────────
const allAgents: AgentWithSpecialties[] = [
  {
    ...agents[0],
    specialties: ["Luxury Residential", "Listings", "Negotiations"],
  },
  {
    ...agents[1],
    specialties: ["Buyer Representation", "Data Analysis", "First-Time Buyers"],
  },
  {
    ...agents[2],
    specialties: ["Rentals", "Relocation", "Property Management"],
  },
  {
    id: "agent-4",
    name: "James Thornton",
    title: "Luxury Property Specialist",
    phone: "(555) 842-9104",
    email: "james@harborviewrealty.com",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400",
    bio: "James has 10 years of experience in the luxury segment, consistently ranking in the top 1% of agents nationwide.",
    listings: 15,
    sold: 178,
    specialties: ["Luxury Homes", "Waterfront", "Investment"],
  },
  {
    id: "agent-5",
    name: "Priya Nair",
    title: "First-Time Buyer Specialist",
    phone: "(555) 842-9105",
    email: "priya@harborviewrealty.com",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400",
    bio: "Priya is passionate about helping first-time buyers navigate the process with confidence and clarity.",
    listings: 12,
    sold: 134,
    specialties: ["First-Time Buyers", "Condos", "Relocation"],
  },
  {
    id: "agent-6",
    name: "David Park",
    title: "Commercial & Investment Agent",
    phone: "(555) 842-9106",
    email: "david@harborviewrealty.com",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
    bio: "David specializes in commercial real estate and investment properties, with a strong track record in multi-family assets.",
    listings: 9,
    sold: 89,
    specialties: ["Commercial", "Multi-Family", "Investment"],
  },
];

// ─── Stats ─────────────────────────────────────────────────────────────────────
const stats = [
  { label: "Expert Agents", value: "6", icon: Users },
  { label: "Years Combined Experience", value: "18+", icon: Award },
  { label: "Homes Sold", value: "1,200+", icon: Home },
  { label: "Client Satisfaction", value: "98%", icon: Star },
];

// ─── Specialty Filter Pills ────────────────────────────────────────────────────
const specialtyFilters = [
  "All",
  "Luxury",
  "Buyers",
  "Rentals",
  "Investment",
  "Commercial",
];

function matchesSpecialty(agent: AgentWithSpecialties, filter: string): boolean {
  if (filter === "All") return true;
  return agent.specialties.some((s) =>
    s.toLowerCase().includes(filter.toLowerCase())
  );
}

// ─── Agent Card ────────────────────────────────────────────────────────────────
function AgentCard({ agent }: { agent: AgentWithSpecialties }) {
  return (
    <motion.div
      variants={scaleIn}
      className="bg-white rounded-2xl shadow-md p-8 text-center flex flex-col gap-4 hover:shadow-lg transition-shadow duration-300"
    >
      {/* Photo */}
      <div className="flex justify-center">
        <img
          src={agent.image}
          alt={agent.name}
          className="w-28 h-28 rounded-full object-cover mx-auto border-4 border-[#f5f5f0] shadow-sm"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400";
          }}
        />
      </div>

      {/* Name & Title */}
      <div>
        <h3 className="font-serif font-bold text-xl text-[#1a3c5e] leading-tight">
          {agent.name}
        </h3>
        <p className="text-[#c9a84c] text-sm font-semibold mt-1">{agent.title}</p>
      </div>

      {/* Bio */}
      <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
        {agent.bio}
      </p>

      {/* Specialty Pills */}
      <div className="flex flex-wrap justify-center gap-2">
        {agent.specialties.map((specialty) => (
          <span
            key={specialty}
            className="px-3 py-1 bg-[#f5f5f0] text-[#1a3c5e] text-xs font-medium rounded-full border border-[#1a3c5e]/10"
          >
            {specialty}
          </span>
        ))}
      </div>

      {/* Stats Row */}
      <div className="flex justify-center gap-6 py-3 border-t border-b border-gray-100">
        <div className="text-center">
          <p className="font-bold text-[#1a3c5e] text-lg leading-none">
            {agent.listings}
          </p>
          <p className="text-gray-500 text-xs mt-1">Active Listings</p>
        </div>
        <div className="w-px bg-gray-200" />
        <div className="text-center">
          <p className="font-bold text-[#1a3c5e] text-lg leading-none">
            {agent.sold}
          </p>
          <p className="text-gray-500 text-xs mt-1">Homes Sold</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 justify-center">
        <a
          href={`tel:${agent.phone}`}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#1a3c5e] text-white text-sm font-semibold rounded-xl hover:bg-[#15304d] transition-colors duration-200"
        >
          <Phone size={15} />
          Call
        </a>
        <a
          href={`mailto:${agent.email}`}
          className="flex items-center gap-2 px-4 py-2.5 border-2 border-[#1a3c5e] text-[#1a3c5e] text-sm font-semibold rounded-xl hover:bg-[#1a3c5e] hover:text-white transition-all duration-200"
        >
          <Mail size={15} />
          Email
        </a>
      </div>
    </motion.div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function AgentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSpecialty, setActiveSpecialty] = useState("All");

  const filteredAgents = allAgents.filter((agent) => {
    const matchesSearch = agent.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter = matchesSpecialty(agent, activeSpecialty);
    return matchesSearch && matchesFilter;
  });

  return (
    <main className="bg-[#f5f5f0] overflow-x-hidden">
      {/* ── 1. HERO ──────────────────────────────────────────────────────────── */}
      <section className="bg-[#1a3c5e] text-white py-24">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <motion.span
            variants={fadeIn}
            className="inline-block bg-[#c9a84c]/20 text-[#c9a84c] text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-6"
          >
            Our Team
          </motion.span>
          <motion.h1
            variants={fadeInUp}
            className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-balance leading-tight mb-6"
          >
            Meet Your Local Experts
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-white/75 text-lg leading-relaxed max-w-2xl mx-auto"
          >
            Our team of dedicated real estate professionals brings decades of
            combined experience, deep neighborhood knowledge, and an unwavering
            commitment to helping you achieve your real estate goals — whether
            you&apos;re buying, selling, or investing.
          </motion.p>
        </motion.div>
      </section>

      {/* ── 2. STATS BAR ─────────────────────────────────────────────────────── */}
      <section className="bg-white py-12 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  variants={fadeInUp}
                  className="flex flex-col items-center text-center gap-2"
                >
                  <div className="w-12 h-12 rounded-full bg-[#c9a84c]/10 flex items-center justify-center mb-1">
                    <Icon size={22} className="text-[#c9a84c]" />
                  </div>
                  <p className="font-serif font-bold text-3xl text-[#1a3c5e] leading-none">
                    {stat.value}
                  </p>
                  <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── 3. SEARCH / FILTER BAR ───────────────────────────────────────────── */}
      <section className="bg-[#f5f5f0] py-8 border-b border-black/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search Input */}
          <div className="relative mb-5">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search agents by name…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white border border-black/10 rounded-xl text-[#1a3c5e] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#c9a84c]/40 focus:border-[#c9a84c] transition-all duration-200 shadow-sm"
            />
          </div>

          {/* Specialty Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {specialtyFilters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveSpecialty(filter)}
                className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-200 ${
                  activeSpecialty === filter
                    ? "bg-[#1a3c5e] text-white border-[#1a3c5e]"
                    : "bg-white text-[#1a3c5e] border-black/10 hover:border-[#1a3c5e] hover:bg-[#1a3c5e]/5"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. AGENTS GRID ───────────────────────────────────────────────────── */}
      <section className="bg-[#f5f5f0] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredAgents.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <p className="text-gray-500 text-lg">
                No agents match your search. Try a different name or specialty.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key={`${searchTerm}-${activeSpecialty}`}
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredAgents.map((agent) => (
                <AgentCard key={agent.id} agent={agent} />
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* ── 5. JOIN THE TEAM CTA ─────────────────────────────────────────────── */}
      <section className="bg-[#1a3c5e] text-white py-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <motion.div
            variants={fadeInUp}
            className="w-14 h-14 rounded-full bg-[#c9a84c]/20 flex items-center justify-center mx-auto mb-6"
          >
            <Users size={26} className="text-[#c9a84c]" />
          </motion.div>
          <motion.h2
            variants={fadeInUp}
            className="font-serif text-3xl sm:text-4xl font-bold mb-4 tracking-tight"
          >
            Join the {BRAND.name} Team
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-white/70 text-lg leading-relaxed mb-8 max-w-xl mx-auto"
          >
            We&apos;re always looking for passionate, driven real estate
            professionals who share our commitment to exceptional client service
            and community. If that sounds like you, we&apos;d love to connect.
          </motion.p>
          <motion.div variants={fadeInUp}>
            <Link
              href="/contact"
              className="inline-block px-8 py-3.5 bg-[#c9a84c] text-white font-semibold rounded-xl hover:bg-[#b8943e] transition-colors duration-200 shadow-md"
            >
              View Careers
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}
