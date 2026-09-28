import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../database/adapter.js';
import { JWT_SECRET, AuthRequest } from '../middleware/auth.middleware.js';

export const login = (req: Request, res: Response): void => {
  const { email, password, role } = req.body;

  if (!email || !password) {
    res.status(400).json({ success: false, error: 'Email and password are required' });
    return;
  }

  const user = db.findUserByEmail(email);
  if (!user || !user.password) {
    res.status(401).json({ success: false, error: 'Invalid email or password' });
    return;
  }

  const isMatch = bcrypt.compareSync(password, user.password);
  if (!isMatch) {
    res.status(401).json({ success: false, error: 'Invalid email or password' });
    return;
  }

  // If role filter is requested (e.g. logging into Admin tab)
  if (role && user.role !== role) {
    res.status(403).json({
      success: false,
      error: `Access denied. This account does not possess '${role}' credentials.`
    });
    return;
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: '24h' }
  );

  const { password: _, ...safeUser } = user;
  res.json({
    success: true,
    data: {
      token,
      user: safeUser
    },
    message: 'Login successful'
  });
};

export const register = (req: Request, res: Response): void => {
  const { fullName, email, password, companyName, phone, country, city, businessType, role } = req.body;

  if (!fullName || !email || !password) {
    res.status(400).json({ success: false, error: 'Full name, email, and password are required' });
    return;
  }

  const existing = db.findUserByEmail(email);
  if (existing) {
    res.status(409).json({ success: false, error: 'An account with this email address already exists' });
    return;
  }

  const assignedRole = role === 'admin' ? 'customer' : (role || 'customer'); // Prevent unauthorized self-admin registration

  const newUser = db.createUser({
    fullName,
    email,
    password,
    companyName: companyName || '',
    phone: phone || '',
    country: country || '',
    city: city || '',
    businessType: businessType || 'Importer',
    role: assignedRole
  });

  const token = jwt.sign(
    { id: newUser.id, email: newUser.email, role: newUser.role },
    JWT_SECRET,
    { expiresIn: '24h' }
  );

  const { password: _, ...safeUser } = newUser;
  res.status(201).json({
    success: true,
    data: {
      token,
      user: safeUser
    },
    message: 'Registration successful'
  });
};

export const getCurrentUser = (req: AuthRequest, res: Response): void => {
  if (!req.user) {
    res.status(401).json({ success: false, error: 'Not authenticated' });
    return;
  }

  const user = db.findUserById(req.user.id);
  if (!user) {
    res.status(404).json({ success: false, error: 'User not found' });
    return;
  }

  const { password: _, ...safeUser } = user;
  res.json({
    success: true,
    data: safeUser
  });
};
