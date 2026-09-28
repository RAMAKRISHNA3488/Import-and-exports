import { Router } from 'express';
import { submitContactMessage, getContactMessages } from '../controllers/contact.controller.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/', submitContactMessage);
router.get('/', authenticateToken, requireAdmin, getContactMessages);

export default router;
