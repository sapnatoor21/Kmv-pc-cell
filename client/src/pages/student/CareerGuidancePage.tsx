import React from 'react';
import { Compass, Lightbulb, Target, CheckCircle2, Award, Users, ArrowRight } from 'lucide-react';

export const CareerGuidancePage: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="border-b border-[#DCE8F7] pb-4">
        <span className="text-xs font-bold uppercase tracking-wider text-[#0D6EFD]">
          KMV Placement Advisory
        </span>
        <h2 className="text-2xl font-bold text-[#102B50] mt-1">
          Career Guidance & Campus Placement Roadmap
        </h2>
        <p className="text-xs sm:text-sm text-[#6B85A8]">
          Proven strategies, resume optimization tactics, and interview etiquette for final year students.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl border border-[#DCE8F7] p-6 space-y-3 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-[#0D6EFD]/10 text-[#0D6EFD] flex items-center justify-center font-bold">
            <Target className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-[#16345C]">Resume Optimization (ATS)</h3>
          <p className="text-xs text-[#6B85A8] leading-relaxed">
            Ensure your resume includes keywords matching corporate job descriptions. Use active verbs (Architected, Engineered, Decreased latency by 30%) rather than passive phrases.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-[#DCE8F7] p-6 space-y-3 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-[#0D6EFD]/10 text-[#0D6EFD] flex items-center justify-center font-bold">
            <Lightbulb className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-[#16345C]">STAR Behavioral Framework</h3>
          <p className="text-xs text-[#6B85A8] leading-relaxed">
            Structure situational answers: Situation (context), Task (challenge faced), Action (your specific contribution), and Result (quantifiable positive impact).
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-[#DCE8F7] p-6 space-y-3 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-[#0D6EFD]/10 text-[#0D6EFD] flex items-center justify-center font-bold">
            <Users className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-[#16345C]">Group Discussion Mastery</h3>
          <p className="text-xs text-[#6B85A8] leading-relaxed">
            Listen attentively, acknowledge previous speakers, substantiate points with verified real-world examples, and avoid aggressive interruptions.
          </p>
        </div>
      </div>

      {/* 4-Phase Campus Placement Roadmap */}
      <div className="bg-white rounded-2xl border border-[#DCE8F7] p-8 space-y-6 shadow-xs">
        <h3 className="font-bold text-lg text-[#102B50]">
          The 4-Phase KMV Placement Strategy
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-[#F3F7FC] border border-[#DCE8F7] space-y-2">
            <span className="w-6 h-6 rounded-full bg-[#102B50] text-white flex items-center justify-center font-bold text-xs">
              1
            </span>
            <h4 className="font-bold text-xs text-[#16345C]">Phase 1: Foundations</h4>
            <p className="text-[11px] text-[#6B85A8] leading-relaxed">
              Consolidate academic CGPA above 7.0. Complete Core CS (OOPS, DBMS, OS) and solve 50+ DSA problems.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#F3F7FC] border border-[#DCE8F7] space-y-2">
            <span className="w-6 h-6 rounded-full bg-[#102B50] text-white flex items-center justify-center font-bold text-xs">
              2
            </span>
            <h4 className="font-bold text-xs text-[#16345C]">Phase 2: Aptitude Drill</h4>
            <p className="text-[11px] text-[#6B85A8] leading-relaxed">
              Practice timed quantitative and logical diagnostic tests on the portal. Aim for 80%+ accuracy.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#F3F7FC] border border-[#DCE8F7] space-y-2">
            <span className="w-6 h-6 rounded-full bg-[#102B50] text-white flex items-center justify-center font-bold text-xs">
              3
            </span>
            <h4 className="font-bold text-xs text-[#16345C]">Phase 3: Portfolio & Projects</h4>
            <p className="text-[11px] text-[#6B85A8] leading-relaxed">
              Build 2 end-to-end full stack projects with live deployments and clean GitHub code repositories.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#F3F7FC] border border-[#DCE8F7] space-y-2">
            <span className="w-6 h-6 rounded-full bg-[#0D6EFD] text-white flex items-center justify-center font-bold text-xs">
              4
            </span>
            <h4 className="font-bold text-xs text-[#0D6EFD]">Phase 4: Drive Conversion</h4>
            <p className="text-[11px] text-[#6B85A8] leading-relaxed">
              Attend pre-placement talks, participate in national qualifiers (NQT, InfyTQ), and excel in technical case rounds.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
