import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import { User, RecruiterProfile } from '../../types';
import { Building, Search, ShieldCheck, CheckCircle, XCircle } from 'lucide-react';

export const ManageRecruitersPage: React.FC = () => {
  const { showToast } = useAuth();
  const [recruiters, setRecruiters] = useState<{ user: User; profile?: RecruiterProfile }[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    api.admin.getAllRecruiters().then((res) => setRecruiters(res));
  }, []);

  const handleToggleStatus = async (userId: string) => {
    try {
      const updated = await api.admin.toggleUserStatus(userId);
      setRecruiters((prev) =>
        prev.map((r) => (r.user.id === userId ? { ...r, user: { ...r.user, isActive: updated.isActive } } : r))
      );
      showToast(`Recruiter account is now ${updated.isActive ? 'Active' : 'Deactivated'}`, 'success');
    } catch (err: any) {
      showToast(err.message || 'Status toggle failed', 'error');
    }
  };

  const filtered = recruiters.filter((r) => {
    const compName = r.profile?.companyName || '';
    const contact = r.user.name || '';
    return (
      compName.toLowerCase().includes(search.toLowerCase()) ||
      contact.toLowerCase().includes(search.toLowerCase()) ||
      r.user.email.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="space-y-6">
      <div className="border-b border-[#DCE8F7] pb-4">
        <h2 className="text-xl font-bold text-[#102B50]">Recruiter Partner Directory</h2>
        <p className="text-xs text-[#6B85A8]">
          Review verified corporate employer accounts, point-of-contact details, and drive authorizations.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-[#DCE8F7] p-4 shadow-xs">
        <div className="relative">
          <Search className="w-4 h-4 text-[#6B85A8] absolute left-3 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by corporate partner name, lead HR, or email..."
            className="w-full pl-9 pr-3 py-2 bg-[#F3F7FC] border border-[#DCE8F7] rounded-xl text-xs text-[#16345C]"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#DCE8F7] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F3F7FC] border-b border-[#DCE8F7] text-[#6B85A8] uppercase font-bold text-[10px] tracking-wider">
              <tr>
                <th className="px-6 py-3.5">Company Partner</th>
                <th className="px-6 py-3.5">HR Contact Lead</th>
                <th className="px-6 py-3.5">Industry</th>
                <th className="px-6 py-3.5">Verification</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DCE8F7]">
              {filtered.map((item) => (
                <tr key={item.user.id} className="hover:bg-slate-50/70">
                  <td className="px-6 py-4">
                    <p className="font-bold text-[#16345C]">
                      {item.profile?.companyName || 'Corporate Recruiter'}
                    </p>
                    <p className="text-[11px] text-[#6B85A8]">{item.profile?.location || 'Pan India'}</p>
                  </td>

                  <td className="px-6 py-4">
                    <p className="font-semibold text-[#16345C]">{item.user.name}</p>
                    <p className="text-[11px] text-[#6B85A8]">{item.user.email}</p>
                  </td>

                  <td className="px-6 py-4 text-[#16345C]">
                    {item.profile?.industry || 'Technology'}
                  </td>

                  <td className="px-6 py-4">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Verified Partner
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        item.user.isActive
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}
                    >
                      {item.user.isActive ? 'Active' : 'Deactivated'}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleToggleStatus(item.user.id)}
                      className={`px-3 py-1.5 rounded-lg font-semibold text-xs ${
                        item.user.isActive
                          ? 'text-rose-600 bg-rose-50 hover:bg-rose-100'
                          : 'text-emerald-700 bg-emerald-50 hover:bg-emerald-100'
                      }`}
                    >
                      {item.user.isActive ? 'Deactivate' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
