"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FileText, Shield, AlertCircle, Scale, Mail, ChevronRight } from 'lucide-react';
import { BRAND } from "@/lib/data";
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";
import { useTranslations } from "next-intl";

const sections = [
  {
    id: "acceptance",
    icon: FileText,
    title: "Acceptance of Terms",
    content: [
      "By accessing or using the Harborview Realty website, mobile applications, or any related services (collectively, the \"Services\"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our Services.",
      "These Terms apply to all visitors, users, and others who access or use the Services. We reserve the right to update or modify these Terms at any time without prior notice. Your continued use of the Services following any changes constitutes your acceptance of the revised Terms.",
      "If you are using the Services on behalf of a business or other legal entity, you represent that you have the authority to bind that entity to these Terms.",
    ],
  },
  {
    id: "services",
    icon: Shield,
    title: "Description of Services",
    content: [
      "Harborview Realty provides a platform for browsing residential and commercial property listings, connecting with licensed real estate agents, and accessing market information for the Maplewood, CA area and surrounding communities.",
      "Our Services include property search tools, agent directories, neighborhood guides, mortgage calculators, and related informational resources. All property listings are provided for informational purposes and are subject to change without notice.",
      "Harborview Realty acts as a licensed real estate brokerage in the State of California. Our agents are licensed professionals bound by the California Association of Realtors Code of Ethics and all applicable state and federal regulations.",
      "We do not guarantee the accuracy, completeness, or timeliness of any listing information. Property details including price, availability, square footage, and features are provided by sellers and third-party sources and may contain errors.",
    ],
  },
  {
    id: "user-conduct",
    icon: AlertCircle,
    title: "User Conduct and Responsibilities",
    content: [
      "You agree to use our Services only for lawful purposes and in a manner that does not infringe the rights of others. You must not use our Services to transmit any unsolicited or unauthorized advertising, promotional materials, or spam.",
      "You are responsible for maintaining the confidentiality of any account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.",
      "You must not attempt to gain unauthorized access to any portion of our Services, other accounts, computer systems, or networks connected to our Services. You may not use automated tools, bots, or scrapers to collect data from our platform without express written permission.",
      "Any content you submit through our Services, including inquiries, reviews, or communications, must be accurate, truthful, and not misleading. You grant Harborview Realty a non-exclusive license to use such content in connection with operating and improving our Services.",
    ],
  },
  {
    id: "intellectual-property",
    icon: Scale,
    title: "Intellectual Property",
    content: [
      "All content on the Harborview Realty website, including but not limited to text, graphics, logos, photographs, audio clips, and software, is the property of Harborview Realty or its content suppliers and is protected by United States and international copyright laws.",
      "You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the material on our website without prior written consent from Harborview Realty.",
      "Property photographs and listing content may be subject to additional copyright protections held by photographers, sellers, or multiple listing services. Unauthorized use of such content may result in legal action.",
      "The Harborview Realty name, logo, and all related names, logos, product and service names, designs, and slogans are trademarks of Harborview Realty. You must not use such marks without prior written permission.",
    ],
  },
  {
    id: "privacy",
    icon: Shield,
    title: "Privacy and Data Use",
    content: [
      "Your use of our Services is also governed by our Privacy Policy, which is incorporated into these Terms by reference. By using our Services, you consent to the collection and use of your information as described in our Privacy Policy.",
      "We collect information you provide directly, such as when you create an account, submit a property inquiry, or contact an agent. We also collect information automatically through cookies and similar tracking technologies.",
      "We use your information to provide and improve our Services, communicate with you about properties and market updates, and comply with legal obligations. We do not sell your personal information to third parties.",
      "You may opt out of marketing communications at any time by clicking the unsubscribe link in any email or by contacting us directly at " + BRAND.email + ".",
    ],
  },
  {
    id: "disclaimers",
    icon: AlertCircle,
    title: "Disclaimers and Limitation of Liability",
    content: [
      "The Services are provided on an \"as is\" and \"as available\" basis without any warranties of any kind, either express or implied. Harborview Realty does not warrant that the Services will be uninterrupted, error-free, or free of viruses or other harmful components.",
      "Property valuations, market analyses, and neighborhood data provided through our Services are estimates only and should not be relied upon as professional appraisals or investment advice. Always consult a licensed professional before making real estate decisions.",
      "To the fullest extent permitted by law, Harborview Realty shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of or inability to use the Services.",
      "Our total liability to you for any claims arising from these Terms or your use of the Services shall not exceed the amount you paid to us in the twelve months preceding the claim, or one hundred dollars ($100), whichever is greater.",
    ],
  },
  {
    id: "governing-law",
    icon: Scale,
    title: "Governing Law and Disputes",
    content: [
      "These Terms shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law provisions. Any legal action or proceeding arising under these Terms shall be brought exclusively in the courts located in San Francisco County, California.",
      "Before initiating any formal legal proceeding, you agree to first contact us at " + BRAND.email + " and attempt to resolve the dispute informally. We will make good-faith efforts to resolve any dispute within thirty (30) days of receiving notice.",
      "If informal resolution fails, any dispute shall be resolved through binding arbitration administered by the American Arbitration Association under its Commercial Arbitration Rules. The arbitration shall take place in Maplewood, California.",
      "Notwithstanding the above, either party may seek injunctive or other equitable relief in any court of competent jurisdiction to prevent the actual or threatened infringement of intellectual property rights.",
    ],
  },
  {
    id: "termination",
    icon: AlertCircle,
    title: "Termination",
    content: [
      "We reserve the right to suspend or terminate your access to the Services at any time, with or without cause, and with or without notice. Grounds for termination include, but are not limited to, violation of these Terms, fraudulent activity, or conduct harmful to other users or to Harborview Realty.",
      "Upon termination, your right to use the Services will immediately cease. All provisions of these Terms that by their nature should survive termination shall survive, including ownership provisions, warranty disclaimers, indemnity, and limitations of liability.",
      "You may terminate your account at any time by contacting us at " + BRAND.email + ". Termination of your account does not relieve you of any obligations incurred prior to termination.",
    ],
  },
];

