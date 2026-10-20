/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { EnvelopeLanding } from './components/EnvelopeLanding';
import { PetalsOverlay } from './components/PetalsOverlay';
import { WeddingHeader } from './components/WeddingHeader';
import { HeroSection } from './components/HeroSection';
import { BrideAndGroomSection } from './components/BrideAndGroomSection';
import { CountdownSection } from './components/CountdownSection';
import { ScheduleTimeline } from './components/ScheduleTimeline';
import { VenueMap } from './components/VenueMap';
import { RsvpModal } from './components/RsvpModal';
import { GuestbookOpinion } from './components/GuestbookOpinion';
import { WeddingFooter } from './components/WeddingFooter';
import { MusicPlayer } from './components/MusicPlayer';
import { weddingMusic } from './utils/musicController';

export default function App() {
  const [envelopeOpened, setEnvelopeOpened] = useState(false);
  const [petalsEnabled, setPetalsEnabled] = useState(true);
  const mainContentRef = useRef<HTMLDivElement>(null);
  const coupleRef = useRef<HTMLDivElement>(null);
  const countdownRef = useRef<HTMLDivElement>(null);
  const rsvpSectionRef = useRef<HTMLDivElement>(null);

  // Auto-start or prime background music on initial user tap/interaction
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!weddingMusic.active) {
        weddingMusic.play();
      }
      window.removeEventListener('pointerdown', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };

    window.addEventListener('pointerdown', handleFirstInteraction, { once: true });
    window.addEventListener('keydown', handleFirstInteraction, { once: true });

    return () => {
      window.removeEventListener('pointerdown', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };
  }, []);

  const handleOpenEnvelope = () => {
    setEnvelopeOpened(true);
    // Guarantee official wedding music (Kudmayi starting from 6s) plays
    weddingMusic.play();
  };

  const handleReplayEnvelope = () => {
    setEnvelopeOpened(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollToCouple = () => {
    coupleRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToCountdown = () => {
    countdownRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleTriggerRsvp = () => {
    rsvpSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    // Also trigger circular seal button
    const sealBtn = document.querySelector<HTMLButtonElement>(
      '[aria-label="Invitation acceptance - Click to open"]'
    );
    if (sealBtn) {
      sealBtn.click();
    }
  };

  return (
    <div
      className="min-h-screen text-[#382027] selection:bg-[#84243b] selection:text-[#fffaf2] relative overflow-x-hidden font-sans-clean transition-colors duration-1000"
      style={{
        background: 'radial-gradient(ellipse at 50% 0%, #fffaf2 0%, #f7efe5 48%, #ead8ca 100%)',
      }}
    >
      {/* Interactive Landing Screen with Fixed Wax Seal Animation */}
      <EnvelopeLanding
        isOpen={envelopeOpened}
        onOpen={handleOpenEnvelope}
      />

      {/* Floating Rose Petals Ambiance */}
      <PetalsOverlay enabled={petalsEnabled} />

      {/* Official YouTube Wedding Music Player (Kudmayi - Film Version) */}
      <MusicPlayer />

      {/* Main Wedding Invitation Presentation */}
      <div
        ref={mainContentRef}
        id="top"
        className={`transition-opacity duration-1000 ${
          envelopeOpened ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Sticky Header Nav with Audio & RSVP */}
        <WeddingHeader
          onReopenEnvelope={handleReplayEnvelope}
          onOpenRsvp={handleTriggerRsvp}
          petalsEnabled={petalsEnabled}
          onTogglePetals={() => setPetalsEnabled((prev) => !prev)}
        />

        {/* Ambient Dark Romantic Background Canvas with Velvet Burgundy Glow */}
        <main className="relative z-10 space-y-4 sm:space-y-8 pb-12">
          {/* Section 1: Hero Section (Header with Rotating Flower) */}
          <div id="welcome">
            <HeroSection onScrollToNext={handleScrollToCouple} onScrollToCouple={handleScrollToCouple} />
          </div>

          {/* Section 2: Dedicated Bride & Groom Section */}
          <div ref={coupleRef} id="couple">
            <BrideAndGroomSection />
          </div>

          {/* Section 3: Countdown & Welcome Message */}
          <div ref={countdownRef} id="countdown">
            <CountdownSection />
          </div>

          {/* Section 3: Schedule of Events (Timeline) */}
          <div id="timeline">
            <ScheduleTimeline />
          </div>

          {/* Section 4: Venue Details & Map */}
          <div id="location">
            <VenueMap />
          </div>

          {/* Section 5: Invitation Acceptance Interactive Modal */}
          <div ref={rsvpSectionRef} id="rsvp">
            <RsvpModal />
          </div>

          {/* Section 6: Opinion & Guestbook Section */}
          <div id="thoughts">
            <GuestbookOpinion />
          </div>
        </main>

        {/* Footer */}
        <WeddingFooter onReplayEnvelope={handleReplayEnvelope} />
      </div>
    </div>
  );
}
