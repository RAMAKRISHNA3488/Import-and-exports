import React, { useState, useEffect, useRef } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import {
  Globe,
  Compass,
  Ship,
  Anchor,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Building2,
  FileCheck2,
  Clock,
  Sparkles,
  MapPin,
  Award,
  Layers,
  Check,
  PhoneCall,
} from 'lucide-react';

interface OutletContextType {
  openQuoteModal: (productOrServiceName?: string) => void;
}

// -----------------------------------------------------------------------------
// Approved Global Corridors Data (Origin Mumbai HQ -> Global Destinations)
// -----------------------------------------------------------------------------
interface TradeCorridor {
  id: string;
  code: string;
  name: string;
  originPort: string;
  destPort: string;
  destCity: string;
  destCountry: string;
  region: string;
  transitTime: string;
  transitMode: string;
  commodities: string;
  clearanceProtocol: string;
  status: string;
  pathD: string;
  originCoords: { x: number; y: number };
  destCoords: { x: number; y: number };
}

const TRADE_CORRIDORS: TradeCorridor[] = [
  {
    id: 'corridor-dubai',
    code: 'CE-COR-01',
    name: 'West Coast India ➔ Arabian Gulf Gateway',
    originPort: 'JNPT (Nhava Sheva) / Mundra',
    destPort: 'Port of Jebel Ali (JAFZA)',
    destCity: 'Dubai',
    destCountry: 'United Arab Emirates',
    region: 'Middle East & GCC',
    transitTime: '3–5 Days Express Sea Lane',
    transitMode: 'Direct Feeders & Liner Slots (FCL / LCL)',
    commodities: 'Basmati Rice, Spices, Grains, Polymers & Petrochemicals',
    clearanceProtocol: '24–48h JAFZA Free Zone Pre-Clearance',
    status: 'Active Daily Corridor',
    pathD: 'M 570 245 Q 535 220 505 225',
    originCoords: { x: 570, y: 245 },
    destCoords: { x: 505, y: 225 },
  },
  {
    id: 'corridor-rotterdam',
    code: 'CE-COR-02',
    name: 'Indian Ocean ➔ European Union Hub',
    originPort: 'JNPT (Nhava Sheva) / Chennai',
    destPort: 'Port of Rotterdam (Maasvlakte II)',
    destCity: 'Rotterdam',
    destCountry: 'Netherlands & European Union',
    region: 'Europe & United Kingdom',
    transitTime: '18–22 Days Scheduled Transit',
    transitMode: 'Deep-Sea Tier-1 Container Vessels',
    commodities: 'Certified Organic Spices, Specialty Grains, Agro-Derivatives',
    clearanceProtocol: '100% EU MRL & Phytosanitary Conformance',
    status: 'High Volume Corridor',
    pathD: 'M 570 245 Q 490 180 435 145',
    originCoords: { x: 570, y: 245 },
    destCoords: { x: 435, y: 145 },
  },
  {
    id: 'corridor-singapore',
    code: 'CE-COR-03',
    name: 'Bay of Bengal ➔ Southeast Asia Transshipment Desk',
    originPort: 'Chennai / Visakhapatnam',
    destPort: 'Port of Singapore (PSA Gateway)',
    destCity: 'Singapore',
    destCountry: 'Singapore & ASEAN',
    region: 'Asia-Pacific',
    transitTime: '4–6 Days Maritime Corridor',
    transitMode: 'Intra-Asia Dedicated Liner Allocations',
    commodities: 'Agricultural Feedstocks, Edible Oils, Industrial Minerals',
    clearanceProtocol: 'Deep-Water Transshipment & Free Zone Transfer',
    status: 'High Frequency Corridor',
    pathD: 'M 570 245 Q 625 270 665 295',
    originCoords: { x: 570, y: 245 },
    destCoords: { x: 665, y: 295 },
  },
  {
    id: 'corridor-houston',
    code: 'CE-COR-04',
    name: 'Transatlantic ➔ Americas Intermodal Gateway',
    originPort: 'Mundra Port / JNPT',
    destPort: 'Port of Houston / New York Gateway',
    destCity: 'Houston & New York',
    destCountry: 'United States & Americas',
    region: 'North & South Americas',
    transitTime: '26–30 Days Intermodal Transit',
    transitMode: 'Transatlantic Liner & US Rail Drayage',
    commodities: 'Engineering Goods, Polymers, Refined Agro-Commodities',
    clearanceProtocol: 'US CBP 24-Hour AMS & C-TPAT Compliance',
    status: 'Transatlantic Lane',
    pathD: 'M 570 245 Q 360 120 205 210',
    originCoords: { x: 570, y: 245 },
    destCoords: { x: 205, y: 210 },
  },
  {
    id: 'corridor-durban',
    code: 'CE-COR-05',
    name: 'Indian Ocean ➔ Sub-Saharan Maritime Gateway',
    originPort: 'JNPT (Nhava Sheva)',
    destPort: 'Port of Durban / Mombasa Port',
    destCity: 'Durban',
    destCountry: 'South Africa & Sub-Saharan Region',
    region: 'Africa',
    transitTime: '12–15 Days Direct Sailing',
    transitMode: 'Ocean Breakbulk & Containerized Freight',
    commodities: 'Milled Grains, Pulses, Fertilizers & Processed Goods',
    clearanceProtocol: 'SADC Bonded Road & Rail Transit Clearance',
    status: 'Active Corridor',
    pathD: 'M 570 245 Q 545 320 485 365',
    originCoords: { x: 570, y: 245 },
    destCoords: { x: 485, y: 365 },
  },
];

