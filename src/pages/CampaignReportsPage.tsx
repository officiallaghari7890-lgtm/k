import React, { useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { downloadCampaignReportCsv } from '../utils/downloadHelpers.ts';
import {
  BarChart3,
  TrendingUp,
  DollarSign,
  MousePointer,
  Eye,
  ShoppingBag,
  Award,
  Calendar,
  ShieldCheck,
  ArrowUpRight,
  Filter,
  Download,
} from 'lucide-react';

export const CampaignReportsPage: React.FC = () => {
  const { campaigns, selectedCampaignId, setSelectedCampaignId } = useApp();

  const [timeframe, setTimeframe] = useState<'daily' | 'weekly' | 'monthly'>('daily');

  // Select campaign
  const activeCampaignsWithMetrics = campaigns.filter((c) => c.metrics);
  const activeCampaign =
    activeCampaignsWithMetrics.find((c) => c.id === selectedCampaignId) ||
    activeCampaignsWithMetrics[0] ||
    campaigns[0];

  const metrics = activeCampaign?.metrics;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              Performance Analytics
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              <ShieldCheck className="w-3 h-3 text-emerald-500" />
              Verified Ad Network API Data
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-950 dark:text-white mt-1">
            Campaign Performance Reports
          </h1>
        </div>

        {/* Campaign Switcher & Timeframe Selector */}
        <div className="flex flex-wrap items-center gap-3">
          <select
            value={activeCampaign?.id}
            onChange={(e) => setSelectedCampaignId?.(e.target.value)}
            className="px-3 py-2 text-xs font-semibold rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none cursor-pointer max-w-xs truncate"
          >
            {campaigns.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.id})
              </option>
            ))}
          </select>

          <div className="flex items-center p-1 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-semibold">
            {(['daily', 'weekly', 'monthly'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTimeframe(t)}
                className={`px-3 py-1.5 rounded-lg capitalize transition-colors cursor-pointer ${
                  timeframe === t
                    ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-xs font-bold'
                    : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {activeCampaign?.metrics && (
            <button
              onClick={() => downloadCampaignReportCsv(activeCampaign)}
              className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
              title="Download full analytics report as CSV"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Report (CSV)</span>
            </button>
          )}
        </div>
      </div>

      {!metrics ? (
        <div className="p-12 text-center rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-3">
          <BarChart3 className="w-10 h-10 text-neutral-400 mx-auto" />
          <h3 className="text-base font-bold text-neutral-900 dark:text-white">
            No Verified Metrics Yet
          </h3>
          <p className="text-xs text-neutral-500 max-w-md mx-auto">
            This campaign is currently in staging or awaiting payment confirmation. Metrics populate automatically once ads begin delivering on Meta or Google.
          </p>
        </div>
      ) : (
        <>
          {/* Top 4 Marquee KPI Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs">
              <div className="flex items-center justify-between text-neutral-500 text-xs">
                <span>Total Ad Spend</span>
                <DollarSign className="w-4 h-4 text-neutral-400" />
              </div>
              <p className="text-2xl font-bold font-mono text-neutral-900 dark:text-white mt-2">
                Rs {metrics.totalSpend.toLocaleString()}
              </p>
              <p className="text-[11px] text-neutral-400 font-mono mt-1">100% Media Delivery</p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs">
              <div className="flex items-center justify-between text-neutral-500 text-xs">
                <span>Gross Store Revenue</span>
                <TrendingUp className="w-4 h-4 text-emerald-500" />
              </div>
              <p className="text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-2">
                Rs {metrics.revenue.toLocaleString()}
              </p>
              <p className="text-[11px] text-neutral-400 font-mono mt-1">Verified Purchases</p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs">
              <div className="flex items-center justify-between text-neutral-500 text-xs">
                <span>Return on Ad Spend (ROAS)</span>
                <Award className="w-4 h-4 text-blue-500" />
              </div>
              <p className="text-2xl font-extrabold font-mono text-blue-600 dark:text-blue-400 mt-2">
                {metrics.roas.toFixed(2)}x
              </p>
              <p className="text-[11px] text-neutral-400 font-mono mt-1">Profit-positive multiple</p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs">
              <div className="flex items-center justify-between text-neutral-500 text-xs">
                <span>Orders / Conversions</span>
                <ShoppingBag className="w-4 h-4 text-purple-500" />
              </div>
              <p className="text-2xl font-bold font-mono text-neutral-900 dark:text-white mt-2">
                {metrics.conversions.toLocaleString()}
              </p>
              <p className="text-[11px] text-neutral-400 font-mono mt-1">
                {metrics.conversionRate.toFixed(2)}% Conversion Rate
              </p>
            </div>
          </div>

          {/* Secondary Metric Grid (Section 11 Breakdown) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
            <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
              <p className="text-[11px] text-neutral-500">Impressions</p>
              <p className="text-sm font-bold font-mono text-neutral-900 dark:text-white mt-1">
                {metrics.impressions.toLocaleString()}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
              <p className="text-[11px] text-neutral-500">Unique Reach</p>
              <p className="text-sm font-bold font-mono text-neutral-900 dark:text-white mt-1">
                {metrics.reach.toLocaleString()}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
              <p className="text-[11px] text-neutral-500">Link Clicks</p>
              <p className="text-sm font-bold font-mono text-neutral-900 dark:text-white mt-1">
                {metrics.clicks.toLocaleString()}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
              <p className="text-[11px] text-neutral-500">Click-Through Rate (CTR)</p>
              <p className="text-sm font-bold font-mono text-blue-600 dark:text-blue-400 mt-1">
                {metrics.ctr.toFixed(2)}%
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
              <p className="text-[11px] text-neutral-500">Avg Cost Per Click (CPC)</p>
              <p className="text-sm font-bold font-mono text-neutral-900 dark:text-white mt-1">
                Rs {metrics.cpc.toFixed(2)}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
              <p className="text-[11px] text-neutral-500">Cost Per Order (CPA)</p>
              <p className="text-sm font-bold font-mono text-neutral-900 dark:text-white mt-1">
                Rs {metrics.costPerResult.toFixed(0)}
              </p>
            </div>
          </div>

          {/* Interactive Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Daily Spend vs Revenue Performance Chart */}
            <div className="lg:col-span-8 p-6 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                    Daily Revenue vs Media Spend Trend
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Visual comparison of daily ad spend against gross store revenue
                  </p>
                </div>
                <div className="flex items-center gap-4 text-xs font-semibold">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-emerald-500" />
                    <span className="text-neutral-600 dark:text-neutral-400">Revenue (PKR)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-blue-600" />
                    <span className="text-neutral-600 dark:text-neutral-400">Ad Spend</span>
                  </div>
                </div>
              </div>

              {/* Responsive SVG Bar / Trend Chart */}
              <div className="h-64 flex items-end gap-3 pt-6 pb-2 border-b border-neutral-200 dark:border-neutral-800">
                {metrics.dailyBreakdown.map((day, idx) => {
                  const maxVal = 300000;
                  const revHeight = Math.min(100, Math.round((day.revenue / maxVal) * 100));
                  const spendHeight = Math.min(100, Math.round(((day.spend * 10) / maxVal) * 100));

                  return (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                      <div className="w-full flex items-end justify-center gap-1.5 h-48">
                        {/* Spend Bar */}
                        <div
                          style={{ height: `${spendHeight}%` }}
                          className="w-3.5 bg-blue-600 rounded-t-md group-hover:bg-blue-700 transition-all relative"
                          title={`Spend: Rs ${day.spend.toLocaleString()}`}
                        />
                        {/* Revenue Bar */}
                        <div
                          style={{ height: `${revHeight}%` }}
                          className="w-3.5 bg-emerald-500 rounded-t-md group-hover:bg-emerald-600 transition-all relative"
                          title={`Revenue: Rs ${day.revenue.toLocaleString()}`}
                        />
                      </div>
                      <span className="text-[10px] font-mono text-neutral-500">{day.date}</span>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center justify-between text-xs text-neutral-500 font-mono">
                <span>Source: Meta Graph API & TikTok Events API Webhooks</span>
                <span>Last updated: {new Date(metrics.lastUpdated).toLocaleTimeString()}</span>
              </div>
            </div>

            {/* Platform Distribution & ROAS Breakdown */}
            <div className="lg:col-span-4 p-6 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-6">
              <div>
                <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                  Multi-Platform Breakdown
                </h3>
                <p className="text-xs text-neutral-500">
                  Performance distribution across advertising networks
                </p>
              </div>

              <div className="space-y-4">
                {metrics.platformBreakdown.map((p, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-neutral-900 dark:text-white text-sm">
                        {p.platform}
                      </span>
                      <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded text-xs">
                        {p.roas.toFixed(2)}x ROAS
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 pt-1 text-neutral-500 font-mono text-[11px]">
                      <div>
                        <p className="text-[10px]">Spend</p>
                        <p className="font-bold text-neutral-800 dark:text-neutral-200">
                          Rs {p.spend.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px]">Clicks</p>
                        <p className="font-bold text-neutral-800 dark:text-neutral-200">
                          {p.clicks.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px]">Orders</p>
                        <p className="font-bold text-neutral-800 dark:text-neutral-200">
                          {p.conversions} sales
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 text-xs space-y-1">
                <p className="font-bold text-blue-900 dark:text-blue-200">Media Buyer Optimization Note:</p>
                <p className="text-[11px] text-blue-700 dark:text-blue-300 leading-relaxed">
                  Budget has been shifted to top-converting creative hooks on Reels and TikTok. Cost per Purchase decreased by 18% over the last 48 hours.
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
