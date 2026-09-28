import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Link, useNavigate, useOutletContext } from 'react-router-dom';
import {
  Ship,
  Plane,
  Globe,
  Truck,
  ShieldCheck,
  Users,
  PackageCheck,
  Laptop,
  ArrowRight,
  ArrowLeft,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  Clock,
  Award,
  Sparkles,
  Building2,
  Scale,
  HelpCircle,
  FileCheck,
  Compass,
  Briefcase,
  PhoneCall,
  Layers,
  Sliders,
  Send,
  Home,
} from 'lucide-react';
import {
  SERVICES_CATALOG,
  getServiceById,
  type DetailedService,
} from '../data/servicesData.js';
import '../styles/services-detail.css';

interface OutletContextType {
  openQuoteModal: (productOrServiceName?: string, quantity?: number) => void;
}

export const ServiceDetailPage: React.FC = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();
  const { openQuoteModal } = useOutletContext<OutletContextType>();

  const [activeTab, setActiveTab] = useState<'capabilities' | 'workflow' | 'specs' | 'case-study' | 'faqs'>('capabilities');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Estimator Widget State
  const [cargoType, setCargoType] = useState<string>('Agricultural Commodity (Rice / Grains)');
  const [containerCount, setContainerCount] = useState<number>(2);
  const [originRegion, setOriginRegion] = useState<string>('Mundra Port, India');
  const [destRegion, setDestRegion] = useState<string>('Jebel Ali, UAE');
  const [selectedIncoTerm, setSelectedIncoTerm] = useState<string>('CIF');

  const service: DetailedService | undefined = useMemo(() => {
    if (!serviceId) return undefined;
    return getServiceById(serviceId);
  }, [serviceId]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (service) {
      document.title = `${service.name} — Commercial Trade Services | ConceptExim`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute(
          'content',
          `${service.name}: ${service.shortDesc} Operational trade execution, customs clearance, and global freight by ConceptExim.`
        );
      }
    } else {
      document.title = 'Trade Service Not Found — ConceptExim';
    }
  }, [service]);

  // If service ID is an alias (e.g. export-solutions -> export-management), smoothly sync URL
  useEffect(() => {
    if (service && serviceId && service.id !== serviceId.toLowerCase()) {
      navigate(`/services/${service.id}`, { replace: true });
    }
  }, [service, serviceId, navigate]);

  if (!service) {
    return (
      <div className="service-not-found-page">
        <div className="container">
          <div className="service-not-found-card">
            <Compass size={48} className="service-not-found-icon" />
            <h1 className="service-not-found-title">Commercial Service Not Found</h1>
            <p className="service-not-found-desc">
              We couldn&apos;t find an active trade service matching &ldquo;{serviceId}&rdquo;. Explore our comprehensive core services catalog below.
            </p>
            <div className="service-not-found-actions">
              <Link to="/services" className="service-btn-primary">
                <ArrowLeft size={16} />
                <span>Return to Services Catalog</span>
              </Link>
              <Link to="/" className="service-btn-secondary">
                <span>Go to Homepage</span>
              </Link>
            </div>

            <div className="service-quick-links-grid">
              {SERVICES_CATALOG.map((s) => (
                <Link key={s.id} to={`/services/${s.id}`} className="service-quick-link-item">
                  <span className="quick-link-name">{s.name}</span>
                  <span className="quick-link-badge">{s.category}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const renderServiceIcon = (name: string, size = 20) => {
    switch (name) {
      case 'Ship':
        return <Ship size={size} />;
      case 'Plane':
        return <Plane size={size} />;
      case 'Globe':
        return <Globe size={size} />;
      case 'Truck':
        return <Truck size={size} />;
      case 'ShieldCheck':
        return <ShieldCheck size={size} />;
      case 'Users':
        return <Users size={size} />;
      case 'PackageCheck':
        return <PackageCheck size={size} />;
      case 'Laptop':
        return <Laptop size={size} />;
      default:
        return <Compass size={size} />;
    }
  };

  const relatedServices = SERVICES_CATALOG.filter((s) =>
    service.relatedServiceIds.includes(s.id)
  );

  const handleOpenEstimateQuote = () => {
    const summary = `${service.name} Quote Request: ${containerCount}x Containers (${cargoType}) from ${originRegion} to ${destRegion} on ${selectedIncoTerm} terms`;
    openQuoteModal(summary, containerCount * 25);
  };

  return (
    <div className={`service-detail-wrapper ${service.themeClass}`}>
      {/* 1. TOP SUBNAV / BREADCRUMBS BAR */}
      <div className="service-detail-subnav">
        <div className="container">
          <div className="service-subnav-row">
            <nav className="service-breadcrumbs" aria-label="Breadcrumb">
              <Link to="/" className="breadcrumb-link" title="Return to Homepage">
                <Home size={13} className="breadcrumb-home-icon" />
                <span>Home</span>
              </Link>
              <span className="breadcrumb-sep" aria-hidden="true">/</span>
              <Link to="/services" className="breadcrumb-link" title="View All Trade Services">Services</Link>
              <span className="breadcrumb-sep" aria-hidden="true">/</span>
              <span className="breadcrumb-current" aria-current="page">
                <span className="breadcrumb-dot" aria-hidden="true" />
                <span>{service.name}</span>
              </span>
            </nav>

            <div className="service-subnav-actions">
              <Link to="/services" className="service-back-link">
                <ArrowLeft size={14} />
                <span>All Trade Services</span>
              </Link>

              {/* Quick Switcher dropdown with custom arrow */}
              <div className="service-quick-switcher">
                <span className="quick-switch-label">Switch Service:</span>
                <div className="service-select-wrap">
                  <select
                    value={service.id}
                    onChange={(e) => navigate(`/services/${e.target.value}`)}
                    className="service-select-dropdown"
                    aria-label="Select Trade Service"
                  >
                    {SERVICES_CATALOG.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} ({s.category})
                      </option>
                    ))}
                  </select>
                  <span className="service-select-arrow" aria-hidden="true">
                    <ChevronDown size={14} />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. EXECUTIVE HERO SECTION */}
      <header className="service-hero-section" aria-label={`${service.name} Overview`}>
        <div
          className="service-hero-bg"
          style={{ backgroundImage: `url(${service.image})` }}
        >
          <div className="service-hero-overlay" />
          <div className="service-hero-mesh" />
        </div>

        <div className="container service-hero-inner">
          <div className="service-hero-grid">
            <div className="service-hero-left">
              <div className="service-hero-badges-row">
                <span className="service-category-pill">
                  <span className="service-live-dot" />
                  <span>{service.category}</span>
                </span>
                <span className="service-badge-pill">
                  <CheckCircle2 size={13} strokeWidth={2.5} />
                  <span>{service.badge}</span>
                </span>
              </div>

              <h1 className="service-hero-title">
                {service.name.split(' ')[0]}{' '}
                <span className="service-hero-gold">
                  {service.name.split(' ').slice(1).join(' ')}
                </span>
              </h1>

              <p className="service-hero-tagline">{service.tagline}</p>

              <div className="service-hero-desc-group">
                {service.overview.map((paragraph, pIdx) => (
                  <p key={pIdx} className="service-hero-desc">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Pills / Capabilities Tags */}
              <div className="service-hero-pills" aria-label="Key Service Tags">
                {service.pills.map((pill, idx) => (
                  <span key={idx} className="service-hero-pill-item">
                    <Check size={12} strokeWidth={2.5} />
                    <span>{pill}</span>
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="service-hero-actions">
                <button
                  type="button"
                  onClick={() => openQuoteModal(service.name)}
                  className="service-hero-cta-btn"
                  id="btn-hero-quote-service"
                >
                  <Sparkles size={16} />
                  <span>Request Commercial RFQ</span>
                  <ArrowRight size={15} />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById('service-deep-dive');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="service-hero-secondary-btn"
                >
                  <span>Explore Capabilities</span>
                  <ChevronDown size={15} />
                </button>

                <Link to="/contact" className="service-hero-contact-btn">
                  <PhoneCall size={14} />
                  <span>Consult Specialist</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Hero Visual Frame & Stats Card */}
            <div className="service-hero-right">
              <div className="service-hero-visual-card">
                <div className="service-visual-image-wrap">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="service-visual-img"
                  />
                  <div className="service-visual-scrim" />
                  <div className="service-visual-icon-float">
                    {renderServiceIcon(service.iconName, 26)}
                  </div>
                  <div className="service-visual-status-pill">
                    <span className="pulse-ping" />
                    <span className="pulse-dot" />
                    <span>Operational Desk Active</span>
                  </div>
                </div>

                {/* Key Quantifiable Benchmarks Strip */}
                <div className="service-hero-stats-panel">
                  <div className="service-stats-grid">
                    {service.keyStats.map((stat, sIdx) => (
                      <div key={sIdx} className="service-stat-box">
                        <span className="service-stat-val">{stat.value}</span>
                        <span className="service-stat-label">{stat.label}</span>
                        <span className="service-stat-desc">{stat.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 3. DEEP DIVE TABS NAVIGATION SECTION */}
      <section id="service-deep-dive" className="service-tabs-section">
        <div className="container">
          <div className="service-tabs-header-wrap">
            <div className="service-tabs-eyebrow">
              <Briefcase size={14} />
              <span>COMPREHENSIVE OPERATIONAL SPECIFICATIONS</span>
            </div>
            <h2 className="service-tabs-title">
              Deep-Dive Operational <span className="service-gold-text">Blueprint</span>
            </h2>
            <p className="service-tabs-desc">
              Inspect technical capabilities, step-by-step milestone workflows, compliance frameworks, and real-world case track records for {service.name}.
            </p>

            {/* Navigation Tabs Bar */}
            <div className="service-tabs-nav" role="tablist" aria-label="Service Deep Dive Navigation">
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'capabilities'}
                className={`service-tab-btn ${activeTab === 'capabilities' ? 'is-active' : ''}`}
                onClick={() => setActiveTab('capabilities')}
              >
                <Layers size={16} />
                <span>Core Capabilities (6)</span>
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'workflow'}
                className={`service-tab-btn ${activeTab === 'workflow' ? 'is-active' : ''}`}
                onClick={() => setActiveTab('workflow')}
              >
                <Clock size={16} />
                <span>Milestone Workflow (5 Stages)</span>
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'specs'}
                className={`service-tab-btn ${activeTab === 'specs' ? 'is-active' : ''}`}
                onClick={() => setActiveTab('specs')}
              >
                <Scale size={16} />
                <span>Technical Specifications</span>
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'case-study'}
                className={`service-tab-btn ${activeTab === 'case-study' ? 'is-active' : ''}`}
                onClick={() => setActiveTab('case-study')}
              >
                <Award size={16} />
                <span>Proven Case Study</span>
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'faqs'}
                className={`service-tab-btn ${activeTab === 'faqs' ? 'is-active' : ''}`}
                onClick={() => setActiveTab('faqs')}
              >
                <HelpCircle size={16} />
                <span>Operational FAQs</span>
              </button>
            </div>
          </div>

          {/* TAB PANELS */}
          <div className="service-tab-content-area">
            {/* TAB 1: CAPABILITIES */}
            {activeTab === 'capabilities' && (
              <div className="service-tab-panel tab-capabilities">
                <div className="service-capabilities-grid">
                  {service.capabilities.map((cap, cIdx) => (
                    <div key={cIdx} className="service-cap-card">
                      <div className="service-cap-top">
                        <div className="service-cap-index">0{cIdx + 1}</div>
                        {cap.highlight && (
                          <span className="service-cap-highlight">{cap.highlight}</span>
                        )}
                      </div>
                      <h3 className="service-cap-title">{cap.title}</h3>
                      <p className="service-cap-desc">{cap.desc}</p>
                      <div className="service-cap-footer">
                        <span className="service-cap-check">
                          <Check size={13} />
                          <span>Enterprise SLA Guaranteed</span>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 2: MILESTONE WORKFLOW */}
            {activeTab === 'workflow' && (
              <div className="service-tab-panel tab-workflow">
                <div className="service-workflow-timeline">
                  {service.workflow.map((item) => (
                    <div key={item.step} className="service-workflow-card">
                      <div className="workflow-card-left">
                        <div className="workflow-step-badge">{item.step}</div>
                        <div className="workflow-phase-tag">{item.phase}</div>
                      </div>

                      <div className="workflow-card-center">
                        <h3 className="workflow-step-title">{item.title}</h3>
                        <p className="workflow-step-description">{item.description}</p>
                        <div className="workflow-deliverable-box">
                          <FileCheck size={14} className="deliverable-icon" />
                          <span className="deliverable-label">Key Deliverable:</span>
                          <span className="deliverable-val">{item.deliverable}</span>
                        </div>
                      </div>

                      <div className="workflow-card-right">
                        <div className="workflow-duration-badge">
                          <Clock size={13} />
                          <span>{item.duration}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            openQuoteModal(`${service.name} - Stage ${item.step}: ${item.title}`)
                          }
                          className="workflow-inquire-btn"
                          title={`Inquire about stage ${item.step}`}
                        >
                          <span>Inquire Phase</span>
                          <ChevronRight size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: SPECIFICATIONS */}
            {activeTab === 'specs' && (
              <div className="service-tab-panel tab-specs">
                <div className="service-specs-layout">
                  <div className="service-specs-table-card">
                    <div className="specs-card-header">
                      <Scale size={18} />
                      <h3>Commercial Terms &amp; Operational Matrix</h3>
                    </div>
                    <div className="specs-table-rows">
                      {service.specifications.map((spec, sIdx) => (
                        <div key={sIdx} className="specs-table-row">
                          <div className="specs-label-cell">{spec.label}</div>
                          <div className="specs-value-cell">{spec.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Accreditations & Standards Card */}
                  <div className="service-accreditations-card">
                    <div className="accred-card-header">
                      <ShieldCheck size={18} />
                      <h3>Regulatory Compliance &amp; Standards</h3>
                    </div>
                    <p className="accred-card-desc">
                      Every commercial mandate executed under {service.name} strictly conforms to the following statutory and multilateral trade authorities:
                    </p>
                    <div className="accred-badges-list">
                      {service.complianceBadges.map((badge, bIdx) => (
                        <div key={bIdx} className="accred-badge-item">
                          <CheckCircle2 size={16} className="accred-check" />
                          <span>{badge}</span>
                        </div>
                      ))}
                    </div>

                    <div className="accred-trust-box">
                      <span className="trust-box-title">Institutional Oversight</span>
                      <p className="trust-box-text">
                        Audited by accredited third-party surveyors and fully aligned with ICC INCOTERMS 2020 international standards.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: CASE STUDY */}
            {activeTab === 'case-study' && (
              <div className="service-tab-panel tab-case-study">
                <div className="service-case-study-card">
                  <div className="case-study-header">
                    <div className="case-study-eyebrow">
                      <Award size={15} />
                      <span>PROVEN TRADE RECORD &amp; CLIENT EXECUTION</span>
                    </div>
                    <h3 className="case-study-title">{service.caseStudy.title}</h3>
                    <div className="case-study-client-tag">
                      <Building2 size={14} />
                      <span>Client: {service.caseStudy.client}</span>
                    </div>
                  </div>

                  <div className="case-study-body-grid">
                    <div className="case-study-box challenge-box">
                      <h4 className="case-box-title">The Commercial Challenge</h4>
                      <p className="case-box-desc">{service.caseStudy.challenge}</p>
                    </div>

                    <div className="case-study-box solution-box">
                      <h4 className="case-box-title">ConceptExim Solution</h4>
                      <p className="case-box-desc">{service.caseStudy.solution}</p>
                    </div>

                    <div className="case-study-box result-box">
                      <h4 className="case-box-title">Measurable Result</h4>
                      <p className="case-box-desc">{service.caseStudy.result}</p>
                    </div>
                  </div>

                  <div className="case-study-footer">
                    <div className="case-metric-highlight">
                      <Sparkles size={16} className="metric-sparkle" />
                      <span>{service.caseStudy.metrics}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => openQuoteModal(`${service.name} Consultation (Re: ${service.caseStudy.title})`)}
                      className="case-study-cta-btn"
                    >
                      <span>Discuss a Similar Requirement</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: FAQS */}
            {activeTab === 'faqs' && (
              <div className="service-tab-panel tab-faqs">
                <div className="service-faqs-accordion">
                  {service.faqs.map((faq, fIdx) => {
                    const isOpen = openFaqIndex === fIdx;
                    return (
                      <div
                        key={fIdx}
                        className={`service-faq-item ${isOpen ? 'is-open' : ''}`}
                      >
                        <button
                          type="button"
                          className="service-faq-question-btn"
                          onClick={() => setOpenFaqIndex(isOpen ? null : fIdx)}
                          aria-expanded={isOpen}
                        >
                          <span className="faq-q-text">{faq.question}</span>
                          <span className="faq-q-toggle" aria-hidden="true">
                            {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                          </span>
                        </button>
                        {isOpen && (
                          <div className="service-faq-answer">
                            <p>{faq.answer}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 4. INTERACTIVE COMMERCIAL RFQ ESTIMATOR & CONSOLE */}
      <section className="service-estimator-section" aria-label="Commercial Cost & Corridor Estimator">
        <div className="container">
          <div className="service-estimator-card">
            <div className="estimator-card-header">
              <div className="estimator-title-wrap">
                <Sliders size={20} className="estimator-header-icon" />
                <div>
                  <h3 className="estimator-card-title">Commercial Trade Estimator &amp; RFQ Builder</h3>
                  <p className="estimator-card-sub">
                    Configure your shipment volume, corridor and trade terms for an instant commercial proposal.
                  </p>
                </div>
              </div>
              <span className="estimator-active-badge">
                <span className="service-live-dot" />
                <span>Live Rates Engine</span>
              </span>
            </div>

            <div className="estimator-form-grid">
              <div className="estimator-field-group">
                <label className="estimator-field-label">Cargo Commodity Type</label>
                <select
                  value={cargoType}
                  onChange={(e) => setCargoType(e.target.value)}
                  className="estimator-field-select"
                >
                  <option value="Agricultural Commodity (Rice / Grains)">Agricultural Commodities (Rice, Wheat, Grains)</option>
                  <option value="Pulses & Oilseeds">Pulses &amp; Oilseeds (Lentils, Chickpeas, Sesame)</option>
                  <option value="Spices & Seasonings">Spices &amp; Specialty Ingredients</option>
                  <option value="Industrial Machinery & Spares">Industrial Equipment &amp; Heavy Machinery</option>
                  <option value="Processed / Packaged Foods">Processed &amp; Consumer Packaged Goods</option>
                  <option value="General Commercial Freight">General Containerized Merchandise</option>
                </select>
              </div>

              <div className="estimator-field-group">
                <label className="estimator-field-label">Port of Origin</label>
                <select
                  value={originRegion}
                  onChange={(e) => setOriginRegion(e.target.value)}
                  className="estimator-field-select"
                >
                  <option value="Mundra Port, India">Mundra Port (INMUN), India</option>
                  <option value="Nhava Sheva (JNPT), India">Nhava Sheva / JNPT (INNSA), India</option>
                  <option value="Chennai Port, India">Chennai Port (INMAA), India</option>
                  <option value="Hazira Port, India">Hazira Port (INHZR), India</option>
                  <option value="Kolkata Port, India">Kolkata / Haldia (INCCU), India</option>
                  <option value="Foreign Origin Port">Direct Foreign Origin Port (Vietnam, Brazil, etc.)</option>
                </select>
              </div>

              <div className="estimator-field-group">
                <label className="estimator-field-label">Destination Port / Region</label>
                <select
                  value={destRegion}
                  onChange={(e) => setDestRegion(e.target.value)}
                  className="estimator-field-select"
                >
                  <option value="Jebel Ali, UAE">Jebel Ali Port (AEJEA), UAE / GCC</option>
                  <option value="Rotterdam, Netherlands">Rotterdam (NLRTM), European Union</option>
                  <option value="Singapore, Port of Singapore">Singapore Port (SGSIN), SE Asia</option>
                  <option value="New York / New Jersey, USA">New York / Newark (USNYC), USA</option>
                  <option value="Mombasa, Kenya">Mombasa Port (KEMBA), East Africa</option>
                  <option value="Lagos / Apapa, Nigeria">Lagos / Apapa (NGLOS), West Africa</option>
                </select>
              </div>

              <div className="estimator-field-group">
                <label className="estimator-field-label">Shipment Volume / Container Units</label>
                <div className="estimator-number-control">
                  <button
                    type="button"
                    onClick={() => setContainerCount((prev) => Math.max(1, prev - 1))}
                    className="estimator-num-btn"
                  >
                    -
                  </button>
                  <span className="estimator-num-display">{containerCount} FCL Units ({containerCount * 25} MT)</span>
                  <button
                    type="button"
                    onClick={() => setContainerCount((prev) => prev + 1)}
                    className="estimator-num-btn"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="estimator-field-group">
                <label className="estimator-field-label">Preferred INCOTERM 2020</label>
                <div className="estimator-inco-pills">
                  {['FOB', 'CIF', 'CFR', 'DDP'].map((term) => (
                    <button
                      key={term}
                      type="button"
                      className={`estimator-inco-pill ${selectedIncoTerm === term ? 'is-selected' : ''}`}
                      onClick={() => setSelectedIncoTerm(term)}
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>

              <div className="estimator-field-group estimator-submit-group">
                <label className="estimator-field-label">&nbsp;</label>
                <button
                  type="button"
                  onClick={handleOpenEstimateQuote}
                  className="estimator-submit-btn"
                  id="btn-estimator-rfq"
                >
                  <Send size={15} />
                  <span>Generate Formal Quotation</span>
                </button>
              </div>
            </div>

            {/* Indicator Strip */}
            <div className="estimator-summary-strip">
              <div className="summary-strip-item">
                <span className="strip-label">Selected Service:</span>
                <span className="strip-val">{service.name}</span>
              </div>
              <div className="summary-strip-item">
                <span className="strip-label">Estimated Lead Time:</span>
                <span className="strip-val">12–18 Days Transit</span>
              </div>
              <div className="summary-strip-item">
                <span className="strip-label">Pre-Arrival Clearance:</span>
                <span className="strip-val">100% Guaranteed</span>
              </div>
              <div className="summary-strip-item">
                <span className="strip-label">Assay Partner:</span>
                <span className="strip-val">SGS / Eurofins Certified</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. COMPLEMENTARY / RELATED SERVICES */}
      {relatedServices.length > 0 && (
        <section className="service-related-section" aria-label="Complementary Trade Services">
          <div className="container">
            <div className="service-related-header">
              <div className="related-eyebrow">INTEGRATED TRADE DESK</div>
              <h2 className="related-title">
                Complementary Trade <span className="service-gold-text">Solutions</span>
              </h2>
              <p className="related-desc">
                Combine {service.name} with our other specialized logistics, sourcing, and customs capabilities for end-to-end efficiency.
              </p>
            </div>

            <div className="service-related-grid">
              {relatedServices.map((rel) => (
                <article
                  key={rel.id}
                  className="service-related-card"
                  onClick={() => navigate(`/services/${rel.id}`)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      navigate(`/services/${rel.id}`);
                    }
                  }}
                >
                  <div className="related-card-media">
                    <img src={rel.image} alt={rel.name} className="related-card-img" />
                    <span className="related-card-badge">{rel.category}</span>
                  </div>
                  <div className="related-card-body">
                    <h3 className="related-card-name">{rel.name}</h3>
                    <p className="related-card-desc">{rel.shortDesc}</p>
                    <div className="related-card-footer">
                      <span className="related-card-link">
                        <span>View Dedicated Service</span>
                        <ChevronRight size={14} />
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. BOTTOM INSTITUTIONAL CONVERSION CTA */}
      <section className="service-bottom-cta-section" aria-label="Commercial Consultation Call to Action">
        <div className="container">
          <div className="service-bottom-cta-card">
            <div className="bottom-cta-left">
              <span className="bottom-cta-eyebrow">
                <Sparkles size={14} />
                <span>DIRECT COMMERCIAL CONSULTATION</span>
              </span>
              <h2 className="bottom-cta-title">
                Ready to Deploy <span className="service-gold-text">{service.name}</span> for Your Trade?
              </h2>
              <p className="bottom-cta-desc">
                Connect with our senior trade directors to review your commercial specifications, calculate competitive landed CIF/FOB pricing, and reserve vessel capacity.
              </p>
              <div className="bottom-cta-perks">
                <div className="cta-perk-item">
                  <Check size={14} className="cta-perk-icon" />
                  <span>24-Hour Official Proposal SLA</span>
                </div>
                <div className="cta-perk-item">
                  <Check size={14} className="cta-perk-icon" />
                  <span>Direct Mill / Carrier Contracts</span>
                </div>
                <div className="cta-perk-item">
                  <Check size={14} className="cta-perk-icon" />
                  <span>Zero-Discrepancy LC Concordance</span>
                </div>
              </div>
            </div>

            <div className="bottom-cta-right">
              <button
                type="button"
                onClick={() => openQuoteModal(service.name)}
                className="bottom-cta-primary-btn"
                id="btn-bottom-service-quote"
              >
                <span>Request Custom Trade Quote</span>
                <ArrowRight size={16} />
              </button>
              <Link to="/contact" className="bottom-cta-secondary-btn">
                <span>Speak with a Trade Specialist</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetailPage;
