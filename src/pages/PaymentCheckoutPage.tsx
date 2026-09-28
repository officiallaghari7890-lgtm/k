import React, { useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { JAZZCASH_NUMBER, JAZZCASH_TITLE, AGENCY_WHATSAPP } from '../data/mockData.ts';
import {
  CreditCard,
  Copy,
  Check,
  Upload,
  ShieldCheck,
  AlertCircle,
  FileCheck,
  ArrowRight,
  Download,
  ExternalLink,
} from 'lucide-react';

export const PaymentCheckoutPage: React.FC = () => {
  const {
    currentUser,
    campaigns,
    selectedPaymentCampaignId,
    submitPaymentProof,
    setCurrentPage,
    navigateToCampaignDetails,
  } = useApp();

  // Find target campaign
  const campaign =
    campaigns.find((c) => c.id === selectedPaymentCampaignId) ||
    campaigns.find((c) => c.status === 'pending_payment') ||
    campaigns[0];

  const totalAmount = campaign ? campaign.totalBudget + campaign.agencyServiceFee : 165000;
  const adBudget = campaign ? campaign.totalBudget : 150000;
  const serviceFee = campaign ? campaign.agencyServiceFee : 15000;

  const [transactionId, setTransactionId] = useState('');
  const [senderNumber, setSenderNumber] = useState(currentUser?.phone || '');
  const [senderName, setSenderName] = useState(currentUser?.name || '');
  const [notes, setNotes] = useState('');
  const [screenshotUrl, setScreenshotUrl] = useState<string>('/src/assets/images/meta_google_ads_visual_1790601007917.jpg');
  const [screenshotName, setScreenshotName] = useState<string>('jazzcash_receipt_proof.jpg');
  const [copied, setCopied] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleCopyNumber = () => {
    navigator.clipboard.writeText(JAZZCASH_NUMBER);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleScreenshotChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setScreenshotName(file.name);
      setScreenshotUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmitProof = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!transactionId.trim()) {
      setError('Please enter the JazzCash Transaction ID (TID) from your SMS or app receipt.');
      return;
    }
    if (!senderNumber.trim()) {
      setError('Please provide the sender JazzCash mobile number.');
      return;
    }

    setError('');
    setSubmitting(true);

    try {
      await submitPaymentProof({
        campaignId: campaign ? campaign.id : 'DR-CMP-1082',
        campaignName: campaign ? campaign.name : 'Advertising Campaign',
        userId: currentUser ? currentUser.id : 'usr-cust-1',
        userName: senderName || (currentUser ? currentUser.name : 'Customer'),
        userEmail: currentUser ? currentUser.email : 'client@example.com',
        jazzCashNumber: JAZZCASH_NUMBER,
        senderNumber,
        senderName,
        transactionId: transactionId.trim().toUpperCase(),
        adBudgetAmount: adBudget,
        serviceFeeAmount: serviceFee,
        totalAmount,
        currency: 'PKR',
        paymentMethod: 'jazzcash_manual',
        screenshotUrl,
        notes,
      });

      setSubmittedSuccess(true);
    } catch (err: any) {
      setError(err?.message || 'Payment submission failed. Please check inputs.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <span className="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-wider">
          Official Payment Gateway
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-neutral-950 dark:text-white">
          JazzCash Payment & Proof Submission
        </h1>
        <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
          Transfer your campaign funds to our verified JazzCash business account and submit your TID below.
        </p>
      </div>

      {submittedSuccess ? (
        <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-center space-y-6 shadow-xl">
          <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <FileCheck className="w-8 h-8" />
          </div>

          <div className="space-y-2 max-w-lg mx-auto">
            <h2 className="text-2xl font-bold text-neutral-950 dark:text-white">
              JazzCash Payment Proof Received!
            </h2>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Transaction ID <strong className="font-mono text-neutral-900 dark:text-white">{transactionId}</strong> for PKR {totalAmount.toLocaleString()} has been queued for admin verification.
            </p>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
              Our finance team checks JazzCash statements every 15 minutes. Once confirmed, your assigned media buyer will launch your ads.
            </p>
          </div>

          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setCurrentPage('customer_dashboard')}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <span>Go to Customer Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setCurrentPage('payment_history')}
              className="px-6 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-xs font-semibold text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 cursor-pointer"
            >
              View Invoices & Receipts
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Official JazzCash Account Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-red-600 via-red-700 to-red-800 text-white shadow-xl space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest text-red-200">
                  JazzCash Official Account
                </span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-white/20">
                  Business Verified
                </span>
              </div>

              <div>
                <p className="text-xs text-red-100">Send money to mobile number:</p>
                <div className="flex items-center justify-between mt-1 p-3 rounded-xl bg-black/25 backdrop-blur-xs">
                  <span className="text-2xl font-mono font-black tracking-wider text-white">
                    {JAZZCASH_NUMBER}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyNumber}
                    className="p-2 rounded-lg bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
                    title="Copy JazzCash Number"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-1 text-xs">
                <p className="text-red-200">Account Title / Receiver:</p>
                <p className="font-bold text-sm text-white">{JAZZCASH_TITLE}</p>
              </div>

              <div className="pt-3 border-t border-red-500/50 text-[11px] text-red-100 space-y-1">
                <p>✓ Available on JazzCash Mobile App</p>
                <p>✓ Available via USSD string *786#</p>
                <p>✓ Available at any nationwide JazzCash agent shop</p>
              </div>
            </div>

            {/* Campaign Summary */}
            {campaign && (
              <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-3 text-xs">
                <h4 className="font-bold text-neutral-900 dark:text-white uppercase tracking-wider text-[11px]">
                  Campaign Budget Summary
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
                    <span>Campaign Name:</span>
                    <span className="font-bold text-neutral-900 dark:text-white truncate max-w-[160px]">
                      {campaign.name}
                    </span>
                  </div>
                  <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
                    <span>Direct Media Spend:</span>
                    <span className="font-mono text-neutral-900 dark:text-white">
                      Rs {adBudget.toLocaleString()} PKR
                    </span>
                  </div>
                  <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
                    <span>Agency Service Charge:</span>
                    <span className="font-mono text-neutral-900 dark:text-white">
                      Rs {serviceFee.toLocaleString()} PKR
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-neutral-100 dark:border-neutral-800 font-extrabold text-sm">
                    <span className="text-neutral-900 dark:text-white">Total Amount to Transfer:</span>
                    <span className="font-mono text-red-600 dark:text-red-400">
                      Rs {totalAmount.toLocaleString()} PKR
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Proof Submission Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-6">
              <div>
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                  Submit JazzCash Payment Proof
                </h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  After sending funds to {JAZZCASH_NUMBER}, fill in your transfer receipt details below.
                </p>
              </div>

              {error && (
                <div className="p-3 text-xs rounded-xl bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 border border-rose-200 dark:border-rose-900 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmitProof} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    JazzCash Transaction ID (TID) *
                  </label>
                  <input
                    type="text"
                    required
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                    placeholder="e.g. JC902847118 or 12-digit TID from SMS"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white font-mono font-bold focus:ring-2 focus:ring-red-500 focus:outline-none uppercase"
                  />
                  <p className="text-[11px] text-neutral-400 mt-1">
                    Found in your JazzCash confirmation SMS or transaction receipt.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                      Sender JazzCash Mobile Number *
                    </label>
                    <input
                      type="text"
                      required
                      value={senderNumber}
                      onChange={(e) => setSenderNumber(e.target.value)}
                      placeholder="0300 1234567"
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white font-mono focus:ring-2 focus:ring-red-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                      Sender Account Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      placeholder="e.g. Sarah Khan"
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Screenshot Upload */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Upload Payment Screenshot Proof
                  </label>
                  <div className="border border-dashed border-neutral-300 dark:border-neutral-700 rounded-xl p-4 flex items-center justify-between bg-neutral-50/50 dark:bg-neutral-800/50">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-red-100 dark:bg-red-950 text-red-600">
                        <Upload className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                          {screenshotName}
                        </p>
                        <p className="text-[11px] text-neutral-400">PNG, JPG or screenshot PDF</p>
                      </div>
                    </div>
                    <label className="px-3 py-1.5 rounded-lg bg-white dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 text-xs font-semibold text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 cursor-pointer">
                      Browse
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleScreenshotChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Additional Notes (Optional)
                  </label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Transferred via JazzCash mobile app at 3:15 PM"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {submitting ? 'Verifying...' : 'Submit Payment Proof for Admin Verification'}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