// -----------------------------------------------------------------------------
// Capabilities Highlights Data
// -----------------------------------------------------------------------------
const CAPABILITY_HIGHLIGHTS = [
  {
    id: 'multimodal',
    title: 'Tier-1 Ocean & Air Freight',
    desc: 'Contracted space allocations across premier container liners (Maersk, MSC, CMA CGM) ensuring container equipment availability and priority berthing during peak cycles.',
    icon: <Ship size={20} aria-hidden="true" />,
    image: '/assets/about-hero-port.jpg',
  },
  {
    id: 'sourcing',
    title: 'Direct Origin Mill Traceability',
    desc: 'On-ground procurement agronomists and mill auditors situated directly across primary producing clusters, delivering GPS origin mapping from farm gate to loading port.',
    icon: <Compass size={20} aria-hidden="true" />,
    image: '/assets/services/product-sourcing.jpg',
  },
  {
    id: 'customs',
    title: 'Dual-Port Customs Conformance',
    desc: 'In-house licensed customs brokerage filing pre-arrival export manifests and destination clearances under ICC Incoterms 2020 and strict UCP 600 Letter of Credit rules.',
    icon: <FileCheck2 size={20} aria-hidden="true" />,
    image: '/assets/services/documentation-support.jpg',
  },
  {
    id: 'transshipment',
    title: 'Bonded Free Zone Depots',
    desc: 'Strategically positioned bonded staging and breakbulk transshipment facilities in JAFZA Dubai and PSA Singapore for high-velocity re-export and cross-border haulage.',
    icon: <Building2 size={20} aria-hidden="true" />,
    image: '/assets/services/export-solutions.jpg',
  },
];

// -----------------------------------------------------------------------------
// Trade Connectivity 6-Stage Flow Pipeline
// -----------------------------------------------------------------------------
const CONNECTIVITY_STAGES = [
  {
    step: '01',
    name: 'SOURCE',
    subtitle: 'Mill Procurement & Origin Qualification',
    desc: 'Direct harvest procurement from audited agricultural cooperatives and manufacturing mills with verified quality certificates and seed/grade traceability.',
    checkpoints: [
      'Direct farm-gate and mill qualification audit',
      'Crop season batch lot segregation',
      'Preliminary moisture & assay field testing',
      'Origin packaging and tamper-evident sealing',
    ],
    badge: '100% Direct Mill Origin',
    metric: 'Vetted Producer Network',
    image: '/assets/services/product-sourcing.jpg',
  },
  {
    step: '02',
    name: 'QUALITY',
    subtitle: 'Independent Laboratory PSI Assay',
    desc: 'Every consignment undergoes pre-shipment inspection (PSI) by globally accredited independent testing agencies (SGS, Bureau Veritas, Intertek) prior to container loading.',
    checkpoints: [
      'Composite sampling under ISO / GAFTA standards',
      'Optical grading and foreign matter elimination',
      'Pesticide residue (MRL) and aflatoxin screen',
      'Official PSI Certificate of Analysis (COA) issued',
    ],
    badge: 'SGS / BV PSI Certified',
    metric: 'Zero Quality Demurrage',
    image: '/assets/about-inspection.jpg',
  },
  {
    step: '03',
    name: 'DOCUMENTATION',
    subtitle: 'Regulatory Compliance & Banking Pack',
    desc: 'Drafting and consular legalization of full commercial documentation sets aligned with ICC Incoterms 2020 and international banking Letter of Credit (UCP 600) terms.',
    checkpoints: [
      'Clean on-board Ocean Bill of Lading (B/L)',
      'Government NPPO Phytosanitary Certificate',
      'Chamber Certificate of Origin & Legalized Invoices',
      'Weight, Packing & Fumigation Clearances',
    ],
    badge: 'UCP 600 LC Concordance',
    metric: 'Zero Discrepancy Clearance',
    image: '/assets/services/documentation-support.jpg',
  },
  {
    step: '04',
    name: 'LOGISTICS',
    subtitle: 'Port Drayage, Stuffing & Vessel Loading',
    desc: 'Container stuffing at bonded Container Freight Stations (CFS) under surveyor supervision, followed by port terminal drayage and priority ocean vessel stowing.',
    checkpoints: [
      'Dry cargo and reefer container inspection',
      'Desiccant packaging and moisture barrier lining',
      'RFID container sealing & VGM weight verification',
      'Tier-1 ocean vessel slot allocation & tracking',
    ],
    badge: 'Tier-1 Ocean Liner Stowage',
    metric: 'Active Vessel Tracking',
    image: '/assets/about-hero-port.jpg',
  },
  {
    step: '05',
    name: 'CUSTOMS',
    subtitle: 'Destination Brokerage & Entry Clearance',
    desc: 'Pre-arrival manifest filing with destination national customs authorities to ensure green-channel fast-track customs release without demurrage or port storage penalties.',
    checkpoints: [
      'Electronic pre-arrival manifest filing',
      'HS Code customs duty and tariff computation',
      'Port sanitary and quarantine inspection release',
      'Bonded customs gate pass and container drayage',
    ],
    badge: 'AEO Licensed Brokerage',
    metric: 'Pre-Arrival Clearance Protocol',
    image: '/assets/services/import-solutions.jpg',
  },
  {
    step: '06',
    name: 'DESTINATION',
    subtitle: 'Consignee Delivery & Commercial Handover',
    desc: 'Final container haulage to designated buyer receiving warehouse, bonded storage facility, or regional distribution depot with formal consignee sign-off.',
    checkpoints: [
      'Scheduled inland container drayage delivery',
      'Unloading inspection and seal integrity sign-off',
      'Proof of Delivery (POD) execution & document closure',
      'Post-shipment commercial account reconciliation',
    ],
    badge: 'Verified Consignee POD',
    metric: 'Complete Order Fulfillment',
    image: '/assets/services/export-solutions.jpg',
  },
];

