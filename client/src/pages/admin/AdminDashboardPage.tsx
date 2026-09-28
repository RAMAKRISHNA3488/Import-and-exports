import React, { useState, useMemo } from 'react';
import {
  Mail,
  Users,
  Package,
  CheckCircle2,
  TrendingUp,
  Globe,
  Ship,
  Plane,
  Building2,
  Calendar,
  Plus,
  MoreVertical,
  ArrowRight,
  X,
  CreditCard,
  FileText,
  RotateCw,
  ArrowUpRight,
  ChevronDown,
  Check,
  Download,
  Search,
  DollarSign,
  Clock,
  ShieldCheck,
} from 'lucide-react';
import { AdminWorldMap } from '../../components/admin/AdminWorldMap.js';
import { useToast } from '../../context/ToastContext.js';
import { useNavigate } from 'react-router-dom';
import { ExecutiveSparkline, type SparklinePoint } from '../../components/admin/ExecutiveSparkline.js';
import { CountryFlagBadge } from '../../components/admin/CountryFlagBadge.js';

// Types & Period Definitions
export type TimeRangeKey = 'Today' | 'This Week' | 'This Month' | 'Q3 2026' | 'This Year';
export type MetricDrillDown = 'enquiries' | 'clients' | 'shipments' | 'orders' | 'revenue' | null;

export interface MetricCardData {
  value: string;
  growth: string;
  period: string;
  color: string;
  series: SparklinePoint[];
}

export interface PeriodData {
  dateLabel: string;
  dateSub: string;
  enquiries: MetricCardData & { count: number };
  clients: MetricCardData;
  shipments: MetricCardData;
  orders: MetricCardData;
  revenue: MetricCardData;
}

export const PERIOD_METRICS: Record<TimeRangeKey, PeriodData> = {
  'Today': {
    dateLabel: 'Friday, 26 September 2026',
    dateSub: 'Live intraday trade metrics',
    enquiries: {
      value: '18',
      count: 18,
      growth: '↑ +6%',
      period: 'Today',
      color: '#2563EB',
      series: [
        { label: '09:00', value: 4, displayValue: '4' },
        { label: '11:00', value: 7, displayValue: '7' },
        { label: '13:00', value: 9, displayValue: '9' },
        { label: '15:00', value: 12, displayValue: '12' },
        { label: '17:00', value: 15, displayValue: '15' },
        { label: '19:00', value: 17, displayValue: '17' },
        { label: '21:00', value: 18, displayValue: '18' },
      ],
    },
    clients: {
      value: '42',
      growth: '↑ +4%',
      period: 'Today',
      color: '#0D9488',
      series: [
        { label: '09:00', value: 24, displayValue: '24' },
        { label: '11:00', value: 28, displayValue: '28' },
        { label: '13:00', value: 33, displayValue: '33' },
        { label: '15:00', value: 36, displayValue: '36' },
        { label: '17:00', value: 38, displayValue: '38' },
        { label: '19:00', value: 40, displayValue: '40' },
        { label: '21:00', value: 42, displayValue: '42' },
      ],
    },
    shipments: {
      value: '14',
      growth: '↑ +8%',
      period: 'In Transit Today',
      color: '#D97706',
      series: [
        { label: '09:00', value: 8, displayValue: '8' },
        { label: '11:00', value: 9, displayValue: '9' },
        { label: '13:00', value: 10, displayValue: '10' },
        { label: '15:00', value: 12, displayValue: '12' },
        { label: '17:00', value: 11, displayValue: '11' },
        { label: '19:00', value: 13, displayValue: '13' },
        { label: '21:00', value: 14, displayValue: '14' },
      ],
    },
    orders: {
      value: '12',
      growth: '↑ +15%',
      period: 'Today',
      color: '#7C3AED',
      series: [
        { label: '09:00', value: 2, displayValue: '2' },
        { label: '11:00', value: 4, displayValue: '4' },
        { label: '13:00', value: 6, displayValue: '6' },
        { label: '15:00', value: 8, displayValue: '8' },
        { label: '17:00', value: 10, displayValue: '10' },
        { label: '19:00', value: 11, displayValue: '11' },
        { label: '21:00', value: 12, displayValue: '12' },
      ],
    },
    revenue: {
      value: '$78.4K',
      growth: '↑ +11%',
      period: 'Today',
      color: '#CA8A04',
      series: [
        { label: '09:00', value: 18.2, displayValue: '$18.2K' },
        { label: '11:00', value: 31.5, displayValue: '$31.5K' },
        { label: '13:00', value: 45.0, displayValue: '$45.0K' },
        { label: '15:00', value: 58.2, displayValue: '$58.2K' },
        { label: '17:00', value: 67.5, displayValue: '$67.5K' },
        { label: '19:00', value: 73.0, displayValue: '$73.0K' },
        { label: '21:00', value: 78.4, displayValue: '$78.4K' },
      ],
    },
  },
  'This Week': {
    dateLabel: '21 Sep – 27 Sep 2026',
    dateSub: 'Week 39 operations summary',
    enquiries: {
      value: '84',
      count: 84,
      growth: '↑ +9%',
      period: 'This Week',
      color: '#2563EB',
      series: [
        { label: 'Mon', value: 52, displayValue: '52' },
        { label: 'Tue', value: 58, displayValue: '58' },
        { label: 'Wed', value: 65, displayValue: '65' },
        { label: 'Thu', value: 71, displayValue: '71' },
        { label: 'Fri', value: 76, displayValue: '76' },
        { label: 'Sat', value: 81, displayValue: '81' },
        { label: 'Sun', value: 84, displayValue: '84' },
      ],
    },
    clients: {
      value: '96',
      growth: '↑ +7%',
      period: 'This Week',
      color: '#0D9488',
      series: [
        { label: 'Mon', value: 78, displayValue: '78' },
        { label: 'Tue', value: 82, displayValue: '82' },
        { label: 'Wed', value: 85, displayValue: '85' },
        { label: 'Thu', value: 89, displayValue: '89' },
        { label: 'Fri', value: 92, displayValue: '92' },
        { label: 'Sat', value: 94, displayValue: '94' },
        { label: 'Sun', value: 96, displayValue: '96' },
      ],
    },
    shipments: {
      value: '38',
      growth: '↑ +14%',
      period: 'In Transit',
      color: '#D97706',
      series: [
        { label: 'Mon', value: 24, displayValue: '24' },
        { label: 'Tue', value: 27, displayValue: '27' },
        { label: 'Wed', value: 29, displayValue: '29' },
        { label: 'Thu', value: 33, displayValue: '33' },
        { label: 'Fri', value: 32, displayValue: '32' },
        { label: 'Sat', value: 36, displayValue: '36' },
        { label: 'Sun', value: 38, displayValue: '38' },
      ],
    },
    orders: {
      value: '118',
      growth: '↑ +18%',
      period: 'This Week',
      color: '#7C3AED',
      series: [
        { label: 'Mon', value: 82, displayValue: '82' },
        { label: 'Tue', value: 89, displayValue: '89' },
        { label: 'Wed', value: 95, displayValue: '95' },
        { label: 'Thu', value: 102, displayValue: '102' },
        { label: 'Fri', value: 108, displayValue: '108' },
        { label: 'Sat', value: 114, displayValue: '114' },
        { label: 'Sun', value: 118, displayValue: '118' },
      ],
    },
    revenue: {
      value: '$542K',
      growth: '↑ +14%',
      period: 'This Week',
      color: '#CA8A04',
      series: [
        { label: 'Mon', value: 340, displayValue: '$340K' },
        { label: 'Tue', value: 382, displayValue: '$382K' },
        { label: 'Wed', value: 425, displayValue: '$425K' },
        { label: 'Thu', value: 468, displayValue: '$468K' },
        { label: 'Fri', value: 495, displayValue: '$495K' },
        { label: 'Sat', value: 520, displayValue: '$520K' },
        { label: 'Sun', value: 542, displayValue: '$542K' },
      ],
    },
  },
  'This Month': {
    dateLabel: 'Friday, 26 September 2026',
    dateSub: 'Real-time overview of your business',
    enquiries: {
      value: '248',
      count: 248,
      growth: '↑ +12%',
      period: 'This Month',
      color: '#2563EB',
      series: [
        { label: 'Sep 04', value: 188, displayValue: '188' },
        { label: 'Sep 08', value: 202, displayValue: '202' },
        { label: 'Sep 12', value: 216, displayValue: '216' },
        { label: 'Sep 16', value: 208, displayValue: '208' },
        { label: 'Sep 20', value: 228, displayValue: '228' },
        { label: 'Sep 23', value: 238, displayValue: '238' },
        { label: 'Sep 26', value: 248, displayValue: '248' },
      ],
    },
    clients: {
      value: '186',
      growth: '↑ +8%',
      period: 'This Month',
      color: '#0D9488',
      series: [
        { label: 'Sep 04', value: 154, displayValue: '154' },
        { label: 'Sep 08', value: 160, displayValue: '160' },
        { label: 'Sep 12', value: 168, displayValue: '168' },
        { label: 'Sep 16', value: 172, displayValue: '172' },
        { label: 'Sep 20', value: 178, displayValue: '178' },
        { label: 'Sep 23', value: 182, displayValue: '182' },
        { label: 'Sep 26', value: 186, displayValue: '186' },
      ],
    },
    shipments: {
      value: '64',
      growth: '↑ +18%',
      period: 'In Transit',
      color: '#D97706',
      series: [
        { label: 'Sep 04', value: 42, displayValue: '42' },
        { label: 'Sep 08', value: 48, displayValue: '48' },
        { label: 'Sep 12', value: 45, displayValue: '45' },
        { label: 'Sep 16', value: 55, displayValue: '55' },
        { label: 'Sep 20', value: 52, displayValue: '52' },
        { label: 'Sep 23', value: 60, displayValue: '60' },
        { label: 'Sep 26', value: 64, displayValue: '64' },
      ],
    },
    orders: {
      value: '512',
      growth: '↑ +22%',
      period: 'This Year',
      color: '#7C3AED',
      series: [
        { label: 'Mar', value: 380, displayValue: '380' },
        { label: 'Apr', value: 410, displayValue: '410' },
        { label: 'May', value: 432, displayValue: '432' },
        { label: 'Jun', value: 456, displayValue: '456' },
        { label: 'Jul', value: 478, displayValue: '478' },
        { label: 'Aug', value: 494, displayValue: '494' },
        { label: 'Sep', value: 512, displayValue: '512' },
      ],
    },
    revenue: {
      value: '$2.48M',
      growth: '↑ +16%',
      period: 'This Year',
      color: '#CA8A04',
      series: [
        { label: 'Mar', value: 1.72, displayValue: '$1.72M' },
        { label: 'Apr', value: 1.84, displayValue: '$1.84M' },
        { label: 'May', value: 1.98, displayValue: '$1.98M' },
        { label: 'Jun', value: 2.12, displayValue: '$2.12M' },
        { label: 'Jul', value: 2.25, displayValue: '$2.25M' },
        { label: 'Aug', value: 2.36, displayValue: '$2.36M' },
        { label: 'Sep', value: 2.48, displayValue: '$2.48M' },
      ],
    },
  },
  'Q3 2026': {
    dateLabel: 'Q3 2026 (July – September)',
    dateSub: 'Quarterly trade performance',
    enquiries: {
      value: '740',
      count: 740,
      growth: '↑ +15%',
      period: 'Q3 2026',
      color: '#2563EB',
      series: [
        { label: 'Jul 01', value: 510, displayValue: '510' },
        { label: 'Jul 15', value: 560, displayValue: '560' },
        { label: 'Aug 01', value: 610, displayValue: '610' },
        { label: 'Aug 15', value: 660, displayValue: '660' },
        { label: 'Sep 01', value: 700, displayValue: '700' },
        { label: 'Sep 15', value: 720, displayValue: '720' },
        { label: 'Sep 26', value: 740, displayValue: '740' },
      ],
    },
    clients: {
      value: '290',
      growth: '↑ +12%',
      period: 'Q3 2026',
      color: '#0D9488',
      series: [
        { label: 'Jul 01', value: 210, displayValue: '210' },
        { label: 'Jul 15', value: 228, displayValue: '228' },
        { label: 'Aug 01', value: 245, displayValue: '245' },
        { label: 'Aug 15', value: 260, displayValue: '260' },
        { label: 'Sep 01', value: 272, displayValue: '272' },
        { label: 'Sep 15', value: 284, displayValue: '284' },
        { label: 'Sep 26', value: 290, displayValue: '290' },
      ],
    },
    shipments: {
      value: '180',
      growth: '↑ +21%',
      period: 'Dispatched Q3',
      color: '#D97706',
      series: [
        { label: 'Jul 01', value: 118, displayValue: '118' },
        { label: 'Jul 15', value: 132, displayValue: '132' },
        { label: 'Aug 01', value: 146, displayValue: '146' },
        { label: 'Aug 15', value: 155, displayValue: '155' },
        { label: 'Sep 01', value: 164, displayValue: '164' },
        { label: 'Sep 15', value: 174, displayValue: '174' },
        { label: 'Sep 26', value: 180, displayValue: '180' },
      ],
    },
    orders: {
      value: '390',
      growth: '↑ +19%',
      period: 'Q3 2026',
      color: '#7C3AED',
      series: [
        { label: 'Jul 01', value: 265, displayValue: '265' },
        { label: 'Jul 15', value: 290, displayValue: '290' },
        { label: 'Aug 01', value: 320, displayValue: '320' },
        { label: 'Aug 15', value: 345, displayValue: '345' },
        { label: 'Sep 01', value: 368, displayValue: '368' },
        { label: 'Sep 15', value: 380, displayValue: '380' },
        { label: 'Sep 26', value: 390, displayValue: '390' },
      ],
    },
    revenue: {
      value: '$1.72M',
      growth: '↑ +18%',
      period: 'Q3 2026',
      color: '#CA8A04',
      series: [
        { label: 'Jul 01', value: 1.15, displayValue: '$1.15M' },
        { label: 'Jul 15', value: 1.28, displayValue: '$1.28M' },
        { label: 'Aug 01', value: 1.42, displayValue: '$1.42M' },
        { label: 'Aug 15', value: 1.54, displayValue: '$1.54M' },
        { label: 'Sep 01', value: 1.62, displayValue: '$1.62M' },
        { label: 'Sep 15', value: 1.68, displayValue: '$1.68M' },
        { label: 'Sep 26', value: 1.72, displayValue: '$1.72M' },
      ],
    },
  },
  'This Year': {
    dateLabel: 'Calendar Year 2026 (YTD)',
    dateSub: 'Fiscal year operations & trade volume',
    enquiries: {
      value: '2,840',
      count: 2840,
      growth: '↑ +24%',
      period: 'This Year',
      color: '#2563EB',
      series: [
        { label: 'Jan', value: 1200, displayValue: '1,200' },
        { label: 'Mar', value: 1580, displayValue: '1,580' },
        { label: 'May', value: 1940, displayValue: '1,940' },
        { label: 'Jun', value: 2180, displayValue: '2,180' },
        { label: 'Jul', value: 2420, displayValue: '2,420' },
        { label: 'Aug', value: 2650, displayValue: '2,650' },
        { label: 'Sep', value: 2840, displayValue: '2,840' },
      ],
    },
    clients: {
      value: '412',
      growth: '↑ +19%',
      period: 'This Year',
      color: '#0D9488',
      series: [
        { label: 'Jan', value: 240, displayValue: '240' },
        { label: 'Mar', value: 285, displayValue: '285' },
        { label: 'May', value: 320, displayValue: '320' },
        { label: 'Jun', value: 350, displayValue: '350' },
        { label: 'Jul', value: 375, displayValue: '375' },
        { label: 'Aug', value: 395, displayValue: '395' },
        { label: 'Sep', value: 412, displayValue: '412' },
      ],
    },
    shipments: {
      value: '620',
      growth: '↑ +26%',
      period: 'Total Transits',
      color: '#D97706',
      series: [
        { label: 'Jan', value: 210, displayValue: '210' },
        { label: 'Mar', value: 290, displayValue: '290' },
        { label: 'May', value: 380, displayValue: '380' },
        { label: 'Jun', value: 440, displayValue: '440' },
        { label: 'Jul', value: 510, displayValue: '510' },
        { label: 'Aug', value: 570, displayValue: '570' },
        { label: 'Sep', value: 620, displayValue: '620' },
      ],
    },
    orders: {
      value: '512',
      growth: '↑ +22%',
      period: 'This Year',
      color: '#7C3AED',
      series: [
        { label: 'Jan', value: 160, displayValue: '160' },
        { label: 'Mar', value: 240, displayValue: '240' },
        { label: 'May', value: 310, displayValue: '310' },
        { label: 'Jun', value: 380, displayValue: '380' },
        { label: 'Jul', value: 430, displayValue: '430' },
        { label: 'Aug', value: 475, displayValue: '475' },
        { label: 'Sep', value: 512, displayValue: '512' },
      ],
    },
    revenue: {
      value: '$2.48M',
      growth: '↑ +16%',
      period: 'This Year',
      color: '#CA8A04',
      series: [
        { label: 'Jan', value: 0.65, displayValue: '$0.65M' },
        { label: 'Mar', value: 1.10, displayValue: '$1.10M' },
        { label: 'May', value: 1.52, displayValue: '$1.52M' },
        { label: 'Jun', value: 1.80, displayValue: '$1.80M' },
        { label: 'Jul', value: 2.05, displayValue: '$2.05M' },
        { label: 'Aug', value: 2.28, displayValue: '$2.28M' },
        { label: 'Sep', value: 2.48, displayValue: '$2.48M' },
      ],
    },
  },
};

