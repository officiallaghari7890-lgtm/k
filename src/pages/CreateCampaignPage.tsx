import React, { useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import {
  CampaignType,
  CampaignObjective,
  AdAccountType,
  AdCreative,
} from '../types/index.ts';
import { JAZZCASH_NUMBER, JAZZCASH_TITLE } from '../data/mockData.ts';
import {
  ShoppingBag,
  Globe,
  Smartphone,
  Layers,
  Target,
  Play,
  Users,
  Compass,
  TrendingUp,
  Zap,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Upload,
  Image as ImageIcon,
  DollarSign,
  Calendar,
  Lock,
  Sparkles,
} from 'lucide-react';

export const CreateCampaignPage: React.FC = () => {
  const { currentUser, createCampaign, navigateToCheckout, openAuthModal } = useApp();

  const [step, setStep] = useState<number>(1);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  // Form Fields
  const [campaignType, setCampaignType] = useState<CampaignType>('ecommerce_sales');
  const [campaignName, setCampaignName] = useState<string>('');
  const [objective, setObjective] = useState<CampaignObjective>('sales');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['Facebook & Instagram', 'TikTok Ads']);
  const [adAccountType, setAdAccountType] = useState<AdAccountType>('agency_account');
  const [adAccountId, setAdAccountId] = useState<string>('');

  // Product / Website details
  const [productName, setProductName] = useState<string>('');
  const [productDescription, setProductDescription] = useState<string>('');
  const [productPrice, setProductPrice] = useState<string>('');
  const [websiteUrl, setWebsiteUrl] = useState<string>('');
  const [appDownloadUrl, setAppDownloadUrl] = useState<string>('');

  // Targeting
  const [targetCountry, setTargetCountry] = useState<string>('Pakistan');
  const [targetCity, setTargetCity] = useState<string>('Karachi, Lahore, Islamabad, Rawalpindi');
  const [targetAudience, setTargetAudience] = useState<string>('Online shoppers, technology & lifestyle buyers, mobile users');
  const [ageRange, setAgeRange] = useState<string>('18 - 45');
  const [gender, setGender] = useState<'all' | 'men' | 'women'>('all');

  // Budget & Schedule
  const [dailyBudget, setDailyBudget] = useState<number>(5000);
  const [durationDays, setDurationDays] = useState<number>(30);
  const [startDate, setStartDate] = useState<string>(new Date().toISOString().split('T')[0]);

  // Creative & Copy
  const [adCopy, setAdCopy] = useState<string>('');
  const [ctaButton, setCtaButton] = useState<string>('Shop Now');
  const [customerContact, setCustomerContact] = useState<string>(currentUser?.phone || '+92 321 0000000');
  const [creatives, setCreatives] = useState<AdCreative[]>([
    {
      id: 'cr-sample-1',
      name: 'primary_ad_creative.jpg',
      url: '/src/assets/images/meta_google_ads_visual_1790601007917.jpg',
      type: 'image',
      size: '2.4 MB',
    },
  ]);

  // Budget Math
  const totalMediaBudget = dailyBudget * durationDays;
  const agencyFee = Math.round(totalMediaBudget * 0.1); // 10% fee
  const totalPayable = totalMediaBudget + agencyFee;

  // Calculate End Date
  const calculateEndDate = () => {
    const d = new Date(startDate || new Date());
    d.setDate(d.getDate() + durationDays);
    return d.toISOString().split('T')[0];
  };

  const togglePlatform = (p: string) => {
    if (selectedPlatforms.includes(p)) {
      if (selectedPlatforms.length > 1) {
        setSelectedPlatforms(selectedPlatforms.filter((item) => item !== p));
      }
    } else {
      setSelectedPlatforms([...selectedPlatforms, p]);
    }
  };

  const handleCreativeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const newCr: AdCreative = {
        id: `cr-${Date.now()}`,
        name: file.name,
        url: URL.createObjectURL(file),
        type: file.type.includes('video') ? 'video' : 'image',
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      };
      setCreatives((prev) => [...prev, newCr]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      openAuthModal('signup');
      return;
    }

    if (!campaignName.trim()) {
      setError('Please provide a campaign name.');
      return;
    }

    setError('');
    setSubmitting(true);

    try {
      const newCampaign = await createCampaign({
        userId: currentUser.id,
        userName: currentUser.name,
        userEmail: currentUser.email,
        name: campaignName,
        type: campaignType,
        objective,
        platforms: selectedPlatforms,
        adAccountType,
        adAccountId: adAccountType === 'client_account' ? adAccountId : undefined,
        productName,
        productDescription,
        productPrice,
        websiteUrl,
        appDownloadUrl,
        targetCountry,
        targetCity,
        targetAudience,
        ageRange,
        gender,
        dailyBudget,
        totalBudget: totalMediaBudget,
        agencyServiceFee: agencyFee,
        startDate,
        endDate: calculateEndDate(),
        adCopy: adCopy || 'Premium high-converting ad copy with free delivery nationwide.',
        ctaButton,
        customerContact,
        creatives,
        status: 'pending_payment',
        packageTier: 'professional',
      });

      // Navigate to JazzCash Checkout immediately!
      navigateToCheckout(newCampaign.id);
    } catch (err: any) {
      setError(err?.message || 'Failed to submit campaign. Please check inputs.');
    } finally {
      setSubmitting(false);
    }
  };

  const typeOptions: { id: CampaignType; label: string; icon: any }[] = [
    { id: 'ecommerce_sales', label: 'E-commerce Sales', icon: ShoppingBag },
    { id: 'product_ads', label: 'Product Advertisement', icon: Zap },
    { id: 'website_ads', label: 'Website Traffic Ads', icon: Globe },
    { id: 'mobile_app_ads', label: 'Mobile App Installs', icon: Smartphone },
    { id: 'website_app_ads', label: 'Website & App Ads', icon: TrendingUp },
    { id: 'facebook_instagram_ads', label: 'Facebook & Instagram (Meta)', icon: Layers },
    { id: 'google_ads', label: 'Google Search & PMax', icon: Target },
    { id: 'youtube_ads', label: 'YouTube Video Ads', icon: Play },
    { id: 'tiktok_ads', label: 'TikTok Ads', icon: Play },
    { id: 'lead_generation', label: 'Lead Generation', icon: Users },
    { id: 'brand_awareness', label: 'Brand Awareness', icon: Compass },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Title */}
      <div className="text-center space-y-2">
        <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
          Campaign Launch Studio
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-neutral-950 dark:text-white">
          Create Advertising Campaign
        </h1>
        <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
          Configure targeting, upload creatives, select your ad account, and pay seamlessly via JazzCash.
        </p>
      </div>

      {/* Step Indicators */}
      <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-4">
        {[
          { num: 1, name: 'Type & Objective' },
          { num: 2, name: 'Creative & Targeting' },
          { num: 3, name: 'Ad Account & Budget' },
        ].map((s) => (
          <div
            key={s.num}
            onClick={() => s.num < step && setStep(s.num)}
            className={`flex items-center gap-2 text-xs font-semibold ${
              step === s.num
                ? 'text-blue-600 dark:text-blue-400 font-bold'
                : step > s.num
                ? 'text-emerald-600 dark:text-emerald-400 cursor-pointer'
                : 'text-neutral-400'
            }`}
          >
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-bold ${
                step === s.num
                  ? 'bg-blue-600 text-white'
                  : step > s.num
                  ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500'
              }`}
            >
              {s.num}
            </span>
            <span className="hidden sm:inline">{s.name}</span>
          </div>
        ))}
      </div>

      {error && (
        <div className="p-3 text-xs rounded-xl bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 border border-rose-200 dark:border-rose-900">
          {error}
        </div>
      )}

      {/* Form Steps */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* STEP 1: Type & Platforms */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">
                1. Campaign Type *
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {typeOptions.map((opt) => {
                  const Icon = opt.icon;
                  return (
                    <button
                      type="button"
                      key={opt.id}
                      onClick={() => {
                        setCampaignType(opt.id);
                        if (!campaignName) setCampaignName(`${opt.label} Campaign - ${new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`);
                      }}
                      className={`p-3.5 rounded-xl border text-left transition-all flex items-start gap-3 cursor-pointer ${
                        campaignType === opt.id
                          ? 'border-blue-600 bg-blue-50/70 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 shadow-xs'
                          : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:border-neutral-300'
                      }`}
                    >
                      <Icon className="w-4 h-4 shrink-0 mt-0.5 text-blue-500" />
                      <span className="text-xs font-semibold leading-tight">{opt.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-1">
                2. Campaign Name *
              </label>
              <input
                type="text"
                required
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
                placeholder="e.g. Summer Lawn Festive Drop 2026"
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-1">
                  3. Primary Objective *
                </label>
                <select
                  value={objective}
                  onChange={(e) => setObjective(e.target.value as CampaignObjective)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer"
                >
                  <option value="sales">Sales & Purchases (Max ROAS)</option>
                  <option value="leads">Lead Generation (WhatsApp & Form Leads)</option>
                  <option value="traffic">Website Link Clicks & Store Traffic</option>
                  <option value="app_installs">Mobile App Installs & In-App Events</option>
                  <option value="brand_awareness">Brand Awareness & Max Reach</option>
                  <option value="engagement">Post Engagement & Video Views</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-1">
                  4. Advertising Networks *
                </label>
                <div className="flex flex-wrap gap-2">
                  {['Facebook & Instagram', 'Google Ads', 'TikTok Ads', 'YouTube Ads'].map((p) => (
                    <button
                      type="button"
                      key={p}
                      onClick={() => togglePlatform(p)}
                      className={`px-3 py-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                        selectedPlatforms.includes(p)
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border-neutral-300 dark:border-neutral-700'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="button"
                onClick={() => {
                  if (!campaignName) setCampaignName(`${campaignType.replace(/_/g, ' ').toUpperCase()} Campaign`);
                  setStep(2);
                }}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span>Next: Creative & Targeting</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Creative, Copy, Targeting */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Product / Service Name
                </label>
                <input
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="e.g. UltraBass Pro Noise Cancelling Earbuds"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Product Selling Price (Optional)
                </label>
                <input
                  type="text"
                  value={productPrice}
                  onChange={(e) => setProductPrice(e.target.value)}
                  placeholder="e.g. PKR 7,999 (Special Promo)"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                Product Description & Offer Highlights
              </label>
              <textarea
                rows={2}
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                placeholder="Key features, warranty, Cash on Delivery options, free shipping notes..."
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Website / Store URL
                </label>
                <input
                  type="url"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  placeholder="https://yourstore.pk/product"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  App Store / Play Store URL (If App Ads)
                </label>
                <input
                  type="url"
                  value={appDownloadUrl}
                  onChange={(e) => setAppDownloadUrl(e.target.value)}
                  placeholder="https://play.google.com/store/apps/details?id=..."
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Target Audience */}
            <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                Audience & Geo-Targeting
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-neutral-600 dark:text-neutral-400 mb-1">
                    Target Country
                  </label>
                  <input
                    type="text"
                    value={targetCountry}
                    onChange={(e) => setTargetCountry(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-neutral-600 dark:text-neutral-400 mb-1">
                    Target Cities
                  </label>
                  <input
                    type="text"
                    value={targetCity}
                    onChange={(e) => setTargetCity(e.target.value)}
                    placeholder="e.g. Karachi, Lahore, Islamabad or Nationwide"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-neutral-600 dark:text-neutral-400 mb-1">
                    Target Demographics / Interests
                  </label>
                  <input
                    type="text"
                    value={targetAudience}
                    onChange={(e) => setTargetAudience(e.target.value)}
                    placeholder="e.g. Luxury fashion, tech lovers"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-neutral-600 dark:text-neutral-400 mb-1">
                    Customer Age Range
                  </label>
                  <input
                    type="text"
                    value={ageRange}
                    onChange={(e) => setAgeRange(e.target.value)}
                    placeholder="18 - 45"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-neutral-600 dark:text-neutral-400 mb-1">
                    Gender
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white cursor-pointer"
                  >
                    <option value="all">All Genders</option>
                    <option value="men">Men Only</option>
                    <option value="women">Women Only</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Ad Copy & CTA */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Primary Ad Copy / Hook
                </label>
                <textarea
                  rows={2}
                  value={adCopy}
                  onChange={(e) => setAdCopy(e.target.value)}
                  placeholder="Hook, emotional trigger, offer details, and clear Call to Action..."
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  CTA Button Label
                </label>
                <select
                  value={ctaButton}
                  onChange={(e) => setCtaButton(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white cursor-pointer"
                >
                  <option value="Shop Now">Shop Now</option>
                  <option value="Order Now">Order Now (COD)</option>
                  <option value="Get Quote">Get Quote</option>
                  <option value="Learn More">Learn More</option>
                  <option value="Install Now">Install Now</option>
                  <option value="Sign Up">Sign Up</option>
                  <option value="Contact Us">Contact WhatsApp</option>
                </select>
              </div>
            </div>

            {/* Creatives Upload */}
            <div>
              <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">
                Upload Ad Creatives (Images & Videos)
              </label>
              <div className="border-2 border-dashed border-neutral-300 dark:border-neutral-700 rounded-2xl p-6 text-center hover:border-blue-500 transition-colors bg-neutral-50/50 dark:bg-neutral-900/50">
                <Upload className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
                <p className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                  Drag and drop product photos or short-form video ads
                </p>
                <p className="text-[11px] text-neutral-500 mt-0.5">
                  Supports MP4, MOV, JPG, PNG up to 50MB
                </p>
                <label className="mt-3 inline-block px-4 py-1.5 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:bg-neutral-50 cursor-pointer">
                  Select Files
                  <input
                    type="file"
                    accept="image/*,video/*"
                    onChange={handleCreativeUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Uploaded creatives list */}
              {creatives.length > 0 && (
                <div className="flex flex-wrap gap-3 mt-3">
                  {creatives.map((c) => (
                    <div
                      key={c.id}
                      className="flex items-center gap-2 p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-xs border border-neutral-200 dark:border-neutral-700"
                    >
                      <ImageIcon className="w-4 h-4 text-blue-500 shrink-0" />
                      <span className="font-medium text-neutral-800 dark:text-neutral-200 max-w-[140px] truncate">
                        {c.name}
                      </span>
                      <span className="text-[10px] text-neutral-400 font-mono">{c.size}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 text-xs font-bold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 cursor-pointer flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span>Next: Ad Account & Budget</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Ad Account, Budget & JazzCash Breakdown */}
        {step === 3 && (
          <div className="space-y-6">
            {/* Advertising Account Selection (Feature 6) */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider">
                Whose Advertising Account Will Be Used? *
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setAdAccountType('agency_account')}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                    adAccountType === 'agency_account'
                      ? 'border-blue-600 bg-blue-50/70 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 ring-2 ring-blue-600/20'
                      : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300'
                  }`}
                >
                  <p className="font-bold text-xs">Agency Advertising Account</p>
                  <p className="text-[11px] text-neutral-500 mt-1">
                    Digital Rankup's verified agency credit line. No international card needed.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setAdAccountType('client_account')}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                    adAccountType === 'client_account'
                      ? 'border-blue-600 bg-blue-50/70 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 ring-2 ring-blue-600/20'
                      : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300'
                  }`}
                >
                  <p className="font-bold text-xs">My Own Advertising Account</p>
                  <p className="text-[11px] text-neutral-500 mt-1">
                    Link your Meta BM or Google MCC via official partner invite. Zero passwords.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setAdAccountType('new_account_needed')}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                    adAccountType === 'new_account_needed'
                      ? 'border-blue-600 bg-blue-50/70 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 ring-2 ring-blue-600/20'
                      : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300'
                  }`}
                >
                  <p className="font-bold text-xs">New Account Setup Needed</p>
                  <p className="text-[11px] text-neutral-500 mt-1">
                    Agency creates and verifies fresh Business Manager and Pixel for you.
                  </p>
                </button>
              </div>

              {adAccountType === 'client_account' && (
                <div className="p-3.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 text-xs space-y-2">
                  <label className="block font-semibold text-blue-900 dark:text-blue-200">
                    Your Meta BM ID or Google Ads CID
                  </label>
                  <input
                    type="text"
                    value={adAccountId}
                    onChange={(e) => setAdAccountId(e.target.value)}
                    placeholder="e.g. BM-908127381 or 123-456-7890"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white font-mono"
                  />
                  <p className="text-[11px] text-neutral-500">
                    We will send an advertiser partner request to this ID. Never share account passwords!
                  </p>
                </div>
              )}
            </div>

            {/* Budget & Schedule */}
            <div className="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                Budget Allocation & Duration
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Daily Ad Media Spend (PKR)
                  </label>
                  <input
                    type="number"
                    min="1000"
                    step="500"
                    value={dailyBudget}
                    onChange={(e) => setDailyBudget(Number(e.target.value))}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 font-mono font-bold text-neutral-900 dark:text-white"
                  />
                  <p className="text-[10px] text-neutral-400 mt-1">Recommended min: Rs 3,000/day</p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Campaign Duration (Days)
                  </label>
                  <input
                    type="number"
                    min="7"
                    max="90"
                    value={durationDays}
                    onChange={(e) => setDurationDays(Number(e.target.value))}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 font-mono font-bold text-neutral-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Launch Start Date
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white"
                  />
                </div>
              </div>

              {/* Financial Calculation Box */}
              <div className="p-4 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 space-y-2 text-xs">
                <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
                  <span>Total Direct Ad Media Spend ({durationDays} days):</span>
                  <span className="font-mono font-bold text-neutral-900 dark:text-white">
                    Rs {totalMediaBudget.toLocaleString()} PKR
                  </span>
                </div>
                <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
                  <span>Digital Rankup Management Fee (10%):</span>
                  <span className="font-mono font-bold text-neutral-900 dark:text-white">
                    Rs {agencyFee.toLocaleString()} PKR
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-neutral-200 dark:border-neutral-700 text-sm font-extrabold">
                  <span className="text-neutral-950 dark:text-white">Total JazzCash Payable:</span>
                  <span className="font-mono text-blue-600 dark:text-blue-400 text-base">
                    Rs {totalPayable.toLocaleString()} PKR
                  </span>
                </div>
              </div>
            </div>

            {/* Customer Contact */}
            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                Your Contact Number (WhatsApp for Campaign Updates) *
              </label>
              <input
                type="text"
                required
                value={customerContact}
                onChange={(e) => setCustomerContact(e.target.value)}
                placeholder="+92 321 0000000"
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white font-mono"
              />
            </div>

            {/* JazzCash Info Banner */}
            <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 text-xs flex items-start gap-3 text-red-900 dark:text-red-300">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600 shrink-0 mt-1" />
              <div>
                <p className="font-bold">Next Step: JazzCash Manual Transfer Submission</p>
                <p className="text-[11px] text-red-700 dark:text-red-400 mt-0.5">
                  Submitting this campaign will take you directly to the JazzCash payment verification screen. You will transfer Rs {totalPayable.toLocaleString()} to <strong>{JAZZCASH_NUMBER}</strong> ({JAZZCASH_TITLE}) and provide your TID.
                </p>
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 text-xs font-bold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 cursor-pointer flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>

              <button
                type="submit"
                disabled={submitting}
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-extrabold transition-all shadow-lg hover:shadow-blue-500/25 flex items-center gap-2 cursor-pointer"
              >
                {submitting ? 'Submitting Campaign...' : 'Submit Campaign & Proceed to JazzCash'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};
