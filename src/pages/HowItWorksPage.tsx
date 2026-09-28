import React from 'react';
import { useApp } from '../context/AppContext.tsx';
import { JAZZCASH_NUMBER, JAZZCASH_TITLE, AGENCY_WHATSAPP } from '../data/mockData.ts';
import {
  FileText,
  CreditCard,
  UserCheck,
  Rocket,
  BarChart,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

export const HowItWorksPage: React.FC = () => {
  const { setCurrentPage } = useApp();

  const steps = [
    {
      num: '01',
      title: 'Submit Campaign Requirements',
      icon: FileText,
      desc: 'Pick from 11 specialized ad campaign formats (Product, E-commerce, Meta, Google, TikTok, Lead Gen). Enter your product details, budget, target locations, and upload your visual creatives.',
      highlight: 'Takes under 3 minutes',
    },
    {
      num: '02',
      title: 'Choose Ad Account Strategy',
      icon: UserCheck,
      desc: 'Decide whether to run ads on Digital Rankup’s high-limit Agency Accounts (no credit card required) or link your own Business Manager safely without sharing passwords.',
      highlight: 'Zero passwords requested',
    },
    {
      num: '03',
      title: 'Fund Via JazzCash Manual Transfer',
      icon: CreditCard,
      desc: `Transfer your ad budget + agency management fee to official JazzCash number: ${JAZZCASH_NUMBER} (${JAZZCASH_TITLE}). Enter your Transaction ID (TID) and receipt proof on the checkout form.`,
      highlight: `Official: ${JAZZCASH_NUMBER}`,
    },
    {
      num: '04',
      title: 'Admin Verification & Media Buyer Staging',
      icon: Rocket,
      desc: 'Our finance desk verifies statement reconciliations within 30 minutes. An assigned Senior Media Buyer stages your pixel events, builds targeted ad sets, and submits for live launch.',
      highlight: 'Fast 2-hour turnaround',
    },
    {
      num: '05',
      title: 'Live Campaign & ROAS Reporting',
      icon: BarChart,
      desc: 'Watch real-time link clicks, impressions, cost per purchase (CPA), and gross store sales in your Customer Dashboard. Download official PDF invoices and scale budgets on demand.',
      highlight: 'Live verified analytics',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
          Transparent Operating Model
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-neutral-950 dark:text-white">
          How It Works: From Idea to Scaled Revenue
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
          A seamless 5-step agency execution pipeline designed for Pakistani and international e-commerce founders and brands.
        </p>
      </div>

      {/* Steps Timeline */}
      <div className="space-y-6">
        {steps.map((st, idx) => {
          const Icon = st.icon;
          return (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xs hover:border-blue-500/40 transition-all"
            >
              <div className="flex items-start sm:items-center gap-5">
                <div className="text-2xl font-black font-display text-blue-600 dark:text-blue-400 shrink-0">
                  {st.num}
                </div>
                <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="space-y-1 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white">
                      {st.title}
                    </h3>
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
                      {st.highlight}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {st.desc}
                  </p>
                </div>
              </div>

              <div className="shrink-0 self-end md:self-center">
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Ready to execute
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Callout Strip */}
      <div className="p-8 rounded-3xl bg-neutral-900 text-white border border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <h3 className="text-xl font-bold font-display">
            Have a custom advertising project or large monthly budget?
          </h3>
          <p className="text-xs text-neutral-300">
            Talk directly to our Senior Media Buying Director on WhatsApp for customized account setups.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <a
            href={`https://wa.me/${AGENCY_WHATSAPP}`}
            target="_blank"
            rel="noreferrer"
            className="px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold transition-colors cursor-pointer"
          >
            Chat on WhatsApp
          </a>
          <button
            onClick={() => setCurrentPage('create_campaign')}
            className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <span>Create Campaign</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
