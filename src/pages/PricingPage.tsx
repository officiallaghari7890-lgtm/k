import React, { useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { JAZZCASH_NUMBER, JAZZCASH_TITLE } from '../data/mockData.ts';
import { CheckCircle2, Calculator, ArrowRight, ShieldCheck, CreditCard } from 'lucide-react';

export const PricingPage: React.FC = () => {
  const { packages, setCurrentPage } = useApp();
  const [calculatorSpend, setCalculatorSpend] = useState<number>(150000);
  const [calculatorTier, setCalculatorTier] = useState<string>('pkg-pro');

  const selectedPkg = packages.find((p) => p.id === calculatorTier) || packages[1];
  const feeAmount = (calculatorSpend * selectedPkg.managementFeePercent) / 100;
  const totalPayable = calculatorSpend + feeAmount;
  const estimatedRevenue = Math.round(calculatorSpend * 4.5);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
          Transparent Agency Pricing
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-neutral-950 dark:text-white">
          Predictable Packages & Clear ROI
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
          100% of your advertising budget is deployed directly to Meta, Google, and TikTok. Agency management fees cover full creative testing, pixel infrastructure, and live daily scaling.
        </p>
      </div>

      {/* Package Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className={`rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all bg-white dark:bg-neutral-900 border ${
              pkg.popular
                ? 'border-blue-600 ring-2 ring-blue-600/20 shadow-xl'
                : 'border-neutral-200 dark:border-neutral-800'
            }`}
          >
            <div className="space-y-6">
              {pkg.popular && (
                <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-blue-600 text-white inline-block">
                  Most Popular for E-commerce & Leads
                </span>
              )}
              <div>
                <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">{pkg.name}</h3>
                <p className="text-xs text-neutral-500 mt-1">{pkg.tagline}</p>
                <p className="text-[11px] text-blue-600 dark:text-blue-400 font-semibold mt-1">
                  Target: {pkg.targetAudience}
                </p>
              </div>

              <div className="py-4 border-y border-neutral-100 dark:border-neutral-800">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl sm:text-4xl font-extrabold font-mono text-neutral-950 dark:text-white">
                    Rs {pkg.pricePKR.toLocaleString()}
                  </span>
                  <span className="text-xs text-neutral-500">/ month</span>
                </div>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-2">
                  Management Fee: <strong className="font-mono text-neutral-900 dark:text-white">{pkg.managementFeePercent}%</strong> of monthly ad spend
                </p>
                <p className="text-[11px] text-neutral-500 font-mono mt-0.5">
                  Min recommended ad spend: Rs {pkg.minAdSpendPKR.toLocaleString()}/mo
                </p>
              </div>

              <ul className="space-y-2.5 text-xs text-neutral-700 dark:text-neutral-300">
                {pkg.features.map((f, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-8">
              <button
                onClick={() => setCurrentPage('create_campaign')}
                className={`w-full py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  pkg.popular
                    ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md'
                    : 'bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-900 dark:text-white'
                }`}
              >
                Get Started with {pkg.name}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Budget & ROAS Calculator */}
      <div className="p-8 sm:p-10 rounded-3xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-8">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-blue-600 text-white">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white">
              Interactive Ad Budget & Fee Calculator
            </h2>
            <p className="text-xs text-neutral-500">
              Calculate exact JazzCash payable amount and estimated store revenue.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Controls */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="flex justify-between text-xs font-semibold mb-2">
                <span className="text-neutral-700 dark:text-neutral-300">Your Monthly Ad Budget (PKR)</span>
                <span className="font-mono text-base font-bold text-blue-600 dark:text-blue-400">
                  Rs {calculatorSpend.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="50000"
                max="1000000"
                step="25000"
                value={calculatorSpend}
                onChange={(e) => setCalculatorSpend(Number(e.target.value))}
                className="w-full accent-blue-600 h-2 bg-neutral-200 dark:bg-neutral-700 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] font-mono text-neutral-400 mt-1">
                <span>Rs 50,000</span>
                <span>Rs 500,000</span>
                <span>Rs 1,000,000+</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
                Select Agency Package Tier
              </label>
              <div className="grid grid-cols-3 gap-3">
                {packages.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setCalculatorTier(p.id)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      calculatorTier === p.id
                        ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-bold'
                        : 'border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300'
                    }`}
                  >
                    <p className="text-xs">{p.name}</p>
                    <p className="text-[11px] font-mono text-neutral-500 mt-0.5">
                      {p.managementFeePercent}% fee
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Result Card */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
              Cost & Projection Breakdown
            </h4>

            <div className="space-y-2 text-xs divide-y divide-neutral-100 dark:divide-neutral-700">
              <div className="flex justify-between py-1.5">
                <span className="text-neutral-600 dark:text-neutral-400">Direct Ad Media Spend (100%):</span>
                <span className="font-mono font-semibold text-neutral-900 dark:text-white">
                  Rs {calculatorSpend.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-neutral-600 dark:text-neutral-400">
                  Agency Fee ({selectedPkg.managementFeePercent}%):
                </span>
                <span className="font-mono font-semibold text-neutral-900 dark:text-white">
                  Rs {feeAmount.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between py-2 border-t border-neutral-300 dark:border-neutral-600 text-sm font-bold">
                <span className="text-neutral-900 dark:text-white">Total JazzCash Payable:</span>
                <span className="font-mono text-blue-600 dark:text-blue-400 text-base">
                  Rs {totalPayable.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs">
              <p className="text-emerald-800 dark:text-emerald-300 font-semibold">
                Projected Client Revenue (~4.5x ROAS):
              </p>
              <p className="text-xl font-mono font-extrabold text-emerald-600 dark:text-emerald-400 mt-0.5">
                Rs {estimatedRevenue.toLocaleString()} PKR
              </p>
              <p className="text-[10px] text-emerald-700 dark:text-emerald-500 mt-0.5">
                Based on historical client averages across Meta and TikTok product campaigns.
              </p>
            </div>

            <button
              onClick={() => setCurrentPage('create_campaign')}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>Launch This Budget Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
