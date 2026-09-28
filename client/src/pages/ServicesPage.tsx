import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import {
  Ship,
  Globe,
  PackageSearch,
  Users,
  FileCheck,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Building2,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Plane,
  Truck,
  PackageCheck,
  Laptop,
  Quote,
  Scale,
  Anchor,
  Clock,
  Award,
  Sparkles,
  Check,
  Search,
  X,
  Layers,
} from 'lucide-react';

interface OutletContextType {
  openQuoteModal: (productOrServiceName?: string) => void;
}

interface ServiceDetail {
  id: string;
  aliasIds?: string[];
  name: string;
  tagline: string;
  category: string;
  shortDesc: string;
  description: string;
  pills: string[];
  image: string;
  icon: React.ReactNode;
  navIcon: React.ReactNode;
  benefits: string[];
  themeClass?: string;
  subtitle?: string;
}

const SERVICES_CATALOG: ServiceDetail[] = [
  {
    id: 'import-solutions',
    name: 'Import Solutions',
    tagline: 'Inbound Customs, Port Drayage & Domestic Distribution',
    category: 'Port & Inbound Logistics',
    shortDesc: 'Quality products from global markets with seamless import processes.',
    description:
      'End-to-end commercial import management, inbound customs clearance, port drayage, and structured domestic distribution networks.',
    pills: ['Customs Clearance', 'Port Drayage', 'Domestic Delivery', 'Bonded Storage'],
    image: '/assets/services/import-solutions.jpg',
    themeClass: 'theme-cyan',
    subtitle: 'Inbound & Port Drayage',
    icon: <Ship size={18} aria-hidden="true" />,
    navIcon: <Ship size={17} strokeWidth={2.2} aria-hidden="true" />,
    benefits: [
      'Pre-arrival manifest filing & duty calculation',
      'Port terminal container de-stuffing & transloading',
      'Bonded inland warehouse storage and last-mile delivery',
    ],
  },
  {
    id: 'export-management',
    aliasIds: ['export-solutions'],
    name: 'Export Management',
    tagline: 'Global Dispatch, Vessel Chartering & Foreign Port Entry',
    category: 'Multimodal Ocean & Air Outbound',
    shortDesc: 'Expand your business with our export expertise and global reach.',
    description:
      'Structured cross-border export execution, international trade compliance, container freight chartering, and foreign port delivery.',
    pills: ['Global Dispatch', 'Air & Ocean Freight', 'Port Delivery', 'Compliance'],
    image: '/assets/services/export-solutions.jpg',
    themeClass: 'theme-indigo',
    subtitle: 'Ocean & Air Outbound',
    icon: <Plane size={18} aria-hidden="true" />,
    navIcon: <Plane size={17} strokeWidth={2.2} aria-hidden="true" />,
    benefits: [
      'Contracted ocean freight rates with tier-1 shipping lines',
      'FCL, LCL and bulk vessel space guarantees during peak season',
      'Export documentation verification & foreign customs compliance',
    ],
  },
  {
    id: 'global-sourcing',
    aliasIds: ['product-sourcing'],
    name: 'Global Sourcing',
    tagline: 'Direct Primary Origin Procurement & Farm Collectives',
    category: 'Primary Origin Sourcing',
    shortDesc: 'Reliable suppliers, better value and long-term partnerships.',
    description:
      'Direct origin procurement from verified agricultural collectives, primary processing mills, and certified production facilities.',
    pills: ['Direct Origin', 'Factory Vetting', 'Quality Grading', 'FOB / CIF Terms'],
    image: '/assets/services/product-sourcing.jpg',
    themeClass: 'theme-emerald',
    subtitle: 'Direct Farm & Origin',
    icon: <Globe size={18} aria-hidden="true" />,
    navIcon: <Globe size={17} strokeWidth={2.2} aria-hidden="true" />,
    benefits: [
      'Direct engagement with certified farming collectives & mills',
      'Elimination of multi-tiered middlemen for competitive FOB/CIF rates',
      'Pre-contract batch testing and harvest quality verification',
    ],
  },
  {
    id: 'logistics-coordination',
    aliasIds: ['supplier-coordination'],
    name: 'Logistics Coordination',
    tagline: 'Multi-Modal Transport, Fleet Management & Milestone Tracking',
    category: 'End-to-End Fleet Logistics',
    shortDesc: 'Smooth movement, end to end for your global shipments.',
    description:
      'Comprehensive transport coordination, fleet drayage, production milestone tracking, and multimodal cargo consolidation.',
    pills: ['Fleet Management', 'Container Drayage', 'Route Optimization', 'Milestone Tracking'],
    image: '/assets/services/supplier-coordination.jpg',
    themeClass: 'theme-amber',
    subtitle: 'Fleet & Multi-Modal',
    icon: <Truck size={18} aria-hidden="true" />,
    navIcon: <Truck size={17} strokeWidth={2.2} aria-hidden="true" />,
    benefits: [
      'On-time drayage scheduling between production plants and container terminals',
      'Continuous milestone reporting from factory dispatch to port loading',
      'Export palletization, moisture-barrier wrapping & heavy-lift cargo handling',
    ],
  },
  {
    id: 'customs-support',
    aliasIds: ['documentation-support'],
    name: 'Customs Support',
    tagline: 'Regulatory Trade Filings & Phytosanitary Accreditations',
    category: 'Trade Filings & Customs Compliance',
    shortDesc: 'Compliance made simple and hassle-free.',
    description:
      'Full handling of Bills of Lading, Certificates of Origin, phytosanitary certificates, commercial invoices, and customs filings.',
    pills: ['Customs Filings', 'Cert of Origin', 'Phyto Compliance', 'LC Concordance'],
    image: '/assets/services/documentation-support.jpg',
    themeClass: 'theme-rose',
    subtitle: 'Compliance & Clearances',
    icon: <ShieldCheck size={18} aria-hidden="true" />,
    navIcon: <ShieldCheck size={17} strokeWidth={2.2} aria-hidden="true" />,
    benefits: [
      'Electronic Bill of Lading (eBL) and Letter of Credit concordance',
      'Chamber of Commerce non-preferential and preferential COO filings',
      'Phytosanitary inspection, fumigation certification and SGS assay reports',
    ],
  },
  {
    id: 'trade-consulting',
    aliasIds: ['buyer-coordination'],
    name: 'Trade Consulting',
    tagline: 'Commercial Strategy, Market Expansion & INCOTERMS Advisory',
    category: 'Commercial Strategy & Advisory',
    shortDesc: 'Expert guidance, lasting partnerships.',
    description:
      'International trade consulting, cross-border contract structuring, tariff optimization, and dedicated commercial buyer relations.',
    pills: ['Trade Strategy', 'INCOTERMS 2020', 'Market Expansion', 'Buyer Matching'],
    image: '/assets/services/buyer-coordination.jpg',
    themeClass: 'theme-purple',
    subtitle: 'Strategy & INCOTERMS',
    icon: <Users size={18} aria-hidden="true" />,
    navIcon: <Users size={17} strokeWidth={2.2} aria-hidden="true" />,
    benefits: [
      'Contractual alignment with INCOTERMS 2020 (FOB, CIF, CFR, DDP)',
      'Pre-shipment commercial dispute resolution & compliance advisory',
      'Dedicated trade advisors guiding cross-border expansion in 150+ countries',
    ],
  },
  {
    id: 'value-added-services',
    name: 'Value Added Services',
    tagline: 'Export Packaging, Labeling, Sorting & Third-Party Inspection',
    category: 'Cargo Value Enhancement',
    shortDesc: 'Packaging, labeling, inspection and more.',
    description:
      'Specialized value-addition at origin and bonded hubs, including customized re-bagging, barcode labeling, bulk sorting, and third-party QA assays.',
    pills: ['Custom Packaging', 'Barcode Labeling', 'Batch Sorting', 'Lab Assays'],
    image: '/assets/services/value-added-services.jpg',
    themeClass: 'theme-teal',
    subtitle: 'Packaging & QA Assays',
    icon: <PackageCheck size={18} aria-hidden="true" />,
    navIcon: <PackageCheck size={17} strokeWidth={2.2} aria-hidden="true" />,
    benefits: [
      'Customized retail and export packaging meeting destination country standards',
      'Automated sorting, cleaning, and moisture-proof vacuum sealing',
      'Pre-dispatch inspection with batch-wise photographic & laboratory assays',
    ],
  },
  {
    id: 'digital-trade-solutions',
    name: 'Digital Trade Solutions',
    tagline: 'Real-Time Telemetry, Digital Documents & Smart Supply Chain',
    category: 'Trade Tech & Telemetry',
    shortDesc: 'Technology-driven solutions for smarter trade.',
    description:
      'Cloud-powered digital trade desk providing end-to-end container tracking, digitized documentation, real-time customs status, and supply chain analytics.',
    pills: ['Live Telemetry', 'e-Documentation', 'Supply Chain Analytics', 'Smart Alerts'],
    image: '/assets/services/digital-trade-solutions.jpg',
    themeClass: 'theme-blue',
    subtitle: 'Live Telemetry & Cloud Desk',
    icon: <Laptop size={18} aria-hidden="true" />,
    navIcon: <Laptop size={17} strokeWidth={2.2} aria-hidden="true" />,
    benefits: [
      'Real-time satellite GPS vessel and container telemetry tracking',
      'Instant digital document repository with blockchain-grade audit trails',
      'Automated customs milestone alerts and predictive arrival scheduling',
    ],
  },
];

