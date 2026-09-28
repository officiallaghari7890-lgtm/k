import React, { useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import {
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  ExternalLink,
  Layers,
  Target,
  Play,
  Share2,
  AlertTriangle,
} from 'lucide-react';

export const AdPlatformsPage: React.FC = () => {
  const { setCurrentPage } = useApp();
  const [selectedAccountType, setSelectedAccountType] = useState<
    'client_account' | 'agency_account' | 'new_account'
  >('agency_account');

  const platforms = [
    {
      name: 'Meta Ads (Facebook & Instagram)',
      reach: '3.1 Billion Monthly Active Users',
      formats: ['Reels 9:16 Video Ads', 'Feed Carousel Ads', 'Instant Experience', 'Lead Forms'],
      bestFor: 'E-commerce sales, impulse purchases, fashion, consumer gadgets, local clinic leads',
      tracking: 'Meta Conversions API (CAPI) + Advanced Matching + Aggregated Event Measurement',
      icon: Layers,
    },
    {
      name: 'Google Ads & Performance Max',
      reach: '92% Global Search Market Share',
      formats: ['Search Intent Ads', 'Performance Max (PMax)', 'Google Shopping PLAs', 'Maps Local Ads'],
      bestFor: 'High-intent product discovery, B2B services, urgent problem-solving searches',
      tracking: 'Google Tag Manager + GA4 Enhanced Conversions + Offline Conversion Uploads',
      icon: Target,
    },
    {
      name: 'TikTok Ads & Spark Ads',
      reach: '1.2 Billion Active Video Viewers',
      formats: ['Spark Ads (Creator Organic Boost)', 'In-Feed Video Ads', 'TopView Takeover'],
      bestFor: 'Gen Z and Millennial audiences, viral consumer items, viral challenges',
      tracking: 'TikTok Events API Server Tracking + Advanced Audience Builder',
      icon: Play,
    },
    {
      name: 'YouTube Performance Video',
      reach: '2.5 Billion Video Streamers',
      formats: ['TrueView In-Stream', 'YouTube Shorts Ads', 'Non-Skippable Bumpers', 'Masthead'],
      bestFor: 'Brand authority, deep product demonstrations, high-ticket trust building',
      tracking: 'Google Ads Video Attribution & View-Through Conversion Window',
      icon: Play,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
          Enterprise Multi-Channel Deployment
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-neutral-950 dark:text-white">
          Advertising Platforms & Account Management
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
          We leverage authorized partner tools and enterprise business managers across every tier-1 network. Zero account password requests guaranteed.
        </p>
      </div>

      {/* Account Management Architecture Section (Feature 6) */}
      <div className="p-8 rounded-3xl bg-neutral-900 text-white border border-neutral-800 space-y-8">
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold border border-blue-500/30">
            <Lock className="w-3.5 h-3.5" />
            <span>Strict Zero Password Policy</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            How Advertising Account Assignment Works
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300">
            When launching a campaign, you decide who owns and runs the ad account. Digital Rankup Agency handles the technical infrastructure safely and transparently.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => setSelectedAccountType('agency_account')}
            className={`p-5 rounded-2xl text-left border transition-all cursor-pointer ${
              selectedAccountType === 'agency_account'
                ? 'bg-blue-600/20 border-blue-500 text-white ring-2 ring-blue-500/30'
                : 'bg-neutral-800/60 border-neutral-700/80 text-neutral-300 hover:bg-neutral-800'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-sm">Agency Advertising Account</span>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-blue-500/30 text-blue-300">
                Recommended
              </span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              We run ads using Digital Rankup’s enterprise agency accounts. You don't need international credit cards.
            </p>
          </button>

          <button
            onClick={() => setSelectedAccountType('client_account')}
            className={`p-5 rounded-2xl text-left border transition-all cursor-pointer ${
              selectedAccountType === 'client_account'
                ? 'bg-blue-600/20 border-blue-500 text-white ring-2 ring-blue-500/30'
                : 'bg-neutral-800/60 border-neutral-700/80 text-neutral-300 hover:bg-neutral-800'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-sm">My Own Advertising Account</span>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-neutral-700 text-neutral-300">
                Client Owned
              </span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Connect your existing Meta or Google account via official Partner Request. All pixel assets remain yours.
            </p>
          </button>

          <button
            onClick={() => setSelectedAccountType('new_account')}
            className={`p-5 rounded-2xl text-left border transition-all cursor-pointer ${
              selectedAccountType === 'new_account'
                ? 'bg-blue-600/20 border-blue-500 text-white ring-2 ring-blue-500/30'
                : 'bg-neutral-800/60 border-neutral-700/80 text-neutral-300 hover:bg-neutral-800'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-sm">New Account Required</span>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-500/30 text-emerald-300">
                Assisted Setup
              </span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Our specialists set up a brand new, verified Business Manager, verified domain, and pixel from scratch.
            </p>
          </button>
        </div>

        {/* Selected Details View */}
        <div className="p-6 rounded-2xl bg-neutral-950/60 border border-neutral-800 text-xs space-y-4">
          {selectedAccountType === 'agency_account' && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <CheckCircle2 className="w-4 h-4" />
                <span>Zero Account Setup Hassle – 100% Guaranteed Delivery</span>
              </div>
              <p className="text-neutral-300 leading-relaxed">
                With an Agency Account, you simply fund your campaign budget using JazzCash (03212583543). We allocate media spend directly from our whitelisted, high-limit agency credit lines. There is zero risk of card declines, currency conversion tax penalties, or account restrictions.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-neutral-400 font-mono text-[11px]">
                <div className="p-2.5 rounded bg-neutral-900 border border-neutral-800">
                  ✓ High spending limits from Day 1
                </div>
                <div className="p-2.5 rounded bg-neutral-900 border border-neutral-800">
                  ✓ Dedicated Meta & Google Partner Rep support
                </div>
              </div>
            </div>
          )}

          {selectedAccountType === 'client_account' && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
                <ShieldCheck className="w-4 h-4" />
                <span>Safe Partner Linking Without Password Sharing</span>
              </div>
              <p className="text-neutral-300 leading-relaxed">
                Keep complete ownership of your pixel data, custom audiences, and billing. We will provide our official Digital Rankup Partner Business ID (`BM-8921049`). You simply add our agency as an authorized Partner inside Meta Business Settings or Google Ads MCC with advertiser access.
              </p>
              <div className="flex items-center gap-2 p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px]">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>Security Notice: Never share your personal Facebook password with any marketing agency.</span>
              </div>
            </div>
          )}

          {selectedAccountType === 'new_account' && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-sm">
                <Share2 className="w-4 h-4" />
                <span>Brand New Business Manager & Asset Verification</span>
              </div>
              <p className="text-neutral-300 leading-relaxed">
                If your business is newly incorporated or your previous ad accounts encountered blocks, our certified technical team configures a fresh, compliant Business Manager, attaches your domain DNS TXT records, installs CAPI tracking, and warms up daily spending limits.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Supported Platforms Breakdown */}
      <div className="space-y-8">
        <div>
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            Network Coverage
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950 dark:text-white mt-1">
            Certified Advertising Networks
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {platforms.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-4 shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-neutral-900 dark:text-white">{p.name}</h3>
                      <p className="text-xs text-neutral-500 font-mono">{p.reach}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <span className="font-semibold text-neutral-700 dark:text-neutral-300">Best For: </span>
                    <span className="text-neutral-600 dark:text-neutral-400">{p.bestFor}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-neutral-700 dark:text-neutral-300">Tracking Protocol: </span>
                    <span className="text-blue-600 dark:text-blue-400 font-mono text-[11px]">{p.tracking}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800">
                  <p className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider mb-2">
                    Primary Formats:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {p.formats.map((f, i) => (
                      <span
                        key={i}
                        className="text-[11px] px-2.5 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="p-8 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/60 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
            Ready to choose your ad platform and launch?
          </h3>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">
            Submit your campaign creative and let our media buyers begin setup today.
          </p>
        </div>
        <button
          onClick={() => setCurrentPage('create_campaign')}
          className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap"
        >
          <span>Launch Campaign Form</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
