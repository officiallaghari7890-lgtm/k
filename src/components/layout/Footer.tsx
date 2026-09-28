import React from 'react';
import { useApp, AppPage } from '../../context/AppContext.tsx';
import { JAZZCASH_NUMBER, JAZZCASH_TITLE, AGENCY_WHATSAPP } from '../../data/mockData.ts';
import { ShieldCheck, MessageCircle, CreditCard, ExternalLink, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentPage } = useApp();

  const handleLink = (page: AppPage) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-neutral-950 text-neutral-400 border-t border-neutral-800 text-xs">
      {/* Trust & JazzCash Payment Strip */}
      <div className="border-b border-neutral-800 bg-neutral-900/60 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-red-600/20 text-red-400 border border-red-500/30">
              <CreditCard className="w-4 h-4" />
            </div>
            <div>
              <p className="text-white font-semibold">
                Official Agency JazzCash Account:{' '}
                <span className="font-mono text-emerald-400 bg-neutral-800 px-2 py-0.5 rounded text-sm font-bold">
                  {JAZZCASH_NUMBER}
                </span>
              </p>
              <p className="text-[11px] text-neutral-400">
                Title: {JAZZCASH_TITLE} · Direct manual transfer with instant proof verification
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={`https://wa.me/${AGENCY_WHATSAPP}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#25D366]/20 text-[#25D366] hover:bg-[#25D366]/30 font-semibold transition-colors cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-[#25D366]" />
              WhatsApp Direct
            </a>
            <div className="flex items-center gap-1.5 text-neutral-300">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              <span>Verified Ads Partner</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Sitemap */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-2 md:grid-cols-5 gap-8">
        {/* Col 1: Brand */}
        <div className="col-span-2 space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-600 text-white font-bold flex items-center justify-center font-display text-base">
              DR
            </div>
            <span className="text-base font-bold font-display text-white">
              Digital Rankup Agency
            </span>
          </div>
          <p className="text-neutral-400 text-xs leading-relaxed max-w-sm">
            High-performance advertising agency platform. We architect, launch, and scale hyper-profitable ad campaigns across Meta, Google, TikTok, and YouTube with transparent JazzCash billing.
          </p>
          <div className="pt-2 text-[11px] text-neutral-500 space-y-1">
            <p>NTN: 894102-DR · Registered Advertising Management Practice</p>
            <p>Security Guarantee: Never asking for client social account passwords.</p>
          </div>
        </div>

        {/* Col 2: Services */}
        <div className="space-y-2.5">
          <h4 className="text-white font-semibold tracking-wider text-xs uppercase">Advertising Services</h4>
          <ul className="space-y-1.5">
            <li>
              <button onClick={() => handleLink('services')} className="hover:text-white transition-colors cursor-pointer">
                Product Advertisement
              </button>
            </li>
            <li>
              <button onClick={() => handleLink('services')} className="hover:text-white transition-colors cursor-pointer">
                E-commerce Sales Scaling
              </button>
            </li>
            <li>
              <button onClick={() => handleLink('services')} className="hover:text-white transition-colors cursor-pointer">
                Lead Generation Funnels
              </button>
            </li>
            <li>
              <button onClick={() => handleLink('services')} className="hover:text-white transition-colors cursor-pointer">
                Mobile App Install Ads
              </button>
            </li>
            <li>
              <button onClick={() => handleLink('services')} className="hover:text-white transition-colors cursor-pointer">
                Brand Awareness & Traffic
              </button>
            </li>
          </ul>
        </div>

        {/* Col 3: Ad Platforms & System */}
        <div className="space-y-2.5">
          <h4 className="text-white font-semibold tracking-wider text-xs uppercase">Platforms & Hub</h4>
          <ul className="space-y-1.5">
            <li>
              <button onClick={() => handleLink('platforms')} className="hover:text-white transition-colors cursor-pointer">
                Meta Ads (FB & Instagram)
              </button>
            </li>
            <li>
              <button onClick={() => handleLink('platforms')} className="hover:text-white transition-colors cursor-pointer">
                Google Search & Shopping
              </button>
            </li>
            <li>
              <button onClick={() => handleLink('platforms')} className="hover:text-white transition-colors cursor-pointer">
                TikTok Ads & Spark Ads
              </button>
            </li>
            <li>
              <button onClick={() => handleLink('platforms')} className="hover:text-white transition-colors cursor-pointer">
                YouTube Performance Video
              </button>
            </li>
            <li>
              <button onClick={() => handleLink('how_it_works')} className="hover:text-white transition-colors cursor-pointer">
                How It Works Guide
              </button>
            </li>
          </ul>
        </div>

        {/* Col 4: Platform Portals & Legal */}
        <div className="space-y-2.5">
          <h4 className="text-white font-semibold tracking-wider text-xs uppercase">Agency Portals</h4>
          <ul className="space-y-1.5">
            <li>
              <button onClick={() => handleLink('customer_dashboard')} className="hover:text-white transition-colors cursor-pointer flex items-center gap-1">
                Customer Dashboard <ArrowUpRight className="w-3 h-3" />
              </button>
            </li>
            <li>
              <button onClick={() => handleLink('ad_manager_dashboard')} className="hover:text-white transition-colors cursor-pointer flex items-center gap-1">
                Media Buyer Panel <ArrowUpRight className="w-3 h-3" />
              </button>
            </li>
            <li>
              <button onClick={() => handleLink('admin_dashboard')} className="hover:text-white transition-colors cursor-pointer flex items-center gap-1">
                Super Admin Console <ArrowUpRight className="w-3 h-3" />
              </button>
            </li>
            <li>
              <button onClick={() => handleLink('payment_history')} className="hover:text-white transition-colors cursor-pointer">
                JazzCash Invoices
              </button>
            </li>
            <li>
              <button onClick={() => handleLink('faqs')} className="hover:text-white transition-colors cursor-pointer">
                Help & FAQs
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-neutral-800 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <p>© {new Date().getFullYear()} Digital Rankup Agency. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <button onClick={() => handleLink('privacy_policy')} className="hover:text-neutral-300 cursor-pointer">
              Privacy Policy
            </button>
            <span>·</span>
            <button onClick={() => handleLink('terms_conditions')} className="hover:text-neutral-300 cursor-pointer">
              Terms & Conditions
            </button>
            <span>·</span>
            <button onClick={() => handleLink('refund_policy')} className="hover:text-neutral-300 cursor-pointer">
              Refund Policy
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
