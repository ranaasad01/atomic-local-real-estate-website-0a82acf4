"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, X, ChevronDown, Bed, Bath, Square, MapPin, Heart, ArrowUpDown } from 'lucide-react';
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";
import { useTranslations } from "next-intl";

// ─── Inline Mock Data ──────────────────────────────────────────────────────────
type Property = {
  id: string;
  title: string;
  address: string;
  city: string;
  neighborhood: string;
  price: number;
  priceType: "sale" | "rent";
  beds: number;
  baths: number;
  sqft: number;
  type: "house" | "condo" | "townhouse" | "land";
  featured: boolean;
  image: string;
  yearBuilt: number;
  garage: number;
  lotSize: string;
};

const ALL_PROPERTIES: Property[] = [
  {
    id: "p1",
    title: "Sunlit Craftsman on Maple Hill",
    address: "214 Maple Hill Drive",
    city: "Maplewood",
    neighborhood: "Maplewood Heights",
    price: 875000,
    priceType: "sale",
    beds: 4,
    baths: 3,
    sqft: 2640,
    type: "house",
    featured: true,
    image: "https://img.peerspace.com/image/upload/f_auto,q_auto,dpr_auto,w_3840/cnl0uk8mwprj4falgoqt",
    yearBuilt: 2008,
    garage: 2,
    lotSize: "0.28 ac",
  },
  {
    id: "p2",
    title: "Modern Harbor View Condo",
    address: "88 Harborside Blvd, Unit 12A",
    city: "Maplewood",
    neighborhood: "Harborside District",
    price: 549000,
    priceType: "sale",
    beds: 2,
    baths: 2,
    sqft: 1180,
    type: "condo",
    featured: true,
    image: "https://landcast-nwmls-listing-images.s3.us-west-2.amazonaws.com/2518966/2518966_02.webp",
    yearBuilt: 2019,
    garage: 1,
    lotSize: "N/A",
  },
  {
    id: "p3",
    title: "Riverside Townhouse with Patio",
    address: "33 Riverside Commons Lane",
    city: "Maplewood",
    neighborhood: "Riverside Commons",
    price: 3200,
    priceType: "rent",
    beds: 3,
    baths: 2,
    sqft: 1750,
    type: "townhouse",
    featured: false,
    image: "https://photos.zillowstatic.com/fp/719fba7ead59e8a7eed15bc6f58fb998-p_e.webp",
    yearBuilt: 2015,
    garage: 1,
    lotSize: "0.08 ac",
  },
  {
    id: "p4",
    title: "Elegant Colonial in Elmwood",
    address: "507 Elmwood Court",
    city: "Elmwood",
    neighborhood: "Elmwood Estates",
    price: 1250000,
    priceType: "sale",
    beds: 5,
    baths: 4,
    sqft: 4100,
    type: "house",
    featured: true,
    image: "https://patch.com/img/cdn/users/52627/2013/01/raw/d24ba18677f7abcaca898d7b95489f51.jpg",
    yearBuilt: 2003,
    garage: 3,
    lotSize: "0.55 ac",
  },
  {
    id: "p5",
    title: "Downtown Studio Loft",
    address: "19 Commerce Street, Unit 4B",
    city: "Maplewood",
    neighborhood: "Downtown Core",
    price: 1850,
    priceType: "rent",
    beds: 1,
    baths: 1,
    sqft: 620,
    type: "condo",
    featured: false,
    image: "https://img.peerspace.com/image/upload/f_auto,q_auto,dpr_auto,w_3840/u3jezgyhrwyr1hgier8z",
    yearBuilt: 2021,
    garage: 0,
    lotSize: "N/A",
  },
  {
    id: "p6",
    title: "Charming Bungalow Near Park",
    address: "72 Greenfield Avenue",
    city: "Maplewood",
    neighborhood: "Greenfield",
    price: 620000,
    priceType: "sale",
    beds: 3,
    baths: 2,
    sqft: 1480,
    type: "house",
    featured: false,
    image: "https://media.vrbo.com/lodging/28000000/27670000/27667800/27667785/722125bb.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill",
    yearBuilt: 1998,
    garage: 1,
    lotSize: "0.18 ac",
  },
  {
    id: "p7",
    title: "Luxury Penthouse with Skyline Views",
    address: "1 Harbor Tower, PH3",
    city: "Maplewood",
    neighborhood: "Harborside District",
    price: 2100000,
    priceType: "sale",
    beds: 3,
    baths: 3,
    sqft: 3200,
    type: "condo",
    featured: true,
    image: "https://cloudfront-us-east-1.images.arcpublishing.com/christies/KM4UIYNTDVBKHL6QCH3AQ5BEY4.png",
    yearBuilt: 2022,
    garage: 2,
    lotSize: "N/A",
  },
  {
    id: "p8",
    title: "Spacious Family Home in Crestwood",
    address: "318 Crestwood Drive",
    city: "Crestwood",
    neighborhood: "Crestwood Hills",
    price: 4500,
    priceType: "rent",
    beds: 4,
    baths: 3,
    sqft: 2900,
    type: "house",
    featured: false,
    image: "https://photos.zillowstatic.com/fp/917ddd440a248ac6a9ce622fe71174ba-cc_ft_960.jpg",
    yearBuilt: 2011,
    garage: 2,
    lotSize: "0.35 ac",
  },
  {
    id: "p9",
    title: "Vacant Corner Lot — Build Your Dream",
    address: "Lot 14, Sunrise Ridge Road",
    city: "Elmwood",
    neighborhood: "Sunrise Ridge",
    price: 295000,
    priceType: "sale",
    beds: 0,
    baths: 0,
    sqft: 0,
    type: "land",
    featured: false,
    image: "https://www.theplancollection.com/_next/image?url=https%3A%2F%2Fwww.theplancollection.com%2FUpload%2FPlanImages%2Fblog_images%2FArticleImage_30_3_2023_12_54_11.png&w=1920&q=75",
    yearBuilt: 0,
    garage: 0,
    lotSize: "0.62 ac",
  },
  {
    id: "p10",
    title: "Mid-Century Modern Gem",
    address: "88 Walnut Grove Terrace",
    city: "Maplewood",
    neighborhood: "Walnut Grove",
    price: 780000,
    priceType: "sale",
    beds: 3,
    baths: 2,
    sqft: 1920,
    type: "house",
    featured: false,
    image: "https://media.vrbo.com/lodging/35000000/34350000/34341200/34341118/a42c8978.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill",
    yearBuilt: 1967,
    garage: 1,
    lotSize: "0.22 ac",
  },
  {
    id: "p11",
    title: "Cozy Townhouse in Riverside",
    address: "55 Riverside Commons Lane",
    city: "Maplewood",
    neighborhood: "Riverside Commons",
    price: 2800,
    priceType: "rent",
    beds: 2,
    baths: 2,
    sqft: 1340,
    type: "townhouse",
    featured: false,
    image: "/images/cozy-townhouse-riverside-commons.jpg",
    yearBuilt: 2014,
    garage: 1,
    lotSize: "0.06 ac",
  },
  {
    id: "p12",
    title: "New Construction — Harborview Estates",
    address: "9 Harborview Estates Blvd",
    city: "Maplewood",
    neighborhood: "Harborside District",
    price: 1450000,
    priceType: "sale",
    beds: 5,
    baths: 5,
    sqft: 4800,
    type: "house",
    featured: true,
    image: "/images/new-construction-harborview-estates.jpg",
    yearBuilt: 2024,
    garage: 3,
    lotSize: "0.48 ac",
  },
];

