import React, { useState, useRef, useEffect } from 'react';
import {
  Menu,
  Search,
  Bell,
  ChevronDown,
  LogOut,
  ExternalLink,
  Shield,
  Clock,
  CheckCircle2,
  AlertCircle,
  Plus,
  Ship,
  FileText,
  Package,
  Building2,
  Activity,
  X,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext.js';
import { Link, useNavigate } from 'react-router-dom';

interface AdminHeaderProps {
  isCollapsed?: boolean;
  onToggleSidebar: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ isCollapsed, onToggleSidebar }) => {
  const { user, logout } = useAuth();
  const [activeDropdown, setActiveDropdown] = useState<'notif' | 'create' | 'user' | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [notifFilter, setNotifFilter] = useState<'all' | 'shipment' | 'rfq' | 'compliance'>('all');
  
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'shipment',
      icon: <CheckCircle2 size={16} color="#10B981" />,
      title: 'Container Vessel MSC ADRIATIC',
      desc: 'Cleared customs at Port of Rotterdam (NL). Discharging 40x HQ Containers.',
      time: '12m ago',
      read: false,
    },
    {
      id: 2,
      type: 'rfq',
      icon: <Clock size={16} color="#3B82F6" />,
      title: 'New High-Volume RFQ #CEX-2025-094',
      desc: 'Al-Mansoor Trading LLC requested quotes for 5,000 MT Basmati Rice.',
      time: '45m ago',
      read: false,
    },
    {
      id: 3,
      type: 'compliance',
      icon: <AlertCircle size={16} color="#F59E0B" />,
      title: 'Quality Audit Recertification',
      desc: 'ISO 9001:2015 periodic audit verification due in 15 days.',
      time: '2h ago',
      read: false,
    },
  ]);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();

  // Keyboard shortcuts: ⌘K or Ctrl+K to search, Esc to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
        setSearchFocused(true);
      }
      if (e.key === 'Escape') {
        setSearchFocused(false);
        setActiveDropdown(null);
        searchInputRef.current?.blur();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Click outside listener to close dropdowns
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
        setSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const rawFullName = user?.fullName || 'Rahul Mehta';
  // Compact single-line name for the top bar capsule (max ~14 chars)
  const compactName = rawFullName.includes('System Administrator') 
    ? 'System Admin' 
    : rawFullName.length > 15 
      ? rawFullName.split(' ')[0] 
      : rawFullName;

  const adminRole = user?.role === 'admin' ? 'Super Admin' : 'Operations Admin';
  const initials = rawFullName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  const searchSuggestions = [
    {
      type: 'Shipment',
      icon: <Ship size={15} color="#06B6D4" />,
      title: 'MSC ADRIATIC #MS-9402',
      meta: 'Rotterdam Port • Discharging',
      link: '/admin/orders',
    },
    {
      type: 'RFQ',
      icon: <FileText size={15} color="#F59E0B" />,
      title: 'Basmati Rice 5,000 MT (#CEX-2025)',
      meta: 'Al-Mansoor Trading • High Priority',
      link: '/admin/enquiries',
    },
    {
      type: 'Product',
      icon: <Package size={15} color="#10B981" />,
      title: 'Indian Non-Basmati Parboiled Rice',
      meta: 'HS Code 1006.30 • 12 Verified Suppliers',
      link: '/admin/products',
    },
    {
      type: 'Supplier',
      icon: <Building2 size={15} color="#8B5CF6" />,
      title: 'Gujarat Spice Exporters Ltd',
      meta: 'Mundra SEZ • Verified Grade A',
      link: '/admin/suppliers',
    },
  ];

  const filteredSearch = searchQuery.trim()
    ? searchSuggestions.filter((s) =>
        s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.meta.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.type.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : searchSuggestions;

  const filteredNotifications = notifFilter === 'all'
    ? notifications
    : notifications.filter((n) => n.type === notifFilter);

  return (
    <header className="admin-header" ref={headerRef}>
      {/* Left Cluster: Hamburger + Omni-Search */}
      <div className="admin-header-left">
        <button
          onClick={onToggleSidebar}
          className={`admin-hamburger-btn ${isCollapsed ? 'is-collapsed' : ''}`}
          aria-label={isCollapsed ? 'Expand navigation rail (Ctrl+B)' : 'Collapse navigation rail (Ctrl+B)'}
          title={isCollapsed ? 'Expand navigation rail (Ctrl+B)' : 'Collapse navigation rail (Ctrl+B)'}
        >
          <Menu size={19} />
        </button>

        {/* Global Omni-Search */}
        <div className="admin-header-search-wrap">
          <div className={`admin-header-search ${searchFocused ? 'is-focused' : ''}`}>
            <Search size={16} className="admin-search-icon" />
            <input
              ref={searchInputRef}
              type="text"
              className="admin-search-input"
              value={searchQuery}
              onFocus={() => setSearchFocused(true)}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search shipments, HS codes, clients, RFQs..."
            />
            {searchQuery ? (
              <button
                className="admin-search-clear-btn"
                onClick={() => {
                  setSearchQuery('');
                  searchInputRef.current?.focus();
                }}
                title="Clear query"
              >
                <X size={14} />
              </button>
            ) : (
              <span className="admin-search-kbd">⌘K</span>
            )}
          </div>

          {/* Interactive Command Palette Dropdown */}
          {searchFocused && (
            <div className="admin-omni-palette">
              <div className="admin-palette-header">
                <span className="admin-palette-title">
                  <Sparkles size={13} color="#2563EB" />
                  <span>Quick Intelligence Search</span>
                </span>
                <span className="admin-palette-shortcut">ESC to close</span>
              </div>

              <div className="admin-palette-list">
                {filteredSearch.length > 0 ? (
                  filteredSearch.map((item, idx) => (
                    <div
                      key={idx}
                      className="admin-palette-item"
                      onClick={() => {
                        setSearchFocused(false);
                        navigate(item.link);
                      }}
                    >
                      <div className="admin-palette-icon">{item.icon}</div>
                      <div className="admin-palette-info">
                        <div className="admin-palette-item-title">{item.title}</div>
                        <div className="admin-palette-item-meta">{item.meta}</div>
                      </div>
                      <span className="admin-palette-tag">{item.type}</span>
                    </div>
                  ))
                ) : (
                  <div className="admin-palette-empty">
                    No results matching "<strong>{searchQuery}</strong>". Try searching by port, commodity, or code.
                  </div>
                )}
              </div>

              <div className="admin-palette-footer">
                <span>Tip: Press <strong>⌘K</strong> anywhere to jump search</span>
                <span>Enter <strong>↵</strong> to open</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Cluster: Live Telemetry + Quick Action + Dropdowns */}
      <div className="admin-header-actions">
        {/* Telemetry Pill */}
        <div className="admin-telemetry-chip" title="Live Cloud Latency 22ms • All systems operational">
          <span className="admin-telemetry-dot" />
          <span className="admin-telemetry-text">22ms Live</span>
        </div>

        {/* Quick Action Button */}
        <div className="admin-dropdown-wrap">
          <button
            className={`admin-header-action-btn ${activeDropdown === 'create' ? 'active' : ''}`}
            onClick={() => setActiveDropdown(activeDropdown === 'create' ? null : 'create')}
          >
            <Plus size={14} />
            <span>Create</span>
            <ChevronDown size={12} className={`admin-chevron ${activeDropdown === 'create' ? 'rotated' : ''}`} />
          </button>

          {activeDropdown === 'create' && (
            <div className="admin-menu-flyout admin-create-flyout">
              <div className="admin-flyout-label">Quick Logistics Actions</div>
              <div
                className="admin-flyout-item"
                onClick={() => {
                  setActiveDropdown(null);
                  navigate('/admin/orders');
                }}
              >
                <div className="admin-flyout-icon cyan"><Ship size={15} /></div>
                <div>
                  <div className="admin-flyout-item-name">New Shipment Consignment</div>
                  <div className="admin-flyout-item-sub">Create maritime container bill of lading</div>
                </div>
              </div>
              <div
                className="admin-flyout-item"
                onClick={() => {
                  setActiveDropdown(null);
                  navigate('/admin/enquiries');
                }}
              >
                <div className="admin-flyout-icon amber"><FileText size={15} /></div>
                <div>
                  <div className="admin-flyout-item-name">Generate Commercial RFQ</div>
                  <div className="admin-flyout-item-sub">Draft quotation & proforma invoice</div>
                </div>
              </div>
              <div
                className="admin-flyout-item"
                onClick={() => {
                  setActiveDropdown(null);
                  navigate('/admin/products');
                }}
              >
                <div className="admin-flyout-icon emerald"><Package size={15} /></div>
                <div>
                  <div className="admin-flyout-item-name">Register Commodity HS Code</div>
                  <div className="admin-flyout-item-sub">Add product grade specifications</div>
                </div>
              </div>
              <div
                className="admin-flyout-item"
                onClick={() => {
                  setActiveDropdown(null);
                  navigate('/admin/suppliers');
                }}
              >
                <div className="admin-flyout-icon purple"><Building2 size={15} /></div>
                <div>
                  <div className="admin-flyout-item-name">Onboard Trade Supplier</div>
                  <div className="admin-flyout-item-sub">Verify compliance & port loading access</div>
                </div>
              </div>
            </div>
          )}
        </div>


        {/* Notifications Hub */}
        <div className="admin-dropdown-wrap">
          <button
            className={`admin-notification-btn ${activeDropdown === 'notif' ? 'active' : ''}`}
            onClick={() => setActiveDropdown(activeDropdown === 'notif' ? null : 'notif')}
            aria-label="Activity alerts"
          >
            <Bell size={19} />
            {unreadCount > 0 && (
              <span className="admin-notification-pill">{unreadCount}</span>
            )}
          </button>

          {activeDropdown === 'notif' && (
            <div className="admin-menu-flyout admin-notif-flyout">
              <div className="admin-notif-header">
                <div>
                  <div className="admin-notif-title">Operational Alerts</div>
                  <div className="admin-notif-sub">{unreadCount} high-priority updates</div>
                </div>
                {unreadCount > 0 && (
                  <button onClick={markAllAsRead} className="admin-notif-mark-btn">
                    Mark all read
                  </button>
                )}
              </div>

              {/* Filter Tabs */}
              <div className="admin-notif-tabs">
                {[
                  { id: 'all', label: 'All' },
                  { id: 'shipment', label: 'Shipments' },
                  { id: 'rfq', label: 'RFQs' },
                  { id: 'compliance', label: 'Audit' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setNotifFilter(tab.id as any)}
                    className={`admin-notif-tab ${notifFilter === tab.id ? 'active' : ''}`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="admin-notif-scroll">
                {filteredNotifications.length > 0 ? (
                  filteredNotifications.map((n) => (
                    <div
                      key={n.id}
                      className={`admin-notif-card ${!n.read ? 'unread' : ''}`}
                      onClick={() => {
                        setNotifications((prev) =>
                          prev.map((item) => (item.id === n.id ? { ...item, read: true } : item))
                        );
                      }}
                    >
                      <div className="admin-notif-icon-wrap">{n.icon}</div>
                      <div className="admin-notif-content">
                        <div className="admin-notif-card-title">{n.title}</div>
                        <div className="admin-notif-card-desc">{n.desc}</div>
                        <div className="admin-notif-card-time">{n.time}</div>
                      </div>
                      {!n.read && <span className="admin-notif-unread-dot" />}
                    </div>
                  ))
                ) : (
                  <div className="admin-notif-empty">No updates in this filter.</div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Capsule */}
        <div className="admin-dropdown-wrap">
          <div
            className={`admin-user-profile ${activeDropdown === 'user' ? 'active' : ''}`}
            onClick={() => setActiveDropdown(activeDropdown === 'user' ? null : 'user')}
          >
            <div className="admin-user-avatar-wrap">
              <div className="admin-user-avatar">{initials}</div>
              <span className="admin-user-online-badge" />
            </div>
            <div className="admin-user-meta">
              <span className="admin-user-name">{compactName}</span>
              <span className="admin-user-role-badge">{adminRole}</span>
            </div>
            <ChevronDown size={13} className={`admin-chevron ${activeDropdown === 'user' ? 'rotated' : ''}`} />
          </div>

          {activeDropdown === 'user' && (
            <div className="admin-menu-flyout admin-user-flyout">
              <div className="admin-user-flyout-header">
                <div className="admin-user-avatar lg">{initials}</div>
                <div className="admin-user-flyout-info">
                  <div className="admin-user-flyout-name">{rawFullName}</div>
                  <div className="admin-user-flyout-email">{user?.email || 'admin@conceptexim.com'}</div>
                  <span className="admin-user-verified-tag">
                    <Shield size={11} /> Verified Super Admin
                  </span>
                </div>
              </div>

              <div className="admin-flyout-links">
                <Link
                  to="/"
                  target="_blank"
                  className="admin-flyout-link"
                  onClick={() => setActiveDropdown(null)}
                >
                  <ExternalLink size={15} />
                  <span>Public ConceptExim Portal</span>
                </Link>

                <Link
                  to="/admin/settings"
                  className="admin-flyout-link"
                  onClick={() => setActiveDropdown(null)}
                >
                  <Shield size={15} />
                  <span>Security & Access Control</span>
                </Link>

                <a
                  href="#analytics"
                  className="admin-flyout-link"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveDropdown(null);
                    const el = document.getElementById('analytics-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <Activity size={15} />
                  <span>Audit Logs & Telemetry</span>
                </a>
              </div>

              <div className="admin-flyout-divider" />

              <button onClick={handleLogout} className="admin-flyout-logout-btn">
                <LogOut size={15} />
                <span>Sign Out of Dashboard</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
