import React, { useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { JAZZCASH_NUMBER, JAZZCASH_TITLE, AGENCY_WHATSAPP } from '../data/mockData.ts';
import {
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  Zap,
  Layers,
  ShoppingBag,
  Globe,
  Smartphone,
  ChevronDown,
  ChevronUp,
  Play,
  CreditCard,
  Target,
  BarChart3,
  Award,
  Users,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { setCurrentPage, navigateToCheckout, openAuthModal, packages } = useApp();

  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const campaignTypes = [
    {
      title: 'E-commerce Sales Ads',
      desc: 'High-converting catalog & dynamic retargeting ads that maximize Return on Ad Spend (ROAS).',
      badge: 'Meta & TikTok',
      icon: ShoppingBag,
      stat: '4.8x Avg ROAS',
    },
    {
      title: 'Google & YouTube Search',
      desc: 'Capture high-intent buyers searching directly for your products or professional services.',
      badge: 'Google Partner',
      icon: Target,
      stat: '3.2x Intent Conversion',
    },
    {
      title: 'Lead Generation Funnels',
      desc: 'Qualified instant form and landing page leads for real estate, B2B services, and clinics.',
      badge: 'CAPI Integrated',
      icon: Users,
      stat: 'Rs 120 Avg CPL',
    },
    {
      title: 'Mobile App Installs',
      desc: 'Direct installs and in-app event optimization across Android & iOS via Universal App Campaigns.',
      badge: 'App Stores',
      icon: Smartphone,
      stat: '90%+ First-Open Rate',
    },
    {
      title: 'TikTok Viral & Spark Ads',
      desc: 'Leverage creator content and trending audio hooks to scale impulse purchases rapidly.',
      badge: 'Viral Engine',
      icon: Play,
      stat: '10M+ Monthly Views',
    },
    {
      title: 'Product & Website Traffic',
      desc: 'Drive laser-targeted qualified visitors to Shopify, WooCommerce, and custom web stores.',
      badge: 'Omnichannel',
      icon: Globe,
      stat: 'Rs 6.5 Avg CPC',
    },
  ];

  const caseStudies = [
    {
      brand: 'UltraBass Pro Audio',
      channel: 'Meta & TikTok Ads',
      spend: 'PKR 112,400',
      revenue: 'PKR 5,252,382',
      roas: '4.67x ROAS',
      result: '618 Confirmed Orders',
      image: '/src/assets/images/meta_google_ads_visual_1790601007917.jpg',
    },
    {
      brand: 'Festive Pret Fashion',
      channel: 'Instagram Reels & Dynamic Ads',
      spend: 'PKR 240,000',
      revenue: 'PKR 1,180,000',
      roas: '4.91x ROAS',
      result: '820 Lawn & Chiffon Units',
      image: '/src/assets/images/agency_team_meeting_1790601021903.jpg',
    },
  ];

  const faqs = [
    {
      q: 'How does payment with JazzCash work?',
      a: `Transfer your advertising budget and management fee to our official JazzCash business number: ${JAZZCASH_NUMBER} (Account Title: ${JAZZCASH_TITLE}). After making the transfer via the JazzCash app or *786#, enter your Transaction ID (TID) and upload the receipt screenshot on our Checkout page. Our finance team reconciles the statement and verifies your payment within 15 to 30 minutes!`,
    },
    {
      q: 'Do I need to give you my personal Facebook or Google password?',
      a: 'Never! Digital Rankup Agency enforces strict zero-password compliance. If you choose "My Own Advertising Account", you simply grant Partner or Agency permissions inside your Meta Business Manager or Google Ads MCC via our partner ID. If you choose "Agency Advertising Account", our agency runs the campaigns on our enterprise agency credit accounts.',
    },
    {
      q: 'What is the minimum budget required to start running ads?',
      a: 'We recommend a minimum daily ad spend of PKR 3,000 to PKR 5,000 (roughly PKR 50,000/month) to give ad network algorithms sufficient conversion data to exit the learning phase and optimize properly.',
    },
    {
      q: 'Can I track campaign performance and ROAS live?',
      a: 'Yes! Every client has a dedicated Customer Dashboard displaying verified real-time metrics including Total Spend, Impressions, Link Clicks, Conversions, Cost Per Click (CPC), and exact ROAS. You can also download official PDF invoices anytime.',
    },
  ];

  return (
    <div className="space-y-20 pb-20">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden pt-8 sm:pt-16 pb-12 sm:pb-20 border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                <span>Premier Advertising Agency & Campaign Runner Platform</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-950 dark:text-white leading-[1.1]">
                Scale Your Revenue With Precision Ad Campaigns
              </h1>

              <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl leading-relaxed">
                We design, launch, and manage high-performing paid ads across Meta, Google, TikTok, and YouTube. Transparent JazzCash billing, dedicated media buyers, and verified ROAS analytics.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => setCurrentPage('create_campaign')}
                  className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold shadow-lg hover:shadow-blue-500/25 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Launch New Campaign</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setCurrentPage('pricing')}
                  className="px-6 py-3.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-750 text-sm font-semibold text-neutral-800 dark:text-neutral-200 transition-colors cursor-pointer"
                >
                  View Agency Packages
                </button>

                <a
                  href={`https://wa.me/${AGENCY_WHATSAPP}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-3.5 text-sm font-semibold text-[#25D366] hover:underline flex items-center gap-1.5 cursor-pointer"
                >
                  <span>WhatsApp 03212583543</span>
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800 flex flex-wrap items-center gap-6 text-xs text-neutral-500 dark:text-neutral-400">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>Verified JazzCash Receiver: {JAZZCASH_NUMBER}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-500" />
                  <span>Official Business Manager Access</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-500" />
                  <span>4.6x Average Campaign ROAS</span>
                </div>
              </div>
            </div>

            {/* Right Media Hero */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-2xl bg-neutral-900 group">
                <img
                  src="/src/assets/images/hero_marketing_agency_1790600995857.jpg"
                  alt="Digital Rankup Agency Headquarters and Performance Ads Dashboard"
                  referrerPolicy="no-referrer"
                  className="w-full h-80 sm:h-96 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/30 to-transparent" />
                
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-neutral-900/90 backdrop-blur-md border border-neutral-700/80 text-white">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                      Live Agency Metric
                    </span>
                    <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 border border-emerald-800/80 px-2 py-0.5 rounded">
                      +467% ROAS
                    </span>
                  </div>
                  <p className="text-sm font-semibold">Verified Client Multi-Channel Performance</p>
                  <div className="mt-2 grid grid-cols-3 gap-2 pt-2 border-t border-neutral-800 text-[11px] font-mono text-neutral-300">
                    <div>
                      <p className="text-neutral-500">Spend</p>
                      <p className="font-bold text-white">PKR 112.4K</p>
                    </div>
                    <div>
                      <p className="text-neutral-500">Revenue</p>
                      <p className="font-bold text-white">PKR 5.25M</p>
                    </div>
                    <div>
                      <p className="text-neutral-500">Purchases</p>
                      <p className="font-bold text-emerald-400">618 Sales</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Key Metrics Proof Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
          <div>
            <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
              Total Managed Ad Spend
            </p>
            <p className="text-2xl sm:text-3xl font-extrabold font-mono text-neutral-900 dark:text-white mt-1">
              PKR 240M+
            </p>
            <p className="text-[11px] text-neutral-500 mt-0.5">Across Meta, Google & TikTok</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
              Average Client ROAS
            </p>
            <p className="text-2xl sm:text-3xl font-extrabold font-mono text-blue-600 dark:text-blue-400 mt-1">
              4.62x
            </p>
            <p className="text-[11px] text-neutral-500 mt-0.5">High-intent purchase funnels</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
              Active Campaigns
            </p>
            <p className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400 mt-1">
              180+
            </p>
            <p className="text-[11px] text-neutral-500 mt-0.5">Live optimization daily</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
              JazzCash Reconciled
            </p>
            <p className="text-2xl sm:text-3xl font-extrabold font-mono text-neutral-900 dark:text-white mt-1">
              99.8%
            </p>
            <p className="text-[11px] text-neutral-500 mt-0.5">Same-day proof approval</p>
          </div>
        </div>
      </section>

      {/* 3. Core Advertising Capabilities (All 11 Campaign Types) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              Full-Spectrum Ad Management
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-neutral-950 dark:text-white mt-1">
              Every Type of Advertising Campaign Supported
            </h2>
          </div>
          <button
            onClick={() => setCurrentPage('services')}
            className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
          >
            <span>Explore All 11 Ad Services</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaignTypes.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-blue-500/50 transition-all shadow-xs group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
                    {item.badge}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                  {item.desc}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-neutral-100 dark:border-neutral-800 text-xs">
                  <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                    {item.stat}
                  </span>
                  <button
                    onClick={() => setCurrentPage('create_campaign')}
                    className="text-neutral-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    Launch <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Case Studies & Proof of Performance */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            Verified Case Studies
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-neutral-950 dark:text-white mt-1">
            Real Campaign Spend & Verified Store Revenues
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {caseStudies.map((cs, i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-md flex flex-col"
            >
              <div className="relative h-56 bg-neutral-900 overflow-hidden">
                <img
                  src={cs.image}
                  alt={cs.brand}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
                  <div>
                    <p className="text-sm font-bold">{cs.brand}</p>
                    <p className="text-xs text-neutral-300">{cs.channel}</p>
                  </div>
                  <span className="font-mono font-bold text-sm bg-emerald-500 text-neutral-950 px-2.5 py-0.5 rounded-full">
                    {cs.roas}
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="grid grid-cols-3 gap-3 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800 text-xs font-mono">
                  <div>
                    <p className="text-neutral-500 text-[10px]">Ad Spend</p>
                    <p className="font-bold text-neutral-900 dark:text-white">{cs.spend}</p>
                  </div>
                  <div>
                    <p className="text-neutral-500 text-[10px]">Gross Sales</p>
                    <p className="font-bold text-emerald-600 dark:text-emerald-400">{cs.revenue}</p>
                  </div>
                  <div>
                    <p className="text-neutral-500 text-[10px]">Orders / Leads</p>
                    <p className="font-bold text-blue-600 dark:text-blue-400">{cs.result}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-2 border-t border-neutral-100 dark:border-neutral-800">
                  <span className="text-neutral-500">JazzCash Verified Transaction</span>
                  <button
                    onClick={() => setCurrentPage('create_campaign')}
                    className="font-bold text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Replicate Campaign Strategy →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. JazzCash Official Payment Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 text-white border border-neutral-800 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/20 text-red-400 border border-red-500/30 text-xs font-bold">
                <span>JazzCash Payment Gateway Integration Ready</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight">
                Seamless Payment via JazzCash
              </h2>
              <p className="text-sm text-neutral-300 leading-relaxed max-w-xl">
                Fund your campaigns directly through Pakistan’s leading mobile wallet. We separate your direct media spend budget from agency management fees for 100% financial transparency.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <div className="p-3 rounded-xl bg-neutral-800/80 border border-neutral-700">
                  <p className="text-[11px] text-neutral-400 uppercase font-semibold">Receiver JazzCash Number</p>
                  <p className="text-xl font-mono font-bold text-emerald-400 tracking-wider">
                    {JAZZCASH_NUMBER}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-neutral-800/80 border border-neutral-700">
                  <p className="text-[11px] text-neutral-400 uppercase font-semibold">Account Title</p>
                  <p className="text-sm font-semibold text-white">
                    {JAZZCASH_TITLE}
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-neutral-800/60 backdrop-blur-md rounded-2xl p-6 border border-neutral-700/60 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                Simple 3-Step Verification
              </h4>
              <ul className="space-y-3 text-xs text-neutral-300">
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                    1
                  </span>
                  <span>Transfer your budget via JazzCash Mobile App or *786# to <strong>{JAZZCASH_NUMBER}</strong></span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                    2
                  </span>
                  <span>Enter your JazzCash Transaction ID (TID) and submit receipt proof on our checkout form</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                    3
                  </span>
                  <span>Admin instantly verifies statement and media buyer launches your campaign within 2 hours</span>
                </li>
              </ul>

              <button
                onClick={() => setCurrentPage('create_campaign')}
                className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <CreditCard className="w-4 h-4" />
                <span>Start Campaign & Pay with JazzCash</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Pricing Packages Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            Clear, Predictable Agency Rates
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-neutral-950 dark:text-white mt-1">
            Choose Your Advertising Growth Tier
          </h2>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-2">
            No hidden clauses. All tiers include full tracking setup, pixel verification, and weekly performance reports.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`rounded-2xl p-6 flex flex-col justify-between transition-all bg-white dark:bg-neutral-900 border ${
                pkg.popular
                  ? 'border-blue-600 ring-2 ring-blue-600/20 shadow-xl'
                  : 'border-neutral-200 dark:border-neutral-800'
              }`}
            >
              <div className="space-y-4">
                {pkg.popular && (
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-600 text-white inline-block">
                    Most Popular
                  </span>
                )}
                <div>
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white">{pkg.name}</h3>
                  <p className="text-xs text-neutral-500 mt-1">{pkg.tagline}</p>
                </div>

                <div className="py-2 border-y border-neutral-100 dark:border-neutral-800">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl sm:text-3xl font-extrabold font-mono text-neutral-950 dark:text-white">
                      Rs {pkg.pricePKR.toLocaleString()}
                    </span>
                    <span className="text-xs text-neutral-500">/ month fee</span>
                  </div>
                  <p className="text-[11px] text-neutral-400 mt-1">
                    Management fee: {pkg.managementFeePercent}% of ad spend
                  </p>
                </div>

                <ul className="space-y-2 text-xs text-neutral-600 dark:text-neutral-300">
                  {pkg.features.map((f, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6">
                <button
                  onClick={() => setCurrentPage('create_campaign')}
                  className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    pkg.popular
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md'
                      : 'bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-900 dark:text-white'
                  }`}
                >
                  Select {pkg.name}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. FAQs */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center">
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            Got Questions?
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950 dark:text-white mt-1">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="divide-y divide-neutral-200 dark:divide-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden">
          {faqs.map((faq, idx) => (
            <div key={idx} className="p-5">
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between text-left text-sm font-semibold text-neutral-900 dark:text-white gap-4 cursor-pointer"
              >
                <span>{faq.q}</span>
                {activeFaq === idx ? (
                  <ChevronUp className="w-4 h-4 text-blue-600 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-neutral-400 shrink-0" />
                )}
              </button>
              {activeFaq === idx && (
                <p className="mt-3 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed pr-6">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
