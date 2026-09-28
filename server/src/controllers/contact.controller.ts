import { Request, Response } from 'express';
import { db } from '../database/adapter.js';

export const submitContactMessage = (req: Request, res: Response): void => {
  const { fullName, companyName, email, phone, subject, message } = req.body;

  if (!fullName || !email || !message) {
    res.status(400).json({ success: false, error: 'Full name, email, and message are required' });
    return;
  }

  const msg = db.createContactMessage({
    fullName,
    companyName: companyName || '',
    email,
    phone: phone || '',
    subject: subject || 'General Business Inquiry',
    message
  });

  res.status(201).json({
    success: true,
    data: msg,
    message: 'Thank you! Your message has been transmitted to the ConceptExim trade desk.'
  });
};

export const getContactMessages = (_req: Request, res: Response): void => {
  const messages = db.getContactMessages();
  res.json({
    success: true,
    data: messages,
    total: messages.length
  });
};
