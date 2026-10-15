import React from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  User,
  Briefcase,
  FileText,
  CheckSquare,
  Video,
  FileSpreadsheet,
  BookOpen,
  Compass,
  Code2,
  Bell,
  Settings,
  LogOut,
  PlusCircle,
  Users,
  Building,
  BarChart3,
  Megaphone,
  Layers,
  GraduationCap,
} from 'lucide-react';

interface SidebarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentTab, onSelectTab, onCloseMobile }) => {
  const { user, logout, navigate } = useAuth();
  const role = user?.role || 'student';

  const isStudent = role === 'student';
  const isDarkSidebar = role === 'recruiter' || role === 'admin';

  // Navigation Items per Role
  const studentItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'applications', label: 'Applications', icon: FileSpreadsheet },
    { id: 'drives', label: 'Placement Drives', icon: Briefcase },
    { id: 'aptitude', label: 'Aptitude Test', icon: CheckSquare },
    { id: 'mock-interview', label: 'Mock Interviews', icon: Video },
    { id: 'resume-builder', label: 'Resume Builder', icon: FileText },
    { id: 'coding-arena', label: 'Coding Arena', icon: Code2 },
    { id: 'resources', label: 'Resources', icon: BookOpen },
    { id: 'career-guidance', label: 'Career Guidance', icon: Compass },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const recruiterItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'my-drives', label: 'My Drives', icon: Briefcase },
    { id: 'create-drive', label: 'Create Drive', icon: PlusCircle },
    { id: 'applicants', label: 'View Applicants', icon: Users },
    { id: 'shortlisted', label: 'Shortlisted Students', icon: CheckSquare },
    { id: 'all-applications', label: 'All Applications', icon: FileSpreadsheet },
    { id: 'company-profile', label: 'Company Profile', icon: Building },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const adminItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'recruiters', label: 'Recruiters', icon: Building },
    { id: 'placement-drives', label: 'Placement Drives', icon: Briefcase },
    { id: 'applications', label: 'Applications', icon: FileSpreadsheet },
    { id: 'announcements', label: 'Announcements', icon: Megaphone },
    { id: 'resources', label: 'Resources', icon: Layers },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const items = isStudent ? studentItems : role === 'recruiter' ? recruiterItems : adminItems;

  const handleItemClick = (id: string) => {
    onSelectTab(id);
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <aside
      className={`w-64 min-h-screen flex flex-col justify-between border-r transition-colors ${
        isDarkSidebar
          ? 'bg-[#102B50] text-white border-[#16345C]'
          : 'bg-white text-[#16345C] border-[#DCE8F7]'
      }`}
    >
      <div>
        {/* Brand header */}
        <div
          onClick={() => navigate('home')}
          className={`h-20 flex items-center gap-3 px-6 border-b cursor-pointer ${
            isDarkSidebar ? 'border-white/10' : 'border-[#DCE8F7]'
          }`}
        >
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${
              isDarkSidebar ? 'bg-[#0D6EFD] text-white' : 'bg-[#0D6EFD]/10 text-[#0D6EFD]'
            }`}
          >
            <GraduationCap className="w-6 h-6" />
          </div>
          <div className="overflow-hidden">
            <h2 className="font-extrabold text-sm tracking-tight truncate">
              KMV PLACEMENT CELL
            </h2>
            <p className={`text-[11px] font-medium truncate ${isDarkSidebar ? 'text-slate-400' : 'text-[#6B85A8]'}`}>
              {role.toUpperCase()} PORTAL
            </p>
          </div>
        </div>

        {/* Navigation list */}
        <div className="p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-160px)]">
          <div className="px-3 py-1.5 text-[10px] font-bold tracking-wider uppercase opacity-60">
            Navigation
          </div>
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all text-left cursor-pointer ${
                  isActive
                    ? isDarkSidebar
                      ? 'bg-[#0D6EFD] text-white shadow-xs font-semibold'
                      : 'bg-[#0D6EFD]/10 text-[#0D6EFD] font-semibold border border-[#0D6EFD]/20'
                    : isDarkSidebar
                    ? 'text-slate-300 hover:text-white hover:bg-white/5'
                    : 'text-[#16345C] hover:text-[#0D6EFD] hover:bg-[#F3F7FC]'
                }`}
              >
                <Icon
                  className={`w-4 h-4 flex-shrink-0 ${
                    isActive
                      ? isDarkSidebar
                        ? 'text-white'
                        : 'text-[#0D6EFD]'
                      : isDarkSidebar
                      ? 'text-slate-400'
                      : 'text-[#6B85A8]'
                  }`}
                />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* User info & Sign out at bottom */}
      <div className={`p-4 border-t ${isDarkSidebar ? 'border-white/10' : 'border-[#DCE8F7]'}`}>
        <div
          className={`p-3 rounded-xl flex items-center justify-between ${
            isDarkSidebar ? 'bg-white/5' : 'bg-[#F3F7FC]'
          }`}
        >
          <div className="overflow-hidden pr-2">
            <p className="text-xs font-bold truncate leading-tight">{user?.name}</p>
            <p className={`text-[10px] truncate ${isDarkSidebar ? 'text-slate-400' : 'text-[#6B85A8]'}`}>
              {user?.email}
            </p>
          </div>
          <button
            onClick={logout}
            title="Log Out"
            className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 hover:text-rose-600 transition-colors cursor-pointer flex-shrink-0"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
