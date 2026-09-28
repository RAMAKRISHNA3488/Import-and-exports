import React, { useState } from 'react';
import {
  UserCog,
  Users,
  Shield,
  Plus,
  Search,
  CheckCircle2,
  Key,
  Edit,
} from 'lucide-react';

interface StaffUser {
  id: string;
  name: string;
  email: string;
  role: 'Super Administrator' | 'Logistics & Fleet Manager' | 'Trade Finance Officer' | 'Customs & Compliance Lead';
  status: 'Active' | 'Invited' | 'Suspended';
  twoFactor: boolean;
  lastLogin: string;
}

export const AdminUsersPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const users: StaffUser[] = [
    {
      id: 'usr-1',
      name: 'Ragala Administrator',
      email: 'admin@ionindustries.com',
      role: 'Super Administrator',
      status: 'Active',
      twoFactor: true,
      lastLogin: 'Just now (Current Session)',
    },
    {
      id: 'usr-2',
      name: 'Marcus Vance',
      email: 'marcus.vance@conceptexim.com',
      role: 'Logistics & Fleet Manager',
      status: 'Active',
      twoFactor: true,
      lastLogin: 'Today, 14:22',
    },
    {
      id: 'usr-3',
      name: 'Priya Sundaram',
      email: 'priya.s@conceptexim.com',
      role: 'Customs & Compliance Lead',
      status: 'Active',
      twoFactor: true,
      lastLogin: 'Yesterday, 17:05',
    },
    {
      id: 'usr-4',
      name: 'David Steinberg',
      email: 'david.s@conceptexim.com',
      role: 'Trade Finance Officer',
      status: 'Active',
      twoFactor: false,
      lastLogin: '24 Sep 2026',
    },
  ];

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-subpage-container">
      {/* Top Header */}
      <div className="admin-subpage-header">
        <div>
          <div className="admin-subpage-badge">
            <UserCog size={14} /> Team & Role-Based Access Control
          </div>
          <h1 className="admin-subpage-title">Users, Staff & Security Roles</h1>
          <p className="admin-subpage-desc">
            Granular access controls, 2-Factor Authentication enforcement, and administrative privilege management for commercial trade staff.
          </p>
        </div>
        <div className="admin-subpage-actions">
          <button className="admin-btn-primary" onClick={() => alert('Invite member dialog opened')}>
            <Plus size={15} /> Invite Team Member
          </button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="admin-subpage-kpi-grid">
        <div className="admin-subpage-kpi-card">
          <div className="kpi-icon-wrap blue">
            <Users size={20} />
          </div>
          <div className="kpi-data">
            <div className="kpi-label">Active Staff Members</div>
            <div className="kpi-value">{users.length}</div>
            <div className="kpi-sub green">Across 4 departments</div>
          </div>
        </div>

        <div className="admin-subpage-kpi-card">
          <div className="kpi-icon-wrap emerald">
            <Shield size={20} />
          </div>
          <div className="kpi-data">
            <div className="kpi-label">2FA Compliance</div>
            <div className="kpi-value">75%</div>
            <div className="kpi-sub green">Mandatory for finance & admin</div>
          </div>
        </div>

        <div className="admin-subpage-kpi-card">
          <div className="kpi-icon-wrap amber">
            <Key size={20} />
          </div>
          <div className="kpi-data">
            <div className="kpi-label">Security Roles</div>
            <div className="kpi-value">5 Defined</div>
            <div className="kpi-sub amber">RBAC Enforced</div>
          </div>
        </div>

        <div className="admin-subpage-kpi-card">
          <div className="kpi-icon-wrap purple">
            <CheckCircle2 size={20} />
          </div>
          <div className="kpi-data">
            <div className="kpi-label">Audit Log Integrity</div>
            <div className="kpi-value">100%</div>
            <div className="kpi-sub green">Immutable event recording</div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="admin-subpage-filter-row">
        <div className="admin-subpage-search">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search staff members by name, email, role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="admin-subpage-table-card">
        <div className="admin-table-responsive">
          <table className="admin-subpage-table">
            <thead>
              <tr>
                <th>User / Name</th>
                <th>Assigned Role</th>
                <th>2FA Security</th>
                <th>Last Active Session</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((u) => (
                <tr key={u.id}>
                  <td>
                    <div className="table-bold-cell">{u.name}</div>
                    <div className="table-muted-sub">{u.email}</div>
                  </td>
                  <td>
                    <span className="hub-role-badge">{u.role}</span>
                  </td>
                  <td>
                    {u.twoFactor ? (
                      <span style={{ color: '#059669', fontSize: '0.8rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
                        <Shield size={13} /> Enabled
                      </span>
                    ) : (
                      <span style={{ color: '#D97706', fontSize: '0.8rem', fontWeight: 600 }}>
                        Disabled
                      </span>
                    )}
                  </td>
                  <td>
                    <div className="table-muted-sub">{u.lastLogin}</div>
                  </td>
                  <td>
                    <span className="ship-status-badge delivered">{u.status}</span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 8 }}>
                      <button
                        className="table-action-icon-btn"
                        title="Edit Permissions"
                        onClick={() => alert(`Edit permissions for ${u.name}`)}
                      >
                        <Edit size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
