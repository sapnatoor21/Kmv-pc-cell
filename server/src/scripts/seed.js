import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from '../models/User.js';
import { StudentProfile } from '../models/StudentProfile.js';
import { RecruiterProfile } from '../models/RecruiterProfile.js';
import { PlacementDrive } from '../models/PlacementDrive.js';
import { Announcement } from '../models/Announcement.js';
import { Resource } from '../models/Resource.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/kmv_placement_cell';

const seedDatabase = async () => {
  try {
    console.log('[KMV Seed] Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI);
    console.log('[KMV Seed] Connected successfully.');

    // 1. Check or Create Admin
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@kmv.ac.in';
    let admin = await User.findOne({ email: adminEmail });

    if (!admin) {
      console.log('[KMV Seed] Creating Initial Administrator account...');
      admin = await User.create({
        name: process.env.ADMIN_NAME || 'KMV Placement Director',
        email: adminEmail,
        phone: process.env.ADMIN_PHONE || '+91 181 2296605',
        password: process.env.ADMIN_PASSWORD || 'KmvAdmin@2026',
        role: 'admin',
        isActive: true,
      });
      console.log(`[KMV Seed] Admin created: ${admin.email}`);
    } else {
      console.log(`[KMV Seed] Admin already exists: ${admin.email}`);
    }

    // 2. Check or Create Sample Recruiter
    const recruiterEmail = 'careers@tcs.com';
    let recruiterUser = await User.findOne({ email: recruiterEmail });
    if (!recruiterUser) {
      recruiterUser = await User.create({
        name: 'Rajesh Sharma (HR Campus Lead)',
        email: recruiterEmail,
        phone: '+91 98765 43210',
        password: 'Recruiter@123',
        role: 'recruiter',
      });

      await RecruiterProfile.create({
        user: recruiterUser._id,
        companyName: 'Tata Consultancy Services (TCS)',
        industry: 'Information Technology & Consulting',
        website: 'https://www.tcs.com',
        location: 'Chandigarh / Mohali / Pan India',
        contactPerson: 'Rajesh Sharma',
        designation: 'Campus Hiring Lead - North Zone',
        aboutCompany: 'Tata Consultancy Services is an IT services, consulting and business solutions organization that has been partnering with many of the world’s largest businesses in their transformation journeys for over 50 years.',
        verificationStatus: 'verified',
      });
      console.log('[KMV Seed] Sample recruiter created: careers@tcs.com');
    }

    // 3. Check or Create Sample Student
    const studentEmail = 'student@kmv.ac.in';
    let studentUser = await User.findOne({ email: studentEmail });
    if (!studentUser) {
      studentUser = await User.create({
        name: 'Simran Kaur',
        email: studentEmail,
        phone: '+91 98140 12345',
        password: 'Student@123',
        role: 'student',
      });

      await StudentProfile.create({
        user: studentUser._id,
        enrollmentNumber: 'KMV/2023/BCA/042',
        collegeName: 'Kanya Maha Vidyalaya',
        course: 'BCA',
        semester: 'Semester 6',
        graduationYear: 2026,
        cgpa: 8.8,
        tenthPercentage: 92.4,
        twelfthPercentage: 89.6,
        backlogs: 0,
        skills: ['React', 'JavaScript', 'Python', 'Node.js', 'SQL', 'Data Structures', 'Tailwind CSS'],
        bio: 'Final year BCA student passionate about full-stack web engineering, algorithms, and cloud technologies.',
        placementStatus: 'available',
        certifications: [
          {
            title: 'Full Stack Web Development Certification',
            issuer: 'HackerRank',
            issueDate: '2025-08-10',
            credentialUrl: 'https://hackerrank.com/certificates',
          },
        ],
        projects: [
          {
            title: 'KMV Campus Event Management Portal',
            description: 'A responsive web application for managing university symposiums, attendance, and certificates.',
            techStack: ['React', 'Express', 'MongoDB'],
          },
        ],
      });
      console.log('[KMV Seed] Sample student created: student@kmv.ac.in');
    }

    // 4. Seed Drives if none exist
    const driveCount = await PlacementDrive.countDocuments();
    if (driveCount === 0 && recruiterUser) {
      console.log('[KMV Seed] Seeding placement drives...');
      await PlacementDrive.insertMany([
        {
          recruiter: recruiterUser._id,
          companyName: 'Tata Consultancy Services (TCS)',
          jobTitle: 'Assistant System Engineer (TCS Ninja & Digital)',
          jobRole: 'Software Development & IT Infrastructure',
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
          description: 'Tata Consultancy Services is hiring fresh graduates for its prestigious Ninja and Digital roles. Candidates will work on cutting-edge enterprise cloud transformations, AI engineering, and full-stack solutions.',
          selectionRounds: ['National Qualifier Test (NQT)', 'Technical Round', 'Managerial & HR Interview'],
          applicationDeadline: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
          driveDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
          status: 'open',
          applicantsCount: 42,
        },
        {
          recruiter: recruiterUser._id,
          companyName: 'Deloitte India',
          jobTitle: 'Associate Analyst - Technology Risk',
          jobRole: 'Advisory & Tech Consulting',
          jobType: 'Full-Time',
          location: 'Gurgaon / Hyderabad',
          ctcSalary: '8.2 LPA',
          stipend: 'N/A',
          eligibilityCriteria: {
            minCgpa: 7.0,
            allowedCourses: ['BCA', 'MCA', 'B.Com', 'B.Sc IT'],
            maxBacklogs: 0,
            graduationYear: 2026,
          },
          skillsRequired: ['Cybersecurity Fundamentals', 'Database Auditing', 'Python / Excel Modeling', 'Communication'],
          description: 'Deloitte is seeking energetic, analytical individuals to assist clients in identifying and evaluating technology risks, data governance, and regulatory resilience across global corporations.',
          selectionRounds: ['Aptitude & Verbal Assessment', 'Case Study Round', 'Partner Interview'],
          applicationDeadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
          driveDate: new Date(Date.now() + 18 * 24 * 60 * 60 * 1000),
          status: 'open',
          applicantsCount: 31,
        },
        {
          recruiter: recruiterUser._id,
          companyName: 'Infosys Limited',
          jobTitle: 'Specialist Programmer (Power Programmer)',
          jobRole: 'Core Software Architecture',
          jobType: 'Full-Time',
          location: 'Chandigarh / Pune / Bangalore',
          ctcSalary: '9.5 LPA',
          stipend: 'N/A',
          eligibilityCriteria: {
            minCgpa: 7.5,
            allowedCourses: ['B.Tech CSE', 'MCA', 'M.Sc IT'],
            maxBacklogs: 0,
            graduationYear: 2026,
          },
          skillsRequired: ['Advanced Algorithms', 'Dynamic Programming', 'System Design', 'C++ / Java'],
          description: 'Elite programming role focused on building resilient core architecture, microservices, and distributed computational pipelines for global Fortune 500 enterprises.',
          selectionRounds: ['HackWithInfy Coding Round', 'Technical Interview 1', 'Architectural Assessment'],
          applicationDeadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          driveDate: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000),
          status: 'open',
          applicantsCount: 19,
        },
      ]);
      console.log('[KMV Seed] Placement drives seeded.');
    }

    // 5. Seed Announcements
    const announcementCount = await Announcement.countDocuments();
    if (announcementCount === 0 && admin) {
      console.log('[KMV Seed] Seeding announcements...');
      await Announcement.insertMany([
        {
          title: 'Campus Recruitment Season 2025-26 Officially Inaugurated',
          content: 'The Placement Cell at Kanya Maha Vidyalaya welcomes leading corporate partners for on-campus & hybrid drives. Students must ensure their profiles and verified CGPA transcripts are updated before registering for drives.',
          category: 'drive_alert',
          targetAudience: 'all',
          isPinned: true,
          author: admin._id,
        },
        {
          title: 'Special Aptitude & Quantitative Preparation Workshop',
          content: 'A 3-day intensive mock assessment and verbal reasoning boot camp will be conducted in the KMV Auditorium and online on the portal. All 5th and 6th semester students are advised to participate.',
          category: 'workshop',
          targetAudience: 'students',
          isPinned: false,
          author: admin._id,
        },
      ]);
      console.log('[KMV Seed] Announcements seeded.');
    }

    // 6. Seed Resources
    const resourceCount = await Resource.countDocuments();
    if (resourceCount === 0 && admin) {
      console.log('[KMV Seed] Seeding resources...');
      await Resource.insertMany([
        {
          title: 'Comprehensive Aptitude & Quantitative Reasoning Formula Handbook',
          description: 'Quick reference formulas for Speed-Time-Distance, Permutations, Probability, Time & Work, and Data Interpretation.',
          category: 'aptitude',
          fileType: 'PDF',
          fileSize: '2.4 MB',
          uploadedBy: admin._id,
        },
        {
          title: 'Top 100 Technical Interview Questions & Core CS Fundamentals',
          description: 'Curated frequently asked questions covering OOPS, DBMS normalization, indexing, OS memory paging, and TCP/IP protocol stack.',
          category: 'technical',
          fileType: 'PDF',
          fileSize: '3.1 MB',
          uploadedBy: admin._id,
        },
        {
          title: 'Standard KMV Approved Professional Resume Format',
          description: 'ATS-friendly single page resume template designed specifically for campus recruitment drives with verified college crest.',
          category: 'resume_templates',
          fileType: 'DOCX',
          fileSize: '0.8 MB',
          uploadedBy: admin._id,
        },
      ]);
      console.log('[KMV Seed] Resources seeded.');
    }

    console.log('[KMV Seed] Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('[KMV Seed] Error during seed:', error);
    process.exit(1);
  }
};

seedDatabase();
