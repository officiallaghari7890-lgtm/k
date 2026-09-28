import React, { useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { JAZZCASH_NUMBER, JAZZCASH_TITLE, AGENCY_WHATSAPP } from '../data/mockData.ts';
import { ShieldCheck, FileText, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';

export const LegalPages: React.FC<{ type: 'privacy' | 'terms' | 'refund' | 'faqs' }> = ({
  type,
}) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const faqsList = [
    {
      q: 'How does payment with JazzCash work for advertising budgets?',
      a: `Transfer your designated campaign amount to our official JazzCash business account: ${JAZZCASH_NUMBER} (Title: ${JAZZCASH_TITLE}). You then enter the 10-12 digit Transaction ID (TID) and upload a receipt screenshot on our Checkout page. Our reconciliation desk confirms it against the statement within 15–30 minutes.`,
    },
    {
      q: 'Will you ever ask for my personal Facebook or Google account passwords?',
      a: 'Never. Digital Rankup Agency has a strict zero-password sharing policy. When connecting your own advertising account, you simply add our official agency Business Manager ID (BM-8921049) as an authorized Partner with advertiser permissions. Your personal login details are never shared.',
    },
    {
      q: 'What is the difference between Agency Advertising Account and My Own Account?',
      a: 'With an Agency Account, you do not need an international debit/credit card or a verified Business Manager. Digital Rankup deploys your ads through our whitelisted, high-limit enterprise agency accounts. With "My Own Advertising Account", ads run inside your Business Manager so all custom audiences and pixel events are stored directly on your assets.',
    },
    {
      q: 'How are advertising media spend and agency service fees separated?',
      a: 'We keep direct media spend 100% distinct from our service fees. For example, if you allocate PKR 100,000 for ad spend, exactly PKR 100,000 is consumed by Meta or Google. Our management fee (typically 10-12%) is itemized transparently on your official invoice.',
    },
    {
      q: 'What is your refund policy if I pause or cancel a campaign?',
      a: 'Any unspent direct media budget is 100% refundable or can be credited toward a future campaign. Setup and management fees cover creative production, pixel staging, and media buyer work already performed and are non-refundable once campaign setup has started.',
    },
    {
      q: 'How soon will my ad campaign go live after payment?',
      a: 'Once JazzCash payment verification is confirmed by the admin, campaign setup and pixel staging take between 2 to 4 business hours. If creative revisions or pixel access are required, your media buyer will notify you on WhatsApp.',
    },
  ];

  if (type === 'faqs') {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            Knowledge Base
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-950 dark:text-white">
            Frequently Asked Questions
          </h1>
          <p className="text-xs text-neutral-500">
            Everything you need to know about campaigns, JazzCash payments, and media buying.
          </p>
        </div>

        <div className="divide-y divide-neutral-200 dark:divide-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden shadow-xs">
          {faqsList.map((f, i) => (
            <div key={i} className="p-5">
              <button
                onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                className="w-full flex items-center justify-between text-left text-sm font-semibold text-neutral-900 dark:text-white gap-4 cursor-pointer"
              >
                <span>{f.q}</span>
                {activeFaq === i ? (
                  <ChevronUp className="w-4 h-4 text-blue-600 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-neutral-400 shrink-0" />
                )}
              </button>
              {activeFaq === i && (
                <p className="mt-3 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed pr-6">
                  {f.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === 'privacy') {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 text-neutral-700 dark:text-neutral-300 text-xs leading-relaxed">
        <div className="border-b border-neutral-200 dark:border-neutral-800 pb-6 space-y-2">
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            Legal & Compliance
          </span>
          <h1 className="text-3xl font-extrabold text-neutral-950 dark:text-white tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-neutral-500 text-[11px]">Last Updated: September 2026</p>
        </div>

        <div className="space-y-6">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-neutral-900 dark:text-white">
              1. Information We Collect
            </h2>
            <p>
              Digital Rankup Agency collects client brand names, contact email addresses, mobile phone numbers, website URLs, and advertising creative materials submitted through our Campaign Creation portal. We also retain payment verification metadata, including JazzCash Transaction IDs (TID) and payment screenshot proofs.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-neutral-900 dark:text-white">
              2. Zero Password Storage Guarantee
            </h2>
            <p>
              Digital Rankup Agency never requests, stores, or transmits your personal or administrative social media passwords. All ad platform integrations (Meta Business Manager, Google Ads MCC, TikTok For Business) are conducted strictly via official partner authorization workflows.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-neutral-900 dark:text-white">
              3. Advertising Pixel & Customer Data
            </h2>
            <p>
              Customer event data processed via Meta CAPI or Google Enhanced Conversions is used strictly for optimizing the conversion performance of your authorized ad flights. We never sell, lease, or distribute client customer lists or purchase information to third parties.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-neutral-900 dark:text-white">
              4. Payment Records
            </h2>
            <p>
              JazzCash transaction proofs are held in secure cloud storage solely for banking reconciliation and tax compliance purposes.
            </p>
          </section>
        </div>
      </div>
    );
  }

  if (type === 'refund') {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 text-neutral-700 dark:text-neutral-300 text-xs leading-relaxed">
        <div className="border-b border-neutral-200 dark:border-neutral-800 pb-6 space-y-2">
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            Financial Terms
          </span>
          <h1 className="text-3xl font-extrabold text-neutral-950 dark:text-white tracking-tight">
            Refund Policy
          </h1>
          <p className="text-neutral-500 text-[11px]">Last Updated: September 2026</p>
        </div>

        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 flex items-start gap-3 text-blue-900 dark:text-blue-200">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Clear Separation of Funds</p>
              <p className="text-[11px] mt-0.5">
                Digital Rankup Agency strictly segregates ad media spend from agency management fees.
              </p>
            </div>
          </div>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-neutral-900 dark:text-white">
              1. Unspent Advertising Media Spend
            </h2>
            <p>
              100% of any unspent direct advertising media budget is completely refundable or can be transferred to any future campaign. If a campaign is paused early, remaining ad budget is calculated based on exact Meta/Google billing logs and returned via JazzCash ({JAZZCASH_NUMBER}) or bank transfer within 3 to 5 business days.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-neutral-900 dark:text-white">
              2. Agency Setup & Management Fees
            </h2>
            <p>
              Agency management fees cover upfront media buyer strategy, audience research, creative resizing, and tracking infrastructure. Once a campaign has been approved and staged, agency management fees are non-refundable. If a campaign is cancelled prior to admin approval, a full 100% refund is issued.
            </p>
          </section>
        </div>
      </div>
    );
  }

  // Default: terms
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 text-neutral-700 dark:text-neutral-300 text-xs leading-relaxed">
      <div className="border-b border-neutral-200 dark:border-neutral-800 pb-6 space-y-2">
        <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
          Legal Agreement
        </span>
        <h1 className="text-3xl font-extrabold text-neutral-950 dark:text-white tracking-tight">
          Terms & Conditions
        </h1>
        <p className="text-neutral-500 text-[11px]">Last Updated: September 2026</p>
      </div>

      <div className="space-y-6">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-neutral-900 dark:text-white">
            1. Acceptance of Terms
          </h2>
          <p>
            By creating an account, launching a campaign, or transferring funds via JazzCash to {JAZZCASH_NUMBER}, you agree to abide by the terms set forth by Digital Rankup Agency.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-neutral-900 dark:text-white">
            2. Campaign Approval & Ad Network Policies
          </h2>
          <p>
            All submitted campaigns are subject to the advertising policies of Meta, Google, TikTok, and YouTube. Digital Rankup Agency reserves the right to reject products or creatives violating network policies (e.g. counterfeit goods, misleading medical claims). Rejected campaigns will receive a full refund of unspent media funds.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-neutral-900 dark:text-white">
            3. Payment Verification
          </h2>
          <p>
            Campaigns will only enter live delivery once the customer’s submitted JazzCash Transaction ID (TID) is verified by our administrative reconciliation desk. Submitting fraudulent or duplicate transaction references will result in permanent account suspension.
          </p>
        </section>
      </div>
    </div>
  );
};
