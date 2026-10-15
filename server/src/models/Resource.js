import mongoose from 'mongoose';

const resourceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Resource title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ['aptitude', 'technical', 'hr_interview', 'resume_templates', 'syllabus'],
      default: 'technical',
    },
    fileUrl: {
      type: String,
      default: '',
    },
    fileType: {
      type: String,
      default: 'PDF',
    },
    fileSize: {
      type: String,
      default: '1.2 MB',
    },
    downloadCount: {
      type: Number,
      default: 0,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

export const Resource = mongoose.model('Resource', resourceSchema);
