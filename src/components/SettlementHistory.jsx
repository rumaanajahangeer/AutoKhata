import React from 'react';
import { PackageCheck, Calendar, Trash2, CheckCircle2, List } from 'lucide-react';
import { formatRupees, formatDateRange, formatShortDate } from '../utils/storage';

export const SettlementHistory = ({ settlements = [], onDeleteSettlement }) => {
  if (!settlements || settlements.length === 0) {
    return (
      <div 
        className="pixel-card"
        style={{ 
          marginTop: '32px',
          background: '#0d0d0d',
          border: '2px dashed #262626',
          textAlign: 'center',
          padding: '36px 24px'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '12px', opacity: 0.6 }}>
          <PackageCheck size={36} color="var(--yellow-primary)" />
        </div>
        <h3 className="font-pixel text-yellow" style={{ fontSize: '13px', marginBottom: '6px' }}>
          📦 SETTLEMENT HISTORY (EMPTY)
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>
          No completed settlements saved yet. Complete your current expense period to archive it here.
        </p>
      </div>
    );
  }

  return (
    <div style={{ marginTop: '36px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <h2 className="font-pixel text-yellow" style={{ fontSize: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <PackageCheck size={22} />
          📦 SETTLEMENT HISTORY ({settlements.length})
        </h2>
        <span style={{ fontSize: '11px', color: '#888' }}>
          Archived Completed Settlements
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
        {settlements.map((item) => {
          const dateLabel = item.rides && item.rides.length > 0 ? formatDateRange(item.rides) : 'Completed Period';

          return (
            <div 
              key={item.id}
              className="pixel-card"
              style={{
                background: 'radial-gradient(circle at top left, #181500 0%, #0d0d0d 100%)',
                border: '2px solid var(--yellow-primary)',
                boxShadow: '0 8px 24px rgba(255, 200, 0, 0.08), var(--pixel-shadow)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justify: 'space-between'
              }}
            >
              <div>
                {/* Box Top Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,200,0,0.2)', paddingBottom: '10px', marginBottom: '14px' }}>
                  <div>
                    <h3 className="font-pixel text-yellow" style={{ fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      Settlement #{item.number}
                    </h3>
                    <div style={{ fontSize: '11px', color: '#aaa', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                      <Calendar size={12} color="var(--yellow-primary)" />
                      {dateLabel}
                    </div>
                  </div>

                  <span 
                    style={{ 
                      fontSize: '10px', 
                      fontFamily: 'var(--font-pixel)', 
                      background: 'rgba(46, 213, 115, 0.15)', 
                      color: 'var(--success)', 
                      padding: '4px 8px', 
                      borderRadius: '4px',
                      border: '1px solid var(--success)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <CheckCircle2 size={11} />
                    Completed ✓
                  </span>
                </div>

                {/* 3 Metric Summary Pill */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px', background: '#050505', padding: '12px', borderRadius: '6px', border: '1px solid #1f1f1f', marginBottom: '16px' }}>
                  <div>
                    <span style={{ fontSize: '9px', color: '#777', textTransform: 'uppercase', display: 'block' }}>Total</span>
                    <strong className="font-mono text-yellow" style={{ fontSize: '17px' }}>{formatRupees(item.totalExpense)}</strong>
                  </div>
                  <div>
                    <span style={{ fontSize: '9px', color: '#777', textTransform: 'uppercase', display: 'block' }}>People</span>
                    <strong className="font-mono" style={{ fontSize: '17px', color: '#fff' }}>{item.numPeople || 3}</strong>
                  </div>
                  <div>
                    <span style={{ fontSize: '9px', color: '#777', textTransform: 'uppercase', display: 'block' }}>Per Person</span>
                    <strong className="font-mono text-yellow" style={{ fontSize: '17px' }}>{formatRupees(item.perPerson, true)}</strong>
                  </div>
                </div>

                {/* Day-wise History Inside Box */}
                <div style={{ marginBottom: '16px' }}>
                  <span style={{ fontSize: '11px', color: '#888', fontWeight: 600, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '8px' }}>
                    <List size={12} color="var(--yellow-primary)" />
                    Days Included:
                  </span>

                  {item.rides && item.rides.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '180px', overflowY: 'auto', paddingRight: '4px' }}>
                      {item.rides.map((ride, idx) => (
                        <div 
                          key={ride.id || idx}
                          style={{
                            background: '#080808',
                            border: '1px solid #1f1f1f',
                            borderRadius: '4px',
                            padding: '6px 10px',
                            display: 'flex',
                            alignItems: 'center',
                            justify: 'space-between',
                            fontSize: '12px'
                          }}
                        >
                          <span style={{ color: '#ccc', fontWeight: 500 }}>
                            {formatShortDate(ride.date)}
                          </span>

                          <span className="font-mono text-yellow" style={{ fontWeight: 'bold' }}>
                            {formatRupees(ride.total)}
                          </span>

                          <span 
                            style={{ 
                              color: '#ffffff', 
                              background: '#1a1a1a', 
                              padding: '2px 6px', 
                              borderRadius: '3px', 
                              fontSize: '11px',
                              border: '1px solid #333'
                            }}
                          >
                            {ride.paidBy || 'Rumi'}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div style={{ fontSize: '11px', color: '#666', italic: 'true' }}>
                      No individual day records found.
                    </div>
                  )}
                </div>
              </div>

              {/* Box Footer with Delete */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '10px', borderTop: '1px solid #1a1a1a', fontSize: '11px', color: '#666' }}>
                <span>{item.rides ? item.rides.length : 0} Days Included</span>
                <button 
                  type="button"
                  onClick={() => onDeleteSettlement(item.id)}
                  style={{ background: 'transparent', border: 'none', color: 'var(--danger)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px' }}
                  title="Delete completed settlement record"
                >
                  <Trash2 size={12} />
                  Delete Box
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
