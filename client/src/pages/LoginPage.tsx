import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, User, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext.js';
import { useToast } from '../context/ToastContext.js';
import { Button } from '../components/common/Button.js';
import { Input } from '../components/common/Input.js';

export const LoginPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'customer' | 'admin'>('customer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || (activeTab === 'admin' ? '/admin' : '/');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const result = await login(email, password, activeTab);
    setLoading(false);

    if (result.success) {
      showToast(`Welcome back! Logged in as ${activeTab.toUpperCase()}.`, 'success');
      navigate(activeTab === 'admin' ? '/admin' : from, { replace: true });
    } else {
      showToast(result.error || 'Invalid credentials', 'error');
    }
  };

  const handleFillDemo = (type: 'buyer' | 'supplier' | 'admin') => {
    if (type === 'admin') {
      setActiveTab('admin');
      setEmail('admin@ionindustries.com');
      setPassword('Admin@2026');
    } else if (type === 'supplier') {
      setActiveTab('customer');
      setEmail('supplier@agritrade.com');
      setPassword('Supplier@2026');
    } else {
      setActiveTab('customer');
      setEmail('buyer@globalfoods.com');
      setPassword('Buyer@2026');
    }
  };

  return (
    <div
      className="login-page-wrapper"
      style={{
        position: 'relative',
        minHeight: 'calc(100vh - var(--header-height, 88px) - var(--topbar-height, 34px))',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '28px 16px',
        boxSizing: 'border-box',
        backgroundImage: "url('/conceptexim-login-background-4k.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        imageRendering: '-webkit-optimize-contrast',
      }}
    >
      <style>{`
        .login-card-form .form-group {
          margin-bottom: 12px;
          gap: 4px;
        }
        .login-card-form .form-label {
          font-size: 0.8125rem;
          font-weight: 600;
          margin-bottom: 2px;
        }
        .login-card-form .form-input {
          height: 42px;
          font-size: 0.875rem;
        }
      `}</style>

      <div
        className="container"
        style={{
          maxWidth: 450,
          position: 'relative',
          zIndex: 2,
          margin: '0 auto',
          padding: 0,
        }}
      >
        <div
          className="card"
          style={{
            margin: 0,
            padding: '26px 26px 22px',
            borderRadius: 'var(--radius-lg)',
            backgroundColor: 'rgba(255, 255, 255, 0.97)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            boxShadow: '0 16px 40px rgba(6, 16, 36, 0.32), 0 4px 12px rgba(6, 16, 36, 0.12)',
            border: '1px solid rgba(255, 255, 255, 0.85)',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: 14 }}>
            <h2
              className="font-serif"
              style={{ fontSize: '1.55rem', fontWeight: 700, color: 'var(--color-navy-primary)', lineHeight: 1.2 }}
            >
              Welcome Back
            </h2>
            <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', marginTop: 4 }}>
              Sign in to your ConceptExim trade account
            </p>
          </div>

          {/* Tab Selector matching PPT Slide 10 */}
          <div
            style={{
              display: 'flex',
              backgroundColor: '#F1F5F9',
              padding: 3,
              borderRadius: 'var(--radius-sm)',
              marginBottom: 12,
            }}
          >
            <button
              type="button"
              onClick={() => setActiveTab('customer')}
              style={{
                flex: 1,
                padding: '8px 0',
                fontSize: '0.85rem',
                fontWeight: 600,
                borderRadius: 'var(--radius-xs)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                backgroundColor: activeTab === 'customer' ? 'var(--color-navy-primary)' : 'transparent',
                color: activeTab === 'customer' ? '#FFFFFF' : 'var(--color-text-muted)',
                transition: 'all 150ms',
              }}
            >
              <User size={15} />
              <span>Customer Login</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('admin')}
              style={{
                flex: 1,
                padding: '8px 0',
                fontSize: '0.85rem',
                fontWeight: 600,
                borderRadius: 'var(--radius-xs)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                backgroundColor: activeTab === 'admin' ? 'var(--color-navy-primary)' : 'transparent',
                color: activeTab === 'admin' ? '#FFFFFF' : 'var(--color-text-muted)',
                transition: 'all 150ms',
              }}
            >
              <ShieldCheck size={15} />
              <span>Admin Login</span>
            </button>
          </div>

          {/* Quick Demo Fill Helper */}
          <div
            style={{
              backgroundColor: '#FEF3C7',
              border: '1px solid #FDE68A',
              borderRadius: 'var(--radius-sm)',
              padding: '7px 12px',
              marginBottom: 14,
              fontSize: '0.75rem',
              color: '#92400E',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span>Temporary DB Demo Credentials:</span>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              {activeTab === 'customer' ? (
                <>
                  <button
                    type="button"
                    onClick={() => handleFillDemo('buyer')}
                    style={{
                      textDecoration: 'underline',
                      fontWeight: 700,
                      color: '#B45309',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: 0,
                    }}
                  >
                    Auto-fill Buyer
                  </button>
                  <span>|</span>
                  <button
                    type="button"
                    onClick={() => handleFillDemo('supplier')}
                    style={{
                      textDecoration: 'underline',
                      fontWeight: 700,
                      color: '#B45309',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: 0,
                    }}
                  >
                    Auto-fill Supplier
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => handleFillDemo('admin')}
                  style={{
                    textDecoration: 'underline',
                    fontWeight: 700,
                    color: '#B45309',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                  }}
                >
                  Auto-fill Admin
                </button>
              )}
            </div>
          </div>

          <form className="login-card-form" onSubmit={handleSubmit}>
            <Input
              label="Email Address"
              type="email"
              required
              placeholder={activeTab === 'admin' ? 'admin@ionindustries.com' : 'buyer@company.com'}
              icon={<Mail size={17} />}
              value={email}
              onChange={e => setEmail(e.target.value)}
            />

            <div style={{ position: 'relative' }}>
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="Enter account password"
                icon={<Lock size={17} />}
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: 12,
                  top: 32,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 4,
                  color: '#94A3B8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              loading={loading}
              style={{ width: '100%', height: 44, marginTop: 4, fontSize: '0.9375rem', fontWeight: 600 }}
            >
              Sign In to Trade Account
            </Button>
          </form>

          <div
            style={{
              marginTop: 16,
              paddingTop: 14,
              borderTop: '1px solid var(--color-border-subtle)',
              textAlign: 'center',
              fontSize: '0.8125rem',
              color: 'var(--color-text-muted)',
            }}
          >
            Don't have an account yet?{' '}
            <Link to="/register" style={{ color: 'var(--color-gold-primary)', fontWeight: 700 }}>
              Register Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
