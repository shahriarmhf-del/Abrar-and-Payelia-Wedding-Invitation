import React, { useState } from 'react';
import { FloralCorner, FloralDivider } from './FloralCorner';
import { groomImage, brideImage } from '../assets/portraits';
import { Heart, Sparkles, Feather, Music, Award, Compass, HeartHandshake } from 'lucide-react';
import { playChimeSound } from '../utils/audio';

export const BrideAndGroomSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'portraits' | 'story'>('portraits');
  const [groomLikes, setGroomLikes] = useState(0);
  const [brideLikes, setBrideLikes] = useState(0);
  const [coupleLikes, setCoupleLikes] = useState(0);
  const [hasLikedGroom, setHasLikedGroom] = useState(false);
  const [hasLikedBride, setHasLikedBride] = useState(false);
  const [hasLikedCouple, setHasLikedCouple] = useState(false);

  const handleLikeGroom = () => {
    if (!hasLikedGroom) {
      setGroomLikes((prev) => prev + 1);
      setHasLikedGroom(true);
      playChimeSound();
    }
  };

  const handleLikeBride = () => {
    if (!hasLikedBride) {
      setBrideLikes((prev) => prev + 1);
      setHasLikedBride(true);
      playChimeSound();
    }
  };

  const handleLikeCouple = () => {
    if (!hasLikedCouple) {
      setCoupleLikes((prev) => prev + 1);
      setHasLikedCouple(true);
      playChimeSound();
    }
  };

  return (
    <section className="relative w-full py-12 px-4 sm:px-6 flex justify-center overflow-hidden">
      {/* Ambient colorful jewel-tone halos behind the section */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#047857]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-[#e11d48]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[34rem] h-[34rem] bg-[#f59e0b]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Luxury Presentation Container */}
      <div
        className="relative w-full max-w-5xl text-[#382027] rounded-3xl p-6 sm:p-10 shadow-2xl border-2 border-[#e0bd83]"
        style={{
          background: 'linear-gradient(155deg, #fffaf4 0%, #faeee0 40%, #f7e6d6 100%)',
          boxShadow: '0 25px 80px rgba(84, 16, 32, 0.16), inset 0 2px 0 rgba(255, 255, 255, 0.7)',
        }}
      >
        {/* Four Intricate Floral Corners with Rich Gold & Rose Sheen */}
        <FloralCorner position="top-left" size={68} className="top-2 left-2" />
        <FloralCorner position="top-right" size={68} className="top-2 right-2" />
        <FloralCorner position="bottom-left" size={68} className="bottom-2 left-2" />
        <FloralCorner position="bottom-right" size={68} className="bottom-2 right-2" />

        {/* Inner Gold Foil Hairline Border */}
        <div className="absolute inset-3 sm:inset-4 border border-[#e0bd83]/40 rounded-2xl pointer-events-none" />

        <div className="relative z-10">
          {/* Section Eyebrow Header */}
          <div className="text-center mb-4">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#541020]/10 border border-[#e0bd83]/60 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#d97706]" />
              <span className="font-cinzel text-xs tracking-[0.28em] text-[#84243b] font-bold uppercase">
                ✦ The Bride & Groom ✦
              </span>
              <Sparkles className="w-3.5 h-3.5 text-[#d97706]" />
            </div>

            <h2 className="font-script text-5xl sm:text-7xl text-[#541020] my-1 drop-shadow-xs">
              Meet Abrar & Payelia
            </h2>

            <p className="font-serif-luxury italic text-base sm:text-xl text-[#76233a] max-w-xl mx-auto">
              “And among His signs is that He created for you mates from among yourselves, that you may find tranquility in them.”
            </p>

            <FloralDivider className="my-4" />

            {/* View Switcher: Portraits View or Love Story View */}
            <div className="inline-flex p-1 rounded-full bg-[#4a1020]/10 border border-[#e0bd83]/50 shadow-inner my-2">
              <button
                type="button"
                onClick={() => setActiveTab('portraits')}
                className={`px-5 py-1.5 rounded-full text-xs font-cinzel font-bold tracking-wider transition-all cursor-pointer ${
                  activeTab === 'portraits'
                    ? 'bg-[#541020] text-[#ffd9a0] shadow-md'
                    : 'text-[#76233a] hover:text-[#541020]'
                }`}
              >
                Royal Portraits
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('story')}
                className={`px-5 py-1.5 rounded-full text-xs font-cinzel font-bold tracking-wider transition-all cursor-pointer ${
                  activeTab === 'story'
                    ? 'bg-[#541020] text-[#ffd9a0] shadow-md'
                    : 'text-[#76233a] hover:text-[#541020]'
                }`}
              >
                Our Love Story
              </button>
            </div>
          </div>

          {activeTab === 'portraits' ? (
            /* PORTRAITS SHOWCASE: Colorful Royal Mughal/Bengali Pavilions */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 items-stretch mt-6">
              {/* ================= THE GROOM CARD ================= */}
              <div
                className="group relative rounded-3xl p-6 sm:p-8 flex flex-col items-center text-center transition-transform duration-500 hover:-translate-y-1 shadow-xl border-2 border-[#e0bd83]"
                style={{
                  background: 'linear-gradient(145deg, #3d0d19 0%, #260811 50%, #170409 100%)',
                  boxShadow: '0 20px 50px rgba(61, 13, 25, 0.4), inset 0 1px 0 rgba(224, 189, 131, 0.3)',
                }}
              >
                {/* Emerald & Amber Auspicious Floral Glow for the Groom */}
                <div className="absolute top-10 w-48 h-48 bg-[#047857]/25 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute bottom-10 w-48 h-48 bg-[#f59e0b]/20 rounded-full blur-2xl pointer-events-none" />

                {/* Cultural Crest Tag */}
                <div className="relative z-10 px-4 py-1 rounded-full bg-[#064e3b]/90 border border-[#10b981]/70 shadow-md mb-4 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#34d399] animate-pulse" />
                  <span className="font-cinzel text-[11px] tracking-widest text-[#a7f3d0] font-bold uppercase">
                    THE GROOM
                  </span>
                </div>

                {/* The Groom Portrait with Arched Royal Pavilion Frame */}
                <div
                  onClick={handleLikeGroom}
                  className="relative w-full max-w-xs flex flex-col items-center justify-end my-2 cursor-pointer select-none group/pic"
                  title="Click to celebrate Md. Abrar Shahriar with blessings!"
                >
                  {/* Ornate Gold Arch Pavilion Background */}
                  <div
                    className="absolute inset-x-2 top-0 bottom-6 rounded-t-full border-2 border-[#e0bd83] pointer-events-none"
                    style={{
                      background: 'radial-gradient(circle at 50% 30%, rgba(224, 189, 131, 0.28) 0%, rgba(4, 120, 87, 0.22) 50%, rgba(38, 8, 17, 0.95) 100%)',
                      boxShadow: '0 0 35px rgba(224, 189, 131, 0.35)',
                    }}
                  />

                  {/* Rotating Auspicious Golden Mandala Halo behind Turban */}
                  <div className="absolute top-12 left-1/2 -translate-x-1/2 w-48 h-48 sm:w-56 sm:h-56 rounded-full pointer-events-none opacity-80 animate-halo-glow">
                    <svg viewBox="0 0 200 200" className="w-full h-full text-[#ffd9a0]">
                      <circle cx="100" cy="100" r="85" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 5" opacity="0.6" />
                      <circle cx="100" cy="100" r="72" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.8" />
                      {Array.from({ length: 12 }).map((_, i) => (
                        <g key={i} transform={`rotate(${i * 30} 100 100)`}>
                          <line x1="100" y1="18" x2="100" y2="28" stroke="currentColor" strokeWidth="1.2" />
                          <circle cx="100" cy="15" r="2.5" fill="#f59e0b" />
                        </g>
                      ))}
                    </svg>
                  </div>

                  {/* Floating Sparkling Stars around the Groom */}
                  <div className="absolute left-6 top-20 text-[#ffd9a0] text-sm animate-sparkle-1 pointer-events-none">✦</div>
                  <div className="absolute right-6 top-32 text-[#34d399] text-base animate-sparkle-2 pointer-events-none">✨</div>
                  <div className="absolute left-10 bottom-24 text-[#f59e0b] text-xs animate-sparkle-3 pointer-events-none">✦</div>

                  {/* Groom PNG Portrait Image */}
                  <div className="relative z-10 animate-bob pt-4 transition-transform duration-500 group-hover/pic:scale-105 group-hover/pic:-translate-y-1">
                    <img
                      src={groomImage}
                      alt="Md. Abrar Shahriar - The Groom"
                      className="h-72 sm:h-84 md:h-92 w-auto object-contain drop-shadow-[0_20px_25px_rgba(0,0,0,0.85)] filter saturate-105"
                      loading="eager"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Royal Gold Filigree Pedestal */}
                  <div className="relative z-20 -mt-4 w-44 h-2.5 rounded-full bg-gradient-to-r from-transparent via-[#ffd9a0] to-transparent shadow-[0_0_15px_#ffd9a0]" />
                </div>

                {/* Groom Details */}
                <div className="relative z-10 mt-3 w-full">
                  <h3 className="font-script text-4xl sm:text-5xl text-[#ffd9a0] font-normal tracking-wide drop-shadow-md">
                    Md. Abrar Shahriar
                  </h3>

                  <p className="font-serif-luxury italic text-sm sm:text-base text-[#f7efe5]/90 mt-1 mb-4 px-2">
                    “In your eyes, I found my sanctuary, and in your heart, my eternal home.”
                  </p>

                  {/* Groom Attributes: Dresscode removed, location set to Noakhali */}
                  <div className="flex flex-wrap items-center justify-center gap-2 mb-5">
                    <span className="px-3 py-1 rounded-full bg-[#78350f]/80 border border-[#d97706] text-[#fde68a] text-xs font-sans-clean flex items-center gap-1.5 shadow-xs">
                      <Compass className="w-3 h-3 text-[#fbbf24]" />
                      Noakhali, Bangladesh
                    </span>
                  </div>

                  {/* Groom Blessing Interaction */}
                  <button
                    onClick={handleLikeGroom}
                    type="button"
                    className={`w-full py-2.5 px-4 rounded-xl border flex items-center justify-center gap-2 text-xs font-cinzel font-bold tracking-wider transition-all cursor-pointer shadow-md ${
                      hasLikedGroom
                        ? 'bg-[#047857] border-[#34d399] text-[#ecfdf5]'
                        : 'bg-[#541020] hover:bg-[#6e162b] border-[#e0bd83] text-[#ffd9a0] hover:brightness-110 active:scale-98'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${hasLikedGroom ? 'fill-current text-[#ecfdf5]' : 'text-[#ffd9a0]'}`} />
                    <span>{hasLikedGroom ? 'Blessing Sent to Abrar' : 'Send Blessing to the Groom'}</span>
                    <span className="ml-1 px-2 py-0.5 rounded-full bg-black/30 text-[10px]">
                      {groomLikes}
                    </span>
                  </button>
                </div>
              </div>

              {/* ================= THE BRIDE CARD ================= */}
              <div
                className="group relative rounded-3xl p-6 sm:p-8 flex flex-col items-center text-center transition-transform duration-500 hover:-translate-y-1 shadow-xl border-2 border-[#e0bd83]"
                style={{
                  background: 'linear-gradient(145deg, #420e1d 0%, #290913 50%, #170409 100%)',
                  boxShadow: '0 20px 50px rgba(66, 14, 29, 0.4), inset 0 1px 0 rgba(224, 189, 131, 0.3)',
                }}
              >
                {/* Ruby & Rani Pink Auspicious Floral Glow for the Bride */}
                <div className="absolute top-10 w-48 h-48 bg-[#e11d48]/25 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute bottom-10 w-48 h-48 bg-[#fb7185]/20 rounded-full blur-2xl pointer-events-none" />

                {/* Cultural Crest Tag */}
                <div className="relative z-10 px-4 py-1 rounded-full bg-[#831843]/90 border border-[#f43f5e]/70 shadow-md mb-4 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#fb7185] animate-pulse" />
                  <span className="font-cinzel text-[11px] tracking-widest text-[#fce7f3] font-bold uppercase">
                    THE BRIDE
                  </span>
                </div>

                {/* The Bride Portrait with Arched Royal Pavilion Frame */}
                <div
                  onClick={handleLikeBride}
                  className="relative w-full max-w-xs flex flex-col items-center justify-end my-2 cursor-pointer select-none group/pic"
                  title="Click to celebrate Payelia with blessings!"
                >
                  {/* Ornate Gold Arch Pavilion Background */}
                  <div
                    className="absolute inset-x-2 top-0 bottom-6 rounded-t-full border-2 border-[#e0bd83] pointer-events-none"
                    style={{
                      background: 'radial-gradient(circle at 50% 30%, rgba(224, 189, 131, 0.28) 0%, rgba(225, 29, 72, 0.24) 50%, rgba(41, 9, 19, 0.95) 100%)',
                      boxShadow: '0 0 35px rgba(225, 29, 72, 0.35)',
                    }}
                  />

                  {/* Rotating Auspicious Golden Mandala Halo behind Dupatta Bun */}
                  <div className="absolute top-12 left-1/2 -translate-x-1/2 w-48 h-48 sm:w-56 sm:h-56 rounded-full pointer-events-none opacity-80 animate-halo-glow">
                    <svg viewBox="0 0 200 200" className="w-full h-full text-[#ffd9a0]">
                      <circle cx="100" cy="100" r="85" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 5" opacity="0.6" />
                      <circle cx="100" cy="100" r="72" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.8" />
                      {Array.from({ length: 12 }).map((_, i) => (
                        <g key={i} transform={`rotate(${i * 30} 100 100)`}>
                          <line x1="100" y1="18" x2="100" y2="28" stroke="currentColor" strokeWidth="1.2" />
                          <circle cx="100" cy="15" r="2.5" fill="#f43f5e" />
                        </g>
                      ))}
                    </svg>
                  </div>

                  {/* Floating Sparkling Stars around the Bride */}
                  <div className="absolute right-6 top-20 text-[#f472b6] text-sm animate-sparkle-1 pointer-events-none">🌸</div>
                  <div className="absolute left-6 top-32 text-[#ffd9a0] text-base animate-sparkle-2 pointer-events-none">✨</div>
                  <div className="absolute right-10 bottom-24 text-[#fb7185] text-xs animate-sparkle-3 pointer-events-none">✦</div>

                  {/* Bride PNG Portrait Image */}
                  <div className="relative z-10 animate-bob-delayed pt-4 transition-transform duration-500 group-hover/pic:scale-105 group-hover/pic:-translate-y-1">
                    <img
                      src={brideImage}
                      alt="Payelia Pervej Ripa - The Bride"
                      className="h-72 sm:h-84 md:h-92 w-auto object-contain drop-shadow-[0_20px_25px_rgba(0,0,0,0.85)] filter saturate-105"
                      loading="eager"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Royal Gold Filigree Pedestal */}
                  <div className="relative z-20 -mt-4 w-44 h-2.5 rounded-full bg-gradient-to-r from-transparent via-[#ffd9a0] to-transparent shadow-[0_0_15px_#ffd9a0]" />
                </div>

                {/* Bride Details */}
                <div className="relative z-10 mt-3 w-full">
                  <h3 className="font-script text-4xl sm:text-5xl text-[#ffd9a0] font-normal tracking-wide drop-shadow-md">
                    Payelia Pervej Ripa
                  </h3>

                  <p className="font-serif-luxury italic text-sm sm:text-base text-[#f7efe5]/90 mt-1 mb-4 px-2">
                    “With every step beside you, life blossoms into a garden of grace and joy.”
                  </p>

                  {/* Bride Attributes: Dresscode removed */}
                  <div className="flex flex-wrap items-center justify-center gap-2 mb-5">
                    <span className="px-3 py-1 rounded-full bg-[#581c87]/80 border border-[#9333ea] text-[#f3e8ff] text-xs font-sans-clean flex items-center gap-1.5 shadow-xs">
                      <HeartHandshake className="w-3 h-3 text-[#c084fc]" />
                      Dhaka, Bangladesh
                    </span>
                  </div>

                  {/* Bride Blessing Interaction */}
                  <button
                    onClick={handleLikeBride}
                    type="button"
                    className={`w-full py-2.5 px-4 rounded-xl border flex items-center justify-center gap-2 text-xs font-cinzel font-bold tracking-wider transition-all cursor-pointer shadow-md ${
                      hasLikedBride
                        ? 'bg-[#be123c] border-[#fb7185] text-[#fff1f2]'
                        : 'bg-[#541020] hover:bg-[#6e162b] border-[#e0bd83] text-[#ffd9a0] hover:brightness-110 active:scale-98'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${hasLikedBride ? 'fill-current text-[#fff1f2]' : 'text-[#ffd9a0]'}`} />
                    <span>{hasLikedBride ? 'Blessing Sent to Payelia' : 'Send Blessing to the Bride'}</span>
                    <span className="ml-1 px-2 py-0.5 rounded-full bg-black/30 text-[10px]">
                      {brideLikes}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* LOVE STORY & MILESTONES VIEW */
            <div className="mt-6 space-y-6">
              {/* Couple Joint Narrative Card */}
              <div
                className="rounded-3xl p-6 sm:p-8 border-2 border-[#e0bd83] text-center"
                style={{
                  background: 'linear-gradient(145deg, #451020 0%, #280913 100%)',
                  boxShadow: '0 20px 50px rgba(69, 16, 32, 0.4)',
                }}
              >
                <div className="w-16 h-16 mx-auto rounded-full bg-[#e0bd83]/20 border border-[#e0bd83] flex items-center justify-center text-[#ffd9a0] mb-4 shadow-md">
                  <Heart className="w-8 h-8 fill-[#ffd9a0]/30 text-[#ffd9a0]" />
                </div>

                <h3 className="font-script text-4xl sm:text-5xl text-[#ffd9a0] mb-2">
                  Two Families, One Blessed Journey
                </h3>

                <p className="font-serif-luxury text-base sm:text-xl text-[#f7efe5] max-w-2xl mx-auto leading-relaxed">
                  Our union began with the heartfelt prayers of our elders, blossomed through shared values and mutual respect, and now culminates in this sacred Nikkah ceremony. We warmly invite you to witness our solemn vows and celebrate with joy.
                </p>
              </div>

              {/* Colorful Milestones Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Milestone 1: Emerald Tone */}
                <div className="rounded-2xl p-5 border border-[#059669]/50 bg-gradient-to-br from-[#064e3b]/90 to-[#022c22] text-[#fffaf2] shadow-md">
                  <div className="flex items-center gap-2 mb-2 text-[#34d399]">
                    <Feather className="w-4 h-4" />
                    <span className="font-cinzel text-xs font-bold tracking-wider uppercase">How It Began</span>
                  </div>
                  <h4 className="font-serif-luxury text-xl font-bold text-[#a7f3d0] mb-1">
                    Family Introduction
                  </h4>
                  <p className="font-sans-clean text-xs text-[#d1fae5]/90 leading-relaxed">
                    A warm afternoon in Dhaka where traditions, tea, and warm smiles laid the foundation for lifelong companionship.
                  </p>
                </div>

                {/* Milestone 2: Ruby Rose Tone */}
                <div className="rounded-2xl p-5 border border-[#e11d48]/50 bg-gradient-to-br from-[#881337]/90 to-[#4c0519] text-[#fffaf2] shadow-md">
                  <div className="flex items-center gap-2 mb-2 text-[#fb7185]">
                    <Sparkles className="w-4 h-4" />
                    <span className="font-cinzel text-xs font-bold tracking-wider uppercase">The Promise</span>
                  </div>
                  <h4 className="font-serif-luxury text-xl font-bold text-[#fecdd3] mb-1">
                    Mutual Devotion
                  </h4>
                  <p className="font-sans-clean text-xs text-[#ffe4e6]/90 leading-relaxed">
                    Under twilight skies, exchanging promises of patience, steadfast love, and devotion before Almighty Allah.
                  </p>
                </div>

                {/* Milestone 3: Royal Gold Tone */}
                <div className="rounded-2xl p-5 border border-[#d97706]/50 bg-gradient-to-br from-[#78350f]/90 to-[#451a03] text-[#fffaf2] shadow-md">
                  <div className="flex items-center gap-2 mb-2 text-[#fde047]">
                    <Award className="w-4 h-4" />
                    <span className="font-cinzel text-xs font-bold tracking-wider uppercase">Wedding Day</span>
                  </div>
                  <h4 className="font-serif-luxury text-xl font-bold text-[#fef08a] mb-1">
                    November 06, 2026
                  </h4>
                  <p className="font-sans-clean text-xs text-[#fef9c3]/90 leading-relaxed">
                    Signing the sacred Nikkahnama at JK Convention Hall, stepping into forever hand in hand.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Golden Union Seal & Joint Blessing Counter */}
          <div className="mt-8 pt-6 border-t border-[#e0bd83]/40 flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#541020]/15 rounded-2xl p-4 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#541020] border-2 border-[#e0bd83] flex items-center justify-center shadow-md">
                <span className="font-cinzel text-sm font-bold text-[#ffd9a0]">A & P</span>
              </div>
              <div className="text-left">
                <p className="font-cinzel text-xs font-bold text-[#541020] tracking-wider uppercase">
                  Sacred Union of Abrar & Payelia
                </p>
                <p className="font-sans-clean text-xs text-[#84243b]">
                  Friday, November 06, 2026 · Basabo, Dhaka
                </p>
              </div>
            </div>

            <button
              onClick={handleLikeCouple}
              type="button"
              className={`px-5 py-2.5 rounded-full border flex items-center gap-2 text-xs font-cinzel font-bold tracking-wider transition-all cursor-pointer shadow-md ${
                hasLikedCouple
                  ? 'bg-[#84243b] border-[#ffd9a0] text-[#ffd9a0]'
                  : 'bg-gradient-to-r from-[#84243b] to-[#541020] border-[#e0bd83] text-[#fff0d4] hover:brightness-110 active:scale-95'
              }`}
            >
              <Heart className={`w-4 h-4 ${hasLikedCouple ? 'fill-current text-[#ffd9a0]' : 'text-[#ffd9a0]'}`} />
              <span>{hasLikedCouple ? 'Blessings Showered!' : 'Shower the Couple with Blessings'}</span>
              <span className="px-2 py-0.5 rounded-full bg-black/30 text-[11px] font-mono">
                {coupleLikes}
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
