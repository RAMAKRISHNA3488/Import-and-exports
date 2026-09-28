import { useEffect, useState } from 'react';
import { api } from '../../services/api.js';
import type { Enquiry } from '../../types/index.js';
import { Badge } from '../../components/common/Badge.js';
import { Button } from '../../components/common/Button.js';
import { RefreshCw } from 'lucide-react';

export const AdminEnquiriesPage: React.FC = () => {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);

  const loadEnquiries = async () => {
    setLoading(true);
    const res = await api.get<Enquiry[]>('/enquiries');
    if (res.success && res.data) {
      setEnquiries(res.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadEnquiries();
  }, []);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-navy-primary)' }}>
            Trade Enquiries & RFQ Management
          </h1>
          <p style={{ fontSize: '0.875rem', color: '#64748B' }}>
            Live incoming buyer inquiries stored in temporary database
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={loadEnquiries} icon={<RefreshCw size={14} />}>
          Refresh
        </Button>
      </div>

      <div className="card">
        <div className="table-wrapper">
          <table className="trade-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Buyer</th>
                <th>Email</th>
                <th>Commodity</th>
                <th>Volume</th>
                <th>Country</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={8} style={{ textAlign: 'center', padding: 24 }}>
                    Loading enquiries...
                  </td>
                </tr>
              ) : (
                enquiries.map(e => (
                  <tr key={e.id}>
                    <td><strong>{e.enquiryNumber}</strong></td>
                    <td>{e.name} ({e.company})</td>
                    <td>{e.email}</td>
                    <td>{e.product}</td>
                    <td>{e.quantity ? `${e.quantity} ${e.unit || ''}` : 'General Inquiry'}</td>
                    <td>{e.country}</td>
                    <td>{e.date}</td>
                    <td>
                      <Badge variant={e.status === 'New' ? 'new' : e.status === 'In Progress' ? 'progress' : 'quoted'}>
                        {e.status}
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
