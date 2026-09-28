import React, { useState, useMemo } from 'react';
import { WorldMapPaths } from '../about/WorldMapPaths.js';
import {
  ArrowRight,
  Ship,
  Plane,
  Zap,
  Minimize2,
  Maximize2,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react';
import { useToast } from '../../context/ToastContext.js';

export interface AdminTradeNode {
  id: string;
  name: string;
  code: string;
  country: string;
  flag: string;
  x: number;
  y: number;
  labelX?: number;
  labelY?: number;
  type: 'hq' | 'hub' | 'port';
  tradeCategory: 'import' | 'export' | 'hq';
  region: 'asia' | 'europe' | 'americas' | 'me-africa';
  volume: string;
  shipments: number;
  cargo: string;
  status: string;
  coordinates: string;
}

export interface AdminRouteData {
  id: string;
  name: string;
  originId: string;
  destId: string;
  originName: string;
  destName: string;
  originFlag: string;
  destFlag: string;
  path: string;
  type: 'import' | 'export';
  mode: 'sea' | 'air';
  carrier: string;
  vessel: string;
  cargo: string;
  volume: string;
  activeTransits: number;
  transitDays: string;
  durationSec: number;
}

export const ADMIN_TRADE_NODES: AdminTradeNode[] = [
  {
    id: 'india',
    name: 'India (Mumbai Headquarters)',
    code: 'IN (HQ)',
    country: 'India',
    flag: '🇮🇳',
    x: 588,
    y: 478,
    labelX: 588,
    labelY: 504,
    type: 'hq',
    tradeCategory: 'hq',
    region: 'asia',
    volume: '$9.6M',
    shipments: 42,
    cargo: 'Basmati Rice, Spices, Grains, Tea, Organic Cotton',
    status: 'JNPT Central Maritime Gateway & Global HQ',
    coordinates: '18.94°N, 72.82°E',
  },
  {
    id: 'usa',
    name: 'United States',
    code: 'USA',
    country: 'USA',
    flag: '🇺🇸',
    x: 185,
    y: 440,
    labelX: 185,
    labelY: 422,
    type: 'port',
    tradeCategory: 'import',
    region: 'americas',
    volume: '$4.2M',
    shipments: 14,
    cargo: 'Machinery & Polymers, Specialty Cereals',
    status: 'East Coast Clearance (New York/New Jersey)',
    coordinates: '40.71°N, 74.00°W',
  },
  {
    id: 'brazil',
    name: 'Brazil',
    code: 'Brazil',
    country: 'Brazil',
    flag: '🇧🇷',
    x: 290,
    y: 595,
    labelX: 290,
    labelY: 618,
    type: 'port',
    tradeCategory: 'import',
    region: 'americas',
    volume: '$2.1M',
    shipments: 8,
    cargo: 'Soybeans, Raw Cane Sugar, Specialty Coffee',
    status: 'South Atlantic Deepwater Port (Santos)',
    coordinates: '23.96°S, 46.33°W',
  },
  {
    id: 'uk',
    name: 'United Kingdom',
    code: 'UK',
    country: 'United Kingdom',
    flag: '🇬🇧',
    x: 405,
    y: 382,
    labelX: 405,
    labelY: 364,
    type: 'hub',
    tradeCategory: 'export',
    region: 'europe',
    volume: '$3.8M',
    shipments: 12,
    cargo: 'Organic Spices & Grade-A Basmati Rice',
    status: 'London Gateway & Felixstowe Clearance',
    coordinates: '51.50°N, 0.12°W',
  },
  {
    id: 'germany',
    name: 'Germany',
    code: 'Germany',
    country: 'Germany',
    flag: '🇩🇪',
    x: 432,
    y: 395,
    labelX: 448,
    labelY: 380,
    type: 'hub',
    tradeCategory: 'import',
    region: 'europe',
    volume: '$5.1M',
    shipments: 18,
    cargo: 'Textiles, Technical Fabrics & Polymers',
    status: 'Hamburg Central Logistics Hub',
    coordinates: '53.55°N, 9.99°E',
  },
  {
    id: 'uae',
    name: 'United Arab Emirates',
    code: 'UAE',
    country: 'UAE',
    flag: '🇦🇪',
    x: 534,
    y: 467,
    labelX: 534,
    labelY: 449,
    type: 'hub',
    tradeCategory: 'export',
    region: 'me-africa',
    volume: '$7.4M',
    shipments: 24,
    cargo: 'Agro-Commodities, Sugar & Transshipment',
    status: 'Jebel Ali DP World Mega-Terminal',
    coordinates: '25.20°N, 55.27°E',
  },
  {
    id: 'china',
    name: 'China',
    code: 'China',
    country: 'China',
    flag: '🇨🇳',
    x: 684,
    y: 438,
    labelX: 684,
    labelY: 420,
    type: 'hub',
    tradeCategory: 'import',
    region: 'asia',
    volume: '$6.8M',
    shipments: 22,
    cargo: 'Industrial Equipment & Bulk Raw Minerals',
    status: 'Shanghai Deepwater Maritime Terminal',
    coordinates: '31.23°N, 121.47°E',
  },
  {
    id: 'japan',
    name: 'Japan',
    code: 'Japan',
    country: 'Japan',
    flag: '🇯🇵',
    x: 730,
    y: 426,
    labelX: 746,
    labelY: 442,
    type: 'port',
    tradeCategory: 'export',
    region: 'asia',
    volume: '$3.2M',
    shipments: 10,
    cargo: 'Dehydrated Onions, Garlic & Spices',
    status: 'Yokohama Port Quarantine Cleared',
    coordinates: '35.44°N, 139.63°E',
  },
  {
    id: 'singapore',
    name: 'Singapore',
    code: 'Singapore',
    country: 'Singapore',
    flag: '🇸🇬',
    x: 659,
    y: 527,
    labelX: 672,
    labelY: 546,
    type: 'hub',
    tradeCategory: 'export',
    region: 'asia',
    volume: '$4.5M',
    shipments: 16,
    cargo: 'Edible Oils, Cold-Chain & Perishables',
    status: 'PSA Singapore Intermodal Gateway',
    coordinates: '1.35°N, 103.81°E',
  },
  {
    id: 'south-africa',
    name: 'South Africa',
    code: 'South Africa',
    country: 'South Africa',
    flag: '🇿🇦',
    x: 478,
    y: 608,
    labelX: 478,
    labelY: 628,
    type: 'port',
    tradeCategory: 'export',
    region: 'me-africa',
    volume: '$2.7M',
    shipments: 9,
    cargo: 'Minerals, Wine & Agro Products',
    status: 'Durban Maritime Corridor',
    coordinates: '29.85°S, 31.02°E',
  },
  {
    id: 'australia',
    name: 'Australia',
    code: 'Australia',
    country: 'Australia',
    flag: '🇦🇺',
    x: 752,
    y: 628,
    labelX: 752,
    labelY: 648,
    type: 'port',
    tradeCategory: 'export',
    region: 'asia',
    volume: '$2.9M',
    shipments: 7,
    cargo: 'Pulses, Cereals & Cross-Trade Grains',
    status: 'Port of Sydney Botany Terminal',
    coordinates: '33.86°S, 151.20°E',
  },
];

export const ADMIN_TRADE_ROUTES: AdminRouteData[] = [
  // 1. Export: India -> UAE (Core Maritime Expressway)
  {
    id: 'in-uae',
    name: 'Mumbai ➔ Dubai Corridor',
    originId: 'india',
    destId: 'uae',
    originName: 'India',
    destName: 'UAE',
    originFlag: '🇮🇳',
    destFlag: '🇦🇪',
    path: 'M 588 478 Q 560 465 534 467',
    type: 'export',
    mode: 'sea',
    carrier: 'Maersk Line / DP World',
    vessel: 'MV SINDHU EXPRESS',
    cargo: 'Basmati Rice & Tea',
    volume: '$2.8M/mo',
    activeTransits: 14,
    transitDays: '3.2 Days',
    durationSec: 4.2,
  },
  // 2. Export: India -> UK (North Sea Gateway)
  {
    id: 'in-uk',
    name: 'Mumbai ➔ London Gateway',
    originId: 'india',
    destId: 'uk',
    originName: 'India',
    destName: 'United Kingdom',
    originFlag: '🇮🇳',
    destFlag: '🇬🇧',
    path: 'M 588 478 Q 480 395 405 382',
    type: 'export',
    mode: 'sea',
    carrier: 'MSC Mediterranean Shipping',
    vessel: 'MSC ADRIATIC V',
    cargo: 'Organic Spices & Cotton Textiles',
    volume: '$2.4M/mo',
    activeTransits: 10,
    transitDays: '14 Days',
    durationSec: 6.5,
  },
  // 3. Export: India -> Australia (Oceania Corridor)
  {
    id: 'in-au',
    name: 'Mumbai ➔ Sydney Gateway',
    originId: 'india',
    destId: 'australia',
    originName: 'India',
    destName: 'Australia',
    originFlag: '🇮🇳',
    destFlag: '🇦🇺',
    path: 'M 588 478 Q 680 570 752 628',
    type: 'export',
    mode: 'sea',
    carrier: 'Hapag-Lloyd Ocean',
    vessel: 'HAPAG PACIFIC',
    cargo: 'Specialty Pulses & Agro-Grains',
    volume: '$1.6M/mo',
    activeTransits: 6,
    transitDays: '16 Days',
    durationSec: 7.2,
  },
  // 4. Export: India -> Singapore (Express Air Corridor)
  {
    id: 'in-sg',
    name: 'Mumbai ➔ Singapore Express Air',
    originId: 'india',
    destId: 'singapore',
    originName: 'India',
    destName: 'Singapore',
    originFlag: '🇮🇳',
    destFlag: '🇸🇬',
    path: 'M 588 478 Q 625 510 659 527',
    type: 'export',
    mode: 'air',
    carrier: 'Singapore Airlines Cargo',
    vessel: 'SQ-CARGO 747F',
    cargo: 'Fresh Produce, Mangoes & Perishables',
    volume: '$1.4M/mo',
    activeTransits: 8,
    transitDays: '12 Hours',
    durationSec: 3.4,
  },
  // 5. Export: UAE -> South Africa (Indian Ocean Transshipment)
  {
    id: 'uae-sa',
    name: 'Dubai ➔ Durban Corridor',
    originId: 'uae',
    destId: 'south-africa',
    originName: 'UAE',
    destName: 'South Africa',
    originFlag: '🇦🇪',
    destFlag: '🇿🇦',
    path: 'M 534 467 Q 520 545 478 608',
    type: 'export',
    mode: 'sea',
    carrier: 'CMA CGM Ocean',
    vessel: 'CMA CGM AFRICA',
    cargo: 'Packaged Foodstuffs & Transshipment',
    volume: '$1.1M/mo',
    activeTransits: 5,
    transitDays: '8.5 Days',
    durationSec: 5.6,
  },
  // 6. Export: China -> Japan (East Asia Coastal Feeder)
  {
    id: 'cn-jp',
    name: 'Shanghai ➔ Yokohama Feeder',
    originId: 'china',
    destId: 'japan',
    originName: 'China',
    destName: 'Japan',
    originFlag: '🇨🇳',
    destFlag: '🇯🇵',
    path: 'M 684 438 Q 710 425 730 426',
    type: 'export',
    mode: 'sea',
    carrier: 'Ocean Network Express (ONE)',
    vessel: 'ONE HARMONY',
    cargo: 'Processed Foods & Seasonings',
    volume: '$890K/mo',
    activeTransits: 6,
    transitDays: '2.5 Days',
    durationSec: 3.8,
  },
  // 7. Import: USA -> Germany (Transatlantic Industrial Route)
  {
    id: 'usa-de',
    name: 'New York ➔ Hamburg Transatlantic',
    originId: 'usa',
    destId: 'germany',
    originName: 'United States',
    destName: 'Germany',
    originFlag: '🇺🇸',
    destFlag: '🇩🇪',
    path: 'M 185 440 Q 300 370 432 395',
    type: 'import',
    mode: 'sea',
    carrier: 'Evergreen Marine Line',
    vessel: 'EVER LIBERTY',
    cargo: 'Industrial Machinery & Polymers',
    volume: '$3.4M/mo',
    activeTransits: 12,
    transitDays: '10 Days',
    durationSec: 6.0,
  },
  // 8. Import: China -> India (Sino-Indian Industrial Corridor)
  {
    id: 'cn-in',
    name: 'Shanghai ➔ Mumbai Bulk Import',
    originId: 'china',
    destId: 'india',
    originName: 'China',
    destName: 'India',
    originFlag: '🇨🇳',
    destFlag: '🇮🇳',
    path: 'M 684 438 Q 635 440 588 478',
    type: 'import',
    mode: 'sea',
    carrier: 'COSCO Shipping Lines',
    vessel: 'COSCO PRIDE',
    cargo: 'Solar Components & Minerals',
    volume: '$4.1M/mo',
    activeTransits: 16,
    transitDays: '8.0 Days',
    durationSec: 5.0,
  },
  // 9. Import: Brazil -> India (South Atlantic Sugar & Soy Line)
  {
    id: 'br-in',
    name: 'Santos ➔ Mumbai Agro-Import',
    originId: 'brazil',
    destId: 'india',
    originName: 'Brazil',
    destName: 'India',
    originFlag: '🇧🇷',
    destFlag: '🇮🇳',
    path: 'M 290 595 Q 430 565 588 478',
    type: 'import',
    mode: 'sea',
    carrier: 'Vale Bulk Logistics',
    vessel: 'VALE RIO BULKER',
    cargo: 'Raw Sugar & Crude Soy Commodities',
    volume: '$2.1M/mo',
    activeTransits: 7,
    transitDays: '21 Days',
    durationSec: 7.8,
  },
  // 10. Import: Germany -> UAE (Continental Air Cargo Corridor)
  {
    id: 'de-uae',
    name: 'Frankfurt ➔ Dubai SkyCargo',
    originId: 'germany',
    destId: 'uae',
    originName: 'Germany',
    destName: 'UAE',
    originFlag: '🇩🇪',
    destFlag: '🇦🇪',
    path: 'M 432 395 Q 490 410 534 467',
    type: 'import',
    mode: 'air',
    carrier: 'Emirates SkyCargo / Lufthansa',
    vessel: 'EK-SKYCARGO 777F',
    cargo: 'Precision Instruments & Pharma',
    volume: '$1.9M/mo',
    activeTransits: 9,
    transitDays: '8 Hours',
    durationSec: 3.6,
  },
];

interface AdminWorldMapProps {
  onViewFullMap?: () => void;
  isFullScreen?: boolean;
}

export const AdminWorldMap: React.FC<AdminWorldMapProps> = ({ onViewFullMap, isFullScreen = false }) => {
  const { showToast } = useToast();

  // Interactive UI Filters & States
  const [activeFilter, setActiveFilter] = useState<'all' | 'import' | 'export' | 'sea' | 'air'>('all');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);
  const [activeNode, setActiveNode] = useState<AdminTradeNode | null>(null);
  const [activeRoute, setActiveRoute] = useState<AdminRouteData | null>(null);
  const [isCardCollapsed, setIsCardCollapsed] = useState<boolean>(false);

  // Filtered routes based on active category
  const filteredRoutes = useMemo(() => {
    return ADMIN_TRADE_ROUTES.filter((r) => {
      if (activeFilter === 'import') return r.type === 'import';
      if (activeFilter === 'export') return r.type === 'export';
      if (activeFilter === 'sea') return r.mode === 'sea';
      if (activeFilter === 'air') return r.mode === 'air';
      return true;
    });
  }, [activeFilter]);

  // Determine if a route is currently focused by hovered/selected node or route
  const getRouteStatus = (route: AdminRouteData) => {
    if (activeRoute) {
      return activeRoute.id === route.id ? 'highlighted' : 'dimmed';
    }
    if (activeNode) {
      const isConnected = route.originId === activeNode.id || route.destId === activeNode.id;
      return isConnected ? 'highlighted' : 'dimmed';
    }
    return 'normal';
  };

  // Check if a node is focused
  const getNodeStatus = (node: AdminTradeNode) => {
    if (activeNode) {
      if (activeNode.id === node.id) return 'selected';
      // Highlight direct neighbors
      const isNeighbor = ADMIN_TRADE_ROUTES.some(
        (r) =>
          (r.originId === activeNode.id && r.destId === node.id) ||
          (r.destId === activeNode.id && r.originId === node.id)
      );
      return isNeighbor ? 'neighbor' : 'dimmed';
    }
    if (activeRoute) {
      const isEndpoint = activeRoute.originId === node.id || activeRoute.destId === node.id;
      return isEndpoint ? 'selected' : 'dimmed';
    }
    if (selectedRegion !== 'all' && node.region !== selectedRegion) {
      return 'dimmed';
    }
    return 'normal';
  };

  return (
    <div className={`admin-overview-map-wrapper ${isFullScreen ? 'fullscreen-view' : ''}`}>
      {/* ------------------------------------------------------------------------
          1. Interactive Map Command Strip (Top Bar HUD)
          ------------------------------------------------------------------------ */}
      <div className="admin-map-command-strip">
        {/* Left: Corridor Filters */}
        <div className="admin-map-filters-group">
          <button
            type="button"
            className={`admin-map-filter-chip ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            <span>All Corridors</span>
            <span className="chip-badge">{ADMIN_TRADE_ROUTES.length}</span>
          </button>
          <button
            type="button"
            className={`admin-map-filter-chip blue ${activeFilter === 'import' ? 'active' : ''}`}
            onClick={() => setActiveFilter('import')}
          >
            <span className="dot blue" />
            <span>Imports</span>
            <span className="chip-badge">4</span>
          </button>
          <button
            type="button"
            className={`admin-map-filter-chip amber ${activeFilter === 'export' ? 'active' : ''}`}
            onClick={() => setActiveFilter('export')}
          >
            <span className="dot amber" />
            <span>Exports</span>
            <span className="chip-badge">6</span>
          </button>
          <button
            type="button"
            className={`admin-map-filter-chip ${activeFilter === 'sea' ? 'active' : ''}`}
            onClick={() => setActiveFilter('sea')}
            title="Maritime Shipping Corridors"
          >
            <Ship size={13} />
            <span>Sea</span>
          </button>
          <button
            type="button"
            className={`admin-map-filter-chip ${activeFilter === 'air' ? 'active' : ''}`}
            onClick={() => setActiveFilter('air')}
            title="Air Freight Corridors"
          >
            <Plane size={13} />
            <span>Air</span>
          </button>
        </div>

        {/* Right: Telemetry Controls & Speed Toggle */}
        <div className="admin-map-controls-group">
          {/* Live AIS Telemetry Beacon */}
          <div className="admin-map-telemetry-badge">
            <span className="telemetry-live-dot" />
            <span className="telemetry-txt">64 AIS Feeds Live</span>
          </div>

          {/* Simulation Velocity Switch (1x vs 2x) */}
          <button
            type="button"
            className={`admin-map-speed-toggle ${speedMultiplier === 2 ? 'fast' : ''}`}
            onClick={() => {
              const next = speedMultiplier === 1 ? 2 : 1;
              setSpeedMultiplier(next);
              showToast(`Simulation velocity set to: ${next}x Speed`, 'info');
            }}
            title="Toggle simulation speed for vector animations"
          >
            <Zap size={13} />
            <span>{speedMultiplier}x Velocity</span>
          </button>

          {/* Reset Focus Button (If a node or route is active) */}
          {(activeNode || activeRoute || selectedRegion !== 'all') && (
            <button
              type="button"
              className="admin-map-reset-btn"
              onClick={() => {
                setActiveNode(null);
                setActiveRoute(null);
                setSelectedRegion('all');
              }}
              title="Reset map camera and highlights"
            >
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* ------------------------------------------------------------------------
          2. SVG Interactive Vector Canvas (High-Definition GIS Matrix)
          ------------------------------------------------------------------------ */}
      <svg
        viewBox="60 270 740 405"
        className="admin-overview-svg"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Ocean Ambient Radial Glow */}
          <radialGradient id="adminOceanGlow" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#F8FAFC" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#F1F5F9" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#E2E8F0" stopOpacity="0.1" />
          </radialGradient>

          {/* Luminous Route Glow Filter */}
          <filter id="adminRouteGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Intense Moving Comet Head Glow */}
          <filter id="adminPacketGlow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="glow" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="1.2" result="core" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="core" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Subtle Continent Depth Shadow */}
          <filter id="adminLandShadow" x="-5%" y="-5%" width="110%" height="110%">
            <feDropShadow dx="0" dy="1.5" stdDeviation="1.8" floodColor="#0F172A" floodOpacity="0.05" />
          </filter>

          {/* Import Route Linear Gradient */}
          <linearGradient id="adminImportGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="50%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#1D4ED8" />
          </linearGradient>

          {/* Export Route Linear Gradient */}
          <linearGradient id="adminExportGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FBBF24" />
            <stop offset="50%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
        </defs>

        {/* Ocean Ambient Backdrop */}
        <rect x="60" y="270" width="740" height="405" fill="url(#adminOceanGlow)" />

        {/* --------------------------------------------------------------------
            A. Maritime Graticules & Navigation Coordinates
            -------------------------------------------------------------------- */}
        <g className="admin-map-graticules" stroke="#94A3B8" strokeWidth="0.5" strokeDasharray="3 4" opacity="0.32">
          {/* Latitude Lines */}
          <line x1="70" y1="330" x2="790" y2="330" />
          <line x1="70" y1="415" x2="790" y2="415" stroke="#F59E0B" strokeOpacity="0.3" strokeWidth="0.7" /> {/* Tropic of Cancer */}
          <line x1="70" y1="480" x2="790" y2="480" stroke="#2563EB" strokeOpacity="0.35" strokeWidth="0.8" /> {/* Equator */}
          <line x1="70" y1="545" x2="790" y2="545" stroke="#F59E0B" strokeOpacity="0.3" strokeWidth="0.7" /> {/* Tropic of Capricorn */}
          <line x1="70" y1="630" x2="790" y2="630" />

          {/* Longitude Lines */}
          <line x1="145" y1="280" x2="145" y2="665" /> {/* 120°W */}
          <line x1="275" y1="280" x2="275" y2="665" /> {/* 60°W */}
          <line x1="405" y1="280" x2="405" y2="665" stroke="#2563EB" strokeOpacity="0.3" strokeWidth="0.8" /> {/* 0° Prime Meridian */}
          <line x1="535" y1="280" x2="535" y2="665" /> {/* 60°E */}
          <line x1="665" y1="280" x2="665" y2="665" /> {/* 120°E */}
        </g>

        {/* Graticule Coordinate Labels */}
        <g fill="#94A3B8" fontSize="7" fontFamily="'Outfit', sans-serif" fontWeight="600" opacity="0.45">
          <text x="75" y="412">23.5°N</text>
          <text x="75" y="477">0° EQUATOR</text>
          <text x="75" y="542">23.5°S</text>
          <text x="405" y="670" textAnchor="middle">0° MERIDIAN</text>
          <text x="535" y="670" textAnchor="middle">60°E (INDIAN OCEAN)</text>
          <text x="275" y="670" textAnchor="middle">60°W (ATLANTIC)</text>
        </g>

        {/* --------------------------------------------------------------------
            B. Crisp Geographic Landmass Contours
            -------------------------------------------------------------------- */}
        <g filter="url(#adminLandShadow)" className="admin-map-landmass" fill="#DDE7F2" stroke="#C4D5E7" strokeWidth="0.65" opacity="0.95">
          <WorldMapPaths />
        </g>

        {/* --------------------------------------------------------------------
            C. Dynamic Animated Trade Corridors (Flowing Vectors & Comets)
            -------------------------------------------------------------------- */}
        <g className="admin-map-routes-layer">
          {filteredRoutes.map((route) => {
            const status = getRouteStatus(route);
            const isHighlighted = status === 'highlighted';
            const isDimmed = status === 'dimmed';
            const isImport = route.type === 'import';
            const strokeColor = isImport ? '#2563EB' : '#F59E0B';
            const glowColor = isImport ? 'rgba(37, 99, 235, 0.45)' : 'rgba(245, 158, 11, 0.45)';
            const dur = route.durationSec / speedMultiplier;

            return (
              <g
                key={route.id}
                className={`admin-route-item ${status}`}
                style={{ cursor: 'pointer' }}
                onMouseEnter={() => setActiveRoute(route)}
                onMouseLeave={() => setActiveRoute(null)}
                onClick={() => setActiveRoute(route)}
              >
                {/* 1. Underlying Luminous Atmospheric Halo */}
                <path
                  d={route.path}
                  fill="none"
                  stroke={glowColor}
                  strokeWidth={isHighlighted ? 6 : 3.5}
                  strokeLinecap="round"
                  opacity={isDimmed ? 0.08 : isHighlighted ? 0.85 : 0.4}
                  filter="url(#adminRouteGlow)"
                  style={{ transition: 'all 0.25s ease' }}
                />

                {/* 2. Flowing Animated Dash Vector */}
                <path
                  d={route.path}
                  fill="none"
                  stroke={strokeColor}
                  strokeWidth={isHighlighted ? 2.8 : 1.8}
                  strokeDasharray="6 4"
                  strokeLinecap="round"
                  className="route-animated-dash"
                  opacity={isDimmed ? 0.15 : isHighlighted ? 1 : 0.85}
                  style={{ transition: 'all 0.25s ease' }}
                />

                {/* 3. Primary Leading Cargo Comet Head */}
                <circle
                  r={isHighlighted ? 4.2 : 3.2}
                  fill="#FFFFFF"
                  stroke={strokeColor}
                  strokeWidth={isHighlighted ? 2 : 1.2}
                  filter="url(#adminPacketGlow)"
                  opacity={isDimmed ? 0.15 : 1}
                >
                  <animateMotion
                    path={route.path}
                    dur={`${dur}s`}
                    repeatCount="indefinite"
                  />
                </circle>

                {/* 4. Trailing Fading Photon Tail */}
                <circle
                  r="2"
                  fill={strokeColor}
                  opacity={isDimmed ? 0.1 : 0.75}
                >
                  <animateMotion
                    path={route.path}
                    dur={`${dur}s`}
                    begin="0.14s"
                    repeatCount="indefinite"
                  />
                </circle>

                <circle
                  r="1.2"
                  fill={strokeColor}
                  opacity={isDimmed ? 0.05 : 0.4}
                >
                  <animateMotion
                    path={route.path}
                    dur={`${dur}s`}
                    begin="0.28s"
                    repeatCount="indefinite"
                  />
                </circle>

                {/* 5. Live Maritime Ship or Air Freight Carrier Icon gliding along path */}
                {route.mode === 'sea' ? (
                  <g opacity={isDimmed ? 0.15 : isHighlighted ? 1 : 0.85}>
                    <animateMotion
                      path={route.path}
                      dur={`${dur * 1.5}s`}
                      repeatCount="indefinite"
                      rotate="auto"
                    />
                    {/* Compact Ship Hull */}
                    <path
                      d="M -5 -2 L 4 -2 L 7 0 L 4 2 L -5 2 Z"
                      fill="#0F172A"
                      stroke="#FFFFFF"
                      strokeWidth="0.8"
                    />
                    <circle cx="7" cy="0" r="1.2" fill={strokeColor} />
                  </g>
                ) : (
                  <g opacity={isDimmed ? 0.15 : isHighlighted ? 1 : 0.9}>
                    <animateMotion
                      path={route.path}
                      dur={`${dur * 0.85}s`}
                      repeatCount="indefinite"
                      rotate="auto"
                    />
                    {/* Air Cargo Plane Vector */}
                    <path
                      d="M -4 0 L -1 -2.5 L 2 -2.5 L 0 0 L 5 0 L 6 -0.8 L 7 0 L 6 0.8 L 5 0 L 0 0 L 2 2.5 L -1 2.5 L -4 0 Z"
                      fill="#FFFFFF"
                      stroke="#0F172A"
                      strokeWidth="0.6"
                    />
                  </g>
                )}
              </g>
            );
          })}
        </g>

        {/* --------------------------------------------------------------------
            D. Global Trade Nodes (Radar Beacons & Gateway Badges)
            -------------------------------------------------------------------- */}
        <g className="admin-map-nodes-layer">
          {ADMIN_TRADE_NODES.map((node) => {
            const status = getNodeStatus(node);
            const isSelected = status === 'selected';
            const isNeighbor = status === 'neighbor';
            const isDimmed = status === 'dimmed';
            const isHQ = node.type === 'hq';
            const isImport = node.tradeCategory === 'import';
            const pinColor = isHQ ? '#D97706' : isImport ? '#2563EB' : '#F59E0B';

            return (
              <g
                key={node.id}
                className={`admin-map-node-group ${status} ${isHQ ? 'hq-node' : ''}`}
                style={{
                  cursor: 'pointer',
                  opacity: isDimmed ? 0.35 : 1,
                  transition: 'opacity 0.25s ease',
                }}
                onMouseEnter={() => setActiveNode(node)}
                onMouseLeave={() => setActiveNode(null)}
                onClick={() => {
                  setActiveNode(isSelected ? null : node);
                  showToast(`${node.name}: ${node.status}`, 'info');
                }}
              >
                {/* 1. Concentric Radar Pulse Rings */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={isSelected || isHQ ? 14 : isNeighbor ? 11 : 9}
                  fill="none"
                  stroke={pinColor}
                  strokeWidth={isNeighbor ? 1.5 : 1.2}
                  className="admin-node-radar-ping"
                  opacity={isSelected || isHQ ? 0.85 : isNeighbor ? 0.7 : 0.55}
                />
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={isSelected || isHQ ? 20 : 13}
                  fill="none"
                  stroke={pinColor}
                  strokeWidth="0.8"
                  className="admin-node-radar-wave"
                  opacity={isSelected || isHQ ? 0.5 : 0.3}
                />

                {/* 2. Soft Ambient Aura Circle */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={isSelected ? 11 : isHQ ? 9 : 7}
                  fill={pinColor}
                  opacity={isSelected ? 0.35 : 0.18}
                />

                {/* 3. Outer Solid Ring */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={isHQ ? 5.5 : isSelected ? 5.2 : 4.2}
                  fill="#FFFFFF"
                  stroke={pinColor}
                  strokeWidth={isHQ ? 2.5 : isSelected ? 2.4 : 1.8}
                  style={{
                    filter: `drop-shadow(0 1px 3px ${pinColor}66)`,
                    transition: 'r 0.2s ease',
                  }}
                />

                {/* 4. Core Indicator */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={isHQ ? 2.8 : isSelected ? 2.6 : 2}
                  fill={pinColor}
                />

                {/* 5. Special Global HQ Star/Anchor Ring for India */}
                {isHQ && (
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r="8.5"
                    fill="none"
                    stroke="#D97706"
                    strokeWidth="1"
                    strokeDasharray="2 2"
                  />
                )}

                {/* 6. Pill Label Badge */}
                <g transform={`translate(${node.labelX || node.x}, ${node.labelY || node.y - 12})`}>
                  {/* Subtle shadow rect */}
                  <rect
                    x={-(node.code.length * 3.3 + 8)}
                    y="-8"
                    width={node.code.length * 6.6 + 16}
                    height="14"
                    rx="4"
                    fill="rgba(255, 255, 255, 0.94)"
                    stroke={isSelected || isHQ ? pinColor : '#E2E8F0'}
                    strokeWidth={isSelected || isHQ ? 1.5 : 0.8}
                    filter="drop-shadow(0 1px 2px rgba(15, 23, 42, 0.08))"
                  />
                  <text
                    x="0"
                    y="2"
                    textAnchor="middle"
                    fontSize="7.5"
                    fontWeight="800"
                    fill={isSelected || isHQ ? '#0F172A' : '#334155'}
                    fontFamily="'Outfit', sans-serif"
                    className="admin-map-node-text"
                  >
                    {node.code}
                  </text>
                </g>
              </g>
            );
          })}
        </g>
      </svg>

      {/* ------------------------------------------------------------------------
          3. Dynamic Floating Dossier HUD: Active Trade Route
          ------------------------------------------------------------------------ */}
      {activeRoute && (
        <div className="admin-map-route-hud" role="status">
          <div className="route-hud-header">
            <div className="route-hud-title-wrap">
              <span className="route-hud-flag">{activeRoute.originFlag}</span>
              <span className="route-hud-name">{activeRoute.name}</span>
              <span className="route-hud-flag">{activeRoute.destFlag}</span>
            </div>
            <span className={`route-hud-mode-pill ${activeRoute.mode}`}>
              {activeRoute.mode === 'sea' ? <Ship size={12} /> : <Plane size={12} />}
              <span>{activeRoute.mode.toUpperCase()}</span>
            </span>
          </div>

          <div className="route-hud-grid">
            <div className="route-hud-cell">
              <span className="cell-lbl">Assigned Carrier:</span>
              <span className="cell-val vessel">{activeRoute.vessel}</span>
            </div>
            <div className="route-hud-cell">
              <span className="cell-lbl">Manifest:</span>
              <span className="cell-val">{activeRoute.cargo}</span>
            </div>
            <div className="route-hud-cell">
              <span className="cell-lbl">Monthly Flow:</span>
              <span className="cell-val gold">{activeRoute.volume}</span>
            </div>
            <div className="route-hud-cell">
              <span className="cell-lbl">Avg Transit:</span>
              <span className="cell-val green">{activeRoute.transitDays} ({activeRoute.activeTransits} Active)</span>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------------
          4. Dynamic Floating Dossier HUD: Active Node / Country
          ------------------------------------------------------------------------ */}
      {activeNode && !activeRoute && (
        <div className="admin-map-node-tooltip" role="tooltip">
          <div className="admin-node-tooltip-header">
            <span className="admin-node-tooltip-flag">{activeNode.flag}</span>
            <div className="admin-node-tooltip-info">
              <div className="admin-node-tooltip-title">{activeNode.name}</div>
              <div className="admin-node-tooltip-status">
                <CheckCircle2 size={11} color="#10B981" />
                <span>{activeNode.status}</span>
              </div>
            </div>
            {activeNode.type === 'hq' && <span className="admin-hq-star-badge">GLOBAL HQ</span>}
          </div>

          <div className="admin-node-tooltip-meta">
            <div className="admin-node-tooltip-item">
              <span className="label">Monthly Trade Value:</span>
              <span className="val">{activeNode.volume}</span>
            </div>
            <div className="admin-node-tooltip-item">
              <span className="label">Active Consignments:</span>
              <span className="val">{activeNode.shipments} vessels / flights</span>
            </div>
            <div className="admin-node-tooltip-item">
              <span className="label">Primary Commodities:</span>
              <span className="val cargo">{activeNode.cargo}</span>
            </div>
            <div className="admin-node-tooltip-item">
              <span className="label">Geographic Transponder:</span>
              <span className="val gps">{activeNode.coordinates}</span>
            </div>
          </div>

          <div className="admin-node-tooltip-footer">
            <span className="corridor-hint">
              {ADMIN_TRADE_ROUTES.filter(
                (r) => r.originId === activeNode.id || r.destId === activeNode.id
              ).length}{' '}
              Direct Active Corridors
            </span>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------------
          5. Floating Live Shipments Card (Exact match to Reference 1 + Collapsible)
          ------------------------------------------------------------------------ */}
      <div className={`admin-live-shipments-card ${isCardCollapsed ? 'collapsed' : ''}`}>
        <div className="admin-live-shipments-header">
          <div className="admin-live-title-row">
            <span className="admin-live-shipments-title">Live Shipments</span>
            <span className="admin-live-pill">
              <span className="live-dot" />
              <span>Live</span>
            </span>
          </div>

          {/* Minimize / Maximize Toggle */}
          <button
            type="button"
            className="admin-live-card-toggle"
            onClick={() => setIsCardCollapsed(!isCardCollapsed)}
            title={isCardCollapsed ? 'Expand Live Shipments Card' : 'Minimize Card'}
          >
            {isCardCollapsed ? <Maximize2 size={13} /> : <Minimize2 size={13} />}
          </button>
        </div>

        {/* Card Body */}
        {!isCardCollapsed && (
          <>
            <div className="admin-live-count-wrap">
              <span className="admin-live-number">64</span>
              <div className="admin-live-stats-sub">
                <span className="admin-live-sub">In Transit</span>
                <span className="admin-live-breakdown">48 Sea • 16 Air</span>
              </div>
            </div>

            {/* Cargo vessel photo */}
            <div className="admin-live-ship-photo-wrap">
              <img
                src="/assets/admin/hero-shipping.jpg"
                alt="Active Container Vessel"
                className="admin-live-ship-photo"
              />
              <div className="admin-live-photo-overlay">
                <span className="transponder-code">AIS: MSC-ADRIATIC</span>
              </div>
            </div>

            {/* View Full Map button */}
            <button
              type="button"
              className="admin-view-fullmap-btn"
              onClick={onViewFullMap}
            >
              <span>View Full Map</span>
              <ArrowRight size={14} />
            </button>
          </>
        )}

        {isCardCollapsed && (
          <div className="admin-live-collapsed-row" onClick={() => setIsCardCollapsed(false)}>
            <span className="collapsed-num">64</span>
            <span className="collapsed-txt">Active In Transit</span>
            <ChevronRight size={13} />
          </div>
        )}
      </div>
    </div>
  );
};
