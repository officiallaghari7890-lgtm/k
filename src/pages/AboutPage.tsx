import React from 'react';
import { useApp } from '../context/AppContext.tsx';
import { JAZZCASH_NUMBER, AGENCY_WHATSAPP } from '../data/mockData.ts';
import { ShieldCheck, Award, Users, TrendingUp, ArrowRight, CheckCircle2 } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { setCurrentPage } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
          Who We Are
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-neutral-950 dark:text-white">
          Architecting High-ROAS Advertising Engines
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
          Digital Rankup Agency was founded with a singular conviction: paid advertising should be an exact financial science, not an arbitrary gamble.
        </p>
      </div>

      {/* Story & Image Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6 text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-neutral-950 dark:text-white">
            Built for Pakistani & International Advertisers
          </h2>
          <p>
            Operating across Karachi, Lahore, Islamabad, and global markets, Digital Rankup Agency manages full-funnel media buying across Meta, Google Search, TikTok Spark Ads, and YouTube.
          </p>
          <p>
            Unlike traditional agencies that obscure ad spend or charge opaque retainers, we operate with 100% budget transparency. Direct ad spend goes entirely to ad networks, supported seamlessly by localized JazzCash instant transfers ({JAZZCASH_NUMBER}) alongside international business accounts.
          </p>
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
              <p className="text-2xl font-extrabold font-mono text-blue-600 dark:text-blue-400">PKR 240M+</p>
              <p className="text-xs text-neutral-500 mt-1">Managed Ad Spend</p>
            </div>
            <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
              <p className="text-2xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400">4.6x Avg</p>
              <p className="text-xs text-neutral-500 mt-1">E-commerce ROAS</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-xl bg-neutral-900">
          <img
            src="/src/assets/images/agency_team_meeting_1790601021903.jpg"
            alt="Digital Rankup Media Buying Boardroom"
            referrerPolicy="no-referrer"
            className="w-full h-80 object-cover"
          />
        </div>
      </div>

      {/* Core Principles */}
      <div className="space-y-8">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-neutral-950 dark:text-white">Our 4 Non-Negotiable Pillars</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Zero Password Sharing',
              desc: 'We never ask for personal social account passwords. Connections use official Meta & Google partner permissions.',
              icon: ShieldCheck,
            },
            {
              title: 'Verified Performance Data',
              desc: 'No fabricated screenshots or vanity numbers. We report actual purchase conversions and verified ROAS.',
              icon: TrendingUp,
            },
            {
              title: 'Transparent JazzCash Billing',
              desc: '100% itemized invoices separating pure ad media budget from agency management fees.',
              icon: Award,
            },
            {
              title: 'Dedicated Media Buyers',
              desc: 'Every client is paired with an experienced media buyer who actively monitors campaigns daily.',
              icon: Users,
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-3"
              >
                <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 w-fit">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-neutral-900 dark:text-white">{item.title}</h4>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA */}
      <div className="p-8 rounded-3xl bg-neutral-900 text-white border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-xl font-bold font-display">Ready to scale with Digital Rankup?</h3>
          <p className="text-xs text-neutral-300 mt-1">Get your first campaign launched today.</p>
        </div>
        <button
          onClick={() => setCurrentPage('create_campaign')}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
        >
          <span>Launch Campaign</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
