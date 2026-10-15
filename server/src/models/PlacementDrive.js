import mongoose from 'mongoose';

const placementDriveSchema = new mongoose.Schema(
  {
    recruiter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    companyName: {
      type: String,
      required: [true, 'Company name is required'],
      trim: true,
    },
    companyLogo: {
      type: String,
      default: '',
    },
    jobTitle: {
      type: String,
      required: [true, 'Job title is required'],
      trim: true,
    },
    jobRole: {
      type: String,
      default: 'Software Development',
    },
    jobType: {
      type: String,
      enum: ['Full-Time', 'Internship', 'Internship+PPO', 'Part-Time'],
      default: 'Full-Time',
    },
    location: {
      type: String,
      required: [true, 'Job location is required'],
    },
    ctcSalary: {
      type: String,
      required: [true, 'Salary or package is required (e.g. 6.5 LPA)'],
    },
    stipend: {
      type: String,
      default: 'N/A',
    },
    eligibilityCriteria: {
      minCgpa: {
        type: Number,
        default: 6.0,
      },
      allowedCourses: {
        type: [String],
        default: ['B.Tech CSE', 'BCA', 'MCA', 'B.Sc IT', 'M.Sc IT'],
      },
      maxBacklogs: {
        type: Number,
        default: 0,
      },
      graduationYear: {
        type: Number,
        default: 2026,
      },
    },
    skillsRequired: {
      type: [String],
      default: [],
    },
    description: {
      type: String,
      required: [true, 'Job description is required'],
    },
    selectionRounds: {
      type: [String],
      default: ['Online Aptitude Test', 'Technical Interview', 'HR Interview'],
    },
    applicationDeadline: {
      type: Date,
      required: [true, 'Application deadline is required'],
    },
    driveDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ['open', 'closed', 'upcoming', 'completed'],
      default: 'open',
    },
    applicantsCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const PlacementDrive = mongoose.model('PlacementDrive', placementDriveSchema);
