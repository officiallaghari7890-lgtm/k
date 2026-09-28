import React, { useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { CampaignStatus } from '../types/index.ts';
import { InvoiceModal } from '../components/common/InvoiceModal.tsx';
import { downloadInvoiceHtml, downloadCampaignReportCsv } from '../utils/downloadHelpers.ts';
import {
  ArrowLeft,
  Calendar,
  DollarSign,
  Globe,
  Layers,
  ShieldCheck,
  CheckCircle2,
  Clock,
  FileText,
  AlertCircle,
  Play,
  Pause,
  ExternalLink,
  CreditCard,
  BarChart2,
  Download,
} from 'lucide-react';

export const CampaignDetailsPage: React.FC = () => {
  const {
    campaigns,
    selectedCampaignId,
    payments,
    setCurrentPage,
    navigateToReports,
    navigateToCheckout,
    updateCampaignStatus,
    currentUser,
  } = useApp();

  const [selectedInvoicePayment, setSelectedInvoicePayment] = useState<any>(null);
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);

  const campaign =
    campaigns.find((c) => c.id === selectedCampaignId) ||
    campaigns[0];

  if (!campaign) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <p className="text-sm text-neutral-500">No campaign selected.</p>
        <button
          onClick={() => setCurrentPage('customer_dashboard')}
          className="text-xs text-blue-600 font-bold hover:underline"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  const campaignPayments = payments.filter((p) => p.campaignId === campaign.id);

  const handlePauseResume = () => {
    if (campaign.status === 'active') {
      updateCampaignStatus(campaign.id, 'paused', 'Campaign paused by advertiser.');
    } else if (campaign.status === 'paused') {
      updateCampaignStatus(campaign.id, 'active', 'Campaign resumed by advertiser.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Back button */}
      <div>
        <button
          onClick={() => setCurrentPage('customer_dashboard')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Campaigns
        </button>
      </div>

      {/* Campaign Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs font-bold text-neutral-400 bg-neutral-100 dark:bg-neutral-800 px-2.5 py-0.5 rounded">
              {campaign.id}
            </span>
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              {campaign.type.replace(/_/g, ' ')}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 dark:text-white tracking-tight">
            {campaign.name}
          </h1>
          <p className="text-xs text-neutral-500">
            Created on {new Date(campaign.createdAt).toLocaleDateString()} · Assigned Media Buyer:{' '}
            <strong className="text-neutral-800 dark:text-neutral-200">
              {campaign.assignedManagerName || 'Pending Assignment'}
            </strong>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {campaign.status === 'pending_payment' && (
            <button
              onClick={() => navigateToCheckout(campaign.id)}
              className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <CreditCard className="w-4 h-4" />
              <span>Complete JazzCash Payment</span>
            </button>
          )}

          {campaign.metrics && (
            <>
              <button
                onClick={() => downloadCampaignReportCsv(campaign)}
                className="px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-750 text-neutral-800 dark:text-neutral-200 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                title="Download campaign performance CSV report"
              >
                <Download className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Export Report (CSV)</span>
              </button>

              <button
                onClick={() => navigateToReports(campaign.id)}
                className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <BarChart2 className="w-4 h-4" />
                <span>View Analytics</span>
              </button>
            </>
          )}

          {(campaign.status === 'active' || campaign.status === 'paused') && (
            <button
              onClick={handlePauseResume}
              className="px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 hover:bg-neutral-100 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
            >
              {campaign.status === 'active' ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-amber-500" /> Pause Ads
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-emerald-500" /> Resume Ads
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Grid: Details, Creatives & Targeting */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left 8 cols: Specs, Targeting, Creatives */}
        <div className="lg:col-span-8 space-y-6">
          {/* Ad Creative & Copy Preview */}
          <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-500">
              Live Creative & Ad Copy
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-start">
              <div className="sm:col-span-5 rounded-xl overflow-hidden bg-neutral-950 border border-neutral-800">
                {campaign.creatives[0] ? (
                  <img
                    src={campaign.creatives[0].url}
                    alt={campaign.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-56 object-cover"
                  />
                ) : (
                  <div className="h-56 flex items-center justify-center text-xs text-neutral-500">
                    No creative uploaded
                  </div>
                )}
              </div>

              <div className="sm:col-span-7 space-y-3 text-xs">
                <div>
                  <p className="font-semibold text-neutral-400 text-[11px]">Primary Ad Copy Text:</p>
                  <p className="text-neutral-800 dark:text-neutral-200 mt-1 leading-relaxed bg-neutral-50 dark:bg-neutral-800/60 p-3 rounded-lg border border-neutral-200 dark:border-neutral-700">
                    {campaign.adCopy}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-neutral-500">Call-to-Action Button:</span>
                  <span className="font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-1 rounded-md">
                    {campaign.ctaButton}
                  </span>
                </div>

                {campaign.websiteUrl && (
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-neutral-500">Destination URL:</span>
                    <a
                      href={campaign.websiteUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 dark:text-blue-400 underline font-mono text-[11px] truncate max-w-[200px]"
                    >
                      {campaign.websiteUrl}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Targeting Specifications */}
          <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-500">
              Audience Targeting & Demographics
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800">
                <p className="text-neutral-500 text-[11px]">Target Country</p>
                <p className="font-bold text-neutral-900 dark:text-white mt-0.5">{campaign.targetCountry}</p>
              </div>

              <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800">
                <p className="text-neutral-500 text-[11px]">Cities / Territories</p>
                <p className="font-bold text-neutral-900 dark:text-white mt-0.5 truncate">{campaign.targetCity}</p>
              </div>

              <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800">
                <p className="text-neutral-500 text-[11px]">Age Demographic</p>
                <p className="font-bold text-neutral-900 dark:text-white mt-0.5 font-mono">{campaign.ageRange} yrs</p>
              </div>

              <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800">
                <p className="text-neutral-500 text-[11px]">Gender</p>
                <p className="font-bold text-neutral-900 dark:text-white mt-0.5 capitalize">{campaign.gender}</p>
              </div>

              <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800 col-span-2">
                <p className="text-neutral-500 text-[11px]">Interests / Niche Stacking</p>
                <p className="font-bold text-neutral-900 dark:text-white mt-0.5">{campaign.targetAudience}</p>
              </div>
            </div>
          </div>

          {/* Audit History & Timeline */}
          <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-500">
              Campaign Lifecycle & Audit Log
            </h3>

            <div className="space-y-4">
              {campaign.history.map((h, i) => (
                <div key={i} className="flex items-start gap-3 text-xs">
                  <div className="w-2 h-2 rounded-full bg-blue-600 shrink-0 mt-1.5" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-neutral-900 dark:text-white capitalize">
                        {h.status.replace(/_/g, ' ')}
                      </span>
                      <span className="text-[10px] text-neutral-400 font-mono">
                        {new Date(h.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-neutral-600 dark:text-neutral-400 mt-0.5">{h.note}</p>
                    <p className="text-[10px] text-neutral-400 mt-0.5">Updated by: {h.updatedBy}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 4 cols: Financials, Ad Account & Payments */}
        <div className="lg:col-span-4 space-y-6">
          {/* Budget Card */}
          <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-4 text-xs">
            <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-500">
              Financial Specifications
            </h3>

            <div className="space-y-2.5 divide-y divide-neutral-100 dark:divide-neutral-800">
              <div className="flex justify-between py-1">
                <span className="text-neutral-500">Daily Media Spend:</span>
                <span className="font-mono font-bold text-neutral-900 dark:text-white">
                  Rs {campaign.dailyBudget.toLocaleString()}/day
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-neutral-500">Total Media Budget:</span>
                <span className="font-mono font-bold text-neutral-900 dark:text-white">
                  Rs {campaign.totalBudget.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-neutral-500">Agency Service Charge:</span>
                <span className="font-mono font-bold text-neutral-900 dark:text-white">
                  Rs {campaign.agencyServiceFee.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between py-2 border-t border-neutral-300 dark:border-neutral-700 font-extrabold text-sm">
                <span className="text-neutral-950 dark:text-white">Total Campaign Value:</span>
                <span className="font-mono text-blue-600 dark:text-blue-400">
                  Rs {(campaign.totalBudget + campaign.agencyServiceFee).toLocaleString()}
                </span>
              </div>
            </div>

            <div className="pt-2 text-[11px] text-neutral-400 font-mono space-y-1">
              <p>Flight Start: {campaign.startDate}</p>
              <p>Flight End: {campaign.endDate}</p>
            </div>
          </div>

          {/* Ad Account Card */}
          <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-3 text-xs">
            <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-500">
              Advertising Account Used
            </h3>

            <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 space-y-1">
              <p className="font-bold text-blue-900 dark:text-blue-200 capitalize">
                {campaign.adAccountType.replace(/_/g, ' ')}
              </p>
              {campaign.adAccountId && (
                <p className="font-mono text-[11px] text-blue-700 dark:text-blue-300">
                  ID: {campaign.adAccountId}
                </p>
              )}
              <p className="text-[11px] text-neutral-500">
                {campaign.adAccountType === 'agency_account'
                  ? 'Whitelisted high-limit Agency Business Manager'
                  : 'Client Owned BM linked via official Partner Request'}
              </p>
            </div>
          </div>

          {/* Associated Payments */}
          <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-4 text-xs">
            <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-500">
              JazzCash Transactions
            </h3>

            {campaignPayments.length === 0 ? (
              <p className="text-neutral-400 text-xs">No payments logged yet.</p>
            ) : (
              campaignPayments.map((p) => (
                <div key={p.id} className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-blue-600 dark:text-blue-400">
                      TID: {p.transactionId}
                    </span>
                    <span className="font-mono font-semibold text-neutral-900 dark:text-white">
                      Rs {p.totalAmount.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-neutral-500 pt-1">
                    <span className="capitalize">{p.status.replace(/_/g, ' ')}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => downloadInvoiceHtml(p, campaign)}
                        className="text-blue-600 dark:text-blue-400 font-bold hover:underline cursor-pointer flex items-center gap-1"
                        title="Download Invoice as HTML"
                      >
                        <Download className="w-3 h-3" /> Download
                      </button>
                      <span>·</span>
                      <button
                        onClick={() => {
                          setSelectedInvoicePayment(p);
                          setIsInvoiceOpen(true);
                        }}
                        className="text-neutral-700 dark:text-neutral-300 font-medium hover:underline cursor-pointer"
                      >
                        View
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Invoice Modal */}
      <InvoiceModal
        isOpen={isInvoiceOpen}
        onClose={() => setIsInvoiceOpen(false)}
        payment={selectedInvoicePayment}
        campaign={campaign}
      />
    </div>
  );
};
