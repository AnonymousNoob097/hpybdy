import React from 'react';
import { ModalCard } from './ModalCard.tsx';
import { CONFIG } from '../config.ts';
import { Sparkles, RefreshCw, Code, ArrowLeft } from 'lucide-react';

interface NextPagePlaceholderProps {
  onBackToLetter?: () => void;
  onReplay: () => void;
}

/**
 * Stage 7: Placeholder for the upcoming poetry-book section
 * 
 * ============================================================================
 * DEVELOPER NOTICE:
 * When you are ready to build the poetry section:
 * 1. Replace this component in `src/App.tsx` where `stage === 'POETRY_PAGE'` is handled.
 * 2. You can mount your multi-page poem reader, verses, or photo memories here!
 * ============================================================================
 */
export const NextPagePlaceholder: React.FC<NextPagePlaceholderProps> = ({
  onBackToLetter,
  onReplay,
}) => {
  return (
    <ModalCard>
      <div className="flex flex-col items-center text-center">
        {/* Poetry Icon */}
        <div className="w-12 h-12 rounded-2xl bg-rose-950/60 border border-rose-500/20 flex items-center justify-center mb-5 text-rose-300 shadow-[0_0_15px_rgba(244,63,94,0.15)]">
          <Sparkles className="w-5 h-5 stroke-[1.8] text-amber-300" />
        </div>

        {/* Title */}
        <h2 className="font-serif text-2xl sm:text-3xl font-semibold tracking-wide text-rose-50 mb-3">
          {CONFIG.STAGE_7_POETRY.placeholderTitle}
        </h2>

        {/* Informational prose */}
        <p className="font-sans text-xs sm:text-sm text-rose-200/70 mb-5 leading-relaxed">
          {CONFIG.STAGE_7_POETRY.placeholderMessage}
        </p>

        {/* Code connection guide hint */}
        <div className="w-full p-3.5 mb-6 rounded-2xl bg-slate-900/80 border border-rose-500/20 text-left">
          <div className="flex items-center gap-1.5 text-xs text-rose-300 font-medium mb-1.5">
            <Code className="w-3.5 h-3.5" />
            <span>Developer Hook Ready:</span>
          </div>
          <code className="block text-[11px] font-mono text-rose-200/60 leading-normal">
            goToPoetryPage() → App.tsx<br />
            Connect your poetry book component here!
          </code>
        </div>

        <div className="w-full space-y-2.5">
          {onBackToLetter && (
            <button
              type="button"
              onClick={onBackToLetter}
              className="w-full h-12 rounded-2xl font-medium text-sm tracking-wide
                bg-rose-950/40 hover:bg-rose-900/50 text-rose-200 border border-rose-500/30
                active:scale-[0.97] transition-all duration-200
                cursor-pointer flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4 text-rose-400" />
              <span>Back to Letter</span>
            </button>
          )}

          <button
            type="button"
            onClick={onReplay}
            className="w-full h-12 rounded-2xl font-medium text-sm tracking-wide
              bg-slate-900 hover:bg-slate-800 text-rose-300/80 border border-rose-500/20
              active:scale-[0.97] transition-all duration-200
              cursor-pointer flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4 text-rose-400" />
            <span>{CONFIG.STAGE_7_POETRY.replayButton}</span>
          </button>
        </div>
      </div>
    </ModalCard>
  );
};
