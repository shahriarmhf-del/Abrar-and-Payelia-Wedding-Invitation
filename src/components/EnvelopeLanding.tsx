import React, { useState, useEffect } from 'react';
import { playSealBreakSound, harpPlayer } from '../utils/audio';
import { weddingMusic } from '../utils/musicController';
import { Sparkles, ArrowRight } from 'lucide-react';

interface EnvelopeLandingProps {
  onOpen: () => void;
  isOpen: boolean;
}

type AnimationPhase = 'idle' | 'cracking' | 'flap-opening' | 'card-rising' | 'complete';

export const EnvelopeLanding: React.FC<EnvelopeLandingProps> = ({ onOpen, isOpen }) => {
  const [phase, setPhase] = useState<AnimationPhase>('idle');

  // Reset animation states whenever envelope is re-opened/closed
  useEffect(() => {
    if (!isOpen) {
      setPhase('idle');
    }
  }, [isOpen]);

  const handleOpenEnvelope = () => {
    if (phase !== 'idle' || isOpen) return;

    // Start official wedding music (Kudmayi from 6s)
    weddingMusic.play();

    // Step 1: Crack seal with sound
    setPhase('cracking');
    playSealBreakSound();

    // Step 2: Open top flap
    const timer1 = setTimeout(() => {
      setPhase('flap-opening');
    }, 350);

    // Step 3: Slide card up out of envelope pocket
    const timer2 = setTimeout(() => {
      setPhase('card-rising');
    }, 900);

    // Step 4: Smoothly complete and transition to main invitation
    const timer3 = setTimeout(() => {
      setPhase('complete');
      onOpen();
    }, 2200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  };

  const handleDirectOpen = () => {
    harpPlayer.start();
    setPhase('complete');
    onOpen();
  };

  const isFlapOpen = phase === 'flap-opening' || phase === 'card-rising' || phase === 'complete';
  const isCardUp = phase === 'card-rising' || phase === 'complete';
  const isSealBroken = phase !== 'idle';

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0F0507] transition-all duration-1000 px-4 select-none ${
        isOpen ? 'opacity-0 pointer-events-none -translate-y-full' : 'opacity-100 pointer-events-auto'
      }`}
    >
      {/* Background dark romantic ambiance */}
      <div className="absolute inset-0 bg-radial from-[#320C15]/90 via-[#18060A] to-[#0A0204] pointer-events-none" />

      {/* Developed by Imran Shahriar at top right corner */}
      <div className="absolute top-3.5 right-3.5 sm:top-5 sm:right-6 z-50 pointer-events-auto">
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1c080d]/85 backdrop-blur-md border border-[#e0bd83]/60 text-[10px] sm:text-xs font-cinzel text-[#ffd9a0] tracking-wider shadow-lg">
          <Sparkles className="w-3 h-3 text-[#e0bd83] animate-pulse" />
          <span>Developed by Imran Shahriar</span>
        </div>
      </div>

      {/* Floating subtle gold particle atmosphere */}
      <div className="absolute inset-0 opacity-25 pointer-events-none bg-[radial-gradient(#ECC880_1px,transparent_1px)] [background-size:28px_28px]" />

      {/* Main Envelope Stage */}
      <div className="relative w-full max-w-md sm:max-w-lg aspect-[1.38/1] [perspective:1600px] my-auto">
        {/* Shadow beneath envelope */}
        <div className="absolute -bottom-10 left-8 right-8 h-14 bg-black/90 blur-2xl rounded-full" />

        {/* Outer Envelope Wrapper */}
        <div className="relative w-full h-full">
          {/* 1. Envelope Interior Backing (Inside lining with gold damask) */}
          <div
            className="absolute inset-0 rounded-2xl border border-[#D4AF37]/50 shadow-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(145deg, #2D0812 0%, #1A0409 50%, #280810 100%)',
            }}
          >
            {/* Interior floral damask watermark */}
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_center,_#ECC880_1px,transparent_2px)] [background-size:16px_16px]" />
            <div className="absolute inset-4 border border-[#ECC880]/20 rounded-xl pointer-events-none" />
          </div>

          {/* 2. Invitation Card inside Envelope Pocket that rises UP */}
          <div
            className={`absolute inset-x-6 top-3 h-[90%] bg-[#FAF7F2] rounded-xl shadow-2xl border-2 border-[#D4AF37] p-5 sm:p-6 transition-all duration-1000 ease-out z-10 flex flex-col justify-between text-center ${
              isCardUp
                ? 'translate-y-[-55%] scale-105 shadow-[0_20px_50px_rgba(0,0,0,0.8)]'
                : 'translate-y-0 scale-95 opacity-90'
            }`}
          >
            {/* Card inner gold frame */}
            <div className="w-full h-full border border-[#8B2635]/30 rounded-lg p-3 flex flex-col items-center justify-between">
              <div className="pt-1">
                <span className="font-cinzel text-[10px] sm:text-xs tracking-[0.25em] text-[#8B2635] font-semibold uppercase block">
                  Royal Invitation
                </span>
                <div className="w-8 h-[1px] bg-[#D4AF37] mx-auto my-1" />
              </div>

              <div>
                <h2 className="font-script text-3xl sm:text-4xl text-[#360C14] leading-tight my-1">
                  Abrar & Payelia
                </h2>
                <p className="font-serif-luxury italic text-xs sm:text-sm text-[#661523]">
                  Friday, November 06, 2026
                </p>
                <p className="font-sans-clean text-[10px] text-[#281412]/70 uppercase tracking-widest mt-1">
                  Basabo, Dhaka, Bangladesh
                </p>
              </div>

              <div className="pb-1 text-[9px] font-cinzel text-[#8B2635] tracking-widest">
                ✦ PLEASE JOIN OUR CELEBRATION ✦
              </div>
            </div>
          </div>

          {/* 3. Envelope Pocket (Front bottom and sides) covering the card base */}
          <div className="absolute inset-0 pointer-events-none z-20">
            {/* Left triangle fold */}
            <div
              className="absolute inset-0 rounded-2xl"
              style={{
                clipPath: 'polygon(0% 0%, 50% 50%, 0% 100%)',
                background: 'linear-gradient(135deg, #320C15 0%, #1E060C 100%)',
                borderLeft: '1px solid rgba(212, 175, 55, 0.4)',
                boxShadow: 'inset 0 0 15px rgba(0,0,0,0.5)',
              }}
            />
            {/* Right triangle fold */}
            <div
              className="absolute inset-0 rounded-2xl"
              style={{
                clipPath: 'polygon(100% 0%, 50% 50%, 100% 100%)',
                background: 'linear-gradient(225deg, #320C15 0%, #1E060C 100%)',
                borderRight: '1px solid rgba(212, 175, 55, 0.4)',
                boxShadow: 'inset 0 0 15px rgba(0,0,0,0.5)',
              }}
            />
            {/* Bottom triangle fold */}
            <div
              className="absolute inset-0 rounded-2xl"
              style={{
                clipPath: 'polygon(0% 100%, 50% 48%, 100% 100%)',
                background: 'linear-gradient(180deg, #380E18 0%, #20060C 100%)',
                borderBottom: '1px solid rgba(212, 175, 55, 0.4)',
                boxShadow: '0 -4px 15px rgba(0,0,0,0.4)',
              }}
            />

            {/* Gold Filigree Line trim on pocket */}
            <svg viewBox="0 0 400 280" preserveAspectRatio="none" className="w-full h-full opacity-60">
              <line x1="0" y1="280" x2="200" y2="135" stroke="#ECC880" strokeWidth="0.8" />
              <line x1="400" y1="280" x2="200" y2="135" stroke="#ECC880" strokeWidth="0.8" />
            </svg>
          </div>

          {/* 4. Top Envelope Flap (Hinged at top, opens 180° upward) */}
          <div
            className={`absolute top-0 inset-x-0 h-[52%] origin-top transition-transform duration-700 ease-in-out pointer-events-none ${
              isFlapOpen ? 'z-5 [transform:rotateX(180deg)]' : 'z-25 [transform:rotateX(0deg)]'
            }`}
            style={{
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Front of Flap (Pointing down when closed) */}
            <div
              className="w-full h-full relative"
              style={{
                clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)',
                background: 'linear-gradient(180deg, #3D0E19 0%, #25070D 85%, #1D0509 100%)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
              }}
            >
              {/* Gold V-trim border */}
              <svg viewBox="0 0 400 146" preserveAspectRatio="none" className="w-full h-full">
                <polygon points="0,0 400,0 200,146" fill="none" stroke="#ECC880" strokeWidth="1.2" opacity="0.8" />
                <polygon points="16,0 384,0 200,132" fill="none" stroke="#ECC880" strokeWidth="0.6" opacity="0.4" />
              </svg>

              {/* Corner floral filigree on flap */}
              <div className="absolute top-2 left-6 w-8 h-8 text-[#ECC880]/60">
                <svg viewBox="0 0 30 30" fill="none" className="w-full h-full">
                  <path d="M2 2 C12 2 20 10 20 20" stroke="#ECC880" strokeWidth="1" />
                  <circle cx="8" cy="8" r="2" fill="#ECC880" />
                </svg>
              </div>
              <div className="absolute top-2 right-6 w-8 h-8 text-[#ECC880]/60 scale-x-[-1]">
                <svg viewBox="0 0 30 30" fill="none" className="w-full h-full">
                  <path d="M2 2 C12 2 20 10 20 20" stroke="#ECC880" strokeWidth="1" />
                  <circle cx="8" cy="8" r="2" fill="#ECC880" />
                </svg>
              </div>
            </div>
          </div>

          {/* 5. Centered Royal Wax Seal Button (Positioned over flap tip) */}
          <div
            className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
              isSealBroken ? 'pointer-events-none opacity-0 scale-125' : 'z-30 pointer-events-auto opacity-100 scale-100'
            }`}
          >
            <button
              onClick={handleOpenEnvelope}
              type="button"
              className="group relative flex flex-col items-center focus:outline-none focus-visible:ring-4 focus-visible:ring-[#ECC880] rounded-full p-2 cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95"
              aria-label="Open wedding invitation envelope"
            >
              {/* Outer Wax Seal Body */}
              <div
                className="relative w-26 h-26 sm:w-30 sm:h-30 rounded-full flex items-center justify-center box-shadow-wax transition-shadow duration-300 group-hover:shadow-[0_0_30px_rgba(212,175,55,0.6)]"
                style={{
                  background: 'radial-gradient(circle at 35% 30%, #B83247 0%, #7E1827 50%, #4D0E17 85%, #340910 100%)',
                }}
              >
                {/* Organic wax perimeter drips */}
                <div className="absolute inset-[-4px] rounded-full border-2 border-[#ECC880]/40 pointer-events-none" />

                {/* Inner Embossed Ring with Gold Monogram */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-[1.5px] border-[#ECC880] flex flex-col items-center justify-center shadow-inner relative overflow-hidden bg-[#5C111E]/70">
                  {/* Subtle laurel wreath gold ring in seal */}
                  <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full opacity-70 pointer-events-none">
                    <circle cx="50" cy="50" r="42" stroke="#ECC880" strokeWidth="0.8" strokeDasharray="3 3" />
                  </svg>

                  {/* Gold Monogram "A & P" */}
                  <div className="relative text-center select-none pt-0.5">
                    <span
                      className="font-cinzel text-xl sm:text-2xl font-bold tracking-tight text-[#FFF2D6]"
                      style={{
                        textShadow: '0 2px 5px rgba(0,0,0,0.8), 0 0 10px rgba(236,200,128,0.6)',
                      }}
                    >
                      A & P
                    </span>
                    <div className="flex items-center justify-center gap-1 mt-0.5">
                      <div className="w-2 h-[1px] bg-[#ECC880]" />
                      <span className="text-[7.5px] tracking-widest text-[#ECC880] uppercase font-sans-clean font-semibold">
                        06 · 11 · 26
                      </span>
                      <div className="w-2 h-[1px] bg-[#ECC880]" />
                    </div>
                  </div>
                </div>

                {/* Wax highlight sheen */}
                <div className="absolute top-2.5 left-3.5 w-8 h-4 bg-white/25 rounded-full blur-[2px] -rotate-45 pointer-events-none" />
              </div>

              {/* Pulsing Action Prompt Badge */}
              <div className="mt-3.5 px-4 py-1.5 rounded-full bg-[#1A0509]/90 border border-[#ECC880] backdrop-blur-md text-xs font-cinzel tracking-wider text-[#ECC880] font-bold flex items-center gap-2 shadow-xl group-hover:bg-[#8B2635] group-hover:text-white transition-colors">
                <Sparkles className="w-3.5 h-3.5 text-[#ECC880] group-hover:text-white animate-spin-slow" />
                <span>TAP SEAL TO OPEN</span>
              </div>
            </button>
          </div>

          {/* Invitation recipient calligraphy footnote on envelope */}
          <div className="absolute bottom-4 inset-x-0 text-center pointer-events-none z-25 px-4">
            <p className="font-serif-luxury italic text-xs sm:text-sm text-[#ECC880]/85 tracking-widest">
              You are cordially invited to celebrate with us
            </p>
          </div>
        </div>
      </div>

      {/* Footer controls: Direct Skip button */}
      <div className="mt-6 z-20 flex items-center justify-center">
        <button
          onClick={handleDirectOpen}
          type="button"
          className="text-xs font-cinzel text-[#ECC880]/70 hover:text-[#ECC880] flex items-center gap-1.5 transition-colors cursor-pointer py-2 px-3 rounded-lg hover:bg-white/5"
        >
          <span>Skip directly to invitation</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
