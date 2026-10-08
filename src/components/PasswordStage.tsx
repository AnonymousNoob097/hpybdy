import React, { useState, useRef, useEffect } from 'react';
import { ModalCard } from './ModalCard.tsx';
import { CONFIG } from '../config.ts';
import { Lock, Heart, ArrowRight } from 'lucide-react';

interface PasswordStageProps {
  onSuccess: () => void;
  isTransitioning: boolean;
}

/**
 * Stage 1: Password / Birthday Screen
 * 
 * - Prompts for the recipient's birthday date.
 * - Mobile-friendly numeric/date input with automatic DD / MM / YYYY formatting.
 * - Compares securely against CONFIG.EXPECTED_BIRTHDAY.
 * - Subtle shake + gentle error message if incorrect.
 * - Smooth transition when validated.
 */
export const PasswordStage: React.FC<PasswordStageProps> = ({
  onSuccess,
  isTransitioning,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [hasError, setHasError] = useState(false);
  const [shake, setShake] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Auto-focus input on mount for convenience
  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 250);
    return () => clearTimeout(timer);
  }, []);

  // Format raw digits into DD / MM / YYYY representation
  const formatAsDate = (raw: string) => {
    const digits = raw.replace(/\D/g, '').slice(0, 8);
    if (digits.length <= 2) return digits;
    if (digits.length <= 4) return `${digits.slice(0, 2)} / ${digits.slice(2)}`;
    return `${digits.slice(0, 2)} / ${digits.slice(2, 4)} / ${digits.slice(4)}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (hasError) setHasError(false);
    const raw = e.target.value;
    const formatted = formatAsDate(raw);
    setInputValue(formatted);
  };

  const handleValidate = () => {
    if (isTransitioning) return;

    // Clean digits from input and config
    const cleanEntered = inputValue.replace(/\D/g, '');
    const cleanExpected = CONFIG.EXPECTED_BIRTHDAY.replace(/\D/g, '');

    if (cleanEntered === cleanExpected && cleanExpected.length > 0) {
      setHasError(false);
      onSuccess();
    } else {
      setHasError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
      // Give haptic feedback if supported on mobile
      if (typeof window !== 'undefined' && 'vibrate' in navigator) {
        try {
          navigator.vibrate([40, 60, 40]);
        } catch {
          // ignore
        }
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleValidate();
    }
  };

  return (
    <ModalCard shake={shake}>
      <div className="flex flex-col items-center text-center">
        {/* Soft lock icon with rose glow */}
        <div className="w-12 h-12 rounded-2xl bg-rose-950/60 border border-rose-500/20 flex items-center justify-center mb-5 text-rose-300 shadow-[0_0_15px_rgba(244,63,94,0.15)]">
          <Lock className="w-5 h-5 stroke-[1.8]" />
        </div>

        {/* Title */}
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold tracking-wide text-rose-50 mb-2">
          {CONFIG.STAGE_1_PASSWORD.title}
        </h1>

        {/* Subtitle / instruction */}
        <p className="font-sans text-sm text-rose-200/70 mb-6 max-w-xs leading-relaxed">
          {CONFIG.STAGE_1_PASSWORD.subtitle}
        </p>

        {/* Input container */}
        <div className="w-full space-y-3 mb-6">
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              autoComplete="off"
              value={inputValue}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder={CONFIG.STAGE_1_PASSWORD.placeholder}
              aria-label="Enter your date of birth"
              className={`w-full h-14 px-4 text-center text-lg sm:text-xl font-medium tracking-widest
                bg-slate-900/60 text-rose-100 placeholder:text-rose-400/30
                rounded-2xl border transition-all duration-200 outline-none
                ${
                  hasError
                    ? 'border-rose-500/80 shadow-[0_0_15px_rgba(244,63,94,0.3)] bg-rose-950/20'
                    : 'border-rose-500/25 focus:border-rose-400 focus:shadow-[0_0_20px_rgba(244,63,94,0.2)]'
                }`}
            />
          </div>

          {/* Gentle error message */}
          <div className="min-h-6 flex items-center justify-center">
            {hasError ? (
              <p className="text-xs font-medium text-rose-400 flex items-center gap-1.5 animate-fadeIn">
                <span>{CONFIG.STAGE_1_PASSWORD.errorMessage}</span>
              </p>
            ) : (
              <p className="text-[11px] text-rose-300/40 tracking-wider">
                {CONFIG.STAGE_1_PASSWORD.hintNote}
              </p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="button"
          onClick={handleValidate}
          disabled={isTransitioning || inputValue.trim().length === 0}
          className="w-full h-13 rounded-2xl font-medium text-base tracking-wide
            bg-gradient-to-r from-rose-600 via-rose-500 to-pink-600 text-white
            shadow-[0_8px_25px_rgba(225,29,72,0.35)]
            hover:shadow-[0_10px_30px_rgba(225,29,72,0.45)]
            active:scale-[0.97] transition-all duration-200
            disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100
            flex items-center justify-center gap-2 group cursor-pointer"
        >
          <span>{CONFIG.STAGE_1_PASSWORD.submitButton}</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </ModalCard>
  );
};
