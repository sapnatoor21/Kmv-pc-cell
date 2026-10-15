import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import { Briefcase, Building, DollarSign, Calendar, MapPin, Award, CheckCircle, PlusCircle } from 'lucide-react';

interface CreateDrivePageProps {
  onSelectTab: (tab: string) => void;
}

export const CreateDrivePage: React.FC<CreateDrivePageProps> = ({ onSelectTab }) => {
  const { user, showToast } = useAuth();

  const [formData, setFormData] = useState({
    jobTitle: '',
    companyName: 'Tata Consultancy Services (TCS)',
    jobRole: 'Software Engineering & IT Architecture',
    jobType: 'Full-Time' as const,
    location: 'Mohali / Gurgaon / Bangalore',
    ctcSalary: '7.5 LPA',
    stipend: 'N/A',
    minCgpa: 6.5,
    allowedCourses: ['BCA', 'MCA', 'B.Tech CSE', 'B.Sc IT'],
    maxBacklogs: 0,
    graduationYear: 2026,
    skillsRequired: 'Java, Python, SQL, Data Structures, OOPS',
    description: '',
    selectionRounds: 'Online Aptitude & Coding Test, Technical Interview, HR Interview',
    applicationDeadline: '2026-11-30',
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.jobTitle || !formData.ctcSalary || !formData.description) {
      showToast('Please provide all mandatory drive details.', 'error');
      return;
    }

    setLoading(true);
    try {
      const skills = formData.skillsRequired
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);

      const rounds = formData.selectionRounds
        .split(',')
        .map((r) => r.trim())
        .filter(Boolean);

      await api.recruiter.createDrive(user?.id || 'usr_recruiter_1', {
        companyName: formData.companyName,
        jobTitle: formData.jobTitle,
        jobRole: formData.jobRole,
        jobType: formData.jobType,
        location: formData.location,
        ctcSalary: formData.ctcSalary,
        stipend: formData.stipend,
        eligibilityCriteria: {
          minCgpa: Number(formData.minCgpa),
          allowedCourses: formData.allowedCourses,
          maxBacklogs: Number(formData.maxBacklogs),
          graduationYear: Number(formData.graduationYear),
        },
        skillsRequired: skills,
        description: formData.description,
        selectionRounds: rounds,
        applicationDeadline: formData.applicationDeadline,
        driveDate: new Date().toISOString(),
        status: 'open',
      });

      showToast('Placement drive published successfully! Eligible students can now apply.', 'success');
      onSelectTab('my-drives');
    } catch (err: any) {
      showToast(err.message || 'Failed to create drive', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleCourse = (course: string) => {
    if (formData.allowedCourses.includes(course)) {
      setFormData({
        ...formData,
        allowedCourses: formData.allowedCourses.filter((c) => c !== course),
      });
    } else {
      setFormData({
        ...formData,
        allowedCourses: [...formData.allowedCourses, course],
      });
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-[#DCE8F7] p-6 sm:p-8 shadow-xs max-w-4xl space-y-6">
      <div className="border-b border-[#DCE8F7] pb-4">
        <h2 className="text-xl font-bold text-[#102B50]">Post a Campus Placement Drive</h2>
        <p className="text-xs text-[#6B85A8]">
          Specify role requirements, compensation, academic eligibility, and selection rounds.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Row 1: Job Title & Company */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#16345C] mb-1">
              Job Title / Designation *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Associate Software Engineer (Full-Stack)"
              value={formData.jobTitle}
              onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-[#F3F7FC] border border-[#DCE8F7] rounded-xl text-xs text-[#16345C] focus:border-[#0D6EFD]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#16345C] mb-1">
              Company Name *
            </label>
            <input
              type="text"
              required
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-[#F3F7FC] border border-[#DCE8F7] rounded-xl text-xs text-[#16345C] focus:border-[#0D6EFD]"
            />
          </div>
        </div>

        {/* Row 2: Type, CTC, Location */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#16345C] mb-1">Job Type *</label>
            <select
              value={formData.jobType}
              onChange={(e) => setFormData({ ...formData, jobType: e.target.value as any })}
              className="w-full px-3.5 py-2.5 bg-[#F3F7FC] border border-[#DCE8F7] rounded-xl text-xs text-[#16345C]"
            >
              <option value="Full-Time">Full-Time (Direct Hire)</option>
              <option value="Internship+PPO">Internship + PPO</option>
              <option value="Internship">Internship Only</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#16345C] mb-1">
              CTC Package (Salary) *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. 7.5 LPA"
              value={formData.ctcSalary}
              onChange={(e) => setFormData({ ...formData, ctcSalary: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-[#F3F7FC] border border-[#DCE8F7] rounded-xl text-xs text-[#16345C]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#16345C] mb-1">Job Location *</label>
            <input
              type="text"
              required
              placeholder="e.g. Mohali / Gurgaon / Pan India"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-[#F3F7FC] border border-[#DCE8F7] rounded-xl text-xs text-[#16345C]"
            />
          </div>
        </div>

        {/* Eligibility Criteria Box */}
        <div className="p-5 rounded-xl bg-[#F3F7FC] border border-[#DCE8F7] space-y-4">
          <h3 className="font-bold text-xs uppercase tracking-wider text-[#102B50]">
            Eligibility & Academic Prerequisites
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#16345C] mb-1">
                Minimum CGPA (0 - 10)
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="10"
                value={formData.minCgpa}
                onChange={(e) => setFormData({ ...formData, minCgpa: parseFloat(e.target.value) || 0 })}
                className="w-full px-3 py-2 bg-white border border-[#DCE8F7] rounded-lg text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#16345C] mb-1">
                Maximum Active Backlogs
              </label>
              <input
                type="number"
                min="0"
                max="5"
                value={formData.maxBacklogs}
                onChange={(e) => setFormData({ ...formData, maxBacklogs: parseInt(e.target.value, 10) || 0 })}
                className="w-full px-3 py-2 bg-white border border-[#DCE8F7] rounded-lg text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#16345C] mb-1">
                Application Deadline *
              </label>
              <input
                type="date"
                required
                value={formData.applicationDeadline}
                onChange={(e) => setFormData({ ...formData, applicationDeadline: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-[#DCE8F7] rounded-lg text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#16345C] mb-1.5">
              Eligible Academic Programs (Select all allowed)
            </label>
            <div className="flex flex-wrap gap-2">
              {['BCA', 'MCA', 'B.Tech CSE', 'B.Sc IT', 'M.Sc IT', 'B.Com', 'BBA'].map((c) => {
                const isSelected = formData.allowedCourses.includes(c);
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => handleToggleCourse(c)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#0D6EFD] text-white shadow-2xs'
                        : 'bg-white border border-[#DCE8F7] text-[#16345C]'
                    }`}
                  >
                    {isSelected ? '✓ ' : '+ '} {c}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Skills & Description */}
        <div>
          <label className="block text-xs font-semibold text-[#16345C] mb-1">
            Required Skills (Comma separated)
          </label>
          <input
            type="text"
            value={formData.skillsRequired}
            onChange={(e) => setFormData({ ...formData, skillsRequired: e.target.value })}
            placeholder="e.g. Java, Python, SQL, REST APIs, Git"
            className="w-full px-3.5 py-2.5 bg-[#F3F7FC] border border-[#DCE8F7] rounded-xl text-xs text-[#16345C]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#16345C] mb-1">
            Recruitment Selection Rounds (Comma separated)
          </label>
          <input
            type="text"
            value={formData.selectionRounds}
            onChange={(e) => setFormData({ ...formData, selectionRounds: e.target.value })}
            placeholder="e.g. Aptitude Test, Technical Interview, HR Interview"
            className="w-full px-3.5 py-2.5 bg-[#F3F7FC] border border-[#DCE8F7] rounded-xl text-xs text-[#16345C]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#16345C] mb-1">
            Job Description & Responsibilities *
          </label>
          <textarea
            required
            rows={5}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Provide full description of job role, expected technical stack, learning opportunities, and work culture..."
            className="w-full px-3.5 py-2.5 bg-[#F3F7FC] border border-[#DCE8F7] rounded-xl text-xs text-[#16345C]"
          />
        </div>

        <div className="pt-4 border-t border-[#DCE8F7] flex items-center justify-between">
          <button
            type="button"
            onClick={() => onSelectTab('my-drives')}
            className="px-4 py-2 rounded-xl border border-[#DCE8F7] text-xs font-semibold text-[#16345C]"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 rounded-xl bg-[#0D6EFD] hover:bg-[#2563EB] text-white text-xs font-semibold flex items-center gap-2 shadow-xs cursor-pointer disabled:opacity-50"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{loading ? 'Publishing Drive...' : 'Publish Campus Drive'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
