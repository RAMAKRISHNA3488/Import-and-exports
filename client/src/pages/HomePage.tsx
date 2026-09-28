import React, { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

import { HeroSection } from '../components/home/HeroSection.js';
import { ProductCategorySection } from '../components/home/ProductCategorySection.js';
import { AboutPreview } from '../components/home/AboutPreview.js';
import { ServicesOverview } from '../components/home/ServicesOverview.js';
import { GlobalPresencePreview } from '../components/home/GlobalPresencePreview.js';
import { QualityPreview } from '../components/home/QualityPreview.js';
import { RfqCta } from '../components/home/RfqCta.js';

interface OutletContextType {
  openQuoteModal: (productOrServiceName?: string) => void;
}

export const HomePage: React.FC = () => {
  const { openQuoteModal } = useOutletContext<OutletContextType>();

  // Basic SEO metadata management
  useEffect(() => {
    document.title = 'ConceptExim — Global Import & Export | Trusted Global Trade Partner';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'ConceptExim — Connecting Quality to Global Markets. We facilitate international trade with trusted products, reliable services and long-term partnerships.'
      );
    }
  }, []);

  return (
    <div className="home-page-container">
      {/* 1. Hero Section (Includes integrated capability strip) */}
      <HeroSection onRequestQuote={() => openQuoteModal()} />

      {/* 2. Product Categories Section */}
      <ProductCategorySection />

      {/* 3. About ConceptExim Section (Split Layout) */}
      <AboutPreview />

      {/* 5. Services Section */}
      <ServicesOverview onRequestQuote={(serviceName) => openQuoteModal(serviceName)} />

      {/* 6. Global Trade / Presence Section */}
      <GlobalPresencePreview onRequestQuote={(topic) => openQuoteModal(topic)} />

      {/* 7. Quality & Compliance Section */}
      <QualityPreview onRequestQuote={(topic) => openQuoteModal(topic)} />

      {/* 8. Final RFQ CTA Conversion Section */}
      <RfqCta onRequestQuote={() => openQuoteModal()} />
    </div>
  );
};
