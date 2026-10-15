import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Sidebar } from './Sidebar';
import { Menu, X, Bell, Globe, Check, ExternalLink } from 'lucide-react';
import { api } from '../../services/api';
import { NotificationItem } from '../../types';

interface DashboardLayoutProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  currentTab,
  onSelectTab,
  title,
  subtitle,
  children,
  actions,
}) => {
  const { user, navigate } = useAuth();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  useEffect(() => {
    if (user?.id) {
      api.notifications.getMyNotifications(user.id).then((items) => {
        setNotifications(items);
      });
    }
  }, [user?.id]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAsRead = async (id: string) => {
    await api.notifications.markRead(id);
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  return (
    <div className="min-h-screen bg-[#F3F7FC] flex">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block flex-shrink-0 sticky top-0 h-screen">
        <Sidebar currentTab={currentTab} onSelectTab={onSelectTab} />
      </div>

      {/* Mobile Drawer */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="relative z-10 w-72 max-w-[85vw] h-full shadow-2xl animate-in slide-in-from-left duration-200">
            <Sidebar
              currentTab={currentTab}
              onSelectTab={onSelectTab}
              onCloseMobile={() => setMobileSidebarOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="sticky top-0 z-30 bg-white border-b border-[#DCE8F7] h-18 px-4 sm:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-[#16345C] hover:bg-slate-100 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden sm:block">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#6B85A8]">
                KMV Placement Cell • {user?.role.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Right Header items */}
          <div className="flex items-center gap-3">
            {/* Website Home quick link */}
            <button
              onClick={() => navigate('home')}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#102B50] hover:text-[#0D6EFD] hover:bg-[#F3F7FC] transition-colors border border-[#DCE8F7]"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Public Website</span>
            </button>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                className="relative p-2 rounded-lg text-[#16345C] hover:bg-[#F3F7FC] transition-colors cursor-pointer"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5 text-[#16345C]" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification dropdown */}
              {notifOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl border border-[#DCE8F7] shadow-2xl p-4 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="flex items-center justify-between pb-3 border-b border-[#DCE8F7]">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm text-[#16345C]">Notifications</h4>
                      {unreadCount > 0 && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#0D6EFD]/10 text-[#0D6EFD]">
                          {unreadCount} new
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => setNotifOpen(false)}
                      className="text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="mt-2 divide-y divide-slate-100 max-h-72 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <p className="py-6 text-center text-xs text-[#6B85A8]">
                        No notifications yet.
                      </p>
                    ) : (
                      notifications.map((notif) => (
                        <div
                          key={notif.id}
                          className={`py-3 px-2 rounded-lg transition-colors flex items-start justify-between gap-3 ${
                            notif.read ? 'opacity-70' : 'bg-[#F3F7FC]/70'
                          }`}
                        >
                          <div className="space-y-1">
                            <p className="text-xs font-bold text-[#16345C]">{notif.title}</p>
                            <p className="text-xs text-[#6B85A8] leading-relaxed">{notif.message}</p>
                            <span className="text-[10px] text-slate-400 block">
                              {new Date(notif.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          {!notif.read && (
                            <button
                              onClick={() => handleMarkAsRead(notif.id)}
                              title="Mark as read"
                              className="p-1 rounded-md text-[#0D6EFD] hover:bg-white"
                            >
                              <Check className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Profile chip */}
            <div className="flex items-center gap-2.5 pl-2 border-l border-[#DCE8F7]">
              <div className="w-9 h-9 rounded-full bg-[#0D6EFD]/10 border border-[#0D6EFD]/30 text-[#0D6EFD] font-bold flex items-center justify-center text-sm">
                {user?.name.charAt(0)}
              </div>
              <div className="hidden md:block text-left">
                <p className="text-xs font-bold text-[#16345C] leading-none">{user?.name}</p>
                <p className="text-[11px] text-[#6B85A8] capitalize mt-0.5">{user?.role}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Header */}
        <div className="px-4 sm:px-8 py-6 border-b border-[#DCE8F7] bg-white/70">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-[#16345C] tracking-tight">{title}</h1>
              {subtitle && <p className="text-xs text-[#6B85A8] mt-1">{subtitle}</p>}
            </div>
            {actions && <div className="flex items-center gap-3">{actions}</div>}
          </div>
        </div>

        {/* Main Body */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
