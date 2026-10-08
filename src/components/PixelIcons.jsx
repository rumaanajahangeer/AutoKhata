import React from 'react';

/**
 * Pixel ₹ / Coin Icon
 */
export const PixelCoinIcon = ({ size = 20, color = "#FFC800" }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
    <rect x="3" y="1" width="10" height="14" fill={color} />
    <rect x="1" y="3" width="14" height="10" fill={color} />
    <rect x="4" y="2" width="8" height="12" fill="#FFE066" />
    {/* Rupee Symbol ₹ in pixel lines */}
    <rect x="6" y="4" width="5" height="1" fill="#000" />
    <rect x="6" y="6" width="5" height="1" fill="#000" />
    <rect x="6" y="5" width="2" height="4" fill="#000" />
    <rect x="6" y="8" width="4" height="1" fill="#000" />
    <rect x="8" y="9" width="1" height="1" fill="#000" />
    <rect x="9" y="10" width="2" height="2" fill="#000" />
  </svg>
);

/**
 * Pixel Calendar Icon
 */
export const PixelCalendarIcon = ({ size = 20, color = "#FFC800" }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
    <rect x="2" y="3" width="12" height="11" fill="#222222" />
    <rect x="2" y="3" width="12" height="3" fill={color} />
    <rect x="4" y="1" width="2" height="3" fill="#FFFFFF" />
    <rect x="10" y="1" width="2" height="3" fill="#FFFFFF" />
    <rect x="4" y="8" width="2" height="2" fill={color} />
    <rect x="7" y="8" width="2" height="2" fill="#FFFFFF" />
    <rect x="10" y="8" width="2" height="2" fill="#FFFFFF" />
    <rect x="4" y="11" width="2" height="2" fill="#FFFFFF" />
    <rect x="7" y="11" width="2" height="2" fill={color} />
  </svg>
);

/**
 * Pixel History / Scroll Icon
 */
export const PixelHistoryIcon = ({ size = 20, color = "#FFC800" }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
    <rect x="2" y="2" width="12" height="12" fill="#1C1C1C" />
    <rect x="3" y="1" width="10" height="1" fill={color} />
    <rect x="3" y="14" width="10" height="1" fill={color} />
    <rect x="5" y="4" width="6" height="1" fill={color} />
    <rect x="5" y="7" width="6" height="1" fill="#FFFFFF" />
    <rect x="5" y="10" width="4" height="1" fill="#888888" />
  </svg>
);

/**
 * Pixel 3-People Split Icon
 */
export const PixelPeopleIcon = ({ size = 24, color = "#FFC800" }) => (
  <svg width={size} height={size} viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
    {/* Person 1 (Left) */}
    <rect x="2" y="3" width="4" height="4" fill="#FFFFFF" />
    <rect x="1" y="8" width="6" height="7" fill={color} />

    {/* Person 2 (Center - Featured) */}
    <rect x="10" y="1" width="4" height="4" fill="#FFFFFF" />
    <rect x="9" y="6" width="6" height="9" fill={color} />

    {/* Person 3 (Right) */}
    <rect x="18" y="3" width="4" height="4" fill="#FFFFFF" />
    <rect x="17" y="8" width="6" height="7" fill={color} />
  </svg>
);

/**
 * Pixel Meter / Speedometer Icon
 */
export const PixelMeterIcon = ({ size = 20, color = "#FFC800" }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
    <rect x="3" y="3" width="10" height="10" fill="#111111" />
    <rect x="4" y="2" width="8" height="1" fill={color} />
    <rect x="4" y="13" width="8" height="1" fill={color} />
    <rect x="8" y="6" width="1" height="4" fill="#FF4D4D" />
    <rect x="7" y="9" width="3" height="1" fill="#FF4D4D" />
  </svg>
);
