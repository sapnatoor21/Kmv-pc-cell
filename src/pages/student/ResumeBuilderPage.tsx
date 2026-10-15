import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import { StudentProfile } from '../../types';
import { Printer, Download, Eye, RefreshCw, GraduationCap, CheckCircle } from 'lucide-react';

export const ResumeBuilderPage: React.FC = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<StudentProfile | null>(null);

  // Editable resume state
  const [resumeData, setResumeData] = useState({
    name: user?.name || 'Simran Kaur',
    email: user?.email || 'student@kmv.ac.in',
    phone: user?.phone || '+91 98140 12345',
    college: 'Kanya Maha Vidyalaya (Autonomous), Jalandhar',
    course: 'Bachelor of Computer Applications (BCA)',
    cgpa: '8.85 / 10.0',
    summary:
      'Proactive computer science undergraduate with deep interest in full-stack web engineering, algorithms, and distributed systems. Seeking an Associate Software Engineer or Technology Analyst role at premier organizations.',
    skills: 'React.js, TypeScript, Node.js, Express, Python, SQL, MongoDB, Git, Tailwind CSS, Data Structures',
    project1Title: 'KMV Campus Event Management Portal',
    project1Desc:
      'Architected a full-stack web portal managing student registrations, QR ticketing, and certificate generation with React, Express and MongoDB.',
    project2Title: 'Smart Placement Eligibility Screener',
    project2Desc:
      'Engineered an automated rules engine parsing student transcripts against corporate drive prerequisites in Python & PostgreSQL.',
    certification1: 'Meta Certified Front-End Developer — Coursera & Meta (2025)',
    certification2: 'Problem Solving Gold Badge — HackerRank (2025)',
  });

  useEffect(() => {
    if (user) {
      api.student.getProfile(user.id).then((prof) => {
        if (prof) {
          setProfile(prof);
          setResumeData((prev) => ({
            ...prev,
            name: user.name,
            email: user.email,
            phone: user.phone,
            course: prof.course || prev.course,
            cgpa: `${prof.cgpa || 8.5} / 10.0`,
            skills: prof.skills?.length ? prof.skills.join(', ') : prev.skills,
            summary: prof.bio || prev.summary,
            project1Title: prof.projects?.[0]?.title || prev.project1Title,
            project1Desc: prof.projects?.[0]?.description || prev.project1Desc,
            project2Title: prof.projects?.[1]?.title || prev.project2Title,
            project2Desc: prof.projects?.[1]?.description || prev.project2Desc,
            certification1: prof.certifications?.[0]?.title
              ? `${prof.certifications[0].title} — ${prof.certifications[0].issuer}`
              : prev.certification1,
            certification2: prof.certifications?.[1]?.title
              ? `${prof.certifications[1].title} — ${prof.certifications[1].issuer}`
              : prev.certification2,
          }));
        }
      });
    }
  }, [user]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Top action bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#DCE8F7] no-print">
        <div>
          <h2 className="text-xl font-bold text-[#102B50]">KMV Approved ATS Resume Builder</h2>
          <p className="text-xs text-[#6B85A8]">
            Pre-formatted with Kanya Maha Vidyalaya verified collegiate branding. Ready for campus drives.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="px-5 py-2.5 rounded-xl bg-[#0D6EFD] hover:bg-[#2563EB] text-white text-xs font-semibold flex items-center gap-2 shadow-xs cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save as PDF</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Form Controls (Hidden on print) */}
        <div className="lg:col-span-5 space-y-4 no-print bg-white p-6 rounded-2xl border border-[#DCE8F7] shadow-xs max-h-[85vh] overflow-y-auto">
          <h3 className="font-bold text-sm text-[#16345C] pb-2 border-b border-[#DCE8F7]">
            Customize Resume Content
          </h3>

          <div>
            <label className="block text-[11px] font-bold text-[#6B85A8] uppercase mb-1">
              Candidate Full Name
            </label>
            <input
              type="text"
              value={resumeData.name}
              onChange={(e) => setResumeData({ ...resumeData, name: e.target.value })}
              className="w-full px-3 py-2 bg-[#F3F7FC] border border-[#DCE8F7] rounded-lg text-xs"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[11px] font-bold text-[#6B85A8] uppercase mb-1">Email</label>
              <input
                type="text"
                value={resumeData.email}
                onChange={(e) => setResumeData({ ...resumeData, email: e.target.value })}
                className="w-full px-3 py-2 bg-[#F3F7FC] border border-[#DCE8F7] rounded-lg text-xs"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-[#6B85A8] uppercase mb-1">Phone</label>
              <input
                type="text"
                value={resumeData.phone}
                onChange={(e) => setResumeData({ ...resumeData, phone: e.target.value })}
                className="w-full px-3 py-2 bg-[#F3F7FC] border border-[#DCE8F7] rounded-lg text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-[#6B85A8] uppercase mb-1">
              Professional Summary
            </label>
            <textarea
              rows={3}
              value={resumeData.summary}
              onChange={(e) => setResumeData({ ...resumeData, summary: e.target.value })}
              className="w-full px-3 py-2 bg-[#F3F7FC] border border-[#DCE8F7] rounded-lg text-xs"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-[#6B85A8] uppercase mb-1">
              Technical Skills (Comma separated)
            </label>
            <input
              type="text"
              value={resumeData.skills}
              onChange={(e) => setResumeData({ ...resumeData, skills: e.target.value })}
              className="w-full px-3 py-2 bg-[#F3F7FC] border border-[#DCE8F7] rounded-lg text-xs"
            />
          </div>

          <div className="space-y-2 pt-2 border-t border-[#DCE8F7]">
            <span className="text-xs font-bold text-[#102B50]">Featured Projects</span>
            <input
              type="text"
              placeholder="Project 1 Title"
              value={resumeData.project1Title}
              onChange={(e) => setResumeData({ ...resumeData, project1Title: e.target.value })}
              className="w-full px-3 py-1.5 bg-[#F3F7FC] border border-[#DCE8F7] rounded-lg text-xs"
            />
            <textarea
              rows={2}
              placeholder="Project 1 Description"
              value={resumeData.project1Desc}
              onChange={(e) => setResumeData({ ...resumeData, project1Desc: e.target.value })}
              className="w-full px-3 py-1.5 bg-[#F3F7FC] border border-[#DCE8F7] rounded-lg text-xs"
            />

            <input
              type="text"
              placeholder="Project 2 Title"
              value={resumeData.project2Title}
              onChange={(e) => setResumeData({ ...resumeData, project2Title: e.target.value })}
              className="w-full px-3 py-1.5 bg-[#F3F7FC] border border-[#DCE8F7] rounded-lg text-xs mt-2"
            />
            <textarea
              rows={2}
              placeholder="Project 2 Description"
              value={resumeData.project2Desc}
              onChange={(e) => setResumeData({ ...resumeData, project2Desc: e.target.value })}
              className="w-full px-3 py-1.5 bg-[#F3F7FC] border border-[#DCE8F7] rounded-lg text-xs"
            />
          </div>

          <div className="space-y-2 pt-2 border-t border-[#DCE8F7]">
            <span className="text-xs font-bold text-[#102B50]">Certifications</span>
            <input
              type="text"
              value={resumeData.certification1}
              onChange={(e) => setResumeData({ ...resumeData, certification1: e.target.value })}
              className="w-full px-3 py-1.5 bg-[#F3F7FC] border border-[#DCE8F7] rounded-lg text-xs"
            />
            <input
              type="text"
              value={resumeData.certification2}
              onChange={(e) => setResumeData({ ...resumeData, certification2: e.target.value })}
              className="w-full px-3 py-1.5 bg-[#F3F7FC] border border-[#DCE8F7] rounded-lg text-xs"
            />
          </div>
        </div>

        {/* Right Column: Live Printable Resume Sheet */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-2xl border border-slate-300 shadow-xl p-8 sm:p-12 text-[#102B50] font-sans print:shadow-none print:border-none print:p-0 print:m-0">
            {/* Resume Header */}
            <div className="border-b-2 border-[#102B50] pb-4 text-center space-y-1">
              <h1 className="text-2xl font-black uppercase tracking-wider text-[#102B50]">
                {resumeData.name}
              </h1>
              <p className="text-xs font-medium text-slate-600">
                {resumeData.email} • {resumeData.phone} • Jalandhar, Punjab
              </p>
              <p className="text-[11px] font-bold text-[#0D6EFD] uppercase tracking-wide">
                Kanya Maha Vidyalaya (Autonomous College) • Placement Candidate
              </p>
            </div>

            {/* Professional Summary */}
            <div className="mt-4 space-y-1">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#102B50] border-b border-slate-300 pb-0.5">
                Executive Profile
              </h3>
              <p className="text-xs text-slate-700 leading-relaxed pt-1">
                {resumeData.summary}
              </p>
            </div>

            {/* Education */}
            <div className="mt-4 space-y-1">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#102B50] border-b border-slate-300 pb-0.5">
                Education & Academic Credentials
              </h3>
              <div className="pt-1 flex items-start justify-between text-xs">
                <div>
                  <p className="font-bold text-[#102B50]">{resumeData.course}</p>
                  <p className="text-slate-600 text-[11px]">{resumeData.college}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-[#0D6EFD]">CGPA: {resumeData.cgpa}</p>
                  <p className="text-slate-500 text-[11px]">Expected: 2026</p>
                </div>
              </div>
            </div>

            {/* Technical Skills */}
            <div className="mt-4 space-y-1">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#102B50] border-b border-slate-300 pb-0.5">
                Technical Expertise & Core Competencies
              </h3>
              <p className="text-xs text-slate-700 pt-1 leading-relaxed">
                <span className="font-bold">Skills:</span> {resumeData.skills}
              </p>
            </div>

            {/* Projects */}
            <div className="mt-4 space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#102B50] border-b border-slate-300 pb-0.5">
                Key Engineering & Applied Projects
              </h3>

              <div className="space-y-0.5 text-xs">
                <p className="font-bold text-[#102B50]">{resumeData.project1Title}</p>
                <p className="text-slate-700 leading-relaxed text-[11px]">
                  {resumeData.project1Desc}
                </p>
              </div>

              <div className="space-y-0.5 text-xs pt-1">
                <p className="font-bold text-[#102B50]">{resumeData.project2Title}</p>
                <p className="text-slate-700 leading-relaxed text-[11px]">
                  {resumeData.project2Desc}
                </p>
              </div>
            </div>

            {/* Certifications */}
            <div className="mt-4 space-y-1">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#102B50] border-b border-slate-300 pb-0.5">
                Certifications & Accreditations
              </h3>
              <ul className="list-disc list-inside text-xs text-slate-700 space-y-0.5 pt-1">
                <li>{resumeData.certification1}</li>
                <li>{resumeData.certification2}</li>
              </ul>
            </div>

            {/* Collegiate Verification Seal */}
            <div className="mt-8 pt-4 border-t border-slate-300 flex items-center justify-between text-[10px] text-slate-500">
              <span>Verified Transcript: KMV Training & Placement Cell</span>
              <span>Autonomous Collegiate Format • Batch 2026</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
