"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Trash2, GitCompare, Bed, Bath, Square, MapPin, X, ArrowRight, BookmarkX } from 'lucide-react';
import { fadeInUp, staggerContainer, scaleIn } from "@/lib/motion";
import { BRAND } from "@/lib/data";

// ─── Types ────────────────────────────────────────────────────────────────────
type SavedProperty = {
  id: string;
  title: string;
  address: string;
  city: string;
  price: number;
  priceType: "sale" | "rent";
  beds: number;
  baths: number;
  sqft: number;
  type: string;
  image: string;
};

// ─── Seed Data ────────────────────────────────────────────────────────────────
const SEED_FAVORITES: SavedProperty[] = [
  {
    id: "fav-1",
    title: "Sunlit Craftsman on Maple Hill",
    address: "214 Maple Hill Drive",
    city: "Maplewood",
    price: 875000,
    priceType: "sale",
    beds: 4,
    baths: 3,
    sqft: 2640,
    type: "house",
    image:
      "https://img.peerspace.com/image/upload/f_auto,q_auto,dpr_auto,w_3840/cnl0uk8mwprj4falgoqt",
  },
  {
    id: "fav-2",
    title: "Modern Harbor View Condo",
    address: "88 Harborside Blvd, Unit 12A",
    city: "Maplewood",
    price: 549000,
    priceType: "sale",
    beds: 2,
    baths: 2,
    sqft: 1180,
    type: "condo",
    image:
      "https://landcast-nwmls-listing-images.s3.us-west-2.amazonaws.com/2518966/2518966_02.webp",
  },
];

const LS_KEY = "hv_favorites";

