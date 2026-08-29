import React from 'react';

export default function GovernmentEmblem({ size = 48, className = "" }) {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <svg 
        width={size} 
        height={size * 1.2} 
        viewBox="0 0 100 120" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}
      >
        {/* Outer Laurel / Crown Top */}
        <path d="M50 8C53 12 56 12 60 9C58 15 62 17 65 15C62 20 67 22 71 19C67 24 71 27 75 25C70 30 73 34 77 33C71 37 73 42 77 43" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M50 8C47 12 44 12 40 9C42 15 38 17 35 15C38 20 33 22 29 19C33 24 29 27 25 25C30 30 27 34 23 33C29 37 27 42 23 43" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round"/>
        
        {/* Center Lion Heads Silhouette */}
        {/* Left Lion */}
        <path d="M32 24C28 22 24 28 28 32C24 35 26 42 30 44C27 48 30 54 36 54C34 58 38 62 44 62V48C40 48 36 44 36 38C36 32 34 28 32 24Z" fill="#B45309" stroke="#92400E" strokeWidth="1.5"/>
        {/* Right Lion */}
        <path d="M68 24C72 22 76 28 72 32C76 35 74 42 70 44C73 48 70 54 64 54C66 58 62 62 56 62V48C60 48 64 44 64 38C64 32 66 28 68 24Z" fill="#B45309" stroke="#92400E" strokeWidth="1.5"/>
        {/* Central Front Lion */}
        <path d="M50 18C44 18 40 24 40 32C40 38 42 44 44 48C44 54 46 60 50 64C54 60 56 54 56 48C58 44 60 38 60 32C60 24 56 18 50 18Z" fill="#D97706" stroke="#B45309" strokeWidth="1.5"/>
        
        {/* Lion Details: Eyes & Muzzle */}
        <circle cx="45" cy="28" r="1.5" fill="#451A03"/>
        <circle cx="55" cy="28" r="1.5" fill="#451A03"/>
        <path d="M47 34C49 36 51 36 53 34" stroke="#451A03" strokeWidth="1.5" strokeLinecap="round"/>

        {/* Abacus / Base Plate */}
        <rect x="20" y="64" width="60" height="14" rx="3" fill="#1E3A8A" stroke="#1D4ED8" strokeWidth="1.5"/>
        
        {/* Ashoka Chakra (Wheel of Law) */}
        <circle cx="50" cy="71" r="5" fill="#FFFFFF" stroke="#0F2552" strokeWidth="1.5"/>
        {/* Chakra Spokes */}
        <path d="M50 66V76M45 71H55M46.5 67.5L53.5 74.5M46.5 74.5L53.5 67.5" stroke="#0F2552" strokeWidth="1"/>

        {/* Bull on left */}
        <path d="M26 73C29 73 31 69 34 71" stroke="#F59E0B" strokeWidth="1.5"/>
        {/* Horse on right */}
        <path d="M74 73C71 73 69 69 66 71" stroke="#F59E0B" strokeWidth="1.5"/>

        {/* Pedestal Base */}
        <path d="M15 78H85L78 92H22L15 78Z" fill="#D97706" stroke="#92400E" strokeWidth="1.5"/>
        <path d="M22 84H78" stroke="#FEF3C7" strokeWidth="1.5"/>

        {/* Satyameva Jayate text banner line */}
        <rect x="18" y="94" width="64" height="12" rx="2" fill="#0F2552"/>
        <text x="50" y="102" fontSize="6.5" fontWeight="bold" fill="#FBBF24" textAnchor="middle" fontFamily="sans-serif" letterSpacing="0.5">
          सत्यमेव जयते
        </text>
      </svg>
    </div>
  );
}
