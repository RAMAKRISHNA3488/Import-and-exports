import React from 'react';
import { Plane, Ship, Globe, Handshake, BarChart3, Shield } from 'lucide-react';

interface TickerItem {
  icon: React.ReactNode;
  text: string;
}

export const InfiniteTickerStrip: React.FC = () => {
  const tickerItems: TickerItem[] = [
    { icon: <Plane size={16} strokeWidth={2.2} />, text: 'Connecting Markets' },
    { icon: <Ship size={16} strokeWidth={2.2} />, text: 'Delivering Opportunities' },
    { icon: <Globe size={16} strokeWidth={2.2} />, text: 'Trusted Worldwide' },
    { icon: <Handshake size={16} strokeWidth={2.2} />, text: 'Building Lasting Partnerships' },
    { icon: <BarChart3 size={16} strokeWidth={2.2} />, text: 'Your Global Trade Partner' },
    { icon: <Shield size={16} strokeWidth={2.2} />, text: 'From Local to Global' },
  ];

  // Repeat sequence in two identical halves for a 100% seamless, gap-free infinite CSS loop
  const renderItemSet = (setKey: string) => (
    <div key={setKey} className="home-ticker-set">
      {tickerItems.map((item, idx) => (
        <div key={`${setKey}-${idx}`} className="home-ticker-item">
          <span className="home-ticker-icon" aria-hidden="true">
            {item.icon}
          </span>
          <span className="home-ticker-text">{item.text}</span>
          <span className="home-ticker-separator" aria-hidden="true">
            |
          </span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="home-ticker-strip" role="region" aria-label="Global Trade Highlights">
      <div className="home-ticker-track">
        {/* First Half */}
        <div className="home-ticker-half">
          {renderItemSet('set1-a')}
          {renderItemSet('set1-b')}
        </div>

        {/* Second Half (Exact Duplicate for Seamless Infinite Animation) */}
        <div className="home-ticker-half" aria-hidden="true">
          {renderItemSet('set2-a')}
          {renderItemSet('set2-b')}
        </div>
      </div>
    </div>
  );
};
