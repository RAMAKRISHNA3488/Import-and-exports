export interface ServiceCapability {
  title: string;
  desc: string;
  highlight?: string;
}

export interface ServiceWorkflowStep {
  step: string;
  phase: string;
  title: string;
  description: string;
  deliverable: string;
  duration: string;
}

export interface ServiceKeyStat {
  label: string;
  value: string;
  desc: string;
}

export interface ServiceSpecItem {
  label: string;
  value: string;
}

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface ServiceCaseStudy {
  title: string;
  client: string;
  challenge: string;
  solution: string;
  result: string;
  metrics: string;
}

export interface DetailedService {
  id: string;
  aliasIds?: string[];
  name: string;
  tagline: string;
  category: string;
  shortDesc: string;
  badge: string;
  themeClass: string;
  image: string;
  iconName: 'Ship' | 'Plane' | 'Globe' | 'Truck' | 'ShieldCheck' | 'Users' | 'PackageCheck' | 'Laptop';
  pills: string[];
  overview: string[];
  keyStats: ServiceKeyStat[];
  capabilities: ServiceCapability[];
  workflow: ServiceWorkflowStep[];
  specifications: ServiceSpecItem[];
  complianceBadges: string[];
  faqs: ServiceFaq[];
  caseStudy: ServiceCaseStudy;
  relatedServiceIds: string[];
}

