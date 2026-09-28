import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api.js';
import { useToast } from '../context/ToastContext.js';
import '../styles/contact.css';
import {
  Globe,
  MapPin,
  Phone,
  Mail,
  CheckCircle2,
  ShieldCheck,
  Clock,
  Users,
  ArrowRight,
  ChevronRight,
  User,
  Building,
  Briefcase,
  Sparkles,
  AlertCircle,
  Headphones,
  ChevronDown,
  MessageSquare,
} from 'lucide-react';

/* --------------------------------------------------------------------------
   Vector Circular Flag Badges matching Reference Image 2
   -------------------------------------------------------------------------- */
const CircleFlagIndia: React.FC = () => (
  <svg viewBox="0 0 36 36" width="36" height="36" className="contact-circle-flag" aria-label="India Flag">
    <defs>
      <clipPath id="circleFlagIn">
        <circle cx="18" cy="18" r="18" />
      </clipPath>
    </defs>
    <g clipPath="url(#circleFlagIn)">
      <rect width="36" height="12" fill="#FF9933" />
      <rect y="12" width="36" height="12" fill="#FFFFFF" />
      <rect y="24" width="36" height="12" fill="#138808" />
      <circle cx="18" cy="18" r="4.2" fill="none" stroke="#000080" strokeWidth="0.8" />
      <circle cx="18" cy="18" r="1" fill="#000080" />
      {Array.from({ length: 12 }).map((_, i) => (
        <line
          key={i}
          x1={18 + 4.2 * Math.cos((i * 30 * Math.PI) / 180)}
          y1={18 + 4.2 * Math.sin((i * 30 * Math.PI) / 180)}
          x2={18 - 4.2 * Math.cos((i * 30 * Math.PI) / 180)}
          y2={18 - 4.2 * Math.sin((i * 30 * Math.PI) / 180)}
          stroke="#000080"
          strokeWidth="0.4"
        />
      ))}
    </g>
    <circle cx="18" cy="18" r="17.5" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="1" />
  </svg>
);

const CircleFlagUSA: React.FC = () => (
  <svg viewBox="0 0 36 36" width="36" height="36" className="contact-circle-flag" aria-label="USA Flag">
    <defs>
      <clipPath id="circleFlagUs">
        <circle cx="18" cy="18" r="18" />
      </clipPath>
    </defs>
    <g clipPath="url(#circleFlagUs)">
      <rect width="36" height="36" fill="#FFFFFF" />
      {Array.from({ length: 13 }).map((_, i) => (
        <rect
          key={i}
          y={(i * 36) / 13}
          width="36"
          height={36 / 13}
          fill={i % 2 === 0 ? '#B22234' : '#FFFFFF'}
        />
      ))}
      <rect width="18" height="19.4" fill="#3C3B6E" />
      <circle cx="5" cy="5" r="1" fill="#FFFFFF" />
      <circle cx="10" cy="5" r="1" fill="#FFFFFF" />
      <circle cx="15" cy="5" r="1" fill="#FFFFFF" />
      <circle cx="7.5" cy="9.7" r="1" fill="#FFFFFF" />
      <circle cx="12.5" cy="9.7" r="1" fill="#FFFFFF" />
      <circle cx="5" cy="14.4" r="1" fill="#FFFFFF" />
      <circle cx="10" cy="14.4" r="1" fill="#FFFFFF" />
      <circle cx="15" cy="14.4" r="1" fill="#FFFFFF" />
    </g>
    <circle cx="18" cy="18" r="17.5" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="1" />
  </svg>
);

const CircleFlagUAE: React.FC = () => (
  <svg viewBox="0 0 36 36" width="36" height="36" className="contact-circle-flag" aria-label="UAE Flag">
    <defs>
      <clipPath id="circleFlagAe">
        <circle cx="18" cy="18" r="18" />
      </clipPath>
    </defs>
    <g clipPath="url(#circleFlagAe)">
      <rect width="36" height="12" fill="#00732F" />
      <rect y="12" width="36" height="12" fill="#FFFFFF" />
      <rect y="24" width="36" height="12" fill="#000000" />
      <rect width="11" height="36" fill="#FF0000" />
    </g>
    <circle cx="18" cy="18" r="17.5" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="1" />
  </svg>
);

