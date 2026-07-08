"use client";

import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { MapPin, Phone, Mail, Clock, ChevronDown, Send, CheckCircle } from 'lucide-react';
import { BRAND } from "@/lib/data";
import { fadeInUp, fadeIn, staggerContainer, slideInLeft, slideInRight, scaleIn } from "@/lib/motion";
import { useTranslations } from "next-intl";

// ─── FAQ Data ──────────────────────────────────────────────────────────────────
const faqs = [
  {
    id: "faq-1",
    question: "How do I schedule a property viewing?",
    answer:
      "You can schedule a viewing by filling out the contact form above, calling our office directly, or clicking the 'Schedule a Tour' button on any listing page. We typically confirm appointments within two business hours.",
  },
  {
    id: "faq-2",
    question: "What areas does Harborview Realty serve?",
    answer:
      "We serve Maplewood and the surrounding communities including Harborside District, Maplewood Heights, Riverside Commons, Elmwood Park, and Crestview. Our agents have deep local knowledge across all these neighborhoods.",
  },
  {
    id: "faq-3",
    question: "How long does the home buying process typically take?",
    answer:
      "From initial search to closing, the process typically takes 60 to 90 days. This includes finding the right property, making an offer, completing inspections, securing financing, and finalizing the paperwork. Our agents guide you through every step.",
  },
  {
    id: "faq-4",
    question: "Do you help with both buying and renting?",
    answer:
      "Yes. We have dedicated specialists for buyers, sellers, and renters. Whether you are looking for your forever home, an investment property, or a rental, we have an agent with the right expertise for your situation.",
  },
  {
    id: "faq-5",
    question: "What should I bring to my first consultation?",
    answer:
      "For buyers, bring a sense of your budget, preferred neighborhoods, and must-have features. If you have a pre-approval letter, that is helpful too. For sellers, any recent appraisals, renovation records, or HOA documents are useful. We will guide you through everything else.",
  },
];

// ─── Office Hours ──────────────────────────────────────────────────────────────
const officeHours = [
  { day: "Monday – Friday", hours: "9:00 AM – 6:00 PM" },
  { day: "Saturday", hours: "10:00 AM – 4:00 PM" },
  { day: "Sunday", hours: "By Appointment" },
];

// ─── Property Interest Options ─────────────────────────────────────────────────
const propertyInterests = [
  "Buying a Home",
  "Selling a Home",
  "Renting a Property",
  "Investment Property",
  "Relocation Services",
  "General Inquiry",
];

