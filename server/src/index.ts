import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import productRoutes from './routes/product.routes.js';
import enquiryRoutes from './routes/enquiry.routes.js';
import orderRoutes from './routes/order.routes.js';
import adminRoutes from './routes/admin.routes.js';
import contactRoutes from './routes/contact.routes.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logger
app.use((req: Request, _res: Response, next: NextFunction) => {
  console.log(`[API] ${req.method} ${req.originalUrl}`);
  next();
});

// Health check
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'online',
    platform: 'ConceptExim Global Import & Export Platform',
    timestamp: new Date().toISOString(),
    temporaryDatabase: 'Active (File-backed in-memory store)'
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/contact', contactRoutes);

// 404 Handler for API
app.use('/api/*', (req: Request, res: Response) => {
  res.status(404).json({ success: false, error: `Endpoint ${req.originalUrl} not found` });
});

// Global Error Handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error('[Server Error]', err);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal Server Error'
  });
});

app.listen(PORT, () => {
  console.log(`==================================================`);
  console.log(`ConceptExim Backend API Server running on port ${PORT}`);
  console.log(`Healthcheck: http://localhost:${PORT}/api/health`);
  console.log(`Temporary Database: Live & Synced`);
  console.log(`==================================================`);
});