export const SERVICES_CATALOG: DetailedService[] = [
  {
    id: 'import-solutions',
    name: 'Import Solutions',
    tagline: 'Inbound Customs Clearance, Port Drayage & Domestic Distribution',
    category: 'Port & Inbound Logistics',
    shortDesc: 'Quality products from global markets with seamless import processes.',
    badge: 'Port Cleared • Inbound Ready',
    themeClass: 'theme-cyan',
    image: '/assets/services/import-solutions.jpg',
    iconName: 'Ship',
    pills: ['Customs Clearance', 'Port Drayage', 'Domestic Delivery', 'Bonded Storage'],
    overview: [
      'ConceptExim orchestrates institutional inbound trade corridors into India and key international consumer markets. We manage end-to-end commercial import clearance, tariff structuring, port terminal drayage, and temperature-controlled bonded warehousing.',
      'Our dedicated port presence at major maritime gateways ensures pre-arrival manifest scrutiny, avoiding costly vessel demurrage and terminal detention penalties while securing expedited customs out-of-charge orders for commercial consignees.'
    ],
    keyStats: [
      { label: 'Clearance Turnaround', value: '< 24 Hours', desc: 'Pre-arrival manifest filing & expedited customs out-of-charge' },
      { label: 'Major Ports Covered', value: '18+ Terminals', desc: 'Direct operations at JNPT, Mundra, Chennai, Hazira, Kolkata & Vizag' },
      { label: 'Demurrage SLA', value: '0.0% Target', desc: 'Disciplined drayage staging eliminating container dwell fines' },
      { label: 'First-Pass Clearance', value: '99.6%', desc: 'Zero-discrepancy documentation matching statutory regulations' }
    ],
    capabilities: [
      {
        title: 'Pre-Arrival Manifest Filing & IGM Matching',
        desc: 'Advance submission of Import General Manifests (IGM) and electronic Bills of Entry prior to vessel berthing for rapid customs clearance.',
        highlight: 'Advance EDI Filing'
      },
      {
        title: 'Port Drayage & Dedicated Yard Staging',
        desc: 'Contracted multi-axle trailer fleets staging directly at port terminals for immediate container evacuation to container freight stations (CFS).',
        highlight: 'Zero Dwell Time'
      },
      {
        title: 'Customs Tariff & HS Classification Advisory',
        desc: 'Precision classification under national Customs Tariffs to optimize duty liabilities, utilize FTA concessions, and ensure full statutory concordance.',
        highlight: 'Duty Optimization'
      },
      {
        title: 'Statutory Regulatory Accreditations (FSSAI, PQ, BIS)',
        desc: 'Direct liaison with Food Safety, Plant Quarantine (PQ), Animal Quarantine (AQCS), and Bureau of Indian Standards for seamless inspection sampling.',
        highlight: 'Certified Clearances'
      },
      {
        title: 'Section 49 / 59 / 65 Bonded Inland Warehousing',
        desc: 'Licensed private and public customs-bonded storage facilities allowing consignees to defer duty payments until domestic distribution or manufacturing.',
        highlight: 'Duty Deferment'
      },
      {
        title: 'Multi-Modal Domestic Freight Distribution',
        desc: 'Last-mile containerized trucking and dedicated railway container haulage delivering cargo directly to factory gates and processing mills.',
        highlight: 'Doorstep Delivery'
      }
    ],
    workflow: [
      {
        step: '01',
        phase: 'Pre-Arrival',
        title: 'Manifest & Document Scrutiny',
        description: 'Verification of commercial invoice, packing list, bill of lading, and phytosanitary certificates against electronic IGM feeds.',
        deliverable: 'Checklist Concordance Report',
        duration: '48h Prior to Berthing'
      },
      {
        step: '02',
        phase: 'Customs Filing',
        title: 'Electronic Bill of Entry Submission',
        description: 'EDI filing on ICEGATE with accurate HS classifications, valuation declarations, and preferential duty exemption claims.',
        deliverable: 'Assessed Bill of Entry (BOE)',
        duration: '12h Post-IGM'
      },
      {
        step: '03',
        phase: 'Terminal Ops',
        title: 'Vessel Discharge & Port Drayage',
        description: 'Immediate container hook-off, terminal gate-out, and transit movement to dedicated Container Freight Station (CFS).',
        deliverable: 'Terminal Gate-Out Pass',
        duration: 'Within 6h of Discharge'
      },
      {
        step: '04',
        phase: 'Inspection',
        title: 'Regulatory Sampling & Joint Examination',
        description: 'Customs examination alongside Plant Quarantine or FSSAI testing officers for formal laboratory clearance sign-offs.',
        deliverable: 'Statutory Inspection NOC',
        duration: 'Within 24h of CFS Gate-In'
      },
      {
        step: '05',
        phase: 'Delivery',
        title: 'Out-of-Charge (OOC) & Dispatch',
        description: 'Customs release order generation and dispatch via GPS-tracked container chassis directly to the client warehouse.',
        deliverable: 'Signed Proof of Delivery (POD)',
        duration: 'Same-Day Dispatch'
      }
    ],
    specifications: [
      { label: 'Supported IncoTerms', value: 'CIF, CFR, DPU, DDP, DAP, DAT' },
      { label: 'Primary Sea Ports', value: 'Nhava Sheva (JNPT), Mundra, Chennai, Hazira, Kolkata, Cochin, Vizag, Pipavav' },
      { label: 'Cargo Profiles', value: 'Pulses, Milling Grains, Edible Oils, Industrial Machinery, Raw Chemicals, Packaged Foods' },
      { label: 'Customs Single Window', value: 'ICEGATE EDI 1.5, SWIFT Indian Customs, e-Sanchit Repository' },
      { label: 'Bonded Facility Types', value: 'Section 49 Staging, Section 59 Public/Private Bond, Section 65 MOOWR' },
      { label: 'Escrow & Duty Mechanism', value: 'Direct automated electronic duty payment gateway integration' }
    ],
    complianceBadges: ['AEO Tier-2 Certified', 'FSSAI Registered Broker', 'Plant Quarantine Accreditations', 'ISO 9001:2015 Operations'],
    faqs: [
      {
        question: 'How does ConceptExim prevent demurrage and container detention at ocean terminals?',
        answer: 'We initiate advance document processing up to 48 hours before the vessel arrives. By coordinating pre-berthing customs checklists and pre-staging dedicated drayage trailers at the terminal gates, we evacuate containers immediately upon discharge.'
      },
      {
        question: 'Which regulatory authorities do your customs brokers interface with?',
        answer: 'Our licensed customs personnel directly handle clearances with the Food Safety and Standards Authority of India (FSSAI), Directorate of Plant Protection, Quarantine & Storage (PQ), Animal Quarantine (AQCS), Bureau of Indian Standards (BIS), and Drug Controller.'
      },
      {
        question: 'Can you provide customs-bonded warehousing if our facility is not ready to receive goods?',
        answer: 'Yes. We operate licensed Section 59 and Section 65 customs-bonded warehouses across key logistics clusters. Goods can be safely stored in our insured, climate-regulated facilities with duty payments deferred until final release.'
      },
      {
        question: 'What documentation is mandatory for initiating an inbound commercial shipment?',
        answer: 'Key mandatory documents include the Commercial Invoice, Detailed Packing List, Original/Telex Bill of Lading, Certificate of Origin (COO), and specific product testing reports such as Phytosanitary Certificates or Certificates of Analysis.'
      }
    ],
    caseStudy: {
      title: 'Rapid Inbound Port Clearance of 12,000 MT Milling Wheat at Mundra Port',
      client: 'Major Regional Flour Mill & Agro-Processing Consortium',
      challenge: 'Consignee faced severe demurrage exposure due to consecutive public holidays, heavy berth congestion, and mandatory grain moisture sampling.',
      solution: 'Pre-filed advance electronic Bill of Entry under provisional assessment, arranged direct terminal hook-to-CFS evacuation, and facilitated simultaneous on-site Plant Quarantine sampling.',
      result: 'Zero demurrage charges incurred; cargo completely cleared and transported to inland silos 36 hours ahead of scheduled production deadlines.',
      metrics: '100% on-time processing | $38,000 demurrage saved'
    },
    relatedServiceIds: ['customs-support', 'logistics-coordination', 'value-added-services']
  },
  {
    id: 'export-management',
    aliasIds: ['export-solutions'],
    name: 'Export Management',
    tagline: 'Global Dispatch, Vessel Chartering & Multimodal Ocean/Air Outbound',
    category: 'Multimodal Ocean & Air Outbound',
    shortDesc: 'Expand your business with our export expertise and global reach.',
    badge: 'Tier-1 Carrier • Multimodal Ocean',
    themeClass: 'theme-indigo',
    image: '/assets/services/export-solutions.jpg',
    iconName: 'Plane',
    pills: ['Global Dispatch', 'Air & Ocean Freight', 'Port Delivery', 'Compliance'],
    overview: [
      'ConceptExim delivers structured cross-border export execution for commercial enterprises, agricultural cooperatives, and multinational commodity traders. We combine contracted tier-1 shipping carrier space allocations with flawless export documentation and foreign customs advisory.',
      'From container positioning at origin processing mills to maritime vessel chartering and overseas consignee release, our global export desk delivers uncompromising reliability across 150+ destination jurisdictions.'
    ],
    keyStats: [
      { label: 'Active Trade Lanes', value: '45+ Global Corridors', desc: 'Direct maritime routes across GCC, Southeast Asia, Europe, Africa & Americas' },
      { label: 'Liner Alliances', value: 'Tier-1 Direct Slots', desc: 'Contracted space guarantees with Maersk, MSC, CMA CGM, Hapag-Lloyd & ONE' },
      { label: 'Annual Export Volume', value: '75,000+ MT', desc: 'Agricultural commodities, processed foodstuffs, and industrial equipment' },
      { label: 'Banking LC Concordance', value: '99.8% First-Pass', desc: 'Zero document discrepancy guarantee under UCP 600 banking standards' }
    ],
    capabilities: [
      {
        title: 'Contracted Ocean Freight Chartering & Slot Guarantees',
        desc: 'Block-space agreements with premier global liner alliances ensuring vessel space allocation during high-demand peak shipping cycles.',
        highlight: 'Space Guarantees'
      },
      {
        title: 'Factory-Gate Stuffing & Container Staging',
        desc: 'Positioning sanitized 20ft and 40ft container units directly at origin agro-processing mills, complete with RFID tamper-evident bolt sealing.',
        highlight: 'Origin Stuffing'
      },
      {
        title: 'Express Multimodal Air Cargo Operations',
        desc: 'Chartered and scheduled air freight through primary international cargo hubs for high-value agricultural samples, spices, and time-critical consignments.',
        highlight: 'Expedited Air Freight'
      },
      {
        title: 'Export Incentive & Duty Drawback Advisory',
        desc: 'End-to-end statutory management of RoDTEP, RoSCTL, Duty Drawback, EPCG, and Advance Authorization schemes to maximize export margins.',
        highlight: 'Duty Optimization'
      },
      {
        title: 'Foreign Customs Gate-In & Port Entry Guidance',
        desc: 'Proactive coordination with destination customs authorities, foreign port handling agents, and consignee clearance brokers.',
        highlight: 'Destination Assistance'
      },
      {
        title: 'All-Risk Marine Cargo Insurance (Institute Cargo Clauses A)',
        desc: 'Comprehensive warehouse-to-warehouse maritime insurance coverage safeguarding valuable cargo against ocean perils, weather, and transit damage.',
        highlight: 'Full Cargo Protection'
      }
    ],
    workflow: [
      {
        step: '01',
        phase: 'Booking',
        title: 'Freight Charter & Vessel Slot Allocation',
        description: 'Securing vessel space on tier-1 liners with verified sailing schedules, cutoff dates, and container release orders (CRO).',
        deliverable: 'Confirmed Carrier Booking Note',
        duration: 'Within 4 Hours'
      },
      {
        step: '02',
        phase: 'Stuffing',
        title: 'Container Positioning & Factory Loading',
        description: 'Sanitary inspection of empty containers, supervised pallet loading, desiccant placement, and ISO 17712 bolt seal affixation.',
        deliverable: 'Container Loading Report & Seal Record',
        duration: 'Day 1–2'
      },
      {
        step: '03',
        phase: 'Clearance',
        title: 'Port Gate-In & Shipping Bill Clearance',
        description: 'Transit to port terminal, electronic Shipping Bill filing, customs examination, and Let Export Order (LEO) generation.',
        deliverable: 'Let Export Order (LEO)',
        duration: '24h Prior to Gate Cut-off'
      },
      {
        step: '04',
        phase: 'Departure',
        title: 'Vessel Loading & Bill of Lading Issuance',
        description: 'Monitoring container crane loading aboard the maritime vessel and rapid drafting and issuance of the Ocean Bill of Lading.',
        deliverable: 'Original / Electronic Bill of Lading (eBL)',
        duration: 'Day of Vessel Sailing'
      },
      {
        step: '05',
        phase: 'Handover',
        title: 'Banking Presentation & Foreign Port Handover',
        description: 'Submission of complete export document dossier to the negotiating bank under UCP 600 Letter of Credit terms.',
        deliverable: 'Bank Presentation Schedule & Tracking',
        duration: 'Post-Sailing Transit'
      }
    ],
    specifications: [
      { label: 'Standard IncoTerms', value: 'FOB, CIF, CFR, FCA, FAS, EXW, CPT, CIP' },
      { label: 'Container Fleet Options', value: '20ft GP (Dry), 40ft High-Cube, 20/40ft Reefer, Open Top, Flat Rack' },
      { label: 'Primary Indian Export Ports', value: 'Mundra, Nhava Sheva (JNPT), Hazira, Chennai, Kolkata, Tuticorin' },
      { label: 'Destination Coverage', value: 'GCC / Middle East, Southeast Asia, European Union, North America, East & West Africa' },
      { label: 'Sailing Frequency', value: 'Direct weekly scheduled liner services on primary commercial corridors' },
      { label: 'Tracking Infrastructure', value: 'Satellite AIS vessel tracking + container milestone telemetry alerts' }
    ],
    complianceBadges: ['FIATA Multimodal Member', 'APEDA Registered Exporter', 'AEO Certified Operator', 'DGFT Compliant'],
    faqs: [
      {
        question: 'How does ConceptExim guarantee container vessel slots during peak seasonal disruptions?',
        answer: 'We maintain long-term direct contract commitments with major carrier alliances (such as 2M, Ocean Alliance, and Premier Alliance). This ensures dedicated block-space allocations even during severe space crunches.'
      },
      {
        question: 'What is the distinction between factory stuffing and port/CFS stuffing for agro commodities?',
        answer: 'For premium agricultural cargo, factory stuffing positions sanitized ocean containers directly at the mill. This minimizes multiple handling steps, eliminates moisture contamination risks, and allows direct origin sealing.'
      },
      {
        question: 'Do you manage Letter of Credit (LC) documentation concordance?',
        answer: 'Yes. Our specialized trade banking desk cross-verifies all shipping bills, bills of lading, commercial invoices, and inspection certificates against strict UCP 600 LC conditions before presenting documents to the bank.'
      }
    ],
    caseStudy: {
      title: '250 FEU Outbound Ocean Dispatch of Non-Basmati Rice to West Africa',
      client: 'Leading International Grain Trading House',
      challenge: 'Tight 14-day LC validity window amidst acute regional container shortages and volatile freight tariffs.',
      solution: 'Pre-allocated vessel slots across three consecutive sailings with synchronized rail drayage from inland mill clusters directly to Mundra port terminal.',
      result: '100% on-time container loading, zero document rejections, and pristine cargo delivery at destination port.',
      metrics: '250 containers dispatched | 0 LC discrepancies | 14-day execution'
    },
    relatedServiceIds: ['global-sourcing', 'customs-support', 'logistics-coordination']
  },
  {
    id: 'global-sourcing',
    aliasIds: ['product-sourcing'],
    name: 'Global Sourcing',
    tagline: 'Direct Primary Origin Procurement, Cooperative Audits & Commodity Supply',
    category: 'Primary Origin Sourcing',
    shortDesc: 'Reliable suppliers, better value and long-term partnerships.',
    badge: 'Direct Farmgate • Mill Audited',
    themeClass: 'theme-emerald',
    image: '/assets/services/product-sourcing.jpg',
    iconName: 'Globe',
    pills: ['Direct Origin', 'Factory Vetting', 'Quality Grading', 'FOB / CIF Terms'],
    overview: [
      'ConceptExim bridges institutional international buyers directly with audited primary agricultural collectives, certified processing mills, and primary manufacturing hubs. We eliminate speculative trading intermediaries to guarantee complete lot traceability, fair pricing, and uncompromised quality grading.',
      'Our on-the-ground origin inspection teams physically audit facilities, inspect soil and harvest conditions, verify laboratory assays, and structure legally enforceable commercial supply contracts tailored to your exact specifications.'
    ],
    keyStats: [
      { label: 'Audited Mill Network', value: '350+ Facilities', desc: 'Pre-qualified farm cooperatives, processing mills, and packing centers' },
      { label: 'Direct Sourcing Savings', value: '8% to 14%', desc: 'Elimination of speculative domestic broker markups and tiered middlemen' },
      { label: 'Origin Traceability', value: '100% Lot-Level', desc: 'Direct farm-gate and processing lot batch tracking and GPS mapping' },
      { label: 'Lab Verification', value: 'SGS / Eurofins Tested', desc: 'Pre-contract composite sampling and independent certified assay reports' }
    ],
    capabilities: [
      {
        title: 'Direct Mill & Cooperative Vetting',
        desc: 'Rigorous physical audits evaluating milling capacity, storage hygiene, processing machinery, sorting capabilities, and statutory certifications.',
        highlight: 'On-Site Audits'
      },
      {
        title: 'Crop Harvest & Seasonal Price Forecasting',
        desc: 'Continuous field monitoring of planting patterns, weather trends, and crop yields to advise clients on optimal commodity purchasing cycles.',
        highlight: 'Price Intelligence'
      },
      {
        title: 'Pre-Contract Representative Sampling',
        desc: 'Dispatch of verified composite lot samples directly to buyer testing laboratories for sensory, physical, and chemical evaluation prior to formal orders.',
        highlight: 'Verified Samples'
      },
      {
        title: 'Customized Grading & Specification Benchmarks',
        desc: 'Tailored sorting for grain length, broken percentage, moisture content, purity levels, foreign matter, and color sorting.',
        highlight: 'Custom Grading'
      },
      {
        title: 'Sustainable & Ethical Origin Compliance',
        desc: 'Sourcing protocols aligning with Fair Trade, GlobalGAP, Rainforest Alliance, Non-GMO, and organic agricultural practices.',
        highlight: 'Ethical Supply'
      },
      {
        title: 'Structured Long-Term Supply Contracts',
        desc: 'Negotiating volume-allocated supply agreements with seasonal price collars and staggered monthly container dispatch schedules.',
        highlight: 'Stable Supply'
      }
    ],
    workflow: [
      {
        step: '01',
        phase: 'Profiling',
        title: 'Buyer Specification & Volume Profiling',
        description: 'Detailed intake of required commodity variety, physical grade parameters, destination packaging, and target delivery windows.',
        deliverable: 'Commercial Sourcing Specification Sheet',
        duration: 'Day 1'
      },
      {
        step: '02',
        phase: 'Tender',
        title: 'Audited Mill Network Allocation',
        description: 'Competitive procurement tender across pre-qualified origin mills matching exact capacity and compliance credentials.',
        deliverable: 'Origin Supplier Comparative Matrix',
        duration: 'Day 2–3'
      },
      {
        step: '03',
        phase: 'Assay',
        title: 'Batch Sampling & Laboratory Testing',
        description: 'Drawing representative lot samples under accredited surveyor supervision for comprehensive chemical and physical assay.',
        deliverable: 'Independent Lab Assay Certificate',
        duration: 'Day 4–5'
      },
      {
        step: '04',
        phase: 'Contract',
        title: 'Commercial Supply Contract Execution',
        description: 'Formalization of bilateral sales agreement stipulating IncoTerms, payment terms, tolerance limits, and delivery milestones.',
        deliverable: 'Executed Commercial Sales Contract',
        duration: 'Day 6'
      },
      {
        step: '05',
        phase: 'Fulfillment',
        title: 'Supervised Mill Processing & Loading',
        description: 'On-site technical supervision during sorting, packaging, weighing, and container stuffing at the processing mill.',
        deliverable: 'Pre-Dispatch Inspection Report',
        duration: 'Production Cycle'
      }
    ],
    specifications: [
      { label: 'Commodity Categories', value: 'Basmati & Non-Basmati Rice, Pulses, Grains, Oilseeds, Spices, Sugar, Agro-Byproducts' },
      { label: 'Origin Terrains', value: 'India (Punjab, Haryana, MP, Gujarat, Andhra, Maharashtra), Southeast Asia, Black Sea Basin' },
      { label: 'Quality Standards', value: 'AGMARK Grade 1, APEDA Export Standards, Codex Alimentarius, US FDA, EU MRL Standards' },
      { label: 'Minimum Order Quantity', value: '1 Full Container Load (FCL) ~ 20 to 25 Metric Tonnes' },
      { label: 'Contracting Models', value: 'Fixed Price Spot Purchase, Seasonal Average Pricing, Multi-Month Staggered Offtake' },
      { label: 'Testing Partners', value: 'SGS, Intertek, Bureau Veritas, Eurofins, Vimta Labs' }
    ],
    complianceBadges: ['APEDA Certified Partner', 'FSSAI License Holder', 'GlobalGAP Aligned', 'ISO 22000 Food Safety'],
    faqs: [
      {
        question: 'How does ConceptExim verify the credibility and solvency of origin mills?',
        answer: 'Our field compliance team performs comprehensive physical audits of processing mills, verifies banking references, inspects past export shipping performance, and assesses machinery condition before approving any mill into our verified vendor network.'
      },
      {
        question: 'Can overseas buyers specify custom grading benchmarks for commodities?',
        answer: 'Yes. We contractually enforce specific tolerances for moisture, average grain length (AGL), elongation ratio, chalkiness, broken kernel percentage, and foreign matter according to your precise requirements.'
      },
      {
        question: 'Do you facilitate independent third-party quality inspections before payment is released?',
        answer: 'Yes. Pre-shipment quality inspection (PSI) by international accredited surveyors such as SGS or Intertek is standard practice on all our procurement orders prior to release of commercial documentation.'
      }
    ],
    caseStudy: {
      title: 'Seasonal Basmati Rice Sourcing Program for European Retail Distributor',
      client: 'Tier-1 European Private-Label Food Distributor',
      challenge: 'Stringent EU maximum residue levels (MRLs) for tricyclazole and thiamethoxam, combined with a demand for 8.3mm+ grain length 1121 Steam Basmati.',
      solution: 'Contracted directly with audited farm cooperatives in Punjab practicing integrated pest management, accompanied by lot-by-lot Eurofins laboratory pesticide assays.',
      result: '100% compliance with EU standards across 4,500 MT of exported rice, zero border port rejections, and a 3-year recurring supply agreement.',
      metrics: '4,500 MT delivered | 100% EU MRL compliant | 0 border holds'
    },
    relatedServiceIds: ['value-added-services', 'export-management', 'customs-support']
  },
  {
    id: 'logistics-coordination',
    aliasIds: ['supplier-coordination'],
    name: 'Logistics Coordination',
    tagline: 'End-to-End Fleet Logistics, Intermodal Drayage & Production Tracking',
    category: 'End-to-End Fleet Logistics',
    shortDesc: 'Smooth movement, end to end for your global shipments.',
    badge: 'Production QA • Milestone Tracking',
    themeClass: 'theme-amber',
    image: '/assets/services/supplier-coordination.jpg',
    iconName: 'Truck',
    pills: ['Fleet Management', 'Container Drayage', 'Route Optimization', 'Milestone Tracking'],
    overview: [
      'Unbroken supply chain momentum requires precision inland freight coordination. ConceptExim operates a dedicated logistics control desk coordinating commercial trailer fleets, inland container depots (ICDs), and intermodal rail links.',
      'From origin factory dispatch through highway transit and marine terminal staging, our operations team guarantees on-time container delivery, real-time GPS telemetry, and rigorous physical cargo protection.'
    ],
    keyStats: [
      { label: 'Dedicated Fleet Access', value: '120+ Trailers', desc: 'GPS-equipped multi-axle skeletal trailers, high-cube box trucks, and reefers' },
      { label: 'On-Time Drayage SLA', value: '98.4%', desc: 'Punctual arrival at maritime port container terminals before gate cut-off' },
      { label: 'Real-Time Telemetry', value: '100% GPS Tracked', desc: 'Live position, transit speed, and tamper sensor logging for every shipment' },
      { label: 'Inland Hub Coverage', value: '24+ Primary ICDs', desc: 'Direct rail-linked corridors connecting major industrial clusters to seaports' }
    ],
    capabilities: [
      {
        title: 'Intermodal Container Drayage & Port Staging',
        desc: 'Coordinating high-capacity container movements between inland manufacturing clusters and gateway seaports via dedicated road and rail links.',
        highlight: 'Intermodal Haulage'
      },
      {
        title: 'Heavy-Lift & Oversized Project Cargo Logistics',
        desc: 'Specialized hydraulic multi-axle trailers and custom rigging for industrial machinery, processing plants, and non-standard project cargo.',
        highlight: 'Project Cargo'
      },
      {
        title: 'Temperature-Controlled Cold-Chain Haulage',
        desc: 'Advanced refrigerated trailers with clip-on gensets and digital dataloggers maintaining exact -20°C to +15°C ranges for perishable goods.',
        highlight: 'Reefer Cold Chain'
      },
      {
        title: 'Dynamic Algorithmic Route Optimization',
        desc: 'Live telemetry systems actively rerouting freight around highway bottlenecks, monsoon damage, and border toll choke points.',
        highlight: 'Smart Routing'
      },
      {
        title: 'Inland Container Depot (ICD) Hub Consolidation',
        desc: 'Efficient staging, cross-docking, and customs clearance at inland dry ports, minimizing ocean terminal congestion.',
        highlight: 'Dry Port Staging'
      },
      {
        title: 'Continuous Milestone Telemetry & Push Alerts',
        desc: 'Automated SMS, email, and portal notifications as shipments reach key transit checkpoints: factory exit, weighbridge, ICD gate-in, and port cutoff.',
        highlight: 'Live Telemetry'
      }
    ],
    workflow: [
      {
        step: '01',
        phase: 'Dispatch',
        title: 'Fleet Staging & Driver Briefing',
        description: 'Allocation of verified GPS-equipped trailer, container condition check, and driver safety briefing.',
        deliverable: 'Transport Dispatch Order (TDO)',
        duration: 'Within 2h of Request'
      },
      {
        step: '02',
        phase: 'Loading',
        title: 'Origin Stuffing & Tare Weight Verification',
        description: 'Supervised loading, verified gross mass (VGM) certified weighbridge certification, and high-security bolt seal application.',
        deliverable: 'VGM Certificate & Weight Slip',
        duration: 'Day 1'
      },
      {
        step: '03',
        phase: 'Transit',
        title: 'Active Corridor Telemetry Tracking',
        description: 'Continuous 24/7 control room monitoring of vehicle speed, geofencing deviations, and scheduled driver rest periods.',
        deliverable: 'Live GPS Corridor Tracking Link',
        duration: 'Transit Window'
      },
      {
        step: '04',
        phase: 'Staging',
        title: 'Port Buffer Yard / ICD Gate-In',
        description: 'Arrival at destination port staging yard, electronic interchange receipt (EIR) generation, and customs scan.',
        deliverable: 'Equipment Interchange Receipt (EIR)',
        duration: '12h Prior to Cut-off'
      },
      {
        step: '05',
        phase: 'Handover',
        title: 'Terminal Gate-In & Hook Release',
        description: 'Container placement inside terminal stack yard awaiting crane load onto the ocean-going container vessel.',
        deliverable: 'Terminal Gate-In Voucher (TGV)',
        duration: 'Final Mile'
      }
    ],
    specifications: [
      { label: 'Fleet Equipment Types', value: '20ft/40ft Skeletal Chassis, Low-Bed Multi-Axle, Reefer Trucks, Heavy Flatbeds' },
      { label: 'Telemetry Hardware', value: 'Dual-SIM 4G GPS, tamper-evident e-seals, wireless BLE temperature probes' },
      { label: 'ICD Hub Connections', value: 'TKD Delhi, Dadri, Garhi Harsaru, Ludhiana, Ahmedabad, Whitefield, Nagpur' },
      { label: 'Transit Insurance', value: 'Goods In Transit (GIT) carrier legal liability & comprehensive cargo cover' },
      { label: 'Weight Certification', value: 'SOLAS-compliant Verified Gross Mass (VGM) calibrated weighbridges' }
    ],
    complianceBadges: ['ISO 9001:2015 Transport', 'SOLAS VGM Compliant', 'Indian Motor Vehicles Act Certified', 'IBA Approved Transporter'],
    faqs: [
      {
        question: 'How do you safeguard container seal integrity during long-distance domestic haulage?',
        answer: 'Every container is locked with an ISO 17712 certified tamper-evident bolt seal immediately after loading. Drivers are trained on strict protocols, and high-resolution photographic records are cross-checked at every toll and terminal gate.'
      },
      {
        question: 'What is the average transit duration from North Indian ICDs to Western gateway ports?',
        answer: 'Scheduled rail drayage from NCR/Punjab ICDs to Mundra or Nhava Sheva averages 48 to 72 hours. Express road haulage operates on a dedicated 36-hour express transit schedule.'
      }
    ],
    caseStudy: {
      title: 'Time-Critical Logistics for 40 Reefer Containers of Fresh Table Grapes',
      client: 'Premier Horticultural Export House',
      challenge: 'Perishable cargo requiring an unbroken cold chain (0°C to 1°C) with strict vessel cutoff deadlines at Nhava Sheva port.',
      solution: 'Dispatched 40 genset-fitted reefer trailers with live IoT temperature dataloggers and round-the-clock control room tracking.',
      result: 'Zero spoilage, temperature variance kept below 0.3°C throughout transit, and seamless vessel gate-in 6 hours prior to cutoff.',
      metrics: '40 Reefer containers | < 0.3°C temp variance | 0% spoilage'
    },
    relatedServiceIds: ['export-management', 'import-solutions', 'digital-trade-solutions']
  },
  {
    id: 'customs-support',
    aliasIds: ['documentation-support'],
    name: 'Customs Support',
    tagline: 'Trade Filings, Customs Compliance, IncoTerms & Regulatory Accreditations',
    category: 'Trade Filings & Customs Compliance',
    shortDesc: 'Compliance made simple and hassle-free.',
    badge: 'Trade Filings & Customs Compliance',
    themeClass: 'theme-rose',
    image: '/assets/services/documentation-support.jpg',
    iconName: 'ShieldCheck',
    pills: ['Customs Filings', 'Cert of Origin', 'Phyto Compliance', 'LC Concordance'],
    overview: [
      'Regulatory compliance is the bedrock of friction-free international trade. ConceptExim’s Customs & Documentation Support desk is staffed by certified customs brokers, international trade attorneys, and documentation specialists.',
      'We prepare, review, and execute end-to-end commercial documentation packages—guaranteeing zero-discrepancy filings under banking Letters of Credit, full alignment with ICC INCOTERMS 2020, and swift customs assessments.'
    ],
    keyStats: [
      { label: 'LC Concordance', value: '99.8% First-Pass', desc: 'Document packages accepted by negotiating banks without non-conformity flags' },
      { label: 'EDI Filing SLA', value: '< 2 Hours', desc: 'Rapid submission of Shipping Bills and Bills of Entry on national single-window portals' },
      { label: 'Regulatory Bodies', value: '14+ Agencies', desc: 'Direct integration with DGFT, Customs, FSSAI, Plant Quarantine, and BIS' },
      { label: 'Tariff Accuracy', value: '100% Audit Pass', desc: 'Zero penalty record across thousands of complex commodity classifications' }
    ],
    capabilities: [
      {
        title: 'Electronic EDI Customs Documentation',
        desc: 'Expert drafting and filing of Shipping Bills (SB) and Bills of Entry (BOE) on ICEGATE and national customs single-window portals.',
        highlight: 'Instant EDI Filings'
      },
      {
        title: 'Certificates of Origin (Preferential & Non-Preferential)',
        desc: 'Issuance through authorized Chambers of Commerce and DGFT portals for bilateral Free Trade Agreements (e.g. India-UAE CEPA, SAFTA, ASEAN).',
        highlight: 'Tariff Reductions'
      },
      {
        title: 'Phytosanitary & Fumigation Certification',
        desc: 'Coordination with accredited Plant Quarantine authorities, methyl bromide/phosphine fumigation treatments, and official Phyto certificate issuance.',
        highlight: 'Plant Quarantine'
      },
      {
        title: 'UCP 600 Letter of Credit Concordance Scrutiny',
        desc: 'Exhaustive pre-presentation audit of all commercial invoices, bills of lading, and inspection sheets against strict Letter of Credit terms.',
        highlight: 'Banking Concordance'
      },
      {
        title: 'Customs Dispute Resolution & SVB Inquiries',
        desc: 'Representation before customs authorities for tariff reclassifications, valuation reviews, Special Valuation Branch (SVB) cases, and duty refunds.',
        highlight: 'Dispute Defense'
      },
      {
        title: 'Export Duty Drawback & Tax Filings',
        desc: 'Preparation and filing of RoDTEP, RoSCTL, Duty Drawback, and GST export refund applications to ensure timely capital reclamation.',
        highlight: 'Refund Recovery'
      }
    ],
    workflow: [
      {
        step: '01',
        phase: 'Scrutiny',
        title: 'Document Scrubbing & Tariff Code Review',
        description: 'Cross-checking commercial invoice, packing list, and contract terms against exact Harmonized System (HS) nomenclature.',
        deliverable: 'Pre-Filing Compliance Audit Sheet',
        duration: 'Within 2h'
      },
      {
        step: '02',
        phase: 'EDI Filing',
        title: 'Electronic Transmission & Checklist Sign-Off',
        description: 'Submission of data to ICEGATE single window and generation of draft checklist for client review and verification.',
        deliverable: 'Customs Checklist Confirmation',
        duration: 'Within 4h'
      },
      {
        step: '03',
        phase: 'Certifications',
        title: 'Chamber & Quarantine Accreditations',
        description: 'Securing Certificate of Origin, Phytosanitary inspection pass, SGS assay report, and fumigation endorsements.',
        deliverable: 'Certified COO & Phyto Certificates',
        duration: 'Day 1–2'
      },
      {
        step: '04',
        phase: 'Assessment',
        title: 'Customs Assessment & Duty Verification',
        description: 'Customs appraiser review, duty calculation, statutory exemption claim sign-off, and inspection order issue.',
        deliverable: 'Customs Assessment Order',
        duration: 'Same-Day'
      },
      {
        step: '05',
        phase: 'Release',
        title: 'Final Out-of-Charge / LEO Generation',
        description: 'Final customs clearance order generation and dispatch of complete legalized document dossier to the client or bank.',
        deliverable: 'Official Let Export Order (LEO) / OOC',
        duration: 'Clearance Completion'
      }
    ],
    specifications: [
      { label: 'Key Documents Prepared', value: 'Commercial Invoice, Packing List, Bill of Lading, Shipping Bill, BOE, COO, Phyto, SGS/COA, Fumigation' },
      { label: 'Banking Frameworks', value: 'ICC Uniform Customs and Practice for Documentary Credits (UCP 600), ISBP 745' },
      { label: 'Trade Agreements Covered', value: 'India-UAE CEPA, India-Australia ECTA, SAFTA, ASEAN-India FTA, MERCOSUR, APTA' },
      { label: 'Customs Locations', value: 'All Major Sea Ports, Air Cargo Complexes (ACC), Inland Container Depots (ICD), and SEZs' }
    ],
    complianceBadges: ['AEO Tier-2 Accreditations', 'ICC INCOTERMS 2020 Compliant', 'DGFT Digital Partner', 'FICCI / FIEO Registered'],
    faqs: [
      {
        question: 'What is the processing time for issuing a Certificate of Origin (COO)?',
        answer: 'Digital non-preferential Certificates of Origin are issued within 2 to 4 hours. Preferential COOs under bilateral FTAs (such as CEPA or SAFTA) are processed through official government portals within 24 hours.'
      },
      {
        question: 'How do you handle discrepancies between the Letter of Credit and shipping documents?',
        answer: 'We conduct a line-by-line pre-shipment audit. If any contradiction exists between the LC conditions, local customs rules, or transport documents, our team drafts the necessary LC amendment before cargo departure to prevent banking rejections.'
      }
    ],
    caseStudy: {
      title: 'Zero-Discrepancy LC Execution for Multi-Port Agri Export Consortia',
      client: 'Agricultural Commodity Export Syndicate',
      challenge: 'High-value $4.2M Letter of Credit with 19 complex documentary conditions and severe non-compliance penalty clauses.',
      solution: 'Conducted three-tier internal document scrutiny, synchronized original phytosanitary reports, and submitted bank-compliant e-documentation within 48 hours of vessel departure.',
      result: '100% first-pass banking acceptance, zero LC discrepancy fees, and full funds settlement within 3 banking days.',
      metrics: '$4.2M LC value | 0 discrepancies | 3-day settlement'
    },
    relatedServiceIds: ['import-solutions', 'export-management', 'trade-consulting']
  },
  {
    id: 'trade-consulting',
    aliasIds: ['buyer-coordination'],
    name: 'Trade Consulting',
    tagline: 'Commercial Strategy, Market Expansion, IncoTerms & Trade Finance Advisory',
    category: 'Commercial Strategy & Advisory',
    shortDesc: 'Expert guidance, lasting partnerships.',
    badge: 'Commercial Strategy & Advisory',
    themeClass: 'theme-purple',
    image: '/assets/services/buyer-coordination.jpg',
    iconName: 'Users',
    pills: ['Trade Strategy', 'INCOTERMS 2020', 'Market Expansion', 'Buyer Matching'],
    overview: [
      'Operating across cross-border markets requires strategic foresight, regulatory clarity, and sound commercial structuring. ConceptExim’s Commercial Trade Advisory practice helps agribusinesses, institutional traders, and emerging exporters navigate international market entry.',
      'We advise on INCOTERMS 2020 risk demarcation, bilateral trade treaty tariff benefits, export financing instruments, counterparty risk due diligence, and commercial dispute mediation across 150+ countries.'
    ],
    keyStats: [
      { label: 'Jurisdictions Advised', value: '150+ Countries', desc: 'Comprehensive regulatory, tariff, and trade policy advisory capabilities' },
      { label: 'Trade Volume Guided', value: '$180M+ Structured', desc: 'Advisory across cross-border commercial transactions and commodities' },
      { label: 'Dispute Prevention Rate', value: '99.4%', desc: 'Clear contractual demarcation mitigating cross-border commercial disputes' },
      { label: 'Tariff Savings Identified', value: '6% to 12%', desc: 'Average import duty reductions realized through bilateral FTA structuring' }
    ],
    capabilities: [
      {
        title: 'INCOTERMS 2020 Contract Structuring',
        desc: 'Precise risk and liability allocation across FOB, CIF, CFR, DDP, and DAP terms to prevent ambiguity in maritime freight claims.',
        highlight: 'Risk Demarcation'
      },
      {
        title: 'Foreign Market Feasibility & Tariff Mapping',
        desc: 'Analyzing destination import duty schedules, non-tariff trade barriers, phytosanitary requirements, and local competitor pricing.',
        highlight: 'Market Intelligence'
      },
      {
        title: 'Trade Finance & Banking Instrument Advisory',
        desc: 'Structuring Letters of Credit (Confirmed, Irrevocable, Transferable), standby LCs, bank guarantees, and international factoring.',
        highlight: 'Trade Finance'
      },
      {
        title: 'Free Trade Agreement (FTA) Concession Utilization',
        desc: 'Aligning supply chains to take full advantage of preferential duty rates under bilateral treaties like CEPA, ECTA, and regional trade pacts.',
        highlight: 'Duty Optimization'
      },
      {
        title: 'Overseas Counterparty Due Diligence',
        desc: 'Comprehensive vetting of prospective overseas buyers and suppliers, reviewing credit ratings, commercial registration, and trade records.',
        highlight: 'Credit Vetting'
      },
      {
        title: 'Commercial Mediation & Dispute Mitigation',
        desc: 'Independent trade desk mediation to resolve quality claims, demurrage disputes, or delivery delays amicably before formal arbitration.',
        highlight: 'Dispute Resolution'
      }
    ],
    workflow: [
      {
        step: '01',
        phase: 'Diagnostic',
        title: 'Commercial Trade Diagnostic',
        description: 'Comprehensive review of current trade contracts, pricing models, export routes, and compliance vulnerabilities.',
        deliverable: 'Executive Trade Assessment Report',
        duration: 'Week 1'
      },
      {
        step: '02',
        phase: 'Analysis',
        title: 'Market & Tariff Concession Mapping',
        description: 'Identification of zero-duty tariff corridors, regulatory testing requirements, and competitor benchmark analysis.',
        deliverable: 'Market Entry & Tariff Roadmap',
        duration: 'Week 2'
      },
      {
        step: '03',
        phase: 'Contracting',
        title: 'Contractual Architecture & IncoTerms Alignment',
        description: 'Drafting robust international sales contracts incorporating standardized ICC INCOTERMS 2020 and dispute clauses.',
        deliverable: 'Commercial Sales Contract Templates',
        duration: 'Week 3'
      },
      {
        step: '04',
        phase: 'Finance',
        title: 'Trade Finance & Escrow Architecture',
        description: 'Structuring banking terms, Letter of Credit conditions, currency hedging strategies, and payment milestones.',
        deliverable: 'Trade Finance Execution Plan',
        duration: 'Week 4'
      },
      {
        step: '05',
        phase: 'Review',
        title: 'Execution Governance & Ongoing Retainer',
        description: 'Continuous advisory support during active shipment cycles, monitoring policy changes, and refining trade terms.',
        deliverable: 'Quarterly Trade Policy Briefings',
        duration: 'Ongoing'
      }
    ],
    specifications: [
      { label: 'Advisory Disciplines', value: 'Commodity Export Strategy, IncoTerms 2020, Trade Finance, Sanctions & Compliance, Tariff Optimization' },
      { label: 'Deliverables', value: 'Strategic Advisory Reports, Market Entry Dossiers, Contractual Frameworks, Executive Briefings' },
      { label: 'Engagement Models', value: 'Project-Based Market Entry Mandate, Transaction Advisory, Ongoing Strategic Retainer' },
      { label: 'Focus Commodities', value: 'Agri-Commodities, Grains, Processed Foods, Industrial Materials, Consumer Goods' }
    ],
    complianceBadges: ['ICC Trade Certified Advisory', 'INCOTERMS 2020 Aligned', 'WTO & WCO Compliant', 'AEO Advisory Partner'],
    faqs: [
      {
        question: 'Which INCOTERM 2020 should an agricultural exporter choose to minimize financial risk?',
        answer: 'For exporters seeking minimal risk beyond loading, FOB (Free on Board) or FCA (Free Carrier) transfers risk at the port of origin. However, offering CIF (Cost, Insurance & Freight) often unlocks higher commercial margins and buyer preference.'
      },
      {
        question: 'Can your advisory team help verify the authenticity of an overseas buyer?',
        answer: 'Yes. We conduct thorough counterparty due diligence, reviewing commercial registry records, international credit agency reports (such as Dun & Bradstreet), and historical banking standing.'
      }
    ],
    caseStudy: {
      title: 'Market Entry Architecture for Indian Organic Spices into Japan & South Korea',
      client: 'Spice Manufacturer & Processor Syndicate',
      challenge: 'Exporter struggled with strict Japanese Positive List System pesticide residue regulations and high import tariffs.',
      solution: 'Structured supply chains under the India-Japan CEPA framework to utilize zero-duty tariff concessions, coupled with compliant bi-lingual Japanese labeling standards.',
      result: 'Export volumes expanded by 340% within 18 months with zero customs inspection delays.',
      metrics: '340% export volume increase | 0 customs rejections | 100% FTA duty savings'
    },
    relatedServiceIds: ['customs-support', 'global-sourcing', 'export-management']
  },
  {
    id: 'value-added-services',
    name: 'Value Added Services',
    tagline: 'Export Packaging, Multilingual Labeling, Optical Sorting & Lab Assays',
    category: 'Cargo Value Enhancement',
    shortDesc: 'Packaging, labeling, inspection and more.',
    badge: 'Cargo Value Enhancement',
    themeClass: 'theme-teal',
    image: '/assets/services/value-added-services.jpg',
    iconName: 'PackageCheck',
    pills: ['Custom Packaging', 'Barcode Labeling', 'Batch Sorting', 'Lab Assays'],
    overview: [
      'In international trade, primary agricultural goods and commodities are elevated into high-margin commercial shipments through meticulous post-harvest handling. ConceptExim operates specialized value-addition hubs at key sourcing centers and port-proximate logistics parks.',
      'We provide automated optical color sorting, de-stoning, moisture-barrier vacuum packaging, multilingual consumer labeling, automated palletization, and accredited third-party laboratory assays.'
    ],
    keyStats: [
      { label: 'Daily Packaging Output', value: '500+ MT', desc: 'High-speed automated retail pouching, bulk bagging, and jumbo FIBC filling' },
      { label: 'Optical Sorting Purity', value: '99.9% Purity', desc: 'Bichromatic optical grain sorters eliminating discoloration and foreign matter' },
      { label: 'Testing Partnerships', value: 'SGS, Intertek, Eurofins', desc: 'Pre-dispatch laboratory chemical assays, moisture checks, and MRL testing' },
      { label: 'Packaging Range', value: '1kg to 1000kg', desc: 'Flexible consumer retail pouches up to 1-tonne industrial big bags' }
    ],
    capabilities: [
      {
        title: 'Bichromatic Optical Color Sorting & Cleaning',
        desc: 'Advanced optical sorters and de-stoners removing discolored grains, immature kernels, stones, and glass fragments to achieve 99.9% purity.',
        highlight: '99.9% Purity'
      },
      {
        title: 'Custom Consumer & Industrial Export Packaging',
        desc: 'Multi-ply Kraft paper bags, food-grade BOPP laminated pouches, non-woven fabric bags, and heavy-duty FIBC jumbo bulk bags.',
        highlight: 'Retail & Bulk'
      },
      {
        title: 'Moisture-Barrier Vacuum & Nitrogen Flushing',
        desc: 'Oxygen evacuation and food-grade nitrogen gas flushing engineered to preserve grain aroma, prevent insect infestation, and extend shelf life.',
        highlight: 'Shelf-Life Extension'
      },
      {
        title: 'Multilingual Labeling & GS1 Barcode Compliance',
        desc: 'Automated thermal labeling supporting destination language requirements, GS1 2D barcodes, nutritional information, and batch tracking QR codes.',
        highlight: 'Destination Labels'
      },
      {
        title: 'ISPM-15 Certified Palletization & Shrink-Wrapping',
        desc: 'Heat-treated wooden and heavy plastic pallets with machine stretch film wrapping and edge-board protectors for sea transport stability.',
        highlight: 'ISPM-15 Certified'
      },
      {
        title: 'Independent Pre-Shipment Laboratory Assays',
        desc: 'On-site composite sampling for pesticide residue (MRLs), heavy metals, moisture percentage, and aflatoxins with certified COAs.',
        highlight: 'Certified COAs'
      }
    ],
    workflow: [
      {
        step: '01',
        phase: 'Intake',
        title: 'Raw Commodity Intake & Preliminary Grading',
        description: 'Physical inspection upon mill arrival, moisture testing, foreign matter benchmark check, and lot registration.',
        deliverable: 'Raw Intake Quality Voucher',
        duration: 'Day 1'
      },
      {
        step: '02',
        phase: 'Processing',
        title: 'De-Stoning, Magnetic Cleaning & Optical Sorting',
        description: 'Triple-stage cleaning eliminating dirt, stones, and discolored kernels to meet strict export purity specifications.',
        deliverable: 'Grading Purity Certificate',
        duration: 'Day 1–2'
      },
      {
        step: '03',
        phase: 'Packaging',
        title: 'Automated Packing & Nitrogen Sealing',
        description: 'Precision automated filling into designated branded bags, vacuum sealing, or inert nitrogen gas flushing.',
        deliverable: 'Packaging Line Quality Sign-Off',
        duration: 'Day 2–3'
      },
      {
        step: '04',
        phase: 'Labeling',
        title: 'GS1 Barcode & Multilingual Labeling',
        description: 'Affixing destination-compliant labels containing mandatory importer details, production dates, and traceability codes.',
        deliverable: 'Label Compliance Record',
        duration: 'Day 3'
      },
      {
        step: '05',
        phase: 'Palletizing',
        title: 'ISPM-15 Palletization & Container Staging',
        description: 'Stacking on certified heat-treated wooden pallets, stretch wrapping, corner protection, and container loading.',
        deliverable: 'Final Pre-Shipment Inspection Report',
        duration: 'Day 4'
      }
    ],
    specifications: [
      { label: 'Packaging Formats', value: '1kg, 2kg, 5kg, 10kg, 20kg, 25kg, 50kg Bags; 1000kg FIBC Jumbo Bags' },
      { label: 'Packaging Materials', value: 'BOPP Laminated, Non-Woven, Multi-ply Kraft, Jute/Hessian, Polypropylene (PP)' },
      { label: 'Pallet Standards', value: 'ISPM-15 Heat Treated Euro Pallets (1200x800mm) & Standard Industrial (1200x1000mm)' },
      { label: 'Assay Scope', value: 'Moisture, Purity %, Broken %, Pesticide MRLs, Heavy Metals, Aflatoxins, Microbial Count' }
    ],
    complianceBadges: ['FSSAI Processing Certified', 'ISPM-15 Heat Treatment Accreditations', 'HACCP Compliant Facilities', 'ISO 22000 Certified'],
    faqs: [
      {
        question: 'Are wooden pallets certified for entry into the US, European Union, and Australia?',
        answer: 'Yes. 100% of our wooden pallets undergo certified Heat Treatment (HT) conforming strictly to ISPM-15 guidelines and are embossed with official IPPC quarantine marks accepted worldwide.'
      },
      {
        question: 'Can you produce customized private-label packaging for retail supermarket chains?',
        answer: 'Absolutely. We design, manufacture, and package private-label retail pouches with rotogravure high-definition printing, bilingual text, and barcode compliance matched to your destination market.'
      }
    ],
    caseStudy: {
      title: 'Private-Label Retail Packaging of Basmati Rice for GCC Supermarket Chain',
      client: 'Major Hypermarket Chain across UAE & Saudi Arabia',
      challenge: 'Client needed 50,000 retail pouches (5kg BOPP) packed, bilingual Arabic/English labeled, and containerized within 21 days.',
      solution: 'Commissioned dedicated high-speed automated packaging line, integrated Arabic GS1 barcode compliance, and conducted 100% batch weight checks.',
      result: 'Delivered 4 days ahead of scheduled vessel departure, ready for direct hypermarket shelf placement with zero quality non-conformances.',
      metrics: '50,000 pouches | 4 days ahead of schedule | 0 shelf rejections'
    },
    relatedServiceIds: ['global-sourcing', 'export-management', 'customs-support']
  },
  {
    id: 'digital-trade-solutions',
    name: 'Digital Trade Solutions',
    tagline: 'Live Vessel Telemetry, e-Documentation Desk & Predictive Supply Chain Intelligence',
    category: 'Trade Tech & Telemetry',
    shortDesc: 'Technology-driven solutions for smarter trade.',
    badge: 'Trade Tech & Telemetry',
    themeClass: 'theme-blue',
    image: '/assets/services/digital-trade-solutions.jpg',
    iconName: 'Laptop',
    pills: ['Live Telemetry', 'e-Documentation', 'Supply Chain Analytics', 'Smart Alerts'],
    overview: [
      'Modern international commerce demands instant data clarity. ConceptExim’s Digital Trade Solutions empower buyers, suppliers, and logistics directors with an enterprise-grade digital trade desk.',
      'Our cloud platform provides real-time satellite AIS vessel tracking, container-level IoT temperature and tamper telemetry, instant access to digitized trade documentation vaults, and automated predictive milestone alerts.'
    ],
    keyStats: [
      { label: 'Satellite AIS Telemetry', value: 'Real-Time Tracking', desc: 'Live vessel coordinates, nautical speeds, port congestion, and ETA forecasts' },
      { label: 'Digital Document Vault', value: 'Instant Access', desc: 'Secure repository for Bills of Lading, test COAs, and customs clearance files' },
      { label: 'ETA Predictive Accuracy', value: '94.2% Precision', desc: 'AI-assisted arrival forecasts accounting for weather, tides, and port dwell' },
      { label: 'Data Security Protocols', value: '256-Bit SSL / SOC-2', desc: 'Bank-grade encrypted cloud infrastructure and verified audit logs' }
    ],
    capabilities: [
      {
        title: 'Real-Time Satellite AIS Vessel & Container Tracking',
        desc: 'Interactive live voyage telemetry displaying exact ship positions, speed, course, and transshipment port milestones across global oceans.',
        highlight: 'Satellite AIS'
      },
      {
        title: 'IoT Sensor Telemetry for Sensitive Cargo',
        desc: 'Smart container sensors streaming continuous temperature, humidity, shock, and container door-opening alerts directly to your console.',
        highlight: 'IoT Sensor Feeds'
      },
      {
        title: 'Digital e-Document Repository & Audit Trail',
        desc: 'Secure cloud archive hosting verified digital Bills of Lading, packing lists, test certificates, and customs declarations with permanent logs.',
        highlight: 'Digital Vault'
      },
      {
        title: 'Automated Milestone Push Notifications',
        desc: 'Instant webhook, SMS, and email alerts when your shipment reaches critical operational stages: Port Gate-In, Customs OOC, and Berth Discharge.',
        highlight: 'Automated Alerts'
      },
      {
        title: 'Landed Cost & Tariff Simulation Desk',
        desc: 'Computational tools calculating true landed per-metric-tonne costs incorporating ocean freight rates, customs duties, and local port drayage.',
        highlight: 'Landed Cost Calculator'
      },
      {
        title: 'Role-Based Multi-User Corporate Access',
        desc: 'Granular user permission tiers enabling procurement directors, treasury teams, and warehouse managers to collaborate on live trade files.',
        highlight: 'Team Collaboration'
      }
    ],
    workflow: [
      {
        step: '01',
        phase: 'Integration',
        title: 'Booking & Sensor Telemetry Pairing',
        description: 'Digitally mapping ocean booking numbers, container IDs, and IoT telematics dataloggers to the client trade account.',
        deliverable: 'Active Telemetry Dashboard Link',
        duration: 'Instant'
      },
      {
        step: '02',
        phase: 'Tracking',
        title: 'Continuous Satellite & Corridor Tracking',
        description: 'Live telemetry tracking across inland transit, terminal stack, and open maritime voyage with real-time ETA updates.',
        deliverable: 'Live Voyage Map & Status Feed',
        duration: 'Voyage Transit'
      },
      {
        step: '03',
        phase: 'Alerts',
        title: 'Automated Milestone Event Triggers',
        description: 'Push notifications dispatched upon customs clearance, vessel loading, transshipment arrival, and final destination discharge.',
        deliverable: 'SMS / Email Milestone Notifications',
        duration: 'Real-Time'
      },
      {
        step: '04',
        phase: 'Documents',
        title: 'Digital Document Vault Generation',
        description: 'Immediate cloud availability of scanned and verified original Bills of Lading, phytosanitary certificates, and invoices.',
        deliverable: 'Secure High-Res Document Pack',
        duration: 'Same-Day'
      },
      {
        step: '05',
        phase: 'Analytics',
        title: 'Post-Shipment Telemetry Audit & Report',
        description: 'Comprehensive historical review of transit timelines, temperature consistency logs, and port dwell metrics.',
        deliverable: 'Voyage Analytics & Performance Audit',
        duration: 'Post-Discharge'
      }
    ],
    specifications: [
      { label: 'Data Protocols', value: 'REST API, Webhooks, EDI 315 (Status Details), EDI 214 (Transportation Status)' },
      { label: 'Liner Telemetry Coverage', value: 'Maersk, MSC, CMA CGM, Hapag-Lloyd, Cosco, Evergreen, ONE, Yang Ming' },
      { label: 'IoT Sensor Capabilities', value: 'GPS, Cellular 4G/LTE fallback, Bluetooth BLE temperature probes, light/door sensors' },
      { label: 'Security & Compliance', value: '256-bit SSL encryption, ISO 27001 compliant cloud data centers' }
    ],
    complianceBadges: ['ISO 27001 Data Security', 'SOC-2 Type II Certified Cloud', 'WCO SAFE Framework Aligned', 'Digital Container Shipping Assoc (DCSA)'],
    faqs: [
      {
        question: 'How often is the vessel location and container status updated?',
        answer: 'Maritime vessel positions update every 15 to 60 minutes via global satellite AIS. Inland GPS container telemetry transmits updates every 30 minutes, or instantly if a temperature threshold or tamper trigger occurs.'
      },
      {
        question: 'Can our internal logistics, finance, and customs teams share platform access?',
        answer: 'Yes. Our digital platform allows organizations to invite unlimited team members with tailored permissions—for example, giving finance access to invoices and logistics teams access to live tracking.'
      }
    ],
    caseStudy: {
      title: 'IoT Cold-Chain Telemetry for Trans-Pacific Organic Spice Shipments',
      client: 'International Organic Food Processing Consortium',
      challenge: 'High-value spice cargo vulnerable to humidity and temperature spikes during a 28-day ocean voyage across tropical waters.',
      solution: 'Deployed cellular-satellite IoT humidity and temperature dataloggers inside containers with automated alerts triggering dynamic ventilation protocols.',
      result: 'Zero cargo degradation, immediate access to verifiable audit logs accepted without question by destination food safety inspectors.',
      metrics: '28-day voyage tracked | 0% moisture spoilage | Instant audit verification'
    },
    relatedServiceIds: ['logistics-coordination', 'export-management', 'customs-support']
  }
];

export function getServiceById(id: string): DetailedService | undefined {
  if (!id) return undefined;
  const normalized = id.toLowerCase().trim();
  return SERVICES_CATALOG.find(
    (s) => s.id === normalized || s.aliasIds?.some((alias) => alias.toLowerCase() === normalized)
  );
}
