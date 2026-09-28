import { Request, Response } from 'express';
import { db } from '../database/adapter.js';

export const getOrders = (_req: Request, res: Response): void => {
  const orders = db.getOrders();
  res.json({
    success: true,
    data: orders,
    total: orders.length
  });
};

export const updateOrderStatus = (req: Request, res: Response): void => {
  const { id } = req.params;
  const { status, notes } = req.body;

  if (!status) {
    res.status(400).json({ success: false, error: 'Status is required' });
    return;
  }

  const updated = db.updateOrderStatus(id, status, notes);
  if (!updated) {
    res.status(404).json({ success: false, error: 'Order not found' });
    return;
  }

  res.json({
    success: true,
    data: updated,
    message: `Order #${updated.orderNumber} updated to ${status}`
  });
};