// CSV Export Utility for Administrative Records
const downloadCSV = (filename: string, headers: string[], rows: (string | number)[][]) => {
  const csvContent =
    'data:text/csv;charset=utf-8,' +
    [headers.join(','), ...rows.map((e) => e.map((val) => `"${val}"`).join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export interface EnquiryItem {
  id: string;
  clientName: string;
  country: string;
  flag: string;
  tradeType: string;
  commodity: string;
  timeAgo: string;
  status: 'New' | 'In Progress' | 'Quoted' | 'Closed';
  volume?: string;
  value?: string;
  notes?: string;
}

export interface ShipmentRecord {
  id: string;
  trackingNo: string;
  product: string;
  from: string;
  to: string;
  status: 'In Transit' | 'Customs' | 'Delivered' | 'Delayed' | 'Cancelled';
  eta: string;
  vessel?: string;
  teus?: number;
}

export interface ClientRecord {
  id: string;
  name: string;
  country: string;
  countryCode: string;
  flag: string;
  totalOrders: number;
  value: string;
  contact?: string;
  email?: string;
}

export interface ActivityEvent {
  id: string;
  type: 'enquiry' | 'delivery' | 'payment' | 'registration' | 'quote';
  title: string;
  timeAgo: string;
}

export const AdminDashboardPage: React.FC = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();

  // Period filters
  const [shipmentPeriod, setShipmentPeriod] = useState<'This Month' | 'This Quarter' | 'This Year'>('This Month');
  const [revenuePeriod, setRevenuePeriod] = useState<'This Year' | 'Last Year'>('This Year');
  const [productPeriod, setProductPeriod] = useState<'This Month' | 'This Quarter'>('This Month');

  // Interactive active bar tooltip state (default to September 2026 as shown in reference image!)
  const [activeRevenueMonth, setActiveRevenueMonth] = useState<number | null>(8); // index 8 = Sep

  // Recent Enquiries Quick Filter Tab State
  const [recentEnquiryFilter, setRecentEnquiryFilter] = useState<'All' | 'New' | 'In Progress' | 'Quoted'>('All');

  // Interactive Shipment Status Donut Segment Hover State
  const [hoveredDonutSegment, setHoveredDonutSegment] = useState<string | null>(null);

  const shipmentDonutSegments = [
    { key: 'transit', label: 'In Transit', count: 28, pct: '43.8%', color: '#2563EB', strokeDasharray: '43.8 56.2', strokeDashoffset: '68.7' },
    { key: 'delivered', label: 'Delivered', count: 20, pct: '31.3%', color: '#10B981', strokeDasharray: '31.3 68.7', strokeDashoffset: '0' },
    { key: 'customs', label: 'Customs', count: 8, pct: '12.5%', color: '#EAB308', strokeDasharray: '12.5 87.5', strokeDashoffset: '12.5' },
    { key: 'delayed', label: 'Delayed', count: 6, pct: '9.4%', color: '#F97316', strokeDasharray: '9.4 90.6', strokeDashoffset: '21.9' },
    { key: 'cancelled', label: 'Cancelled', count: 2, pct: '3.1%', color: '#EF4444', strokeDasharray: '3.1 96.9', strokeDashoffset: '25' },
  ];

  // 1. Enquiries state (seeded from Reference Image 1)
  const [enquiries, setEnquiries] = useState<EnquiryItem[]>([
    {
      id: 'enq-1',
      clientName: 'Global Foods LLC',
      country: 'USA',
      flag: '🇺🇸',
      tradeType: 'Rice Export',
      commodity: 'Basmati Rice (Grade A)',
      timeAgo: '2 mins ago',
      status: 'New',
      volume: '150 MT',
      value: '$145,000',
      notes: 'Urgent container dispatch required for East Coast distribution.',
    },
    {
      id: 'enq-2',
      clientName: 'Al Noor Trading',
      country: 'UAE',
      flag: '🇦🇪',
      tradeType: 'Spices Import',
      commodity: 'Cardamom & Turmeric',
      timeAgo: '15 mins ago',
      status: 'In Progress',
      volume: '45 MT',
      value: '$88,000',
      notes: 'Negotiating proforma invoice and phytosanitary certificate.',
    },
    {
      id: 'enq-3',
      clientName: 'Sunrise Imports',
      country: 'Italy',
      flag: '🇮🇹',
      tradeType: 'Fruits Export',
      commodity: 'Fresh Mangoes & Pomegranates',
      timeAgo: '32 mins ago',
      status: 'Quoted',
      volume: '80 MT',
      value: '$112,000',
      notes: 'Cold chain air freight quote submitted with temperature loggers.',
    },
    {
      id: 'enq-4',
      clientName: 'Euro Trade GmbH',
      country: 'Germany',
      flag: '🇩🇪',
      tradeType: 'Textile Import',
      commodity: 'Organic Cotton Fabrics',
      timeAgo: '1 hour ago',
      status: 'Closed',
      volume: '120 MT',
      value: '$230,000',
      notes: 'Contract finalized and irrevocable Letter of Credit confirmed.',
    },
    {
      id: 'enq-5',
      clientName: 'Asian Fresh Co.',
      country: 'Japan',
      flag: '🇯🇵',
      tradeType: 'Vegetables Export',
      commodity: 'Dehydrated Onions & Garlic',
      timeAgo: '2 hours ago',
      status: 'New',
      volume: '60 MT',
      value: '$76,000',
      notes: 'Awaiting lab testing certificate for Japanese quarantine clearance.',
    },
  ]);

  // 2. Recent Shipments state (seeded from Reference Image 1)
  const [shipments] = useState<ShipmentRecord[]>([
    {
      id: 'shp-1',
      trackingNo: 'CEX258963',
      product: 'Rice (25 MT)',
      from: 'India',
      to: 'UAE',
      status: 'In Transit',
      eta: '28 Sep 2026',
      vessel: 'MSC ILONA',
      teus: 2,
    },
    {
      id: 'shp-2',
      trackingNo: 'CEX258962',
      product: 'Spices (10 MT)',
      from: 'Sri Lanka',
      to: 'UK',
      status: 'Customs',
      eta: '30 Sep 2026',
      vessel: 'CMA CGM GEMINI',
      teus: 1,
    },
    {
      id: 'shp-3',
      trackingNo: 'CEX258961',
      product: 'Textiles (5 MT)',
      from: 'China',
      to: 'USA',
      status: 'Delivered',
      eta: '26 Sep 2026',
      vessel: 'MAERSK ALABAMA',
      teus: 1,
    },
    {
      id: 'shp-4',
      trackingNo: 'CEX258960',
      product: 'Fruits (12 MT)',
      from: 'India',
      to: 'Singapore',
      status: 'In Transit',
      eta: '02 Oct 2026',
      vessel: 'EVER GIVEN',
      teus: 2,
    },
  ]);

  // 3. Top Clients state (seeded from Reference Image 1)
  const [clients] = useState<ClientRecord[]>([
    {
      id: 'cli-1',
      name: 'Global Foods LLC',
      country: 'USA',
      countryCode: 'USA',
      flag: '🇺🇸',
      totalOrders: 24,
      value: '$420K',
      contact: 'Robert Miller (Procurement Director)',
      email: 'robert@globalfoods.us',
    },
    {
      id: 'cli-2',
      name: 'Al Noor Trading',
      country: 'UAE',
      countryCode: 'UAE',
      flag: '🇦🇪',
      totalOrders: 18,
      value: '$380K',
      contact: 'Tariq Al-Mansoor (Chief Buyer)',
      email: 'tariq@alnoortrading.ae',
    },
    {
      id: 'cli-3',
      name: 'Euro Trade GmbH',
      country: 'Germany',
      countryCode: 'GER',
      flag: '🇩🇪',
      totalOrders: 15,
      value: '$312K',
      contact: 'Klaus Wagner (Supply Chain Lead)',
      email: 'klaus.wagner@eurotrade.de',
    },
    {
      id: 'cli-4',
      name: 'Sunrise Imports',
      country: 'United Kingdom',
      countryCode: 'UK',
      flag: '🇬🇧',
      totalOrders: 12,
      value: '$298K',
      contact: 'Sarah Jenkins (Logistics Manager)',
      email: 'sjenkins@sunriseimports.co.uk',
    },
    {
      id: 'cli-5',
      name: 'Asian Fresh Co.',
      country: 'Japan',
      countryCode: 'JPN',
      flag: '🇯🇵',
      totalOrders: 10,
      value: '$250K',
      contact: 'Kenji Sato (Import Supervisor)',
      email: 'kenji.sato@asianfresh.jp',
    },
  ]);

  // 4. Activity Log state (seeded from Reference Image 1)
  const [activities, setActivities] = useState<ActivityEvent[]>([
    {
      id: 'act-1',
      type: 'enquiry',
      title: 'New enquiry received from Global Foods LLC',
      timeAgo: '2 mins ago',
    },
    {
      id: 'act-2',
      type: 'delivery',
      title: 'Shipment CEX258961 delivered successfully',
      timeAgo: '25 mins ago',
    },
    {
      id: 'act-3',
      type: 'payment',
      title: 'Payment of $120K received from Al Noor Trading',
      timeAgo: '1 hour ago',
    },
    {
      id: 'act-4',
      type: 'registration',
      title: 'New client registered: Asian Fresh Co.',
      timeAgo: '2 hours ago',
    },
    {
      id: 'act-5',
      type: 'quote',
      title: 'Quote sent to Euro Trade GmbH',
      timeAgo: '3 hours ago',
    },
  ]);

  // Executive Time-Range & Live Telemetry State
  const [timeRange, setTimeRange] = useState<TimeRangeKey>('This Month');
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  // Executive Metric Drill-Down Modal State
  const [activeMetricModal, setActiveMetricModal] = useState<MetricDrillDown>(null);
  const [metricSearchQuery, setMetricSearchQuery] = useState('');
  const [metricFilterTab, setMetricFilterTab] = useState('All');

  const currentPeriod = PERIOD_METRICS[timeRange];

  // Dynamically compute live enquiry velocity series reflecting newly logged enquiries
  const dynamicEnquiriesSeries = useMemo(() => {
    const base = currentPeriod.enquiries.series;
    if (!base || base.length === 0) return [];
    const currentTotal = currentPeriod.enquiries.count + (enquiries.length - 5);
    return base.map((pt, idx) =>
      idx === base.length - 1
        ? { ...pt, value: currentTotal, displayValue: currentTotal.toLocaleString() }
        : pt
    );
  }, [currentPeriod.enquiries, enquiries.length]);

  const handleManualSync = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      showToast('Live telemetry synchronized: 5 global trade feeds and 64 GPS transponders live.', 'success');
    }, 650);
  };

  // Modals state
  const [newEnquiryModalOpen, setNewEnquiryModalOpen] = useState(false);
  const [selectedEnquiry, setSelectedEnquiry] = useState<EnquiryItem | null>(null);
  const [selectedShipment, setSelectedShipment] = useState<ShipmentRecord | null>(null);
  const [selectedClient, setSelectedClient] = useState<ClientRecord | null>(null);
  const [fullMapModalOpen, setFullMapModalOpen] = useState(false);

  // New Enquiry Form State
  const [newEnquiryForm, setNewEnquiryForm] = useState({
    clientName: '',
    country: 'USA',
    flag: '🇺🇸',
    commodity: 'Basmati Rice',
    tradeType: 'Export',
    volume: '50 MT',
    value: '$65,000',
    notes: '',
  });

  const handleCreateEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEnquiryForm.clientName) {
      showToast('Please enter the client company name', 'error');
      return;
    }

    const flagMap: Record<string, string> = {
      USA: '🇺🇸',
      UAE: '🇦🇪',
      UK: '🇬🇧',
      Germany: '🇩🇪',
      Italy: '🇮🇹',
      Japan: '🇯🇵',
      Singapore: '🇸🇬',
      India: '🇮🇳',
    };

    const newEnq: EnquiryItem = {
      id: `enq-${Date.now()}`,
      clientName: newEnquiryForm.clientName,
      country: newEnquiryForm.country,
      flag: flagMap[newEnquiryForm.country] || '🌐',
      tradeType: `${newEnquiryForm.commodity} ${newEnquiryForm.tradeType}`,
      commodity: newEnquiryForm.commodity,
      timeAgo: 'Just now',
      status: 'New',
      volume: newEnquiryForm.volume,
      value: newEnquiryForm.value,
      notes: newEnquiryForm.notes || 'Newly logged enquiry from admin command panel.',
    };

    setEnquiries([newEnq, ...enquiries]);

    const newAct: ActivityEvent = {
      id: `act-${Date.now()}`,
      type: 'enquiry',
      title: `New trade enquiry logged: ${newEnq.clientName} (${newEnq.commodity})`,
      timeAgo: 'Just now',
    };
    setActivities((prev) => [newAct, ...prev]);

    setNewEnquiryModalOpen(false);
    showToast(`New trade enquiry logged for ${newEnq.clientName}! Total enquiries updated.`, 'success');

    // Reset
    setNewEnquiryForm({
      clientName: '',
      country: 'USA',
      flag: '🇺🇸',
      commodity: 'Basmati Rice',
      tradeType: 'Export',
      volume: '50 MT',
      value: '$65,000',
      notes: '',
    });
  };

  const handleUpdateStatus = (status: EnquiryItem['status']) => {
    if (!selectedEnquiry) return;
    setEnquiries((prev) =>
      prev.map((item) =>
        item.id === selectedEnquiry.id ? { ...item, status } : item
      )
    );
    setSelectedEnquiry((prev) => (prev ? { ...prev, status } : null));
    showToast(`Enquiry status updated to ${status}`, 'success');
  };

  // Monthly Revenue Data (Grouped Bar Chart)
  const revenueMonths = [
    { month: 'Jan', importVal: 180, exportVal: 150 },
    { month: 'Feb', importVal: 240, exportVal: 190 },
    { month: 'Mar', importVal: 210, exportVal: 230 },
    { month: 'Apr', importVal: 190, exportVal: 210 },
    { month: 'May', importVal: 230, exportVal: 200 },
    { month: 'Jun', importVal: 220, exportVal: 250 },
    { month: 'Jul', importVal: 260, exportVal: 220 },
    { month: 'Aug', importVal: 290, exportVal: 270 },
    { month: 'Sep', importVal: 320, exportVal: 280 }, // Sep 2026 highlight: Total $600K
  ];

  return (
    <div className="admin-dashboard-view">
      {/* --------------------------------------------------------------------------
          1. Welcome Header & Action Cluster (Exact match to Reference Image 1)
          -------------------------------------------------------------------------- */}
      <div className="admin-overview-header-row">
        {/* Left: Welcome Title with Waving Emoji */}
        <div className="admin-overview-welcome">
          <h1 className="admin-overview-title">
            Welcome Back, <span className="admin-name-highlight">Admin!</span> <span className="admin-wave-emoji">👋</span>
          </h1>
          <p className="admin-overview-subtitle">
            Here's what's happening with your global trade operations today.
          </p>
        </div>

        {/* Right: Date Widget + Live Telemetry Sync + New Enquiry Button */}
        <div className="admin-overview-actions">
          {/* Interactive Calendar & Time Filter Widget */}
          <div className="admin-date-widget-container">
            <button
              type="button"
              className={`admin-date-widget ${datePickerOpen ? 'active' : ''}`}
              onClick={() => setDatePickerOpen(!datePickerOpen)}
              title="Click to switch operations time-window"
            >
              <div className="admin-date-icon-wrap">
                <Calendar size={18} />
              </div>
              <div className="admin-date-text">
                <div className="admin-date-day-row">
                  <span className="admin-date-day">{currentPeriod.dateLabel}</span>
                  <ChevronDown size={14} className={`admin-date-chevron ${datePickerOpen ? 'open' : ''}`} />
                </div>
                <span className="admin-date-sub">{currentPeriod.dateSub}</span>
              </div>
            </button>

            {/* Time-Range Dropdown Popover */}
            {datePickerOpen && (
              <div className="admin-date-popover" onClick={(e) => e.stopPropagation()}>
                <div className="admin-date-popover-header">
                  <span className="admin-popover-title">Operations Range</span>
                  <span className="admin-popover-badge">{timeRange}</span>
                </div>
                <div className="admin-date-options">
                  {(['Today', 'This Week', 'This Month', 'Q3 2026', 'This Year'] as TimeRangeKey[]).map((period) => (
                    <button
                      key={period}
                      type="button"
                      className={`admin-date-option-btn ${timeRange === period ? 'selected' : ''}`}
                      onClick={() => {
                        setTimeRange(period);
                        setDatePickerOpen(false);
                        showToast(`Dashboard filtered to: ${period}`, 'info');
                      }}
                    >
                      <div className="admin-date-opt-info">
                        <span className="admin-date-opt-title">{period}</span>
                        <span className="admin-date-opt-desc">{PERIOD_METRICS[period].dateSub}</span>
                      </div>
                      {timeRange === period && <Check size={16} className="admin-check-icon" />}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Telemetry Live Sync Refresh Button */}
          <button
            type="button"
            className={`admin-telemetry-sync-btn ${isSyncing ? 'syncing' : ''}`}
            onClick={handleManualSync}
            title="Real-time telemetry sync"
          >
            <RotateCw size={14} className={isSyncing ? 'admin-spin-icon' : ''} />
            <span className="admin-live-pulse-dot" />
            <span className="admin-live-label">{isSyncing ? 'Syncing...' : 'Live'}</span>
          </button>

          {/* New Enquiry Golden Button */}
          <button
            type="button"
            className="admin-new-enquiry-btn"
            onClick={() => setNewEnquiryModalOpen(true)}
          >
            <Plus size={16} strokeWidth={2.5} />
            <span>New Enquiry</span>
          </button>
        </div>
      </div>

      {/* --------------------------------------------------------------------------
          2. Top Row: 5 Metric KPI Cards with Sparklines (Exact match to Reference 1)
          -------------------------------------------------------------------------- */}
      <div className="admin-overview-metrics-grid">
        {/* Metric 1: Total Enquiries */}
        <div
          className="admin-ref-metric-card card-blue"
          onClick={() => {
            setActiveMetricModal('enquiries');
            setMetricSearchQuery('');
            setMetricFilterTab('All');
          }}
          title="Click to inspect enquiries dossier"
        >
          <div className="admin-ref-metric-content">
            <div className="admin-ref-icon-circle blue">
              <Mail size={20} />
            </div>
            <div className="admin-ref-metric-data">
              <span className="admin-ref-label">Total Enquiries</span>
              <div className="admin-ref-val-row">
                <span className="admin-ref-val">
                  {currentPeriod.enquiries.count + (enquiries.length - 5)}
                </span>
                <span className="admin-ref-growth">{currentPeriod.enquiries.growth}</span>
              </div>
              <span className="admin-ref-period">{currentPeriod.enquiries.period}</span>
            </div>
          </div>
          {/* Blue Executive Sparkline */}
          <div className="admin-ref-sparkline">
            <ExecutiveSparkline
              id="enquiries"
              color="#2563EB"
              data={dynamicEnquiriesSeries}
              ariaLabel="Total enquiries trend"
            />
          </div>
          <span className="admin-card-inspect-hint">
            <ArrowUpRight size={13} />
          </span>
        </div>

        {/* Metric 2: Active Clients */}
        <div
          className="admin-ref-metric-card card-cyan"
          onClick={() => {
            setActiveMetricModal('clients');
            setMetricSearchQuery('');
            setMetricFilterTab('All');
          }}
          title="Click to view verified client network"
        >
          <div className="admin-ref-metric-content">
            <div className="admin-ref-icon-circle cyan">
              <Users size={20} />
            </div>
            <div className="admin-ref-metric-data">
              <span className="admin-ref-label">Active Clients</span>
              <div className="admin-ref-val-row">
                <span className="admin-ref-val">{currentPeriod.clients.value}</span>
                <span className="admin-ref-growth">{currentPeriod.clients.growth}</span>
              </div>
              <span className="admin-ref-period">{currentPeriod.clients.period}</span>
            </div>
          </div>
          {/* Cyan Executive Sparkline */}
          <div className="admin-ref-sparkline">
            <ExecutiveSparkline
              id="clients"
              color="#0D9488"
              data={currentPeriod.clients.series}
              ariaLabel="Active clients trend"
            />
          </div>
          <span className="admin-card-inspect-hint">
            <ArrowUpRight size={13} />
          </span>
        </div>

        {/* Metric 3: Ongoing Shipments */}
        <div
          className="admin-ref-metric-card card-amber"
          onClick={() => {
            setActiveMetricModal('shipments');
            setMetricSearchQuery('');
            setMetricFilterTab('All');
          }}
          title="Click to view fleet & cargo transits"
        >
          <div className="admin-ref-metric-content">
            <div className="admin-ref-icon-circle amber">
              <Package size={20} />
            </div>
            <div className="admin-ref-metric-data">
              <span className="admin-ref-label">Ongoing Shipments</span>
              <div className="admin-ref-val-row">
                <span className="admin-ref-val">{currentPeriod.shipments.value}</span>
                <span className="admin-ref-growth">{currentPeriod.shipments.growth}</span>
              </div>
              <span className="admin-ref-period">{currentPeriod.shipments.period}</span>
            </div>
          </div>
          {/* Amber Executive Sparkline */}
          <div className="admin-ref-sparkline">
            <ExecutiveSparkline
              id="shipments"
              color="#D97706"
              data={currentPeriod.shipments.series}
              ariaLabel="Ongoing shipments trend"
            />
          </div>
          <span className="admin-card-inspect-hint">
            <ArrowUpRight size={13} />
          </span>
        </div>

        {/* Metric 4: Completed Orders */}
        <div
          className="admin-ref-metric-card card-purple"
          onClick={() => {
            setActiveMetricModal('orders');
            setMetricSearchQuery('');
            setMetricFilterTab('All');
          }}
          title="Click to view completed orders & bills of lading"
        >
          <div className="admin-ref-metric-content">
            <div className="admin-ref-icon-circle purple">
              <CheckCircle2 size={20} />
            </div>
            <div className="admin-ref-metric-data">
              <span className="admin-ref-label">Completed Orders</span>
              <div className="admin-ref-val-row">
                <span className="admin-ref-val">{currentPeriod.orders.value}</span>
                <span className="admin-ref-growth">{currentPeriod.orders.growth}</span>
              </div>
              <span className="admin-ref-period">{currentPeriod.orders.period}</span>
            </div>
          </div>
          {/* Purple Executive Sparkline */}
          <div className="admin-ref-sparkline">
            <ExecutiveSparkline
              id="orders"
              color="#7C3AED"
              data={currentPeriod.orders.series}
              ariaLabel="Completed orders trend"
            />
          </div>
          <span className="admin-card-inspect-hint">
            <ArrowUpRight size={13} />
          </span>
        </div>

        {/* Metric 5: Total Revenue */}
        <div
          className="admin-ref-metric-card card-gold"
          onClick={() => {
            setActiveMetricModal('revenue');
            setMetricSearchQuery('');
            setMetricFilterTab('All');
          }}
          title="Click to view revenue breakdown & financial ledger"
        >
          <div className="admin-ref-metric-content">
            <div className="admin-ref-icon-circle gold">
              <TrendingUp size={20} />
            </div>
            <div className="admin-ref-metric-data">
              <span className="admin-ref-label">Total Revenue</span>
              <div className="admin-ref-val-row">
                <span className="admin-ref-val">{currentPeriod.revenue.value}</span>
                <span className="admin-ref-growth">{currentPeriod.revenue.growth}</span>
              </div>
              <span className="admin-ref-period">{currentPeriod.revenue.period}</span>
            </div>
          </div>
          {/* Gold Executive Sparkline */}
          <div className="admin-ref-sparkline">
            <ExecutiveSparkline
              id="revenue"
              color="#CA8A04"
              data={currentPeriod.revenue.series}
              ariaLabel="Total revenue trajectory"
            />
          </div>
          <span className="admin-card-inspect-hint">
            <ArrowUpRight size={13} />
          </span>
        </div>
      </div>

      {/* --------------------------------------------------------------------------
          3. Row 2: Global Trade Overview & Recent Enquiries (Exact match to Reference 1)
          -------------------------------------------------------------------------- */}
      <div className="admin-overview-middle-grid">
        {/* Left: Global Trade Overview Card (Map + Corridor Stats) */}
        <div className="admin-ref-card admin-global-trade-card">
          <div className="admin-ref-card-header">
            <div>
              <h2 className="admin-ref-card-title">Global Trade Overview</h2>
              <p className="admin-ref-card-sub">
                Live view of your import & export activities across the world.
              </p>
            </div>

            {/* Map Legend */}
            <div className="admin-ref-map-legend">
              <div className="legend-item">
                <span className="legend-dot blue" />
                <span>Import</span>
              </div>
              <div className="legend-item">
                <span className="legend-dot amber" />
                <span>Export</span>
              </div>
              <div className="legend-item">
                <span className="legend-dash" />
                <span>Active Route</span>
              </div>
            </div>
          </div>

          <div className="admin-global-trade-body">
            {/* Left mini KPI stats */}
            <div className="admin-map-side-stats">
              <div className="admin-map-side-stat-item">
                <div className="admin-map-side-stat-icon">
                  <Globe size={18} />
                </div>
                <div className="admin-map-side-stat-text">
                  <div className="stat-val">45+</div>
                  <div className="stat-label">Countries Served</div>
                </div>
              </div>

              <div className="admin-map-side-stat-item">
                <div className="admin-map-side-stat-icon">
                  <Ship size={18} />
                </div>
                <div className="admin-map-side-stat-text">
                  <div className="stat-val">120+</div>
                  <div className="stat-label">Shipping Corridors</div>
                </div>
              </div>

              <div className="admin-map-side-stat-item">
                <div className="admin-map-side-stat-icon">
                  <Plane size={18} />
                </div>
                <div className="admin-map-side-stat-text">
                  <div className="stat-val">24/7</div>
                  <div className="stat-label">Cargo Tracking</div>
                </div>
              </div>

              <div className="admin-map-side-stat-item">
                <div className="admin-map-side-stat-icon">
                  <Building2 size={18} />
                </div>
                <div className="admin-map-side-stat-text">
                  <div className="stat-val">99.4%</div>
                  <div className="stat-label">On-Time Clearance</div>
                </div>
              </div>
            </div>

            {/* Interactive World Map Component */}
            <div className="admin-map-canvas-area">
              <AdminWorldMap onViewFullMap={() => setFullMapModalOpen(true)} />
            </div>
          </div>
        </div>

        {/* Right: Recent Enquiries Card (Elevated Executive Inbox with Flag Badges & Filters) */}
        <div className="admin-ref-card admin-recent-enquiries-card">
          <div className="admin-ref-card-header">
            <div className="admin-card-title-group">
              <h2 className="admin-ref-card-title">Recent Enquiries</h2>
              <span className="admin-count-pill">{enquiries.length} Active</span>
            </div>
            <button
              type="button"
              className="admin-ref-viewall-btn"
              onClick={() => navigate('/admin/enquiries')}
            >
              <span>View All</span>
              <ArrowRight size={13} />
            </button>
          </div>

          {/* Interactive Quick Filter Tabs */}
          <div className="admin-enquiry-filter-tabs" role="tablist" aria-label="Filter enquiries by status">
            {(['All', 'New', 'In Progress', 'Quoted'] as const).map((tab) => {
              const count = tab === 'All' ? enquiries.length : enquiries.filter((e) => e.status === tab).length;
              return (
                <button
                  key={tab}
                  type="button"
                  role="tab"
                  aria-selected={recentEnquiryFilter === tab}
                  className={`admin-enquiry-tab-pill ${recentEnquiryFilter === tab ? 'active' : ''}`}
                  onClick={() => setRecentEnquiryFilter(tab)}
                >
                  <span>{tab}</span>
                  <span className="tab-pill-count">{count}</span>
                </button>
              );
            })}
          </div>

          <div className="admin-enquiries-list">
            {enquiries
              .filter((enq) => recentEnquiryFilter === 'All' || enq.status === recentEnquiryFilter)
              .map((enq) => {
                const isExport = enq.tradeType.toLowerCase().includes('export');
                return (
                  <div
                    key={enq.id}
                    className="admin-enquiry-row"
                    onClick={() => setSelectedEnquiry(enq)}
                    title={`Click to inspect enquiry from ${enq.clientName} (${enq.country})`}
                  >
                    {/* Authentic Vector Country Flag + Client Details */}
                    <div className="admin-enquiry-main">
                      <CountryFlagBadge
                        country={enq.country}
                        size={34}
                        shape="circle"
                        showCodeBadge={true}
                      />
                      <div className="admin-enquiry-info">
                        <div className="admin-enquiry-client-row">
                          <span className="admin-enquiry-client">{enq.clientName}</span>
                          <span className="admin-enquiry-country-name">({enq.country})</span>
                        </div>
                        <div className="admin-enquiry-commodity-row">
                          <span className={`admin-trade-direction-pill ${isExport ? 'export' : 'import'}`}>
                            {isExport ? '↗ Export' : '↘ Import'}
                          </span>
                          <span className="admin-enquiry-commodity" title={enq.commodity || enq.tradeType}>
                            {enq.commodity || enq.tradeType}
                          </span>
                          {enq.value && (
                            <span className="admin-enquiry-val-chip">{enq.value}</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Time + Pulsing Status Badge + Action Trigger */}
                    <div className="admin-enquiry-meta">
                      <div className="admin-enquiry-time-box">
                        <Clock size={11} className="time-clock-icon" />
                        <span className="admin-enquiry-time">{enq.timeAgo}</span>
                      </div>
                      <span className={`admin-enquiry-badge ${enq.status.toLowerCase().replace(' ', '-')}`}>
                        <span className="status-dot" />
                        <span>{enq.status}</span>
                      </span>
                      <button
                        type="button"
                        className="admin-enquiry-kebab-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedEnquiry(enq);
                        }}
                        title="Quick inspect & update status"
                        aria-label="Enquiry actions"
                      >
                        <MoreVertical size={14} />
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      {/* --------------------------------------------------------------------------
          4. Row 3: 3-Column Visual Intelligence Grid (Exact match to Reference 1)
          -------------------------------------------------------------------------- */}
      <div className="admin-overview-bottom-grid">
        {/* Card 1: Shipment Status (Donut Chart) */}
        <div className="admin-ref-card admin-shipment-status-card">
          <div className="admin-ref-card-header">
            <h2 className="admin-ref-card-title">Shipment Status</h2>
            <div className="admin-period-dropdown-wrap">
              <select
                className="admin-period-select"
                value={shipmentPeriod}
                onChange={(e) => setShipmentPeriod(e.target.value as any)}
              >
                <option value="This Month">This Month</option>
                <option value="This Quarter">This Quarter</option>
                <option value="This Year">This Year</option>
              </select>
            </div>
          </div>

          <div className="admin-shipment-donut-wrap">
            {/* SVG Donut Chart */}
            <div className="admin-donut-svg-box">
              <svg viewBox="0 0 42 42" className="admin-donut-svg">
                {shipmentDonutSegments.map((seg) => (
                  <circle
                    key={seg.key}
                    cx="21"
                    cy="21"
                    r="15.915"
                    fill="transparent"
                    stroke={seg.color}
                    strokeWidth={hoveredDonutSegment === seg.key ? 6.8 : 5}
                    strokeDasharray={seg.strokeDasharray}
                    strokeDashoffset={seg.strokeDashoffset}
                    className="admin-donut-slice"
                    style={{
                      opacity: hoveredDonutSegment && hoveredDonutSegment !== seg.key ? 0.35 : 1,
                      transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                    onMouseEnter={() => setHoveredDonutSegment(seg.key)}
                    onMouseLeave={() => setHoveredDonutSegment(null)}
                  />
                ))}
              </svg>
              {hoveredDonutSegment ? (
                (() => {
                  const activeSeg = shipmentDonutSegments.find((s) => s.key === hoveredDonutSegment);
                  if (!activeSeg) return null;
                  return (
                    <div className="donut-hover-info">
                      <span className="donut-hover-num" style={{ color: activeSeg.color }}>{activeSeg.count}</span>
                      <span className="donut-hover-lbl" style={{ color: activeSeg.color }}>{activeSeg.label}</span>
                      <span className="donut-hover-pct">({activeSeg.pct})</span>
                    </div>
                  );
                })()
              ) : (
                <div className="admin-donut-center-info">
                  <span className="donut-num">64</span>
                  <span className="donut-text">Total Shipments</span>
                  <span className="donut-sub-live">● Live Fleet</span>
                </div>
              )}
            </div>

            {/* Legend list matching Reference 1 */}
            <div className="admin-donut-legend-list">
              {shipmentDonutSegments.map((seg) => (
                <div
                  key={seg.key}
                  className={`admin-donut-legend-item ${hoveredDonutSegment === seg.key ? 'active' : ''}`}
                  onMouseEnter={() => setHoveredDonutSegment(seg.key)}
                  onMouseLeave={() => setHoveredDonutSegment(null)}
                >
                  <span className="donut-legend-dot" style={{ backgroundColor: seg.color }} />
                  <span className="donut-legend-name">{seg.label}</span>
                  <span className="donut-legend-val">{seg.count} ({seg.pct})</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Card 2: Revenue Overview (Grouped Dual Bar Chart) */}
        <div className="admin-ref-card admin-revenue-overview-card">
          <div className="admin-ref-card-header">
            <h2 className="admin-ref-card-title">Revenue Overview</h2>

            {/* Legend & Filter */}
            <div className="admin-revenue-header-actions">
              <div className="admin-revenue-legend">
                <div className="legend-chip">
                  <span className="legend-rect blue" />
                  <span>Import Revenue</span>
                </div>
                <div className="legend-chip">
                  <span className="legend-rect amber" />
                  <span>Export Revenue</span>
                </div>
              </div>

              <select
                className="admin-period-select"
                value={revenuePeriod}
                onChange={(e) => setRevenuePeriod(e.target.value as any)}
              >
                <option value="This Year">This Year</option>
                <option value="Last Year">Last Year</option>
              </select>
            </div>
          </div>

          {/* Grouped Bar Chart Area */}
          <div className="admin-revenue-chart-box">
            {/* Y Axis Guide */}
            <div className="admin-bar-y-axis">
              <span>$400K</span>
              <span>$300K</span>
              <span>$200K</span>
              <span>$100K</span>
              <span>$0</span>
            </div>

            {/* Bars Canvas */}
            <div className="admin-bars-container">
              {/* Background Grid Lines */}
              <div className="admin-grid-lines">
                <div className="grid-line" />
                <div className="grid-line" />
                <div className="grid-line" />
                <div className="grid-line" />
                <div className="grid-line" />
              </div>

              {/* $500K Benchmark Target Quota Line */}
              <div className="admin-revenue-target-line" title="Monthly Executive Target: $500K">
                <span className="target-line-pill">Target $500K</span>
              </div>

              {/* Month Columns */}
              <div className="admin-bar-columns-row">
                {revenueMonths.map((m, idx) => {
                  const isHovered = activeRevenueMonth === idx;
                  const totalMonth = m.importVal + m.exportVal;

                  // Height calculation based on max 400
                  const importHeight = (m.importVal / 400) * 100;
                  const exportHeight = (m.exportVal / 400) * 100;

                  return (
                    <div
                      key={m.month}
                      className={`admin-bar-month-group ${isHovered ? 'active' : ''}`}
                      onMouseEnter={() => setActiveRevenueMonth(idx)}
                      onClick={() => setActiveRevenueMonth(idx)}
                    >
                      {/* Interactive Tooltip (Active on Sep 2026 like reference image!) */}
                      {isHovered && (
                        <div className="admin-revenue-tooltip">
                          <div className="tooltip-month">{m.month} 2026</div>
                          <div className="tooltip-row">
                            <span className="dot blue" />
                            <span>Import: <strong>${m.importVal}K</strong></span>
                          </div>
                          <div className="tooltip-row">
                            <span className="dot amber" />
                            <span>Export: <strong>${m.exportVal}K</strong></span>
                          </div>
                          <div className="tooltip-divider" />
                          <div className="tooltip-total">
                            Total: <strong>${totalMonth}K</strong>
                            <span className="tooltip-mom-badge">↑ +14% MoM</span>
                          </div>
                        </div>
                      )}

                      {/* Dual Bars */}
                      <div className="admin-dual-bars">
                        <div
                          className="admin-bar blue"
                          style={{ height: `${importHeight}%` }}
                          title={`Import: $${m.importVal}K`}
                        />
                        <div
                          className="admin-bar amber"
                          style={{ height: `${exportHeight}%` }}
                          title={`Export: $${m.exportVal}K`}
                        />
                      </div>

                      {/* Month label */}
                      <span className="admin-bar-month-label">{m.month}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Top Trading Products (Thumbnails + Progress Bars) */}
        <div className="admin-ref-card admin-top-products-card">
          <div className="admin-ref-card-header">
            <h2 className="admin-ref-card-title">Top Trading Products</h2>
            <select
              className="admin-period-select"
              value={productPeriod}
              onChange={(e) => setProductPeriod(e.target.value as any)}
            >
              <option value="This Month">This Month</option>
              <option value="This Quarter">This Quarter</option>
            </select>
          </div>

          <div className="admin-top-products-list">
            {/* Product 1: Rice */}
            <div className="admin-product-progress-row">
              <div className="admin-product-thumb-wrap">
                <img src="/assets/categories/rice-grains.jpg" alt="Rice" className="admin-product-thumb" />
              </div>
              <div className="admin-product-info">
                <span className="admin-product-name">Rice</span>
                <div className="admin-product-bar-track">
                  <div className="admin-product-bar-fill" style={{ width: '28%' }} />
                </div>
              </div>
              <span className="admin-product-pct">28%</span>
              <span className="admin-product-val">$698K</span>
            </div>

            {/* Product 2: Spices */}
            <div className="admin-product-progress-row">
              <div className="admin-product-thumb-wrap">
                <img src="/assets/categories/spices.jpg" alt="Spices" className="admin-product-thumb" />
              </div>
              <div className="admin-product-info">
                <span className="admin-product-name">Spices</span>
                <div className="admin-product-bar-track">
                  <div className="admin-product-bar-fill" style={{ width: '22%' }} />
                </div>
              </div>
              <span className="admin-product-pct">22%</span>
              <span className="admin-product-val">$542K</span>
            </div>

            {/* Product 3: Textiles */}
            <div className="admin-product-progress-row">
              <div className="admin-product-thumb-wrap">
                <img src="/assets/sectors/textiles-apparel.jpg" alt="Textiles" className="admin-product-thumb" />
              </div>
              <div className="admin-product-info">
                <span className="admin-product-name">Textiles</span>
                <div className="admin-product-bar-track">
                  <div className="admin-product-bar-fill" style={{ width: '18%' }} />
                </div>
              </div>
              <span className="admin-product-pct">18%</span>
              <span className="admin-product-val">$430K</span>
            </div>

            {/* Product 4: Fruits */}
            <div className="admin-product-progress-row">
              <div className="admin-product-thumb-wrap">
                <img src="/assets/categories/fruits-veg.jpg" alt="Fruits" className="admin-product-thumb" />
              </div>
              <div className="admin-product-info">
                <span className="admin-product-name">Fruits</span>
                <div className="admin-product-bar-track">
                  <div className="admin-product-bar-fill" style={{ width: '16%' }} />
                </div>
              </div>
              <span className="admin-product-pct">16%</span>
              <span className="admin-product-val">$392K</span>
            </div>

            {/* Product 5: Metals */}
            <div className="admin-product-progress-row">
              <div className="admin-product-thumb-wrap">
                <img src="/assets/sectors/industrial-materials.jpg" alt="Metals" className="admin-product-thumb" />
              </div>
              <div className="admin-product-info">
                <span className="admin-product-name">Metals</span>
                <div className="admin-product-bar-track">
                  <div className="admin-product-bar-fill" style={{ width: '10%' }} />
                </div>
              </div>
              <span className="admin-product-pct">10%</span>
              <span className="admin-product-val">$250K</span>
            </div>
          </div>
        </div>
      </div>

      {/* --------------------------------------------------------------------------
          5. Row 4: 3-Column Tables & Activity Log (Exact match to Reference 1)
          -------------------------------------------------------------------------- */}
      <div className="admin-overview-bottom-grid">
        {/* Column 1: Recent Shipments Table */}
        <div className="admin-ref-card admin-recent-shipments-card">
          <div className="admin-ref-card-header">
            <h2 className="admin-ref-card-title">Recent Shipments</h2>
            <button
              type="button"
              className="admin-ref-viewall-btn"
              onClick={() => navigate('/admin/orders')}
            >
              <span>View All</span>
              <ArrowRight size={13} />
            </button>
          </div>

          <div className="admin-ref-table-responsive">
            <table className="admin-ref-table">
              <thead>
                <tr>
                  <th>Tracking No.</th>
                  <th>Product</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Status</th>
                  <th>ETA</th>
                </tr>
              </thead>
              <tbody>
                {shipments.map((shp) => (
                  <tr
                    key={shp.id}
                    onClick={() => setSelectedShipment(shp)}
                    className="clickable-row"
                  >
                    <td className="tracking-cell">{shp.trackingNo}</td>
                    <td className="product-cell">{shp.product}</td>
                    <td>{shp.from}</td>
                    <td>{shp.to}</td>
                    <td>
                      <span className={`admin-ship-status-pill ${shp.status.toLowerCase().replace(' ', '-')}`}>
                        {shp.status}
                      </span>
                    </td>
                    <td className="eta-cell">{shp.eta}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Column 2: Top Clients Table */}
        <div className="admin-ref-card admin-top-clients-card">
          <div className="admin-ref-card-header">
            <h2 className="admin-ref-card-title">Top Clients</h2>
            <button
              type="button"
              className="admin-ref-viewall-btn"
              onClick={() => showToast('Displaying certified international trade partners')}
            >
              <span>View All</span>
              <ArrowRight size={13} />
            </button>
          </div>

          <div className="admin-ref-table-responsive">
            <table className="admin-ref-table">
              <thead>
                <tr>
                  <th>Client Name</th>
                  <th>Country</th>
                  <th>Total Orders</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((cli) => (
                  <tr
                    key={cli.id}
                    onClick={() => setSelectedClient(cli)}
                    className="clickable-row"
                  >
                    <td>
                      <div className="admin-client-cell">
                        <CountryFlagBadge
                          country={cli.country}
                          code={cli.countryCode}
                          size={24}
                          shape="circle"
                          showCodeBadge={true}
                        />
                        <span className="client-name">{cli.name}</span>
                      </div>
                    </td>
                    <td>{cli.countryCode}</td>
                    <td className="orders-cell">{cli.totalOrders}</td>
                    <td className="val-cell">{cli.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Column 3: Activity Log */}
        <div className="admin-ref-card admin-activity-log-card">
          <div className="admin-ref-card-header">
            <h2 className="admin-ref-card-title">Activity Log</h2>
            <button
              type="button"
              className="admin-ref-viewall-btn"
              onClick={() => showToast('Opening security & operational event audits...')}
            >
              <span>View All</span>
              <ArrowRight size={13} />
            </button>
          </div>

          <div className="admin-activity-list">
            {activities.map((act) => {
              const iconMap = {
                enquiry: <Mail size={15} color="#2563EB" />,
                delivery: <CheckCircle2 size={15} color="#10B981" />,
                payment: <CreditCard size={15} color="#0D9488" />,
                registration: <Users size={15} color="#3B82F6" />,
                quote: <FileText size={15} color="#D97706" />,
              };

              const bgMap = {
                enquiry: '#EFF6FF',
                delivery: '#ECFDF5',
                payment: '#CCFBF1',
                registration: '#DBEAFE',
                quote: '#FEF3C7',
              };

              return (
                <div key={act.id} className="admin-activity-row">
                  <div
                    className="admin-activity-icon"
                    style={{ backgroundColor: bgMap[act.type] }}
                  >
                    {iconMap[act.type]}
                  </div>
                  <div className="admin-activity-content">
                    <div className="admin-activity-title">{act.title}</div>
                  </div>
                  <span className="admin-activity-time">{act.timeAgo}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* --------------------------------------------------------------------------
          6. Interactive Modals
          -------------------------------------------------------------------------- */}
      {/* A. Create New Enquiry Modal */}
      {newEnquiryModalOpen && (
        <div className="admin-modal-backdrop" onClick={() => setNewEnquiryModalOpen(false)}>
          <div className="admin-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3 className="admin-modal-title">
                <Plus size={18} color="#D97706" />
                <span>Create New Trade Enquiry</span>
              </h3>
              <button
                className="admin-modal-close"
                onClick={() => setNewEnquiryModalOpen(false)}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateEnquiry}>
              <div className="admin-modal-body">
                <div className="admin-form-group">
                  <label className="admin-form-label">Client Company Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Apex Global Trading FZE"
                    className="admin-form-input"
                    value={newEnquiryForm.clientName}
                    onChange={(e) =>
                      setNewEnquiryForm({ ...newEnquiryForm, clientName: e.target.value })
                    }
                  />
                </div>

                <div className="admin-form-grid">
                  <div className="admin-form-group">
                    <label className="admin-form-label">Destination / Country *</label>
                    <select
                      className="admin-form-select"
                      value={newEnquiryForm.country}
                      onChange={(e) =>
                        setNewEnquiryForm({ ...newEnquiryForm, country: e.target.value })
                      }
                    >
                      <option value="USA">United States (USA)</option>
                      <option value="UAE">United Arab Emirates (UAE)</option>
                      <option value="UK">United Kingdom (UK)</option>
                      <option value="Germany">Germany (GER)</option>
                      <option value="Italy">Italy (ITA)</option>
                      <option value="Japan">Japan (JPN)</option>
                      <option value="Singapore">Singapore (SG)</option>
                      <option value="India">India (IN)</option>
                    </select>
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">Trade Flow *</label>
                    <select
                      className="admin-form-select"
                      value={newEnquiryForm.tradeType}
                      onChange={(e) =>
                        setNewEnquiryForm({ ...newEnquiryForm, tradeType: e.target.value })
                      }
                    >
                      <option value="Export">Export</option>
                      <option value="Import">Import</option>
                    </select>
                  </div>
                </div>

                <div className="admin-form-grid">
                  <div className="admin-form-group">
                    <label className="admin-form-label">Commodity Specification *</label>
                    <select
                      className="admin-form-select"
                      value={newEnquiryForm.commodity}
                      onChange={(e) =>
                        setNewEnquiryForm({ ...newEnquiryForm, commodity: e.target.value })
                      }
                    >
                      <option value="Basmati Rice">Basmati Rice (1121 & Pusa)</option>
                      <option value="Spices">Spices (Cardamom, Turmeric, Cumin)</option>
                      <option value="Textiles">Textiles & Organic Fabrics</option>
                      <option value="Fresh Fruits">Fresh Fruits (Mangoes & Pomegranates)</option>
                      <option value="Vegetables">Dehydrated Vegetables</option>
                      <option value="Metals">Industrial Metals & Minerals</option>
                    </select>
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">Order Volume *</label>
                    <input
                      type="text"
                      placeholder="e.g. 100 MT"
                      className="admin-form-input"
                      value={newEnquiryForm.volume}
                      onChange={(e) =>
                        setNewEnquiryForm({ ...newEnquiryForm, volume: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Estimated Consignment Value ($)</label>
                  <input
                    type="text"
                    placeholder="e.g. $95,000"
                    className="admin-form-input"
                    value={newEnquiryForm.value}
                    onChange={(e) =>
                      setNewEnquiryForm({ ...newEnquiryForm, value: e.target.value })
                    }
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Internal Logistics Notes</label>
                  <textarea
                    rows={2}
                    placeholder="Port terms, Incoterms (CIF, FOB), packaging notes..."
                    className="admin-form-textarea"
                    value={newEnquiryForm.notes}
                    onChange={(e) =>
                      setNewEnquiryForm({ ...newEnquiryForm, notes: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="admin-modal-footer">
                <button
                  type="button"
                  className="admin-btn-secondary"
                  onClick={() => setNewEnquiryModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="admin-btn-primary">
                  <span>Save &amp; Log Enquiry</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* B. Enquiry Inspector / Status Updater Modal */}
      {selectedEnquiry && (
        <div className="admin-modal-backdrop" onClick={() => setSelectedEnquiry(null)}>
          <div className="admin-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3 className="admin-modal-title" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <CountryFlagBadge country={selectedEnquiry.country} size={30} shape="circle" showCodeBadge={true} />
                <span>{selectedEnquiry.clientName}</span>
              </h3>
              <button
                className="admin-modal-close"
                onClick={() => setSelectedEnquiry(null)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="admin-modal-body">
              <div className="admin-detail-meta-box">
                <div className="detail-item">
                  <span className="label">Trade Flow</span>
                  <span className="val">{selectedEnquiry.tradeType}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Commodity</span>
                  <span className="val">{selectedEnquiry.commodity}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Volume</span>
                  <span className="val">{selectedEnquiry.volume || '100 MT'}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Value</span>
                  <span className="val">{selectedEnquiry.value || '$120,000'}</span>
                </div>
              </div>

              <div className="admin-form-group" style={{ marginTop: 14 }}>
                <label className="admin-form-label">Update Enquiry Status:</label>
                <div className="admin-status-picker-row">
                  {(['New', 'In Progress', 'Quoted', 'Closed'] as const).map((st) => (
                    <button
                      key={st}
                      type="button"
                      className={`status-pick-btn ${selectedEnquiry.status === st ? 'active' : ''}`}
                      onClick={() => handleUpdateStatus(st)}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              <div className="admin-form-group" style={{ marginTop: 12 }}>
                <label className="admin-form-label">Admin Notes &amp; Specifications:</label>
                <p className="admin-detail-notes-text">
                  {selectedEnquiry.notes || 'No custom notes provided for this transaction.'}
                </p>
              </div>
            </div>

            <div className="admin-modal-footer">
              <button
                type="button"
                className="admin-btn-secondary"
                onClick={() => setSelectedEnquiry(null)}
              >
                Close
              </button>
              <button
                type="button"
                className="admin-btn-primary"
                onClick={() => {
                  setSelectedEnquiry(null);
                  navigate('/admin/enquiries');
                }}
              >
                <span>Open Full RFQ Desk</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* C. Shipment Tracking & Consignment Modal */}
      {selectedShipment && (
        <div className="admin-modal-backdrop" onClick={() => setSelectedShipment(null)}>
          <div className="admin-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3 className="admin-modal-title">
                <Ship size={18} color="#2563EB" />
                <span>Shipment #{selectedShipment.trackingNo}</span>
              </h3>
              <button
                className="admin-modal-close"
                onClick={() => setSelectedShipment(null)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="admin-modal-body">
              <div className="admin-detail-meta-box">
                <div className="detail-item">
                  <span className="label">Product Cargo</span>
                  <span className="val">{selectedShipment.product}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Origin</span>
                  <span className="val">{selectedShipment.from}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Destination</span>
                  <span className="val">{selectedShipment.to}</span>
                </div>
                <div className="detail-item">
                  <span className="label">ETA</span>
                  <span className="val">{selectedShipment.eta}</span>
                </div>
              </div>

              <div className="admin-tracking-timeline">
                <div className="timeline-node completed">
                  <span className="timeline-dot" />
                  <div className="timeline-text">
                    <strong>Container Stuffed &amp; Verified</strong>
                    <p>Origin port gate-in &amp; phytosanitary inspection</p>
                  </div>
                </div>
                <div className="timeline-node completed">
                  <span className="timeline-dot" />
                  <div className="timeline-text">
                    <strong>Customs Clearance Approved</strong>
                    <p>Bill of Lading issued &amp; loaded on vessel {selectedShipment.vessel || 'MSC ADRIATIC'}</p>
                  </div>
                </div>
                <div className={`timeline-node ${selectedShipment.status === 'Delivered' ? 'completed' : 'active'}`}>
                  <span className="timeline-dot" />
                  <div className="timeline-text">
                    <strong>Maritime Ocean Transit</strong>
                    <p>Real-time satellite GPS tracking enabled</p>
                  </div>
                </div>
                <div className={`timeline-node ${selectedShipment.status === 'Delivered' ? 'completed' : ''}`}>
                  <span className="timeline-dot" />
                  <div className="timeline-text">
                    <strong>Port of Discharge Clearance</strong>
                    <p>Expected arrival: {selectedShipment.eta}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="admin-modal-footer">
              <button
                type="button"
                className="admin-btn-secondary"
                onClick={() => setSelectedShipment(null)}
              >
                Close
              </button>
              <button
                type="button"
                className="admin-btn-primary"
                onClick={() => {
                  setSelectedShipment(null);
                  navigate('/admin/orders');
                }}
              >
                <span>View All Consignments</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* D. Client Ledger Modal */}
      {selectedClient && (
        <div className="admin-modal-backdrop" onClick={() => setSelectedClient(null)}>
          <div className="admin-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3 className="admin-modal-title" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <CountryFlagBadge country={selectedClient.country} code={selectedClient.countryCode} size={30} shape="circle" showCodeBadge={true} />
                <span>{selectedClient.name}</span>
              </h3>
              <button
                className="admin-modal-close"
                onClick={() => setSelectedClient(null)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="admin-modal-body">
              <div className="admin-detail-meta-box">
                <div className="detail-item">
                  <span className="label">Country</span>
                  <span className="val">{selectedClient.country}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Completed Orders</span>
                  <span className="val">{selectedClient.totalOrders}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Total Trade Value</span>
                  <span className="val">{selectedClient.value}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Status</span>
                  <span className="val" style={{ color: '#059669', fontWeight: 800 }}>Tier-1 Verified</span>
                </div>
              </div>

              <div style={{ marginTop: 14 }}>
                <div className="admin-form-group">
                  <label className="admin-form-label">Authorized Contact Person:</label>
                  <p className="admin-detail-notes-text">
                    {selectedClient.contact} • {selectedClient.email}
                  </p>
                </div>
              </div>
            </div>

            <div className="admin-modal-footer">
              <button
                type="button"
                className="admin-btn-secondary"
                onClick={() => setSelectedClient(null)}
              >
                Close
              </button>
              <button
                type="button"
                className="admin-btn-primary"
                onClick={() => {
                  setSelectedClient(null);
                  showToast(`Opening trade ledger for ${selectedClient.name}`);
                }}
              >
                <span>Trade Statement</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* E. Fullscreen Global Map Modal */}
      {fullMapModalOpen && (
        <div className="admin-modal-backdrop" onClick={() => setFullMapModalOpen(false)}>
          <div
            className="admin-modal-content"
            style={{ maxWidth: 1080, width: '92vw' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="admin-modal-header">
              <h3 className="admin-modal-title">
                <Globe size={18} color="#2563EB" />
                <span>Global Maritime &amp; Air Corridors (Full Screen View)</span>
              </h3>
              <button
                className="admin-modal-close"
                onClick={() => setFullMapModalOpen(false)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="admin-modal-body" style={{ padding: 12 }}>
              <AdminWorldMap isFullScreen={true} />
            </div>

            <div className="admin-modal-footer">
              <button
                type="button"
                className="admin-btn-secondary"
                onClick={() => setFullMapModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --------------------------------------------------------------------------
          F. 5 Executive Metric Drill-Down Modals (Interactive KPI Inspection)
          -------------------------------------------------------------------------- */}
      
      {/* 1. Enquiries Dossier Drill-Down Modal */}
      {activeMetricModal === 'enquiries' && (
        <div className="admin-modal-backdrop" onClick={() => setActiveMetricModal(null)}>
          <div
            className="admin-modal-content admin-metric-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="admin-modal-header">
              <div className="admin-metric-modal-header-accent">
                <div className="admin-metric-icon-badge blue">
                  <Mail size={22} />
                </div>
                <div className="admin-metric-modal-titles">
                  <h3 className="admin-metric-modal-title">Global Trade Enquiries Dossier</h3>
                  <p className="admin-metric-modal-sub">
                    {timeRange} Operations • Real-time pipeline of incoming purchase orders &amp; RFQs
                  </p>
                </div>
              </div>
              <button
                className="admin-modal-close"
                onClick={() => setActiveMetricModal(null)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="admin-modal-body">
              {/* Metric KPI Chips */}
              <div className="admin-modal-kpi-row">
                <div className="admin-modal-kpi-chip">
                  <span className="kpi-label">Total Logged</span>
                  <span className="kpi-val">{currentPeriod.enquiries.count + (enquiries.length - 5)}</span>
                  <span className="kpi-sub">{currentPeriod.enquiries.growth} vs prior</span>
                </div>
                <div className="admin-modal-kpi-chip">
                  <span className="kpi-label">New / Actionable</span>
                  <span className="kpi-val">{42 + (enquiries.length - 5)}</span>
                  <span className="kpi-sub">Priority response</span>
                </div>
                <div className="admin-modal-kpi-chip">
                  <span className="kpi-label">In Negotiation</span>
                  <span className="kpi-val">98</span>
                  <span className="kpi-sub">Proforma drafted</span>
                </div>
                <div className="admin-modal-kpi-chip">
                  <span className="kpi-label">Quoted / Final</span>
                  <span className="kpi-val">108</span>
                  <span className="kpi-sub">Awaiting L/C</span>
                </div>
              </div>

              {/* Search & Status Filters */}
              <div className="admin-modal-filter-bar">
                <div className="admin-modal-search-box">
                  <Search size={16} color="#64748B" />
                  <input
                    type="text"
                    placeholder="Search by client company, country, or commodity..."
                    value={metricSearchQuery}
                    onChange={(e) => setMetricSearchQuery(e.target.value)}
                  />
                  {metricSearchQuery && (
                    <button
                      type="button"
                      onClick={() => setMetricSearchQuery('')}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                    >
                      <X size={14} color="#94A3B8" />
                    </button>
                  )}
                </div>

                <div className="admin-modal-tabs">
                  {(['All', 'New', 'In Progress', 'Quoted', 'Closed'] as const).map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      className={`admin-modal-tab-btn ${metricFilterTab === tab ? 'active' : ''}`}
                      onClick={() => setMetricFilterTab(tab)}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Data Table */}
              <div className="admin-modal-table-wrap">
                <table className="admin-modal-table">
                  <thead>
                    <tr>
                      <th>Buyer Company</th>
                      <th>Origin / Dest</th>
                      <th>Commodity &amp; Volume</th>
                      <th>Contract Value</th>
                      <th>Status</th>
                      <th style={{ textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {enquiries
                      .filter((enq) => {
                        const q = metricSearchQuery.toLowerCase();
                        const matchQ =
                          enq.clientName.toLowerCase().includes(q) ||
                          enq.country.toLowerCase().includes(q) ||
                          enq.commodity.toLowerCase().includes(q);
                        const matchTab = metricFilterTab === 'All' || enq.status === metricFilterTab;
                        return matchQ && matchTab;
                      })
                      .map((enq) => (
                        <tr key={enq.id}>
                          <td>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                              <CountryFlagBadge country={enq.country} size={26} shape="circle" />
                              <div>
                                <strong>{enq.clientName}</strong>
                                <div style={{ fontSize: '0.7rem', color: '#64748B' }}>{enq.timeAgo}</div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span>{enq.country}</span>
                            <div style={{ fontSize: '0.7rem', color: '#64748B' }}>{enq.tradeType}</div>
                          </td>
                          <td>
                            <strong>{enq.commodity}</strong>
                            <div style={{ fontSize: '0.7rem', color: '#64748B' }}>{enq.volume || '100 MT'}</div>
                          </td>
                          <td>
                            <strong style={{ color: '#0F172A' }}>{enq.value || '$120,000'}</strong>
                          </td>
                          <td>
                            <span
                              className={`admin-pill-tag ${
                                enq.status === 'New'
                                  ? 'blue'
                                  : enq.status === 'In Progress'
                                  ? 'amber'
                                  : enq.status === 'Quoted'
                                  ? 'purple'
                                  : 'green'
                              }`}
                            >
                              {enq.status}
                            </span>
                          </td>
                          <td style={{ textAlign: 'right' }}>
                            <button
                              type="button"
                              className="admin-card-mini-action-btn"
                              onClick={() => {
                                setSelectedEnquiry(enq);
                                setActiveMetricModal(null);
                              }}
                            >
                              <span>Inspect</span>
                              <ArrowRight size={12} />
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="admin-modal-footer">
              <button
                type="button"
                className="admin-btn-secondary"
                onClick={() => {
                  const rows = enquiries.map((e) => [
                    e.id,
                    e.clientName,
                    e.country,
                    e.commodity,
                    e.volume || '100 MT',
                    e.value || '$120,000',
                    e.status,
                  ]);
                  downloadCSV('trade_enquiries_dossier.csv', ['ID', 'Client', 'Country', 'Commodity', 'Volume', 'Value', 'Status'], rows);
                  showToast('Exported Enquiries Dossier to CSV!', 'success');
                }}
              >
                <Download size={14} />
                <span>Export Dossier (CSV)</span>
              </button>

              <button
                type="button"
                className="admin-btn-primary"
                onClick={() => {
                  setActiveMetricModal(null);
                  setNewEnquiryModalOpen(true);
                }}
              >
                <Plus size={14} />
                <span>+ Log New Enquiry</span>
              </button>

              <button
                type="button"
                className="admin-btn-secondary"
                onClick={() => setActiveMetricModal(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Active Clients Network Drill-Down Modal */}
      {activeMetricModal === 'clients' && (
        <div className="admin-modal-backdrop" onClick={() => setActiveMetricModal(null)}>
          <div
            className="admin-modal-content admin-metric-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="admin-modal-header">
              <div className="admin-metric-modal-header-accent">
                <div className="admin-metric-icon-badge cyan">
                  <Users size={22} />
                </div>
                <div className="admin-metric-modal-titles">
                  <h3 className="admin-metric-modal-title">Active Global Buyers &amp; Partner Network</h3>
                  <p className="admin-metric-modal-sub">
                    186 authenticated commercial trading enterprises across 45 countries
                  </p>
                </div>
              </div>
              <button
                className="admin-modal-close"
                onClick={() => setActiveMetricModal(null)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="admin-modal-body">
              <div className="admin-modal-kpi-row">
                <div className="admin-modal-kpi-chip">
                  <span className="kpi-label">Active Enterprises</span>
                  <span className="kpi-val">{currentPeriod.clients.value}</span>
                  <span className="kpi-sub">100% KYC verified</span>
                </div>
                <div className="admin-modal-kpi-chip">
                  <span className="kpi-label">Destination Ports</span>
                  <span className="kpi-val">45</span>
                  <span className="kpi-sub">Across 5 continents</span>
                </div>
                <div className="admin-modal-kpi-chip">
                  <span className="kpi-label">Contract Retention</span>
                  <span className="kpi-val">94.2%</span>
                  <span className="kpi-sub">Repeat annual buyers</span>
                </div>
                <div className="admin-modal-kpi-chip">
                  <span className="kpi-label">Credit Rating</span>
                  <span className="kpi-val">AAA Tier</span>
                  <span className="kpi-sub">Zero payment defaults</span>
                </div>
              </div>

              {/* Search & Region Filters */}
              <div className="admin-modal-filter-bar">
                <div className="admin-modal-search-box">
                  <Search size={16} color="#64748B" />
                  <input
                    type="text"
                    placeholder="Search partner company, country code, or authorized representative..."
                    value={metricSearchQuery}
                    onChange={(e) => setMetricSearchQuery(e.target.value)}
                  />
                  {metricSearchQuery && (
                    <button
                      type="button"
                      onClick={() => setMetricSearchQuery('')}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                    >
                      <X size={14} color="#94A3B8" />
                    </button>
                  )}
                </div>

                <div className="admin-modal-tabs">
                  {(['All', 'USA', 'UAE', 'Italy', 'Germany', 'Japan'] as const).map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      className={`admin-modal-tab-btn ${metricFilterTab === tab ? 'active' : ''}`}
                      onClick={() => setMetricFilterTab(tab)}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Clients Table */}
              <div className="admin-modal-table-wrap">
                <table className="admin-modal-table">
                  <thead>
                    <tr>
                      <th>Corporate Entity</th>
                      <th>Jurisdiction</th>
                      <th>Lifetime Orders</th>
                      <th>Cumulative Traded Value</th>
                      <th>Authorized Representative</th>
                      <th style={{ textAlign: 'right' }}>Ledger</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clients
                      .filter((cli) => {
                        const q = metricSearchQuery.toLowerCase();
                        const matchQ =
                          cli.name.toLowerCase().includes(q) ||
                          cli.country.toLowerCase().includes(q) ||
                          (cli.contact && cli.contact.toLowerCase().includes(q));
                        const matchTab = metricFilterTab === 'All' || cli.country === metricFilterTab;
                        return matchQ && matchTab;
                      })
                      .map((cli) => (
                        <tr key={cli.id}>
                          <td>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                              <CountryFlagBadge country={cli.country} code={cli.countryCode} size={26} shape="circle" />
                              <div>
                                <strong>{cli.name}</strong>
                                <div style={{ fontSize: '0.7rem', color: '#059669', fontWeight: 700 }}>
                                  ✓ Tier-1 Verified Partner
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span>{cli.country}</span>
                            <div style={{ fontSize: '0.7rem', color: '#64748B' }}>{cli.countryCode}</div>
                          </td>
                          <td>
                            <strong>{cli.totalOrders} Contracts</strong>
                          </td>
                          <td>
                            <strong style={{ color: '#0F172A' }}>{cli.value}</strong>
                          </td>
                          <td>
                            <div style={{ fontSize: '0.75rem', fontWeight: 600 }}>{cli.contact}</div>
                            <div style={{ fontSize: '0.7rem', color: '#64748B' }}>{cli.email}</div>
                          </td>
                          <td style={{ textAlign: 'right' }}>
                            <button
                              type="button"
                              className="admin-card-mini-action-btn"
                              onClick={() => {
                                setSelectedClient(cli);
                                setActiveMetricModal(null);
                              }}
                            >
                              <span>Statement</span>
                              <ArrowRight size={12} />
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="admin-modal-footer">
              <button
                type="button"
                className="admin-btn-secondary"
                onClick={() => {
                  const rows = clients.map((c) => [
                    c.id,
                    c.name,
                    c.country,
                    c.countryCode,
                    c.totalOrders,
                    c.value,
                    c.contact || '',
                    c.email || '',
                  ]);
                  downloadCSV('client_partner_directory.csv', ['ID', 'Company', 'Country', 'Code', 'Orders', 'TradeValue', 'Contact', 'Email'], rows);
                  showToast('Exported Partner Directory to CSV!', 'success');
                }}
              >
                <Download size={14} />
                <span>Export Directory (CSV)</span>
              </button>

              <button
                type="button"
                className="admin-btn-secondary"
                onClick={() => setActiveMetricModal(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Ongoing Shipments Fleet Telemetry Modal */}
      {activeMetricModal === 'shipments' && (
        <div className="admin-modal-backdrop" onClick={() => setActiveMetricModal(null)}>
          <div
            className="admin-modal-content admin-metric-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="admin-modal-header">
              <div className="admin-metric-modal-header-accent">
                <div className="admin-metric-icon-badge amber">
                  <Package size={22} />
                </div>
                <div className="admin-metric-modal-titles">
                  <h3 className="admin-metric-modal-title">Fleet &amp; Active Consignment Telemetry</h3>
                  <p className="admin-metric-modal-sub">
                    64 active consignments in transit across maritime &amp; air freight corridors
                  </p>
                </div>
              </div>
              <button
                className="admin-modal-close"
                onClick={() => setActiveMetricModal(null)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="admin-modal-body">
              <div className="admin-modal-kpi-row">
                <div className="admin-modal-kpi-chip">
                  <span className="kpi-label">Active Transits</span>
                  <span className="kpi-val">{currentPeriod.shipments.value}</span>
                  <span className="kpi-sub">Across 12 global corridors</span>
                </div>
                <div className="admin-modal-kpi-chip">
                  <span className="kpi-label">Maritime Vessels</span>
                  <span className="kpi-val">48 TEUs</span>
                  <span className="kpi-sub">Ocean container freight</span>
                </div>
                <div className="admin-modal-kpi-chip">
                  <span className="kpi-label">Air Cargo</span>
                  <span className="kpi-val">16 Flights</span>
                  <span className="kpi-sub">Express perishable freight</span>
                </div>
                <div className="admin-modal-kpi-chip">
                  <span className="kpi-label">AIS Telemetry</span>
                  <span className="kpi-val">100% Live</span>
                  <span className="kpi-sub">Zero port detentions</span>
                </div>
              </div>

              <div className="admin-modal-table-wrap">
                <table className="admin-modal-table">
                  <thead>
                    <tr>
                      <th>Tracking / Vessel</th>
                      <th>Trade Route</th>
                      <th>Cargo Manifest</th>
                      <th>Carrier Line</th>
                      <th>ETA</th>
                      <th>Customs &amp; Status</th>
                      <th style={{ textAlign: 'right' }}>Track</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shipments.map((shp) => (
                      <tr key={shp.id}>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <div style={{ width: 28, height: 28, borderRadius: 6, background: '#FEF3C7', color: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <Ship size={14} />
                            </div>
                            <div>
                              <strong>{shp.trackingNo}</strong>
                              <div style={{ fontSize: '0.7rem', color: '#64748B' }}>{shp.vessel || 'MSC ADRIATIC'}</div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span>{shp.from} → {shp.to}</span>
                        </td>
                        <td>
                          <strong>{shp.product}</strong>
                          <div style={{ fontSize: '0.7rem', color: '#64748B' }}>{shp.teus || 2} TEUs • Grade A</div>
                        </td>
                        <td>
                          <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>Maersk / MSC Line</span>
                        </td>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                            <Clock size={12} color="#64748B" />
                            <strong>{shp.eta}</strong>
                          </div>
                        </td>
                        <td>
                          <span
                            className={`admin-pill-tag ${
                              shp.status === 'Delivered'
                                ? 'green'
                                : shp.status === 'In Transit'
                                ? 'blue'
                                : shp.status === 'Customs'
                                ? 'amber'
                                : 'purple'
                            }`}
                          >
                            {shp.status}
                          </span>
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <button
                            type="button"
                            className="admin-card-mini-action-btn"
                            onClick={() => {
                              setSelectedShipment(shp);
                              setActiveMetricModal(null);
                            }}
                          >
                            <span>Inspect</span>
                            <ArrowRight size={12} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="admin-modal-footer">
              <button
                type="button"
                className="admin-btn-primary"
                onClick={() => {
                  setActiveMetricModal(null);
                  setFullMapModalOpen(true);
                }}
              >
                <Globe size={14} />
                <span>View on Live World Map</span>
              </button>

              <button
                type="button"
                className="admin-btn-secondary"
                onClick={() => {
                  const rows = shipments.map((s) => [
                    s.trackingNo,
                    s.product,
                    s.from,
                    s.to,
                    s.status,
                    s.eta,
                    s.vessel || 'MSC ADRIATIC',
                  ]);
                  downloadCSV('active_shipments_telemetry.csv', ['TrackingNo', 'Cargo', 'Origin', 'Destination', 'Status', 'ETA', 'Vessel'], rows);
                  showToast('Exported Fleet Telemetry to CSV!', 'success');
                }}
              >
                <Download size={14} />
                <span>Export Manifests (CSV)</span>
              </button>

              <button
                type="button"
                className="admin-btn-secondary"
                onClick={() => setActiveMetricModal(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. Completed Orders Audit Modal */}
      {activeMetricModal === 'orders' && (
        <div className="admin-modal-backdrop" onClick={() => setActiveMetricModal(null)}>
          <div
            className="admin-modal-content admin-metric-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="admin-modal-header">
              <div className="admin-metric-modal-header-accent">
                <div className="admin-metric-icon-badge purple">
                  <CheckCircle2 size={22} />
                </div>
                <div className="admin-metric-modal-titles">
                  <h3 className="admin-metric-modal-title">Completed Trade Orders &amp; Compliance Ledger</h3>
                  <p className="admin-metric-modal-sub">
                    512 fulfilled export &amp; import contracts successfully discharged and settled
                  </p>
                </div>
              </div>
              <button
                className="admin-modal-close"
                onClick={() => setActiveMetricModal(null)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="admin-modal-body">
              <div className="admin-modal-kpi-row">
                <div className="admin-modal-kpi-chip">
                  <span className="kpi-label">Fulfilled Orders</span>
                  <span className="kpi-val">{currentPeriod.orders.value}</span>
                  <span className="kpi-sub">100% settled contracts</span>
                </div>
                <div className="admin-modal-kpi-chip">
                  <span className="kpi-label">On-Time SLA</span>
                  <span className="kpi-val">99.4%</span>
                  <span className="kpi-sub">Industry benchmark</span>
                </div>
                <div className="admin-modal-kpi-chip">
                  <span className="kpi-label">Customs Pass</span>
                  <span className="kpi-val">100%</span>
                  <span className="kpi-sub">Clean phytosanitary</span>
                </div>
                <div className="admin-modal-kpi-chip">
                  <span className="kpi-label">Cumulative Volume</span>
                  <span className="kpi-val">$18.4M</span>
                  <span className="kpi-sub">Lifetime executed trade</span>
                </div>
              </div>

              <div className="admin-modal-table-wrap">
                <table className="admin-modal-table">
                  <thead>
                    <tr>
                      <th>Order ID &amp; Date</th>
                      <th>Buyer &amp; Port</th>
                      <th>Product Manifest</th>
                      <th>Contract Value</th>
                      <th>Bill of Lading</th>
                      <th>Audit Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { id: 'ORD-8842', date: '22 Sep 2026', buyer: 'Global Foods LLC (USA)', port: 'Port of New York', product: 'Basmati Rice (100 MT)', value: '$145,000', bl: 'MSCU-982144', status: 'Settled L/C' },
                      { id: 'ORD-8819', date: '19 Sep 2026', buyer: 'Al Noor Trading (UAE)', port: 'Jebel Ali Port', product: 'Cardamom & Spices (20 MT)', value: '$92,000', bl: 'HLCU-11904', status: 'Settled Escrow' },
                      { id: 'ORD-8794', date: '15 Sep 2026', buyer: 'Sunrise Imports (Italy)', port: 'Port of Genoa', product: 'Fresh Mangoes (40 MT)', value: '$110,000', bl: 'AWB-77291', status: 'Settled L/C' },
                      { id: 'ORD-8750', date: '11 Sep 2026', buyer: 'Euro Trade GmbH (Germany)', port: 'Port of Hamburg', product: 'Organic Cotton Fabrics (80 MT)', value: '$185,000', bl: 'CMAU-44019', status: 'Settled L/C' },
                      { id: 'ORD-8712', date: '04 Sep 2026', buyer: 'Asian Fresh Co. (Japan)', port: 'Port of Yokohama', product: 'Dehydrated Vegetables (60 MT)', value: '$76,000', bl: 'ONEY-33821', status: 'Settled Advance TT' },
                    ].map((ord) => (
                      <tr key={ord.id}>
                        <td>
                          <strong>{ord.id}</strong>
                          <div style={{ fontSize: '0.7rem', color: '#64748B' }}>{ord.date}</div>
                        </td>
                        <td>
                          <strong>{ord.buyer}</strong>
                          <div style={{ fontSize: '0.7rem', color: '#64748B' }}>{ord.port}</div>
                        </td>
                        <td>
                          <span>{ord.product}</span>
                        </td>
                        <td>
                          <strong style={{ color: '#0F172A' }}>{ord.value}</strong>
                        </td>
                        <td>
                          <span style={{ fontFamily: 'monospace', fontSize: '0.75rem', background: '#F1F5F9', padding: '2px 6px', borderRadius: 4 }}>
                            {ord.bl}
                          </span>
                        </td>
                        <td>
                          <span className="admin-pill-tag green">
                            ✓ {ord.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="admin-modal-footer">
              <button
                type="button"
                className="admin-btn-secondary"
                onClick={() => {
                  const rows = [
                    ['ORD-8842', '22 Sep 2026', 'Global Foods LLC (USA)', 'Port of New York', 'Basmati Rice (100 MT)', '$145,000', 'MSCU-982144', 'Settled L/C'],
                    ['ORD-8819', '19 Sep 2026', 'Al Noor Trading (UAE)', 'Jebel Ali Port', 'Cardamom & Spices (20 MT)', '$92,000', 'HLCU-11904', 'Settled Escrow'],
                    ['ORD-8794', '15 Sep 2026', 'Sunrise Imports (Italy)', 'Port of Genoa', 'Fresh Mangoes (40 MT)', '$110,000', 'AWB-77291', 'Settled L/C'],
                    ['ORD-8750', '11 Sep 2026', 'Euro Trade GmbH (Germany)', 'Port of Hamburg', 'Organic Cotton Fabrics (80 MT)', '$185,000', 'CMAU-44019', 'Settled L/C'],
                    ['ORD-8712', '04 Sep 2026', 'Asian Fresh Co. (Japan)', 'Port of Yokohama', 'Dehydrated Vegetables (60 MT)', '$76,000', 'ONEY-33821', 'Settled Advance TT'],
                  ];
                  downloadCSV('completed_orders_audit_ledger.csv', ['OrderID', 'Date', 'Buyer', 'Port', 'Product', 'Value', 'BillOfLading', 'AuditStatus'], rows);
                  showToast('Exported Orders Audit Ledger to CSV!', 'success');
                }}
              >
                <Download size={14} />
                <span>Export Audit Ledger (CSV)</span>
              </button>

              <button
                type="button"
                className="admin-btn-secondary"
                onClick={() => setActiveMetricModal(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. Revenue Financial Matrix Modal */}
      {activeMetricModal === 'revenue' && (
        <div className="admin-modal-backdrop" onClick={() => setActiveMetricModal(null)}>
          <div
            className="admin-modal-content admin-metric-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="admin-modal-header">
              <div className="admin-metric-modal-header-accent">
                <div className="admin-metric-icon-badge gold">
                  <TrendingUp size={22} />
                </div>
                <div className="admin-metric-modal-titles">
                  <h3 className="admin-metric-modal-title">Financial Health &amp; Revenue Matrix</h3>
                  <p className="admin-metric-modal-sub">
                    {timeRange} performance • Traded value, margin profitability, and currency exposure
                  </p>
                </div>
              </div>
              <button
                className="admin-modal-close"
                onClick={() => setActiveMetricModal(null)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="admin-modal-body">
              <div className="admin-modal-kpi-row">
                <div className="admin-modal-kpi-chip">
                  <span className="kpi-label">Gross Revenue</span>
                  <span className="kpi-val">{currentPeriod.revenue.value}</span>
                  <span className="kpi-sub">{currentPeriod.revenue.growth} YoY expansion</span>
                </div>
                <div className="admin-modal-kpi-chip">
                  <span className="kpi-label">Export Share</span>
                  <span className="kpi-val">$1.64M (66%)</span>
                  <span className="kpi-sub">Outbound trade</span>
                </div>
                <div className="admin-modal-kpi-chip">
                  <span className="kpi-label">Import Share</span>
                  <span className="kpi-val">$840K (34%)</span>
                  <span className="kpi-sub">Inbound procurement</span>
                </div>
                <div className="admin-modal-kpi-chip">
                  <span className="kpi-label">Net Gross Margin</span>
                  <span className="kpi-val">18.6%</span>
                  <span className="kpi-sub">$461,280 profit yield</span>
                </div>
              </div>

              {/* Two Column Breakdown */}
              <div className="admin-financial-grid">
                <div className="admin-financial-card">
                  <h4 className="admin-financial-card-title">
                    <span>Payment &amp; Settlement Instruments</span>
                    <ShieldCheck size={16} color="#059669" />
                  </h4>

                  <div className="admin-progress-row">
                    <div className="admin-progress-info">
                      <span>Irrevocable Letter of Credit (L/C at Sight)</span>
                      <strong>68% ($1.68M)</strong>
                    </div>
                    <div className="admin-progress-bar-bg">
                      <div className="admin-progress-bar-fill" style={{ width: '68%', background: '#2563EB' }} />
                    </div>
                  </div>

                  <div className="admin-progress-row">
                    <div className="admin-progress-info">
                      <span>International Escrow &amp; Bank Wire</span>
                      <strong>22% ($545K)</strong>
                    </div>
                    <div className="admin-progress-bar-bg">
                      <div className="admin-progress-bar-fill" style={{ width: '22%', background: '#0D9488' }} />
                    </div>
                  </div>

                  <div className="admin-progress-row">
                    <div className="admin-progress-info">
                      <span>Telegraphic Advance (TT 30/70)</span>
                      <strong>10% ($248K)</strong>
                    </div>
                    <div className="admin-progress-bar-bg">
                      <div className="admin-progress-bar-fill" style={{ width: '10%', background: '#D97706' }} />
                    </div>
                  </div>
                </div>

                <div className="admin-financial-card">
                  <h4 className="admin-financial-card-title">
                    <span>Foreign Currency Exposure</span>
                    <DollarSign size={16} color="#CA8A04" />
                  </h4>

                  <div className="admin-progress-row">
                    <div className="admin-progress-info">
                      <span>USD (United States Dollar)</span>
                      <strong>74% ($1.83M)</strong>
                    </div>
                    <div className="admin-progress-bar-bg">
                      <div className="admin-progress-bar-fill" style={{ width: '74%', background: '#CA8A04' }} />
                    </div>
                  </div>

                  <div className="admin-progress-row">
                    <div className="admin-progress-info">
                      <span>EUR (Eurozone)</span>
                      <strong>16% ($396K)</strong>
                    </div>
                    <div className="admin-progress-bar-bg">
                      <div className="admin-progress-bar-fill" style={{ width: '16%', background: '#7C3AED' }} />
                    </div>
                  </div>

                  <div className="admin-progress-row">
                    <div className="admin-progress-info">
                      <span>AED (United Arab Emirates Dirham)</span>
                      <strong>7% ($174K)</strong>
                    </div>
                    <div className="admin-progress-bar-bg">
                      <div className="admin-progress-bar-fill" style={{ width: '7%', background: '#059669' }} />
                    </div>
                  </div>

                  <div className="admin-progress-row">
                    <div className="admin-progress-info">
                      <span>Others (JPY, GBP)</span>
                      <strong>3% ($74K)</strong>
                    </div>
                    <div className="admin-progress-bar-bg">
                      <div className="admin-progress-bar-fill" style={{ width: '3%', background: '#64748B' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="admin-modal-footer">
              <button
                type="button"
                className="admin-btn-secondary"
                onClick={() => {
                  const rows = [
                    ['USD', 'Export & Import Contracts', '74%', '$1,835,200', 'Hedging Active'],
                    ['EUR', 'European Textile & Agro Shipments', '16%', '$396,800', 'Clean SEPA'],
                    ['AED', 'Gulf Trade Corridors', '7%', '$173,600', 'Jebel Ali Clearing'],
                    ['JPY/GBP', 'Specialty Food & Technology', '3%', '$74,400', 'Direct Settlement'],
                  ];
                  downloadCSV('trade_revenue_and_currency_matrix.csv', ['Currency', 'Description', 'PortfolioShare', 'TradedValue', 'HedgingStatus'], rows);
                  showToast('Exported Financial Matrix to CSV!', 'success');
                }}
              >
                <Download size={14} />
                <span>Export Financial Matrix (CSV)</span>
              </button>

              <button
                type="button"
                className="admin-btn-primary"
                onClick={() => {
                  showToast('Generating official 2026 Financial Audit Statement (PDF)...', 'info');
                }}
              >
                <FileText size={14} />
                <span>Download Statement (PDF)</span>
              </button>

              <button
                type="button"
                className="admin-btn-secondary"
                onClick={() => setActiveMetricModal(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
