import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { PremiumArrowIcon } from './ProductCategorySection.js';
import { useScrollReveal } from '../../hooks/useScrollReveal.js';

interface RfqCtaProps {
  onRequestQuote: () => void;
  title?: string;
  description?: string;
}

export const RfqCta: React.FC<RfqCtaProps> = ({
  onRequestQuote,
  title = 'Expand Your Cross-Border Horizons',
  description = 'Whether you need dedicated container chartering, seamless customs documentation, or reliable agricultural sourcing, our global trade specialists are ready to structure your trade route.',
}) => {
  const { ref: sectionRef, isRevealed } = useScrollReveal<HTMLElement>({
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px',
  });

  return (
    <section
      ref={sectionRef}
      className={`home-rfq-section rfq-scroll-reveal ${isRevealed ? 'rfq-in-view' : ''}`}
      aria-labelledby="rfq-cta-heading"
    >
      <div className="home-sectors-container">
        <div className="home-rfq-card">
          {/* Left Column: Eyebrow, Heading, Narrative & Trust Chips */}
          <div className="home-rfq-left">
            <div className="home-rfq-eyebrow-pill">
              <Compass size={13} className="rfq-compass-icon" aria-hidden="true" />
              <span>Global Trade Desks &amp; Route Logistics</span>
            </div>

            <h2 id="rfq-cta-heading" className="home-rfq-card-title">
              {title === 'Expand Your Cross-Border Horizons' ? (
                <>
                  Expand Your Cross-Border <span className="home-rfq-title-gold">Horizons.</span>
                </>
              ) : (
                title
              )}
            </h2>

            <p className="home-rfq-card-desc">
              {description}
            </p>

            <div className="home-rfq-trust-chips">
              <span className="rfq-trust-chip">
                <ShieldCheck size={13} className="rfq-chip-icon" aria-hidden="true" />
                <span>24h Quote Turnaround</span>
              </span>
              <span className="rfq-trust-chip">
                <CheckCircle2 size={13} className="rfq-chip-icon" aria-hidden="true" />
                <span>Full INCOTERMS® 2020</span>
              </span>
              <span className="rfq-trust-chip">
                <span className="rfq-pulse-dot" aria-hidden="true" />
                <span>Direct Port Logistics</span>
              </span>
            </div>
          </div>

          {/* Right Column: Dual Action Buttons with Premium Arrow Animations */}
          <div className="home-rfq-actions-group">
            <button
              type="button"
              onClick={onRequestQuote}
              className="home-rfq-btn-gold"
              aria-label="Request route quotation"
            >
              <span>Request Route Quotation</span>
              <PremiumArrowIcon size={17} className="rfq-cta-arrow" />
            </button>

            <Link
              to="/contact"
              className="home-rfq-btn-outline"
              aria-label="Contact ConceptExim trade desk"
            >
              <span>Contact Trade Desk</span>
              <ArrowRight size={15} className="rfq-outline-arrow" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
