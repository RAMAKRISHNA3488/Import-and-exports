import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { TopBar } from './TopBar.js';
import { Navbar } from './Navbar.js';
import { Footer } from './Footer.js';
import { RequestQuoteModal } from '../domain/RequestQuoteModal.js';
import { QuoteBasketDrawer } from '../domain/QuoteBasketDrawer.js';

import { useAuth } from '../../context/AuthContext.js';

export const PublicLayout: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [basketDrawerOpen, setBasketDrawerOpen] = useState(false);
  const [activeQuoteProduct, setActiveQuoteProduct] = useState<string>('');
  const [activeQuoteQuantity, setActiveQuoteQuantity] = useState<number | undefined>();

  const handleOpenQuote = (productName?: string, quantity?: number) => {
    setActiveQuoteProduct(productName || '');
    setActiveQuoteQuantity(quantity);
    setQuoteModalOpen(true);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        ...(isAuthenticated ? ({ '--topbar-height': '0px' } as React.CSSProperties) : {}),
      }}
    >
      {!isAuthenticated && <TopBar onRequestQuote={() => handleOpenQuote()} />}
      <Navbar onOpenBasket={() => setBasketDrawerOpen(true)} onRequestQuote={() => handleOpenQuote()} />

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div key={location.pathname} className="page-transition-wrapper">
          <Outlet context={{ openQuoteModal: handleOpenQuote }} />
        </div>
      </main>

      <Footer onRequestQuote={() => handleOpenQuote()} />

      {/* Global RFQ Quote Modal */}
      <RequestQuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        defaultProduct={activeQuoteProduct}
        defaultQuantity={activeQuoteQuantity}
      />

      {/* RFQ Basket Drawer */}
      <QuoteBasketDrawer
        isOpen={basketDrawerOpen}
        onClose={() => setBasketDrawerOpen(false)}
        onSubmitRfq={() => setQuoteModalOpen(true)}
      />
    </div>
  );
};
