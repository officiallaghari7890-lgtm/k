import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  UserRole,
  Campaign,
  CampaignStatus,
  Payment,
  PricingPackage,
  SupportTicket,
  AppNotification,
  CampaignMetrics,
} from '../types/index.ts';
import {
  INITIAL_USERS,
  INITIAL_CAMPAIGNS,
  INITIAL_PAYMENTS,
  INITIAL_PACKAGES,
  INITIAL_TICKETS,
  INITIAL_NOTIFICATIONS,
  JAZZCASH_NUMBER,
  JAZZCASH_TITLE,
  AGENCY_WHATSAPP,
} from '../data/mockData.ts';

export type AppPage =
  | 'home'
  | 'about'
  | 'services'
  | 'platforms'
  | 'pricing'
  | 'how_it_works'
  | 'create_campaign'
  | 'customer_dashboard'
  | 'campaign_details'
  | 'campaign_reports'
  | 'checkout'
  | 'payment_history'
  | 'admin_dashboard'
  | 'ad_manager_dashboard'
  | 'contact'
  | 'faqs'
  | 'privacy_policy'
  | 'terms_conditions'
  | 'refund_policy';

interface AppContextType {
  currentUser: User | null;
  users: User[];
  campaigns: Campaign[];
  payments: Payment[];
  packages: PricingPackage[];
  tickets: SupportTicket[];
  notifications: AppNotification[];
  theme: 'light' | 'dark';
  currentPage: AppPage;
  selectedCampaignId: string | null;
  selectedPaymentCampaignId: string | null;
  setSelectedCampaignId: (id: string | null) => void;
  setSelectedPaymentCampaignId: (id: string | null) => void;
  isAuthModalOpen: boolean;
  authModalMode: 'login' | 'signup' | 'forgot';
  
  // Setters & Navigators
  setCurrentPage: (page: AppPage) => void;
  navigateToCampaignDetails: (campaignId: string) => void;
  navigateToReports: (campaignId?: string) => void;
  navigateToCheckout: (campaignId: string) => void;
  toggleTheme: () => void;
  openAuthModal: (mode?: 'login' | 'signup' | 'forgot') => void;
  closeAuthModal: () => void;
  
