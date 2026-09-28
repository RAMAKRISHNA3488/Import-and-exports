import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link, useOutletContext } from 'react-router-dom';
import { useScrollReveal } from '../../hooks/useScrollReveal.js';
import {
  ArrowRight,
  ClipboardCheck,
  FlaskConical,
  FileBadge,
  BadgeCheck,
  CheckCircle2,
  FileText,
  ChevronRight,
  ChevronLeft,
  FileCheck2,
  ShieldCheck,
  X,
} from 'lucide-react';

interface OutletContextType {
  openQuoteModal?: (productOrServiceName?: string) => void;
}

interface QualityPreviewProps {
  onRequestQuote?: (topic?: string) => void;
}

// Premium Coloured Trade & Quality Icons
const OriginSourcingIcon: React.FC = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <linearGradient id="origStemGrad" x1="4" y1="21" x2="19" y2="8" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#059669" />
        <stop offset="100%" stopColor="#34D399" />
      </linearGradient>
      <linearGradient id="origLeaf1" x1="11" y1="2" x2="19" y2="9" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#6EE7B7" />
        <stop offset="100%" stopColor="#059669" />
      </linearGradient>
      <linearGradient id="origLeaf2" x1="3" y1="7" x2="9" y2="13" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#34D399" />
        <stop offset="100%" stopColor="#047857" />
      </linearGradient>
    </defs>
    <path d="M4 21C6 14.5 11 11 19 8.5" stroke="url(#origStemGrad)" strokeWidth="2.2" strokeLinecap="round" />
    <path d="M19 8.5C19 3.5 15 2 11 2C11 7 13 8.5 19 8.5Z" fill="url(#origLeaf1)" stroke="#10B981" strokeWidth="0.8" />
    <path d="M9 13C5 13 3 10 3 7C7 7 9 9 9 13Z" fill="url(#origLeaf2)" stroke="#059669" strokeWidth="0.8" />
    <circle cx="4.5" cy="20.5" r="2.2" fill="#F59E0B" />
  </svg>
);

const BatchInspectionIcon: React.FC = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <linearGradient id="scopeBody" x1="5" y1="3" x2="18" y2="21" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#38BDF8" />
        <stop offset="100%" stopColor="#0284C7" />
      </linearGradient>
      <linearGradient id="scopeStage" x1="5" y1="16" x2="14" y2="16" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#FBBF24" />
      </linearGradient>
    </defs>
    <path d="M3 21H19" stroke="#38BDF8" strokeWidth="2.2" strokeLinecap="round" />
    <path d="M13 21C16.8 21 20 17.8 20 14C20 10.2 16.8 7 13 7H12" stroke="url(#scopeBody)" strokeWidth="2" strokeLinecap="round" />
    <path d="M10 3L13 8L8 11L5 6L10 3Z" fill="url(#scopeBody)" stroke="#E0F2FE" strokeWidth="0.8" />
    <path d="M7 11.5L6 14.5H10L9 11.5" stroke="#67E8F9" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5 16H13" stroke="url(#scopeStage)" strokeWidth="2.4" strokeLinecap="round" />
    <circle cx="9" cy="16" r="1.5" fill="#FEF3C7" />
  </svg>
);

const GradeConformityIcon: React.FC = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <linearGradient id="goldBeam" x1="2" y1="5" x2="22" y2="21" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FDE68A" />
        <stop offset="50%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#D97706" />
      </linearGradient>
      <linearGradient id="scalePan" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FEF3C7" />
        <stop offset="100%" stopColor="#F59E0B" />
      </linearGradient>
    </defs>
    <path d="M12 4V20" stroke="url(#goldBeam)" strokeWidth="2.2" strokeLinecap="round" />
    <path d="M8 20H16" stroke="url(#goldBeam)" strokeWidth="2.2" strokeLinecap="round" />
    <path d="M4 7H20" stroke="url(#goldBeam)" strokeWidth="2.2" strokeLinecap="round" />
    <circle cx="12" cy="7" r="2.2" fill="#10B981" stroke="#FEF3C7" strokeWidth="0.8" />
    <path d="M4 7L2 13H8L6 7" stroke="#FBBF24" strokeWidth="1.4" />
    <path d="M2 13C2 15 3.8 16 5 16C6.2 16 8 15 8 13H2Z" fill="url(#scalePan)" />
    <path d="M20 7L18 13H24L22 7" stroke="#FBBF24" strokeWidth="1.4" />
    <path d="M18 13C18 15 19.8 16 21 16C22.2 16 24 15 24 13H18Z" fill="url(#scalePan)" />
  </svg>
);

