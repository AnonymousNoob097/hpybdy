import React, { useState, useRef, useEffect } from 'react';
import { CONFIG } from '../config.ts';
import { ArrowRight, ArrowLeft, BookOpen, Sparkles, Heart } from 'lucide-react';
import herEyesArtwork from '../HER_EYES_FINAL.png.png';
import parallelHeartsArtwork from '../PARALLEL_HEARTS.png';
import twoBirdsArtwork from '../TWO_BIRDS_ONE_MOON.png';
import waqtKaPardaArtwork from '../WAQT_KA_PARDA.png';
import yearningNightArtwork from '../YEARNING_NIGHT.png';
import diaryPage1 from '../1.jpg';
import diaryPage2 from '../2.jpg';

interface PoetrySectionProps {
  onBackToLetter: () => void;
}

export type PoetrySubPage =
  | 'INTRO'
  | 'HER_EYES'
  | 'PARALLEL_HEARTS'
  | 'TWO_BIRDS_ONE_MOON'
  | 'WAQT_KA_PARDA'
  | 'YEARNING_NIGHT'
  | 'DIARY_INTRO'
  | 'DIARY_PAGE_1'
  | 'DIARY_PAGE_2'
  | 'FINAL_MESSAGE';

/**
 * PoetrySection (Complete Experience: Poems 1–5, Small Diary & Final Birthday Message)
 * 
 * Digital Book flow:
 * - Page 0: Poetry Introduction (centered editorial prose)
 * - Page 1: Her Eyes (Intro Note + Canonical Artwork)
 * - Page 2: Parallel Hearts (Transition Note + Canonical Artwork)
 * - Page 3: Two Birds One Moon (Transition Note + Canonical Artwork)
 * - Page 4: Waqt Ka Parda (Personal Memory Note + Canonical Artwork)
 * - Page 5: Yearning Night (Final Poem Note + Canonical Artwork)
 * - Page 6: Small Diary — Introduction (Personal Note)
 * - Page 7: Small Diary — Handwritten Page 1 (03 April 2025)
 * - Page 8: Small Diary — Handwritten Page 2 (July 2025 + Closing Note)
 * - Page 9: Final Birthday Message (Emotional Culmination)
 */
