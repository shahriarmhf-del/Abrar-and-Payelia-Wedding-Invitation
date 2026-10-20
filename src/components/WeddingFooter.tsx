import React from 'react';
import { FloralDivider } from './FloralCorner';
import { Heart } from 'lucide-react';

export const WeddingFooter: React.FC<{ onReplayEnvelope: () => void }> = ({ onReplayEnvelope }) => {
  return (
    <footer className="relative w-full bg-[#281016] text-[#fffaf2] py-12 px-6 border-t border-[#e0bd83]/40 text-center overflow-hidden">
      <div className="max-w-2xl mx-auto relative z-10">
        {/* Monogram Crest */}
        <div className="w-14 h-14 mx-auto rounded-full border border-[#e0bd83] flex items-center justify-center bg-[#4a1020] shadow-md mb-3">
          <span className="font-cinzel text-base font-bold text-[#ffd9a0]">A & P</span>
        </div>

        <h3 className="font-script text-3xl sm:text-4xl text-[#ffd9a0]">
          Abrar & Payelia
        </h3>

        <p className="font-serif-luxury italic text-sm text-[#f7efe5]/90 mt-1">
          November 06, 2026 · Basabo, Dhaka, Bangladesh
        </p>

        <FloralDivider className="my-4 opacity-50" />

        <p className="font-sans-clean text-xs text-[#f7efe5]/80 max-w-md mx-auto leading-relaxed">
          With warmest gratitude from the bride and groom, alongside their families, for your prayers, presence, and love.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs font-cinzel text-[#e0bd83]">
          <button
            onClick={onReplayEnvelope}
            type="button"
            className="hover:text-[#ffd9a0] underline cursor-pointer"
          >
            Replay Wax Seal Envelope
          </button>
          <span aria-hidden="true">·</span>
          <a
            href="https://maps.app.goo.gl/XeMPTjPATWskRh6LA"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#ffd9a0] underline cursor-pointer"
          >
            Google Maps Directions
          </a>
        </div>

        <div className="mt-8 pt-6 border-t border-[#e0bd83]/20 flex flex-col sm:flex-row items-center justify-center gap-2 text-[11px] text-[#f7efe5]/70 font-sans-clean">
          <div className="flex items-center gap-1.5">
            <span>Crafted with</span>
            <Heart className="w-3 h-3 text-[#bb3151] fill-[#bb3151]" />
            <span>for the wedding of Abrar & Payelia</span>
          </div>
          <span className="hidden sm:inline text-[#e0bd83]/40">·</span>
          <span className="font-cinzel text-[#ffd9a0] font-semibold">Developed by Imran Shahriar</span>
        </div>
      </div>
    </footer>
  );
};
