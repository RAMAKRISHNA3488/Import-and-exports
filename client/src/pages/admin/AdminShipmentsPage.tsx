import React, { useState } from 'react';
import {
  Ship,
  Search,
  Filter,
  Plus,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Download,
  Eye,
  X,
} from 'lucide-react';

interface ShipmentItem {
  id: string;
  trackingNo: string;
  vessel: string;
  carrier: string;
  origin: string;
  destination: string;
  commodity: string;
  containers: string;
  weight: string;
  departureDate: string;
  eta: string;
  status: 'In Transit' | 'Customs Clearance' | 'Delivered' | 'Exception';
  progress: number;
}

export const AdminShipmentsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [selectedShipment, setSelectedShipment] = useState<ShipmentItem | null>(null);

  const shipments: ShipmentItem[] = [
    {
      id: 'shp-101',
      trackingNo: 'CEX-2026-8891',
      vessel: 'MSC ILONA / V.412B',
      carrier: 'Mediterranean Shipping Co',
      origin: 'Nhava Sheva (JNPT), India',
      destination: 'Jebel Ali Port, UAE',
      commodity: 'Basmati Rice (Grade A)',
      containers: '4x 40ft High Cube',
      weight: '100 MT',
      departureDate: '18 Sep 2026',
      eta: '28 Sep 2026',
      status: 'In Transit',
      progress: 68,
    },
    {
      id: 'shp-102',
      trackingNo: 'CEX-2026-8892',
      vessel: 'MAERSK MC-KINNEY / V.09A',
      carrier: 'Maersk Line',
      origin: 'Colombo Port, Sri Lanka',
      destination: 'Port of Felixstowe, UK',
      commodity: 'Ceylon Spices & Black Pepper',
      containers: '2x 20ft Standard',
      weight: '28 MT',
      departureDate: '12 Sep 2026',
      eta: '30 Sep 2026',
      status: 'Customs Clearance',
      progress: 88,
    },
    {
      id: 'shp-103',
      trackingNo: 'CEX-2026-8893',
      vessel: 'CMA CGM ANTOINE / V.778C',
      carrier: 'CMA CGM',
      origin: 'Ningbo-Zhoushan, China',
      destination: 'Port of Los Angeles, USA',
      commodity: 'Organic Cotton Fabrics',
      containers: '6x 40ft High Cube',
      weight: '140 MT',
      departureDate: '04 Sep 2026',
      eta: '26 Sep 2026',
      status: 'Delivered',
      progress: 100,
    },
    {
      id: 'shp-104',
      trackingNo: 'CEX-2026-8894',
      vessel: 'HAPAG-LLOYD ESSEN / V.12D',
      carrier: 'Hapag-Lloyd',
      origin: 'Chennai Port, India',
      destination: 'Port of Singapore',
      commodity: 'Processed Alphonso Mango Pulp',
      containers: '3x 20ft Reefer',
      weight: '60 MT',
      departureDate: '20 Sep 2026',
      eta: '02 Oct 2026',
      status: 'In Transit',
      progress: 42,
    },
    {
      id: 'shp-105',
      trackingNo: 'CEX-2026-8895',
      vessel: 'EVER GIVEN / V.556F',
      carrier: 'Evergreen Marine',
      origin: 'Hamburg, Germany',
      destination: 'Mumbai Port, India',
      commodity: 'Heavy Industrial Machinery Spare Parts',
      containers: '1x 40ft Flat Rack',
      weight: '32 MT',
      departureDate: '10 Sep 2026',
      eta: '05 Oct 2026',
      status: 'In Transit',
      progress: 55,
    },
  ];

  const filteredShipments = shipments.filter((shp) => {
    const matchesSearch =
      shp.trackingNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shp.commodity.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shp.vessel.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shp.destination.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || shp.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="admin-subpage-container">
      {/* Top Header */}
      <div className="admin-subpage-header">
        <div>
          <div className="admin-subpage-badge">
            <Ship size={14} /> Global Logistics & Fleet
          </div>
          <h1 className="admin-subpage-title">Active Maritime & Air Shipments</h1>
          <p className="admin-subpage-desc">
            Real-time AIS vessel telemetry, customs clearance checkpoints, and container consignment statuses.
          </p>
        </div>
        <div className="admin-subpage-actions">
          <button className="admin-btn-secondary">
            <Download size={15} /> Export Manifest
          </button>
          <button className="admin-btn-primary">
            <Plus size={15} /> Book Consignment
          </button>
        </div>
      </div>

      {/* KPI Stats Row */}
      <div className="admin-subpage-kpi-grid">
        <div className="admin-subpage-kpi-card">
          <div className="kpi-icon-wrap blue">
            <Ship size={20} />
          </div>
          <div className="kpi-data">
            <div className="kpi-label">Active Shipments</div>
            <div className="kpi-value">64</div>
            <div className="kpi-sub green">+18% vs last month</div>
          </div>
        </div>

        <div className="admin-subpage-kpi-card">
          <div className="kpi-icon-wrap amber">
            <Clock size={20} />
          </div>
          <div className="kpi-data">
            <div className="kpi-label">In Customs Clearance</div>
            <div className="kpi-value">8</div>
            <div className="kpi-sub amber">Avg 1.4 days release</div>
          </div>
        </div>

        <div className="admin-subpage-kpi-card">
          <div className="kpi-icon-wrap emerald">
            <CheckCircle2 size={20} />
          </div>
          <div className="kpi-data">
            <div className="kpi-label">Completed Deliveries</div>
            <div className="kpi-value">512</div>
            <div className="kpi-sub green">99.4% on-time rate</div>
          </div>
        </div>

        <div className="admin-subpage-kpi-card">
          <div className="kpi-icon-wrap purple">
            <AlertTriangle size={20} />
          </div>
          <div className="kpi-data">
            <div className="kpi-label">Weather Exceptions</div>
            <div className="kpi-value">2</div>
            <div className="kpi-sub red">Suez canal traffic rerouted</div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="admin-subpage-filter-row">
        <div className="admin-subpage-search">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search by Tracking No, Vessel, Commodity, Port..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="admin-subpage-filter-group">
          <Filter size={16} />
          <span>Status:</span>
          {['All', 'In Transit', 'Customs Clearance', 'Delivered'].map((status) => (
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

      {/* Shipments Table */}
      <div className="admin-subpage-table-card">
        <div className="admin-table-responsive">
          <table className="admin-subpage-table">
            <thead>
              <tr>
                <th>Tracking No</th>
                <th>Vessel / Carrier</th>
                <th>Commodity & Volume</th>
                <th>Origin ➔ Destination</th>
                <th>Progress & ETA</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredShipments.map((shp) => (
                <tr key={shp.id} onClick={() => setSelectedShipment(shp)}>
                  <td>
                    <div className="table-bold-cell">{shp.trackingNo}</div>
                    <div className="table-muted-sub">{shp.containers}</div>
                  </td>
                  <td>
                    <div className="table-strong-text">{shp.vessel}</div>
                    <div className="table-muted-sub">{shp.carrier}</div>
                  </td>
                  <td>
                    <div className="table-strong-text">{shp.commodity}</div>
                    <div className="table-muted-sub">{shp.weight}</div>
                  </td>
                  <td>
                    <div className="route-flow">
                      <span className="route-origin">{shp.origin}</span>
                      <ArrowUpRight size={14} className="route-arrow" />
                      <span className="route-dest">{shp.destination}</span>
                    </div>
                  </td>
                  <td>
                    <div className="table-progress-wrap">
                      <div className="progress-bar-bg">
                        <div
                          className="progress-bar-fill"
                          style={{
                            width: `${shp.progress}%`,
                            backgroundColor: shp.progress === 100 ? '#10B981' : '#2563EB',
                          }}
                        />
                      </div>
                      <div className="progress-meta">
                        <span>{shp.progress}%</span>
                        <span>ETA: {shp.eta}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span
                      className={`ship-status-badge ${
                        shp.status === 'In Transit'
                          ? 'in-transit'
                          : shp.status === 'Customs Clearance'
                          ? 'customs'
                          : 'delivered'
                      }`}
                    >
                      {shp.status}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button
                      className="table-action-icon-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedShipment(shp);
                      }}
                      title="Inspect Shipment Dossier"
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

      {/* Shipment Detail Modal */}
      {selectedShipment && (
        <div className="admin-modal-overlay" onClick={() => setSelectedShipment(null)}>
          <div className="admin-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <div>
                <h3 className="admin-modal-title">Shipment {selectedShipment.trackingNo}</h3>
                <p className="admin-modal-subtitle">{selectedShipment.vessel} • AIS Live</p>
              </div>
              <button className="admin-modal-close" onClick={() => setSelectedShipment(null)}>
                <X size={18} />
              </button>
            </div>

            <div className="admin-modal-body">
              <div className="admin-detail-meta-box">
                <div className="meta-pair">
                  <span className="meta-label">Carrier Line:</span>
                  <span className="meta-val">{selectedShipment.carrier}</span>
                </div>
                <div className="meta-pair">
                  <span className="meta-label">Consignment:</span>
                  <span className="meta-val">{selectedShipment.commodity}</span>
                </div>
                <div className="meta-pair">
                  <span className="meta-label">Gross Weight / TEUs:</span>
                  <span className="meta-val">{selectedShipment.weight} ({selectedShipment.containers})</span>
                </div>
                <div className="meta-pair">
                  <span className="meta-label">Route:</span>
                  <span className="meta-val">{selectedShipment.origin} ➔ {selectedShipment.destination}</span>
                </div>
                <div className="meta-pair">
                  <span className="meta-label">Status & Clearance:</span>
                  <span className="meta-val" style={{ color: '#2563EB', fontWeight: 700 }}>
                    {selectedShipment.status} ({selectedShipment.progress}% completed)
                  </span>
                </div>
              </div>

              {/* Progress Milestones */}
              <div className="admin-tracking-timeline">
                <div className="timeline-step completed">
                  <div className="timeline-marker">✓</div>
                  <div className="timeline-info">
                    <div className="timeline-title">Port Departure & Manifest Lodged</div>
                    <div className="timeline-date">{selectedShipment.departureDate}</div>
                  </div>
                </div>
                <div className="timeline-step active">
                  <div className="timeline-marker">⚓</div>
                  <div className="timeline-info">
                    <div className="timeline-title">Open Sea Corridor In-Transit</div>
                    <div className="timeline-date">Vessel Speed: 18.4 knots</div>
                  </div>
                </div>
                <div className={`timeline-step ${selectedShipment.progress >= 80 ? 'active' : ''}`}>
                  <div className="timeline-marker">🏢</div>
                  <div className="timeline-info">
                    <div className="timeline-title">Port Arrival & Customs Verification</div>
                    <div className="timeline-date">ETA {selectedShipment.eta}</div>
                  </div>
                </div>
                <div className={`timeline-step ${selectedShipment.progress === 100 ? 'completed' : ''}`}>
                  <div className="timeline-marker">🏁</div>
                  <div className="timeline-info">
                    <div className="timeline-title">Final Gate Out & Consignee Delivery</div>
                    <div className="timeline-date">Door Delivery Clearance</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="admin-modal-footer">
              <button className="admin-btn-secondary" onClick={() => setSelectedShipment(null)}>
                Close
              </button>
              <button
                className="admin-btn-primary"
                onClick={() => {
                  alert(`Bill of Lading manifest generated for ${selectedShipment.trackingNo}`);
                  setSelectedShipment(null);
                }}
              >
                Download Bill of Lading
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
