import { User } from '../models/User.js';
import { StudentProfile } from '../models/StudentProfile.js';
import { RecruiterProfile } from '../models/RecruiterProfile.js';
import { PlacementDrive } from '../models/PlacementDrive.js';
import { Application } from '../models/Application.js';

// @desc    Get comprehensive placement cell analytics
// @route   GET /api/admin/analytics
// @access  Private (Admin only)
export const getAdminAnalytics = async (req, res, next) => {
  try {
    const totalStudents = await User.countDocuments({ role: 'student' });
    const totalRecruiters = await User.countDocuments({ role: 'recruiter' });
    const totalDrives = await PlacementDrive.countDocuments();
    const openDrives = await PlacementDrive.countDocuments({ status: 'open' });
    const totalApplications = await Application.countDocuments();
    const placedStudents = await StudentProfile.countDocuments({ placementStatus: 'placed' });
    const selectedApplications = await Application.countDocuments({ status: 'selected' });

    // Calculate placement percentage
    const placementRate = totalStudents > 0 ? Math.round((placedStudents / totalStudents) * 100) : 0;

    // Course distribution of students
    const courseAggregation = await StudentProfile.aggregate([
      { $group: { _id: '$course', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    // Application status breakdown
    const statusAggregation = await Application.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);

    res.json({
      success: true,
      analytics: {
        totalStudents,
        totalRecruiters,
        totalDrives,
        openDrives,
        totalApplications,
        placedStudents,
        selectedApplications,
        placementRate,
        courseDistribution: courseAggregation.map((c) => ({ course: c._id || 'Unassigned', count: c.count })),
        statusBreakdown: statusAggregation.map((s) => ({ status: s._id, count: s.count })),
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all students with filters
// @route   GET /api/admin/students
// @access  Private (Admin only)
export const getAllStudents = async (req, res, next) => {
  try {
    const { search, course, semester, placementStatus } = req.query;

    const userQuery = { role: 'student' };
    if (search) {
      userQuery.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
      ];
    }

    const students = await User.find(userQuery).select('-password').sort({ createdAt: -1 });
    const userIds = students.map((s) => s._id);

    const profileQuery = { user: { $in: userIds } };
    if (course && course !== 'All') profileQuery.course = course;
    if (semester && semester !== 'All') profileQuery.semester = semester;
    if (placementStatus && placementStatus !== 'All') profileQuery.placementStatus = placementStatus;

    const profiles = await StudentProfile.find(profileQuery);
    const profileMap = new Map();
    profiles.forEach((p) => profileMap.set(p.user.toString(), p));

    // Combine user and profile
    const studentList = students
      .filter((s) => profileMap.has(s._id.toString()))
      .map((s) => ({
        ...s.toObject(),
        profile: profileMap.get(s._id.toString()),
      }));

    res.json({ success: true, count: studentList.length, students: studentList });
  } catch (error) {
    next(error);
  }
};

// @desc    Toggle student account activation
// @route   PUT /api/admin/students/:id/toggle-status
// @access  Private (Admin only)
export const toggleUserStatus = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    user.isActive = !user.isActive;
    await user.save();

    res.json({
      success: true,
      message: `User account has been ${user.isActive ? 'activated' : 'deactivated'}`,
      user,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all recruiters
// @route   GET /api/admin/recruiters
// @access  Private (Admin only)
export const getAllRecruiters = async (req, res, next) => {
  try {
    const recruiters = await User.find({ role: 'recruiter' }).select('-password').sort({ createdAt: -1 });
    const userIds = recruiters.map((r) => r._id);
    const profiles = await RecruiterProfile.find({ user: { $in: userIds } });

    const profileMap = new Map();
    profiles.forEach((p) => profileMap.set(p.user.toString(), p));

    const recruiterList = recruiters.map((r) => ({
      ...r.toObject(),
      profile: profileMap.get(r._id.toString()) || {},
    }));

    res.json({ success: true, count: recruiterList.length, recruiters: recruiterList });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all applications across drives
// @route   GET /api/admin/applications
// @access  Private (Admin only)
export const getAllApplications = async (req, res, next) => {
  try {
    const applications = await Application.find()
      .populate('drive')
      .populate('student', 'name email phone')
      .populate('studentProfile')
      .sort({ createdAt: -1 });

    res.json({ success: true, count: applications.length, applications });
  } catch (error) {
    next(error);
  }
};
