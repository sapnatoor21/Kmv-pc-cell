import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import { Application, PlacementDrive, StudentProfile } from '../../types';
import { StatusBadge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { Users, Search, Filter, Calendar, Video, CheckCircle, XCircle, ExternalLink, FileText } from 'lucide-react';

export const ApplicantsPage: React.FC = () => {
  const { user, showToast } = useAuth();
  const [drives, setDrives] = useState<PlacementDrive[]>([]);
  const [selectedDriveId, setSelectedDriveId] = useState<string>('All');
  const [applicants, setApplicants] = useState<Application[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedCandidate, setSelectedCandidate] = useState<Application | null>(null);

  // Status updating dialog state
  const [updatingApp, setUpdatingApp] = useState<Application | null>(null);
  const [newStatus, setNewStatus] = useState<Application['status']>('shortlisted');
  const [feedbackNote, setFeedbackNote] = useState('');
  const [interviewDate, setInterviewDate] = useState('2026-11-15');
  const [interviewTime, setInterviewTime] = useState('11:00 AM IST');
  const [interviewLink, setInterviewLink] = useState('https://meet.google.com/kmv-placement-drive');

  useEffect(() => {
    if (!user) return;
    const loadData = async () => {
      const myDrives = await api.recruiter.getMyDrives(user.id);
      setDrives(myDrives);

      let allApps: Application[] = [];
      for (const d of myDrives) {
        const apps = await api.recruiter.getDriveApplicants(d.id);
        allApps = [...allApps, ...apps];
      }
      setApplicants(allApps);
    };
    loadData();
  }, [user]);

  const filteredApplicants = applicants.filter((app) => {
    const matchesDrive = selectedDriveId === 'All' || app.driveId === selectedDriveId;
    const matchesStatus = statusFilter === 'All' || app.status === statusFilter;
    const studentName = app.student?.name || '';
    const enrollment = app.studentProfile?.enrollmentNumber || '';
    const matchesSearch =
      studentName.toLowerCase().includes(search.toLowerCase()) ||
      enrollment.toLowerCase().includes(search.toLowerCase()) ||
      app.drive?.jobTitle.toLowerCase().includes(search.toLowerCase());

    return matchesDrive && matchesStatus && matchesSearch;
  });

  const handleOpenStatusModal = (app: Application) => {
    setUpdatingApp(app);
    setNewStatus(app.status);
    setFeedbackNote(app.recruiterFeedback || '');
  };

  const handleSaveStatus = async () => {
    if (!updatingApp) return;

    try {
      const interviewDetails =
        newStatus === 'interview_scheduled'
          ? {
              scheduledDate: interviewDate,
              timeString: interviewTime,
              roundName: 'Technical & Coding Round 1',
              meetingLink: interviewLink,
            }
          : undefined;

      await api.recruiter.updateApplicantStatus(
        updatingApp.id,
        newStatus,
        feedbackNote,
        interviewDetails
      );

      // Refresh list
      setApplicants((prev) =>
        prev.map((a) =>
          a.id === updatingApp.id
            ? { ...a, status: newStatus, recruiterFeedback: feedbackNote, interviewDetails }
            : a
        )
      );

      showToast(`Candidate status updated to '${newStatus.replace('_', ' ').toUpperCase()}'.`, 'success');
      setUpdatingApp(null);
    } catch (err: any) {
      showToast(err.message || 'Failed to update applicant status', 'error');
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-[#DCE8F7] pb-4">
        <h2 className="text-xl font-bold text-[#102B50]">Candidate Screening & Evaluation</h2>
        <p className="text-xs text-[#6B85A8]">
          Review verified student profiles, evaluate project portfolios, and update recruitment round outcomes.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-[#DCE8F7] p-5 shadow-xs space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 text-[#6B85A8] absolute left-3 top-3.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search candidate name, roll number, or role..."
              className="w-full pl-9 pr-3 py-2 bg-[#F3F7FC] border border-[#DCE8F7] rounded-xl text-xs text-[#16345C]"
            />
          </div>

          <div className="md:col-span-4">
            <select
              value={selectedDriveId}
              onChange={(e) => setSelectedDriveId(e.target.value)}
              className="w-full px-3 py-2 bg-[#F3F7FC] border border-[#DCE8F7] rounded-xl text-xs text-[#16345C]"
            >
              <option value="All">All Drives ({drives.length})</option>
              {drives.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.jobTitle}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 bg-[#F3F7FC] border border-[#DCE8F7] rounded-xl text-xs text-[#16345C]"
            >
              <option value="All">All Statuses</option>
              <option value="applied">Applied</option>
              <option value="shortlisted">Shortlisted</option>
              <option value="interview_scheduled">Interview Scheduled</option>
              <option value="selected">Selected</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Candidate Table */}
      <div className="bg-white rounded-2xl border border-[#DCE8F7] shadow-xs overflow-hidden">
        {filteredApplicants.length === 0 ? (
          <div className="py-16 text-center text-xs text-[#6B85A8]">
            No candidate applications match your current filters.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F3F7FC] border-b border-[#DCE8F7] text-[#6B85A8] uppercase font-bold text-[10px] tracking-wider">
                <tr>
                  <th className="px-6 py-3.5">Candidate</th>
                  <th className="px-6 py-3.5">Drive / Role</th>
                  <th className="px-6 py-3.5">Academic Transcript</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DCE8F7]">
                {filteredApplicants.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#102B50] text-white flex items-center justify-center font-bold text-xs">
                          {app.student?.name.charAt(0) || 'S'}
                        </div>
                        <div>
                          <p className="font-bold text-[#16345C]">{app.student?.name}</p>
                          <p className="text-[11px] text-[#6B85A8]">
                            {app.studentProfile?.enrollmentNumber || 'KMV Student'}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <p className="font-semibold text-[#16345C]">{app.drive?.jobTitle}</p>
                      <p className="text-[11px] text-[#6B85A8]">{app.drive?.companyName}</p>
                    </td>

                    <td className="px-6 py-4">
                      <p className="font-bold text-[#0D6EFD]">
                        CGPA: {app.studentProfile?.cgpa || '8.5'}
                      </p>
                      <p className="text-[11px] text-[#6B85A8]">
                        {app.studentProfile?.course} • Backlogs: {app.studentProfile?.backlogs || 0}
                      </p>
                    </td>

                    <td className="px-6 py-4">
                      <StatusBadge status={app.status} />
                    </td>

                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={() => setSelectedCandidate(app)}
                        className="px-3 py-1.5 rounded-lg border border-[#DCE8F7] text-[#16345C] font-semibold hover:border-[#0D6EFD] hover:text-[#0D6EFD]"
                      >
                        Profile
                      </button>
                      <button
                        onClick={() => handleOpenStatusModal(app)}
                        className="px-3 py-1.5 rounded-lg bg-[#0D6EFD] text-white font-semibold hover:bg-[#2563EB]"
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* CANDIDATE PROFILE MODAL */}
      <Modal
        isOpen={!!selectedCandidate}
        onClose={() => setSelectedCandidate(null)}
        title={selectedCandidate?.student?.name || 'Candidate Transcript'}
        subtitle={`KMV Roll: ${selectedCandidate?.studentProfile?.enrollmentNumber || ''}`}
        maxWidth="lg"
      >
        {selectedCandidate && (
          <div className="space-y-5">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-[#F3F7FC] border border-[#DCE8F7] text-xs">
              <div>
                <span className="text-[#6B85A8] block">Course</span>
                <span className="font-bold text-[#102B50]">{selectedCandidate.studentProfile?.course}</span>
              </div>
              <div>
                <span className="text-[#6B85A8] block">CGPA</span>
                <span className="font-bold text-[#0D6EFD]">{selectedCandidate.studentProfile?.cgpa}</span>
              </div>
              <div>
                <span className="text-[#6B85A8] block">10th / 12th</span>
                <span className="font-bold text-[#102B50]">
                  {selectedCandidate.studentProfile?.tenthPercentage}% / {selectedCandidate.studentProfile?.twelfthPercentage}%
                </span>
              </div>
              <div>
                <span className="text-[#6B85A8] block">Backlogs</span>
                <span className="font-bold text-emerald-600">
                  {selectedCandidate.studentProfile?.backlogs || 0}
                </span>
              </div>
            </div>

            {/* Skills */}
            <div>
              <span className="text-xs font-bold uppercase text-[#102B50] block mb-1.5">
                Technical Skills
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedCandidate.studentProfile?.skills?.map((sk, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-0.5 rounded-md bg-blue-50 text-[#0D6EFD] text-xs font-semibold border border-blue-200"
                  >
                    {sk}
                  </span>
                ))}
              </div>
            </div>

            {/* Projects */}
            {selectedCandidate.studentProfile?.projects && (
              <div>
                <span className="text-xs font-bold uppercase text-[#102B50] block mb-1.5">
                  Applied Projects
                </span>
                <div className="space-y-2">
                  {selectedCandidate.studentProfile.projects.map((proj, i) => (
                    <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                      <p className="font-bold text-[#16345C]">{proj.title}</p>
                      <p className="text-slate-600 mt-0.5">{proj.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>

      {/* UPDATE STATUS MODAL */}
      <Modal
        isOpen={!!updatingApp}
        onClose={() => setUpdatingApp(null)}
        title="Update Candidate Recruitment Status"
        subtitle={`Candidate: ${updatingApp?.student?.name}`}
        maxWidth="md"
      >
        {updatingApp && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#16345C] mb-1">
                Recruitment Stage
              </label>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value as any)}
                className="w-full px-3.5 py-2.5 bg-[#F3F7FC] border border-[#DCE8F7] rounded-xl text-xs text-[#16345C]"
              >
                <option value="under_review">Under Review</option>
                <option value="shortlisted">Shortlisted for Test</option>
                <option value="assessment_round">Assessment Round</option>
                <option value="interview_scheduled">Interview Scheduled</option>
                <option value="selected">Selected / Offer Extended</option>
                <option value="rejected">Not Shortlisted (Reject)</option>
              </select>
            </div>

            {/* If interview scheduled, show date & link */}
            {newStatus === 'interview_scheduled' && (
              <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 space-y-3">
                <span className="text-xs font-bold text-amber-900 block">
                  Interview Scheduling Details
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] text-amber-900 mb-0.5">Date</label>
                    <input
                      type="date"
                      value={interviewDate}
                      onChange={(e) => setInterviewDate(e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-white border border-amber-300 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-amber-900 mb-0.5">Time</label>
                    <input
                      type="text"
                      value={interviewTime}
                      onChange={(e) => setInterviewTime(e.target.value)}
                      placeholder="e.g. 11:30 AM IST"
                      className="w-full px-2.5 py-1.5 bg-white border border-amber-300 rounded-lg text-xs"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] text-amber-900 mb-0.5">Meeting / Video Link</label>
                  <input
                    type="url"
                    value={interviewLink}
                    onChange={(e) => setInterviewLink(e.target.value)}
                    placeholder="https://meet.google.com/..."
                    className="w-full px-2.5 py-1.5 bg-white border border-amber-300 rounded-lg text-xs"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-[#16345C] mb-1">
                Recruiter Feedback & Notes (Visible to candidate)
              </label>
              <textarea
                rows={3}
                value={feedbackNote}
                onChange={(e) => setFeedbackNote(e.target.value)}
                placeholder="e.g. Cleared technical screening. Proceeding to virtual panel..."
                className="w-full px-3.5 py-2.5 bg-[#F3F7FC] border border-[#DCE8F7] rounded-xl text-xs text-[#16345C]"
              />
            </div>

            <div className="pt-3 border-t border-[#DCE8F7] flex items-center justify-between">
              <button
                type="button"
                onClick={() => setUpdatingApp(null)}
                className="px-4 py-2 rounded-lg border border-[#DCE8F7] text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveStatus}
                className="px-5 py-2.5 rounded-lg bg-[#0D6EFD] text-white text-xs font-semibold hover:bg-[#2563EB]"
              >
                Save Status
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
