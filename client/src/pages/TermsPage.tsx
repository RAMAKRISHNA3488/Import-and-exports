import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Scale,
  ShieldCheck,
  FileText,
  Clock,
  Mail,
  MapPin,
  ArrowUp,
  ArrowRight,
  Search,
  Layers,
  Bookmark,
  Building2,
  Briefcase,
  AlertTriangle,
} from 'lucide-react';

interface TocSection {
  id: string;
  title: string;
  num: string;
}

const SECTIONS: TocSection[] = [
  { id: 'introduction', title: '1. Introduction', num: '01' },
  { id: 'acceptance-of-terms', title: '2. Acceptance of Terms', num: '02' },
  { id: 'use-of-website', title: '3. Use of the Website', num: '03' },
  { id: 'user-accounts', title: '4. User Accounts', num: '04' },
  { id: 'products-information', title: '5. Products & Information', num: '05' },
  { id: 'rfq-enquiries', title: '6. Enquiries & RFQ', num: '06' },
  { id: 'orders-transactions', title: '7. Orders & Transactions', num: '07' },
  { id: 'pricing-availability', title: '8. Pricing & Availability', num: '08' },
  { id: 'intellectual-property', title: '9. Intellectual Property', num: '09' },
  { id: 'user-submitted-info', title: '10. User Information', num: '10' },
  { id: 'third-party-links', title: '11. Third-Party Services', num: '11' },
  { id: 'limitation-liability', title: '12. Limitation of Liability', num: '12' },
  { id: 'disclaimer', title: '13. Disclaimer', num: '13' },
  { id: 'changes-to-terms', title: '14. Changes to Terms', num: '14' },
  { id: 'governing-law', title: '15. Governing Law', num: '15' },
  { id: 'contact-us', title: '16. Contact Us', num: '16' },
];

