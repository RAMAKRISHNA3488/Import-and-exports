import React, { useState, useId } from 'react';
import { WorldMapPaths } from './WorldMapPaths.js';

export interface TradeHub {
  id: string;
  name: string;
  country: string;
  role: string;
  commodity: string;
  x: number;
  y: number;
  routes: string[];
}

export const TRADE_HUBS: TradeHub[] = [
  {
    id: 'mumbai',
    name: 'Mumbai',
    country: 'India',
    role: 'Global Headquarters & Agro Sourcing Hub',
    commodity: 'Grains, Spices, Agro-Commodities & Minerals',
    x: 588,
    y: 478,
    routes: ['mumbai-dubai', 'mumbai-singapore', 'mumbai-shanghai'],
  },
  {
    id: 'dubai',
    name: 'Dubai',
    country: 'UAE',
    role: 'Transshipment Gateway & JAFZA Logistics',
    commodity: 'Petrochemicals, Metals, Re-Export Corridors',
    x: 534,
    y: 467,
    routes: ['mumbai-dubai', 'dubai-rotterdam', 'dubai-durban'],
  },
  {
    id: 'rotterdam',
    name: 'Rotterdam',
    country: 'Netherlands',
    role: 'European Central Distribution Hub',
    commodity: 'EU Customs Cleared Container & Bulk Freight',
    x: 418,
    y: 389,
    routes: ['dubai-rotterdam', 'rotterdam-houston', 'rotterdam-durban', 'rotterdam-london'],
  },
  {
    id: 'london',
    name: 'London',
    country: 'United Kingdom',
    role: 'European Commercial & Trade Finance Desk',
    commodity: 'Trade Documentation, Commodity Contracts',
    x: 405,
    y: 385,
    routes: ['rotterdam-london'],
  },
  {
    id: 'houston',
    name: 'Houston',
    country: 'United States',
    role: 'North American Trade Desk & Logistics',
    commodity: 'Energy Products, Polymers & Raw Materials',
    x: 200,
    y: 450,
    routes: ['rotterdam-houston', 'houston-santos'],
  },
  {
    id: 'santos',
    name: 'Santos',
    country: 'Brazil',
    role: 'South American Agro-Commodity Desk',
    commodity: 'Soybeans, Sugar, Specialty Coffee, Feed',
    x: 290,
    y: 595,
    routes: ['houston-santos'],
  },
  {
    id: 'durban',
    name: 'Durban',
    country: 'South Africa',
    role: 'African Maritime Corridor & Port Gateway',
    commodity: 'Minerals, Agro-Products & Maritime Logistics',
    x: 478,
    y: 608,
    routes: ['dubai-durban', 'rotterdam-durban'],
  },
  {
    id: 'singapore',
    name: 'Singapore',
    country: 'Singapore',
    role: 'ASEAN Maritime Logistics & Bunker Gateway',
    commodity: 'Intermodal Dispatch, Edible Oils, Electronics',
    x: 659,
    y: 527,
    routes: ['mumbai-singapore', 'singapore-sydney', 'singapore-shanghai'],
  },
  {
    id: 'shanghai',
    name: 'Shanghai',
    country: 'China',
    role: 'East Asian Manufacturing & Bulk Desk',
    commodity: 'Industrial Goods, Manufactured Commodities',
    x: 684,
    y: 438,
    routes: ['mumbai-shanghai', 'singapore-shanghai'],
  },
  {
    id: 'sydney',
    name: 'Sydney',
    country: 'Australia',
    role: 'Oceania Commercial & Distribution Desk',
    commodity: 'Agricultural Exports, Minerals, Cross-Trade',
    x: 752,
    y: 628,
    routes: ['singapore-sydney'],
  },
];

export interface TradeRoute {
  id: string;
  path: string;
  origin: string;
  dest: string;
  dur: string;
  delay: string;
}

