import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Search,
  ShoppingBag,
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  Sparkles,
  Wheat,
  Boxes,
  Layers,
  User,
  LogOut,
  Cog,
  Flame,
} from 'lucide-react';
import { useQuoteBasket } from '../../context/QuoteBasketContext.js';
import { useAuth } from '../../context/AuthContext.js';

interface NavbarProps {
  onOpenBasket: () => void;
  onRequestQuote?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBasket, onRequestQuote }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpandedSection, setMobileExpandedSection] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const dropdownTimeoutRef = useRef<number | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const { totalCount } = useQuoteBasket();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Reset navbar visibility on route changes
  useEffect(() => {
    setIsVisible(true);
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Close user menu on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    if (userMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [userMenuOpen]);

  // Auto-hide scroll listener:
  // Disappears when user scrolls down.
  // When user scrolls up, only reappears when reaching the top of the homepage (scrollY <= 50).
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Keep navbar fully visible if mobile drawer or search tray is active
      if (mobileMenuOpen || searchOpen) {
        setIsVisible(true);
        return;
      }

      // Add elevation shadow when scrolled slightly past top
      setIsScrolled(currentScrollY > 15);

      // Only appear when user reaches the top of the homepage
      if (currentScrollY <= 50) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setActiveDropdown(null);
      }
    };

    // Initial check in case page starts scrolled
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mobileMenuOpen, searchOpen]);

  // Focus search input when tray opens
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  // Handle Escape key to dismiss any open overlay
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveDropdown(null);
        setSearchOpen(false);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleMouseEnter = (key: string) => {
    if (dropdownTimeoutRef.current) {
      window.clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setActiveDropdown(key);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = window.setTimeout(() => {
      setActiveDropdown(null);
    }, 280);
  };

  const handleSearchSubmit = (e?: React.FormEvent, customQuery?: string) => {
    if (e) e.preventDefault();
    const queryToUse = customQuery || searchQuery;
    if (queryToUse.trim()) {
      navigate(`/products?search=${encodeURIComponent(queryToUse.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const handleNavClick = () => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  };



  // 2. Key Product Sectors (6 Global Trade Sectors with heading-specific colorful identities)
  const productSectors = [
    {
      id: 'agriculture',
      colorClass: 'sector-agri',
      icon: <Wheat size={20} strokeWidth={2.2} />,
      title: 'Agriculture',
      desc: 'Export-grade grains, wheat crops & fresh produce',
      pills: ['Grains', 'Wheat Crops', 'Fresh Produce'],
      to: '/products?category=agriculture',
    },
    {
      id: 'industrial-materials',
      colorClass: 'sector-industrial',
      icon: <Boxes size={20} strokeWidth={2.2} />,
      title: 'Industrial Materials',
      desc: 'Steel coils, metal tubing & manufacturing inputs',
      pills: ['Steel Coils', 'Metal Tubing', 'Bulk Inputs'],
      to: '/products?category=industrial-materials',
    },
    {
      id: 'food-commodities',
      colorClass: 'sector-food',
      icon: <Sparkles size={20} strokeWidth={2.2} />,
      title: 'Food Commodities',
      desc: 'Whole spices, export-grade pulses & culinary oils',
      pills: ['Whole Spices', 'Pulses & Lentils', 'Culinary Oils'],
      to: '/products?category=food-commodities',
    },
    {
      id: 'textiles-and-apparel',
      colorClass: 'sector-textiles',
      icon: <Layers size={20} strokeWidth={2.2} />,
      title: 'Textiles & Apparel',
      desc: 'Woven fabrics, bulk rolls, fine linens & garments',
      pills: ['Woven Fabrics', 'Fine Linens', 'Commercial Garments'],
      to: '/products?category=textiles-and-apparel',
    },
    {
      id: 'machinery-and-equipment',
      colorClass: 'sector-machinery',
      icon: <Cog size={20} strokeWidth={2.2} />,
      title: 'Machinery & Equipment',
      desc: 'Plant machinery, precision gears & hardware',
      pills: ['Plant Machinery', 'Precision Gears', 'Industrial Tooling'],
      to: '/products?category=machinery-and-equipment',
    },
    {
      id: 'energy-products',
      colorClass: 'sector-energy',
      icon: <Flame size={20} strokeWidth={2.2} />,
      title: 'Energy Products',
      desc: 'Petroleum commodities, refined fuels & lubricants',
      pills: ['Refined Fuels', 'Petrochemicals', 'Industrial Lubricants'],
      to: '/products?category=energy-products',
    },
  ];


  // Trending Commodity Search Tags
  const trendingSearches = [
    'Basmati Rice 1121',
    'Black Pepper 550GL',
    'Refined Sunflower Oil',
    'Green Cardamom',
    'Whole Chickpeas',
    'Turmeric Finger',
  ];

  return (
    <header
      className={`site-header ${!isVisible ? 'header-hidden' : ''} ${isScrolled ? 'header-scrolled' : ''}`}
      role="banner"
    >
      <div className="container site-header-inner">
        {/* ConceptExim Brand Logo */}
        <Link to="/" className="navbar-brand" onClick={handleNavClick} aria-label="ConceptExim Home">
          <img
            src="/assets/conceptexim-logo.png"
            alt="ConceptExim"
            className="navbar-brand-logo"
          />
        </Link>

        {/* Desktop Navigation with Rich Interactive Dropdowns */}
        <nav className="desktop-nav-menu" aria-label="Main Navigation">
          {/* 1. Home */}
          <div className="nav-item-wrapper">
            <NavLink
              to="/"
              end
              className={({ isActive }) => `nav-link-item ${isActive ? 'active' : ''}`}
            >
              Home
            </NavLink>
          </div>

          {/* 2. About Us */}
          <div className="nav-item-wrapper">
            <NavLink
              to="/about"
              className={({ isActive }) => `nav-link-item ${isActive ? 'active' : ''}`}
            >
              About Us
            </NavLink>
          </div>

          {/* 3. Products with Interactive Megamenu */}
          <div
            className={`nav-item-wrapper ${activeDropdown === 'products' ? 'is-open' : ''}`}
            onMouseEnter={() => handleMouseEnter('products')}
            onMouseLeave={handleMouseLeave}
          >
            <NavLink
              to="/products"
              className={({ isActive }) => `nav-link-item ${isActive ? 'active' : ''}`}
            >
              <span>Products</span>
              <ChevronDown size={13} className="nav-chevron-icon" aria-hidden="true" />
            </NavLink>

            <div
              className="dropdown-menu-pane megamenu-products-pane"
              onMouseEnter={() => handleMouseEnter('products')}
              onMouseLeave={handleMouseLeave}
              role="region"
              aria-label="Products Catalog Megamenu"
            >
              <div className="megamenu-simple-grid">
                {productSectors.map((sector, idx) => (
                  <Link
                    key={idx}
                    to={sector.to}
                    className={`dropdown-card-item megamenu-sector-card ${sector.colorClass}`}
                    onClick={handleNavClick}
                  >
                    <div className={`dropdown-card-icon sector-icon-box ${sector.colorClass}`}>
                      {sector.icon}
                    </div>
                    <div className="dropdown-card-content">
                      <div className="dropdown-card-header">
                        <span className="dropdown-card-title">{sector.title}</span>
                        <ArrowRight size={14} className="dropdown-card-arrow" />
                      </div>
                      <p className="dropdown-card-desc">{sector.desc}</p>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="dropdown-footer-strip">
                <Link to="/products" className="dropdown-footer-link" onClick={handleNavClick}>
                  <span>Browse All 52+ Commodities</span>
                  <ArrowRight size={14} />
                </Link>
                <div className="dropdown-footer-right">
                  <span className="dropdown-stat-pill">
                    <span className="stat-pill-indicator"></span>
                    Direct Origin QA • 45+ Countries
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 4. Services (Clean & Direct Link) */}
          <div className="nav-item-wrapper">
            <NavLink
              to="/services"
              className={({ isActive }) => `nav-link-item ${isActive ? 'active' : ''}`}
            >
              Services
            </NavLink>
          </div>

          {/* 5. Global Presence */}
          <div className="nav-item-wrapper">
            <NavLink
              to="/global-presence"
              className={({ isActive }) => `nav-link-item ${isActive ? 'active' : ''}`}
            >
              Global Presence
            </NavLink>
          </div>

          {/* 6. Quality & Compliance */}
          <div className="nav-item-wrapper">
            <NavLink
              to="/quality"
              className={({ isActive }) => `nav-link-item ${isActive ? 'active' : ''}`}
            >
              Quality &amp; Compliance
            </NavLink>
          </div>

          {/* 7. Contact */}
          <div className="nav-item-wrapper">
            <NavLink
              to="/contact"
              className={({ isActive }) => `nav-link-item ${isActive ? 'active' : ''}`}
            >
              Contact
            </NavLink>
          </div>
        </nav>

        {/* Action icons & Primary CTA */}
        <div className="navbar-actions">
          {/* User authenticated options: Search & RFQ Basket */}
          {isAuthenticated && (
            <>
              {/* Interactive Search toggle */}
              <button
                type="button"
                onClick={() => setSearchOpen(!searchOpen)}
                className="action-btn-circle"
                aria-label="Search commodities catalog"
                title="Search commodities"
              >
                {searchOpen ? <X size={17} /> : <Search size={17} />}
              </button>

              {/* Interactive Quote / RFQ Basket icon */}
              <button
                type="button"
                onClick={onOpenBasket}
                className="action-btn-circle"
                title="RFQ Quote Basket"
                aria-label="Open RFQ Quote Basket"
              >
                <ShoppingBag size={18} />
                <span className="basket-count-badge">
                  {totalCount}
                </span>
              </button>

              {/* User Account & Logout Menu */}
              <div ref={userMenuRef} style={{ position: 'relative' }}>
                <button
                  type="button"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="action-btn-circle"
                  style={{
                    width: 'auto',
                    padding: '0 12px',
                    borderRadius: '20px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    backgroundColor: 'rgba(6, 16, 36, 0.04)',
                    borderColor: 'rgba(212, 154, 54, 0.4)',
                    color: 'var(--color-navy-primary)',
                  }}
                  title={user?.fullName || 'My Account'}
                  aria-label="User profile and account options"
                >
                  <User size={15} color="var(--color-gold-hover)" />
                  <span>{user?.fullName?.split(' ')[0] || 'Account'}</span>
                  <ChevronDown
                    size={12}
                    style={{
                      transform: userMenuOpen ? 'rotate(180deg)' : 'none',
                      transition: 'transform 150ms',
                    }}
                  />
                </button>

                {userMenuOpen && (
                  <div
                    style={{
                      position: 'absolute',
                      right: 0,
                      top: 'calc(100% + 8px)',
                      backgroundColor: '#FFFFFF',
                      borderRadius: 'var(--radius-md)',
                      boxShadow: '0 12px 32px rgba(6, 16, 36, 0.16)',
                      border: '1px solid rgba(226, 232, 240, 0.95)',
                      padding: '8px 0',
                      minWidth: '200px',
                      zIndex: 1100,
                    }}
                  >
                    <div style={{ padding: '10px 16px', borderBottom: '1px solid #F1F5F9' }}>
                      <div style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--color-navy-primary)' }}>
                        {user?.fullName}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: '#64748B', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {user?.email}
                      </div>
                    </div>

                    {user?.role === 'admin' && (
                      <Link
                        to="/admin"
                        onClick={() => setUserMenuOpen(false)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 8,
                          padding: '10px 16px',
                          fontSize: '0.8125rem',
                          color: 'var(--color-gold-hover)',
                          fontWeight: 600,
                          textDecoration: 'none',
                        }}
                      >
                        Admin Portal
                      </Link>
                    )}

                    <button
                      type="button"
                      onClick={() => {
                        setUserMenuOpen(false);
                        logout();
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        width: '100%',
                        padding: '10px 16px',
                        fontSize: '0.8125rem',
                        color: '#EF4444',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        textAlign: 'left',
                      }}
                    >
                      <LogOut size={14} />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Primary Request Quote Button (Desktop) - Hidden when user is logged in */}
          {!isAuthenticated && onRequestQuote && (
            <button
              type="button"
              onClick={onRequestQuote}
              className="btn-nav-quote"
            >
              <span>Request a Quote</span>
              <ArrowRight size={14} />
            </button>
          )}

          {/* Mobile menu hamburger toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="action-btn-circle mobile-nav-toggle"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Interactive Expandable Search Tray with Trending Chips (only when authenticated) */}
      {isAuthenticated && searchOpen && (
        <div className="navbar-search-tray">
          <div className="container">
            <form onSubmit={handleSearchSubmit} className="search-input-wrap">
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search commodities (e.g. Basmati Rice, Black Pepper, Turmeric, Sunflower Oil...)"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="search-input-box"
              />
              <button type="submit" className="btn btn-primary btn-sm">
                Search
              </button>
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="btn btn-outline btn-sm"
              >
                Close
              </button>
            </form>

            {/* Trending Quick Search Chips */}
            <div className="search-trending-chips">
              <span className="trending-chip-label">Trending Commodities:</span>
              {trendingSearches.map((chip, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSearchSubmit(undefined, chip)}
                  className="trending-chip-btn"
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Interactive Accordion Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-menu-drawer">
          {/* Home */}
          <NavLink to="/" onClick={handleNavClick} className="mobile-nav-row">
            <span>Home</span>
          </NavLink>

          {/* About Us */}
          <NavLink to="/about" onClick={handleNavClick} className="mobile-nav-row">
            <span>About Us</span>
          </NavLink>

          {/* Products Accordion */}
          <div>
            <div
              className="mobile-nav-row"
              onClick={() => setMobileExpandedSection(mobileExpandedSection === 'products' ? null : 'products')}
            >
              <span>Products</span>
              <ChevronDown
                size={18}
                style={{
                  transform: mobileExpandedSection === 'products' ? 'rotate(180deg)' : 'none',
                  transition: 'transform 200ms ease',
                }}
              />
            </div>
            {mobileExpandedSection === 'products' && (
              <div className="mobile-sub-menu">
                {productSectors.map((sector, idx) => (
                  <Link
                    key={idx}
                    to={sector.to}
                    onClick={handleNavClick}
                    className={`mobile-sub-link mobile-sector-link ${sector.colorClass}`}
                  >
                    <div className={`mobile-sector-icon ${sector.colorClass}`}>
                      {sector.icon}
                    </div>
                    <div className="mobile-sector-info">
                      <span className="mobile-sector-title">{sector.title}</span>
                      <span className="mobile-sector-pills">{sector.pills.slice(0, 2).join(' • ')}</span>
                    </div>
                    <ArrowRight size={14} className="mobile-sector-arrow" />
                  </Link>
                ))}
                <Link to="/products" onClick={handleNavClick} className="mobile-sub-link mobile-sub-link-all">
                  <ArrowRight size={16} />
                  <span>View All 6 Key Sectors &amp; 52+ Products</span>
                </Link>
              </div>
            )}
          </div>

          {/* Services */}
          <NavLink to="/services" onClick={handleNavClick} className="mobile-nav-row">
            <span>Services</span>
          </NavLink>

          {/* Global Presence */}
          <NavLink to="/global-presence" onClick={handleNavClick} className="mobile-nav-row">
            <span>Global Presence</span>
          </NavLink>

          {/* Quality & Compliance */}
          <NavLink to="/quality" onClick={handleNavClick} className="mobile-nav-row">
            <span>Quality &amp; Compliance</span>
          </NavLink>

          {/* Contact */}
          <NavLink to="/contact" onClick={handleNavClick} className="mobile-nav-row">
            <span>Contact</span>
          </NavLink>

          {/* Mobile Auth & Quote Section */}
          {isAuthenticated && user ? (
            <div style={{ padding: '14px 16px', borderTop: '1px solid #E2E8F0', marginTop: 14 }}>
              <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-navy-primary)' }}>
                {user.fullName}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748B', marginBottom: 10 }}>
                {user.email}
              </div>
              {user.role === 'admin' && (
                <Link
                  to="/admin"
                  onClick={handleNavClick}
                  style={{ display: 'block', color: 'var(--color-gold-hover)', fontWeight: 600, marginBottom: 10, textDecoration: 'none', fontSize: '0.84rem' }}
                >
                  Admin Portal
                </Link>
              )}
              <button
                type="button"
                onClick={() => {
                  handleNavClick();
                  logout();
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  color: '#EF4444',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  fontSize: '0.84rem',
                  fontWeight: 600,
                }}
              >
                <LogOut size={15} />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div style={{ padding: '14px 16px', borderTop: '1px solid #E2E8F0', marginTop: 14, display: 'flex', gap: 12 }}>
              <Link
                to="/login"
                onClick={handleNavClick}
                className="btn btn-outline btn-sm"
                style={{ flex: 1, justifyContent: 'center' }}
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={handleNavClick}
                className="btn btn-primary btn-sm"
                style={{ flex: 1, justifyContent: 'center' }}
              >
                Register
              </Link>
            </div>
          )}

          {/* Mobile Quote Button - Hidden when user is logged in */}
          {!isAuthenticated && onRequestQuote && (
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onRequestQuote();
              }}
              className="btn btn-primary"
              style={{ marginTop: 12, width: '100%', justifyContent: 'center' }}
            >
              <span>Request a Quote</span>
              <ArrowRight size={16} />
            </button>
          )}
        </div>
      )}
    </header>
  );
};

