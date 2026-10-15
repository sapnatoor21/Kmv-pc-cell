import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import { Application } from '../../types';
import { StatusBadge } from '../../components/common/Badge';
import { FileSpreadsheet, Calendar, Clock, Video, ExternalLink, Search, CheckCircle } from 'lucide-react';

interface StudentApplicationsPageProps {
  onSelectTab: (tab: string) => void;
}

export const StudentApplicationsPage: React.FC<StudentApplicationsPageProps> = ({ onSelectTab }) => {
  const { user } = useAuth();
  const [applications, setApplications] = useState<Application[]>([]);
  const [filter, setFilter] = useState<string>('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      api.student.getApplications(user.id).then((apps) => {
        setApplications(apps);
        setLoading(false);
      });
    }
  }, [user]);

  const filtered = applications.filter((app) => {
    if (filter === 'All') return true;
    return app.status === filter;
  });

  return (
    <div className="space-y-6">
      <div className="border-b border-[#DCE8F7] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#102B50]">My Placement Applications</h2>
          <p className="text-xs text-[#6B85A8]">
            Real-time status updates, recruiter screening reviews, and virtual interview schedules.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap items-center gap-1.5">
          {['All', 'applied', 'shortlisted', 'interview_scheduled', 'selected', 'rejected'].map((st) => (
            <button
              key={st}
              onClick={() => setFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors ${
                filter === st
                  ? 'bg-[#0D6EFD] text-white shadow-2xs'
                  : 'bg-white border border-[#DCE8F7] text-[#16345C] hover:border-[#0D6EFD]'
              }`}
            >
              {st === 'All' ? 'All Applications' : st.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="py-12 text-center text-xs text-[#6B85A8]">Loading your applications...</div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#DCE8F7] p-12 text-center space-y-3">
          <FileSpreadsheet className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="font-bold text-base text-[#102B50]">No Applications Found</h3>
          <p className="text-xs text-[#6B85A8] max-w-sm mx-auto">
            You currently have no applications under this category. Visit the Placement Drives tab to discover active corporate drives.
          </p>
          <button
            onClick={() => onSelectTab('drives')}
            className="px-4 py-2 rounded-xl bg-[#0D6EFD] text-white text-xs font-semibold"
          >
            Browse Placement Drives
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((app) => (
            <div
              key={app.id}
              className="bg-white rounded-2xl border border-[#DCE8F7] p-6 shadow-xs hover:border-[#0D6EFD]/40 transition-all space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#DCE8F7]">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-base text-[#102B50]">
                      {app.drive?.companyName || 'Corporate Partner'}
                    </h3>
                    <StatusBadge status={app.status} />
                  </div>
                  <p className="text-xs text-[#0D6EFD] font-semibold mt-0.5">
                    {app.drive?.jobTitle} • {app.drive?.location}
                  </p>
                </div>
                <div className="text-left sm:text-right text-xs text-[#6B85A8]">
                  <p>Applied on: {new Date(app.appliedAt).toLocaleDateString()}</p>
                  <p className="font-bold text-[#102B50]">{app.drive?.ctcSalary}</p>
                </div>
              </div>

              {/* Interview schedule box if interview_scheduled */}
              {app.status === 'interview_scheduled' && app.interviewDetails && (
                <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                      <Video className="w-4 h-4 text-amber-600" /> Interview Details: {app.interviewDetails.roundName}
                    </span>
                    {app.interviewDetails.meetingLink && (
                      <a
                        href={app.interviewDetails.meetingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-[#0D6EFD] text-white text-xs font-semibold flex items-center gap-1.5 shadow-2xs"
                      >
                        <span>Join Virtual Room</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-amber-950">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-amber-700" />
                      <span>Date: {app.interviewDetails.scheduledDate}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-700" />
                      <span>Time: {app.interviewDetails.timeString}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Recruiter feedback notes */}
              {app.recruiterFeedback && (
                <div className="p-3 bg-[#F3F7FC] rounded-xl border border-[#DCE8F7] text-xs space-y-1">
                  <span className="font-bold text-[#102B50]">Recruiter Remarks:</span>
                  <p className="text-slate-700 italic">"{app.recruiterFeedback}"</p>
                </div>
              )}

              {/* Selection status */}
              {app.status === 'selected' && (
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 font-semibold flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>
                    Congratulations! You have been selected. The official offer letter is being processed by KMV Placement Cell.
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
