/**
 * ============================================================================
 * ROMANTIC BIRTHDAY GIFT EXPERIENCE — MAIN APPLICATION
 * ============================================================================
 * 
 * Entrance Flow:
 * STAGE 1: Password / Birthday Screen
 * STAGE 2: "Do you love me?" (with playful "Please say yes" fallback)
 * STAGE 3: "Here is a little gift" (with playful "You have to accept" fallback)
 * STAGE 4: Animated Gift Box Reveal (Background unblurs, scene comes into focus)
 * STAGE 5: Gift Box Opening (Lid lifts, light radiance, balloons & confetti burst, "HAPPY BIRTHDAY ❤️")
 * STAGE 6: Personal Digital Letter (Intimate, quiet romantic reading surface)
 * STAGE 7: Future Poetry-Book Section (Triggered via `goToPoetryPage()`)
 * 
 * Configuration is located in: `src/config.ts`
 */

import React, { useState, useEffect, useCallback } from 'react';
import { FlowStage } from './types.ts';
import { BackgroundMode, RomanticBackground } from './components/RomanticBackground.tsx';
import { CelebrationCanvas } from './components/CelebrationCanvas.tsx';
import { PasswordStage } from './components/PasswordStage.tsx';
import { QuestionLoveStage } from './components/QuestionLoveStage.tsx';
import { GiftOfferStage } from './components/GiftOfferStage.tsx';
import { GiftBoxStage } from './components/GiftBoxStage.tsx';
import { LetterPage } from './components/LetterPage.tsx';
import { PoetrySection } from './components/PoetrySection.tsx';
import { NextPagePlaceholder } from './components/NextPagePlaceholder.tsx';

