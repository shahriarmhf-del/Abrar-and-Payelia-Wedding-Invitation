import React from 'react';
import { FloralCorner, FloralDivider } from './FloralCorner';

interface EventNode {
  time: string;
  title: string;
  description: string;
  highlight?: boolean;
}

const scheduleEvents: EventNode[] = [
  {
    time: '1:00 PM',
    title: 'Guest Arrival',
    description: 'Welcome with fragrant rosewater, sherbet refreshments, and seating in the royal hall.',
  },
  {
    time: '2:00 PM',
    title: 'Wedding Feast',
    description: 'A lavish traditional feast celebrating heritage culinary specialties and warm hospitality.',
  },
  {
    time: '3:00 PM',
    title: 'Nikkah Ceremony',
    description: 'Solemn recitation, mutual consent, and signing of the sacred Nikkahnama under floral canopy.',
    highlight: true,
  },
  {
    time: '4:00 PM',
    title: 'Meet and Greet',
    description: 'Family blessings, exchange of heartfelt gifts, and celebratory photograph sessions.',
  },
  {
    time: '5:00 PM',
    title: 'End of Ceremony',
    description: 'Bidding farewell with gratitude, sweetness, and cherished memories to take home.',
  },
];

// Custom Rose Icon for Timeline Nodes
const RoseNodeIcon: React.FC<{ highlight?: boolean }> = ({ highlight }) => (
  <div
    className={`relative w-10 h-10 rounded-full flex items-center justify-center shadow-md border transition-transform duration-300 hover:scale-110 ${
      highlight
        ? 'bg-[#8B2635] border-[#ECC880] ring-4 ring-[#ECC880]/30'
        : 'bg-[#2D0F16] border-[#D4AF37]/60'
    }`}
  >
    <svg viewBox="0 0 32 32" className="w-5 h-5" fill="none">
      {/* Rose Bloom Petals */}
      <circle cx="16" cy="16" r="6" fill={highlight ? '#E8C8B3' : '#ECC880'} opacity="0.9" />
      <path
        d="M12 15 C12 11 16 10 17 13 C18 10 21 12 20 15 C22 17 20 20 17 20 C14 20 12 18 12 15 Z"
        fill="#8B2635"
      />
      <circle cx="16" cy="15" r="2.5" fill={highlight ? '#FAF6F0' : '#ECC880'} />
      {/* Tiny leaves */}
      <path d="M10 20 C8 23 12 24 14 21 Z" fill="#4D8B4D" opacity="0.8" />
      <path d="M22 20 C24 23 20 24 18 21 Z" fill="#4D8B4D" opacity="0.8" />
    </svg>
  </div>
);

export const ScheduleTimeline: React.FC = () => {
  return (
    <section className="relative w-full py-10 px-4 sm:px-6 flex justify-center">
      <div
        className="relative w-full max-w-2xl text-[#382027] rounded-3xl p-6 sm:p-10 shadow-2xl border border-[#c48a86]"
        style={{
          background: 'linear-gradient(145deg, #fffaf3ee, #f8eddfef)',
          outline: '1px solid rgba(224, 189, 131, 0.45)',
          outlineOffset: '-9px',
          boxShadow: '0 18px 55px rgba(84, 16, 32, 0.12), inset 0 2px 0 rgba(255, 255, 255, 0.6)',
        }}
      >
        <FloralCorner position="top-left" size={60} className="top-2 left-2" />
        <FloralCorner position="top-right" size={60} className="top-2 right-2" />
        <FloralCorner position="bottom-left" size={60} className="bottom-2 left-2" />
        <FloralCorner position="bottom-right" size={60} className="bottom-2 right-2" />

        <div className="absolute inset-3 sm:inset-4 border border-[#e0bd83]/30 rounded-2xl pointer-events-none" />

        <div className="relative z-10">
          <div className="text-center">
            <span className="font-cinzel text-xs tracking-[0.25em] text-[#84243b] font-semibold uppercase">
              Order of Celebration
            </span>
            <h2 className="font-script text-4xl sm:text-5xl text-[#541020] my-1">
              Schedule of Events
            </h2>
            <p className="font-serif-luxury italic text-xs sm:text-sm text-[#84243b]/85">
              Friday, November 06, 2026 · Auspicious Timings
            </p>
            <FloralDivider className="my-4" />
          </div>

          {/* Vertical Timeline Structure */}
          <div className="relative mt-8 mb-4">
            {/* Continuous Vertical Connecting Line */}
            <div className="absolute left-[19px] sm:left-1/2 -translate-x-1/2 top-4 bottom-8 w-[2px] bg-gradient-to-b from-[#e0bd83] via-[#bb3151] to-[#e0bd83]/40 pointer-events-none" />

            <div className="space-y-8 sm:space-y-10">
              {scheduleEvents.map((item, index) => {
                const isEven = index % 2 === 0;

                return (
                  <div
                    key={item.time}
                    className="relative flex items-start sm:items-center gap-4 sm:gap-0"
                  >
                    {/* Mobile icon (Left-aligned) / Desktop Icon (Center-pinned) */}
                    <div className="sm:absolute sm:left-1/2 sm:-translate-x-1/2 z-20 shrink-0">
                      <RoseNodeIcon highlight={item.highlight} />
                    </div>

                    {/* Desktop Split Content or Mobile Content Card */}
                    <div
                      className={`w-full sm:w-[calc(50%-2.5rem)] ${
                        isEven ? 'sm:mr-auto sm:text-right' : 'sm:ml-auto sm:text-left'
                      }`}
                    >
                      <div
                        className={`rounded-2xl p-4 sm:p-5 transition-all duration-300 border ${
                          item.highlight
                            ? 'bg-[#541020] text-[#fffaf2] border-[#e0bd83] shadow-lg'
                            : 'bg-white/85 text-[#382027] border-[#c48a86]/50 hover:border-[#84243b] shadow-sm'
                        }`}
                      >
                        <div
                          className={`flex items-center gap-2 mb-1.5 ${
                            isEven ? 'sm:justify-end' : 'sm:justify-start'
                          }`}
                        >
                          <span
                            className={`font-cinzel text-xs font-bold tracking-wider px-2.5 py-0.5 rounded-full ${
                              item.highlight
                                ? 'bg-[#e0bd83] text-[#38101a]'
                                : 'bg-[#84243b]/15 text-[#84243b]'
                            }`}
                          >
                            {item.time}
                          </span>
                          {item.highlight && (
                            <span className="text-[10px] font-sans-clean tracking-wider text-[#ffd9a0] uppercase font-semibold">
                              Main Vows
                            </span>
                          )}
                        </div>

                        <h3
                          className={`font-serif-luxury text-xl sm:text-2xl font-bold leading-tight ${
                            item.highlight ? 'text-[#ffd9a0]' : 'text-[#541020]'
                          }`}
                        >
                          {item.title}
                        </h3>

                        <p
                          className={`font-sans-clean text-xs sm:text-sm mt-1 leading-relaxed ${
                            item.highlight ? 'text-[#f7efe5]' : 'text-[#84243b]/85'
                          }`}
                        >
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="font-serif-luxury italic text-xs text-[#84243b]">
              Kindly arrive promptly at 1:45 PM to partake in the warm reception rituals.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
