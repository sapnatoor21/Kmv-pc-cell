import mongoose from 'mongoose';

const studentProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    enrollmentNumber: {
      type: String,
      required: [true, 'Please provide enrollment number'],
      unique: true,
      trim: true,
      uppercase: true,
    },
    collegeName: {
      type: String,
      default: 'Kanya Maha Vidyalaya',
      trim: true,
    },
    course: {
      type: String,
      required: [true, 'Please select course or program'],
      trim: true,
    },
    semester: {
      type: String,
      required: [true, 'Please select current semester'],
    },
    graduationYear: {
      type: Number,
      default: 2026,
    },
    cgpa: {
      type: Number,
      min: 0,
      max: 10,
      default: 0,
    },
    tenthPercentage: {
      type: Number,
      min: 0,
      max: 100,
    },
    twelfthPercentage: {
      type: Number,
      min: 0,
      max: 100,
    },
    backlogs: {
      type: Number,
      default: 0,
    },
    skills: {
      type: [String],
      default: [],
    },
    certifications: [
      {
        title: String,
        issuer: String,
        issueDate: String,
        credentialUrl: String,
      },
    ],
    projects: [
      {
        title: String,
        description: String,
        techStack: [String],
        githubUrl: String,
        liveUrl: String,
      },
    ],
    resumeUrl: {
      type: String,
      default: '',
    },
    bio: {
      type: String,
      default: '',
    },
    linkedin: {
      type: String,
      default: '',
    },
    github: {
      type: String,
      default: '',
    },
    portfolioUrl: {
      type: String,
      default: '',
    },
    profilePhotoUrl: {
      type: String,
      default: '',
    },
    placementStatus: {
      type: String,
      enum: ['available', 'placed', 'opted_out'],
      default: 'available',
    },
  },
  {
    timestamps: true,
  }
);

export const StudentProfile = mongoose.model('StudentProfile', studentProfileSchema);
