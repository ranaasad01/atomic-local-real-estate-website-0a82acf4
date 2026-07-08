"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Star, MapPin, TrendingUp, Home, ArrowRight } from 'lucide-react';
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";
import { BRAND } from "@/lib/data";

// ─── Neighborhood Data ─────────────────────────────────────────────────────────
type Neighborhood = {
  id: string;
  name: string;
  description: string;
  image: string;
  avgPrice: string;
  avgRent: string;
  schoolRating: number;
  walkScore: number;
  highlights: string[];
};

const neighborhoods: Neighborhood[] = [
  {
    id: "maplewood-heights",
    name: "Maplewood Heights",
    description:
      "A prestigious hillside enclave known for its tree-lined streets, top-rated schools, and stunning views of the bay. Ideal for families seeking space and serenity.",
    image:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80",
    avgPrice: "$1,150,000",
    avgRent: "$4,200/mo",
    schoolRating: 9,
    walkScore: 72,
    highlights: ["Top-Rated Schools", "Bay Views", "Quiet Streets"],
  },
  {
    id: "harborside-district",
    name: "Harborside District",
    description:
      "A vibrant waterfront neighborhood with upscale condos, boutique restaurants, and a lively marina. Perfect for professionals who love the urban-coastal lifestyle.",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    avgPrice: "$875,000",
    avgRent: "$3,400/mo",
    schoolRating: 8,
    walkScore: 91,
    highlights: ["Waterfront Living", "Dining & Nightlife", "High Walkability"],
  },
  {
    id: "riverside-commons",
    name: "Riverside Commons",
    description:
      "A charming, family-friendly community nestled along the river with parks, bike trails, and a strong sense of neighborhood pride. Great value for growing families.",
    image:
      "https://images.unsplash.com/photo-1448630360428-65456885c650?w=800&q=80",
    avgPrice: "$720,000",
    avgRent: "$2,900/mo",
    schoolRating: 8,
    walkScore: 68,
    highlights: ["River Trails", "Family-Friendly", "Great Value"],
  },
  {
    id: "elmwood-estates",
    name: "Elmwood Estates",
    description:
      "Grand colonial and craftsman homes on generous lots define this storied neighborhood. Elmwood Estates offers timeless elegance and a tight-knit community feel.",
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
    avgPrice: "$1,380,000",
    avgRent: "$5,100/mo",
    schoolRating: 10,
    walkScore: 55,
    highlights: ["Historic Homes", "Large Lots", "Elite Schools"],
  },
  {
    id: "downtown-core",
    name: "Downtown Core",
    description:
      "The beating heart of Maplewood, where modern lofts and converted warehouses sit alongside coffee shops, galleries, and weekend farmers markets.",
    image:
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80",
    avgPrice: "$620,000",
    avgRent: "$2,400/mo",
    schoolRating: 7,
    walkScore: 97,
    highlights: ["Arts & Culture", "Walkable", "Urban Energy"],
  },
  {
    id: "greenfield",
    name: "Greenfield",
    description:
      "A peaceful suburban retreat with newer construction, excellent parks, and a welcoming atmosphere. Greenfield is the go-to choice for first-time buyers and young families.",
    image:
      "https://images.unsplash.com/photo-1592595896551-12b371d546d5?w=800&q=80",
    avgPrice: "$680,000",
    avgRent: "$2,700/mo",
    schoolRating: 9,
    walkScore: 63,
    highlights: ["New Construction", "Great Parks", "First-Time Buyers"],
  },
];

