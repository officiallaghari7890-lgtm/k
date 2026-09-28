import React from 'react';
import { useApp } from '../context/AppContext.tsx';
import {
  ShoppingBag,
  Globe,
  Smartphone,
  Layers,
  Target,
  Play,
  Users,
  Compass,
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  Zap,
} from 'lucide-react';

export const ServicesPage: React.FC = () => {
  const { setCurrentPage } = useApp();

  const services = [
    {
      id: 'ecommerce_sales',
      title: 'E-commerce Sales & Conversion Ads',
      objective: 'Scale purchases with positive cashflow ROAS',
      desc: 'Dynamic Product Ads (DPA), multi-product carousels, and catalog sales connected directly to Shopify, WooCommerce, and custom stores.',
      deliverables: ['Product catalog synchronization', 'High-intent Add to Cart retargeting', 'Purchase CAPI conversion optimization', 'Average 4.2x - 5.5x verified ROAS'],
      icon: ShoppingBag,
      platforms: ['Meta (FB & IG)', 'TikTok Ads', 'Google Shopping'],
    },
    {
      id: 'product_ads',
      title: 'Product Advertisement',
      objective: 'Highlight individual hero items and new arrivals',
      desc: 'Showcase specific retail, fashion, electronics, or beauty products with high-converting video hooks, UGC creators, and benefit-driven ad copy.',
      deliverables: ['Short-form video editing', 'Direct-response copy angles', 'Lookalike customer targeting', 'Conversion rate optimization'],
      icon: Zap,
      platforms: ['Instagram Reels', 'TikTok', 'YouTube Shorts'],
    },
    {
      id: 'website_ads',
      title: 'Website & Traffic Campaigns',
      objective: 'Drive qualified intent-driven traffic to landing pages',
      desc: 'Attract warm prospects searching for your services and products through keyword-targeted Google Search and high-CTR social traffic campaigns.',
      deliverables: ['Keyword research & negative keyword filtering', 'Quality Score optimization', 'Landing page CTR maximization', 'Cost per click minimization'],
      icon: Globe,
      platforms: ['Google Search', 'Meta Traffic', 'Bing / Microsoft Ads'],
    },
    {
      id: 'mobile_app_ads',
      title: 'Mobile App Installs & In-App Events',
      objective: 'Scale iOS and Android active downloads',
      desc: 'Deep-linked mobile app install campaigns optimized for Day-1 retention, user registrations, and in-app subscription purchases.',
      deliverables: ['Firebase & AppsFlyer SDK tracking', 'Google Universal App Campaigns (UAC)', 'TikTok App Install optimization', 'App Store and Play Store conversion testing'],
      icon: Smartphone,
      platforms: ['Google UAC', 'Apple Search Ads', 'Meta App Installs'],
    },
    {
      id: 'facebook_instagram_ads',
      title: 'Facebook & Instagram Ads (Meta)',
      objective: 'Dominate social feeds with scroll-stopping creative',
      desc: 'Full-funnel Meta advertising architecture: Cold prospecting, interest stacking, lookalike audiences, and warm retargeting funnels.',
      deliverables: ['Meta Conversions API (CAPI) server tracking', 'A/B testing ad sets', 'Reels, Story, and Feed creative formatting', 'Weekly budget scaling rules'],
      icon: Layers,
      platforms: ['Facebook', 'Instagram', 'Messenger', 'Audience Network'],
    },
    {
      id: 'google_ads',
      title: 'Google Ads & Performance Max',
      objective: 'Capture high-ticket buyers at the exact moment of search',
      desc: 'Omnipresent Google marketing across Search, Maps, Display, Gmail, and Performance Max asset groups for peak buyer intent.',
      deliverables: ['High-intent exact match keywords', 'Target ROAS (tROAS) smart bidding', 'Negative keyword list protection', 'Conversion tracking with Google Tag Manager'],
      icon: Target,
      platforms: ['Google Search', 'Google Maps', 'Google Display Network', 'Performance Max'],
    },
    {
      id: 'youtube_ads',
      title: 'YouTube Performance Video Ads',
      objective: 'Tell captivating brand stories and drive instant action',
      desc: 'Skippable in-stream video ads, non-skippable bumper ads, and YouTube Shorts ads crafted to hook viewers in the first 5 seconds.',
      deliverables: ['Hook-Hold-Payoff script framework', 'Custom intent audience targeting', 'Connected TV & mobile placements', 'View-through conversion measurement'],
      icon: Play,
      platforms: ['YouTube Main', 'YouTube Shorts', 'Google Video Partners'],
    },
    {
      id: 'tiktok_ads',
      title: 'TikTok Ads & Spark Ads',
      objective: 'Harness organic vitality for rapid customer acquisition',
      desc: 'Native TikTok ad formats that feel like real organic TikToks rather than commercials, utilizing Spark Ads with authorized creator posts.',
      deliverables: ['Spark Ads code integration', 'Trending audio licensing', 'Dynamic showcase ads', 'Fast viral scale without ad fatigue'],
      icon: Play,
      platforms: ['TikTok In-Feed', 'TikTok Spark Ads', 'TikTok TopView'],
    },
    {
      id: 'lead_generation',
      title: 'Lead Generation Funnels',
      objective: 'Deliver qualified sales appointments & inquiries',
      desc: 'Instant Lead Forms on Meta and high-converting landing page funnels for real estate developers, agencies, coaching, and clinics.',
      deliverables: ['Pre-qualifying questionnaire logic', 'Instant WhatsApp & CRM lead webhook routing', 'Automated email/SMS lead alerts', 'Low cost per qualified lead (CPL)'],
      icon: Users,
      platforms: ['Meta Instant Forms', 'Google Lead Form Extensions', 'LinkedIn Ads'],
    },
    {
      id: 'brand_awareness',
      title: 'Brand Awareness & Reach',
      objective: 'Build market authority and top-of-mind dominance',
      desc: 'Massive local or nationwide impression campaigns designed to establish credibility and prime your audience for direct response conversions.',
      deliverables: ['Brand lift studies', 'Frequency capping controls', 'High-reach geo-targeting', 'Video completion rate analysis'],
      icon: Compass,
      platforms: ['All Supported Networks'],
    },
    {
      id: 'website_app_ads',
      title: 'Website & App Combined Ecosystem',
      objective: 'Unified omni-channel acquisition across web and mobile',
      desc: 'Cohesive advertising journey directing users to the highest converting channel—whether mobile web checkout or native mobile app.',
      deliverables: ['Cross-platform attribution', 'Omni-channel pixel sync', 'Unified creative suite', 'Full-funnel reporting dashboard'],
      icon: TrendingUp,
      platforms: ['Meta', 'Google', 'TikTok', 'YouTube'],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
          Digital Rankup Capabilities
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-neutral-950 dark:text-white">
          Comprehensive Advertising Services
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
          From high-velocity e-commerce sales to high-ticket lead generation funnels, our agency handles strategy, copy, media buying, and real-time optimization.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((svc) => {
          const Icon = svc.icon;
          return (
            <div
              key={svc.id}
              className="rounded-2xl p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex flex-col justify-between hover:border-blue-500/60 transition-all shadow-xs group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono uppercase font-semibold text-neutral-400">
                    Service 0{services.indexOf(svc) + 1}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white">{svc.title}</h3>
                  <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mt-0.5">
                    {svc.objective}
                  </p>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-2 leading-relaxed">
                    {svc.desc}
                  </p>
                </div>

                <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800">
                  <p className="text-[11px] font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">
                    Key Deliverables:
                  </p>
                  <ul className="space-y-1 text-xs text-neutral-500 dark:text-neutral-400">
                    {svc.deliverables.map((d, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {svc.platforms.map((p, i) => (
                    <span
                      key={i}
                      className="text-[10px] px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-neutral-100 dark:border-neutral-800 mt-6">
                <button
                  onClick={() => setCurrentPage('create_campaign')}
                  className="w-full py-2.5 px-3 bg-neutral-100 dark:bg-neutral-800 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer text-neutral-900 dark:text-white"
                >
                  <span>Launch This Campaign</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
