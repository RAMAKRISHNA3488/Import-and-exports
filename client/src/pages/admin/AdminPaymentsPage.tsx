import React, { useState } from 'react';
import {
  CreditCard,
  Search,
  Filter,
  Download,
  Plus,
  CheckCircle2,
  Clock,
  DollarSign,
  ShieldCheck,
} from 'lucide-react';

interface PaymentRecord {
  id: string;
  transactionRef: string;
  method: 'Letter of Credit (LC)' | 'Wire Transfer (TT)' | 'Escrow Guarantee' | 'Cash Against Documents (CAD)';
  client: string;
  amount: string;
  currency: string;
  shipmentRef: string;
  bank: string;
  date: string;
  status: 'Settled' | 'Escrow Funded' | 'Under Review' | 'Pending Wire';
}

export const AdminPaymentsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [methodFilter, setMethodFilter] = useState('All');

  const payments: PaymentRecord[] = [
    {
      id: 'pay-1',
      transactionRef: 'TXN-LC-2026-904',
      method: 'Letter of Credit (LC)',
      client: 'Global Foods LLC (USA)',
      amount: '$198,500.00',
      currency: 'USD',
      shipmentRef: 'CEX-2026-8891 (Basmati Rice)',
      bank: 'JPMorgan Chase / SBI Correspondent',
      date: '25 Sep 2026',
      status: 'Settled',
    },
    {
      id: 'pay-2',
      transactionRef: 'TXN-TT-2026-905',
      method: 'Wire Transfer (TT)',
      client: 'Al Noor Trading (UAE)',
      amount: '$120,000.00',
      currency: 'USD',
      shipmentRef: 'CEX-2026-8892 (Spices Consignment)',
      bank: 'Emirates NBD',
      date: '26 Sep 2026',
      status: 'Settled',
    },
    {
      id: 'pay-3',
      transactionRef: 'TXN-ESC-2026-906',
      method: 'Escrow Guarantee',
      client: 'Euro Trade GmbH (Germany)',
      amount: '€285,000.00',
      currency: 'EUR',
      shipmentRef: 'CEX-2026-8895 (Machinery Parts)',
      bank: 'Deutsche Bank Frankfurt',
      date: '24 Sep 2026',
      status: 'Escrow Funded',
    },
    {
      id: 'pay-4',
      transactionRef: 'TXN-CAD-2026-907',
      method: 'Cash Against Documents (CAD)',
      client: 'Sunrise Imports SpA (Italy)',
      amount: '€95,400.00',
      currency: 'EUR',
      shipmentRef: 'CEX-2026-8894 (Mango Pulp)',
      bank: 'Intesa Sanpaolo Milan',
      date: '22 Sep 2026',
      status: 'Under Review',
    },
    {
      id: 'pay-5',
      transactionRef: 'TXN-TT-2026-908',
      method: 'Wire Transfer (TT)',
      client: 'Asian Fresh Co. (Japan)',
      amount: '¥11,400,000',
      currency: 'JPY',
      shipmentRef: 'CEX-2026-8890 (Vegetables)',
      bank: 'MUFG Bank Tokyo',
      date: '21 Sep 2026',
      status: 'Settled',
    },
  ];

  const filteredPayments = payments.filter((p) => {
    const matchesSearch =
      p.transactionRef.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.shipmentRef.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.bank.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMethod = methodFilter === 'All' || p.method === methodFilter;
    return matchesSearch && matchesMethod;
  });

  return (
    <div className="admin-subpage-container">
      {/* Top Header */}
      <div className="admin-subpage-header">
        <div>
          <div className="admin-subpage-badge">
            <CreditCard size={14} /> Trade Finance & Settlements
          </div>
          <h1 className="admin-subpage-title">Commercial Payments & Letters of Credit</h1>
          <p className="admin-subpage-desc">
            Multi-currency financial ledger tracking irrevocable Letters of Credit, Escrow settlements, and SWIFT wire transfers.
          </p>
        </div>
        <div className="admin-subpage-actions">
          <button className="admin-btn-secondary">
            <Download size={15} /> Download Reconciliation
          </button>
          <button className="admin-btn-primary">
            <Plus size={15} /> Record Payment / LC
          </button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="admin-subpage-kpi-grid">
        <div className="admin-subpage-kpi-card">
          <div className="kpi-icon-wrap emerald">
            <DollarSign size={20} />
          </div>
          <div className="kpi-data">
            <div className="kpi-label">Total Settled (YTD)</div>
            <div className="kpi-value">$2.48M</div>
            <div className="kpi-sub green">+16.4% YoY Growth</div>
          </div>
        </div>

        <div className="admin-subpage-kpi-card">
          <div className="kpi-icon-wrap blue">
            <ShieldCheck size={20} />
          </div>
          <div className="kpi-data">
            <div className="kpi-label">Active Letters of Credit</div>
            <div className="kpi-value">14 LCs</div>
            <div className="kpi-sub blue">$1.82M Secured Coverage</div>
          </div>
        </div>

        <div className="admin-subpage-kpi-card">
          <div className="kpi-icon-wrap amber">
            <Clock size={20} />
          </div>
          <div className="kpi-data">
            <div className="kpi-label">Escrow In Hold</div>
            <div className="kpi-value">$380.4K</div>
            <div className="kpi-sub amber">Awaiting Port Clearance</div>
          </div>
        </div>

        <div className="admin-subpage-kpi-card">
          <div className="kpi-icon-wrap purple">
            <CheckCircle2 size={20} />
          </div>
          <div className="kpi-data">
            <div className="kpi-label">Default Risk</div>
            <div className="kpi-value">0.00%</div>
            <div className="kpi-sub green">100% Insured via ECGC</div>
          </div>
        </div>
      </div>

      {/* Filter Row */}
      <div className="admin-subpage-filter-row">
        <div className="admin-subpage-search">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search by transaction reference, client, bank, shipment..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="admin-subpage-filter-group">
          <Filter size={16} />
          <span>Payment Instrument:</span>
          {['All', 'Letter of Credit (LC)', 'Wire Transfer (TT)', 'Escrow Guarantee'].map(
            (method) => (
              <button
                key={method}
                className={`filter-pill ${methodFilter === method ? 'active' : ''}`}
                onClick={() => setMethodFilter(method)}
              >
                {method}
              </button>
            )
          )}
        </div>
      </div>

      {/* Payments Table */}
      <div className="admin-subpage-table-card">
        <div className="admin-table-responsive">
          <table className="admin-subpage-table">
            <thead>
              <tr>
                <th>Transaction Reference</th>
                <th>Payment Instrument</th>
                <th>Client & Counterparty</th>
                <th>Consignment</th>
                <th>Bank & Clearing</th>
                <th>Settlement Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((p) => (
                <tr key={p.id}>
                  <td>
                    <div className="table-bold-cell">{p.transactionRef}</div>
                    <div className="table-muted-sub">Date: {p.date}</div>
                  </td>
                  <td>
                    <span className="hub-role-badge">{p.method}</span>
                  </td>
                  <td>
                    <div className="table-strong-text">{p.client}</div>
                  </td>
                  <td>
                    <div className="table-muted-sub">{p.shipmentRef}</div>
                  </td>
                  <td>
                    <div className="table-strong-text">{p.bank}</div>
                  </td>
                  <td>
                    <div
                      className="table-bold-cell"
                      style={{ color: '#059669', fontSize: '0.95rem' }}
                    >
                      {p.amount}
                    </div>
                  </td>
                  <td>
                    <span
                      className={`ship-status-badge ${
                        p.status === 'Settled'
                          ? 'delivered'
                          : p.status === 'Escrow Funded'
                          ? 'in-transit'
                          : 'customs'
                      }`}
                    >
                      {p.status}
                    </span>
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
