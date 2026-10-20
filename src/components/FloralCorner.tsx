import React from 'react';

interface FloralCornerProps {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
  size?: number;
}

export const FloralCorner: React.FC<FloralCornerProps> = ({
  position = 'top-left',
  className = '',
  size = 72,
}) => {
  const rotationClass = {
    'top-left': '',
    'top-right': 'scale-x-[-1]',
    'bottom-left': 'scale-y-[-1]',
    'bottom-right': 'scale-x-[-1] scale-y-[-1]',
  }[position];

  return (
    <div
      className={`pointer-events-none select-none absolute z-10 ${rotationClass} ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-sm"
      >
        {/* Ornate corner frame vine */}
        <path
          d="M4 4 H55 C70 4 80 14 80 30 C80 40 72 46 62 46 C50 46 44 36 46 25 C48 16 58 12 65 18 C72 24 70 34 62 38"
          stroke="#D4AF37"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.85"
        />
        <path
          d="M4 4 V55 C4 70 14 80 30 80 C40 80 46 72 46 62 C46 50 36 44 25 46 C16 48 12 58 18 65 C24 72 34 70 38 62"
          stroke="#D4AF37"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.85"
        />
        {/* Corner Rose Flower */}
        <circle cx="24" cy="24" r="8" fill="#8B2635" opacity="0.9" />
        <path
          d="M20 23 C20 18 28 18 28 23 C28 28 20 28 20 23 Z"
          fill="#58111A"
        />
        <path
          d="M22 20 C24 17 29 19 28 22 C27 25 21 24 22 20 Z"
          fill="#A32C3F"
        />
        <circle cx="24" cy="24" r="2.5" fill="#E8C8B3" />

        {/* Rose Leaves & Rose Gold Filigree */}
        <path
          d="M14 16 C8 12 8 20 14 20 C20 20 20 12 14 16 Z"
          fill="#661523"
          stroke="#D4AF37"
          strokeWidth="0.8"
        />
        <path
          d="M16 14 C12 8 20 8 20 14 C20 20 12 20 16 14 Z"
          fill="#661523"
          stroke="#D4AF37"
          strokeWidth="0.8"
        />
        <path
          d="M32 20 C38 18 42 24 36 26 C30 28 28 22 32 20 Z"
          fill="#8B2635"
          opacity="0.75"
        />
        <path
          d="M20 32 C18 38 24 42 26 36 C28 30 22 28 20 32 Z"
          fill="#8B2635"
          opacity="0.75"
        />

        {/* Tiny gold accent dots */}
        <circle cx="36" cy="12" r="1.5" fill="#D4AF37" />
        <circle cx="12" cy="36" r="1.5" fill="#D4AF37" />
        <circle cx="48" cy="8" r="1.2" fill="#ECC880" />
        <circle cx="8" cy="48" r="1.2" fill="#ECC880" />
        <circle cx="4" cy="4" r="2.5" fill="#D4AF37" />
      </svg>
    </div>
  );
};

export const FloralDivider: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`flex items-center justify-center my-6 select-none ${className}`} aria-hidden="true">
      <div className="h-[1px] w-16 sm:w-24 bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-[#D4AF37]" />
      <div className="mx-3 flex items-center gap-1.5 text-[#D4AF37]">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="4.5" fill="#8B2635" stroke="#D4AF37" strokeWidth="1" />
          <circle cx="12" cy="12" r="1.8" fill="#ECC880" />
          <path d="M7 12 C4 9 4 15 7 12 Z" fill="#D4AF37" opacity="0.8" />
          <path d="M17 12 C20 9 20 15 17 12 Z" fill="#D4AF37" opacity="0.8" />
          <path d="M12 7 C9 4 15 4 12 7 Z" fill="#D4AF37" opacity="0.8" />
          <path d="M12 17 C9 20 15 20 12 17 Z" fill="#D4AF37" opacity="0.8" />
        </svg>
      </div>
      <div className="h-[1px] w-16 sm:w-24 bg-gradient-to-l from-transparent via-[#D4AF37]/60 to-[#D4AF37]" />
    </div>
  );
};
