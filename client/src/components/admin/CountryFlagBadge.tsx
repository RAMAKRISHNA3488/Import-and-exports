import React from 'react';

export interface CountryFlagBadgeProps {
  country?: string;
  code?: string;
  size?: number;
  shape?: 'circle' | 'rounded';
  showCodeBadge?: boolean;
  className?: string;
}

// Normalizes country name or code to a standard 2-letter ISO code
export const normalizeCountryCode = (countryOrCode?: string): string => {
  if (!countryOrCode) return 'GLOBAL';
  const c = countryOrCode.trim().toLowerCase();

  if (['usa', 'us', 'united states', 'united states of america'].includes(c)) return 'US';
  if (['uae', 'ae', 'united arab emirates', 'dubai', 'abu dhabi'].includes(c)) return 'AE';
  if (['italy', 'it', 'italia', 'rome', 'milan'].includes(c)) return 'IT';
  if (['germany', 'de', 'deutschland', 'hamburg', 'frankfurt'].includes(c)) return 'DE';
  if (['japan', 'jp', 'nippon', 'tokyo', 'yokohama'].includes(c)) return 'JP';
  if (['uk', 'gb', 'united kingdom', 'great britain', 'england', 'london'].includes(c)) return 'GB';
  if (['india', 'in', 'bharat', 'mumbai', 'delhi'].includes(c)) return 'IN';
  if (['singapore', 'sg'].includes(c)) return 'SG';
  if (['china', 'cn', 'prc', 'shanghai', 'beijing'].includes(c)) return 'CN';
  if (['australia', 'au', 'sydney', 'melbourne'].includes(c)) return 'AU';
  if (['south africa', 'za', 'durban', 'cape town'].includes(c)) return 'ZA';
  if (['brazil', 'br', 'brasil', 'santos', 'sao paulo'].includes(c)) return 'BR';
  if (['netherlands', 'nl', 'holland', 'rotterdam', 'amsterdam'].includes(c)) return 'NL';
  if (['france', 'fr', 'paris'].includes(c)) return 'FR';
  if (['canada', 'ca', 'toronto', 'vancouver'].includes(c)) return 'CA';

  return countryOrCode.toUpperCase().slice(0, 3);
};