const ClearancesIcon: React.FC = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <linearGradient id="dossierGrad" x1="4" y1="2" x2="20" y2="22" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#E9D5FF" />
        <stop offset="50%" stopColor="#C084FC" />
        <stop offset="100%" stopColor="#9333EA" />
      </linearGradient>
      <linearGradient id="sealGrad" x1="13" y1="13" x2="20" y2="20" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FDE68A" />
        <stop offset="100%" stopColor="#F59E0B" />
      </linearGradient>
    </defs>
    <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" fill="rgba(147, 51, 234, 0.16)" stroke="url(#dossierGrad)" strokeWidth="1.8" />
    <path d="M14 2V8H20" stroke="url(#dossierGrad)" strokeWidth="1.8" />
    <path d="M8 10H12" stroke="#E9D5FF" strokeWidth="1.6" strokeLinecap="round" />
    <path d="M8 14H11" stroke="#E9D5FF" strokeWidth="1.6" strokeLinecap="round" />
    <circle cx="16.5" cy="16.5" r="4" fill="url(#sealGrad)" stroke="#D97706" strokeWidth="0.8" />
    <path d="M15 16.5L16 17.5L18.5 15" stroke="#78350F" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M18.5 19.5L20 22L18.5 21L17 22L18.5 19.5Z" fill="#F59E0B" />
  </svg>
);

const ExportPackagingIcon: React.FC = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <linearGradient id="vesselHull" x1="2" y1="13" x2="22" y2="19" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#38BDF8" />
        <stop offset="100%" stopColor="#1D4ED8" />
      </linearGradient>
    </defs>
    <rect x="5" y="8" width="4" height="4" rx="0.8" fill="#10B981" stroke="#059669" strokeWidth="0.8" />
    <rect x="10" y="8" width="4" height="4" rx="0.8" fill="#F59E0B" stroke="#D97706" strokeWidth="0.8" />
    <rect x="7.5" y="4.5" width="4" height="3.5" rx="0.8" fill="#38BDF8" stroke="#0284C7" strokeWidth="0.8" />
    <path d="M16 6H19V12H16V6Z" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="0.8" />
    <rect x="17" y="7.5" width="1.5" height="1.5" fill="#38BDF8" />
    <path d="M2.5 13L4 18.5H19.5L21.5 13H2.5Z" fill="url(#vesselHull)" stroke="#93C5FD" strokeWidth="1" />
    <path d="M2 20.5C4 19.5 6 21.5 8 20.5C10 19.5 12 21.5 14 20.5C16 19.5 18 21.5 20 20.5C21 20 22 20.5 22 20.5" stroke="#38BDF8" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