const NEIGHBORHOODS = [
  "All Neighborhoods",
  "Maplewood Heights",
  "Harborside District",
  "Riverside Commons",
  "Elmwood Estates",
  "Downtown Core",
  "Greenfield",
  "Crestwood Hills",
  "Walnut Grove",
  "Sunrise Ridge",
];

const PRICE_RANGES_SALE = [
  { label: "Any Price", min: 0, max: Infinity },
  { label: "Under $500K", min: 0, max: 500000 },
  { label: "$500K – $800K", min: 500000, max: 800000 },
  { label: "$800K – $1.2M", min: 800000, max: 1200000 },
  { label: "$1.2M – $2M", min: 1200000, max: 2000000 },
  { label: "Over $2M", min: 2000000, max: Infinity },
];

const PRICE_RANGES_RENT = [
  { label: "Any Price", min: 0, max: Infinity },
  { label: "Under $2,000/mo", min: 0, max: 2000 },
  { label: "$2,000 – $3,500/mo", min: 2000, max: 3500 },
  { label: "$3,500 – $5,000/mo", min: 3500, max: 5000 },
  { label: "Over $5,000/mo", min: 5000, max: Infinity },
];

const SORT_OPTIONS = [
  { label: "Newest First", value: "newest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Largest First", value: "sqft-desc" },
  { label: "Featured First", value: "featured" },
];

