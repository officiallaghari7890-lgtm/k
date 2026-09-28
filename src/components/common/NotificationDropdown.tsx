import React, { useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { Bell, CheckCircle2, DollarSign, Megaphone, HelpCircle, Check } from 'lucide-react';

interface NotificationDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationDropdown: React.FC<NotificationDropdownProps> = ({ isOpen, onClose }) => {
  const { notifications, markNotificationRead, clearAllNotifications, setCurrentPage } = useApp();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getIcon = (type: string) => {
    switch (type) {
      case 'campaign':
        return <Megaphone className="w-4 h-4 text-blue-500" />;
      case 'payment':
        return <DollarSign className="w-4 h-4 text-emerald-500" />;
      case 'support':
        return <HelpCircle className="w-4 h-4 text-amber-500" />;
      default:
        return <CheckCircle2 className="w-4 h-4 text-purple-500" />;
    }
  };

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-neutral-900 rounded-xl shadow-2xl border border-neutral-200 dark:border-neutral-800 z-50 overflow-hidden"
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-100 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-900/60">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-neutral-600 dark:text-neutral-300" />
          <span className="text-sm font-semibold text-neutral-900 dark:text-white">Notifications</span>
          {unreadCount > 0 && (
            <span className="text-[11px] font-bold px-1.5 py-0.5 rounded-full bg-blue-600 text-white font-mono">
              {unreadCount}
            </span>
          )}
        </div>
        {unreadCount > 0 && (
          <button
            onClick={clearAllNotifications}
            className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
          >
            <Check className="w-3 h-3" /> Mark all read
          </button>
        )}
      </div>

      <div className="max-h-96 overflow-y-auto divide-y divide-neutral-100 dark:divide-neutral-800">
        {notifications.length === 0 ? (
          <div className="p-8 text-center text-sm text-neutral-500 dark:text-neutral-400">
            No notifications yet
          </div>
        ) : (
          notifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => {
                markNotificationRead(notif.id);
                if (notif.link) {
                  setCurrentPage(notif.link as any);
                  onClose();
                }
              }}
              className={`p-3.5 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 cursor-pointer transition-colors flex gap-3 ${
                !notif.read ? 'bg-blue-50/40 dark:bg-blue-950/20' : ''
              }`}
            >
              <div className="mt-0.5 p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 shrink-0 h-fit">
                {getIcon(notif.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1 mb-1">
                  <p className="text-xs font-semibold text-neutral-900 dark:text-neutral-100 truncate">
                    {notif.title}
                  </p>
                  {!notif.read && (
                    <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                  )}
                </div>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2 leading-relaxed">
                  {notif.message}
                </p>
                <p className="text-[10px] text-neutral-400 dark:text-neutral-500 mt-1 font-mono">
                  {new Date(notif.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
