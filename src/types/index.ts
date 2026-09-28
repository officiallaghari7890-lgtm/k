export type UserRole = 'super_admin' | 'admin' | 'ad_manager' | 'customer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  avatar?: string;
  companyName?: string;
  verified: boolean;
  createdAt: string;
}

export type CampaignType =
  | 'product_ads'
  | 'website_ads'
  | 'mobile_app_ads'
  | 'website_app_ads'
  | 'facebook_instagram_ads'
  | 'google_ads'
  | 'youtube_ads'
  | 'tiktok_ads'
  | 'lead_generation'
  | 'brand_awareness'
  | 'ecommerce_sales';

export type CampaignObjective =
  | 'sales'
  | 'leads'
  | 'traffic'
  | 'engagement'
  | 'app_installs'
  | 'brand_awareness';

export type AdAccountType = 'client_account' | 'agency_account' | 'new_account_needed';

export type CampaignStatus =
  | 'draft'
  | 'pending_payment'
  | 'payment_verification_pending'
  | 'payment_confirmed'
  | 'pending_approval'
  | 'approved'
  | 'in_progress'
  | 'active'
  | 'paused'
  | 'completed'
  | 'rejected'
  | 'cancelled';

export interface AdCreative {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'video';
  size?: string;
}

export interface DailyMetric {
  date: string;
  spend: number;
  impressions: number;
  clicks: number;
  conversions: number;
  revenue: number;
}

export interface PlatformMetric {
  platform: string;
  spend: number;
  clicks: number;
  conversions: number;
  roas: number;
}

export interface CampaignMetrics {
  totalSpend: number;
  impressions: number;
  reach: number;
  clicks: number;
  ctr: number; // percentage e.g. 2.45
  cpc: number; // e.g. 18.5 PKR
  costPerResult: number; // e.g. 145 PKR
  conversions: number;
  conversionRate: number; // % e.g. 3.2
  leads: number;
  revenue: number;
  roas: number; // e.g. 4.35
  lastUpdated: string;
  isVerifiedPlatformData: boolean;
  dailyBreakdown: DailyMetric[];
  platformBreakdown: PlatformMetric[];
}

export interface CampaignHistoryEntry {
  status: CampaignStatus;
  note: string;
  timestamp: string;
  updatedBy: string;
}

export interface Campaign {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  name: string;
  type: CampaignType;
  objective: CampaignObjective;
  platforms: string[];
  adAccountType: AdAccountType;
  adAccountId?: string;
  productName?: string;
  productDescription?: string;
  productPrice?: string;
  websiteUrl?: string;
  appDownloadUrl?: string;
  targetCountry: string;
  targetCity: string;
  targetAudience: string;
  ageRange: string;
  gender: 'all' | 'men' | 'women';
  dailyBudget: number; // in PKR
  totalBudget: number; // in PKR
  agencyServiceFee: number; // in PKR
  startDate: string;
  endDate: string;
  adCopy: string;
  ctaButton: string;
  customerContact: string;
  creatives: AdCreative[];
  status: CampaignStatus;
  assignedManagerId?: string;
  assignedManagerName?: string;
  packageTier?: 'starter' | 'professional' | 'premium' | 'custom';
  metrics?: CampaignMetrics;
  history: CampaignHistoryEntry[];
  adminNotes?: string;
  rejectionReason?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Payment {
  id: string;
  campaignId: string;
  campaignName: string;
  userId: string;
  userName: string;
  userEmail: string;
  jazzCashNumber: string; // '03212583543'
  senderNumber: string;
  senderName: string;
  transactionId: string; // JazzCash TID / Reference
  adBudgetAmount: number;
  serviceFeeAmount: number;
  totalAmount: number;
  currency: 'PKR';
  paymentMethod: 'jazzcash_manual';
  screenshotUrl?: string;
  status: 'pending_verification' | 'verified' | 'rejected';
  submittedAt: string;
  verifiedAt?: string;
  verifiedBy?: string;
  rejectionReason?: string;
  notes?: string;
}

export interface PricingPackage {
  id: string;
  name: string;
  tagline: string;
  targetAudience: string;
  pricePKR: number;
  managementFeePercent: number;
  minAdSpendPKR: number;
  features: string[];
  popular?: boolean;
}

export interface SupportTicketMessage {
  id: string;
  senderRole: UserRole;
  senderName: string;
  text: string;
  timestamp: string;
}

export interface SupportTicket {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  campaignId?: string;
  subject: string;
  category: 'campaign' | 'payment' | 'ad_account' | 'creative' | 'technical' | 'general';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  messages: SupportTicketMessage[];
  createdAt: string;
  updatedAt: string;
}

export interface AppNotification {
  id: string;
  userId: string; // or 'all_admins' or 'ad_managers'
  title: string;
  message: string;
  type: 'campaign' | 'payment' | 'support' | 'system';
  link?: string;
  read: boolean;
  createdAt: string;
}
