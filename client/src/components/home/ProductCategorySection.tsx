import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useScrollReveal } from '../../hooks/useScrollReveal.js';
import {
  Wheat,
  Boxes,
  UtensilsCrossed,
  Layers,
  Cog,
  Flame,
  CheckCircle2,
} from 'lucide-react';

interface Sector {
  id: string;
  name: string;
  slug: string;
  colorClass: string;
  badge: string;
  description: string;
  pills: string[];
  image: string;
  icon: React.ReactNode;
}

export const PremiumArrowIcon: React.FC<{ size?: number; className?: string }> = ({
  size = 16,
  className = '',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={`premium-arrow-icon ${className}`}
    aria-hidden="true"
  >
    <path
      d="M3.5 12H19.5"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
    <path
      d="M13.5 6L19.5 12L13.5 18"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const PremiumExecutiveGlobeIcon: React.FC<{ size?: number; className?: string }> = ({
  size = 20,
  className = '',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`premium-executive-globe-icon ${className}`}
    aria-hidden="true"
  >
    {/* Clean Golden Globe Outer Perimeter */}
    <circle
      cx="12"
      cy="12"
      r="9"
      stroke="#ECC885"
      strokeWidth="1.8"
      strokeLinecap="round"
      fill="rgba(212, 154, 54, 0.08)"
    />
    {/* Equator Line */}
    <line
      x1="3.2"
      y1="12"
      x2="20.8"
      y2="12"
      stroke="#ECC885"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
    {/* Center Prime Meridian Ellipse */}
    <ellipse
      cx="12"
      cy="12"
      rx="4.2"
      ry="9"
      stroke="#ECC885"
      strokeWidth="1.6"
      fill="none"
    />
    {/* Upper Latitudinal Arc */}
    <path
      d="M5.5 7.5C7.8 8.8 16.2 8.8 18.5 7.5"
      stroke="#ECC885"
      strokeWidth="1.4"
      strokeLinecap="round"
      fill="none"
    />
    {/* Lower Latitudinal Arc */}
    <path
      d="M5.5 16.5C7.8 15.2 16.2 15.2 18.5 16.5"
      stroke="#ECC885"
      strokeWidth="1.4"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

export const PremiumExecutiveShieldIcon: React.FC<{ size?: number; className?: string }> = ({
  size = 18,
  className = '',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`premium-executive-shield-icon ${className}`}
    aria-hidden="true"
  >
    {/* Shield Outer Silhouette matching Image 3 Reference */}
    <path
      d="M12 3L19 6V11.5C19 16.2 16 20.2 12 21.5C8 20.2 5 16.2 5 11.5V6L12 3Z"
      stroke="#ECC885"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="rgba(212, 154, 54, 0.1)"
    />
    {/* Verified Checkmark */}
    <path
      d="M9 12L11.2 14.2L15.5 9.8"
      stroke="#ECC885"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Backward-compatible exports
export const GlobalTradeEmblemIcon = PremiumExecutiveGlobeIcon;
export const CommercialDeskEmblemIcon = PremiumExecutiveShieldIcon;

const PRODUCT_SECTORS: Sector[] = [
  {
    id: 'sector-agriculture',
    name: 'Agriculture',
    slug: 'agriculture',
    colorClass: 'sector-agri',
    badge: 'Origin Sourced • Grade A',
    description: 'Export-grade grains, wheat crops, fresh produce, and bulk agro-commodities sourced directly from verified primary farming collectives.',
    pills: ['Grains', 'Wheat Crops', 'Fresh Produce'],
    image: '/assets/sectors/agriculture.jpg',
    icon: <Wheat size={18} strokeWidth={2.2} />,
  },
  {
    id: 'sector-industrial-materials',
    name: 'Industrial Materials',
    slug: 'industrial-materials',
    colorClass: 'sector-industrial',
    badge: 'Mill Certified • ISO 9001',
    description: 'High-tensile rolled steel coils, stainless piping, structural metals, and bulk manufacturing inputs for global industrial supply chains.',
    pills: ['Steel Coils', 'Metal Tubing', 'Bulk Inputs'],
    image: '/assets/sectors/industrial-materials.jpg',
    icon: <Boxes size={18} strokeWidth={2.2} />,
  },
  {
    id: 'sector-food-commodities',
    name: 'Food Commodities',
    slug: 'food-commodities',
    colorClass: 'sector-food',
    badge: 'HACCP & FSSAI Compliant',
    description: 'Authentic whole and ground spices, export-grade pulses, culinary oils, and packaged wholesale foodstuffs meeting international grading standards.',
    pills: ['Whole Spices', 'Pulses & Lentils', 'Culinary Oils'],
    image: '/assets/sectors/food-commodities.jpg',
    icon: <UtensilsCrossed size={18} strokeWidth={2.2} />,
  },
  {
    id: 'sector-textiles-apparel',
    name: 'Textiles & Apparel',
    slug: 'textiles-and-apparel',
    colorClass: 'sector-textiles',
    badge: 'OEKO-TEX Certified',
    description: 'Premium woven textiles, bulk fabric rolls, fine linens, and commercial garment materials tailored for international apparel markets.',
    pills: ['Woven Fabrics', 'Fine Linens', 'Commercial Garments'],
    image: '/assets/sectors/textiles-apparel.jpg',
    icon: <Layers size={18} strokeWidth={2.2} />,
  },
  {
    id: 'sector-machinery-equipment',
    name: 'Machinery & Equipment',
    slug: 'machinery-and-equipment',
    colorClass: 'sector-machinery',
    badge: 'CE Marked • Precision QA',
    description: 'Precision mechanical components, industrial gear assemblies, factory processing machinery, and certified engineering hardware.',
    pills: ['Plant Machinery', 'Precision Gears', 'Industrial Tooling'],
    image: '/assets/sectors/machinery-equipment.jpg',
    icon: <Cog size={18} strokeWidth={2.2} />,
  },
  {
    id: 'sector-energy-products',
    name: 'Energy Products',
    slug: 'energy-products',
    colorClass: 'sector-energy',
    badge: 'ASTM Standards Compliant',
    description: 'Petroleum commodities, refined fuels, industrial lubricants, and petrochemical solutions for international trade and industrial energy.',
    pills: ['Refined Fuels', 'Petrochemicals', 'Industrial Lubricants'],
    image: '/assets/sectors/energy-products.jpg',
    icon: <Flame size={18} strokeWidth={2.2} />,
  },
];

export const ProductCategorySection: React.FC = () => {
  const navigate = useNavigate();
  const { ref: sectionRef, isRevealed } = useScrollReveal<HTMLElement>({
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px',
  });

  return (
    <section
      ref={sectionRef}
      id="key-product-sectors"
      className={`home-sectors-section sectors-scroll-reveal ${isRevealed ? 'sectors-in-view' : ''}`}
      aria-labelledby="sectors-heading"
    >
      <div className="home-sectors-container">
        {/* Section Heading: Authoritative Luxury Editorial */}
        <div className="home-sectors-header">
          <div className="home-sectors-header-left">
            <div className="home-sectors-eyebrow">
              <span className="home-sectors-eyebrow-pill">
                <span>KEY PRODUCT SECTORS</span>
              </span>
            </div>
            <h2 id="sectors-heading" className="home-sectors-title">
              Powering Global Trade <span className="home-sectors-title-gold">Across Key Industries</span>
            </h2>
            <p className="home-sectors-desc">
              We source and supply high-quality commodities across diverse sectors, ensuring strict specification compliance, reliable logistics, and long-term bilateral trade partnerships.
            </p>
          </div>

          <div className="home-sectors-header-right">
            <div className="home-sectors-header-badge">
              <div className="sectors-badge-icon-wrap" aria-hidden="true">
                <GlobalTradeEmblemIcon size={20} />
              </div>
              <div className="sectors-badge-info">
                <div className="home-sectors-header-badge-title">
                  <span className="sectors-badge-count-pill">6</span>
                  <span>Global Trade Sectors</span>
                </div>
                <div className="home-sectors-header-badge-sub">
                  <span className="sectors-badge-live-pulse" aria-hidden="true">
                    <span className="pulse-ping" />
                    <span className="pulse-dot" />
                  </span>
                  <span>Direct Origin Sourcing</span>
                  <span className="sectors-badge-sub-divider">•</span>
                  <span className="sectors-badge-sub-highlight">Verified QA</span>
                </div>
              </div>
            </div>
            <Link to="/products" className="home-sectors-cta-btn">
              <span>View All Products</span>
              <PremiumArrowIcon size={17} className="cta-btn-arrow" />
            </Link>
          </div>
        </div>

        {/* 6 Sector Cards in Symmetrical 3x2 Grid */}
        <div className="home-sectors-grid" role="region" aria-label="Product Sectors">
          {PRODUCT_SECTORS.map((sector, idx) => (
            <div
              key={sector.id}
              className={`home-sector-card ${sector.colorClass}`}
              style={{ '--card-index': idx } as React.CSSProperties}
              onClick={() => navigate(`/products?category=${sector.slug}`)}
              role="button"
              tabIndex={0}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  navigate(`/products?category=${sector.slug}`);
                }
              }}
              aria-label={`Explore ${sector.name} sector`}
            >
              <div className="home-sector-image-wrap">
                <img
                  src={sector.image}
                  alt={sector.name}
                  className="home-sector-image"
                  loading="lazy"
                  onError={e => {
                    (e.target as HTMLImageElement).src = '/assets/categories/other-products.jpg';
                  }}
                />
                <div className="home-sector-image-scrim" />
                <div className="home-sector-trade-badge">
                  <CheckCircle2 size={11} strokeWidth={2.5} />
                  <span>{sector.badge}</span>
                </div>
              </div>

              <div className="home-sector-body">
                <div className="home-sector-top-row">
                  <div className={`home-sector-icon-wrap ${sector.colorClass}`} aria-hidden="true">
                    {sector.icon}
                  </div>
                  <h3 className="home-sector-name">{sector.name}</h3>
                </div>

                <p className="home-sector-desc">{sector.description}</p>

                <div className="home-sector-footer">
                  <div className="home-sector-pills" aria-label="Key commodities">
                    {sector.pills.map((pill, pIdx) => (
                      <span key={pIdx} className="home-sector-pill">
                        {pill}
                      </span>
                    ))}
                  </div>
                  <span className="home-sector-explore">
                    <span>Explore</span>
                    <PremiumArrowIcon size={15} className="sector-explore-arrow" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Institutional Commercial Inquiry Bar */}
        <div className="home-sectors-bottom-bar">
          <div className="home-sectors-bottom-info">
            <div className="home-sectors-bottom-badge-box">
              <CommercialDeskEmblemIcon size={17} />
              <span>Commercial Trade Desk</span>
            </div>
            <span className="home-sectors-bottom-text">
              Looking for custom commodity grades, private-label packaging, or bulk vessel shipping schedules?
            </span>
          </div>
          <Link to="/contact" className="home-sectors-bottom-link">
            <span>Enquire with Trade Desk</span>
            <PremiumArrowIcon size={15} className="bottom-bar-arrow" />
          </Link>
        </div>
      </div>
    </section>
  );
};

