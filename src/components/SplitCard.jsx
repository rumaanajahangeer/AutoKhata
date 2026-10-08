import React from 'react';
import { PixelPeopleIcon } from './PixelIcons';
import { formatRupees } from '../utils/storage';
import { Settings2, CheckSquare } from 'lucide-react';

export const SplitCard = ({ rides = [], people = ['Rumi', 'Huda', 'Juveria'], onOpenPeopleSetup, onCompleteSettlement }) => {
  const totalExpense = rides.reduce((acc, curr) => acc + (parseFloat(curr.total) || 0), 0);
  const numPeople = people.length || 3;
  const equalShare = totalExpense > 0 ? (totalExpense / numPeople) : 0;

  return (
    <div className="pixel-card" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderColor: 'var(--yellow-primary)' }}>
      <div>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <h2 className="font-pixel text-yellow" style={{ fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <PixelPeopleIcon size={20} />
            SPLIT BETWEEN 3
          </h2>
          <button 
            type="button"
            onClick={onOpenPeopleSetup}
            className="btn-pixel btn-pixel-secondary"
            style={{ fontSize: '9px', padding: '5px 8px' }}
            title="Configure names of 3 people"
          >
            <Settings2 size={12} />
            Edit Names
          </button>
        </div>

        {/* Prominent Summary Metrics */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginBottom: '20px', background: '#0e0e0e', padding: '16px 12px', borderRadius: '8px', border: '1px solid #222' }}>
          <div>
            <span style={{ fontSize: '10px', color: '#888', textTransform: 'uppercase', display: 'block' }}>Total</span>
            <strong className="font-mono text-yellow" style={{ fontSize: '20px' }}>{formatRupees(totalExpense)}</strong>
          </div>
          <div>
            <span style={{ fontSize: '10px', color: '#888', textTransform: 'uppercase', display: 'block' }}>People</span>
            <strong className="font-mono" style={{ fontSize: '20px', color: '#fff' }}>3</strong>
          </div>
          <div>
            <span style={{ fontSize: '10px', color: '#888', textTransform: 'uppercase', display: 'block' }}>Each Person</span>
            <strong className="font-mono text-yellow" style={{ fontSize: '20px' }}>{formatRupees(equalShare, true)}</strong>
          </div>
        </div>

        {/* 3 People Label Footer */}
        <div 
          style={{ 
            padding: '10px 12px', 
            background: '#0c0c0c', 
            borderRadius: '6px', 
            border: '1px solid #222',
            marginBottom: '20px',
            fontSize: '12px'
          }}
        >
          <span style={{ color: '#888' }}>
            PEOPLE: <strong className="text-yellow">{people.join(', ')}</strong>
          </span>
        </div>
      </div>

      {/* ✓ COMPLETE & SAVE Button */}
      <div>
        <button 
          type="button"
          disabled={rides.length === 0}
          onClick={onCompleteSettlement}
          className="btn-pixel btn-pixel-primary"
          style={{ width: '100%', padding: '14px', fontSize: '12px', opacity: rides.length === 0 ? 0.4 : 1 }}
          title={rides.length === 0 ? "Record at least one ride to complete settlement" : "Save this entire expense calculation as a completed settlement"}
        >
          <CheckSquare size={16} />
          ✓ COMPLETE & SAVE SETTLEMENT
        </button>
      </div>
    </div>
  );
};