export const TermsPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('introduction');
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const contentRef = useRef<HTMLDivElement>(null);

  // Monitor window scroll for overall page scroll state
  useEffect(() => {
    const handleWindowScroll = () => {
      const isWindowScrolled = window.scrollY > 350;
      const isContainerScrolled = (contentRef.current?.scrollTop || 0) > 250;
      setShowScrollTop(isWindowScrolled || isContainerScrolled);
    };

    window.addEventListener('scroll', handleWindowScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleWindowScroll);
    };
  }, []);

  // Track scroll inside the right content container to update active section in left sidebar
  const handlePanelScroll = () => {
    const container = contentRef.current;
    if (!container) return;

    setShowScrollTop(window.scrollY > 350 || container.scrollTop > 250);

    // If reached bottom of document, highlight the last section
    if (container.scrollTop + container.clientHeight >= container.scrollHeight - 30) {
      setActiveSection(SECTIONS[SECTIONS.length - 1].id);
      return;
    }

    // Determine current active section relative to top of container
    const containerTop = container.getBoundingClientRect().top;
    let currentActive = SECTIONS[0].id;

    for (let i = 0; i < SECTIONS.length; i++) {
      const sec = SECTIONS[i];
      const el = document.getElementById(sec.id);
      if (el) {
        const elRect = el.getBoundingClientRect();
        if (elRect.top - containerTop <= 80) {
          currentActive = sec.id;
        }
      }
    }
    setActiveSection(currentActive);
  };

  const scrollToSection = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(id);
    const container = contentRef.current;

    if (element && container) {
      // Ensure the container is aligned in window viewport if scrolled away
      const containerRect = container.getBoundingClientRect();
      if (containerRect.top < 70 || containerRect.top > window.innerHeight - 150) {
        const pageOffset = 85;
        const pageTarget = containerRect.top + window.pageYOffset - pageOffset;
        window.scrollTo({
          top: Math.max(0, pageTarget),
          behavior: 'smooth',
        });
      }

      // Smoothly scroll inside the right container
      const containerTop = container.getBoundingClientRect().top;
      const elementTop = element.getBoundingClientRect().top;
      const targetScroll = container.scrollTop + (elementTop - containerTop) - 20;

      container.scrollTo({
        top: Math.max(0, targetScroll),
        behavior: 'smooth',
      });
      setActiveSection(id);
    }
  };

  const scrollToTop = () => {
    if (contentRef.current) {
      contentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredSections = SECTIONS.filter(
    (sec) =>
      sec.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sec.num.includes(searchQuery)
  );

  return (
    <div className="terms-page-wrapper">
      {/* ------------------------------------------------------------------
          1. CINEMATIC HERO SECTION
          ------------------------------------------------------------------ */}
      <section className="terms-hero" aria-labelledby="terms-hero-heading">
        <div className="terms-hero-container">
          {/* Breadcrumbs */}
          <nav className="terms-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span className="terms-breadcrumb-sep" aria-hidden="true">/</span>
            <span>Legal &amp; Compliance</span>
            <span className="terms-breadcrumb-sep" aria-hidden="true">/</span>
            <span className="terms-breadcrumb-current" aria-current="page">Terms &amp; Conditions</span>
          </nav>

          {/* Badge */}
          <div className="terms-hero-badge">
            <Scale size={14} aria-hidden="true" />
            <span>OFFICIAL COMMERCIAL TERMS &amp; GOVERNANCE</span>
          </div>

          {/* Titles */}
          <h1 id="terms-hero-heading" className="terms-hero-title">
            Terms &amp; Conditions
          </h1>

          <p className="terms-hero-subtitle">
            These Terms &amp; Conditions govern your access to and commercial use of the ConceptExim website,
            digital catalogue, Request for Quote (RFQ) engine, and international trade advisory services.
          </p>

          {/* Document Meta Strip */}
          <div className="terms-meta-strip">
            <div className="terms-meta-item">
              <Clock size={15} className="terms-meta-icon" aria-hidden="true" />
              <span>Last Updated: <strong className="terms-meta-strong">September 2026</strong></span>
            </div>

            <div className="terms-meta-item">
              <FileText size={15} className="terms-meta-icon" aria-hidden="true" />
              <span>Version: <strong className="terms-meta-strong">3.1 (Global Trade Edition)</strong></span>
            </div>

            <div className="terms-meta-item">
              <Scale size={15} className="terms-meta-icon" aria-hidden="true" />
              <span>Framework: <strong className="terms-meta-strong">Incoterms® 2020 &amp; UN CISG</strong></span>
            </div>

            <div className="terms-meta-item">
              <Bookmark size={15} className="terms-meta-icon" aria-hidden="true" />
              <span>Scope: <strong className="terms-meta-strong">45+ Cross-Border Corridors</strong></span>
            </div>

            <div className="terms-status-tag" title="Enterprise Statutory Governance">
              <ShieldCheck size={13} aria-hidden="true" />
              <span>Official Commercial Governance</span>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------
          2. TWO-COLUMN TERMS CONTENT
          ------------------------------------------------------------------ */}
      <div className="terms-main-container">
        <div className="terms-layout-grid">
          {/* Left Column: Sticky Table of Contents Navigation */}
          <aside className="terms-sidebar" aria-label="Terms of Service Table of Contents">
            <div className="terms-toc-card">
              <div className="terms-toc-header">
                <div className="terms-toc-title-group">
                  <span className="terms-toc-title">
                    <Layers size={14} style={{ color: '#D49A36' }} aria-hidden="true" />
                    Table of Contents
                  </span>
                  <span className="terms-toc-sub">16 Contract Clauses</span>
                </div>
                <span className="terms-toc-badge">Official</span>
              </div>

              {/* Real-time Clause Search Filter */}
              <div className="terms-search-wrap">
                <Search size={13} className="terms-search-icon" aria-hidden="true" />
                <input
                  type="text"
                  placeholder="Filter clauses (e.g. RFQ, pricing)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="terms-search-input"
                  aria-label="Filter contract clauses"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="terms-search-clear"
                    aria-label="Clear search"
                  >
                    ×
                  </button>
                )}
              </div>

              <nav className="terms-toc-list" aria-label="Table of Contents">
                {filteredSections.length > 0 ? (
                  filteredSections.map((sec) => (
                    <a
                      key={sec.id}
                      href={`#${sec.id}`}
                      onClick={(e) => scrollToSection(sec.id, e)}
                      className={`terms-toc-link ${activeSection === sec.id ? 'active' : ''}`}
                      aria-current={activeSection === sec.id ? 'true' : undefined}
                    >
                      <span className="terms-toc-num">{sec.num}</span>
                      <span className="terms-toc-text">{sec.title}</span>
                      {activeSection === sec.id && (
                        <span className="terms-toc-active-indicator" aria-hidden="true">
                          <ArrowRight size={12} />
                        </span>
                      )}
                    </a>
                  ))
                ) : (
                  <div className="terms-search-empty">
                    <span>No clauses match &ldquo;{searchQuery}&rdquo;</span>
                    <button type="button" onClick={() => setSearchQuery('')} className="terms-search-reset-btn">
                      Reset Filter
                    </button>
                  </div>
                )}
              </nav>

              <div className="terms-toc-footer-strip">
                <Clock size={12} aria-hidden="true" />
                <span>Statutory Scope: Cross-Border B2B Transactions</span>
              </div>
            </div>

            {/* Sidebar Assistance Card */}
            <div className="terms-sidebar-help-card">
              <div className="terms-sidebar-help-badge">
                <ShieldCheck size={13} aria-hidden="true" />
                <span>DIRECT DESK</span>
              </div>
              <h3 className="terms-sidebar-help-title">
                <span>Trade Legal Counsel</span>
              </h3>
              <p className="terms-sidebar-help-desc">
                Need customized Incoterms clauses, Letter of Credit compliance reviews, or bilateral sales agreements?
              </p>
              <Link to="/contact" className="terms-sidebar-help-btn">
                <span>Contact Commercial Desk</span>
                <ArrowRight size={13} aria-hidden="true" />
              </Link>
            </div>
          </aside>

          {/* Right Column: Terms Content Document (Like a Page) */}
          <main
            ref={contentRef}
            onScroll={handlePanelScroll}
            className="terms-content-col"
            tabIndex={0}
            aria-label="Terms and Conditions Document"
          >
            {/* Executive Statutory Compliance Seal */}
            <div className="terms-statutory-seal" role="region" aria-label="Official Framework Notice">
              <div className="terms-seal-icon-box">
                <Scale size={22} className="terms-seal-icon" aria-hidden="true" />
              </div>
              <div className="terms-seal-body">
                <div className="terms-seal-header-row">
                  <span className="terms-seal-badge">STATUTORY GOVERNANCE FRAMEWORK</span>
                  <span className="terms-seal-edition">INCOTERMS® 2020 &amp; WTO RULES COMPLIANT</span>
                </div>
                <h3 className="terms-seal-title">Enterprise Commercial Terms &amp; Cross-Border Governance Charter</h3>
                <p className="terms-seal-desc">
                  This document constitutes ConceptExim&apos;s authoritative cross-border commercial terms of use and contractual governance.
                  All protocols detailed herein govern bilateral RFQs, proforma commercial contracts, maritime freight manifests,
                  commodity allocations, and institutional trade compliance across all active global trade corridors.
                </p>
              </div>
            </div>

            {/* SECTION 1: INTRODUCTION */}
            <section id="introduction" className="terms-section" aria-labelledby="heading-introduction">
              <div className="terms-section-header">
                <div className="terms-section-badge">
                  <Scale size={11} aria-hidden="true" />
                  <span>Clause 01</span>
                </div>
                <h2 id="heading-introduction" className="terms-section-title">
                  1. Introduction
                </h2>
              </div>
              <p className="terms-paragraph">
                Welcome to the ConceptExim international trade portal. These Terms and Conditions (&quot;Terms&quot;) constitute a legally binding agreement between you—whether personally or on behalf of an entity you represent (&quot;User&quot;, &quot;Buyer&quot;, &quot;Client&quot;, or &quot;Supplier&quot;)—and <span className="terms-placeholder-highlight">ConceptExim Global Logistics &amp; Trade Solutions Ltd.</span> (&quot;ConceptExim&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;).
              </p>
              <p className="terms-paragraph">
                These Terms govern your access to, browsing of, and interaction with our website, electronic product catalogues, digital Request for Quote (&quot;RFQ&quot;) engine, and international export-import advisory channels. By accessing or interacting with our digital presence, you confirm that you have read, understood, and agreed to be bound by all of these Terms.
              </p>
              <div className="terms-callout-card">
                <div className="terms-callout-header">
                  <ShieldCheck size={16} aria-hidden="true" />
                  <span>Commercial B2B Orientation</span>
                </div>
                <p className="terms-callout-body">
                  ConceptExim provides wholesale, bulk commodity, and industrial trade facilitation. All communications, inquiries, and transactions initiated through this portal are intended strictly for commercial, corporate, or institutional business purposes rather than personal consumer consumption.
                </p>
              </div>
            </section>

            {/* SECTION 2: ACCEPTANCE OF TERMS */}
            <section id="acceptance-of-terms" className="terms-section" aria-labelledby="heading-acceptance">
              <div className="terms-section-header">
                <div className="terms-section-badge">
                  <Scale size={11} aria-hidden="true" />
                  <span>Clause 02</span>
                </div>
                <h2 id="heading-acceptance" className="terms-section-title">
                  2. Acceptance of Terms
                </h2>
              </div>
              <p className="terms-paragraph">
                Your continued use of this website signifies an unconditional acceptance of these Terms, as well as our associated <Link to="/privacy" style={{ color: '#D49A36', textDecoration: 'underline', fontWeight: 600 }}>Privacy Policy</Link>. If you do not agree with any portion of these Terms, you are expressly prohibited from using this website and must discontinue use immediately.
              </p>
              <div className="terms-clause-list">
                <div className="terms-clause-item">
                  <span className="terms-clause-num">2.1</span>
                  <span><strong>Corporate Authority:</strong> If you are entering into these Terms on behalf of a company, partnership, government entity, or other legal organization, you represent and warrant that you possess the full legal authority to bind that entity to these provisions.</span>
                </div>
                <div className="terms-clause-item">
                  <span className="terms-clause-num">2.2</span>
                  <span><strong>Age &amp; Legal Competence:</strong> The services and catalogues on this website are intended solely for individuals who are at least eighteen (18) years of age or who have attained legal majority in their domestic jurisdiction.</span>
                </div>
                <div className="terms-clause-item">
                  <span className="terms-clause-num">2.3</span>
                  <span><strong>Conflict of Terms:</strong> In the event of an irreconcilable conflict between these general Terms and an executed bilateral International Sales Contract or Proforma Invoice signed by an authorized signatory of ConceptExim, the provisions of that specific written contract shall prevail.</span>
                </div>
              </div>
            </section>

            {/* SECTION 3: USE OF THE WEBSITE */}
            <section id="use-of-website" className="terms-section" aria-labelledby="heading-use-website">
              <div className="terms-section-header">
                <div className="terms-section-badge">
                  <Scale size={11} aria-hidden="true" />
                  <span>Clause 03</span>
                </div>
                <h2 id="heading-use-website" className="terms-section-title">
                  3. Use of the Website
                </h2>
              </div>
              <p className="terms-paragraph">
                We grant you a limited, non-exclusive, non-transferable, and revocable license to access and use the ConceptExim website strictly in accordance with these Terms for exploring export catalogues, submitting legitimate RFQs, and conducting commercial due diligence.
              </p>
              <p className="terms-paragraph">
                You expressly agree that you will not participate in, facilitate, or assist any of the following prohibited behaviors:
              </p>
              <div className="terms-check-grid">
                <div className="terms-check-item">
                  <div className="terms-check-icon">✕</div>
                  <span>Automated scraping, harvesting, or bulk copying of commodity prices and technical specs.</span>
                </div>
                <div className="terms-check-item">
                  <div className="terms-check-icon">✕</div>
                  <span>Injecting malware, worms, trojans, or unauthorized script payloads into form endpoints.</span>
                </div>
                <div className="terms-check-item">
                  <div className="terms-check-icon">✕</div>
                  <span>Impersonating any representative, affiliate, carrier, or quality inspector of ConceptExim.</span>
                </div>
                <div className="terms-check-item">
                  <div className="terms-check-icon">✕</div>
                  <span>Submitting fictitious or fraudulent RFQs intended to disrupt trade supply chains or probe market rates.</span>
                </div>
              </div>
            </section>

            {/* SECTION 4: USER ACCOUNTS */}
            <section id="user-accounts" className="terms-section" aria-labelledby="heading-user-accounts">
              <div className="terms-section-header">
                <div className="terms-section-badge">
                  <Scale size={11} aria-hidden="true" />
                  <span>Clause 04</span>
                </div>
                <h2 id="heading-user-accounts" className="terms-section-title">
                  4. User Accounts
                </h2>
              </div>
              <p className="terms-paragraph">
                Certain features of the portal—such as custom RFQ tracking, documentation repositories, and client portals—may require account registration. When creating an account, you must provide accurate, current, and complete corporate information.
              </p>
              <div className="terms-clause-list">
                <div className="terms-clause-item">
                  <span className="terms-clause-num">4.1</span>
                  <span><strong>Credential Security:</strong> You are responsible for safeguarding your login credentials and for any activities or actions conducted under your authenticated account. You agree to notify ConceptExim immediately upon becoming aware of any breach of security or unauthorized access.</span>
                </div>
                <div className="terms-clause-item">
                  <span className="terms-clause-num">4.2</span>
                  <span><strong>Account Suspension:</strong> We reserve the right, at our sole discretion, to suspend or terminate accounts that contain inaccurate verification data, exhibit fraudulent RFQ behavior, or violate applicable international trade sanctions.</span>
                </div>
              </div>
            </section>

            {/* SECTION 5: PRODUCTS & PRODUCT INFORMATION */}
            <section id="products-information" className="terms-section" aria-labelledby="heading-products-info">
              <div className="terms-section-header">
                <div className="terms-section-badge">
                  <Scale size={11} aria-hidden="true" />
                  <span>Clause 05</span>
                </div>
                <h2 id="heading-products-info" className="terms-section-title">
                  5. Products &amp; Product Information
                </h2>
              </div>
              <p className="terms-paragraph">
                The agricultural commodities, industrial minerals, textiles, engineering goods, and specialty chemical products showcased on the ConceptExim portal represent typical commercial specifications, grades, and packaging configurations supplied across global export corridors.
              </p>
              <div className="terms-callout-card">
                <div className="terms-callout-header">
                  <Briefcase size={16} aria-hidden="true" />
                  <span>Natural &amp; Industrial Variances</span>
                </div>
                <p className="terms-callout-body">
                  Agricultural produce, raw minerals, and natural commodities inherently exhibit seasonal variations in color, grain size, moisture percentage, and chemical composition. Digital photographs, sample images, and catalogue specifications are illustrative representations. Final contract specifications, allowable tolerances, and analytical test criteria are governed exclusively by laboratory Certificates of Analysis (CoA) specified in binding commercial agreements.
                </p>
              </div>
            </section>

            {/* SECTION 6: ENQUIRIES & REQUESTS FOR QUOTES */}
            <section id="rfq-enquiries" className="terms-section" aria-labelledby="heading-rfq">
              <div className="terms-section-header">
                <div className="terms-section-badge">
                  <Scale size={11} aria-hidden="true" />
                  <span>Clause 06</span>
                </div>
                <h2 id="heading-rfq" className="terms-section-title">
                  6. Enquiries &amp; Requests for Quotes (RFQ)
                </h2>
              </div>
              <p className="terms-paragraph">
                Submitting a formal inquiry or Request for Quote (RFQ) through our website does not create a binding sales contract or an obligation on ConceptExim to fulfill the requested volume.
              </p>
              <div className="terms-clause-list">
                <div className="terms-clause-item">
                  <span className="terms-clause-num">6.1</span>
                  <span><strong>Informational Nature of Quotes:</strong> Any quotation, price estimate, or freight indication provided in response to an online RFQ is indicative, non-binding, and subject to commodity market fluctuations, vessel space availability, and trade compliance review.</span>
                </div>
                <div className="terms-clause-item">
                  <span className="terms-clause-num">6.2</span>
                  <span><strong>Inquiry Verification:</strong> To prevent market speculation and comply with Know-Your-Customer (KYC) trade protocols, we reserve the right to verify the corporate authenticity of the prospective buyer, corporate registration, tax identifiers, and intended destination port before issuing a formal quotation.</span>
                </div>
              </div>
            </section>

            {/* SECTION 7: ORDERS & TRANSACTIONS */}
            <section id="orders-transactions" className="terms-section" aria-labelledby="heading-orders">
              <div className="terms-section-header">
                <div className="terms-section-badge">
                  <Scale size={11} aria-hidden="true" />
                  <span>Clause 07</span>
                </div>
                <h2 id="heading-orders" className="terms-section-title">
                  7. Orders &amp; Transactions
                </h2>
              </div>
              <p className="terms-paragraph">
                A legally enforceable order or transaction comes into existence only when an official Proforma Invoice (PI) or International Sales Agreement has been duly executed by authorized representatives of both ConceptExim and the Buyer, and the agreed initial financial consideration (such as a Letter of Credit or advance deposit) has been established.
              </p>
              <div className="terms-clause-list">
                <div className="terms-clause-item">
                  <span className="terms-clause-num">7.1</span>
                  <span><strong>Incoterms&reg; Application:</strong> All cross-border shipments, risk transfer points, freight responsibilities, and marine insurance requirements are governed by the specific Incoterms&reg; (such as FOB, CIF, CFR, or EXW) designated in the bilateral sales contract.</span>
                </div>
                <div className="terms-clause-item">
                  <span className="terms-clause-num">7.2</span>
                  <span><strong>Inspection &amp; Quality Control:</strong> Pre-shipment inspections are conducted in accordance with contract terms by internationally recognized independent surveyor agencies (e.g., SGS, Bureau Veritas, or equivalent accredited bodies). Inspection certificates issued at the port of origin serve as definitive verification of shipment specifications unless otherwise agreed in writing.</span>
                </div>
              </div>
            </section>

            {/* SECTION 8: PRICING & AVAILABILITY */}
            <section id="pricing-availability" className="terms-section" aria-labelledby="heading-pricing">
              <div className="terms-section-header">
                <div className="terms-section-badge">
                  <Scale size={11} aria-hidden="true" />
                  <span>Clause 08</span>
                </div>
                <h2 id="heading-pricing" className="terms-section-title">
                  8. Pricing &amp; Availability
                </h2>
              </div>
              <p className="terms-paragraph">
                Unless explicitly declared on an active, formal Proforma Invoice with a specified validity date, all prices, freight estimates, and product availabilities referenced on the website are subject to change without prior notice.
              </p>
              <div className="terms-clause-list">
                <div className="terms-clause-item">
                  <span className="terms-clause-num">8.1</span>
                  <span><strong>Market Volatility:</strong> Global commodity prices, maritime container freight indices, bunker fuel adjustments, and exchange rates fluctuate continually. Any price communicated digitally is valid solely for the duration specified in the corresponding written quotation.</span>
                </div>
                <div className="terms-clause-item">
                  <span className="terms-clause-num">8.2</span>
                  <span><strong>Currency &amp; Taxes:</strong> Quotes are typically rendered in US Dollars (USD) or other mutually designated major trade currencies. Unless explicitly stated, quotes exclude destination import duties, demurrage, destination terminal handling charges (THC), and local value-added taxes (VAT).</span>
                </div>
              </div>
            </section>

            {/* SECTION 9: INTELLECTUAL PROPERTY */}
            <section id="intellectual-property" className="terms-section" aria-labelledby="heading-ip">
              <div className="terms-section-header">
                <div className="terms-section-badge">
                  <Scale size={11} aria-hidden="true" />
                  <span>Clause 09</span>
                </div>
                <h2 id="heading-ip" className="terms-section-title">
                  9. Intellectual Property
                </h2>
              </div>
              <p className="terms-paragraph">
                The website, its source code, architecture, design system, digital catalogues, technical product sheets, brand assets, logos, and graphics are the exclusive property of <span className="terms-placeholder-highlight">ConceptExim Global Logistics &amp; Trade Solutions Ltd.</span> or its licensors and are protected under international copyright, trademark, and intellectual property conventions.
              </p>
              <div className="terms-clause-list">
                <div className="terms-clause-item">
                  <span className="terms-clause-num">9.1</span>
                  <span><strong>Restricted Use:</strong> You may not copy, reproduce, aggregate, republish, upload, post, publicly display, or distribute any part of the site or materials for commercial exploitation without our express prior written permission.</span>
                </div>
                <div className="terms-clause-item">
                  <span className="terms-clause-num">9.2</span>
                  <span><strong>Trademarks:</strong> &quot;ConceptExim&quot;, its trade emblems, and associated brand identifiers may not be used in connection with any product or service that is not ours in any manner that is likely to cause confusion among global trade partners.</span>
                </div>
              </div>
            </section>

            {/* SECTION 10: USER-SUBMITTED INFORMATION */}
            <section id="user-submitted-info" className="terms-section" aria-labelledby="heading-user-info">
              <div className="terms-section-header">
                <div className="terms-section-badge">
                  <Scale size={11} aria-hidden="true" />
                  <span>Clause 10</span>
                </div>
                <h2 id="heading-user-info" className="terms-section-title">
                  10. User-Submitted Information
                </h2>
              </div>
              <p className="terms-paragraph">
                When you submit trade inquiries, technical drawings, specifications, or contact data through our website forms or communication channels, you grant ConceptExim the right to use and process such data to evaluate procurement opportunities, prepare quotations, and satisfy customs and logistics requirements.
              </p>
              <div className="terms-clause-list">
                <div className="terms-clause-item">
                  <span className="terms-clause-num">10.1</span>
                  <span><strong>Confidentiality:</strong> Proprietary commercial details, non-public procurement formulas, and customer identities submitted via formal RFQ are handled in strict commercial confidence in accordance with our <Link to="/privacy" style={{ color: '#D49A36', textDecoration: 'underline', fontWeight: 600 }}>Privacy Policy</Link>.</span>
                </div>
                <div className="terms-clause-item">
                  <span className="terms-clause-num">10.2</span>
                  <span><strong>Accuracy Warranties:</strong> You warrant that all information you submit is accurate, current, and non-infringing upon third-party trade secrets or patents.</span>
                </div>
              </div>
            </section>

            {/* SECTION 11: THIRD-PARTY LINKS & SERVICES */}
            <section id="third-party-links" className="terms-section" aria-labelledby="heading-third-party">
              <div className="terms-section-header">
                <div className="terms-section-badge">
                  <Scale size={11} aria-hidden="true" />
                  <span>Clause 11</span>
                </div>
                <h2 id="heading-third-party" className="terms-section-title">
                  11. Third-Party Links &amp; Services
                </h2>
              </div>
              <p className="terms-paragraph">
                Our portal may include hyperlinks or references to external third-party resources, such as vessel tracking engines, international port authorities, tariff calculation databases, or independent testing laboratories.
              </p>
              <p className="terms-paragraph">
                These links are provided purely as a convenience for global trade research. ConceptExim has no control over, and assumes no responsibility for, the content, security, data privacy policies, or operational practices of any third-party websites or services.
              </p>
            </section>

            {/* SECTION 12: LIMITATION OF LIABILITY */}
            <section id="limitation-liability" className="terms-section" aria-labelledby="heading-liability">
              <div className="terms-section-header">
                <div className="terms-section-badge">
                  <Scale size={11} aria-hidden="true" />
                  <span>Clause 12</span>
                </div>
                <h2 id="heading-liability" className="terms-section-title">
                  12. Limitation of Liability
                </h2>
              </div>
              <p className="terms-paragraph">
                To the fullest extent permitted by applicable commercial law, in no event shall <span className="terms-placeholder-highlight">ConceptExim Global Logistics &amp; Trade Solutions Ltd.</span>, its directors, officers, employees, agents, or suppliers be liable for any indirect, exemplary, incidental, special, or punitive damages—including lost profits, lost revenue, demurrage losses, business interruption, or loss of trade opportunities—arising from your use of this website or inability to access services.
              </p>
              <div className="terms-alert-card">
                <div className="terms-alert-header">
                  <AlertTriangle size={16} aria-hidden="true" />
                  <span>Statutory Liability Cap</span>
                </div>
                <p className="terms-alert-body">
                  Any liability arising out of commercial trade contracts is limited exclusively to the specific contractual terms, remedies, and caps set forth in the executed bilateral sales contract between the parties. Where local laws do not allow the exclusion or limitation of certain liabilities, our total cumulative liability under website usage provisions shall be limited to the minimum extent permitted by the laws of the Republic of India.
                </p>
              </div>
            </section>

            {/* SECTION 13: DISCLAIMER */}
            <section id="disclaimer" className="terms-section" aria-labelledby="heading-disclaimer">
              <div className="terms-section-header">
                <div className="terms-section-badge">
                  <Scale size={11} aria-hidden="true" />
                  <span>Clause 13</span>
                </div>
                <h2 id="heading-disclaimer" className="terms-section-title">
                  13. Disclaimer
                </h2>
              </div>
              <p className="terms-paragraph">
                This website and its contents are provided on an &quot;as is&quot; and &quot;as available&quot; basis without warranties of any kind, either express or implied, including but not limited to warranties of merchantability, fitness for a particular trade purpose, title, or non-infringement.
              </p>
              <div className="terms-clause-list">
                <div className="terms-clause-item">
                  <span className="terms-clause-num">13.1</span>
                  <span><strong>Force Majeure:</strong> ConceptExim shall not be held liable for any delay, performance default, or failure in digital services or trade fulfillment resulting directly or indirectly from acts of God, extreme maritime weather, armed conflict, embargoes, labor strikes, port congestion, customs regulatory shutdowns, or global telecommunication interruptions.</span>
                </div>
                <div className="terms-clause-item">
                  <span className="terms-clause-num">13.2</span>
                  <span><strong>Regulatory Compliance:</strong> Importers are solely responsible for ensuring that imported commodities comply with the statutory sanitary, phytosanitary, labelling, and customs requirements of the destination country.</span>
                </div>
              </div>
            </section>

            {/* SECTION 14: CHANGES TO THESE TERMS */}
            <section id="changes-to-terms" className="terms-section" aria-labelledby="heading-changes">
              <div className="terms-section-header">
                <div className="terms-section-badge">
                  <Scale size={11} aria-hidden="true" />
                  <span>Clause 14</span>
                </div>
                <h2 id="heading-changes" className="terms-section-title">
                  14. Changes to These Terms
                </h2>
              </div>
              <p className="terms-paragraph">
                We reserve the right to review, modify, or update these Terms at our discretion to reflect revisions in international trade regulations, digital security standards, or platform functionalities.
              </p>
              <p className="terms-paragraph">
                When changes are made, the revised version will be published on this page with an updated &quot;Last Updated&quot; reference. Your continued access to the website after the posting of revised Terms constitutes full acknowledgment and acceptance of the amendments.
              </p>
            </section>

            {/* SECTION 15: GOVERNING LAW */}
            <section id="governing-law" className="terms-section" aria-labelledby="heading-governing-law">
              <div className="terms-section-header">
                <div className="terms-section-badge">
                  <Scale size={11} aria-hidden="true" />
                  <span>Clause 15</span>
                </div>
                <h2 id="heading-governing-law" className="terms-section-title">
                  15. Governing Law &amp; Dispute Resolution
                </h2>
              </div>
              <p className="terms-paragraph">
                These Terms and any non-contractual obligations arising out of or in connection with them shall be governed by and construed in accordance with the substantive laws of <span className="terms-placeholder-highlight">Mumbai, Republic of India</span>, without regard to conflict of law principles.
              </p>
              <div className="terms-callout-card">
                <div className="terms-callout-header">
                  <Scale size={16} aria-hidden="true" />
                  <span>Commercial Dispute Resolution &amp; Arbitration</span>
                </div>
                <p className="terms-callout-body">
                  Any controversy, dispute, or claim arising out of or relating to these Terms or bilateral trade transactions that cannot be resolved through amicable commercial negotiations shall be submitted to binding arbitration under the International Chamber of Commerce (ICC) Arbitration Rules, seated in Mumbai, India.
                </p>
              </div>
            </section>

            {/* SECTION 16: CONTACT US */}
            <section id="contact-us" className="terms-section" aria-labelledby="heading-contact-us">
              <div className="terms-section-header">
                <div className="terms-section-badge">
                  <Scale size={11} aria-hidden="true" />
                  <span>Clause 16</span>
                </div>
                <h2 id="heading-contact-us" className="terms-section-title">
                  16. Contact Us &amp; Legal Notices
                </h2>
              </div>
              <p className="terms-paragraph">
                If you have questions, require contract clarifications, or need to transmit formal legal notices regarding these Terms &amp; Conditions, please direct your communications to our international trade legal desk:
              </p>

              {/* Contact Information Box with Premium Colored Badges */}
              <div className="terms-contact-box">
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0B1B3D', margin: '0 0 4px' }}>
                  ConceptExim International Legal &amp; Commercial Compliance Desk
                </h3>
                <p style={{ fontSize: '0.84375rem', color: '#64748B', margin: '0 0 16px' }}>
                  Official Statutory Communications • Incoterms Review • Contract Governance
                </p>

                <div className="terms-contact-grid">
                  <div className="terms-contact-card card-entity">
                    <div className="terms-contact-card-icon icon-entity">
                      <Building2 size={20} strokeWidth={2.2} aria-hidden="true" />
                    </div>
                    <div>
                      <div className="terms-contact-card-label">Corporate Legal Entity</div>
                      <div className="terms-contact-card-val">
                        ConceptExim Global Logistics &amp; Trade Solutions Ltd.
                      </div>
                    </div>
                  </div>

                  <div className="terms-contact-card card-address">
                    <div className="terms-contact-card-icon icon-address">
                      <MapPin size={20} strokeWidth={2.2} aria-hidden="true" />
                    </div>
                    <div>
                      <div className="terms-contact-card-label">Registered Corporate Address</div>
                      <div className="terms-contact-card-val">
                        BKC Commercial Complex, Bandra Kurla Complex, Mumbai 400051, India
                      </div>
                    </div>
                  </div>

                  <div className="terms-contact-card card-email">
                    <div className="terms-contact-card-icon icon-email">
                      <Mail size={20} strokeWidth={2.2} aria-hidden="true" />
                    </div>
                    <div>
                      <div className="terms-contact-card-label">Official Legal &amp; Compliance Email</div>
                      <div className="terms-contact-card-val">
                        <a href="mailto:legal@conceptexim.com">legal@conceptexim.com</a>
                      </div>
                    </div>
                  </div>

                  <div className="terms-contact-card card-jurisdiction">
                    <div className="terms-contact-card-icon icon-jurisdiction">
                      <Scale size={20} strokeWidth={2.2} aria-hidden="true" />
                    </div>
                    <div>
                      <div className="terms-contact-card-label">Governing Jurisdiction &amp; Venue</div>
                      <div className="terms-contact-card-val">
                        Mumbai, Republic of India (ICC Arbitration Rules)
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>

      {/* ------------------------------------------------------------------
          3. FLOATING BACK TO TOP BUTTON
          ------------------------------------------------------------------ */}
      <button
        type="button"
        className={`terms-float-top ${showScrollTop ? 'visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Back to top of Terms &amp; Conditions"
        title="Scroll to top"
      >
        <ArrowUp size={18} aria-hidden="true" />
      </button>
    </div>
  );
};
