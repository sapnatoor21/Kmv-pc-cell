import express from 'express';
import {
  getAnnouncements,
  createAnnouncement,
  deleteAnnouncement,
  getResources,
  createResource,
  getMyNotifications,
  markNotificationRead,
} from '../controllers/announcementController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Announcements
router.get('/', getAnnouncements);
router.post('/', protect, authorize('admin'), createAnnouncement);
router.delete('/:id', protect, authorize('admin'), deleteAnnouncement);

// Resources
router.get('/resources/all', getResources);
router.post('/resources/all', protect, authorize('admin'), createResource);

// Notifications
router.get('/notifications/me', protect, getMyNotifications);
router.put('/notifications/:id/read', protect, markNotificationRead);

export default router;
