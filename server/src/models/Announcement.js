import mongoose from 'mongoose';

const announcementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Announcement title is required'],
      trim: true,
    },
    content: {
      type: String,
      required: [true, 'Announcement content is required'],
    },
    category: {
      type: String,
      enum: ['drive_alert', 'workshop', 'policy', 'general'],
      default: 'general',
    },
    targetAudience: {
      type: String,
      enum: ['all', 'students', 'recruiters'],
      default: 'all',
    },
    isPinned: {
      type: Boolean,
      default: false,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

export const Announcement = mongoose.model('Announcement', announcementSchema);