export default function App() {
  // --------------------------------------------------------------------------
  // STATE MANAGEMENT
  // --------------------------------------------------------------------------
  const [currentStage, setCurrentStage] = useState<FlowStage>('PASSWORD');
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  // Background atmosphere mode calculation
  const getBackgroundMode = (): BackgroundMode => {
    if (
      currentStage === 'PASSWORD' ||
      currentStage === 'QUESTION_LOVE' ||
      currentStage === 'LOVE_NO_RESPONSE' ||
      currentStage === 'GIFT_OFFER' ||
      currentStage === 'GIFT_REJECT_RESPONSE'
    ) {
      return 'dimmed';
    }
    if (currentStage === 'GIFT_BOX' || currentStage === 'BIRTHDAY_REVEAL') {
      return 'clear';
    }
    // Quiet, darker, tranquil atmosphere for the intimate letter & future poetry reading
    return 'quiet';
  };

  // Double-tap debounced transition helper
  const transitionTo = useCallback((nextStage: FlowStage) => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    // Settle transition
    setTimeout(() => {
      setCurrentStage(nextStage);
      setIsTransitioning(false);
      // Ensure page scrolls to top on stage change
      window.scrollTo({ top: 0, behavior: 'instant' });
    }, 150);
  }, [isTransitioning]);

  // Keep browser history consistent so back button doesn't crash the experience
  useEffect(() => {
    const handlePopState = () => {
      window.history.pushState(null, '', window.location.href);
    };

    window.history.pushState(null, '', window.location.href);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // --------------------------------------------------------------------------
  // NAVIGATION HANDLERS
  // --------------------------------------------------------------------------
  /**
   * Transition from Birthday Celebration to the Personal Letter (Stage 6)
   */
  const goToNextPage = useCallback(() => {
    console.log('[Birthday Experience] Transitioning from Celebration to Letter Page...');
    transitionTo('LETTER');
  }, [transitionTo]);

  /**
   * Transition from the Letter Page to the future Poetry Section (Stage 7)
   */
  const goToPoetryPage = useCallback(() => {
    console.log('[Birthday Experience] Transitioning from Letter Page to Poetry Section...');
    transitionTo('POETRY_PAGE');
  }, [transitionTo]);

  // Replay helper for testing the flow from the beginning
  const handleReplay = useCallback(() => {
    transitionTo('PASSWORD');
  }, [transitionTo]);

  const isLetterStage = currentStage === 'LETTER' || currentStage === 'NEXT_PAGE';
  const isScrollableStage = isLetterStage || currentStage === 'POETRY_PAGE';

  return (
    <main
      className={`relative min-h-[100dvh] w-full flex flex-col items-center overflow-x-hidden pt-safe pb-safe px-3 sm:px-4 ${
        isScrollableStage ? 'justify-start' : 'justify-center select-none'
      }`}
    >
      {/* 
        ------------------------------------------------------------------------
        1. ROMANTIC ATMOSPHERIC BACKGROUND
        - 'dimmed' for opening modals
        - 'clear' for gift box reveal and celebration
        - 'quiet' for personal letter reading
        ------------------------------------------------------------------------
      */}
      <RomanticBackground mode={getBackgroundMode()} />

      {/* 
        ------------------------------------------------------------------------
        2. CELEBRATION CANVAS
        Floating balloons, 3D tumbling confetti, and firework sparks
        Active ONLY during the gift box celebration (Stage 5)
        ------------------------------------------------------------------------
      */}
      <CelebrationCanvas active={currentStage === 'BIRTHDAY_REVEAL'} />

      {/* 
        ------------------------------------------------------------------------
        3. MAIN INTERACTIVE CARD & STAGES (FOREGROUND FOCUS)
        ------------------------------------------------------------------------
      */}
      <div className="relative z-10 w-full flex items-center justify-center">
        {/* STAGE 1: Password / Birthday Input */}
        {currentStage === 'PASSWORD' && (
          <div className="w-full flex justify-center animate-fadeIn">
            <PasswordStage
              onSuccess={() => transitionTo('QUESTION_LOVE')}
              isTransitioning={isTransitioning}
            />
          </div>
        )}

        {/* STAGE 2: "Do you love me?" & Playful Fallback */}
        {(currentStage === 'QUESTION_LOVE' || currentStage === 'LOVE_NO_RESPONSE') && (
          <div className="w-full flex justify-center animate-fadeIn">
            <QuestionLoveStage
              showNoResponse={currentStage === 'LOVE_NO_RESPONSE'}
              onAnswerYes={() => transitionTo('GIFT_OFFER')}
              onAnswerNo={() => transitionTo('LOVE_NO_RESPONSE')}
              isTransitioning={isTransitioning}
            />
          </div>
        )}

        {/* STAGE 3: "Here is a little gift 🎁" & Playful Fallback */}
        {(currentStage === 'GIFT_OFFER' || currentStage === 'GIFT_REJECT_RESPONSE') && (
          <div className="w-full flex justify-center animate-fadeIn">
            <GiftOfferStage
              showRejectResponse={currentStage === 'GIFT_REJECT_RESPONSE'}
              onAccept={() => transitionTo('GIFT_BOX')}
              onReject={() => transitionTo('GIFT_REJECT_RESPONSE')}
              isTransitioning={isTransitioning}
            />
          </div>
        )}

        {/* STAGES 4 & 5: Animated Gift Box Reveal & Birthday Celebration */}
        {(currentStage === 'GIFT_BOX' || currentStage === 'BIRTHDAY_REVEAL') && (
          <div className="w-full flex justify-center animate-fadeIn">
            <GiftBoxStage
              isOpened={currentStage === 'BIRTHDAY_REVEAL'}
              onOpened={() => transitionTo('BIRTHDAY_REVEAL')}
              onGoToNextPage={goToNextPage}
              isTransitioning={isTransitioning}
            />
          </div>
        )}

        {/* STAGE 6: Intimate Personal Birthday Letter */}
        {isLetterStage && (
          <LetterPage
            onGoToPoetryPage={goToPoetryPage}
            onReplay={handleReplay}
          />
        )}

        {/* STAGE 7: Digital Poetry Book — Chunk 1 */}
        {currentStage === 'POETRY_PAGE' && (
          <PoetrySection
            onBackToLetter={() => transitionTo('LETTER')}
          />
        )}
      </div>
    </main>
  );
}
