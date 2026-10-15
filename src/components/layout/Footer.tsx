import React from 'react';
import { GraduationCap, Mail, Phone, MapPin, ExternalLink, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#102B50] text-white border-t border-[#102B50] pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-white/10">
          {/* Column 1: Institution Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#0D6EFD] flex items-center justify-center text-white">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-lg tracking-tight">KANYA MAHA VIDYALAYA</h4>
                <p className="text-xs text-[#6B85A8]">Autonomous Heritage College • Estd. 1886</p>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed pr-6">
              The Training & Placement Cell at KMV bridges academia and high-growth industry. We empower young women through rigorous technical aptitude, professional etiquette, corporate internships, and high-impact placement drives.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="px-2.5 py-1 rounded-md bg-white/10 text-white text-[11px] font-semibold">
                UGC Heritage Status
              </span>
              <span className="px-2.5 py-1 rounded-md bg-white/10 text-white text-[11px] font-semibold">
                DBT Star Status
              </span>
              <span className="px-2.5 py-1 rounded-md bg-white/10 text-white text-[11px] font-semibold">
                NAAC Grade 'A'
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-[#6B85A8]">Quick Navigation</h5>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors">
                  About KMV
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('opportunities')} className="hover:text-white transition-colors">
                  Explore Opportunities
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('drives')} className="hover:text-white transition-colors">
                  Placement Drives
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('stories')} className="hover:text-white transition-colors">
                  Success Stories
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Student Tools */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-[#6B85A8]">Career Preparation</h5>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button onClick={() => onNavigate('career-prep')} className="hover:text-white transition-colors">
                  Aptitude Preparation
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('career-prep')} className="hover:text-white transition-colors">
                  Technical Question Bank
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('career-prep')} className="hover:text-white transition-colors">
                  Group Discussion Tips
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('resources')} className="hover:text-white transition-colors">
                  ATS Resume Templates
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('resources')} className="hover:text-white transition-colors">
                  Company Syllabus Guides
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Cell Office */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-[#6B85A8]">Placement Cell Office</h5>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#0D6EFD] flex-shrink-0 mt-0.5" />
                <span>Vidyalaya Marg, Tanda Road, Jalandhar - 144004, Punjab</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#0D6EFD] flex-shrink-0" />
                <span>+91 181 2296605 / 2296606</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#0D6EFD] flex-shrink-0" />
                <span>placement@kmv.ac.in</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© 2026 Kanya Maha Vidyalaya (Autonomous). All Rights Reserved. KMV Placement Cell.</p>
          <div className="flex items-center gap-6">
            <span>Designed for Excellence</span>
            <span>Accredited NAAC 'A'</span>
            <span>UGC Autonomous College</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
