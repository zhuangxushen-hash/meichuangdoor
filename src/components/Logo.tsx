/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface LogoProps {
  className?: string;
  light?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = "", light = false }) => {
  const brandGold = "#D2995D";
  const textColor = light ? "#FFFFFF" : "#000000";

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Door Icon Part */}
      <div className="relative w-12 h-10 flex items-center">
        <svg viewBox="0 0 100 80" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMid meet">
          {/* Framed Background/Bracket */}
          <path d="M35 15 H95 V25" stroke={brandGold} strokeWidth="3" />
          <path d="M35 65 H95 V55" stroke={brandGold} strokeWidth="3" />
          
          {/* Perspective Door */}
          <path d="M5 10 L35 20 V60 L5 70 Z" fill={brandGold} />
        </svg>
      </div>

      {/* Text Part */}
      <div className="flex flex-col">
        <span 
          className="text-2xl font-bold tracking-tight leading-none" 
          style={{ color: textColor, fontFamily: '"Noto Sans SC", sans-serif' }}
        >
          美创门业
        </span>
        <span 
          className="text-[11px] font-medium tracking-wide leading-none mt-1" 
          style={{ color: textColor, opacity: 0.8 }}
        >
          Meichuang
        </span>
      </div>
    </div>
  );
};
