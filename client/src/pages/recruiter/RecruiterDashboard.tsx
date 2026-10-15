import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import { PlacementDrive, Application } from '../../types';
import { StatCard } from '../../components/common/StatCard';
import { StatusBadge } from '../../components/common/Badge';
import { Briefcase, Users, CheckSquare, PlusCircle, ArrowRight, Video, Building } from 'lucide-react';

interface RecruiterDashboardProps {
  onSelectTab: (tab: string) => void;
}

export const RecruiterDashboard: React.FC<RecruiterDashboardProps> = ({ onSelectTab }) => {
  const { user } = useAuth();
  const [drives, setDrives] = useState<PlacementDrive[]>([]);
  const [applicants, setApplicants] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const loadRecruiterData = async () => {
      try {
        const myDrives = await api.recruiter.getMyDrives(user.id);
        setDrives(myDrives);

        // Fetch all applicants for all drives owned by this recruiter
        let allApps: Application[] = [];
        for (const d of myDrives) {
          const apps = await api.recruiter.getDriveApplicants(d.id);
          allApps = [...allApps, ...apps];
        }
        setApplicants(allApps);
      } catch (err) {
        console.error('Error loading recruiter dashboard', err);
      } finally {
        setLoading(false);
      }
    };
    loadRecruiterData();
  }, [user]);

  const shortlistedCount = applicants.filter((a) =>
    ['shortlisted', 'assessment_round', 'interview_scheduled', 'selected'].includes(a.status)
  ).length;

  const interviewsCount = applicants.filter((a) => a.status === 'interview_scheduled').length;

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-[#102B50] rounded-2xl p-6 sm:p-8 text-white flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-md border border-slate-700">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/10 text-xs font-semibold text-blue-200">
            <Building className="w-3.5 h-3.5" />
            <span>Corporate Recruitment Console</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome, {user?.name}!
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
            Manage your on-campus placement drives, screen eligible student transcripts, shortlist applicants, and schedule virtual interviews.
          </p>
        </div>

        <button
          onClick={() => onSelectTab('create-drive')}
          className="px-5 py-3 rounded-xl bg-[#0D6EFD] hover:bg-[#2563EB] text-white font-semibold text-xs transition-colors flex items-center gap-2 shadow-sm flex-shrink-0 cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Post New Placement Drive</span>
        </button>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard
          title="Active Drives"
          value={drives.filter((d) => d.status === 'open').length}
          subtitle={`Total ${drives.length} drives created`}
          icon={Briefcase}
          variant="blue"
        />
        <StatCard
          title="Total Applicants"
          value={applicants.length}
          subtitle="Student submissions"
          icon={Users}
          variant="navy"
        />
        <StatCard
          title="Shortlisted"
          value={shortlistedCount}
          subtitle="Advancing to test / interview"
          icon={CheckSquare}
          variant="emerald"
        />
        <StatCard
          title="Interviews Set"
          value={interviewsCount}
          subtitle="Live interview links issued"
          icon={Video}
          variant="amber"
        />
      </div>

      {/* Grid: My Drives & Recent Applicants */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Active Drives */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-[#DCE8F7] p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#DCE8F7]">
            <h3 className="font-bold text-base text-[#102B50]">My Placement Drives</h3>
            <button
              onClick={() => onSelectTab('my-drives')}
              className="text-xs font-semibold text-[#0D6EFD] hover:underline"
            >
              View All ({drives.length})
            </button>
          </div>

          {drives.length === 0 ? (
            <div className="py-12 text-center text-[#6B85A8] space-y-2">
              <Briefcase className="w-8 h-8 text-slate-300 mx-auto" />
              <p className="text-xs">You have not posted any placement drives yet.</p>
              <button
                onClick={() => onSelectTab('create-drive')}
                className="mt-2 px-4 py-2 rounded-lg bg-[#0D6EFD] text-white text-xs font-semibold"
              >
                Create First Drive
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {drives.map((d) => (
                <div
                  key={d.id}
                  className="p-4 rounded-xl bg-[#F3F7FC] border border-[#DCE8F7] flex items-center justify-between"
                >
                  <div className="space-y-0.5">
                    <p className="font-bold text-xs text-[#16345C]">{d.jobTitle}</p>
                    <p className="text-[11px] text-[#6B85A8]">
                      CTC: {d.ctcSalary} • {d.applicantsCount} Applicants
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={d.status} />
                    <button
                      onClick={() => onSelectTab('applicants')}
                      className="p-1.5 rounded-lg text-[#0D6EFD] hover:bg-white transition-colors"
                      title="Review Applicants"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Recent Applicants */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-[#DCE8F7] p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#DCE8F7]">
            <h3 className="font-bold text-base text-[#102B50]">Recent Candidates</h3>
            <button
              onClick={() => onSelectTab('applicants')}
              className="text-xs font-semibold text-[#0D6EFD] hover:underline"
            >
              Review All ({applicants.length})
            </button>
          </div>

          {applicants.length === 0 ? (
            <div className="py-12 text-center text-xs text-[#6B85A8]">
              No student applications submitted yet for your active drives.
            </div>
          ) : (
            <div className="space-y-3">
              {applicants.slice(0, 4).map((app) => (
                <div
                  key={app.id}
                  className="p-3.5 rounded-xl border border-[#DCE8F7] bg-white flex items-center justify-between"
                >
                  <div>
                    <p className="font-bold text-xs text-[#16345C]">{app.student?.name || 'KMV Student'}</p>
                    <p className="text-[11px] text-[#6B85A8]">
                      {app.studentProfile?.course || 'BCA'} • CGPA {app.studentProfile?.cgpa || 8.5}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={app.status} />
                    <button
                      onClick={() => onSelectTab('applicants')}
                      className="px-2.5 py-1 rounded-md bg-[#102B50] text-white text-[11px] font-semibold"
                    >
                      Review
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
