import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import { Announcement } from '../../types';
import { Megaphone, Plus, Trash2, Pin, Calendar, CheckCircle } from 'lucide-react';
import { Modal } from '../../components/common/Modal';

export const ManageAnnouncementsPage: React.FC = () => {
  const { user, showToast } = useAuth();
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<Announcement['category']>('general');
  const [targetAudience, setTargetAudience] = useState<Announcement['targetAudience']>('all');
  const [isPinned, setIsPinned] = useState(false);

  useEffect(() => {
    api.announcements.getAnnouncements().then((res) => setAnnouncements(res));
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) {
      showToast('Please provide announcement title and content.', 'error');
      return;
    }

    try {
      const created = await api.announcements.createAnnouncement({
        title,
        content,
        category,
        targetAudience,
        isPinned,
        authorName: user?.name || 'Placement Cell Dean',
      });
      setAnnouncements([created, ...announcements]);
      showToast('Announcement circular published successfully!', 'success');
      setShowModal(false);
      setTitle('');
      setContent('');
      setIsPinned(false);
    } catch (err: any) {
      showToast(err.message || 'Failed to publish announcement', 'error');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to remove this announcement?')) return;
    try {
      await api.announcements.deleteAnnouncement(id);
      setAnnouncements(announcements.filter((a) => a.id !== id));
      showToast('Announcement removed', 'info');
    } catch (err: any) {
      showToast(err.message || 'Failed to delete announcement', 'error');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#DCE8F7]">
        <div>
          <h2 className="text-xl font-bold text-[#102B50]">Campus Circulars & Announcements</h2>
          <p className="text-xs text-[#6B85A8]">
            Publish official recruitment notices, policy updates, and bootcamp alerts to students and recruiters.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 rounded-xl bg-[#0D6EFD] text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Post Announcement</span>
        </button>
      </div>

      <div className="space-y-4">
        {announcements.map((ann) => (
          <div
            key={ann.id}
            className={`p-6 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-start justify-between gap-4 ${
              ann.isPinned
                ? 'bg-amber-50/40 border-amber-300 shadow-2xs'
                : 'bg-white border-[#DCE8F7] shadow-xs'
            }`}
          >
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2">
                {ann.isPinned && (
                  <span className="px-2 py-0.5 rounded-md bg-amber-200 text-amber-900 font-bold text-[10px] flex items-center gap-1">
                    <Pin className="w-3 h-3 fill-current" /> Pinned Notice
                  </span>
                )}
                <span className="px-2 py-0.5 rounded-md bg-[#0D6EFD]/10 text-[#0D6EFD] font-bold text-[10px] uppercase">
                  {ann.category.replace('_', ' ')}
                </span>
                <span className="text-[11px] text-[#6B85A8]">
                  Audience: {ann.targetAudience.toUpperCase()}
                </span>
              </div>

              <h3 className="font-bold text-base text-[#16345C] leading-snug">{ann.title}</h3>
              <p className="text-xs text-[#6B85A8] leading-relaxed whitespace-pre-line">{ann.content}</p>

              <p className="text-[11px] text-slate-400 pt-1">
                Issued by {ann.authorName} on {new Date(ann.createdAt).toLocaleDateString()}
              </p>
            </div>

            <button
              onClick={() => handleDelete(ann.id)}
              className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer self-end sm:self-auto"
              title="Delete announcement"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* POST ANNOUNCEMENT MODAL */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Publish Placement Notice"
        subtitle="Distribute circular to portal dashboards"
        maxWidth="md"
      >
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#16345C] mb-1">
              Notice Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Schedule for TCS Virtual Technical Interview Rounds"
              className="w-full px-3 py-2 bg-[#F3F7FC] border border-[#DCE8F7] rounded-lg text-xs"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#16345C] mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3 py-2 bg-[#F3F7FC] border border-[#DCE8F7] rounded-lg text-xs"
              >
                <option value="drive_alert">Drive Alert</option>
                <option value="workshop">Workshop / Training</option>
                <option value="policy">Placement Policy</option>
                <option value="general">General Notice</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#16345C] mb-1">Target Audience</label>
              <select
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value as any)}
                className="w-full px-3 py-2 bg-[#F3F7FC] border border-[#DCE8F7] rounded-lg text-xs"
              >
                <option value="all">Everyone</option>
                <option value="students">Students Only</option>
                <option value="recruiters">Recruiters Only</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#16345C] mb-1">
              Circular Content Details *
            </label>
            <textarea
              required
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write the full circular announcement..."
              className="w-full px-3 py-2 bg-[#F3F7FC] border border-[#DCE8F7] rounded-lg text-xs"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="pinned"
              checked={isPinned}
              onChange={(e) => setIsPinned(e.target.checked)}
              className="w-4 h-4 text-[#0D6EFD] rounded border-slate-300"
            />
            <label htmlFor="pinned" className="text-xs text-[#16345C] font-semibold cursor-pointer">
              Pin notice to top of public homepage and dashboards
            </label>
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="px-4 py-2 rounded-lg border border-[#DCE8F7] text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-[#0D6EFD] text-white text-xs font-semibold"
            >
              Publish Circular
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
