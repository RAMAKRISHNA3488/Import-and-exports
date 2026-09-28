import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  ArrowUp,
  ArrowRight,
  X,
  Scale,
  Lock,
} from 'lucide-react';

interface FooterProps {
  onRequestQuote?: () => void;
}

type ModalType = 'privacy' | 'terms' | null;

export const Footer: React.FC<FooterProps> = () => {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const location = useLocation();

  // Close modals on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveModal(null);
      }
    };
    if (activeModal) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [activeModal]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /**
   * Handles click on any footer nav link to ensure smooth navigation to the top
   * or direct smooth scrolling to target hash elements.
   */
  const handleNavClick = (to: string) => {
    if (to.includes('#')) {
      const [path, hashId] = to.split('#');
      if (!path || path === location.pathname) {
        const el = document.getElementById(hashId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          return;
        }
      }
    }

    const targetPath = to.split('#')[0].split('?')[0];
    if (location.pathname === targetPath && !to.includes('?')) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="site-footer" aria-label="Global Trade Footer">
      <div className="footer-container">
        {/* Main 5-Column Navigation Grid */}
        <div className="footer-main-grid">
          {/* Column 1: Brand Profile */}
          <div className="footer-brand-col">
            <Link to="/" className="footer-logo-wrap" aria-label="ConceptExim Homepage" onClick={() => handleNavClick('/')}>
              <div className="footer-logo-card">
                <img
                  src="/assets/conceptexim-logo.png"
                  alt="ConceptExim Global Trade"
                  className="footer-logo-img"
                  loading="lazy"
                />
              </div>
            </Link>

            <p className="footer-brand-narrative">
              International B2B import and export platform connecting verified commodity producers with global trade markets.
            </p>

            <Link to="/contact" className="footer-trade-desk-cta" onClick={() => handleNavClick('/contact')}>
              <span>Contact Trade Desk</span>
              <ArrowRight size={14} aria-hidden="true" />
            </Link>

            {/* Follow Us Social Media Icons */}
            <div className="footer-social-wrap">
              <span className="footer-social-label">Follow Us</span>
              <div className="footer-social-icons">
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-btn social-linkedin"
                  aria-label="Follow ConceptExim on LinkedIn"
                  title="LinkedIn"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6.94 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM7 8.48H3V21h4V8.48zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.68-2.91v-1.68z" />
                  </svg>
                </a>

                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-btn social-twitter"
                  aria-label="Follow ConceptExim on X (Twitter)"
                  title="X (Twitter)"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>

                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-btn social-facebook"
                  aria-label="Follow ConceptExim on Facebook"
                  title="Facebook"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>

                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-btn social-instagram"
                  aria-label="Follow ConceptExim on Instagram"
                  title="Instagram"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </a>

                <a
                  href="https://wa.me/912245897700"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-btn social-whatsapp"
                  aria-label="Chat with ConceptExim on WhatsApp"
                  title="WhatsApp"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24M8.53 7.33c-.16 0-.35.03-.5.23-.19.23-.74.72-.74 1.76 0 1.04.76 2.05.86 2.19.11.14 1.5 2.29 3.63 3.21.51.22.91.35 1.22.45.51.16.98.14 1.35.08.41-.06 1.26-.52 1.44-1.01.18-.5.18-.93.13-1.01-.05-.09-.19-.14-.4-.25-.21-.11-1.26-.62-1.45-.69-.2-.07-.34-.11-.49.11-.14.23-.57.69-.7.84-.13.14-.26.16-.47.05-.21-.11-.9-.33-1.71-1.06-.63-.56-1.06-1.26-1.18-1.47-.13-.21-.01-.33.09-.43.1-.1.21-.26.32-.38.1-.13.14-.21.21-.35.07-.14.03-.27-.02-.38-.05-.11-.49-1.18-.67-1.62-.18-.43-.36-.37-.49-.38-.13 0-.27-.01-.41-.01" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Company */}
          <div className="footer-col">
            <h4 className="footer-col-title">Company</h4>
            <ul className="footer-nav-list">
              <li>
                <Link to="/" className="footer-nav-link" onClick={() => handleNavClick('/')}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="footer-nav-link" onClick={() => handleNavClick('/about')}>
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/global-presence" className="footer-nav-link" onClick={() => handleNavClick('/global-presence')}>
                  Global Presence
                </Link>
              </li>
              <li>
                <Link to="/quality" className="footer-nav-link" onClick={() => handleNavClick('/quality')}>
                  Quality &amp; Compliance
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Key Product Sectors */}
          <div className="footer-col">
            <h4 className="footer-col-title">Products</h4>
            <ul className="footer-nav-list">
              <li>
                <Link to="/products" className="footer-nav-link" onClick={() => handleNavClick('/products')}>
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/products?category=agriculture" className="footer-nav-link" onClick={() => handleNavClick('/products?category=agriculture')}>
                  Agriculture
                </Link>
              </li>
              <li>
                <Link to="/products?category=food-commodities" className="footer-nav-link" onClick={() => handleNavClick('/products?category=food-commodities')}>
                  Food Commodities
                </Link>
              </li>
              <li>
                <Link to="/products?category=industrial-materials" className="footer-nav-link" onClick={() => handleNavClick('/products?category=industrial-materials')}>
                  Industrial Materials
                </Link>
              </li>
              <li>
                <Link to="/products?category=textiles-and-apparel" className="footer-nav-link" onClick={() => handleNavClick('/products?category=textiles-and-apparel')}>
                  Textiles &amp; Apparel
                </Link>
              </li>
              <li>
                <Link to="/products?category=machinery-and-equipment" className="footer-nav-link" onClick={() => handleNavClick('/products?category=machinery-and-equipment')}>
                  Machinery &amp; Equipment
                </Link>
              </li>
              <li>
                <Link to="/products?category=energy-products" className="footer-nav-link" onClick={() => handleNavClick('/products?category=energy-products')}>
                  Energy Products
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Services */}
          <div className="footer-col">
            <h4 className="footer-col-title">Services</h4>
            <ul className="footer-nav-list">
              <li>
                <Link to="/services" className="footer-nav-link" onClick={() => handleNavClick('/services')}>
                  All Services
                </Link>
              </li>
              <li>
                <Link to="/services#import-solutions" className="footer-nav-link" onClick={() => handleNavClick('/services#import-solutions')}>
                  Import Solutions
                </Link>
              </li>
              <li>
                <Link to="/services#export-solutions" className="footer-nav-link" onClick={() => handleNavClick('/services#export-solutions')}>
                  Export Solutions
                </Link>
              </li>
              <li>
                <Link to="/services#product-sourcing" className="footer-nav-link" onClick={() => handleNavClick('/services#product-sourcing')}>
                  Product Sourcing
                </Link>
              </li>
              <li>
                <Link to="/services#documentation-support" className="footer-nav-link" onClick={() => handleNavClick('/services#documentation-support')}>
                  Documentation Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Contact */}
          <div className="footer-col">
            <h4 className="footer-col-title">Contact</h4>
            <div className="footer-contact-items">
              <div className="footer-contact-row">
                <span className="footer-contact-icon contact-icon-location">
                  <MapPin size={14} aria-hidden="true" />
                </span>
                <span>BKC Commercial Complex, Mumbai, India</span>
              </div>

              <div className="footer-contact-row">
                <span className="footer-contact-icon contact-icon-phone">
                  <Phone size={14} aria-hidden="true" />
                </span>
                <a href="tel:+912245897700" className="footer-contact-link">
                  +91 (0) 22 4589 7700
                </a>
              </div>

              <div className="footer-contact-row">
                <span className="footer-contact-icon contact-icon-mail">
                  <Mail size={14} aria-hidden="true" />
                </span>
                <a href="mailto:trade@conceptexim.com" className="footer-contact-link">
                  trade@conceptexim.com
                </a>
              </div>

              <div className="footer-contact-row">
                <span className="footer-contact-icon contact-icon-clock">
                  <Clock size={14} aria-hidden="true" />
                </span>
                <span>Mon – Fri: 08:00 – 19:00 IST</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="footer-bottom-bar">
          <div className="footer-copyright-text">
            © 2026 ConceptExim. All rights reserved.
          </div>

          <div className="footer-legal-links">
            <Link
              to="/privacy"
              className="footer-legal-btn"
              onClick={() => handleNavClick('/privacy')}
              aria-label="View Privacy Policy"
            >
              Privacy Policy
            </Link>
            <span className="footer-sep" aria-hidden="true">•</span>
            <Link
              to="/terms"
              className="footer-legal-btn"
              onClick={() => handleNavClick('/terms')}
              aria-label="View Terms of Service"
            >
              Terms of Service
            </Link>
          </div>

          <button
            type="button"
            className="footer-scroll-top-btn"
            onClick={scrollToTop}
            aria-label="Scroll to top of page"
          >
            <span>Back to top</span>
            <ArrowUp size={13} aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* --------------------------------------------------------------------------
         MODALS (Clean, Functional & Accessible)
         -------------------------------------------------------------------------- */}
      {/* Privacy Policy Modal */}
      {activeModal === 'privacy' && (
        <div className="footer-modal-overlay" role="dialog" aria-modal="true" onClick={() => setActiveModal(null)}>
          <div className="footer-modal-container" onClick={e => e.stopPropagation()}>
            <div className="footer-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Lock size={18} style={{ color: 'var(--color-gold-primary)' }} aria-hidden="true" />
                <h3 className="footer-modal-title">Privacy Policy</h3>
              </div>
              <button
                type="button"
                className="footer-modal-close"
                onClick={() => setActiveModal(null)}
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>
            <div className="footer-modal-body">
              <h4>1. Information Collection</h4>
              <p>
                ConceptExim collects business information necessary to execute commercial trade inquiries, quotations,
                and maritime shipping documentation.
              </p>
              <h4>2. Data Usage &amp; Protection</h4>
              <p>
                All trade communications, bills of lading, and commercial contract specifications are encrypted and handled
                in strict accordance with international commercial privacy standards.
              </p>
              <h4>3. Third-Party Disclosures</h4>
              <p>
                Information is shared strictly with accredited statutory port authorities, independent inspection agencies
                (e.g., SGS, Bureau Veritas), and freight carriers directly involved in executing your order.
              </p>
            </div>
            <div className="footer-modal-footer">
              <button type="button" className="footer-modal-action-btn" onClick={() => setActiveModal(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Terms of Service Modal */}
      {activeModal === 'terms' && (
        <div className="footer-modal-overlay" role="dialog" aria-modal="true" onClick={() => setActiveModal(null)}>
          <div className="footer-modal-container" onClick={e => e.stopPropagation()}>
            <div className="footer-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Scale size={18} style={{ color: 'var(--color-gold-primary)' }} aria-hidden="true" />
                <h3 className="footer-modal-title">Terms of Service</h3>
              </div>
              <button
                type="button"
                className="footer-modal-close"
                onClick={() => setActiveModal(null)}
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>
            <div className="footer-modal-body">
              <h4>1. Trade Terms &amp; INCOTERMS® 2020</h4>
              <p>
                All sales quotations and commercial agreements are subject to ICC INCOTERMS® 2020 provisions (FOB, CIF, CFR, EXW)
                as specified in respective proforma invoices.
              </p>
              <h4>2. Quality Inspection &amp; Certification</h4>
              <p>
                Consignments are inspected by accredited third-party laboratories at the port of origin. Final Certificate of Analysis
                (COA) and phytosanitary certificates govern contract conformity.
              </p>
              <h4>3. Settlement &amp; Payment</h4>
              <p>
                Commercial transactions are governed by Irrevocable Letters of Credit (L/C at sight) or agreed structured terms.
              </p>
            </div>
            <div className="footer-modal-footer">
              <button type="button" className="footer-modal-action-btn" onClick={() => setActiveModal(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </footer>
  );
};
