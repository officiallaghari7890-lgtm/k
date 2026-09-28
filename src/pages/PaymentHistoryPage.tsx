import React, { useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { Payment } from '../types/index.ts';
import { InvoiceModal } from '../components/common/InvoiceModal.tsx';
import { JAZZCASH_NUMBER } from '../data/mockData.ts';
import { downloadInvoiceHtml, downloadFinancialLedgerCsv } from '../utils/downloadHelpers.ts';
import {
  CreditCard,
  CheckCircle2,
  Clock,
  XCircle,
  Printer,
  Download,
  Search,
  PlusCircle,
  ShieldCheck,
  FileSpreadsheet,
} from 'lucide-react';

export const PaymentHistoryPage: React.FC = () => {
  const { payments, campaigns, currentUser, setCurrentPage } = useApp();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedInvoicePayment, setSelectedInvoicePayment] = useState<Payment | null>(null);
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);

  // User-filtered payments (or all if admin)
  const myPayments = currentUser
    ? payments.filter((p) => p.userId === currentUser.id || currentUser.role === 'super_admin' || currentUser.role === 'admin')
    : payments;

  const filtered = myPayments.filter((p) => {
    const matchSearch =
      p.transactionId.toLowerCase().includes(search.toLowerCase()) ||
      p.campaignName.toLowerCase().includes(search.toLowerCase()) ||
      p.senderName.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const getStatusBadge = (status: Payment['status']) => {
    switch (status) {
      case 'verified':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            <CheckCircle2 className="w-3 h-3 text-emerald-500" />
            Verified & Confirmed
          </span>
        );
      case 'pending_verification':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
            <Clock className="w-3 h-3 text-amber-500" />
            Pending Verification
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
            <XCircle className="w-3 h-3 text-rose-500" />
            Rejected
          </span>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-wider">
            Financial Ledger
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-950 dark:text-white mt-1">
            JazzCash Payment History & Invoices
          </h1>
          <p className="text-xs text-neutral-500 mt-0.5">
            Track manual transfers to JazzCash {JAZZCASH_NUMBER} and print official billing receipts.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => downloadFinancialLedgerCsv(filtered)}
            className="px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-750 text-neutral-800 dark:text-neutral-200 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            title="Download entire ledger as CSV file"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={() => setCurrentPage('checkout')}
            className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <CreditCard className="w-4 h-4" />
            <span>Submit New JazzCash Proof</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by TID, campaign, sender..."
            className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 text-xs">
          {['all', 'verified', 'pending_verification', 'rejected'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg border transition-colors capitalize cursor-pointer ${
                statusFilter === st
                  ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-bold border-neutral-900 dark:border-white'
                  : 'bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-300 border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50'
              }`}
            >
              {st.replace(/_/g, ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Payments Table */}
      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/50 text-neutral-500 font-semibold uppercase tracking-wider">
                <th className="py-3 px-4">Transaction Reference</th>
                <th className="py-3 px-4">Campaign Name</th>
                <th className="py-3 px-4">Sender Contact</th>
                <th className="py-3 px-4">Breakdown</th>
                <th className="py-3 px-4">Total Amount</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Invoice</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-neutral-400">
                    No payment transactions found.
                  </td>
                </tr>
              ) : (
                filtered.map((p) => (
                  <tr key={p.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/40 transition-colors">
                    <td className="py-3.5 px-4">
                      <p className="font-mono font-bold text-neutral-900 dark:text-white">
                        {p.transactionId}
                      </p>
                      <p className="text-[10px] text-neutral-400 font-mono">
                        {new Date(p.submittedAt).toLocaleDateString()} at{' '}
                        {new Date(p.submittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </td>

                    <td className="py-3.5 px-4 font-semibold text-neutral-800 dark:text-neutral-200 max-w-xs truncate">
                      {p.campaignName}
                    </td>

                    <td className="py-3.5 px-4">
                      <p className="font-medium text-neutral-900 dark:text-white">{p.senderName}</p>
                      <p className="text-[11px] text-neutral-400 font-mono">{p.senderNumber}</p>
                    </td>

                    <td className="py-3.5 px-4 text-[11px] text-neutral-500 font-mono">
                      <p>Ad Media: Rs {p.adBudgetAmount.toLocaleString()}</p>
                      <p>Agency Fee: Rs {p.serviceFeeAmount.toLocaleString()}</p>
                    </td>

                    <td className="py-3.5 px-4 font-mono font-bold text-sm text-neutral-900 dark:text-white">
                      Rs {p.totalAmount.toLocaleString()}
                    </td>

                    <td className="py-3.5 px-4">{getStatusBadge(p.status)}</td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => downloadInvoiceHtml(p, campaigns.find((c) => c.id === p.campaignId))}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 text-blue-700 dark:text-blue-300 font-semibold text-[11px] transition-colors cursor-pointer border border-blue-200 dark:border-blue-900"
                          title="Download Invoice as Standalone HTML file"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Download</span>
                        </button>

                        <button
                          onClick={() => {
                            setSelectedInvoicePayment(p);
                            setIsInvoiceOpen(true);
                          }}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:bg-neutral-50 text-neutral-800 dark:text-neutral-200 font-semibold text-[11px] transition-colors cursor-pointer"
                        >
                          <Printer className="w-3.5 h-3.5 text-neutral-500" />
                          <span>Print</span>
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

      {/* Invoice Modal */}
      <InvoiceModal
        isOpen={isInvoiceOpen}
        onClose={() => setIsInvoiceOpen(false)}
        payment={selectedInvoicePayment}
        campaign={campaigns.find((c) => c.id === selectedInvoicePayment?.campaignId)}
      />
    </div>
  );
};
