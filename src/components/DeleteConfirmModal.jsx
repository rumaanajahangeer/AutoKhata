import React from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';
import { formatDateDisplay, formatRupees } from '../utils/storage';

export const DeleteConfirmModal = ({ isOpen, rideToDelete, onConfirm, onCancel }) => {
  if (!isOpen || !rideToDelete) return null;

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <h3 className="font-pixel text-yellow" style={{ fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertTriangle color="var(--danger)" size={18} />
            CONFIRM DELETE
          </h3>
          <button 
            onClick={onCancel}
            style={{ background: 'transparent', border: 'none', color: '#888', cursor: 'pointer' }}
          >
            <X size={18} />
          </button>
        </div>

        <p style={{ fontSize: '14px', color: '#ccc', marginBottom: '16px' }}>
          Are you sure you want to permanently delete the ride entry for{' '}
          <strong className="text-yellow">{formatDateDisplay(rideToDelete.date)}</strong>?
        </p>

        <div style={{ background: '#111', padding: '12px', borderRadius: '6px', border: '1px solid #2a2a2a', marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#aaa', marginBottom: '4px' }}>
            <span>Daily Total:</span>
            <span className="font-mono text-yellow" style={{ fontWeight: 'bold' }}>{formatRupees(rideToDelete.total)}</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <button 
            onClick={onCancel}
            className="btn-pixel btn-pixel-secondary"
            style={{ padding: '10px 16px', fontSize: '10px' }}
          >
            CANCEL
          </button>
          <button 
            onClick={() => onConfirm(rideToDelete.id)}
            className="btn-pixel btn-pixel-danger"
            style={{ padding: '10px 16px', fontSize: '10px' }}
          >
            <Trash2 size={14} />
            DELETE DAY
          </button>
        </div>
      </div>
    </div>
  );
};
