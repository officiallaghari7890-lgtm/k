/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext.tsx';
import { Navbar } from './components/layout/Navbar.tsx';
import { Footer } from './components/layout/Footer.tsx';
import { WhatsAppButton } from './components/common/WhatsAppButton.tsx';
import { LiveChatWidget } from './components/common/LiveChatWidget.tsx';
import { AuthModal } from './components/auth/AuthModal.tsx';

// Pages
import { HomePage } from './pages/HomePage.tsx';
import { AboutPage } from './pages/AboutPage.tsx';
import { ServicesPage } from './pages/ServicesPage.tsx';
import { AdPlatformsPage } from './pages/AdPlatformsPage.tsx';
import { PricingPage } from './pages/PricingPage.tsx';
import { HowItWorksPage } from './pages/HowItWorksPage.tsx';
import { CreateCampaignPage } from './pages/CreateCampaignPage.tsx';
import { CustomerDashboard } from './pages/CustomerDashboard.tsx';
import { CampaignDetailsPage } from './pages/CampaignDetailsPage.tsx';
import { CampaignReportsPage } from './pages/CampaignReportsPage.tsx';
import { PaymentCheckoutPage } from './pages/PaymentCheckoutPage.tsx';
import { PaymentHistoryPage } from './pages/PaymentHistoryPage.tsx';
import { AdminDashboard } from './pages/AdminDashboard.tsx';
import { AdManagerDashboard } from './pages/AdManagerDashboard.tsx';
import { ContactPage } from './pages/ContactPage.tsx';
import { LegalPages } from './pages/LegalPages.tsx';

const AppContent: React.FC = () => {
  const { currentPage } = useApp();

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'about':
        return <AboutPage />;
      case 'services':
        return <ServicesPage />;
      case 'platforms':
        return <AdPlatformsPage />;
      case 'pricing':
        return <PricingPage />;
      case 'how_it_works':
        return <HowItWorksPage />;
      case 'create_campaign':
        return <CreateCampaignPage />;
      case 'customer_dashboard':
        return <CustomerDashboard />;
      case 'campaign_details':
        return <CampaignDetailsPage />;
      case 'campaign_reports':
        return <CampaignReportsPage />;
      case 'checkout':
        return <PaymentCheckoutPage />;
      case 'payment_history':
        return <PaymentHistoryPage />;
      case 'admin_dashboard':
        return <AdminDashboard />;
      case 'ad_manager_dashboard':
        return <AdManagerDashboard />;
      case 'contact':
        return <ContactPage />;
      case 'faqs':
        return <LegalPages type="faqs" />;
      case 'privacy_policy':
        return <LegalPages type="privacy" />;
      case 'terms_conditions':
        return <LegalPages type="terms" />;
      case 'refund_policy':
        return <LegalPages type="refund" />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors">
      <Navbar />
      <main className="flex-1">{renderPage()}</main>
      <Footer />
      <WhatsAppButton />
      <LiveChatWidget />
      <AuthModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