// ─── Helpers ──────────────────────────────────────────────────────────────────
function formatPrice(price: number, priceType: "sale" | "rent"): string {
  const formatted = price.toLocaleString("en-US");
  return priceType === "rent" ? `$${formatted}/mo` : `$${formatted}`;
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<SavedProperty[]>([]);
  const [compareList, setCompareList] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [showComparison, setShowComparison] = useState(false);
  const comparisonRef = useRef<HTMLDivElement>(null);

  // ── Load from localStorage on mount ──────────────────────────────────────
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) {
        const parsed: SavedProperty[] = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setFavorites(parsed);
        } else {
          setFavorites(SEED_FAVORITES);
          localStorage.setItem(LS_KEY, JSON.stringify(SEED_FAVORITES));
        }
      } else {
        setFavorites(SEED_FAVORITES);
        localStorage.setItem(LS_KEY, JSON.stringify(SEED_FAVORITES));
      }
    } catch {
      setFavorites(SEED_FAVORITES);
    }
    setIsLoaded(true);
  }, []);

  // ── Toast auto-dismiss ────────────────────────────────────────────────────
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  // ── Actions ───────────────────────────────────────────────────────────────
  function removeFavorite(id: string) {
    const updated = favorites.filter((p) => p.id !== id);
    setFavorites(updated);
    localStorage.setItem(LS_KEY, JSON.stringify(updated));
    setCompareList((prev) => prev.filter((cid) => cid !== id));
  }

  function toggleCompare(id: string) {
    setCompareList((prev) => {
      if (prev.includes(id)) return prev.filter((cid) => cid !== id);
      if (prev.length >= 3) {
        setToast("You can compare up to 3 properties at a time.");
        return prev;
      }
      return [...prev, id];
    });
    setShowComparison(false);
  }

  function clearAll() {
    setFavorites([]);
    setCompareList([]);
    setShowComparison(false);
    localStorage.setItem(LS_KEY, JSON.stringify([]));
  }

  function handleCompareNow() {
    setShowComparison(true);
    setTimeout(() => {
      comparisonRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }

  const compareProperties = favorites.filter((p) => compareList.includes(p.id));

  return (
    <div className="bg-[#f5f5f0] min-h-screen">
      {/* ── Toast ─────────────────────────────────────────────────────────── */}
      {toast && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-[#1a3c5e] text-white px-6 py-3 rounded-xl shadow-xl text-sm font-medium flex items-center gap-3">
          <span>{toast}</span>
          <button onClick={() => setToast(null)} aria-label="Dismiss">
            <X size={16} />
          </button>
        </div>
      )}

      {/* ── 1. HERO ───────────────────────────────────────────────────────── */}
      <section className="bg-[#1a3c5e] text-white py-20">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <motion.span
            variants={fadeInUp}
            className="inline-flex items-center gap-2 bg-[#c9a84c]/20 text-[#c9a84c] text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-6"
          >
            <Heart size={14} />
            My Collection
          </motion.span>
          <motion.h1
            variants={fadeInUp}
            className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight mb-5"
          >
            Saved Properties
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-white/70 text-lg leading-relaxed max-w-xl mx-auto mb-8"
          >
            Your personally curated collection of homes from {BRAND.name}. Review, compare, and take the next step toward your perfect property.
          </motion.p>
          {isLoaded && (
            <motion.div variants={fadeInUp}>
              <span className="inline-block bg-white/10 border border-white/20 text-white text-sm font-semibold px-5 py-2 rounded-full">
                {favorites.length} {favorites.length === 1 ? "property" : "properties"} saved
              </span>
            </motion.div>
          )}
        </motion.div>
      </section>

      {/* ── 2. TOOLBAR ────────────────────────────────────────────────────── */}
      <div className="bg-white border-b border-black/8 sticky top-[72px] z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            <p className="text-[#1a3c5e] font-semibold text-sm">
              {isLoaded ? (
                <>{favorites.length} saved {favorites.length === 1 ? "property" : "properties"}</>
              ) : (
                <span className="inline-block w-32 h-4 bg-gray-200 rounded animate-pulse" />
              )}
            </p>
            {isLoaded && favorites.length > 0 && (
              <button
                onClick={clearAll}
                className="text-xs font-semibold text-red-500 border border-red-300 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors duration-200"
              >
                Clear All
              </button>
            )}
          </div>
          <button
            onClick={handleCompareNow}
            disabled={compareList.length < 2}
            className={`flex items-center gap-2 text-sm font-semibold px-5 py-2 rounded-xl transition-all duration-200 ${
              compareList.length >= 2
                ? "bg-[#c9a84c] text-white hover:bg-[#b8943e] shadow-sm"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            <GitCompare size={16} />
            Compare Selected ({compareList.length}/3)
          </button>
        </div>
      </div>

      {/* ── 3. FAVORITES GRID ─────────────────────────────────────────────── */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {!isLoaded ? (
            // Skeleton
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-2xl shadow-md overflow-hidden animate-pulse">
                  <div className="h-52 bg-gray-200" />
                  <div className="p-5 space-y-3">
                    <div className="h-5 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                    <div className="h-6 bg-gray-200 rounded w-1/3" />
                    <div className="h-4 bg-gray-200 rounded w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : favorites.length === 0 ? (
            // Empty State
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="flex flex-col items-center justify-center py-24 text-center"
            >
              <div className="w-24 h-24 rounded-full bg-[#1a3c5e]/10 flex items-center justify-center mb-6">
                <BookmarkX size={40} className="text-[#1a3c5e]/40" />
              </div>
              <h2 className="font-serif text-2xl font-bold text-[#1a3c5e] mb-3">
                No saved properties yet
              </h2>
              <p className="text-gray-500 text-base max-w-sm mb-8">
                Start browsing listings and click the heart icon to save properties you love. They will appear here for easy access.
              </p>
              <Link
                href="/listings"
                className="inline-flex items-center gap-2 bg-[#c9a84c] text-white font-semibold px-7 py-3 rounded-xl hover:bg-[#b8943e] transition-colors duration-200 shadow-sm"
              >
                Browse Listings
                <ArrowRight size={18} />
              </Link>
            </motion.div>
          ) : (
            // Property Grid
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {favorites.map((property) => {
                const isComparing = compareList.includes(property.id);
                return (
                  <motion.div
                    key={property.id}
                    variants={scaleIn}
                    className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
                  >
                    {/* Image */}
                    <div className="relative h-52 overflow-hidden">
                      <img
                        src={property.image}
                        alt={property.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src =
                            "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80";
                        }}
                      />
                      <div className="absolute top-3 left-3">
                        <span
                          className={`text-xs font-bold px-3 py-1 rounded-full ${
                            property.priceType === "rent"
                              ? "bg-blue-600 text-white"
                              : "bg-[#c9a84c] text-white"
                          }`}
                        >
                          {property.priceType === "rent" ? "For Rent" : "For Sale"}
                        </span>
                      </div>
                      {/* Compare toggle */}
                      <button
                        onClick={() => toggleCompare(property.id)}
                        aria-label={isComparing ? "Remove from compare" : "Add to compare"}
                        className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 shadow ${
                          isComparing
                            ? "bg-[#c9a84c] text-white"
                            : "bg-white/90 text-gray-500 hover:bg-[#c9a84c] hover:text-white"
                        }`}
                      >
                        <GitCompare size={15} />
                      </button>
                    </div>

                    {/* Card Body */}
                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="font-serif font-semibold text-[#1a3c5e] text-lg leading-snug mb-1.5">
                        {property.title}
                      </h3>
                      <div className="flex items-center gap-1.5 text-gray-500 text-sm mb-3">
                        <MapPin size={13} className="flex-shrink-0" />
                        <span className="truncate">
                          {property.address}, {property.city}
                        </span>
                      </div>

                      {/* Price */}
                      <p className="text-[#c9a84c] font-bold text-xl mb-4">
                        {formatPrice(property.price, property.priceType)}
                      </p>

                      {/* Stats */}
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-5">
                        <span className="flex items-center gap-1">
                          <Bed size={14} className="text-[#1a3c5e]" />
                          {property.beds} bd
                        </span>
                        <span className="flex items-center gap-1">
                          <Bath size={14} className="text-[#1a3c5e]" />
                          {property.baths} ba
                        </span>
                        <span className="flex items-center gap-1">
                          <Square size={14} className="text-[#1a3c5e]" />
                          {property.sqft.toLocaleString("en-US")} sqft
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 mt-auto">
                        <Link
                          href="/property-detail"
                          className="flex-1 text-center text-sm font-semibold bg-[#c9a84c] text-white px-4 py-2 rounded-lg hover:bg-[#b8943e] transition-colors duration-200"
                        >
                          View Details
                        </Link>
                        <button
                          onClick={() => removeFavorite(property.id)}
                          aria-label="Remove from favorites"
                          className="w-9 h-9 flex items-center justify-center rounded-lg border border-red-200 text-red-400 hover:bg-red-50 hover:text-red-600 hover:border-red-400 transition-all duration-200"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </div>
      </section>

      {/* ── 4. COMPARE PANEL (sticky bottom bar) ──────────────────────────── */}
      {compareList.length >= 2 && (
        <div className="fixed bottom-0 left-0 right-0 bg-[#1a3c5e] text-white py-4 px-6 z-40 shadow-2xl">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <span className="font-semibold text-sm">
                Comparing {compareList.length} properties:
              </span>
              <div className="flex flex-wrap gap-2">
                {compareProperties.map((p) => (
                  <span
                    key={p.id}
                    className="bg-white/15 text-white text-xs px-3 py-1 rounded-full border border-white/20"
                  >
                    {p.title}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <button
                onClick={handleCompareNow}
                className="bg-[#c9a84c] hover:bg-[#b8943e] text-white text-sm font-semibold px-5 py-2 rounded-xl transition-colors duration-200"
              >
                Compare Now
              </button>
              <button
                onClick={() => {
                  setCompareList([]);
                  setShowComparison(false);
                }}
                className="border border-white/40 hover:bg-white/10 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors duration-200"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── 5. COMPARISON TABLE ───────────────────────────────────────────── */}
      {showComparison && compareProperties.length >= 2 && (
        <section
          ref={comparisonRef}
          className="bg-white py-14 border-t border-black/8"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="mb-10 flex items-center justify-between"
            >
              <div>
                <span className="text-[#c9a84c] text-xs font-semibold tracking-widest uppercase">
                  Side by Side
                </span>
                <h2 className="font-serif text-3xl font-bold text-[#1a3c5e] mt-1">
                  Property Comparison
                </h2>
              </div>
              <button
                onClick={() => setShowComparison(false)}
                className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-red-500 transition-colors duration-200"
              >
                <X size={16} /> Close
              </button>
            </motion.div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-500 uppercase tracking-wide w-32 bg-[#f5f5f0] rounded-tl-xl">Feature</th>
                    {compareProperties.map((p) => (
                      <th
                        key={p.id}
                        className="py-3 px-4 text-left bg-[#f5f5f0] border-l border-white"
                      >
                        <p className="font-serif font-bold text-[#1a3c5e] text-base leading-snug">
                          {p.title}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">{p.city}</p>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      label: "Price",
                      render: (p: SavedProperty) => (
                        <span className="text-[#c9a84c] font-bold text-lg">
                          {formatPrice(p.price, p.priceType)}
                        </span>
                      ),
                    },
                    {
                      label: "Type",
                      render: (p: SavedProperty) => (
                        <span className="capitalize">{p.type}</span>
                      ),
                    },
                    {
                      label: "Bedrooms",
                      render: (p: SavedProperty) => (
                        <span className="flex items-center gap-1.5">
                          <Bed size={15} className="text-[#1a3c5e]" />
                          {p.beds}
                        </span>
                      ),
                    },
                    {
                      label: "Bathrooms",
                      render: (p: SavedProperty) => (
                        <span className="flex items-center gap-1.5">
                          <Bath size={15} className="text-[#1a3c5e]" />
                          {p.baths}
                        </span>
                      ),
                    },
                    {
                      label: "Sq Ft",
                      render: (p: SavedProperty) => (
                        <span className="flex items-center gap-1.5">
                          <Square size={15} className="text-[#1a3c5e]" />
                          {p.sqft.toLocaleString("en-US")}
                        </span>
                      ),
                    },
                    {
                      label: "City",
                      render: (p: SavedProperty) => (
                        <span className="flex items-center gap-1.5">
                          <MapPin size={15} className="text-[#1a3c5e]" />
                          {p.city}
                        </span>
                      ),
                    },
                    {
                      label: "Details",
                      render: (_p: SavedProperty) => (
                        <Link
                          href="/property-detail"
                          className="inline-flex items-center gap-1 text-sm font-semibold text-[#c9a84c] hover:underline"
                        >
                          View <ArrowRight size={14} />
                        </Link>
                      ),
                    },
                  ].map((row, rowIdx) => (
                    <tr
                      key={row.label}
                      className={rowIdx % 2 === 0 ? "bg-white" : "bg-[#f5f5f0]/60"}
                    >
                      <td className="py-4 px-4 text-sm font-semibold text-gray-600 border-r border-black/5">
                        {row.label}
                      </td>
                      {compareProperties.map((p) => (
                        <td
                          key={p.id}
                          className="py-4 px-4 text-sm text-[#1a3c5e] border-l border-black/5"
                        >
                          {row.render(p)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* ── 6. CTA ────────────────────────────────────────────────────────── */}
      <section
        className={`bg-[#1a3c5e] text-white py-16 ${
          compareList.length >= 2 ? "pb-28" : ""
        }`}
      >
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <motion.span
            variants={fadeInUp}
            className="inline-block text-[#c9a84c] text-xs font-semibold tracking-widest uppercase mb-4"
          >
            Keep Exploring
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="font-serif text-3xl sm:text-4xl font-bold tracking-tight mb-5"
          >
            Discover More Properties
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-white/70 text-lg leading-relaxed mb-8"
          >
            Hundreds of curated listings across Maplewood, Harborside, and Riverside are waiting for you. Your perfect home might be just one search away.
          </motion.p>
          <motion.div variants={fadeInUp}>
            <Link
              href="/listings"
              className="inline-flex items-center gap-2 bg-[#c9a84c] text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-[#b8943e] transition-colors duration-200 shadow-lg"
            >
              Browse All Listings
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
