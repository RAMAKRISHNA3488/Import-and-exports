import { Router } from 'express';
import { getDashboardStats, getSuppliers, createSupplier, getOffices } from '../controllers/admin.controller.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/dashboard', authenticateToken, requireAdmin, getDashboardStats);
router.get('/suppliers', authenticateToken, requireAdmin, getSuppliers);
router.post('/suppliers', authenticateToken, requireAdmin, createSupplier);
router.get('/offices', getOffices); // public for Global Presence page

export default router;
