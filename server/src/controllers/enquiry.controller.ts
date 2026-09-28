import { Request, Response } from 'express';
import { db } from '../database/adapter.js';

export const createEnquiry = (req: Request, res: Response): void => {
  const { name, company, email, phone, product, productId, country, quantity, unit, packaging, subject, message, type } = req.body;

  if (!name || !email || !message) {
    res.status(400).json({ success: false, error: 'Name, email, and message are required fields' });
    return;
  }

  const newEnquiry = db.createEnquiry({
    name,
    company: company || 'Individual Trader / Not Specified',
    email,
    phone: phone || '',
    product,
    productId,
    country: country || 'Not Specified',
    quantity: quantity ? Number(quantity) : undefined,
    unit: unit || 'Metric Tons',
    packaging: packaging || 'Standard Export Packing',
    subject: subject || (product ? `Inquiry regarding ${product}` : 'Commercial RFQ'),
    message,
    type: type || (quantity ? 'Quote Request' : 'Product Inquiry')
  });

  res.status(201).json({
    success: true,
    data: newEnquiry,
    message: `Thank you! Your inquiry #${newEnquiry.enquiryNumber} has been received. Our trade desk will review and respond promptly.`
  });
};

export const getEnquiries = (req: Request, res: Response): void => {
  const { status, search } = req.query;

  const enquiries = db.getEnquiries({
    status: typeof status === 'string' ? status : undefined,
    search: typeof search === 'string' ? search : undefined
  });

  res.json({
    success: true,
    data: enquiries,
    total: enquiries.length
  });
};

export const updateEnquiryStatus = (req: Request, res: Response): void => {
  const { id } = req.params;
  const { status, adminNotes } = req.body;

  if (!status) {
    res.status(400).json({ success: false, error: 'Status is required' });
    return;
  }

  const updated = db.updateEnquiryStatus(id, status, adminNotes);
  if (!updated) {
    res.status(404).json({ success: false, error: 'Enquiry not found' });
    return;
  }

  res.json({
    success: true,
    data: updated,
    message: `Enquiry #${updated.enquiryNumber} status updated to ${status}`
  });
};
