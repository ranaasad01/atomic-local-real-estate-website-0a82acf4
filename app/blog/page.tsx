"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock, User, ArrowRight, BookOpen, TrendingUp, Home, MapPin, DollarSign, Tag } from 'lucide-react';
import { fadeInUp, fadeIn, staggerContainer, slideInLeft } from "@/lib/motion";
import { BRAND } from "@/lib/data";

// ─── Types ────────────────────────────────────────────────────────────────────
type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  authorAvatar: string;
  date: string;
  readTime: string;
  image: string;
  featured: boolean;
};

// ─── Mock Blog Data ───────────────────────────────────────────────────────────
const blogPosts: BlogPost[] = [
  {
    id: "bp-1",
    title: "Maplewood Home Prices Rise 8% in Q2 2024: What Buyers Need to Know",
    excerpt:
      "The Maplewood real estate market continues its upward trajectory, with median home prices climbing 8% year-over-year in the second quarter. We break down the neighborhoods driving growth and what it means for buyers entering the market this fall.",
    category: "Market Trends",
    author: "Sarah Whitmore",
    authorAvatar: "/images/real-estate-agent-woman-professional.jpg",
    date: "July 8, 2024",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
    featured: true,
  },
  {
    id: "bp-2",
    title: "10 Things First-Time Buyers Wish They Knew Before Closing",
    excerpt:
      "From hidden inspection red flags to the true cost of closing, first-time buyers often encounter surprises. Our agents share the ten most common lessons learned — and how to avoid them.",
    category: "Buying Tips",
    author: "Marcus Chen",
    authorAvatar: "/images/real-estate-agent-man-professional.jpg",
    date: "June 24, 2024",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&q=80",
    featured: false,
  },
  {
    id: "bp-3",
    title: "How to Price Your Home Right the First Time",
    excerpt:
      "Overpricing is the number-one mistake sellers make. Learn how comparative market analysis, staging, and strategic timing can help you attract serious buyers and close faster.",
    category: "Selling Tips",
    author: "Sarah Whitmore",
    authorAvatar: "/images/real-estate-agent-woman-professional.jpg",
    date: "June 15, 2024",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80",
    featured: false,
  },
  {
    id: "bp-4",
    title: "Harborside District Named One of California's Most Walkable Neighborhoods",
    excerpt:
      "A new livability index has ranked Harborside District among the top 20 most walkable neighborhoods in California. We explore what makes this waterfront community so desirable and what it means for property values.",
    category: "Local News",
    author: "Elena Vasquez",
    authorAvatar: "/images/real-estate-agent-woman-smiling.jpg",
    date: "June 5, 2024",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=80",
    featured: false,
  },
  {
    id: "bp-5",
    title: "Is Now a Good Time to Invest in Maplewood Rental Properties?",
    excerpt:
      "With rental demand at a five-year high and vacancy rates below 3%, Maplewood's rental market is attracting serious investors. We analyze cap rates, cash flow potential, and the neighborhoods offering the best returns.",
    category: "Investment",
    author: "Marcus Chen",
    authorAvatar: "/images/real-estate-agent-man-professional.jpg",
    date: "May 28, 2024",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    featured: false,
  },
  {
    id: "bp-6",
    title: "Understanding Mortgage Rate Locks: A Buyer's Guide",
    excerpt:
      "Interest rates can shift dramatically between pre-approval and closing. Here's everything you need to know about rate locks — how they work, when to use them, and how long they last.",
    category: "Buying Tips",
    author: "Elena Vasquez",
    authorAvatar: "/images/real-estate-agent-woman-smiling.jpg",
    date: "May 18, 2024",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
    featured: false,
  },
  {
    id: "bp-7",
    title: "Spring Staging Secrets That Add Thousands to Your Sale Price",
    excerpt:
      "Professional stagers reveal the low-cost improvements that consistently yield the highest returns — from curb appeal upgrades to decluttering strategies that make every room feel larger.",
    category: "Selling Tips",
    author: "Sarah Whitmore",
    authorAvatar: "/images/real-estate-agent-woman-professional.jpg",
    date: "May 10, 2024",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80",
    featured: false,
  },
  {
    id: "bp-8",
    title: "New Riverside Commons Community Center Opens This Fall",
    excerpt:
      "Maplewood's Riverside Commons neighborhood is getting a major amenity upgrade with the opening of a 12,000 sq ft community center featuring a gym, co-working space, and event hall.",
    category: "Local News",
    author: "Elena Vasquez",
    authorAvatar: "/images/real-estate-agent-woman-smiling.jpg",
    date: "April 30, 2024",
    readTime: "3 min read",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    featured: false,
  },
  {
    id: "bp-9",
    title: "Cap Rate vs. Cash-on-Cash Return: Which Metric Matters More?",
    excerpt:
      "Two of the most commonly cited investment metrics often confuse new real estate investors. We break down the difference, when each applies, and how to use both to evaluate Maplewood investment properties.",
    category: "Investment",
    author: "Marcus Chen",
    authorAvatar: "/images/real-estate-agent-man-professional.jpg",
    date: "April 20, 2024",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
    featured: false,
  },
];

