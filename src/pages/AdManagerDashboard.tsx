import React, { useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { Campaign, CampaignStatus } from '../types/index.ts';
import {
  Briefcase,
  Layers,
  BarChart3,
  TrendingUp,
  CheckCircle2,
  Clock,
  ExternalLink,
  Edit,
  Upload,
  MessageCircle,
  Play,
  Pause,
  Save,
} from 'lucide-react';

export const AdManagerDashboard: React.FC = () => {
  const {
    currentUser,
    campaigns,
    updateCampaignStatus,
    updateCampaignMetrics,
    replyToTicket,
    tickets,
    navigateToCampaignDetails,
  } = useApp();

  // Filter campaigns assigned to this manager (or first manager if admin)
  const myAssignedCampaigns = campaigns.filter(
    (c) =>
      c.assignedManagerId === currentUser?.id ||
      c.assignedManagerName === currentUser?.name ||
      currentUser?.role === 'super_admin'
  );

  const [selectedCampaign, setSelectedCampaign] = useState<Campaign>(
    myAssignedCampaigns[0] || campaigns[0]
  );

  // Setup Checklist state
  const [checklist, setChecklist] = useState<Record<string, boolean>>({
    pixel_verified: true,
    custom_audiences_built: true,
    creative_copy_formatted: true,
    budget_allocated: true,
    ad_sets_published: false,
  });

  // Fast metric input
  const [liveSpend, setLiveSpend] = useState<number>(selectedCampaign?.metrics?.totalSpend || 50000);
  const [liveRevenue, setLiveRevenue] = useState<number>(selectedCampaign?.metrics?.revenue || 225000);
  const [liveClicks, setLiveClicks] = useState<number>(selectedCampaign?.metrics?.clicks || 6400);
  const [liveOrders, setLiveOrders] = useState<number>(selectedCampaign?.metrics?.conversions || 260);
  const [managerNote, setManagerNote] = useState<string>('');

  const handleToggleChecklist = (key: string) => {
    setChecklist((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleUpdateStatus = (status: CampaignStatus) => {
    updateCampaignStatus(
      selectedCampaign.id,
      status,
      managerNote || `Media buyer updated campaign state to ${status.replace(/_/g, ' ')}.`
    );
    setManagerNote('');
  };

  const handleSaveMetrics = () => {
    const roas = liveRevenue / (liveSpend || 1);
    updateCampaignMetrics(selectedCampaign.id, {
      totalSpend: liveSpend,
      impressions: liveClicks * 32,
      reach: liveClicks * 24,
      clicks: liveClicks,
      ctr: 3.12,
      cpc: liveSpend / liveClicks,
      costPerResult: liveSpend / (liveOrders || 1),
      conversions: liveOrders,
      conversionRate: (liveOrders / liveClicks) * 100,
      leads: 0,
      revenue: liveRevenue,
      roas,
      lastUpdated: new Date().toISOString(),
      isVerifiedPlatformData: true,
      dailyBreakdown: [
        { date: '09/26', spend: Math.round(liveSpend / 3), impressions: Math.round((liveClicks * 32) / 3), clicks: Math.round(liveClicks / 3), conversions: Math.round(liveOrders / 3), revenue: Math.round(liveRevenue / 3) },
        { date: '09/27', spend: Math.round(liveSpend / 3), impressions: Math.round((liveClicks * 32) / 3), clicks: Math.round(liveClicks / 3), conversions: Math.round(liveOrders / 3), revenue: Math.round(liveRevenue / 3) },
        { date: '09/28', spend: Math.round(liveSpend / 3), impressions: Math.round((liveClicks * 32) / 3), clicks: Math.round(liveClicks / 3), conversions: Math.round(liveOrders / 3), revenue: Math.round(liveRevenue / 3) },
      ],
      platformBreakdown: [
        { platform: 'Meta Ads', spend: Math.round(liveSpend * 0.7), clicks: Math.round(liveClicks * 0.7), conversions: Math.round(liveOrders * 0.7), roas },
        { platform: 'TikTok Ads', spend: Math.round(liveSpend * 0.3), clicks: Math.round(liveClicks * 0.3), conversions: Math.round(liveOrders * 0.3), roas: roas * 0.9 },
      ],
    });
    alert('Metrics updated for client dashboard view!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            Media Buyer Workspace
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-950 dark:text-white mt-1">
            Advertising Manager Panel
          </h1>
          <p className="text-xs text-neutral-500 mt-0.5">
            Logged in as <strong className="text-neutral-800 dark:text-neutral-200">{currentUser?.name}</strong>. Managing {myAssignedCampaigns.length} assigned client ad flights.
          </p>
        </div>
      </div>

      {/* Campaign Selector Pill Strip */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2">
        {myAssignedCampaigns.map((c) => (
          <button
            key={c.id}
            onClick={() => {
              setSelectedCampaign(c);
              if (c.metrics) {
                setLiveSpend(c.metrics.totalSpend);
                setLiveRevenue(c.metrics.revenue);
                setLiveClicks(c.metrics.clicks);
                setLiveOrders(c.metrics.conversions);
              }
            }}
            className={`px-4 py-2.5 rounded-xl border text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              selectedCampaign.id === c.id
                ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                : 'bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:border-neutral-300'
            }`}
          >
            {c.name} ({c.id})
          </button>
        ))}
      </div>

      {/* Main Campaign Management Workbench */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Requirements & Staging Checklist */}
        <div className="lg:col-span-7 space-y-6">
          {/* Campaign Overview Card */}
          <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono text-neutral-400">{selectedCampaign.id}</span>
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                  {selectedCampaign.name}
                </h3>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold uppercase bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                {selectedCampaign.status.replace(/_/g, ' ')}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 text-xs font-mono">
              <div>
                <p className="text-neutral-400 text-[10px]">Client</p>
                <p className="font-bold text-neutral-900 dark:text-white">{selectedCampaign.userName}</p>
              </div>
              <div>
                <p className="text-neutral-400 text-[10px]">Daily Budget</p>
                <p className="font-bold text-neutral-900 dark:text-white">
                  Rs {selectedCampaign.dailyBudget.toLocaleString()}/day
                </p>
              </div>
              <div>
                <p className="text-neutral-400 text-[10px]">Total Budget</p>
                <p className="font-bold text-neutral-900 dark:text-white">
                  Rs {selectedCampaign.totalBudget.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <p className="font-semibold text-neutral-700 dark:text-neutral-300">Client Ad Copy Hook:</p>
              <p className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 leading-relaxed">
                {selectedCampaign.adCopy}
              </p>
            </div>

            {selectedCampaign.creatives[0] && (
              <div>
                <p className="font-semibold text-xs text-neutral-700 dark:text-neutral-300 mb-2">
                  Client Uploaded Visual Asset:
                </p>
                <div className="h-44 rounded-xl overflow-hidden bg-neutral-950">
                  <img
                    src={selectedCampaign.creatives[0].url}
                    alt={selectedCampaign.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Technical Setup Checklist */}
          <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-500">
              Media Buyer Launch Checklist
            </h3>

            <div className="space-y-2 text-xs">
              {[
                { key: 'pixel_verified', label: 'Meta Pixel & TikTok Events API Active' },
                { key: 'custom_audiences_built', label: 'Custom Lookalike Audiences Configured' },
                { key: 'creative_copy_formatted', label: 'Ad Copy & 9:16 Video Creatives Rendered' },
                { key: 'budget_allocated', label: 'Ad Spend Allocation Approved from JazzCash' },
                { key: 'ad_sets_published', label: 'Campaign Sets Published Live on Ads Manager' },
              ].map((item) => (
                <div
                  key={item.key}
                  onClick={() => handleToggleChecklist(item.key)}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-800/60 cursor-pointer border border-neutral-100 dark:border-neutral-800 transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={checklist[item.key] || false}
                    onChange={() => {}}
                    className="accent-blue-600 w-4 h-4 rounded cursor-pointer"
                  />
                  <span
                    className={`font-medium ${
                      checklist[item.key]
                        ? 'text-neutral-900 dark:text-white line-through opacity-70'
                        : 'text-neutral-700 dark:text-neutral-300'
                    }`}
                  >
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Quick Status Control Buttons */}
            <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 space-y-2">
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                Media Buyer Note for Client:
              </label>
              <input
                type="text"
                value={managerNote}
                onChange={(e) => setManagerNote(e.target.value)}
                placeholder="e.g. Scaled daily spend on top Reel creative by 20%..."
                className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white mb-2"
              />

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleUpdateStatus('in_progress')}
                  className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 text-xs font-bold hover:bg-blue-100 cursor-pointer"
                >
                  Set In Progress
                </button>
                <button
                  onClick={() => handleUpdateStatus('active')}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 cursor-pointer"
                >
                  Set Live & Active
                </button>
                <button
                  onClick={() => handleUpdateStatus('paused')}
                  className="px-3 py-1.5 rounded-lg bg-neutral-200 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200 text-xs font-bold cursor-pointer"
                >
                  Pause Campaign
                </button>
                <button
                  onClick={() => handleUpdateStatus('completed')}
                  className="px-3 py-1.5 rounded-lg bg-purple-600 text-white text-xs font-bold hover:bg-purple-700 cursor-pointer"
                >
                  Mark Completed
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Performance Data Updates */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-500">
              Update Live Ad Metrics
            </h3>
            <p className="text-xs text-neutral-400">
              Input actual figures from Meta Ads Manager or Google Ads to reflect live in customer dashboard.
            </p>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Total Ad Media Spend (PKR)
                </label>
                <input
                  type="number"
                  value={liveSpend}
                  onChange={(e) => setLiveSpend(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 font-mono font-bold"
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Gross Trackable Revenue (PKR)
                </label>
                <input
                  type="number"
                  value={liveRevenue}
                  onChange={(e) => setLiveRevenue(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 font-mono font-bold text-emerald-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Link Clicks
                  </label>
                  <input
                    type="number"
                    value={liveClicks}
                    onChange={(e) => setLiveClicks(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 font-mono"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Orders / Purchases
                  </label>
                  <input
                    type="number"
                    value={liveOrders}
                    onChange={(e) => setLiveOrders(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 font-mono"
                  />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 font-mono text-[11px] text-blue-800 dark:text-blue-300">
                Calculated ROAS: <strong>{(liveRevenue / (liveSpend || 1)).toFixed(2)}x</strong>
              </div>

              <button
                onClick={handleSaveMetrics}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Publish Updates to Client</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
