import React, { useState, useEffect } from 'react';
import { weddingMusic, WEDDING_SONG_INFO } from '../utils/musicController';
import { Volume2, VolumeX, Play, Pause, RotateCcw, ExternalLink, Music, ChevronUp, ChevronDown } from 'lucide-react';

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    // Register container on mount
    weddingMusic.registerContainer('wedding-yt-audio-player');

    const unsubscribe = weddingMusic.subscribe((state) => {
      setIsPlaying(state.isPlaying);
    });
    return unsubscribe;
  }, []);

  const handleToggle = () => {
    weddingMusic.toggle();
  };

  const handleRestartAtSix = () => {
    weddingMusic.seekToSixSeconds();
  };

  return (
    <>
      {/* Hidden / Offscreen YouTube IFrame container that plays audio */}
      <div
        className={`fixed z-50 transition-all duration-300 ${
          isExpanded
            ? 'bottom-20 right-4 w-80 sm:w-96 h-52 rounded-2xl overflow-hidden shadow-2xl border-2 border-[#e0bd83] bg-black'
            : 'pointer-events-none opacity-0 w-1 h-1 -bottom-96 -right-96'
        }`}
      >
        <div id="wedding-yt-audio-player" className="w-full h-full" />
      </div>

      {/* Floating Bottom Music Bar */}
      <div className="fixed bottom-4 right-4 z-40 max-w-sm sm:max-w-md">
        <div
          className="rounded-full px-4 py-2 border border-[#e0bd83] shadow-2xl flex items-center gap-3 backdrop-blur-md transition-all duration-300 hover:scale-[1.02]"
          style={{
            background: 'linear-gradient(135deg, rgba(61, 13, 25, 0.94) 0%, rgba(38, 8, 17, 0.96) 100%)',
            boxShadow: isPlaying
              ? '0 10px 30px rgba(224, 189, 131, 0.35), 0 0 15px rgba(225, 29, 72, 0.3)'
              : '0 8px 25px rgba(0, 0, 0, 0.5)',
          }}
        >
          {/* Play / Pause button */}
          <button
            onClick={handleToggle}
            type="button"
            className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 border transition-all cursor-pointer ${
              isPlaying
                ? 'bg-[#84243b] border-[#ffd9a0] text-[#ffd9a0] shadow-[0_0_12px_#ffd9a0]'
                : 'bg-[#541020] border-[#e0bd83]/60 text-[#ffd9a0] hover:bg-[#6e162b]'
            }`}
            title={isPlaying ? 'Pause Kudmayi' : 'Play Kudmayi (Starts at 0:06)'}
            aria-label={isPlaying ? 'Pause wedding music' : 'Play wedding music'}
          >
            {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
          </button>

          {/* Song Info & Equalizer */}
          <div className="flex flex-col min-w-0 pr-1">
            <div className="flex items-center gap-1.5">
              <Music className="w-3 h-3 text-[#e0bd83] shrink-0" />
              <span className="font-cinzel text-xs font-bold text-[#ffd9a0] truncate">
                {WEDDING_SONG_INFO.title}
              </span>
              {/* Equalizer animation when playing */}
              {isPlaying && (
                <span className="flex items-end gap-0.5 h-3 ml-1">
                  <span className="w-0.5 h-2.5 bg-[#ffd9a0] animate-pulse" />
                  <span className="w-0.5 h-3 bg-[#f59e0b] animate-bounce" />
                  <span className="w-0.5 h-1.5 bg-[#ffd9a0] animate-pulse" />
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 text-[10px] text-[#f7efe5]/80 font-sans-clean truncate">
              <span className="truncate">{WEDDING_SONG_INFO.subtitle}</span>
              <span className="text-[#ffd9a0]/60">•</span>
              <span className="text-[#ffd9a0] font-mono">0:06 Start</span>
            </div>
          </div>

          {/* Controls: Replay from 6s */}
          <button
            onClick={handleRestartAtSix}
            type="button"
            className="p-1.5 rounded-full hover:bg-white/10 text-[#ffd9a0]/90 hover:text-[#ffd9a0] transition-colors cursor-pointer shrink-0"
            title="Restart song from 6 seconds"
            aria-label="Restart song from 6 seconds"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* Toggle Video Preview */}
          <button
            onClick={() => setIsExpanded((prev) => !prev)}
            type="button"
            className="p-1.5 rounded-full hover:bg-white/10 text-[#ffd9a0]/80 hover:text-[#ffd9a0] transition-colors cursor-pointer shrink-0 hidden sm:block"
            title={isExpanded ? 'Hide video' : 'Watch video preview'}
            aria-label="Toggle video preview"
          >
            {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
          </button>

          {/* External link to official song */}
          <a
            href={WEDDING_SONG_INFO.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-full hover:bg-white/10 text-[#ffd9a0]/70 hover:text-[#ffd9a0] transition-colors cursor-pointer shrink-0"
            title="Listen on YouTube"
            aria-label="Listen on YouTube"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </>
  );
};
