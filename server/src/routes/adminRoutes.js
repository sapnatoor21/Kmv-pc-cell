import express from 'express';
import {
  getAdminAnalytics,
  getAllStudents,
  toggleUserStatus,
  getAllRecruiters,
  getAllApplications,
} from '../controllers/adminController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);
router.use(authorize('admin'));

router.get('/analytics', getAdminAnalytics);
router.get('/students', getAllStudents);
router.put('/users/:id/toggle-status', toggleUserStatus);
router.get('/recruiters', getAllRecruiters);
router.get('/applications', getAllApplications);

export default router;
