import React from 'react';
import { PixelAutoLogo } from './PixelAutoLogo';

export const PixelRoadDecoration = ({ showMiniAuto = false }) => {
  return (
    <div style={{ position: 'relative', overflow: 'hidden', margin: '20px 0 10px 0' }}>
      {showMiniAuto && (
        <div 
          className="driving-auto"
          style={{
            position: 'absolute',
            bottom: '4px',
            zIndex: 2,
            pointerEvents: 'none'
          }}
        >
          <PixelAutoLogo size={24} isSpinning={true} />
        </div>
      )}
      
      {/* Black & Yellow Curb Strip */}
      <div className="road-curb" />
    </div>
  );
};
