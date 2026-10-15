import React, { useState } from 'react';
import { dbStore } from '../../services/dbStore';
import { ResourceItem } from '../../types';
import { BookOpen, Download, FileText, Search, Tag, CheckCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const ResourcesPage: React.FC = () => {
  const { showToast } = useAuth();
  const [resources, setResources] = useState<ResourceItem[]>(dbStore.getResources());
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [search, setSearch] = useState<string>('');

  const categories = [
    { id: 'All', label: 'All Resources' },
    { id: 'aptitude', label: 'Aptitude & Formulas' },
    { id: 'technical', label: 'Technical Core CS' },
    { id: 'resume_templates', label: 'Resume Formats' },
    { id: 'hr_interview', label: 'HR & Behavioral' },
  ];

  const filtered = resources.filter((res) => {
    const matchCat = selectedCategory === 'All' || res.category === selectedCategory;
    const matchSearch =
      res.title.toLowerCase().includes(search.toLowerCase()) ||
      res.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleDownload = (res: ResourceItem) => {
    showToast(`Downloading "${res.title}" (${res.fileSize})`, 'info');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="border-b border-[#DCE8F7] pb-6">
        <span className="text-xs font-bold uppercase tracking-wider text-[#0D6EFD]">
          Curated Placement Material
        </span>
        <h1 className="text-3xl font-extrabold text-[#102B50] mt-1">
          Career Resources & Interview Handbooks
        </h1>
        <p className="text-xs sm:text-sm text-[#6B85A8] mt-1">
          Download officially vetted study materials, aptitude formula guides, technical cheat sheets, and resume formats.
        </p>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Category tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-[#0D6EFD] text-white shadow-2xs'
                  : 'bg-white border border-[#DCE8F7] text-[#16345C] hover:border-[#0D6EFD]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="w-full sm:w-72 relative">
          <Search className="w-4 h-4 text-[#6B85A8] absolute left-3 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search resources..."
            className="w-full pl-9 pr-3 py-2 bg-white border border-[#DCE8F7] rounded-lg text-xs text-[#16345C] placeholder:text-[#6B85A8] focus:outline-hidden focus:border-[#0D6EFD]"
          />
        </div>
      </div>

      {/* Resource Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((res) => (
          <div
            key={res.id}
            className="bg-white rounded-2xl border border-[#DCE8F7] p-6 shadow-xs hover:border-[#0D6EFD]/50 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#0D6EFD]/10 text-[#0D6EFD]">
                  {res.category.replace('_', ' ')}
                </span>
                <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-bold">
                  {res.fileType} • {res.fileSize}
                </span>
              </div>

              <h3 className="font-bold text-base text-[#16345C] leading-snug">{res.title}</h3>
              <p className="text-xs text-[#6B85A8] leading-relaxed">{res.description}</p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-[#6B85A8]">
                {res.downloadCount} student downloads
              </span>
              <button
                onClick={() => handleDownload(res)}
                className="px-3.5 py-1.5 rounded-lg bg-[#102B50] hover:bg-[#16345C] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
