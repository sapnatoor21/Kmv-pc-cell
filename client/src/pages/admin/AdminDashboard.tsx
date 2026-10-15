import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import { StatCard } from '../../components/common/StatCard';
import {
  Users,
  Building,
  Briefcase,
  FileSpreadsheet,
  Award,
  TrendingUp,
  Megaphone,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
} from 'lucide-react';

interface AdminDashboardProps {
  onSelectTab: (tab: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onSelectTab }) => {
  const { user } = useAuth();
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.admin.getAnalytics().then((res) => {
      setAnalytics(res);
      setLoading(false);
    });
  }, []);

  return (
    <div className="space-y-8">
      {/* Admin Welcome Header */}
      <div className="bg-[#102B50] rounded-2xl p-6 sm:p-8 text-white flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-md border border-slate-700">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/10 text-xs font-semibold text-blue-200">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Kanya Maha Vidyalaya • Dean of Placement Services</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Placement Cell Administration Console
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
            Monitor real-time institutional recruitment performance, verified offer letters, candidate eligibility compliance, and recruiter engagements.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => onSelectTab('announcements')}
            className="px-4 py-2.5 rounded-xl bg-[#0D6EFD] hover:bg-[#2563EB] text-white font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Megaphone className="w-4 h-4" />
            <span>Post Notice Circular</span>
          </button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard
          title="Registered Students"
          value={analytics?.totalStudents || 2}
          subtitle="Verified batch profiles"
          icon={Users}
          variant="blue"
        />
        <StatCard
          title="Corporate Partners"
          value={analytics?.totalRecruiters || 1}
          subtitle="Active recruiters"
          icon={Building}
          variant="navy"
        />
        <StatCard
          title="Placement Drives"
          value={analytics?.totalDrives || 4}
          subtitle={`${analytics?.openDrives || 4} open drives`}
          icon={Briefcase}
          variant="emerald"
        />
        <StatCard
          title="Batch Placement Rate"
          value={`${analytics?.placementRate || 50}%`}
          subtitle="Offers confirmed"
          icon={Award}
          variant="amber"
        />
      </div>

      {/* Grid: Shortcuts & Analytics Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Management Quick Actions */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-[#DCE8F7] p-6 shadow-xs space-y-4">
          <h3 className="font-bold text-base text-[#102B50] pb-2 border-b border-[#DCE8F7]">
            Cell Management Modules
          </h3>

          <div className="space-y-3">
            <button
              onClick={() => onSelectTab('students')}
              className="w-full p-4 rounded-xl bg-[#F3F7FC] border border-[#DCE8F7] hover:border-[#0D6EFD] transition-all flex items-center justify-between text-left group cursor-pointer"
            >
              <div>
                <h4 className="font-bold text-xs text-[#16345C] group-hover:text-[#0D6EFD]">
                  Student Directory & Eligibility Verification
                </h4>
                <p className="text-[11px] text-[#6B85A8] mt-0.5">
                  Verify academic CGPA transcripts, activate or deactivate accounts.
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-[#6B85A8] group-hover:text-[#0D6EFD] group-hover:translate-x-1 transition-all" />
            </button>

            <button
              onClick={() => onSelectTab('recruiters')}
              className="w-full p-4 rounded-xl bg-[#F3F7FC] border border-[#DCE8F7] hover:border-[#0D6EFD] transition-all flex items-center justify-between text-left group cursor-pointer"
            >
              <div>
                <h4 className="font-bold text-xs text-[#16345C] group-hover:text-[#0D6EFD]">
                  Recruiter Partner Accounts
                </h4>
                <p className="text-[11px] text-[#6B85A8] mt-0.5">
                  Verify corporate credentials and manage posted placement drives.
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-[#6B85A8] group-hover:text-[#0D6EFD] group-hover:translate-x-1 transition-all" />
            </button>

            <button
              onClick={() => onSelectTab('placement-drives')}
              className="w-full p-4 rounded-xl bg-[#F3F7FC] border border-[#DCE8F7] hover:border-[#0D6EFD] transition-all flex items-center justify-between text-left group cursor-pointer"
            >
              <div>
                <h4 className="font-bold text-xs text-[#16345C] group-hover:text-[#0D6EFD]">
                  All Placement Drives
                </h4>
                <p className="text-[11px] text-[#6B85A8] mt-0.5">
                  Review salary packages, deadlines, and applicant eligibility rules.
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-[#6B85A8] group-hover:text-[#0D6EFD] group-hover:translate-x-1 transition-all" />
            </button>

            <button
              onClick={() => onSelectTab('analytics')}
              className="w-full p-4 rounded-xl bg-[#F3F7FC] border border-[#DCE8F7] hover:border-[#0D6EFD] transition-all flex items-center justify-between text-left group cursor-pointer"
            >
              <div>
                <h4 className="font-bold text-xs text-[#16345C] group-hover:text-[#0D6EFD]">
                  Comprehensive Analytics & NAAC Reports
                </h4>
                <p className="text-[11px] text-[#6B85A8] mt-0.5">
                  Generate branch-wise placement metrics and salary distributions.
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-[#6B85A8] group-hover:text-[#0D6EFD] group-hover:translate-x-1 transition-all" />
            </button>
          </div>
        </div>

        {/* Right Column: Top Recruiting Partners */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-[#DCE8F7] p-6 shadow-xs space-y-4">
          <h3 className="font-bold text-base text-[#102B50] pb-2 border-b border-[#DCE8F7]">
            Top Corporate Drives by Applicant Volume
          </h3>

          <div className="space-y-3">
            {analytics?.topCompanies?.map((comp: any, idx: number) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl border border-[#DCE8F7] bg-white flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-md bg-[#102B50] text-white flex items-center justify-center font-bold text-xs">
                    {idx + 1}
                  </span>
                  <div>
                    <p className="font-bold text-xs text-[#16345C]">{comp.name}</p>
                    <p className="text-[11px] text-[#6B85A8]">Tier-1 Corporate Partner</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#0D6EFD]/10 text-[#0D6EFD]">
                  {comp.count} Submissions
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
