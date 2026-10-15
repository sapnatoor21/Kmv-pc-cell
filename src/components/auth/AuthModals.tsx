import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Modal } from '../common/Modal';
import { Lock, Mail, User as UserIcon, Phone, GraduationCap, Building2, Eye, EyeOff, ShieldCheck, Check } from 'lucide-react';

export const AuthModals: React.FC = () => {
  const { authModal, setAuthModal, login, registerStudent } = useAuth();

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPass, setShowLoginPass] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Register form state
  const [regData, setRegData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    course: 'BCA',
    semester: 'Semester 6',
    enrollmentNumber: '',
    collegeName: 'Kanya Maha Vidyalaya',
    termsAccepted: false,
  });
  const [showRegPass, setShowRegPass] = useState(false);
  const [regLoading, setRegLoading] = useState(false);
  const [regError, setRegError] = useState('');

  // 1-Click Demo login helper
  const handleQuickDemoLogin = async (email: string, pass: string) => {
    setLoginEmail(email);
    setLoginPassword(pass);
    setLoginLoading(true);
    setLoginError('');
    try {
      await login(email, pass);
    } catch (err: any) {
      setLoginError(err.message || 'Login failed');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      setLoginError('Please enter both email and password.');
      return;
    }
    setLoginLoading(true);
    setLoginError('');
    try {
      await login(loginEmail, loginPassword);
    } catch (err: any) {
      setLoginError(err.message || 'Invalid email or password.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleRegSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegError('');

    if (
      !regData.name.trim() ||
      !regData.email.trim() ||
      !regData.phone.trim() ||
      !regData.password ||
      !regData.enrollmentNumber.trim()
    ) {
      setRegError('Please fill in all required fields.');
      return;
    }

    if (regData.password !== regData.confirmPassword) {
      setRegError('Passwords do not match.');
      return;
    }

    if (regData.password.length < 6) {
      setRegError('Password must be at least 6 characters long.');
      return;
    }

    if (!regData.termsAccepted) {
      setRegError('You must accept the KMV Placement Cell code of conduct.');
      return;
    }

    setRegLoading(true);
    try {
      await registerStudent(regData);
    } catch (err: any) {
      setRegError(err.message || 'Registration failed.');
    } finally {
      setRegLoading(false);
    }
  };

  return (
    <>
      {/* LOGIN MODAL */}
      <Modal
        isOpen={authModal === 'login'}
        onClose={() => {
          setAuthModal(null);
          setLoginError('');
        }}
        title="Sign In to KMV Portal"
        subtitle="Access your placement portal with your verified credentials"
        maxWidth="md"
      >
        {/* Quick Demo Selector */}
        <div className="mb-5 p-3 rounded-xl bg-[#F3F7FC] border border-[#DCE8F7]">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#6B85A8] block mb-2">
            Instant Demo Sign-In (1-Click)
          </span>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('student@kmv.ac.in', 'Student@123')}
              className="px-2 py-1.5 rounded-lg bg-white border border-[#DCE8F7] hover:border-[#0D6EFD] text-xs font-medium text-[#16345C] hover:text-[#0D6EFD] transition-all shadow-2xs"
            >
              🎓 Student
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('careers@tcs.com', 'Recruiter@123')}
              className="px-2 py-1.5 rounded-lg bg-white border border-[#DCE8F7] hover:border-[#0D6EFD] text-xs font-medium text-[#16345C] hover:text-[#0D6EFD] transition-all shadow-2xs"
            >
              🏢 Recruiter
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('admin@kmv.ac.in', 'KmvAdmin@2026')}
              className="px-2 py-1.5 rounded-lg bg-white border border-[#DCE8F7] hover:border-[#0D6EFD] text-xs font-medium text-[#16345C] hover:text-[#0D6EFD] transition-all shadow-2xs"
            >
              🛡️ Admin
            </button>
          </div>
        </div>

        {loginError && (
          <div className="mb-4 p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium leading-relaxed">
            {loginError}
          </div>
        )}

        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#16345C] mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#6B85A8] absolute left-3 top-3" />
              <input
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="e.g. student@kmv.ac.in"
                required
                className="w-full pl-9 pr-4 py-2.5 bg-white border border-[#DCE8F7] rounded-lg text-sm text-[#16345C] placeholder:text-[#6B85A8] focus:outline-hidden focus:border-[#0D6EFD] focus:ring-1 focus:ring-[#0D6EFD] transition-colors"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-[#16345C]">
                Password
              </label>
              <button
                type="button"
                onClick={() => alert('For demo, use Student@123, Recruiter@123, or KmvAdmin@2026')}
                className="text-xs text-[#0D6EFD] hover:underline"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#6B85A8] absolute left-3 top-3" />
              <input
                type={showLoginPass ? 'text' : 'password'}
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full pl-9 pr-10 py-2.5 bg-white border border-[#DCE8F7] rounded-lg text-sm text-[#16345C] placeholder:text-[#6B85A8] focus:outline-hidden focus:border-[#0D6EFD] focus:ring-1 focus:ring-[#0D6EFD] transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowLoginPass(!showLoginPass)}
                className="absolute right-3 top-3 text-[#6B85A8] hover:text-[#16345C]"
              >
                {showLoginPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loginLoading}
            className="w-full py-2.5 px-4 rounded-lg bg-[#0D6EFD] hover:bg-[#2563EB] text-white font-medium text-sm transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer disabled:opacity-50"
          >
            {loginLoading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-5 text-center pt-4 border-t border-[#DCE8F7]">
          <p className="text-xs text-[#6B85A8]">
            New KMV student?{' '}
            <button
              onClick={() => {
                setAuthModal('register');
                setLoginError('');
              }}
              className="font-semibold text-[#0D6EFD] hover:underline cursor-pointer"
            >
              Register here
            </button>
          </p>
        </div>
      </Modal>

      {/* STUDENT REGISTRATION MODAL */}
      <Modal
        isOpen={authModal === 'register'}
        onClose={() => {
          setAuthModal(null);
          setRegError('');
        }}
        title="Student Registration"
        subtitle="Register for KMV on-campus and virtual placement drives"
        maxWidth="lg"
      >
        {regError && (
          <div className="mb-4 p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium leading-relaxed">
            {regError}
          </div>
        )}

        <form onSubmit={handleRegSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#16345C] mb-1">
                Full Name *
              </label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-[#6B85A8] absolute left-3 top-3" />
                <input
                  type="text"
                  value={regData.name}
                  onChange={(e) => setRegData({ ...regData, name: e.target.value })}
                  placeholder="e.g. Amanpreet Kaur"
                  required
                  className="w-full pl-9 pr-3 py-2 bg-white border border-[#DCE8F7] rounded-lg text-sm text-[#16345C] placeholder:text-[#6B85A8] focus:border-[#0D6EFD] focus:outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#16345C] mb-1">
                KMV Enrollment / Roll No *
              </label>
              <div className="relative">
                <GraduationCap className="w-4 h-4 text-[#6B85A8] absolute left-3 top-3" />
                <input
                  type="text"
                  value={regData.enrollmentNumber}
                  onChange={(e) => setRegData({ ...regData, enrollmentNumber: e.target.value })}
                  placeholder="e.g. KMV/2023/BCA/089"
                  required
                  className="w-full pl-9 pr-3 py-2 bg-white border border-[#DCE8F7] rounded-lg text-sm text-[#16345C] placeholder:text-[#6B85A8] focus:border-[#0D6EFD] focus:outline-hidden"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#16345C] mb-1">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#6B85A8] absolute left-3 top-3" />
                <input
                  type="email"
                  value={regData.email}
                  onChange={(e) => setRegData({ ...regData, email: e.target.value })}
                  placeholder="name@kmv.ac.in or gmail.com"
                  required
                  className="w-full pl-9 pr-3 py-2 bg-white border border-[#DCE8F7] rounded-lg text-sm text-[#16345C] placeholder:text-[#6B85A8] focus:border-[#0D6EFD] focus:outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#16345C] mb-1">
                Mobile Number *
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-[#6B85A8] absolute left-3 top-3" />
                <input
                  type="tel"
                  value={regData.phone}
                  onChange={(e) => setRegData({ ...regData, phone: e.target.value })}
                  placeholder="+91 98765 00000"
                  required
                  className="w-full pl-9 pr-3 py-2 bg-white border border-[#DCE8F7] rounded-lg text-sm text-[#16345C] placeholder:text-[#6B85A8] focus:border-[#0D6EFD] focus:outline-hidden"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#16345C] mb-1">
                Course / Program *
              </label>
              <select
                value={regData.course}
                onChange={(e) => setRegData({ ...regData, course: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-[#DCE8F7] rounded-lg text-sm text-[#16345C] focus:border-[#0D6EFD] focus:outline-hidden"
              >
                <option value="BCA">Bachelor of Computer Applications (BCA)</option>
                <option value="MCA">Master of Computer Applications (MCA)</option>
                <option value="B.Tech CSE">B.Tech Computer Science & Engg</option>
                <option value="B.Sc IT">B.Sc Information Technology</option>
                <option value="M.Sc IT">M.Sc Information Technology</option>
                <option value="B.Com">B.Com (Hons / Professional)</option>
                <option value="BBA">Bachelor of Business Administration</option>
                <option value="B.Sc Biotechnology">B.Sc Biotechnology</option>
                <option value="BA Journalism">BA Journalism & Mass Comm</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#16345C] mb-1">
                Current Semester *
              </label>
              <select
                value={regData.semester}
                onChange={(e) => setRegData({ ...regData, semester: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-[#DCE8F7] rounded-lg text-sm text-[#16345C] focus:border-[#0D6EFD] focus:outline-hidden"
              >
                <option value="Semester 5">Semester 5 (Final Year Pre-Final)</option>
                <option value="Semester 6">Semester 6 (Final Year Graduating)</option>
                <option value="Semester 7">Semester 7</option>
                <option value="Semester 8">Semester 8</option>
                <option value="Semester 4">Semester 4</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#16345C] mb-1">
              College Name
            </label>
            <div className="relative">
              <Building2 className="w-4 h-4 text-[#6B85A8] absolute left-3 top-3" />
              <input
                type="text"
                value={regData.collegeName}
                readOnly
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-[#DCE8F7] rounded-lg text-sm text-[#16345C] font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#16345C] mb-1">
                Password (min 6 chars) *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#6B85A8] absolute left-3 top-3" />
                <input
                  type={showRegPass ? 'text' : 'password'}
                  value={regData.password}
                  onChange={(e) => setRegData({ ...regData, password: e.target.value })}
                  placeholder="Create secure password"
                  required
                  className="w-full pl-9 pr-9 py-2 bg-white border border-[#DCE8F7] rounded-lg text-sm text-[#16345C] placeholder:text-[#6B85A8] focus:border-[#0D6EFD] focus:outline-hidden"
                />
                <button
                  type="button"
                  onClick={() => setShowRegPass(!showRegPass)}
                  className="absolute right-3 top-3 text-[#6B85A8]"
                >
                  {showRegPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#16345C] mb-1">
                Confirm Password *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#6B85A8] absolute left-3 top-3" />
                <input
                  type={showRegPass ? 'text' : 'password'}
                  value={regData.confirmPassword}
                  onChange={(e) => setRegData({ ...regData, confirmPassword: e.target.value })}
                  placeholder="Re-enter password"
                  required
                  className="w-full pl-9 pr-3 py-2 bg-white border border-[#DCE8F7] rounded-lg text-sm text-[#16345C] placeholder:text-[#6B85A8] focus:border-[#0D6EFD] focus:outline-hidden"
                />
              </div>
            </div>
          </div>

          <div className="p-3 bg-[#F3F7FC] rounded-lg border border-[#DCE8F7] flex items-start gap-2.5">
            <input
              type="checkbox"
              id="terms"
              checked={regData.termsAccepted}
              onChange={(e) => setRegData({ ...regData, termsAccepted: e.target.checked })}
              className="mt-1 w-4 h-4 text-[#0D6EFD] rounded border-slate-300 focus:ring-[#0D6EFD]"
            />
            <label htmlFor="terms" className="text-xs text-[#16345C] leading-snug cursor-pointer">
              I certify that all details provided are true and complete as per KMV College official records. I agree to adhere to the KMV placement rules and drive guidelines.
            </label>
          </div>

          <button
            type="submit"
            disabled={regLoading}
            className="w-full py-2.5 px-4 rounded-lg bg-[#0D6EFD] hover:bg-[#2563EB] text-white font-medium text-sm transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer disabled:opacity-50"
          >
            {regLoading ? 'Creating Student Account...' : 'Complete Registration'}
          </button>
        </form>

        <div className="mt-4 text-center pt-3 border-t border-[#DCE8F7]">
          <p className="text-xs text-[#6B85A8]">
            Already registered?{' '}
            <button
              onClick={() => {
                setAuthModal('login');
                setRegError('');
              }}
              className="font-semibold text-[#0D6EFD] hover:underline cursor-pointer"
            >
              Sign in here
            </button>
          </p>
        </div>
      </Modal>
    </>
  );
};