export const TRADE_ROUTES: TradeRoute[] = [
  { id: 'mumbai-dubai', path: 'M 588 478 Q 561 465 534 467', origin: 'Mumbai', dest: 'Dubai', dur: '3.2s', delay: '0s' },
  { id: 'dubai-rotterdam', path: 'M 534 467 Q 470 410 418 389', origin: 'Dubai', dest: 'Rotterdam', dur: '4.5s', delay: '0.6s' },
  { id: 'rotterdam-houston', path: 'M 418 389 Q 305 380 200 450', origin: 'Rotterdam', dest: 'Houston', dur: '5.4s', delay: '1.2s' },
  { id: 'houston-santos', path: 'M 200 450 Q 260 510 290 595', origin: 'Houston', dest: 'Santos', dur: '4.8s', delay: '0.4s' },
  { id: 'mumbai-singapore', path: 'M 588 478 Q 625 510 659 527', origin: 'Mumbai', dest: 'Singapore', dur: '3.8s', delay: '0.8s' },
  { id: 'singapore-sydney', path: 'M 659 527 Q 715 570 752 628', origin: 'Singapore', dest: 'Sydney', dur: '4.6s', delay: '1.5s' },
  { id: 'dubai-durban', path: 'M 534 467 Q 525 545 478 608', origin: 'Dubai', dest: 'Durban', dur: '4.4s', delay: '0.3s' },
  { id: 'rotterdam-durban', path: 'M 418 389 Q 405 510 478 608', origin: 'Rotterdam', dest: 'Durban', dur: '6.0s', delay: '1.8s' },
  { id: 'mumbai-shanghai', path: 'M 588 478 Q 640 445 684 438', origin: 'Mumbai', dest: 'Shanghai', dur: '4.2s', delay: '1.0s' },
  { id: 'singapore-shanghai', path: 'M 659 527 Q 680 485 684 438', origin: 'Singapore', dest: 'Shanghai', dur: '3.4s', delay: '0.2s' },
  { id: 'rotterdam-london', path: 'M 418 389 Q 411 383 405 385', origin: 'Rotterdam', dest: 'London', dur: '2.5s', delay: '0.5s' },
];

