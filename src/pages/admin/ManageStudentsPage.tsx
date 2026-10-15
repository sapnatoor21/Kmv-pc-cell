import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import { User, StudentProfile } from '../../types';
import { StatusBadge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { Users, Search, Filter, CheckCircle, XCircle, ShieldCheck, Plus, ExternalLink } from 'lucide-react';

export const ManageStudentsPage: React.FC = () => {
  const { showToast } = useAuth();
  const [students, setStudents] = useState<{ user: User; profile: StudentProfile }[]>([]);
  const [search, setSearch] = useState('');
  const [courseFilter, setCourseFilter] = useState('All');
  const [selectedStudent, setSelectedStudent] = useState<{ user: User; profile: StudentProfile } | null>(null);

  // Add student modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [addName, setAddName] = useState('');
  const [addEmail, setAddEmail] = useState('');
  const [addPhone, setAddPhone] = useState('');
  const [addEnrollment, setAddEnrollment] = useState('');
  const [addCourse, setAddCourse] = useState('BCA');

  useEffect(() => {
    api.admin.getAllStudents().then((res) => setStudents(res));
  }, []);

  const handleToggleStatus = async (userId: string) => {
    try {
      const updated = await api.admin.toggleUserStatus(userId);
      setStudents((prev) =>
        prev.map((s) => (s.user.id === userId ? { ...s, user: { ...s.user, isActive: updated.isActive } } : s))
      );
      showToast(`Student account status is now ${updated.isActive ? 'Active' : 'Deactivated'}.`, 'success');
    } catch (err: any) {
      showToast(err.message || 'Status toggle failed', 'error');
    }
  };

  const handleCreateStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.auth.registerStudent({
        name: addName,
        email: addEmail,
        phone: addPhone,
        password: 'Student@123',
        confirmPassword: 'Student@123',
        enrollmentNumber: addEnrollment,
        course: addCourse,
        semester: 'Semester 6',
        collegeName: 'Kanya Maha Vidyalaya',
      });
      showToast('Student registered successfully with temporary password Student@123', 'success');
      setShowAddModal(false);
      const res = await api.admin.getAllStudents();
      setStudents(res);
      setAddName('');
      setAddEmail('');
      setAddPhone('');
      setAddEnrollment('');
    } catch (err: any) {
      showToast(err.message || 'Failed to register student', 'error');
    }
  };

  const filtered = students.filter((s) => {
    const matchCourse = courseFilter === 'All' || s.profile?.course === courseFilter;
    const matchSearch =
      s.user.name.toLowerCase().includes(search.toLowerCase()) ||
      s.user.email.toLowerCase().includes(search.toLowerCase()) ||
      s.profile?.enrollmentNumber?.toLowerCase().includes(search.toLowerCase());
    return matchCourse && matchSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#DCE8F7]">
        <div>
          <h2 className="text-xl font-bold text-[#102B50]">Student Management & Eligibility</h2>
          <p className="text-xs text-[#6B85A8]">
            Verify academic transcripts, review CGPA compliance, and activate or deactivate accounts.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 rounded-xl bg-[#0D6EFD] text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Provision Student Account</span>
        </button>
      </div>

      {/* Filter bar */}
      <div className="bg-white rounded-2xl border border-[#DCE8F7] p-4 shadow-xs flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 text-[#6B85A8] absolute left-3 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by student name, roll number, or email..."
            className="w-full pl-9 pr-3 py-2 bg-[#F3F7FC] border border-[#DCE8F7] rounded-xl text-xs text-[#16345C]"
          />
        </div>
        <div className="sm:w-56">
          <select
            value={courseFilter}
            onChange={(e) => setCourseFilter(e.target.value)}
            className="w-full px-3 py-2 bg-[#F3F7FC] border border-[#DCE8F7] rounded-xl text-xs text-[#16345C]"
          >
            <option value="All">All Academic Programs</option>
            <option value="BCA">BCA</option>
            <option value="MCA">MCA</option>
            <option value="B.Tech CSE">B.Tech CSE</option>
            <option value="B.Sc IT">B.Sc IT</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-[#DCE8F7] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F3F7FC] border-b border-[#DCE8F7] text-[#6B85A8] uppercase font-bold text-[10px] tracking-wider">
              <tr>
                <th className="px-6 py-3.5">Student</th>
                <th className="px-6 py-3.5">Enrollment No.</th>
                <th className="px-6 py-3.5">Program & CGPA</th>
                <th className="px-6 py-3.5">Placement Status</th>
                <th className="px-6 py-3.5">Account State</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DCE8F7]">
              {filtered.map((item) => (
                <tr key={item.user.id} className="hover:bg-slate-50/70">
                  <td className="px-6 py-4">
                    <p className="font-bold text-[#16345C]">{item.user.name}</p>
                    <p className="text-[11px] text-[#6B85A8]">{item.user.email}</p>
                  </td>

                  <td className="px-6 py-4 font-mono font-semibold text-[#102B50]">
                    {item.profile?.enrollmentNumber || 'N/A'}
                  </td>

                  <td className="px-6 py-4">
                    <p className="font-bold text-[#16345C]">{item.profile?.course}</p>
                    <p className="text-[11px] text-[#0D6EFD] font-semibold">
                      CGPA: {item.profile?.cgpa || 0}
                    </p>
                  </td>

                  <td className="px-6 py-4">
                    <StatusBadge status={item.profile?.placementStatus || 'available'} />
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

                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      onClick={() => setSelectedStudent(item)}
                      className="px-3 py-1.5 rounded-lg border border-[#DCE8F7] text-[#16345C] font-semibold hover:border-[#0D6EFD]"
                    >
                      Transcript
                    </button>
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

      {/* PROVISION STUDENT MODAL */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Provision Student Record"
        subtitle="Secure account creation by Placement Coordinator"
        maxWidth="md"
      >
        <form onSubmit={handleCreateStudent} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#16345C] mb-1">Full Name *</label>
            <input
              type="text"
              required
              value={addName}
              onChange={(e) => setAddName(e.target.value)}
              placeholder="e.g. Jaspreet Kaur"
              className="w-full px-3 py-2 bg-[#F3F7FC] border border-[#DCE8F7] rounded-lg text-xs"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#16345C] mb-1">Email *</label>
            <input
              type="email"
              required
              value={addEmail}
              onChange={(e) => setAddEmail(e.target.value)}
              placeholder="e.g. jaspreet@kmv.ac.in"
              className="w-full px-3 py-2 bg-[#F3F7FC] border border-[#DCE8F7] rounded-lg text-xs"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#16345C] mb-1">Enrollment No. *</label>
              <input
                type="text"
                required
                value={addEnrollment}
                onChange={(e) => setAddEnrollment(e.target.value)}
                placeholder="KMV/2023/BCA/..."
                className="w-full px-3 py-2 bg-[#F3F7FC] border border-[#DCE8F7] rounded-lg text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#16345C] mb-1">Phone *</label>
              <input
                type="tel"
                required
                value={addPhone}
                onChange={(e) => setAddPhone(e.target.value)}
                placeholder="+91 98140..."
                className="w-full px-3 py-2 bg-[#F3F7FC] border border-[#DCE8F7] rounded-lg text-xs"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#16345C] mb-1">Course</label>
            <select
              value={addCourse}
              onChange={(e) => setAddCourse(e.target.value)}
              className="w-full px-3 py-2 bg-[#F3F7FC] border border-[#DCE8F7] rounded-lg text-xs"
            >
              <option value="BCA">BCA</option>
              <option value="MCA">MCA</option>
              <option value="B.Tech CSE">B.Tech CSE</option>
              <option value="B.Sc IT">B.Sc IT</option>
              <option value="M.Sc IT">M.Sc IT</option>
            </select>
          </div>
          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
              className="px-4 py-2 rounded-lg border border-[#DCE8F7] text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-[#0D6EFD] text-white text-xs font-semibold"
            >
              Create Account
            </button>
          </div>
        </form>
      </Modal>

      {/* TRANSCRIPT MODAL */}
      <Modal
        isOpen={!!selectedStudent}
        onClose={() => setSelectedStudent(null)}
        title={selectedStudent?.user.name || 'Transcript'}
        subtitle={`Roll: ${selectedStudent?.profile?.enrollmentNumber}`}
        maxWidth="md"
      >
        {selectedStudent && (
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3 p-4 bg-[#F3F7FC] rounded-xl border border-[#DCE8F7]">
              <div>
                <span className="text-[#6B85A8]">Program</span>
                <p className="font-bold text-[#102B50]">{selectedStudent.profile.course}</p>
              </div>
              <div>
                <span className="text-[#6B85A8]">Semester</span>
                <p className="font-bold text-[#102B50]">{selectedStudent.profile.semester}</p>
              </div>
              <div>
                <span className="text-[#6B85A8]">CGPA</span>
                <p className="font-bold text-[#0D6EFD]">{selectedStudent.profile.cgpa}</p>
              </div>
              <div>
                <span className="text-[#6B85A8]">Backlogs</span>
                <p className="font-bold text-emerald-600">{selectedStudent.profile.backlogs}</p>
              </div>
            </div>

            <div>
              <span className="font-bold text-[#102B50] block mb-1">Skills</span>
              <div className="flex flex-wrap gap-1">
                {selectedStudent.profile.skills?.map((sk, i) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-blue-50 text-[#0D6EFD] text-[11px] font-semibold">
                    {sk}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
