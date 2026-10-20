import React, { useState } from 'react';

export const RotatingFlower: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative flex items-center justify-center select-none py-6 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsHovered((prev) => !prev)}
    >
      {/* Outer Romantic Radiant Glow Aura */}
      <div
        className={`absolute w-72 h-72 sm:w-88 sm:h-88 rounded-full pointer-events-none transition-all duration-1000 ${
          isHovered
            ? 'bg-radial from-[#ECC880]/35 via-[#8B2635]/25 to-transparent scale-110 blur-2xl'
            : 'bg-radial from-[#D4AF37]/25 via-[#661523]/20 to-transparent blur-xl'
        }`}
      />

      {/* Main SVG Flower Artwork Canvas */}
      <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center animate-flower-pulse cursor-pointer">
        {/* Layer 1: Outer Filigree Botanical Ring & Star Rays (Clockwise) */}
        <div
          className={`absolute inset-0 transition-transform duration-700 ${
            isHovered ? 'animate-[spin_20s_linear_infinite]' : 'animate-spin-slow'
          }`}
        >
          <svg viewBox="0 0 400 400" className="w-full h-full drop-shadow-md">
            <defs>
              <linearGradient id="goldFiligree" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFF2D6" />
                <stop offset="50%" stopColor="#D4AF37" />
                <stop offset="100%" stopColor="#AA7838" />
              </linearGradient>
              <radialGradient id="sunburstGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ECC880" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#8B2635" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Radiant Sunburst Ring */}
            <circle cx="200" cy="200" r="185" stroke="url(#goldFiligree)" strokeWidth="0.8" strokeDasharray="3 7" opacity="0.6" />
            <circle cx="200" cy="200" r="172" stroke="url(#goldFiligree)" strokeWidth="1.2" opacity="0.75" />

            {/* 16 Outer Botanical Flourishes & Vine Buds */}
            {Array.from({ length: 16 }).map((_, i) => {
              const angle = (i * 360) / 16;
              return (
                <g key={`outer-flourish-${i}`} transform={`rotate(${angle} 200 200)`}>
                  {/* Vine ray */}
                  <line x1="200" y1="28" x2="200" y2="48" stroke="url(#goldFiligree)" strokeWidth="1.2" />
                  {/* Outer tiny rosebud pearl */}
                  <circle cx="200" cy="24" r="4.5" fill="#8B2635" stroke="#ECC880" strokeWidth="1" />
                  <circle cx="200" cy="24" r="1.8" fill="#FFF2D6" />
                  {/* Decorative curling side leaves */}
                  <path
                    d="M200 40 C192 34 190 44 200 46"
                    stroke="url(#goldFiligree)"
                    strokeWidth="1"
                    fill="none"
                  />
                  <path
                    d="M200 40 C208 34 210 44 200 46"
                    stroke="url(#goldFiligree)"
                    strokeWidth="1"
                    fill="none"
                  />
                </g>
              );
            })}
          </svg>
        </div>

        {/* Layer 2: Outer Layer of 12 Velvet Burgundy & Rose-Gold Petals (Counter-Clockwise) */}
        <div
          className={`absolute inset-4 transition-transform duration-700 ${
            isHovered ? 'animate-[spin-reverse_14s_linear_infinite]' : 'animate-spin-reverse-slow'
          }`}
        >
          <svg viewBox="0 0 360 360" className="w-full h-full drop-shadow-lg">
            <defs>
              <linearGradient id="burgundyVelvet" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#A32C3F" />
                <stop offset="45%" stopColor="#7E1929" />
                <stop offset="85%" stopColor="#480E17" />
                <stop offset="100%" stopColor="#2A080E" />
              </linearGradient>
              <linearGradient id="petalGoldEdge" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ECC880" />
                <stop offset="50%" stopColor="#FFF2D6" />
                <stop offset="100%" stopColor="#B38054" />
              </linearGradient>
            </defs>

            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i * 360) / 12;
              return (
                <g key={`petal-outer-${i}`} transform={`rotate(${angle} 180 180)`}>
                  {/* Curved Velvet Rose Petal */}
                  <path
                    d="M180 32 C152 44 140 85 158 135 C170 160 180 175 180 175 C180 175 190 160 202 135 C220 85 208 44 180 32 Z"
                    fill="url(#burgundyVelvet)"
                    stroke="url(#petalGoldEdge)"
                    strokeWidth="1.2"
                    opacity="0.95"
                  />
                  {/* Subtle petal spine highlight */}
                  <path
                    d="M180 48 Q180 110 180 150"
                    stroke="#ECC880"
                    strokeWidth="0.8"
                    opacity="0.6"
                    strokeDasharray="2 3"
                  />
                  {/* Petal tip gold bead */}
                  <circle cx="180" cy="32" r="2.5" fill="#ECC880" />
                </g>
              );
            })}
          </svg>
        </div>

        {/* Layer 3: Middle Layer of 8 Champagne Rose & Peony Petals (Clockwise) */}
        <div
          className={`absolute inset-10 transition-transform duration-700 ${
            isHovered ? 'animate-[spin_9s_linear_infinite]' : 'animate-spin-inner'
          }`}
        >
          <svg viewBox="0 0 300 300" className="w-full h-full drop-shadow-md">
            <defs>
              <linearGradient id="champagnePetal" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E2A78F" />
                <stop offset="30%" stopColor="#B83A4B" />
                <stop offset="70%" stopColor="#8B2635" />
                <stop offset="100%" stopColor="#58111A" />
              </linearGradient>
            </defs>

            {Array.from({ length: 8 }).map((_, i) => {
              const angle = (i * 360) / 8 + 22.5;
              return (
                <g key={`petal-mid-${i}`} transform={`rotate(${angle} 150 150)`}>
                  {/* Broad blossoming inner petal */}
                  <path
                    d="M150 42 C125 58 120 95 136 128 C144 142 150 150 150 150 C150 150 156 142 164 128 C180 95 175 58 150 42 Z"
                    fill="url(#champagnePetal)"
                    stroke="#ECC880"
                    strokeWidth="1.2"
                    opacity="0.98"
                  />
                  {/* Gold inner filigree accent */}
                  <path
                    d="M150 56 C140 70 142 98 150 120 C158 98 160 70 150 56 Z"
                    fill="none"
                    stroke="#FFF2D6"
                    strokeWidth="0.7"
                    opacity="0.5"
                  />
                  <circle cx="150" cy="42" r="2" fill="#FFF2D6" />
                </g>
              );
            })}
          </svg>
        </div>

        {/* Layer 4: Center Blooming Rosette Core & Jewel (Counter-Clockwise Subtle) */}
        <div
          className={`absolute inset-20 transition-transform duration-700 ${
            isHovered ? 'animate-[spin-reverse_7s_linear_infinite]' : 'animate-[spin-reverse_14s_linear_infinite]'
          }`}
        >
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-xl">
            <defs>
              <radialGradient id="centerRuby" cx="40%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#ECC880" />
                <stop offset="25%" stopColor="#D44D61" />
                <stop offset="60%" stopColor="#8B2635" />
                <stop offset="100%" stopColor="#3A0A12" />
              </radialGradient>
              <linearGradient id="goldRibbon" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFF2D6" />
                <stop offset="50%" stopColor="#ECC880" />
                <stop offset="100%" stopColor="#B38054" />
              </linearGradient>
            </defs>

            {/* Spiraling Core Petals */}
            {Array.from({ length: 6 }).map((_, i) => {
              const angle = (i * 360) / 6;
              return (
                <path
                  key={`core-spiral-${i}`}
                  d="M100 62 C85 75 88 100 100 100 C112 100 115 75 100 62 Z"
                  fill="url(#centerRuby)"
                  stroke="url(#goldRibbon)"
                  strokeWidth="1.2"
                  transform={`rotate(${angle} 100 100)`}
                />
              );
            })}

            {/* Glowing Center Medallion */}
            <circle cx="100" cy="100" r="18" fill="url(#centerRuby)" stroke="url(#goldRibbon)" strokeWidth="1.8" />
            <circle cx="100" cy="100" r="12" fill="#58111A" stroke="#ECC880" strokeWidth="1" />
            <circle cx="100" cy="100" r="5" fill="#FFF2D6" />

            {/* Golden stamen starburst rays */}
            {Array.from({ length: 8 }).map((_, i) => {
              const angle = (i * 360) / 8;
              return (
                <line
                  key={`stamen-${i}`}
                  x1="100"
                  y1="85"
                  x2="100"
                  y2="88"
                  stroke="#ECC880"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  transform={`rotate(${angle} 100 100)`}
                />
              );
            })}
          </svg>
        </div>

        {/* Center Monogram Crest Overlay (Steady, Non-Rotating Anchor) */}
        <div className="absolute w-12 h-12 rounded-full border border-[#ECC880]/80 bg-[#28080F]/90 shadow-2xl flex flex-col items-center justify-center pointer-events-none backdrop-blur-xs">
          <span
            className="font-cinzel text-xs font-bold text-[#ECC880] tracking-wider drop-shadow-sm leading-none"
            style={{ textShadow: '0 0 6px rgba(236,200,128,0.7)' }}
          >
            A & P
          </span>
          <span className="text-[7px] text-[#ECC880]/90 tracking-widest font-sans-clean uppercase font-semibold">
            2026
          </span>
        </div>
      </div>

      {/* Interactive prompt note below flower */}
      <div className="absolute -bottom-2 text-center pointer-events-none">
        <span className="font-serif-luxury italic text-xs text-[#8B2635] tracking-widest font-medium">
          ✦ In Eternal Bloom · Abrar & Payelia ✦
        </span>
      </div>
    </div>
  );
};
