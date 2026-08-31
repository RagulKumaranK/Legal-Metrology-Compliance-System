import React from 'react';
import heroLogo from '../assets/hero.png';

export default function GovernmentEmblem({ size = 56, className = "", customSrc = null }) {
  const logoSource = customSrc || heroLogo;

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <img 
        src={logoSource} 
        alt="Legal Metrology Government Emblem Logo" 
        style={{ maxHeight: `${size}px`, width: 'auto' }}
        className="object-contain drop-shadow-sm transition-transform hover:scale-105"
      />
    </div>
  );
}
