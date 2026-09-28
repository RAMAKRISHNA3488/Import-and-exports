import React from 'react';
import { X, Trash2, ArrowRight, Package } from 'lucide-react';
import { useQuoteBasket } from '../../context/QuoteBasketContext.js';
import { Button } from '../common/Button.js';

interface QuoteBasketDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitRfq: () => void;
}

export const QuoteBasketDrawer: React.FC<QuoteBasketDrawerProps> = ({
  isOpen,
  onClose,
  onSubmitRfq,
}) => {
  const { items, removeItem, updateQuantity, clearBasket } = useQuoteBasket();

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(6, 16, 36, 0.6)',
        backdropFilter: 'blur(4px)',
        zIndex: 9999,
        display: 'flex',
        justifyContent: 'flex-end',
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '460px',
          height: '100%',
          backgroundColor: '#FFFFFF',
          boxShadow: 'var(--shadow-xl)',
          display: 'flex',
          flexDirection: 'column',
          animation: 'slideInRight 200ms ease-out',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid var(--color-border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'var(--color-navy-dark)',
            color: '#FFFFFF',
          }}
        >
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>RFQ Quote Basket</h3>
            <p style={{ fontSize: '0.75rem', color: '#94A3B8' }}>
              Consolidate export commodities for bulk RFQ
            </p>
          </div>
          <button onClick={onClose} className="btn-icon" style={{ color: '#FFFFFF' }}>
            <X size={20} />
          </button>
        </div>

        {/* Drawer Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>
          {items.length === 0 ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '70%',
                textAlign: 'center',
                color: 'var(--color-text-muted)',
              }}
            >
              <Package size={52} color="#CBD5E1" style={{ marginBottom: 16 }} />
              <h4 style={{ color: 'var(--color-navy-primary)', fontWeight: 700, marginBottom: 6 }}>
                Your RFQ Basket is Empty
              </h4>
              <p style={{ fontSize: '0.875rem', maxWidth: 280 }}>
                Explore products across Rice, Spices, Pulses and click "Add to RFQ" to request commercial pricing.
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {items.map(({ product, quantity, unit }) => (
                <div
                  key={product.id}
                  style={{
                    display: 'flex',
                    gap: 14,
                    padding: 14,
                    border: '1px solid var(--color-border-subtle)',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: '#F8FAFC',
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <h4 style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--color-navy-primary)' }}>
                        {product.name}
                      </h4>
                      <button
                        onClick={() => removeItem(product.id)}
                        style={{ color: '#94A3B8', padding: 2 }}
                        title="Remove commodity"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#64748B', margin: '4px 0 10px' }}>
                      Origin: {product.origin} | {product.categoryName}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>
                        Volume:
                      </span>
                      <input
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={e => updateQuantity(product.id, Math.max(1, Number(e.target.value)))}
                        style={{
                          width: 80,
                          padding: '4px 8px',
                          border: '1px solid var(--color-border-strong)',
                          borderRadius: 'var(--radius-xs)',
                          fontSize: '0.875rem',
                          textAlign: 'center',
                        }}
                      />
                      <span style={{ fontSize: '0.75rem', color: '#64748B' }}>{unit}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        {items.length > 0 && (
          <div
            style={{
              padding: '18px 24px',
              borderTop: '1px solid var(--color-border-subtle)',
              backgroundColor: '#F8FAFC',
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
              <span style={{ color: 'var(--color-text-muted)' }}>Commodities Selected:</span>
              <strong>{items.length} items</strong>
            </div>

            <Button
              variant="primary"
              size="lg"
              onClick={() => {
                onClose();
                onSubmitRfq();
              }}
              icon={<ArrowRight size={18} />}
            >
              Proceed to RFQ Quote Request
            </Button>

            <button
              onClick={clearBasket}
              style={{
                fontSize: '0.75rem',
                color: '#94A3B8',
                textAlign: 'center',
                textDecoration: 'underline',
              }}
            >
              Clear Basket
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