type Filters = {
  search: string;
  neighborhood: string;
  priceType: "all" | "sale" | "rent";
  priceRangeIndex: number;
  type: "all" | "house" | "condo" | "townhouse" | "land";
  minBeds: number;
  minBaths: number;
};

function formatPrice(price: number, priceType: "sale" | "rent"): string {
  if (priceType === "rent") {
    return `$${price.toLocaleString("en-US")}/mo`;
  }
  if (price >= 1000000) {
    return `$${(price / 1000000).toFixed(price % 1000000 === 0 ? 0 : 2)}M`;
  }
  return `$${price.toLocaleString("en-US")}`;
}

function PropertyCard({ property, index }: { property: Property; index: number }) {
  const [saved, setSaved] = useState(false);

  const typeLabel: Record<Property["type"], string> = {
    house: "House",
    condo: "Condo",
    townhouse: "Townhouse",
    land: "Land",
  };

  return (
    <motion.div
      variants={scaleIn}
      whileHover={{ y: -4, transition: { duration: 0.2, ease: "easeOut" } }}
      className="group bg-white rounded-2xl overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.10)] border border-black/5 flex flex-col"
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              "/images/house-exterior-placeholder.jpg";
          }}
        />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span
            className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
              property.priceType === "sale"
                ? "bg-[#1a3c5e] text-white"
                : "bg-[#c9a84c] text-white"
            }`}
          >
            {property.priceType === "sale" ? "For Sale" : "For Rent"}
          </span>
          {property.featured && (
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-white/90 text-[#c9a84c] border border-[#c9a84c]/30">
              Featured
            </span>
          )}
        </div>
        {/* Save button */}
        <button
          onClick={() => setSaved((s) => !s)}
          aria-label={saved ? "Remove from saved" : "Save property"}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm hover:bg-white transition-colors duration-200"
        >
          <Heart
            size={15}
            className={`transition-colors duration-200 ${
              saved ? "fill-rose-500 text-rose-500" : "text-gray-400"
            }`}
          />
        </button>
        {/* Type pill */}
        <div className="absolute bottom-3 right-3">
          <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-black/40 backdrop-blur-sm text-white">
            {typeLabel[property.type]}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-serif font-semibold text-[#1a3c5e] text-base leading-snug line-clamp-2 flex-1">
            {property.title}
          </h3>
        </div>
        <div className="flex items-center gap-1 text-gray-500 text-xs mb-3">
          <MapPin size={11} className="shrink-0 text-[#c9a84c]" />
          <span className="truncate">{property.neighborhood}, {property.city}</span>
        </div>

        {/* Stats */}
        {property.type !== "land" ? (
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
            {property.beds > 0 && (
              <span className="flex items-center gap-1">
                <Bed size={13} className="text-[#c9a84c]" />
                {property.beds} bd
              </span>
            )}
            {property.baths > 0 && (
              <span className="flex items-center gap-1">
                <Bath size={13} className="text-[#c9a84c]" />
                {property.baths} ba
              </span>
            )}
            {property.sqft > 0 && (
              <span className="flex items-center gap-1">
                <Square size={13} className="text-[#c9a84c]" />
                {property.sqft.toLocaleString("en-US")} sf
              </span>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-1 text-sm text-gray-600 mb-4">
            <Square size={13} className="text-[#c9a84c]" />
            <span>Lot: {property.lotSize}</span>
          </div>
        )}

        <div className="mt-auto flex items-center justify-between">
          <span className="font-serif font-bold text-xl text-[#1a3c5e]">
            {formatPrice(property.price, property.priceType)}
          </span>
          <Link
            href={`/listings/${property.id}`}
            className="px-4 py-2 bg-[#1a3c5e] text-white text-xs font-semibold rounded-xl hover:bg-[#c9a84c] transition-colors duration-200"
          >
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default function ListingsPage() {
  const t = useTranslations();

  const [filters, setFilters] = useState<Filters>({
    search: "",
    neighborhood: "All Neighborhoods",
    priceType: "all",
    priceRangeIndex: 0,
    type: "all",
    minBeds: 0,
    minBaths: 0,
  });

  const [sortValue, setSortValue] = useState("featured");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const priceRanges =
    filters.priceType === "rent" ? PRICE_RANGES_RENT : PRICE_RANGES_SALE;

  const updateFilter = <K extends keyof Filters>(key: K, value: Filters[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  // Reset price range when priceType changes
  const handlePriceTypeChange = (val: Filters["priceType"]) => {
    setFilters((prev) => ({ ...prev, priceType: val, priceRangeIndex: 0 }));
  };

  const filtered = useMemo(() => {
    let result = ALL_PROPERTIES.filter((p) => {
      // Search
      if (filters.search.trim()) {
        const q = filters.search.toLowerCase();
        if (
          !p.title.toLowerCase().includes(q) &&
          !p.address.toLowerCase().includes(q) &&
          !p.neighborhood.toLowerCase().includes(q) &&
          !p.city.toLowerCase().includes(q)
        ) {
          return false;
        }
      }
      // Neighborhood
      if (
        filters.neighborhood !== "All Neighborhoods" &&
        p.neighborhood !== filters.neighborhood
      ) {
        return false;
      }
      // Price type
      if (filters.priceType !== "all" && p.priceType !== filters.priceType) {
        return false;
      }
      // Price range
      const ranges =
        p.priceType === "rent" ? PRICE_RANGES_RENT : PRICE_RANGES_SALE;
      const rangeIdx =
        p.priceType === filters.priceType || filters.priceType === "all"
          ? filters.priceRangeIndex
          : 0;
      const range = ranges[Math.min(rangeIdx, ranges.length - 1)];
      if (range && range.min > 0 && p.price < range.min) return false;
      if (range && range.max !== Infinity && p.price > range.max) return false;
      // Type
      if (filters.type !== "all" && p.type !== filters.type) return false;
      // Beds
      if (filters.minBeds > 0 && p.beds < filters.minBeds) return false;
      // Baths
      if (filters.minBaths > 0 && p.baths < filters.minBaths) return false;
      return true;
    });

    // Sort
    switch (sortValue) {
      case "price-asc":
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case "sqft-desc":
        result = [...result].sort((a, b) => b.sqft - a.sqft);
        break;
      case "newest":
        result = [...result].sort((a, b) => b.yearBuilt - a.yearBuilt);
        break;
      case "featured":
        result = [...result].sort((a, b) =>
          a.featured === b.featured ? 0 : a.featured ? -1 : 1
        );
        break;
    }

    return result;
  }, [filters, sortValue]);

  // Active filter chips
  const activeChips: { label: string; onRemove: () => void }[] = [];
  if (filters.search.trim()) {
    activeChips.push({
      label: `"${filters.search.trim()}"`,
      onRemove: () => updateFilter("search", ""),
    });
  }
  if (filters.neighborhood !== "All Neighborhoods") {
    activeChips.push({
      label: filters.neighborhood,
      onRemove: () => updateFilter("neighborhood", "All Neighborhoods"),
    });
  }
  if (filters.priceType !== "all") {
    activeChips.push({
      label: filters.priceType === "sale" ? "For Sale" : "For Rent",
      onRemove: () => handlePriceTypeChange("all"),
    });
  }
  if (filters.priceRangeIndex > 0) {
    const ranges =
      filters.priceType === "rent" ? PRICE_RANGES_RENT : PRICE_RANGES_SALE;
    const range = ranges[filters.priceRangeIndex];
    if (range) {
      activeChips.push({
        label: range.label,
        onRemove: () => updateFilter("priceRangeIndex", 0),
      });
    }
  }
  if (filters.type !== "all") {
    activeChips.push({
      label: filters.type.charAt(0).toUpperCase() + filters.type.slice(1),
      onRemove: () => updateFilter("type", "all"),
    });
  }
  if (filters.minBeds > 0) {
    activeChips.push({
      label: `${filters.minBeds}+ Beds`,
      onRemove: () => updateFilter("minBeds", 0),
    });
  }
  if (filters.minBaths > 0) {
    activeChips.push({
      label: `${filters.minBaths}+ Baths`,
      onRemove: () => updateFilter("minBaths", 0),
    });
  }

  const clearAll = () => {
    setFilters({
      search: "",
      neighborhood: "All Neighborhoods",
      priceType: "all",
      priceRangeIndex: 0,
      type: "all",
      minBeds: 0,
      minBaths: 0,
    });
  };

  const FilterSidebar = () => (
    <div className="space-y-7">
      {/* Search */}
      <div>
        <label className="block text-xs font-semibold text-[#1a3c5e] uppercase tracking-wider mb-2">
          Search
        </label>
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Address, neighborhood..."
            value={filters.search}
            onChange={(e) => updateFilter("search", e.target.value)}
            className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c9a84c]/40 focus:border-[#c9a84c] transition-all"
          />
        </div>
      </div>

      {/* Listing Type */}
      <div>
        <label className="block text-xs font-semibold text-[#1a3c5e] uppercase tracking-wider mb-2">
          Listing Type
        </label>
        <div className="flex gap-2">
          {(["all", "sale", "rent"] as const).map((val) => (
            <button
              key={val}
              onClick={() => handlePriceTypeChange(val)}
              className={`flex-1 py-2 text-xs font-semibold rounded-xl border transition-all duration-200 ${
                filters.priceType === val
                  ? "bg-[#1a3c5e] text-white border-[#1a3c5e]"
                  : "bg-white text-gray-600 border-gray-200 hover:border-[#1a3c5e]/40"
              }`}
            >
              {val === "all" ? "All" : val === "sale" ? "For Sale" : "For Rent"}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <label className="block text-xs font-semibold text-[#1a3c5e] uppercase tracking-wider mb-2">
          Price Range
        </label>
        <div className="space-y-1.5">
          {priceRanges.map((range, idx) => (
            <button
              key={range.label}
              onClick={() => updateFilter("priceRangeIndex", idx)}
              className={`w-full text-left px-3 py-2 text-sm rounded-xl transition-all duration-200 ${
                filters.priceRangeIndex === idx
                  ? "bg-[#c9a84c]/10 text-[#c9a84c] font-semibold border border-[#c9a84c]/30"
                  : "text-gray-600 hover:bg-gray-50 border border-transparent"
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {/* Property Type */}
      <div>
        <label className="block text-xs font-semibold text-[#1a3c5e] uppercase tracking-wider mb-2">
          Property Type
        </label>
        <div className="grid grid-cols-2 gap-2">
          {(["all", "house", "condo", "townhouse", "land"] as const).map((val) => (
            <button
              key={val}
              onClick={() => updateFilter("type", val)}
              className={`py-2 text-xs font-semibold rounded-xl border transition-all duration-200 ${
                filters.type === val
                  ? "bg-[#1a3c5e] text-white border-[#1a3c5e]"
                  : "bg-white text-gray-600 border-gray-200 hover:border-[#1a3c5e]/40"
              }`}
            >
              {val === "all"
                ? "All Types"
                : val.charAt(0).toUpperCase() + val.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Bedrooms */}
      <div>
        <label className="block text-xs font-semibold text-[#1a3c5e] uppercase tracking-wider mb-2">
          Min. Bedrooms
        </label>
        <div className="flex gap-2">
          {[0, 1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              onClick={() => updateFilter("minBeds", n)}
              className={`flex-1 py-2 text-xs font-semibold rounded-xl border transition-all duration-200 ${
                filters.minBeds === n
                  ? "bg-[#1a3c5e] text-white border-[#1a3c5e]"
                  : "bg-white text-gray-600 border-gray-200 hover:border-[#1a3c5e]/40"
              }`}
            >
              {n === 0 ? "Any" : `${n}+`}
            </button>
          ))}
        </div>
      </div>

      {/* Bathrooms */}
      <div>
        <label className="block text-xs font-semibold text-[#1a3c5e] uppercase tracking-wider mb-2">
          Min. Bathrooms
        </label>
        <div className="flex gap-2">
          {[0, 1, 2, 3, 4].map((n) => (
            <button
              key={n}
              onClick={() => updateFilter("minBaths", n)}
              className={`flex-1 py-2 text-xs font-semibold rounded-xl border transition-all duration-200 ${
                filters.minBaths === n
                  ? "bg-[#1a3c5e] text-white border-[#1a3c5e]"
                  : "bg-white text-gray-600 border-gray-200 hover:border-[#1a3c5e]/40"
              }`}
            >
              {n === 0 ? "Any" : `${n}+`}
            </button>
          ))}
        </div>
      </div>

      {/* Neighborhood */}
      <div>
        <label className="block text-xs font-semibold text-[#1a3c5e] uppercase tracking-wider mb-2">
          Neighborhood
        </label>
        <div className="relative">
          <select
            value={filters.neighborhood}
            onChange={(e) => updateFilter("neighborhood", e.target.value)}
            className="w-full appearance-none px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c9a84c]/40 focus:border-[#c9a84c] bg-white transition-all pr-8"
          >
            {NEIGHBORHOODS.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
          <ChevronDown
            size={14}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
        </div>
      </div>

      {/* Clear All */}
      {activeChips.length > 0 && (
        <button
          onClick={clearAll}
          className="w-full py-2.5 text-sm font-semibold text-rose-500 border border-rose-200 rounded-xl hover:bg-rose-50 transition-all duration-200"
        >
          Clear All Filters
        </button>
      )}
    </div>
  );

  return (
    <main className="min-h-screen bg-[#f8f7f4]">
      {/* Page Header */}
      <motion.section
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="bg-[#1a3c5e] pt-32 pb-14 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div variants={fadeInUp} initial="hidden" animate="visible">
            <p className="text-[#c9a84c] text-sm font-semibold uppercase tracking-widest mb-3">
              Browse Properties
            </p>
            <h1 className="font-serif font-bold text-4xl md:text-5xl text-white tracking-tight text-balance mb-4">
              Find Your Perfect Home
            </h1>
            <p className="text-white/60 text-lg max-w-xl leading-relaxed">
              Explore every listing across Maplewood and surrounding communities. Filter by price, type, and neighborhood to find the right fit.
            </p>
          </motion.div>
        </div>
      </motion.section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex gap-8 items-start">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-72 shrink-0 sticky top-24">
            <div className="bg-white rounded-2xl p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.10)] border border-black/5">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-serif font-semibold text-[#1a3c5e] text-base">
                  Filters
                </h2>
                <SlidersHorizontal size={16} className="text-[#c9a84c]" />
              </div>
              <FilterSidebar />
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                {/* Mobile filter toggle */}
                <button
                  onClick={() => setSidebarOpen((o) => !o)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-[#1a3c5e] hover:border-[#c9a84c] transition-all duration-200 shadow-sm"
                >
                  <SlidersHorizontal size={15} />
                  Filters
                  {activeChips.length > 0 && (
                    <span className="w-5 h-5 rounded-full bg-[#c9a84c] text-white text-xs flex items-center justify-center font-bold">
                      {activeChips.length}
                    </span>
                  )}
                </button>
                <p className="text-sm text-gray-500">
                  <span className="font-semibold text-[#1a3c5e]">{filtered.length}</span>{" "}
                  {filtered.length === 1 ? "property" : "properties"} found
                </p>
              </div>

              {/* Sort */}
              <div className="relative">
                <ArrowUpDown
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />
                <select
                  value={sortValue}
                  onChange={(e) => setSortValue(e.target.value)}
                  className="appearance-none pl-8 pr-8 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c9a84c]/40 focus:border-[#c9a84c] bg-white transition-all font-medium text-[#1a3c5e]"
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={14}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />
              </div>
            </div>

            {/* Active Filter Chips */}
            <AnimatePresence>
              {activeChips.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex flex-wrap gap-2 mb-6"
                >
                  {activeChips.map((chip) => (
                    <motion.button
                      key={chip.label}
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.85 }}
                      onClick={chip.onRemove}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1a3c5e]/10 text-[#1a3c5e] text-xs font-semibold rounded-full border border-[#1a3c5e]/15 hover:bg-rose-50 hover:text-rose-500 hover:border-rose-200 transition-all duration-200"
                    >
                      {chip.label}
                      <X size={11} />
                    </motion.button>
                  ))}
                  <button
                    onClick={clearAll}
                    className="px-3 py-1.5 text-xs font-semibold text-gray-400 hover:text-rose-500 transition-colors duration-200"
                  >
                    Clear all
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Property Grid */}
            <AnimatePresence mode="wait">
              {filtered.length > 0 ? (
                <motion.div
                  key="grid"
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
                >
                  {filtered.map((property, index) => (
                    <PropertyCard key={property.id} property={property} index={index} />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  variants={fadeInUp}
                  initial="hidden"
                  animate="visible"
                  className="flex flex-col items-center justify-center py-24 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                    <Search size={24} className="text-gray-300" />
                  </div>
                  <h3 className="font-serif font-semibold text-[#1a3c5e] text-xl mb-2">
                    No properties found
                  </h3>
                  <p className="text-gray-500 text-sm max-w-xs leading-relaxed mb-6">
                    Try adjusting your filters or broadening your search to see more results.
                  </p>
                  <button
                    onClick={clearAll}
                    className="px-6 py-2.5 bg-[#c9a84c] text-white text-sm font-semibold rounded-xl hover:bg-[#b8943e] transition-colors duration-200"
                  >
                    Clear All Filters
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Drawer */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            />
            <motion.aside
              key="drawer"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              className="fixed top-0 left-0 bottom-0 w-80 bg-white z-50 overflow-y-auto lg:hidden shadow-2xl"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-serif font-semibold text-[#1a3c5e] text-base">
                    Filters
                  </h2>
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                    aria-label="Close filters"
                  >
                    <X size={15} />
                  </button>
                </div>
                <FilterSidebar />
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="w-full mt-8 py-3 bg-[#1a3c5e] text-white text-sm font-semibold rounded-xl hover:bg-[#c9a84c] transition-colors duration-200"
                >
                  Show {filtered.length} {filtered.length === 1 ? "Property" : "Properties"}
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}