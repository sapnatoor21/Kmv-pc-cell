import mongoose from 'mongoose';

const recruiterProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    companyName: {
      type: String,
      required: [true, 'Please provide company name'],
      trim: true,
    },
    industry: {
      type: String,
      default: 'Technology & Software',
      trim: true,
    },
    website: {
      type: String,
      trim: true,
    },
    logoUrl: {
      type: String,
      default: '',
    },
    location: {
      type: String,
      default: '',
    },
    contactPerson: {
      type: String,
      trim: true,
    },
    designation: {
      type: String,
      trim: true,
    },
    aboutCompany: {
      type: String,
      default: '',
    },
    verificationStatus: {
      type: String,
      enum: ['pending', 'verified', 'rejected'],
      default: 'verified',
    },
  },
  {
    timestamps: true,
  }
);

export const RecruiterProfile = mongoose.model('RecruiterProfile', recruiterProfileSchema);