// ─── Helper: School Rating Badge ───────────────────────────────────────────────
function SchoolBadge({ rating }: { rating: number }) {
  let colorClass = "bg-red-100 text-red-700";
  if (rating >= 9) colorClass = "bg-green-100 text-green-700";
  else if (rating >= 7) colorClass = "bg-yellow-100 text-yellow-700";

  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${colorClass}`}
    >
      <Star size={11} className="fill-current" />
      {rating}/10
    </span>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function NeighborhoodsPage() {
  return (
    <main className="bg-white overflow-x-hidden">
      {/* ── 1. HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative h-[60vh] min-h-[420px] flex items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1600"
          alt="Maplewood neighborhood aerial"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a3c5e]/80 via-[#1a3c5e]/60 to-[#1a3c5e]/85" />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="relative z-10 text-center px-4 max-w-3xl mx-auto"
        >
          <motion.span
            variants={fadeIn}
            className="inline-block bg-[#c9a84c]/20 border border-[#c9a84c]/50 text-[#c9a84c] text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-5"
          >
            Explore the Area
          </motion.span>
          <motion.h1
            variants={fadeInUp}
            className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-tight mb-5"
          >
            Discover Maplewood Neighborhoods
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-white/80 text-lg leading-relaxed max-w-xl mx-auto"
          >
            Find the perfect community that matches your lifestyle, budget, and
            priorities.
          </motion.p>
        </motion.div>
      </section>

      {/* ── 2. NEIGHBORHOOD GRID ────────────────────────────────────────────── */}
      <section className="bg-[#f5f5f0] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section heading */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-14"
          >
            <motion.span
              variants={fadeIn}
              className="inline-block text-[#c9a84c] text-xs font-semibold tracking-widest uppercase mb-3"
            >
              Where You&apos;ll Live
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="font-serif text-3xl sm:text-4xl font-bold text-[#1a3c5e] mb-4"
            >
              Our Featured Neighborhoods
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-gray-600 text-base max-w-xl mx-auto leading-relaxed"
            >
              Each community in Maplewood has its own character. Explore them
              all and find the one that feels like home.
            </motion.p>
          </motion.div>

          {/* Cards grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {neighborhoods.map((n) => (
              <motion.div
                key={n.id}
                variants={scaleIn}
                className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col hover:shadow-xl transition-shadow duration-300"
              >
                {/* Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={n.image}
                    alt={n.name}
                    className="h-52 object-cover w-full rounded-t-xl transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a3c5e]/40 to-transparent rounded-t-xl" />
                </div>

                {/* Card body */}
                <div className="bg-white rounded-b-xl p-6 flex flex-col flex-1">
                  <h3 className="font-serif text-xl font-bold text-[#1a3c5e] mb-2">
                    {n.name}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
                    {n.description}
                  </p>

                  {/* Stats row */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-[#f5f5f0] rounded-lg p-2.5">
                      <p className="text-[10px] text-gray-500 uppercase tracking-wide font-medium mb-0.5">
                        Avg Price
                      </p>
                      <p className="text-[#1a3c5e] font-bold text-sm">{n.avgPrice}</p>
                    </div>
                    <div className="bg-[#f5f5f0] rounded-lg p-2.5">
                      <p className="text-[10px] text-gray-500 uppercase tracking-wide font-medium mb-0.5">
                        Avg Rent
                      </p>
                      <p className="text-[#1a3c5e] font-bold text-sm">{n.avgRent}</p>
                    </div>
                    <div className="bg-[#f5f5f0] rounded-lg p-2.5">
                      <p className="text-[10px] text-gray-500 uppercase tracking-wide font-medium mb-0.5">
                        School Rating
                      </p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <Star size={12} className="text-[#c9a84c] fill-[#c9a84c]" />
                        <span className="text-[#1a3c5e] font-bold text-sm">
                          {n.schoolRating}/10
                        </span>
                      </div>
                    </div>
                    <div className="bg-[#f5f5f0] rounded-lg p-2.5">
                      <p className="text-[10px] text-gray-500 uppercase tracking-wide font-medium mb-0.5">
                        Walk Score
                      </p>
                      <p className="text-[#1a3c5e] font-bold text-sm">{n.walkScore}</p>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {n.highlights.map((h) => (
                      <span
                        key={h}
                        className="inline-block bg-[#c9a84c]/10 text-[#c9a84c] border border-[#c9a84c]/30 text-xs font-medium px-3 py-1 rounded-full"
                      >
                        {h}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="mt-auto">
                    <Link
                      href={`/listings?neighborhood=${n.id}`}
                      className="w-full flex items-center justify-center gap-2 border-2 border-[#c9a84c] text-[#c9a84c] font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-[#c9a84c] hover:text-white transition-all duration-200"
                    >
                      View Listings
                      <ArrowRight size={15} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 3. COMPARISON TABLE ─────────────────────────────────────────────── */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-12"
          >
            <motion.span
              variants={fadeIn}
              className="inline-block text-[#c9a84c] text-xs font-semibold tracking-widest uppercase mb-3"
            >
              Side by Side
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="font-serif text-3xl sm:text-4xl font-bold text-[#1a3c5e] mb-4"
            >
              Compare Neighborhoods at a Glance
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-gray-600 text-base max-w-xl mx-auto leading-relaxed"
            >
              Use this quick-reference table to weigh the key metrics across all
              six Maplewood communities.
            </motion.p>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="overflow-x-auto rounded-2xl shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.12)] border border-black/5"
          >
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="bg-[#1a3c5e] text-white">
                  <th className="text-left px-6 py-4 font-semibold font-serif text-base">Neighborhood</th>
                  <th className="text-left px-6 py-4 font-semibold">Avg Price</th>
                  <th className="text-left px-6 py-4 font-semibold">Avg Rent</th>
                  <th className="text-left px-6 py-4 font-semibold">School Rating</th>
                  <th className="text-left px-6 py-4 font-semibold">Walk Score</th>
                </tr>
              </thead>
              <tbody>
                {neighborhoods.map((n, idx) => (
                  <tr
                    key={n.id}
                    className={`border-b border-black/5 transition-colors duration-150 hover:bg-[#c9a84c]/5 ${
                      idx % 2 === 0 ? "bg-white" : "bg-[#f5f5f0]/60"
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <MapPin size={14} className="text-[#c9a84c] flex-shrink-0" />
                        <span className="font-semibold text-[#1a3c5e]">{n.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-700 font-medium">{n.avgPrice}</td>
                    <td className="px-6 py-4 text-gray-700">{n.avgRent}</td>
                    <td className="px-6 py-4">
                      <SchoolBadge rating={n.schoolRating} />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#c9a84c] rounded-full"
                            style={{ width: `${n.walkScore}%` }}
                          />
                        </div>
                        <span className="text-gray-700 font-medium">{n.walkScore}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* ── 4. CTA BANNER ───────────────────────────────────────────────────── */}
      <section className="bg-[#1a3c5e] py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.span
              variants={fadeIn}
              className="inline-block bg-[#c9a84c]/20 border border-[#c9a84c]/40 text-[#c9a84c] text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-5"
            >
              Start Your Search
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-5 leading-tight"
            >
              Ready to Find Your Neighborhood?
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-white/70 text-lg leading-relaxed mb-10 max-w-xl mx-auto"
            >
              Our local experts know every street, school, and hidden gem in
              Maplewood. Let us help you find the community that feels like
              home.
            </motion.p>
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                href="/listings"
                className="inline-flex items-center gap-2 bg-[#c9a84c] hover:bg-[#b8943e] text-white font-semibold px-8 py-3.5 rounded-xl shadow-lg transition-all duration-200"
              >
                <Home size={18} />
                Browse All Listings
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border-2 border-white/40 hover:border-white text-white font-semibold px-8 py-3.5 rounded-xl transition-all duration-200 hover:bg-white/10"
              >
                Talk to an Agent
                <ArrowRight size={18} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