// High-Prestige Gold & Ruby Ribbon Medal for Institutional Compliance Header
const PrestigeMedalIcon: React.FC = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <linearGradient id="pMedalGold" x1="4" y1="2" x2="20" y2="18" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FEF08A" />
        <stop offset="45%" stopColor="#ECC885" />
        <stop offset="75%" stopColor="#D49A36" />
        <stop offset="100%" stopColor="#92400E" />
      </linearGradient>
      <linearGradient id="pMedalRibbonL" x1="4" y1="12" x2="8" y2="23" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#EF4444" />
        <stop offset="100%" stopColor="#991B1B" />
      </linearGradient>
      <linearGradient id="pMedalRibbonR" x1="20" y1="12" x2="16" y2="23" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#F87171" />
        <stop offset="100%" stopColor="#B91C1C" />
      </linearGradient>
      <linearGradient id="pMedalStar" x1="10" y1="6" x2="14" y2="12" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="60%" stopColor="#FEF3C7" />
        <stop offset="100%" stopColor="#F59E0B" />
      </linearGradient>
    </defs>
    <path d="M7.5 13.5L5 22L9 20L11 22L10.5 15" fill="url(#pMedalRibbonL)" stroke="#7F1D1D" strokeWidth="0.5" />
    <path d="M16.5 13.5L19 22L15 20L13 22L13.5 15" fill="url(#pMedalRibbonR)" stroke="#7F1D1D" strokeWidth="0.5" />
    <circle cx="12" cy="10" r="7.5" fill="url(#pMedalGold)" stroke="#FFFBEB" strokeWidth="0.6" />
    <circle cx="12" cy="10" r="5.6" fill="#0A1836" stroke="#FEF08A" strokeWidth="0.8" />
    <path d="M12 6.5L13.1 8.8L15.5 9.1L13.7 10.7L14.2 13.1L12 11.9L9.8 13.1L10.3 10.7L8.5 9.1L10.9 8.8L12 6.5Z" fill="url(#pMedalStar)" />
  </svg>
);



// Trade Guarantee Luminous Emerald & Gold Security Shield
const GuaranteeSecurityIcon: React.FC = () => (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <linearGradient id="guarShield" x1="2" y1="2" x2="18" y2="18" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#10B981" />
        <stop offset="60%" stopColor="#059669" />
        <stop offset="100%" stopColor="#047857" />
      </linearGradient>
      <linearGradient id="guarGold" x1="3" y1="2" x2="17" y2="18" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FEF08A" />
        <stop offset="100%" stopColor="#D49A36" />
      </linearGradient>
    </defs>
    <path d="M10 2L17 5V10.5C17 14.5 14 17.5 10 18.5C6 17.5 3 14.5 3 10.5V5L10 2Z" fill="url(#guarShield)" stroke="url(#guarGold)" strokeWidth="1.2" />
    <path d="M7 10L9 12L13.5 7.5" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Interactive Stage Pipeline Hint - Jewel Rosette with Multi-Color Gold, Emerald & Cyan Accents
const PipelineHintEmblemIcon: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <linearGradient id="hintRosetteGold" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFFBEB" />
        <stop offset="25%" stopColor="#FDE68A" />
        <stop offset="60%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#B45309" />
      </linearGradient>
      <linearGradient id="hintCoreJewel" x1="5" y1="5" x2="19" y2="19" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#10B981" />
        <stop offset="45%" stopColor="#0284C7" />
        <stop offset="100%" stopColor="#0B1B3D" />
      </linearGradient>
      <linearGradient id="hintCheckGleam" x1="8" y1="8" x2="16" y2="16" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#FEF08A" />
      </linearGradient>
      <filter id="hintGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#F59E0B" floodOpacity="0.45" />
      </filter>
    </defs>
    {/* 8-Pointed Scalloped Polished Gold Rosette Base */}
    <path
      d="M12 2L14.3 4.8L18 4.2L18.6 7.9L22 9.4L20.6 13L22.6 16.2L19.2 18L18 21.6L14.4 20.6L12 23L9.6 20.6L6 21.6L4.8 18L1.4 16.2L3.4 13L2 9.4L5.4 7.9L6 4.2L9.7 4.8L12 2Z"
      fill="url(#hintRosetteGold)"
      stroke="#FEF3C7"
      strokeWidth="0.6"
      filter="url(#hintGlow)"
    />
    {/* Inner Jewel Disc */}
    <circle cx="12" cy="12.5" r="7" fill="url(#hintCoreJewel)" stroke="#FEF08A" strokeWidth="0.8" />
    {/* Precision Inner Orbit Ring */}
    <circle cx="12" cy="12.5" r="5.6" stroke="rgba(255, 255, 255, 0.45)" strokeWidth="0.6" strokeDasharray="1.5 1" fill="none" />
    {/* Faceted 3D Checkmark */}
    <path
      d="M9 12.5L11.2 14.7L15.5 10.2"
      stroke="url(#hintCheckGleam)"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Top Sparkle Accent */}
    <circle cx="12" cy="7.2" r="0.9" fill="#FFFFFF" />
  </svg>
);

