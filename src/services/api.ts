import { dbStore } from './dbStore';
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

// Delay simulation for realistic UX feedback
const delay = (ms: number = 200) => new Promise((resolve) => setTimeout(resolve, ms));

export const api = {
  // --- AUTHENTICATION ---
  auth: {
    async registerStudent(data: {
      name: string;
      email: string;
      phone: string;
      password: string;
      confirmPassword: string;
      course: string;
      semester: string;
      enrollmentNumber: string;
      collegeName?: string;
    }): Promise<{ token: string; user: User }> {
      await delay(300);

      const normalizedEmail = data.email.toLowerCase().trim();
      const normalizedEnrollment = data.enrollmentNumber.toUpperCase().trim();

      // Check existing email
      if (dbStore.getUserByEmail(normalizedEmail)) {
        throw new Error('An account with this email address already exists.');
      }

      // Check existing enrollment
      if (dbStore.getStudentProfileByEnrollment(normalizedEnrollment)) {
        throw new Error('A student with this enrollment number is already registered.');
      }

      if (data.password !== data.confirmPassword) {
        throw new Error('Passwords do not match.');
      }

      if (data.password.length < 6) {
        throw new Error('Password must be at least 6 characters.');
      }

      const userId = 'usr_' + Date.now();
      const newUser: User = {
        id: userId,
        name: data.name.trim(),
        email: normalizedEmail,
        phone: data.phone.trim(),
        role: 'student',
        isActive: true,
        createdAt: new Date().toISOString(),
      };

      const newProfile: StudentProfile = {
        id: 'prof_' + Date.now(),
        user: userId,
        enrollmentNumber: normalizedEnrollment,
        collegeName: data.collegeName?.trim() || 'Kanya Maha Vidyalaya',
        course: data.course,
        semester: data.semester,
        graduationYear: 2026,
        cgpa: 0,
        backlogs: 0,
        skills: [],
        certifications: [],
        projects: [],
        placementStatus: 'available',
      };

      dbStore.createUser(newUser, data.password);
      dbStore.createStudentProfile(newProfile);

      newUser.profile = newProfile;
      const token = 'jwt_token_' + userId + '_' + Date.now();

      return { token, user: newUser };
    },

    async login(email: string, pass: string): Promise<{ token: string; user: User }> {
      await delay(250);

      const normalizedEmail = email.toLowerCase().trim();
      const user = dbStore.getUserByEmail(normalizedEmail);

      if (!user) {
        throw new Error('Invalid email or password. Please verify your credentials.');
      }

      if (!dbStore.verifyPassword(normalizedEmail, pass)) {
        throw new Error('Invalid email or password. Please verify your credentials.');
      }

      if (!user.isActive) {
        throw new Error('Your account has been deactivated. Please contact KMV Placement Cell.');
      }

      // Attach profile
      let profile = null;
      if (user.role === 'student') {
        profile = dbStore.getStudentProfileByUserId(user.id);
      } else if (user.role === 'recruiter') {
        profile = dbStore.getRecruiterProfileByUserId(user.id);
      }

      const fullUser: User = { ...user, profile };
      const token = 'jwt_token_' + user.id + '_' + Date.now();

      return { token, user: fullUser };
    },

    async getMe(userId: string): Promise<User> {
      await delay(100);
      const user = dbStore.getUserById(userId);
      if (!user) {
        throw new Error('User not found.');
      }
      let profile = null;
      if (user.role === 'student') {
        profile = dbStore.getStudentProfileByUserId(user.id);
      } else if (user.role === 'recruiter') {
        profile = dbStore.getRecruiterProfileByUserId(user.id);
      }
      return { ...user, profile };
    },

    async changePassword(email: string, currentPass: string, newPass: string): Promise<void> {
      await delay(200);
      if (!dbStore.verifyPassword(email, currentPass)) {
        throw new Error('Current password does not match.');
      }
      if (newPass.length < 6) {
        throw new Error('New password must be at least 6 characters.');
      }
      dbStore.updatePassword(email, newPass);
    },
  },

  // --- STUDENT API ---
  student: {
    async getProfile(userId: string): Promise<StudentProfile> {
      await delay(100);
      const profile = dbStore.getStudentProfileByUserId(userId);
      if (!profile) throw new Error('Student profile not found');
      return profile;
    },

    async updateProfile(userId: string, data: Partial<StudentProfile> & { name?: string; phone?: string }): Promise<StudentProfile> {
      await delay(250);
      const { name, phone, ...profileData } = data;
      if (name || phone) {
        dbStore.updateUser(userId, { ...(name && { name }), ...(phone && { phone }) });
      }
      const updated = dbStore.updateStudentProfile(userId, profileData);
      if (!updated) throw new Error('Profile update failed');
      return updated;
    },

    async getApplications(studentId: string): Promise<Application[]> {
      await delay(150);
      return dbStore.getApplicationsByStudentId(studentId);
    },

    async getStats(studentId: string): Promise<{
      profileCompletion: number;
      totalApplied: number;
      shortlistedCount: number;
      interviewsScheduled: number;
      offersReceived: number;
    }> {
      await delay(100);
      const profile = dbStore.getStudentProfileByUserId(studentId);
      const applications = dbStore.getApplicationsByStudentId(studentId);

      let completedFields = 0;
      const totalFields = 10;
      if (profile) {
        if (profile.course) completedFields++;
        if (profile.semester) completedFields++;
        if (profile.cgpa > 0) completedFields++;
        if (profile.tenthPercentage) completedFields++;
        if (profile.twelfthPercentage) completedFields++;
        if (profile.skills && profile.skills.length > 0) completedFields++;
        if (profile.projects && profile.projects.length > 0) completedFields++;
        if (profile.certifications && profile.certifications.length > 0) completedFields++;
        if (profile.resumeUrl) completedFields++;
        if (profile.bio) completedFields++;
      }
      const profileCompletion = Math.min(100, Math.round((completedFields / totalFields) * 100));

      const totalApplied = applications.length;
      const shortlistedCount = applications.filter((a) =>
        ['shortlisted', 'assessment_round', 'interview_scheduled'].includes(a.status)
      ).length;
      const interviewsScheduled = applications.filter((a) => a.status === 'interview_scheduled').length;
      const offersReceived = applications.filter((a) => a.status === 'selected').length;

      return {
        profileCompletion,
        totalApplied,
        shortlistedCount,
        interviewsScheduled,
        offersReceived,
      };
    },

    async saveAssessment(result: Omit<AssessmentResult, 'id' | 'completedAt'>): Promise<AssessmentResult> {
      await delay(200);
      const newResult: AssessmentResult = {
        ...result,
        id: 'asmt_' + Date.now(),
        completedAt: new Date().toISOString(),
      };
      return dbStore.saveAssessmentResult(newResult);
    },

    async getAssessments(studentId: string): Promise<AssessmentResult[]> {
      await delay(100);
      return dbStore.getAssessmentResults(studentId);
    },
  },

  // --- RECRUITER API ---
  recruiter: {
    async getProfile(userId: string): Promise<RecruiterProfile> {
      await delay(100);
      const prof = dbStore.getRecruiterProfileByUserId(userId);
      if (!prof) throw new Error('Recruiter profile not found');
      return prof;
    },

    async updateProfile(userId: string, data: Partial<RecruiterProfile>): Promise<RecruiterProfile> {
      await delay(200);
      const prof = dbStore.updateRecruiterProfile(userId, data);
      if (!prof) throw new Error('Failed to update recruiter profile');
      return prof;
    },

    async getMyDrives(recruiterId: string): Promise<PlacementDrive[]> {
      await delay(150);
      return dbStore.getDrives().filter((d) => d.recruiter === recruiterId);
    },

    async createDrive(recruiterId: string, data: Omit<PlacementDrive, 'id' | 'recruiter' | 'applicantsCount' | 'createdAt'>): Promise<PlacementDrive> {
      await delay(300);
      const newDrive: PlacementDrive = {
        ...data,
        id: 'drv_' + Date.now(),
        recruiter: recruiterId,
        applicantsCount: 0,
        createdAt: new Date().toISOString(),
      };
      return dbStore.createDrive(newDrive);
    },

    async updateDrive(id: string, updates: Partial<PlacementDrive>): Promise<PlacementDrive> {
      await delay(200);
      const drive = dbStore.updateDrive(id, updates);
      if (!drive) throw new Error('Drive not found');
      return drive;
    },

    async getDriveApplicants(driveId: string): Promise<Application[]> {
      await delay(150);
      return dbStore.getApplicationsByDriveId(driveId);
    },

    async updateApplicantStatus(
      appId: string,
      status: Application['status'],
      recruiterFeedback?: string,
      interviewDetails?: Application['interviewDetails']
    ): Promise<Application> {
      await delay(200);
      const updated = dbStore.updateApplication(appId, {
        status,
        ...(recruiterFeedback !== undefined && { recruiterFeedback }),
        ...(interviewDetails && { interviewDetails }),
      });
      if (!updated) throw new Error('Application update failed');

      // Send student notification
      const app = dbStore.getApplications().find((a) => a.id === appId);
      if (app) {
        dbStore.createNotification({
          id: 'notif_' + Date.now(),
          recipientId: app.studentId,
          title: `Application Update: ${app.drive?.companyName || 'Campus Drive'}`,
          message: `Your status has changed to '${status.replace('_', ' ').toUpperCase()}'.`,
          type: status === 'interview_scheduled' ? 'interview' : 'application',
          read: false,
          link: '/student/applications',
          createdAt: new Date().toISOString(),
        });
      }

      return updated;
    },
  },

  // --- PLACEMENT DRIVES ---
  drives: {
    async getAllDrives(): Promise<PlacementDrive[]> {
      await delay(150);
      return dbStore.getDrives();
    },

    async getDriveById(id: string): Promise<PlacementDrive | undefined> {
      await delay(100);
      return dbStore.getDriveById(id);
    },
  },

  // --- APPLICATIONS ---
  applications: {
    async applyToDrive(driveId: string, studentId: string): Promise<Application> {
      await delay(300);

      const drive = dbStore.getDriveById(driveId);
      if (!drive) throw new Error('Drive not found');

      if (drive.status !== 'open') {
        throw new Error(`This drive is currently ${drive.status}`);
      }

      // Check existing application
      const existing = dbStore
        .getApplicationsByStudentId(studentId)
        .find((a) => a.driveId === driveId);

      if (existing) {
        throw new Error('You have already applied for this placement drive.');
      }

      // Check student profile eligibility
      const profile = dbStore.getStudentProfileByUserId(studentId);
      if (!profile) {
        throw new Error('Please complete your student profile before applying.');
      }

      if (drive.eligibilityCriteria.minCgpa && profile.cgpa < drive.eligibilityCriteria.minCgpa) {
        throw new Error(
          `Minimum CGPA requirement not met (Required: ${drive.eligibilityCriteria.minCgpa}, Current: ${profile.cgpa})`
        );
      }

      if (
        drive.eligibilityCriteria.allowedCourses.length > 0 &&
        profile.course &&
        !drive.eligibilityCriteria.allowedCourses.some((c) => c.toLowerCase() === profile.course.toLowerCase())
      ) {
        throw new Error(
          `Course eligibility not met. Eligible: ${drive.eligibilityCriteria.allowedCourses.join(', ')}`
        );
      }

      if (profile.backlogs > drive.eligibilityCriteria.maxBacklogs) {
        throw new Error(
          `Backlog criteria not met. Max backlogs allowed: ${drive.eligibilityCriteria.maxBacklogs}`
        );
      }

      const newApp: Application = {
        id: 'app_' + Date.now(),
        driveId,
        studentId,
        appliedAt: new Date().toISOString(),
        status: 'applied',
      };

      dbStore.createApplication(newApp);

      // Create notification
      dbStore.createNotification({
        id: 'notif_' + Date.now(),
        recipientId: studentId,
        title: 'Application Submitted',
        message: `You successfully applied for ${drive.jobTitle} at ${drive.companyName}.`,
        type: 'application',
        read: false,
        link: '/student/applications',
        createdAt: new Date().toISOString(),
      });

      return newApp;
    },
  },

  // --- ADMIN API ---
  admin: {
    async getAnalytics(): Promise<{
      totalStudents: number;
      totalRecruiters: number;
      totalDrives: number;
      openDrives: number;
      totalApplications: number;
      placedStudents: number;
      selectedApplications: number;
      placementRate: number;
      topCompanies: { name: string; count: number }[];
    }> {
      await delay(150);
      const students = dbStore.getUsers().filter((u) => u.role === 'student');
      const recruiters = dbStore.getUsers().filter((u) => u.role === 'recruiter');
      const drives = dbStore.getDrives();
      const openDrives = drives.filter((d) => d.status === 'open').length;
      const applications = dbStore.getApplications();
      const placedStudents = dbStore
        .getAllStudentProfiles()
        .filter((p) => p.placementStatus === 'placed').length;
      const selectedApplications = applications.filter((a) => a.status === 'selected').length;

      const placementRate =
        students.length > 0 ? Math.round((placedStudents / students.length) * 100) : 0;

      const topCompanies = [
        { name: 'Tata Consultancy Services', count: 48 },
        { name: 'Deloitte India', count: 36 },
        { name: 'Infosys Limited', count: 22 },
        { name: 'Wipro Technologies', count: 54 },
      ];

      return {
        totalStudents: students.length,
        totalRecruiters: recruiters.length,
        totalDrives: drives.length,
        openDrives,
        totalApplications: applications.length,
        placedStudents,
        selectedApplications,
        placementRate,
        topCompanies,
      };
    },

    async getAllStudents(): Promise<{ user: User; profile: StudentProfile }[]> {
      await delay(150);
      const students = dbStore.getUsers().filter((u) => u.role === 'student');
      return students.map((u) => ({
        user: u,
        profile: dbStore.getStudentProfileByUserId(u.id)!,
      }));
    },

    async toggleUserStatus(userId: string): Promise<User> {
      await delay(150);
      const user = dbStore.getUserById(userId);
      if (!user) throw new Error('User not found');
      const updated = dbStore.updateUser(userId, { isActive: !user.isActive });
      return updated!;
    },

    async getAllRecruiters(): Promise<{ user: User; profile?: RecruiterProfile }[]> {
      await delay(150);
      const recruiters = dbStore.getUsers().filter((u) => u.role === 'recruiter');
      return recruiters.map((u) => ({
        user: u,
        profile: dbStore.getRecruiterProfileByUserId(u.id),
      }));
    },

    async getAllApplications(): Promise<Application[]> {
      await delay(150);
      return dbStore.getApplications();
    },
  },

  // --- ANNOUNCEMENTS ---
  announcements: {
    async getAnnouncements(): Promise<Announcement[]> {
      await delay(100);
      return dbStore.getAnnouncements();
    },

    async createAnnouncement(data: Omit<Announcement, 'id' | 'createdAt'>): Promise<Announcement> {
      await delay(200);
      const newAnn: Announcement = {
        ...data,
        id: 'ann_' + Date.now(),
        createdAt: new Date().toISOString(),
      };
      return dbStore.createAnnouncement(newAnn);
    },

    async deleteAnnouncement(id: string): Promise<void> {
      await delay(150);
      dbStore.deleteAnnouncement(id);
    },
  },

  // --- RESOURCES ---
  resources: {
    async getResources(): Promise<ResourceItem[]> {
      await delay(100);
      return dbStore.getResources();
    },

    async createResource(data: Omit<ResourceItem, 'id' | 'downloadCount' | 'createdAt'>): Promise<ResourceItem> {
      await delay(200);
      const newRes: ResourceItem = {
        ...data,
        id: 'res_' + Date.now(),
        downloadCount: 0,
        createdAt: new Date().toISOString(),
      };
      return dbStore.createResource(newRes);
    },
  },

  // --- NOTIFICATIONS ---
  notifications: {
    async getMyNotifications(userId: string): Promise<NotificationItem[]> {
      await delay(100);
      return dbStore.getNotifications(userId);
    },

    async markRead(id: string): Promise<void> {
      dbStore.markNotificationRead(id);
    },
  },
};
