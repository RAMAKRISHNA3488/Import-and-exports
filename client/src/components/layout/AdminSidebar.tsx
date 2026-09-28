import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Home,
  Mail,
  Users,
  Package,
  Truck,
  ClipboardList,
  FileSpreadsheet,
  Globe,
  Handshake,
  FileText,
  CreditCard,
  BarChart3,
  Megaphone,
  Layout,
  UserCog,
  Settings,
  Search,
  X,
} from 'lucide-react';

interface AdminSidebarProps {
  isOpen: boolean;
  isCollapsed?: boolean;
  onCloseMobile: () => void;
}

interface MenuItemConfig {
  id: string;
  label: string;
  path: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  colorClass: string;
  badge?: string | number;
  badgeVariant?: 'gold' | 'default';
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  isOpen,
  isCollapsed = false,
  onCloseMobile,
}) => {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [filterQuery, setFilterQuery] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }) +
          ' ' +
          now.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  // The 16 Options in EXACT ORDER as per Reference Image 1 (Clean single-row links, no expanding sub-pills)
  const menuItems: MenuItemConfig[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      path: '/admin',
      icon: Home,
      colorClass: 'nav-color-blue',
    },
    {
      id: 'enquiries',
      label: 'Enquiries',
      path: '/admin/enquiries',
      icon: Mail,
      badge: 12,
      badgeVariant: 'gold',
      colorClass: 'nav-color-amber',
    },
    {
      id: 'clients',
      label: 'Clients',
      path: '/admin/customers',
      icon: Users,
      colorClass: 'nav-color-rose',
    },
    {
      id: 'products',
      label: 'Products',
      path: '/admin/products',
      icon: Package,
      colorClass: 'nav-color-emerald',
    },
    {
      id: 'shipments',
      label: 'Shipments',
      path: '/admin/shipments',
      icon: Truck,
      colorClass: 'nav-color-cyan',
    },
    {
      id: 'orders',
      label: 'Orders',
      path: '/admin/orders',
      icon: ClipboardList,
      colorClass: 'nav-color-indigo',
    },
    {
      id: 'quotes',
      label: 'Quotes',
      path: '/admin/quotes',
      icon: FileSpreadsheet,
      colorClass: 'nav-color-amber',
    },
    {
      id: 'global-presence',
      label: 'Global Presence',
      path: '/admin/global-presence',
      icon: Globe,
      colorClass: 'nav-color-teal',
    },
    {
      id: 'partners',
      label: 'Partners',
      path: '/admin/suppliers',
      icon: Handshake,
      colorClass: 'nav-color-purple',
    },
    {
      id: 'documents',
      label: 'Documents',
      path: '/admin/documents',
      icon: FileText,
      colorClass: 'nav-color-blue',
    },
    {
      id: 'payments',
      label: 'Payments',
      path: '/admin/payments',
      icon: CreditCard,
      colorClass: 'nav-color-emerald',
    },
    {
      id: 'reports',
      label: 'Reports',
      path: '/admin/reports',
      icon: BarChart3,
      colorClass: 'nav-color-indigo',
    },
    {
      id: 'marketing',
      label: 'Marketing',
      path: '/admin/marketing',
      icon: Megaphone,
      colorClass: 'nav-color-rose',
    },
    {
      id: 'website-management',
      label: 'Website Management',
      path: '/admin/website',
      icon: Layout,
      colorClass: 'nav-color-teal',
    },
    {
      id: 'users-roles',
      label: 'Users & Roles',
      path: '/admin/users',
      icon: UserCog,
      colorClass: 'nav-color-purple',
    },
    {
      id: 'settings',
      label: 'Settings',
      path: '/admin/settings',
      icon: Settings,
      colorClass: 'nav-color-slate',
    },
  ];

  const visibleMenuItems = menuItems.filter((item) =>
    item.label.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <>
      {isOpen && <div className="admin-sidebar-backdrop" onClick={onCloseMobile} />}
      <aside className={`admin-sidebar ${isOpen ? 'open' : ''} ${isCollapsed ? 'collapsed' : ''}`}>
        {/* Header Branding */}
        <div className="admin-sidebar-header">
          <div className="admin-logo-badge" data-tooltip="ConceptExim Global Trade">
            <span>C</span>
          </div>
          <div className="admin-logo-info">
            <div className="admin-logo-title">
              Concept<span>Exim</span>
            </div>
            <div className="admin-logo-tagline">Global Trade. Greater Horizons.</div>
          </div>
        </div>

        {/* Quick Search Filter (Expanded Mode Only) */}
        {!isCollapsed && (
          <div className="admin-sidebar-search-box">
            <Search size={14} className="sidebar-search-icon" />
            <input
              type="text"
              placeholder="Search 16 options..."
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              className="admin-sidebar-search-input"
            />
            {filterQuery && (
              <button
                type="button"
                onClick={() => setFilterQuery('')}
                className="admin-sidebar-search-clear"
                title="Clear filter"
              >
                <X size={12} />
              </button>
            )}
          </div>
        )}

        {/* Navigation List */}
        <div className="admin-nav-section-title">Navigation</div>
        <nav className="admin-nav-list">
          {visibleMenuItems.map((item) => {
            const IconComponent = item.icon;

            return (
              <NavLink
                key={item.id}
                to={item.path}
                end={item.path === '/admin'}
                onClick={onCloseMobile}
                className={({ isActive }) =>
                  `admin-nav-item ${item.colorClass} ${isActive ? 'active' : ''} ${
                    item.id === 'dashboard' && isActive ? 'ref-active-pill' : ''
                  }`
                }
                data-tooltip={`${item.label}${item.badge ? ` (${item.badge})` : ''}`}
              >
                <div className="admin-nav-icon-box">
                  <IconComponent size={19} />
                </div>
                {!isCollapsed && <span className="admin-nav-text">{item.label}</span>}

                {/* Badge */}
                {item.badge && !isCollapsed && (
                  <span className={`admin-nav-badge ${item.badgeVariant || ''}`}>
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Sidebar Bottom Anchored Section */}
        <div className="admin-sidebar-bottom">
          {/* System Online Status Pill */}
          <div
            className="admin-sidebar-status"
            data-tooltip={`System Live: 99.98% Uptime • ${currentTime || 'Online'}`}
          >
            <div className="admin-status-indicator">
              <span className="admin-pulse-dot" />
              <span>System Online</span>
            </div>
            <div className="admin-status-time">Last updated: {currentTime || 'Loading...'}</div>
          </div>

          {/* Bottom Logo Tag */}
          <div className="admin-sidebar-footer-brand" data-tooltip="ConceptExim Enterprise Platform v2.5">
            <div className="admin-footer-brand-badge">C</div>
            <span>ConceptExim Enterprise v2.5</span>
          </div>
        </div>
      </aside>
    </>
  );
};
