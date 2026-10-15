import React from 'react';
import { Award, Briefcase, GraduationCap, Building2, Quote } from 'lucide-react';

export const SuccessStoriesPage: React.FC = () => {
  const stories = [
    {
      name: 'Simran Kaur',
      course: 'Bachelor of Computer Applications (BCA)',
      batch: '2023 - 2026',
      company: 'Tata Consultancy Services',
      role: 'Assistant System Engineer (Digital)',
      package: '7.5 LPA',
      quote:
        'KMV Placement Cell provided targeted mock sessions and coding interview preparation that made all the difference during the TCS campus drive.',
    },
    {
      name: 'Harpreet Bhatia',
      course: 'BCA',
      batch: '2023 - 2026',
      company: 'Deloitte India',
      role: 'Associate Analyst - Technology Risk',
      package: '8.2 LPA',
      quote:
        'The autonomous curriculum at KMV enabled me to master SQL, risk modeling, and business communications. I am deeply grateful to our placement mentors.',
    },
    {
      name: 'Gurleen Sandhu',
      course: 'Master of Computer Applications (MCA)',
      batch: '2024 - 2026',
      company: 'Infosys Limited',
      role: 'Specialist Programmer',
      package: '9.5 LPA',
      quote:
        'Coding arena practices and faculty guidance helped me tackle hard dynamic programming challenges during the HackWithInfy selection round.',
    },
    {
      name: 'Navjot Kaur',
      course: 'B.Sc Information Technology',
      batch: '2022 - 2025',
      company: 'Wipro Technologies',
      role: 'Project Engineer',
      package: '6.5 LPA',
      quote:
        'From resume drafting to technical grilling, KMV Placement Cell prepared me for every hurdle. The entire process was seamless and transparent.',
    },
    {
      name: 'Amanpreet Sharma',
      course: 'B.Com (Professional)',
      batch: '2022 - 2025',
      company: 'Ernst & Young (EY)',
      role: 'Audit & Assurance Associate',
      package: '5.8 LPA',
      quote:
        'The pre-placement workshops conducted in the KMV auditorium built my analytical clarity and interview presentation skills.',
    },
    {
      name: 'Manpreet Virdi',
      course: 'M.Sc Information Technology',
      batch: '2023 - 2025',
      company: 'Capgemini India',
      role: 'Senior Software Analyst',
      package: '7.2 LPA',
      quote:
        'KMV has established exceptional industry partnerships. Being recruited on-campus gave my technology career the highest possible boost.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="border-b border-[#DCE8F7] pb-6">
        <span className="text-xs font-bold uppercase tracking-wider text-[#0D6EFD]">
          Verified Achievements
        </span>
        <h1 className="text-3xl font-extrabold text-[#102B50] mt-1">
          KMV Placement Success Stories & Testimonials
        </h1>
        <p className="text-xs sm:text-sm text-[#6B85A8] mt-1">
          Real stories of transformation, resilience, and campus placements from Kanya Maha Vidyalaya alumni.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map((story, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl border border-[#DCE8F7] p-6 shadow-xs hover:border-[#0D6EFD]/40 transition-all flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-full bg-[#102B50] text-white font-bold flex items-center justify-center text-sm shadow-xs">
                  {story.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#0D6EFD]/10 text-[#0D6EFD]">
                  {story.package}
                </span>
              </div>

              <div>
                <h3 className="font-bold text-base text-[#16345C]">{story.name}</h3>
                <p className="text-xs text-[#6B85A8]">{story.course} • Batch {story.batch}</p>
              </div>

              <div className="p-3 bg-[#F3F7FC] rounded-xl border border-[#DCE8F7] space-y-0.5">
                <p className="text-xs font-bold text-[#102B50] flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-[#0D6EFD]" /> {story.company}
                </p>
                <p className="text-[11px] text-[#6B85A8] pl-5">{story.role}</p>
              </div>

              <div className="relative pl-6 pt-1">
                <Quote className="w-4 h-4 text-[#0D6EFD]/30 absolute left-0 top-0" />
                <p className="text-xs text-[#16345C] leading-relaxed italic">
                  "{story.quote}"
                </p>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
              <span>Verified On-Campus Offer</span>
              <span className="text-emerald-600 font-semibold flex items-center gap-1">
                ✓ Verified
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
