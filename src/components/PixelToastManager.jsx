import React from 'react';
import { PixelAutoLogo } from './PixelAutoLogo';

export const PixelToastManager = ({ toasts = [] }) => {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((t) => (
        <div key={t.id} className="toast-item">
          <PixelAutoLogo size={20} />
          <span>{t.message}</span>
        </div>
      ))}
    </div>
  );
};
