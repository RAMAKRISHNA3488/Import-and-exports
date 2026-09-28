import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Product, QuoteBasketItem } from '../types/index.js';

interface QuoteBasketContextValue {
  items: QuoteBasketItem[];
  addItem: (product: Product, quantity?: number, unit?: string, packagingNotes?: string) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearBasket: () => void;
  totalCount: number;
}

const QuoteBasketContext = createContext<QuoteBasketContextValue | undefined>(undefined);

export const QuoteBasketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<QuoteBasketItem[]>(() => {
    try {
      const saved = localStorage.getItem('ion_quote_basket');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('ion_quote_basket', JSON.stringify(items));
  }, [items]);

  const addItem = (product: Product, quantity: number = 20, unit: string = 'Metric Tons', packagingNotes?: string) => {
    setItems(prev => {
      const existingIdx = prev.findIndex(item => item.product.id === product.id);
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        return updated;
      }
      return [...prev, { product, quantity, unit, packagingNotes }];
    });
  };

  const removeItem = (productId: string) => {
    setItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setItems(prev =>
      prev.map(item => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const clearBasket = () => {
    setItems([]);
  };

  const totalCount = items.length;

  return (
    <QuoteBasketContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearBasket,
        totalCount,
      }}
    >
      {children}
    </QuoteBasketContext.Provider>
  );
};

export const useQuoteBasket = (): QuoteBasketContextValue => {
  const context = useContext(QuoteBasketContext);
  if (!context) {
    throw new Error('useQuoteBasket must be used within a QuoteBasketProvider');
  }
  return context;
};
