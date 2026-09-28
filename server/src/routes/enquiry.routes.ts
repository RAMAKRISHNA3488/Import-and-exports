import { Router } from 'express';
import {
  createEnquiry,
  getEnquiries,
  updateEnquiryStatus
} from '../controllers/enquiry.controller.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/', createEnquiry);
router.get('/', authenticateToken, requireAdmin, getEnquiries);
router.patch('/:id/status', authenticateToken, requireAdmin, updateEnquiryStatus);

export default router;
