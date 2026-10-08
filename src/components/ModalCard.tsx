import React from 'react';

interface ModalCardProps {
  children: React.ReactNode;
  className?: string;
  shake?: boolean;
}

/**
 * ModalCard
 * 
 * Custom glassmorphic modal container with refined romantic styling:
 * - Rounded corners (rounded-3xl)
 * - Subtle rose gold border and rim light
 * - Soft deep shadow with ambient aura
 * - Mobile-first width (max-w-[380px] on portrait phones)
 * - Zero-lag CSS entrance and optional shake state
 */
export const ModalCard: React.FC<ModalCardProps> = ({
  children,
  className = '',
  shake = false,
}) => {
  return (
    <div
      role="dialog"
      aria-modal="true"
      className={`relative w-full max-w-[380px] mx-auto 
        rounded-3xl p-6 sm:p-8 
        bg-gradient-to-b from-[#180d24]/90 via-[#130a1c]/95 to-[#0e0716]/95
        backdrop-blur-xl
        border border-rose-400/20
        shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_40px_rgba(225,29,72,0.12)]
        transition-all duration-300 ease-out
        ${shake ? 'animate-romantic-shake' : ''}
        ${className}`}
    >
      {/* Subtle interior specular highlight at the top edge */}
      <div 
        className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-rose-300/30 to-transparent" 
        aria-hidden="true" 
      />

      {children}
    </div>
  );
};
