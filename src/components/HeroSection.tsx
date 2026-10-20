import React from 'react';
import { FloralDivider, FloralCorner } from './FloralCorner';
import { RotatingFlower } from './RotatingFlower';
import { groomImage, brideImage } from '../assets/portraits';
import { Heart, Sparkles, ArrowDown } from 'lucide-react';

interface HeroSectionProps {
  onScrollToNext: () => void;
  onScrollToCouple?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onScrollToNext, onScrollToCouple }) => {
  return (
    <section className="relative w-full overflow-hidden pt-6 pb-14 px-4 sm:px-6 flex flex-col items-center justify-center text-center">
      {/* Ambient background glow with multi-color wedding radiance */}
      <div className="absolute top-1/4 left-1/4 w-[28rem] h-[28rem] bg-[#bb3151]/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[28rem] h-[28rem] bg-[#f59e0b]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[36rem] h-[36rem] bg-[#047857]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Decorative Outer Frame with Reference Project Palette */}
      <div
        className="relative w-full max-w-4xl text-[#fffaf2] rounded-3xl p-6 sm:p-10 shadow-2xl border-2 border-[#e0bd83] overflow-hidden"
        style={{
          background: 'radial-gradient(ellipse at 50% 25%, #76233a 0%, #4a1020 55%, #260811 100%)',
          boxShadow: '0 25px 80px rgba(69, 16, 32, 0.4), inset 0 2px 0 rgba(224, 189, 131, 0.4)',
        }}
      >
        {/* Four Elegant Floral Corners */}
        <FloralCorner position="top-left" size={68} className="top-2 left-2" />
        <FloralCorner position="top-right" size={68} className="top-2 right-2" />
        <FloralCorner position="bottom-left" size={68} className="bottom-2 left-2" />
        <FloralCorner position="bottom-right" size={68} className="bottom-2 right-2" />

        {/* Inner hairline border with gold sheen */}
        <div className="absolute inset-3 sm:inset-4 border border-[#e0bd83]/40 rounded-2xl pointer-events-none" />

        {/* Header Eyebrow Text: Wedding Day - 06.11.26 */}
        <div className="relative z-10 pt-2">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#38101a]/80 border border-[#e0bd83]/60 mb-2 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b] animate-ping" />
            <p className="font-cinzel text-xs sm:text-sm tracking-[0.32em] text-[#e0bd83] font-bold uppercase">
              ✦ Wedding Day — 06.11.26 ✦
            </p>
            <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b] animate-ping" />
          </div>

          <FloralDivider className="my-2 opacity-90" />

          {/* Main Title in cursive script */}
          <h1
            className="font-script text-6xl sm:text-7xl lg:text-8xl text-[#ffd9a0] font-normal leading-tight tracking-normal my-2 select-none drop-shadow-md"
            style={{ textShadow: '0 4px 28px rgba(224, 189, 131, 0.35)' }}
          >
            Abrar and Payelia
          </h1>

          <p className="font-serif-luxury italic text-base sm:text-xl text-[#f7efe5]/90 max-w-lg mx-auto mt-1 mb-4">
            Two souls uniting under boundless love, blessed by family and grace
          </p>

          {/* Elegant Couple Cameo Badges flanking the center */}
          <div className="flex items-center justify-center gap-3 sm:gap-6 my-2">
            {/* Groom Cameo */}
            <a
              href="#couple"
              className="group flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#260811]/90 border border-[#e0bd83] hover:border-[#ffd9a0] hover:scale-105 transition-all shadow-md cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full overflow-hidden border border-[#e0bd83] bg-[#3d0d19]">
                <img
                  src={groomImage}
                  alt="Md. Abrar Shahriar"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top scale-125"
                />
              </div>
              <span className="font-serif-luxury text-xs sm:text-sm text-[#ffd9a0] font-semibold">
                Abrar · Groom
              </span>
            </a>

            <div className="w-6 h-6 rounded-full bg-[#bb3151]/40 border border-[#e0bd83]/60 flex items-center justify-center">
              <Heart className="w-3 h-3 text-[#ffd9a0] fill-current" />
            </div>

            {/* Bride Cameo */}
            <a
              href="#couple"
              className="group flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#260811]/90 border border-[#e0bd83] hover:border-[#ffd9a0] hover:scale-105 transition-all shadow-md cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full overflow-hidden border border-[#e0bd83] bg-[#420e1d]">
                <img
                  src={brideImage}
                  alt="Payelia"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top scale-125"
                />
              </div>
              <span className="font-serif-luxury text-xs sm:text-sm text-[#ffd9a0] font-semibold">
                Payelia · Bride
              </span>
            </a>
          </div>

          {/* GRAND CENTERPIECE: Gorgeous Rotating Rose Mandala Flower Animation */}
          <div className="relative my-6 flex flex-col items-center justify-center">
            <RotatingFlower />
          </div>

          {/* Subtext: "Scroll down" with interactive prompt */}
          <div className="mt-4 flex flex-col items-center justify-center">
            <button
              onClick={onScrollToNext}
              type="button"
              className="group flex flex-col items-center gap-1.5 text-[#e0bd83] hover:text-[#ffd9a0] transition-colors focus:outline-none cursor-pointer"
              aria-label="Scroll down to invitation details"
            >
              <span className="font-cinzel text-xs tracking-[0.24em] uppercase font-bold text-[#ffd9a0]">
                Scroll Down
              </span>
              <div className="w-9 h-9 rounded-full border border-[#e0bd83] flex items-center justify-center group-hover:border-[#ffd9a0] group-hover:translate-y-1 transition-all bg-[#4a1020]/90 shadow-md">
                <ArrowDown className="w-4 h-4 text-[#ffd9a0] animate-bounce" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
