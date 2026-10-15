import express from 'express';
import {
  getRecruiterProfile,
  updateRecruiterProfile,
  getMyDrives,
  createDrive,
  updateDrive,
  getDriveApplicants,
  updateApplicantStatus,
} from '../controllers/recruiterController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);
router.use(authorize('recruiter', 'admin'));

router.get('/profile', getRecruiterProfile);
router.put('/profile', updateRecruiterProfile);
router.get('/drives', getMyDrives);
router.post('/drives', createDrive);
router.put('/drives/:id', updateDrive);
router.get('/drives/:id/applicants', getDriveApplicants);
router.put('/applications/:id/status', updateApplicantStatus);

export default router;
