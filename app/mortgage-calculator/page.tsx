"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calculator, DollarSign, Percent, Calendar, Home, TrendingDown, Info } from 'lucide-react';
import { BRAND } from "@/lib/data";
import { fadeInUp, fadeIn, staggerContainer, scaleIn, slideInLeft, slideInRight } from "@/lib/motion";

// ─── Helpers ──────────────────────────────────────────────────────────────────
function formatCurrency(value: number): string {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

function formatNumber(value: number): string {
  return value.toLocaleString("en-US", { maximumFractionDigits: 0 });
}

// ─── Tips Data ────────────────────────────────────────────────────────────────
const tips = [
  {
    icon: DollarSign,
    title: "Down Payment Strategy",
    body: "A 20% down payment eliminates PMI and reduces your monthly payment significantly. Even an extra 5% can save tens of thousands over the life of your loan. Consider gift funds, down payment assistance programs, or delaying your purchase to save more.",
  },
  {
    icon: Percent,
    title: "Shopping for Interest Rates",
    body: "Even a 0.5% difference in interest rate can mean thousands of dollars over 30 years. Get quotes from at least three lenders — banks, credit unions, and mortgage brokers. Improving your credit score by 20–40 points before applying can unlock significantly better rates.",
  },
  {
    icon: Calendar,
    title: "Choosing Your Loan Term",
    body: "A 15-year mortgage builds equity faster and saves substantial interest, but comes with higher monthly payments. A 30-year loan offers lower payments and flexibility. Consider a 30-year loan with extra principal payments — you get flexibility without sacrificing long-term savings.",
  },
];

// ─── Segmented Button ─────────────────────────────────────────────────────────
function TermButton({
  value,
  selected,
  onClick,
}: {
  value: number;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex-1 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200 ${
        selected
          ? "bg-[#1a3c5e] text-white shadow-sm"
          : "bg-[#f5f5f0] text-[#1a3c5e] hover:bg-[#1a3c5e]/10"
      }`}
    >
      {value}yr
    </button>
  );
}

// ─── Input Row ────────────────────────────────────────────────────────────────
function InputRow({
  label,
  prefix,
  suffix,
  value,
  onChange,
  min,
  max,
  step,
}: {
  label: string;
  prefix?: string;
  suffix?: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  step?: number;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-[#1a3c5e] mb-1.5">{label}</label>
      <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-[#c9a84c] focus-within:border-[#c9a84c] transition-all bg-white">
        {prefix && (
          <span className="px-3 py-2.5 bg-[#f5f5f0] text-[#1a3c5e] font-semibold text-sm border-r border-gray-200">
            {prefix}
          </span>
        )}
        <input
          type="number"
          value={value}
          min={min}
          max={max}
          step={step ?? 1}
          onChange={(e) => onChange(Number(e.target.value))}
          className="flex-1 px-3 py-2.5 text-[#1a3c5e] font-medium text-sm outline-none bg-white"
        />
        {suffix && (
          <span className="px-3 py-2.5 bg-[#f5f5f0] text-[#1a3c5e] font-semibold text-sm border-l border-gray-200">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}

// ─── Range Slider ─────────────────────────────────────────────────────────────
function RangeSlider({
  value,
  min,
  max,
  step,
  onChange,
}: {
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="relative mt-2">
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
        style={{
          background: `linear-gradient(to right, #c9a84c 0%, #c9a84c ${pct}%, #e5e7eb ${pct}%, #e5e7eb 100%)`,
        }}
      />
    </div>
  );
}

