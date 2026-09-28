import React from 'react';
import { PackageOpen } from 'lucide-react';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = <PackageOpen size={48} color="#94A3B8" />,
  title,
  description,
  action,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '48px 24px',
        backgroundColor: '#FFFFFF',
        borderRadius: 'var(--radius-md)',
        border: '1px dashed var(--color-border-strong)',
      }}
    >
      <div style={{ marginBottom: 16 }}>{icon}</div>
      <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-navy-primary)', marginBottom: 6 }}>
        {title}
      </h4>
      <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', maxWidth: 380, marginBottom: action ? 20 : 0 }}>
        {description}
      </p>
      {action && <div>{action}</div>}
    </div>
  );
};
