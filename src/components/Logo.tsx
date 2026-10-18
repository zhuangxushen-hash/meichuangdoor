/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import logoLight from '../assets/images/logo_light.png';
import logoDark from '../assets/images/logo_dark.png';

interface LogoProps {
  className?: string;
  light?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = "", light = false }) => {
  return (
    <div className={`flex items-center ${className}`} id="brand-logo-container">
      <img 
        id="brand-logo-img"
        src={light ? logoLight : logoDark} 
        alt="美创门业" 
        className="h-8 sm:h-10 md:h-11 lg:h-12 xl:h-14 w-auto object-contain transition-all duration-300"
        referrerPolicy="no-referrer"
      />
    </div>
  );
};