// ─── Breakdown Bar ────────────────────────────────────────────────────────────
function BreakdownBar({
  pi,
  tax,
  insurance,
  pmi,
  total,
}: {
  pi: number;
  tax: number;
  insurance: number;
  pmi: number;
  total: number;
}) {
  if (total <= 0) return null;
  const piPct = (pi / total) * 100;
  const taxPct = (tax / total) * 100;
  const insPct = (insurance / total) * 100;
  const pmiPct = (pmi / total) * 100;

  return (
    <div>
      <div className="flex h-3 rounded-full overflow-hidden gap-0.5">
        <div style={{ width: `${piPct}%` }} className="bg-[#1a3c5e] rounded-l-full" title="Principal & Interest" />
        <div style={{ width: `${taxPct}%` }} className="bg-[#c9a84c]" title="Property Tax" />
        <div style={{ width: `${insPct}%` }} className="bg-[#4a7fa5]" title="Insurance" />
        {pmi > 0 && (
          <div style={{ width: `${pmiPct}%` }} className="bg-red-400 rounded-r-full" title="PMI" />
        )}
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
        <span className="flex items-center gap-1.5 text-xs text-gray-500">
          <span className="w-2.5 h-2.5 rounded-sm bg-[#1a3c5e] inline-block" /> P&amp;I
        </span>
        <span className="flex items-center gap-1.5 text-xs text-gray-500">
          <span className="w-2.5 h-2.5 rounded-sm bg-[#c9a84c] inline-block" /> Tax
        </span>
        <span className="flex items-center gap-1.5 text-xs text-gray-500">
          <span className="w-2.5 h-2.5 rounded-sm bg-[#4a7fa5] inline-block" /> Insurance
        </span>
        {pmi > 0 && (
          <span className="flex items-center gap-1.5 text-xs text-gray-500">
            <span className="w-2.5 h-2.5 rounded-sm bg-red-400 inline-block" /> PMI
          </span>
        )}
      </div>
    </div>
  );
}

