import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
  required?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  icon,
  required,
  id,
  className = '',
  ...props
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="form-group">
      {label && (
        <label htmlFor={inputId} className="form-label">
          {label}
          {required && <span className="form-required">*</span>}
        </label>
      )}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        {icon && (
          <div
            style={{
              position: 'absolute',
              left: 12,
              display: 'flex',
              alignItems: 'center',
              pointerEvents: 'none',
              color: '#94A3B8',
            }}
          >
            {icon}
          </div>
        )}
        <input
          id={inputId}
          className={`form-input ${className}`}
          style={icon ? { paddingLeft: 40 } : undefined}
          required={required}
          {...props}
        />
      </div>
      {error && <span className="form-error-msg">{error}</span>}
      {!error && helperText && <span style={{ fontSize: '0.75rem', color: '#64748B' }}>{helperText}</span>}
    </div>
  );
};
