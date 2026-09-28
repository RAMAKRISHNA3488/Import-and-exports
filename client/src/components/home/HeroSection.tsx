import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, FileText, ShieldCheck, Compass, Users2, Sprout } from 'lucide-react';
import { InfiniteTickerStrip } from './InfiniteTickerStrip.js';

interface HeroSectionProps {
  onRequestQuote: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onRequestQuote }) => {
  return (
    <section className="home-hero" aria-label="Hero Introduction">
      {/* 1. Subtle Top Motto Ribbon matching Reference Image */}
      <div className="container home-hero-ribbon-container">
        <div className="home-hero-top-ribbon">
          <span>GLOBAL TRADE</span>
          <span className="ribbon-sep" aria-hidden="true">•</span>
          <span>TRUSTED PARTNERSHIPS</span>
          <span className="ribbon-sep" aria-hidden="true">•</span>
          <span>A BRIGHTER TOMORROW</span>
        </div>
      </div>

      {/* 2. Main Hero Content & Actions */}
      <div className="container home-hero-main-container">
        <div className="home-hero-content">
          {/* Eyebrow */}
          <div className="home-hero-eyebrow">
            IMPORT EXPORT GLOBAL OPPORTUNITIES
          </div>

          {/* Main Headline: Editorial Serif Typography */}
          <h1 className="home-hero-title">
            <span className="home-hero-title-white">Connecting Markets</span>
            <span className="home-hero-title-gold">Worldwide</span>
          </h1>

          {/* Short Narrative Description */}
          <p className="home-hero-desc">
            Your trusted partner in global trade, delivering quality products, reliable supply chains, and new opportunities across borders.
          </p>

          {/* Dual CTA Buttons */}
          <div className="home-hero-actions">
            <Link to="/products" className="btn btn-primary btn-hero">
              <span>Explore Our Products</span>
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
            <button
              type="button"
              onClick={onRequestQuote}
              className="btn btn-outline-white btn-hero"
              aria-label="Request a quotation for products or trade services"
            >
              <FileText size={16} aria-hidden="true" />
              <span>Request a Quote</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Sleek Premium Bottom Tab Dock ("Small Tab in Down") */}
      <div className="container home-hero-tabs-container">
        <div className="home-hero-premium-tabs" role="region" aria-label="Core Trade Strengths">
          <div className="hero-tab-item">
            <div className="hero-tab-icon-box" aria-hidden="true">
              <ShieldCheck size={18} />
            </div>
            <div className="hero-tab-text-wrap">
              <strong className="hero-tab-title">Quality Products</strong>
              <span className="hero-tab-sub">Certified Specifications</span>
            </div>
          </div>

          <div className="hero-tab-divider" aria-hidden="true" />

          <div className="hero-tab-item">
            <div className="hero-tab-icon-box" aria-hidden="true">
              <Compass size={18} />
            </div>
            <div className="hero-tab-text-wrap">
              <strong className="hero-tab-title">Global Supply Chain</strong>
              <span className="hero-tab-sub">End-to-End Maritime Transit</span>
            </div>
          </div>

          <div className="hero-tab-divider" aria-hidden="true" />

          <div className="hero-tab-item">
            <div className="hero-tab-icon-box" aria-hidden="true">
              <Users2 size={18} />
            </div>
            <div className="hero-tab-text-wrap">
              <strong className="hero-tab-title">Trusted Partnerships</strong>
              <span className="hero-tab-sub">Transparent Global Contracts</span>
            </div>
          </div>

          <div className="hero-tab-divider" aria-hidden="true" />

          <div className="hero-tab-item">
            <div className="hero-tab-icon-box" aria-hidden="true">
              <Sprout size={18} />
            </div>
            <div className="hero-tab-text-wrap">
              <strong className="hero-tab-title">Sustainable Growth</strong>
              <span className="hero-tab-sub">Eco-Compliant Sourcing</span>
            </div>
          </div>
        </div>
      </div>

      {/* Thin Full-Width Navy + Gold Continuous Infinite Ticker Strip */}
      <InfiniteTickerStrip />
    </section>
  );
};


