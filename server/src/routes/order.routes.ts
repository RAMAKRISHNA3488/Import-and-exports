import { Router } from 'express';
import { getOrders, updateOrderStatus } from '../controllers/order.controller.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/', authenticateToken, requireAdmin, getOrders);
router.patch('/:id/status', authenticateToken, requireAdmin, updateOrderStatus);

export default router;
