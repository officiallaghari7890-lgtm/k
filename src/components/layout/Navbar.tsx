import React, { useState } from 'react';
import { useApp, AppPage } from '../../context/AppContext.tsx';
import { UserRole } from '../../types/index.ts';
import { NotificationDropdown } from '../common/NotificationDropdown.tsx';
import {
  Sun,
  Moon,
  Bell,
  User as UserIcon,
  Shield,
  Briefcase,
  Layers,
  ChevronDown,
  LogOut,
  PlusCircle,
  Menu,
  X,
  CreditCard,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentUser,
    currentPage,
    setCurrentPage,
    theme,
    toggleTheme,
    notifications,
    openAuthModal,
    logout,
    switchRole,
  } = useApp();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const unreadNotifs = notifications.filter((n) => !n.read).length;

  const navLinks: { label: string; page: AppPage }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Services', page: 'services' },
    { label: 'Ad Platforms', page: 'platforms' },
    { label: 'Pricing', page: 'pricing' },
    { label: 'How It Works', page: 'how_it_works' },
    { label: 'Contact', page: 'contact' },
  ];

  const handleNavClick = (page: AppPage) => {
    setCurrentPage(page);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getDashboardDestination = (): AppPage => {
    if (!currentUser) return 'customer_dashboard';
    if (currentUser.role === 'super_admin' || currentUser.role === 'admin') return 'admin_dashboard';
    if (currentUser.role === 'ad_manager') return 'ad_manager_dashboard';
    return 'customer_dashboard';
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2 group text-left cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold font-display text-lg tracking-tight shadow-xs group-hover:bg-blue-700 transition-colors">
              DR
            </div>
            <span className="text-lg font-bold font-display tracking-tight text-neutral-900 dark:text-white">
              Digital Rankup Agency
            </span>
          </button>
        </div>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-neutral-600 dark:text-neutral-300">
          {navLinks.map((link) => (
            <button
              key={link.page}
              onClick={() => handleNavClick(link.page)}
              className={`transition-colors hover:text-blue-600 dark:hover:text-blue-400 py-1 cursor-pointer ${
                currentPage === link.page
                  ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                  : ''
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Zone 3: 1-2 primary actions + functional affordances */}
        <div className="flex items-center gap-2.5">
          {/* Quick Demo Role Switcher */}
          <div className="hidden sm:flex items-center gap-1 p-1 bg-neutral-100 dark:bg-neutral-800 rounded-lg text-[11px] font-medium border border-neutral-200 dark:border-neutral-700">
            <button
              onClick={() => switchRole('customer')}
              className={`px-2 py-1 rounded transition-colors cursor-pointer ${
                currentUser?.role === 'customer'
                  ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-xs font-bold'
                  : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
              }`}
              title="Switch to Client / Advertiser view"
            >
              Client
            </button>
            <button
              onClick={() => switchRole('ad_manager')}
              className={`px-2 py-1 rounded transition-colors cursor-pointer ${
                currentUser?.role === 'ad_manager'
                  ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-xs font-bold'
                  : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
              }`}
              title="Switch to Media Buyer view"
            >
              Ad Manager
            </button>
            <button
              onClick={() => switchRole('super_admin')}
              className={`px-2 py-1 rounded transition-colors cursor-pointer ${
                currentUser?.role === 'super_admin' || currentUser?.role === 'admin'
                  ? 'bg-white dark:bg-neutral-700 text-blue-600 dark:text-blue-400 shadow-xs font-bold'
                  : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
              }`}
              title="Switch to Agency Owner Admin console"
            >
              Admin
            </button>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Dark and Light theme"
            className="p-2 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-neutral-600" />}
          </button>

          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={() => setIsNotifOpen((prev) => !prev)}
              aria-label="View notifications"
              className="p-2 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors relative cursor-pointer"
            >
              <Bell className="w-4 h-4" />
              {unreadNotifs > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-blue-600 ring-2 ring-white dark:ring-neutral-900" />
              )}
            </button>
            <NotificationDropdown isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />
          </div>

          {/* User Account / Login */}
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen((prev) => !prev)}
                className="flex items-center gap-2 pl-2 pr-2.5 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-750 transition-colors text-xs font-semibold text-neutral-800 dark:text-neutral-200 cursor-pointer"
              >
                <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">
                  {currentUser.name.charAt(0)}
                </div>
                <span className="hidden sm:inline max-w-[90px] truncate">{currentUser.name}</span>
                <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
              </button>

              {isUserMenuOpen && (
                <div
                  className="absolute right-0 mt-2 w-56 bg-white dark:bg-neutral-900 rounded-xl shadow-2xl border border-neutral-200 dark:border-neutral-800 py-1 z-50 text-xs"
                  onClick={() => setIsUserMenuOpen(false)}
                >
                  <div className="px-4 py-2 border-b border-neutral-100 dark:border-neutral-800">
                    <p className="font-bold text-neutral-900 dark:text-white truncate">{currentUser.name}</p>
                    <p className="text-[11px] text-neutral-500 truncate">{currentUser.email}</p>
                    <span className="inline-block mt-1 text-[10px] font-mono uppercase font-semibold px-1.5 py-0.5 rounded bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                      {currentUser.role.replace('_', ' ')}
                    </span>
                  </div>

                  <button
                    onClick={() => handleNavClick(getDashboardDestination())}
                    className="w-full text-left px-4 py-2 hover:bg-neutral-50 dark:hover:bg-neutral-800 flex items-center gap-2 text-neutral-700 dark:text-neutral-200 cursor-pointer"
                  >
                    <Layers className="w-4 h-4 text-blue-500" />
                    <span>My Dashboard</span>
                  </button>

                  <button
                    onClick={() => handleNavClick('create_campaign')}
                    className="w-full text-left px-4 py-2 hover:bg-neutral-50 dark:hover:bg-neutral-800 flex items-center gap-2 text-neutral-700 dark:text-neutral-200 cursor-pointer"
                  >
                    <PlusCircle className="w-4 h-4 text-emerald-500" />
                    <span>Create Campaign</span>
                  </button>

                  <button
                    onClick={() => handleNavClick('payment_history')}
                    className="w-full text-left px-4 py-2 hover:bg-neutral-50 dark:hover:bg-neutral-800 flex items-center gap-2 text-neutral-700 dark:text-neutral-200 cursor-pointer"
                  >
                    <CreditCard className="w-4 h-4 text-amber-500" />
                    <span>JazzCash Payments</span>
                  </button>

                  <div className="border-t border-neutral-100 dark:border-neutral-800 mt-1" />

                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 hover:bg-neutral-50 dark:hover:bg-neutral-800 flex items-center gap-2 text-rose-600 dark:text-rose-400 cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => openAuthModal('login')}
              className="px-3.5 py-1.5 text-xs font-semibold text-neutral-700 dark:text-neutral-200 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              Sign In
            </button>
          )}

          {/* Primary CTA: Launch Campaign */}
          <button
            onClick={() => handleNavClick('create_campaign')}
            className="px-3.5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors whitespace-nowrap shadow-xs cursor-pointer flex items-center gap-1.5"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Launch Campaign</span>
            <span className="sm:hidden">Create</span>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="lg:hidden p-2 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg cursor-pointer"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile nav drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden px-4 pt-2 pb-4 space-y-1 bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 text-sm">
          {navLinks.map((link) => (
            <button
              key={link.page}
              onClick={() => handleNavClick(link.page)}
              className={`w-full text-left py-2 px-3 rounded-lg font-medium ${
                currentPage === link.page
                  ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400'
                  : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2 border-t border-neutral-200 dark:border-neutral-800 flex flex-col gap-2">
            <button
              onClick={() => handleNavClick(getDashboardDestination())}
              className="w-full text-left py-2 px-3 rounded-lg font-semibold text-neutral-900 dark:text-white bg-neutral-100 dark:bg-neutral-800"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
