import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import { RecruiterProfile } from '../../types';
import { Building, Globe, MapPin, User, Save, ShieldCheck } from 'lucide-react';

export const CompanyProfilePage: React.FC = () => {
  const { user, showToast } = useAuth();
  const [companyName, setCompanyName] = useState('Tata Consultancy Services (TCS)');
  const [industry, setIndustry] = useState('Information Technology & Consulting');
  const [website, setWebsite] = useState('https://www.tcs.com');
  const [location, setLocation] = useState('Mohali / Chandigarh / Pan India');
  const [contactPerson, setContactPerson] = useState('Rajesh Sharma');
  const [designation, setDesignation] = useState('Campus Hiring Lead - North Zone');
  const [aboutCompany, setAboutCompany] = useState(
    'Tata Consultancy Services is an IT services, consulting and business solutions organization partnering with many of the world’s largest enterprises in their transformation journeys for over 50 years.'
  );
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      api.recruiter.getProfile(user.id).then((prof) => {
        if (prof) {
          setCompanyName(prof.companyName || '');
          setIndustry(prof.industry || '');
          setWebsite(prof.website || '');
          setLocation(prof.location || '');
          setContactPerson(prof.contactPerson || '');
          setDesignation(prof.designation || '');
          setAboutCompany(prof.aboutCompany || '');
        }
      });
    }
  }, [user]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    try {
      await api.recruiter.updateProfile(user.id, {
        companyName,
        industry,
        website,
        location,
        contactPerson,
        designation,
        aboutCompany,
      });
      showToast('Corporate partner profile updated successfully!', 'success');
    } catch (err: any) {
      showToast(err.message || 'Failed to update company profile', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-[#DCE8F7] p-6 sm:p-8 shadow-xs max-w-3xl space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-[#DCE8F7]">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-[#102B50]">Company & Recruiter Profile</h2>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              Verified Partner
            </span>
          </div>
          <p className="text-xs text-[#6B85A8] mt-0.5">
            Details visible to KMV placement coordinators and registered students.
          </p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#16345C] mb-1">
              Company Name *
            </label>
            <input
              type="text"
              required
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#F3F7FC] border border-[#DCE8F7] rounded-xl text-xs text-[#16345C]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#16345C] mb-1">
              Industry Sector *
            </label>
            <input
              type="text"
              required
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#F3F7FC] border border-[#DCE8F7] rounded-xl text-xs text-[#16345C]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#16345C] mb-1">
              Corporate Website URL
            </label>
            <input
              type="url"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#F3F7FC] border border-[#DCE8F7] rounded-xl text-xs text-[#16345C]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#16345C] mb-1">
              Hiring Locations / Offices
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#F3F7FC] border border-[#DCE8F7] rounded-xl text-xs text-[#16345C]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#16345C] mb-1">
              Lead Contact Person
            </label>
            <input
              type="text"
              value={contactPerson}
              onChange={(e) => setContactPerson(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#F3F7FC] border border-[#DCE8F7] rounded-xl text-xs text-[#16345C]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#16345C] mb-1">
              Official Designation
            </label>
            <input
              type="text"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#F3F7FC] border border-[#DCE8F7] rounded-xl text-xs text-[#16345C]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#16345C] mb-1">
            About Organization & Culture
          </label>
          <textarea
            rows={4}
            value={aboutCompany}
            onChange={(e) => setAboutCompany(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-[#F3F7FC] border border-[#DCE8F7] rounded-xl text-xs text-[#16345C]"
          />
        </div>

        <div className="pt-3 border-t border-[#DCE8F7] flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 rounded-xl bg-[#0D6EFD] hover:bg-[#2563EB] text-white text-xs font-semibold flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Updating...' : 'Save Profile'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
