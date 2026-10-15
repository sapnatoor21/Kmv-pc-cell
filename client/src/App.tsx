import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Toast } from './components/common/Toast';
import { AuthModals } from './components/auth/AuthModals';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { DashboardLayout } from './components/layout/DashboardLayout';

// Public pages
import { HomePage } from './pages/public/HomePage';
import { AboutPage } from './pages/public/AboutPage';
import { OpportunitiesPage } from './pages/public/OpportunitiesPage';
import { SuccessStoriesPage } from './pages/public/SuccessStoriesPage';
import { CareerPrepPage } from './pages/public/CareerPrepPage';
import { ResourcesPage } from './pages/public/ResourcesPage';
import { ContactPage } from './pages/public/ContactPage';

// Student pages
import { StudentDashboard } from './pages/student/StudentDashboard';
import { StudentProfilePage } from './pages/student/StudentProfilePage';
import { StudentApplicationsPage } from './pages/student/StudentApplicationsPage';
import { AptitudeTestPage } from './pages/student/AptitudeTestPage';
import { MockInterviewPage } from './pages/student/MockInterviewPage';
import { ResumeBuilderPage } from './pages/student/ResumeBuilderPage';
import { CodingArenaPage } from './pages/student/CodingArenaPage';
import { CareerGuidancePage } from './pages/student/CareerGuidancePage';

// Recruiter pages
import { RecruiterDashboard } from './pages/recruiter/RecruiterDashboard';
import { MyDrivesPage } from './pages/recruiter/MyDrivesPage';
import { CreateDrivePage } from './pages/recruiter/CreateDrivePage';
import { ApplicantsPage } from './pages/recruiter/ApplicantsPage';
import { CompanyProfilePage } from './pages/recruiter/CompanyProfilePage';

// Admin pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { ManageStudentsPage } from './pages/admin/ManageStudentsPage';
import { ManageRecruitersPage } from './pages/admin/ManageRecruitersPage';
import { ManageAnnouncementsPage } from './pages/admin/ManageAnnouncementsPage';
import { AdminAnalyticsPage } from './pages/admin/AdminAnalyticsPage';