export const QualityPreview: React.FC<QualityPreviewProps> = ({ onRequestQuote }) => {
  const { ref: sectionRef, isRevealed } = useScrollReveal<HTMLElement>({
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px',
  });
  const outletContext = useOutletContext<OutletContextType>();
  const handleOpenQuote = onRequestQuote || outletContext?.openQuoteModal;
  const [selectedStageTab, setSelectedStageTab] = useState<number | null>(null);
  const [activeModalStep, setActiveModalStep] = useState<number | null>(null);

  const handleCloseModal = () => {
    setActiveModalStep(null);
    setSelectedStageTab(null);
  };

  const steps = [
    {
      num: '01',
      tag: 'Origin & Mills',
      shortTitle: 'Origin Sourcing',
      title: 'Origin Sourcing & Mill Audits',
      desc: 'Direct procurement from verified growers and millers with complete farm-to-warehouse lot traceability.',
      icon: <OriginSourcingIcon />,
      checks: [
        'Direct procurement contracts with verified agricultural producers',
        'Origin GPS mapping from farm lot to aggregation center',
        'Primary processing mill sanitary and capacity audits',
        'Pre-harvest chemical and pesticide residue screening',
      ],
      deliverable: 'Origin Verification Certificate & Batch Traceability Dossier',
    },
    {
      num: '02',
      tag: 'Physical Testing',
      shortTitle: 'Batch Inspection',
      title: 'Pre-Shipment Laboratory Assay',
      desc: 'Rigorous lot sampling and accredited lab testing verifying moisture, physical purity, and export safety.',
      icon: <BatchInspectionIcon />,
      checks: [
        'Independent third-party lot sampling (SGS / Bureau Veritas)',
        'Calibrated moisture analysis conforming to trade standards',
        'Optical foreign matter and broken kernel screening',
        'Multi-residue pesticide and mycotoxin laboratory assay',
      ],
      deliverable: 'Independent Pre-Shipment Inspection (PSI) Certificate & Lab Assay',
    },
    {
      num: '03',
      tag: 'Specs Matching',
      shortTitle: 'Grade Conformity',
      title: 'Specification Alignment & Grading',
      desc: 'Precision optical sorting and defect elimination calibrated strictly to contractual buyer specifications.',
      icon: <GradeConformityIcon />,
      checks: [
        'Precise alignment with buyer contract specifications and tolerances',
        'High-speed optical color sorting for defect and damaged kernels',
        'Calibrated mesh and particle size uniformity screening',
        'Specialty organoleptic assessments for aroma and grade profile',
      ],
      deliverable: 'Certificate of Analysis (COA) & Commercial Grade Alignment Report',
    },
    {
      num: '04',
      tag: 'Clearances & Filing',
      shortTitle: 'Clearances & Filing',
      title: 'Official Phytosanitary & Export Clearances',
      desc: 'Comprehensive quarantine and customs compliance covering government plant health and consular origin filings.',
      icon: <ClearancesIcon />,
      checks: [
        'NPPO government phytosanitary health clearance certificate',
        'Certified container fumigation with dosage and exposure logs',
        'Chamber of Commerce endorsed Certificate of Origin (COO)',
        'Customs shipping bill and HS classification clearance',
      ],
      deliverable: 'Complete Export Documentation Dossier & Consular Clearances',
    },
    {
      num: '05',
      tag: 'Dispatch & Stowing',
      shortTitle: 'Export Packaging',
      title: 'Protective Packaging & Vessel Dispatch',
      desc: 'Industrial-grade export packing, tamper-evident container security sealing, and supervised vessel stowing.',
      icon: <ExportPackagingIcon />,
      checks: [
        'Moisture-barrier food-grade multi-wall inner bag liners',
        'ISO 17712 certified tamper-evident container bolt seals',
        'Container pre-stuffing inspection for dry floor and odor safety',
        'Port terminal gate-in logging and ocean bill of lading release',
      ],
      deliverable: 'Vessel Stuffing Photo Report & Clean Ocean Bill of Lading (B/L)',
    },
  ];

  const modalStage = activeModalStep !== null ? steps[activeModalStep] : null;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeModalStep === null) return;
      if (e.key === 'Escape') {
        handleCloseModal();
      } else if (e.key === 'ArrowRight') {
        setActiveModalStep((prev) => {
          if (prev === null) return 0;
          const next = Math.min(steps.length - 1, prev + 1);
          setSelectedStageTab(next);
          return next;
        });
      } else if (e.key === 'ArrowLeft') {
        setActiveModalStep((prev) => {
          if (prev === null) return 0;
          const next = Math.max(0, prev - 1);
          setSelectedStageTab(next);
          return next;
        });
      }
    };

    if (activeModalStep !== null) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [activeModalStep, steps.length]);

  const handleOpenStageModal = (index: number) => {
    setSelectedStageTab(index);
    setActiveModalStep(index);
  };

  const certifications = [
    {
      id: 'iso',
      tag: 'Quality Standard',
      code: 'ISO 9001:2015',
      label: 'Certified Quality Management',
    },
    {
      id: 'sgs',
      tag: 'Inspection Audit',
      code: 'SGS & BV Audited',
      label: 'Independent Third-Party PSI',
    },
    {
      id: 'nppo',
      tag: 'Biosecurity',
      code: 'NPPO Phytosanitary',
      label: 'Plant Health & Fumigation',
    },
    {
      id: 'haccp',
      tag: 'Food Safety',
      code: 'HACCP & FSSAI',
      label: 'Hygiene & Safety Compliant',
    },
    {
      id: 'aeo',
      tag: 'Customs Dispatch',
      code: 'Customs AEO',
      label: 'Authorized Economic Operator',
    },
  ];

  return (
    <section
      ref={sectionRef}
      className={`home-quality-section quality-scroll-reveal ${isRevealed ? 'quality-in-view' : ''}`}
      aria-labelledby="quality-preview-heading"
    >
      <div className="home-sectors-container">
        {/* Section Header: Structured, Authoritative & Refined */}
        <div className="home-quality-header-center">
          <div className="home-quality-eyebrow-pill">
            <ShieldCheck size={14} className="home-quality-eyebrow-icon" aria-hidden="true" />
            <span>RIGOROUS TRADE ASSURANCE</span>
          </div>

          <h2 id="quality-preview-heading" className="home-quality-main-title">
            Our Quality &amp; Compliance Process
          </h2>

          <p className="home-quality-main-desc">
            From vetted origin harvest to container dispatch, every commercial consignment undergoes a structured
            5-stage quality assurance protocol ensuring strict specification conformance and seamless customs release.
          </p>

          {/* Quick Pillars Row */}
          <div className="home-quality-highlights-bar">
            <span className="home-quality-hl-item">
              <ClipboardCheck size={15} className="hl-emerald-icon" aria-hidden="true" />
              100% Pre-Shipment Inspection
            </span>
            <span className="home-quality-hl-sep">•</span>
            <span className="home-quality-hl-item">
              <FlaskConical size={15} className="hl-cyan-icon" aria-hidden="true" />
              Third-Party Lab Tested (SGS / BV)
            </span>
            <span className="home-quality-hl-sep">•</span>
            <span className="home-quality-hl-item">
              <FileBadge size={15} className="hl-amber-icon" aria-hidden="true" />
              Full Phytosanitary &amp; COA Clearances
            </span>
          </div>
        </div>

        {/* Interactive 5-Stage Stepper / Pipeline */}
        <div className="home-quality-pipeline-wrap">
          <div
            className="home-quality-pipeline-line"
            style={{
              '--active-progress': selectedStageTab !== null ? `${(selectedStageTab / (steps.length - 1)) * 100}%` : '0%',
              opacity: selectedStageTab !== null ? 1 : 0.3,
            } as React.CSSProperties}
            aria-hidden="true"
          />

          <div
            className="home-quality-pipeline-tabs"
            role="tablist"
            aria-label="Quality and compliance process stages"
          >
            {steps.map((step, index) => {
              const isSelected = selectedStageTab === index;
              return (
                <button
                  key={step.num}
                  type="button"
                  id={`quality-tab-${index}`}
                  role="button"
                  aria-haspopup="dialog"
                  aria-expanded={activeModalStep === index}
                  onClick={() => handleOpenStageModal(index)}
                  className={`home-quality-step-tab ${isSelected ? 'is-active' : ''}`}
                >
                  <div className="step-tab-top-row">
                    <span className="step-tab-num-badge">{step.num}</span>
                    <div className={`step-tab-icon-box stage-color-${step.num}`} aria-hidden="true">
                      {step.icon}
                    </div>
                  </div>

                  <div className="step-tab-text-wrap">
                    <span className="step-tab-stage-label">STAGE {step.num}</span>
                    <strong className="step-tab-title">{step.shortTitle}</strong>
                    <span className="step-tab-tag">{step.tag}</span>
                  </div>

                  <div className="step-tab-cta-hint" aria-hidden="true">
                    <span>View More</span>
                    <ArrowRight size={12} />
                  </div>

                  {isSelected && <div className="step-tab-active-indicator" aria-hidden="true" />}
                </button>
              );
            })}
          </div>

          <div className="home-quality-pipeline-hint">
            <span className="pipeline-hint-icon-wrap" aria-hidden="true">
              <PipelineHintEmblemIcon />
            </span>
            <span>Click any stage card above to inspect technical specifications, audit checkpoints &amp; compliance dossiers</span>
          </div>
        </div>

        {/* Institutional Accreditation / Trust Standards Strip */}
        <div className="home-quality-trust-strip">
          <div className="home-quality-trust-header">
            <div className="trust-ribbon-icon-wrap" aria-hidden="true">
              <PrestigeMedalIcon />
            </div>
            <span className="trust-ribbon-title">INTERNATIONAL COMPLIANCE &amp; ACCREDITED PROTOCOLS</span>
          </div>

          <div className="home-quality-trust-grid">
            {certifications.map((item) => (
              <div key={item.id} className={`home-quality-trust-card cert-card-${item.id}`}>
                <div className="trust-card-header">
                  <span className="trust-card-tag">{item.tag}</span>
                  <span className="trust-card-status-badge">
                    <CheckCircle2 size={11} className="trust-check-icon" aria-hidden="true" />
                    <span>Verified</span>
                  </span>
                </div>
                <div className="trust-card-code">{item.code}</div>
                <div className="trust-card-label">{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Section Bottom Actions */}
        <div className="home-quality-bottom-action-wrap">
          <div className="home-quality-action-buttons">
            <Link
              to="/quality"
              className="home-quality-primary-btn"
              aria-label="Explore our full quality assurance and compliance framework"
            >
              <span>Explore Quality Framework</span>
              <ArrowRight size={17} aria-hidden="true" />
            </Link>

            {handleOpenQuote && (
              <button
                type="button"
                onClick={() => handleOpenQuote('Quality Specifications & COA')}
                className="home-quality-secondary-btn"
                aria-label="Request product quality specification sheet and sample COA"
              >
                <FileText size={16} aria-hidden="true" />
                <span>Request Spec Sheet &amp; COA</span>
              </button>
            )}
          </div>

          <p className="home-quality-guarantee-note">
            <span className="guarantee-shield-wrap" aria-hidden="true">
              <GuaranteeSecurityIcon />
            </span>
            <span>
              Every commercial shipment is accompanied by a certified <strong>Certificate of Analysis (COA)</strong>,
              origin inspection report, and required trade clearances.
            </span>
          </p>
        </div>
      </div>

      {/* Interactive Stage Details Modal Window ("Small Window" - Clean, Simple & Premium) */}
      {activeModalStep !== null && modalStage && typeof document !== 'undefined' && createPortal(
        <div
          className="quality-modal-overlay"
          onClick={handleCloseModal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="quality-modal-heading"
        >
          <div
            className="quality-modal-window"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Navigation Bar: Stage Pill + Switcher (01 to 05) + Close Button */}
            <div className="quality-modal-topbar">
              <div className="quality-modal-stage-pill">
                <BadgeCheck size={13} className="modal-sparkle-icon" aria-hidden="true" />
                <span>STAGE {modalStage.num}</span>
              </div>

              {/* Quick Stage Switcher Tabs (01 - 05) */}
              <div className="quality-modal-stage-selector" role="tablist" aria-label="Select stage">
                {steps.map((s, idx) => (
                  <button
                    key={s.num}
                    type="button"
                    role="tab"
                    aria-selected={activeModalStep === idx}
                    aria-label={`Switch to Stage ${s.num}: ${s.shortTitle}`}
                    onClick={() => {
                      setActiveModalStep(idx);
                      setSelectedStageTab(idx);
                    }}
                    className={`modal-stage-num-btn ${activeModalStep === idx ? 'is-active' : ''}`}
                  >
                    {s.num}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={handleCloseModal}
                className="quality-modal-close-btn"
                aria-label="Close stage details window"
              >
                <X size={17} aria-hidden="true" />
              </button>
            </div>

            {/* Header Content: Clear Stage Title & Concise One-Sentence Summary */}
            <div className="quality-modal-header">
              <div className="quality-modal-header-row">
                <div className={`quality-modal-icon-badge stage-color-${modalStage.num}`} aria-hidden="true">
                  {modalStage.icon}
                </div>
                <div className="quality-modal-header-titles">
                  <h3 id="quality-modal-heading" className="quality-modal-title">
                    {modalStage.title}
                  </h3>
                  <p className="quality-modal-desc">{modalStage.desc}</p>
                </div>
              </div>
            </div>

            {/* Modal Body: 4 Clear Verification Points */}
            <div className="quality-modal-body">
              <span className="quality-modal-section-label">Key Verification Standards</span>
              <ul className="quality-modal-checklist">
                {modalStage.checks.map((pointText, idx) => (
                  <li key={idx} className="quality-modal-check-item">
                    <CheckCircle2 size={16} className="modal-check-icon" aria-hidden="true" />
                    <span className="modal-check-text">{pointText}</span>
                  </li>
                ))}
              </ul>

              {/* Official Deliverable Dossier */}
              <div className="quality-modal-deliverable-card">
                <div className="deliverable-card-header">
                  <FileCheck2 size={15} aria-hidden="true" />
                  <span>OFFICIAL VERIFIED DELIVERABLE</span>
                </div>
                <div className="deliverable-card-title">{modalStage.deliverable}</div>
              </div>
            </div>

            {/* Modal Footer: Simple Stepper & Clean Action */}
            <div className="quality-modal-footer">
              <div className="quality-modal-stepper">
                <button
                  type="button"
                  disabled={activeModalStep === 0}
                  onClick={() => {
                    const next = Math.max(0, activeModalStep - 1);
                    setActiveModalStep(next);
                    setSelectedStageTab(next);
                  }}
                  className="modal-step-btn"
                  aria-label="Previous Stage"
                >
                  <ChevronLeft size={16} aria-hidden="true" />
                  <span>Prev</span>
                </button>

                <button
                  type="button"
                  disabled={activeModalStep === steps.length - 1}
                  onClick={() => {
                    const next = Math.min(steps.length - 1, activeModalStep + 1);
                    setActiveModalStep(next);
                    setSelectedStageTab(next);
                  }}
                  className="modal-step-btn"
                  aria-label="Next Stage"
                >
                  <span>Next</span>
                  <ChevronRight size={16} aria-hidden="true" />
                </button>
              </div>

              {handleOpenQuote && (
                <button
                  type="button"
                  onClick={() => {
                    handleOpenQuote(`Stage ${modalStage.num} (${modalStage.shortTitle}) Protocol Verification`);
                    handleCloseModal();
                  }}
                  className="quality-modal-cta-btn"
                >
                  <span>Inquire on Stage {modalStage.num}</span>
                  <ArrowRight size={14} aria-hidden="true" />
                </button>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
};
