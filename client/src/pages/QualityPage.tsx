import React from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import {
  ShieldCheck,
  CheckCircle2,
  Search,
  FileText,
  PackageCheck,
  FileCheck2,
  ArrowRight,
  Scale,
  Microscope,
} from 'lucide-react';

interface OutletContextType {
  openQuoteModal?: (productOrServiceName?: string) => void;
}

export const QualityPage: React.FC = () => {
  const outletContext = useOutletContext<OutletContextType>();

  const stages = [
    {
      num: '01',
      title: 'Origin Sourcing & Grower Vetting',
      pill: 'STAGE 01 • SOURCING AUDITS',
      icon: <Search size={26} aria-hidden="true" />,
      desc: 'We enforce direct-origin procurement from audited farming cooperatives, certified millers, and primary aggregation hubs. Sourcing partners undergo pre-qualification audits covering soil management, chemical use, and harvesting practices.',
      checkpoints: [
        'Agronomic & harvest date tracking',
        'Mill hygiene and storage facility audits',
        'Direct traceability to source growing clusters',
        'Pre-procurement crop sample baseline testing',
      ],
    },
    {
      num: '02',
      title: 'Batch & Physical Inspection',
      pill: 'STAGE 02 • PHYSICAL QA',
      icon: <Scale size={26} aria-hidden="true" />,
      desc: 'Upon arrival at consolidation centers, every commercial batch is physically inspected. Calibrated grain sieves, optical color sorters, and moisture meters evaluate batch conformity against international commercial contracts.',
      checkpoints: [
        'Moisture content evaluation (calibrated halogen & dielectric)',
        'Grain sizing, length-to-width ratio, and uniformity screening',
        'Foreign matter, broken kernel, and foreign seed separation',
        'Insect damage and discolored grain percentage checks',
      ],
    },
    {
      num: '03',
      title: 'Laboratory Testing & Grade Certification',
      pill: 'STAGE 03 • CHEMICAL & BIOLOGICAL TESTING',
      icon: <Microscope size={26} aria-hidden="true" />,
      desc: 'Consignments are submitted for accredited laboratory analysis. Testing covers pesticide residues (MRLs), heavy metals, aflatoxins, and microbial pathogens in compliance with importing country phytosanitary and food safety laws.',
      checkpoints: [
        'Aflatoxin (B1, B2, G1, G2) & Ochratoxin testing via HPLC',
        'Multi-residue pesticide screening (EU & US FDA MRL compliance)',
        'Heavy metals testing (Lead, Cadmium, Arsenic, Mercury via ICP-MS)',
        'Microbiological analysis (Salmonella, E. coli, Total Plate Count)',
      ],
    },
    {
      num: '04',
      title: 'Documentation & Regulatory Compliance',
      pill: 'STAGE 04 • LEGAL CLEARANCES',
      icon: <FileText size={26} aria-hidden="true" />,
      desc: 'Our export compliance team coordinates all mandatory statutory filings with national plant protection organizations (NPPO), quarantine authorities, and customs documentation desks to ensure unimpeded import clearance.',
      checkpoints: [
        'Official Phytosanitary Certificate issued by quarantine authorities',
        'Methyl Bromide or Phosphine Fumigation Certificate',
        'Certificate of Origin (Chamber of Commerce / Preferential COO)',
        'Detailed Certificate of Analysis (COA) cross-referenced to bill of lading',
      ],
    },
    {
      num: '05',
      title: 'Export Packaging & Vessel Stowing',
      pill: 'STAGE 05 • DISPATCH INTEGRITY',
      icon: <PackageCheck size={26} aria-hidden="true" />,
      desc: 'Protection during ocean transit is paramount. We utilize food-grade desiccated liners, multi-wall moisture-resistant polypropylene packaging, and high-security ISO 17712 compliant bolt seals on all export container loads.',
      checkpoints: [
        'Food-grade multi-wall kraft or PP bags with UV resistance',
        'Container desiccant bags installed to eliminate condensation sweat',
        'Pre-stuffing container odor, rust, and integrity inspection',
        'Tamper-evident ISO 17712 bolt seal application with photo logs',
      ],
    },
  ];

  const certifications = [
    {
      code: 'ISO 9001:2015',
      issuer: 'Quality Management Systems',
      desc: 'Standardized operational procedures for consistent procurement, inspection, and customer satisfaction tracking.',
    },
    {
      code: 'HACCP & GMP',
      issuer: 'Food Safety & Hygiene',
      desc: 'Hazard analysis critical control points implemented across sorting, grading, handling, and packaging workflows.',
    },
    {
      code: 'FSSAI Verified',
      issuer: 'Food Authority Conformity',
      desc: 'Licensed and compliant with statutory Indian food safety regulations and packaging standards for commercial export.',
    },
    {
      code: 'APEDA Member',
      issuer: 'Agricultural Export Council',
      desc: 'Registered with the Agricultural and Processed Food Products Export Development Authority of India.',
    },
    {
      code: 'USDA & EU MRL Compliant',
      issuer: 'International Residue Limits',
      desc: 'Batch verification ensuring pesticide and chemical residue levels strictly comply with United States and European tolerances.',
    },
    {
      code: 'Halal & Kosher Ready',
      issuer: 'Cultural & Religious Compliance',
      desc: 'Certified facility sourcing and dedicated processing streams available on demand for religious food certifications.',
    },
  ];

  const partners = [
    { name: 'SGS', sub: 'World Leading Inspection & Verification' },
    { name: 'Bureau Veritas', sub: 'Testing, Inspection & Certification' },
    { name: 'Intertek', sub: 'Total Quality Assurance' },
    { name: 'Cotecna', sub: 'Agricultural Testing & Inspection' },
  ];

  return (
    <div className="quality-page">
      {/* Hero Header */}
      <section className="quality-hero">
        <div className="quality-hero-container">
          <div className="quality-hero-badge">
            <ShieldCheck size={16} aria-hidden="true" />
            <span>ENTERPRISE QUALITY ASSURANCE</span>
          </div>

          <h1 className="quality-hero-title">
            Uncompromising Standards. <br />
            <span className="gold-text">Certified Global Quality.</span>
          </h1>

          <p className="quality-hero-desc">
            ConceptExim operates a rigorous 5-stage quality assurance protocol. From audited origin farms to containerized
            vessel departure, we ensure every metric ton matches contract specifications, sanitary standards, and international regulations.
          </p>

          {/* Institutional Metrics */}
          <div className="quality-metrics-ribbon">
            <div className="quality-metric-item">
              <span className="quality-metric-num">100%</span>
              <span className="quality-metric-label">Batch Inspection</span>
              <span className="quality-metric-sub">Every export lot verified</span>
            </div>
            <div className="quality-metric-item">
              <span className="quality-metric-num">99.8%</span>
              <span className="quality-metric-label">Contract Conformity</span>
              <span className="quality-metric-sub">Zero tolerance for off-spec lots</span>
            </div>
            <div className="quality-metric-item">
              <span className="quality-metric-num">Tier-1</span>
              <span className="quality-metric-label">Inspection Partners</span>
              <span className="quality-metric-sub">SGS, Bureau Veritas, Intertek</span>
            </div>
            <div className="quality-metric-item">
              <span className="quality-metric-num">ISO</span>
              <span className="quality-metric-label">9001:2015 Audited</span>
              <span className="quality-metric-sub">Standardized QMS procedures</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="quality-content-container">
        {/* Deep Dive 5 Stages Section */}
        <section className="quality-section-head">
          <span className="quality-section-eyebrow">OUR VERIFICATION PIPELINE</span>
          <h2 className="quality-section-title">The 5-Stage Quality Protocol</h2>
          <p className="quality-section-desc">
            A comprehensive, multi-barrier process designed to eliminate risks, prevent moisture degradation, and
            guarantee compliance with importing country phytosanitary criteria.
          </p>
        </section>

        <div className="quality-stages-grid">
          {stages.map(stage => (
            <div key={stage.num} className="quality-stage-detail-card">
              <div className="quality-stage-side">
                <span className="quality-stage-pill">{stage.pill}</span>
                <h3 className="quality-stage-num-title">{stage.title}</h3>
                <div className="quality-stage-icon-box">{stage.icon}</div>
              </div>

              <div className="quality-stage-body">
                <p className="quality-stage-summary">{stage.desc}</p>
                <div className="quality-stage-checkpoints">
                  {stage.checkpoints.map((cp, cIdx) => (
                    <div key={cIdx} className="quality-checkpoint-item">
                      <CheckCircle2 size={16} className="quality-check-circle" aria-hidden="true" />
                      <span>{cp}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* International Standards & Accreditations Matrix */}
        <section className="quality-cert-matrix-section">
          <div className="quality-section-head" style={{ marginBottom: 36 }}>
            <span className="quality-section-eyebrow">STANDARDS &amp; COMPLIANCE</span>
            <h2 className="quality-section-title">Certified Global Accreditations</h2>
            <p className="quality-section-desc">
              Our trade operations comply with recognized statutory frameworks, sanitary guidelines, and commercial food standards.
            </p>
          </div>

          <div className="quality-cert-grid">
            {certifications.map((cert, idx) => (
              <div key={idx} className="quality-cert-card">
                <div className="quality-cert-code">{cert.code}</div>
                <div className="quality-cert-issuer">{cert.issuer}</div>
                <p className="quality-cert-desc">{cert.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Independent Inspection Partners Strip */}
        <section className="quality-partners-section">
          <h3 className="quality-partners-title">Independent Third-Party Pre-Shipment Inspection Partners</h3>
          <div className="quality-partners-grid">
            {partners.map((p, idx) => (
              <div key={idx} className="quality-partner-box">
                <div className="quality-partner-name">{p.name}</div>
                <div className="quality-partner-sub">{p.sub}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom Conversion CTA */}
        <section className="quality-cta-box">
          <h2 className="quality-cta-title">Need Certified Quality Documentation?</h2>
          <p className="quality-cta-desc">
            Request sample Certificates of Analysis (COA), technical product specification sheets, or schedule an independent
            pre-shipment audit for your next export order.
          </p>
          <div className="quality-cta-actions">
            <button
              type="button"
              onClick={() => outletContext?.openQuoteModal?.('Quality Specifications & COA')}
              className="quality-cta-btn-primary"
            >
              <FileCheck2 size={18} aria-hidden="true" />
              <span>Request Sample COA &amp; Specs</span>
            </button>
            <Link to="/contact" className="quality-cta-btn-secondary">
              <span>Contact Compliance Desk</span>
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};
