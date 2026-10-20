import React, { useState, useEffect } from 'react';
import { FloralCorner, FloralDivider } from './FloralCorner';
import { Calendar, Download, Heart } from 'lucide-react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPassed: boolean;
}

export const CountdownSection: React.FC = () => {
  // Target: Friday, November 06, 2026 at 1:00 PM Dhaka Time (UTC+6)
  const targetDate = new Date('2026-11-06T13:00:00+06:00').getTime();

  const calculateTimeLeft = (): TimeLeft => {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isPassed: true };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000),
      isPassed: false,
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleDownloadIcs = () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Abrar & Payelia Wedding//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      'UID:wedding-abrar-payelia-20261106@invitation',
      'SUMMARY:Wedding of Abrar and Payelia (Nikkah & Reception)',
      'DESCRIPTION:Traditional Introduction Ceremony and Nikkah celebrating Abrar and Payelia. Venue: JK Convention Hall, Tropical Saleh Tower, Lift-5, Atish Dipankar Road, Basabo(Near Boddho mondir), Dhaka.',
      'LOCATION:JK Convention Hall, Tropical Saleh Tower, Lift-5, Atish Dipankar Road, Basabo(Near Boddho mondir), Dhaka',
      'DTSTART:20261106T070000Z', // 1:00 PM Dhaka (UTC+6) is 07:00 UTC
      'DTEND:20261106T120000Z',   // 6:00 PM Dhaka is 12:00 UTC
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Abrar-Payelia-Wedding.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Wedding+of+Abrar+and+Payelia&dates=20261106T070000Z/20261106T120000Z&details=Traditional+Introduction+Ceremony+and+Nikkah+celebrating+Abrar+and+Payelia.+Venue:+JK+Convention+Hall,+Tropical+Saleh+Tower,+Lift-5,+Atish+Dipankar+Road,+Basabo(Near+Boddho+mondir),+Dhaka&location=JK+Convention+Hall,+Tropical+Saleh+Tower,+Lift-5,+Atish+Dipankar+Road,+Basabo(Near+Boddho+mondir),+Dhaka`;

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

        <div className="relative z-10 text-center">
          {/* Welcome Message Header */}
          <div className="flex items-center justify-center gap-2 text-[#84243b] mb-2">
            <Heart className="w-4 h-4 fill-[#bb3151]/30 text-[#bb3151]" />
            <span className="font-cinzel text-xs tracking-[0.25em] uppercase font-semibold text-[#84243b]">
              Sacred Union & Celebration
            </span>
            <Heart className="w-4 h-4 fill-[#bb3151]/30 text-[#bb3151]" />
          </div>

          {/* Prompt specific invitation text */}
          <blockquote className="font-serif-luxury text-lg sm:text-2xl text-[#541020] leading-relaxed my-4 max-w-xl mx-auto italic font-normal px-2">
            “Abrar and Payelia warmly invite you to celebrate with them as their families come together for their Traditional Introduction Ceremony.”
          </blockquote>

          <p className="font-sans-clean text-xs sm:text-sm text-[#84243b]/90 tracking-wide max-w-lg mx-auto">
            In the presence of Almighty Allah and beloved friends and family, honoring love, traditions, and new beginnings.
          </p>

          <FloralDivider className="my-6" />

          {/* Live Countdown Title */}
          <h2 className="font-cinzel text-base sm:text-xl font-bold tracking-[0.2em] text-[#541020] uppercase mb-6">
            The Celebration Begins In
          </h2>

          {/* Countdown Digit Grid */}
          <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-md mx-auto mb-6">
            {/* Days */}
            <div className="bg-[#541020] text-[#fffaf2] rounded-xl p-3 sm:p-4 border border-[#e0bd83] shadow-md flex flex-col items-center outline-1 outline-[#e0bd83]/40 outline-offset-[-4px]">
              <span className="font-serif-luxury text-2xl sm:text-4xl font-bold text-[#ffd9a0] tabular-nums">
                {String(timeLeft.days).padStart(2, '0')}
              </span>
              <span className="font-cinzel text-[10px] sm:text-xs text-[#f7efe5] uppercase tracking-widest mt-1">
                Days
              </span>
            </div>

            {/* Hours */}
            <div className="bg-[#541020] text-[#fffaf2] rounded-xl p-3 sm:p-4 border border-[#e0bd83] shadow-md flex flex-col items-center outline-1 outline-[#e0bd83]/40 outline-offset-[-4px]">
              <span className="font-serif-luxury text-2xl sm:text-4xl font-bold text-[#ffd9a0] tabular-nums">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="font-cinzel text-[10px] sm:text-xs text-[#f7efe5] uppercase tracking-widest mt-1">
                Hours
              </span>
            </div>

            {/* Minutes */}
            <div className="bg-[#541020] text-[#fffaf2] rounded-xl p-3 sm:p-4 border border-[#e0bd83] shadow-md flex flex-col items-center outline-1 outline-[#e0bd83]/40 outline-offset-[-4px]">
              <span className="font-serif-luxury text-2xl sm:text-4xl font-bold text-[#ffd9a0] tabular-nums">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="font-cinzel text-[10px] sm:text-xs text-[#f7efe5] uppercase tracking-widest mt-1">
                Minutes
              </span>
            </div>

            {/* Seconds */}
            <div className="bg-[#541020] text-[#fffaf2] rounded-xl p-3 sm:p-4 border border-[#e0bd83] shadow-md flex flex-col items-center outline-1 outline-[#e0bd83]/40 outline-offset-[-4px]">
              <span className="font-serif-luxury text-2xl sm:text-4xl font-bold text-[#ffd9a0] tabular-nums">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
              <span className="font-cinzel text-[10px] sm:text-xs text-[#f7efe5] uppercase tracking-widest mt-1">
                Seconds
              </span>
            </div>
          </div>

          {/* Quick Calendar Actions */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href={googleCalendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#e0bd83] text-[#fff0d4] text-xs font-cinzel font-bold tracking-wider hover:brightness-110 transition-all shadow-md cursor-pointer whitespace-nowrap"
              style={{
                background: 'linear-gradient(135deg, #84243b, #451020)',
              }}
            >
              <Calendar className="w-3.5 h-3.5 text-[#e0bd83]" />
              <span>Google Calendar</span>
            </a>

            <button
              onClick={handleDownloadIcs}
              type="button"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#84243b] text-[#541020] hover:bg-[#84243b]/10 text-xs font-cinzel font-bold tracking-wider transition-colors cursor-pointer whitespace-nowrap bg-white/60 shadow-xs"
            >
              <Download className="w-3.5 h-3.5 text-[#84243b]" />
              <span>Download .iCal</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
