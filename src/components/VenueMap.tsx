import React, { useState } from 'react';
import { FloralCorner, FloralDivider } from './FloralCorner';
import { MapPin, Navigation, ExternalLink, Copy, Check, Clock, CalendarDays } from 'lucide-react';

export const VenueMap: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const mapsUrl = 'https://maps.app.goo.gl/XeMPTjPATWskRh6LA';
  const addressText = 'JK Convention Hall, Tropical Saleh Tower, Lift-5, Atish Dipankar Road, Basabo(Near Boddho mondir), Dhaka';

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(addressText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

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
          {/* Section Title: "Location" in script typography */}
          <div className="text-center">
            <span className="font-cinzel text-xs tracking-[0.25em] text-[#84243b] font-semibold uppercase">
              The Venue Destination
            </span>
            <h2 className="font-script text-5xl sm:text-6xl text-[#541020] my-1">
              Location
            </h2>
            <FloralDivider className="my-3" />
          </div>

          {/* Venue Specific Details Card */}
          <div className="bg-[#541020] text-[#fffaf2] rounded-2xl p-5 sm:p-6 border border-[#e0bd83] shadow-xl my-6 text-center outline-1 outline-[#e0bd83]/40 outline-offset-[-4px]">
            {/* Venue Name */}
            <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#ffd9a0] tracking-wide mb-3">
              JK Convention Hall
            </h3>

            {/* Date & Time */}
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs sm:text-sm text-[#f7efe5] font-sans-clean mb-3">
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="w-4 h-4 text-[#e0bd83]" />
                <strong>Friday, November 06, 2026</strong>
              </span>
              <span className="text-[#e0bd83]/50 hidden sm:inline">|</span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#e0bd83]" />
                <strong>1:00 PM (Dhaka Time)</strong>
              </span>
            </div>

            {/* Address */}
            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-[#fffaf2]/90 font-serif-luxury text-center max-w-md mx-auto">
              <MapPin className="w-4 h-4 text-[#e0bd83] shrink-0" />
              <span>{addressText}</span>
            </div>

            {/* Quick Copy Address Button */}
            <div className="mt-4 flex items-center justify-center gap-2">
              <button
                onClick={handleCopyAddress}
                type="button"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-[#ffd9a0] text-xs font-sans-clean transition-colors cursor-pointer border border-[#e0bd83]/40"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Address Copied!' : 'Copy Venue Address'}</span>
              </button>
            </div>
          </div>

          {/* Interactive Google Maps Embed with Overlay */}
          <div className="relative rounded-2xl overflow-hidden border border-[#e0bd83] shadow-lg">
            {/* Google Maps Iframe Embed Preview */}
            <div className="w-full h-72 sm:h-80 bg-[#1A0A0E] relative">
              <iframe
                title="JK Convention Hall Location Map"
                src="https://maps.google.com/maps?q=JK+Convention+Hall,+Tropical+Saleh+Tower,+Atish+Dipankar+Road,+Basabo,+Dhaka&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0 filter contrast-105"
                loading="lazy"
                allowFullScreen
              />

              {/* Gradient border tint overlay on edges */}
              <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-[#e0bd83]/30" />
            </div>

            {/* "Open in Maps" overlay bar */}
            <div className="p-4 bg-gradient-to-r from-[#541020] via-[#76233a] to-[#541020] border-t border-[#e0bd83] flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left text-[#fffaf2]">
              <div>
                <span className="font-cinzel text-xs font-semibold text-[#ffd9a0] tracking-wider block">
                  Find Your Way with Ease
                </span>
                <span className="font-sans-clean text-[11px] text-[#f7efe5]/85">
                  Basabo, Dhaka · Parking & Valet available at premises
                </span>
              </div>

              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#e0bd83] text-[#fff0d4] font-cinzel text-xs font-bold tracking-wider hover:brightness-110 active:scale-95 transition-all shadow-md cursor-pointer whitespace-nowrap"
                style={{
                  background: 'linear-gradient(135deg, #84243b, #451020)',
                }}
              >
                <Navigation className="w-4 h-4 fill-[#ffd9a0] text-[#ffd9a0]" />
                <span>Open in Maps</span>
                <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

