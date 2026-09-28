import React, { useState } from 'react';
import {
  FileSpreadsheet,
  Search,
  Filter,
  Plus,
  Download,
  Eye,
  CheckCircle2,
  Clock,
  Send,
  X,
  TrendingUp,
} from 'lucide-react';

interface QuoteItem {
  id: string;
  quoteNo: string;
  client: string;
  country: string;
  commodity: string;
  volume: string;
  incoterms: string;
  totalValue: string;
  issuedDate: string;
  validUntil: string;
  status: 'Pending' | 'Accepted' | 'Negotiation' | 'Expired';
}

export const AdminQuotesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedQuote, setSelectedQuote] = useState<QuoteItem | null>(null);

  const quotes: QuoteItem[] = [
    {
      id: 'qt-01',
      quoteNo: 'QT-2026-0941',
      client: 'Global Foods LLC',
      country: 'USA 🇺🇸',
      commodity: 'Premium Basmati Rice (1121 Steam)',
      volume: '150 MT',
      incoterms: 'CIF New York Port',
      totalValue: '$198,500',
      issuedDate: '24 Sep 2026',
      validUntil: '08 Oct 2026',
      status: 'Negotiation',
    },
    {
      id: 'qt-02',
      quoteNo: 'QT-2026-0942',
      client: 'Al Noor Trading',
      country: 'UAE 🇦🇪',
      commodity: 'Cardamom & Whole Black Pepper',
      volume: '30 MT',
      incoterms: 'FOB Jebel Ali',
      totalValue: '$345,000',
      issuedDate: '25 Sep 2026',
      validUntil: '05 Oct 2026',
      status: 'Accepted',
    },
    {
      id: 'qt-03',
      quoteNo: 'QT-2026-0943',
      client: 'Sunrise Imports SpA',
      country: 'Italy 🇮🇹',
      commodity: 'Dehydrated Organic Mango & Papaya',
      volume: '45 MT',
      incoterms: 'CIF Genoa',
      totalValue: '$112,000',
      issuedDate: '26 Sep 2026',
      validUntil: '10 Oct 2026',
      status: 'Pending',
    },
    {
      id: 'qt-04',
      quoteNo: 'QT-2026-0944',
      client: 'Euro Trade GmbH',
      country: 'Germany 🇩🇪',
      commodity: 'Pure Cotton Raw Yarns 30s Combed',
      volume: '80 MT',
      incoterms: 'FOB Nhava Sheva',
      totalValue: '$276,000',
      issuedDate: '20 Sep 2026',
      validUntil: '25 Sep 2026',
      status: 'Expired',
    },
    {
      id: 'qt-05',
      quoteNo: 'QT-2026-0945',
      client: 'Asian Fresh Co.',
      country: 'Japan 🇯🇵',
      commodity: 'Fresh Cavendish Bananas (Class A)',
      volume: '120 MT',
      incoterms: 'CIF Yokohama',
      totalValue: '$84,000',
      issuedDate: '26 Sep 2026',
      validUntil: '12 Oct 2026',
      status: 'Pending',
    },
  ];

  const filteredQuotes = quotes.filter((q) => {
    const matchesSearch =
      q.quoteNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.commodity.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || q.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="admin-subpage-container">
      {/* Top Header */}
      <div className="admin-subpage-header">
        <div>
          <div className="admin-subpage-badge">
            <FileSpreadsheet size={14} /> Commercial Proposals & RFQs
          </div>
          <h1 className="admin-subpage-title">Quotations & Proforma Invoices</h1>
          <p className="admin-subpage-desc">
            Manage global trade quotations, CIF/FOB pricing models, currency spreads, and buyer RFQ agreements.
          </p>
        </div>
        <div className="admin-subpage-actions">
          <button className="admin-btn-secondary">
            <Download size={15} /> Export Quotes (CSV)
          </button>
          <button className="admin-btn-primary">
            <Plus size={15} /> Generate Proforma Quote
          </button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="admin-subpage-kpi-grid">
        <div className="admin-subpage-kpi-card">
          <div className="kpi-icon-wrap amber">
            <FileSpreadsheet size={20} />
          </div>
          <div className="kpi-data">
            <div className="kpi-label">Active Quotations</div>
            <div className="kpi-value">38</div>
            <div className="kpi-sub green">$2.14M Pipeline Value</div>
          </div>
        </div>

        <div className="admin-subpage-kpi-card">
          <div className="kpi-icon-wrap emerald">
            <CheckCircle2 size={20} />
          </div>
          <div className="kpi-data">
            <div className="kpi-label">Accepted Rate</div>
            <div className="kpi-value">74.2%</div>
            <div className="kpi-sub green">+6.4% this quarter</div>
          </div>
        </div>

        <div className="admin-subpage-kpi-card">
          <div className="kpi-icon-wrap blue">
            <Clock size={20} />
          </div>
          <div className="kpi-data">
            <div className="kpi-label">Pending Approval</div>
            <div className="kpi-value">12</div>
            <div className="kpi-sub amber">Awaiting buyer response</div>
          </div>
        </div>

        <div className="admin-subpage-kpi-card">
          <div className="kpi-icon-wrap purple">
            <TrendingUp size={20} />
          </div>
          <div className="kpi-data">
            <div className="kpi-label">Avg Deal Size</div>
            <div className="kpi-value">$165.4K</div>
            <div className="kpi-sub green">Across 24 countries</div>
          </div>
        </div>
      </div>

      {/* Filter Row */}
      <div className="admin-subpage-filter-row">
        <div className="admin-subpage-search">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search quotes by number, client, commodity..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="admin-subpage-filter-group">
          <Filter size={16} />
          <span>Status:</span>
          {['All', 'Pending', 'Accepted', 'Negotiation', 'Expired'].map((status) => (
            <button
              key={status}
              className={`filter-pill ${statusFilter === status ? 'active' : ''}`}
              onClick={() => setStatusFilter(status)}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Quotes Table */}
      <div className="admin-subpage-table-card">
        <div className="admin-table-responsive">
          <table className="admin-subpage-table">
            <thead>
              <tr>
                <th>Quote Number</th>
                <th>Client & Country</th>
                <th>Commodity & Incoterms</th>
                <th>Volume</th>
                <th>Value (USD)</th>
                <th>Valid Until</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredQuotes.map((q) => (
                <tr key={q.id} onClick={() => setSelectedQuote(q)}>
                  <td>
                    <div className="table-bold-cell">{q.quoteNo}</div>
                    <div className="table-muted-sub">Issued: {q.issuedDate}</div>
                  </td>
                  <td>
                    <div className="table-strong-text">{q.client}</div>
                    <div className="table-muted-sub">{q.country}</div>
                  </td>
                  <td>
                    <div className="table-strong-text">{q.commodity}</div>
                    <div className="table-muted-sub" style={{ color: '#2563EB', fontWeight: 600 }}>
                      {q.incoterms}
                    </div>
                  </td>
                  <td>
                    <div className="table-strong-text">{q.volume}</div>
                  </td>
                  <td>
                    <div className="table-bold-cell" style={{ color: '#059669', fontSize: '0.95rem' }}>
                      {q.totalValue}
                    </div>
                  </td>
                  <td>
                    <div className="table-muted-sub">{q.validUntil}</div>
                  </td>
                  <td>
                    <span
                      className={`ship-status-badge ${
                        q.status === 'Accepted'
                          ? 'delivered'
                          : q.status === 'Pending'
                          ? 'in-transit'
                          : q.status === 'Negotiation'
                          ? 'customs'
                          : 'delayed'
                      }`}
                    >
                      {q.status}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button
                      className="table-action-icon-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedQuote(q);
                      }}
                      title="View Quotation"
                    >
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quote Modal */}
      {selectedQuote && (
        <div className="admin-modal-overlay" onClick={() => setSelectedQuote(null)}>
          <div className="admin-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <div>
                <h3 className="admin-modal-title">Commercial Quote {selectedQuote.quoteNo}</h3>
                <p className="admin-modal-subtitle">{selectedQuote.client} • {selectedQuote.country}</p>
              </div>
              <button className="admin-modal-close" onClick={() => setSelectedQuote(null)}>
                <X size={18} />
              </button>
            </div>

            <div className="admin-modal-body">
              <div className="admin-detail-meta-box">
                <div className="meta-pair">
                  <span className="meta-label">Commodity Specification:</span>
                  <span className="meta-val">{selectedQuote.commodity}</span>
                </div>
                <div className="meta-pair">
                  <span className="meta-label">Consignment Volume:</span>
                  <span className="meta-val">{selectedQuote.volume}</span>
                </div>
                <div className="meta-pair">
                  <span className="meta-label">Incoterms Agreed:</span>
                  <span className="meta-val" style={{ color: '#2563EB', fontWeight: 700 }}>
                    {selectedQuote.incoterms}
                  </span>
                </div>
                <div className="meta-pair">
                  <span className="meta-label">Total Commercial Value:</span>
                  <span className="meta-val" style={{ color: '#059669', fontWeight: 800, fontSize: '1.1rem' }}>
                    {selectedQuote.totalValue}
                  </span>
                </div>
                <div className="meta-pair">
                  <span className="meta-label">Validity Window:</span>
                  <span className="meta-val">{selectedQuote.issuedDate} to {selectedQuote.validUntil}</span>
                </div>
              </div>
            </div>

            <div className="admin-modal-footer">
              <button className="admin-btn-secondary" onClick={() => setSelectedQuote(null)}>
                Close
              </button>
              <button
                className="admin-btn-primary"
                onClick={() => {
                  alert(`Proforma Invoice sent to ${selectedQuote.client}`);
                  setSelectedQuote(null);
                }}
              >
                <Send size={14} /> Send Official Proforma Invoice
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
