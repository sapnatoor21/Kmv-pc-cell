import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema(
  {
    drive: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PlacementDrive',
      required: true,
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    studentProfile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'StudentProfile',
    },
    appliedAt: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: [
        'applied',
        'under_review',
        'shortlisted',
        'assessment_round',
        'interview_scheduled',
        'selected',
        'rejected',
      ],
      default: 'applied',
    },
    interviewDetails: {
      scheduledDate: Date,
      timeString: String,
      roundName: String,
      meetingLink: String,
      venue: String,
    },
    recruiterFeedback: {
      type: String,
      default: '',
    },
    assessmentScore: {
      type: Number,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate applications by same student to same drive
applicationSchema.index({ drive: 1, student: 1 }, { unique: true });

export const Application = mongoose.model('Application', applicationSchema);
