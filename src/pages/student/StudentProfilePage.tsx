import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import { StudentProfile } from '../../types';
import {
  User,
  GraduationCap,
  Code,
  Award,
  FolderGit2,
  FileText,
  Lock,
  Plus,
  Trash2,
  Save,
  CheckCircle,
  ExternalLink,
} from 'lucide-react';

export const StudentProfilePage: React.FC = () => {
  const { user, showToast, refreshUser } = useAuth();
  const [activeTab, setActiveTab] = useState<'personal' | 'academic' | 'skills' | 'projects' | 'certifications' | 'resume' | 'security'>('personal');

  // Form State
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [course, setCourse] = useState('BCA');
  const [semester, setSemester] = useState('Semester 6');
  const [cgpa, setCgpa] = useState<number>(0);
  const [tenthPercentage, setTenthPercentage] = useState<number | undefined>(undefined);
  const [twelfthPercentage, setTwelfthPercentage] = useState<number | undefined>(undefined);
  const [backlogs, setBacklogs] = useState<number>(0);
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState('');
  const [bio, setBio] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [github, setGithub] = useState('');
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [resumeUrl, setResumeUrl] = useState('');

  // Projects State
  const [projects, setProjects] = useState<StudentProfile['projects']>([]);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    techStack: '',
    githubUrl: '',
    liveUrl: '',
  });

  // Certifications State
  const [certifications, setCertifications] = useState<StudentProfile['certifications']>([]);
  const [newCert, setNewCert] = useState({
    title: '',
    issuer: '',
    issueDate: '',
    credentialUrl: '',
  });

  // Password State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const [saving, setSaving] = useState(false);

  // Load profile data on mount
  useEffect(() => {
    if (!user) return;
    api.student.getProfile(user.id).then((prof) => {
      if (prof) {
        setCourse(prof.course || 'BCA');
        setSemester(prof.semester || 'Semester 6');
        setCgpa(prof.cgpa || 0);
        setTenthPercentage(prof.tenthPercentage);
        setTwelfthPercentage(prof.twelfthPercentage);
        setBacklogs(prof.backlogs || 0);
        setSkills(prof.skills || []);
        setBio(prof.bio || '');
        setLinkedin(prof.linkedin || '');
        setGithub(prof.github || '');
        setPortfolioUrl(prof.portfolioUrl || '');
        setResumeUrl(prof.resumeUrl || '');
        setProjects(prof.projects || []);
        setCertifications(prof.certifications || []);
      }
    });
  }, [user]);

  const handleSaveProfile = async () => {
    if (!user) return;
    setSaving(true);
    try {
      await api.student.updateProfile(user.id, {
        name,
        phone,
        course,
        semester,
        cgpa,
        tenthPercentage,
        twelfthPercentage,
        backlogs,
        skills,
        bio,
        linkedin,
        github,
        portfolioUrl,
        resumeUrl,
        projects,
        certifications,
      });
      await refreshUser();
      showToast('Profile information saved and synchronized!', 'success');
    } catch (err: any) {
      showToast(err.message || 'Error updating profile', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkill.trim()) return;
    if (skills.includes(newSkill.trim())) return;
    setSkills([...skills, newSkill.trim()]);
    setNewSkill('');
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  const handleAddProject = () => {
    if (!newProject.title.trim() || !newProject.description.trim()) {
      showToast('Please provide project title and description', 'error');
      return;
    }
    const stack = newProject.techStack
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    setProjects([
      ...projects,
      {
        title: newProject.title,
        description: newProject.description,
        techStack: stack,
        githubUrl: newProject.githubUrl,
        liveUrl: newProject.liveUrl,
      },
    ]);
    setNewProject({ title: '', description: '', techStack: '', githubUrl: '', liveUrl: '' });
  };

  const handleRemoveProject = (index: number) => {
    setProjects(projects.filter((_, i) => i !== index));
  };

  const handleAddCert = () => {
    if (!newCert.title.trim() || !newCert.issuer.trim()) {
      showToast('Please provide certification title and issuer', 'error');
      return;
    }
    setCertifications([...certifications, { ...newCert }]);
    setNewCert({ title: '', issuer: '', issueDate: '', credentialUrl: '' });
  };

  const handleRemoveCert = (index: number) => {
    setCertifications(certifications.filter((_, i) => i !== index));
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      showToast('New passwords do not match.', 'error');
      return;
    }
    if (newPassword.length < 6) {
      showToast('New password must be at least 6 characters.', 'error');
      return;
    }
    try {
      await api.auth.changePassword(user?.email || '', currentPassword, newPassword);
      showToast('Password changed successfully!', 'success');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    } catch (err: any) {
      showToast(err.message || 'Failed to change password', 'error');
    }
  };

  const tabs = [
    { id: 'personal', label: 'Personal Details', icon: User },
    { id: 'academic', label: 'Academic & CGPA', icon: GraduationCap },
    { id: 'skills', label: 'Skills & Tools', icon: Code },
    { id: 'projects', label: 'Projects', icon: FolderGit2 },
    { id: 'certifications', label: 'Certifications', icon: Award },
    { id: 'resume', label: 'Resume & Links', icon: FileText },
    { id: 'security', label: 'Security', icon: Lock },
  ];

  return (
    <div className="space-y-6">
      {/* Tabs Row */}
      <div className="flex items-center gap-1 overflow-x-auto pb-2 border-b border-[#DCE8F7]">
        {tabs.map((t) => {
          const Icon = t.icon;
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 whitespace-nowrap transition-colors cursor-pointer ${
                isActive
                  ? 'bg-[#0D6EFD] text-white shadow-xs'
                  : 'bg-white text-[#16345C] border border-[#DCE8F7] hover:border-[#0D6EFD]'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: Personal Details */}
      {activeTab === 'personal' && (
        <div className="bg-white rounded-2xl border border-[#DCE8F7] p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#DCE8F7]">
            <div>
              <h3 className="font-bold text-base text-[#16345C]">Personal Information</h3>
              <p className="text-xs text-[#6B85A8]">Your identity details as registered with KMV</p>
            </div>
            <button
              onClick={handleSaveProfile}
              disabled={saving}
              className="px-4 py-2 rounded-xl bg-[#0D6EFD] hover:bg-[#2563EB] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Saving...' : 'Save Changes'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#16345C] mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#F3F7FC] border border-[#DCE8F7] rounded-xl text-xs text-[#16345C] focus:outline-hidden focus:border-[#0D6EFD]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#16345C] mb-1">Email Address</label>
              <input
                type="email"
                value={user?.email}
                disabled
                className="w-full px-3.5 py-2.5 bg-slate-100 border border-[#DCE8F7] rounded-xl text-xs text-[#6B85A8] cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#16345C] mb-1">Mobile Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#F3F7FC] border border-[#DCE8F7] rounded-xl text-xs text-[#16345C] focus:outline-hidden focus:border-[#0D6EFD]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#16345C] mb-1">College Name</label>
              <input
                type="text"
                value="Kanya Maha Vidyalaya (Autonomous)"
                disabled
                className="w-full px-3.5 py-2.5 bg-slate-100 border border-[#DCE8F7] rounded-xl text-xs text-[#6B85A8] cursor-not-allowed"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#16345C] mb-1">
              Professional Bio & Career Objective
            </label>
            <textarea
              rows={4}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Brief professional introduction, core interests, and placement objectives..."
              className="w-full px-3.5 py-2.5 bg-[#F3F7FC] border border-[#DCE8F7] rounded-xl text-xs text-[#16345C] focus:outline-hidden focus:border-[#0D6EFD]"
            />
          </div>
        </div>
      )}

      {/* TAB 2: Academic & CGPA */}
      {activeTab === 'academic' && (
        <div className="bg-white rounded-2xl border border-[#DCE8F7] p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#DCE8F7]">
            <div>
              <h3 className="font-bold text-base text-[#16345C]">Academic Records & CGPA</h3>
              <p className="text-xs text-[#6B85A8]">
                Used by placement algorithms to verify drive prerequisites
              </p>
            </div>
            <button
              onClick={handleSaveProfile}
              disabled={saving}
              className="px-4 py-2 rounded-xl bg-[#0D6EFD] hover:bg-[#2563EB] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Saving...' : 'Save Academic Details'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#16345C] mb-1">Course / Degree</label>
              <select
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#F3F7FC] border border-[#DCE8F7] rounded-xl text-xs text-[#16345C] focus:border-[#0D6EFD]"
              >
                <option value="BCA">Bachelor of Computer Applications (BCA)</option>
                <option value="MCA">Master of Computer Applications (MCA)</option>
                <option value="B.Tech CSE">B.Tech Computer Science</option>
                <option value="B.Sc IT">B.Sc Information Technology</option>
                <option value="M.Sc IT">M.Sc Information Technology</option>
                <option value="B.Com">B.Com Professional</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#16345C] mb-1">Current Semester</label>
              <select
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#F3F7FC] border border-[#DCE8F7] rounded-xl text-xs text-[#16345C] focus:border-[#0D6EFD]"
              >
                <option value="Semester 5">Semester 5</option>
                <option value="Semester 6">Semester 6 (Final)</option>
                <option value="Semester 7">Semester 7</option>
                <option value="Semester 8">Semester 8 (Final)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#16345C] mb-1">
                Current Cumulative CGPA (0 - 10)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="10"
                value={cgpa}
                onChange={(e) => setCgpa(parseFloat(e.target.value) || 0)}
                className="w-full px-3.5 py-2.5 bg-[#F3F7FC] border border-[#DCE8F7] rounded-xl text-xs font-bold text-[#0D6EFD] focus:border-[#0D6EFD]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#16345C] mb-1">
                Class 10th Percentage (%)
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="100"
                value={tenthPercentage || ''}
                onChange={(e) => setTenthPercentage(parseFloat(e.target.value) || undefined)}
                placeholder="e.g. 92.4"
                className="w-full px-3.5 py-2.5 bg-[#F3F7FC] border border-[#DCE8F7] rounded-xl text-xs text-[#16345C] focus:border-[#0D6EFD]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#16345C] mb-1">
                Class 12th Percentage (%)
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="100"
                value={twelfthPercentage || ''}
                onChange={(e) => setTwelfthPercentage(parseFloat(e.target.value) || undefined)}
                placeholder="e.g. 89.6"
                className="w-full px-3.5 py-2.5 bg-[#F3F7FC] border border-[#DCE8F7] rounded-xl text-xs text-[#16345C] focus:border-[#0D6EFD]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#16345C] mb-1">
                Active Backlogs (Arrears)
              </label>
              <input
                type="number"
                min="0"
                max="10"
                value={backlogs}
                onChange={(e) => setBacklogs(parseInt(e.target.value, 10) || 0)}
                className="w-full px-3.5 py-2.5 bg-[#F3F7FC] border border-[#DCE8F7] rounded-xl text-xs text-[#16345C] focus:border-[#0D6EFD]"
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Skills */}
      {activeTab === 'skills' && (
        <div className="bg-white rounded-2xl border border-[#DCE8F7] p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#DCE8F7]">
            <div>
              <h3 className="font-bold text-base text-[#16345C]">Technical & Professional Skills</h3>
              <p className="text-xs text-[#6B85A8]">Matched with recruiter job requirements</p>
            </div>
            <button
              onClick={handleSaveProfile}
              disabled={saving}
              className="px-4 py-2 rounded-xl bg-[#0D6EFD] hover:bg-[#2563EB] text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save Skills</span>
            </button>
          </div>

          <form onSubmit={handleAddSkill} className="flex gap-2">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Add skill (e.g., React, Python, SQL, Cloud Computing, Git)..."
              className="flex-1 px-3.5 py-2.5 bg-[#F3F7FC] border border-[#DCE8F7] rounded-xl text-xs text-[#16345C] focus:border-[#0D6EFD]"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-[#102B50] text-white text-xs font-semibold flex items-center gap-1.5 hover:bg-[#16345C]"
            >
              <Plus className="w-4 h-4" />
              <span>Add</span>
            </button>
          </form>

          <div className="flex flex-wrap gap-2 pt-2">
            {skills.map((skill, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 rounded-lg bg-[#0D6EFD]/10 border border-[#0D6EFD]/20 text-xs font-semibold text-[#0D6EFD] flex items-center gap-2"
              >
                <span>{skill}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(skill)}
                  className="text-slate-400 hover:text-rose-600"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: Projects */}
      {activeTab === 'projects' && (
        <div className="bg-white rounded-2xl border border-[#DCE8F7] p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#DCE8F7]">
            <div>
              <h3 className="font-bold text-base text-[#16345C]">Academic & Capstone Projects</h3>
              <p className="text-xs text-[#6B85A8]">Highlighted on your placement resume</p>
            </div>
            <button
              onClick={handleSaveProfile}
              disabled={saving}
              className="px-4 py-2 rounded-xl bg-[#0D6EFD] hover:bg-[#2563EB] text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save Projects</span>
            </button>
          </div>

          {/* Add Project Form */}
          <div className="p-4 rounded-xl bg-[#F3F7FC] border border-[#DCE8F7] space-y-3">
            <h4 className="font-bold text-xs text-[#102B50] uppercase tracking-wider">
              Add New Project
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Project Title (e.g. KMV Campus Event Portal)"
                value={newProject.title}
                onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                className="px-3 py-2 bg-white border border-[#DCE8F7] rounded-lg text-xs"
              />
              <input
                type="text"
                placeholder="Tech Stack comma-separated (e.g. React, Node.js, MongoDB)"
                value={newProject.techStack}
                onChange={(e) => setNewProject({ ...newProject, techStack: e.target.value })}
                className="px-3 py-2 bg-white border border-[#DCE8F7] rounded-lg text-xs"
              />
            </div>
            <textarea
              rows={2}
              placeholder="Project description, architecture and results..."
              value={newProject.description}
              onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
              className="w-full px-3 py-2 bg-white border border-[#DCE8F7] rounded-lg text-xs"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="url"
                placeholder="GitHub Repository URL"
                value={newProject.githubUrl}
                onChange={(e) => setNewProject({ ...newProject, githubUrl: e.target.value })}
                className="px-3 py-2 bg-white border border-[#DCE8F7] rounded-lg text-xs"
              />
              <button
                type="button"
                onClick={handleAddProject}
                className="py-2 px-4 rounded-lg bg-[#102B50] text-white text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-[#16345C]"
              >
                <Plus className="w-4 h-4" />
                <span>Append to Projects List</span>
              </button>
            </div>
          </div>

          {/* Project List */}
          <div className="space-y-3">
            {projects.map((proj, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-[#DCE8F7] bg-white space-y-2 relative"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-[#16345C]">{proj.title}</h4>
                  <button
                    onClick={() => handleRemoveProject(idx)}
                    className="p-1 text-slate-400 hover:text-rose-600 rounded-md"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs text-[#6B85A8] leading-relaxed">{proj.description}</p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {proj.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md bg-[#F3F7FC] text-[#16345C] text-[10px] font-semibold border border-[#DCE8F7]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: Certifications */}
      {activeTab === 'certifications' && (
        <div className="bg-white rounded-2xl border border-[#DCE8F7] p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#DCE8F7]">
            <div>
              <h3 className="font-bold text-base text-[#16345C]">Professional Certifications</h3>
              <p className="text-xs text-[#6B85A8]">Coursera, HackerRank, Oracle, AWS, etc.</p>
            </div>
            <button
              onClick={handleSaveProfile}
              disabled={saving}
              className="px-4 py-2 rounded-xl bg-[#0D6EFD] hover:bg-[#2563EB] text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save Certifications</span>
            </button>
          </div>

          <div className="p-4 rounded-xl bg-[#F3F7FC] border border-[#DCE8F7] space-y-3">
            <h4 className="font-bold text-xs text-[#102B50] uppercase tracking-wider">
              Add Verified Certification
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Certification Name"
                value={newCert.title}
                onChange={(e) => setNewCert({ ...newCert, title: e.target.value })}
                className="px-3 py-2 bg-white border border-[#DCE8F7] rounded-lg text-xs"
              />
              <input
                type="text"
                placeholder="Issuing Organization (e.g. Coursera / Meta)"
                value={newCert.issuer}
                onChange={(e) => setNewCert({ ...newCert, issuer: e.target.value })}
                className="px-3 py-2 bg-white border border-[#DCE8F7] rounded-lg text-xs"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="date"
                value={newCert.issueDate}
                onChange={(e) => setNewCert({ ...newCert, issueDate: e.target.value })}
                className="px-3 py-2 bg-white border border-[#DCE8F7] rounded-lg text-xs"
              />
              <button
                type="button"
                onClick={handleAddCert}
                className="py-2 px-4 rounded-lg bg-[#102B50] text-white text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-[#16345C]"
              >
                <Plus className="w-4 h-4" />
                <span>Add Certification</span>
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {certifications.map((cert, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl border border-[#DCE8F7] bg-white flex items-center justify-between"
              >
                <div>
                  <h4 className="font-bold text-xs text-[#16345C]">{cert.title}</h4>
                  <p className="text-[11px] text-[#6B85A8]">
                    Issued by {cert.issuer} • {cert.issueDate}
                  </p>
                </div>
                <button
                  onClick={() => handleRemoveCert(idx)}
                  className="p-1 text-slate-400 hover:text-rose-600 rounded-md"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: Resume & Links */}
      {activeTab === 'resume' && (
        <div className="bg-white rounded-2xl border border-[#DCE8F7] p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#DCE8F7]">
            <div>
              <h3 className="font-bold text-base text-[#16345C]">Resume & Professional Profiles</h3>
              <p className="text-xs text-[#6B85A8]">Share links with campus recruitment panels</p>
            </div>
            <button
              onClick={handleSaveProfile}
              disabled={saving}
              className="px-4 py-2 rounded-xl bg-[#0D6EFD] hover:bg-[#2563EB] text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save Links</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#16345C] mb-1">
                LinkedIn Profile URL
              </label>
              <input
                type="url"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                placeholder="https://linkedin.com/in/username"
                className="w-full px-3.5 py-2.5 bg-[#F3F7FC] border border-[#DCE8F7] rounded-xl text-xs text-[#16345C]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#16345C] mb-1">
                GitHub Profile URL
              </label>
              <input
                type="url"
                value={github}
                onChange={(e) => setGithub(e.target.value)}
                placeholder="https://github.com/username"
                className="w-full px-3.5 py-2.5 bg-[#F3F7FC] border border-[#DCE8F7] rounded-xl text-xs text-[#16345C]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#16345C] mb-1">
                Portfolio / Personal Website
              </label>
              <input
                type="url"
                value={portfolioUrl}
                onChange={(e) => setPortfolioUrl(e.target.value)}
                placeholder="https://yourname.dev"
                className="w-full px-3.5 py-2.5 bg-[#F3F7FC] border border-[#DCE8F7] rounded-xl text-xs text-[#16345C]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#16345C] mb-1">
                Hosted Resume Document Link (Google Drive / Cloud)
              </label>
              <input
                type="url"
                value={resumeUrl}
                onChange={(e) => setResumeUrl(e.target.value)}
                placeholder="https://drive.google.com/your-resume-pdf"
                className="w-full px-3.5 py-2.5 bg-[#F3F7FC] border border-[#DCE8F7] rounded-xl text-xs text-[#16345C]"
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: Security */}
      {activeTab === 'security' && (
        <div className="bg-white rounded-2xl border border-[#DCE8F7] p-6 sm:p-8 shadow-xs max-w-xl space-y-6">
          <div className="pb-4 border-b border-[#DCE8F7]">
            <h3 className="font-bold text-base text-[#16345C]">Change Account Password</h3>
            <p className="text-xs text-[#6B85A8]">Update your KMV portal password</p>
          </div>

          <form onSubmit={handleChangePassword} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#16345C] mb-1">
                Current Password *
              </label>
              <input
                type="password"
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#F3F7FC] border border-[#DCE8F7] rounded-xl text-xs text-[#16345C]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#16345C] mb-1">
                New Password (min 6 characters) *
              </label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#F3F7FC] border border-[#DCE8F7] rounded-xl text-xs text-[#16345C]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#16345C] mb-1">
                Confirm New Password *
              </label>
              <input
                type="password"
                required
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#F3F7FC] border border-[#DCE8F7] rounded-xl text-xs text-[#16345C]"
              />
            </div>

            <button
              type="submit"
              className="py-2.5 px-5 rounded-xl bg-[#0D6EFD] text-white text-xs font-semibold hover:bg-[#2563EB] cursor-pointer"
            >
              Update Password
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