const AppContent: React.FC = () => {
  const { user, currentRoute, navigate } = useAuth();

  // If in student portal
  if (currentRoute.startsWith('student/')) {
    const tab = currentRoute.replace('student/', '');
    const handleSelectTab = (newTab: string) => navigate(`student/${newTab}`);

    let title = 'Student Placement Dashboard';
    let subtitle = 'Welcome to your verified KMV career portal';
    let content = <StudentDashboard onSelectTab={handleSelectTab} />;

    if (tab === 'profile') {
      title = 'Student Profile & Transcripts';
      subtitle = 'Manage academic details, CGPA, skills, certifications, and projects';
      content = <StudentProfilePage />;
    } else if (tab === 'applications') {
      title = 'My Placement Applications';
      subtitle = 'Track round progress, reviews, and scheduled interview meetings';
      content = <StudentApplicationsPage onSelectTab={handleSelectTab} />;
    } else if (tab === 'drives') {
      title = 'Active Placement Drives';
      subtitle = 'Verified on-campus and virtual hiring drives for your batch';
      content = <OpportunitiesPage />;
    } else if (tab === 'aptitude') {
      title = 'Aptitude Practice Diagnostic';
      subtitle = 'Timed quantitative and logical reasoning simulation with real scoring';
      content = <AptitudeTestPage />;
    } else if (tab === 'mock-interview') {
      title = 'Simulated Mock Interviews';
      subtitle = 'STAR technique evaluation and technical case interview questions';
      content = <MockInterviewPage />;
    } else if (tab === 'resume-builder') {
      title = 'ATS Resume Builder';
      subtitle = 'Verified collegiate single-page resume format with print-to-PDF';
      content = <ResumeBuilderPage />;
    } else if (tab === 'coding-arena') {
      title = 'Coding & DSA Arena';
      subtitle = 'Multi-language code challenge runner with instant test cases validation';
      content = <CodingArenaPage />;
    } else if (tab === 'resources') {
      title = 'Placement Resource Library';
      subtitle = 'Download formula sheets, company syllabi, and technical handbooks';
      content = <ResourcesPage />;
    } else if (tab === 'career-guidance') {
      title = 'Placement Guidance & Strategy';
      subtitle = '4-phase preparation roadmap for competitive campus placements';
      content = <CareerGuidancePage />;
    } else if (tab === 'notifications') {
      title = 'Notifications & Alerts';
      subtitle = 'Official updates regarding your applications and interview calls';
      content = <StudentApplicationsPage onSelectTab={handleSelectTab} />;
    } else if (tab === 'settings') {
      title = 'Account Security & Settings';
      subtitle = 'Manage your password and security credentials';
      content = <StudentProfilePage />;
    }

    return (
      <DashboardLayout currentTab={tab} onSelectTab={handleSelectTab} title={title} subtitle={subtitle}>
        {content}
      </DashboardLayout>
    );
  }

  // If in recruiter portal
  if (currentRoute.startsWith('recruiter/')) {
    const tab = currentRoute.replace('recruiter/', '');
    const handleSelectTab = (newTab: string) => navigate(`recruiter/${newTab}`);

    let title = 'Recruiter Dashboard';
    let subtitle = 'Corporate placement console for Kanya Maha Vidyalaya';
    let content = <RecruiterDashboard onSelectTab={handleSelectTab} />;

    if (tab === 'my-drives') {
      title = 'My Placement Drives';
      subtitle = 'Manage, edit, or close corporate recruitment drives';
      content = <MyDrivesPage onSelectTab={handleSelectTab} />;
    } else if (tab === 'create-drive') {
      title = 'Create Placement Drive';
      subtitle = 'Define role, package, eligibility criteria, and interview rounds';
      content = <CreateDrivePage onSelectTab={handleSelectTab} />;
    } else if (tab === 'applicants' || tab === 'shortlisted' || tab === 'all-applications') {
      title = 'Candidate Screening & Shortlisting';
      subtitle = 'Review student academic transcripts, projects, and schedule interviews';
      content = <ApplicantsPage />;
    } else if (tab === 'company-profile' || tab === 'settings') {
      title = 'Corporate Profile';
      subtitle = 'Update company details, logo, and hiring coordinator contact';
      content = <CompanyProfilePage />;
    }

    return (
      <DashboardLayout currentTab={tab} onSelectTab={handleSelectTab} title={title} subtitle={subtitle}>
        {content}
      </DashboardLayout>
    );
  }

  // If in admin portal
  if (currentRoute.startsWith('admin/')) {
    const tab = currentRoute.replace('admin/', '');
    const handleSelectTab = (newTab: string) => navigate(`admin/${newTab}`);

    let title = 'Placement Cell Administration';
    let subtitle = 'Institutional management console for KMV Placement Cell';
    let content = <AdminDashboard onSelectTab={handleSelectTab} />;

    if (tab === 'students') {
      title = 'Student Records & Eligibility';
      subtitle = 'Manage student accounts, verify CGPA transcripts, and provision logins';
      content = <ManageStudentsPage />;
    } else if (tab === 'recruiters') {
      title = 'Recruiter Partner Accounts';
      subtitle = 'Manage corporate partner credentials and drive privileges';
      content = <ManageRecruitersPage />;
    } else if (tab === 'placement-drives') {
      title = 'Institutional Placement Drives';
      subtitle = 'Universal directory of all campus drives';
      content = <OpportunitiesPage />;
    } else if (tab === 'applications') {
      title = 'Universal Applications Monitor';
      subtitle = 'All student applications across all active drives';
      content = <ApplicantsPage />;
    } else if (tab === 'announcements') {
      title = 'Circulars & Announcements';
      subtitle = 'Publish official circulars, drive dates, and policy notices';
      content = <ManageAnnouncementsPage />;
    } else if (tab === 'resources') {
      title = 'Placement Resources Management';
      subtitle = 'Curated guides and downloadable study materials';
      content = <ResourcesPage />;
    } else if (tab === 'analytics' || tab === 'settings') {
      title = 'Comprehensive Placement Analytics';
      subtitle = 'Real database metrics, NAAC reports, and cohort placement rates';
      content = <AdminAnalyticsPage />;
    }

    return (
      <DashboardLayout currentTab={tab} onSelectTab={handleSelectTab} title={title} subtitle={subtitle}>
        {content}
      </DashboardLayout>
    );
  }

  // Public Website Routing
  const renderPublicPage = () => {
    switch (currentRoute) {
      case 'about':
        return <AboutPage onNavigate={navigate} />;
      case 'opportunities':
      case 'drives':
        return <OpportunitiesPage />;
      case 'stories':
        return <SuccessStoriesPage />;
      case 'career-prep':
        return <CareerPrepPage onNavigate={navigate} />;
      case 'resources':
        return <ResourcesPage />;
      case 'contact':
        return <ContactPage />;
      case 'home':
      default:
        return <HomePage onNavigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F3F7FC] text-[#16345C]">
      <Navbar activePage={currentRoute} onNavigate={navigate} />
      <main className="flex-1">{renderPublicPage()}</main>
      <Footer onNavigate={navigate} />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
      <Toast />
      <AuthModals />
    </AuthProvider>
  );
}
