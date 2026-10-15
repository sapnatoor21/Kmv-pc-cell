import { StudentProfile } from '../models/StudentProfile.js';
import { User } from '../models/User.js';
import { Application } from '../models/Application.js';
import { AssessmentResult } from '../models/AssessmentResult.js';

// @desc    Get student profile
// @route   GET /api/student/profile
// @access  Private (Student)
export const getStudentProfile = async (req, res, next) => {
  try {
    const profile = await StudentProfile.findOne({ user: req.user.id }).populate('user', 'name email phone');
    if (!profile) {
      return res.status(404).json({ success: false, message: 'Student profile not found' });
    }
    res.json({ success: true, profile });
  } catch (error) {
    next(error);
  }
};

// @desc    Update student profile
// @route   PUT /api/student/profile
// @access  Private (Student)
export const updateStudentProfile = async (req, res, next) => {
  try {
    const {
      name,
      phone,
      course,
      semester,
      cgpa,
      tenthPercentage,
      twelfthPercentage,
      backlogs,
      skills,
      certifications,
      projects,
      resumeUrl,
      bio,
      linkedin,
      github,
      portfolioUrl,
      profilePhotoUrl,
    } = req.body;

    // Update user base fields if provided
    if (name || phone) {
      const userUpdate = {};
      if (name) userUpdate.name = name.trim();
      if (phone) userUpdate.phone = phone.trim();
      await User.findByIdAndUpdate(req.user.id, userUpdate);
    }

    let profile = await StudentProfile.findOne({ user: req.user.id });
    if (!profile) {
      return res.status(404).json({ success: false, message: 'Profile not found' });
    }

    if (course !== undefined) profile.course = course;
    if (semester !== undefined) profile.semester = semester;
    if (cgpa !== undefined) profile.cgpa = Number(cgpa);
    if (tenthPercentage !== undefined) profile.tenthPercentage = Number(tenthPercentage);
    if (twelfthPercentage !== undefined) profile.twelfthPercentage = Number(twelfthPercentage);
    if (backlogs !== undefined) profile.backlogs = Number(backlogs);
    if (skills !== undefined) profile.skills = skills;
    if (certifications !== undefined) profile.certifications = certifications;
    if (projects !== undefined) profile.projects = projects;
    if (resumeUrl !== undefined) profile.resumeUrl = resumeUrl;
    if (bio !== undefined) profile.bio = bio;
    if (linkedin !== undefined) profile.linkedin = linkedin;
    if (github !== undefined) profile.github = github;
    if (portfolioUrl !== undefined) profile.portfolioUrl = portfolioUrl;
    if (profilePhotoUrl !== undefined) profile.profilePhotoUrl = profilePhotoUrl;

    await profile.save();
    profile = await StudentProfile.findOne({ user: req.user.id }).populate('user', 'name email phone');

    res.json({
      success: true,
      message: 'Profile updated successfully',
      profile,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get student's applications
// @route   GET /api/student/applications
// @access  Private (Student)
export const getStudentApplications = async (req, res, next) => {
  try {
    const applications = await Application.find({ student: req.user.id })
      .populate('drive')
      .sort({ createdAt: -1 });

    res.json({ success: true, count: applications.length, applications });
  } catch (error) {
    next(error);
  }
};

// @desc    Get student dashboard stats
// @route   GET /api/student/stats
// @access  Private (Student)
export const getStudentDashboardStats = async (req, res, next) => {
  try {
    const profile = await StudentProfile.findOne({ user: req.user.id });
    const applications = await Application.find({ student: req.user.id });

    // Calculate profile completion percentage
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

    res.json({
      success: true,
      stats: {
        profileCompletion,
        totalApplied,
        shortlistedCount,
        interviewsScheduled,
        offersReceived,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Save assessment test result (aptitude, coding)
// @route   POST /api/student/assessments
// @access  Private (Student)
export const saveAssessmentResult = async (req, res, next) => {
  try {
    const { testType, title, score, totalMarks, percentage, details } = req.body;

    const result = await AssessmentResult.create({
      student: req.user.id,
      testType,
      title,
      score,
      totalMarks,
      percentage,
      details,
    });

    res.status(201).json({ success: true, message: 'Assessment recorded', result });
  } catch (error) {
    next(error);
  }
};

// @desc    Get assessment history
// @route   GET /api/student/assessments
// @access  Private (Student)
export const getAssessmentHistory = async (req, res, next) => {
  try {
    const results = await AssessmentResult.find({ student: req.user.id }).sort({ createdAt: -1 });
    res.json({ success: true, count: results.length, results });
  } catch (error) {
    next(error);
  }
};
