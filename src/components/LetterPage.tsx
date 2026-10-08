import React from 'react';
import { CONFIG } from '../config.ts';
import { ArrowRight, Heart } from 'lucide-react';

interface LetterPageProps {
  onGoToPoetryPage: () => void;
  onReplay?: () => void;
}

/**
 * LetterPage (Stage 6)
 * 
 * An intimate, long-form digital reading surface:
 * - Quiet, serene atmosphere
 * - Deep translucent burgundy/obsidian editorial page
 * - Natural full-page vertical scrolling
 * - Beautiful typography with left-aligned warm serif prose
 * - Exact unaltered text preserving original heartfelt voice
 * - Understated "There's more →" continuation to future poetry section
 */
export const LetterPage: React.FC<LetterPageProps> = ({
  onGoToPoetryPage,
  onReplay,
}) => {
  const { title, date, paragraphs, nextButton } = CONFIG.STAGE_6_LETTER;

  return (
    <div className="w-full max-w-[620px] mx-auto px-3.5 sm:px-6 my-4 sm:my-8 animate-fadeIn transition-opacity duration-700 ease-out">
      {/* 
        ========================================================================
        READING SURFACE
        Deep translucent editorial paper with soft hairline border
        ========================================================================
      */}
      <article
        className="relative w-full rounded-2xl sm:rounded-3xl
          bg-gradient-to-b from-[#15071e]/85 via-[#0e0415]/90 to-[#07020a]/95
          backdrop-blur-md
          border border-rose-400/15
          shadow-[0_20px_50px_rgba(0,0,0,0.7),0_0_40px_rgba(225,29,72,0.03)]
          p-6 sm:p-10 md:p-12
          select-text"
      >
        {/* Soft specular rim highlight on top border */}
        <div
          className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-rose-300/25 to-transparent"
          aria-hidden="true"
        />

        {/* 
          ----------------------------------------------------------------------
          HEADER / TITLE & DATE
          Understated, quiet, intimate
          ----------------------------------------------------------------------
        */}
        <header className="mb-8 pb-6 border-b border-rose-500/15">
          <div className="flex items-center justify-between mb-2">
            <span className="font-serif tracking-[0.25em] text-xs text-rose-300/60 uppercase">
              {date}
            </span>
            <span className="flex items-center gap-1 text-[11px] font-sans tracking-wider text-rose-400/40">
              <Heart className="w-2.5 h-2.5 fill-rose-500/30 stroke-rose-400/50" />
              <span>Personal Letter</span>
            </span>
          </div>

          <h1 className="font-serif text-2xl sm:text-3xl text-rose-50 font-normal tracking-wide leading-tight">
            {title}
          </h1>
        </header>

        {/* 
          ----------------------------------------------------------------------
          THE LETTER BODY
          Preserves exact words, phrasing, punctuation, and Hinglish.
          Comfortable mobile font size, left-aligned, relaxed line height.
          ----------------------------------------------------------------------
        */}
        <div className="space-y-6 sm:space-y-7 text-left">
          {paragraphs.map((paragraph, index) => {
            // Give the emotional reassurance paragraph a gentle left accent
            const isReassurance = index === 3;
            // The final birthday wish
            const isFinalWish = index === paragraphs.length - 1;

            if (isReassurance) {
              return (
                <div
                  key={index}
                  className="pl-3.5 sm:pl-4 border-l-2 border-rose-500/30 my-6 sm:my-7 bg-rose-950/10 py-1 rounded-r-lg"
                >
                  <p className="font-serif text-[16px] sm:text-[17px] text-rose-100/95 leading-[1.85] sm:leading-[1.9] tracking-[0.01em]">
                    {paragraph}
                  </p>
                </div>
              );
            }

            if (isFinalWish) {
              return (
                <div key={index} className="pt-3 border-t border-rose-500/15">
                  <p className="font-serif text-[17px] sm:text-[18px] text-rose-100 font-medium leading-[1.85] tracking-[0.01em]">
                    {paragraph}
                  </p>
                </div>
              );
            }

            return (
              <p
                key={index}
                className="font-serif text-[16px] sm:text-[17px] text-rose-100/90 leading-[1.85] sm:leading-[1.9] tracking-[0.01em]"
              >
                {paragraph}
              </p>
            );
          })}
        </div>

        {/* 
          ----------------------------------------------------------------------
          FOOTER / CONTINUATION
          Generous breathing room and subtle continuation button
          ----------------------------------------------------------------------
        */}
        <footer className="mt-12 pt-8 border-t border-rose-500/15 flex flex-col sm:flex-row items-center justify-between gap-4 select-none">
          {/* Subtle note indicator */}
          <div className="flex items-center gap-2 text-xs font-serif italic text-rose-300/50">
            <span>Written with all my heart</span>
            <span aria-hidden="true">·</span>
            <span>Always yours</span>
          </div>

          {/* Continuation Button ("There's more →") */}
          <button
            type="button"
            onClick={onGoToPoetryPage}
            className="w-full sm:w-auto min-h-[48px] px-6 py-3 rounded-xl
              bg-rose-950/50 hover:bg-rose-900/60 text-rose-100
              border border-rose-500/30 hover:border-rose-400/50
              shadow-[0_4px_20px_rgba(225,29,72,0.15)]
              active:scale-[0.98] transition-all duration-200
              text-sm font-medium tracking-wide cursor-pointer
              flex items-center justify-center gap-2 group"
          >
            <span>{nextButton}</span>
            <ArrowRight className="w-4 h-4 text-rose-300 transition-transform group-hover:translate-x-0.5" />
          </button>
        </footer>

        {/* Optional small replay link for review */}
        {onReplay && (
          <div className="mt-6 text-center select-none">
            <button
              type="button"
              onClick={onReplay}
              className="text-[11px] text-rose-400/40 hover:text-rose-300/70 underline underline-offset-4 transition-colors cursor-pointer"
            >
              Replay experience from beginning
            </button>
          </div>
        )}
      </article>
    </div>
  );
};
