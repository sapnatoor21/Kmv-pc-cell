import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import { PlacementDrive } from '../../types';
import { StatusBadge } from '../../components/common/Badge';
import { Briefcase, Plus, Users, Calendar, DollarSign, ToggleLeft, ToggleRight, Check } from 'lucide-react';

interface MyDrivesPageProps {
  onSelectTab: (tab: string) => void;
}

export const MyDrivesPage: React.FC<MyDrivesPageProps> = ({ onSelectTab }) => {
  const { user, showToast } = useAuth();
  const [drives, setDrives] = useState<PlacementDrive[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      api.recruiter.getMyDrives(user.id).then((res) => {
        setDrives(res);
        setLoading(false);
      });
    }
  }, [user]);

  const handleToggleStatus = async (driveId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'open' ? 'closed' : 'open';
    try {
      await api.recruiter.updateDrive(driveId, { status: newStatus as any });
      setDrives((prev) =>
        prev.map((d) => (d.id === driveId ? { ...d, status: newStatus as any } : d))
      );
      showToast(`Drive status toggled to ${newStatus.toUpperCase()}`, 'success');
    } catch (err: any) {
      showToast(err.message || 'Status toggle failed', 'error');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#DCE8F7]">
        <div>
          <h2 className="text-xl font-bold text-[#102B50]">My Placement Drives</h2>
          <p className="text-xs text-[#6B85A8]">
            Manage, edit, or close corporate recruitment drives posted for KMV students.
          </p>
        </div>

        <button
          onClick={() => onSelectTab('create-drive')}
          className="px-4 py-2 rounded-xl bg-[#0D6EFD] hover:bg-[#2563EB] text-white text-xs font-semibold flex items-center gap-1.5 shadow-2xs"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Drive</span>
        </button>
      </div>

      {loading ? (
        <div className="py-12 text-center text-xs text-[#6B85A8]">Loading drives...</div>
      ) : drives.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#DCE8F7] p-12 text-center space-y-3">
          <Briefcase className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="font-bold text-base text-[#102B50]">No Drives Created Yet</h3>
          <p className="text-xs text-[#6B85A8] max-w-sm mx-auto">
            Get started by posting your first placement drive. Specify compensation, eligible branches, and selection tests.
          </p>
          <button
            onClick={() => onSelectTab('create-drive')}
            className="px-4 py-2 rounded-xl bg-[#0D6EFD] text-white text-xs font-semibold"
          >
            Create First Drive
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {drives.map((drive) => (
            <div
              key={drive.id}
              className="bg-white rounded-2xl border border-[#DCE8F7] p-6 shadow-xs space-y-4 hover:border-[#0D6EFD]/40 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-base text-[#102B50] leading-snug">
                      {drive.jobTitle}
                    </h3>
                    <p className="text-xs font-semibold text-[#0D6EFD] mt-0.5">
                      {drive.companyName} • {drive.location}
                    </p>
                  </div>
                  <StatusBadge status={drive.status} />
                </div>

                <div className="p-3 bg-[#F3F7FC] rounded-xl border border-[#DCE8F7] grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-[#6B85A8] block text-[10px] uppercase font-bold">CTC</span>
                    <span className="font-bold text-[#102B50]">{drive.ctcSalary}</span>
                  </div>
                  <div>
                    <span className="text-[#6B85A8] block text-[10px] uppercase font-bold">Applicants</span>
                    <span className="font-bold text-[#0D6EFD]">{drive.applicantsCount} Students</span>
                  </div>
                </div>

                <p className="text-xs text-[#6B85A8] line-clamp-2 leading-relaxed">
                  {drive.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#DCE8F7] flex items-center justify-between">
                <button
                  onClick={() => handleToggleStatus(drive.id, drive.status)}
                  className="text-xs font-semibold text-[#6B85A8] hover:text-[#102B50] flex items-center gap-1 cursor-pointer"
                >
                  <span>{drive.status === 'open' ? 'Close Drive' : 'Reopen Drive'}</span>
                </button>

                <button
                  onClick={() => onSelectTab('applicants')}
                  className="px-3.5 py-1.5 rounded-lg bg-[#102B50] hover:bg-[#16345C] text-white text-xs font-semibold flex items-center gap-1.5"
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>View Applicants ({drive.applicantsCount})</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