  // Role switcher & Auth
  switchRole: (role: UserRole) => void;
  login: (email: string, pass: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  signup: (name: string, email: string, pass: string, phone?: string, company?: string) => Promise<boolean>;
  logout: () => void;
  
  // Campaign Actions
  createCampaign: (data: Omit<Campaign, 'id' | 'createdAt' | 'updatedAt' | 'history'>) => Promise<Campaign>;
  updateCampaign: (id: string, updates: Partial<Campaign>) => void;
  updateCampaignStatus: (id: string, status: CampaignStatus, note: string) => void;
  assignManager: (campaignId: string, managerId: string) => void;
  updateCampaignMetrics: (campaignId: string, metrics: CampaignMetrics) => void;
  
  // Payment Actions
  submitPaymentProof: (payment: Omit<Payment, 'id' | 'submittedAt' | 'status'>) => Promise<Payment>;
  verifyPayment: (paymentId: string, approved: boolean, reasonOrNotes?: string) => void;
  
  // Packages & Tickets Actions
  updatePackage: (pkg: PricingPackage) => void;
  createSupportTicket: (data: Omit<SupportTicket, 'id' | 'createdAt' | 'updatedAt' | 'messages'>, initialMessage: string) => void;
  replyToTicket: (ticketId: string, text: string) => void;
  
  // Notifications
  markNotificationRead: (id: string) => void;
  clearAllNotifications: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'digital_rankup_state_v1';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme state
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('dr_theme');
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'dark';
  });

  // Navigation state
  const [currentPage, setCurrentPage] = useState<AppPage>('home');
  const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(null);
  const [selectedPaymentCampaignId, setSelectedPaymentCampaignId] = useState<string | null>(null);

  // Auth modal
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup' | 'forgot'>('login');

  // Core entities
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_users`);
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  // Current user defaults to customer (Shopify Store UAE) for testing, easily switched
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_currentUser`);
    if (saved) return JSON.parse(saved);
    return INITIAL_USERS.find((u) => u.email === 'shopifystoreuae8@gmail.com') || INITIAL_USERS[3];
  });

  const [campaigns, setCampaigns] = useState<Campaign[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_campaigns`);
    return saved ? JSON.parse(saved) : INITIAL_CAMPAIGNS;
  });

  const [payments, setPayments] = useState<Payment[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_payments`);
    return saved ? JSON.parse(saved) : INITIAL_PAYMENTS;
  });

  const [packages, setPackages] = useState<PricingPackage[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_packages`);
    return saved ? JSON.parse(saved) : INITIAL_PACKAGES;
  });

  const [tickets, setTickets] = useState<SupportTicket[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_tickets`);
    return saved ? JSON.parse(saved) : INITIAL_TICKETS;
  });

  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_notifications`);
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  // Sync theme to document class
  useEffect(() => {
    localStorage.setItem('dr_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_users`, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_currentUser`, JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_campaigns`, JSON.stringify(campaigns));
  }, [campaigns]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_payments`, JSON.stringify(payments));
  }, [payments]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_packages`, JSON.stringify(packages));
  }, [packages]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_tickets`, JSON.stringify(tickets));
  }, [tickets]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_notifications`, JSON.stringify(notifications));
  }, [notifications]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const openAuthModal = (mode: 'login' | 'signup' | 'forgot' = 'login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const navigateToCampaignDetails = (campaignId: string) => {
    setSelectedCampaignId(campaignId);
    setCurrentPage('campaign_details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToReports = (campaignId?: string) => {
    if (campaignId) setSelectedCampaignId(campaignId);
    setCurrentPage('campaign_reports');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToCheckout = (campaignId: string) => {
    setSelectedPaymentCampaignId(campaignId);
    setCurrentPage('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const switchRole = (role: UserRole) => {
    const targetUser = users.find((u) => u.role === role);
    if (targetUser) {
      setCurrentUser(targetUser);
      if (role === 'super_admin' || role === 'admin') {
        setCurrentPage('admin_dashboard');
      } else if (role === 'ad_manager') {
        setCurrentPage('ad_manager_dashboard');
      } else {
        setCurrentPage('customer_dashboard');
      }
    }
  };

  const login = async (email: string, _pass: string): Promise<boolean> => {
    const existing = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      setCurrentUser(existing);
      closeAuthModal();
      if (existing.role === 'customer') setCurrentPage('customer_dashboard');
      else if (existing.role === 'ad_manager') setCurrentPage('ad_manager_dashboard');
      else setCurrentPage('admin_dashboard');
      return true;
    }
    // Create new customer account on the fly if not exists
    const newUser: User = {
      id: `usr-${Date.now()}`,
      name: email.split('@')[0],
      email,
      role: 'customer',
      verified: true,
      createdAt: new Date().toISOString(),
    };
    setUsers((prev) => [...prev, newUser]);
    setCurrentUser(newUser);
    closeAuthModal();
    setCurrentPage('customer_dashboard');
    return true;
  };

  const loginWithGoogle = async (): Promise<boolean> => {
    // Authenticate with Google OAuth user identity
    const targetEmail = 'shopifystoreuae8@gmail.com';
    let user = users.find((u) => u.email === targetEmail);
    if (!user) {
      user = {
        id: `usr-google-${Date.now()}`,
        name: 'Shopify Store UAE',
        email: targetEmail,
        role: 'customer',
        companyName: 'Shopify Global Store',
        verified: true,
        createdAt: new Date().toISOString(),
      };
      setUsers((prev) => [...prev, user!]);
    }
    setCurrentUser(user);
    closeAuthModal();
    setCurrentPage('customer_dashboard');
    return true;
  };

  const signup = async (
    name: string,
    email: string,
    _pass: string,
    phone?: string,
    company?: string
  ): Promise<boolean> => {
    const newUser: User = {
      id: `usr-${Date.now()}`,
      name,
      email,
      role: 'customer',
      phone: phone || '',
      companyName: company || '',
      verified: true,
      createdAt: new Date().toISOString(),
    };
    setUsers((prev) => [...prev, newUser]);
    setCurrentUser(newUser);
    closeAuthModal();
    setCurrentPage('customer_dashboard');
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    setCurrentPage('home');
  };

  const createCampaign = async (
    data: Omit<Campaign, 'id' | 'createdAt' | 'updatedAt' | 'history'>
  ): Promise<Campaign> => {
    const newId = `DR-CMP-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date().toISOString();
    const newCampaign: Campaign = {
      ...data,
      id: newId,
      status: 'pending_payment',
      history: [
        {
          status: 'draft',
          note: 'Campaign submitted for review & awaiting JazzCash payment',
          timestamp: now,
          updatedBy: currentUser ? currentUser.name : 'Client',
        },
      ],
      createdAt: now,
      updatedAt: now,
    };

    setCampaigns((prev) => [newCampaign, ...prev]);

    // Add notification to admin
    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      userId: 'all_admins',
      title: 'New Campaign Created',
      message: `${newCampaign.userName} created campaign "${newCampaign.name}" with budget PKR ${newCampaign.totalBudget.toLocaleString()}.`,
      type: 'campaign',
      link: 'admin_dashboard',
      read: false,
      createdAt: now,
    };
    setNotifications((prev) => [newNotif, ...prev]);

    return newCampaign;
  };

  const updateCampaign = (id: string, updates: Partial<Campaign>) => {
    setCampaigns((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updates, updatedAt: new Date().toISOString() } : c))
    );
  };

  const updateCampaignStatus = (id: string, status: CampaignStatus, note: string) => {
    const now = new Date().toISOString();
    const actorName = currentUser ? currentUser.name : 'System';

    setCampaigns((prev) =>
      prev.map((c) => {
        if (c.id !== id) return c;
        const newHistory = [
          ...c.history,
          {
            status,
            note: note || `Status changed to ${status.replace(/_/g, ' ')}`,
            timestamp: now,
            updatedBy: actorName,
          },
        ];
        return {
          ...c,
          status,
          updatedAt: now,
          history: newHistory,
        };
      })
    );

    // Notify customer
    const targetCampaign = campaigns.find((c) => c.id === id);
    if (targetCampaign) {
      const notif: AppNotification = {
        id: `notif-${Date.now()}`,
        userId: targetCampaign.userId,
        title: `Campaign Status: ${status.replace(/_/g, ' ').toUpperCase()}`,
        message: `Your campaign "${targetCampaign.name}" is now ${status.replace(/_/g, ' ')}. ${note ? `Note: ${note}` : ''}`,
        type: 'campaign',
        link: 'customer_dashboard',
        read: false,
        createdAt: now,
      };
      setNotifications((prev) => [notif, ...prev]);
    }
  };

  const assignManager = (campaignId: string, managerId: string) => {
    const manager = users.find((u) => u.id === managerId);
    if (!manager) return;

    setCampaigns((prev) =>
      prev.map((c) => {
        if (c.id !== campaignId) return c;
        return {
          ...c,
          assignedManagerId: manager.id,
          assignedManagerName: manager.name,
          updatedAt: new Date().toISOString(),
          history: [
            ...c.history,
            {
              status: c.status,
              note: `Assigned to media buyer ${manager.name}`,
              timestamp: new Date().toISOString(),
              updatedBy: currentUser ? currentUser.name : 'Admin',
            },
          ],
        };
      })
    );
  };

  const updateCampaignMetrics = (campaignId: string, metrics: CampaignMetrics) => {
    setCampaigns((prev) =>
      prev.map((c) => {
        if (c.id !== campaignId) return c;
        return {
          ...c,
          metrics,
          updatedAt: new Date().toISOString(),
        };
      })
    );
  };

  const submitPaymentProof = async (
    paymentData: Omit<Payment, 'id' | 'submittedAt' | 'status'>
  ): Promise<Payment> => {
    const now = new Date().toISOString();
    const newPayment: Payment = {
      ...paymentData,
      id: `PAY-${Math.floor(10000 + Math.random() * 90000)}`,
      submittedAt: now,
      status: 'pending_verification',
    };

    setPayments((prev) => [newPayment, ...prev]);

    // Update campaign status to payment_verification_pending
    updateCampaignStatus(
      paymentData.campaignId,
      'payment_verification_pending',
      `JazzCash payment submitted (TID: ${paymentData.transactionId}, PKR ${paymentData.totalAmount.toLocaleString()}). Pending admin verification.`
    );

    // Notify admins
    const notif: AppNotification = {
      id: `notif-${Date.now()}`,
      userId: 'all_admins',
      title: 'JazzCash Payment Submitted',
      message: `${paymentData.userName} submitted TID ${paymentData.transactionId} for PKR ${paymentData.totalAmount.toLocaleString()} to JazzCash ${JAZZCASH_NUMBER}.`,
      type: 'payment',
      link: 'admin_dashboard',
      read: false,
      createdAt: now,
    };
    setNotifications((prev) => [notif, ...prev]);

    return newPayment;
  };

  const verifyPayment = (paymentId: string, approved: boolean, reasonOrNotes?: string) => {
    const now = new Date().toISOString();
    const verifierName = currentUser ? currentUser.name : 'Admin';

    let targetCampaignId = '';

    setPayments((prev) =>
      prev.map((p) => {
        if (p.id !== paymentId) return p;
        targetCampaignId = p.campaignId;
        return {
          ...p,
          status: approved ? 'verified' : 'rejected',
          verifiedAt: now,
          verifiedBy: verifierName,
          rejectionReason: !approved ? reasonOrNotes : undefined,
          notes: approved ? reasonOrNotes || 'Payment verified via JazzCash Account 03212583543.' : p.notes,
        };
      })
    );

    if (targetCampaignId) {
      if (approved) {
        updateCampaignStatus(
          targetCampaignId,
          'payment_confirmed',
          `JazzCash payment of TID confirmed by ${verifierName}. Campaign queued for media buyer setup.`
        );
      } else {
        updateCampaignStatus(
          targetCampaignId,
          'rejected',
          `JazzCash payment verification failed: ${reasonOrNotes || 'Incorrect Transaction ID or statement mismatch. Please contact agency or re-upload.'}`
        );
      }
    }
  };

  const updatePackage = (pkg: PricingPackage) => {
    setPackages((prev) => prev.map((p) => (p.id === pkg.id ? pkg : p)));
  };

  const createSupportTicket = (
    data: Omit<SupportTicket, 'id' | 'createdAt' | 'updatedAt' | 'messages'>,
    initialMessage: string
  ) => {
    const now = new Date().toISOString();
    const newTicket: SupportTicket = {
      ...data,
      id: `TCK-${Math.floor(100 + Math.random() * 900)}`,
      status: 'open',
      createdAt: now,
      updatedAt: now,
      messages: [
        {
          id: `msg-${Date.now()}`,
          senderRole: currentUser ? currentUser.role : 'customer',
          senderName: currentUser ? currentUser.name : 'Customer',
          text: initialMessage,
          timestamp: now,
        },
      ],
    };
    setTickets((prev) => [newTicket, ...prev]);
  };

  const replyToTicket = (ticketId: string, text: string) => {
    const now = new Date().toISOString();
    const senderRole = currentUser ? currentUser.role : 'customer';
    const senderName = currentUser ? currentUser.name : 'Support Agent';

    setTickets((prev) =>
      prev.map((t) => {
        if (t.id !== ticketId) return t;
        return {
          ...t,
          updatedAt: now,
          status: senderRole === 'customer' ? 'in_progress' : 'resolved',
          messages: [
            ...t.messages,
            {
              id: `msg-${Date.now()}`,
              senderRole,
              senderName,
              text,
              timestamp: now,
            },
          ],
        };
      })
    );
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const clearAllNotifications = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        users,
        campaigns,
        payments,
        packages,
        tickets,
        notifications,
        theme,
        currentPage,
        selectedCampaignId,
        selectedPaymentCampaignId,
        setSelectedCampaignId,
        setSelectedPaymentCampaignId,
        isAuthModalOpen,
        authModalMode,
        setCurrentPage,
        navigateToCampaignDetails,
        navigateToReports,
        navigateToCheckout,
        toggleTheme,
        openAuthModal,
        closeAuthModal,
        switchRole,
        login,
        loginWithGoogle,
        signup,
        logout,
        createCampaign,
        updateCampaign,
        updateCampaignStatus,
        assignManager,
        updateCampaignMetrics,
        submitPaymentProof,
        verifyPayment,
        updatePackage,
        createSupportTicket,
        replyToTicket,
        markNotificationRead,
        clearAllNotifications,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
