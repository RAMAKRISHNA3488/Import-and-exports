import React, { useState } from 'react';
import {
  TrendingUp,
  Download,
  Calendar,
  BarChart3,
  FileSpreadsheet,
  Globe,
  Ship,
  DollarSign,
} from 'lucide-react';

export const AdminReportsPage: React.FC = () => {
  const [reportPeriod, setReportPeriod] = useState<'YTD' | 'Q3 2026' | 'Monthly' | 'Annual'>('YTD');

  const reportPacks = [
    {
      id: 'rep-1',
      title: 'Global Export & Import Volume Reconciliation',
      frequency: 'Monthly Audit',
      size: '4.2 MB',
      lastRun: '26 Sep 2026',
      desc: 'Container metrics across 120 maritime corridors with freight weight and customs clearance times.',
    },
    {
      id: 'rep-2',
      title: 'Commercial Trade Revenue & Profit Margin Analysis',
      frequency: 'Quarterly Financial',
      size: '6.8 MB',
      lastRun: '24 Sep 2026',
      desc: 'Comparative breakdown of export vs. import margins, forex currency spreads, and LC settlement fees.',
    },
    {
      id: 'rep-3',
      title: 'Commodity Quality & Quarantine Compliance Audit',
      frequency: 'Bi-Weekly Compliance',
      size: '2.5 MB',
      lastRun: '22 Sep 2026',
      desc: 'Laboratory test records, APEDA/FDA/FSSAI clearance certs, and phytosanitary audit trail.',
    },
    {
      id: 'rep-4',
      title: 'Top Counterparty Buyer & Supplier Performance Dossier',
      frequency: 'Annual Review',
      size: '8.1 MB',
      lastRun: '20 Sep 2026',
      desc: 'Fulfillment ratings, payment punctuality scores, and order consistency across 195 buyers.',
    },
  ];

  return (
    <div className="admin-subpage-container">
      {/* Top Header */}
      <div className="admin-subpage-header">
        <div>
          <div className="admin-subpage-badge">
            <TrendingUp size={14} /> Intelligence & Executive Audits
          </div>
          <h1 className="admin-subpage-title">Trade Analytics & Audit Reports</h1>
          <p className="admin-subpage-desc">
            Consolidated intelligence reports on export tonnage, customs clearance cycles, foreign exchange exposure, and carrier performance.
          </p>
        </div>
        <div className="admin-subpage-actions">
          <div className="admin-subpage-filter-group" style={{ margin: 0 }}>
            <Calendar size={15} />
            <span>Range:</span>
            {(['YTD', 'Q3 2026', 'Monthly', 'Annual'] as const).map((period) => (
              <button
                key={period}
                className={`filter-pill ${reportPeriod === period ? 'active' : ''}`}
                onClick={() => setReportPeriod(period)}
              >
                {period}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* KPI Overview */}
      <div className="admin-subpage-kpi-grid">
        <div className="admin-subpage-kpi-card">
          <div className="kpi-icon-wrap blue">
            <DollarSign size={20} />
          </div>
          <div className="kpi-data">
            <div className="kpi-label">Gross Trade Volume</div>
            <div className="kpi-value">$2.48M</div>
            <div className="kpi-sub green">+16.2% vs target</div>
          </div>
        </div>

        <div className="admin-subpage-kpi-card">
          <div className="kpi-icon-wrap emerald">
            <Ship size={20} />
          </div>
          <div className="kpi-data">
            <div className="kpi-label">Total Tonnage Cleared</div>
            <div className="kpi-value">14,820 MT</div>
            <div className="kpi-sub green">Across 512 orders</div>
          </div>
        </div>

        <div className="admin-subpage-kpi-card">
          <div className="kpi-icon-wrap amber">
            <Globe size={20} />
          </div>
          <div className="kpi-data">
            <div className="kpi-label">Active Shipping Lanes</div>
            <div className="kpi-value">120+</div>
            <div className="kpi-sub amber">45 Countries Served</div>
          </div>
        </div>

        <div className="admin-subpage-kpi-card">
          <div className="kpi-icon-wrap purple">
            <BarChart3 size={20} />
          </div>
          <div className="kpi-data">
            <div className="kpi-label">On-Time Clearance Rate</div>
            <div className="kpi-value">99.4%</div>
            <div className="kpi-sub green">Industry Benchmark: 94%</div>
          </div>
        </div>
      </div>

      {/* Reports Catalog */}
      <div style={{ marginBottom: 20 }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0F172A', marginBottom: 12 }}>
          Standard Executive Audit Packs ({reportPeriod})
        </h3>
        <div className="admin-reports-grid">
          {reportPacks.map((rep) => (
            <div key={rep.id} className="admin-report-card">
              <div className="report-card-top">
                <div className="report-card-icon">
                  <FileSpreadsheet size={22} />
                </div>
                <div className="report-card-meta">
                  <span className="report-frequency">{rep.frequency}</span>
                  <span className="report-size">{rep.size}</span>
                </div>
              </div>
              <h4 className="report-title">{rep.title}</h4>
              <p className="report-desc">{rep.desc}</p>
              <div className="report-footer">
                <span className="report-date">Generated: {rep.lastRun}</span>
                <button
                  className="report-download-btn"
                  onClick={() => alert(`Generating and downloading ${rep.title} in Excel/PDF...`)}
                >
                  <Download size={13} />
                  <span>Download Report</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
