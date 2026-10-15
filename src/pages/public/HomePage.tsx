import React from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  ArrowRight,
  Briefcase,
  GraduationCap,
  CheckCircle,
  FileText,
  Code2,
  Calendar,
  Building2,
  TrendingUp,
  Award,
  ChevronRight,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { dbStore } from '../../services/dbStore';
import { StatusBadge } from '../../components/common/Badge';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { user, setAuthModal } = useAuth();
  const drives = dbStore.getDrives().slice(0, 3);
  const announcements = dbStore.getAnnouncements().slice(0, 3);

  return (
    <div className="space-y-16 pb-16">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#F3F7FC] to-[#F3F7FC] border-b border-[#DCE8F7] pt-12 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headlines & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0D6EFD]/10 border border-[#0D6EFD]/20 text-xs font-semibold text-[#0D6EFD]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Kanya Maha Vidyalaya (Autonomous) • Placement Season 2025-26</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#102B50] tracking-tight leading-[1.12]">
                Build your career. <br />
                <span className="text-[#0D6EFD]">Prepare with confidence.</span>
              </h1>

              <p className="text-base sm:text-lg text-[#6B85A8] leading-relaxed max-w-2xl">
                Welcome to the official placement and career development portal of Kanya Maha Vidyalaya, Jalandhar. Connecting ambitious women with premier global technology, consulting, and finance leaders.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => onNavigate('opportunities')}
                  className="px-6 py-3.5 rounded-xl bg-[#0D6EFD] hover:bg-[#2563EB] text-white font-semibold text-sm transition-all flex items-center gap-2 shadow-sm cursor-pointer"
                >
                  <Briefcase className="w-4 h-4" />
                  <span>Explore Opportunities</span>
                </button>

                <button
                  onClick={() => onNavigate('about')}
                  className="px-6 py-3.5 rounded-xl bg-white hover:bg-[#F3F7FC] border border-[#DCE8F7] text-[#16345C] font-semibold text-sm transition-all flex items-center gap-2 shadow-2xs cursor-pointer"
                >
                  <span>Learn More About KMV</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Trust Badges */}
              <div className="pt-6 border-t border-[#DCE8F7] grid grid-cols-3 gap-4">
                <div>
                  <p className="text-2xl font-bold text-[#102B50]">140+</p>
                  <p className="text-xs text-[#6B85A8]">Years of Legacy (1886)</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#0D6EFD]">9.5 LPA</p>
                  <p className="text-xs text-[#6B85A8]">Highest Campus CTC</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-emerald-600">88%+</p>
                  <p className="text-xs text-[#6B85A8]">Placement Assistance</p>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Card / Visual */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl border border-[#DCE8F7] shadow-xl p-6 relative">
                <div className="flex items-center justify-between pb-4 border-b border-[#DCE8F7]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#0D6EFD] text-white flex items-center justify-center font-bold">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[#102B50]">KMV Student Gateway</h3>
                      <p className="text-[11px] text-[#6B85A8]">Verified Placement Cell Access</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Active Drives
                  </span>
                </div>

                <div className="mt-4 space-y-3">
                  <div className="p-3.5 rounded-xl bg-[#F3F7FC] border border-[#DCE8F7] flex items-center justify-between">
                    <div className="space-y-0.5">
                      <p className="text-xs font-bold text-[#16345C]">TCS Ninja & Digital 2026</p>
                      <p className="text-[11px] text-[#6B85A8]">Package: 7.5 LPA • BCA / MCA / IT</p>
                    </div>
                    <span className="text-xs font-semibold text-[#0D6EFD]">Open</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#F3F7FC] border border-[#DCE8F7] flex items-center justify-between">
                    <div className="space-y-0.5">
                      <p className="text-xs font-bold text-[#16345C]">Deloitte Technology Risk</p>
                      <p className="text-[11px] text-[#6B85A8]">Package: 8.2 LPA • Tech Advisory</p>
                    </div>
                    <span className="text-xs font-semibold text-[#0D6EFD]">Open</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#F3F7FC] border border-[#DCE8F7] flex items-center justify-between">
                    <div className="space-y-0.5">
                      <p className="text-xs font-bold text-[#16345C]">Infosys Specialist Programmer</p>
                      <p className="text-[11px] text-[#6B85A8]">Package: 9.5 LPA • Power Programmer</p>
                    </div>
                    <span className="text-xs font-semibold text-[#0D6EFD]">Open</span>
                  </div>
                </div>

                {/* Portal Sign-in Box inside Hero */}
                <div className="mt-6 pt-5 border-t border-[#DCE8F7]">
                  {user ? (
                    <div className="space-y-2">
                      <p className="text-xs text-[#6B85A8]">
                        Signed in as <span className="font-bold text-[#16345C]">{user.name}</span> ({user.role})
                      </p>
                      <button
                        onClick={() => {
                          if (user.role === 'student') onNavigate('student/dashboard');
                          else if (user.role === 'recruiter') onNavigate('recruiter/dashboard');
                          else onNavigate('admin/dashboard');
                        }}
                        className="w-full py-2.5 rounded-xl bg-[#102B50] hover:bg-[#16345C] text-white text-xs font-semibold transition-colors flex items-center justify-center gap-2"
                      >
                        <span>Open My Portal</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setAuthModal('login')}
                        className="py-2.5 rounded-xl bg-[#102B50] hover:bg-[#16345C] text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                      >
                        <span>Sign In</span>
                      </button>
                      <button
                        onClick={() => setAuthModal('register')}
                        className="py-2.5 rounded-xl bg-[#0D6EFD] hover:bg-[#2563EB] text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                      >
                        <span>Student Register</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LATEST UPDATES / NOTICEBOARD */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0D6EFD] animate-ping" />
              <h2 className="text-xl font-bold text-[#102B50]">Latest Updates & Notices</h2>
            </div>
            <p className="text-xs text-[#6B85A8] mt-1">Official circulars from KMV Placement Cell</p>
          </div>
          <button
            onClick={() => onNavigate('about')}
            className="text-xs font-semibold text-[#0D6EFD] hover:underline flex items-center gap-1"
          >
            <span>View Placement Policies</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {announcements.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl border border-[#DCE8F7] p-5 shadow-xs hover:border-[#0D6EFD]/40 transition-all flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#0D6EFD]/10 text-[#0D6EFD]">
                    {item.category.replace('_', ' ')}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="font-bold text-sm text-[#16345C] leading-snug">{item.title}</h3>
                <p className="text-xs text-[#6B85A8] line-clamp-3 leading-relaxed">
                  {item.content}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                <span>By: {item.authorName}</span>
                <span className="text-[#0D6EFD] font-semibold">Official Circular</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PLACEMENT DRIVES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-[#102B50]">Featured Placement Drives</h2>
            <p className="text-xs text-[#6B85A8] mt-1">
              Active campus opportunities with verified compensation and eligibility
            </p>
          </div>
          <button
            onClick={() => onNavigate('opportunities')}
            className="px-4 py-2 rounded-lg bg-white border border-[#DCE8F7] hover:border-[#0D6EFD] text-xs font-semibold text-[#16345C] hover:text-[#0D6EFD] transition-all flex items-center gap-1.5 shadow-2xs"
          >
            <span>View All Drives</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {drives.map((drive) => (
            <div
              key={drive.id}
              className="bg-white rounded-2xl border border-[#DCE8F7] p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-xl bg-[#F3F7FC] border border-[#DCE8F7] flex items-center justify-center text-[#102B50] font-bold text-lg">
                    {drive.companyName.charAt(0)}
                  </div>
                  <StatusBadge status={drive.status} />
                </div>

                <div>
                  <h3 className="font-bold text-base text-[#16345C] leading-snug">{drive.jobTitle}</h3>
                  <p className="text-xs font-semibold text-[#0D6EFD] mt-0.5">{drive.companyName}</p>
                </div>

                <div className="space-y-1.5 text-xs text-[#6B85A8] py-2 border-y border-[#DCE8F7]/60">
                  <div className="flex items-center justify-between">
                    <span>Package:</span>
                    <span className="font-bold text-[#102B50]">{drive.ctcSalary}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Location:</span>
                    <span className="font-medium text-[#16345C]">{drive.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Eligibility:</span>
                    <span className="font-medium text-[#16345C]">Min CGPA {drive.eligibilityCriteria.minCgpa}</span>
                  </div>
                </div>

                <div>
                  <span className="text-[11px] font-semibold text-[#6B85A8] block mb-1.5">Required Skills:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {drive.skillsRequired.slice(0, 3).map((s, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-[#F3F7FC] border border-[#DCE8F7] text-[11px] text-[#16345C]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-[#6B85A8]">
                  Deadline: {new Date(drive.applicationDeadline).toLocaleDateString()}
                </span>
                <button
                  onClick={() => onNavigate('opportunities')}
                  className="px-3.5 py-1.5 rounded-lg bg-[#0D6EFD] hover:bg-[#2563EB] text-white text-xs font-semibold transition-colors"
                >
                  View & Apply
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CAREER PREPARATION SUITE */}
      <section className="bg-white border-y border-[#DCE8F7] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0D6EFD]">
              Integrated Career Development
            </span>
            <h2 className="text-3xl font-extrabold text-[#102B50] mt-1">
              End-to-End Placement Preparation
            </h2>
            <p className="text-xs sm:text-sm text-[#6B85A8] mt-2">
              Equipping every KMV student with technical mastery, analytical reasoning, and polished communication for competitive campus placements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-[#F3F7FC] border border-[#DCE8F7] space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#0D6EFD]/10 text-[#0D6EFD] flex items-center justify-center">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-[#16345C]">Aptitude Test Practice</h3>
              <p className="text-xs text-[#6B85A8] leading-relaxed">
                Quantitative aptitude, data interpretation, and verbal reasoning test simulations with timers and score analytics.
              </p>
              <button
                onClick={() => onNavigate('career-prep')}
                className="text-xs font-semibold text-[#0D6EFD] hover:underline inline-flex items-center gap-1"
              >
                <span>Practice Aptitude</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="p-6 rounded-2xl bg-[#F3F7FC] border border-[#DCE8F7] space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#0D6EFD]/10 text-[#0D6EFD] flex items-center justify-center">
                <Code2 className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-[#16345C]">Interactive Coding Arena</h3>
              <p className="text-xs text-[#6B85A8] leading-relaxed">
                Curated data structure and algorithm challenges with multiple language support and test cases validation.
              </p>
              <button
                onClick={() => onNavigate('career-prep')}
                className="text-xs font-semibold text-[#0D6EFD] hover:underline inline-flex items-center gap-1"
              >
                <span>Code Challenges</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="p-6 rounded-2xl bg-[#F3F7FC] border border-[#DCE8F7] space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#0D6EFD]/10 text-[#0D6EFD] flex items-center justify-center">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-[#16345C]">Smart Resume Builder</h3>
              <p className="text-xs text-[#6B85A8] leading-relaxed">
                Build ATS-optimized single page resumes approved by KMV placement coordinators with 1-click printable PDF.
              </p>
              <button
                onClick={() => onNavigate('career-prep')}
                className="text-xs font-semibold text-[#0D6EFD] hover:underline inline-flex items-center gap-1"
              >
                <span>Build Resume</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="p-6 rounded-2xl bg-[#F3F7FC] border border-[#DCE8F7] space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#0D6EFD]/10 text-[#0D6EFD] flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-[#16345C]">Mock Interviews</h3>
              <p className="text-xs text-[#6B85A8] leading-relaxed">
                Simulated technical and HR interview questions with structured scoring criteria and STAR answer frameworks.
              </p>
              <button
                onClick={() => onNavigate('career-prep')}
                className="text-xs font-semibold text-[#0D6EFD] hover:underline inline-flex items-center gap-1"
              >
                <span>Start Mock Session</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* VERIFIED SUCCESS STORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-[#102B50]">KMV Placement Success Stories</h2>
            <p className="text-xs text-[#6B85A8] mt-1">
              Celebrating verified student placements across premier corporate leaders
            </p>
          </div>
          <button
            onClick={() => onNavigate('stories')}
            className="text-xs font-semibold text-[#0D6EFD] hover:underline flex items-center gap-1"
          >
            <span>View All Stories</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl border border-[#DCE8F7] p-6 space-y-4 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#102B50] text-white font-bold flex items-center justify-center text-sm">
                HB
              </div>
              <div>
                <h4 className="font-bold text-sm text-[#16345C]">Harpreet Bhatia</h4>
                <p className="text-xs text-[#6B85A8]">BCA (Batch 2023-26)</p>
              </div>
            </div>
            <div className="p-3 bg-[#F3F7FC] rounded-xl border border-[#DCE8F7] space-y-1">
              <p className="text-xs font-bold text-[#102B50]">Placed at: Tata Consultancy Services</p>
              <p className="text-xs text-[#0D6EFD] font-semibold">Role: Assistant System Engineer (7.5 LPA)</p>
            </div>
            <p className="text-xs text-[#6B85A8] leading-relaxed italic">
              "The structured aptitude tests and coding arena on the KMV portal gave me complete confidence to clear the TCS National Qualifier Test on my first attempt."
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-[#DCE8F7] p-6 space-y-4 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#0D6EFD] text-white font-bold flex items-center justify-center text-sm">
                SK
              </div>
              <div>
                <h4 className="font-bold text-sm text-[#16345C]">Simranjit Kaur</h4>
                <p className="text-xs text-[#6B85A8]">MCA (Batch 2024-26)</p>
              </div>
            </div>
            <div className="p-3 bg-[#F3F7FC] rounded-xl border border-[#DCE8F7] space-y-1">
              <p className="text-xs font-bold text-[#102B50]">Placed at: Deloitte India</p>
              <p className="text-xs text-[#0D6EFD] font-semibold">Role: Associate Analyst (8.2 LPA)</p>
            </div>
            <p className="text-xs text-[#6B85A8] leading-relaxed italic">
              "KMV Placement Cell mock interview sessions helped me articulate my cloud and database projects effectively during the technical case study round."
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-[#DCE8F7] p-6 space-y-4 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-emerald-700 text-white font-bold flex items-center justify-center text-sm">
                PK
              </div>
              <div>
                <h4 className="font-bold text-sm text-[#16345C]">Pooja Kumari</h4>
                <p className="text-xs text-[#6B85A8]">B.Sc IT (Batch 2023-26)</p>
              </div>
            </div>
            <div className="p-3 bg-[#F3F7FC] rounded-xl border border-[#DCE8F7] space-y-1">
              <p className="text-xs font-bold text-[#102B50]">Placed at: Infosys Limited</p>
              <p className="text-xs text-[#0D6EFD] font-semibold">Role: Systems Associate (6.5 LPA)</p>
            </div>
            <p className="text-xs text-[#6B85A8] leading-relaxed italic">
              "The faculty mentoring and company-specific preparation guides available on the portal made campus recruitment effortless and transparent."
            </p>
          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#102B50] to-[#16345C] rounded-3xl p-8 sm:p-12 text-white text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="space-y-3 max-w-xl">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Ready to embark on your professional journey?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Create your verified student profile today to unlock campus drives, personalized aptitude evaluations, and recruiter shortlisting.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            {user ? (
              <button
                onClick={() => onNavigate('student/dashboard')}
                className="px-6 py-3.5 rounded-xl bg-[#0D6EFD] hover:bg-[#2563EB] text-white font-semibold text-sm transition-colors shadow-sm"
              >
                Go to Student Portal
              </button>
            ) : (
              <>
                <button
                  onClick={() => setAuthModal('register')}
                  className="px-6 py-3.5 rounded-xl bg-[#0D6EFD] hover:bg-[#2563EB] text-white font-semibold text-sm transition-colors shadow-sm"
                >
                  Register as Student
                </button>
                <button
                  onClick={() => setAuthModal('login')}
                  className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition-colors"
                >
                  Recruiter Sign In
                </button>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
