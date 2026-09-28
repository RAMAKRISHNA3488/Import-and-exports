import React, { useState } from 'react';
import {
  Globe,
  MapPin,
  Search,
  Plus,
  ArrowRight,
} from 'lucide-react';
import { AdminWorldMap } from '../../components/admin/AdminWorldMap.js';

interface RegionalHub {
  id: string;
  country: string;
  flag: string;
  city: string;
  role: 'Regional Headquarters' | 'Maritime Clearing Hub' | 'Trade Liaison Office' | 'Consolidation Center';
  corridors: number;
  shipmentsActive: number;
  contactPerson: string;
  clearanceRate: string;
}

export const AdminGlobalPresencePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const hubs: RegionalHub[] = [
    {
      id: 'hub-1',
      country: 'United States',
      flag: '🇺🇸',
      city: 'New York & Los Angeles',
      role: 'Regional Headquarters',
      corridors: 24,
      shipmentsActive: 18,
      contactPerson: 'Marcus Vance (VP Americas)',
      clearanceRate: '99.8%',
    },
    {
      id: 'hub-2',
      country: 'United Arab Emirates',
      flag: '🇦🇪',
      city: 'Dubai (Jebel Ali)',
      role: 'Maritime Clearing Hub',
      corridors: 32,
      shipmentsActive: 22,
      contactPerson: 'Tariq Al-Mansoor (MENA Director)',
      clearanceRate: '99.5%',
    },
    {
      id: 'hub-3',
      country: 'Germany',
      flag: '🇩🇪',
      city: 'Hamburg & Frankfurt',
      role: 'Regional Headquarters',
      corridors: 28,
      shipmentsActive: 14,
      contactPerson: 'Klaus Wagner (EU Logistics)',
      clearanceRate: '99.9%',
    },
    {
      id: 'hub-4',
      country: 'Singapore',
      flag: '🇸🇬',
      city: 'Port of Singapore',
      role: 'Consolidation Center',
      corridors: 36,
      shipmentsActive: 26,
      contactPerson: 'Wei Chen (Asia-Pacific Lead)',
      clearanceRate: '99.7%',
    },
    {
      id: 'hub-5',
      country: 'India',
      flag: '🇮🇳',
      city: 'Mumbai & Chennai',
      role: 'Maritime Clearing Hub',
      corridors: 45,
      shipmentsActive: 34,
      contactPerson: 'Rajesh K. Sharma (Operations Head)',
      clearanceRate: '99.4%',
    },
    {
      id: 'hub-6',
      country: 'Japan',
      flag: '🇯🇵',
      city: 'Tokyo & Yokohama',
      role: 'Trade Liaison Office',
      corridors: 16,
      shipmentsActive: 8,
      contactPerson: 'Kenji Sato (East Asia Rep)',
      clearanceRate: '99.9%',
    },
  ];

  const filteredHubs = hubs.filter(
    (h) =>
      h.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      h.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      h.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-subpage-container">
      {/* Top Header */}
      <div className="admin-subpage-header">
        <div>
          <div className="admin-subpage-badge">
            <Globe size={14} /> International Operations
          </div>
          <h1 className="admin-subpage-title">Global Presence & Trade Hubs</h1>
          <p className="admin-subpage-desc">
            Direct monitoring of 45+ international trade corridors, regional offices, customs bonded warehouses, and maritime clearing points.
          </p>
        </div>
        <div className="admin-subpage-actions">
          <button className="admin-btn-primary">
            <Plus size={15} /> Add Regional Corridor
          </button>
        </div>
      </div>

      {/* Embedded Live Interactive World Map */}
      <div className="admin-subpage-table-card" style={{ marginBottom: 24, padding: 18 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10B981', display: 'inline-block' }} />
            <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0F172A' }}>
              Live Telemetry: Global Transit Grid
            </span>
          </div>
          <span style={{ fontSize: '0.75rem', color: '#64748B' }}>
            Hover pins to inspect port telemetry and container flow
          </span>
        </div>
        <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid #E2E8F0' }}>
          <AdminWorldMap />
        </div>
      </div>

      {/* Search and Grid */}
      <div className="admin-subpage-filter-row">
        <div className="admin-subpage-search" style={{ maxWidth: 400 }}>
          <Search size={16} />
          <input
            type="text"
            placeholder="Search regional offices, port hubs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div style={{ fontSize: '0.825rem', color: '#64748B' }}>
          Showing <strong>{filteredHubs.length}</strong> strategic international hubs
        </div>
      </div>

      {/* Hubs Cards Grid */}
      <div className="admin-subpage-hubs-grid">
        {filteredHubs.map((hub) => (
          <div key={hub.id} className="admin-hub-card">
            <div className="hub-card-header">
              <span className="hub-flag">{hub.flag}</span>
              <div>
                <h4 className="hub-country">{hub.country}</h4>
                <div className="hub-city">
                  <MapPin size={12} /> {hub.city}
                </div>
              </div>
              <span className="hub-role-badge">{hub.role}</span>
            </div>

            <div className="hub-card-body">
              <div className="hub-stat-item">
                <span className="label">Active Corridors:</span>
                <span className="val">{hub.corridors} Lanes</span>
              </div>
              <div className="hub-stat-item">
                <span className="label">Consignments Active:</span>
                <span className="val" style={{ color: '#2563EB', fontWeight: 700 }}>
                  {hub.shipmentsActive} In Transit
                </span>
              </div>
              <div className="hub-stat-item">
                <span className="label">Clearance Efficiency:</span>
                <span className="val" style={{ color: '#059669', fontWeight: 700 }}>
                  {hub.clearanceRate}
                </span>
              </div>
              <div className="hub-stat-item">
                <span className="label">Hub Representative:</span>
                <span className="val">{hub.contactPerson}</span>
              </div>
            </div>

            <div className="hub-card-footer">
              <button className="hub-link-btn">
                <span>View Maritime Corridors</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
