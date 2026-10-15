import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const ContactPage: React.FC = () => {
  const { showToast } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Campus Recruitment Enquiry',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      showToast('Please fill in all required fields.', 'error');
      return;
    }
    setSubmitted(true);
    showToast('Your message has been dispatched to KMV Placement Cell.', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="border-b border-[#DCE8F7] pb-6">
        <span className="text-xs font-bold uppercase tracking-wider text-[#0D6EFD]">
          Get in Touch
        </span>
        <h1 className="text-3xl font-extrabold text-[#102B50] mt-1">
          Contact KMV Training & Placement Cell
        </h1>
        <p className="text-xs sm:text-sm text-[#6B85A8] mt-1">
          Reach out for corporate drive scheduling, campus invitations, student credentials verification, or placement guidance.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Contact Info Card */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-[#DCE8F7] p-8 shadow-xs space-y-6">
          <div>
            <h3 className="font-bold text-lg text-[#102B50]">Placement Cell Office</h3>
            <p className="text-xs text-[#6B85A8] mt-1">
              Office of the Dean, Training & Placement Services
            </p>
          </div>

          <div className="space-y-4 text-xs text-[#16345C]">
            <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-[#F3F7FC] border border-[#DCE8F7]">
              <MapPin className="w-5 h-5 text-[#0D6EFD] flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-[#102B50]">Campus Address</p>
                <p className="text-[#6B85A8] leading-relaxed mt-0.5">
                  Kanya Maha Vidyalaya (Autonomous), Vidyalaya Marg, Tanda Road, Jalandhar - 144004, Punjab, India.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-[#F3F7FC] border border-[#DCE8F7]">
              <Phone className="w-5 h-5 text-[#0D6EFD] flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-[#102B50]">Telephone Enquiries</p>
                <p className="text-[#6B85A8] mt-0.5">+91 181 2296605 / 2296606</p>
                <p className="text-[#6B85A8]">+91 98140 00000 (Cell Coordinator)</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-[#F3F7FC] border border-[#DCE8F7]">
              <Mail className="w-5 h-5 text-[#0D6EFD] flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-[#102B50]">Official Emails</p>
                <p className="text-[#6B85A8] mt-0.5">placement@kmv.ac.in</p>
                <p className="text-[#6B85A8]">kmvjalandhar@yahoo.com</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-[#F3F7FC] border border-[#DCE8F7]">
              <Clock className="w-5 h-5 text-[#0D6EFD] flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-[#102B50]">Working Hours</p>
                <p className="text-[#6B85A8] mt-0.5">Monday to Saturday: 9:00 AM – 4:30 PM IST</p>
              </div>
            </div>
          </div>
        </div>

        {/* Message Form */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-[#DCE8F7] p-8 shadow-xs">
          <div className="mb-6">
            <h3 className="font-bold text-lg text-[#102B50]">Send an Official Enquiry</h3>
            <p className="text-xs text-[#6B85A8] mt-0.5">
              Recruiters and students may send enquiries directly to our coordinators.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 text-center bg-[#F3F7FC] rounded-2xl border border-[#DCE8F7] space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-base text-[#102B50]">Thank you! Your message was received.</h4>
              <p className="text-xs text-[#6B85A8] max-w-sm mx-auto">
                A member of the KMV Placement Cell team will review your query and respond via email or telephone promptly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-2 px-4 py-2 rounded-lg bg-[#0D6EFD] text-white text-xs font-semibold"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#16345C] mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Dr. Rajesh Sharma"
                    className="w-full px-3.5 py-2.5 bg-[#F3F7FC] border border-[#DCE8F7] rounded-xl text-xs text-[#16345C] focus:outline-hidden focus:border-[#0D6EFD]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#16345C] mb-1">
                    Official Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. hr@company.com or student email"
                    className="w-full px-3.5 py-2.5 bg-[#F3F7FC] border border-[#DCE8F7] rounded-xl text-xs text-[#16345C] focus:outline-hidden focus:border-[#0D6EFD]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#16345C] mb-1">
                    Contact Phone
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 00000"
                    className="w-full px-3.5 py-2.5 bg-[#F3F7FC] border border-[#DCE8F7] rounded-xl text-xs text-[#16345C] focus:outline-hidden focus:border-[#0D6EFD]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#16345C] mb-1">
                    Query Subject
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#F3F7FC] border border-[#DCE8F7] rounded-xl text-xs text-[#16345C] focus:outline-hidden focus:border-[#0D6EFD]"
                  >
                    <option value="Campus Recruitment Invitation">Campus Recruitment Invitation</option>
                    <option value="Student Placement Verification">Student Placement Verification</option>
                    <option value="Internship Collaboration">Internship Collaboration</option>
                    <option value="Technical Workshop & Guest Lecture">Technical Workshop & Guest Lecture</option>
                    <option value="General Student Guidance">General Student Guidance</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#16345C] mb-1">
                  Message Details *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Please specify details regarding dates, batch, profiles, or inquiries..."
                  className="w-full px-3.5 py-2.5 bg-[#F3F7FC] border border-[#DCE8F7] rounded-xl text-xs text-[#16345C] focus:outline-hidden focus:border-[#0D6EFD]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-[#0D6EFD] hover:bg-[#2563EB] text-white text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <Send className="w-4 h-4" />
                <span>Submit Official Message</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
