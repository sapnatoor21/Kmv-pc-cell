import { RecruiterProfile } from '../models/RecruiterProfile.js';
import { PlacementDrive } from '../models/PlacementDrive.js';
import { Application } from '../models/Application.js';
import { User } from '../models/User.js';
import { Notification } from '../models/Notification.js';

// @desc    Get recruiter company profile
// @route   GET /api/recruiter/profile
// @access  Private (Recruiter)
export const getRecruiterProfile = async (req, res, next) => {
  try {
    const profile = await RecruiterProfile.findOne({ user: req.user.id }).populate('user', 'name email phone');
    if (!profile) {
      return res.status(404).json({ success: false, message: 'Recruiter profile not found' });
    }
    res.json({ success: true, profile });
  } catch (error) {
    next(error);
  }
};

// @desc    Update recruiter company profile
// @route   PUT /api/recruiter/profile
// @access  Private (Recruiter)
export const updateRecruiterProfile = async (req, res, next) => {
  try {
    const { companyName, industry, website, logoUrl, location, contactPerson, designation, aboutCompany } = req.body;

    let profile = await RecruiterProfile.findOne({ user: req.user.id });
    if (!profile) {
      return res.status(404).json({ success: false, message: 'Profile not found' });
    }

    if (companyName) profile.companyName = companyName;
    if (industry) profile.industry = industry;
    if (website) profile.website = website;
    if (logoUrl) profile.logoUrl = logoUrl;
    if (location) profile.location = location;
    if (contactPerson) profile.contactPerson = contactPerson;
    if (designation) profile.designation = designation;
    if (aboutCompany) profile.aboutCompany = aboutCompany;

    await profile.save();
    profile = await RecruiterProfile.findOne({ user: req.user.id }).populate('user', 'name email phone');

    res.json({ success: true, message: 'Company profile updated', profile });
  } catch (error) {
    next(error);
  }
};

// @desc    Get drives created by this recruiter
// @route   GET /api/recruiter/drives
// @access  Private (Recruiter)
export const getMyDrives = async (req, res, next) => {
  try {
    const drives = await PlacementDrive.find({ recruiter: req.user.id }).sort({ createdAt: -1 });
    res.json({ success: true, count: drives.length, drives });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new placement drive
// @route   POST /api/recruiter/drives
// @access  Private (Recruiter, Admin)
export const createDrive = async (req, res, next) => {
  try {
    const {
      companyName,
      companyLogo,
      jobTitle,
      jobRole,
      jobType,
      location,
      ctcSalary,
      stipend,
      eligibilityCriteria,
      skillsRequired,
      description,
      selectionRounds,
      applicationDeadline,
      driveDate,
    } = req.body;

    if (!jobTitle || !location || !ctcSalary || !description || !applicationDeadline) {
      return res.status(400).json({ success: false, message: 'Please provide all required drive fields' });
    }

    // Determine recruiter company name if not provided
    let finalCompanyName = companyName;
    let finalLogo = companyLogo;

    if (!finalCompanyName && req.user.role === 'recruiter') {
      const recProfile = await RecruiterProfile.findOne({ user: req.user.id });
      finalCompanyName = recProfile?.companyName || 'Corporate Partner';
      finalLogo = recProfile?.logoUrl || '';
    }

    const drive = await PlacementDrive.create({
      recruiter: req.user.id,
      companyName: finalCompanyName || 'Corporate Partner',
      companyLogo: finalLogo || '',
      jobTitle,
      jobRole: jobRole || 'Engineering',
      jobType: jobType || 'Full-Time',
      location,
      ctcSalary,
      stipend: stipend || 'N/A',
      eligibilityCriteria: eligibilityCriteria || {
        minCgpa: 6.0,
        allowedCourses: ['B.Tech CSE', 'BCA', 'MCA', 'B.Sc IT', 'M.Sc IT'],
        maxBacklogs: 0,
        graduationYear: 2026,
      },
      skillsRequired: skillsRequired || [],
      description,
      selectionRounds: selectionRounds || ['Online Assessment', 'Technical Interview', 'HR Round'],
      applicationDeadline,
      driveDate: driveDate || new Date(),
      status: 'open',
    });

    res.status(201).json({ success: true, message: 'Placement drive created successfully', drive });
  } catch (error) {
    next(error);
  }
};

// @desc    Update placement drive
// @route   PUT /api/recruiter/drives/:id
// @access  Private (Recruiter who owns drive or Admin)
export const updateDrive = async (req, res, next) => {
  try {
    let drive = await PlacementDrive.findById(req.params.id);
    if (!drive) {
      return res.status(404).json({ success: false, message: 'Drive not found' });
    }

    if (drive.recruiter.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to modify this drive' });
    }

    drive = await PlacementDrive.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json({ success: true, message: 'Drive updated successfully', drive });
  } catch (error) {
    next(error);
  }
};

// @desc    Get applicants for a drive
// @route   GET /api/recruiter/drives/:id/applicants
// @access  Private (Recruiter who owns drive or Admin)
export const getDriveApplicants = async (req, res, next) => {
  try {
    const drive = await PlacementDrive.findById(req.params.id);
    if (!drive) {
      return res.status(404).json({ success: false, message: 'Placement drive not found' });
    }

    if (drive.recruiter.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to view applicants for this drive' });
    }

    const applicants = await Application.find({ drive: req.params.id })
      .populate('student', 'name email phone')
      .populate('studentProfile')
      .sort({ createdAt: -1 });

    res.json({ success: true, count: applicants.length, applicants });
  } catch (error) {
    next(error);
  }
};

// @desc    Update applicant status & optionally schedule interview
// @route   PUT /api/recruiter/applications/:id/status
// @access  Private (Recruiter or Admin)
export const updateApplicantStatus = async (req, res, next) => {
  try {
    const { status, recruiterFeedback, interviewDetails } = req.body;

    const application = await Application.findById(req.params.id)
      .populate('drive')
      .populate('student', 'name email');

    if (!application) {
      return res.status(404).json({ success: false, message: 'Application record not found' });
    }

    // Ownership check
    if (application.drive.recruiter.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to update this applicant' });
    }

    if (status) application.status = status;
    if (recruiterFeedback !== undefined) application.recruiterFeedback = recruiterFeedback;
    if (interviewDetails) application.interviewDetails = interviewDetails;

    await application.save();

    // Create notification for student
    await Notification.create({
      recipient: application.student._id,
      title: `Application Update: ${application.drive.companyName}`,
      message: `Your application status for ${application.drive.jobTitle} is now '${status.replace('_', ' ').toUpperCase()}'.`,
      type: status === 'interview_scheduled' ? 'interview' : 'application',
      link: '/student/applications',
    });

    res.json({ success: true, message: 'Applicant status updated successfully', application });
  } catch (error) {
    next(error);
  }
};
