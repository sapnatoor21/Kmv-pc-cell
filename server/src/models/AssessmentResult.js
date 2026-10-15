import mongoose from 'mongoose';

const assessmentResultSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    testType: {
      type: String,
      enum: ['aptitude', 'coding', 'mock_interview'],
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    totalMarks: {
      type: Number,
      required: true,
    },
    percentage: {
      type: Number,
      required: true,
    },
    details: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

export const AssessmentResult = mongoose.model('AssessmentResult', assessmentResultSchema);