// -----------------------------------------------------------------------------
// Regional Exploration Panels Data
// -----------------------------------------------------------------------------
const REGIONAL_GATEWAYS = [
  {
    id: 'apac',
    name: 'Asia-Pacific Gateway',
    hubCity: 'Mumbai / Singapore (Central Trade HQ)',
    tag: 'Global Trade HQ & Agricultural Sourcing',
    desc: 'Headquartered at Mumbai with deep-water port access at JNPT (Nhava Sheva) and Mundra, managing Indian Ocean commercial routes, raw agro-sourcing, and Southeast Asian transshipment via Singapore.',
    ports: ['JNPT (Nhava Sheva)', 'Mundra Port', 'Port of Singapore (PSA)', 'Chennai Port'],
    commodities: 'Basmati Rice, Spices, Grains, Animal Feed, Minerals & Agro-Commodities',
    image: '/assets/about-headquarters.jpg',
  },
  {
    id: 'mena',
    name: 'Middle East & GCC Gateway',
    hubCity: 'Dubai / Jebel Ali Port (JAFZA)',
    tag: 'Strategic Transshipment & Distribution',
    desc: 'Operating through Jebel Ali Free Zone (JAFZA) and DMCC, managing Arabian Gulf logistics, breakbulk transshipment, fast re-export corridors, and direct distribution across GCC buyer networks.',
    ports: ['Port of Jebel Ali', 'Khalifa Port (Abu Dhabi)', 'Sharjah Container Terminal'],
    commodities: 'Petrochemicals, Polymers, Foodstuffs, Premium Grains & Dry Bulk Cargo',
    image: '/assets/global-presence-flagship.jpg',
  },
  {
    id: 'europe',
    name: 'European Union Gateway',
    hubCity: 'Rotterdam / London Gateway',
    tag: 'EU Distribution & Regulatory Conformance',
    desc: 'Direct import terminal for European markets, managing EU sanitary and phytosanitary (SPS) compliance, bonded inland trucking, and Rhine-Alpine barge and rail freight network dispatch.',
    ports: ['Port of Rotterdam (Maasvlakte)', 'Port of Antwerp-Bruges', 'London Gateway', 'Hamburg Port'],
    commodities: 'EU Food Safety Conforming Agro-Exports, Spices, Pulses & Industrial Materials',
    image: '/assets/about-hero-port.jpg',
  },
  {
    id: 'americas',
    name: 'The Americas Intermodal Desk',
    hubCity: 'Houston / New York Gateway',
    tag: 'Transatlantic & Bulk Commodity Trade',
    desc: 'Coordinating transatlantic ocean cargo, US customs 24-hour AMS filings, inland rail drayage across North America, and bilateral agricultural and industrial commodity exchange.',
    ports: ['Port of Houston', 'Port of New York & New Jersey', 'Port of Savannah', 'Santos Gateway'],
    commodities: 'Energy Derivatives, Polymers, Agricultural Feedstocks & Specialty Crops',
    image: '/assets/services/import-solutions.jpg',
  },
  {
    id: 'africa',
    name: 'Sub-Saharan African Gateway',
    hubCity: 'Durban / Mombasa Gateway',
    tag: 'Maritime Corridor & Mineral Transit',
    desc: 'Facilitating eastern and southern African cross-border commerce, bonded road and rail transit into landlocked partner states, and mineral and agricultural export trade.',
    ports: ['Port of Durban', 'Mombasa Port', 'Walvis Bay Gateway'],
    commodities: 'Milled Grains, Pulses, Agri-Inputs & Industrial Raw Materials',
    image: '/assets/services/export-solutions.jpg',
  },
];

