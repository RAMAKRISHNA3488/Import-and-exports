import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Compass,
  Ship,
  Plane,
  Train,
  FileText,
  Headphones,
  ShieldCheck,
  ChevronRight,
  Globe,
  Route,
  CheckCircle2,
  Activity,
  Quote,
} from 'lucide-react';
import { AnimatedWorldMap } from '../about/AnimatedWorldMap.js';
import { PremiumArrowIcon } from './ProductCategorySection.js';
import { useScrollReveal } from '../../hooks/useScrollReveal.js';

const TELEMETRY_METRICS = [
  {
    id: 'countries',
    val: '45',
    sup: '+',
    label: 'Countries Served',
    tag: 'Global Reach',
    icon: Globe,
    colorClass: 'metric-cyan',
    detailTitle: 'Worldwide Access',
    detailDesc: 'Direct transit gateways spanning Asia-Pacific, Europe, the Americas & Middle East.',
  },
  {
    id: 'corridors',
    val: '120',
    sup: '+',
    label: 'Shipping Corridors',
    tag: 'Multimodal',
    icon: Route,
    colorClass: 'metric-amber',
    detailTitle: 'Active Cargo Routes',
    detailDesc: 'Contracted vessel allocations, priority air links & inland ICD rail connections.',
  },
  {
    id: 'clearance',
    val: '99.4',
    sup: '%',
    label: 'On-Time Clearance',
    tag: 'SLA Verified',
    icon: CheckCircle2,
    colorClass: 'metric-emerald',
    detailTitle: 'Zero-Demurrage SLA',
    detailDesc: 'Pre-arrival EDI documentation, automated ICEGATE clearance & swift port release.',
  },
  {
    id: 'tracking',
    val: '24',
    sup: '/7',
    label: 'Port Tracking',
    tag: 'Live IoT',
    icon: Activity,
    colorClass: 'metric-indigo',
    detailTitle: 'Continuous Monitoring',
    detailDesc: 'Real-time vessel AIS geolocation, automated milestone alerts & live terminal ops.',
  },
] as const;

interface GlobalPresencePreviewProps {
  onRequestQuote?: (topic?: string) => void;
}

