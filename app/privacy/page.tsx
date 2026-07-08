"use client";

import { motion } from "framer-motion";
import { Shield, Eye, Lock, Database, UserCheck, Bell, Mail, ChevronRight } from 'lucide-react';
import Link from "next/link";
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";
import { BRAND } from "@/lib/data";

const lastUpdated = "January 15, 2025";

const sections = [
  {
    id: "information-we-collect",
    icon: Database,
    title: "Information We Collect",
    content: [
      {
        subtitle: "Information You Provide Directly",
        body: "When you contact us, schedule a showing, or submit an inquiry through our website, we collect information such as your name, email address, phone number, and any details you share about your property search or listing needs. If you create an account or sign up for property alerts, we also collect your login credentials and preferences.",
      },
      {
        subtitle: "Information Collected Automatically",
        body: "When you visit our website, we automatically collect certain technical information including your IP address, browser type, operating system, referring URLs, pages visited, and the date and time of your visit. This data is collected through cookies and similar tracking technologies to help us understand how visitors use our site and improve your experience.",
      },
      {
        subtitle: "Property Search Data",
        body: "We record your search queries, saved properties, and browsing behavior within our listings platform. This allows us to surface relevant properties, send you alerts when matching homes become available, and personalize your experience on return visits.",
      },
    ],
  },
  {
    id: "how-we-use-information",
    icon: Eye,
    title: "How We Use Your Information",
    content: [
      {
        subtitle: "Providing Real Estate Services",
        body: "We use your contact information to respond to inquiries, schedule property showings, connect you with one of our agents, and facilitate the buying, selling, or renting process. Your search preferences help us match you with properties that fit your criteria.",
      },
      {
        subtitle: "Communications and Marketing",
        body: "With your consent, we may send you property alerts, market reports, neighborhood updates, and promotional communications about our services. You can opt out of marketing emails at any time by clicking the unsubscribe link in any message or contacting us directly.",
      },
      {
        subtitle: "Improving Our Services",
        body: "Aggregated and anonymized usage data helps us analyze trends, measure the effectiveness of our marketing, troubleshoot technical issues, and continuously improve the functionality and content of our website and services.",
      },
      {
        subtitle: "Legal Compliance",
        body: "We may use or disclose your information when required by law, court order, or governmental authority, or when we believe disclosure is necessary to protect our rights, your safety, or the safety of others.",
      },
    ],
  },
  {
    id: "sharing-information",
    icon: UserCheck,
    title: "Sharing Your Information",
    content: [
      {
        subtitle: "Our Agents and Staff",
        body: "Your inquiry and contact details are shared with the Harborview Realty agents and staff members best positioned to assist you. All team members are bound by confidentiality obligations and trained in data handling best practices.",
      },
      {
        subtitle: "Service Providers",
        body: "We work with trusted third-party vendors who help us operate our website and deliver services, including email platforms, CRM software, analytics providers, and payment processors. These partners are contractually required to use your data only for the purposes we specify and to maintain appropriate security standards.",
      },
      {
        subtitle: "MLS and Listing Platforms",
        body: "When you list a property with us, certain listing information is shared with the Multiple Listing Service (MLS) and affiliated real estate portals as part of standard industry practice. We will always inform you of what information will be publicly visible before your listing goes live.",
      },
      {
        subtitle: "No Sale of Personal Data",
        body: "We do not sell, rent, or trade your personal information to third parties for their own marketing purposes. Your data is used solely to serve you and improve our services.",
      },
    ],
  },
  {
    id: "cookies",
    icon: Bell,
    title: "Cookies and Tracking",
    content: [
      {
        subtitle: "Types of Cookies We Use",
        body: "We use essential cookies that are necessary for the website to function, as well as analytics cookies that help us understand visitor behavior. We may also use preference cookies to remember your settings and saved searches between visits.",
      },
      {
        subtitle: "Managing Your Cookie Preferences",
        body: "Most web browsers allow you to control cookies through their settings. You can choose to block or delete cookies, though doing so may affect the functionality of certain features on our site, such as saved property searches and personalized recommendations.",
      },
      {
        subtitle: "Third-Party Analytics",
        body: "We use analytics tools such as Google Analytics to collect aggregated data about site usage. These services may set their own cookies. You can opt out of Google Analytics tracking by installing the Google Analytics Opt-out Browser Add-on.",
      },
    ],
  },
  {
    id: "data-security",
    icon: Lock,
    title: "Data Security",
    content: [
      {
        subtitle: "How We Protect Your Data",
        body: "We implement industry-standard security measures including SSL/TLS encryption for data in transit, secure server infrastructure, access controls, and regular security audits. Only authorized personnel with a legitimate business need can access personal information.",
      },
      {
        subtitle: "Data Retention",
        body: "We retain your personal information for as long as necessary to provide our services, comply with legal obligations, resolve disputes, and enforce our agreements. When data is no longer needed, we securely delete or anonymize it.",
      },
      {
        subtitle: "Breach Notification",
        body: "In the unlikely event of a data breach that affects your personal information, we will notify you and the appropriate regulatory authorities as required by applicable law, and take immediate steps to contain and remediate the incident.",
      },
    ],
  },
  {
    id: "your-rights",
    icon: Shield,
    title: "Your Rights and Choices",
    content: [
      {
        subtitle: "Access and Correction",
        body: "You have the right to request access to the personal information we hold about you and to request corrections if any information is inaccurate or incomplete. To make such a request, please contact us using the details below.",
      },
      {
        subtitle: "Deletion and Portability",
        body: "You may request that we delete your personal information, subject to certain legal exceptions. You may also request a copy of your data in a portable format. We will respond to all verified requests within 30 days.",
      },
      {
        subtitle: "Opt-Out of Marketing",
        body: "You can unsubscribe from our marketing communications at any time by clicking the unsubscribe link in any email, adjusting your account preferences, or contacting us directly. Note that you may still receive transactional messages related to active inquiries or transactions.",
      },
      {
        subtitle: "California Residents",
        body: "If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA), including the right to know what personal information is collected, the right to delete personal information, and the right to opt out of the sale of personal information. We do not sell personal information.",
      },
    ],
  },
];

