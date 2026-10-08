import React, { useState } from 'react';
import { PixelHistoryIcon } from './PixelIcons';
import { PixelAutoLogo } from './PixelAutoLogo';
import { formatDateDisplay, formatRupees } from '../utils/storage';
import { Edit2, Trash2, Plus, Calendar, User } from 'lucide-react';
import { DeleteConfirmModal } from './DeleteConfirmModal';

export const RideHistory = ({ rides, onEditRide, onDeleteRide, onAddFirstRide }) => {
  const [deletingRide, setDeletingRide] = useState(null);

  const handleDeleteClick = (ride) => {
    setDeletingRide(ride);
  };

  const handleConfirmDelete = (id) => {
    onDeleteRide(id);
    setDeletingRide(null);
  };

  // Empty State View
  if (!rides || rides.length === 0) {
    return (
      <div className="pixel-card" style={{ textAlign: 'center', padding: '48px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
          <PixelAutoLogo size={64} />
        </div>

        <h3 className="font-pixel text-yellow" style={{ fontSize: '15px', marginBottom: '8px' }}>
          No rides recorded in current period
        </h3>
        
        <p style={{ color: 'var(--text-muted)', fontSize: '14px', maxWidth: '360px', margin: '0 auto 24px auto' }}>
          Start entering daily fares above to record expenses for your current settlement period.
        </p>

        <button 
          onClick={onAddFirstRide}
          className="btn-pixel btn-pixel-primary"
          style={{ padding: '14px 24px', fontSize: '11px' }}
        >
          <Plus size={16} />
          + ADD FIRST RIDE
        </button>
      </div>
    );
  }

  return (
    <div className="pixel-card">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h2 className="font-pixel" style={{ fontSize: '14px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <PixelHistoryIcon size={20} />
          CURRENT EXPENSE PERIOD RIDES ({rides.length})
        </h2>
        <span style={{ fontSize: '11px', color: '#666' }}>
          Newest entries first
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {rides.map((ride) => {
          const goingAmt = ride.going !== undefined ? ride.going : (ride.morning || 0);
          const returnAmt = ride.returnFare !== undefined ? ride.returnFare : (ride.evening || 0);
          const paidByName = ride.paidBy || 'Rumi';

          return (
            <div 
              key={ride.id}
              style={{
                background: '#0d0d0d',
                border: '1px solid #222222',
                borderRadius: '8px',
                padding: '16px',
                position: 'relative',
                transition: 'border-color 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(255,200,0,0.4)'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = '#222222'}
            >
              {/* Card Header: Date & Action Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', borderBottom: '1px solid #1a1a1a', paddingBottom: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Calendar size={14} color="var(--yellow-primary)" />
                  <span className="font-pixel text-yellow" style={{ fontSize: '12px' }}>
                    {formatDateDisplay(ride.date)}
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button 
                    onClick={() => onEditRide(ride)}
                    className="btn-pixel btn-pixel-secondary btn-icon-only"
                    style={{ padding: '6px 10px', fontSize: '11px' }}
                    title="Edit ride"
                  >
                    <Edit2 size={13} />
                    <span style={{ fontSize: '9px', marginLeft: '4px' }}>Edit</span>
                  </button>
                  <button 
                    onClick={() => handleDeleteClick(ride)}
                    className="btn-pixel btn-pixel-danger btn-icon-only"
                    style={{ padding: '6px 10px', fontSize: '11px' }}
                    title="Delete ride"
                  >
                    <Trash2 size={13} />
                    <span style={{ fontSize: '9px', marginLeft: '4px' }}>Delete</span>
                  </button>
                </div>
              </div>

              {/* Exact format: Going Fare, Return Fare, Paid By */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
                {/* Going Fare */}
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                  <span style={{ color: '#aaa' }}>Going Fare</span>
                  <div style={{ flex: 1, borderBottom: '1px dotted #333', margin: '0 8px' }} />
                  <span className="font-mono text-muted" style={{ fontSize: '15px' }}>
                    {formatRupees(goingAmt)}
                  </span>
                </div>

                {/* Return Fare */}
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                  <span style={{ color: '#aaa' }}>Return Fare</span>
                  <div style={{ flex: 1, borderBottom: '1px dotted #333', margin: '0 8px' }} />
                  <span className="font-mono text-muted" style={{ fontSize: '15px' }}>
                    {formatRupees(returnAmt)}
                  </span>
                </div>

                {/* Paid By */}
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                  <span style={{ color: '#aaa', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <User size={12} color="var(--yellow-primary)" />
                    Paid By
                  </span>
                  <div style={{ flex: 1, borderBottom: '1px dotted #333', margin: '0 8px' }} />
                  <strong className="text-yellow" style={{ fontSize: '14px' }}>
                    {paidByName}
                  </strong>
                </div>

                {/* Daily Total Row */}
                <div 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'baseline', 
                    justifyContent: 'space-between',
                    marginTop: '6px',
                    paddingTop: '8px',
                    borderTop: '1px dashed #262626'
                  }}
                >
                  <strong className="font-pixel" style={{ fontSize: '10px', color: '#ffffff' }}>
                    Daily Total
                  </strong>
                  <div style={{ flex: 1, borderBottom: '1px dotted var(--yellow-dark)', margin: '0 8px' }} />
                  <strong className="font-mono text-yellow" style={{ fontSize: '20px' }}>
                    {formatRupees(ride.total, true)}
                  </strong>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal 
        isOpen={!!deletingRide}
        rideToDelete={deletingRide}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeletingRide(null)}
      />
    </div>
  );
};
