import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { CheckCircle2, BookOpen, Code2, Video, FileText, ArrowRight, Lightbulb, Users, Target } from 'lucide-react';

interface CareerPrepPageProps {
  onNavigate: (page: string) => void;
}

export const CareerPrepPage: React.FC<CareerPrepPageProps> = ({ onNavigate }) => {
  const { user, setAuthModal } = useAuth();

  const handleToolClick = (studentTab: string) => {
    if (user && user.role === 'student') {
      onNavigate(`student/${studentTab}`);
    } else {
      setAuthModal('login');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="border-b border-[#DCE8F7] pb-6">
        <span className="text-xs font-bold uppercase tracking-wider text-[#0D6EFD]">
          Career Readiness & Preparation
        </span>
        <h1 className="text-3xl font-extrabold text-[#102B50] mt-1">
          Prepare for Campus Recruitment Drives
        </h1>
        <p className="text-xs sm:text-sm text-[#6B85A8] mt-1">
          Master every stage of recruitment: quantitative aptitude, coding assessments, group discussions, and technical HR rounds.
        </p>
      </div>

      {/* 4 Interactive Prep Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pillar 1: Aptitude */}
        <div className="bg-white rounded-2xl border border-[#DCE8F7] p-6 space-y-4 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#0D6EFD]/10 text-[#0D6EFD] flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-[#16345C]">Quantitative & Logical Aptitude</h3>
              <p className="text-xs text-[#6B85A8]">Speed, accuracy, and analytical deduction</p>
            </div>
          </div>
          <p className="text-xs text-[#16345C] leading-relaxed">
            Covers Speed-Time-Distance, Work & Wages, Simple & Compound Interest, Permutation-Combination, Syllogisms, Blood Relations, and Data Interpretation. Practice with realistic timers and detailed solution breakdowns.
          </p>
          <div className="pt-2 flex items-center justify-between">
            <span className="text-xs font-semibold text-[#0D6EFD]">15 Diagnostic Questions</span>
            <button
              onClick={() => handleToolClick('aptitude')}
              className="px-4 py-2 rounded-lg bg-[#0D6EFD] hover:bg-[#2563EB] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <span>Take Aptitude Test</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Pillar 2: Coding Arena */}
        <div className="bg-white rounded-2xl border border-[#DCE8F7] p-6 space-y-4 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#0D6EFD]/10 text-[#0D6EFD] flex items-center justify-center">
              <Code2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-[#16345C]">Coding & Problem Solving Arena</h3>
              <p className="text-xs text-[#6B85A8]">Core DSA patterns tested in corporate rounds</p>
            </div>
          </div>
          <p className="text-xs text-[#16345C] leading-relaxed">
            Solve problems on Arrays, Strings, Hash Maps, Linked Lists, Trees, and Dynamic Programming. Multi-language code editor with instant test runner and time complexity analysis.
          </p>
          <div className="pt-2 flex items-center justify-between">
            <span className="text-xs font-semibold text-[#0D6EFD]">Curated LeetCode-style Problems</span>
            <button
              onClick={() => handleToolClick('coding-arena')}
              className="px-4 py-2 rounded-lg bg-[#0D6EFD] hover:bg-[#2563EB] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <span>Open Coding Arena</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Pillar 3: Mock Interviews */}
        <div className="bg-white rounded-2xl border border-[#DCE8F7] p-6 space-y-4 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#0D6EFD]/10 text-[#0D6EFD] flex items-center justify-center">
              <Video className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-[#16345C]">Simulated Mock Interviews</h3>
              <p className="text-xs text-[#6B85A8]">Technical deep-dive & Behavioral HR</p>
            </div>
          </div>
          <p className="text-xs text-[#16345C] leading-relaxed">
            Practice actual questions asked by TCS, Infosys, and Deloitte interviewers. Learn how to structure answers using the STAR method (Situation, Task, Action, Result) with actionable evaluations.
          </p>
          <div className="pt-2 flex items-center justify-between">
            <span className="text-xs font-semibold text-[#0D6EFD]">Technical & HR Practice</span>
            <button
              onClick={() => handleToolClick('mock-interview')}
              className="px-4 py-2 rounded-lg bg-[#0D6EFD] hover:bg-[#2563EB] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <span>Practice Interview</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Pillar 4: Resume Builder */}
        <div className="bg-white rounded-2xl border border-[#DCE8F7] p-6 space-y-4 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#0D6EFD]/10 text-[#0D6EFD] flex items-center justify-center">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-[#16345C]">ATS Resume Builder</h3>
              <p className="text-xs text-[#6B85A8]">Verified single-page collegiate template</p>
            </div>
          </div>
          <p className="text-xs text-[#16345C] leading-relaxed">
            Generate clean, ATS-compliant resumes with verified collegiate headers, highlighted project links, technical skills, and academic CGPA transcripts ready for 1-click print or download.
          </p>
          <div className="pt-2 flex items-center justify-between">
            <span className="text-xs font-semibold text-[#0D6EFD]">Approved Format</span>
            <button
              onClick={() => handleToolClick('resume-builder')}
              className="px-4 py-2 rounded-lg bg-[#0D6EFD] hover:bg-[#2563EB] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <span>Create Resume</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
