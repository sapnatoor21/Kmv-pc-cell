import express from 'express';
import { applyToDrive } from '../controllers/applicationController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.post('/:driveId', protect, authorize('student'), applyToDrive);

export default router;