export const AnimatedWorldMap: React.FC = () => {
  const [activeHub, setActiveHub] = useState<TradeHub | null>(null);
  const filterId = useId();

  return (
    <div className="animated-world-map-container" aria-label="Interactive Global Trade Corridors Map">
      {/* Active Strategic Hub Interactive Floating Card */}
      {activeHub && (
        <div className="map-hub-tooltip" role="status" aria-live="polite">
          <div className="map-hub-tooltip-header">
            <div className="map-hub-tooltip-badge">
              <span className="hub-pulse-dot" />
              <span>ACTIVE HUB</span>
            </div>
            <span className="map-hub-country">{activeHub.country}</span>
          </div>
          <div className="map-hub-title">{activeHub.name}</div>
          <div className="map-hub-role">{activeHub.role}</div>
          <div className="map-hub-commodity">
            <span className="commodity-label">Core Cargo:</span> {activeHub.commodity}
          </div>
          <div className="map-hub-status">
            <span className="status-indicator" />
            <span>24/7 Monitored • Verified Clearance</span>
          </div>
        </div>
      )}

      {/* SVG Canvas with authentic geographic contours, flowing trade corridors, and moving cargo packets */}
      <svg
        viewBox="55 255 745 435"
        className="about-world-map-svg"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Global Trade Network Visualization"
      >
        <defs>
          {/* Subtle continent shadow for depth */}
          <filter id={`mapShadow-${filterId}`} x="-5%" y="-5%" width="110%" height="110%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#0B1B3D" floodOpacity="0.06" />
          </filter>

          {/* Golden glow for routes */}
          <filter id={`goldGlow-${filterId}`} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Intense comet head glow */}
          <filter id={`packetGlow-${filterId}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur1" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="1.2" result="blur2" />
            <feMerge>
              <feMergeNode in="blur1" />
              <feMergeNode in="blur2" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Trade Route Linear Gradients */}
          <linearGradient id={`routeGoldGrad-${filterId}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#D49A36" stopOpacity="0.45" />
            <stop offset="50%" stopColor="#F6C358" stopOpacity="1" />
            <stop offset="100%" stopColor="#D49A36" stopOpacity="0.45" />
          </linearGradient>

          {/* Highlighted route gradient */}
          <linearGradient id={`routeActiveGrad-${filterId}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#D49A36" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#FFE082" stopOpacity="1" />
            <stop offset="100%" stopColor="#D49A36" stopOpacity="0.85" />
          </linearGradient>
        </defs>

        {/* 1. Navigational Graticules & Coordinates Grid */}
        <g className="map-graticules" stroke="#94A3B8" strokeWidth="0.5" strokeDasharray="3 4" opacity="0.25">
          {/* Latitude Lines */}
          <line x1="60" y1="330" x2="795" y2="330" />
          <line x1="60" y1="415" x2="795" y2="415" stroke="#D49A36" strokeOpacity="0.22" /> {/* Tropic of Cancer */}
          <line x1="60" y1="480" x2="795" y2="480" stroke="#0B1B3D" strokeOpacity="0.25" strokeWidth="0.7" /> {/* Equator */}
          <line x1="60" y1="545" x2="795" y2="545" stroke="#D49A36" strokeOpacity="0.22" /> {/* Tropic of Capricorn */}
          <line x1="60" y1="630" x2="795" y2="630" />

          {/* Longitude Lines */}
          <line x1="145" y1="265" x2="145" y2="675" /> {/* 120°W */}
          <line x1="275" y1="265" x2="275" y2="675" /> {/* 60°W */}
          <line x1="405" y1="265" x2="405" y2="675" stroke="#0B1B3D" strokeOpacity="0.25" strokeWidth="0.7" /> {/* Prime Meridian */}
          <line x1="535" y1="265" x2="535" y2="675" /> {/* 60°E */}
          <line x1="665" y1="265" x2="665" y2="675" /> {/* 120°E */}
        </g>

        {/* Subtle Coordinate Text Marks */}
        <g fill="#94A3B8" fontSize="7.5" fontFamily="var(--font-sans, monospace)" letterSpacing="0.06em" opacity="0.4">
          <text x="65" y="412">23.5°N</text>
          <text x="65" y="477">0° EQ</text>
          <text x="65" y="542">23.5°S</text>
          <text x="405" y="678" textAnchor="middle">0° MERIDIAN</text>
          <text x="535" y="678" textAnchor="middle">60°E</text>
          <text x="275" y="678" textAnchor="middle">60°W</text>
        </g>

        {/* 2. Authentic Geographic Vector Continents */}
        <g filter={`url(#mapShadow-${filterId})`}>
          <WorldMapPaths />
        </g>

        {/* 3. Dynamic Animated Trade Corridors (Curved Arcs with Traveling Glow) */}
        <g className="map-trade-corridors">
          {TRADE_ROUTES.map((route) => {
            const isCorridorActive =
              activeHub &&
              (activeHub.routes.includes(route.id) ||
                route.origin.toLowerCase() === activeHub.name.toLowerCase() ||
                route.dest.toLowerCase() === activeHub.name.toLowerCase());

            const isDimmed = activeHub && !isCorridorActive;

            return (
              <g
                key={route.id}
                className={`trade-route-group ${isCorridorActive ? 'route-active' : ''} ${isDimmed ? 'route-dimmed' : ''}`}
              >
                {/* Outer route path with golden dash animation */}
                <path
                  d={route.path}
                  fill="none"
                  stroke={`url(#${isCorridorActive ? `routeActiveGrad-${filterId}` : `routeGoldGrad-${filterId}`})`}
                  strokeWidth={isCorridorActive ? '3.4' : '2.2'}
                  strokeDasharray="6 4"
                  className="route-animated-dash"
                  filter={`url(#goldGlow-${filterId})`}
                  opacity={isDimmed ? 0.2 : isCorridorActive ? 1 : 0.85}
                />

                {/* Traveling Cargo Light Comet (simulating live maritime/air dispatch) */}
                <circle
                  r={isCorridorActive ? '4.0' : '3.0'}
                  fill={isCorridorActive ? '#FFFFFF' : '#FFE082'}
                  stroke="#D49A36"
                  strokeWidth="1.2"
                  filter={`url(#packetGlow-${filterId})`}
                  opacity={isDimmed ? 0.25 : 1}
                >
                  <animateMotion
                    path={route.path}
                    dur={route.dur}
                    begin={route.delay}
                    repeatCount="indefinite"
                  />
                </circle>

                {/* Secondary trailing pulse */}
                <circle
                  r="1.8"
                  fill="#FFD269"
                  opacity={isDimmed ? 0.12 : 0.6}
                >
                  <animateMotion
                    path={route.path}
                    dur={route.dur}
                    begin={`calc(${route.delay} + 0.25s)`}
                    repeatCount="indefinite"
                  />
                </circle>
              </g>
            );
          })}
        </g>

        {/* 4. Strategic Global Trade Hubs (Pulsating Radar Rings & Node Centers) */}
        <g className="map-trade-hubs">
          {TRADE_HUBS.map((hub) => {
            const isSelected = activeHub?.id === hub.id;

            return (
              <g
                key={hub.id}
                className={`map-node-group ${isSelected ? 'node-selected' : ''}`}
                style={{ cursor: 'pointer' }}
                onMouseEnter={() => setActiveHub(hub)}
                onMouseLeave={() => setActiveHub(null)}
                onClick={() => setActiveHub(isSelected ? null : hub)}
                role="button"
                tabIndex={0}
                aria-label={`Trade Hub: ${hub.name}, ${hub.country}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setActiveHub(isSelected ? null : hub);
                  }
                }}
              >
                {/* Sleek Ambient Beacon Halo */}
                <circle
                  cx={hub.x}
                  cy={hub.y}
                  r={isSelected ? '11' : '8'}
                  fill="rgba(212, 154, 54, 0.18)"
                  stroke="rgba(212, 154, 54, 0.55)"
                  strokeWidth="0.9"
                  className="hub-beacon-aura"
                />

                {/* Solid Hub Center */}
                <circle
                  cx={hub.x}
                  cy={hub.y}
                  r={isSelected ? '4.8' : '3.8'}
                  fill="#0B1B3D"
                  stroke="#D49A36"
                  strokeWidth={isSelected ? '2.2' : '1.8'}
                />

                {/* Inner Core */}
                <circle
                  cx={hub.x}
                  cy={hub.y}
                  r="1.8"
                  fill="#FFFFFF"
                />

                {/* City Label with high-contrast cartographic white halo outline */}
                <text
                  x={hub.x}
                  y={hub.y - 12}
                  textAnchor="middle"
                  className="map-city-label"
                  fill="#071A35"
                  stroke="#FFFFFF"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                  paintOrder="stroke fill"
                  fontSize={isSelected ? '11.5' : '10'}
                  fontWeight={isSelected ? '800' : '750'}
                  fontFamily="var(--font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif)"
                  letterSpacing="0.02em"
                >
                  {hub.name}
                </text>
              </g>
            );
          })}
        </g>
      </svg>

      {/* Map Control / Legend Bar - Clean & Integrated without borders */}
      <div className="map-bottom-legend" aria-hidden="true">
        <div className="legend-item">
          <span className="legend-dot-gold" />
          <span>Active Trade Corridors</span>
        </div>
        <div className="legend-item">
          <span className="legend-node-dot" />
          <span>Regional Trade Desks</span>
        </div>
        <div className="legend-item">
          <span className="legend-packet-comet" />
          <span>Live Cargo Tracking</span>
        </div>
      </div>
    </div>
  );
};
