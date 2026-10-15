import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { GraduationCap, Menu, X, ArrowRight, ShieldCheck, LogOut, LayoutDashboard } from 'lucide-react';

interface NavbarProps {
  activePage: string;
  onNavigate: (page: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activePage, onNavigate }) => {
  const { user, setAuthModal, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About KMV' },
    { id: 'opportunities', label: 'Opportunities' },
    { id: 'drives', label: 'Placement Drives' },
    { id: 'stories', label: 'Success Stories' },
    { id: 'career-prep', label: 'Career Prep' },
    { id: 'resources', label: 'Resources' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  const getDashboardRoute = () => {
    if (!user) return 'home';
    if (user.role === 'student') return 'student/dashboard';
    if (user.role === 'recruiter') return 'recruiter/dashboard';
    if (user.role === 'admin') return 'admin/dashboard';
    return 'home';
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#DCE8F7] transition-all">
      {/* Top Banner Notice */}
      <div className="bg-[#102B50] text-white py-1.5 px-4 text-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="px-1.5 py-0.5 rounded-xs bg-[#0D6EFD] text-[10px] font-bold tracking-wide uppercase">
              Notice
            </span>
            <span className="truncate">
              TCS & Deloitte Campus Recruitment Season 2025-26 Registration is Open for All Final Year Students.
            </span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-slate-300 text-[11px]">
            <span>📞 +91 181 2296605</span>
            <span>✉️ placement@kmv.ac.in</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & College Crest */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#102B50] to-[#0D6EFD] p-0.5 shadow-md flex items-center justify-center text-white">
              <div className="w-full h-full bg-[#102B50] rounded-[10px] flex items-center justify-center">
                <GraduationCap className="w-7 h-7 text-[#0D6EFD]" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg text-[#102B50] tracking-tight group-hover:text-[#0D6EFD] transition-colors">
                  KMV PLACEMENT CELL
                </span>
                <span className="hidden sm:inline-block px-1.5 py-0.5 rounded-xs text-[10px] font-semibold bg-[#0D6EFD]/10 text-[#0D6EFD]">
                  AUTONOMOUS
                </span>
              </div>
              <p className="text-xs text-[#6B85A8] font-medium leading-tight">
                Kanya Maha Vidyalaya, Jalandhar (Estd. 1886)
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activePage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    isActive
                      ? 'text-[#0D6EFD] bg-[#0D6EFD]/10 font-semibold'
                      : 'text-[#16345C] hover:text-[#0D6EFD] hover:bg-[#F3F7FC]'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onNavigate(getDashboardRoute())}
                  className="px-4 py-2 rounded-lg bg-[#0D6EFD] hover:bg-[#2563EB] text-white text-sm font-medium transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>My Portal ({user.role})</span>
                </button>
                <button
                  onClick={logout}
                  title="Sign Out"
                  className="p-2 rounded-lg text-[#6B85A8] hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={() => setAuthModal('login')}
                  className="px-4 py-2 rounded-lg text-sm font-semibold text-[#102B50] hover:text-[#0D6EFD] hover:bg-[#F3F7FC] transition-colors cursor-pointer"
                >
                  Sign In
                </button>
                <button
                  onClick={() => setAuthModal('register')}
                  className="px-4 py-2 rounded-lg bg-[#0D6EFD] hover:bg-[#2563EB] text-white text-sm font-medium transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <span>Student Register</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="xl:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#16345C] hover:bg-[#F3F7FC] transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-[#DCE8F7] px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-2 duration-150 shadow-lg">
          <div className="grid grid-cols-2 gap-1.5 mb-4">
            {navLinks.map((link) => {
              const isActive = activePage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`text-left px-3 py-2 rounded-lg text-sm font-medium ${
                    isActive
                      ? 'text-[#0D6EFD] bg-[#0D6EFD]/10 font-semibold'
                      : 'text-[#16345C] hover:bg-[#F3F7FC]'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-[#DCE8F7] flex flex-col gap-2">
            {user ? (
              <>
                <button
                  onClick={() => {
                    onNavigate(getDashboardRoute());
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 rounded-lg bg-[#0D6EFD] text-white text-sm font-medium flex items-center justify-center gap-2"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Go to {user.role} Dashboard</span>
                </button>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2 rounded-lg text-rose-600 bg-rose-50 text-sm font-medium flex items-center justify-center gap-1.5"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setAuthModal('login');
                    setMobileMenuOpen(false);
                  }}
                  className="flex-1 py-2.5 rounded-lg border border-[#DCE8F7] text-sm font-semibold text-[#102B50] hover:bg-slate-50"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    setAuthModal('register');
                    setMobileMenuOpen(false);
                  }}
                  className="flex-1 py-2.5 rounded-lg bg-[#0D6EFD] text-white text-sm font-medium"
                >
                  Student Register
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
