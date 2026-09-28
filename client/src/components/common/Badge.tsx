import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'new' | 'progress' | 'quoted' | 'success' | 'danger' | 'bestseller' | 'organic' | 'default';
  className?: string;
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  className = '',
  icon,
}) => {
  let badgeClass = 'badge';
  if (variant !== 'default') {
    badgeClass += ` badge-${variant}`;
  } else {
    badgeClass += ' badge-new';
  }

  return (
    <span className={`${badgeClass} ${className}`}>
      {icon}
      {children}
    </span>
  );
};
