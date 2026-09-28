import { Request, Response } from 'express';
import { db } from '../database/adapter.js';

export const getProducts = (req: Request, res: Response): void => {
  const { category, search, origin, availability, sort, certification } = req.query;

  const products = db.getProducts({
    category: typeof category === 'string' ? category : undefined,
    search: typeof search === 'string' ? search : undefined,
    origin: typeof origin === 'string' ? origin : undefined,
    availability: typeof availability === 'string' ? availability : undefined,
    sort: typeof sort === 'string' ? sort : undefined,
    certification: typeof certification === 'string' ? certification : undefined,
  } as any);

  res.json({
    success: true,
    data: products,
    total: products.length
  });
};

export const getProductById = (req: Request, res: Response): void => {
  const { id } = req.params;
  const product = db.getProductByIdOrSlug(id);

  if (!product) {
    res.status(404).json({ success: false, error: 'Product not found' });
    return;
  }

  // Find related products in the same category
  const related = db
    .getProducts({ category: product.categoryId })
    .filter(p => p.id !== product.id)
    .slice(0, 6);

  res.json({
    success: true,
    data: {
      product,
      related
    }
  });
};

export const createProduct = (req: Request, res: Response): void => {
  const { name, categoryId, categoryName, subtitle, shortDesc, fullDesc, origin, availability, priceDisplay } = req.body;

  if (!name || !categoryId || !origin) {
    res.status(400).json({ success: false, error: 'Name, category, and origin are required' });
    return;
  }

  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const newProduct = db.createProduct({
    name,
    slug,
    categoryId,
    categoryName: categoryName || 'Commodities',
    subtitle: subtitle || 'Export Quality',
    shortDesc: shortDesc || 'High quality agro-commodity sourced from vetted growers.',
    fullDesc: fullDesc || shortDesc || 'Processed and cleaned to international export benchmarks.',
    origin,
    availability: availability || 'In Stock',
    priceDisplay: priceDisplay || 'Price on Request',
    image: req.body.image || '/assets/products/default.jpg',
    moq: req.body.moq || '1 FCL / As per requirement',
    packaging: req.body.packaging || '25kg / 50kg Bags',
    supplyCapacity: req.body.supplyCapacity || 'Large Volumes',
    rating: 4.8,
    reviewCount: 1,
    keyFeatures: req.body.keyFeatures || ['Premium export grade', 'Strict quality control'],
    specifications: req.body.specifications || { Grade: 'Export Standard' }
  });

  res.status(201).json({
    success: true,
    data: newProduct,
    message: 'Product created successfully'
  });
};

export const updateProduct = (req: Request, res: Response): void => {
  const { id } = req.params;
  const updated = db.updateProduct(id, req.body);

  if (!updated) {
    res.status(404).json({ success: false, error: 'Product not found' });
    return;
  }

  res.json({
    success: true,
    data: updated,
    message: 'Product updated successfully'
  });
};

export const deleteProduct = (req: Request, res: Response): void => {
  const { id } = req.params;
  const ok = db.deleteProduct(id);

  if (!ok) {
    res.status(404).json({ success: false, error: 'Product not found' });
    return;
  }

  res.json({
    success: true,
    message: 'Product deleted successfully'
  });
};

export const getCategories = (_req: Request, res: Response): void => {
  const categories = db.getCategories();
  res.json({
    success: true,
    data: categories
  });
};
