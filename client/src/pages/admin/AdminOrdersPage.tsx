import React, { useEffect, useState } from 'react';
import { api } from '../../services/api.js';
import type { Order } from '../../types/index.js';
import { Badge } from '../../components/common/Badge.js';

export const AdminOrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get<Order[]>('/orders').then(res => {
      if (res.success && res.data) {
        setOrders(res.data);
      }
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-navy-primary)', marginBottom: 20 }}>
        Commercial Orders & Consignments
      </h1>
      <div className="card">
        <div className="table-wrapper">
          <table className="trade-table">
            <thead>
              <tr>
                <th>Order #</th>
                <th>Customer</th>
                <th>Commodity</th>
                <th>Quantity</th>
                <th>Destination</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} style={{ padding: 24, textAlign: 'center' }}>Loading orders...</td></tr>
              ) : (
                orders.map(o => (
                  <tr key={o.id}>
                    <td><strong>{o.orderNumber}</strong></td>
                    <td>{o.customer}</td>
                    <td>{o.product}</td>
                    <td>{o.quantity}</td>
                    <td>{o.destination}</td>
                    <td>
                      <Badge variant={o.status === 'Processing' ? 'progress' : o.status === 'Shipped' ? 'quoted' : 'success'}>
                        {o.status}
                      </Badge>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
