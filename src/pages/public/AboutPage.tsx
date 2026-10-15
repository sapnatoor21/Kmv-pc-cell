import React from 'react';
import { GraduationCap, Award, Building, Users, CheckCircle2, Shield, ArrowRight } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="border-b border-[#DCE8F7] pb-8">
        <span className="text-xs font-bold uppercase tracking-wider text-[#0D6EFD]">
          Institutional Heritage & Excellence
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#102B50] mt-1">
          About Kanya Maha Vidyalaya (Autonomous)
        </h1>
        <p className="text-sm text-[#6B85A8] mt-2 max-w-3xl leading-relaxed">
          Pioneering women's higher education since 1886. Kanya Maha Vidyalaya, Jalandhar is a premier autonomous institution recognized by the University Grants Commission (UGC) with Heritage College Status and Grade 'A' accreditation by NAAC.
        </p>
      </div>

      {/* Key Accreditations */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl border border-[#DCE8F7] p-6 space-y-3 shadow-xs">
          <div className="w-12 h-12 rounded-xl bg-[#0D6EFD]/10 text-[#0D6EFD] flex items-center justify-center font-bold">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg text-[#16345C]">Heritage Institution</h3>
          <p className="text-xs text-[#6B85A8] leading-relaxed">
            Conferred Heritage Status by the University Grants Commission (UGC), Government of India, recognizing over a century of academic eminence and nation building.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-[#DCE8F7] p-6 space-y-3 shadow-xs">
          <div className="w-12 h-12 rounded-xl bg-[#102B50]/10 text-[#102B50] flex items-center justify-center font-bold">
            <Building className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg text-[#16345C]">UGC Autonomous College</h3>
          <p className="text-xs text-[#6B85A8] leading-relaxed">
            Empowered with autonomy to design industry-aligned curricula, credit-based continuous evaluations, and specialized cutting-edge skill certifications.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-[#DCE8F7] p-6 space-y-3 shadow-xs">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <Shield className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg text-[#16345C]">DBT Star Status</h3>
          <p className="text-xs text-[#6B85A8] leading-relaxed">
            Awarded Star College Status by the Department of Biotechnology (DBT), Ministry of Science & Technology, fostering world-class scientific research laboratories.
          </p>
        </div>
      </div>

      {/* Placement Cell Mission & Leadership */}
      <div className="bg-white rounded-2xl border border-[#DCE8F7] p-8 space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0D6EFD]">
            Training & Placement Cell
          </span>
          <h2 className="text-2xl font-bold text-[#102B50]">Our Strategic Mission & Objectives</h2>
        </div>
        <p className="text-xs sm:text-sm text-[#6B85A8] leading-relaxed">
          The Training and Placement Cell at KMV functions as a dynamic nodal interface between graduating students and corporate organizations. Our objective is to ensure that every student is equipped with the core domain knowledge, analytical capabilities, soft skills, and professional demeanor necessary to excel in multinational work environments.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="flex items-start gap-3 p-4 rounded-xl bg-[#F3F7FC] border border-[#DCE8F7]">
            <CheckCircle2 className="w-5 h-5 text-[#0D6EFD] flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-xs text-[#16345C]">Industry-Academia Integration</h4>
              <p className="text-xs text-[#6B85A8] mt-0.5">
                Regular guest lectures, CXO roundtables, and industrial internships with corporate giants.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl bg-[#F3F7FC] border border-[#DCE8F7]">
            <CheckCircle2 className="w-5 h-5 text-[#0D6EFD] flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-xs text-[#16345C]">Transparent Recruitment System</h4>
              <p className="text-xs text-[#6B85A8] mt-0.5">
                Centralized database tracking student eligibility, round progress, and verified offer letters without bias.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl bg-[#F3F7FC] border border-[#DCE8F7]">
            <CheckCircle2 className="w-5 h-5 text-[#0D6EFD] flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-xs text-[#16345C]">Holistic Personality Grooming</h4>
              <p className="text-xs text-[#6B85A8] mt-0.5">
                Mock interviews, resume clinics, group discussions, and technical coding hackathons.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl bg-[#F3F7FC] border border-[#DCE8F7]">
            <CheckCircle2 className="w-5 h-5 text-[#0D6EFD] flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-xs text-[#16345C]">One Student, One Dream Job Policy</h4>
              <p className="text-xs text-[#6B85A8] mt-0.5">
                Ensuring equitable employment distribution across the graduating batch while encouraging higher tiers.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Corporate Partners */}
      <div className="bg-[#102B50] rounded-2xl p-8 text-white space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h3 className="text-2xl font-bold">Our Esteemed Recruitment Partners</h3>
          <p className="text-xs text-slate-300">
            Leading enterprises consistently recruit from Kanya Maha Vidyalaya for software, analytical, and management roles.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 font-bold text-sm">
            Tata Consultancy Services
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 font-bold text-sm">
            Deloitte India
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 font-bold text-sm">
            Infosys Limited
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 font-bold text-sm">
            Wipro Technologies
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 font-bold text-sm">
            Capgemini
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 font-bold text-sm">
            Cognizant
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 font-bold text-sm">
            HCLTech
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 font-bold text-sm">
            Accenture
          </div>
        </div>
      </div>
    </div>
  );
};
