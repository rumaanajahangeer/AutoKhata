import React from 'react';
import { PixelAutoLogo } from './PixelAutoLogo';
import { Plus } from 'lucide-react';

export const Header = ({ onNewDay }) => {
  return (
    <header 
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        padding: '20px 0',
        borderBottom: '2px solid #1a1a1a',
        marginBottom: '28px'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <PixelAutoLogo size={48} />
        <div>
          <h1 
            className="font-pixel text-yellow" 
            style={{ 
              fontSize: '24px', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px',
              lineHeight: '1.2'
            }}
          >
            AutoKhata
          </h1>
          <p 
            style={{ 
              color: 'var(--text-muted)', 
              fontSize: '14px', 
              fontWeight: 500,
              marginTop: '4px'
            }}
          >
            Track the ride. Split the fare.
          </p>
        </div>
      </div>

      <button 
        onClick={onNewDay}
        className="btn-pixel btn-pixel-primary"
        title="Start a fresh day entry without clearing history"
      >
        <Plus size={16} strokeWidth={3} />
        NEW DAY
      </button>
    </header>
  );
};
