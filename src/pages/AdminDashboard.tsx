import React, { useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { Campaign, CampaignStatus, Payment, PricingPackage } from '../types/index.ts';
import { JAZZCASH_NUMBER } from '../data/mockData.ts';
import {
  downloadAllCampaignsCsv,
  downloadFinancialLedgerCsv,
  triggerFileDownload,
} from '../utils/downloadHelpers.ts';
import {
  Shield,
  Layers,
  CreditCard,
  Users,
  CheckCircle2,
  XCircle,
  Clock,
  UserCheck,
  Edit3,
  BarChart3,
  DollarSign,
  PlusCircle,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Sliders,
  Download,
  FileSpreadsheet,
  Database,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    currentUser,
    campaigns,
    payments,
    users,
    packages,
    updateCampaignStatus,
    assignManager,
    verifyPayment,
    updateCampaignMetrics,
    updatePackage,
    navigateToCampaignDetails,
  } = useApp();

  const [activeTab, setActiveTab] = useState<
    'approvals' | 'payments' | 'customers' | 'managers' | 'metrics_input' | 'packages'
  >('payments');

  // Payment Verification action state
  const [rejectModalPayment, setRejectModalPayment] = useState<Payment | null>(null);
  const [rejectReason, setRejectReason] = useState('');

  // Manager Assignment state
  const [selectedCampaignForManager, setSelectedCampaignForManager] = useState<string>('');
  const [targetManagerId, setTargetManagerId] = useState<string>('usr-mgr-1');

  // Metrics update state
  const [metricCampaignId, setMetricCampaignId] = useState<string>(campaigns[0]?.id || '');
  const [metricSpend, setMetricSpend] = useState<number>(120000);
  const [metricImpressions, setMetricImpressions] = useState<number>(500000);
  const [metricClicks, setMetricClicks] = useState<number>(16000);
  const [metricConversions, setMetricConversions] = useState<number>(650);
  const [metricRevenue, setMetricRevenue] = useState<number>(5500000);

  // Status edit modal state
  const [statusEditCampaign, setStatusEditCampaign] = useState<Campaign | null>(null);
  const [newStatus, setNewStatus] = useState<CampaignStatus>('active');
  const [statusNote, setStatusNote] = useState('');

  // KPI calculations
  const totalRevenue = payments
    .filter((p) => p.status === 'verified')
    .reduce((acc, p) => acc + p.totalAmount, 0);

  const pendingPayments = payments.filter((p) => p.status === 'pending_verification');
  const pendingApprovals = campaigns.filter(
    (c) => c.status === 'pending_approval' || c.status === 'payment_confirmed'
  );
  const totalCustomers = users.filter((u) => u.role === 'customer').length;
  const managers = users.filter((u) => u.role === 'ad_manager');

  const handleApproveCampaign = (campaignId: string) => {
    updateCampaignStatus(
      campaignId,
      'approved',
      'Campaign requirements and creative verified by Super Admin.'
    );
  };

  const handleRejectCampaign = (campaignId: string) => {
    const reason = prompt('Please specify the reason for campaign rejection:');
    if (reason) {
      updateCampaignStatus(campaignId, 'rejected', reason);
    }
  };

  const handleConfirmPayment = (paymentId: string) => {
    verifyPayment(paymentId, true, 'Verified via JazzCash Business Statement reconciliation.');
  };

  const handleRejectPaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rejectModalPayment) return;
    verifyPayment(rejectModalPayment.id, false, rejectReason || 'Transaction ID not found in JazzCash records.');
    setRejectModalPayment(null);
    setRejectReason('');
  };

  const handleAssignSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCampaignForManager || !targetManagerId) return;
    assignManager(selectedCampaignForManager, targetManagerId);
    setSelectedCampaignForManager('');
  };

  const handleSaveMetrics = (e: React.FormEvent) => {
    e.preventDefault();
    const ctr = (metricClicks / metricImpressions) * 100;
    const cpc = metricSpend / metricClicks;
    const roas = metricRevenue / metricSpend;
    const costPerResult = metricSpend / metricConversions;

    updateCampaignMetrics(metricCampaignId, {
      totalSpend: metricSpend,
      impressions: metricImpressions,
      reach: Math.round(metricImpressions * 0.7),
      clicks: metricClicks,
      ctr,
      cpc,
      costPerResult,
      conversions: metricConversions,
      conversionRate: (metricConversions / metricClicks) * 100,
      leads: 0,
      revenue: metricRevenue,
      roas,
      lastUpdated: new Date().toISOString(),
      isVerifiedPlatformData: true,
      dailyBreakdown: [
        { date: '09/25', spend: Math.round(metricSpend / 4), impressions: Math.round(metricImpressions / 4), clicks: Math.round(metricClicks / 4), conversions: Math.round(metricConversions / 4), revenue: Math.round(metricRevenue / 4) },
        { date: '09/26', spend: Math.round(metricSpend / 4), impressions: Math.round(metricImpressions / 4), clicks: Math.round(metricClicks / 4), conversions: Math.round(metricConversions / 4), revenue: Math.round(metricRevenue / 4) },
        { date: '09/27', spend: Math.round(metricSpend / 4), impressions: Math.round(metricImpressions / 4), clicks: Math.round(metricClicks / 4), conversions: Math.round(metricConversions / 4), revenue: Math.round(metricRevenue / 4) },
      ],
      platformBreakdown: [
        { platform: 'Meta (FB & IG)', spend: Math.round(metricSpend * 0.65), clicks: Math.round(metricClicks * 0.65), conversions: Math.round(metricConversions * 0.65), roas },
        { platform: 'TikTok Ads', spend: Math.round(metricSpend * 0.35), clicks: Math.round(metricClicks * 0.35), conversions: Math.round(metricConversions * 0.35), roas: roas * 0.95 },
      ],
    });

    alert('Campaign metrics synced successfully!');
  };

  const handleUpdateStatus = (e: React.FormEvent) => {
    e.preventDefault();
    if (!statusEditCampaign) return;
    updateCampaignStatus(statusEditCampaign.id, newStatus, statusNote || `Status changed to ${newStatus}`);
    setStatusEditCampaign(null);
    setStatusNote('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-wider">
              Super Admin Console
            </span>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
              Agency HQ Mode
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-950 dark:text-white mt-1">
            Digital Rankup Control Center
          </h1>
          <p className="text-xs text-neutral-500 mt-0.5">
            Full agency authority over customer accounts, JazzCash payment verifications, and media buyer assignments.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => downloadAllCampaignsCsv(campaigns)}
            className="px-3 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-750 text-neutral-800 dark:text-neutral-200 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            title="Export all campaigns data as CSV"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-blue-500" />
            <span>Campaigns CSV</span>
          </button>

          <button
            onClick={() => downloadFinancialLedgerCsv(payments)}
            className="px-3 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-750 text-neutral-800 dark:text-neutral-200 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            title="Export all JazzCash statements as CSV"
          >
            <CreditCard className="w-3.5 h-3.5 text-red-500" />
            <span>Payments CSV</span>
          </button>

          <button
            onClick={() => {
              const backup = {
                exportedAt: new Date().toISOString(),
                agency: 'Digital Rankup Agency',
                jazzCashAccount: JAZZCASH_NUMBER,
                campaigns,
                payments,
                packages,
              };
              triggerFileDownload(
                JSON.stringify(backup, null, 2),
                `DigitalRankup_SystemBackup_${new Date().toISOString().split('T')[0]}.json`,
                'application/json'
              );
            }}
            className="px-3 py-2 rounded-xl bg-neutral-900 text-white dark:bg-neutral-750 hover:bg-neutral-800 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            title="Download complete system database backup as JSON"
          >
            <Database className="w-3.5 h-3.5 text-amber-400" />
            <span>Backup Data</span>
          </button>
        </div>
      </div>

      {/* High-Level KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
          <p className="text-xs text-neutral-500 font-medium">Pending Payments</p>
          <p className="text-2xl font-bold font-mono text-red-600 dark:text-red-400 mt-1">
            {pendingPayments.length}
          </p>
          <p className="text-[11px] text-neutral-400 mt-0.5">Awaiting JazzCash review</p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
          <p className="text-xs text-neutral-500 font-medium">Pending Approvals</p>
          <p className="text-2xl font-bold font-mono text-amber-500 mt-1">
            {pendingApprovals.length}
          </p>
          <p className="text-[11px] text-neutral-400 mt-0.5">Ready for media buyers</p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
          <p className="text-xs text-neutral-500 font-medium">Total Agency Inflow</p>
          <p className="text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-1">
            Rs {totalRevenue.toLocaleString()}
          </p>
          <p className="text-[11px] text-neutral-400 mt-0.5">Reconciled on {JAZZCASH_NUMBER}</p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
          <p className="text-xs text-neutral-500 font-medium">Total Campaigns</p>
          <p className="text-2xl font-bold font-mono text-neutral-900 dark:text-white mt-1">
            {campaigns.length}
          </p>
          <p className="text-[11px] text-neutral-400 mt-0.5">Across all networks</p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
          <p className="text-xs text-neutral-500 font-medium">Total Customers</p>
          <p className="text-2xl font-bold font-mono text-blue-600 dark:text-blue-400 mt-1">
            {totalCustomers}
          </p>
          <p className="text-[11px] text-neutral-400 mt-0.5">Registered brands</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-neutral-200 dark:border-neutral-800 gap-6 text-xs font-semibold overflow-x-auto">
        <button
          onClick={() => setActiveTab('payments')}
          className={`pb-3 transition-colors cursor-pointer whitespace-nowrap ${
            activeTab === 'payments'
              ? 'text-red-600 dark:text-red-400 border-b-2 border-red-600 dark:border-red-400'
              : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
          }`}
        >
          JazzCash Verification ({pendingPayments.length})
        </button>

        <button
          onClick={() => setActiveTab('approvals')}
          className={`pb-3 transition-colors cursor-pointer whitespace-nowrap ${
            activeTab === 'approvals'
              ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
              : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
          }`}
        >
          Campaign Queue ({campaigns.length})
        </button>

        <button
          onClick={() => setActiveTab('customers')}
          className={`pb-3 transition-colors cursor-pointer whitespace-nowrap ${
            activeTab === 'customers'
              ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
              : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
          }`}
        >
          Customer CRM ({totalCustomers})
        </button>

        <button
          onClick={() => setActiveTab('managers')}
          className={`pb-3 transition-colors cursor-pointer whitespace-nowrap ${
            activeTab === 'managers'
              ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
              : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
          }`}
        >
          Media Buyer Assignments
        </button>

        <button
          onClick={() => setActiveTab('metrics_input')}
          className={`pb-3 transition-colors cursor-pointer whitespace-nowrap ${
            activeTab === 'metrics_input'
              ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
              : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
          }`}
        >
          Verified Metrics Editor
        </button>

        <button
          onClick={() => setActiveTab('packages')}
          className={`pb-3 transition-colors cursor-pointer whitespace-nowrap ${
            activeTab === 'packages'
              ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
              : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
          }`}
        >
          Package Pricing Settings
        </button>
      </div>

      {/* TAB 1: JAZZCASH PAYMENT VERIFICATION QUEUE */}
      {activeTab === 'payments' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-neutral-900 dark:text-white">
              Submitted JazzCash Payments Requiring Verification
            </h3>
            <span className="text-xs font-mono text-neutral-500">
              Agency Receiving Number: {JAZZCASH_NUMBER}
            </span>
          </div>

          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/50 text-neutral-500 font-semibold uppercase tracking-wider">
                    <th className="py-3 px-4">Transaction ID (TID)</th>
                    <th className="py-3 px-4">Client Name & Mobile</th>
                    <th className="py-3 px-4">Campaign</th>
                    <th className="py-3 px-4">Amount</th>
                    <th className="py-3 px-4">Screenshot Proof</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Verification Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
                  {payments.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-12 text-center text-neutral-400">
                        No payments found in ledger.
                      </td>
                    </tr>
                  ) : (
                    payments.map((p) => (
                      <tr key={p.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/40 transition-colors">
                        <td className="py-3.5 px-4 font-mono font-bold text-neutral-900 dark:text-white">
                          {p.transactionId}
                          <p className="text-[10px] text-neutral-400 font-normal">
                            {new Date(p.submittedAt).toLocaleString()}
                          </p>
                        </td>

                        <td className="py-3.5 px-4">
                          <p className="font-semibold text-neutral-900 dark:text-white">{p.senderName}</p>
                          <p className="text-[11px] text-neutral-400 font-mono">{p.senderNumber}</p>
                        </td>

                        <td className="py-3.5 px-4 font-medium text-neutral-800 dark:text-neutral-200 max-w-xs truncate">
                          {p.campaignName}
                        </td>

                        <td className="py-3.5 px-4 font-mono font-bold text-neutral-900 dark:text-white">
                          Rs {p.totalAmount.toLocaleString()}
                        </td>

                        <td className="py-3.5 px-4">
                          {p.screenshotUrl ? (
                            <a
                              href={p.screenshotUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-blue-600 dark:text-blue-400 font-semibold underline text-[11px] flex items-center gap-1"
                            >
                              View Receipt <ExternalLink className="w-3 h-3" />
                            </a>
                          ) : (
                            <span className="text-neutral-400 text-[11px]">No image</span>
                          )}
                        </td>

                        <td className="py-3.5 px-4">
                          {p.status === 'verified' ? (
                            <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                              ✓ Verified
                            </span>
                          ) : p.status === 'rejected' ? (
                            <span className="text-[11px] font-bold text-rose-600 dark:text-rose-400">
                              ✗ Rejected
                            </span>
                          ) : (
                            <span className="text-[11px] font-bold text-amber-500 animate-pulse">
                              Pending Statement Match
                            </span>
                          )}
                        </td>

                        <td className="py-3.5 px-4 text-right">
                          {p.status === 'pending_verification' ? (
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => handleConfirmPayment(p.id)}
                                className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors cursor-pointer"
                              >
                                Confirm Payment
                              </button>
                              <button
                                onClick={() => setRejectModalPayment(p)}
                                className="px-3 py-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 text-rose-600 dark:text-rose-400 hover:bg-rose-50 text-xs font-semibold transition-colors cursor-pointer"
                              >
                                Reject
                              </button>
                            </div>
                          ) : (
                            <span className="text-[11px] text-neutral-400 font-mono">
                              Resolved by {p.verifiedBy || 'Admin'}
                            </span>
                          )}
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

      {/* TAB 2: CAMPAIGN APPROVAL & STATUS QUEUE */}
      {activeTab === 'approvals' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-neutral-900 dark:text-white">
              All Advertising Campaigns & Status Controls
            </h3>
            <span className="text-xs text-neutral-500">
              Total {campaigns.length} campaigns across client accounts and agency accounts
            </span>
          </div>

          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/50 text-neutral-500 font-semibold uppercase tracking-wider">
                    <th className="py-3 px-4">Campaign Name & ID</th>
                    <th className="py-3 px-4">Client / Store</th>
                    <th className="py-3 px-4">Current Status</th>
                    <th className="py-3 px-4">Ad Account Type</th>
                    <th className="py-3 px-4">Assigned Media Buyer</th>
                    <th className="py-3 px-4">Daily Budget</th>
                    <th className="py-3 px-4 text-right">Admin Controls</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
                  {campaigns.map((c) => (
                    <tr key={c.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/40 transition-colors">
                      <td className="py-3.5 px-4">
                        <button
                          onClick={() => navigateToCampaignDetails(c.id)}
                          className="font-bold text-neutral-900 dark:text-white hover:text-blue-600 block text-left"
                        >
                          {c.name}
                        </button>
                        <span className="font-mono text-[10px] text-neutral-400">{c.id}</span>
                      </td>

                      <td className="py-3.5 px-4">
                        <p className="font-semibold text-neutral-900 dark:text-white">{c.userName}</p>
                        <p className="text-[10px] text-neutral-400">{c.userEmail}</p>
                      </td>

                      <td className="py-3.5 px-4 font-mono font-semibold capitalize">
                        {c.status.replace(/_/g, ' ')}
                      </td>

                      <td className="py-3.5 px-4 capitalize text-[11px] text-neutral-600 dark:text-neutral-300">
                        {c.adAccountType.replace(/_/g, ' ')}
                      </td>

                      <td className="py-3.5 px-4 font-semibold text-neutral-800 dark:text-neutral-200">
                        {c.assignedManagerName || (
                          <span className="text-amber-500 text-[11px]">Unassigned</span>
                        )}
                      </td>

                      <td className="py-3.5 px-4 font-mono font-semibold text-neutral-900 dark:text-white">
                        Rs {c.dailyBudget.toLocaleString()}/day
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => {
                              setStatusEditCampaign(c);
                              setNewStatus(c.status);
                            }}
                            className="px-2.5 py-1 rounded-lg border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-[11px] font-semibold text-neutral-700 dark:text-neutral-200 cursor-pointer"
                          >
                            Update Status
                          </button>

                          {c.status === 'pending_approval' && (
                            <button
                              onClick={() => handleApproveCampaign(c.id)}
                              className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] cursor-pointer"
                            >
                              Approve
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: CUSTOMER CRM */}
      {activeTab === 'customers' && (
        <div className="space-y-4">
          <h3 className="text-base font-bold text-neutral-900 dark:text-white">
            Registered Customers & Brand Accounts
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users
              .filter((u) => u.role === 'customer')
              .map((cust) => {
                const userCamps = campaigns.filter((c) => c.userId === cust.id);
                const userSpend = userCamps.reduce((acc, c) => acc + (c.metrics?.totalSpend || 0), 0);

                return (
                  <div
                    key={cust.id}
                    className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                        {cust.name.charAt(0)}
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-500">
                        ID: {cust.id}
                      </span>
                    </div>

                    <div>
                      <h4 className="font-bold text-neutral-900 dark:text-white text-sm">{cust.name}</h4>
                      <p className="text-xs text-neutral-500">{cust.email}</p>
                      {cust.phone && <p className="text-xs text-neutral-400 font-mono mt-0.5">{cust.phone}</p>}
                      {cust.companyName && (
                        <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold mt-1">
                          Brand: {cust.companyName}
                        </p>
                      )}
                    </div>

                    <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 grid grid-cols-2 gap-2 text-xs font-mono">
                      <div>
                        <p className="text-[10px] text-neutral-400">Campaigns</p>
                        <p className="font-bold text-neutral-900 dark:text-white">{userCamps.length}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-neutral-400">Total Spend</p>
                        <p className="font-bold text-emerald-600 dark:text-emerald-400">
                          Rs {userSpend.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* TAB 4: ADVERTISING MANAGERS */}
      {activeTab === 'managers' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-4">
            <h3 className="text-base font-bold text-neutral-900 dark:text-white">
              Assign Campaign to Media Buyer
            </h3>
            <form onSubmit={handleAssignSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Select Campaign
                </label>
                <select
                  required
                  value={selectedCampaignForManager}
                  onChange={(e) => setSelectedCampaignForManager(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white"
                >
                  <option value="">-- Choose Campaign --</option>
                  {campaigns.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} (Current: {c.assignedManagerName || 'None'})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Assign To Advertising Manager
                </label>
                <select
                  value={targetManagerId}
                  onChange={(e) => setTargetManagerId(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white"
                >
                  {managers.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name} ({m.email})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  Confirm Assignment
                </button>
              </div>
            </form>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {managers.map((m) => {
              const assigned = campaigns.filter((c) => c.assignedManagerId === m.id);
              return (
                <div
                  key={m.id}
                  className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-neutral-900 dark:text-white text-sm">{m.name}</h4>
                      <p className="text-xs text-neutral-500">{m.email}</p>
                    </div>
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                      {assigned.length} Active Campaigns
                    </span>
                  </div>

                  <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 space-y-1">
                    <p className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">
                      Assigned Flights:
                    </p>
                    {assigned.length === 0 ? (
                      <p className="text-xs text-neutral-400">No campaigns assigned yet.</p>
                    ) : (
                      assigned.map((ac) => (
                        <div key={ac.id} className="text-xs flex items-center justify-between py-1">
                          <span className="font-medium text-neutral-800 dark:text-neutral-200 truncate max-w-[200px]">
                            {ac.name}
                          </span>
                          <span className="font-mono text-[10px] text-neutral-500 capitalize">
                            {ac.status.replace(/_/g, ' ')}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 5: VERIFIED METRICS MANAGER */}
      {activeTab === 'metrics_input' && (
        <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-6">
          <div>
            <h3 className="text-base font-bold text-neutral-900 dark:text-white">
              Platform Metrics Input & Webhook Synchronizer
            </h3>
            <p className="text-xs text-neutral-500">
              Authorized admin tool to enter or sync verified platform metrics from Meta Ads Manager, Google Ads, or TikTok.
            </p>
          </div>

          <form onSubmit={handleSaveMetrics} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                Target Campaign
              </label>
              <select
                value={metricCampaignId}
                onChange={(e) => setMetricCampaignId(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white font-semibold"
              >
                {campaigns.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.id})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Total Ad Spend (PKR)
                </label>
                <input
                  type="number"
                  value={metricSpend}
                  onChange={(e) => setMetricSpend(Number(e.target.value))}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Gross Revenue (PKR)
                </label>
                <input
                  type="number"
                  value={metricRevenue}
                  onChange={(e) => setMetricRevenue(Number(e.target.value))}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Orders / Conversions
                </label>
                <input
                  type="number"
                  value={metricConversions}
                  onChange={(e) => setMetricConversions(Number(e.target.value))}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Impressions
                </label>
                <input
                  type="number"
                  value={metricImpressions}
                  onChange={(e) => setMetricImpressions(Number(e.target.value))}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Link Clicks
                </label>
                <input
                  type="number"
                  value={metricClicks}
                  onChange={(e) => setMetricClicks(Number(e.target.value))}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 font-mono"
                />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 text-xs font-mono flex items-center justify-between text-neutral-600 dark:text-neutral-300">
              <span>Calculated ROAS: <strong className="text-emerald-600 dark:text-emerald-400">{(metricRevenue / (metricSpend || 1)).toFixed(2)}x</strong></span>
              <span>Calculated CTR: <strong className="text-blue-600 dark:text-blue-400">{((metricClicks / (metricImpressions || 1)) * 100).toFixed(2)}%</strong></span>
              <span>Cost Per Click: <strong>Rs {(metricSpend / (metricClicks || 1)).toFixed(2)}</strong></span>
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              Sync & Publish Verified Metrics
            </button>
          </form>
        </div>
      )}

      {/* TAB 6: PACKAGES & PRICING SETTINGS */}
      {activeTab === 'packages' && (
        <div className="space-y-6">
          <h3 className="text-base font-bold text-neutral-900 dark:text-white">
            Manage Agency Packages & Service Fee %
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-4"
              >
                <div>
                  <h4 className="font-bold text-neutral-900 dark:text-white text-base">{pkg.name}</h4>
                  <p className="text-xs text-neutral-500">{pkg.tagline}</p>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block text-neutral-600 dark:text-neutral-400 font-semibold mb-1">
                      Monthly Base Price (PKR)
                    </label>
                    <input
                      type="number"
                      value={pkg.pricePKR}
                      onChange={(e) => updatePackage({ ...pkg, pricePKR: Number(e.target.value) })}
                      className="w-full px-3 py-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 font-mono font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-neutral-600 dark:text-neutral-400 font-semibold mb-1">
                      Management Fee (%)
                    </label>
                    <input
                      type="number"
                      value={pkg.managementFeePercent}
                      onChange={(e) => updatePackage({ ...pkg, managementFeePercent: Number(e.target.value) })}
                      className="w-full px-3 py-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 font-mono font-bold"
                    />
                  </div>
                </div>

                <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                  ✓ Autosaved to Agency Registry
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Reject Payment Modal */}
      {rejectModalPayment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white dark:bg-neutral-900 rounded-2xl p-6 border border-neutral-200 dark:border-neutral-800 space-y-4">
            <h3 className="text-base font-bold text-neutral-900 dark:text-white">
              Reject JazzCash Payment
            </h3>
            <p className="text-xs text-neutral-500">
              Specify why Transaction ID <strong className="font-mono text-neutral-900 dark:text-white">{rejectModalPayment.transactionId}</strong> could not be reconciled.
            </p>
            <form onSubmit={handleRejectPaymentSubmit} className="space-y-3">
              <textarea
                rows={3}
                required
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="e.g. TID does not match JazzCash statement for account 03212583543..."
                className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white"
              />
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setRejectModalPayment(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold"
                >
                  Confirm Rejection
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Status Modal */}
      {statusEditCampaign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white dark:bg-neutral-900 rounded-2xl p-6 border border-neutral-200 dark:border-neutral-800 space-y-4">
            <h3 className="text-base font-bold text-neutral-900 dark:text-white">
              Update Campaign Status: {statusEditCampaign.name}
            </h3>
            <form onSubmit={handleUpdateStatus} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  New Status
                </label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as CampaignStatus)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white capitalize"
                >
                  <option value="draft">Draft</option>
                  <option value="pending_payment">Pending Payment</option>
                  <option value="payment_verification_pending">Payment Verification Pending</option>
                  <option value="payment_confirmed">Payment Confirmed</option>
                  <option value="pending_approval">Pending Approval</option>
                  <option value="approved">Approved</option>
                  <option value="in_progress">In Progress (Media Buyer Setup)</option>
                  <option value="active">Active & Running</option>
                  <option value="paused">Paused</option>
                  <option value="completed">Completed</option>
                  <option value="rejected">Rejected</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Status Change Note / Audit Reason
                </label>
                <textarea
                  rows={2}
                  value={statusNote}
                  onChange={(e) => setStatusNote(e.target.value)}
                  placeholder="e.g. Media buyer launched 4 ad sets on Meta Ads Manager..."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setStatusEditCampaign(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-neutral-600 hover:bg-neutral-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold"
                >
                  Save Status
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
