import { PlacementDrive } from '../models/PlacementDrive.js';

// @desc    Get all public/open placement drives with search & filters
// @route   GET /api/drives
// @access  Public
export const getAllDrives = async (req, res, next) => {
  try {
    const { search, jobType, course, minCgpa, status } = req.query;

    const query = {};

    if (status) {
      query.status = status;
    } else {
      query.status = { $in: ['open', 'upcoming'] };
    }

    if (search) {
      query.$or = [
        { jobTitle: { $regex: search, $options: 'i' } },
        { companyName: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
        { skillsRequired: { $regex: search, $options: 'i' } },
      ];
    }

    if (jobType && jobType !== 'All') {
      query.jobType = jobType;
    }

    if (course && course !== 'All') {
      query['eligibilityCriteria.allowedCourses'] = course;
    }

    if (minCgpa) {
      query['eligibilityCriteria.minCgpa'] = { $lte: Number(minCgpa) };
    }

    const drives = await PlacementDrive.find(query).sort({ applicationDeadline: 1 });

    res.json({ success: true, count: drives.length, drives });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single drive by ID
// @route   GET /api/drives/:id
// @access  Public
export const getDriveById = async (req, res, next) => {
  try {
    const drive = await PlacementDrive.findById(req.params.id).populate('recruiter', 'name email');
    if (!drive) {
      return res.status(404).json({ success: false, message: 'Placement drive not found' });
    }
    res.json({ success: true, drive });
  } catch (error) {
    next(error);
  }
};
