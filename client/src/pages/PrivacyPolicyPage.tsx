import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Lock,
  FileText,
  Clock,
  CheckCircle2,
  Mail,
  Phone,
  MapPin,
  ArrowUp,
  ArrowRight,
  Sparkles,
  UserCheck,
  Layers,
  Search,
  Bookmark,
} from 'lucide-react';

const SECTIONS = [
  { id: 'introduction', title: 'Introduction & Scope', num: '01' },
  { id: 'information-collected', title: 'Information We Collect', num: '02' },
  { id: 'how-we-use', title: 'How We Use Information', num: '03' },
  { id: 'information-sharing', title: 'Information Sharing', num: '04' },
  { id: 'cookies-tracking', title: 'Cookies & Tracking', num: '05' },
  { id: 'data-security', title: 'Data Security & Storage', num: '06' },
  { id: 'data-retention', title: 'Data Retention Schedule', num: '07' },
  { id: 'user-rights', title: 'Your Legal Data Rights', num: '08' },
  { id: 'third-party-services', title: 'Third-Party Services', num: '09' },
  { id: 'children-privacy', title: "Children's Privacy", num: '10' },
  { id: 'policy-updates', title: 'Policy Modifications', num: '11' },
  { id: 'contact-us', title: 'Contact Compliance Desk', num: '12' },
];

