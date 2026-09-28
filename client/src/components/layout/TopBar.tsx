import React from 'react';
import { Globe, User as UserIcon, Mail, ShieldCheck, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.js';

interface TopBarProps {
  onRequestQuote?: () => void;
}

export const TopBar: React.FC<TopBarProps> = () => {
  const { isAuthenticated } = useAuth();

  // Entire TopBar disappears when user is logged in (preserving existing business logic)
  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="global-topbar" role="complementary" aria-label="Global Trade Notice and Support Bar">
      <div className="container global-topbar-inner">
        {/* Left: Live Trade Desk Status & Accreditations */}
        <div className="topbar-left">
          {/* Live Trade Status Indicator */}
          <div className="topbar-status-pill">
            <span className="topbar-status-dot pulse-dot-active" aria-hidden="true" />
            <span className="topbar-status-text">Trade Desk Active</span>
            <span className="topbar-status-tz" title="Current Trade Operations Timezone">
              <Clock size={11} className="topbar-clock-icon" />
              <span>GMT+5:30</span>
            </span>
          </div>

          <span className="topbar-divider" aria-hidden="true">|</span>

          {/* APEDA & ISO Accreditation */}
          <div className="topbar-accreditation" title="APEDA Recognized & ISO 9001:2015 Certified Export Partner">
            <ShieldCheck size={13} className="topbar-gold-icon" />
            <span className="topbar-accreditation-text">APEDA &amp; ISO 9001:2015 Accredited</span>
          </div>

          <span className="topbar-divider topbar-hide-tablet" aria-hidden="true">•</span>

          {/* Tagline */}
          <span className="topbar-tagline topbar-hide-tablet">
            International Commodity Trade &amp; Cold Chain Logistics
          </span>
        </div>

        {/* Right: Direct Trade Desk Contacts & Client Access */}
        <div className="topbar-right">
          {/* Direct Email */}
          <a
            href="mailto:inquiry@conceptexim.com"
            className="topbar-link topbar-email-link"
            title="Direct inquiries to ConceptExim Trade Desk"
          >
            <Mail size={13} className="topbar-gold-icon" />
            <span>inquiry@conceptexim.com</span>
          </a>

          <span className="topbar-divider" aria-hidden="true">|</span>

          {/* Language Selector */}
          <div className="topbar-lang-pill" title="Global Language: English (USD Standard)">
            <Globe size={13} className="topbar-gold-icon" />
            <span>English (USD)</span>
          </div>

          <span className="topbar-divider" aria-hidden="true">|</span>

          {/* Client Portal / Auth */}
          <div className="topbar-auth-group">
            <UserIcon size={13} className="topbar-user-icon" />
            <Link
              to="/login"
              className="topbar-auth-link"
              title="Client Trade Portal Login"
            >
              Sign In
            </Link>
            <span className="topbar-auth-slash">/</span>
            <Link
              to="/register"
              className="topbar-auth-link"
              title="Create Buyer or Supplier Trade Account"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