const CircleFlagSingapore: React.FC = () => (
  <svg viewBox="0 0 36 36" width="36" height="36" className="contact-circle-flag" aria-label="Singapore Flag">
    <defs>
      <clipPath id="circleFlagSg">
        <circle cx="18" cy="18" r="18" />
      </clipPath>
    </defs>
    <g clipPath="url(#circleFlagSg)">
      <rect width="36" height="18" fill="#ED2939" />
      <rect y="18" width="36" height="18" fill="#FFFFFF" />
      <circle cx="10.5" cy="9" r="5.2" fill="#FFFFFF" />
      <circle cx="12.2" cy="9" r="4.3" fill="#ED2939" />
      <circle cx="13.8" cy="6.2" r="0.8" fill="#FFFFFF" />
      <circle cx="16.2" cy="7.8" r="0.8" fill="#FFFFFF" />
      <circle cx="15.2" cy="11.2" r="0.8" fill="#FFFFFF" />
      <circle cx="12.5" cy="11.2" r="0.8" fill="#FFFFFF" />
      <circle cx="13" cy="8.6" r="0.8" fill="#FFFFFF" />
    </g>
    <circle cx="18" cy="18" r="17.5" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="1" />
  </svg>
);

const CircleFlagGermany: React.FC = () => (
  <svg viewBox="0 0 36 36" width="36" height="36" className="contact-circle-flag" aria-label="Germany Flag">
    <defs>
      <clipPath id="circleFlagDe">
        <circle cx="18" cy="18" r="18" />
      </clipPath>
    </defs>
    <g clipPath="url(#circleFlagDe)">
      <rect width="36" height="12" fill="#000000" />
      <rect y="12" width="36" height="12" fill="#DD0000" />
      <rect y="24" width="36" height="12" fill="#FFCE00" />
    </g>
    <circle cx="18" cy="18" r="17.5" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="1" />
  </svg>
);

interface OfficeRecord {
  id: string;
  country: string;
  displayTitle: string;
  flagType: 'india' | 'usa' | 'uae' | 'singapore' | 'germany';
  type: string;
  city: string;
  address: string;
  phones: string[];
  emails: string[];
  isPrimary?: boolean;
}

const APPROVED_OFFICES: OfficeRecord[] = [
  {
    id: 'off-india-hq',
    country: 'India',
    displayTitle: 'India (Head Office)',
    flagType: 'india',
    type: 'Head Office',
    city: 'Visakhapatnam, Andhra Pradesh',
    address: '123 Trade Center, Industrial Area, Visakhapatnam, AP 530012, India',
    phones: ['+91 98765 43210'],
    emails: ['info@conceptexim.com'],
    isPrimary: true,
  },
  {
    id: 'off-usa',
    country: 'USA',
    displayTitle: 'USA',
    flagType: 'usa',
    type: 'Representative Office',
    city: 'New Jersey, USA',
    address: 'Global Trade Plaza, Suite 400, New Jersey, NJ 07102, USA',
    phones: ['+1 (212) 555-0199'],
    emails: ['usa@conceptexim.com'],
  },
  {
    id: 'off-uae',
    country: 'UAE',
    displayTitle: 'UAE',
    flagType: 'uae',
    type: 'Regional Hub',
    city: 'Dubai, UAE',
    address: 'Jebel Ali Free Zone, Dubai, UAE',
    phones: ['+971 4 321 8899'],
    emails: ['uae@conceptexim.com'],
  },
  {
    id: 'off-singapore',
    country: 'Singapore',
    displayTitle: 'Singapore',
    flagType: 'singapore',
    type: 'Regional Office',
    city: 'Singapore',
    address: '10 Anson Road, #26-04, Singapore 079903',
    phones: ['+65 6789 1234'],
    emails: ['sg@conceptexim.com'],
  },
  {
    id: 'off-germany',
    country: 'Germany',
    displayTitle: 'Germany',
    flagType: 'germany',
    type: 'Representative Office',
    city: 'Hamburg, Germany',
    address: 'HafenCity Port Logistics Center, 20457 Hamburg, Germany',
    phones: ['+49 40 3344 5566'],
    emails: ['eu@conceptexim.com'],
  },
];

