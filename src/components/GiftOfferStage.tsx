import React from 'react';
import { ModalCard } from './ModalCard.tsx';
import { CONFIG } from '../config.ts';
import { Gift, Smile } from 'lucide-react';

interface GiftOfferStageProps {
  showRejectResponse: boolean;
  onAccept: () => void;
  onReject: () => void;
  isTransitioning: boolean;
}

/**
 * Stage 3: The Little Gift
 * 
 * Flow:
 * - "Here is a little gift 🎁" with buttons: "Accept" and "Reject"
 * - If "Accept": proceeds directly to Stage 4 (Gift Box Reveal).
 * - If "Reject": playful popup: "You have to accept. You do not have any choice. 😌"
 *   with one button: "Accept".
 * - Tapping "Accept" continues to Stage 4.
 */
export const GiftOfferStage: React.FC<GiftOfferStageProps> = ({
  showRejectResponse,
  onAccept,
  onReject,
  isTransitioning,
}) => {
  return (
    <ModalCard>
      <div className="flex flex-col items-center text-center">
        {/* Playful icon */}
        <div className="w-12 h-12 rounded-2xl bg-rose-950/60 border border-rose-500/20 flex items-center justify-center mb-5 text-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.15)]">
          {showRejectResponse ? (
            <Smile className="w-5 h-5 stroke-[1.8] text-amber-300" />
          ) : (
            <Gift className="w-5 h-5 stroke-[1.8] text-rose-400" />
          )}
        </div>

        {!showRejectResponse ? (
          <>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold tracking-wide text-rose-50 mb-3">
              {CONFIG.STAGE_3_GIFT.question}
            </h2>

            <p className="font-sans text-xs sm:text-sm text-rose-200/60 mb-7 max-w-xs leading-relaxed">
              Made specially with love, just for today.
            </p>

            {/* Accept & Reject buttons */}
            <div className="w-full grid grid-cols-2 gap-3.5">
              {/* ACCEPT button */}
              <button
                type="button"
                onClick={onAccept}
                disabled={isTransitioning}
                className="w-full h-13 rounded-2xl font-medium text-base tracking-wide
                  bg-gradient-to-r from-rose-600 to-pink-600 text-white
                  shadow-[0_8px_25px_rgba(225,29,72,0.35)]
                  active:scale-[0.96] transition-all duration-200
                  disabled:opacity-50 cursor-pointer flex items-center justify-center"
              >
                {CONFIG.STAGE_3_GIFT.buttonAccept}
              </button>

              {/* REJECT button */}
              <button
                type="button"
                onClick={onReject}
                disabled={isTransitioning}
                className="w-full h-13 rounded-2xl font-medium text-base tracking-wide
                  bg-slate-900/80 hover:bg-slate-800 text-rose-200/80 border border-rose-500/20
                  active:scale-[0.96] transition-all duration-200
                  disabled:opacity-50 cursor-pointer flex items-center justify-center"
              >
                {CONFIG.STAGE_3_GIFT.buttonReject}
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Playful reject fallback popup */}
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold tracking-wide text-rose-50 mb-3 whitespace-pre-line leading-snug">
              {CONFIG.STAGE_3_GIFT.rejectResponseText}
            </h2>

            <p className="font-sans text-xs sm:text-sm text-rose-200/60 mb-7 max-w-xs leading-relaxed">
              Rejection is simply not an option today!
            </p>

            <button
              type="button"
              onClick={onAccept}
              disabled={isTransitioning}
              className="w-full h-13 rounded-2xl font-medium text-base tracking-wide
                bg-gradient-to-r from-rose-600 via-rose-500 to-pink-600 text-white
                shadow-[0_8px_25px_rgba(225,29,72,0.4)]
                active:scale-[0.96] transition-all duration-200
                disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>{CONFIG.STAGE_3_GIFT.rejectResponseButton}</span>
            </button>
          </>
        )}
      </div>
    </ModalCard>
  );
};
