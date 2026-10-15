import { Application } from '../models/Application.js';
import { PlacementDrive } from '../models/PlacementDrive.js';
import { StudentProfile } from '../models/StudentProfile.js';
import { Notification } from '../models/Notification.js';

// @desc    Apply to a placement drive
// @route   POST /api/applications/:driveId
// @access  Private (Student only)
export const applyToDrive = async (req, res, next) => {
  try {
    const { driveId } = req.params;

    const drive = await PlacementDrive.findById(driveId);
    if (!drive) {
      return res.status(404).json({ success: false, message: 'Placement drive not found' });
    }

    if (drive.status !== 'open') {
      return res.status(400).json({ success: false, message: `This placement drive is currently ${drive.status}` });
    }

    // Check application deadline
    if (new Date() > new Date(drive.applicationDeadline)) {
      return res.status(400).json({ success: false, message: 'Application deadline has already passed' });
    }

    // Find student profile
    const profile = await StudentProfile.findOne({ user: req.user.id });
    if (!profile) {
      return res.status(400).json({ success: false, message: 'Please complete your student profile before applying' });
    }

    // Check CGPA eligibility
    if (drive.eligibilityCriteria?.minCgpa && profile.cgpa < drive.eligibilityCriteria.minCgpa) {
      return res.status(400).json({
        success: false,
        message: `Eligibility criteria not met: Required CGPA is ${drive.eligibilityCriteria.minCgpa}, but your current CGPA is ${profile.cgpa}`,
      });
    }

    // Check course eligibility if specified
    if (
      drive.eligibilityCriteria?.allowedCourses &&
      drive.eligibilityCriteria.allowedCourses.length > 0 &&
      profile.course
    ) {
      const isCourseAllowed = drive.eligibilityCriteria.allowedCourses.some(
        (c) => c.toLowerCase() === profile.course.toLowerCase()
      );
      if (!isCourseAllowed) {
        return res.status(400).json({
          success: false,
          message: `Your course (${profile.course}) is not eligible for this drive. Eligible: ${drive.eligibilityCriteria.allowedCourses.join(', ')}`,
        });
      }
    }

    // Check backlogs
    if (
      drive.eligibilityCriteria?.maxBacklogs !== undefined &&
      profile.backlogs > drive.eligibilityCriteria.maxBacklogs
    ) {
      return res.status(400).json({
        success: false,
        message: `Backlog limit exceeded: Drive allows maximum ${drive.eligibilityCriteria.maxBacklogs} active backlogs.`,
      });
    }

    // Check duplicate application
    const existing = await Application.findOne({ drive: driveId, student: req.user.id });
    if (existing) {
      return res.status(400).json({ success: false, message: 'You have already submitted an application for this drive' });
    }

    const application = await Application.create({
      drive: driveId,
      student: req.user.id,
      studentProfile: profile._id,
      status: 'applied',
    });

    // Increment applicantsCount on drive
    await PlacementDrive.findByIdAndUpdate(driveId, { $inc: { applicantsCount: 1 } });

    // Send confirmation notification
    await Notification.create({
      recipient: req.user.id,
      title: 'Application Submitted',
      message: `You successfully applied for ${drive.jobTitle} at ${drive.companyName}.`,
      type: 'application',
      link: '/student/applications',
    });

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully! Best of luck.',
      application,
    });
  } catch (error) {
    next(error);
  }
};