export const PrivacyPolicyPage: React.FC = () => {
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
    <div className="privacy-page-wrapper">
      {/* ------------------------------------------------------------------
          1. CINEMATIC HERO SECTION
          ------------------------------------------------------------------ */}
      <section className="privacy-hero" aria-labelledby="privacy-hero-heading">
        <div className="privacy-hero-container">
          {/* Breadcrumbs */}
          <nav className="privacy-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span className="privacy-breadcrumb-sep" aria-hidden="true">/</span>
            <span>Legal &amp; Compliance</span>
            <span className="privacy-breadcrumb-sep" aria-hidden="true">/</span>
            <span className="privacy-breadcrumb-current" aria-current="page">Privacy Policy</span>
          </nav>

          {/* Badge */}
          <div className="privacy-hero-badge">
            <ShieldCheck size={14} aria-hidden="true" />
            <span>GLOBAL COMMERCIAL COMPLIANCE FRAMEWORK</span>
          </div>

          {/* Titles */}
          <h1 id="privacy-hero-heading" className="privacy-hero-title">
            Privacy Policy &amp; Data Governance
          </h1>

          <p className="privacy-hero-subtitle">
            ConceptExim is dedicated to protecting the confidentiality, integrity, and privacy of all
            commercial trade communications, procurement inquiries, and enterprise data entrusted to our global platform.
          </p>

          {/* Document Meta Strip */}
          <div className="privacy-meta-strip">
            <div className="privacy-meta-item">
              <Clock size={15} className="privacy-meta-icon" aria-hidden="true" />
              <span>Last Updated: <strong className="privacy-meta-strong">September 2026</strong></span>
            </div>

            <div className="privacy-meta-item">
              <FileText size={15} className="privacy-meta-icon" aria-hidden="true" />
              <span>Version: <strong className="privacy-meta-strong">2.4 (Enterprise Edition)</strong></span>
            </div>

            <div className="privacy-meta-item">
              <Lock size={15} className="privacy-meta-icon" aria-hidden="true" />
              <span>Protocol: <strong className="privacy-meta-strong">AES-256 In-Transit &amp; Rest</strong></span>
            </div>

            <div className="privacy-meta-item">
              <Bookmark size={15} className="privacy-meta-icon" aria-hidden="true" />
              <span>Scope: <strong className="privacy-meta-strong">45+ Cross-Border Corridors</strong></span>
            </div>

            <div className="privacy-status-tag" title="Enterprise Statutory Framework">
              <ShieldCheck size={13} aria-hidden="true" />
              <span>Enterprise Compliance Framework</span>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------
          2. TWO-COLUMN PRIVACY CONTENT
          ------------------------------------------------------------------ */}
      <div className="privacy-main-container">
        <div className="privacy-layout-grid">
          {/* Left Column: Sticky Table of Contents Navigation */}
          <aside className="privacy-sidebar" aria-label="Policy Navigation">
            <div className="privacy-toc-card">
              <div className="privacy-toc-header">
                <div className="privacy-toc-title-group">
                  <span className="privacy-toc-title">
                    <Layers size={14} style={{ color: 'var(--color-gold-primary)' }} aria-hidden="true" />
                    Table of Contents
                  </span>
                  <span className="privacy-toc-sub">12 Governance Articles</span>
                </div>
                <span className="privacy-toc-badge">Official</span>
              </div>

              {/* Real-time Article Search Filter */}
              <div className="privacy-search-wrap">
                <Search size={13} className="privacy-search-icon" aria-hidden="true" />
                <input
                  type="text"
                  placeholder="Filter articles (e.g. cookies, data)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="privacy-search-input"
                  aria-label="Filter policy articles"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="privacy-search-clear"
                    aria-label="Clear search"
                  >
                    ×
                  </button>
                )}
              </div>

              <nav className="privacy-toc-list" aria-label="Table of Contents">
                {filteredSections.length > 0 ? (
                  filteredSections.map((sec) => (
                    <a
                      key={sec.id}
                      href={`#${sec.id}`}
                      onClick={(e) => scrollToSection(sec.id, e)}
                      className={`privacy-toc-link ${activeSection === sec.id ? 'active' : ''}`}
                      aria-current={activeSection === sec.id ? 'true' : undefined}
                    >
                      <span className="privacy-toc-num">{sec.num}</span>
                      <span className="privacy-toc-text">{sec.title}</span>
                      {activeSection === sec.id && (
                        <span className="privacy-toc-active-indicator" aria-hidden="true">
                          <ArrowRight size={12} />
                        </span>
                      )}
                    </a>
                  ))
                ) : (
                  <div className="privacy-search-empty">
                    <span>No articles match &ldquo;{searchQuery}&rdquo;</span>
                    <button type="button" onClick={() => setSearchQuery('')} className="privacy-search-reset-btn">
                      Reset Filter
                    </button>
                  </div>
                )}
              </nav>

              <div className="privacy-toc-footer-strip">
                <Clock size={12} aria-hidden="true" />
                <span>Statutory Scope: Global Trade Operations</span>
              </div>
            </div>

            {/* Sidebar Assistance Card */}
            <div className="privacy-sidebar-help-card">
              <div className="privacy-sidebar-help-badge">
                <ShieldCheck size={13} aria-hidden="true" />
                <span>DIRECT DESK</span>
              </div>
              <h3 className="privacy-sidebar-help-title">
                <span>Trade Compliance Desk</span>
              </h3>
              <p className="privacy-sidebar-help-desc">
                Need statutory customs dossiers, Phytosanitary certificates, or escrow privacy verification?
              </p>
              <Link to="/contact" className="privacy-sidebar-help-btn">
                <span>Contact Legal Counsel</span>
                <ArrowRight size={13} aria-hidden="true" />
              </Link>
            </div>
          </aside>

          {/* Right Column: Privacy Content Document (Like a Page) */}
          <main
            ref={contentRef}
            onScroll={handlePanelScroll}
            className="privacy-content-col"
            tabIndex={0}
            aria-label="Privacy Policy Document"
          >
            {/* Executive Statutory Compliance Seal */}
            <div className="privacy-statutory-seal" role="region" aria-label="Official Framework Notice">
              <div className="privacy-seal-icon-box">
                <ShieldCheck size={22} className="privacy-seal-icon" aria-hidden="true" />
              </div>
              <div className="privacy-seal-body">
                <div className="privacy-seal-header-row">
                  <span className="privacy-seal-badge">STATUTORY COMPLIANCE FRAMEWORK</span>
                  <span className="privacy-seal-edition">ISO 27001 &amp; INCOTERMS 2020 COMPLIANT</span>
                </div>
                <h3 className="privacy-seal-title">Enterprise Commercial Privacy &amp; Data Governance Charter</h3>
                <p className="privacy-seal-desc">
                  This document constitutes ConceptExim&apos;s authoritative cross-border commercial data governance policy.
                  All protocols detailed herein govern institutional procurement requests, RFQs, maritime freight manifests,
                  and corporate client information across all active trade corridors.
                </p>
              </div>
            </div>

            {/* Section 1: Introduction */}
            <section id="introduction" className="privacy-section" aria-labelledby="heading-sec-1">
              <div className="privacy-section-header">
                <div className="privacy-section-badge">Section 01</div>
                <h2 id="heading-sec-1" className="privacy-section-title">1. Introduction &amp; Scope</h2>
              </div>

              <p className="privacy-paragraph">
                ConceptExim (&ldquo;Company&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) operates an
                international business-to-business (B2B) cross-border trade facilitation platform. We connect certified
                agricultural commodity producers, industrial manufacturers, and raw material aggregators with institutional
                importers, freight forwarders, and distribution enterprises across more than 45 global destinations.
              </p>

              <p className="privacy-paragraph">
                This Privacy Policy describes the policies and procedures governing how we collect, store, safeguard,
                process, and disclose data when you interact with our website, request commercial route quotations (RFQs),
                review inspection protocols, or establish trade contracts with our commercial trade desk.
              </p>

              <div className="privacy-callout-card">
                <div className="privacy-callout-header">
                  <div className="privacy-callout-badge-icon">
                    <Sparkles size={15} aria-hidden="true" />
                  </div>
                  <div>
                    <span className="privacy-callout-kicker">Core Operational Principle</span>
                    <h4 className="privacy-callout-heading">Non-Brokerage Commercial Integrity Guarantee</h4>
                  </div>
                </div>
                <p className="privacy-callout-body">
                  ConceptExim operates exclusively in a verified B2B trade environment. We do not sell, rent, monetize, or broker
                  corporate trade records, commodity pricing bids, or client contact registries to external marketing third parties.
                </p>
              </div>
            </section>

            {/* Section 2: Information We Collect */}
            <section id="information-collected" className="privacy-section" aria-labelledby="heading-sec-2">
              <div className="privacy-section-header">
                <div className="privacy-section-badge">Section 02</div>
                <h2 id="heading-sec-2" className="privacy-section-title">2. Information We Collect</h2>
              </div>

              <p className="privacy-paragraph">
                To execute international freight bookings, perform agricultural quality compliance, and provide
                legally binding commercial proforma invoices, we collect specific commercial and technical information:
              </p>

              <div className="privacy-table-wrap">
                <table className="privacy-table" aria-label="Data Categories Table">
                  <thead>
                    <tr>
                      <th scope="col">Data Category</th>
                      <th scope="col">Examples of Collected Data</th>
                      <th scope="col">Commercial Purpose</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><span className="privacy-table-tag">Corporate Identity</span></td>
                      <td>Registered business name, tax identification (e.g. GSTIN/IEC/VAT), corporate address, and jurisdiction.</td>
                      <td>Corporate KYC vetting, AML compliance, and statutory proforma invoice generation.</td>
                    </tr>
                    <tr>
                      <td><span className="privacy-table-tag">Commercial Point of Contact</span></td>
                      <td>Authorized procurement officer name, corporate email address, direct phone/WhatsApp numbers, and executive title.</td>
                      <td>Order management, vessel tracking alerts, and contract negotiation communications.</td>
                    </tr>
                    <tr>
                      <td><span className="privacy-table-tag">Trade &amp; Commodity Specs</span></td>
                      <td>Target commodity specifications (e.g. moisture %, grain size, purity grade), delivery port (Incoterms 2020), volume in MT.</td>
                      <td>Structuring mill supply contracts, laboratory inspection benchmarks, and freight allocations.</td>
                    </tr>
                    <tr>
                      <td><span className="privacy-table-tag">Technical Telemetry</span></td>
                      <td>IP address, browser user-agent, operating system, session referral source, and security audit logs.</td>
                      <td>Platform security, DDoS prevention, rate limiting, and optimization of cross-border access speeds.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Section 3: How We Use Information */}
            <section id="how-we-use" className="privacy-section" aria-labelledby="heading-sec-3">
              <div className="privacy-section-header">
                <div className="privacy-section-badge">Section 03</div>
                <h2 id="heading-sec-3" className="privacy-section-title">3. How We Use Information</h2>
              </div>

              <p className="privacy-paragraph">
                Information collected by ConceptExim is utilized exclusively to provide seamless, secure, and compliant
                maritime and overland export/import operations:
              </p>

              <div className="privacy-check-grid">
                <div className="privacy-check-item">
                  <span className="privacy-check-icon"><CheckCircle2 size={12} aria-hidden="true" /></span>
                  <span><strong>FOB &amp; CIF Quotations:</strong> Calculating real-time bunker adjustments and container charter rates.</span>
                </div>
                <div className="privacy-check-item">
                  <span className="privacy-check-icon"><CheckCircle2 size={12} aria-hidden="true" /></span>
                  <span><strong>Quality Dossiers:</strong> Coordinating pre-shipment inspections (PSI) with accredited testing authorities.</span>
                </div>
                <div className="privacy-check-item">
                  <span className="privacy-check-icon"><CheckCircle2 size={12} aria-hidden="true" /></span>
                  <span><strong>Customs Documentation:</strong> Preparing bills of lading, certificates of origin, and consular clearances.</span>
                </div>
                <div className="privacy-check-item">
                  <span className="privacy-check-icon"><CheckCircle2 size={12} aria-hidden="true" /></span>
                  <span><strong>Vessel Telemetry:</strong> Delivering real-time cargo container tracking and milestone arrival notices.</span>
                </div>
              </div>
            </section>

            {/* Section 4: Information Sharing */}
            <section id="information-sharing" className="privacy-section" aria-labelledby="heading-sec-4">
              <div className="privacy-section-header">
                <div className="privacy-section-badge">Section 04</div>
                <h2 id="heading-sec-4" className="privacy-section-title">4. Information Sharing &amp; Third Parties</h2>
              </div>

              <p className="privacy-paragraph">
                Due to the multifaceted nature of international trade, executing commercial contracts requires
                transmitting relevant consignment details to accredited logistics and regulatory stakeholders:
              </p>

              <ul style={{ paddingLeft: 20, color: '#334155', lineHeight: 1.65, fontSize: '0.90625rem' }}>
                <li style={{ marginBottom: 8 }}>
                  <strong>Statutory Port &amp; Customs Authorities:</strong> Customs departments at departure and destination
                  ports to obtain legal export/import declarations (e.g., Indian Customs ICEGATE, EU Customs AEO, Dubai Customs).
                </li>
                <li style={{ marginBottom: 8 }}>
                  <strong>Independent Inspection Agencies:</strong> Accredited testing bodies such as SGS, Bureau Veritas,
                  or Intertek to verify batch quality, moisture content, and phytosanitary conformity.
                </li>
                <li style={{ marginBottom: 8 }}>
                  <strong>Tier-1 Maritime &amp; Multimodal Carriers:</strong> Ocean liner allocations (e.g. Maersk, MSC, Hapag-Lloyd)
                  for container booking, manifest filings, and Bill of Lading generation.
                </li>
                <li>
                  <strong>Authorized Financial Institutions:</strong> Issuing and advising banks strictly for Irrevocable Letter of Credit (L/C)
                  document presentations and trade finance compliance.
                </li>
              </ul>
            </section>

            {/* Section 5: Cookies & Tracking */}
            <section id="cookies-tracking" className="privacy-section" aria-labelledby="heading-sec-5">
              <div className="privacy-section-header">
                <div className="privacy-section-badge">Section 05</div>
                <h2 id="heading-sec-5" className="privacy-section-title">5. Cookies &amp; Platform Tracking</h2>
              </div>

              <p className="privacy-paragraph">
                ConceptExim uses necessary technical cookies and local storage tokens strictly to maintain session security,
                user authentication state, and quotation basket integrity across device viewports:
              </p>

              <div className="privacy-table-wrap">
                <table className="privacy-table" aria-label="Cookie Breakdown Table">
                  <thead>
                    <tr>
                      <th scope="col">Cookie Type</th>
                      <th scope="col">Identifier / Storage</th>
                      <th scope="col">Duration &amp; Function</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>Essential Auth Token</strong></td>
                      <td><code>conceptexim_auth_token</code></td>
                      <td>Session duration. Validates authenticated client and admin portal requests.</td>
                    </tr>
                    <tr>
                      <td><strong>RFQ Basket Cache</strong></td>
                      <td><code>conceptexim_quote_basket</code></td>
                      <td>30 days local storage. Preserves selected commodity specs in your quotation drawer.</td>
                    </tr>
                    <tr>
                      <td><strong>Security Telemetry</strong></td>
                      <td><code>conceptexim_csrf_nonce</code></td>
                      <td>Session duration. Protects quotation submissions against Cross-Site Request Forgery.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Section 6: Data Security */}
            <section id="data-security" className="privacy-section" aria-labelledby="heading-sec-6">
              <div className="privacy-section-header">
                <div className="privacy-section-badge">Section 06</div>
                <h2 id="heading-sec-6" className="privacy-section-title">6. Data Security &amp; Storage Architecture</h2>
              </div>

              <p className="privacy-paragraph">
                We implement institutional-grade physical, technological, and administrative controls to protect
                commercial contracts, laboratory reports, and identity records:
              </p>

              <div className="privacy-callout-card security-variant">
                <div className="privacy-callout-header">
                  <div className="privacy-callout-badge-icon security-badge">
                    <Lock size={15} aria-hidden="true" />
                  </div>
                  <div>
                    <span className="privacy-callout-kicker">Security Safeguard Architecture</span>
                    <h4 className="privacy-callout-heading">Military-Grade Commercial Encryption</h4>
                  </div>
                </div>
                <p className="privacy-callout-body">
                  All trade data in transit is encrypted using Transport Layer Security (TLS 1.3). Stationary archives
                  and database records are stored with AES-256 bit encryption, governed by multi-factor administrative authentication
                  and role-based access control (RBAC).
                </p>
              </div>
            </section>

            {/* Section 7: Data Retention */}
            <section id="data-retention" className="privacy-section" aria-labelledby="heading-sec-7">
              <div className="privacy-section-header">
                <div className="privacy-section-badge">Section 07</div>
                <h2 id="heading-sec-7" className="privacy-section-title">7. Data Retention Schedule</h2>
              </div>

              <p className="privacy-paragraph">
                Commercial records are retained in compliance with international maritime commerce, taxation,
                and statutory customs auditing requirements:
              </p>

              <ul style={{ paddingLeft: 20, color: '#334155', lineHeight: 1.65, fontSize: '0.90625rem' }}>
                <li style={{ marginBottom: 8 }}>
                  <strong>Executed Commercial Contracts &amp; Invoices:</strong> Retained for a minimum of 7 years in accordance with
                  international commercial accounting and customs audit statutes.
                </li>
                <li style={{ marginBottom: 8 }}>
                  <strong>Certificates of Analysis (COA) &amp; Phytosanitary Dossiers:</strong> Retained for 5 years to support warranty,
                  origin provenance, and quality arbitration claims.
                </li>
                <li>
                  <strong>Unconverted Quotation Requests:</strong> Automatically purged from active CRM indexing after 180 days
                  unless an active commercial engagement is renewed.
                </li>
              </ul>
            </section>

            {/* Section 8: User Rights */}
            <section id="user-rights" className="privacy-section" aria-labelledby="heading-sec-8">
              <div className="privacy-section-header">
                <div className="privacy-section-badge">Section 08</div>
                <h2 id="heading-sec-8" className="privacy-section-title">8. Your Legal Data Rights</h2>
              </div>

              <p className="privacy-paragraph">
                Depending on your operating corporate jurisdiction (including provisions under GDPR for EU partners
                or respective national consumer and corporate data protection acts), your authorized representatives hold the following rights:
              </p>

              <div className="privacy-check-grid">
                <div className="privacy-check-item">
                  <span className="privacy-check-icon"><UserCheck size={12} aria-hidden="true" /></span>
                  <span><strong>Right to Access:</strong> Request a complete copy of company data and transaction history.</span>
                </div>
                <div className="privacy-check-item">
                  <span className="privacy-check-icon"><UserCheck size={12} aria-hidden="true" /></span>
                  <span><strong>Right to Rectification:</strong> Promptly correct erroneous corporate contact or billing credentials.</span>
                </div>
                <div className="privacy-check-item">
                  <span className="privacy-check-icon"><UserCheck size={12} aria-hidden="true" /></span>
                  <span><strong>Right to Erasure:</strong> Request data deletion, subject to mandatory customs retention statutes.</span>
                </div>
                <div className="privacy-check-item">
                  <span className="privacy-check-icon"><UserCheck size={12} aria-hidden="true" /></span>
                  <span><strong>Right to Restrict:</strong> Limit processing during contested commercial audits or contract disputes.</span>
                </div>
              </div>
            </section>

            {/* Section 9: Third-Party Services */}
            <section id="third-party-services" className="privacy-section" aria-labelledby="heading-sec-9">
              <div className="privacy-section-header">
                <div className="privacy-section-badge">Section 09</div>
                <h2 id="heading-sec-9" className="privacy-section-title">9. Third-Party Services &amp; Links</h2>
              </div>

              <p className="privacy-paragraph">
                Our platform may contain links or integrated APIs to independent maritime port terminals, ocean carrier
                tracking systems, or currency exchange rate calculators. ConceptExim is not responsible for the independent
                privacy practices or data protocols of external domains. We encourage users to review the privacy policies
                of any external services they access.
              </p>
            </section>

            {/* Section 10: Children's Privacy */}
            <section id="children-privacy" className="privacy-section" aria-labelledby="heading-sec-10">
              <div className="privacy-section-header">
                <div className="privacy-section-badge">Section 10</div>
                <h2 id="heading-sec-10" className="privacy-section-title">10. Children&apos;s Privacy &amp; Commercial Scope</h2>
              </div>

              <p className="privacy-paragraph">
                ConceptExim operates exclusively within institutional wholesale import, export, and global maritime commerce.
                Our services are strictly intended for authorized business representatives over the age of 18. We do not knowingly
                collect, request, or store information from minors.
              </p>
            </section>

            {/* Section 11: Policy Updates */}
            <section id="policy-updates" className="privacy-section" aria-labelledby="heading-sec-11">
              <div className="privacy-section-header">
                <div className="privacy-section-badge">Section 11</div>
                <h2 id="heading-sec-11" className="privacy-section-title">11. Policy Modifications &amp; Revisions</h2>
              </div>

              <p className="privacy-paragraph">
                We periodically review and update this Privacy Policy to reflect changing statutory port mandates, international
                maritime treaties (e.g. IMO 2020), and evolving cybersecurity standards. When changes occur, the revised document
                will be posted immediately on this URL with an updated &ldquo;Last Updated&rdquo; timestamp. For registered corporate clients
                with ongoing trade routes, material changes will be communicated via corporate email notice.
              </p>
            </section>

            {/* Section 12: Contact Us */}
            <section id="contact-us" className="privacy-section" aria-labelledby="heading-sec-12">
              <div className="privacy-section-header">
                <div className="privacy-section-badge">Section 12</div>
                <h2 id="heading-sec-12" className="privacy-section-title">12. Data Privacy Officer &amp; Contact Us</h2>
              </div>

              <p className="privacy-paragraph">
                If you have questions, statutory compliance requests, or wish to exercise your legal data rights under
                this framework, please contact our Data Governance &amp; Trade Compliance Desk:
              </p>

              <div className="privacy-contact-box">
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0B1B3D', margin: '0 0 4px' }}>
                  ConceptExim Trade Compliance &amp; Legal Desk
                </h3>
                <p style={{ fontSize: '0.84375rem', color: '#64748B', margin: '0 0 16px' }}>
                  Statutory Inquiries • Data Protection • Incoterms Compliance
                </p>

                <div className="privacy-contact-grid">
                  <div className="privacy-contact-card card-address">
                    <div className="privacy-contact-card-icon icon-address">
                      <MapPin size={20} strokeWidth={2.2} aria-hidden="true" />
                    </div>
                    <div>
                      <div className="privacy-contact-card-label">Corporate Address</div>
                      <div className="privacy-contact-card-val">
                        BKC Commercial Complex, Bandra Kurla Complex, Mumbai 400051, India
                      </div>
                    </div>
                  </div>

                  <div className="privacy-contact-card card-email">
                    <div className="privacy-contact-card-icon icon-email">
                      <Mail size={20} strokeWidth={2.2} aria-hidden="true" />
                    </div>
                    <div>
                      <div className="privacy-contact-card-label">Privacy &amp; Compliance Email</div>
                      <div className="privacy-contact-card-val">
                        <a href="mailto:privacy@conceptexim.com">privacy@conceptexim.com</a>
                      </div>
                    </div>
                  </div>

                  <div className="privacy-contact-card card-phone">
                    <div className="privacy-contact-card-icon icon-phone">
                      <Phone size={20} strokeWidth={2.2} aria-hidden="true" />
                    </div>
                    <div>
                      <div className="privacy-contact-card-label">Commercial Telephone</div>
                      <div className="privacy-contact-card-val">
                        <a href="tel:+912245897700">+91 (0) 22 4589 7700</a>
                      </div>
                    </div>
                  </div>

                  <div className="privacy-contact-card card-hours">
                    <div className="privacy-contact-card-icon icon-hours">
                      <Clock size={20} strokeWidth={2.2} aria-hidden="true" />
                    </div>
                    <div>
                      <div className="privacy-contact-card-label">Operating Hours</div>
                      <div className="privacy-contact-card-val">
                        Monday – Friday: 08:00 – 19:00 IST
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>

      {/* Floating Back to Top Button */}
      <button
        type="button"
        className={`privacy-float-top ${showScrollTop ? 'visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Back to top"
        title="Scroll to top"
      >
        <ArrowUp size={18} aria-hidden="true" />
      </button>
    </div>
  );
};
