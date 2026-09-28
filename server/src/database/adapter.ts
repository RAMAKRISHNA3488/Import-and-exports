import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import { User, Category, Product, Enquiry, Order, Supplier, Office, ContactMessage } from '../types/index.js';

interface DatabaseSchema {
  users: User[];
  categories: Category[];
  products: Product[];
  enquiries: Enquiry[];
  orders: Order[];
  suppliers: Supplier[];
  offices: Office[];
  contactMessages: ContactMessage[];
}

export class TempDatabaseAdapter {
  private static instance: TempDatabaseAdapter;
  private data: DatabaseSchema = {
    users: [],
    categories: [],
    products: [],
    enquiries: [],
    orders: [],
    suppliers: [],
    offices: [],
    contactMessages: [],
  };

  private dataDir: string;
  private storeFile: string;
  private seedDir: string;

  private constructor() {
    // Resolve path relative to workspace
    this.dataDir = path.resolve(process.cwd(), '../data');
    if (!fs.existsSync(this.dataDir)) {
      this.dataDir = path.resolve(process.cwd(), 'data');
    }
    this.storeFile = path.join(this.dataDir, 'temp_store.json');
    this.seedDir = path.join(this.dataDir, 'seed');

    this.initDatabase();
  }

  public static getInstance(): TempDatabaseAdapter {
    if (!TempDatabaseAdapter.instance) {
      TempDatabaseAdapter.instance = new TempDatabaseAdapter();
    }
    return TempDatabaseAdapter.instance;
  }

  private initDatabase(): void {
    try {
      if (fs.existsSync(this.storeFile)) {
        const raw = fs.readFileSync(this.storeFile, 'utf-8');
        this.data = JSON.parse(raw);
        console.log('[Database] Loaded existing temporary database store from:', this.storeFile);
      } else {
        console.log('[Database] Initializing fresh temporary store from seed data...');
        this.loadFromSeed();
        this.persist();
      }
    } catch (err) {
      console.error('[Database] Failed to read temporary database, reseeding:', err);
      this.loadFromSeed();
      this.persist();
    }
  }

  private loadFromSeed(): void {
    const readFile = <T>(fileName: string, fallback: T): T => {
      const filePath = path.join(this.seedDir, fileName);
      if (fs.existsSync(filePath)) {
        return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      }
      return fallback;
    };

    const rawUsers: any[] = readFile('users.json', []);
    // Ensure passwords in seed are hashed
    this.data.users = rawUsers.map(u => {
      const passwordHash = u.password ? bcrypt.hashSync(u.password, 10) : u.passwordHash;
      return {
        id: u.id,
        email: u.email,
        password: passwordHash,
        role: u.role,
        fullName: u.fullName,
        companyName: u.companyName,
        phone: u.phone,
        country: u.country,
        city: u.city,
        businessType: u.businessType,
        createdAt: u.createdAt || new Date().toISOString()
      };
    });

    this.data.categories = readFile('categories.json', []);
    this.data.products = readFile('products.json', []);
    this.data.enquiries = readFile('enquiries.json', []);
    this.data.orders = readFile('orders.json', []);
    this.data.suppliers = readFile('suppliers.json', []);
    this.data.offices = readFile('offices.json', []);
    this.data.contactMessages = [];
  }

  private persist(): void {
    try {
      if (!fs.existsSync(this.dataDir)) {
        fs.mkdirSync(this.dataDir, { recursive: true });
      }
      fs.writeFileSync(this.storeFile, JSON.stringify(this.data, null, 2), 'utf-8');
    } catch (err) {
      console.error('[Database] Failed to persist temporary database:', err);
    }
  }

