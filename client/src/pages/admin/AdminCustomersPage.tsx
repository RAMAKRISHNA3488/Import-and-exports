import React from 'react';

export const AdminCustomersPage: React.FC = () => {
  return (
    <div>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-navy-primary)', marginBottom: 20 }}>
        Buyer & Customer CRM
      </h1>
      <div className="card" style={{ padding: 24 }}>
        <p style={{ color: '#64748B' }}>
          Registered international buyers and institutional procurement partners directory.
        </p>
      </div>
    </div>
  );
};
