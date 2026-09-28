import React, { useState } from 'react';
import {
  Layout,
  Edit3,
  ExternalLink,
  Save,
} from 'lucide-react';

export const AdminWebsitePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'banners' | 'pages' | 'seo'>('banners');

  const sitePages = [
    { title: 'Home Page', path: '/', lastEdited: 'Today, 18:30', status: 'Published' },
    { title: 'About Us & Leadership', path: '/about', lastEdited: '22 Sep 2026', status: 'Published' },
    { title: 'Export & Import Products Catalog', path: '/products', lastEdited: '24 Sep 2026', status: 'Published' },
    { title: 'Global Trade Services', path: '/services', lastEdited: '20 Sep 2026', status: 'Published' },
    { title: 'Global Presence & Corridors', path: '/global-presence', lastEdited: '25 Sep 2026', status: 'Published' },
    { title: 'Quality Assurance & Certifications', path: '/quality', lastEdited: '19 Sep 2026', status: 'Published' },
    { title: 'Contact & Commercial Enquiries', path: '/contact', lastEdited: 'Yesterday', status: 'Published' },
  ];

  return (
    <div className="admin-subpage-container">
      {/* Top Header */}
      <div className="admin-subpage-header">
        <div>
          <div className="admin-subpage-badge">
            <Layout size={14} /> Content Management System
          </div>
          <h1 className="admin-subpage-title">Website Management & Digital Storefront</h1>
          <p className="admin-subpage-desc">
            Directly update public hero banners, trade sector showcases, SEO meta descriptions, and legal policies.
          </p>
        </div>
        <div className="admin-subpage-actions">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="admin-btn-secondary"
            style={{ textDecoration: 'none' }}
          >
            <ExternalLink size={15} /> View Live Website
          </a>
          <button className="admin-btn-primary" onClick={() => alert('CMS changes published successfully!')}>
            <Save size={15} /> Publish All Changes
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="admin-subpage-filter-row" style={{ borderBottom: '1px solid #E2E8F0', paddingBottom: 14 }}>
        <div className="admin-subpage-filter-group" style={{ margin: 0 }}>
          <button
            className={`filter-pill ${activeTab === 'banners' ? 'active' : ''}`}
            onClick={() => setActiveTab('banners')}
          >
            Hero Banners & Visuals
          </button>
          <button
            className={`filter-pill ${activeTab === 'pages' ? 'active' : ''}`}
            onClick={() => setActiveTab('pages')}
          >
            Public Pages & Sections
          </button>
          <button
            className={`filter-pill ${activeTab === 'seo' ? 'active' : ''}`}
            onClick={() => setActiveTab('seo')}
          >
            Global SEO & Metadata
          </button>
        </div>
      </div>

      {activeTab === 'banners' && (
        <div className="admin-subpage-hubs-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
          <div className="admin-hub-card">
            <div className="hub-card-header">
              <span className="hub-flag">🚢</span>
              <div>
                <h4 className="hub-country">Hero Maritime Showcase</h4>
                <div className="hub-city">Main Homepage Banner</div>
              </div>
              <span className="hub-role-badge">Active</span>
            </div>
            <div className="hub-card-body">
              <p style={{ fontSize: '0.825rem', color: '#475569', margin: '8px 0' }}>
                Headline: <strong>"Bridging Global Markets with Trust, Quality, and Speed."</strong>
              </p>
              <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
                Asset: <code>/assets/home/hero-shipping.jpg</code>
              </div>
            </div>
            <div className="hub-card-footer">
              <button className="hub-link-btn" onClick={() => alert('Opening banner media editor...')}>
                <Edit3 size={13} />
                <span>Edit Media & Typography</span>
              </button>
            </div>
          </div>

          <div className="admin-hub-card">
            <div className="hub-card-header">
              <span className="hub-flag">🌾</span>
              <div>
                <h4 className="hub-country">Agro-Commodities Feature</h4>
                <div className="hub-city">Products Catalog Hero</div>
              </div>
              <span className="hub-role-badge">Active</span>
            </div>
            <div className="hub-card-body">
              <p style={{ fontSize: '0.825rem', color: '#475569', margin: '8px 0' }}>
                Headline: <strong>"Sourced from Origin. Delivered to Any Port Worldwide."</strong>
              </p>
              <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
                Asset: <code>/assets/categories/rice-grains.jpg</code>
              </div>
            </div>
            <div className="hub-card-footer">
              <button className="hub-link-btn" onClick={() => alert('Opening banner media editor...')}>
                <Edit3 size={13} />
                <span>Edit Media & Typography</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'pages' && (
        <div className="admin-subpage-table-card">
          <div className="admin-table-responsive">
            <table className="admin-subpage-table">
              <thead>
                <tr>
                  <th>Page Title</th>
                  <th>Route URL</th>
                  <th>Last Modified</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {sitePages.map((page, idx) => (
                  <tr key={idx}>
                    <td>
                      <div className="table-bold-cell">{page.title}</div>
                    </td>
                    <td>
                      <code style={{ fontSize: '0.8rem', color: '#2563EB' }}>{page.path}</code>
                    </td>
                    <td>
                      <div className="table-muted-sub">{page.lastEdited}</div>
                    </td>
                    <td>
                      <span className="ship-status-badge delivered">{page.status}</span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button
                        className="table-action-icon-btn"
                        title="Edit Page Content"
                        onClick={() => alert(`Opening visual page editor for ${page.title}...`)}
                      >
                        <Edit3 size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'seo' && (
        <div className="admin-subpage-table-card" style={{ padding: 24 }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0F172A', marginBottom: 16 }}>
            Global Meta Tags & Canonical OpenGraph
          </h3>
          <div className="admin-form-group" style={{ marginBottom: 16 }}>
            <label className="admin-form-label">Global Default Site Title</label>
            <input
              type="text"
              className="admin-form-input"
              defaultValue="ConceptExim | Global Trade, Import & Export Enterprise"
            />
          </div>
          <div className="admin-form-group" style={{ marginBottom: 16 }}>
            <label className="admin-form-label">Meta Description</label>
            <textarea
              rows={3}
              className="admin-form-textarea"
              defaultValue="ConceptExim is an international trade enterprise connecting agricultural commodities, industrial raw materials, and global shipping corridors across 45+ countries."
            />
          </div>
          <button className="admin-btn-primary" onClick={() => alert('SEO Meta tags updated!')}>
            <Save size={15} /> Save SEO Configuration
          </button>
        </div>
      )}
    </div>
  );
};
