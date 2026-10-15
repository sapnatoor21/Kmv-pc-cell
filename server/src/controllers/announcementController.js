import { Announcement } from '../models/Announcement.js';
import { Resource } from '../models/Resource.js';
import { Notification } from '../models/Notification.js';

// @desc    Get announcements
// @route   GET /api/announcements
// @access  Public
export const getAnnouncements = async (req, res, next) => {
  try {
    const { audience } = req.query;
    const query = {};
    if (audience) {
      query.targetAudience = { $in: ['all', audience] };
    }

    const announcements = await Announcement.find(query).sort({ isPinned: -1, createdAt: -1 });
    res.json({ success: true, count: announcements.length, announcements });
  } catch (error) {
    next(error);
  }
};

// @desc    Create announcement
// @route   POST /api/announcements
// @access  Private (Admin only)
export const createAnnouncement = async (req, res, next) => {
  try {
    const { title, content, category, targetAudience, isPinned } = req.body;

    if (!title || !content) {
      return res.status(400).json({ success: false, message: 'Title and content are required' });
    }

    const announcement = await Announcement.create({
      title,
      content,
      category: category || 'general',
      targetAudience: targetAudience || 'all',
      isPinned: isPinned || false,
      author: req.user.id,
    });

    res.status(201).json({ success: true, message: 'Announcement published', announcement });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete announcement
// @route   DELETE /api/announcements/:id
// @access  Private (Admin only)
export const deleteAnnouncement = async (req, res, next) => {
  try {
    const announcement = await Announcement.findById(req.params.id);
    if (!announcement) {
      return res.status(404).json({ success: false, message: 'Announcement not found' });
    }

    await announcement.deleteOne();
    res.json({ success: true, message: 'Announcement removed' });
  } catch (error) {
    next(error);
  }
};

// @desc    Get resources
// @route   GET /api/resources
// @access  Public
export const getResources = async (req, res, next) => {
  try {
    const { category } = req.query;
    const query = {};
    if (category && category !== 'All') {
      query.category = category;
    }

    const resources = await Resource.find(query).sort({ downloadCount: -1, createdAt: -1 });
    res.json({ success: true, count: resources.length, resources });
  } catch (error) {
    next(error);
  }
};

// @desc    Create resource
// @route   POST /api/resources
// @access  Private (Admin only)
export const createResource = async (req, res, next) => {
  try {
    const { title, description, category, fileUrl, fileType, fileSize } = req.body;

    if (!title || !description) {
      return res.status(400).json({ success: false, message: 'Title and description are required' });
    }

    const resource = await Resource.create({
      title,
      description,
      category: category || 'technical',
      fileUrl: fileUrl || '#',
      fileType: fileType || 'PDF',
      fileSize: fileSize || '1.5 MB',
      uploadedBy: req.user.id,
    });

    res.status(201).json({ success: true, message: 'Resource added', resource });
  } catch (error) {
    next(error);
  }
};

// @desc    Get notifications for logged in user
// @route   GET /api/notifications
// @access  Private
export const getMyNotifications = async (req, res, next) => {
  try {
    const notifications = await Notification.find({ recipient: req.user.id }).sort({ createdAt: -1 });
    const unreadCount = notifications.filter((n) => !n.read).length;
    res.json({ success: true, unreadCount, notifications });
  } catch (error) {
    next(error);
  }
};

// @desc    Mark notification as read
// @route   PUT /api/notifications/:id/read
// @access  Private
export const markNotificationRead = async (req, res, next) => {
  try {
    const notification = await Notification.findOneAndUpdate(
      { _id: req.params.id, recipient: req.user.id },
      { read: true },
      { new: true }
    );
    res.json({ success: true, notification });
  } catch (error) {
    next(error);
  }
};