const highlights = [
  { icon: Shield, label: "We never sell your data" },
  { icon: Lock, label: "SSL-encrypted connections" },
  { icon: Eye, label: "Transparent data practices" },
  { icon: UserCheck, label: "You control your preferences" },
];

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#f8f6f1]">
      {/* Hero */}
      <section className="relative bg-[#1a3c5e] pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(circle at 70% 40%, #c9a84c 0%, transparent 60%)",
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="max-w-3xl"
          >
            <motion.div variants={fadeInUp} className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-full bg-[#c9a84c]/20 flex items-center justify-center">
                <Shield size={16} className="text-[#c9a84c]" />
              </div>
              <span className="text-[#c9a84c] text-sm font-semibold tracking-wide uppercase">
                Privacy Policy
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="font-serif text-4xl md:text-5xl font-bold text-white tracking-tight text-balance mb-6"
            >
              Your Privacy Matters to Us
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-white/70 text-lg leading-relaxed text-pretty mb-8"
            >
              At {BRAND.name}, we are committed to protecting your personal information and being transparent about how we collect, use, and safeguard your data. This policy explains our practices in plain language.
            </motion.p>

            <motion.p variants={fadeInUp} className="text-white/40 text-sm">
              Last updated: {lastUpdated}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Highlights Bar */}
      <section className="bg-white border-b border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-black/5"
          >
            {highlights.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  variants={fadeInUp}
                  className="flex items-center gap-3 px-6 py-5"
                >
                  <div className="w-9 h-9 rounded-xl bg-[#c9a84c]/10 flex items-center justify-center flex-shrink-0">
                    <Icon size={18} className="text-[#c9a84c]" />
                  </div>
                  <span className="text-[#1a3c5e] text-sm font-medium leading-snug">
                    {item.label}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">

            {/* Sidebar TOC */}
            <motion.aside
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              <div className="sticky top-28 bg-white rounded-2xl border border-black/5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)] p-6">
                <h2 className="font-serif font-semibold text-[#1a3c5e] text-base mb-4">
                  Contents
                </h2>
                <nav className="space-y-1">
                  {sections.map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-[#1a3c5e]/70 hover:text-[#c9a84c] hover:bg-[#c9a84c]/5 transition-all duration-200 group"
                    >
                      <ChevronRight size={14} className="text-[#c9a84c] opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0" />
                      <span>{section.title}</span>
                    </a>
                  ))}
                </nav>

                <div className="mt-6 pt-6 border-t border-black/5">
                  <p className="text-xs text-[#1a3c5e]/50 mb-3">Questions about this policy?</p>
                  <Link
                    href="/contact"
                    className="flex items-center gap-2 text-sm font-medium text-[#c9a84c] hover:text-[#b8943e] transition-colors duration-200"
                  >
                    <Mail size={14} />
                    Contact Us
                  </Link>
                </div>
              </div>
            </motion.aside>

            {/* Policy Sections */}
            <div className="lg:col-span-3 space-y-10">
              {/* Intro Card */}
              <motion.div
                variants={scaleIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                className="bg-[#1a3c5e]/5 border border-[#1a3c5e]/10 rounded-2xl p-8"
              >
                <p className="text-[#1a3c5e] text-base leading-relaxed">
                  This Privacy Policy applies to {BRAND.name} and covers all information collected through our website at{" "}
                  <span className="font-medium">harborviewrealty.com</span>, our mobile applications, and any related services. By using our services, you agree to the collection and use of information in accordance with this policy.
                </p>
                <p className="text-[#1a3c5e]/70 text-sm leading-relaxed mt-4">
                  We may update this policy from time to time. When we make significant changes, we will notify you by email or by posting a prominent notice on our website. Your continued use of our services after any changes constitutes your acceptance of the updated policy.
                </p>
              </motion.div>

              {/* Policy Sections */}
              {sections.map((section, sectionIndex) => {
                const Icon = section.icon;
                return (
                  <motion.div
                    key={section.id}
                    id={section.id}
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-60px" }}
                    className="bg-white rounded-2xl border border-black/5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)] overflow-hidden"
                  >
                    {/* Section Header */}
                    <div className="flex items-center gap-4 px-8 py-6 border-b border-black/5 bg-gradient-to-r from-[#f8f6f1] to-white">
                      <div className="w-10 h-10 rounded-xl bg-[#c9a84c]/10 flex items-center justify-center flex-shrink-0">
                        <Icon size={20} className="text-[#c9a84c]" />
                      </div>
                      <div>
                        <span className="text-[#c9a84c] text-xs font-semibold tracking-wide uppercase">
                          Section {sectionIndex + 1}
                        </span>
                        <h2 className="font-serif font-bold text-[#1a3c5e] text-xl">
                          {section.title}
                        </h2>
                      </div>
                    </div>

                    {/* Section Content */}
                    <div className="px-8 py-6 space-y-6">
                      {section.content.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex gap-4">
                          <div className="w-1.5 flex-shrink-0 mt-1.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#c9a84c]" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-[#1a3c5e] text-base mb-2">
                              {item.subtitle}
                            </h3>
                            <p className="text-[#1a3c5e]/65 text-sm leading-relaxed">
                              {item.body}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                );
              })}

              {/* Contact Section */}
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                className="bg-[#1a3c5e] rounded-2xl p-8 text-white relative overflow-hidden"
              >
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: "radial-gradient(circle at 80% 50%, #c9a84c 0%, transparent 60%)",
                  }}
                />
                <div className="relative">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#c9a84c]/20 flex items-center justify-center">
                      <Mail size={20} className="text-[#c9a84c]" />
                    </div>
                    <h2 className="font-serif font-bold text-xl">
                      Questions or Concerns?
                    </h2>
                  </div>
                  <p className="text-white/70 text-sm leading-relaxed mb-6 max-w-xl">
                    If you have any questions about this Privacy Policy, wish to exercise your data rights, or have a concern about how we handle your information, please reach out to us. We are committed to addressing your concerns promptly and transparently.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail size={15} className="text-[#c9a84c]" />
                      <a
                        href={`mailto:${BRAND.email}`}
                        className="text-white/80 hover:text-[#c9a84c] transition-colors duration-200"
                      >
                        {BRAND.email}
                      </a>
                    </div>
                    <div className="hidden sm:block text-white/20">|</div>
                    <div className="flex items-center gap-2 text-sm">
                      <Shield size={15} className="text-[#c9a84c]" />
                      <span className="text-white/80">{BRAND.address}</span>
                    </div>
                  </div>
                  <div className="mt-6">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[#c9a84c] text-white text-sm font-semibold rounded-xl hover:bg-[#b8943e] transition-all duration-200 shadow-sm"
                    >
                      Send Us a Message
                      <ChevronRight size={16} />
                    </Link>
                  </div>
                </div>
              </motion.div>

              {/* Footer Note */}
              <motion.p
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-center text-[#1a3c5e]/40 text-xs leading-relaxed pb-4"
              >
                This policy was last updated on {lastUpdated}. {BRAND.name} is committed to keeping this document current and accurate. For the most recent version, please visit this page directly.
              </motion.p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}