// ─── FAQ Accordion Item ────────────────────────────────────────────────────────
function FaqItem({ faq, isOpen, onToggle }: { faq: typeof faqs[0]; isOpen: boolean; onToggle: () => void }) {
  const answerVariants: Variants = {
    hidden: { height: 0, opacity: 0 },
    visible: {
      height: "auto",
      opacity: 1,
      transition: { duration: 0.35, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      variants={fadeInUp}
      className="border border-black/8 rounded-2xl overflow-hidden bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_12px_-4px_rgba(0,0,0,0.08)]"
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-5 text-left group"
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-[#1a3c5e] text-base leading-snug pr-4 group-hover:text-[#c9a84c] transition-colors duration-200">
          {faq.question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="flex-shrink-0 text-[#c9a84c]"
        >
          <ChevronDown size={20} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            variants={answerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="overflow-hidden"
          >
            <p className="px-6 pb-5 text-[#4a5568] text-sm leading-relaxed border-t border-black/5 pt-4">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function ContactPage() {
  const t = useTranslations();

  // Form state
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    interest: propertyInterests[0],
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // FAQ state
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1400);
  };

  const toggleFaq = (id: string) => {
    setOpenFaq((prev) => (prev === id ? null : id));
  };

  return (
    <main className="min-h-screen bg-[#f8f7f4]">
      {/* ── Hero Banner ──────────────────────────────────────────────────────── */}
      <section className="relative h-64 md:h-80 flex items-end overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-[#1a3c5e]">
          <img
            src="https://c8.alamy.com/comp/E6HGT5/aerial-view-of-maplewood-new-jersey-E6HGT5.jpg"
            alt="Maplewood neighborhood aerial view"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a3c5e] via-[#1a3c5e]/60 to-transparent" />
        </div>

        {/* Decorative gold accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#c9a84c] to-transparent opacity-60" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 w-full">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.p
              variants={fadeIn}
              className="text-[#c9a84c] text-sm font-semibold tracking-widest uppercase mb-2"
            >
              Get in Touch
            </motion.p>
            <motion.h1
              variants={fadeInUp}
              className="font-serif font-bold text-4xl md:text-5xl text-white tracking-tight text-balance"
            >
              Contact Us
            </motion.h1>
          </motion.div>
        </div>
      </section>

      {/* ── Two-Column: Form + Office Info ───────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 xl:gap-14">

          {/* ── Left: Contact Form ─────────────────────────────────────────── */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="lg:col-span-3"
          >
            <div className="bg-white rounded-3xl shadow-[0_1px_2px_rgba(0,0,0,0.04),0_12px_40px_-12px_rgba(0,0,0,0.12)] border border-black/5 p-8 md:p-10">
              <h2 className="font-serif font-bold text-2xl text-[#1a3c5e] mb-2">
                Send Us a Message
              </h2>
              <p className="text-[#6b7280] text-sm leading-relaxed mb-8">
                Fill out the form below and one of our agents will get back to you within one business day.
              </p>

              {submitted ? (
                <motion.div
                  variants={scaleIn}
                  initial="hidden"
                  animate="visible"
                  className="flex flex-col items-center justify-center py-16 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mb-5">
                    <CheckCircle size={32} className="text-emerald-500" />
                  </div>
                  <h3 className="font-serif font-bold text-xl text-[#1a3c5e] mb-2">
                    Message Received
                  </h3>
                  <p className="text-[#6b7280] text-sm max-w-xs leading-relaxed">
                    Thank you for reaching out. A member of our team will be in touch with you shortly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setForm({ name: "", email: "", phone: "", interest: propertyInterests[0], message: "" });
                    }}
                    className="mt-6 text-[#c9a84c] text-sm font-semibold hover:underline transition-all"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-xs font-semibold text-[#1a3c5e] uppercase tracking-wider mb-1.5">
                        Full Name <span className="text-[#c9a84c]">*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Jane Smith"
                        className="w-full px-4 py-3 rounded-xl border border-black/10 bg-[#f8f7f4] text-[#1a3c5e] text-sm placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#c9a84c]/40 focus:border-[#c9a84c] transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-xs font-semibold text-[#1a3c5e] uppercase tracking-wider mb-1.5">
                        Email Address <span className="text-[#c9a84c]">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="jane@example.com"
                        className="w-full px-4 py-3 rounded-xl border border-black/10 bg-[#f8f7f4] text-[#1a3c5e] text-sm placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#c9a84c]/40 focus:border-[#c9a84c] transition-all duration-200"
                      />
                    </div>
                  </div>

                  {/* Phone + Interest */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="phone" className="block text-xs font-semibold text-[#1a3c5e] uppercase tracking-wider mb-1.5">
                        Phone Number
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="(555) 000-0000"
                        className="w-full px-4 py-3 rounded-xl border border-black/10 bg-[#f8f7f4] text-[#1a3c5e] text-sm placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#c9a84c]/40 focus:border-[#c9a84c] transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label htmlFor="interest" className="block text-xs font-semibold text-[#1a3c5e] uppercase tracking-wider mb-1.5">
                        I Am Interested In <span className="text-[#c9a84c]">*</span>
                      </label>
                      <div className="relative">
                        <select
                          id="interest"
                          name="interest"
                          required
                          value={form.interest}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-black/10 bg-[#f8f7f4] text-[#1a3c5e] text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-[#c9a84c]/40 focus:border-[#c9a84c] transition-all duration-200 pr-10"
                        >
                          {propertyInterests.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                        <ChevronDown
                          size={16}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9ca3af] pointer-events-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-xs font-semibold text-[#1a3c5e] uppercase tracking-wider mb-1.5">
                      Message <span className="text-[#c9a84c]">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us about what you are looking for, your timeline, budget range, or any questions you have..."
                      className="w-full px-4 py-3 rounded-xl border border-black/10 bg-[#f8f7f4] text-[#1a3c5e] text-sm placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#c9a84c]/40 focus:border-[#c9a84c] transition-all duration-200 resize-none leading-relaxed"
                    />
                  </div>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={submitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#c9a84c] text-white font-semibold text-sm rounded-xl shadow-[0_4px_14px_rgba(201,168,76,0.35)] hover:bg-[#b8943e] disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    {submitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Send Message
                      </>
                    )}
                  </motion.button>

                  <p className="text-center text-xs text-[#9ca3af]">
                    We respect your privacy. Your information is never shared with third parties.
                  </p>
                </form>
              )}
            </div>
          </motion.div>

          {/* ── Right: Office Info + Map ───────────────────────────────────── */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            {/* Office Details Card */}
            <div className="bg-[#1a3c5e] rounded-3xl p-8 text-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_12px_40px_-12px_rgba(26,60,94,0.4)]">
              <h2 className="font-serif font-bold text-xl mb-6">
                Office Information
              </h2>

              <div className="space-y-5">
                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-[#c9a84c]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin size={17} className="text-[#c9a84c]" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-white/50 mb-1">Address</p>
                    <p className="text-sm text-white/90 leading-relaxed">{BRAND.address}</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-[#c9a84c]/20 flex items-center justify-center flex-shrink-0">
                    <Phone size={17} className="text-[#c9a84c]" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-white/50 mb-1">Phone</p>
                    <a
                      href={`tel:${BRAND.phone}`}
                      className="text-sm text-white/90 hover:text-[#c9a84c] transition-colors duration-200"
                    >
                      {BRAND.phone}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-[#c9a84c]/20 flex items-center justify-center flex-shrink-0">
                    <Mail size={17} className="text-[#c9a84c]" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-white/50 mb-1">Email</p>
                    <a
                      href={`mailto:${BRAND.email}`}
                      className="text-sm text-white/90 hover:text-[#c9a84c] transition-colors duration-200 break-all"
                    >
                      {BRAND.email}
                    </a>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-white/10 pt-5">
                  <div className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-xl bg-[#c9a84c]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Clock size={17} className="text-[#c9a84c]" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-semibold uppercase tracking-wider text-white/50 mb-3">Office Hours</p>
                      <ul className="space-y-2">
                        {officeHours.map((item) => (
                          <li key={item.day} className="flex items-center justify-between text-sm">
                            <span className="text-white/70">{item.day}</span>
                            <span className="text-white/90 font-medium">{item.hours}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Embed */}
            <div className="rounded-3xl overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.04),0_12px_40px_-12px_rgba(0,0,0,0.12)] border border-black/5 flex-1 min-h-[260px]">
              <iframe
                title="Harborview Realty Office Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019!2d-122.4194!3d37.7749!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDQ2JzI5LjYiTiAxMjLCsDI1JzA5LjgiVw!5e0!3m2!1sen!2sus!4v1680000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "260px", display: "block" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ Strip ────────────────────────────────────────────────────────── */}
      <section className="bg-white border-t border-black/5 py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <p className="text-[#c9a84c] text-xs font-semibold tracking-widest uppercase mb-3">
                Common Questions
              </p>
              <h2 className="font-serif font-bold text-3xl md:text-4xl text-[#1a3c5e] tracking-tight text-balance">
                Frequently Asked Questions
              </h2>
              <p className="mt-4 text-[#6b7280] text-base leading-relaxed max-w-xl mx-auto">
                Everything you need to know before reaching out. Still have questions? Our team is happy to help.
              </p>
            </motion.div>

            <div className="space-y-3">
              {faqs.map((faq) => (
                <FaqItem
                  key={faq.id}
                  faq={faq}
                  isOpen={openFaq === faq.id}
                  onToggle={() => toggleFaq(faq.id)}
                />
              ))}
            </div>

            <motion.div
              variants={fadeInUp}
              className="mt-10 text-center"
            >
              <p className="text-[#6b7280] text-sm">
                Still have questions?{" "}
                <a
                  href={`tel:${BRAND.phone}`}
                  className="text-[#c9a84c] font-semibold hover:underline transition-all"
                >
                  Call us at {BRAND.phone}
                </a>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}