  // --- Products ---
  public getProducts(params?: {
    category?: string;
    search?: string;
    origin?: string;
    availability?: string;
    sort?: string;
  }): Product[] {
    // Check if store file has expanded products on disk
    if (fs.existsSync(this.storeFile)) {
      try {
        const raw = fs.readFileSync(this.storeFile, 'utf-8');
        const parsed = JSON.parse(raw);
        if (parsed.products && (parsed.products.length !== this.data.products.length || this.data.products[0]?.priceNumber !== parsed.products[0]?.priceNumber)) {
          this.data.products = parsed.products;
          this.data.categories = parsed.categories || this.data.categories;
        }
      } catch {
        // Fallback to in-memory store
      }
    }

    let result = [...this.data.products];

    if (params?.category) {
      const catLower = params.category.toLowerCase().replace(/^(cat-|sector-)/, '');
      result = result.filter(
        p =>
          p.categoryId.toLowerCase() === params.category!.toLowerCase() ||
          p.categoryId.toLowerCase() === `cat-${catLower}` ||
          p.categoryId.toLowerCase() === `sector-${catLower}` ||
          p.categoryName.toLowerCase().includes(catLower) ||
          (p.sectorId && (p.sectorId.toLowerCase() === catLower || p.sectorId.toLowerCase() === params.category!.toLowerCase())) ||
          (p.sectorName && p.sectorName.toLowerCase().includes(catLower)) ||
          (p.globalCategory && (p.globalCategory.toLowerCase() === params.category!.toLowerCase() || p.globalCategory.toLowerCase().includes(catLower)))
      );
    }

    if ((params as any)?.sector) {
      const secLower = ((params as any).sector as string).toLowerCase().replace(/^sector-/, '');
      result = result.filter(
        p =>
          (p.sectorId && (p.sectorId.toLowerCase() === secLower || p.sectorId.toLowerCase().includes(secLower))) ||
          (p.sectorName && p.sectorName.toLowerCase().includes(secLower))
      );
    }

    if ((params as any)?.certification) {
      const certLower = ((params as any).certification as string).toLowerCase();
      result = result.filter(
        p => p.certifications && p.certifications.some(c => c.toLowerCase().includes(certLower))
      );
    }

    if (params?.origin) {
      const originLower = params.origin.toLowerCase();
      result = result.filter(p => p.origin.toLowerCase() === originLower);
    }

    if (params?.availability) {
      const availLower = params.availability.toLowerCase();
      result = result.filter(p => p.availability.toLowerCase() === availLower);
    }

    if (params?.search) {
      const term = params.search.toLowerCase().trim();
      result = result.filter(
        p =>
          p.name.toLowerCase().includes(term) ||
          p.shortDesc.toLowerCase().includes(term) ||
          p.origin.toLowerCase().includes(term) ||
          p.categoryName.toLowerCase().includes(term)
      );
    }

    if (params?.sort) {
      if (params.sort === 'name-asc') {
        result.sort((a, b) => a.name.localeCompare(b.name));
      } else if (params.sort === 'name-desc') {
        result.sort((a, b) => b.name.localeCompare(a.name));
      } else if (params.sort === 'rating') {
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      }
    }

    return result;
  }

  public getProductByIdOrSlug(identifier: string): Product | undefined {
    if (fs.existsSync(this.storeFile)) {
      try {
        const raw = fs.readFileSync(this.storeFile, 'utf-8');
        const parsed = JSON.parse(raw);
        if (parsed.products && parsed.products.length !== this.data.products.length) {
          this.data.products = parsed.products;
          this.data.categories = parsed.categories || this.data.categories;
        }
      } catch {}
    }
    return this.data.products.find(p => p.id === identifier || p.slug === identifier);
  }

  public createProduct(product: Omit<Product, 'id'>): Product {
    const id = 'prod-' + Date.now();
    const newProduct: Product = { ...product, id, createdAt: new Date().toISOString() };
    this.data.products.unshift(newProduct);
    this.persist();
    return newProduct;
  }

  public updateProduct(id: string, updates: Partial<Product>): Product | null {
    const idx = this.data.products.findIndex(p => p.id === id);
    if (idx === -1) return null;
    this.data.products[idx] = { ...this.data.products[idx], ...updates };
    this.persist();
    return this.data.products[idx];
  }

  public deleteProduct(id: string): boolean {
    const initLen = this.data.products.length;
    this.data.products = this.data.products.filter(p => p.id !== id);
    if (this.data.products.length !== initLen) {
      this.persist();
      return true;
    }
    return false;
  }

  // --- Categories ---
  public getCategories(): Category[] {
    return this.data.categories.map(cat => ({
      ...cat,
      productCount: this.data.products.filter(p => p.categoryId === cat.id).length || cat.productCount
    }));
  }

  // --- Enquiries ---
  public getEnquiries(params?: { status?: string; search?: string }): Enquiry[] {
    let list = [...this.data.enquiries];
    if (params?.status && params.status !== 'All') {
      list = list.filter(e => e.status.toLowerCase() === params.status?.toLowerCase());
    }
    if (params?.search) {
      const q = params.search.toLowerCase();
      list = list.filter(
        e =>
          e.name.toLowerCase().includes(q) ||
          e.company.toLowerCase().includes(q) ||
          (e.product && e.product.toLowerCase().includes(q)) ||
          e.enquiryNumber.toLowerCase().includes(q)
      );
    }
    return list;
  }

