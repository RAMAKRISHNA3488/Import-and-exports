import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useScrollReveal } from '../../hooks/useScrollReveal.js';
import {
  Ship,
  Globe,
  PackageSearch,
  Users,
  Handshake,
  FileCheck,
  CheckCircle2,
} from 'lucide-react';
import {
  GlobalTradeEmblemIcon,
  CommercialDeskEmblemIcon,
  PremiumArrowIcon,
} from './ProductCategorySection';

interface ServicesOverviewProps {
  onRequestQuote: (serviceName?: string) => void;
}

interface TradeService {
  id: string;
  name: string;
  colorClass: string;
  badge: string;
  description: string;
  pills: string[];
  image: string;
  icon: React.ReactNode;
}

const SERVICES_DATA: TradeService[] = [
  {
    id: 'import-solutions',
    name: 'Import Solutions',
    colorClass: 'sector-machinery',
    badge: 'Port Cleared • Inbound Ready',
    description:
      'End-to-end commercial import management, inbound customs clearance, port drayage, and structured domestic distribution networks.',
    pills: ['Customs Clearance', 'Port Drayage', 'Domestic Delivery'],
    image: '/assets/services/import-solutions.jpg',
    icon: <Ship size={18} strokeWidth={2.2} />,
  },
  {
    id: 'export-solutions',
    name: 'Export Solutions',
    colorClass: 'sector-industrial',
    badge: 'Tier-1 Carrier • Multimodal Ocean',
    description:
      'Structured cross-border export execution, international trade compliance, container freight chartering, and foreign port delivery.',
    pills: ['Global Dispatch', 'Vessel Booking', 'Port Delivery'],
    image: '/assets/services/export-solutions.jpg',
    icon: <Globe size={18} strokeWidth={2.2} />,
  },
  {
    id: 'product-sourcing',
    name: 'Product Sourcing',
    colorClass: 'sector-agri',
    badge: 'Direct Farmgate • Mill Audited',
    description:
      'Direct origin procurement from verified agricultural collectives, primary processing mills, and certified production facilities.',
    pills: ['Direct Origin', 'Factory Vetting', 'Quality Grading'],
    image: '/assets/services/product-sourcing.jpg',
    icon: <PackageSearch size={18} strokeWidth={2.2} />,
  },
  {
    id: 'supplier-coordination',
    name: 'Supplier Coordination',
    colorClass: 'sector-energy',
    badge: 'Production QA • Milestone Tracking',
    description:
      'Comprehensive supplier evaluation, production milestone tracking, quality control audits, and export packaging compliance.',
    pills: ['Production QA', 'Factory Audits', 'Packaging Compliance'],
    image: '/assets/services/supplier-coordination.jpg',
    icon: <Users size={18} strokeWidth={2.2} />,
  },
  {
    id: 'buyer-coordination',
    name: 'Buyer Coordination',
    colorClass: 'sector-textiles',
    badge: 'INCOTERMS 2020 • Buyer Aligned',
    description:
      'International buyer specifications management, commercial sales terms, sample inspections, and order milestone tracking.',
    pills: ['Buyer Specs', 'Contract Terms', 'Order Tracking'],
    image: '/assets/services/buyer-coordination.jpg',
    icon: <Handshake size={18} strokeWidth={2.2} />,
  },
  {
    id: 'documentation-support',
    name: 'Documentation Support',
    colorClass: 'sector-food',
    badge: 'Zero-Discrepancy • Phyto & LC',
    description:
      'Full handling of Bills of Lading, Certificates of Origin, phytosanitary certificates, commercial invoices, and customs filings.',
    pills: ['Bills of Lading', 'Cert of Origin', 'Phyto Compliance'],
    image: '/assets/services/documentation-support.jpg',
    icon: <FileCheck size={18} strokeWidth={2.2} />,
  },
];

