import { Request, Response } from 'express';
import { db } from '../database/adapter.js';

export const getDashboardStats = (_req: Request, res: Response): void => {
  const stats = db.getDashboardStats();
  res.json({
    success: true,
    data: stats
  });
};

export const getSuppliers = (_req: Request, res: Response): void => {
  const suppliers = db.getSuppliers();
  res.json({
    success: true,
    data: suppliers,
    total: suppliers.length
  });
};

export const createSupplier = (req: Request, res: Response): void => {
  const { name, country, city, categories, commodities, contactPerson, email, phone, annualCapacity, certifications } = req.body;

  if (!name || !country || !email) {
    res.status(400).json({ success: false, error: 'Supplier name, country, and email are required' });
    return;
  }

  const supplier = db.createSupplier({
    name,
    country,
    city: city || '',
    categories: categories || ['General Agro'],
    commodities: commodities || [],
    rating: 5.0,
    status: 'Verified Supplier',
    contactPerson: contactPerson || 'Procurement Rep',
    email,
    phone: phone || '',
    annualCapacity: annualCapacity || '10,000 MT',
    certifications: certifications || ['ISO 9001:2015']
  });

  res.status(201).json({
    success: true,
    data: supplier,
    message: 'Supplier registered successfully'
  });
};

export const getOffices = (_req: Request, res: Response): void => {
  const offices = db.getOffices();
  res.json({
    success: true,
    data: offices
  });
};