export const GlobalPresencePage: React.FC = () => {
  const { openQuoteModal } = useOutletContext<OutletContextType>();

  // State: Interactive World Map Corridor
  const [activeCorridorId, setActiveCorridorId] = useState<string>('corridor-rotterdam');
  const activeCorridor = TRADE_CORRIDORS.find((c) => c.id === activeCorridorId) || TRADE_CORRIDORS[0];

  // State: Interactive 6-Stage Connectivity Flow
  const [activeStageIndex, setActiveStageIndex] = useState<number>(0);
  const currentStage = CONNECTIVITY_STAGES[activeStageIndex];

  // State: Count-Up Metrics Viewport Reveal
  const [metricsVisible, setMetricsVisible] = useState<boolean>(false);
  const metricsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = 'Global Presence & Commercial Trade Network — ConceptExim';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Explore ConceptExim’s global trade network spanning 45+ countries across Asia-Pacific, Middle East, Europe, the Americas, and Africa. Verified origin sourcing, multimodal logistics, and bonded port clearance.'
      );
    }
    window.scrollTo(0, 0);

    // Viewport IntersectionObserver for Metrics
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMetricsVisible(true);
        }
      },
      { threshold: 0.25 }
    );

    if (metricsRef.current) {
      observer.observe(metricsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="gp-page-wrapper">
      {/* ====================================================================
          1. CINEMATIC HERO SECTION
          ==================================================================== */}
      <section className="gp-hero-section" aria-label="Global Presence Hero">
        <div className="gp-hero-vignette" aria-hidden="true" />

        <div className="gp-container">
          <div className="gp-hero-content">
            {/* Live Operational Status Eyebrow Badge */}
            <div className="gp-hero-badge">
              <span className="gp-hero-badge-dot" aria-hidden="true" />
              <span className="gp-hero-badge-text">INTERNATIONAL COMMERCIAL TRADE NETWORK</span>
            </div>

            {/* Cinematic Main Heading */}
            <h1 className="gp-hero-title">
              Connecting Markets <span className="gp-gold-gradient-text">Worldwide</span>
            </h1>

            {/* Editorial Supporting Narrative */}
            <p className="gp-hero-desc">
              ConceptExim bridges agricultural producers, processing mills, and industrial manufacturers directly
              with institutional consignees across five continents. From certified origin quality assay to bonded
              port delivery, we engineer seamless global commerce.
            </p>

            {/* Action Buttons */}
            <div className="gp-hero-actions">
              <a
                href="#global-network"
                className="gp-btn-primary"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('global-network')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span>Explore Global Network</span>
                <ArrowRight size={16} aria-hidden="true" />
              </a>

              <button
                type="button"
                className="gp-btn-secondary"
                onClick={() => openQuoteModal('Global Trade Route Consultation')}
              >
                <span>Request a Quote</span>
              </button>
            </div>

            {/* Floating Quick-Telemetry Strip */}
            <div className="gp-hero-telemetry-strip" aria-label="Key Trade Gateway Regions">
              <span className="gp-hero-telemetry-item">
                <span className="gp-telemetry-gold-dot" aria-hidden="true" />
                <span>Asia-Pacific</span>
              </span>
              <span className="gp-telemetry-divider" aria-hidden="true" />
              <span className="gp-hero-telemetry-item">
                <span className="gp-telemetry-gold-dot" aria-hidden="true" />
                <span>Middle East &amp; GCC</span>
              </span>
              <span className="gp-telemetry-divider" aria-hidden="true" />
              <span className="gp-hero-telemetry-item">
                <span className="gp-telemetry-gold-dot" aria-hidden="true" />
                <span>Europe &amp; UK</span>
              </span>
              <span className="gp-telemetry-divider" aria-hidden="true" />
              <span className="gp-hero-telemetry-item">
                <span className="gp-telemetry-gold-dot" aria-hidden="true" />
                <span>The Americas</span>
              </span>
              <span className="gp-telemetry-divider" aria-hidden="true" />
              <span className="gp-hero-telemetry-item">
                <span className="gp-telemetry-gold-dot" aria-hidden="true" />
                <span>Sub-Saharan Africa</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          2. INTERACTIVE GLOBAL TRADE NETWORK (SVG WORLD MAP)
          ==================================================================== */}
      <section id="global-network" className="gp-network-section" aria-label="Interactive Global Trade Network">
        <div className="gp-container">
          <div className="gp-network-header">
            <div className="gp-section-eyebrow">
              <Globe size={14} aria-hidden="true" />
              <span>ACTIVE TRADE CORRIDORS &amp; PORT HUBS</span>
            </div>
            <h2 className="gp-section-title-light">
              Interactive Global <span className="gp-gold-gradient-text">Trade Corridor Network</span>
            </h2>
            <p className="gp-section-desc-light">
              Inspect our operational sea lanes connecting our Central Trade HQ in Mumbai to premier container
              terminals across Europe, the Middle East, Asia-Pacific, the Americas, and Africa.
            </p>

            {/* Visual Flow Indicator */}
            <div className="gp-network-flow-indicator" aria-hidden="true">
              <span className="gp-flow-node-badge">ORIGIN: MUMBAI (JNPT)</span>
              <ArrowRight size={14} className="gp-flow-arrow" />
              <span className="gp-flow-node-badge">MARITIME CORRIDOR</span>
              <ArrowRight size={14} className="gp-flow-arrow" />
              <span className="gp-flow-node-badge">DESTINATION PORT TERMINAL</span>
            </div>
          </div>

          <div className="gp-network-layout">
            {/* LEFT: SVG Interactive World Trade Map Canvas */}
            <div className="gp-map-box">
              <div className="gp-map-header-row">
                <span className="gp-map-mode-tag">
                  <span className="gp-map-live-dot" aria-hidden="true" />
                  <span>Interactive Map Live</span>
                </span>
                <div className="gp-map-legend">
                  <span className="gp-legend-item">
                    <span className="gp-legend-origin-dot" aria-hidden="true" />
                    <span>Origin HQ (Mumbai)</span>
                  </span>
                  <span className="gp-legend-item">
                    <span className="gp-legend-dest-dot" aria-hidden="true" />
                    <span>Destination Gateway</span>
                  </span>
                </div>
              </div>

              {/* SVG Map Canvas with minimalist world contours & glowing route curves */}
              <svg
                viewBox="0 0 900 480"
                className="gp-svg-canvas"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Interactive World Trade Map Canvas"
              >
                <defs>
                  {/* Subtle Map Linear Gradients */}
                  <linearGradient id="routeGradientActive" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ECC885" />
                    <stop offset="100%" stopColor="#D6A13A" />
                  </linearGradient>
                  <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Background Grid Lat/Long Reference Lines */}
                <line x1="0" y1="120" x2="900" y2="120" className="gp-map-grid-line" />
                <line x1="0" y1="240" x2="900" y2="240" className="gp-map-grid-line" />
                <line x1="0" y1="360" x2="900" y2="360" className="gp-map-grid-line" />
                <line x1="225" y1="0" x2="225" y2="480" className="gp-map-grid-line" />
                <line x1="450" y1="0" x2="450" y2="480" className="gp-map-grid-line" />
                <line x1="675" y1="0" x2="675" y2="480" className="gp-map-grid-line" />

                {/* Minimalist World Continents Silhouette Contours */}
                <g className="gp-map-landmass">
                  {/* North America */}
                  <path d="M 120 70 L 220 75 L 260 110 L 250 160 L 290 190 L 250 240 L 210 245 L 180 220 L 140 180 L 110 120 Z" />
                  {/* South America */}
                  <path d="M 230 250 L 300 270 L 330 330 L 290 410 L 240 400 L 220 330 L 210 270 Z" />
                  {/* Europe & UK */}
                  <path d="M 410 80 L 470 75 L 485 110 L 460 150 L 420 160 L 395 130 Z" />
                  <path d="M 385 110 L 405 105 L 400 125 L 385 125 Z" />
                  {/* Africa */}
                  <path d="M 415 175 L 490 180 L 530 240 L 510 320 L 470 380 L 430 350 L 400 260 L 405 200 Z" />
                  {/* Asia / Eurasia */}
                  <path d="M 485 75 L 680 70 L 760 110 L 750 170 L 700 230 L 650 250 L 600 230 L 550 220 L 500 170 Z" />
                  {/* Indian Subcontinent */}
                  <path d="M 545 220 L 605 225 L 590 280 L 565 300 L 545 250 Z" />
                  {/* Southeast Asia & Maritime Nodes */}
                  <path d="M 645 250 L 710 255 L 720 300 L 670 320 L 640 280 Z" />
                  {/* Australia & Oceania */}
                  <path d="M 700 330 L 790 325 L 810 380 L 760 415 L 690 385 Z" />
                </g>

                {/* Trade Corridor Routes (Bezier Arcs) */}
                {TRADE_CORRIDORS.map((corridor) => {
                  const isActive = corridor.id === activeCorridorId;
                  return (
                    <path
                      key={corridor.id}
                      d={corridor.pathD}
                      className={isActive ? 'gp-trade-route-active' : 'gp-trade-route-inactive'}
                      onClick={() => setActiveCorridorId(corridor.id)}
                    />
                  );
                })}

                {/* Destination Nodes */}
                {TRADE_CORRIDORS.map((corridor) => {
                  const isActive = corridor.id === activeCorridorId;
                  return (
                    <g
                      key={`dest-${corridor.id}`}
                      className="gp-map-node-group"
                      onClick={() => setActiveCorridorId(corridor.id)}
                      transform={`translate(${corridor.destCoords.x}, ${corridor.destCoords.y})`}
                    >
                      {isActive && <circle r="12" className="gp-node-pulse-ring" />}
                      <circle r={isActive ? 6 : 4.5} className="gp-node-core-dest" />
                      <text y="-10" className="gp-node-text">
                        {corridor.destCity}
                      </text>
                    </g>
                  );
                })}

                {/* Central Origin Node: Mumbai Trade HQ */}
                <g
                  className="gp-map-node-group"
                  transform="translate(570, 245)"
                  onClick={() => setActiveCorridorId('corridor-rotterdam')}
                >
                  <circle r="16" className="gp-node-pulse-ring" />
                  <circle r="8" className="gp-node-core-origin" />
                  <text y="19" className="gp-node-text" style={{ fill: '#ECC885', fontWeight: 800 }}>
                    MUMBAI (HQ)
                  </text>
                </g>
              </svg>
            </div>

            {/* RIGHT: Docked Glassmorphic Telemetry Information Console */}
            <div className="gp-network-console">
              <div className="gp-telemetry-card">
                <div className="gp-telemetry-header">
                  <span className="gp-telemetry-corridor-id">{activeCorridor.code}</span>
                  <span className="gp-telemetry-status-tag">
                    <span className="gp-map-live-dot" aria-hidden="true" />
                    <span>{activeCorridor.status}</span>
                  </span>
                </div>

                <h3 className="gp-telemetry-route-name">{activeCorridor.name}</h3>
                <p className="gp-telemetry-route-desc">
                  Connecting {activeCorridor.originPort} directly with {activeCorridor.destPort} under prioritized
                  carrier stowage allocations and dedicated destination customs clearances.
                </p>

                {/* Corridor Operational Specs */}
                <div className="gp-telemetry-specs">
                  <div className="gp-telemetry-spec-item">
                    <span className="gp-spec-label">Transit Duration</span>
                    <span className="gp-spec-val">{activeCorridor.transitTime}</span>
                  </div>
                  <div className="gp-telemetry-spec-item">
                    <span className="gp-spec-label">Transport Mode</span>
                    <span className="gp-spec-val">{activeCorridor.transitMode}</span>
                  </div>
                  <div className="gp-telemetry-spec-item">
                    <span className="gp-spec-label">Primary Cargo</span>
                    <span className="gp-spec-val">{activeCorridor.commodities}</span>
                  </div>
                  <div className="gp-telemetry-spec-item">
                    <span className="gp-spec-label">Regulatory Standard</span>
                    <span className="gp-spec-val">{activeCorridor.clearanceProtocol}</span>
                  </div>
                </div>

                {/* Quick Corridor Selector Buttons */}
                <div>
                  <div className="gp-corridor-selector-title">SELECT ACTIVE MARITIME CORRIDOR</div>
                  <div className="gp-corridor-pill-list">
                    {TRADE_CORRIDORS.map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        className={`gp-corridor-pill-btn ${c.id === activeCorridorId ? 'is-active' : ''}`}
                        onClick={() => setActiveCorridorId(c.id)}
                      >
                        <span>
                          {c.destCity} ({c.region})
                        </span>
                        <ArrowRight size={14} className="gp-corridor-pill-arrow" aria-hidden="true" />
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  className="gp-telemetry-btn"
                  onClick={() => openQuoteModal(`Corridor Consultation: ${activeCorridor.name}`)}
                >
                  <span>Inquire on this Trade Corridor</span>
                  <ArrowRight size={14} aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          3. GLOBAL PRESENCE HIGHLIGHTS (4 CAPABILITY CARDS)
          ==================================================================== */}
      <section className="gp-highlights-section" aria-label="Global Trade Capabilities">
        <div className="gp-container">
          <div className="gp-highlights-header">
            <div className="gp-section-eyebrow">
              <Sparkles size={14} aria-hidden="true" />
              <span>CORE GLOBAL CAPABILITIES</span>
            </div>
            <h2 className="gp-section-title-light">
              Engineered for <span className="gp-gold-gradient-text">International Trade Reliability</span>
            </h2>
            <p className="gp-section-desc-light">
              Our infrastructure combines direct mill access with Tier-1 container liner contracts, licensed
              customs brokerage, and free zone transshipment to protect cargo integrity.
            </p>
          </div>

          <div className="gp-highlights-grid">
            {CAPABILITY_HIGHLIGHTS.map((item) => (
              <article key={item.id} className="gp-highlight-card">
                <div className="gp-highlight-media">
                  <img src={item.image} alt={item.title} className="gp-highlight-img" loading="lazy" />
                  <div className="gp-highlight-media-overlay" aria-hidden="true" />
                  <div className="gp-highlight-icon-box" aria-hidden="true">
                    {item.icon}
                  </div>
                </div>
                <div className="gp-highlight-body">
                  <h3 className="gp-highlight-title">{item.title}</h3>
                  <p className="gp-highlight-desc">{item.desc}</p>
                  <div className="gp-highlight-accent-line" aria-hidden="true" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          4. TRADE CONNECTIVITY (VISUAL TRADE-FLOW PIPELINE)
          ==================================================================== */}
      <section className="gp-connectivity-section" aria-label="Trade Execution Flow">
        <div className="gp-container">
          <div className="gp-connectivity-header">
            <div className="gp-section-eyebrow">
              <Layers size={14} aria-hidden="true" />
              <span>END-TO-END TRADE CONNECTIVITY</span>
            </div>
            <h2 className="gp-section-title-light">
              Structured 6-Stage <span className="gp-gold-gradient-text">Trade Execution Framework</span>
            </h2>
            <p className="gp-section-desc-light">
              Click through our sequential milestones from farm gate qualification to final consignee handover.
            </p>
          </div>

          {/* Stepper Pipeline Bar */}
          <div className="gp-flow-pipeline">
            <div className="gp-flow-track-line" aria-hidden="true">
              <div
                className="gp-flow-track-progress"
                style={{ width: `${(activeStageIndex / (CONNECTIVITY_STAGES.length - 1)) * 100}%` }}
              />
            </div>

            <div className="gp-flow-nodes-row" role="tablist" aria-label="Trade Execution Milestones">
              {CONNECTIVITY_STAGES.map((stage, idx) => {
                const isActive = activeStageIndex === idx;
                return (
                  <button
                    key={stage.step}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`gp-flow-step-btn ${isActive ? 'is-active' : ''}`}
                    onClick={() => setActiveStageIndex(idx)}
                  >
                    <div className="gp-flow-circle">
                      <span style={{ fontFamily: 'monospace', fontWeight: 800 }}>{stage.step}</span>
                    </div>
                    <span className="gp-flow-step-label">{stage.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Flow Deep Dive Card */}
          <div className="gp-flow-detail-card" role="tabpanel">
            <div className="gp-flow-detail-left">
              <div className="gp-flow-detail-badge-row">
                <span className="gp-flow-stage-num-badge">
                  STAGE {currentStage.step} OF 06
                </span>
                <span className="gp-flow-live-pill">
                  <span className="gp-hero-badge-dot" aria-hidden="true" />
                  <span>{currentStage.badge}</span>
                </span>
              </div>

              <h3 className="gp-flow-detail-title">
                {currentStage.name} — <span className="gp-flow-detail-subtitle">{currentStage.subtitle}</span>
              </h3>

              <p className="gp-flow-detail-desc">{currentStage.desc}</p>

              {/* Operational Checkpoints Box */}
              <div className="gp-flow-checkpoints-box">
                <div className="gp-flow-checkpoints-title">
                  <ShieldCheck size={14} aria-hidden="true" />
                  <span>OPERATIONAL PROTOCOL &amp; VERIFICATION DELIVERABLES</span>
                </div>
                <div className="gp-flow-checkpoints-list">
                  {currentStage.checkpoints.map((pt, pIdx) => (
                    <div key={pIdx} className="gp-flow-checkpoint-item">
                      <Check size={14} className="gp-flow-check-icon" aria-hidden="true" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  className="gp-btn-primary"
                  onClick={() => openQuoteModal(`Execution Protocol: Stage ${currentStage.step} (${currentStage.name})`)}
                >
                  <span>Inquire on Stage {currentStage.step}</span>
                  <ArrowRight size={15} aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Visual Frame */}
            <div className="gp-flow-detail-media">
              <img src={currentStage.image} alt={currentStage.name} className="gp-flow-detail-img" loading="lazy" />
              <div className="gp-flow-detail-media-overlay" aria-hidden="true" />
              <div className="gp-flow-detail-media-badge">
                <span className="gp-media-badge-label">BENCHMARK OUTPUT</span>
                <span className="gp-media-badge-val">{currentStage.metric}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          5. REGIONAL EXPLORATION (EXPANSIVE CINEMATIC PANELS)
          ==================================================================== */}
      <section className="gp-regions-section" aria-label="Regional Trade Gateways">
        <div className="gp-container">
          <div className="gp-regions-header">
            <div className="gp-section-eyebrow">
              <MapPin size={14} aria-hidden="true" />
              <span>REGIONAL TRADE DESKS</span>
            </div>
            <h2 className="gp-section-title-light">
              Commercial Gateways Across <span className="gp-gold-gradient-text">Five Continents</span>
            </h2>
            <p className="gp-section-desc-light">
              Explore our strategic regional trade desks, major port gateways, and primary commodity flows.
            </p>
          </div>

          <div className="gp-regions-grid">
            {REGIONAL_GATEWAYS.map((gateway) => (
              <div
                key={gateway.id}
                className="gp-region-panel"
                onClick={() => openQuoteModal(`Regional Consultation: ${gateway.name}`)}
              >
                <img src={gateway.image} alt={gateway.name} className="gp-region-bg-img" loading="lazy" />
                <div className="gp-region-overlay" aria-hidden="true" />
                <div className="gp-region-content">
                  <span className="gp-region-tag">{gateway.tag}</span>
                  <h3 className="gp-region-name">{gateway.name}</h3>
                  <div className="gp-region-hub-city">{gateway.hubCity}</div>
                  <p className="gp-region-desc">{gateway.desc}</p>
                  <div className="gp-region-ports-strip">
                    {gateway.ports.map((port, pIdx) => (
                      <span key={pIdx} className="gp-region-port-pill">
                        {port}
                      </span>
                    ))}
                  </div>
                  <div className="gp-region-accent-bar" aria-hidden="true" />
                  <button type="button" className="gp-region-btn" aria-label={`Explore ${gateway.name}`}>
                    <span>Explore Trade Gateway</span>
                    <ArrowRight size={14} aria-hidden="true" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          6. GLOBAL TRADE METRICS CONSOLE
          ==================================================================== */}
      <section ref={metricsRef} className="gp-metrics-section" aria-label="Global Trade Performance Metrics">
        <div className="gp-container">
          <div className="gp-metrics-grid">
            <div className="gp-metric-card">
              <div className="gp-metric-icon-wrap" aria-hidden="true">
                <Globe size={24} />
              </div>
              <div className="gp-metric-value">
                <span className="gp-metric-value-gold">{metricsVisible ? '45+' : '0+'}</span>
              </div>
              <div className="gp-metric-label">Countries Actively Served</div>
              <div className="gp-metric-sublabel">Cross-Border Commercial Trade Reach</div>
            </div>

            <div className="gp-metric-card">
              <div className="gp-metric-icon-wrap" aria-hidden="true">
                <Ship size={24} />
              </div>
              <div className="gp-metric-value">
                <span className="gp-metric-value-gold">{metricsVisible ? '120+' : '0+'}</span>
              </div>
              <div className="gp-metric-label">Verified Shipping Corridors</div>
              <div className="gp-metric-sublabel">Direct Sea &amp; Intermodal Freight Lanes</div>
            </div>

            <div className="gp-metric-card">
              <div className="gp-metric-icon-wrap" aria-hidden="true">
                <ShieldCheck size={24} />
              </div>
              <div className="gp-metric-value">
                <span className="gp-metric-value-gold">{metricsVisible ? '99.4%' : '0%'}</span>
              </div>
              <div className="gp-metric-label">On-Time Port Clearance Rate</div>
              <div className="gp-metric-sublabel">Pre-Arrival Customs Conformance</div>
            </div>

            <div className="gp-metric-card">
              <div className="gp-metric-icon-wrap" aria-hidden="true">
                <Clock size={24} />
              </div>
              <div className="gp-metric-value">
                <span className="gp-metric-value-gold">24/7</span>
              </div>
              <div className="gp-metric-label">Trade Desk &amp; Vessel Tracking</div>
              <div className="gp-metric-sublabel">Dedicated Cargo Telemetry Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          7. GLOBAL PRESENCE STORY (EDITORIAL SECTION)
          ==================================================================== */}
      <section className="gp-story-section" aria-label="ConceptExim Trade Story">
        <div className="gp-container">
          <div className="gp-story-grid">
            <div className="gp-story-content">
              <div className="gp-section-eyebrow">
                <Award size={14} aria-hidden="true" />
                <span>INSTITUTIONAL TRADE ORCHESTRATION</span>
              </div>

              <h2 className="gp-story-title">
                Orchestrating Cross-Border Commerce with{' '}
                <span className="gp-gold-gradient-text">Uncompromising Precision</span>
              </h2>

              <p className="gp-story-lead">
                International commodity trade demands rigorous risk mitigation across origin crop qualification,
                vessel allocation, and destination customs compliance.
              </p>

              <p className="gp-story-desc">
                By maintaining direct partnerships with processing mills and premier container liners, ConceptExim
                eliminates fragmented broker intermediaries. Consignees receive guaranteed lot uniformity, verified
                assay documentation, and predictable delivery schedules.
              </p>

              <div className="gp-story-pillars">
                <div className="gp-story-pillar-item">
                  <div className="gp-story-pillar-icon" aria-hidden="true">
                    <CheckCircle2 size={18} />
                  </div>
                  <div className="gp-story-pillar-text">
                    <h4>Direct Mill Integration</h4>
                    <p>Origin-level farm-gate and mill quality control audits prior to export containerization.</p>
                  </div>
                </div>

                <div className="gp-story-pillar-item">
                  <div className="gp-story-pillar-icon" aria-hidden="true">
                    <FileCheck2 size={18} />
                  </div>
                  <div className="gp-story-pillar-text">
                    <h4>Strict ICC Incoterms 2020 Compliance</h4>
                    <p>Transparent demarcation of risk and cost across FOB, CIF, CFR, and DDP trade structures.</p>
                  </div>
                </div>

                <div className="gp-story-pillar-item">
                  <div className="gp-story-pillar-icon" aria-hidden="true">
                    <Anchor size={18} />
                  </div>
                  <div className="gp-story-pillar-text">
                    <h4>Real-Time Vessel &amp; Container Telemetry</h4>
                    <p>Continuous monitoring from port gate-in through high-seas transit to destination drayage.</p>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <Link to="/about" className="gp-btn-primary">
                  <span>About Our Operations</span>
                  <ArrowRight size={15} aria-hidden="true" />
                </Link>
                <Link to="/services" className="gp-btn-secondary">
                  <span>View Trade Services</span>
                </Link>
              </div>
            </div>

            {/* Right Editorial Visual Frame */}
            <div className="gp-story-visual-frame">
              <img
                src="/assets/global-presence-clean-bg.jpg"
                alt="Global Maritime Port Operations"
                className="gp-story-img"
                loading="lazy"
              />
              <div className="gp-story-img-overlay" aria-hidden="true" />

              <div className="gp-story-floating-badge">
                <div className="gp-story-badge-left">
                  <ShieldCheck size={28} className="gp-story-badge-icon" aria-hidden="true" />
                  <div>
                    <div className="gp-story-badge-title">AEO &amp; Incoterms 2020 Aligned</div>
                    <div className="gp-story-badge-sub">Institutional Global Trade Governance</div>
                  </div>
                </div>
                <span className="gp-story-badge-tag">VERIFIED</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          8. FINAL FULL-WIDTH CTA SECTION
          ==================================================================== */}
      <section className="gp-cta-section" aria-label="Global Trade Call to Action">
        <div className="gp-container">
          <div className="gp-cta-card">
            <div className="gp-cta-content">
              <div className="gp-section-eyebrow" style={{ justifyContent: 'center' }}>
                <Sparkles size={14} aria-hidden="true" />
                <span>EXPAND YOUR GLOBAL FOOTPRINT</span>
              </div>

              <h2 className="gp-cta-title">
                Take Your Trade <span className="gp-gold-gradient-text">Beyond Borders</span>
              </h2>

              <p className="gp-cta-desc">
                Partner with ConceptExim to streamline your international supply chain with verified origin
                sourcing, priority liner allocations, and seamless cross-border customs execution.
              </p>

              <div className="gp-cta-actions">
                <button
                  type="button"
                  className="gp-btn-primary"
                  onClick={() => openQuoteModal('Global Trade Route Inquiry')}
                >
                  <span>Request a Global Trade Quote</span>
                  <ArrowRight size={16} aria-hidden="true" />
                </button>

                <Link to="/contact" className="gp-btn-secondary">
                  <PhoneCall size={16} aria-hidden="true" />
                  <span>Contact Global Trade Desk</span>
                </Link>
              </div>

              {/* Trust Bar */}
              <div className="gp-cta-trust-bar">
                <span className="gp-cta-trust-item">
                  <CheckCircle2 size={14} className="gp-cta-check-icon" aria-hidden="true" />
                  <span>45+ Countries Served</span>
                </span>
                <span className="gp-cta-trust-item">
                  <CheckCircle2 size={14} className="gp-cta-check-icon" aria-hidden="true" />
                  <span>Tier-1 Ocean Allocations</span>
                </span>
                <span className="gp-cta-trust-item">
                  <CheckCircle2 size={14} className="gp-cta-check-icon" aria-hidden="true" />
                  <span>Zero Discrepancy LC Documentation</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default GlobalPresencePage;