export const ServicesOverview: React.FC<ServicesOverviewProps> = ({ onRequestQuote }) => {
  const navigate = useNavigate();
  const { ref: sectionRef, isRevealed } = useScrollReveal<HTMLElement>({
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px',
  });

  return (
    <section
      ref={sectionRef}
      id="trade-services"
      className={`home-sectors-section sectors-scroll-reveal ${isRevealed ? 'sectors-in-view' : ''}`}
      aria-labelledby="services-heading"
      style={{
        background: 'linear-gradient(180deg, #F8FAFC 0%, #FFFFFF 50%, #F8FAFC 100%)',
        borderTop: '1px solid rgba(11, 27, 61, 0.06)',
        borderBottom: '1px solid rgba(11, 27, 61, 0.06)',
        minHeight: 'auto',
      }}
    >
      <div className="home-sectors-container">
        {/* Section Heading: Symmetrical & Authoritative Luxury Editorial matching Products section */}
        <div className="home-sectors-header">
          <div className="home-sectors-header-left">
            <div className="home-sectors-eyebrow">
              <span className="home-sectors-eyebrow-pill">
                <span>GLOBAL TRADE CAPABILITIES</span>
              </span>
            </div>
            <h2 id="services-heading" className="home-sectors-title">
              Our Import &amp; Export <span className="home-sectors-title-gold">Trade Services</span>
            </h2>
            <p className="home-sectors-desc">
              Comprehensive trade solutions designed to simplify sourcing, coordination and international delivery.
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
                  <span>Core Trade Solutions</span>
                </div>
                <div className="home-sectors-header-badge-sub">
                  <span className="sectors-badge-live-pulse" aria-hidden="true">
                    <span className="pulse-ping" />
                    <span className="pulse-dot" />
                  </span>
                  <span>End-to-End Execution</span>
                  <span className="sectors-badge-sub-divider">•</span>
                  <span className="sectors-badge-sub-highlight">Global Freight</span>
                </div>
              </div>
            </div>
            <Link to="/services" className="home-sectors-cta-btn">
              <span>Explore All Services</span>
              <PremiumArrowIcon size={17} className="cta-btn-arrow" />
            </Link>
          </div>
        </div>

        {/* 6 Service Cards in Symmetrical 3x2 Grid matching Products section */}
        <div className="home-sectors-grid" role="region" aria-label="Trade Services Showcase">
          {SERVICES_DATA.map((service, idx) => (
            <div
              key={service.id}
              className={`home-sector-card ${service.colorClass}`}
              style={{ '--card-index': idx } as React.CSSProperties}
              onClick={() => navigate(`/services/${service.id}`)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  navigate(`/services/${service.id}`);
                }
              }}
              aria-label={`Explore ${service.name} service`}
            >
              <div className="home-sector-image-wrap">
                <img
                  src={service.image}
                  alt={service.name}
                  className="home-sector-image"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/assets/categories/other-products.jpg';
                  }}
                />
                <div className="home-sector-image-scrim" />
                <div className="home-sector-trade-badge">
                  <CheckCircle2 size={11} strokeWidth={2.5} />
                  <span>{service.badge}</span>
                </div>
              </div>

              <div className="home-sector-body">
                <div className="home-sector-top-row">
                  <div className={`home-sector-icon-wrap ${service.colorClass}`} aria-hidden="true">
                    {service.icon}
                  </div>
                  <h3 className="home-sector-name">{service.name}</h3>
                </div>

                <p className="home-sector-desc">{service.description}</p>

                <div className="home-sector-footer">
                  <div className="home-sector-pills" aria-label="Key capabilities">
                    {service.pills.map((pill, pIdx) => (
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

        {/* Bottom Institutional Commercial Inquiry Bar matching Products section */}
        <div className="home-sectors-bottom-bar">
          <div className="home-sectors-bottom-info">
            <div className="home-sectors-bottom-badge-box">
              <CommercialDeskEmblemIcon size={17} />
              <span>Commercial Operations</span>
            </div>
            <span className="home-sectors-bottom-text">
              Need custom container loading, structured letters of credit, or dedicated port logistics?
            </span>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onRequestQuote('Custom Commercial Trade Solutions');
            }}
            className="home-sectors-bottom-link"
            style={{ cursor: 'pointer', border: 'none' }}
          >
            <span>Consult Trade Specialists</span>
            <PremiumArrowIcon size={15} className="bottom-bar-arrow" />
          </button>
        </div>
      </div>
    </section>
  );
};
