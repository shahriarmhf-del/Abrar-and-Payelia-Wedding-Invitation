import React, { useMemo } from 'react';

export const PetalsOverlay: React.FC<{ enabled: boolean }> = ({ enabled }) => {
  const petals = useMemo(() => {
    return Array.from({ length: 16 }).map((_, i) => ({
      id: i,
      left: `${(i * 6.2 + Math.random() * 4) % 100}%`,
      animationDuration: `${7 + (i % 6) * 1.8}s`,
      animationDelay: `${(i % 5) * 1.5}s`,
      size: 14 + (i % 4) * 5,
      opacity: 0.4 + (i % 3) * 0.2,
      rotate: (i * 45) % 360,
    }));
  }, []);

  if (!enabled) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden" aria-hidden="true">
      {petals.map((p) => (
        <div
          key={p.id}
          className="absolute -top-10"
          style={{
            left: p.left,
            animation: `float-petal ${p.animationDuration} linear infinite`,
            animationDelay: p.animationDelay,
            opacity: p.opacity,
          }}
        >
          <svg
            width={p.size}
            height={p.size * 1.3}
            viewBox="0 0 24 32"
            fill="none"
            style={{ transform: `rotate(${p.rotate}deg)` }}
          >
            {/* Soft Organic Rose Petal Shape */}
            <path
              d="M12 0 C18 6 24 16 20 26 C16 32 8 32 4 26 C0 16 6 6 12 0 Z"
              fill={p.id % 2 === 0 ? '#8B2635' : '#B83A4B'}
            />
            {/* Subtle petal vein highlight */}
            <path
              d="M12 4 C13 12 13 20 12 28"
              stroke="#ECC880"
              strokeWidth="0.5"
              opacity="0.6"
            />
          </svg>
        </div>
      ))}
    </div>
  );
};
