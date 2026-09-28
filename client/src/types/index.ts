export interface User {
  id: string;
  email: string;
  role: 'admin' | 'customer';
  fullName: string;
  companyName: string;
  phone?: string;
  country?: string;
  city?: string;
  businessType?: string;
  createdAt?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  image: string;
  productCount: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  categoryName: string;
  sectorId?: string;
  sectorName?: string;
  globalCategory?: string;
  certifications?: string[];
  tag?: string;
  subtitle: string;
  shortDesc: string;
  fullDesc: string;
  origin: string;
  originFlag?: string;
  variety?: string;
  grade?: string;
  packaging?: string;
  supplyCapacity?: string;
  moq?: string;
  priceDisplay: string;
  priceNumber?: number;
  priceNote?: string;
  availability: 'In Stock' | 'Made to Order';
  rating?: number;
  reviewCount?: number;
  image: string;
  gallery?: string[];
  keyFeatures?: string[];
  idealFor?: string[];
  specifications?: Record<string, string>;
}

export interface Enquiry {
  id: string;
  enquiryNumber: string;
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
  date: string;
  status: 'New' | 'In Progress' | 'Quoted' | 'Approved' | 'Rejected' | 'Completed';
  type: 'Quote Request' | 'Product Inquiry' | 'General Contact';
  adminNotes?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customer: string;
  product: string;
  quantity: string;
  destination: string;
  incoterms?: string;
  date: string;
  status: 'Processing' | 'Confirmed' | 'Shipped' | 'Delivered' | 'Cancelled';
  notes?: string;
}

export interface Supplier {
  id: string;
  name: string;
  country: string;
  city: string;
  categories: string[];
  commodities: string[];
  rating: number;
  status: string;
  contactPerson: string;
  email: string;
  phone: string;
  annualCapacity: string;
  certifications: string[];
}

export interface Office {
  id: string;
  country: string;
  countryCode: string;
  flag: string;
  type: string;
  city: string;
  address: string;
  phones: string[];
  emails: string[];
  workingHours: string;
  image: string;
  isPrimary: boolean;
}

export interface QuoteBasketItem {
  product: Product;
  quantity: number;
  unit: string;
  packagingNotes?: string;
}

export interface AdminDashboardData {
  kpis: {
    totalProducts: { value: number; delta: string };
    totalEnquiries: { value: number; delta: string };
    totalOrders: { value: number; delta: string };
    totalCustomers: { value: number; delta: string };
    activeShipments: { value: number; delta: string };
  };
  chartOverview: Array<{ month: string; enquiries: number; orders: number }>;
  categoryBreakdown: Array<{ name: string; count: number }>;
  recentEnquiries: Enquiry[];
  recentOrders: Order[];
}
