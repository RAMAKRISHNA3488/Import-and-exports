import React, { useState } from 'react';
import {
  FileText,
  Search,
  Filter,
  Download,
  UploadCloud,
  Clock,
  ShieldCheck,
  Eye,
  FileCheck,
} from 'lucide-react';

interface TradeDoc {
  id: string;
  name: string;
  docType: 'Bill of Lading' | 'Certificate of Origin' | 'Phytosanitary Cert' | 'Commercial Invoice' | 'Inspection Report';
  shipmentRef: string;
  client: string;
  issuedDate: string;
  fileSize: string;
  status: 'Verified' | 'Pending Review' | 'Submitted';
}

export const AdminDocumentsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');

  const documents: TradeDoc[] = [
    {
      id: 'doc-1',
      name: 'Original_Ocean_Bill_of_Lading_CEX258963.pdf',
      docType: 'Bill of Lading',
      shipmentRef: 'CEX-2026-8891 (MSC ILONA)',
      client: 'Global Foods LLC',
      issuedDate: '19 Sep 2026',
      fileSize: '2.4 MB',
      status: 'Verified',
    },
    {
      id: 'doc-2',
      name: 'Certificate_of_Origin_India_APEDA_Basmati.pdf',
      docType: 'Certificate of Origin',
      shipmentRef: 'CEX-2026-8891',
      client: 'Global Foods LLC',
      issuedDate: '18 Sep 2026',
      fileSize: '1.1 MB',
      status: 'Verified',
    },
    {
      id: 'doc-3',
      name: 'Spices_Phytosanitary_Quarantine_Clearance.pdf',
      docType: 'Phytosanitary Cert',
      shipmentRef: 'CEX-2026-8892 (Maersk)',
      client: 'Al Noor Trading',
      issuedDate: '14 Sep 2026',
      fileSize: '3.2 MB',
      status: 'Verified',
    },
    {
      id: 'doc-4',
      name: 'SGS_Quality_Purity_Inspection_Report.pdf',
      docType: 'Inspection Report',
      shipmentRef: 'CEX-2026-8894 (Hapag-Lloyd)',
      client: 'Asian Fresh Co.',
      issuedDate: '21 Sep 2026',
      fileSize: '4.8 MB',
      status: 'Pending Review',
    },
    {
      id: 'doc-5',
      name: 'Commercial_Export_Invoice_INV2026-0982.pdf',
      docType: 'Commercial Invoice',
      shipmentRef: 'CEX-2026-8893 (CMA CGM)',
      client: 'Euro Trade GmbH',
      issuedDate: '06 Sep 2026',
      fileSize: '950 KB',
      status: 'Verified',
    },
  ];

  const filteredDocs = documents.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.shipmentRef.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'All' || doc.docType === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="admin-subpage-container">
      {/* Top Header */}
      <div className="admin-subpage-header">
        <div>
          <div className="admin-subpage-badge">
            <FileText size={14} /> Customs & Trade Compliance
          </div>
          <h1 className="admin-subpage-title">Trade Documentation Repository</h1>
          <p className="admin-subpage-desc">
            Encrypted vault for Bills of Lading, Certificates of Origin, Phytosanitary inspections, and customs clearing documentation.
          </p>
        </div>
        <div className="admin-subpage-actions">
          <button className="admin-btn-secondary">
            <Download size={15} /> Bulk Download ZIP
          </button>
          <button className="admin-btn-primary">
            <UploadCloud size={15} /> Upload Trade Document
          </button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="admin-subpage-kpi-grid">
        <div className="admin-subpage-kpi-card">
          <div className="kpi-icon-wrap blue">
            <FileText size={20} />
          </div>
          <div className="kpi-data">
            <div className="kpi-label">Vault Documents</div>
            <div className="kpi-value">1,480</div>
            <div className="kpi-sub green">99.8% digitized</div>
          </div>
        </div>

        <div className="admin-subpage-kpi-card">
          <div className="kpi-icon-wrap emerald">
            <ShieldCheck size={20} />
          </div>
          <div className="kpi-data">
            <div className="kpi-label">Customs Compliance</div>
            <div className="kpi-value">100%</div>
            <div className="kpi-sub green">Zero regulatory hold-ups</div>
          </div>
        </div>

        <div className="admin-subpage-kpi-card">
          <div className="kpi-icon-wrap amber">
            <Clock size={20} />
          </div>
          <div className="kpi-data">
            <div className="kpi-label">Pending Verification</div>
            <div className="kpi-value">6</div>
            <div className="kpi-sub amber">Under legal review</div>
          </div>
        </div>

        <div className="admin-subpage-kpi-card">
          <div className="kpi-icon-wrap purple">
            <FileCheck size={20} />
          </div>
          <div className="kpi-data">
            <div className="kpi-label">Digital Signatures</div>
            <div className="kpi-value">Valid</div>
            <div className="kpi-sub green">Cryptographically sealed</div>
          </div>
        </div>
      </div>

      {/* Filter Row */}
      <div className="admin-subpage-filter-row">
        <div className="admin-subpage-search">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search documents by name, shipment ref, client..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="admin-subpage-filter-group">
          <Filter size={16} />
          <span>Type:</span>
          {['All', 'Bill of Lading', 'Certificate of Origin', 'Phytosanitary Cert', 'Commercial Invoice'].map(
            (type) => (
              <button
                key={type}
                className={`filter-pill ${typeFilter === type ? 'active' : ''}`}
                onClick={() => setTypeFilter(type)}
              >
                {type}
              </button>
            )
          )}
        </div>
      </div>

      {/* Documents Table */}
      <div className="admin-subpage-table-card">
        <div className="admin-table-responsive">
          <table className="admin-subpage-table">
            <thead>
              <tr>
                <th>Document File Name</th>
                <th>Category</th>
                <th>Shipment Reference</th>
                <th>Client Consignee</th>
                <th>Date Lodged</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocs.map((doc) => (
                <tr key={doc.id}>
                  <td>
                    <div className="table-bold-cell" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <FileText size={16} style={{ color: '#2563EB', flexShrink: 0 }} />
                      <span>{doc.name}</span>
                    </div>
                    <div className="table-muted-sub" style={{ paddingLeft: 22 }}>{doc.fileSize}</div>
                  </td>
                  <td>
                    <span className="hub-role-badge">{doc.docType}</span>
                  </td>
                  <td>
                    <div className="table-strong-text">{doc.shipmentRef}</div>
                  </td>
                  <td>
                    <div className="table-strong-text">{doc.client}</div>
                  </td>
                  <td>
                    <div className="table-muted-sub">{doc.issuedDate}</div>
                  </td>
                  <td>
                    <span
                      className={`ship-status-badge ${
                        doc.status === 'Verified' ? 'delivered' : 'customs'
                      }`}
                    >
                      {doc.status}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 8 }}>
                      <button
                        className="table-action-icon-btn"
                        title="Download Document"
                        onClick={() => alert(`Downloading ${doc.name}...`)}
                      >
                        <Download size={15} />
                      </button>
                      <button
                        className="table-action-icon-btn"
                        title="Preview Document"
                        onClick={() => alert(`Previewing ${doc.name} (SGS Verified)`)}
                      >
                        <Eye size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
