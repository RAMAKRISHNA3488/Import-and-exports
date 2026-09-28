import React, { useEffect, useState } from 'react';
import { api } from '../../services/api.js';
import type { Supplier } from '../../types/index.js';
import { Badge } from '../../components/common/Badge.js';

export const AdminSuppliersPage: React.FC = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);

  useEffect(() => {
    api.get<Supplier[]>('/admin/suppliers').then(res => {
      if (res.success && res.data) {
        setSuppliers(res.data);
      }
    });
  }, []);

  return (
    <div>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-navy-primary)', marginBottom: 6 }}>
        Supplier Network Management
      </h1>
      <p style={{ fontSize: '0.875rem', color: '#64748B', marginBottom: 20 }}>
        Sample demo supplier directory for testing administration workflows. Real supplier listings will be configured by ConceptExim operations.
      </p>
      <div className="card">
        <div className="table-wrapper">
          <table className="trade-table">
            <thead>
              <tr>
                <th>Supplier Organization</th>
                <th>Country</th>
                <th>Commodities</th>
                <th>Capacity</th>
                <th>Rating</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map(s => (
                <tr key={s.id}>
                  <td>
                    <strong>{s.name}</strong>
                    <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Contact: {s.contactPerson}</div>
                  </td>
                  <td>{s.country}</td>
                  <td>{s.commodities.join(', ')}</td>
                  <td>{s.annualCapacity}</td>
                  <td>⭐ {s.rating}</td>
                  <td><Badge variant="success">{s.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
