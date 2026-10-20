import React, { useState, useEffect } from 'react';
import { RsvpData } from '../types';
import { X, CheckCircle2, User, Users, HeartHandshake, AlertCircle } from 'lucide-react';
import { FloralCorner } from './FloralCorner';

const STORAGE_KEY = 'abrar_payelia_wedding_rsvp';

export const RsvpModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [attending, setAttending] = useState<'accepted' | 'declined'>('accepted');
  const [guestCount, setGuestCount] = useState<number>(1);
  const [dietaryNote, setDietaryNote] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submittedData, setSubmittedData] = useState<RsvpData | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setSubmittedData(JSON.parse(saved));
      }
    } catch {
      // Ignore
    }
  }, []);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please provide your name so we can record your response.');
      return;
    }

    const data: RsvpData = {
      name: name.trim(),
      attending,
      guestCount: attending === 'accepted' ? Math.max(1, Number(guestCount) || 1) : 0,
      dietaryNote: dietaryNote.trim() || undefined,
      submittedAt: new Date().toISOString(),
    };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      setSubmittedData(data);
      setError(null);
    } catch {
      // Ignore
    }
  };

  const handleReset = () => {
    localStorage.removeItem(STORAGE_KEY);
    setSubmittedData(null);
    setName('');
    setAttending('accepted');
    setGuestCount(1);
    setDietaryNote('');
  };

  return (
    <section className="relative w-full py-12 px-4 sm:px-6 flex flex-col items-center justify-center text-center">
      {/* Outer Section Frame */}
      <div
        className="relative w-full max-w-2xl text-[#382027] rounded-3xl p-8 sm:p-12 shadow-2xl border border-[#c48a86] flex flex-col items-center"
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

        <div className="relative z-10 max-w-md mx-auto">
          <span className="font-cinzel text-xs tracking-[0.25em] text-[#84243b] font-semibold uppercase">
            Kindly Respond
          </span>
          <h2 className="font-script text-5xl sm:text-6xl text-[#541020] my-2">
            R.S.V.P.
          </h2>
          <p className="font-serif-luxury italic text-sm sm:text-base text-[#84243b]/90 mb-6">
            Your presence will illuminate our day with joy and blessings.
          </p>

          {/* Section with a circular seal button that says "Invitation acceptance - Click to open" */}
          <div className="my-4 flex flex-col items-center">
            <button
              onClick={() => setIsOpen(true)}
              type="button"
              className="group relative flex flex-col items-center cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e0bd83] rounded-full p-2"
              aria-label="Invitation acceptance - Click to open"
            >
              {/* Outer seal glow ring */}
              <div
                className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full flex items-center justify-center box-shadow-wax group-hover:scale-105 active:scale-95 transition-transform duration-300"
                style={{
                  background: 'radial-gradient(circle at 35% 30%, #a8283f 0%, #7e1a2e 55%, #5c0f1f 75%, #3d0c18 100%)',
                }}
              >
                {/* Gold ring border */}
                <div className="w-26 h-26 sm:w-30 sm:h-30 rounded-full border-[1.5px] border-[#e0bd83] flex flex-col items-center justify-center text-center p-2 bg-[#5c0f1f]/50">
                  <HeartHandshake className="w-5 h-5 text-[#ffd9a0] mb-0.5" />
                  <span className="font-cinzel text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#ffd9a0] leading-tight">
                    Invitation
                    <br />
                    acceptance
                  </span>
                  <span className="text-[9px] font-sans-clean text-[#f7efe5] uppercase tracking-wider mt-1 opacity-90">
                    Click to open
                  </span>
                </div>
              </div>

              {/* Pulsing indicator tag */}
              <div
                className="mt-3 px-4 py-1.5 rounded-full border border-[#e0bd83] text-[#fff0d4] text-[11px] font-cinzel font-bold tracking-wider flex items-center gap-1.5 shadow-md group-hover:brightness-110 transition-all"
                style={{
                  background: 'linear-gradient(135deg, #84243b, #451020)',
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#ffd9a0] animate-ping" />
                <span>OPEN RSVP FORM</span>
              </div>
            </button>
          </div>

          {/* If already submitted, show quick badge */}
          {submittedData && (
            <div className="mt-4 p-3 bg-[#FAF0E6] rounded-xl border border-[#D4AF37]/50 text-xs text-[#58111A] flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  Responded as <strong>{submittedData.name}</strong> ({submittedData.attending === 'accepted' ? 'Attending with pleasure' : 'Declined'})
                </span>
              </div>
              <button
                onClick={() => setIsOpen(true)}
                className="underline font-semibold hover:text-[#8B2635] text-[11px] cursor-pointer"
              >
                View / Edit
              </button>
            </div>
          )}
        </div>
      </div>

      {/* POPUP MODAL OVERLAY */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="rsvp-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-300"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative w-full max-w-lg bg-[#FAF6F0] text-[#281412] rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-[#D4AF37]/60 overflow-hidden text-left animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              type="button"
              className="absolute top-4 right-4 p-2 text-[#8B2635] hover:text-[#361917] hover:bg-[#8B2635]/10 rounded-full transition-colors cursor-pointer focus:outline-none"
              aria-label="Close RSVP modal"
            >
              <X className="w-5 h-5" />
            </button>

            <FloralCorner position="top-left" size={48} className="top-1 left-1" />
            <FloralCorner position="bottom-right" size={48} className="bottom-1 right-1" />

            <div className="relative z-10 pt-1">
              <span className="font-cinzel text-xs tracking-widest text-[#8B2635] font-semibold uppercase block">
                Official Attendance
              </span>
              <h3 id="rsvp-modal-title" className="font-script text-4xl text-[#3A141A] my-1">
                Invitation Acceptance
              </h3>
              <p className="font-serif-luxury italic text-xs sm:text-sm text-[#661523]/80 mb-5">
                Please complete the details below before October 25, 2026.
              </p>

              {/* Status banner if already submitted */}
              {submittedData && (
                <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <div>
                      <p className="font-semibold">Current RSVP Recorded</p>
                      <p>
                        {submittedData.name} · {submittedData.attending === 'accepted' ? `Attending (${submittedData.guestCount} guests)` : 'Declined with regret'}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleReset}
                    type="button"
                    className="text-[11px] text-emerald-900 underline hover:no-underline cursor-pointer"
                  >
                    Clear
                  </button>
                </div>
              )}

              {error && (
                <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Input field: "Your name" */}
                <div>
                  <label htmlFor="guest-name" className="block font-cinzel text-xs font-bold text-[#3A141A] uppercase tracking-wider mb-1.5">
                    Your Name <span className="text-[#8B2635]">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B2635]/60" />
                    <input
                      id="guest-name"
                      type="text"
                      required
                      placeholder="e.g. Dr. Salman Khan & Family"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#D4AF37]/60 bg-white focus:outline-none focus:ring-2 focus:ring-[#8B2635] text-sm text-[#281412] placeholder:text-[#281412]/40"
                    />
                  </div>
                </div>

                {/* Radio buttons: "Will you be attending?" (Options: "Accepts with pleasure" / "Declines with regret") */}
                <div>
                  <label className="block font-cinzel text-xs font-bold text-[#3A141A] uppercase tracking-wider mb-2">
                    Will you be attending? <span className="text-[#8B2635]">*</span>
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <label
                      className={`relative flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                        attending === 'accepted'
                          ? 'border-[#8B2635] bg-[#8B2635]/10 shadow-sm'
                          : 'border-slate-300 hover:border-[#8B2635]/50 bg-white'
                      }`}
                    >
                      <input
                        type="radio"
                        name="attending"
                        value="accepted"
                        checked={attending === 'accepted'}
                        onChange={() => setAttending('accepted')}
                        className="w-4 h-4 text-[#8B2635] focus:ring-[#8B2635]"
                      />
                      <span className="font-serif-luxury font-bold text-sm text-[#3A141A]">
                        Accepts with pleasure
                      </span>
                    </label>

                    <label
                      className={`relative flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                        attending === 'declined'
                          ? 'border-[#8B2635] bg-[#8B2635]/10 shadow-sm'
                          : 'border-slate-300 hover:border-[#8B2635]/50 bg-white'
                      }`}
                    >
                      <input
                        type="radio"
                        name="attending"
                        value="declined"
                        checked={attending === 'declined'}
                        onChange={() => setAttending('declined')}
                        className="w-4 h-4 text-[#8B2635] focus:ring-[#8B2635]"
                      />
                      <span className="font-serif-luxury font-bold text-sm text-[#661523]">
                        Declines with regret
                      </span>
                    </label>
                  </div>
                </div>

                {/* Input field: "Number of Guests Attending" */}
                {attending === 'accepted' && (
                  <div>
                    <label htmlFor="guest-count" className="block font-cinzel text-xs font-bold text-[#3A141A] uppercase tracking-wider mb-1.5">
                      Number of Guests Attending <span className="text-[#8B2635]">*</span>
                    </label>
                    <div className="relative">
                      <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B2635]/60" />
                      <input
                        id="guest-count"
                        type="number"
                        min={1}
                        max={10}
                        required
                        value={guestCount}
                        onChange={(e) => setGuestCount(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#D4AF37]/60 bg-white focus:outline-none focus:ring-2 focus:ring-[#8B2635] text-sm text-[#281412]"
                      />
                    </div>
                    <span className="text-[11px] text-[#661523]/70 font-sans-clean mt-1 block">
                      Including yourself (Reserved seats: up to 10 per invitation)
                    </span>
                  </div>
                )}

                {/* Optional dietary / notes */}
                {attending === 'accepted' && (
                  <div>
                    <label htmlFor="dietary-notes" className="block font-cinzel text-[11px] font-semibold text-[#3A141A] uppercase tracking-wider mb-1">
                      Dietary Preferences or Special Notes (Optional)
                    </label>
                    <input
                      id="dietary-notes"
                      type="text"
                      placeholder="e.g. Vegetarian preference, wheelchair assistance needed"
                      value={dietaryNote}
                      onChange={(e) => setDietaryNote(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-[#D4AF37]/40 bg-white focus:outline-none focus:ring-1 focus:ring-[#8B2635] text-xs text-[#281412] placeholder:text-[#281412]/40"
                    />
                  </div>
                )}

                {/* Accent button: "Submit" */}
                <div className="pt-3">
                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl bg-gold-gradient hover:brightness-110 active:scale-[0.99] text-[#240D13] font-cinzel text-sm font-bold tracking-[0.15em] uppercase transition-all shadow-lg cursor-pointer flex items-center justify-center gap-2"
                  >
                    <HeartHandshake className="w-4 h-4 text-[#240D13]" />
                    <span>Submit</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
