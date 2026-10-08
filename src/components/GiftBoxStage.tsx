import React, { useState } from 'react';
import { CONFIG } from '../config.ts';
import { Sparkles, ArrowRight } from 'lucide-react';

interface GiftBoxStageProps {
  onOpened: () => void;
  onGoToNextPage: () => void;
  isOpened: boolean;
  isTransitioning: boolean;
}

/**
 * Stages 4 & 5: Gift Box Reveal and Opening Sequence
 * 
 * - Stage 4: Premium floating gift box with ambient glow and "Tap the gift 🎁" prompt.
 * - Stage 5: Tap triggers bounce -> lid lifts -> radiant light emerges ->
 *   "HAPPY BIRTHDAY ❤️" typography and next-page navigation appear.
 */
export const GiftBoxStage: React.FC<GiftBoxStageProps> = ({
  onOpened,
  onGoToNextPage,
  isOpened,
  isTransitioning,
}) => {
  const [isTapping, setIsTapping] = useState(false);

  // Play a soft romantic chime using Web Audio API (completely client-side, graceful fallback)
  const playChime = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Gentle romantic arpeggio chord: F#5, A5, C#6, E6
      const freqs = [739.99, 880.0, 1108.73, 1318.51];
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.12);

        gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.12);
        gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + idx * 0.12 + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.12 + 1.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + idx * 0.12);
        osc.stop(ctx.currentTime + idx * 0.12 + 1.25);
      });
    } catch {
      // Audio autoplay restrictions or headless environment — gracefully ignore
    }
  };

  const handleBoxTap = () => {
    if (isOpened || isTapping || isTransitioning) return;

    setIsTapping(true);
    playChime();

    // Haptic pulse if supported
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate([30, 40, 60]);
      } catch {
        // ignore
      }
    }

    // Allow anticipation bounce to finish before opening lid
    setTimeout(() => {
      onOpened();
      setIsTapping(false);
    }, CONFIG.TIMINGS.boxOpenDelayMs);
  };

  return (
    <div className="relative z-20 flex flex-col items-center justify-center w-full max-w-md mx-auto px-4 py-6 text-center select-none">
      {/* 
        ========================================================================
        STAGE 5: CELEBRATORY HEADLINE TYPOGRAPHY
        Appears above the gift box once opened
        ========================================================================
      */}
      {isOpened && (
        <div className="mb-6 animate-fadeIn transition-all duration-700 ease-out z-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-400/20 text-rose-300 text-xs font-medium mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Forever & Always</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-rose-100 to-amber-100 drop-shadow-[0_4px_20px_rgba(244,63,94,0.4)] mb-2.5">
            {CONFIG.STAGE_5_CELEBRATION.headline}
          </h1>

          <p className="font-sans text-sm sm:text-base text-rose-200/80 max-w-xs mx-auto leading-relaxed">
            {CONFIG.STAGE_5_CELEBRATION.subtext}
          </p>

          {/* Personal Note */}
          <div className="mt-4 pt-3.5 border-t border-rose-400/15 max-w-[310px] sm:max-w-xs mx-auto animate-fadeIn transition-opacity duration-700 delay-300">
            <p className="font-serif italic text-sm sm:text-[15px] text-rose-100/90 leading-relaxed whitespace-pre-line tracking-wide">
              {CONFIG.STAGE_5_CELEBRATION.personalNote}
            </p>
          </div>
        </div>
      )}

      {/* 
        ========================================================================
        INTERACTIVE GIFT BOX
        ========================================================================
      */}
      <div className="relative flex items-center justify-center my-4">
        {/* Soft atmospheric aura behind the box */}
        <div
          className={`absolute w-64 h-64 rounded-full transition-all duration-1000 ${
            isOpened
              ? 'bg-gradient-to-r from-amber-400/30 via-rose-500/40 to-pink-500/30 blur-3xl scale-125'
              : 'bg-rose-600/20 blur-2xl animate-romantic-glow'
          }`}
          aria-hidden="true"
        />

        {/* Radiant light rays beaming out when opened */}
        {isOpened && (
          <div
            className="absolute w-72 h-72 rounded-full pointer-events-none animate-beam-radiance"
            style={{
              background:
                'radial-gradient(circle, rgba(254,240,138,0.7) 0%, rgba(244,63,94,0.4) 40%, transparent 70%)',
            }}
            aria-hidden="true"
          />
        )}

        {/* Touch Button Area */}
        <button
          type="button"
          onClick={handleBoxTap}
          disabled={isOpened || isTapping || isTransitioning}
          aria-label={isOpened ? 'Opened birthday gift' : 'Tap to open the birthday gift'}
          className={`relative w-56 h-56 sm:w-60 sm:h-60 flex items-center justify-center 
            outline-none cursor-pointer group transition-transform duration-300
            ${!isOpened && !isTapping ? 'animate-gentle-float hover:scale-105 active:scale-95' : ''}
            ${isTapping ? 'animate-anticipation-bounce' : ''}
            ${isOpened ? 'cursor-default' : ''}`}
        >
          {/* ================= SVG GIFT BOX ================= */}
          <svg
            viewBox="0 0 200 200"
            className="w-48 h-48 sm:w-52 sm:h-52 drop-shadow-[0_15px_30px_rgba(0,0,0,0.7)]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Box gradients */}
              <linearGradient id="boxGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#be123c" />
                <stop offset="60%" stopColor="#881337" />
                <stop offset="100%" stopColor="#4c0519" />
              </linearGradient>

              {/* Lid gradients */}
              <linearGradient id="lidGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#e11d48" />
                <stop offset="60%" stopColor="#9f1239" />
                <stop offset="100%" stopColor="#881337" />
              </linearGradient>

              {/* Gold Ribbon Gradients */}
              <linearGradient id="goldRibbon" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="50%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#d97706" />
              </linearGradient>

              <linearGradient id="goldBow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fef9c3" />
                <stop offset="40%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#b45309" />
              </linearGradient>

              {/* Interior Glow Gradient */}
              <radialGradient id="interiorGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#fef08a" stopOpacity="1" />
                <stop offset="50%" stopColor="#f43f5e" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#881337" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Inner box depth / opening interior */}
            {isOpened && (
              <g className="transition-opacity duration-500 opacity-100">
                <rect x="42" y="80" width="116" height="85" rx="10" fill="url(#interiorGlow)" />
                {/* Floating sparkles emerging from box */}
                <circle cx="85" cy="70" r="3" fill="#fef08a" className="animate-ping" />
                <circle cx="115" cy="65" r="2.5" fill="#ffffff" className="animate-pulse" />
              </g>
            )}

            {/* --- BOX BODY --- */}
            <g>
              {/* Main Box Body */}
              <rect
                x="40"
                y="85"
                width="120"
                height="85"
                rx="12"
                fill="url(#boxGrad)"
                stroke="rgba(255, 255, 255, 0.15)"
                strokeWidth="1.5"
              />

              {/* Box Vertical Golden Ribbon */}
              <rect x="91" y="85" width="18" height="85" fill="url(#goldRibbon)" />
              {/* Ribbon specular edge */}
              <line x1="93" y1="85" x2="93" y2="170" stroke="#fef9c3" strokeWidth="1" strokeOpacity="0.7" />

              {/* Subtle bottom shadow overlay */}
              <path
                d="M40 155 C 70 170, 130 170, 160 155 L 160 158 C 160 164.6, 154.6 170, 148 170 L 52 170 C 45.4 170, 40 164.6, 40 158 Z"
                fill="#2e020d"
                fillOpacity="0.6"
              />
            </g>

            {/* --- BOX LID & BOW (Animated open/closed) --- */}
            <g
              style={{
                transformOrigin: '40px 70px',
                transform: isOpened
                  ? 'translate(-12px, -45px) rotate(-22deg) scale(0.96)'
                  : 'translate(0px, 0px) rotate(0deg)',
                transition: 'transform 0.75s cubic-bezier(0.2, 0.9, 0.3, 1.2), opacity 0.5s ease',
              }}
            >
              {/* Lid Top Shadow */}
              <rect
                x="33"
                y="66"
                width="134"
                height="24"
                rx="8"
                fill="url(#lidGrad)"
                stroke="rgba(255, 255, 255, 0.2)"
                strokeWidth="1.5"
              />

              {/* Lid Horizontal Ribbon */}
              <rect x="33" y="73" width="134" height="10" fill="url(#goldRibbon)" />

              {/* Lid Vertical Ribbon Segment */}
              <rect x="91" y="66" width="18" height="24" fill="url(#goldRibbon)" />

              {/* Ribbon Bow Left Loop */}
              <path
                d="M100 66 C 80 40, 50 48, 62 66 C 75 72, 90 68, 100 66 Z"
                fill="url(#goldBow)"
                stroke="#d97706"
                strokeWidth="0.8"
              />
              {/* Ribbon Bow Right Loop */}
              <path
                d="M100 66 C 120 40, 150 48, 138 66 C 125 72, 110 68, 100 66 Z"
                fill="url(#goldBow)"
                stroke="#d97706"
                strokeWidth="0.8"
              />

              {/* Bow Center Knot */}
              <ellipse cx="100" cy="65" rx="8" ry="7" fill="url(#goldBow)" stroke="#fef08a" strokeWidth="1" />

              {/* Ribbon Tails */}
              <path
                d="M96 68 Q 85 80, 80 88 Q 88 84, 94 72 Z"
                fill="url(#goldBow)"
                opacity="0.9"
              />
              <path
                d="M104 68 Q 115 80, 120 88 Q 112 84, 106 72 Z"
                fill="url(#goldBow)"
                opacity="0.9"
              />
            </g>
          </svg>
        </button>
      </div>

      {/* 
        ========================================================================
        STAGE 4: INSTRUCTION TEXT (Before Box is Opened)
        ========================================================================
      */}
      {!isOpened ? (
        <div className="mt-4 space-y-1.5 animate-fadeIn">
          <p className="font-serif text-2xl sm:text-3xl font-medium tracking-wide text-rose-100 flex items-center justify-center gap-2">
            <span>{CONFIG.STAGE_4_GIFT_BOX.instructionText}</span>
          </p>
          <p className="font-sans text-xs sm:text-sm text-rose-300/60 max-w-xs mx-auto">
            {CONFIG.STAGE_4_GIFT_BOX.subtitleText}
          </p>
        </div>
      ) : (
        /* 
          ========================================================================
          STAGE 6 TRANSITION BUTTON (After Box is Opened)
          Calls goToNextPage()
          ========================================================================
        */
        <div className="mt-6 w-full max-w-xs animate-fadeIn transition-all duration-500 delay-300">
          <button
            type="button"
            onClick={onGoToNextPage}
            disabled={isTransitioning}
            className="w-full h-14 rounded-2xl font-medium text-base tracking-wide
              bg-gradient-to-r from-rose-600 via-rose-500 to-pink-600 text-white
              shadow-[0_10px_35px_rgba(225,29,72,0.45)]
              hover:shadow-[0_12px_40px_rgba(225,29,72,0.6)]
              active:scale-[0.97] transition-all duration-200
              disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2.5"
          >
            <span>{CONFIG.STAGE_5_CELEBRATION.nextPageButton}</span>
            <ArrowRight className="w-5 h-5 stroke-[2]" />
          </button>
        </div>
      )}
    </div>
  );
};
