import express from 'express';
import { getAllDrives, getDriveById } from '../controllers/driveController.js';

const router = express.Router();

router.get('/', getAllDrives);
router.get('/:id', getDriveById);

export default router;
