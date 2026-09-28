import React from 'react';
import { useAuth } from '../../context/AuthContext.js';

export const AdminSettingsPage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-navy-primary)', marginBottom: 20 }}>
        Platform Settings & Configuration
      </h1>
      <div className="card" style={{ padding: 28, maxWidth: 640 }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 12 }}>Active Administrator Session</h3>
        <p style={{ fontSize: '0.875rem', color: '#64748B' }}>User: <strong>{user?.fullName}</strong></p>
        <p style={{ fontSize: '0.875rem', color: '#64748B' }}>Email: <strong>{user?.email}</strong></p>
        <p style={{ fontSize: '0.875rem', color: '#64748B' }}>Role: <strong>{user?.role}</strong></p>
        <div style={{ marginTop: 20, padding: 14, backgroundColor: '#F8FAFC', borderRadius: 'var(--radius-sm)' }}>
          <strong>Database Environment:</strong> Temporary in-memory with file-backed sync (<code>data/temp_store.json</code>).
        </div>
      </div>
    </div>
  );
};
