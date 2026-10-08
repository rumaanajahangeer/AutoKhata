import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import { PixelCalendarIcon } from './PixelIcons';
import { formatRupees, getTodayDateString } from '../utils/storage';
import { CheckCircle2, UserCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

export const TodayEntry = forwardRef(({ people = ['Rumi', 'Huda', 'Juveria'], onSaveDay, editingEntry = null, onCancelEdit = null }, ref) => {
  const [date, setDate] = useState(getTodayDateString());
  const [going, setGoing] = useState('');
  const [returnFare, setReturnFare] = useState('');
  const [paidBy, setPaidBy] = useState(people[0] || 'Rumi');
  const [isSaving, setIsSaving] = useState(false);

  // Sync default paidBy when people change
  useEffect(() => {
    if (!editingEntry && (!paidBy || !people.includes(paidBy))) {
      setPaidBy(people[0] || 'Rumi');
    }
  }, [people]);

  // Sync if editing an entry from history
  useEffect(() => {
    if (editingEntry) {
      setDate(editingEntry.date || getTodayDateString());
      setGoing(editingEntry.going !== undefined ? String(editingEntry.going) : (editingEntry.morning ? String(editingEntry.morning) : ''));
      setReturnFare(editingEntry.returnFare !== undefined ? String(editingEntry.returnFare) : (editingEntry.evening ? String(editingEntry.evening) : ''));
      setPaidBy(editingEntry.paidBy || people[0] || 'Rumi');
    }
  }, [editingEntry]);

  // Expose reset/clear method via ref for "+ NEW DAY"
  useImperativeHandle(ref, () => ({
    resetForm: () => {
      setDate(getTodayDateString());
      setGoing('');
      setReturnFare('');
      setPaidBy(people[0] || 'Rumi');
    }
  }));

  // Daily Total Calculation: Going + Return
  const goingAmt = parseFloat(going) || 0;
  const returnAmt = parseFloat(returnFare) || 0;
  const dailyTotal = goingAmt + returnAmt;

  // Submit/Save Day handler
  const handleSave = (e) => {
    e.preventDefault();
    if (!date) return;

    setIsSaving(true);

    try {
      confetti({
        particleCount: 35,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#FFC800', '#FFE066', '#FFFFFF']
      });
    } catch (err) {
      // ignore
    }

    const dayData = {
      id: editingEntry ? editingEntry.id : 'day_' + Date.now(),
      date,
      going: goingAmt,
      returnFare: returnAmt,
      paidBy: paidBy || people[0] || 'Rumi',
      total: dailyTotal
    };

    setTimeout(() => {
      onSaveDay(dayData, !!editingEntry);
      setIsSaving(false);
      if (!editingEntry) {
        setGoing('');
        setReturnFare('');
      }
    }, 250);
  };

  return (
    <div className="pixel-card pixel-card-yellow" id="today-entry-card">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h2 className="font-pixel text-yellow" style={{ fontSize: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <PixelCalendarIcon size={20} />
          {editingEntry ? "EDIT RIDE ENTRY" : "TODAY'S RIDE"}
        </h2>
        {editingEntry && (
          <button 
            type="button" 
            onClick={onCancelEdit}
            className="btn-pixel btn-pixel-secondary"
            style={{ fontSize: '9px', padding: '6px 10px' }}
          >
            Cancel Edit
          </button>
        )}
      </div>

      <form onSubmit={handleSave}>
        {/* Date Selector */}
        <div className="pixel-input-group">
          <label className="pixel-label">
            Date
          </label>
          <input 
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="pixel-input"
            required
          />
        </div>

        {/* Going Fare Input */}
        <div className="pixel-input-group">
          <label className="pixel-label">
            Going Fare ₹
          </label>
          <div className="input-prefix-wrapper">
            <span className="input-prefix-symbol">₹</span>
            <input 
              type="number"
              step="any"
              min="0"
              placeholder="Enter amount (e.g. 250)"
              value={going}
              onChange={(e) => setGoing(e.target.value)}
              className="pixel-input input-with-prefix pixel-input-currency"
            />
          </div>
        </div>

        {/* Return Fare Input */}
        <div className="pixel-input-group">
          <label className="pixel-label">
            Return Fare ₹
          </label>
          <div className="input-prefix-wrapper">
            <span className="input-prefix-symbol">₹</span>
            <input 
              type="number"
              step="any"
              min="0"
              placeholder="Enter amount (e.g. 124)"
              value={returnFare}
              onChange={(e) => setReturnFare(e.target.value)}
              className="pixel-input input-with-prefix pixel-input-currency"
            />
          </div>
        </div>

        {/* Paid By Selector */}
        <div className="pixel-input-group" style={{ marginBottom: '24px' }}>
          <label className="pixel-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <UserCheck size={14} color="var(--yellow-primary)" />
            Paid By — Person's Name
          </label>
          <select 
            value={paidBy}
            onChange={(e) => setPaidBy(e.target.value)}
            className="pixel-input"
            style={{ cursor: 'pointer', appearance: 'auto' }}
          >
            {people.map(p => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>

        {/* Live Daily Total Display */}
        <div 
          style={{ 
            background: 'radial-gradient(circle, #1f1a00 0%, #111111 100%)',
            border: '2px dashed var(--yellow-primary)',
            borderRadius: '8px',
            padding: '16px',
            textAlign: 'center',
            marginBottom: '20px'
          }}
        >
          <span className="font-pixel" style={{ fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '1px' }}>
            DAILY TOTAL
          </span>
          <div className="font-mono text-yellow" style={{ fontSize: '38px', fontWeight: 'bold', lineHeight: '1.1', marginTop: '4px' }}>
            {formatRupees(dailyTotal, true)}
          </div>
          <p style={{ fontSize: '12px', color: '#aaa', marginTop: '4px' }}>
            Paid by: <strong className="text-yellow">{paidBy}</strong>
          </p>
        </div>

        {/* Save Day Button */}
        <button 
          type="submit" 
          disabled={isSaving}
          className="btn-pixel btn-pixel-primary"
          style={{ width: '100%', padding: '16px', fontSize: '13px' }}
        >
          <CheckCircle2 size={18} />
          {editingEntry ? "UPDATE ENTRY" : "+ SAVE DAY"}
        </button>
      </form>
    </div>
  );
});

TodayEntry.displayName = 'TodayEntry';
