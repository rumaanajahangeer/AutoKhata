import React from 'react';

/**
 * Pixel-art Yellow and Black Indian Auto Rickshaw Logo
 */
export const PixelAutoLogo = ({ size = 42, isSpinning = false }) => {
  return (
    <div 
      className="pixel-auto-wrapper" 
      style={{ display: 'inline-flex', alignItems: 'center', position: 'relative' }}
    >
      <svg 
        width={size} 
        height={Math.round(size * 0.75)} 
        viewBox="0 0 32 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        style={{ imageRendering: 'pixelated' }}
      >
        {/* Shadow */}
        <rect x="4" y="21" width="24" height="2" fill="#000000" opacity="0.6" />
        
        {/* Main Canvas Roof (Black) */}
        <rect x="8" y="2" width="16" height="5" fill="#1A1A1A" />
        <rect x="6" y="4" width="20" height="3" fill="#262626" />
        
        {/* Yellow Body & Hood */}
        <rect x="4" y="10" width="24" height="8" fill="#FFC800" />
        <rect x="2" y="13" width="26" height="5" fill="#FFC800" />
        <rect x="22" y="10" width="6" height="8" fill="#FFE066" /> {/* Front hood highlight */}
        
        {/* Black Lower Strip & Bumper */}
        <rect x="2" y="17" width="27" height="2" fill="#111111" />
        
        {/* Windshield & Cabin Window */}
        <rect x="8" y="7" width="7" height="4" fill="#64B5F6" opacity="0.8" />
        <rect x="16" y="7" width="8" height="4" fill="#90CAF9" opacity="0.8" />
        <rect x="23" y="7" width="2" height="4" fill="#111111" /> {/* Windshield frame */}

        {/* Driver Seat & Handlebar */}
        <rect x="21" y="9" width="2" height="3" fill="#111111" />
        
        {/* Headlight (Vibrant Yellow/White Glow) */}
        <rect x="27" y="12" width="3" height="3" fill="#FFFFFF" />
        <rect x="29" y="13" width="2" height="1" fill="#FFF59D" />

        {/* Rear Cover / Meter indicator */}
        <rect x="3" y="11" width="2" height="4" fill="#CC9900" />

        {/* Wheels (Pixel Circles) */}
        {/* Rear Wheel */}
        <g className={isSpinning ? "spinning-wheel" : ""} style={{ transformOrigin: '9px 19px' }}>
          <rect x="7" y="17" width="4" height="4" fill="#000000" />
          <rect x="8" y="18" width="2" height="2" fill="#888888" />
        </g>

        {/* Front Wheel */}
        <g className={isSpinning ? "spinning-wheel" : ""} style={{ transformOrigin: '24px 19px' }}>
          <rect x="22" y="17" width="4" height="4" fill="#000000" />
          <rect x="23" y="18" width="2" height="2" fill="#888888" />
        </g>
      </svg>
    </div>
  );
};
