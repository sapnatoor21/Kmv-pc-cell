import {
  User,
  StudentProfile,
  RecruiterProfile,
  PlacementDrive,
  Application,
  Announcement,
  ResourceItem,
  NotificationItem,
  AssessmentResult,
} from '../types';

const STORAGE_KEY = 'kmv_placement_cell_db_v1';

interface DBState {
  users: User[];
  passwords: Record<string, string>; // Plain / hashed passwords for internal verify
  studentProfiles: StudentProfile[];
  recruiterProfiles: RecruiterProfile[];
  placementDrives: PlacementDrive[];
  applications: Application[];
  announcements: Announcement[];
  resources: ResourceItem[];
  notifications: NotificationItem[];
  assessmentResults: AssessmentResult[];
}

const INITIAL_DB: DBState = {
  users: [
    {
      id: 'usr_admin_1',
      name: 'Dr. Neetu Chopra (Dean Placement & Career Services)',
      email: 'admin@kmv.ac.in',
      phone: '+91 181 2296605',
      role: 'admin',
      isActive: true,
      createdAt: '2025-01-10T10:00:00.000Z',
    },
    {
      id: 'usr_recruiter_1',
      name: 'Rajesh Sharma (Campus Hiring Lead)',
      email: 'careers@tcs.com',
      phone: '+91 98765 43210',
      role: 'recruiter',
      isActive: true,
      createdAt: '2025-01-15T11:00:00.000Z',
    },
    {
      id: 'usr_student_1',
      name: 'Simran Kaur',
      email: 'student@kmv.ac.in',
      phone: '+91 98140 12345',
      role: 'student',
      isActive: true,
      createdAt: '2025-01-20T09:00:00.000Z',
    },
    {
      id: 'usr_student_2',
      name: 'Harpreet Bhatia',
      email: 'harpreet.bca@kmv.ac.in',
      phone: '+91 98761 22334',
      role: 'student',
      isActive: true,
      createdAt: '2025-01-22T09:30:00.000Z',
    },
  ],
  passwords: {
    'admin@kmv.ac.in': 'KmvAdmin@2026',
    'careers@tcs.com': 'Recruiter@123',
    'student@kmv.ac.in': 'Student@123',
    'harpreet.bca@kmv.ac.in': 'Student@123',
  },
  studentProfiles: [
    {
      id: 'prof_std_1',
      user: 'usr_student_1',
      enrollmentNumber: 'KMV/2023/BCA/042',
      collegeName: 'Kanya Maha Vidyalaya',
      course: 'BCA',
      semester: 'Semester 6',
      graduationYear: 2026,
      cgpa: 8.85,
      tenthPercentage: 92.4,
      twelfthPercentage: 89.6,
      backlogs: 0,
      skills: ['React.js', 'TypeScript', 'Node.js', 'Python', 'SQL', 'MongoDB', 'Data Structures & Algorithms', 'Git'],
      certifications: [
        {
          title: 'Meta Certified Front-End Developer',
          issuer: 'Coursera & Meta',
          issueDate: '2025-08-15',
          credentialUrl: 'https://coursera.org/verify/KMV-FRONTEND-2025',
        },
        {
          title: 'HackerRank Problem Solving (Gold Badge)',
          issuer: 'HackerRank',
          issueDate: '2025-10-02',
          credentialUrl: 'https://hackerrank.com/certificates/kmv-simran',
        },
      ],
      projects: [
        {
          title: 'KMV Campus Events & Symposium Portal',
          description: 'A responsive full-stack platform managing student registrations, QR ticketing, and certificate generation for annual collegiate events.',
          techStack: ['React', 'Node.js', 'Express', 'MongoDB'],
          githubUrl: 'https://github.com/simran-kmv/campus-portal',
          liveUrl: 'https://kmv-campus-events.demo.app',
        },
        {
          title: 'Smart Placement Eligibility Screener',
          description: 'Automated parser and rules engine checking student transcripts against corporate drive prerequisites.',
          techStack: ['Python', 'FastAPI', 'PostgreSQL'],
          githubUrl: 'https://github.com/simran-kmv/placement-screener',
        },
      ],
      resumeUrl: '',
      bio: 'Final year BCA student at Kanya Maha Vidyalaya, Jalandhar with a strong foundation in full-stack web engineering, software design, and problem solving. Seeking a software engineer or associate technology analyst role.',
      linkedin: 'https://linkedin.com/in/simran-kaur-kmv',
      github: 'https://github.com/simran-kmv',
      portfolioUrl: 'https://simrankaur.dev',
      placementStatus: 'available',
    },
    {
      id: 'prof_std_2',
      user: 'usr_student_2',
      enrollmentNumber: 'KMV/2023/BCA/019',
      collegeName: 'Kanya Maha Vidyalaya',
      course: 'BCA',
      semester: 'Semester 6',
      graduationYear: 2026,
      cgpa: 8.12,
      tenthPercentage: 88.0,
      twelfthPercentage: 85.5,
      backlogs: 0,
      skills: ['Java', 'Spring Boot', 'MySQL', 'JavaScript', 'HTML/CSS'],
      certifications: [
        {
          title: 'Oracle Certified Java SE 11 Associate',
          issuer: 'Oracle',
          issueDate: '2025-05-12',
        },
      ],
      projects: [
        {
          title: 'Library Book Reservation System',
          description: 'Desktop and web portal for tracking catalog availability, fines, and student issuance history.',
          techStack: ['Java', 'MySQL', 'Swing'],
        },
      ],
      bio: 'Enthusiastic backend software developer eager to build enterprise-grade applications.',
      placementStatus: 'placed',
    },
  ],
  recruiterProfiles: [
    {
      id: 'prof_rec_1',
      user: 'usr_recruiter_1',
      companyName: 'Tata Consultancy Services (TCS)',
      industry: 'Information Technology & Consulting',
      website: 'https://www.tcs.com',
      location: 'Chandigarh / Mohali / Pan India',
      contactPerson: 'Rajesh Sharma',
      designation: 'Campus Hiring Lead - North Zone',
      aboutCompany: 'Tata Consultancy Services is an IT services, consulting and business solutions organization partnering with many of the world’s largest enterprises for over 55 years.',
      verificationStatus: 'verified',
    },
  ],
  placementDrives: [
    {
      id: 'drv_1',
      recruiter: 'usr_recruiter_1',
      companyName: 'Tata Consultancy Services (TCS)',
      companyLogo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=120&auto=format&fit=crop&q=80',
      jobTitle: 'Assistant System Engineer (TCS Ninja & Digital)',
      jobRole: 'Software Engineering & Cloud Systems',
      jobType: 'Full-Time',
      location: 'Mohali / Gurgaon / Bangalore',
      ctcSalary: '7.5 LPA',
      stipend: 'N/A',
      eligibilityCriteria: {
        minCgpa: 6.5,
        allowedCourses: ['B.Tech CSE', 'BCA', 'MCA', 'B.Sc IT', 'M.Sc IT'],
        maxBacklogs: 0,
        graduationYear: 2026,
      },
      skillsRequired: ['Java / Python', 'DBMS & SQL', 'Data Structures', 'OOPS Concepts'],
      description: 'Tata Consultancy Services is hiring fresh graduates from KMV for its prestigious Ninja and Digital tracks. Selected associates will work on enterprise cloud applications, AI pipelines, and digital financial platforms.',
      selectionRounds: ['National Qualifier Assessment (NQT)', 'Technical Coding Round', 'Managerial & HR Interview'],
      applicationDeadline: '2026-11-20',
      driveDate: '2026-11-28',
      status: 'open',
      applicantsCount: 48,
      createdAt: '2026-10-01T10:00:00.000Z',
    },
    {
      id: 'drv_2',
      recruiter: 'usr_recruiter_1',
      companyName: 'Deloitte India',
      companyLogo: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=120&auto=format&fit=crop&q=80',
      jobTitle: 'Associate Analyst - Technology Risk & Assurance',
      jobRole: 'Advisory & Cybersecurity Assurance',
      jobType: 'Full-Time',
      location: 'Gurgaon / Hyderabad',
      ctcSalary: '8.2 LPA',
      stipend: 'N/A',
      eligibilityCriteria: {
        minCgpa: 7.0,
        allowedCourses: ['BCA', 'MCA', 'B.Sc IT', 'B.Com', 'M.Sc IT'],
        maxBacklogs: 0,
        graduationYear: 2026,
      },
      skillsRequired: ['Technology Risk Analysis', 'Database Auditing', 'Python / Excel Modeling', 'Business Communication'],
      description: 'Join Deloitte USI advisory practice assisting Fortune 500 corporations in managing cyber risks, cloud compliance, financial controls, and digital forensics.',
      selectionRounds: ['Online Aptitude & Logic Assessment', 'Business Case Analysis', 'Partner & Behavioral Interview'],
      applicationDeadline: '2026-11-15',
      driveDate: '2026-11-24',
      status: 'open',
      applicantsCount: 36,
      createdAt: '2026-10-05T12:00:00.000Z',
    },
    {
      id: 'drv_3',
      recruiter: 'usr_recruiter_1',
      companyName: 'Infosys Limited',
      companyLogo: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=120&auto=format&fit=crop&q=80',
      jobTitle: 'Specialist Programmer (Power Programmer)',
      jobRole: 'High-Performance Core Engineering',
      jobType: 'Full-Time',
      location: 'Chandigarh / Pune / Bangalore',
      ctcSalary: '9.5 LPA',
      stipend: 'N/A',
      eligibilityCriteria: {
        minCgpa: 7.5,
        allowedCourses: ['B.Tech CSE', 'MCA', 'BCA', 'M.Sc IT'],
        maxBacklogs: 0,
        graduationYear: 2026,
      },
      skillsRequired: ['Advanced Algorithms', 'Dynamic Programming', 'System Design', 'C++ / Java / Python'],
      description: 'The Specialist Programmer role at Infosys is tailored for elite coders who engineer high-throughput systems, low-latency microservices, and modern web architectures.',
      selectionRounds: ['Online Coding Challenge (3 Complex Problems)', 'Technical Deep-Dive Interview', 'Executive HR Round'],
      applicationDeadline: '2026-11-10',
      driveDate: '2026-11-18',
      status: 'open',
      applicantsCount: 22,
      createdAt: '2026-10-08T15:00:00.000Z',
    },
    {
      id: 'drv_4',
      recruiter: 'usr_recruiter_1',
      companyName: 'Wipro Technologies',
      companyLogo: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=120&auto=format&fit=crop&q=80',
      jobTitle: 'Project Engineer (Elite National Talent Hunt)',
      jobRole: 'Full Stack & Cloud Operations',
      jobType: 'Full-Time',
      location: 'Noida / Greater Noida / Pan India',
      ctcSalary: '6.5 LPA',
      stipend: 'N/A',
      eligibilityCriteria: {
        minCgpa: 6.0,
        allowedCourses: ['BCA', 'B.Sc IT', 'MCA', 'B.Tech CSE'],
        maxBacklogs: 1,
        graduationYear: 2026,
      },
      skillsRequired: ['Core Java', 'Web Technologies', 'SQL & RDBMS', 'Analytical Problem Solving'],
      description: 'Wipro is inviting students from KMV for campus recruitment as Project Engineers across international banking, health sciences, and telecom domains.',
      selectionRounds: ['Aptitude & Coding Assessment', 'Technical Interview', 'HR Verification'],
      applicationDeadline: '2026-11-25',
      driveDate: '2026-12-05',
      status: 'open',
      applicantsCount: 54,
      createdAt: '2026-10-12T09:00:00.000Z',
    },
  ],
  applications: [
    {
      id: 'app_1',
      driveId: 'drv_1',
      studentId: 'usr_student_1',
      appliedAt: '2026-10-02T14:30:00.000Z',
      status: 'interview_scheduled',
      interviewDetails: {
        scheduledDate: '2026-11-05',
        timeString: '11:00 AM IST',
        roundName: 'Technical & Coding Round 1',
        meetingLink: 'https://tcs.webex.com/meet/kmv-campus-drive-room-4',
        venue: 'KMV Seminar Hall / Online Webex',
      },
      recruiterFeedback: 'Strong score in NQT mock. Shortlisted for technical interview.',
    },
    {
      id: 'app_2',
      driveId: 'drv_2',
      studentId: 'usr_student_1',
      appliedAt: '2026-10-06T10:15:00.000Z',
      status: 'shortlisted',
      recruiterFeedback: 'Academic record verified. Case study round scheduled shortly.',
    },
    {
      id: 'app_3',
      driveId: 'drv_1',
      studentId: 'usr_student_2',
      appliedAt: '2026-10-03T11:00:00.000Z',
      status: 'selected',
      recruiterFeedback: 'Outstanding performance across rounds. Offer Letter issued!',
    },
  ],
  announcements: [
    {
      id: 'ann_1',
      title: 'KMV Annual Campus Placement Season 2025-26 Officially Commences',
      content: 'We take great pride in welcoming premier recruiters including TCS, Deloitte, Infosys, and Wipro for on-campus drives at Kanya Maha Vidyalaya. All graduating students must ensure their verified CGPA transcripts and uploaded resumes are complete.',
      category: 'drive_alert',
      targetAudience: 'all',
      isPinned: true,
      authorName: 'Dr. Neetu Chopra',
      createdAt: '2026-10-01T08:00:00.000Z',
    },
    {
      id: 'ann_2',
      title: 'Pre-Placement Technical & Aptitude Bootcamp in KMV Auditorium',
      content: 'The Training and Placement Cell is organizing a 3-day intensive boot camp on Quantitative Aptitude, Logical Reasoning, and Data Structures starting Monday. Attendance is strongly recommended for all final-year students.',
      category: 'workshop',
      targetAudience: 'students',
      isPinned: false,
      authorName: 'KMV Placement Cell',
      createdAt: '2026-10-08T10:30:00.000Z',
    },
    {
      id: 'ann_3',
      title: 'Updated Placement Code of Conduct & Offer Policy',
      content: 'Students are advised to review the "One Student, One Dream Job" policy. Once an offer above 7.0 LPA is accepted, students may only sit for Tier-1 Super Dream drives above 12.0 LPA.',
      category: 'policy',
      targetAudience: 'students',
      isPinned: false,
      authorName: 'Office of Dean Academics',
      createdAt: '2026-10-10T14:00:00.000Z',
    },
  ],
  resources: [
    {
      id: 'res_1',
      title: 'KMV Placement Aptitude & Quantitative Formula Handbook',
      description: 'Quick reference formulas for Speed-Time-Distance, Permutations, Probability, Time & Work, and Data Interpretation.',
      category: 'aptitude',
      fileUrl: '#download-handbook',
      fileType: 'PDF',
      fileSize: '2.4 MB',
      downloadCount: 342,
      createdAt: '2026-09-15T09:00:00.000Z',
    },
    {
      id: 'res_2',
      title: 'Top 100 Technical Interview Questions & Core CS Fundamentals',
      description: 'Curated frequently asked questions covering OOPS, DBMS normalization, indexing, OS memory paging, and TCP/IP protocol stack.',
      category: 'technical',
      fileUrl: '#download-tech-guide',
      fileType: 'PDF',
      fileSize: '3.1 MB',
      downloadCount: 518,
      createdAt: '2026-09-20T10:00:00.000Z',
    },
    {
      id: 'res_3',
      title: 'Standard KMV Approved Single-Page ATS Resume Template',
      description: 'ATS-friendly single page resume format designed specifically for campus recruitment drives with verified college crest.',
      category: 'resume_templates',
      fileUrl: '#download-resume-doc',
      fileType: 'DOCX',
      fileSize: '0.8 MB',
      downloadCount: 689,
      createdAt: '2026-09-22T11:00:00.000Z',
    },
    {
      id: 'res_4',
      title: 'HR & Behavioral Interview Toolkit (STAR Technique Guide)',
      description: 'Frameworks to answer "Tell me about yourself", handling situational questions, salary negotiation, and company culture research.',
      category: 'hr_interview',
      fileUrl: '#download-hr-guide',
      fileType: 'PDF',
      fileSize: '1.7 MB',
      downloadCount: 290,
      createdAt: '2026-10-02T12:00:00.000Z',
    },
  ],
  notifications: [
    {
      id: 'notif_1',
      recipientId: 'usr_student_1',
      title: 'Interview Scheduled: TCS Ninja & Digital',
      message: 'Your Technical & Coding Round 1 has been scheduled for 2026-11-05 at 11:00 AM IST. Check application details for Webex link.',
      type: 'interview',
      read: false,
      link: '/student/applications',
      createdAt: '2026-10-14T09:00:00.000Z',
    },
    {
      id: 'notif_2',
      recipientId: 'usr_student_1',
      title: 'Application Shortlisted: Deloitte India',
      message: 'Congratulations! Your profile has been shortlisted for Associate Analyst at Deloitte India.',
      type: 'application',
      read: false,
      link: '/student/applications',
      createdAt: '2026-10-12T15:30:00.000Z',
    },
    {
      id: 'notif_3',
      recipientId: 'usr_student_1',
      title: 'New Placement Drive Announced: Infosys Specialist Programmer',
      message: 'Infosys has posted a new drive offering 9.5 LPA for BCA/MCA students. Apply before 2026-11-10.',
      type: 'drive',
      read: true,
      link: '/student/drives',
      createdAt: '2026-10-08T15:05:00.000Z',
    },
  ],
  assessmentResults: [
    {
      id: 'asmt_1',
      studentId: 'usr_student_1',
      testType: 'aptitude',
      title: 'General Quantitative & Logical Reasoning Diagnostic',
      score: 13,
      totalMarks: 15,
      percentage: 86.6,
      completedAt: '2026-10-10T16:45:00.000Z',
    },
  ],
};