const CATEGORIES = [
  "All",
  "Market Trends",
  "Buying Tips",
  "Selling Tips",
  "Local News",
  "Investment",
];

const categoryIcons: Record<string, React.ReactNode> = {
  "Market Trends": <TrendingUp size={14} />,
  "Buying Tips": <Home size={14} />,
  "Selling Tips": <DollarSign size={14} />,
  "Local News": <MapPin size={14} />,
  "Investment": <BookOpen size={14} />,
};

// ─── Page Component ───────────────────────────────────────────────────────────
export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const featuredPost = blogPosts.find((p) => p.featured);
  const nonFeaturedPosts = blogPosts.filter((p) => !p.featured);

  const filteredPosts =
    activeCategory === "All"
      ? nonFeaturedPosts
      : nonFeaturedPosts.filter((p) => p.category === activeCategory);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <main className="bg-white overflow-x-hidden">
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
            className="inline-flex items-center gap-2 bg-[#c9a84c]/20 text-[#c9a84c] text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-6"
          >
            <Tag size={12} />
            Market Insights &amp; News
          </motion.span>
          <motion.h1
            variants={fadeInUp}
            className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-balance leading-tight mb-6"
          >
            Real Estate Blog
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-white/75 text-lg leading-relaxed max-w-2xl mx-auto"
          >
            Stay ahead with expert analysis, buying tips, and local Maplewood market updates.
          </motion.p>
        </motion.div>
      </section>

      {/* ── 2. FEATURED ARTICLE ──────────────────────────────────────────────── */}
      {featuredPost && (
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_24px_-4px_rgba(0,0,0,0.12)] border border-black/5"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Image */}
              <div className="relative h-72 lg:h-auto overflow-hidden">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/10" />
                <span className="absolute top-4 left-4 bg-[#c9a84c] text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">
                  Featured
                </span>
              </div>

              {/* Content */}
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <span className="inline-flex items-center gap-1.5 text-[#c9a84c] text-xs font-semibold uppercase tracking-wider mb-4">
                  {categoryIcons[featuredPost.category]}
                  {featuredPost.category}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1a3c5e] leading-tight mb-4">
                  {featuredPost.title}
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  {featuredPost.excerpt}
                </p>

                {/* Author row */}
                <div className="flex items-center gap-3 mb-8">
                  <img
                    src={featuredPost.authorAvatar}
                    alt={featuredPost.author}
                    className="w-10 h-10 rounded-full object-cover border-2 border-[#c9a84c]/30"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://ui-avatars.com/api/?name=" +
                        encodeURIComponent(featuredPost.author) +
                        "&background=1a3c5e&color=fff";
                    }}
                  />
                  <div>
                    <p className="text-[#1a3c5e] font-semibold text-sm">{featuredPost.author}</p>
                    <div className="flex items-center gap-2 text-gray-400 text-xs">
                      <span className="flex items-center gap-1">
                        <Calendar size={11} />
                        {featuredPost.date}
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Clock size={11} />
                        {featuredPost.readTime}
                      </span>
                    </div>
                  </div>
                </div>

                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 bg-[#c9a84c] hover:bg-[#b8943e] text-white font-semibold text-sm px-6 py-3 rounded-xl transition-colors duration-200 w-fit"
                >
                  Read Article
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </motion.div>
        </section>
      )}

      {/* ── 3. CATEGORY FILTER ───────────────────────────────────────────────── */}
      <section className="pb-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap gap-2 justify-center"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 border ${
                activeCategory === cat
                  ? "bg-[#c9a84c] text-white border-[#c9a84c] shadow-sm"
                  : "bg-white text-[#1a3c5e] border-[#1a3c5e]/15 hover:border-[#c9a84c] hover:text-[#c9a84c]"
              }`}
            >
              {cat !== "All" && categoryIcons[cat]}
              {cat}
            </button>
          ))}
        </motion.div>
      </section>

      {/* ── 4. ARTICLES GRID ─────────────────────────────────────────────────── */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredPosts.length === 0 ? (
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="text-center py-20"
          >
            <p className="text-gray-400 text-lg">No articles in this category yet. Check back soon!</p>
          </motion.div>
        ) : (
          <motion.div
            key={activeCategory}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredPosts.map((post) => (
              <motion.article
                key={post.id}
                variants={fadeInUp}
                className="bg-white rounded-2xl overflow-hidden shadow-[0_2px_12px_-2px_rgba(0,0,0,0.08)] border border-black/5 flex flex-col group hover:shadow-[0_8px_32px_-8px_rgba(0,0,0,0.16)] transition-shadow duration-300"
              >
                {/* Card Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>

                {/* Card Body */}
                <div className="p-6 flex flex-col flex-1">
                  {/* Category badge */}
                  <span className="inline-flex items-center gap-1.5 text-[#c9a84c] text-xs font-bold uppercase tracking-wider mb-3">
                    {categoryIcons[post.category]}
                    {post.category}
                  </span>

                  {/* Title */}
                  <h3 className="font-serif font-semibold text-lg text-[#1a3c5e] leading-snug mb-3 line-clamp-2">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 mb-4 flex-1">
                    {post.excerpt}
                  </p>

                  {/* Author row */}
                  <div className="flex items-center gap-2.5 pt-4 border-t border-black/5">
                    <img
                      src={post.authorAvatar}
                      alt={post.author}
                      className="w-8 h-8 rounded-full object-cover border border-[#c9a84c]/20"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://ui-avatars.com/api/?name=" +
                          encodeURIComponent(post.author) +
                          "&background=1a3c5e&color=fff&size=64";
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-[#1a3c5e] font-semibold text-xs truncate">{post.author}</p>
                      <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                        <span className="flex items-center gap-0.5">
                          <Calendar size={10} />
                          {post.date}
                        </span>
                        <span>·</span>
                        <span className="flex items-center gap-0.5">
                          <Clock size={10} />
                          {post.readTime}
                        </span>
                      </div>
                    </div>
                    <Link
                      href="/blog"
                      className="text-[#c9a84c] hover:text-[#b8943e] text-sm font-semibold flex items-center gap-1 transition-colors duration-200 flex-shrink-0"
                    >
                      Read More
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        )}
      </section>

      {/* ── 5. NEWSLETTER CTA ────────────────────────────────────────────────── */}
      <section className="bg-[#f5f5f0] py-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <motion.span
            variants={fadeIn}
            className="inline-flex items-center gap-2 bg-[#c9a84c]/15 text-[#c9a84c] text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-5"
          >
            <BookOpen size={12} />
            Stay Informed
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="font-serif text-3xl sm:text-4xl font-bold text-[#1a3c5e] mb-4"
          >
            Get Market Insights Delivered
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-gray-600 text-base leading-relaxed mb-8">
            Join over 2,400 subscribers who receive expert market analysis, buying tips, and
            Maplewood neighborhood news straight to their inbox every week.
          </motion.p>

          {submitted ? (
            <motion.div
              variants={fadeInUp}
              className="flex flex-col items-center gap-3 py-6"
            >
              <div className="w-14 h-14 rounded-full bg-[#c9a84c]/15 flex items-center justify-center mb-2">
                <svg
                  className="w-7 h-7 text-[#c9a84c]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="font-serif text-xl font-semibold text-[#1a3c5e]">
                You&apos;re subscribed!
              </p>
              <p className="text-gray-500 text-sm">
                Welcome to the Harborview Realty insider list. Your first issue arrives next week.
              </p>
            </motion.div>
          ) : (
            <motion.form
              variants={fadeInUp}
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="flex-1 px-5 py-3.5 rounded-xl border border-black/10 bg-white text-[#1a3c5e] placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a84c]/40 focus:border-[#c9a84c] transition-all duration-200"
              />
              <button
                type="submit"
                className="px-6 py-3.5 bg-[#c9a84c] hover:bg-[#b8943e] text-white font-semibold text-sm rounded-xl transition-colors duration-200 whitespace-nowrap shadow-sm"
              >
                Subscribe
              </button>
            </motion.form>
          )}

          {!submitted && (
            <motion.p variants={fadeIn} className="text-gray-400 text-xs mt-4">
              No spam, ever. Unsubscribe anytime.
            </motion.p>
          )}
        </motion.div>
      </section>
    </main>
  );
}
