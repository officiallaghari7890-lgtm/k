import React from 'react';
import { Payment, Campaign } from '../../types/index.ts';
import { JAZZCASH_NUMBER, JAZZCASH_TITLE } from '../../data/mockData.ts';
import { downloadInvoiceHtml } from '../../utils/downloadHelpers.ts';
import { Printer, Download, X, CheckCircle, ShieldCheck } from 'lucide-react';

interface InvoiceModalProps {
  payment: Payment | null;
  campaign?: Campaign;
  isOpen: boolean;
  onClose: () => void;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({ payment, campaign, isOpen, onClose }) => {
  if (!isOpen || !payment) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl bg-white text-neutral-900 rounded-2xl shadow-2xl overflow-hidden border border-neutral-200 max-h-[90vh] flex flex-col">
        {/* Top actions bar */}
        <div className="flex items-center justify-between px-6 py-3 bg-neutral-900 text-white shrink-0">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <span>Official Billing Invoice</span>
            <span className="text-xs font-mono text-neutral-400">#{payment.id}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => downloadInvoiceHtml(payment, campaign)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors cursor-pointer shadow-xs"
            >
              <Download className="w-3.5 h-3.5" /> Download Invoice
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-lg transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" /> Print
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Invoice Printable Body */}
        <div id="printable-invoice" className="p-8 overflow-y-auto space-y-6 bg-white text-neutral-900">
          {/* Header */}
          <div className="flex justify-between items-start border-b border-neutral-200 pb-6">
            <div>
              <h2 className="text-2xl font-bold tracking-tight font-display text-neutral-950">
                Digital Rankup Agency
              </h2>
              <p className="text-xs text-neutral-500 mt-0.5">
                Premier Performance Advertising & Digital Marketing Platform
              </p>
              <p className="text-xs text-neutral-500">NTN / Registration: DR-PK-992014</p>
              <p className="text-xs text-neutral-500">Official JazzCash: {JAZZCASH_NUMBER}</p>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">INVOICE</span>
              <p className="text-xl font-bold font-mono text-neutral-900">INV-{payment.id.replace('PAY-', '')}</p>
              <p className="text-xs text-neutral-500 mt-1">
                Issued: {new Date(payment.submittedAt).toLocaleDateString()}
              </p>
              <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <CheckCircle className="w-3.5 h-3.5" />
                {payment.status === 'verified' ? 'Payment Verified & Confirmed' : 'Verification In Process'}
              </div>
            </div>
          </div>

          {/* Client & Payment Info Grid */}
          <div className="grid grid-cols-2 gap-6 text-xs border-b border-neutral-200 pb-6">
            <div>
              <p className="font-semibold text-neutral-400 uppercase tracking-wider mb-1">Billed To:</p>
              <p className="font-bold text-neutral-900 text-sm">{payment.userName}</p>
              <p className="text-neutral-600">{payment.userEmail}</p>
              <p className="text-neutral-600">Sender Contact: {payment.senderNumber}</p>
              {campaign?.websiteUrl && (
                <p className="text-neutral-500 truncate mt-1">Store / Web: {campaign.websiteUrl}</p>
              )}
            </div>
            <div>
              <p className="font-semibold text-neutral-400 uppercase tracking-wider mb-1">Payment Reference:</p>
              <p className="text-neutral-700">
                Method: <strong className="text-neutral-900">JazzCash Transfer (Direct)</strong>
              </p>
              <p className="text-neutral-700">
                Agency Account: <strong className="font-mono text-neutral-900">{payment.jazzCashNumber}</strong>
              </p>
              <p className="text-neutral-700">
                Account Title: <strong className="text-neutral-900">{JAZZCASH_TITLE}</strong>
              </p>
              <p className="text-neutral-700">
                JazzCash Transaction ID (TID):{' '}
                <strong className="font-mono text-blue-700 bg-blue-50 px-1 py-0.5 rounded">
                  {payment.transactionId}
                </strong>
              </p>
            </div>
          </div>

          {/* Campaign Details */}
          <div>
            <div className="bg-neutral-50 rounded-lg p-3 mb-4 border border-neutral-200">
              <span className="text-xs text-neutral-500 font-medium">Associated Campaign:</span>
              <p className="text-sm font-bold text-neutral-900">{payment.campaignName}</p>
              <p className="text-xs text-neutral-600 font-mono">ID: {payment.campaignId}</p>
            </div>

            {/* Line items table */}
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-neutral-200 text-neutral-500 font-medium uppercase tracking-wider">
                  <th className="py-2.5">Item Description</th>
                  <th className="py-2.5 text-center">Category</th>
                  <th className="py-2.5 text-right">Amount (PKR)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                <tr>
                  <td className="py-3">
                    <p className="font-semibold text-neutral-900">Direct Advertising Media Spend Budget</p>
                    <p className="text-[11px] text-neutral-500">
                      100% routed to ad networks (Meta, Google, TikTok, YouTube). Non-taxable agency pass-through.
                    </p>
                  </td>
                  <td className="py-3 text-center text-neutral-600">Ad Media</td>
                  <td className="py-3 text-right font-mono font-medium text-neutral-900">
                    Rs {payment.adBudgetAmount.toLocaleString()}
                  </td>
                </tr>
                <tr>
                  <td className="py-3">
                    <p className="font-semibold text-neutral-900">Digital Rankup Management & Optimization Fee</p>
                    <p className="text-[11px] text-neutral-500">
                      Campaign strategy, creative testing, A/B audience targeting, pixel tracking & reporting.
                    </p>
                  </td>
                  <td className="py-3 text-center text-neutral-600">Agency Service</td>
                  <td className="py-3 text-right font-mono font-medium text-neutral-900">
                    Rs {payment.serviceFeeAmount.toLocaleString()}
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-neutral-900">
                  <td colSpan={2} className="pt-4 text-right font-bold text-neutral-900 text-sm">
                    Total Amount Received:
                  </td>
                  <td className="pt-4 text-right font-mono font-bold text-neutral-950 text-base">
                    Rs {payment.totalAmount.toLocaleString()} PKR
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Verification stamp */}
          <div className="flex items-center justify-between border-t border-neutral-200 pt-6 text-xs text-neutral-500">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <div>
                <p className="font-semibold text-neutral-900">JazzCash Verified Payment</p>
                <p className="text-[11px]">Reconciled with statement on account {JAZZCASH_NUMBER}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-neutral-900">Digital Rankup Agency Management</p>
              <p className="text-[11px]">Authorized Financial Signatory</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
