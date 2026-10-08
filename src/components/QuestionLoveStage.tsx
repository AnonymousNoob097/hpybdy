import React from 'react';
import { ModalCard } from './ModalCard.tsx';
import { CONFIG } from '../config.ts';
import { Heart, Sparkles } from 'lucide-react';

interface QuestionLoveStageProps {
  showNoResponse: boolean;
  onAnswerYes: () => void;
  onAnswerNo: () => void;
  isTransitioning: boolean;
}

/**
 * Stage 2: Question 1 ("Do you love me?")
 * 
 * Flow:
 * - "Do you love me?" with options: "Yes ❤️" and "No"
 * - If "Yes": proceeds directly to Stage 3.
 * - If "No": transitions to playful modal: "Please say yes 🥺" with only "Yes ❤️" button.
 * - Tapping "Yes ❤️" from either path proceeds to Stage 3.
 */
export const QuestionLoveStage: React.FC<QuestionLoveStageProps> = ({
  showNoResponse,
  onAnswerYes,
  onAnswerNo,
  isTransitioning,
}) => {
  return (
    <ModalCard>
      <div className="flex flex-col items-center text-center">
        {/* Playful romantic icon */}
        <div className="w-12 h-12 rounded-2xl bg-rose-950/60 border border-rose-500/20 flex items-center justify-center mb-5 text-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.15)]">
          {showNoResponse ? (
            <Sparkles className="w-5 h-5 stroke-[1.8] text-amber-300" />
          ) : (
            <Heart className="w-5 h-5 fill-rose-500/30 stroke-rose-400 stroke-[1.8]" />
          )}
        </div>

        {/* Content based on state */}
        {!showNoResponse ? (
          <>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold tracking-wide text-rose-50 mb-3">
              {CONFIG.STAGE_2_LOVE.question}
            </h2>

            <p className="font-sans text-xs sm:text-sm text-rose-200/60 mb-7 max-w-xs leading-relaxed">
              Answer honestly...
            </p>

            {/* Two buttons */}
            <div className="w-full grid grid-cols-2 gap-3.5">
              {/* YES button */}
              <button
                type="button"
                onClick={onAnswerYes}
                disabled={isTransitioning}
                className="w-full h-13 rounded-2xl font-medium text-base tracking-wide
                  bg-gradient-to-r from-rose-600 to-pink-600 text-white
                  shadow-[0_8px_25px_rgba(225,29,72,0.35)]
                  active:scale-[0.96] transition-all duration-200
                  disabled:opacity-50 cursor-pointer flex items-center justify-center"
              >
                {CONFIG.STAGE_2_LOVE.buttonYes}
              </button>

              {/* NO button */}
              <button
                type="button"
                onClick={onAnswerNo}
                disabled={isTransitioning}
                className="w-full h-13 rounded-2xl font-medium text-base tracking-wide
                  bg-slate-900/80 hover:bg-slate-800 text-rose-200/80 border border-rose-500/20
                  active:scale-[0.96] transition-all duration-200
                  disabled:opacity-50 cursor-pointer flex items-center justify-center"
              >
                {CONFIG.STAGE_2_LOVE.buttonNo}
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Playful "Please say yes" modal */}
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold tracking-wide text-rose-50 mb-3 animate-fadeIn">
              {CONFIG.STAGE_2_LOVE.noResponseText}
            </h2>

            <p className="font-sans text-xs sm:text-sm text-rose-200/60 mb-7 max-w-xs leading-relaxed">
              There is only one true answer here!
            </p>

            <button
              type="button"
              onClick={onAnswerYes}
              disabled={isTransitioning}
              className="w-full h-13 rounded-2xl font-medium text-base tracking-wide
                bg-gradient-to-r from-rose-600 via-rose-500 to-pink-600 text-white
                shadow-[0_8px_25px_rgba(225,29,72,0.4)]
                active:scale-[0.96] transition-all duration-200
                disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>{CONFIG.STAGE_2_LOVE.noResponseButton}</span>
            </button>
          </>
        )}
      </div>
    </ModalCard>
  );
};
