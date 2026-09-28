import { Payment, Campaign } from '../types/index.ts';
import { JAZZCASH_NUMBER, JAZZCASH_TITLE } from '../data/mockData.ts';

/**
 * Triggers a native browser file download for text/blob content
 */
export function triggerFileDownload(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Downloads a standalone, print-ready, professional HTML invoice
 */
export function downloadInvoiceHtml(payment: Payment, campaign?: Campaign) {
  const invoiceNumber = `INV-${payment.id.replace('PAY-', '')}`;
  const dateFormatted = new Date(payment.submittedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Digital Rankup Agency - Invoice ${invoiceNumber}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; margin: 40px; color: #111827; background: #ffffff; line-height: 1.5; font-size: 14px; }
    .header { display: flex; justify-content: space-between; border-bottom: 2px solid #e5e7eb; padding-bottom: 24px; margin-bottom: 30px; }
    .brand { font-size: 24px; font-weight: 800; color: #0f172a; margin-bottom: 4px; }
    .subtitle { color: #64748b; font-size: 12px; }
    .invoice-title { font-size: 28px; font-weight: 900; color: #2563eb; text-align: right; }
    .inv-meta { text-align: right; font-size: 13px; color: #475569; margin-top: 6px; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-bottom: 30px; padding-bottom: 24px; border-bottom: 1px solid #e2e8f0; }
    .box-title { font-size: 11px; font-weight: 700; text-transform: uppercase; color: #94a3b8; letter-spacing: 0.05em; margin-bottom: 8px; }
    .strong { font-weight: 700; color: #0f172a; }
    .table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
    .table th { background: #f8fafc; text-align: left; padding: 12px; font-size: 11px; text-transform: uppercase; color: #64748b; border-bottom: 2px solid #e2e8f0; }
    .table td { padding: 14px 12px; border-bottom: 1px solid #f1f5f9; }
    .total-row td { border-top: 2px solid #0f172a; font-weight: 800; font-size: 16px; color: #0f172a; padding-top: 16px; }
    .text-right { text-align: right; }
    .badge { display: inline-block; padding: 4px 12px; border-radius: 9999px; font-size: 12px; font-weight: 700; background: #ecfdf5; color: #047857; border: 1px solid #a7f3d0; }
    .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #e2e8f0; display: flex; justify-content: space-between; font-size: 12px; color: #64748b; }
    .tid-box { background: #eff6ff; padding: 8px 12px; border-radius: 6px; font-family: monospace; font-size: 13px; color: #1d4ed8; font-weight: bold; display: inline-block; }
    @media print { body { margin: 0; } }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <div class="brand">Digital Rankup Agency</div>
      <div class="subtitle">Premier Digital Marketing & Paid Advertising Platform</div>
      <div class="subtitle">NTN / Registration: DR-PK-992014</div>
      <div class="subtitle">Official JazzCash Account: ${JAZZCASH_NUMBER} (${JAZZCASH_TITLE})</div>
    </div>
    <div>
      <div class="invoice-title">INVOICE</div>
      <div class="inv-meta"><strong>${invoiceNumber}</strong></div>
      <div class="inv-meta">Issue Date: ${dateFormatted}</div>
      <div class="inv-meta" style="margin-top: 8px;">
        <span class="badge">Payment Verified & Reconciled</span>
      </div>
    </div>
  </div>

  <div class="grid">
    <div>
      <div class="box-title">Billed To</div>
      <div class="strong" style="font-size: 16px;">${payment.userName}</div>
      <div>${payment.userEmail}</div>
      <div>Sender Contact: ${payment.senderNumber}</div>
      ${campaign?.websiteUrl ? `<div>Website: ${campaign.websiteUrl}</div>` : ''}
    </div>
    <div>
      <div class="box-title">Payment Settlement Details</div>
      <div>Method: <strong>JazzCash Direct Transfer</strong></div>
      <div>Receiving Mobile: <strong>${JAZZCASH_NUMBER}</strong></div>
      <div>Account Title: <strong>${JAZZCASH_TITLE}</strong></div>
      <div style="margin-top: 8px;">
        JazzCash TID: <span class="tid-box">${payment.transactionId}</span>
      </div>
    </div>
  </div>

  <div style="background: #f8fafc; padding: 12px 16px; border-radius: 8px; margin-bottom: 24px; border: 1px solid #e2e8f0;">
    <span style="font-size: 11px; text-transform: uppercase; color: #64748b; font-weight: 700;">Associated Campaign:</span>
    <div style="font-size: 15px; font-weight: 700; color: #0f172a;">${payment.campaignName} (ID: ${payment.campaignId})</div>
  </div>

  <table class="table">
    <thead>
      <tr>
        <th>Description</th>
        <th>Category</th>
        <th class="text-right">Amount (PKR)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          <div class="strong">Direct Advertising Media Spend Budget</div>
          <div class="subtitle">100% consumed on ad platforms (Meta Ads, Google Search, TikTok Ads, YouTube).</div>
        </td>
        <td>Media Spend</td>
        <td class="text-right font-mono strong">Rs ${payment.adBudgetAmount.toLocaleString()}</td>
      </tr>
      <tr>
        <td>
          <div class="strong">Digital Rankup Management & Optimization Fee</div>
          <div class="subtitle">Audience targeting, creative testing, pixel conversion API, and daily ROAS scaling.</div>
        </td>
        <td>Agency Service</td>
        <td class="text-right font-mono strong">Rs ${payment.serviceFeeAmount.toLocaleString()}</td>
      </tr>
      <tr class="total-row">
        <td colspan="2" class="text-right">Total Amount Received (PKR):</td>
        <td class="text-right" style="color: #2563eb;">Rs ${payment.totalAmount.toLocaleString()} PKR</td>
      </tr>
    </tbody>
  </table>

  <div class="footer">
    <div>
      <strong>Digital Rankup Agency Management</strong><br>
      Reconciled via JazzCash Banking Statement (${JAZZCASH_NUMBER})
    </div>
    <div style="text-align: right;">
      Official Receipt Generated on ${new Date().toLocaleDateString()}<br>
      Authorized Electronic Signature
    </div>
  </div>
</body>
</html>`;

  triggerFileDownload(html, `DigitalRankup_${invoiceNumber}.html`, 'text/html');
}

/**
 * Downloads full campaign performance breakdown as CSV
 */
export function downloadCampaignReportCsv(campaign: Campaign) {
  if (!campaign.metrics) return;

  const m = campaign.metrics;
  const rows = [
    ['Digital Rankup Agency - Campaign Performance Report'],
    ['Campaign Name', campaign.name],
    ['Campaign ID', campaign.id],
    ['Campaign Type', campaign.type],
    ['Client', campaign.userName],
    ['Target Networks', campaign.platforms.join(' | ')],
    ['Report Date', new Date().toISOString().split('T')[0]],
    [''],
    ['KEY PERFORMANCE METRICS (KPIs)'],
    ['Metric', 'Value'],
    ['Total Ad Spend (PKR)', m.totalSpend],
    ['Gross Revenue (PKR)', m.revenue],
    ['Return on Ad Spend (ROAS)', `${m.roas.toFixed(2)}x`],
    ['Total Conversions / Orders', m.conversions],
    ['Conversion Rate (%)', `${m.conversionRate.toFixed(2)}%`],
    ['Cost Per Result (PKR)', m.costPerResult.toFixed(2)],
    ['Total Link Clicks', m.clicks],
    ['Click-Through Rate (CTR %)', `${m.ctr.toFixed(2)}%`],
    ['Average CPC (PKR)', m.cpc.toFixed(2)],
    ['Impressions', m.impressions],
    ['Reach', m.reach],
    [''],
    ['DAILY PERFORMANCE LOG'],
    ['Date', 'Ad Spend (PKR)', 'Impressions', 'Clicks', 'Conversions', 'Revenue (PKR)'],
    ...m.dailyBreakdown.map((d) => [
      d.date,
      d.spend,
      d.impressions,
      d.clicks,
      d.conversions,
      d.revenue,
    ]),
    [''],
    ['NETWORK ATTRIBUTION BREAKDOWN'],
    ['Platform', 'Spend (PKR)', 'Clicks', 'Conversions', 'ROAS'],
    ...m.platformBreakdown.map((p) => [
      p.platform,
      p.spend,
      p.clicks,
      p.conversions,
      `${p.roas.toFixed(2)}x`,
    ]),
  ];

  const csvContent = rows.map((e) => e.map((val) => `"${val}"`).join(',')).join('\n');
  triggerFileDownload(csvContent, `DigitalRankup_Report_${campaign.id}.csv`, 'text/csv;charset=utf-8;');
}

/**
 * Exports all campaigns as a CSV table
 */
export function downloadAllCampaignsCsv(campaigns: Campaign[]) {
  const headers = [
    'Campaign ID',
    'Name',
    'Client Name',
    'Type',
    'Status',
    'Platforms',
    'Daily Budget (PKR)',
    'Total Budget (PKR)',
    'Agency Fee (PKR)',
    'Total Spend (PKR)',
    'Gross Revenue (PKR)',
    'ROAS',
    'Conversions',
    'Clicks',
    'Start Date',
    'End Date',
  ];

  const rows = campaigns.map((c) => [
    c.id,
    c.name,
    c.userName,
    c.type,
    c.status,
    c.platforms.join('; '),
    c.dailyBudget,
    c.totalBudget,
    c.agencyServiceFee,
    c.metrics?.totalSpend || 0,
    c.metrics?.revenue || 0,
    c.metrics ? `${c.metrics.roas.toFixed(2)}x` : 'N/A',
    c.metrics?.conversions || 0,
    c.metrics?.clicks || 0,
    c.startDate,
    c.endDate,
  ]);

  const csv = [headers, ...rows].map((row) => row.map((v) => `"${v}"`).join(',')).join('\n');
  triggerFileDownload(csv, `DigitalRankup_Campaigns_Export_${new Date().toISOString().split('T')[0]}.csv`, 'text/csv');
}

/**
 * Exports financial transactions ledger as CSV
 */
export function downloadFinancialLedgerCsv(payments: Payment[]) {
  const headers = [
    'Payment ID',
    'Transaction ID (TID)',
    'Campaign ID',
    'Campaign Name',
    'Client Name',
    'Client Email',
    'Sender Mobile',
    'JazzCash Receiving Mobile',
    'Ad Media Budget (PKR)',
    'Agency Service Fee (PKR)',
    'Total Amount (PKR)',
    'Status',
    'Submission Date',
    'Verified By',
  ];

  const rows = payments.map((p) => [
    p.id,
    p.transactionId,
    p.campaignId,
    p.campaignName,
    p.userName,
    p.userEmail,
    p.senderNumber,
    p.jazzCashNumber,
    p.adBudgetAmount,
    p.serviceFeeAmount,
    p.totalAmount,
    p.status,
    p.submittedAt,
    p.verifiedBy || 'Pending',
  ]);

  const csv = [headers, ...rows].map((row) => row.map((v) => `"${v}"`).join(',')).join('\n');
  triggerFileDownload(csv, `DigitalRankup_JazzCash_Ledger_${new Date().toISOString().split('T')[0]}.csv`, 'text/csv');
}
