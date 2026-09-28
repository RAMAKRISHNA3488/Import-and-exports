import React, { useEffect, useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import {
  Globe,
  ShieldCheck,
  Users,
  ArrowRight,
  Play,
  X,
  Check,
  Compass,
  Eye,
  Heart,
  Award,
  Truck,
  Anchor,
  Building2,
  Ship,
} from 'lucide-react';
import { AnimatedWorldMap } from '../components/about/AnimatedWorldMap.js';

interface OutletContextType {
  openQuoteModal?: (productOrServiceName?: string) => void;
}

export const AboutPage: React.FC = () => {
  const outletContext = useOutletContext<OutletContextType>();
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [learnMoreModalOpen, setLearnMoreModalOpen] = useState(false);

  useEffect(() => {
    document.title = 'About ConceptExim — Building Global Possibilities';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'At ConceptExim, we connect reliable suppliers with global markets, delivering high-quality products and trusted international trade solutions across the world.'
      );
    }
  }, []);

  // Keyboard escape listener for modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setVideoModalOpen(false);
        setLearnMoreModalOpen(false);
      }
    };
    if (videoModalOpen || learnMoreModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [videoModalOpen, learnMoreModalOpen]);

  const handleOpenQuote = (subject: string = 'General Corporate Inquiry') => {
    if (outletContext?.openQuoteModal) {
      outletContext.openQuoteModal(subject);
    }
  };

  const scrollToStory = () => {
    const el = document.getElementById('story');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="about-page-wrapper">
      {/* ===================================================================
          2. ABOUT HERO SECTION
          =================================================================== */}
      <section className="about-hero-section" aria-label="About ConceptExim Hero">
        <div className="about-hero-overlay" aria-hidden="true" />
        <div className="about-hero-container">
          <div className="about-hero-content">
            <span className="about-hero-eyebrow">ABOUT US</span>
            <h1 className="about-hero-title">
              Building Global <br />
              <span className="about-hero-title-highlight">Possibilities</span>
            </h1>
            <p className="about-hero-desc">
              At ConceptExim, we connect reliable suppliers with global markets, delivering
              high-quality products and trusted trade solutions across the world.
            </p>
            <div className="about-hero-actions">
              <button
                type="button"
                onClick={scrollToStory}
                className="about-btn-story"
                aria-label="Navigate to company story"
              >
                <span>Our Story</span>
                <ArrowRight size={16} />
              </button>
              <Link to="/contact" className="about-btn-contact">
                <span>Contact Us</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          3. TRUST / BUSINESS HIGHLIGHTS BAR (Elevated Executive Card)
          =================================================================== */}
      <section className="about-highlights-section" aria-label="ConceptExim Key Highlights">
        <div className="container">
          <div className="about-highlights-card">
            {/* Highlight 1: Global Reach */}
            <div className="about-highlight-item">
              <div className="about-highlight-icon-wrap" aria-hidden="true">
                <Globe size={24} />
              </div>
              <div className="about-highlight-content">
                <div className="about-highlight-val-row">
                  <span className="about-highlight-val">45+</span>
                  <span className="about-highlight-title">Global Reach</span>
                </div>
                <span className="about-highlight-sub">Destination Countries Served</span>
              </div>
            </div>

            <div className="about-highlight-divider" aria-hidden="true" />

            {/* Highlight 2: Quality Assured */}
            <div className="about-highlight-item">
              <div className="about-highlight-icon-wrap" aria-hidden="true">
                <ShieldCheck size={24} />
              </div>
              <div className="about-highlight-content">
                <div className="about-highlight-val-row">
                  <span className="about-highlight-val">100%</span>
                  <span className="about-highlight-title">Quality Assured</span>
                </div>
                <span className="about-highlight-sub">SGS &amp; ISO 9001:2015 Standards</span>
              </div>
            </div>

            <div className="about-highlight-divider" aria-hidden="true" />

            {/* Highlight 3: Reliable Partnership */}
            <div className="about-highlight-item">
              <div className="about-highlight-icon-wrap" aria-hidden="true">
                <Users size={24} />
              </div>
              <div className="about-highlight-content">
                <div className="about-highlight-val-row">
                  <span className="about-highlight-val">Direct</span>
                  <span className="about-highlight-title">Reliable Partnership</span>
                </div>
                <span className="about-highlight-sub">Origin Producer &amp; Mill Ties</span>
              </div>
            </div>

            <div className="about-highlight-divider" aria-hidden="true" />

            {/* Highlight 4: Efficient Trade */}
            <div className="about-highlight-item">
              <div className="about-highlight-icon-wrap" aria-hidden="true">
                <Anchor size={24} />
              </div>
              <div className="about-highlight-content">
                <div className="about-highlight-val-row">
                  <span className="about-highlight-val">99.4%</span>
                  <span className="about-highlight-title">Efficient Trade</span>
                </div>
                <span className="about-highlight-sub">On-Time Vessel Execution</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          4. COMPANY STORY SECTION (3-Column Style with Perfect Alignment)
          =================================================================== */}
      <section id="story" className="about-story-section" aria-labelledby="story-heading">
        <div className="container">
          <div className="about-story-grid">
            {/* Left Column: Glass Corporate Building with Facade Brand & Play (matching Image 2) */}
            <div className="about-story-media-card">
              <img
                src="/assets/about-headquarters.jpg"
                alt="ConceptExim Corporate Headquarters & Trade Logistics Center"
                className="about-story-img"
                loading="lazy"
              />
              <div className="about-story-img-overlay" aria-hidden="true" />

              {/* Architectural Glass Facade Branding (matching Image 2) */}
              <div className="about-story-facade-brand" aria-hidden="true">
                <div className="about-story-facade-logo-wrap">
                  <Globe size={26} color="var(--color-gold-primary)" />
                  <div className="about-story-facade-text">
                    <span className="about-story-facade-name">ConceptExim</span>
                    <span className="about-story-facade-tagline">IMPORT &bull; EXPORT &bull; GLOBAL TRADE</span>
                  </div>
                </div>
              </div>

              {/* Round Play Button (positioned under logo on facade, matching Image 2) */}
              <button
                type="button"
                onClick={() => setVideoModalOpen(true)}
                className="about-story-center-play"
                aria-label="Play ConceptExim story video presentation"
              >
                <Play size={20} fill="#0B1B3D" color="#0B1B3D" style={{ marginLeft: 3 }} />
              </button>

              {/* Bottom Interactive Play Video Card (matching Image 2) */}
              <button
                type="button"
                onClick={() => setVideoModalOpen(true)}
                className="about-story-play-card"
                aria-label="Watch ConceptExim Story Video, 2 minutes 15 seconds"
              >
                <div className="about-story-play-icon-btn">
                  <Play size={13} fill="var(--color-gold-primary)" color="var(--color-gold-primary)" style={{ marginLeft: 2 }} />
                </div>
                <div className="about-story-play-text">
                  <span className="about-story-play-title">Watch Our Story</span>
                  <span className="about-story-play-duration">2:15 min</span>
                </div>
              </button>
            </div>

            {/* Center Column: Corporate Narrative (Aligned top to bottom) */}
            <div className="about-story-narrative">
              <div>
                <span className="about-story-eyebrow">OUR COMPANY</span>
                <h2 id="story-heading" className="about-story-heading">
                  Trusted Partner in Global Trade
                </h2>
                <p className="about-story-paragraph">
                  ConceptExim is a premier global import and export company committed to supplying
                  high-quality products across diverse industries. We work closely with trusted
                  manufacturers, farming collectives, and primary millers to deliver products that meet
                  exacting international standards.
                </p>
                <p className="about-story-paragraph">
                  With a customer-focused approach, disciplined maritime logistics, and an established
                  global network, we ensure seamless, transparent trade experiences for commercial
                  enterprises and industrial partners worldwide.
                </p>
              </div>

              <div className="about-story-action-row">
                <button
                  type="button"
                  onClick={() => setLearnMoreModalOpen(true)}
                  className="about-story-learn-btn"
                  aria-label="Learn more about ConceptExim corporate operations"
                >
                  <span>Learn More</span>
                  <ArrowRight size={14} />
                </button>
                <div className="about-story-accreditation-inline">
                  <ShieldCheck size={14} color="var(--color-gold-primary)" />
                  <span>ISO 9001:2015 &bull; APEDA Accredited</span>
                </div>
              </div>
            </div>

            {/* Right Column: 3 Compact Cards (Mission, Vision, Values) */}
            <div className="about-story-pillars-col">
              {/* Mission Card */}
              <div className="about-pillar-card">
                <div className="about-pillar-header">
                  <div className="about-pillar-icon-wrap" aria-hidden="true">
                    <Compass size={17} />
                  </div>
                  <h3 className="about-pillar-title">Our Mission</h3>
                </div>
                <p className="about-pillar-desc">
                  To facilitate global trade by delivering high-quality products, building long-term
                  partnerships, and creating sustainable value for our customers worldwide.
                </p>
              </div>

              {/* Vision Card */}
              <div className="about-pillar-card">
                <div className="about-pillar-header">
                  <div className="about-pillar-icon-wrap" aria-hidden="true">
                    <Eye size={17} />
                  </div>
                  <h3 className="about-pillar-title">Our Vision</h3>
                </div>
                <p className="about-pillar-desc">
                  To be a trusted global trade partner, known for quality, integrity, and innovation,
                  connecting international markets and fostering sustainable commercial growth.
                </p>
              </div>

              {/* Values Card */}
              <div className="about-pillar-card about-pillar-card-values">
                <div className="about-pillar-header">
                  <div className="about-pillar-icon-wrap" aria-hidden="true">
                    <Heart size={17} />
                  </div>
                  <h3 className="about-pillar-title">Our Values</h3>
                </div>
                <ul className="about-values-list">
                  <li className="about-values-item">
                    <Check size={13} className="about-values-check" />
                    <span>Integrity in Business</span>
                  </li>
                  <li className="about-values-item">
                    <Check size={13} className="about-values-check" />
                    <span>Quality Without Compromise</span>
                  </li>
                  <li className="about-values-item">
                    <Check size={13} className="about-values-check" />
                    <span>Customer Centric Approach</span>
                  </li>
                  <li className="about-values-item">
                    <Check size={13} className="about-values-check" />
                    <span>Sustainable Growth</span>
                  </li>
                  <li className="about-values-item">
                    <Check size={13} className="about-values-check" />
                    <span>Building Long-Term Relationships</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          5. GLOBAL PRESENCE SECTION
          =================================================================== */}
      <section className="about-presence-section" aria-labelledby="presence-heading">
        <div className="container">
          <div className="about-presence-grid">
            {/* Left: Narrative & Link */}
            <div className="about-presence-left">
              <span className="about-presence-eyebrow">OUR PRESENCE</span>
              <h2 id="presence-heading" className="about-presence-heading">
                Connecting Markets <br />
                Across Continents
              </h2>
              <p className="about-presence-desc">
                From sourcing verified commodities at origin to delivering them safely across the globe,
                ConceptExim ensures a seamless, compliant, and reliable international trade network.
              </p>
              <Link to="/global-presence" className="about-presence-cta-btn">
                <span>Explore Global Presence</span>
                <ArrowRight size={15} />
              </Link>
            </div>

            {/* Center: Interactive Animated World Map Graphic with Gold Connection Routes */}
            <div className="about-presence-map-wrap">
              <AnimatedWorldMap />
            </div>

            {/* Right: Verified Metrics & Corporate Quote */}
            <div className="about-presence-right">
              {/* 4 Clean Metric Blocks */}
              <div className="about-presence-stats-grid">
                <div className="about-presence-stat-box">
                  <span className="about-presence-stat-val">45+</span>
                  <span className="about-presence-stat-label">Countries Served</span>
                </div>
                <div className="about-presence-stat-box">
                  <span className="about-presence-stat-val">6</span>
                  <span className="about-presence-stat-label">Continents</span>
                </div>
                <div className="about-presence-stat-box">
                  <span className="about-presence-stat-val">120+</span>
                  <span className="about-presence-stat-label">Shipping Corridors</span>
                </div>
                <div className="about-presence-stat-box">
                  <span className="about-presence-stat-val">250K+</span>
                  <span className="about-presence-stat-label">Metric Tons Handled</span>
                </div>
              </div>

              {/* Corporate Quote Card */}
              <div className="about-presence-quote-card">
                <p className="about-presence-quote-text">
                  &ldquo;Global trade is not just about goods, it&rsquo;s about stronger relationships and
                  a better future.&rdquo;
                </p>
                <div className="about-presence-quote-author">
                  <span className="about-presence-quote-dash" aria-hidden="true" />
                  <span>CONCEPTEXIM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          6. BOTTOM VALUE STRIP
          =================================================================== */}
      <section className="about-value-strip" aria-label="ConceptExim Value Pillars">
        <div className="about-value-strip-container">
          <div className="about-value-items-group">
            {/* 1. Quality Products */}
            <div className="about-value-item">
              <div className="about-value-icon-wrap" aria-hidden="true">
                <Award size={18} />
              </div>
              <div className="about-value-text">
                <span className="about-value-title">Quality Products</span>
                <span className="about-value-sub">Sourced from trusted suppliers</span>
              </div>
            </div>

            {/* 2. Global Network */}
            <div className="about-value-item">
              <div className="about-value-icon-wrap" aria-hidden="true">
                <Globe size={18} />
              </div>
              <div className="about-value-text">
                <span className="about-value-title">Global Network</span>
                <span className="about-value-sub">Expanding possibilities worldwide</span>
              </div>
            </div>

            {/* 3. Efficient Logistics */}
            <div className="about-value-item">
              <div className="about-value-icon-wrap" aria-hidden="true">
                <Truck size={18} />
              </div>
              <div className="about-value-text">
                <span className="about-value-title">Efficient Logistics</span>
                <span className="about-value-sub">Safe and on-time delivery</span>
              </div>
            </div>

            {/* 4. Customer Satisfaction */}
            <div className="about-value-item">
              <div className="about-value-icon-wrap" aria-hidden="true">
                <ShieldCheck size={18} />
              </div>
              <div className="about-value-text">
                <span className="about-value-title">Customer Satisfaction</span>
                <span className="about-value-sub">Our success is your growth</span>
              </div>
            </div>
          </div>

          {/* Right-Side Gold CTA Button */}
          <button
            type="button"
            onClick={() => handleOpenQuote('Trade Partnership Request')}
            className="about-value-cta-btn"
          >
            <span>Partner With Us</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </section>

      {/* ===================================================================
          INTERACTIVE STORY VIDEO MODAL
          =================================================================== */}
      {videoModalOpen && (
        <div
          className="about-video-backdrop"
          onClick={() => setVideoModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="ConceptExim Corporate Story"
        >
          <div className="about-video-window" onClick={(e) => e.stopPropagation()}>
            <div className="about-video-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Globe size={18} color="var(--color-gold-primary)" />
                <span style={{ fontWeight: 700, fontSize: '0.9375rem', letterSpacing: '0.02em' }}>
                  ConceptExim Corporate Overview
                </span>
              </div>
              <button
                type="button"
                onClick={() => setVideoModalOpen(false)}
                className="about-video-close-btn"
                aria-label="Close video presentation"
              >
                <X size={20} />
              </button>
            </div>

            <div className="about-video-stage">
              <img
                src="/global-presence-bg.png"
                alt="Maritime trade logistics presentation background"
                className="about-video-stage-img"
              />
              <div className="about-video-stage-content">
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-gold-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 8px 24px rgba(212, 154, 54, 0.4)',
                    marginBottom: 20,
                  }}
                >
                  <Play size={28} fill="#061024" color="#061024" style={{ marginLeft: 3 }} />
                </div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: 8, color: '#FFFFFF' }}>
                  Bridging Indian Origin with Global Corridors
                </h3>
                <p style={{ color: '#CBD5E1', fontSize: '0.875rem', maxWidth: 480, lineHeight: 1.6 }}>
                  From contract farming inspection to chartered ocean freight logistics, experience how
                  ConceptExim orchestrates end-to-end commodity trade with certified purity and reliability.
                </p>
                <div style={{ marginTop: 20, display: 'flex', gap: 12 }}>
                  <button
                    type="button"
                    onClick={() => {
                      setVideoModalOpen(false);
                      handleOpenQuote('Vessel Booking Consultation');
                    }}
                    className="btn btn-primary"
                    style={{ padding: '8px 18px', fontSize: '0.8125rem' }}
                  >
                    <span>Request Trade Deck</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setVideoModalOpen(false)}
                    className="btn btn-secondary"
                    style={{ padding: '8px 18px', fontSize: '0.8125rem', backgroundColor: 'rgba(255,255,255,0.15)', color: '#FFFFFF', border: '1px solid rgba(255,255,255,0.3)' }}
                  >
                    <span>Close</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================
          7. LEARN MORE / CORPORATE INFO MODAL
          =================================================================== */}
      {learnMoreModalOpen && (
        <div
          className="about-info-modal-backdrop"
          onClick={() => setLearnMoreModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="About ConceptExim Corporate Information"
        >
          <div className="about-info-modal-window" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="about-info-modal-header">
              <div className="about-info-modal-header-left">
                <div className="about-info-modal-logo-badge" aria-hidden="true">
                  <Globe size={18} color="var(--color-gold-primary)" />
                </div>
                <div>
                  <h3 className="about-info-modal-title">ConceptExim Corporate Overview</h3>
                  <span className="about-info-modal-subtitle">Global Sourcing &bull; Certified Quality &bull; Maritime Logistics</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setLearnMoreModalOpen(false)}
                className="about-info-modal-close-btn"
                aria-label="Close corporate overview dialog"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="about-info-modal-body">
              {/* Executive Summary Box */}
              <div className="about-info-summary-box">
                <p>
                  <strong>ConceptExim</strong> is a premier merchant export company facilitating reliable, transparent international trade. We bridge verified Indian farm collectives, manufacturing clusters, and specialized millers with commercial buyers across 45+ countries, ensuring strict compliance with international phytosanitary and trade regulations.
                </p>
              </div>

              {/* 3 Core Capability Pillars */}
              <div className="about-info-pillar-grid">
                <div className="about-info-pillar-card">
                  <div className="about-info-pillar-icon" aria-hidden="true">
                    <Building2 size={20} />
                  </div>
                  <div className="about-info-pillar-content">
                    <h4 className="about-info-pillar-title">Direct Origin Sourcing</h4>
                    <p className="about-info-pillar-desc">
                      Direct agreements with producer collectives and processing plants eliminate intermediaries, ensuring consistent product grading, batch traceability, and competitive prices.
                    </p>
                  </div>
                </div>

                <div className="about-info-pillar-card">
                  <div className="about-info-pillar-icon" aria-hidden="true">
                    <ShieldCheck size={20} />
                  </div>
                  <div className="about-info-pillar-content">
                    <h4 className="about-info-pillar-title">Certified Quality Assurance</h4>
                    <p className="about-info-pillar-desc">
                      Every shipment undergoes rigorous multi-tier testing and pre-dispatch inspection by certified global agencies (SGS, Geo-Chem, APEDA) to ensure 100% compliance.
                    </p>
                  </div>
                </div>

                <div className="about-info-pillar-card">
                  <div className="about-info-pillar-icon" aria-hidden="true">
                    <Ship size={20} />
                  </div>
                  <div className="about-info-pillar-content">
                    <h4 className="about-info-pillar-title">Synchronized Maritime Logistics</h4>
                    <p className="about-info-pillar-desc">
                      Reliable containerized and bulk ocean freight execution across major port hubs (Nhava Sheva, Mundra, Chennai) with transparent Incoterms (FOB, CIF, CFR) support.
                    </p>
                  </div>
                </div>
              </div>

              {/* Accreditations & Statutory Compliance */}
              <div className="about-info-accreditation-panel">
                <div className="about-info-panel-title-row">
                  <Award size={16} color="var(--color-gold-primary)" />
                  <span className="about-info-panel-title">Statutory &amp; Trade Accreditations</span>
                </div>
                <div className="about-info-badge-list">
                  <span className="about-info-badge">
                    <Check size={12} className="about-info-badge-check" />
                    APEDA Accredited
                  </span>
                  <span className="about-info-badge">
                    <Check size={12} className="about-info-badge-check" />
                    ISO 9001:2015 Certified
                  </span>
                  <span className="about-info-badge">
                    <Check size={12} className="about-info-badge-check" />
                    FSSAI Licensed
                  </span>
                  <span className="about-info-badge">
                    <Check size={12} className="about-info-badge-check" />
                    Spices Board of India
                  </span>
                  <span className="about-info-badge">
                    <Check size={12} className="about-info-badge-check" />
                    FIEO Recognized
                  </span>
                </div>
              </div>

              {/* Verified Metrics Strip */}
              <div className="about-info-metrics-strip">
                <div className="about-info-metric-cell">
                  <span className="about-info-metric-val">45+</span>
                  <span className="about-info-metric-lbl">Countries Served</span>
                </div>
                <div className="about-info-metric-cell">
                  <span className="about-info-metric-val">120+</span>
                  <span className="about-info-metric-lbl">Shipping Corridors</span>
                </div>
                <div className="about-info-metric-cell">
                  <span className="about-info-metric-val">250K+</span>
                  <span className="about-info-metric-lbl">Tons Delivered</span>
                </div>
                <div className="about-info-metric-cell">
                  <span className="about-info-metric-val">99.4%</span>
                  <span className="about-info-metric-lbl">On-Time Clearance</span>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="about-info-modal-footer">
              <div className="about-info-footer-hint">
                <span>Inquiries: <strong>exports@conceptexim.com</strong></span>
              </div>
              <div className="about-info-footer-actions">
                <button
                  type="button"
                  onClick={() => setLearnMoreModalOpen(false)}
                  className="about-info-btn-secondary"
                >
                  <span>Close</span>
                </button>
                <Link
                  to="/products"
                  onClick={() => setLearnMoreModalOpen(false)}
                  className="about-info-btn-secondary"
                >
                  <span>View Products</span>
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setLearnMoreModalOpen(false);
                    handleOpenQuote('Corporate Inquiry from About Dialog');
                  }}
                  className="about-info-btn-primary"
                >
                  <span>Request RFQ</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