class DBStore {
  private state: DBState;

  constructor() {
    this.state = this.load();
  }

  private load(): DBState {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.error('Failed to load DB state from localStorage', e);
    }
    this.save(INITIAL_DB);
    return INITIAL_DB;
  }

  private save(state: DBState): void {
    try {
      this.state = state;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error('Failed to persist DB state', e);
    }
  }

  public resetToDefault(): void {
    this.save(INITIAL_DB);
  }

  // --- User Operations ---
  public getUsers(): User[] {
    return this.state.users;
  }

  public getUserById(id: string): User | undefined {
    return this.state.users.find((u) => u.id === id);
  }

  public getUserByEmail(email: string): User | undefined {
    return this.state.users.find((u) => u.email.toLowerCase() === email.toLowerCase().trim());
  }

  public verifyPassword(email: string, pass: string): boolean {
    const stored = this.state.passwords[email.toLowerCase().trim()];
    return stored === pass;
  }

  public createUser(user: User, pass: string): User {
    const updatedUsers = [...this.state.users, user];
    const updatedPasswords = {
      ...this.state.passwords,
      [user.email.toLowerCase().trim()]: pass,
    };
    this.save({
      ...this.state,
      users: updatedUsers,
      passwords: updatedPasswords,
    });
    return user;
  }

  public updateUser(id: string, updates: Partial<User>): User | undefined {
    const index = this.state.users.findIndex((u) => u.id === id);
    if (index === -1) return undefined;
    const updated = { ...this.state.users[index], ...updates };
    const users = [...this.state.users];
    users[index] = updated;
    this.save({ ...this.state, users });
    return updated;
  }

  public updatePassword(email: string, newPass: string): void {
    const passwords = {
      ...this.state.passwords,
      [email.toLowerCase().trim()]: newPass,
    };
    this.save({ ...this.state, passwords });
  }

  // --- Student Profile Operations ---
  public getStudentProfileByUserId(userId: string): StudentProfile | undefined {
    return this.state.studentProfiles.find((p) => p.user === userId);
  }

  public getStudentProfileByEnrollment(enrollment: string): StudentProfile | undefined {
    return this.state.studentProfiles.find(
      (p) => p.enrollmentNumber.toUpperCase() === enrollment.toUpperCase().trim()
    );
  }

  public createStudentProfile(profile: StudentProfile): StudentProfile {
    const studentProfiles = [...this.state.studentProfiles, profile];
    this.save({ ...this.state, studentProfiles });
    return profile;
  }

  public updateStudentProfile(userId: string, updates: Partial<StudentProfile>): StudentProfile | undefined {
    const index = this.state.studentProfiles.findIndex((p) => p.user === userId);
    if (index === -1) return undefined;
    const updated = { ...this.state.studentProfiles[index], ...updates };
    const studentProfiles = [...this.state.studentProfiles];
    studentProfiles[index] = updated;
    this.save({ ...this.state, studentProfiles });
    return updated;
  }

  public getAllStudentProfiles(): StudentProfile[] {
    return this.state.studentProfiles;
  }

  // --- Recruiter Profile Operations ---
  public getRecruiterProfileByUserId(userId: string): RecruiterProfile | undefined {
    return this.state.recruiterProfiles.find((p) => p.user === userId);
  }

  public createRecruiterProfile(profile: RecruiterProfile): RecruiterProfile {
    const recruiterProfiles = [...this.state.recruiterProfiles, profile];
    this.save({ ...this.state, recruiterProfiles });
    return profile;
  }

  public updateRecruiterProfile(userId: string, updates: Partial<RecruiterProfile>): RecruiterProfile | undefined {
    const index = this.state.recruiterProfiles.findIndex((p) => p.user === userId);
    if (index === -1) return undefined;
    const updated = { ...this.state.recruiterProfiles[index], ...updates };
    const recruiterProfiles = [...this.state.recruiterProfiles];
    recruiterProfiles[index] = updated;
    this.save({ ...this.state, recruiterProfiles });
    return updated;
  }

  // --- Placement Drives ---
  public getDrives(): PlacementDrive[] {
    return this.state.placementDrives;
  }

  public getDriveById(id: string): PlacementDrive | undefined {
    return this.state.placementDrives.find((d) => d.id === id);
  }

  public createDrive(drive: PlacementDrive): PlacementDrive {
    const placementDrives = [drive, ...this.state.placementDrives];
    this.save({ ...this.state, placementDrives });
    return drive;
  }

  public updateDrive(id: string, updates: Partial<PlacementDrive>): PlacementDrive | undefined {
    const index = this.state.placementDrives.findIndex((d) => d.id === id);
    if (index === -1) return undefined;
    const updated = { ...this.state.placementDrives[index], ...updates };
    const placementDrives = [...this.state.placementDrives];
    placementDrives[index] = updated;
    this.save({ ...this.state, placementDrives });
    return updated;
  }

  // --- Applications ---
  public getApplications(): Application[] {
    return this.state.applications.map((app) => ({
      ...app,
      drive: this.getDriveById(app.driveId),
      student: this.getUserById(app.studentId),
      studentProfile: this.getStudentProfileByUserId(app.studentId),
    }));
  }

  public getApplicationsByStudentId(studentId: string): Application[] {
    return this.getApplications().filter((app) => app.studentId === studentId);
  }

  public getApplicationsByDriveId(driveId: string): Application[] {
    return this.getApplications().filter((app) => app.driveId === driveId);
  }

  public createApplication(app: Application): Application {
    const applications = [app, ...this.state.applications];
    // update drive applicant count
    const drive = this.getDriveById(app.driveId);
    if (drive) {
      this.updateDrive(app.driveId, { applicantsCount: (drive.applicantsCount || 0) + 1 });
    }
    this.save({ ...this.state, applications });
    return app;
  }

  public updateApplication(id: string, updates: Partial<Application>): Application | undefined {
    const index = this.state.applications.findIndex((a) => a.id === id);
    if (index === -1) return undefined;
    const updated = { ...this.state.applications[index], ...updates };
    const applications = [...this.state.applications];
    applications[index] = updated;
    this.save({ ...this.state, applications });
    return updated;
  }

  // --- Announcements ---
  public getAnnouncements(): Announcement[] {
    return this.state.announcements;
  }

  public createAnnouncement(announcement: Announcement): Announcement {
    const announcements = [announcement, ...this.state.announcements];
    this.save({ ...this.state, announcements });
    return announcement;
  }

  public deleteAnnouncement(id: string): boolean {
    const filtered = this.state.announcements.filter((a) => a.id !== id);
    this.save({ ...this.state, announcements: filtered });
    return true;
  }

  // --- Resources ---
  public getResources(): ResourceItem[] {
    return this.state.resources;
  }

  public createResource(resource: ResourceItem): ResourceItem {
    const resources = [resource, ...this.state.resources];
    this.save({ ...this.state, resources });
    return resource;
  }

  // --- Notifications ---
  public getNotifications(userId: string): NotificationItem[] {
    return this.state.notifications.filter((n) => n.recipientId === userId);
  }

  public createNotification(notif: NotificationItem): NotificationItem {
    const notifications = [notif, ...this.state.notifications];
    this.save({ ...this.state, notifications });
    return notif;
  }

  public markNotificationRead(id: string): void {
    const index = this.state.notifications.findIndex((n) => n.id === id);
    if (index !== -1) {
      const notifications = [...this.state.notifications];
      notifications[index] = { ...notifications[index], read: true };
      this.save({ ...this.state, notifications });
    }
  }

  // --- Assessments ---
  public getAssessmentResults(studentId: string): AssessmentResult[] {
    return this.state.assessmentResults.filter((a) => a.studentId === studentId);
  }

  public saveAssessmentResult(result: AssessmentResult): AssessmentResult {
    const assessmentResults = [result, ...this.state.assessmentResults];
    this.save({ ...this.state, assessmentResults });
    return result;
  }
}

export const dbStore = new DBStore();