const renderCircleFlag = (flagType: 'india' | 'usa' | 'uae' | 'singapore' | 'germany') => {
  switch (flagType) {
    case 'india':
      return <CircleFlagIndia />;
    case 'usa':
      return <CircleFlagUSA />;
    case 'uae':
      return <CircleFlagUAE />;
    case 'singapore':
      return <CircleFlagSingapore />;
    case 'germany':
      return <CircleFlagGermany />;
    default:
      return null;
  }
};

export const ContactPage: React.FC = () => {
  const { showToast } = useToast();
  const [showAllLocations, setShowAllLocations] = useState<boolean>(false);
  const displayedOffices = showAllLocations ? APPROVED_OFFICES : APPROVED_OFFICES.slice(0, 4);

  useEffect(() => {
    document.title = 'Contact ConceptExim — Global Trade Desk & International Inquiries';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    subject: 'Commodity Export Inquiry',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [selectedOfficeId, setSelectedOfficeId] = useState<string>('off-india-hq');

  // Form submission handler connected to backend /api/contact
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.fullName.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMsg('Please provide your full name, email address, and message.');
      return;
    }

    setLoading(true);
    try {
      const res = await api.post<{ id?: string }>('/contact', {
        fullName: formData.fullName.trim(),
        companyName: formData.companyName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        subject: formData.subject,
        message: formData.message.trim(),
      });

      setLoading(false);
      if (res.success) {
        setSubmitted(true);
        showToast('Message transmitted successfully! Our trade desk will respond within 24 hours.', 'success');
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          companyName: '',
          subject: 'Commodity Export Inquiry',
          message: '',
        });
      } else {
        setErrorMsg(res.error || 'Failed to transmit message. Please try again.');
        showToast(res.error || 'Transmission failed', 'error');
      }
    } catch {
      setLoading(false);
      setErrorMsg('An unexpected error occurred while communicating with the trade desk.');
      showToast('Transmission error', 'error');
    }
  };

  return (
    <div className="contact-page-wrapper">
      {/* ===================================================================
          2. CONTACT HERO — EXACT BLUEPRINT COMPOSITION
          =================================================================== */}
      <section className="contact-hero" aria-label="Contact ConceptExim Hero">
        <div className="contact-hero-container">
          <div className="contact-hero-grid">
            {/* Left Hero Stack */}
            <div className="contact-hero-left">
              <div className="contact-hero-eyebrow">
                <Sparkles size={14} aria-hidden="true" />
                <span>GET IN TOUCH</span>
              </div>

              <h1 className="contact-hero-title">
                We're Here to <br />
                <span className="contact-hero-gold">Connect With You</span>
              </h1>

              <p className="contact-hero-desc">
                Have a question, need assistance with cross-border trade, or want to explore an export-import partnership?
                Our international desk at ConceptExim is always ready to assist you. Reach out to us — your global trade
                journey matters to us.
              </p>

              {/* 4 Feature Indicators Along Bottom of Hero */}
              <div className="contact-hero-features" role="list" aria-label="Our Service Guarantees">
                <div className="contact-feature-item" role="listitem">
                  <div className="contact-feature-icon-wrap" aria-hidden="true">
                    <Clock size={16} strokeWidth={2.4} />
                  </div>
                  <div className="contact-feature-text">
                    <span className="contact-feature-title">Quick Response</span>
                    <span className="contact-feature-subtitle">We reply within 24 hours</span>
                  </div>
                </div>

                <div className="contact-feature-item" role="listitem">
                  <div className="contact-feature-icon-wrap" aria-hidden="true">
                    <Headphones size={16} strokeWidth={2.4} />
                  </div>
                  <div className="contact-feature-text">
                    <span className="contact-feature-title">Dedicated Support</span>
                    <span className="contact-feature-subtitle">From our expert team</span>
                  </div>
                </div>

                <div className="contact-feature-item" role="listitem">
                  <div className="contact-feature-icon-wrap" aria-hidden="true">
                    <Globe size={16} strokeWidth={2.4} />
                  </div>
                  <div className="contact-feature-text">
                    <span className="contact-feature-title">Global Reach</span>
                    <span className="contact-feature-subtitle">Across 50+ countries</span>
                  </div>
                </div>

                <div className="contact-feature-item" role="listitem">
                  <div className="contact-feature-icon-wrap" aria-hidden="true">
                    <ShieldCheck size={16} strokeWidth={2.4} />
                  </div>
                  <div className="contact-feature-text">
                    <span className="contact-feature-title">Trusted Partner</span>
                    <span className="contact-feature-subtitle">For your business growth</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Hero Visual Banner */}
            <div className="contact-hero-right">
              <div className="contact-hero-image-card">
                <img
                  src="/assets/contact/contact-hero-visual.jpg"
                  alt="ConceptExim Maritime Logistics & International Trade Specialist Desk"
                  className="contact-hero-img"
                  loading="eager"
                />
                <div className="contact-hero-image-overlay" />
                <div className="contact-hero-script-tagline" aria-hidden="true">
                  Your Global <br />
                  Trade Partner <br />
                  Always
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          3. MAIN CONTACT AREA — 3-COLUMN LAYOUT MATCHING BLUEPRINT
          =================================================================== */}
      <section className="contact-main-section" aria-label="Contact Options and Form">
        <div className="contact-main-container">
          <div className="contact-main-grid">
            {/* -------------------------------------------------------------
                LEFT COLUMN: OUR GLOBAL OFFICES (EXACT MATCH REFERENCE IMAGE 2)
                ------------------------------------------------------------- */}
            <aside className="contact-offices-card" aria-label="Our Global Offices">
              <div className="contact-offices-header">
                <div className="contact-offices-gold-badge" aria-hidden="true">
                  <Globe size={22} strokeWidth={1.8} />
                </div>
                <div className="contact-offices-header-text">
                  <h2 className="contact-offices-title">Our Global Offices</h2>
                  <span className="contact-offices-subtitle">
                    We are closer than you think. Reach us at any of our regional offices across the world.
                  </span>
                </div>
              </div>

              <div className="contact-offices-list" role="list">
                {displayedOffices.map(office => {
                  const isSelected = selectedOfficeId === office.id;
                  return (
                    <div
                      key={office.id}
                      className={`contact-office-row ${isSelected ? 'is-selected' : ''}`}
                      onClick={() => setSelectedOfficeId(office.id)}
                      role="listitem"
                      tabIndex={0}
                      onKeyDown={e => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          setSelectedOfficeId(office.id);
                        }
                      }}
                      aria-label={`${office.country} office`}
                    >
                      <div className="contact-office-row-left">
                        {renderCircleFlag(office.flagType)}
                        <div className="contact-office-details">
                          <span className="contact-office-title">{office.displayTitle}</span>
                          <span className="contact-office-address">{office.address}</span>
                          <div className="contact-office-contact-line">
                            <a
                              href={`tel:${office.phones[0].replace(/\s+/g, '')}`}
                              className="contact-office-contact-item"
                              title={`Call ${office.country} office`}
                              onClick={e => e.stopPropagation()}
                            >
                              <Phone size={11} strokeWidth={2.4} aria-hidden="true" />
                              <span>{office.phones[0]}</span>
                            </a>
                            <a
                              href={`mailto:${office.emails[0]}`}
                              className="contact-office-contact-item"
                              title={`Email ${office.country} office`}
                              onClick={e => e.stopPropagation()}
                            >
                              <Mail size={11} strokeWidth={2.4} aria-hidden="true" />
                              <span>{office.emails[0]}</span>
                            </a>
                          </div>
                        </div>
                      </div>
                      <ChevronRight size={16} strokeWidth={2.5} className="contact-office-chevron" aria-hidden="true" />
                    </div>
                  );
                })}
              </div>

              <div className="contact-offices-footer">
                <button
                  type="button"
                  className="contact-view-all-pill"
                  onClick={() => setShowAllLocations(prev => !prev)}
                  aria-expanded={showAllLocations}
                >
                  <MapPin size={14} className="contact-view-all-icon" aria-hidden="true" />
                  <span>{showAllLocations ? 'Show Primary Locations' : 'View All Locations'}</span>
                  <ArrowRight size={13} className="contact-view-all-arrow" aria-hidden="true" />
                </button>
              </div>
            </aside>

            {/* -------------------------------------------------------------
                CENTER COLUMN: SEND US A MESSAGE FORM (REAL WORKING API)
                ------------------------------------------------------------- */}
            <main className="contact-form-card" aria-label="Send Message Form">
              <div className="contact-form-eyebrow">LET'S TALK</div>
              <h2 className="contact-form-heading">Send Us a Message</h2>
              <p className="contact-form-desc">
                Fill in the form below and our international trade desk will get back to you as soon as possible.
              </p>

              {submitted ? (
                <div className="contact-success-alert" role="status">
                  <CheckCircle2 size={24} style={{ flexShrink: 0, color: '#16A34A' }} />
                  <div>
                    <h3 style={{ margin: '0 0 4px', fontSize: '1rem', fontWeight: 700 }}>
                      Message Received!
                    </h3>
                    <p style={{ margin: 0, fontSize: '0.84375rem', color: '#15803D' }}>
                      Thank you for contacting ConceptExim. Your inquiry has been routed to our commercial trade desk.
                      An export-import representative will review your request and get in touch within 24 hours.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      style={{
                        marginTop: 12,
                        background: '#16A34A',
                        color: '#FFFFFF',
                        border: 'none',
                        padding: '6px 16px',
                        borderRadius: '999px',
                        fontSize: '0.78125rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                      }}
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form-body" noValidate>
                  {errorMsg && (
                    <div className="contact-error-alert" role="alert">
                      <AlertCircle size={16} />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  {/* Row 1: Full Name & Email Address */}
                  <div className="contact-form-row">
                    <div className="contact-field-wrap">
                      <label className="contact-field-label" htmlFor="fullName">
                        Full Name <span className="contact-required-mark">*</span>
                      </label>
                      <div className="contact-input-box">
                        <User size={15} className="contact-input-icon" aria-hidden="true" />
                        <input
                          id="fullName"
                          type="text"
                          className="contact-input"
                          placeholder="Enter your name"
                          value={formData.fullName}
                          onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="contact-field-wrap">
                      <label className="contact-field-label" htmlFor="email">
                        Email Address <span className="contact-required-mark">*</span>
                      </label>
                      <div className="contact-input-box">
                        <Mail size={15} className="contact-input-icon" aria-hidden="true" />
                        <input
                          id="email"
                          type="email"
                          className="contact-input"
                          placeholder="Enter your corporate email"
                          value={formData.email}
                          onChange={e => setFormData({ ...formData, email: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Row 2: Phone Number & Company Name */}
                  <div className="contact-form-row">
                    <div className="contact-field-wrap">
                      <label className="contact-field-label" htmlFor="phone">
                        Phone Number <span className="contact-required-mark">*</span>
                      </label>
                      <div className="contact-input-box">
                        <Phone size={15} className="contact-input-icon" aria-hidden="true" />
                        <input
                          id="phone"
                          type="tel"
                          className="contact-input"
                          placeholder="Enter your phone with country code"
                          value={formData.phone}
                          onChange={e => setFormData({ ...formData, phone: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="contact-field-wrap">
                      <label className="contact-field-label" htmlFor="companyName">
                        Company Name
                      </label>
                      <div className="contact-input-box">
                        <Building size={15} className="contact-input-icon" aria-hidden="true" />
                        <input
                          id="companyName"
                          type="text"
                          className="contact-input"
                          placeholder="Enter your company name"
                          value={formData.companyName}
                          onChange={e => setFormData({ ...formData, companyName: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Row 3: Select Service / Inquiry Type */}
                  <div className="contact-field-wrap">
                    <label className="contact-field-label" htmlFor="subject">
                      Select Service / Inquiry Type
                    </label>
                    <div className="contact-select-wrap">
                      <Briefcase size={15} className="contact-input-icon" aria-hidden="true" />
                      <select
                        id="subject"
                        className="contact-select"
                        value={formData.subject}
                        onChange={e => setFormData({ ...formData, subject: e.target.value })}
                      >
                        <option value="Commodity Export Inquiry">Commodity Export Inquiry (Rice, Spices, Pulses, Agro)</option>
                        <option value="Import Solutions & Freight">Import Solutions & Maritime Freight</option>
                        <option value="Bulk Sourcing & Procurement">Bulk Sourcing & Contract Procurement</option>
                        <option value="Quality Inspection & Compliance">Quality Inspection, ISO & Lab Compliance</option>
                        <option value="Trade Financing & Partnerships">Trade Financing & Institutional Partnerships</option>
                        <option value="Other Corporate Inquiry">Other Corporate Trade Inquiry</option>
                      </select>
                      <ChevronDown size={15} className="contact-select-arrow" aria-hidden="true" />
                    </div>
                  </div>

                  {/* Row 4: Message */}
                  <div className="contact-field-wrap">
                    <label className="contact-field-label" htmlFor="message">
                      Your Message <span className="contact-required-mark">*</span>
                    </label>
                    <div className="contact-textarea-wrap">
                      <MessageSquare size={15} className="contact-textarea-icon" aria-hidden="true" />
                      <textarea
                        id="message"
                        className="contact-textarea"
                        placeholder="Tell us how we can help you with commodities, specifications, port destination, or delivery schedules..."
                        value={formData.message}
                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  {/* Submit Row + Privacy Guarantee */}
                  <div className="contact-form-actions-row">
                    <button
                      type="submit"
                      className="contact-submit-btn"
                      disabled={loading}
                      aria-busy={loading}
                    >
                      <span>{loading ? 'Transmitting...' : 'Send Message'}</span>
                      <ArrowRight size={15} strokeWidth={2.4} className="arrow-icon" aria-hidden="true" />
                    </button>

                    <div className="contact-privacy-guarantee">
                      <ShieldCheck size={16} strokeWidth={2.2} aria-hidden="true" />
                      <span>Your information is safe with us. We respect your corporate privacy.</span>
                    </div>
                  </div>
                </form>
              )}
            </main>
          </div>
        </div>
      </section>

      {/* ===================================================================
          8. VALUE PROPOSITION TRUST STRIP — MATCHING BLUEPRINT FOOTER BAR
          =================================================================== */}
      <section className="contact-trust-strip" aria-label="Why Partner With ConceptExim">
        <div className="contact-trust-container">
          {/* Left Brand Identifier */}
          <div className="contact-trust-brand-block">
            <img
              src="/assets/conceptexim-logo.svg"
              alt="ConceptExim"
              className="contact-trust-logo"
              onError={e => {
                // Fallback to text if SVG isn't loaded
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <div className="contact-trust-brand-text">
              <span className="contact-trust-brand-title">Why Partner With Us?</span>
              <span className="contact-trust-brand-desc">
                Your success is our priority. We deliver quality, trust, and global trade opportunities.
              </span>
            </div>
          </div>

          {/* 4 Trust Metrics */}
          <div className="contact-trust-metrics-row">
            <div className="contact-trust-metric-item">
              <div className="contact-metric-icon-wrap" aria-hidden="true">
                <Globe size={18} strokeWidth={2.2} />
              </div>
              <div className="contact-metric-text">
                <span className="contact-metric-val">50+</span>
                <span className="contact-metric-label">Countries Served</span>
              </div>
            </div>

            <div className="contact-trust-metric-item">
              <div className="contact-metric-icon-wrap" aria-hidden="true">
                <Users size={18} strokeWidth={2.2} />
              </div>
              <div className="contact-metric-text">
                <span className="contact-metric-val">2,500+</span>
                <span className="contact-metric-label">Verified Suppliers</span>
              </div>
            </div>

            <div className="contact-trust-metric-item">
              <div className="contact-metric-icon-wrap" aria-hidden="true">
                <ShieldCheck size={18} strokeWidth={2.2} />
              </div>
              <div className="contact-metric-text">
                <span className="contact-metric-val">500+</span>
                <span className="contact-metric-label">Global Partners</span>
              </div>
            </div>

            <div className="contact-trust-metric-item">
              <div className="contact-metric-icon-wrap" aria-hidden="true">
                <Clock size={18} strokeWidth={2.2} />
              </div>
              <div className="contact-metric-text">
                <span className="contact-metric-val">98%</span>
                <span className="contact-metric-label">On-Time Delivery</span>
              </div>
            </div>
          </div>

          {/* Right Action Button */}
          <Link to="/products" className="contact-trust-explore-btn" title="Explore complete commercial products catalog">
            <span>Explore Products</span>
            <ArrowRight size={14} strokeWidth={2.4} />
          </Link>
        </div>
      </section>
    </div>
  );
};
