import React from 'react';
import { PixelCoinIcon } from './PixelIcons';
import { formatRupees } from '../utils/storage';
import { Calculator } from 'lucide-react';

export const TotalExpenseCard = ({ totalExpense, totalDaysCount, onRecalculateTotal }) => {
  return (
    <div className="pixel-card" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <h2 className="font-pixel" style={{ fontSize: '13px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <PixelCoinIcon size={18} />
            TOTAL EXPENSE
          </h2>
          
          <button 
            type="button"
            onClick={onRecalculateTotal}
            className="btn-pixel btn-pixel-primary"
            style={{ fontSize: '9px', padding: '6px 10px' }}
            title="Calculate overall total of all saved days"
          >
            <Calculator size={12} />
            TOTAL
          </button>
        </div>

        <div className="font-mono text-yellow" style={{ fontSize: '44px', fontWeight: 'bold', lineHeight: '1' }}>
          {formatRupees(totalExpense, true)}
        </div>
      </div>

      <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #222', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '14px', color: '#aaaaaa', fontWeight: 600 }}>
          Days Recorded: <strong style={{ color: '#fff' }}>{totalDaysCount}</strong>
        </span>
        <div style={{ display: 'flex', gap: '4px' }}>
          <PixelCoinIcon size={16} color="#CCA000" />
          <PixelCoinIcon size={16} color="#FFC800" />
        </div>
      </div>
    </div>
  );
};
