import React, { useState } from 'react';
import { Users, Check, X } from 'lucide-react';

export const PeopleSetupModal = ({ isOpen, currentPeople, onSave, onClose }) => {
  const [person1, setPerson1] = useState(currentPeople[0] || 'Rumi');
  const [person2, setPerson2] = useState(currentPeople[1] || 'Huda');
  const [person3, setPerson3] = useState(currentPeople[2] || 'Juveria');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const p1 = person1.trim() || 'Rumi';
    const p2 = person2.trim() || 'Huda';
    const p3 = person3.trim() || 'Juveria';
    onSave([p1, p2, p3]);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <h3 className="font-pixel text-yellow" style={{ fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Users size={18} />
            SETUP 3 PEOPLE NAMES
          </h3>
          <button 
            onClick={onClose}
            style={{ background: 'transparent', border: 'none', color: '#888', cursor: 'pointer' }}
          >
            <X size={18} />
          </button>
        </div>

        <p style={{ fontSize: '13px', color: '#aaa', marginBottom: '20px' }}>
          Enter the names of the 3 people who split the auto fares:
        </p>

        <form onSubmit={handleSubmit}>
          <div className="pixel-input-group">
            <label className="pixel-label">Person 1</label>
            <input 
              type="text"
              value={person1}
              onChange={(e) => setPerson1(e.target.value)}
              className="pixel-input"
              placeholder="e.g. Rumi"
              required
            />
          </div>

          <div className="pixel-input-group">
            <label className="pixel-label">Person 2</label>
            <input 
              type="text"
              value={person2}
              onChange={(e) => setPerson2(e.target.value)}
              className="pixel-input"
              placeholder="e.g. Huda"
              required
            />
          </div>

          <div className="pixel-input-group">
            <label className="pixel-label">Person 3</label>
            <input 
              type="text"
              value={person3}
              onChange={(e) => setPerson3(e.target.value)}
              className="pixel-input"
              placeholder="e.g. Juveria"
              required
            />
          </div>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '24px' }}>
            <button 
              type="button" 
              onClick={onClose}
              className="btn-pixel btn-pixel-secondary"
              style={{ padding: '10px 16px', fontSize: '10px' }}
            >
              CANCEL
            </button>
            <button 
              type="submit" 
              className="btn-pixel btn-pixel-primary"
              style={{ padding: '10px 16px', fontSize: '10px' }}
            >
              <Check size={14} />
              SAVE NAMES
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