  public createEnquiry(payload: {
    name: string;
    company: string;
    email: string;
    phone: string;
    product?: string;
    productId?: string;
    country: string;
    quantity?: number;
    unit?: string;
    packaging?: string;
    subject?: string;
    message: string;
    type?: 'Quote Request' | 'Product Inquiry' | 'General Contact';
  }): Enquiry {
    const num = 1000 + this.data.enquiries.length + 1;
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

    const newEnquiry: Enquiry = {
      id: 'enq-' + num,
      enquiryNumber: `ENQ-${num}`,
      name: payload.name,
      company: payload.company,
      email: payload.email,
      phone: payload.phone,
      product: payload.product || 'General Commodity Inquiry',
      productId: payload.productId,
      country: payload.country,
      quantity: payload.quantity,
      unit: payload.unit,
      packaging: payload.packaging,
      subject: payload.subject,
      message: payload.message,
      date: dateStr,
      status: 'New',
      type: payload.type || 'Quote Request',
    };

    this.data.enquiries.unshift(newEnquiry);
    this.persist();
    return newEnquiry;
  }

  public updateEnquiryStatus(
    id: string,
    status: Enquiry['status'],
    adminNotes?: string
  ): Enquiry | null {
    const item = this.data.enquiries.find(e => e.id === id || e.enquiryNumber === id);
    if (!item) return null;
    item.status = status;
    if (adminNotes !== undefined) {
      item.adminNotes = adminNotes;
    }
    this.persist();
    return item;
  }

  // --- Orders ---
  public getOrders(): Order[] {
    return this.data.orders;
  }

  public updateOrderStatus(id: string, status: Order['status'], notes?: string): Order | null {
    const order = this.data.orders.find(o => o.id === id || o.orderNumber === id);
    if (!order) return null;
    order.status = status;
    if (notes) order.notes = notes;
    this.persist();
    return order;
  }

  // --- Suppliers ---
  public getSuppliers(): Supplier[] {
    return this.data.suppliers;
  }

  public createSupplier(supplier: Omit<Supplier, 'id'>): Supplier {
    const id = 'sup-' + Date.now();
    const item: Supplier = { ...supplier, id };
    this.data.suppliers.push(item);
    this.persist();
    return item;
  }

  // --- Offices ---
  public getOffices(): Office[] {
    return this.data.offices;
  }

  // --- Contact Messages ---
  public createContactMessage(msg: Omit<ContactMessage, 'id' | 'createdAt' | 'status'>): ContactMessage {
    const id = 'msg-' + Date.now();
    const item: ContactMessage = {
      ...msg,
      id,
      createdAt: new Date().toISOString(),
      status: 'Unread'
    };
    this.data.contactMessages.unshift(item);
    this.persist();
    return item;
  }

  public getContactMessages(): ContactMessage[] {
    return this.data.contactMessages;
  }

  // --- Users & Auth ---
  public findUserByEmail(email: string): User | undefined {
    return this.data.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  public findUserById(id: string): User | undefined {
    return this.data.users.find(u => u.id === id);
  }

  public createUser(user: Omit<User, 'id' | 'createdAt'>): User {
    const id = 'usr-' + Date.now();
    const passwordHash = user.password ? bcrypt.hashSync(user.password, 10) : '';
    const newUser: User = {
      ...user,
      id,
      password: passwordHash,
      createdAt: new Date().toISOString()
    };
    this.data.users.push(newUser);
    this.persist();
    return newUser;
  }

  public reloadFromSeed(): void {
    console.log('[Database] Re-synchronizing temporary database from verified seed data...');
    this.loadFromSeed();
    this.persist();
  }

  // --- Admin Dashboard Aggregates ---
  public getDashboardStats() {
    return {
      kpis: {
        totalProducts: { value: this.data.products.length, delta: '+12% vs last month' },
        totalEnquiries: { value: this.data.enquiries.length, delta: '+28% vs last month' },
        totalOrders: { value: this.data.orders.length, delta: '+20% vs last month' },
        totalCustomers: { value: 89, delta: '+15% (Sample Metric from PPT)' },
        activeShipments: { value: 12, delta: '+33% (Sample Metric from PPT)' },
      },
      chartOverview: [
        { month: 'Mar', enquiries: 10, orders: 6 },
        { month: 'Apr', enquiries: 14, orders: 7 },
        { month: 'May', enquiries: 19, orders: 9 },
        { month: 'Jun', enquiries: 22, orders: 12 },
        { month: 'Jul', enquiries: 26, orders: 14 },
        { month: 'Aug', enquiries: 31, orders: 17 },
        { month: 'Sep', enquiries: 35, orders: 22 }
      ],
      categoryBreakdown: this.data.categories.map(cat => ({
        name: cat.name,
        count: this.data.products.filter(p => p.categoryId === cat.id).length
      })),
      recentEnquiries: this.data.enquiries.slice(0, 5),
      recentOrders: this.data.orders.slice(0, 5)
    };
  }
}

export const db = TempDatabaseAdapter.getInstance();