// ─── Page Component ───────────────────────────────────────────────────────────
export default function MortgageCalculatorPage() {
  // ── State ──
  const [homePrice, setHomePrice] = useState(750000);
  const [downPayment, setDownPayment] = useState(150000);
  const [downPaymentPct, setDownPaymentPct] = useState(20);
  const [interestRate, setInterestRate] = useState(6.8);
  const [loanTerm, setLoanTerm] = useState(30);
  const [propertyTax, setPropertyTax] = useState(8500);
  const [homeInsurance, setHomeInsurance] = useState(1800);

  // ── Sync helpers ──
  const handleHomePriceChange = (val: number) => {
    const safe = Math.max(0, val);
    setHomePrice(safe);
    const newDP = Math.round((downPaymentPct / 100) * safe);
    setDownPayment(newDP);
  };

  const handleDownPaymentChange = (val: number) => {
    const safe = Math.max(0, Math.min(val, homePrice));
    setDownPayment(safe);
    const pct = homePrice > 0 ? Math.round((safe / homePrice) * 100 * 10) / 10 : 0;
    setDownPaymentPct(pct);
  };

  const handleDownPaymentPctChange = (val: number) => {
    const safe = Math.max(0, Math.min(val, 100));
    setDownPaymentPct(safe);
    const newDP = Math.round((safe / 100) * homePrice);
    setDownPayment(newDP);
  };

  // ── Computed values ──
  const computed = useMemo(() => {
    const loanAmount = Math.max(0, homePrice - downPayment);
    const monthlyRate = interestRate / 100 / 12;
    const numPayments = loanTerm * 12;
    const pmiEnabled = downPaymentPct < 20;

    let monthlyPI = 0;
    if (monthlyRate > 0 && numPayments > 0 && loanAmount > 0) {
      const r = monthlyRate;
      const n = numPayments;
      monthlyPI = loanAmount * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    } else if (numPayments > 0 && loanAmount > 0) {
      monthlyPI = loanAmount / numPayments;
    }

    const monthlyTax = propertyTax / 12;
    const monthlyInsurance = homeInsurance / 12;
    const monthlyPMI = pmiEnabled ? (loanAmount * 0.008) / 12 : 0;
    const totalMonthly = monthlyPI + monthlyTax + monthlyInsurance + monthlyPMI;
    const totalPaid = monthlyPI * numPayments;
    const totalInterest = totalPaid - loanAmount;

    return {
      loanAmount,
      monthlyPI,
      monthlyTax,
      monthlyInsurance,
      monthlyPMI,
      totalMonthly,
      totalPaid,
      totalInterest,
      pmiEnabled,
      numPayments,
    };
  }, [homePrice, downPayment, downPaymentPct, interestRate, loanTerm, propertyTax, homeInsurance]);

  // ── Amortization table (first 12 months) ──
  const amortizationRows = useMemo(() => {
    const { loanAmount, numPayments } = computed;
    const monthlyRate = interestRate / 100 / 12;
    const rows: { month: number; payment: number; principal: number; interest: number; balance: number }[] = [];

    let balance = loanAmount;
    const payment = computed.monthlyPI;

    for (let i = 1; i <= Math.min(12, numPayments); i++) {
      const interestPart = balance * monthlyRate;
      const principalPart = payment - interestPart;
      balance = Math.max(0, balance - principalPart);
      rows.push({
        month: i,
        payment,
        principal: principalPart,
        interest: interestPart,
        balance,
      });
    }
    return rows;
  }, [computed, interestRate]);

  return (
    <main className="bg-white overflow-x-hidden">
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="bg-[#1a3c5e] text-white py-20">
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
            <Calculator size={14} />
            Financial Planning
          </motion.span>
          <motion.h1
            variants={fadeInUp}
            className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-balance leading-tight mb-6"
          >
            Mortgage Calculator
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-white/75 text-lg leading-relaxed max-w-2xl mx-auto"
          >
            Estimate your monthly payments and plan your home purchase with confidence.
          </motion.p>
        </motion.div>
      </section>

      {/* ── CALCULATOR LAYOUT ─────────────────────────────────────────────── */}
      <section className="bg-[#f5f5f0] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* LEFT — Inputs */}
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
            >
              <div className="bg-white rounded-2xl shadow-lg p-8">
                {/* Loan Details */}
                <h2 className="font-serif text-xl font-bold text-[#1a3c5e] mb-6 flex items-center gap-2">
                  <Home size={20} className="text-[#c9a84c]" />
                  Loan Details
                </h2>

                <div className="space-y-6">
                  {/* Home Price */}
                  <div>
                    <InputRow
                      label="Home Price"
                      prefix="$"
                      value={homePrice}
                      onChange={handleHomePriceChange}
                      min={100000}
                      max={3000000}
                      step={10000}
                    />
                    <RangeSlider
                      value={homePrice}
                      min={100000}
                      max={3000000}
                      step={10000}
                      onChange={handleHomePriceChange}
                    />
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>$100K</span>
                      <span>$3M</span>
                    </div>
                  </div>

                  {/* Down Payment */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-sm font-medium text-[#1a3c5e]">Down Payment</label>
                      <span className="text-xs font-semibold bg-[#c9a84c]/15 text-[#c9a84c] px-2 py-0.5 rounded-full">
                        {downPaymentPct.toLocaleString("en-US", { maximumFractionDigits: 1 })}%
                      </span>
                    </div>
                    <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-[#c9a84c] focus-within:border-[#c9a84c] transition-all bg-white">
                      <span className="px-3 py-2.5 bg-[#f5f5f0] text-[#1a3c5e] font-semibold text-sm border-r border-gray-200">$</span>
                      <input
                        type="number"
                        value={downPayment}
                        min={0}
                        max={homePrice}
                        step={5000}
                        onChange={(e) => handleDownPaymentChange(Number(e.target.value))}
                        className="flex-1 px-3 py-2.5 text-[#1a3c5e] font-medium text-sm outline-none bg-white"
                      />
                    </div>
                    <RangeSlider
                      value={downPayment}
                      min={0}
                      max={homePrice}
                      step={5000}
                      onChange={handleDownPaymentChange}
                    />
                  </div>

                  {/* Down Payment % */}
                  <div>
                    <InputRow
                      label="Down Payment %"
                      suffix="%"
                      value={downPaymentPct}
                      onChange={handleDownPaymentPctChange}
                      min={0}
                      max={100}
                      step={0.5}
                    />
                  </div>

                  {/* Interest Rate */}
                  <div>
                    <InputRow
                      label="Interest Rate"
                      suffix="%"
                      value={interestRate}
                      onChange={(v) => setInterestRate(Math.max(0.1, Math.min(20, v)))}
                      min={0.1}
                      max={20}
                      step={0.1}
                    />
                    <RangeSlider
                      value={interestRate}
                      min={0.1}
                      max={20}
                      step={0.1}
                      onChange={(v) => setInterestRate(v)}
                    />
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>0.1%</span>
                      <span>20%</span>
                    </div>
                  </div>

                  {/* Loan Term */}
                  <div>
                    <label className="block text-sm font-medium text-[#1a3c5e] mb-2">Loan Term</label>
                    <div className="flex gap-2">
                      {[10, 15, 20, 30].map((yr) => (
                        <TermButton
                          key={yr}
                          value={yr}
                          selected={loanTerm === yr}
                          onClick={() => setLoanTerm(yr)}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Additional Costs */}
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <h3 className="font-serif text-lg font-bold text-[#1a3c5e] mb-5 flex items-center gap-2">
                    <TrendingDown size={18} className="text-[#c9a84c]" />
                    Additional Costs
                  </h3>
                  <div className="space-y-4">
                    <InputRow
                      label="Annual Property Tax"
                      prefix="$"
                      value={propertyTax}
                      onChange={(v) => setPropertyTax(Math.max(0, v))}
                      min={0}
                      step={100}
                    />
                    <InputRow
                      label="Annual Home Insurance"
                      prefix="$"
                      value={homeInsurance}
                      onChange={(v) => setHomeInsurance(Math.max(0, v))}
                      min={0}
                      step={100}
                    />
                  </div>

                  {/* PMI Notice */}
                  {computed.pmiEnabled && (
                    <div className="mt-4 flex gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
                      <Info size={18} className="text-amber-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-amber-800">PMI Included</p>
                        <p className="text-xs text-amber-700 mt-0.5 leading-relaxed">
                          Your down payment is below 20%, so Private Mortgage Insurance (PMI) has been automatically included at 0.8% of the loan amount annually ({formatCurrency(computed.monthlyPMI)}/mo). PMI is typically removed once you reach 20% equity.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* RIGHT — Results */}
            <motion.div
              variants={slideInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
            >
              <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-24">
                {/* Monthly Payment Display */}
                <div className="text-center mb-8">
                  <p className="text-sm font-medium text-gray-500 uppercase tracking-widest mb-2">Estimated Monthly Payment</p>
                  <p className="font-serif text-5xl font-bold text-[#c9a84c] leading-none">
                    {formatCurrency(computed.totalMonthly)}
                  </p>
                  <p className="text-xs text-gray-400 mt-2">per month</p>
                </div>

                {/* Breakdown List */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center py-2 border-b border-gray-50">
                    <span className="text-sm text-gray-600 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-sm bg-[#1a3c5e] inline-block" />
                      Principal &amp; Interest
                    </span>
                    <span className="text-sm font-semibold text-[#1a3c5e]">{formatCurrency(computed.monthlyPI)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-50">
                    <span className="text-sm text-gray-600 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-sm bg-[#c9a84c] inline-block" />
                      Property Tax
                    </span>
                    <span className="text-sm font-semibold text-[#1a3c5e]">{formatCurrency(computed.monthlyTax)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-50">
                    <span className="text-sm text-gray-600 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-sm bg-[#4a7fa5] inline-block" />
                      Home Insurance
                    </span>
                    <span className="text-sm font-semibold text-[#1a3c5e]">{formatCurrency(computed.monthlyInsurance)}</span>
                  </div>
                  {computed.pmiEnabled && (
                    <div className="flex justify-between items-center py-2 border-b border-gray-50">
                      <span className="text-sm text-gray-600 flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-sm bg-red-400 inline-block" />
                        PMI
                      </span>
                      <span className="text-sm font-semibold text-[#1a3c5e]">{formatCurrency(computed.monthlyPMI)}</span>
                    </div>
                  )}
                </div>

                {/* Visual Breakdown Bar */}
                <div className="mb-6">
                  <BreakdownBar
                    pi={computed.monthlyPI}
                    tax={computed.monthlyTax}
                    insurance={computed.monthlyInsurance}
                    pmi={computed.monthlyPMI}
                    total={computed.totalMonthly}
                  />
                </div>

                {/* Divider */}
                <div className="border-t border-gray-100 my-6" />

                {/* Summary Stats */}
                <div className="grid grid-cols-1 gap-3 mb-8">
                  <div className="flex justify-between items-center bg-[#f5f5f0] rounded-xl px-4 py-3">
                    <span className="text-sm text-gray-600">Loan Amount</span>
                    <span className="text-sm font-bold text-[#1a3c5e]">{formatCurrency(computed.loanAmount)}</span>
                  </div>
                  <div className="flex justify-between items-center bg-[#f5f5f0] rounded-xl px-4 py-3">
                    <span className="text-sm text-gray-600">Total Interest Paid</span>
                    <span className="text-sm font-bold text-[#1a3c5e]">{formatCurrency(Math.max(0, computed.totalInterest))}</span>
                  </div>
                  <div className="flex justify-between items-center bg-[#f5f5f0] rounded-xl px-4 py-3">
                    <span className="text-sm text-gray-600">Total Cost of Loan</span>
                    <span className="text-sm font-bold text-[#1a3c5e]">{formatCurrency(Math.max(0, computed.totalPaid))}</span>
                  </div>
                </div>

                {/* CTA */}
                <Link
                  href="/contact"
                  className="block w-full text-center bg-[#c9a84c] hover:bg-[#b8943e] text-white font-semibold py-3.5 rounded-xl transition-colors duration-200 shadow-sm"
                >
                  Get Pre-Approved
                </Link>
                <p className="text-xs text-gray-400 text-center mt-3">
                  Speak with a {BRAND.name} mortgage specialist today.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── AMORTIZATION PREVIEW ──────────────────────────────────────────── */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <motion.div variants={fadeInUp} className="text-center mb-10">
              <span className="inline-block text-[#c9a84c] text-xs font-semibold tracking-widest uppercase mb-3">
                Payment Breakdown
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1a3c5e] mb-3">
                Amortization Overview
              </h2>
              <p className="text-gray-500 max-w-xl mx-auto">
                See how your first 12 monthly payments are split between principal and interest.
              </p>
            </motion.div>

            <motion.div variants={scaleIn} className="overflow-x-auto rounded-2xl shadow-sm border border-gray-100">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#1a3c5e] text-white">
                    <th className="px-4 py-3 text-left font-semibold">Month</th>
                    <th className="px-4 py-3 text-right font-semibold">Payment</th>
                    <th className="px-4 py-3 text-right font-semibold">Principal</th>
                    <th className="px-4 py-3 text-right font-semibold">Interest</th>
                    <th className="px-4 py-3 text-right font-semibold">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {amortizationRows.map((row, idx) => (
                    <tr
                      key={row.month}
                      className={idx % 2 === 0 ? "bg-white" : "bg-[#f5f5f0]"}
                    >
                      <td className="px-4 py-3 text-[#1a3c5e] font-medium">{row.month}</td>
                      <td className="px-4 py-3 text-right text-gray-700">{formatCurrency(row.payment)}</td>
                      <td className="px-4 py-3 text-right text-[#c9a84c] font-medium">{formatCurrency(row.principal)}</td>
                      <td className="px-4 py-3 text-right text-gray-500">{formatCurrency(row.interest)}</td>
                      <td className="px-4 py-3 text-right text-[#1a3c5e] font-semibold">{formatCurrency(row.balance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── TIPS SECTION ──────────────────────────────────────────────────── */}
      <section className="bg-[#f5f5f0] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <motion.div variants={fadeInUp} className="text-center mb-10">
              <span className="inline-block text-[#c9a84c] text-xs font-semibold tracking-widest uppercase mb-3">
                Expert Advice
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1a3c5e] mb-3">
                Mortgage Tips
              </h2>
              <p className="text-gray-500 max-w-xl mx-auto">
                Smart strategies to help you secure the best mortgage for your situation.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {tips.map((tip) => {
                const Icon = tip.icon;
                return (
                  <motion.div
                    key={tip.title}
                    variants={scaleIn}
                    className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#1a3c5e]/8 flex items-center justify-center mb-4">
                      <Icon size={22} className="text-[#c9a84c]" />
                    </div>
                    <h3 className="font-serif text-lg font-bold text-[#1a3c5e] mb-3">{tip.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{tip.body}</p>
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom CTA */}
            <motion.div variants={fadeInUp} className="text-center mt-12">
              <p className="text-gray-600 mb-4">
                Ready to take the next step? Our agents are here to guide you through the entire process.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-[#1a3c5e] hover:bg-[#15304d] text-white font-semibold px-6 py-3 rounded-xl transition-colors duration-200"
                >
                  Talk to an Agent
                </Link>
                <Link
                  href="/listings"
                  className="inline-flex items-center justify-center gap-2 bg-white border border-[#1a3c5e] text-[#1a3c5e] hover:bg-[#1a3c5e] hover:text-white font-semibold px-6 py-3 rounded-xl transition-colors duration-200"
                >
                  Browse Listings
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
