import React, { useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { Campaign, CampaignStatus } from '../types/index.ts';
import { JAZZCASH_NUMBER, AGENCY_WHATSAPP } from '../data/mockData.ts';
import { downloadAllCampaignsCsv, downloadCampaignReportCsv } from '../utils/downloadHelpers.ts';
import {
  Layers,
  TrendingUp,
  CreditCard,
  PlusCircle,
  Clock,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Eye,
  FileText,
  MessageCircle,
  HelpCircle,
  ChevronRight,
  PauseCircle,
  PlayCircle,
  Upload,
  Download,
  FileSpreadsheet,
} from 'lucide-react';

export const CustomerDashboard: React.FC = () => {
  const {
    currentUser,
    campaigns,
    payments,
    setCurrentPage,
    navigateToCampaignDetails,
    navigateToReports,
    navigateToCheckout,
    createSupportTicket,
  } = useApp();

  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'campaigns' | 'creatives' | 'support'>('campaigns');

  // New ticket state
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketCategory, setTicketCategory] = useState<'campaign' | 'payment' | 'ad_account' | 'creative'>('campaign');
  const [ticketMessage, setTicketMessage] = useState('');
  const [ticketSuccess, setTicketSuccess] = useState(false);

  // Filter campaigns for the current customer (or all if testing)
  const myCampaigns = currentUser
    ? campaigns.filter((c) => c.userId === currentUser.id || currentUser.role === 'super_admin')
    : campaigns;

  const totalSpent = myCampaigns.reduce((acc, c) => acc + (c.metrics?.totalSpend || 0), 0);
  const totalRevenue = myCampaigns.reduce((acc, c) => acc + (c.metrics?.revenue || 0), 0);
  const activeCount = myCampaigns.filter((c) => c.status === 'active' || c.status === 'in_progress').length;
  const pendingCount = myCampaigns.filter(
    (c) => c.status === 'pending_payment' || c.status === 'payment_verification_pending'
  ).length;

  const filteredCampaigns = myCampaigns.filter((c) => {
    if (statusFilter === 'all') return true;
    return c.status === statusFilter;
  });

  const getStatusBadge = (status: CampaignStatus) => {
    switch (status) {
      case 'active':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Active & Running
          </span>
        );
      case 'in_progress':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
            Media Buyer Staging
          </span>
        );
      case 'payment_verification_pending':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
            JazzCash Verifying
          </span>
        );
      case 'pending_payment':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
            Awaiting JazzCash
          </span>
        );
      case 'approved':
      case 'payment_confirmed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-cyan-50 text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800">
            Approved / Queued
          </span>
        );
      case 'paused':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">
            Paused
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">
            {status.replace(/_/g, ' ')}
          </span>
        );
    }
  };

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject || !ticketMessage) return;

    createSupportTicket(
      {
        userId: currentUser ? currentUser.id : 'usr-cust-1',
        userName: currentUser ? currentUser.name : 'Customer',
        userEmail: currentUser ? currentUser.email : 'client@example.com',
        subject: ticketSubject,
        category: ticketCategory,
        priority: 'high',
        status: 'open',
      },
      ticketMessage
    );

    setTicketSubject('');
    setTicketMessage('');
    setTicketSuccess(true);
    setTimeout(() => setTicketSuccess(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Welcome & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            Customer Portal
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-950 dark:text-white">
            Welcome back, {currentUser?.name || 'Advertiser'}
          </h1>
          <p className="text-xs text-neutral-500 mt-0.5">
            Monitor ad spend, review live ROAS metrics, and track campaign approvals.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => downloadAllCampaignsCsv(myCampaigns)}
            className="px-3.5 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-750 text-neutral-800 dark:text-neutral-200 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            title="Download all your campaigns summary as CSV"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Export CSV</span>
          </button>

          <a
            href={`https://wa.me/${AGENCY_WHATSAPP}`}
            target="_blank"
            rel="noreferrer"
            className="px-3.5 py-2 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#25D366] text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-[#25D366]" />
            <span>WhatsApp Agency</span>
          </a>

          <button
            onClick={() => setCurrentPage('create_campaign')}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>New Campaign</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
          <p className="text-xs font-medium text-neutral-500">Total Campaigns</p>
          <p className="text-2xl font-bold font-mono text-neutral-900 dark:text-white mt-1">
            {myCampaigns.length}
          </p>
          <p className="text-[11px] text-neutral-400 mt-0.5">{activeCount} currently active</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
          <p className="text-xs font-medium text-neutral-500">Total Ad Spend</p>
          <p className="text-2xl font-bold font-mono text-neutral-900 dark:text-white mt-1">
            Rs {totalSpent.toLocaleString()}
          </p>
          <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5">
            100% Deployed
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
          <p className="text-xs font-medium text-neutral-500">Generated Store Revenue</p>
          <p className="text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-1">
            Rs {totalRevenue.toLocaleString()}
          </p>
          <p className="text-[11px] text-neutral-400 mt-0.5">Verified trackable sales</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
          <p className="text-xs font-medium text-neutral-500">Pending Actions</p>
          <p className="text-2xl font-bold font-mono text-amber-500 mt-1">
            {pendingCount}
          </p>
          <p className="text-[11px] text-neutral-400 mt-0.5">JazzCash verification queue</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-neutral-200 dark:border-neutral-800 gap-6 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('campaigns')}
          className={`pb-3 transition-colors cursor-pointer ${
            activeTab === 'campaigns'
              ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
              : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
          }`}
        >
          My Advertising Campaigns ({myCampaigns.length})
        </button>
        <button
          onClick={() => setActiveTab('creatives')}
          className={`pb-3 transition-colors cursor-pointer ${
            activeTab === 'creatives'
              ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
              : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
          }`}
        >
          Creative Asset Locker
        </button>
        <button
          onClick={() => setActiveTab('support')}
          className={`pb-3 transition-colors cursor-pointer ${
            activeTab === 'support'
              ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
              : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
          }`}
        >
          Support Tickets & Inquiries
        </button>
      </div>

      {/* TAB 1: CAMPAIGNS LIST */}
      {activeTab === 'campaigns' && (
        <div className="space-y-4">
          {/* Status Filter buttons */}
          <div className="flex flex-wrap gap-2 text-xs">
            {['all', 'active', 'in_progress', 'payment_verification_pending', 'pending_payment', 'completed'].map(
              (st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${
                    statusFilter === st
                      ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-bold border-neutral-900 dark:border-white'
                      : 'bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-300 border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50'
                  }`}
                >
                  {st === 'all' ? 'All Campaigns' : st.replace(/_/g, ' ')}
                </button>
              )
            )}
          </div>

          {/* Campaigns Table */}
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/50 text-neutral-500 font-semibold uppercase tracking-wider">
                    <th className="py-3 px-4">Campaign Info</th>
                    <th className="py-3 px-4">Networks</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Daily Budget</th>
                    <th className="py-3 px-4">Live Performance</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
                  {filteredCampaigns.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-neutral-400">
                        No campaigns found in this view.
                      </td>
                    </tr>
                  ) : (
                    filteredCampaigns.map((c) => (
                      <tr key={c.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/40 transition-colors">
                        <td className="py-3.5 px-4">
                          <button
                            onClick={() => navigateToCampaignDetails(c.id)}
                            className="font-bold text-neutral-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 text-left block cursor-pointer"
                          >
                            {c.name}
                          </button>
                          <div className="flex items-center gap-2 text-[11px] text-neutral-500 mt-0.5">
                            <span className="font-mono">{c.id}</span>
                            <span>·</span>
                            <span>{c.type.replace(/_/g, ' ')}</span>
                          </div>
                        </td>

                        <td className="py-3.5 px-4">
                          <div className="flex flex-wrap gap-1 max-w-[140px]">
                            {c.platforms.map((p, i) => (
                              <span
                                key={i}
                                className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300"
                              >
                                {p.replace('Facebook & Instagram', 'Meta')}
                              </span>
                            ))}
                          </div>
                        </td>

                        <td className="py-3.5 px-4">{getStatusBadge(c.status)}</td>

                        <td className="py-3.5 px-4 font-mono font-medium text-neutral-900 dark:text-white">
                          Rs {c.dailyBudget.toLocaleString()}/day
                        </td>

                        <td className="py-3.5 px-4">
                          {c.metrics ? (
                            <div className="space-y-0.5 text-[11px] font-mono">
                              <span className="font-bold text-emerald-600 dark:text-emerald-400">
                                {c.metrics.roas.toFixed(2)}x ROAS
                              </span>
                              <p className="text-neutral-400 text-[10px]">
                                {c.metrics.conversions} orders · Rs {c.metrics.totalSpend.toLocaleString()} spend
                              </p>
                            </div>
                          ) : (
                            <span className="text-[11px] text-neutral-400 font-mono">No live metrics yet</span>
                          )}
                        </td>

                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            {c.status === 'pending_payment' && (
                              <button
                                onClick={() => navigateToCheckout(c.id)}
                                className="px-2.5 py-1 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-[11px] transition-colors cursor-pointer"
                              >
                                Pay JazzCash
                              </button>
                            )}

                            {c.metrics && (
                              <button
                                onClick={() => navigateToReports(c.id)}
                                className="px-2.5 py-1 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-200 text-[11px] font-semibold transition-colors cursor-pointer"
                              >
                                Reports
                              </button>
                            )}

                            <button
                              onClick={() => navigateToCampaignDetails(c.id)}
                              className="p-1.5 text-neutral-400 hover:text-blue-600 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
                              title="View Details"
                            >
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CREATIVES LOCKER */}
      {activeTab === 'creatives' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                Creative Asset Storage
              </h3>
              <p className="text-xs text-neutral-500">
                Uploaded product photos, Reels videos, and lifestyle imagery across all your campaigns.
              </p>
            </div>
            <button
              onClick={() => setCurrentPage('create_campaign')}
              className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload New Creative</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {myCampaigns.flatMap((c) =>
              c.creatives.map((cr) => (
                <div
                  key={cr.id}
                  className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden shadow-xs"
                >
                  <div className="h-44 bg-neutral-950 overflow-hidden relative">
                    <img
                      src={cr.url}
                      alt={cr.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-2 right-2 text-[10px] font-mono px-2 py-0.5 rounded bg-black/60 text-white backdrop-blur-xs">
                      {cr.size || '2.1 MB'}
                    </span>
                  </div>
                  <div className="p-4 space-y-2">
                    <div>
                      <p className="font-bold text-xs text-neutral-900 dark:text-white truncate">
                        {cr.name}
                      </p>
                      <p className="text-[11px] text-neutral-500 truncate">Campaign: {c.name}</p>
                      <p className="text-[10px] text-blue-600 dark:text-blue-400 font-semibold uppercase">
                        {cr.type} Format
                      </p>
                    </div>

                    <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800">
                      <a
                        href={cr.url}
                        download={cr.name}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 w-full justify-center rounded-lg bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 text-[11px] font-semibold transition-colors cursor-pointer"
                      >
                        <Download className="w-3 h-3 text-blue-500" />
                        <span>Download Asset</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* TAB 3: SUPPORT TICKETS */}
      {activeTab === 'support' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-base font-bold text-neutral-900 dark:text-white">
              Agency Support Desk
            </h3>
            <p className="text-xs text-neutral-500">
              Need budget adjustments, new creative rotations, or Meta BM permissions assistance? Submit a ticket below.
            </p>

            {ticketSuccess && (
              <div className="p-3 text-xs rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200">
                Ticket submitted successfully! An advertising manager will reply shortly.
              </div>
            )}

            <form onSubmit={handleCreateTicket} className="space-y-4 p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Ticket Subject *
                </label>
                <input
                  type="text"
                  required
                  value={ticketSubject}
                  onChange={(e) => setTicketSubject(e.target.value)}
                  placeholder="e.g. Please increase daily budget on TikTok"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Category
                </label>
                <select
                  value={ticketCategory}
                  onChange={(e) => setTicketCategory(e.target.value as any)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white cursor-pointer"
                >
                  <option value="campaign">Campaign Strategy & Budget</option>
                  <option value="ad_account">Ad Account & Pixel Permissions</option>
                  <option value="payment">JazzCash Payment Query</option>
                  <option value="creative">Creative & Ad Copy</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Message / Details *
                </label>
                <textarea
                  rows={4}
                  required
                  value={ticketMessage}
                  onChange={(e) => setTicketMessage(e.target.value)}
                  placeholder="Describe your request in detail..."
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Submit Support Ticket
              </button>
            </form>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-2xl bg-neutral-900 text-white border border-neutral-800 space-y-4">
              <h4 className="text-sm font-bold">Instant WhatsApp Escalation</h4>
              <p className="text-xs text-neutral-300 leading-relaxed">
                For urgent campaign changes or live ad issues, connect directly with our Senior Media Buying Desk on WhatsApp.
              </p>
              <div className="p-3 rounded-xl bg-neutral-800 text-xs font-mono">
                Official Agency WhatsApp: <strong className="text-emerald-400">03212583543</strong>
              </div>
              <a
                href={`https://wa.me/${AGENCY_WHATSAPP}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
                <span>Chat on WhatsApp Now</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