export const CountryFlagBadge: React.FC<CountryFlagBadgeProps> = ({
  country,
  code,
  size = 28,
  shape = 'circle',
  showCodeBadge = false,
  className = '',
}) => {
  const normCode = normalizeCountryCode(code || country);
  const clipId = `flag-clip-${normCode}-${Math.random().toString(36).substring(2, 7)}`;
  const borderRadius = shape === 'circle' ? '50%' : '6px';

  const renderFlagGraphic = () => {
    switch (normCode) {
      case 'US':
        // USA Flag
        return (
          <g>
            <rect width="36" height="36" fill="#FFFFFF" />
            {Array.from({ length: 13 }).map((_, i) => (
              <rect
                key={i}
                y={(i * 36) / 13}
                width="36"
                height={36 / 13}
                fill={i % 2 === 0 ? '#B22234' : '#FFFFFF'}
              />
            ))}
            <rect width="18" height="19.4" fill="#3C3B6E" />
            <circle cx="5" cy="5" r="1.1" fill="#FFFFFF" />
            <circle cx="10" cy="5" r="1.1" fill="#FFFFFF" />
            <circle cx="15" cy="5" r="1.1" fill="#FFFFFF" />
            <circle cx="7.5" cy="9.7" r="1.1" fill="#FFFFFF" />
            <circle cx="12.5" cy="9.7" r="1.1" fill="#FFFFFF" />
            <circle cx="5" cy="14.4" r="1.1" fill="#FFFFFF" />
            <circle cx="10" cy="14.4" r="1.1" fill="#FFFFFF" />
            <circle cx="15" cy="14.4" r="1.1" fill="#FFFFFF" />
          </g>
        );

      case 'AE':
        // UAE Flag
        return (
          <g>
            <rect width="36" height="12" fill="#00732F" />
            <rect y="12" width="36" height="12" fill="#FFFFFF" />
            <rect y="24" width="36" height="12" fill="#000000" />
            <rect width="11" height="36" fill="#FF0000" />
          </g>
        );

      case 'IT':
        // Italy Flag (Green, White, Red Vertical Tricolor)
        return (
          <g>
            <rect width="12" height="36" fill="#009246" />
            <rect x="12" width="12" height="36" fill="#FFFFFF" />
            <rect x="24" width="12" height="36" fill="#CE2B37" />
          </g>
        );

      case 'DE':
        // Germany Flag (Black, Red, Gold Horizontal Tricolor)
        return (
          <g>
            <rect width="36" height="12" fill="#000000" />
            <rect y="12" width="36" height="12" fill="#DD0000" />
            <rect y="24" width="36" height="12" fill="#FFCE00" />
          </g>
        );

      case 'JP':
        // Japan Flag (White field with Rising Sun Disc)
        return (
          <g>
            <rect width="36" height="36" fill="#FFFFFF" />
            <circle cx="18" cy="18" r="8" fill="#BC002D" />
          </g>
        );

      case 'GB':
      case 'UK':
        // UK Flag (Union Jack)
        return (
          <g>
            <rect width="36" height="36" fill="#012169" />
            {/* White diagonals */}
            <line x1="0" y1="0" x2="36" y2="36" stroke="#FFFFFF" strokeWidth="5.5" />
            <line x1="36" y1="0" x2="0" y2="36" stroke="#FFFFFF" strokeWidth="5.5" />
            {/* Red diagonals */}
            <line x1="0" y1="0" x2="36" y2="36" stroke="#C8102E" strokeWidth="2.2" />
            <line x1="36" y1="0" x2="0" y2="36" stroke="#C8102E" strokeWidth="2.2" />
            {/* White cross */}
            <rect x="13.5" y="0" width="9" height="36" fill="#FFFFFF" />
            <rect x="0" y="13.5" width="36" height="9" fill="#FFFFFF" />
            {/* Red cross */}
            <rect x="15.2" y="0" width="5.6" height="36" fill="#C8102E" />
            <rect x="0" y="15.2" width="36" height="5.6" fill="#C8102E" />
          </g>
        );

      case 'IN':
        // India Flag (Saffron, White, Green + Ashoka Chakra)
        return (
          <g>
            <rect width="36" height="12" fill="#FF9933" />
            <rect y="12" width="36" height="12" fill="#FFFFFF" />
            <rect y="24" width="36" height="12" fill="#138808" />
            <circle cx="18" cy="18" r="4.2" fill="none" stroke="#000080" strokeWidth="0.8" />
            <circle cx="18" cy="18" r="1.1" fill="#000080" />
            {Array.from({ length: 12 }).map((_, i) => (
              <line
                key={i}
                x1={18 + 4.2 * Math.cos((i * 30 * Math.PI) / 180)}
                y1={18 + 4.2 * Math.sin((i * 30 * Math.PI) / 180)}
                x2={18 - 4.2 * Math.cos((i * 30 * Math.PI) / 180)}
                y2={18 - 4.2 * Math.sin((i * 30 * Math.PI) / 180)}
                stroke="#000080"
                strokeWidth="0.4"
              />
            ))}
          </g>
        );

      case 'SG':
        // Singapore Flag
        return (
          <g>
            <rect width="36" height="18" fill="#ED2939" />
            <rect y="18" width="36" height="18" fill="#FFFFFF" />
            <circle cx="10.5" cy="9" r="5.2" fill="#FFFFFF" />
            <circle cx="12.2" cy="9" r="4.3" fill="#ED2939" />
            <circle cx="13.8" cy="6.2" r="0.8" fill="#FFFFFF" />
            <circle cx="16.2" cy="7.8" r="0.8" fill="#FFFFFF" />
            <circle cx="15.2" cy="11.2" r="0.8" fill="#FFFFFF" />
            <circle cx="12.5" cy="11.2" r="0.8" fill="#FFFFFF" />
            <circle cx="13" cy="8.6" r="0.8" fill="#FFFFFF" />
          </g>
        );

      case 'CN':
        // China Flag
        return (
          <g>
            <rect width="36" height="36" fill="#DE2910" />
            <polygon points="9,4 10.5,8.5 15,8.5 11.5,11.5 13,16 9,13 5,16 6.5,11.5 3,8.5 7.5,8.5" fill="#FFDE00" />
            <circle cx="17" cy="5" r="1.1" fill="#FFDE00" />
            <circle cx="19.5" cy="8" r="1.1" fill="#FFDE00" />
            <circle cx="19.5" cy="12" r="1.1" fill="#FFDE00" />
            <circle cx="17" cy="15" r="1.1" fill="#FFDE00" />
          </g>
        );

      case 'AU':
        // Australia Flag
        return (
          <g>
            <rect width="36" height="36" fill="#00008B" />
            <rect width="18" height="18" fill="#012169" />
            <line x1="0" y1="0" x2="18" y2="18" stroke="#FFFFFF" strokeWidth="2.5" />
            <line x1="18" y1="0" x2="0" y2="18" stroke="#FFFFFF" strokeWidth="2.5" />
            <line x1="0" y1="0" x2="18" y2="18" stroke="#C8102E" strokeWidth="1" />
            <line x1="18" y1="0" x2="0" y2="18" stroke="#C8102E" strokeWidth="1" />
            <rect x="7" y="0" width="4" height="18" fill="#FFFFFF" />
            <rect x="0" y="7" width="18" height="4" fill="#FFFFFF" />
            <rect x="8" y="0" width="2" height="18" fill="#C8102E" />
            <rect x="0" y="8" width="18" height="2" fill="#C8102E" />
            {/* Commonwealth Star */}
            <circle cx="9" cy="27" r="3" fill="#FFFFFF" />
            {/* Southern Cross */}
            <circle cx="27" cy="8" r="1.2" fill="#FFFFFF" />
            <circle cx="31" cy="14" r="1" fill="#FFFFFF" />
            <circle cx="27" cy="28" r="1.4" fill="#FFFFFF" />
            <circle cx="23" cy="18" r="1.2" fill="#FFFFFF" />
            <circle cx="28" cy="21" r="0.9" fill="#FFFFFF" />
          </g>
        );

      case 'ZA':
        // South Africa Flag
        return (
          <g>
            <rect width="36" height="18" fill="#E03C31" />
            <rect y="18" width="36" height="18" fill="#001489" />
            <polygon points="0,0 18,18 0,36" fill="#000000" />
            <polygon points="0,0 22,18 0,36" fill="none" stroke="#FFB81C" strokeWidth="2.5" />
            <path d="M 0 12 L 14 12 L 36 2 L 36 7 L 18 16 L 0 16 Z" fill="#007749" stroke="#FFFFFF" strokeWidth="1.2" />
            <path d="M 0 24 L 14 24 L 36 34 L 36 29 L 18 20 L 0 20 Z" fill="#007749" stroke="#FFFFFF" strokeWidth="1.2" />
          </g>
        );

      case 'BR':
        // Brazil Flag
        return (
          <g>
            <rect width="36" height="36" fill="#009739" />
            <polygon points="18,5 31,18 18,31 5,18" fill="#FEDD00" />
            <circle cx="18" cy="18" r="7.5" fill="#012169" />
            <path d="M 11 19 Q 18 15 25 18" stroke="#FFFFFF" strokeWidth="1.2" fill="none" />
          </g>
        );

      case 'NL':
        // Netherlands Flag
        return (
          <g>
            <rect width="36" height="12" fill="#AE1C28" />
            <rect y="12" width="36" height="12" fill="#FFFFFF" />
            <rect y="24" width="36" height="12" fill="#21468B" />
          </g>
        );

      case 'FR':
        // France Flag
        return (
          <g>
            <rect width="12" height="36" fill="#0055A4" />
            <rect x="12" width="12" height="36" fill="#FFFFFF" />
            <rect x="24" width="12" height="36" fill="#EF4135" />
          </g>
        );

      case 'CA':
        // Canada Flag
        return (
          <g>
            <rect width="9" height="36" fill="#FF0000" />
            <rect x="9" width="18" height="36" fill="#FFFFFF" />
            <rect x="27" width="9" height="36" fill="#FF0000" />
            {/* Maple Leaf */}
            <path
              d="M 18 10 L 19.5 13.5 L 23 13 L 21 16 L 23.5 18.5 L 20 18.5 L 20 22 L 18 24 L 16 22 L 16 18.5 L 12.5 18.5 L 15 16 L 13 13 L 16.5 13.5 Z"
              fill="#FF0000"
            />
          </g>
        );

      default:
        // Generic Global Trade Desk Flag
        return (
          <g>
            <rect width="36" height="36" fill="#1E293B" />
            <circle cx="18" cy="18" r="10" fill="none" stroke="#60A5FA" strokeWidth="1.5" />
            <line x1="8" y1="18" x2="28" y2="18" stroke="#60A5FA" strokeWidth="1.2" />
            <path d="M 18 8 Q 12 18 18 28" fill="none" stroke="#60A5FA" strokeWidth="1.2" />
            <path d="M 18 8 Q 24 18 18 28" fill="none" stroke="#60A5FA" strokeWidth="1.2" />
          </g>
        );
    }
  };

  return (
    <div
      className={`admin-country-flag-badge-wrap ${className}`}
      style={{ display: 'inline-flex', alignItems: 'center', gap: 6, flexShrink: 0 }}
      title={`${country || normCode} verified trade origin`}
    >
      <div
        className="admin-country-flag-disc"
        style={{
          width: size,
          height: size,
          borderRadius,
          overflow: 'hidden',
          boxShadow: '0 1px 3px rgba(15, 23, 42, 0.12), 0 0 0 1px rgba(0, 0, 0, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          background: '#F8FAFC',
        }}
      >
        <svg
          viewBox="0 0 36 36"
          width="100%"
          height="100%"
          preserveAspectRatio="none"
          role="img"
          aria-label={`${country || normCode} Flag`}
        >
          <defs>
            <clipPath id={clipId}>
              {shape === 'circle' ? (
                <circle cx="18" cy="18" r="18" />
              ) : (
                <rect width="36" height="36" rx="6" />
              )}
            </clipPath>
          </defs>
          <g clipPath={`url(#${clipId})`}>
            {renderFlagGraphic()}
          </g>
          {shape === 'circle' ? (
            <circle cx="18" cy="18" r="17.5" fill="none" stroke="rgba(0,0,0,0.12)" strokeWidth="1" />
          ) : (
            <rect width="36" height="36" rx="6" fill="none" stroke="rgba(0,0,0,0.12)" strokeWidth="1" />
          )}
        </svg>
      </div>

      {showCodeBadge && (
        <span
          className="admin-country-code-pill"
          style={{
            fontSize: '0.675rem',
            fontWeight: 800,
            color: '#475569',
            background: '#F1F5F9',
            border: '1px solid #E2E8F0',
            padding: '1px 5px',
            borderRadius: '4px',
            letterSpacing: '0.02em',
          }}
        >
          {normCode}
        </span>
      )}
    </div>
  );
};