const TRADE_JOURNEY_STAGES = [
  {
    num: '01',
    step: 'Source',
    title: 'Origin Vetting',
    desc: 'Direct farm and mill procurement matching volume and grade specifications.',
    icon: <PackageSearch size={22} aria-hidden="true" />,
  },
  {
    num: '02',
    step: 'Verify',
    title: 'Quality Assays',
    desc: 'Pre-shipment lab tests, phytosanitary clearance, and independent grading.',
    icon: <ShieldCheck size={22} aria-hidden="true" />,
  },
  {
    num: '03',
    step: 'Document',
    title: 'Trade Filings',
    desc: 'LC concordance, Certificates of Origin, and export customs compliance packs.',
    icon: <FileCheck size={22} aria-hidden="true" />,
  },
  {
    num: '04',
    step: 'Ship',
    title: 'Vessel Charter',
    desc: 'Multimodal container booking, terminal staging, and scheduled sea voyage.',
    icon: <Ship size={22} aria-hidden="true" />,
  },
  {
    num: '05',
    step: 'Clear',
    title: 'Customs Entry',
    desc: 'Inbound port clearance, tariff classifications, and terminal drayage dispatch.',
    icon: <Building2 size={22} aria-hidden="true" />,
  },
  {
    num: '06',
    step: 'Deliver',
    title: 'Final Handover',
    desc: 'Bonded inland warehouse staging and verified handover to the consignee.',
    icon: <CheckCircle2 size={22} aria-hidden="true" />,
  },
];

interface TrustProcessCard {
  num: string;
  tag: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
  points: string[];
  badge: string;
}

