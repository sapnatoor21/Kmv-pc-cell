export type UserRole = 'student' | 'recruiter' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  isActive: boolean;
  profile?: StudentProfile | RecruiterProfile | null;
  createdAt?: string;
}

export interface StudentProfile {
  id: string;
  user: string;
  enrollmentNumber: string;
  collegeName: string;
  course: string;
  semester: string;
  graduationYear: number;
  cgpa: number;
  tenthPercentage?: number;
  twelfthPercentage?: number;
  backlogs: number;
  skills: string[];
  certifications: {
    title: string;
    issuer: string;
    issueDate: string;
    credentialUrl?: string;
  }[];
  projects: {
    title: string;
    description: string;
    techStack: string[];
    githubUrl?: string;
    liveUrl?: string;
  }[];
  resumeUrl?: string;
  bio?: string;
  linkedin?: string;
  github?: string;
  portfolioUrl?: string;
  profilePhotoUrl?: string;
  placementStatus: 'available' | 'placed' | 'opted_out';
}

export interface RecruiterProfile {
  id: string;
  user: string;
  companyName: string;
  industry: string;
  website?: string;
  logoUrl?: string;
  location?: string;
  contactPerson?: string;
  designation?: string;
  aboutCompany?: string;
  verificationStatus: 'pending' | 'verified' | 'rejected';
}

export interface PlacementDrive {
  id: string;
  recruiter: string;
  companyName: string;
  companyLogo?: string;
  jobTitle: string;
  jobRole: string;
  jobType: 'Full-Time' | 'Internship' | 'Internship+PPO' | 'Part-Time';
  location: string;
  ctcSalary: string;
  stipend?: string;
  eligibilityCriteria: {
    minCgpa: number;
    allowedCourses: string[];
    maxBacklogs: number;
    graduationYear: number;
  };
  skillsRequired: string[];
  description: string;
  selectionRounds: string[];
  applicationDeadline: string;
  driveDate: string;
  status: 'open' | 'closed' | 'upcoming' | 'completed';
  applicantsCount: number;
  createdAt: string;
}

export type ApplicationStatus =
  | 'applied'
  | 'under_review'
  | 'shortlisted'
  | 'assessment_round'
  | 'interview_scheduled'
  | 'selected'
  | 'rejected';

export interface Application {
  id: string;
  driveId: string;
  drive?: PlacementDrive;
  studentId: string;
  student?: {
    id: string;
    name: string;
    email: string;
    phone: string;
  };
  studentProfile?: StudentProfile;
  appliedAt: string;
  status: ApplicationStatus;
  interviewDetails?: {
    scheduledDate: string;
    timeString: string;
    roundName: string;
    meetingLink?: string;
    venue?: string;
  };
  recruiterFeedback?: string;
  assessmentScore?: number;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  category: 'drive_alert' | 'workshop' | 'policy' | 'general';
  targetAudience: 'all' | 'students' | 'recruiters';
  isPinned: boolean;
  authorName: string;
  createdAt: string;
}

export interface ResourceItem {
  id: string;
  title: string;
  description: string;
  category: 'aptitude' | 'technical' | 'hr_interview' | 'resume_templates' | 'syllabus';
  fileUrl: string;
  fileType: string;
  fileSize: string;
  downloadCount: number;
  createdAt: string;
}

export interface NotificationItem {
  id: string;
  recipientId: string;
  title: string;
  message: string;
  type: 'drive' | 'application' | 'interview' | 'system';
  read: boolean;
  link?: string;
  createdAt: string;
}

export interface AssessmentResult {
  id: string;
  studentId: string;
  testType: 'aptitude' | 'coding' | 'mock_interview';
  title: string;
  score: number;
  totalMarks: number;
  percentage: number;
  details?: Record<string, any>;
  completedAt: string;
}
