import { Router } from 'express';
import { login, register, getCurrentUser } from '../controllers/auth.controller.js';
import { authenticateToken } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/login', login);
router.post('/register', register);
router.get('/me', authenticateToken, getCurrentUser);

// Auth routes for buyer, supplier, and admin credentials
export default router;