const TRUST_PROCESS_CARDS: TrustProcessCard[] = [
  {
    num: '01',
    tag: 'ORIGIN AUDIT',
    icon: <ShieldCheck size={22} aria-hidden="true" />,
    title: 'Direct Origin Integrity',
    desc: 'Eliminating speculative intermediaries through direct mill procurement, verified crop assay tests, and pre-loading grade compliance.',
    points: ['Direct farm-gate & processing mill contracts', 'Pre-shipment batch assay & lot traceability'],
    badge: '100% Direct Mill Audit',
  },
  {
    num: '02',
    tag: 'ICC COMPLIANCE',
    icon: <Scale size={22} aria-hidden="true" />,
    title: 'INCOTERMS 2020 Compliance',
    desc: 'Transparent contractual risk demarcation across FOB, CIF, CFR, and DDP shipments to guarantee commercial clarity for both buyer and seller.',
    points: ['Demarcated risk transfer & freight liability', 'Full compliance with ICC INCOTERMS 2020'],
    badge: 'Standardized Commercial Terms',
  },
  {
    num: '03',
    tag: 'BANKING GRADE',
    icon: <FileCheck size={22} aria-hidden="true" />,
    title: 'Zero-Discrepancy Documentation',
    desc: 'Meticulous concordance across Bills of Lading, phytosanitary certificates, non-preferential COOs, and Letter of Credit conditions.',
    points: ['Clean Bills of Lading & Phytosanitary COA', 'Strict UCP 600 Letter of Credit alignment'],
    badge: '99.8% First-Pass LC Approval',
  },
  {
    num: '04',
    tag: 'TIER-1 ALLOCATIONS',
    icon: <Anchor size={22} aria-hidden="true" />,
    title: 'Multimodal Freight Allocations',
    desc: 'Contracted container allocations with tier-1 ocean freight carriers to safeguard shipment schedules during peak international trade cycles.',
    points: ['Reserved vessel slots with Maersk, MSC & CMA CGM', 'Continuous multimodal sea-rail-air routing'],
    badge: 'Guaranteed Vessel Space',
  },
  {
    num: '05',
    tag: 'ACTIVE MONITORING',
    icon: <Clock size={22} aria-hidden="true" />,
    title: 'Dedicated Trade Desk Accountability',
    desc: 'Direct communication with seasoned trade specialists providing milestone transparency from port departure to final destination clearance.',
    points: ['Single Point of Contact (SPOC) trade director', 'Continuous GPS & milestone status dispatches'],
    badge: '< 2-Hour Response SLA',
  },
  {
    num: '06',
    tag: 'PRESERVATION SPEC',
    icon: <Award size={22} aria-hidden="true" />,
    title: 'Export Grade Cargo Preservation',
    desc: 'Desiccant-treated container liners, certified fumigation, and protective palletization engineered specifically for agricultural commodities.',
    points: ['Industrial desiccants & food-grade poly liners', 'Certified gas fumigation & pallet strapping'],
    badge: 'Zero Moisture Infiltration',
  },
];

interface TimelineStage {
  step: string;
  name: string;
  subtitle: string;
  narrative: string;
  points: string[];
  icon: React.ReactNode;
  image: string;
  stat: string;
  partner: string;
  badge: string;
}

const TIMELINE_STAGES: TimelineStage[] = [
  {
    step: '01',
    name: 'Source',
    subtitle: 'Primary Mill & Agriculture Procurement',
    narrative:
      'We establish direct contracts with certified farm cooperatives and industrial processing facilities to guarantee volume availability, consistent grade benchmarks, and competitive FOB/CIF terms without multi-tiered middlemen.',
    points: [
      'Direct farm & mill site qualification audits',
      'Harvest assay, moisture & foreign matter benchmarking',
      'Initial production batch sample dispatch to consignee',
      'Binding volume allocation and seasonal price locks',
    ],
    icon: <PackageSearch size={16} aria-hidden="true" />,
    image: '/assets/services/product-sourcing.jpg',
    stat: '100% Direct Farm Traceability',
    partner: 'APEDA & Direct Mill Cooperative Network',
    badge: 'Verified Mill Origin',
  },
  {
    step: '02',
    name: 'Verify',
    subtitle: 'Pre-Shipment Quality Assays & Lab Inspections',
    narrative:
      'Independent inspection protocols ensure that cargo strictly matches contractual specifications prior to containerization, minimizing cargo rejection risks at foreign ports.',
    points: [
      'Phytosanitary & SGS/independent third-party lab testing',
      'Packaging integrity checks, moisture barriers & sealing',
      'Container tare weight and gross mass (VGM) verification',
      'Tamper-evident high-security bolt seal application',
    ],
    icon: <ShieldCheck size={16} aria-hidden="true" />,
    image: '/assets/about-inspection.jpg',
    stat: 'Independent PSI Lab Assay',
    partner: 'SGS, Bureau Veritas & Intertek Accredited Labs',
    badge: 'Certified PSI Tested',
  },
  {
    step: '03',
    name: 'Prepare',
    subtitle: 'Regulatory Trade Filings & Banking Concordance',
    narrative:
      'Our trade desk prepares complete documentation packs, aligning commercial invoices, packing lists, and export licenses with international banking Letters of Credit.',
    points: [
      'Chamber of Commerce Certificate of Origin (COO) issuance',
      'Electronic Bill of Lading (eBL) drafting & approval',
      'Commercial invoice and packing list legalization',
      'Full Letter of Credit (LC) banking condition concordance',
    ],
    icon: <FileCheck size={16} aria-hidden="true" />,
    image: '/assets/services/documentation-support.jpg',
    stat: 'UCP 600 LC Concordance',
    partner: 'International Chamber of Commerce & Banking Desk',
    badge: 'Zero-Discrepancy Guarantee',
  },
  {
    step: '04',
    name: 'Ship',
    subtitle: 'Multimodal Freight Chartering & Ocean Transit',
    narrative:
      'Leveraging contracted allocations with premier container shipping lines, we secure vessel space, arrange port drayage, and monitor cargo transit across primary global trade corridors.',
    points: [
      'FCL & LCL container positioning at primary loading terminal',
      'Customs port gate-in and vessel loading supervision',
      'Real-time ocean vessel voyage milestone tracking',
      'Transshipment monitoring at strategic regional hubs',
    ],
    icon: <Ship size={16} aria-hidden="true" />,
    image: '/assets/about-hero-port.jpg',
    stat: 'Tier-1 Ocean Liner Allocation',
    partner: 'Maersk, MSC, CMA CGM & Liner Alliances',
    badge: 'Guaranteed Vessel Slots',
  },
  {
    step: '05',
    name: 'Clear',
    subtitle: 'Inbound Port Clearance & Tariff Structuring',
    narrative:
      'Experienced customs brokers manage import declaration filings, port drayage, and duty settlements, ensuring swift clearance without costly demurrage exposure.',
    points: [
      'Pre-arrival customs manifest filing and tariff code review',
      'Phytosanitary and quarantine port inspection clearance',
      'Customs duty calculations and tax payment facilitation',
      'Port terminal release and container drayage dispatch',
    ],
    icon: <Building2 size={16} aria-hidden="true" />,
    image: '/assets/services/import-solutions.jpg',
    stat: 'Zero Demurrage Clearance',
    partner: 'National Customs Authorities & Drayage Network',
    badge: 'Pre-Arrival Clearance',
  },
  {
    step: '06',
    name: 'Deliver',
    subtitle: 'Bonded Staging & Final Consignee Handover',
    narrative:
      'Cargo is transferred to bonded inland storage or transported directly to designated buyer receiving facilities with verified delivery documentation.',
    points: [
      'Bonded warehouse storage, de-stuffing & pallet transloading',
      'Temperature-monitored inland multimodal haulage',
      'Proof of delivery (POD) inspection and weight sign-off',
      'Commercial post-shipment file closure and audit records',
    ],
    icon: <CheckCircle2 size={16} aria-hidden="true" />,
    image: '/assets/services/export-solutions.jpg',
    stat: 'Verified Consignee POD',
    partner: 'Bonded Inland Warehousing & Multimodal Logistics',
    badge: 'Custody Sign-Off Complete',
  },
];

