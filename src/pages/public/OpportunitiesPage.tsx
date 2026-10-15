import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { dbStore } from '../../services/dbStore';
import { api } from '../../services/api';
import { PlacementDrive } from '../../types';
import { StatusBadge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { Search, Filter, Calendar, MapPin, DollarSign, Award, BookOpen, Check, ArrowRight, AlertCircle } from 'lucide-react';

export const OpportunitiesPage: React.FC = () => {
  const { user, setAuthModal, showToast } = useAuth();
  const [drives, setDrives] = useState<PlacementDrive[]>(dbStore.getDrives());
  const [search, setSearch] = useState('');
  const [selectedJobType, setSelectedJobType] = useState('All');
  const [selectedCourse, setSelectedCourse] = useState('All');
  const [selectedDrive, setSelectedDrive] = useState<PlacementDrive | null>(null);
  const [applying, setApplying] = useState(false);

  // Check if current student has applied
  const studentApplications = user?.id ? dbStore.getApplicationsByStudentId(user.id) : [];

  const filteredDrives = drives.filter((drive) => {
    const matchesSearch =
      drive.jobTitle.toLowerCase().includes(search.toLowerCase()) ||
      drive.companyName.toLowerCase().includes(search.toLowerCase()) ||
      drive.skillsRequired.some((s) => s.toLowerCase().includes(search.toLowerCase()));

    const matchesJobType = selectedJobType === 'All' || drive.jobType === selectedJobType;
    const matchesCourse =
      selectedCourse === 'All' ||
      drive.eligibilityCriteria.allowedCourses.some((c) =>
        c.toLowerCase().includes(selectedCourse.toLowerCase())
      );

    return matchesSearch && matchesJobType && matchesCourse;
  });

  const handleApply = async (driveId: string) => {
    if (!user) {
      setAuthModal('login');
      return;
    }

    if (user.role !== 'student') {
      showToast('Only verified students can apply to placement drives.', 'info');
      return;
    }

    setApplying(true);
    try {
      await api.applications.applyToDrive(driveId, user.id);
      showToast('Application submitted successfully! Check Applications tab.', 'success');
      // Refresh local drives list
      setDrives(dbStore.getDrives());
      setSelectedDrive(null);
    } catch (err: any) {
      showToast(err.message || 'Application submission failed', 'error');
    } finally {
      setApplying(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Page Title */}
      <div className="border-b border-[#DCE8F7] pb-6">
        <span className="text-xs font-bold uppercase tracking-wider text-[#0D6EFD]">
          KMV Campus Opportunities
        </span>
        <h1 className="text-3xl font-extrabold text-[#102B50] mt-1">
          Placement Drives & Internship Openings
        </h1>
        <p className="text-xs sm:text-sm text-[#6B85A8] mt-1">
          Explore and apply for verified corporate placement drives. All drives enforce verified eligibility.
        </p>
      </div>

      {/* Filters and Search Bar */}
      <div className="bg-white rounded-2xl border border-[#DCE8F7] p-5 shadow-xs space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Search Input */}
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 text-[#6B85A8] absolute left-3 top-3.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by role, company name, or skills (e.g. Java, React, SQL)..."
              className="w-full pl-9 pr-4 py-2.5 bg-[#F3F7FC] border border-[#DCE8F7] rounded-xl text-sm text-[#16345C] placeholder:text-[#6B85A8] focus:outline-hidden focus:border-[#0D6EFD]"
            />
          </div>

          {/* Job Type Filter */}
          <div className="md:col-span-3">
            <select
              value={selectedJobType}
              onChange={(e) => setSelectedJobType(e.target.value)}
              className="w-full px-3 py-2.5 bg-[#F3F7FC] border border-[#DCE8F7] rounded-xl text-sm text-[#16345C] focus:outline-hidden focus:border-[#0D6EFD]"
            >
              <option value="All">All Job Types</option>
              <option value="Full-Time">Full-Time Only</option>
              <option value="Internship">Internship Only</option>
              <option value="Internship+PPO">Internship + PPO</option>
            </select>
          </div>

          {/* Course Filter */}
          <div className="md:col-span-3">
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="w-full px-3 py-2.5 bg-[#F3F7FC] border border-[#DCE8F7] rounded-xl text-sm text-[#16345C] focus:outline-hidden focus:border-[#0D6EFD]"
            >
              <option value="All">All Eligible Courses</option>
              <option value="BCA">BCA Eligible</option>
              <option value="MCA">MCA Eligible</option>
              <option value="B.Tech">B.Tech Eligible</option>
              <option value="B.Sc IT">B.Sc IT Eligible</option>
              <option value="B.Com">B.Com Eligible</option>
            </select>
          </div>
        </div>
      </div>

      {/* Drives Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDrives.length === 0 ? (
          <div className="col-span-full py-16 text-center bg-white rounded-2xl border border-[#DCE8F7]">
            <p className="text-sm font-semibold text-[#16345C]">No placement drives match your filters.</p>
            <p className="text-xs text-[#6B85A8] mt-1">Try resetting the search keyword or course filter.</p>
            <button
              onClick={() => {
                setSearch('');
                setSelectedJobType('All');
                setSelectedCourse('All');
              }}
              className="mt-4 px-4 py-2 rounded-lg bg-[#0D6EFD] text-white text-xs font-semibold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredDrives.map((drive) => {
            const hasApplied = studentApplications.some((a) => a.driveId === drive.id);

            return (
              <div
                key={drive.id}
                className="bg-white rounded-2xl border border-[#DCE8F7] p-6 shadow-xs hover:border-[#0D6EFD]/50 transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 rounded-xl bg-[#F3F7FC] border border-[#DCE8F7] flex items-center justify-center font-bold text-lg text-[#102B50]">
                      {drive.companyName.charAt(0)}
                    </div>
                    <div className="flex items-center gap-1.5">
                      {hasApplied && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          Applied
                        </span>
                      )}
                      <StatusBadge status={drive.status} />
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-base text-[#16345C] leading-snug">{drive.jobTitle}</h3>
                    <p className="text-xs font-semibold text-[#0D6EFD] mt-0.5">{drive.companyName}</p>
                  </div>

                  <div className="space-y-1.5 text-xs text-[#6B85A8] py-2.5 border-y border-[#DCE8F7]/60">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <DollarSign className="w-3.5 h-3.5 text-[#0D6EFD]" /> Package:
                      </span>
                      <span className="font-bold text-[#102B50]">{drive.ctcSalary}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#0D6EFD]" /> Location:
                      </span>
                      <span className="font-medium text-[#16345C]">{drive.location}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <Award className="w-3.5 h-3.5 text-[#0D6EFD]" /> Eligibility:
                      </span>
                      <span className="font-medium text-[#16345C]">
                        Min CGPA {drive.eligibilityCriteria.minCgpa}
                      </span>
                    </div>
                  </div>

                  <div>
                    <span className="text-[11px] font-semibold text-[#6B85A8] block mb-1.5">Skills Required:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {drive.skillsRequired.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-[#F3F7FC] border border-[#DCE8F7] text-[11px] text-[#16345C]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#DCE8F7] flex items-center justify-between">
                  <span className="text-[11px] text-[#6B85A8]">
                    Apply by: {new Date(drive.applicationDeadline).toLocaleDateString()}
                  </span>
                  <button
                    onClick={() => setSelectedDrive(drive)}
                    className="px-4 py-2 rounded-lg bg-[#102B50] hover:bg-[#16345C] text-white text-xs font-semibold transition-colors flex items-center gap-1.5"
                  >
                    <span>View Drive</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* DRIVE DETAILS MODAL */}
      <Modal
        isOpen={!!selectedDrive}
        onClose={() => setSelectedDrive(null)}
        title={selectedDrive?.jobTitle || 'Placement Drive Details'}
        subtitle={`${selectedDrive?.companyName} • ${selectedDrive?.location}`}
        maxWidth="xl"
      >
        {selectedDrive && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-[#F3F7FC] border border-[#DCE8F7]">
              <div>
                <span className="text-[10px] font-bold uppercase text-[#6B85A8] block">CTC / Salary</span>
                <span className="text-sm font-bold text-[#102B50]">{selectedDrive.ctcSalary}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase text-[#6B85A8] block">Job Type</span>
                <span className="text-sm font-bold text-[#16345C]">{selectedDrive.jobType}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase text-[#6B85A8] block">Min CGPA</span>
                <span className="text-sm font-bold text-[#0D6EFD]">
                  {selectedDrive.eligibilityCriteria.minCgpa}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase text-[#6B85A8] block">Deadline</span>
                <span className="text-sm font-bold text-rose-600">
                  {new Date(selectedDrive.applicationDeadline).toLocaleDateString()}
                </span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#102B50] mb-1.5">
                Role Description & Scope
              </h4>
              <p className="text-xs sm:text-sm text-[#16345C] leading-relaxed whitespace-pre-line bg-slate-50 p-4 rounded-xl border border-slate-100">
                {selectedDrive.description}
              </p>
            </div>

            {/* Eligibility & Allowed Courses */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#102B50] mb-2">
                Eligible Academic Programs
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedDrive.eligibilityCriteria.allowedCourses.map((c, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-blue-50 border border-blue-200 text-xs font-semibold text-[#0D6EFD]"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>

            {/* Selection Rounds */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#102B50] mb-2">
                Recruitment Selection Rounds
              </h4>
              <div className="space-y-2">
                {selectedDrive.selectionRounds.map((round, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs text-[#16345C]">
                    <span className="w-5 h-5 rounded-full bg-[#0D6EFD] text-white flex items-center justify-center font-bold text-[10px]">
                      {idx + 1}
                    </span>
                    <span className="font-medium">{round}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer CTAs */}
            <div className="pt-4 border-t border-[#DCE8F7] flex items-center justify-between">
              <span className="text-xs text-[#6B85A8]">
                {selectedDrive.applicantsCount} student applicants so far
              </span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedDrive(null)}
                  className="px-4 py-2 rounded-lg border border-[#DCE8F7] text-xs font-semibold text-[#16345C] hover:bg-slate-50"
                >
                  Close
                </button>
                {studentApplications.some((a) => a.driveId === selectedDrive.id) ? (
                  <button
                    disabled
                    className="px-5 py-2.5 rounded-lg bg-emerald-600 text-white text-xs font-semibold flex items-center gap-1.5 opacity-80"
                  >
                    <Check className="w-4 h-4" />
                    <span>Application Submitted</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled={applying}
                    onClick={() => handleApply(selectedDrive.id)}
                    className="px-5 py-2.5 rounded-lg bg-[#0D6EFD] hover:bg-[#2563EB] text-white text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer disabled:opacity-50"
                  >
                    {applying ? 'Submitting Application...' : 'Apply for this Drive'}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
