import React, { useState } from 'react';
import {
  Megaphone,
  Plus,
  Search,
  Globe,
  Users,
  Target,
  ArrowUpRight,
  Download,
} from 'lucide-react';

interface CampaignItem {
  id: string;
  name: string;
  targetMarket: string;
  commodityFocus: string;
  leadsGenerated: number;
  rfqsReceived: number;
  conversionRate: string;
  budget: string;
  status: 'Active' | 'Scheduled' | 'Completed';
}

export const AdminMarketingPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const campaigns: CampaignItem[] = [
    {
      id: 'cmp-1',
      name: 'Gulfood Dubai 2026 Inbound Trade Expo Campaign',
      targetMarket: 'Middle East & GCC 🇦🇪 🇸🇦',
      commodityFocus: 'Basmati Rice & Ceylon Spices',
      leadsGenerated: 142,
      rfqsReceived: 38,
      conversionRate: '26.8%',
      budget: '$24,500',
      status: 'Active',
    },
    {
      id: 'cmp-2',
      name: 'European Organic Food & Agricultural Buyer Outreach',
      targetMarket: 'Germany, Italy, UK 🇩🇪 🇮🇹 🇬🇧',
      commodityFocus: 'Organic Fruits & Dehydrated Veg',
      leadsGenerated: 89,
      rfqsReceived: 21,
      conversionRate: '23.5%',
      budget: '$18,000',
      status: 'Active',
    },
    {
      id: 'cmp-3',
      name: 'North American Institutional Foodservice Tender Push',
      targetMarket: 'USA & Canada 🇺🇸 🇨🇦',
      commodityFocus: 'Bulk Grain & Pulses Consignments',
      leadsGenerated: 114,
      rfqsReceived: 29,
      conversionRate: '25.4%',
      budget: '$32,000',
      status: 'Active',
    },
    {
      id: 'cmp-4',
      name: 'Tokyo Foodex 2026 Agro-Trade Roadshow',
      targetMarket: 'Japan & South Korea 🇯🇵 🇰🇷',
      commodityFocus: 'High-Grade Fresh Fruits & Spices',
      leadsGenerated: 64,
      rfqsReceived: 14,
      conversionRate: '21.8%',
      budget: '$15,000',
      status: 'Scheduled',
    },
  ];

  const filteredCampaigns = campaigns.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.targetMarket.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.commodityFocus.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-subpage-container">
      {/* Top Header */}
      <div className="admin-subpage-header">
        <div>
          <div className="admin-subpage-badge">
            <Megaphone size={14} /> Global Trade Promotion & Acquisition
          </div>
          <h1 className="admin-subpage-title">Marketing & International Lead Generation</h1>
          <p className="admin-subpage-desc">
            Manage multi-regional marketing campaigns, overseas buyer acquisition channels, and trade exhibition lead funnels.
          </p>
        </div>
        <div className="admin-subpage-actions">
          <button className="admin-btn-secondary">
            <Download size={15} /> Export Leads CRM
          </button>
          <button className="admin-btn-primary">
            <Plus size={15} /> Launch Trade Campaign
          </button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="admin-subpage-kpi-grid">
        <div className="admin-subpage-kpi-card">
          <div className="kpi-icon-wrap amber">
            <Target size={20} />
          </div>
          <div className="kpi-data">
            <div className="kpi-label">Total Leads Generated</div>
            <div className="kpi-value">409</div>
            <div className="kpi-sub green">+24% vs last quarter</div>
          </div>
        </div>

        <div className="admin-subpage-kpi-card">
          <div className="kpi-icon-wrap emerald">
            <Users size={20} />
          </div>
          <div className="kpi-data">
            <div className="kpi-label">Commercial RFQs</div>
            <div className="kpi-value">102</div>
            <div className="kpi-sub green">$4.8M Est Pipeline</div>
          </div>
        </div>

        <div className="admin-subpage-kpi-card">
          <div className="kpi-icon-wrap blue">
            <Globe size={20} />
          </div>
          <div className="kpi-data">
            <div className="kpi-label">Target Countries</div>
            <div className="kpi-value">18</div>
            <div className="kpi-sub blue">Active across 4 continents</div>
          </div>
        </div>

        <div className="admin-subpage-kpi-card">
          <div className="kpi-icon-wrap purple">
            <ArrowUpRight size={20} />
          </div>
          <div className="kpi-data">
            <div className="kpi-label">Avg Conversion Rate</div>
            <div className="kpi-value">24.9%</div>
            <div className="kpi-sub green">Above 18% benchmark</div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="admin-subpage-filter-row">
        <div className="admin-subpage-search">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search campaigns by name, market, commodity..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="admin-subpage-table-card">
        <div className="admin-table-responsive">
          <table className="admin-subpage-table">
            <thead>
              <tr>
                <th>Campaign Name</th>
                <th>Target Market</th>
                <th>Commodity Focus</th>
                <th>Inbound Leads</th>
                <th>RFQs Produced</th>
                <th>Conversion</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredCampaigns.map((c) => (
                <tr key={c.id}>
                  <td>
                    <div className="table-bold-cell">{c.name}</div>
                    <div className="table-muted-sub">Budget: {c.budget}</div>
                  </td>
                  <td>
                    <div className="table-strong-text">{c.targetMarket}</div>
                  </td>
                  <td>
                    <div className="table-strong-text">{c.commodityFocus}</div>
                  </td>
                  <td>
                    <div className="table-bold-cell" style={{ color: '#2563EB' }}>
                      {c.leadsGenerated} Leads
                    </div>
                  </td>
                  <td>
                    <div className="table-bold-cell" style={{ color: '#059669' }}>
                      {c.rfqsReceived} RFQs
                    </div>
                  </td>
                  <td>
                    <div className="table-strong-text">{c.conversionRate}</div>
                  </td>
                  <td>
                    <span
                      className={`ship-status-badge ${
                        c.status === 'Active' ? 'delivered' : 'customs'
                      }`}
                    >
                      {c.status}
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
