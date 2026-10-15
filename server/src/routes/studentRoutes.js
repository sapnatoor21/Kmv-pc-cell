import express from 'express';
import {
  getStudentProfile,
  updateStudentProfile,
  getStudentApplications,
  getStudentDashboardStats,
  saveAssessmentResult,
  getAssessmentHistory,
} from '../controllers/studentController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);
router.use(authorize('student'));

router.get('/profile', getStudentProfile);
router.put('/profile', updateStudentProfile);
router.get('/applications', getStudentApplications);
router.get('/stats', getStudentDashboardStats);
router.post('/assessments', saveAssessmentResult);
router.get('/assessments', getAssessmentHistory);

export default router;
