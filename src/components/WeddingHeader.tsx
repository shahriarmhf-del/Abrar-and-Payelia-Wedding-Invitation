import React, { useState, useEffect } from 'react';
import { weddingMusic, WEDDING_SONG_INFO } from '../utils/musicController';
import { Volume2, VolumeX, Mail, Sparkles, Music } from 'lucide-react';

interface WeddingHeaderProps {
  onReopenEnvelope: () => void;
  onOpenRsvp: () => void;
  petalsEnabled: boolean;
  onTogglePetals: () => void;
}

export const WeddingHeader: React.FC<WeddingHeaderProps> = ({
  onReopenEnvelope,
  onOpenRsvp,
  petalsEnabled,
  onTogglePetals,
}) => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  useEffect(() => {
    const unsubscribe = weddingMusic.subscribe((state) => {
      setIsAudioPlaying(state.isPlaying);
    });
    return unsubscribe;
  }, []);

  const toggleMusic = () => {
    weddingMusic.toggle();
  };

  return (
    <header className="sticky top-0 z-40 bg-[#281016]/95 backdrop-blur-md border-b border-[#e0bd83]/35 text-[#fffaf2] transition-all">
      {/* Top Bar Credit: Developed by Imran Shahriar at Top Right Corner */}
      <div className="bg-[#17050a]/90 border-b border-[#e0bd83]/20 px-4 sm:px-8 py-1 flex items-center justify-between text-[10px] sm:text-xs font-cinzel tracking-wider text-[#ffd9a0]">
        <span className="hidden sm:inline text-[#e0bd83]/70 font-sans-clean text-[11px]">
          The Royal Wedding of Md. Abrar Shahriar & Payelia Pervej Ripa
        </span>
        <div className="ml-auto flex items-center gap-1.5 font-bold text-[#ffd9a0] bg-[#420f1b]/70 border border-[#e0bd83]/40 px-2.5 py-0.5 rounded-full shadow-xs">
          <Sparkles className="w-3 h-3 text-[#e0bd83] animate-pulse" />
          <span>Developed by Imran Shahriar</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4 sm:gap-8 px-4 sm:px-8 py-2.5">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#top"
          className="font-script text-2xl sm:text-3xl text-[#ffd9a0] whitespace-nowrap shrink-0 hover:text-[#fffaf2] transition-colors leading-none"
        >
          Abrar & Payelia
        </a>

        {/* Zone 2: Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-cinzel tracking-wider text-[#f7efe5]/90">
          <a href="#welcome" className="hover:text-[#ffd9a0] transition-colors whitespace-nowrap shrink-0">
            Welcome
          </a>
          <a href="#couple" className="hover:text-[#ffd9a0] transition-colors whitespace-nowrap shrink-0 text-[#ffd9a0] font-semibold">
            Bride & Groom
          </a>
          <a href="#countdown" className="hover:text-[#ffd9a0] transition-colors whitespace-nowrap shrink-0">
            Countdown
          </a>
          <a href="#timeline" className="hover:text-[#ffd9a0] transition-colors whitespace-nowrap shrink-0">
            Schedule
          </a>
          <a href="#location" className="hover:text-[#ffd9a0] transition-colors whitespace-nowrap shrink-0">
            Location
          </a>
          <a href="#thoughts" className="hover:text-[#ffd9a0] transition-colors whitespace-nowrap shrink-0">
            Guestbook
          </a>
        </nav>

        {/* Zone 3: Actions (Sound toggle with visualizer, Petals, Re-open envelope, RSVP) */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Ambient Music Toggle Button with active equalizer pulse */}
          <button
            onClick={toggleMusic}
            type="button"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
              isAudioPlaying
                ? 'bg-[#84243b] border-[#e0bd83] text-[#ffd9a0] shadow-[0_0_14px_rgba(224,189,131,0.45)]'
                : 'border-[#e0bd83]/50 text-[#ffd9a0]/80 hover:bg-[#84243b]/40'
            }`}
            title={isAudioPlaying ? 'Pause Kudmayi (Rocky Aur Rani Kii Prem Kahaani)' : 'Play Kudmayi (Film Version) — Starts from 0:06'}
            aria-label="Toggle wedding music Kudmayi"
          >
            {isAudioPlaying ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-[#ffd9a0]" />
                <span className="hidden sm:inline text-[10px] font-cinzel font-bold tracking-wider">
                  MUSIC ON
                </span>
                <span className="flex items-end gap-0.5 h-3">
                  <span className="w-0.5 h-2 bg-[#ffd9a0] animate-pulse" />
                  <span className="w-0.5 h-3 bg-[#ffd9a0] animate-bounce" />
                  <span className="w-0.5 h-1.5 bg-[#ffd9a0] animate-pulse" />
                </span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5" />
                <span className="hidden sm:inline text-[10px] font-cinzel font-medium tracking-wider">
                  PLAY MUSIC
                </span>
              </>
            )}
          </button>

          {/* Floating Petals Toggle */}
          <button
            onClick={onTogglePetals}
            type="button"
            className={`p-2 rounded-full border border-[#e0bd83]/40 transition-colors cursor-pointer hidden sm:flex ${
              petalsEnabled ? 'bg-[#84243b] text-[#ffd9a0]' : 'text-[#ffd9a0]/70 hover:bg-[#84243b]/30'
            }`}
            title="Toggle falling rose petals"
            aria-label="Toggle falling rose petals"
          >
            <Sparkles className="w-4 h-4" />
          </button>

          {/* Re-open Envelope */}
          <button
            onClick={onReopenEnvelope}
            type="button"
            className="p-2 rounded-full border border-[#e0bd83]/40 text-[#ffd9a0] hover:bg-[#84243b]/40 transition-colors cursor-pointer"
            title="View wax seal envelope again"
            aria-label="View wax seal envelope"
          >
            <Mail className="w-4 h-4" />
          </button>

          {/* Primary RSVP Action */}
          <button
            onClick={onOpenRsvp}
            type="button"
            className="px-4 py-1.5 sm:py-2 text-xs font-cinzel font-bold text-[#fff0d4] rounded-full border border-[#e0bd83] hover:brightness-110 active:scale-95 transition-all whitespace-nowrap shrink-0 cursor-pointer shadow-md"
            style={{
              background: 'linear-gradient(135deg, #84243b, #451020)',
            }}
          >
            RSVP
          </button>
        </div>
      </div>
    </header>
  );
};