export const PoetrySection: React.FC<PoetrySectionProps> = ({ onBackToLetter }) => {
  const [currentPage, setCurrentPage] = useState<PoetrySubPage>('INTRO');
  const [slideDirection, setSlideDirection] = useState<'forward' | 'backward'>('forward');
  const [revealStep, setRevealStep] = useState<number>(0);

  const {
    introParagraphs,
    introSwipePrompt,
    introNextButton,
    poem1Heading,
    poem1Note,
    poem1ImageAlt,
    poem1NextPrompt,
    poem1NextButton,
  } = CONFIG.POETRY_CHUNK_1;

  const {
    poem2Heading,
    poem2Note,
    poem2ImageAlt,
    poem2NextPrompt,
    poem2NextButton,
  } = CONFIG.POETRY_CHUNK_2;

  const {
    poem3Heading,
    poem3Note,
    poem3ImageAlt,
    poem3NextPrompt,
    poem3NextButton,
  } = CONFIG.POETRY_CHUNK_3;

  const {
    poem4Note,
    poem4ImageAlt,
    poem4NextPrompt,
    poem4NextButton,
  } = CONFIG.POETRY_CHUNK_4;

  const {
    poem5Note,
    poem5ImageAlt,
    closingLabel,
    closingSubtitle,
    goToDiaryButton,
  } = CONFIG.POETRY_CHUNK_5;

  const {
    sectionTitle: diarySectionTitle,
    introParagraphs: diaryIntroParagraphs,
    introButton: diaryIntroButton,
    page1Label: diaryPage1Label,
    page1ImageAlt: diaryPage1Alt,
    page1NextButton: diaryPage1NextBtn,
    page2Label: diaryPage2Label,
    page2ImageAlt: diaryPage2Alt,
    closingNote: diaryClosingNote,
    finalMessageButton: diaryFinalMsgBtn,
  } = CONFIG.SMALL_DIARY;

  const {
    transitionIntro: finalTransitionIntro,
    heading: finalHeading,
    paragraphs: finalParagraphs,
    birthdayWish: finalBirthdayWish,
    finalSignoff,
    finalHeart,
  } = CONFIG.FINAL_MESSAGE;

  // Touch gesture state for horizontal swipe detection
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  // Progressive reveal for Final Birthday Message
  useEffect(() => {
    if (currentPage !== 'FINAL_MESSAGE') {
      setRevealStep(0);
      return;
    }

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      setRevealStep(7);
      return;
    }

    const timers = [
      setTimeout(() => setRevealStep(1), 800),   // Heading: "I'm so Thankful for You."
      setTimeout(() => setRevealStep(2), 2200),  // Para 1
      setTimeout(() => setRevealStep(3), 4000),  // Para 2
      setTimeout(() => setRevealStep(4), 5800),  // Para 3
      setTimeout(() => setRevealStep(5), 7600),  // Para 4
      setTimeout(() => setRevealStep(6), 9600),  // Culmination wish: "Happy birthday to you."
      setTimeout(() => setRevealStep(7), 11600), // Signoff: "Made with everything I could give you."
    ];

    return () => timers.forEach(clearTimeout);
  }, [currentPage]);

  // Navigation handlers
  const handleNextPage = () => {
    if (currentPage === 'INTRO') {
      setSlideDirection('forward');
      setCurrentPage('HER_EYES');
    } else if (currentPage === 'HER_EYES') {
      setSlideDirection('forward');
      setCurrentPage('PARALLEL_HEARTS');
    } else if (currentPage === 'PARALLEL_HEARTS') {
      setSlideDirection('forward');
      setCurrentPage('TWO_BIRDS_ONE_MOON');
    } else if (currentPage === 'TWO_BIRDS_ONE_MOON') {
      setSlideDirection('forward');
      setCurrentPage('WAQT_KA_PARDA');
    } else if (currentPage === 'WAQT_KA_PARDA') {
      setSlideDirection('forward');
      setCurrentPage('YEARNING_NIGHT');
    } else if (currentPage === 'YEARNING_NIGHT') {
      setSlideDirection('forward');
      setCurrentPage('DIARY_INTRO');
    } else if (currentPage === 'DIARY_INTRO') {
      setSlideDirection('forward');
      setCurrentPage('DIARY_PAGE_1');
    } else if (currentPage === 'DIARY_PAGE_1') {
      setSlideDirection('forward');
      setCurrentPage('DIARY_PAGE_2');
    } else if (currentPage === 'DIARY_PAGE_2') {
      setSlideDirection('forward');
      setCurrentPage('FINAL_MESSAGE');
    }
  };

  const handlePrevPage = () => {
    if (currentPage === 'HER_EYES') {
      setSlideDirection('backward');
      setCurrentPage('INTRO');
    } else if (currentPage === 'PARALLEL_HEARTS') {
      setSlideDirection('backward');
      setCurrentPage('HER_EYES');
    } else if (currentPage === 'TWO_BIRDS_ONE_MOON') {
      setSlideDirection('backward');
      setCurrentPage('PARALLEL_HEARTS');
    } else if (currentPage === 'WAQT_KA_PARDA') {
      setSlideDirection('backward');
      setCurrentPage('TWO_BIRDS_ONE_MOON');
    } else if (currentPage === 'YEARNING_NIGHT') {
      setSlideDirection('backward');
      setCurrentPage('WAQT_KA_PARDA');
    } else if (currentPage === 'DIARY_INTRO') {
      setSlideDirection('backward');
      setCurrentPage('YEARNING_NIGHT');
    } else if (currentPage === 'DIARY_PAGE_1') {
      setSlideDirection('backward');
      setCurrentPage('DIARY_INTRO');
    } else if (currentPage === 'DIARY_PAGE_2') {
      setSlideDirection('backward');
      setCurrentPage('DIARY_PAGE_1');
    } else if (currentPage === 'FINAL_MESSAGE') {
      setSlideDirection('backward');
      setCurrentPage('DIARY_PAGE_2');
    } else if (currentPage === 'INTRO') {
      onBackToLetter();
    }
  };

  // Touch handlers that distinguish horizontal page-turns from vertical reading scrolling
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    // Minimum swipe threshold of 45px and dominant horizontal vector
    if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY) * 1.3) {
      if (deltaX < 0) {
        // Swiped Left -> Next page
        handleNextPage();
      } else if (deltaX > 0) {
        // Swiped Right -> Previous page
        handlePrevPage();
      }
    }

    touchStartX.current = null;
    touchStartY.current = null;
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="w-full max-w-[620px] mx-auto px-3.5 sm:px-6 my-4 sm:my-8 transition-all duration-300 ease-out"
    >
      {/* 
        ========================================================================
        PAGE 0: POETRY INTRODUCTION (Step 1)
        ========================================================================
      */}
      {currentPage === 'INTRO' && (
        <article
          className={`relative w-full rounded-2xl sm:rounded-3xl
            bg-gradient-to-b from-[#15071e]/85 via-[#0e0415]/90 to-[#07020a]/95
            backdrop-blur-md
            border border-rose-400/15
            shadow-[0_20px_50px_rgba(0,0,0,0.7),0_0_40px_rgba(225,29,72,0.03)]
            p-6 sm:p-10 md:p-12
            animate-fadeIn select-text`}
        >
          {/* Subtle top border specular highlight */}
          <div
            className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-rose-300/25 to-transparent"
            aria-hidden="true"
          />

          {/* Book header indicator */}
          <header className="mb-8 pb-5 border-b border-rose-500/15 flex items-center justify-between">
            <span className="font-serif tracking-[0.25em] text-xs text-rose-300/60 uppercase">
              Chapter I
            </span>
            <span className="flex items-center gap-1.5 text-[11px] font-sans tracking-wider text-rose-300/50">
              <BookOpen className="w-3 h-3 text-rose-400/60" />
              <span>Digital Poetry Book</span>
            </span>
          </header>

          {/* Centered Introduction Text (Exact text, unmodified) */}
          <div className="space-y-6 sm:space-y-7 text-center">
            {introParagraphs.map((paragraph, idx) => (
              <p
                key={idx}
                className="font-serif text-[16px] sm:text-[17px] text-rose-100/90 leading-[1.85] sm:leading-[1.9] tracking-[0.01em]"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* 
            --------------------------------------------------------------------
            Page Turn / Swipe Indicator & Controls (Step 2)
            --------------------------------------------------------------------
          */}
          <footer className="mt-12 pt-8 border-t border-rose-500/15 flex flex-col sm:flex-row items-center justify-between gap-4 select-none">
            {/* Swipe hint */}
            <div className="text-xs font-serif italic text-rose-300/60 flex items-center gap-1.5">
              <span>{introSwipePrompt}</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              {/* Back to letter */}
              <button
                type="button"
                onClick={onBackToLetter}
                className="w-1/2 sm:w-auto min-h-[46px] px-4 py-2.5 rounded-xl
                  bg-slate-900/60 hover:bg-slate-800/80 text-rose-300/70 border border-rose-500/20
                  active:scale-[0.98] transition-all text-xs tracking-wide cursor-pointer
                  flex items-center justify-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Letter</span>
              </button>

              {/* Next Page button */}
              <button
                type="button"
                onClick={handleNextPage}
                className="w-1/2 sm:w-auto min-h-[46px] px-5 py-2.5 rounded-xl
                  bg-rose-950/50 hover:bg-rose-900/60 text-rose-100 border border-rose-500/30
                  hover:border-rose-400/50 shadow-[0_4px_20px_rgba(225,29,72,0.15)]
                  active:scale-[0.98] transition-all text-sm font-medium tracking-wide cursor-pointer
                  flex items-center justify-center gap-2 group"
              >
                <span>{introNextButton}</span>
                <ArrowRight className="w-4 h-4 text-rose-300 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          </footer>
        </article>
      )}

      {/* 
        ========================================================================
        PAGE 1: HER EYES POEM ARTWORK (Steps 3 & 4)
        ========================================================================
      */}
      {currentPage === 'HER_EYES' && (
        <article className="w-full flex flex-col items-center animate-fadeIn select-text">
          {/* Header navigation bar */}
          <div className="w-full flex items-center justify-between mb-5 px-1 select-none">
            <button
              type="button"
              onClick={handlePrevPage}
              className="text-xs font-sans text-rose-300/70 hover:text-rose-200 flex items-center gap-1.5 py-1 px-2.5 rounded-lg bg-slate-900/50 border border-rose-500/20 active:scale-95 transition-all cursor-pointer"
            >
              <ArrowLeft className="w-3 h-3 text-rose-400" />
              <span>Intro</span>
            </button>

            <span className="font-serif tracking-[0.2em] text-[11px] text-rose-300/50 uppercase">
              Page 1 · Her Eyes
            </span>
          </div>

          {/* 
            --------------------------------------------------------------------
            STEP 3: FIRST-IMPRESSION NOTE
            --------------------------------------------------------------------
          */}
          <header className="w-full text-center mb-6 sm:mb-8 px-2">
            <h2 className="font-serif text-xl sm:text-2xl text-rose-50 font-normal tracking-wide leading-snug mb-2">
              {poem1Heading}
            </h2>
            <p className="font-serif italic text-sm sm:text-[15px] text-rose-200/75 leading-relaxed max-w-sm mx-auto">
              {poem1Note}
            </p>
          </header>

          {/* 
            --------------------------------------------------------------------
            STEP 4: HER EYES POEM ARTWORK
            Canonical artwork displayed in complete uncropped aspect ratio
            --------------------------------------------------------------------
          */}
          <div className="w-full max-w-[480px] mx-auto my-2 px-1 flex flex-col items-center">
            <img
              src={herEyesArtwork}
              alt={poem1ImageAlt}
              className="w-full h-auto max-w-full rounded-xl sm:rounded-2xl object-contain block mx-auto select-none shadow-[0_15px_35px_rgba(0,0,0,0.7)]"
              loading="eager"
            />
          </div>

          {/* 
            --------------------------------------------------------------------
            STEP 5: END OF HER EYES PAGE & CONTINUATION CONTROLS
            --------------------------------------------------------------------
          */}
          <footer className="w-full mt-10 sm:mt-12 pt-6 border-t border-rose-500/15 flex flex-col sm:flex-row items-center justify-between gap-4 select-none px-2">
            <span className="text-xs font-serif italic text-rose-300/60">
              {poem1NextPrompt}
            </span>

            <button
              type="button"
              onClick={handleNextPage}
              className="w-full sm:w-auto min-h-[48px] px-6 py-3 rounded-xl
                bg-rose-950/50 hover:bg-rose-900/60 text-rose-100
                border border-rose-500/30 hover:border-rose-400/50
                shadow-[0_4px_20px_rgba(225,29,72,0.15)]
                active:scale-[0.98] transition-all duration-200
                text-sm font-medium tracking-wide cursor-pointer
                flex items-center justify-center gap-2 group"
            >
              <span>{poem1NextButton}</span>
              <ArrowRight className="w-4 h-4 text-rose-300 transition-transform group-hover:translate-x-0.5" />
            </button>
          </footer>
        </article>
      )}

      {/* 
        ========================================================================
        PAGE 2: PARALLEL HEARTS POEM (Chunk 2)
        ========================================================================
      */}
      {currentPage === 'PARALLEL_HEARTS' && (
        <article className="w-full flex flex-col items-center animate-fadeIn select-text">
          {/* Header navigation bar */}
          <div className="w-full flex items-center justify-between mb-5 px-1 select-none">
            <button
              type="button"
              onClick={handlePrevPage}
              className="text-xs font-sans text-rose-300/70 hover:text-rose-200 flex items-center gap-1.5 py-1 px-2.5 rounded-lg bg-slate-900/50 border border-rose-500/20 active:scale-95 transition-all cursor-pointer"
            >
              <ArrowLeft className="w-3 h-3 text-rose-400" />
              <span>Her Eyes</span>
            </button>

            <span className="font-serif tracking-[0.2em] text-[11px] text-rose-300/50 uppercase">
              Page 2 · Parallel Hearts
            </span>
          </div>

          {/* 
            --------------------------------------------------------------------
            TRANSITION NOTE (Centered on page)
            --------------------------------------------------------------------
          */}
          <header className="w-full text-center mb-6 sm:mb-8 px-2">
            <h2 className="font-serif text-xl sm:text-2xl text-rose-50 font-normal tracking-wide leading-snug mb-2">
              {poem2Heading}
            </h2>
            <p className="font-serif italic text-sm sm:text-[15px] text-rose-200/75 leading-relaxed max-w-sm mx-auto">
              {poem2Note}
            </p>
          </header>

          {/* 
            --------------------------------------------------------------------
            CANONICAL PARALLEL_HEARTS ARTWORK
            --------------------------------------------------------------------
          */}
          <div className="w-full max-w-[480px] mx-auto my-2 px-1 flex flex-col items-center">
            <img
              src={parallelHeartsArtwork}
              alt={poem2ImageAlt}
              className="w-full h-auto max-w-full rounded-xl sm:rounded-2xl object-contain block mx-auto select-none shadow-[0_15px_35px_rgba(0,0,0,0.7)]"
              loading="eager"
            />
          </div>

          {/* 
            --------------------------------------------------------------------
            CONTINUATION CONTROLS (Next poem -> Chunk 3)
            --------------------------------------------------------------------
          */}
          <footer className="w-full mt-10 sm:mt-12 pt-6 border-t border-rose-500/15 flex flex-col sm:flex-row items-center justify-between gap-4 select-none px-2">
            <span className="text-xs font-serif italic text-rose-300/60">
              {poem2NextPrompt}
            </span>

            <button
              type="button"
              onClick={handleNextPage}
              className="w-full sm:w-auto min-h-[48px] px-6 py-3 rounded-xl
                bg-rose-950/50 hover:bg-rose-900/60 text-rose-100
                border border-rose-500/30 hover:border-rose-400/50
                shadow-[0_4px_20px_rgba(225,29,72,0.15)]
                active:scale-[0.98] transition-all duration-200
                text-sm font-medium tracking-wide cursor-pointer
                flex items-center justify-center gap-2 group"
            >
              <span>{poem2NextButton}</span>
              <ArrowRight className="w-4 h-4 text-rose-300 transition-transform group-hover:translate-x-0.5" />
            </button>
          </footer>
        </article>
      )}

      {/* 
        ========================================================================
        PAGE 3: TWO BIRDS ONE MOON POEM (Chunk 3)
        ========================================================================
      */}
      {currentPage === 'TWO_BIRDS_ONE_MOON' && (
        <article className="w-full flex flex-col items-center animate-fadeIn select-text">
          {/* Header navigation bar */}
          <div className="w-full flex items-center justify-between mb-5 px-1 select-none">
            <button
              type="button"
              onClick={handlePrevPage}
              className="text-xs font-sans text-rose-300/70 hover:text-rose-200 flex items-center gap-1.5 py-1 px-2.5 rounded-lg bg-slate-900/50 border border-rose-500/20 active:scale-95 transition-all cursor-pointer"
            >
              <ArrowLeft className="w-3 h-3 text-rose-400" />
              <span>Parallel Hearts</span>
            </button>

            <span className="font-serif tracking-[0.2em] text-[11px] text-rose-300/50 uppercase">
              Page 3 · Two Birds One Moon
            </span>
          </div>

          {/* 
            --------------------------------------------------------------------
            TRANSITION NOTE (Centered on page)
            --------------------------------------------------------------------
          */}
          <header className="w-full text-center mb-6 sm:mb-8 px-2">
            <h2 className="font-serif text-xl sm:text-2xl text-rose-50 font-normal tracking-wide leading-snug mb-2">
              {poem3Heading}
            </h2>
            <p className="font-serif italic text-sm sm:text-[15px] text-rose-200/75 leading-relaxed max-w-sm mx-auto">
              {poem3Note}
            </p>
          </header>

          {/* 
            --------------------------------------------------------------------
            CANONICAL TWO_BIRDS_ONE_MOON ARTWORK
            --------------------------------------------------------------------
          */}
          <div className="w-full max-w-[480px] mx-auto my-2 px-1 flex flex-col items-center">
            <img
              src={twoBirdsArtwork}
              alt={poem3ImageAlt}
              className="w-full h-auto max-w-full rounded-xl sm:rounded-2xl object-contain block mx-auto select-none shadow-[0_15px_35px_rgba(0,0,0,0.7)]"
              loading="eager"
            />
          </div>

          {/* 
            --------------------------------------------------------------------
            CONTINUATION CONTROLS (Next poem -> Chunk 4)
            --------------------------------------------------------------------
          */}
          <footer className="w-full mt-10 sm:mt-12 pt-6 border-t border-rose-500/15 flex flex-col sm:flex-row items-center justify-between gap-4 select-none px-2">
            <span className="text-xs font-serif italic text-rose-300/60">
              {poem3NextPrompt}
            </span>

            <button
              type="button"
              onClick={handleNextPage}
              className="w-full sm:w-auto min-h-[48px] px-6 py-3 rounded-xl
                bg-rose-950/50 hover:bg-rose-900/60 text-rose-100
                border border-rose-500/30 hover:border-rose-400/50
                shadow-[0_4px_20px_rgba(225,29,72,0.15)]
                active:scale-[0.98] transition-all duration-200
                text-sm font-medium tracking-wide cursor-pointer
                flex items-center justify-center gap-2 group"
            >
              <span>{poem3NextButton}</span>
              <ArrowRight className="w-4 h-4 text-rose-300 transition-transform group-hover:translate-x-0.5" />
            </button>
          </footer>
        </article>
      )}

      {/* 
        ========================================================================
        PAGE 4: WAQT KA PARDA POEM (Chunk 4)
        ========================================================================
      */}
      {currentPage === 'WAQT_KA_PARDA' && (
        <article className="w-full flex flex-col items-center animate-fadeIn select-text">
          {/* Header navigation bar */}
          <div className="w-full flex items-center justify-between mb-5 px-1 select-none">
            <button
              type="button"
              onClick={handlePrevPage}
              className="text-xs font-sans text-rose-300/70 hover:text-rose-200 flex items-center gap-1.5 py-1 px-2.5 rounded-lg bg-slate-900/50 border border-rose-500/20 active:scale-95 transition-all cursor-pointer"
            >
              <ArrowLeft className="w-3 h-3 text-rose-400" />
              <span>Two Birds One Moon</span>
            </button>

            <span className="font-serif tracking-[0.2em] text-[11px] text-rose-300/50 uppercase">
              Page 4 · Waqt Ka Parda
            </span>
          </div>

          {/* 
            --------------------------------------------------------------------
            PERSONAL MEMORY NOTE (Intimate, understated)
            --------------------------------------------------------------------
          */}
          <header className="w-full text-center mb-6 sm:mb-8 px-2">
            <p className="font-serif italic text-base sm:text-lg text-rose-100/90 leading-relaxed max-w-sm mx-auto">
              {poem4Note}
            </p>
          </header>

          {/* 
            --------------------------------------------------------------------
            CANONICAL WAQT_KA_PARDA ARTWORK
            --------------------------------------------------------------------
          */}
          <div className="w-full max-w-[480px] mx-auto my-2 px-1 flex flex-col items-center">
            <img
              src={waqtKaPardaArtwork}
              alt={poem4ImageAlt}
              className="w-full h-auto max-w-full rounded-xl sm:rounded-2xl object-contain block mx-auto select-none shadow-[0_15px_35px_rgba(0,0,0,0.7)]"
              loading="eager"
            />
          </div>

          {/* 
            --------------------------------------------------------------------
            CONTINUATION CONTROLS (Next poem -> Chunk 5 / Final Poem)
            --------------------------------------------------------------------
          */}
          <footer className="w-full mt-10 sm:mt-12 pt-6 border-t border-rose-500/15 flex flex-col sm:flex-row items-center justify-between gap-4 select-none px-2">
            <span className="text-xs font-serif italic text-rose-300/60">
              {poem4NextPrompt}
            </span>

            <button
              type="button"
              onClick={handleNextPage}
              className="w-full sm:w-auto min-h-[48px] px-6 py-3 rounded-xl
                bg-rose-950/50 hover:bg-rose-900/60 text-rose-100
                border border-rose-500/30 hover:border-rose-400/50
                shadow-[0_4px_20px_rgba(225,29,72,0.15)]
                active:scale-[0.98] transition-all duration-200
                text-sm font-medium tracking-wide cursor-pointer
                flex items-center justify-center gap-2 group"
            >
              <span>{poem4NextButton}</span>
              <ArrowRight className="w-4 h-4 text-rose-300 transition-transform group-hover:translate-x-0.5" />
            </button>
          </footer>
        </article>
      )}

      {/* 
        ========================================================================
        PAGE 5: YEARNING NIGHT (Final Poem)
        ========================================================================
      */}
      {currentPage === 'YEARNING_NIGHT' && (
        <article className="w-full flex flex-col items-center animate-fadeIn select-text">
          {/* Header navigation bar */}
          <div className="w-full flex items-center justify-between mb-5 px-1 select-none">
            <button
              type="button"
              onClick={handlePrevPage}
              className="text-xs font-sans text-rose-300/70 hover:text-rose-200 flex items-center gap-1.5 py-1 px-2.5 rounded-lg bg-slate-900/50 border border-rose-500/20 active:scale-95 transition-all cursor-pointer"
            >
              <ArrowLeft className="w-3 h-3 text-rose-400" />
              <span>Waqt Ka Parda</span>
            </button>

            <span className="font-serif tracking-[0.2em] text-[11px] text-rose-300/50 uppercase">
              Page 5 · Yearning Night
            </span>
          </div>

          {/* 
            --------------------------------------------------------------------
            CULMINATION NOTE (Simple, intimate, emotionally restrained)
            --------------------------------------------------------------------
          */}
          <header className="w-full text-center mb-6 sm:mb-8 px-2">
            <p className="font-serif italic text-base sm:text-lg text-rose-100/90 leading-relaxed max-w-sm mx-auto">
              {poem5Note}
            </p>
          </header>

          {/* 
            --------------------------------------------------------------------
            CANONICAL YEARNING_NIGHT ARTWORK (Final Poem)
            --------------------------------------------------------------------
          */}
          <div className="w-full max-w-[480px] mx-auto my-2 px-1 flex flex-col items-center">
            <img
              src={yearningNightArtwork}
              alt={poem5ImageAlt}
              className="w-full h-auto max-w-full rounded-xl sm:rounded-2xl object-contain block mx-auto select-none shadow-[0_15px_35px_rgba(0,0,0,0.7)]"
              loading="eager"
            />
          </div>

          {/* 
            --------------------------------------------------------------------
            QUIET ENDING STATE (Collection End - Calm, No next button, No carousel)
            --------------------------------------------------------------------
          */}
          <footer className="w-full mt-12 sm:mt-14 pt-8 border-t border-rose-500/15 flex flex-col items-center justify-center text-center select-none px-4">
            <span className="font-serif tracking-[0.25em] text-[11px] text-rose-300/50 uppercase block mb-2">
              {closingLabel}
            </span>
            <p className="font-serif italic text-xs sm:text-sm text-rose-200/60 max-w-xs mx-auto mb-6 leading-relaxed">
              {closingSubtitle}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={handlePrevPage}
                className="w-full sm:w-auto min-h-[44px] px-5 py-2.5 rounded-xl
                  bg-rose-950/40 hover:bg-rose-900/50 text-rose-200 border border-rose-500/30
                  active:scale-[0.98] transition-all text-sm cursor-pointer
                  flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4 text-rose-400" />
                <span>Waqt Ka Parda</span>
              </button>

              <button
                type="button"
                onClick={handleNextPage}
                className="w-full sm:w-auto min-h-[48px] px-6 py-3 rounded-xl
                  bg-rose-950/60 hover:bg-rose-900/70 text-rose-100
                  border border-rose-500/40 hover:border-rose-400/60
                  shadow-[0_4px_25px_rgba(225,29,72,0.2)]
                  active:scale-[0.98] transition-all duration-200
                  text-sm font-medium tracking-wide cursor-pointer
                  flex items-center justify-center gap-2 group"
              >
                <span>{goToDiaryButton}</span>
                <ArrowRight className="w-4 h-4 text-rose-300 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          </footer>
        </article>
      )}

      {/* 
        ========================================================================
        PAGE 6: SMALL DIARY — INTRODUCTION
        ========================================================================
      */}
      {currentPage === 'DIARY_INTRO' && (
        <article className="w-full flex flex-col items-center animate-fadeIn select-text">
          {/* Header navigation bar */}
          <div className="w-full flex items-center justify-between mb-6 px-1 select-none">
            <button
              type="button"
              onClick={handlePrevPage}
              className="text-xs font-sans text-rose-300/70 hover:text-rose-200 flex items-center gap-1.5 py-1 px-2.5 rounded-lg bg-slate-900/50 border border-rose-500/20 active:scale-95 transition-all cursor-pointer"
            >
              <ArrowLeft className="w-3 h-3 text-rose-400" />
              <span>Yearning Night</span>
            </button>

            <span className="font-serif tracking-[0.2em] text-[11px] text-rose-300/50 uppercase">
              Notebook
            </span>
          </div>

          {/* Diary section heading */}
          <header className="w-full text-center mb-6 sm:mb-8 px-2">
            <div className="w-10 h-10 rounded-2xl bg-rose-950/50 border border-rose-500/20 flex items-center justify-center mx-auto mb-4 text-rose-300 shadow-[0_0_15px_rgba(244,63,94,0.1)]">
              <BookOpen className="w-5 h-5 stroke-[1.5]" />
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl text-rose-50 font-normal tracking-wide mb-1">
              {diarySectionTitle}
            </h2>
            <div className="w-12 h-px bg-rose-400/30 mx-auto my-3" />
          </header>

          {/* Intro text */}
          <div className="w-full max-w-[520px] mx-auto px-2 space-y-4 text-left">
            {diaryIntroParagraphs.map((para, i) => (
              <p
                key={i}
                className="font-serif text-base sm:text-[17px] text-rose-100/90 leading-relaxed indent-4"
              >
                {para}
              </p>
            ))}
          </div>

          {/* Action button */}
          <footer className="w-full mt-10 pt-6 border-t border-rose-500/15 flex justify-center select-none px-2">
            <button
              type="button"
              onClick={handleNextPage}
              className="w-full sm:w-auto min-h-[48px] px-8 py-3 rounded-xl
                bg-rose-950/60 hover:bg-rose-900/70 text-rose-100
                border border-rose-500/40 hover:border-rose-400/60
                shadow-[0_4px_25px_rgba(225,29,72,0.2)]
                active:scale-[0.98] transition-all duration-200
                text-sm font-medium tracking-wide cursor-pointer
                flex items-center justify-center gap-2 group"
            >
              <span>{diaryIntroButton}</span>
              <ArrowRight className="w-4 h-4 text-rose-300 transition-transform group-hover:translate-x-0.5" />
            </button>
          </footer>
        </article>
      )}

      {/* 
        ========================================================================
        PAGE 7: SMALL DIARY — HANDWRITTEN PAGE 1 (03 April 2025)
        ========================================================================
      */}
      {currentPage === 'DIARY_PAGE_1' && (
        <article className="w-full flex flex-col items-center animate-fadeIn select-text">
          {/* Header navigation bar */}
          <div className="w-full flex items-center justify-between mb-5 px-1 select-none">
            <button
              type="button"
              onClick={handlePrevPage}
              className="text-xs font-sans text-rose-300/70 hover:text-rose-200 flex items-center gap-1.5 py-1 px-2.5 rounded-lg bg-slate-900/50 border border-rose-500/20 active:scale-95 transition-all cursor-pointer"
            >
              <ArrowLeft className="w-3 h-3 text-rose-400" />
              <span>Small Diary</span>
            </button>

            <span className="font-serif tracking-[0.2em] text-[11px] text-rose-300/50 uppercase">
              {diaryPage1Label}
            </span>
          </div>

          {/* Handwritten Page 1 image */}
          <div className="w-full max-w-[480px] mx-auto my-2 px-1 flex flex-col items-center">
            <img
              src={diaryPage1}
              alt={diaryPage1Alt}
              className="w-full h-auto max-w-full rounded-xl sm:rounded-2xl object-contain block mx-auto select-none shadow-[0_15px_35px_rgba(0,0,0,0.7)]"
              loading="eager"
            />
          </div>

          {/* Navigation to Page 2 */}
          <footer className="w-full mt-10 sm:mt-12 pt-6 border-t border-rose-500/15 flex flex-col sm:flex-row items-center justify-between gap-4 select-none px-2">
            <span className="text-xs font-serif italic text-rose-300/60">
              Page 1 of 2
            </span>

            <button
              type="button"
              onClick={handleNextPage}
              className="w-full sm:w-auto min-h-[48px] px-6 py-3 rounded-xl
                bg-rose-950/50 hover:bg-rose-900/60 text-rose-100
                border border-rose-500/30 hover:border-rose-400/50
                shadow-[0_4px_20px_rgba(225,29,72,0.15)]
                active:scale-[0.98] transition-all duration-200
                text-sm font-medium tracking-wide cursor-pointer
                flex items-center justify-center gap-2 group"
            >
              <span>{diaryPage1NextBtn}</span>
              <ArrowRight className="w-4 h-4 text-rose-300 transition-transform group-hover:translate-x-0.5" />
            </button>
          </footer>
        </article>
      )}

      {/* 
        ========================================================================
        PAGE 8: SMALL DIARY — HANDWRITTEN PAGE 2 (July 2025 continuation)
        ========================================================================
      */}
      {currentPage === 'DIARY_PAGE_2' && (
        <article className="w-full flex flex-col items-center animate-fadeIn select-text">
          {/* Header navigation bar */}
          <div className="w-full flex items-center justify-between mb-5 px-1 select-none">
            <button
              type="button"
              onClick={handlePrevPage}
              className="text-xs font-sans text-rose-300/70 hover:text-rose-200 flex items-center gap-1.5 py-1 px-2.5 rounded-lg bg-slate-900/50 border border-rose-500/20 active:scale-95 transition-all cursor-pointer"
            >
              <ArrowLeft className="w-3 h-3 text-rose-400" />
              <span>Page 1</span>
            </button>

            <span className="font-serif tracking-[0.2em] text-[11px] text-rose-300/50 uppercase">
              {diaryPage2Label}
            </span>
          </div>

          {/* Handwritten Page 2 image */}
          <div className="w-full max-w-[480px] mx-auto my-2 px-1 flex flex-col items-center">
            <img
              src={diaryPage2}
              alt={diaryPage2Alt}
              className="w-full h-auto max-w-full rounded-xl sm:rounded-2xl object-contain block mx-auto select-none shadow-[0_15px_35px_rgba(0,0,0,0.7)]"
              loading="eager"
            />
          </div>

          {/* Closing note & Navigation to Final Birthday Message */}
          <footer className="w-full mt-10 sm:mt-12 pt-6 border-t border-rose-500/15 flex flex-col items-center justify-center text-center select-none px-3">
            <p className="font-serif italic text-sm sm:text-base text-rose-200/85 max-w-md mx-auto mb-6 leading-relaxed">
              {diaryClosingNote}
            </p>

            <button
              type="button"
              onClick={handleNextPage}
              className="w-full sm:w-auto min-h-[48px] px-8 py-3 rounded-xl
                bg-rose-950/60 hover:bg-rose-900/70 text-rose-100
                border border-rose-500/40 hover:border-rose-400/60
                shadow-[0_4px_25px_rgba(225,29,72,0.2)]
                active:scale-[0.98] transition-all duration-200
                text-sm font-medium tracking-wide cursor-pointer
                flex items-center justify-center gap-2 group"
            >
              <span>{diaryFinalMsgBtn}</span>
              <ArrowRight className="w-4 h-4 text-rose-300 transition-transform group-hover:translate-x-0.5" />
            </button>
          </footer>
        </article>
      )}

      {/* 
        ========================================================================
        PAGE 9: FINAL BIRTHDAY MESSAGE (Emotional Culmination)
        ========================================================================
      */}
      {currentPage === 'FINAL_MESSAGE' && (
        <article className="w-full max-w-[560px] mx-auto px-3 sm:px-6 my-4 sm:my-8 animate-fadeIn select-text">
          {/* Header navigation bar (discrete back button only) */}
          <div className="w-full flex items-center justify-between mb-6 sm:mb-8 px-1 select-none">
            <button
              type="button"
              onClick={handlePrevPage}
              className="text-xs font-sans text-rose-300/70 hover:text-rose-200 flex items-center gap-1.5 py-1 px-2.5 rounded-lg bg-slate-900/50 border border-rose-500/20 active:scale-95 transition-all cursor-pointer"
            >
              <ArrowLeft className="w-3 h-3 text-rose-400" />
              <span>Small Diary</span>
            </button>

            <span className="font-serif tracking-[0.25em] text-[11px] text-rose-300/40 uppercase">
              Final Note
            </span>
          </div>

          {/* Intimate ambient night-sky card */}
          <div className="relative w-full rounded-2xl sm:rounded-3xl
            bg-gradient-to-b from-[#13061d]/85 via-[#0b0312]/92 to-[#06010a]/98
            backdrop-blur-md
            border border-rose-500/15
            shadow-[0_25px_60px_rgba(0,0,0,0.85),0_0_50px_rgba(244,63,94,0.04)]
            p-6 sm:p-10 md:p-12 text-center overflow-hidden"
          >
            {/* Subtle floating particles / starlight drift */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl sm:rounded-3xl">
              <div className="absolute top-1/4 left-1/4 w-1 h-1 rounded-full bg-rose-300/30 animate-pulse" />
              <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 rounded-full bg-amber-200/25 animate-pulse" style={{ animationDelay: '1.2s' }} />
              <div className="absolute bottom-1/3 left-1/3 w-1 h-1 rounded-full bg-rose-400/25 animate-pulse" style={{ animationDelay: '2.4s' }} />
              <div className="absolute bottom-1/4 right-1/3 w-1 h-1 rounded-full bg-pink-200/20 animate-pulse" style={{ animationDelay: '3.6s' }} />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-rose-500/[0.03] rounded-full blur-3xl" />
            </div>

            {/* 1. Subtle Transition Line */}
            <div className="relative z-10 mb-8 sm:mb-10 transition-opacity duration-1000 ease-out">
              <p className="font-serif italic text-xs sm:text-sm text-rose-300/60 tracking-wider">
                {finalTransitionIntro}
              </p>
              <div className="w-8 h-px bg-rose-400/25 mx-auto mt-3" />
            </div>

            {/* 2. Emotional Heading */}
            <h2
              className={`relative z-10 font-serif text-2xl sm:text-3xl md:text-4xl text-rose-50 font-normal tracking-wide leading-snug mb-8 drop-shadow-[0_2px_14px_rgba(244,63,94,0.25)] transition-all duration-1000 ease-out ${
                revealStep >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
              }`}
            >
              {finalHeading}
            </h2>

            {/* 3. Message Body (revealed with pacing) */}
            <div className="relative z-10 space-y-6 text-left sm:text-center max-w-[500px] mx-auto">
              <p
                className={`font-serif text-[16px] sm:text-[18px] text-rose-100/90 leading-[1.8] sm:leading-[1.9] transition-all duration-1000 ease-out ${
                  revealStep >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
                }`}
              >
                {finalParagraphs[0]}
              </p>

              <p
                className={`font-serif text-[16px] sm:text-[18px] text-rose-100/90 leading-[1.8] sm:leading-[1.9] transition-all duration-1000 ease-out ${
                  revealStep >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
                }`}
              >
                {finalParagraphs[1]}
              </p>

              <p
                className={`font-serif text-[16px] sm:text-[18px] text-rose-100/90 leading-[1.8] sm:leading-[1.9] transition-all duration-1000 ease-out ${
                  revealStep >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
                }`}
              >
                {finalParagraphs[2]}
              </p>

              <p
                className={`font-serif text-[16px] sm:text-[18px] text-rose-100/90 leading-[1.8] sm:leading-[1.9] transition-all duration-1000 ease-out ${
                  revealStep >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
                }`}
              >
                {finalParagraphs[3]}
              </p>
            </div>

            {/* 4. Final Sentence: Emotional Culmination */}
            <div
              className={`relative z-10 mt-12 mb-8 text-center transition-all duration-1200 ease-out ${
                revealStep >= 6
                  ? 'opacity-100 scale-100 translate-y-0'
                  : 'opacity-0 scale-95 translate-y-4'
              }`}
            >
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-rose-400/40 to-transparent mx-auto mb-6" />
              <h3 className="font-serif italic text-2xl sm:text-3xl md:text-[32px] text-rose-100 font-normal tracking-wide drop-shadow-[0_0_22px_rgba(251,113,133,0.4)]">
                {finalBirthdayWish}
              </h3>
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-rose-400/40 to-transparent mx-auto mt-6" />
            </div>

            {/* 5. Very Final Signoff */}
            <div
              className={`relative z-10 mt-12 pt-6 border-t border-rose-500/15 text-center transition-all duration-1000 ease-out ${
                revealStep >= 7 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
              }`}
            >
              <p className="font-serif italic text-xs sm:text-[13px] text-rose-300/50 tracking-wider mb-2 select-none">
                {finalSignoff}
              </p>
              <span className="text-base sm:text-lg inline-block animate-pulse text-rose-400 select-none">
                {finalHeart}
              </span>
            </div>
          </div>
        </article>
      )}
    </div>
  );
};
