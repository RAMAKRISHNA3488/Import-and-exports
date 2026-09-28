import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Globe, Ship, CheckCircle2 } from 'lucide-react';
import { PremiumArrowIcon } from './ProductCategorySection.js';
import { useScrollReveal } from '../../hooks/useScrollReveal.js';

export const AboutPreview: React.FC = () => {
  const { ref: sectionRef, isRevealed } = useScrollReveal<HTMLElement>({
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px',
  });

  return (
    <section
      ref={sectionRef}
      className={`home-about-section about-scroll-reveal ${isRevealed ? 'about-in-view' : ''}`}
      aria-labelledby="about-heading"
    >
      <div className="home-about-container">
        <div className="home-about-grid">
          {/* Left Column: Corporate Visual + Down Section Credential HUD */}
          <div className="home-about-media">
            <div className="home-about-img-frame">
              <img
                src="/assets/about-corporate.jpg"
                alt="ConceptExim global trade corporate headquarters and operations facility"
                className="home-about-img"
                loading="lazy"
              />
              <div className="home-about-img-scrim" />

              {/* Floating Top-Right Accreditation Pill */}
              <div className="home-about-floating-pill" aria-hidden="true">
                <span className="floating-pill-dot" />
                <span>ISO 9001:2015 &amp; INCOTERMS 2020 Aligned</span>
              </div>
            </div>

            {/* Down Section: Executive Credential HUD Card */}
            <div className="home-about-badge">
              <div className="home-about-badge-header">
                <div className="home-about-badge-header-left">
                  <div className="home-about-badge-icon-wrap" aria-hidden="true">
                    <ShieldCheck size={19} className="home-about-badge-icon" />
                  </div>
                  <div className="home-about-badge-title-box">
                    <div className="home-about-badge-status">
                      <span className="live-status-dot" aria-hidden="true" />
                      <span className="live-status-text">Verified Trade Operator</span>
                    </div>
                    <span className="home-about-badge-title">ConceptExim Trade Headquarters</span>
                  </div>
                </div>

                <div className="home-about-badge-network-tag" aria-hidden="true">
                  <Globe size={13} />
                  <span>Tier-1 Global Network</span>
                </div>
              </div>

              <div className="home-about-badge-stats">
                <div className="home-about-badge-stat-card">
                  <span className="badge-stat-num">150+</span>
                  <span className="badge-stat-title">Global Ports</span>
                  <span className="badge-stat-sub">Worldwide Logistics</span>
                </div>

                <div className="home-about-badge-stat-card">
                  <span className="badge-stat-num">100%</span>
                  <span className="badge-stat-title">Origin Verified</span>
                  <span className="badge-stat-sub">Batch QA Assays</span>
                </div>

                <div className="home-about-badge-stat-card">
                  <span className="badge-stat-num">99.8%</span>
                  <span className="badge-stat-title">On-Time Delivery</span>
                  <span className="badge-stat-sub">Zero Demurrage Risk</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Corporate Profile Narrative, Stats, Capabilities & CTA */}
          <div className="home-about-content">
            <div className="home-about-eyebrow">
              <span className="home-about-eyebrow-pill">
                <span>CORPORATE PROFILE</span>
              </span>
            </div>

            <h2 id="about-heading" className="home-about-title">
              About ConceptExim <span className="home-about-title-gold">Global Trade Authority</span>
            </h2>

            <p className="home-about-lead">
              ConceptExim is a trusted international trade partner facilitating global import and export operations across
              diverse commodity sectors. We bridge verified primary producers with international buyers through dependable
              supply chain execution, commercial integrity, and rigorous quality standards.
            </p>

            {/* Fast Executive Credibility Stats Bar */}
            <div className="home-about-stats-bar" aria-label="Key Company Statistics">
              <div className="home-about-stat-col">
                <span className="about-stat-number">15+</span>
                <span className="about-stat-label">Years Heritage</span>
              </div>
              <div className="about-stat-line" aria-hidden="true" />
              <div className="home-about-stat-col">
                <span className="about-stat-number">150+</span>
                <span className="about-stat-label">Global Markets</span>
              </div>
              <div className="about-stat-line" aria-hidden="true" />
              <div className="home-about-stat-col">
                <span className="about-stat-number">2,500+</span>
                <span className="about-stat-label">Shipments Handled</span>
              </div>
              <div className="about-stat-line" aria-hidden="true" />
              <div className="home-about-stat-col">
                <span className="about-stat-number">100%</span>
                <span className="about-stat-label">Audit Compliance</span>
              </div>
            </div>

            {/* 3 Institutional Capability Blocks with Vibrant Jewel Badges */}
            <div className="home-about-capabilities" role="list">
              <div className="home-about-cap-card cap-theme-emerald" role="listitem">
                <div className="home-about-cap-icon-wrap" aria-hidden="true">
                  <Globe size={18} strokeWidth={2.2} />
                </div>
                <div className="home-about-cap-text">
                  <div className="home-about-cap-header">
                    <h3 className="home-about-cap-title">Direct Origin Sourcing</h3>
                    <span className="home-about-cap-tag">Primary Origin</span>
                  </div>
                  <p className="home-about-cap-desc">
                    Procuring high-grade commodities directly from verified farming collectives, primary mills, and certified production sources.
                  </p>
                </div>
              </div>

              <div className="home-about-cap-card cap-theme-indigo" role="listitem">
                <div className="home-about-cap-icon-wrap" aria-hidden="true">
                  <ShieldCheck size={18} strokeWidth={2.2} />
                </div>
                <div className="home-about-cap-text">
                  <div className="home-about-cap-header">
                    <h3 className="home-about-cap-title">Rigorous Quality &amp; Compliance</h3>
                    <span className="home-about-cap-tag">Verified QA</span>
                  </div>
                  <p className="home-about-cap-desc">
                    Enforcing systematic pre-shipment inspections, international grading standards, laboratory testing protocols, and trade certification.
                  </p>
                </div>
              </div>

              <div className="home-about-cap-card cap-theme-amber" role="listitem">
                <div className="home-about-cap-icon-wrap" aria-hidden="true">
                  <Ship size={18} strokeWidth={2.2} />
                </div>
                <div className="home-about-cap-text">
                  <div className="home-about-cap-header">
                    <h3 className="home-about-cap-title">End-to-End Trade Logistics</h3>
                    <span className="home-about-cap-tag">Global Freight</span>
                  </div>
                  <p className="home-about-cap-desc">
                    Managing multi-modal freight operations, export documentation, container loading, customs clearance, and global port delivery schedules.
                  </p>
                </div>
              </div>
            </div>

            {/* Premium CTA Actions */}
            <div className="home-about-actions">
              <Link to="/about" className="home-about-cta-btn">
                <span>Learn More About Us</span>
                <PremiumArrowIcon size={16} className="about-cta-arrow" />
              </Link>
              <Link to="/quality-compliance" className="home-about-secondary-btn">
                <CheckCircle2 size={16} />
                <span>Quality &amp; Compliance</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