export const GlobalPresencePreview: React.FC<GlobalPresencePreviewProps> = ({ onRequestQuote }) => {
  const [activeMetricIndex, setActiveMetricIndex] = useState<number>(0);
  const { ref: sectionRef, isRevealed } = useScrollReveal<HTMLElement>({
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px',
  });

  return (
    <section
      ref={sectionRef}
      className={`about-presence-section home-presence-showcase presence-scroll-reveal ${isRevealed ? 'presence-in-view' : ''}`}
      aria-labelledby="home-presence-heading"
    >
      <div className="container">
        <div className="about-presence-grid">
          {/* Left Column: Authoritative Editorial Narrative, Capabilities & Actions */}
          <div className="about-presence-left">
            {/* Prestigious Compact Eyebrow Capsule */}
            <div className="home-presence-eyebrow-pill">
              <Compass size={13} className="eyebrow-compass-icon" aria-hidden="true" />
              <span>Global Trade Infrastructure &amp; Corridors</span>
            </div>

            {/* Main Editorial Headline with Luxury Gold Shimmer */}
            <h2 id="home-presence-heading" className="home-presence-heading">
              Connecting Markets <br />
              <span className="home-presence-heading-gold">Worldwide.</span>
            </h2>

            {/* Authoritative Global Trade Description */}
            <p className="home-presence-desc">
              We orchestrate commercial import and export flows across international markets,
              enabling smooth, compliant, and reliable trade through an integrated global network,
              dedicated port terminal coordination, and trusted on-ground partnerships.
            </p>

            {/* Multimodal Transport Capabilities (Interactive Coloured Premium Icons) */}
            <div className="home-presence-modes-grid" role="region" aria-label="Commercial Freight & Customs Corridors">
              <Link
                to="/services/logistics-coordination"
                className="home-presence-mode-pill mode-ocean"
                title="Ocean Freight (FCL/LCL) — Contracted Vessel Slots & Port Terminal Management"
              >
                <div className="mode-icon-badge" aria-hidden="true">
                  <Ship size={16} strokeWidth={2.2} />
                </div>
                <div className="mode-pill-text">
                  <span className="mode-pill-title">Ocean Freight (FCL/LCL)</span>
                  <span className="mode-pill-sub">Vessel Allocations</span>
                </div>
                <ChevronRight size={13} className="mode-pill-chevron" aria-hidden="true" />
              </Link>

              <Link
                to="/services/export-management"
                className="home-presence-mode-pill mode-air"
                title="Air Priority Cargo — Express Priority Air Freight & Cross-Border Dispatch"
              >
                <div className="mode-icon-badge" aria-hidden="true">
                  <Plane size={16} strokeWidth={2.2} />
                </div>
                <div className="mode-pill-text">
                  <span className="mode-pill-title">Air Priority Cargo</span>
                  <span className="mode-pill-sub">Next-Flight Express</span>
                </div>
                <ChevronRight size={13} className="mode-pill-chevron" aria-hidden="true" />
              </Link>

              <Link
                to="/services/logistics-coordination"
                className="home-presence-mode-pill mode-rail"
                title="Intermodal Rail Haulage — Multimodal Overland Port to Inland ICD Rail Haulage"
              >
                <div className="mode-icon-badge" aria-hidden="true">
                  <Train size={16} strokeWidth={2.2} />
                </div>
                <div className="mode-pill-text">
                  <span className="mode-pill-title">Intermodal Rail Haulage</span>
                  <span className="mode-pill-sub">Inland ICD Network</span>
                </div>
                <ChevronRight size={13} className="mode-pill-chevron" aria-hidden="true" />
              </Link>

              <Link
                to="/services/customs-support"
                className="home-presence-mode-pill mode-customs"
                title="Customs Brokerage — Licensed ICEGATE & Port Customs Clearance"
              >
                <div className="mode-icon-badge" aria-hidden="true">
                  <FileText size={16} strokeWidth={2.2} />
                </div>
                <div className="mode-pill-text">
                  <span className="mode-pill-title">Customs Brokerage</span>
                  <span className="mode-pill-sub">Fast-Track Filing</span>
                </div>
                <ChevronRight size={13} className="mode-pill-chevron" aria-hidden="true" />
              </Link>
            </div>

            {/* Strategic Dual Actions (Clean Horizontal Inline Row) */}
            <div className="home-presence-actions">
              <Link to="/global-presence" className="home-presence-btn-primary">
                <span>Our Global Presence</span>
                <PremiumArrowIcon size={16} className="presence-cta-arrow" />
              </Link>
              {onRequestQuote && (
                <button
                  type="button"
                  className="home-presence-btn-secondary"
                  onClick={() => onRequestQuote('Global Trade & Route Consultation')}
                  aria-label="Request Commercial Trade & Corridor Consultation"
                >
                  <Headphones size={14} className="consult-action-icon" aria-hidden="true" />
                  <span>Request Consultation</span>
                </button>
              )}
            </div>
          </div>

          {/* Center Column: Interactive World Map with Ambient Backdrop Illumination */}
          <div className="about-presence-map-wrap">
            <div className="presence-map-halo-bg" aria-hidden="true" />
            <AnimatedWorldMap />
          </div>

          {/* Right Column: Framed Executive Telemetry & Assurance Card */}
          <div className="about-presence-right">
            <div className="home-presence-telemetry-card">
              {/* Card Subtitle & Status Indicator */}
              <div className="telemetry-card-top">
                <div className="telemetry-tag-group">
                  <Activity size={13} className="telemetry-activity-icon" aria-hidden="true" />
                  <span className="telemetry-tag">Operational Telemetry</span>
                </div>
                <div
                  className="telemetry-live-badge"
                  title="Live AIS satellite vessel tracking & port EDI corridor telemetry active"
                >
                  <span className="live-pulsing-dot" aria-hidden="true" />
                  <span>Active Corridors</span>
                </div>
              </div>

              {/* 4 Clean Enterprise Metrics Grid - Fully User Interactive */}
              <div className="home-presence-stats-grid" role="group" aria-label="Operational Telemetry Metrics">
                {TELEMETRY_METRICS.map((metric, idx) => {
                  const IconComp = metric.icon;
                  const isSelected = activeMetricIndex === idx;
                  return (
                    <button
                      key={metric.id}
                      type="button"
                      onClick={() => setActiveMetricIndex(idx)}
                      onMouseEnter={() => setActiveMetricIndex(idx)}
                      className={`home-presence-stat-box ${metric.colorClass} ${isSelected ? 'is-active' : ''}`}
                      aria-pressed={isSelected}
                      title={`${metric.val}${metric.sup} ${metric.label}: ${metric.detailDesc}`}
                    >
                      <div className="stat-box-header">
                        <div className="stat-micro-badge" aria-hidden="true">
                          <IconComp size={13} strokeWidth={2.4} />
                        </div>
                        <span className="stat-pill-tag">{metric.tag}</span>
                      </div>
                      <div className="home-presence-stat-val">
                        {metric.val}
                        <span className="stat-accent-sup">{metric.sup}</span>
                      </div>
                      <span className="home-presence-stat-label">{metric.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Interactive Telemetry Readout Strip */}
              <div className="telemetry-live-readout" aria-live="polite">
                <div className="readout-header">
                  <div className="readout-title-wrap">
                    <span
                      className={`readout-pulse-dot ${TELEMETRY_METRICS[activeMetricIndex].colorClass}`}
                      aria-hidden="true"
                    />
                    <span className="readout-badge-title">
                      {TELEMETRY_METRICS[activeMetricIndex].detailTitle}
                    </span>
                  </div>
                  <span className="readout-hint">Live Telemetry</span>
                </div>
                <p className="readout-desc">
                  {TELEMETRY_METRICS[activeMetricIndex].detailDesc}
                </p>
              </div>

              {/* Refined Divider */}
              <div className="telemetry-card-divider" />

              {/* Corporate Quote with Refined Typography & Accent */}
              <div className="about-presence-quote-card">
                <Quote size={16} className="quote-watermark-icon" aria-hidden="true" />
                <p className="about-presence-quote-text">
                  &ldquo;Global trade is not just about goods, it&rsquo;s about stronger relationships and
                  a better future.&rdquo;
                </p>
                <div className="about-presence-quote-author">
                  <span className="about-presence-quote-dash" aria-hidden="true" />
                  <span>CONCEPTEXIM</span>
                </div>
              </div>

              {/* Licensed Port Logistics & Trust Badge - Interactive */}
              <div
                className="home-presence-trust-pill"
                title="Verified trade partner with licensed port logistics and automated customs clearance"
              >
                <div className="trust-pill-content">
                  <ShieldCheck size={14} className="trust-shield-icon" aria-hidden="true" />
                  <span>Licensed Port Logistics &amp; Customs Cleared</span>
                </div>
                <span className="trust-verified-pill" aria-hidden="true">
                  <span className="trust-verified-dot" />
                  <span>Verified</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