const DISCIPLINE_PILLS = [
  { id: 'all', label: 'All Services' },
  { id: 'inbound', label: 'Port & Inbound' },
  { id: 'outbound', label: 'Multimodal Freight' },
  { id: 'sourcing', label: 'Origin Sourcing' },
  { id: 'logistics', label: 'Fleet Logistics' },
  { id: 'customs', label: 'Customs & Advisory' },
  { id: 'tech', label: 'Trade Tech' },
];

export const ServicesPage: React.FC = () => {
  const navigate = useNavigate();
  const { openQuoteModal } = useOutletContext<OutletContextType>();
  const [bannerVisible, setBannerVisible] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeDiscipline, setActiveDiscipline] = useState<string>('');
  const [activeTimelineStep, setActiveTimelineStep] = useState<number>(0);
  const [selectedServiceId] = useState<string>(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const hashId = window.location.hash.replace('#', '');
      const matched = SERVICES_CATALOG.find(
        (s) => s.id === hashId || s.aliasIds?.includes(hashId)
      );
      if (matched) return matched.id;
    }
    return '';
  });

  const activeService = useMemo(() => {
    return SERVICES_CATALOG.find((s) => s.id === selectedServiceId) || null;
  }, [selectedServiceId]);

  const displayedServices = useMemo(() => {
    return SERVICES_CATALOG.filter((service) => {
      // 1. Discipline filter
      if (activeDiscipline && activeDiscipline !== 'all') {
        if (activeDiscipline === 'inbound' && service.id !== 'import-solutions') return false;
        if (activeDiscipline === 'outbound' && service.id !== 'export-management') return false;
        if (activeDiscipline === 'sourcing' && service.id !== 'global-sourcing') return false;
        if (activeDiscipline === 'logistics' && service.id !== 'logistics-coordination') return false;
        if (activeDiscipline === 'customs' && service.id !== 'customs-support' && service.id !== 'trade-consulting') return false;
        if (activeDiscipline === 'tech' && service.id !== 'digital-trade-solutions' && service.id !== 'value-added-services') return false;
      }

      // 2. Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const match =
          service.name.toLowerCase().includes(q) ||
          service.shortDesc.toLowerCase().includes(q) ||
          service.description.toLowerCase().includes(q) ||
          service.category.toLowerCase().includes(q) ||
          service.tagline.toLowerCase().includes(q) ||
          service.pills.some((p) => p.toLowerCase().includes(q));
        if (!match) return false;
      }

      return true;
    });
  }, [activeDiscipline, searchQuery]);

  useEffect(() => {
    document.title = 'Our Import & Export Services — ConceptExim Global Trade';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Explore ConceptExim’s comprehensive B2B import & export services: Import Solutions, Export Logistics, Product Sourcing, Supplier Coordination, Buyer Relations, and Documentation Support.'
      );
    }

    if (window.location.hash) {
      const el = document.querySelector(window.location.hash);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 150);
        return;
      }
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={`services-page-wrapper ${bannerVisible ? 'banner-expanded' : 'banner-collapsed'}`}>
      {/* 1. Global Maritime Trade Hero Banner */}
      <section
        className={`services-hero-banner ${bannerVisible ? 'is-visible' : 'is-hidden'}`}
        style={{ backgroundImage: "url('/conceptexim-hero-bg.png')" }}
        aria-label="Services Catalog Banner"
      >
        <div className="services-hero-overlay" />
        <div className="services-hero-container">
          <div className="services-hero-content">
            <div className="services-hero-eyebrow">
              <Sparkles size={13} aria-hidden="true" />
              <span>COMMERCIAL TRADE SERVICES</span>
            </div>

            <h1 className="services-hero-title">
              Our <span className="services-hero-gold">Services</span>
            </h1>

            <p className="services-hero-desc">
              Comprehensive global trade services, vessel chartering, direct primary origin sourcing, and customs clearance structured for international reliability.
            </p>

            <div className="services-hero-actions-row">
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('services-catalog');
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="services-hero-explore-btn"
                title="Explore commercial trade services"
              >
                <span>Enter Services Catalog</span>
                <ChevronDown size={15} />
              </button>

              <div className="services-hero-badges">
                <span className="services-hero-badge-item">
                  <Globe size={14} aria-hidden="true" />
                  <span>Global Reach</span>
                </span>
                <span className="services-hero-badge-item">
                  <ShieldCheck size={14} aria-hidden="true" />
                  <span>Contracted Carriers</span>
                </span>
                <span className="services-hero-badge-item">
                  <CheckCircle2 size={14} aria-hidden="true" />
                  <span>Quality Assured</span>
                </span>
              </div>
            </div>
          </div>

          {/* Quick Dismiss Button */}
          <button
            type="button"
            onClick={() => setBannerVisible(false)}
            className="services-hero-dismiss-btn"
            title="Collapse banner for full-screen catalog view"
            aria-label="Dismiss banner"
          >
            <X size={16} />
          </button>
        </div>
      </section>

      {/* 2. Breadcrumbs & Status Bar */}
      <div className="services-subnav-bar">
        <div className="services-subnav-inner">
          <nav className="services-breadcrumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span className="services-breadcrumbs-sep">/</span>
            <Link to="/services">Services</Link>
            <span className="services-breadcrumbs-sep">/</span>
            <span className="services-breadcrumbs-current">
              {activeService ? activeService.name : 'All Core Trade Services'}
            </span>
          </nav>

          <div className="services-subnav-right">
            <div className="services-count-tag">
              Showing {displayedServices.length} of {SERVICES_CATALOG.length} services
            </div>

            <button
              type="button"
              onClick={() => setBannerVisible((prev) => !prev)}
              className="services-banner-toggle-pill"
              title={bannerVisible ? 'Collapse banner for full-screen view' : 'Show commercial overview banner'}
              aria-label={bannerVisible ? 'Collapse banner' : 'Expand banner'}
            >
              {bannerVisible ? (
                <>
                  <ChevronUp size={13} />
                  <span>Full Page</span>
                </>
              ) : (
                <>
                  <ChevronDown size={13} />
                  <span>Show Banner</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 3. Core Services Command Hub Section (3-Column Layout as in Image 2) */}
      <section id="services-catalog" className="services-hub-section" aria-label="Our Core Services">
        <div className="services-container">
          <div className="services-hub-layout">
            {/* LEFT COLUMN: Services Menu + Need Custom Solution CTA */}
            <aside className="services-hub-left-col" aria-label="Services Navigation">
              {/* Menu Card */}
              <div className="services-hub-menu-card">
                <div className="services-hub-menu-header">
                  <div className="services-hub-menu-title-wrap">
                    <span className="services-hub-menu-dot" aria-hidden="true" />
                    <span className="services-hub-menu-title">Our Services</span>
                  </div>
                  <span className="services-hub-menu-badge">8 Core</span>
                </div>
                <nav className="services-hub-nav-list" role="tablist" aria-label="Our Services List">
                  {SERVICES_CATALOG.map((service) => {
                    const isActive = selectedServiceId === service.id;
                    return (
                      <button
                        key={service.id}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        className={`services-hub-nav-item ${service.themeClass || ''} ${isActive ? 'is-active' : ''}`}
                        onClick={() => navigate(`/services/${service.id}`)}
                      >
                        <span className="services-hub-nav-icon-badge" aria-hidden="true">
                          {service.navIcon}
                        </span>
                        <div className="services-hub-nav-text">
                          <span className="services-hub-nav-label">{service.name}</span>
                          <span className="services-hub-nav-sub">{service.subtitle}</span>
                        </div>
                        <div className="services-hub-nav-arrow-wrap" aria-hidden="true">
                          <ChevronRight size={13} className="services-hub-nav-arrow" />
                        </div>
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Need a Custom Solution Card */}
              <div className="services-hub-custom-cta">
                <div className="services-hub-cta-overlay" aria-hidden="true" />
                <div className="services-hub-cta-content">
                  <h4 className="services-hub-cta-title">Need a Custom Solution?</h4>
                  <p className="services-hub-cta-desc">
                    Get in touch with our experts for personalized trade solutions.
                  </p>
                  <button
                    type="button"
                    onClick={() => openQuoteModal('Custom Trade Solution')}
                    className="services-hub-cta-btn"
                    aria-label="Contact us for custom trade solution"
                  >
                    <span>Contact Us</span>
                    <ArrowRight size={13} aria-hidden="true" />
                  </button>
                </div>
              </div>

              {/* 3. Our Service Impact Card (filling left-side vertical space symmetrically) */}
              <div className="services-hub-sidebar-impact-card">
                <div className="services-sidebar-impact-header">
                  <h3 className="services-sidebar-impact-title">Our Service Impact</h3>
                  <span className="services-sidebar-impact-pill">Verified</span>
                </div>
                <div className="services-sidebar-impact-list">
                  <div className="services-sidebar-impact-item impact-theme-cyan">
                    <div className="services-sidebar-impact-icon-wrap" aria-hidden="true">
                      <Globe size={18} strokeWidth={2.2} />
                    </div>
                    <div className="services-sidebar-impact-text">
                      <span className="services-sidebar-impact-num">150+</span>
                      <span className="services-sidebar-impact-label">Countries Served</span>
                    </div>
                  </div>

                  <div className="services-sidebar-impact-item impact-theme-indigo">
                    <div className="services-sidebar-impact-icon-wrap" aria-hidden="true">
                      <Ship size={18} strokeWidth={2.2} />
                    </div>
                    <div className="services-sidebar-impact-text">
                      <span className="services-sidebar-impact-num">2,500+</span>
                      <span className="services-sidebar-impact-label">Successful Shipments</span>
                    </div>
                  </div>

                  <div className="services-sidebar-impact-item impact-theme-purple">
                    <div className="services-sidebar-impact-icon-wrap" aria-hidden="true">
                      <Users size={18} strokeWidth={2.2} />
                    </div>
                    <div className="services-sidebar-impact-text">
                      <span className="services-sidebar-impact-num">500+</span>
                      <span className="services-sidebar-impact-label">Global Partners</span>
                    </div>
                  </div>

                  <div className="services-sidebar-impact-item impact-theme-emerald">
                    <div className="services-sidebar-impact-icon-wrap" aria-hidden="true">
                      <ShieldCheck size={18} strokeWidth={2.2} />
                    </div>
                    <div className="services-sidebar-impact-text">
                      <span className="services-sidebar-impact-num">98%</span>
                      <span className="services-sidebar-impact-label">On-Time Delivery Rate</span>
                    </div>
                  </div>
                </div>

                {/* Executive Trade Philosophy Quote (from reference, text only, no image) */}
                <div className="services-sidebar-quote-box">
                  <div className="services-sidebar-quote-mark" aria-hidden="true">
                    <Quote size={20} />
                  </div>
                  <blockquote className="services-sidebar-quote-text">
                    Trade is not just about moving goods, it's about building stronger relationships.
                  </blockquote>
                  <cite className="services-sidebar-quote-author">— ConceptExim</cite>
                </div>
              </div>
            </aside>

            {/* CENTER COLUMN: Executive Header Deck + 4x2 Grid of 8 Service Cards */}
            <div className="services-hub-center-col">
              {/* Executive Services Header Deck */}
              <div className="services-main-header">
                {/* Decorative Subtle Watermark */}
                <div className="services-header-watermark" aria-hidden="true">
                  <Globe size={180} />
                </div>

                {/* 1. Header Top Meta Row: Live Status, Sector Pill, Verified Origin, Live Count */}
                <div className="services-header-top-row">
                  <div className="services-header-meta-left">
                    <span className="services-live-tag">
                      <span className="services-live-dot" />
                      <span>Live Trade Services</span>
                    </span>
                    <span className="services-sector-eyebrow-pill">
                      <Layers size={12} />
                      <span>CORE TRADE DISCIPLINES</span>
                    </span>
                    <span className="services-verified-pill">
                      <ShieldCheck size={12} />
                      <span>INCOTERMS 2020 Aligned</span>
                    </span>
                  </div>

                  <div className="services-header-count-badge">
                    <span className="count-dot">●</span>
                    <span>
                      <strong>{displayedServices.length}</strong> Services Ready to Deploy
                    </span>
                  </div>
                </div>

                {/* 2. Main Title & Description */}
                <div className="services-main-title-wrap">
                  <h2 className="services-main-category-title">
                    Comprehensive Trade <span className="services-title-highlight">Services</span>
                  </h2>
                  <p className="services-main-category-desc">
                    We offer a full suite of global trade services designed to simplify your supply chain,
                    reduce costs and unlock new opportunities in international markets.
                  </p>

                  {/* Sub-Pills Quick Segment / Discipline Filters */}
                  <div className="services-sector-pills-bar">
                    <span className="pills-label">
                      <Sparkles size={13} style={{ color: '#D49A36' }} />
                      <span>Key Disciplines:</span>
                    </span>
                    {DISCIPLINE_PILLS.map((pill) => {
                      const isPillActive = activeDiscipline === pill.id;
                      return (
                        <button
                          key={pill.id}
                          type="button"
                          className={`services-sector-pill-btn ${isPillActive ? 'active' : ''}`}
                          onClick={() => {
                            if (isPillActive) {
                              setActiveDiscipline('');
                            } else {
                              setActiveDiscipline(pill.id);
                            }
                          }}
                          title={`Filter by ${pill.label}`}
                        >
                          {isPillActive && <Check size={12} strokeWidth={3} />}
                          <span>{pill.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Controls Toolbar: Showing Stats + Search Box */}
                <div className="services-controls-bar">
                  <div className="services-controls-left">
                    <span className="services-results-stats">
                      Showing <strong>1–{displayedServices.length}</strong> of{' '}
                      <strong>{SERVICES_CATALOG.length}</strong> services
                    </span>
                  </div>

                  <div className="services-controls-right">
                    {/* Search Input Box */}
                    <div className="services-search-box">
                      <Search size={15} className="services-search-icon" aria-hidden="true" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search trade services..."
                        className="services-search-input"
                        aria-label="Search trade services"
                      />
                      {searchQuery && (
                        <button
                          type="button"
                          onClick={() => setSearchQuery('')}
                          className="services-search-clear"
                          aria-label="Clear search input"
                        >
                          <X size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* 4x2 Service Cards Grid */}
              <div className="services-hub-cards-grid">
                {displayedServices.length === 0 ? (
                  <div className="services-empty-state">
                    <PackageSearch size={36} className="services-empty-icon" />
                    <h4 className="services-empty-title">No Trade Services Found</h4>
                    <p className="services-empty-desc">
                      We couldn't find any services matching &ldquo;{searchQuery}&rdquo;. Try broadening your search or resetting filters.
                    </p>
                    <button
                      type="button"
                      className="services-empty-reset-btn"
                      onClick={() => {
                        setSearchQuery('');
                        setActiveDiscipline('');
                      }}
                    >
                      <span>Reset Search &amp; Filters</span>
                    </button>
                  </div>
                ) : (
                  displayedServices.map((service) => {
                    const isSelected = selectedServiceId === service.id;
                    return (
                      <article
                        key={service.id}
                        id={service.id}
                        className={`services-hub-card ${isSelected ? 'is-selected' : ''}`}
                        onClick={() => navigate(`/services/${service.id}`)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            navigate(`/services/${service.id}`);
                          }
                        }}
                        style={{ scrollMarginTop: '120px' }}
                        aria-label={`Open dedicated ${service.name} page`}
                      >
                        {/* Backward-compatible anchors for hash navigation */}
                        {service.aliasIds?.map((alias) => (
                          <span key={alias} id={alias} className="services-hub-anchor" aria-hidden="true" />
                        ))}

                        <div className="services-hub-card-media">
                          <img
                            src={service.image}
                            alt={service.name}
                            className="services-hub-card-img"
                            loading="lazy"
                          />
                          <span className="services-hub-card-category-badge">{service.category}</span>
                        </div>

                        <div className="services-hub-card-body">
                          <div className="services-hub-card-heading">
                            <span className="services-hub-card-icon" aria-hidden="true">
                              {service.icon}
                            </span>
                            <h3 className="services-hub-card-title">{service.name}</h3>
                          </div>

                          <p className="services-hub-card-desc">{service.shortDesc}</p>

                          {service.pills && service.pills.length > 0 && (
                            <div className="services-hub-card-pills-row">
                              {service.pills.slice(0, 2).map((pill, pIdx) => (
                                <span key={pIdx} className="services-hub-card-pill-tag">
                                  {pill}
                                </span>
                              ))}
                            </div>
                          )}

                          <div className="services-hub-card-footer">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/services/${service.id}`);
                              }}
                              className="services-hub-card-link"
                              aria-label={`Open dedicated ${service.name} page`}
                            >
                              <span>Learn More</span>
                              <ArrowRight size={13} aria-hidden="true" />
                            </button>

                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                openQuoteModal(service.name);
                              }}
                              className="services-hub-card-rfq-btn"
                              aria-label={`Request RFQ for ${service.name}`}
                              title={`Request RFQ for ${service.name}`}
                            >
                              <span>Quick RFQ</span>
                            </button>
                          </div>
                        </div>
                      </article>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------
          2. SERVICE JOURNEY / TRADE WORKFLOW
          ------------------------------------------------------------------ */}
      <section className="services-journey-section" aria-label="Service Journey">
        <div className="services-container">
          <div className="services-journey-header">
            <span className="services-section-eyebrow">STRUCTURED TRADE EXECUTION</span>
            <h2 className="services-section-title-light">The 6-Stage Commercial Trade Journey</h2>
            <p className="services-section-desc-light">
              A disciplined milestone framework orchestrating cross-border cargo integrity from farm gate
              to international destination port.
            </p>
          </div>

          <div className="services-journey-track">
            <div className="services-journey-line" aria-hidden="true" />
            {TRADE_JOURNEY_STAGES.map((item) => (
              <div key={item.num} className="services-journey-node">
                <div className="services-journey-icon-wrap" aria-hidden="true">
                  {item.icon}
                </div>
                <span className="services-journey-num">{item.num} / {item.step}</span>
                <h3 className="services-journey-step-title">{item.title}</h3>
                <p className="services-journey-step-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------
          4. WHY THE SERVICE PROCESS MATTERS (PROCESS & STANDARDS)
          ------------------------------------------------------------------ */}
      <section className="services-trust-section" aria-label="Why Process Matters">
        <div className="services-container">
          <div className="services-trust-header">
            <div className="services-trust-eyebrow-pill">
              <ShieldCheck size={14} aria-hidden="true" />
              <span>GLOBAL EXECUTION STANDARDS & RISK MITIGATION</span>
            </div>
            <h2 className="services-section-title-light">
              Why Structured Trade Processes{' '}
              <span className="services-gold-gradient-text">Safeguard Your Shipments</span>
            </h2>
            <p className="services-section-desc-light">
              Cross-border commodity trade demands absolute precision across quality benchmarks, regulatory
              documentation, and cargo logistics. Here is how our operational framework mitigates international
              supply risks.
            </p>
          </div>

          <div className="services-trust-grid">
            {TRUST_PROCESS_CARDS.map((card, idx) => (
              <div key={idx} className="services-trust-card">
                <div className="services-trust-card-top">
                  <div className="services-trust-icon-box">{card.icon}</div>
                  <span className="services-trust-card-tag">{card.tag}</span>
                </div>
                <h3 className="services-trust-card-title">{card.title}</h3>
                <p className="services-trust-card-desc">{card.desc}</p>
                
                <ul className="services-trust-card-points">
                  {card.points.map((pt, pIdx) => (
                    <li key={pIdx} className="services-trust-card-point">
                      <Check size={13} className="services-trust-point-check" aria-hidden="true" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>

                <div className="services-trust-card-footer">
                  <span className="services-trust-card-badge">
                    <Sparkles size={11} aria-hidden="true" />
                    <span>{card.badge}</span>
                  </span>
                  <span className="services-trust-card-num">STD {card.num}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Execution Protocol Strip */}
          <div className="services-trust-banner">
            <div className="services-trust-banner-badges">
              <div className="services-trust-banner-badge">
                <CheckCircle2 size={15} aria-hidden="true" />
                <span>100% Direct Mill Audit Protocol</span>
              </div>
              <div className="services-trust-banner-badge">
                <CheckCircle2 size={15} aria-hidden="true" />
                <span>ICC INCOTERMS 2020 Demarcation</span>
              </div>
              <div className="services-trust-banner-badge">
                <CheckCircle2 size={15} aria-hidden="true" />
                <span>UCP 600 Letter of Credit Concordance</span>
              </div>
              <div className="services-trust-banner-badge">
                <CheckCircle2 size={15} aria-hidden="true" />
                <span>Tier-1 Global Carrier Allocations</span>
              </div>
            </div>

            <div className="services-trust-banner-cta">
              <button
                type="button"
                onClick={() => openQuoteModal('Execution Standards Consultation')}
                className="services-trust-banner-btn"
              >
                <span>Consult on Execution Protocol</span>
                <ArrowRight size={15} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------
          5. INTERACTIVE SERVICE TIMELINE (01 to 06 STAGES)
          ------------------------------------------------------------------ */}
      <section className="services-timeline-section" aria-label="Trade Execution Timeline">
        <div className="services-container">
          <div className="services-timeline-header">
            <div className="services-timeline-eyebrow-pill">
              <Clock size={13} aria-hidden="true" />
              <span>STEP-BY-STEP TRADE EXECUTION WORKFLOW</span>
            </div>
            <h2 className="services-section-title-light">
              Interactive Trade Execution{' '}
              <span className="services-gold-gradient-text">Timeline &amp; Milestone Console</span>
            </h2>
            <p className="services-section-desc-light">
              Click through the six key operational milestones to inspect how our trade desk manages each
              phase from initial origin qualification to final destination delivery.
            </p>
          </div>

          {/* Connected Pipeline Track */}
          <div className="services-timeline-pipeline-wrap">
            <div className="services-timeline-pipeline-line" aria-hidden="true">
              <div
                className="services-timeline-pipeline-fill"
                style={{ width: `${(activeTimelineStep / (TIMELINE_STAGES.length - 1)) * 100}%` }}
              />
            </div>

            <div className="services-timeline-tabs" role="tablist" aria-label="Timeline Stages">
              {TIMELINE_STAGES.map((stage, idx) => (
                <button
                  key={stage.step}
                  type="button"
                  role="tab"
                  aria-selected={activeTimelineStep === idx}
                  className={`services-timeline-tab ${activeTimelineStep === idx ? 'is-active' : ''}`}
                  onClick={() => setActiveTimelineStep(idx)}
                >
                  <div className="services-timeline-tab-top">
                    <span className="services-timeline-tab-badge">{stage.step}</span>
                    <span className="services-timeline-tab-icon">{stage.icon}</span>
                  </div>
                  <span className="services-timeline-tab-name">{stage.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Active Stage Deep Dive Showcase Console */}
          <div className="services-timeline-detail-card" role="tabpanel">
            {/* Left Column: Technical Narrative & Checkpoints */}
            <div className="services-timeline-detail-left">
              <div className="services-timeline-detail-header-row">
                <span className="services-timeline-detail-step-badge">
                  STAGE {TIMELINE_STAGES[activeTimelineStep].step} OF 06
                </span>
                <span className="services-timeline-detail-live-pill">
                  <span className="services-timeline-live-dot" aria-hidden="true" />
                  <span>{TIMELINE_STAGES[activeTimelineStep].badge}</span>
                </span>
              </div>

              <h3 className="services-timeline-detail-title">
                {TIMELINE_STAGES[activeTimelineStep].name} —{' '}
                <span className="services-timeline-subtitle-span">{TIMELINE_STAGES[activeTimelineStep].subtitle}</span>
              </h3>

              <p className="services-timeline-detail-desc">
                {TIMELINE_STAGES[activeTimelineStep].narrative}
              </p>

              {/* Milestones & Checkpoints Grid */}
              <div className="services-timeline-checkpoints-panel">
                <div className="services-timeline-checkpoints-title">
                  <Sparkles size={13} aria-hidden="true" />
                  <span>OPERATIONAL MILESTONES &amp; QUALITY CHECKPOINTS</span>
                </div>
                <div className="services-timeline-checkpoints-grid">
                  {TIMELINE_STAGES[activeTimelineStep].points.map((pt, pIdx) => (
                    <div key={pIdx} className="services-timeline-detail-point">
                      <span className="services-timeline-point-check">
                        <Check size={12} aria-hidden="true" />
                      </span>
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Controls & Navigation */}
              <div className="services-timeline-action-row">
                <button
                  type="button"
                  onClick={() =>
                    openQuoteModal(
                      `Stage ${TIMELINE_STAGES[activeTimelineStep].step}: ${TIMELINE_STAGES[activeTimelineStep].name} Inquiry`
                    )
                  }
                  className="services-timeline-inquire-btn"
                >
                  <span>Inquire on Stage {TIMELINE_STAGES[activeTimelineStep].step}</span>
                  <ArrowRight size={15} aria-hidden="true" />
                </button>

                <div className="services-timeline-nav-group">
                  <button
                    type="button"
                    onClick={() => setActiveTimelineStep((prev) => Math.max(0, prev - 1))}
                    disabled={activeTimelineStep === 0}
                    className="services-timeline-nav-btn"
                    aria-label="Previous Stage"
                  >
                    <ChevronRight size={15} style={{ transform: 'rotate(180deg)' }} aria-hidden="true" />
                    <span>Prev</span>
                  </button>

                  <div className="services-timeline-step-dots">
                    {TIMELINE_STAGES.map((_, dotIdx) => (
                      <button
                        key={dotIdx}
                        type="button"
                        className={`services-timeline-dot ${activeTimelineStep === dotIdx ? 'is-active' : ''}`}
                        onClick={() => setActiveTimelineStep(dotIdx)}
                        aria-label={`Go to stage ${dotIdx + 1}`}
                      />
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setActiveTimelineStep((prev) => Math.min(TIMELINE_STAGES.length - 1, prev + 1))
                    }
                    disabled={activeTimelineStep === TIMELINE_STAGES.length - 1}
                    className="services-timeline-nav-btn"
                    aria-label="Next Stage"
                  >
                    <span>Next</span>
                    <ChevronRight size={15} aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Visual Operational Context & Floating Badges */}
            <div className="services-timeline-visual-col">
              <div className="services-timeline-image-frame">
                <img
                  key={TIMELINE_STAGES[activeTimelineStep].step}
                  src={TIMELINE_STAGES[activeTimelineStep].image}
                  alt={TIMELINE_STAGES[activeTimelineStep].name}
                  className="services-timeline-image"
                  loading="lazy"
                />
                <div className="services-timeline-image-overlay" />

                {/* Floating Metric Badge */}
                <div className="services-timeline-floating-badge">
                  <span className="services-timeline-floating-icon">
                    <ShieldCheck size={16} aria-hidden="true" />
                  </span>
                  <div>
                    <div className="services-timeline-floating-val">
                      {TIMELINE_STAGES[activeTimelineStep].stat}
                    </div>
                    <div className="services-timeline-floating-lbl">Execution Benchmark</div>
                  </div>
                </div>

                {/* Bottom Oversight Partner Tag */}
                <div className="services-timeline-partner-strip">
                  <span className="services-timeline-partner-label">OVERSIGHT &amp; AUDIT</span>
                  <span className="services-timeline-partner-name">
                    {TIMELINE_STAGES[activeTimelineStep].partner}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------
          7. FINAL CTA SECTION (EXECUTIVE FLOATING CARD)
          ------------------------------------------------------------------ */}
      <section className="services-cta-section" aria-label="Commercial Call to Action">
        <div className="services-container">
          <div className="services-cta-card">
            <div className="services-cta-card-grid">
              <div className="services-cta-content-col">
                <div className="services-cta-eyebrow">
                  <Sparkles size={14} aria-hidden="true" />
                  <span>DIRECT COMMERCIAL ASSISTANCE</span>
                </div>

                <h2 className="services-cta-title">Ready to Discuss Your Trade Requirement?</h2>

                <p className="services-cta-desc">
                  Whether you are sourcing verified agricultural commodities, arranging containerized
                  export freight, or structuring long-term commercial contracts, our trade desk is ready to assist.
                </p>

                <div className="services-cta-trust-grid" aria-label="Commercial Assurances">
                  <div className="services-cta-trust-item">
                    <span className="services-cta-trust-icon">
                      <Check size={12} aria-hidden="true" />
                    </span>
                    <span>24-Hour Trade Desk Response</span>
                  </div>
                  <div className="services-cta-trust-item">
                    <span className="services-cta-trust-icon">
                      <Check size={12} aria-hidden="true" />
                    </span>
                    <span>Transparent FOB &amp; CIF Quotations</span>
                  </div>
                  <div className="services-cta-trust-item">
                    <span className="services-cta-trust-icon">
                      <Check size={12} aria-hidden="true" />
                    </span>
                    <span>APEDA &amp; ISO Aligned Protocols</span>
                  </div>
                  <div className="services-cta-trust-item">
                    <span className="services-cta-trust-icon">
                      <Check size={12} aria-hidden="true" />
                    </span>
                    <span>Tier-1 Global Ocean Freight Lines</span>
                  </div>
                </div>
              </div>

              {/* Right Column Action Panel */}
              <div className="services-cta-action-panel">
                <div className="services-cta-panel-status">
                  <span className="services-hero-eyebrow-dot" style={{ width: 6, height: 6 }} aria-hidden="true" />
                  <span>Trade Desk Active • GMT+5:30</span>
                </div>

                <button
                  type="button"
                  onClick={() => openQuoteModal('Custom Trade Requirement Consultation')}
                  className="services-cta-panel-btn-primary"
                  id="btn-services-cta-quote"
                >
                  <span>Request a Commercial Quote</span>
                  <ArrowRight size={16} aria-hidden="true" />
                </button>

                <Link
                  to="/contact"
                  className="services-cta-panel-btn-secondary"
                  id="btn-services-cta-contact"
                >
                  <span>Contact Trade Desk</span>
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>

                <p className="services-cta-panel-subtext">
                  Direct Mill &amp; Collective Sourcing • Zero Intermediary Markups
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default ServicesPage;