const highlights = [
  { label: "Effective Date", value: "January 1, 2024" },
  { label: "Last Updated", value: "March 15, 2024" },
  { label: "Jurisdiction", value: "California, USA" },
  { label: "Contact", value: BRAND.email },
];

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#f8f6f1]">
      {/* Hero */}
      <section className="relative bg-[#1a3c5e] pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(circle at 70% 50%, #c9a84c 0%, transparent 60%)",
          }}
        />
        <div className="absolute inset-0"
          style={{
            backgroundImage: "linear-gradient(135deg, #1a3c5e 0%, #0f2540 100%)",
          }}
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={scaleIn} className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6">
              <FileText size={14} className="text-[#c9a84c]" />
              <span className="text-white/80 text-xs font-medium tracking-wide uppercase">Legal</span>
            </motion.div>
            <motion.h1
              variants={fadeInUp}
              className="font-serif text-4xl md:text-5xl font-bold text-white tracking-tight text-balance mb-4"
            >
              Terms of Service
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-white/60 text-lg leading-relaxed max-w-2xl mx-auto"
            >
              Please read these terms carefully before using Harborview Realty services. They govern your access to and use of our platform.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Highlights Bar */}
      <section className="bg-white border-b border-black/5 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 divide-x divide-black/5"
          >
            {highlights.map((item) => (
              <motion.div
                key={item.label}
                variants={fadeIn}
                className="py-5 px-4 text-center"
              >
                <p className="text-[10px] uppercase tracking-widest text-[#1a3c5e]/40 font-medium mb-1">{item.label}</p>
                <p className="text-sm font-semibold text-[#1a3c5e] truncate">{item.value}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-4">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="bg-white rounded-2xl border border-black/5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)] p-6 md:p-8"
        >
          <h2 className="font-serif text-lg font-semibold text-[#1a3c5e] mb-5">Table of Contents</h2>
          <ol className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {sections.map((section, i) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="flex items-center gap-3 group text-sm text-[#1a3c5e]/70 hover:text-[#c9a84c] transition-colors duration-200 py-1"
                >
                  <span className="w-6 h-6 rounded-full bg-[#f8f6f1] flex items-center justify-center text-[10px] font-bold text-[#1a3c5e]/40 group-hover:bg-[#c9a84c]/10 group-hover:text-[#c9a84c] transition-colors duration-200 flex-shrink-0">
                    {i + 1}
                  </span>
                  <span className="leading-snug">{section.title}</span>
                  <ChevronRight size={12} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0" />
                </a>
              </li>
            ))}
          </ol>
        </motion.div>
      </section>

      {/* Content Sections */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {sections.map((section, i) => {
          const Icon = section.icon;
          return (
            <motion.div
              key={section.id}
              id={section.id}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="bg-white rounded-2xl border border-black/5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)] p-6 md:p-8 scroll-mt-24"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#1a3c5e]/5 flex items-center justify-center flex-shrink-0">
                  <Icon size={18} className="text-[#c9a84c]" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#1a3c5e]/30 font-medium">Section {i + 1}</span>
                  <h2 className="font-serif text-xl font-semibold text-[#1a3c5e] leading-snug">{section.title}</h2>
                </div>
              </div>
              <div className="space-y-4 pl-0 md:pl-14">
                {(section.content ?? []).map((paragraph, j) => (
                  <p key={j} className="text-[#1a3c5e]/70 text-sm leading-relaxed text-pretty">
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.div>
          );
        })}
      </section>

      {/* Contact CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="relative bg-[#1a3c5e] rounded-2xl overflow-hidden p-8 md:p-12 text-center"
        >
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: "radial-gradient(circle at 80% 20%, #c9a84c 0%, transparent 50%)",
            }}
          />
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-[#c9a84c]/20 flex items-center justify-center mx-auto mb-5">
              <Mail size={22} className="text-[#c9a84c]" />
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight">
              Questions About These Terms?
            </h2>
            <p className="text-white/60 text-sm leading-relaxed max-w-lg mx-auto mb-8">
              Our team is happy to clarify any aspect of these Terms of Service. Reach out and we will respond within one business day.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={`mailto:${BRAND.email}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#c9a84c] text-white text-sm font-semibold rounded-xl hover:bg-[#b8943e] transition-all duration-200 shadow-sm"
              >
                <Mail size={15} />
                {BRAND.email}
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/20 text-white text-sm font-semibold rounded-xl hover:bg-white/20 transition-all duration-200"
              >
                Contact Us
                <ChevronRight size={15} />
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}