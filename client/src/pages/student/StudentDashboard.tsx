import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import { dbStore } from '../../services/dbStore';
import { Application, PlacementDrive, Announcement } from '../../types';
import { StatCard } from '../../components/common/StatCard';
import { StatusBadge } from '../../components/common/Badge';
import {
  Briefcase,
  FileSpreadsheet,
  CheckCircle,
  Video,
  FileText,
  Code2,
  Calendar,
  AlertCircle,
  ArrowRight,
  TrendingUp,
  Award,
  ExternalLink,
} from 'lucide-react';

interface StudentDashboardProps {
  onSelectTab: (tab: string) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({ onSelectTab }) => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    profileCompletion: 85,
    totalApplied: 0,
    shortlistedCount: 0,
    interviewsScheduled: 0,
    offersReceived: 0,
  });
  const [applications, setApplications] = useState<Application[]>([]);
  const [drives, setDrives] = useState<PlacementDrive[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const loadDashboardData = async () => {
      try {
        const [dashStats, studentApps, allDrives, allAnn] = await Promise.all([
          api.student.getStats(user.id),
          api.student.getApplications(user.id),
          api.drives.getAllDrives(),
          api.announcements.getAnnouncements(),
        ]);
        setStats(dashStats);
        setApplications(studentApps);
        setDrives(allDrives.slice(0, 3));
        setAnnouncements(allAnn.slice(0, 2));
      } catch (e) {
        console.error('Error loading student dashboard', e);
      } finally {
        setLoading(false);
      }
    };
    loadDashboardData();
  }, [user]);

  // Find upcoming interview if any
  const upcomingInterview = applications.find(
    (a) => a.status === 'interview_scheduled' && a.interviewDetails
  );

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#102B50] via-[#16345C] to-[#0D6EFD] rounded-2xl p-6 sm:p-8 text-white flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-md">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/10 text-xs font-semibold text-blue-200">
            <span>KMV Batch 2026 Graduating Cohort</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome back, {user?.name}!
          </h2>
          <p className="text-xs sm:text-sm text-slate-200 max-w-xl leading-relaxed">
            Your placement readiness dashboard is active. Keep your CGPA transcripts and technical projects up-to-date to maximize shortlist conversions.
          </p>
        </div>

        {/* Profile Completion Dial Card */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-5 border border-white/15 flex items-center gap-4 flex-shrink-0">
          <div className="relative w-16 h-16 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="32"
                cy="32"
                r="26"
                stroke="currentColor"
                strokeWidth="6"
                className="text-white/20"
                fill="transparent"
              />
              <circle
                cx="32"
                cy="32"
                r="26"
                stroke="currentColor"
                strokeWidth="6"
                strokeDasharray={163.3}
                strokeDashoffset={163.3 - (163.3 * stats.profileCompletion) / 100}
                className="text-white"
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
            <span className="absolute text-sm font-bold">{stats.profileCompletion}%</span>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-blue-200">Profile Status</p>
            <p className="text-sm font-semibold mt-0.5">
              {stats.profileCompletion >= 80 ? 'Verified & Complete' : 'Needs Completion'}
            </p>
            <button
              onClick={() => onSelectTab('profile')}
              className="text-[11px] text-blue-200 underline hover:text-white mt-1 cursor-pointer block"
            >
              Update Profile Details →
            </button>
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard
          title="Applications Sent"
          value={stats.totalApplied}
          subtitle="Drives applied to date"
          icon={FileSpreadsheet}
          variant="blue"
        />
        <StatCard
          title="Shortlisted"
          value={stats.shortlistedCount}
          subtitle="Cleared screening tests"
          icon={CheckCircle}
          variant="emerald"
        />
        <StatCard
          title="Interviews Scheduled"
          value={stats.interviewsScheduled}
          subtitle="Technical & HR rounds"
          icon={Video}
          variant="amber"
        />
        <StatCard
          title="Offers Received"
          value={stats.offersReceived}
          subtitle="Verified placement offers"
          icon={Award}
          variant="navy"
        />
      </div>

      {/* Quick Action Shortcuts */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <button
          onClick={() => onSelectTab('aptitude')}
          className="p-4 rounded-xl bg-white border border-[#DCE8F7] hover:border-[#0D6EFD] transition-all text-left shadow-2xs group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-lg bg-[#0D6EFD]/10 text-[#0D6EFD] flex items-center justify-center group-hover:bg-[#0D6EFD] group-hover:text-white transition-colors">
            <CheckCircle className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-xs text-[#16345C] mt-3 group-hover:text-[#0D6EFD] transition-colors">
            Aptitude Practice
          </h4>
          <p className="text-[11px] text-[#6B85A8] mt-0.5">15 Timed Questions</p>
        </button>

        <button
          onClick={() => onSelectTab('coding-arena')}
          className="p-4 rounded-xl bg-white border border-[#DCE8F7] hover:border-[#0D6EFD] transition-all text-left shadow-2xs group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-lg bg-[#0D6EFD]/10 text-[#0D6EFD] flex items-center justify-center group-hover:bg-[#0D6EFD] group-hover:text-white transition-colors">
            <Code2 className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-xs text-[#16345C] mt-3 group-hover:text-[#0D6EFD] transition-colors">
            Coding Arena
          </h4>
          <p className="text-[11px] text-[#6B85A8] mt-0.5">DSA Challenges & Runner</p>
        </button>

        <button
          onClick={() => onSelectTab('resume-builder')}
          className="p-4 rounded-xl bg-white border border-[#DCE8F7] hover:border-[#0D6EFD] transition-all text-left shadow-2xs group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-lg bg-[#0D6EFD]/10 text-[#0D6EFD] flex items-center justify-center group-hover:bg-[#0D6EFD] group-hover:text-white transition-colors">
            <FileText className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-xs text-[#16345C] mt-3 group-hover:text-[#0D6EFD] transition-colors">
            Resume Builder
          </h4>
          <p className="text-[11px] text-[#6B85A8] mt-0.5">ATS Format with Print</p>
        </button>

        <button
          onClick={() => onSelectTab('mock-interview')}
          className="p-4 rounded-xl bg-white border border-[#DCE8F7] hover:border-[#0D6EFD] transition-all text-left shadow-2xs group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-lg bg-[#0D6EFD]/10 text-[#0D6EFD] flex items-center justify-center group-hover:bg-[#0D6EFD] group-hover:text-white transition-colors">
            <Video className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-xs text-[#16345C] mt-3 group-hover:text-[#0D6EFD] transition-colors">
            Mock Interview
          </h4>
          <p className="text-[11px] text-[#6B85A8] mt-0.5">STAR Evaluation Model</p>
        </button>
      </div>

      {/* Main Grid: Active Applications & Upcoming Interviews */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Recent Applications */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-[#DCE8F7] p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#DCE8F7]">
            <div>
              <h3 className="font-bold text-base text-[#16345C]">Recent Applications</h3>
              <p className="text-xs text-[#6B85A8]">Track review status across submitted drives</p>
            </div>
            <button
              onClick={() => onSelectTab('applications')}
              className="text-xs font-semibold text-[#0D6EFD] hover:underline"
            >
              View All ({applications.length})
            </button>
          </div>

          {applications.length === 0 ? (
            <div className="py-12 text-center text-[#6B85A8] space-y-2">
              <FileSpreadsheet className="w-8 h-8 text-slate-300 mx-auto" />
              <p className="text-sm font-semibold text-[#16345C]">No applications submitted yet.</p>
              <p className="text-xs">Browse open placement drives and submit your profile.</p>
              <button
                onClick={() => onSelectTab('drives')}
                className="mt-3 px-4 py-2 rounded-lg bg-[#0D6EFD] text-white text-xs font-semibold"
              >
                Explore Open Drives
              </button>
            </div>
          ) : (
            <div className="divide-y divide-[#DCE8F7]">
              {applications.slice(0, 4).map((app) => (
                <div key={app.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-[#16345C]">
                        {app.drive?.companyName || 'Corporate Partner'}
                      </span>
                      <StatusBadge status={app.status} />
                    </div>
                    <p className="text-xs text-[#6B85A8]">
                      Role: {app.drive?.jobTitle || 'Graduate Trainee'} • Applied:{' '}
                      {new Date(app.appliedAt).toLocaleDateString()}
                    </p>
                    {app.recruiterFeedback && (
                      <p className="text-xs text-slate-700 bg-slate-50 p-2 rounded-lg border border-slate-100 italic">
                        Feedback: "{app.recruiterFeedback}"
                      </p>
                    )}
                  </div>

                  {app.status === 'interview_scheduled' && app.interviewDetails?.meetingLink && (
                    <a
                      href={app.interviewDetails.meetingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-[#0D6EFD] text-white text-xs font-semibold flex items-center gap-1.5 self-start sm:self-auto"
                    >
                      <span>Join Interview</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Upcoming Interview & Announcements */}
        <div className="lg:col-span-4 space-y-6">
          {/* Upcoming Interview Card */}
          {upcomingInterview && upcomingInterview.interviewDetails ? (
            <div className="bg-gradient-to-br from-blue-900 to-[#102B50] rounded-2xl p-6 text-white space-y-4 shadow-md">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-400 text-slate-900">
                  Upcoming Interview
                </span>
                <Video className="w-5 h-5 text-blue-200" />
              </div>
              <div>
                <h4 className="font-bold text-base leading-snug">
                  {upcomingInterview.drive?.companyName}
                </h4>
                <p className="text-xs text-blue-200 mt-0.5">
                  {upcomingInterview.interviewDetails.roundName}
                </p>
              </div>
              <div className="p-3 bg-white/10 rounded-xl space-y-1 text-xs">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-blue-300" />
                  <span>{upcomingInterview.interviewDetails.scheduledDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-300">Time:</span>
                  <span>{upcomingInterview.interviewDetails.timeString}</span>
                </div>
              </div>
              {upcomingInterview.interviewDetails.meetingLink && (
                <a
                  href={upcomingInterview.interviewDetails.meetingLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl bg-[#0D6EFD] hover:bg-[#2563EB] text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Launch Virtual Meeting</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-[#DCE8F7] p-6 space-y-2 text-center">
              <Calendar className="w-8 h-8 text-slate-300 mx-auto" />
              <h4 className="font-bold text-sm text-[#16345C]">No Interviews Scheduled Today</h4>
              <p className="text-xs text-[#6B85A8]">
                Invitations for technical and HR rounds will appear here when scheduled by recruiters.
              </p>
            </div>
          )}

          {/* Placement Notice Circulars */}
          <div className="bg-white rounded-2xl border border-[#DCE8F7] p-6 space-y-4 shadow-xs">
            <h4 className="font-bold text-sm text-[#16345C] pb-2 border-b border-[#DCE8F7]">
              Campus Notices
            </h4>
            <div className="space-y-3">
              {announcements.map((ann) => (
                <div key={ann.id} className="space-y-1">
                  <p className="text-xs font-bold text-[#16345C] hover:text-[#0D6EFD] transition-colors leading-snug">
                    {ann.title}
                  </p>
                  <p className="text-[11px] text-[#6B85A8] line-clamp-2">{ann.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
