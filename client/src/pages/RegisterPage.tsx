import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Building, Mail, Phone, Lock, Globe, MapPin } from 'lucide-react';
import { useAuth } from '../context/AuthContext.js';
import { useToast } from '../context/ToastContext.js';
import { Button } from '../components/common/Button.js';
import { Input } from '../components/common/Input.js';
import { Select } from '../components/common/Select.js';

export const RegisterPage: React.FC = () => {
  const [role, setRole] = useState<'customer' | 'supplier'>('customer');
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    country: '',
    city: '',
    businessType: 'Importer / Wholesaler',
    agreed: false,
  });
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const businessTypeOptions = [
    { value: 'Importer / Wholesaler', label: 'Importer / Wholesaler' },
    { value: 'Food Distributor', label: 'Food Distributor' },
    { value: 'Supermarket / Retail Chain', label: 'Supermarket / Retail Chain' },
    { value: 'Manufacturer / Food Processor', label: 'Manufacturer / Food Processor' },
    { value: 'Agricultural Grower / Mill', label: 'Agricultural Grower / Mill' },
    { value: 'Trade Broker / Agent', label: 'Trade Broker / Agent' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      showToast('Passwords do not match', 'error');
      return;
    }

    if (!formData.agreed) {
      showToast('Please agree to the Terms & Conditions and Privacy Policy', 'error');
      return;
    }

    setLoading(true);
    const res = await register({
      fullName: formData.fullName,
      companyName: formData.companyName,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
      country: formData.country,
      city: formData.city,
      businessType: formData.businessType,
      role: 'customer',
    });
    setLoading(false);

    if (res.success) {
      showToast('Registration successful! Welcome to ConceptExim.', 'success');
      navigate('/');
    } else {
      showToast(res.error || 'Registration failed', 'error');
    }
  };

  return (
    <div style={{ backgroundColor: '#F8FAFC', minHeight: 'calc(100vh - var(--header-height, 70px) - 160px)', padding: '36px 0 48px' }}>
      <div className="container" style={{ maxWidth: 680 }}>
        <div className="card" style={{ padding: '36px 32px' }}>
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <h2
              className="font-serif"
              style={{ fontSize: '1.875rem', fontWeight: 700, color: 'var(--color-navy-primary)' }}
            >
              Create Trade Account
            </h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginTop: 4 }}>
              Register for international commodity procurement and supplier RFQs
            </p>
          </div>

          {/* Role selector matching Slide 11 */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 16,
              marginBottom: 24,
            }}
          >
            <div
              onClick={() => setRole('customer')}
              style={{
                border: `2px solid ${role === 'customer' ? 'var(--color-gold-primary)' : 'var(--color-border-subtle)'}`,
                borderRadius: 'var(--radius-md)',
                padding: '16px',
                cursor: 'pointer',
                backgroundColor: role === 'customer' ? 'var(--color-gold-light)' : '#FFFFFF',
                transition: 'all 150ms',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <User size={20} color={role === 'customer' ? 'var(--color-gold-hover)' : '#64748B'} />
                <strong>Buyer Account</strong>
              </div>
              <p style={{ fontSize: '0.75rem', color: '#64748B', marginTop: 4 }}>
                Source agro-commodities globally with FOB/CIF quotes
              </p>
            </div>

            <div
              onClick={() => setRole('supplier')}
              style={{
                border: `2px solid ${role === 'supplier' ? 'var(--color-gold-primary)' : 'var(--color-border-subtle)'}`,
                borderRadius: 'var(--radius-md)',
                padding: '16px',
                cursor: 'pointer',
                backgroundColor: role === 'supplier' ? 'var(--color-gold-light)' : '#FFFFFF',
                transition: 'all 150ms',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Building size={20} color={role === 'supplier' ? 'var(--color-gold-hover)' : '#64748B'} />
                <strong>Supplier / Producer</strong>
              </div>
              <p style={{ fontSize: '0.75rem', color: '#64748B', marginTop: 4 }}>
                List your products and expand export reach
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <Input
                label="Full Name"
                required
                placeholder="e.g. Maria Silva"
                value={formData.fullName}
                onChange={e => setFormData({ ...formData, fullName: e.target.value })}
              />
              <Input
                label="Company Name"
                placeholder="e.g. Silva Alimentos Brasil"
                value={formData.companyName}
                onChange={e => setFormData({ ...formData, companyName: e.target.value })}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <Input
                label="Email Address"
                type="email"
                required
                placeholder="contact@company.com"
                icon={<Mail size={18} />}
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
              />
              <Input
                label="Phone Number"
                placeholder="+55 11 98765 4321"
                icon={<Phone size={18} />}
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <Input
                label="Password"
                type="password"
                required
                placeholder="Min 6 characters"
                icon={<Lock size={18} />}
                value={formData.password}
                onChange={e => setFormData({ ...formData, password: e.target.value })}
              />
              <Input
                label="Confirm Password"
                type="password"
                required
                placeholder="Re-enter password"
                icon={<Lock size={18} />}
                value={formData.confirmPassword}
                onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <Input
                label="Country"
                required
                placeholder="e.g. Brazil"
                icon={<Globe size={18} />}
                value={formData.country}
                onChange={e => setFormData({ ...formData, country: e.target.value })}
              />
              <Input
                label="City"
                placeholder="e.g. São Paulo"
                icon={<MapPin size={18} />}
                value={formData.city}
                onChange={e => setFormData({ ...formData, city: e.target.value })}
              />
            </div>

            <Select
              label="Business Type"
              options={businessTypeOptions}
              value={formData.businessType}
              onChange={e => setFormData({ ...formData, businessType: e.target.value })}
            />

            <div style={{ margin: '18px 0', display: 'flex', alignItems: 'flex-start', gap: 8 }}>
              <input
                type="checkbox"
                id="terms"
                checked={formData.agreed}
                onChange={e => setFormData({ ...formData, agreed: e.target.checked })}
                style={{ marginTop: 3 }}
                required
              />
              <label htmlFor="terms" style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
                I agree to the Terms & Conditions and Privacy Policy for international commercial trade.
              </label>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={loading}
              style={{ width: '100%' }}
            >
              Create Trade Account
            </Button>
          </form>

          <div
            style={{
              marginTop: 24,
              paddingTop: 20,
              borderTop: '1px solid var(--color-border-subtle)',
              textAlign: 'center',
              fontSize: '0.875rem',
              color: 'var(--color-text-muted)',
            }}
          >
            Already registered?{' '}
            <Link to="/login" style={{ color: 'var(--color-gold-primary)', fontWeight: 700 }}>
              Login to Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
