import React, { useEffect, useRef } from 'react';

export type BackgroundMode = 'dimmed' | 'clear' | 'quiet';

interface RomanticBackgroundProps {
  isDimmed?: boolean;
  mode?: BackgroundMode;
}

interface AmbientParticle {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  speedY: number;
  speedX: number;
  phase: number;
  color: string;
}

/**
 * RomanticBackground
 * 
 * Creates a deep romantic night atmosphere:
 * - Deep velvet obsidian, plum, and wine tones
 * - Soft drifting glowing particles / starlight bokeh on an ultra-lightweight Canvas
 * - Modes:
 *   - 'dimmed': During opening modals (Stages 1-3)
 *   - 'clear': Vibrant during gift box reveal and celebration (Stages 4-5)
 *   - 'quiet': Calmer, darker, slower particles for intimate letter reading (Stage 6)
 */
export const RomanticBackground: React.FC<RomanticBackgroundProps> = ({
  isDimmed,
  mode: explicitMode,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mode: BackgroundMode = explicitMode || (isDimmed ? 'dimmed' : 'clear');
  const modeRef = useRef<BackgroundMode>(mode);

  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle palette: subtle romantic rose, gold, and warm starlight
    const palette = [
      'rgba(244, 63, 94, ',   // rose-500
      'rgba(251, 113, 133, ', // rose-400
      'rgba(253, 224, 71, ',  // gold-300
      'rgba(254, 240, 138, ', // soft warm star
      'rgba(216, 180, 254, ', // violet-300
    ];

    // Maintain a conservative particle count for high mobile frame rates (30-40 particles)
    const particleCount = Math.min(36, Math.floor((width * height) / 18000));
    const particles: AmbientParticle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.8 + 0.6,
        alpha: Math.random() * 0.45 + 0.2,
        speedY: -(Math.random() * 0.22 + 0.08),
        speedX: (Math.random() - 0.5) * 0.12,
        phase: Math.random() * Math.PI * 2,
        color: palette[Math.floor(Math.random() * palette.length)],
      });
    }

    let lastTime = performance.now();

    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      // Slower particles during quiet reading mode
      const isQuietMode = modeRef.current === 'quiet';
      const speedMultiplier = isQuietMode ? 0.45 : 1.0;
      const alphaMultiplier = isQuietMode ? 0.75 : 1.0;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y += p.speedY * dt * 60 * speedMultiplier;
        p.x += Math.sin(time * 0.001 + p.phase) * p.speedX * dt * 60 * speedMultiplier;
        p.phase += dt * 0.8 * speedMultiplier;

        // Wrap around smoothly
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        const pulseAlpha = Math.max(0.08, (p.alpha + Math.sin(p.phase) * 0.15) * alphaMultiplier);

        // Draw particle with gentle soft radial glow
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 3.5);
        gradient.addColorStop(0, `${p.color}${pulseAlpha})`);
        gradient.addColorStop(1, `${p.color}0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 3.5, 0, Math.PI * 2);
        ctx.fill();

        // Core star
        ctx.fillStyle = `${p.color}${Math.min(1, pulseAlpha * 1.3)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none select-none overflow-hidden z-0 bg-[#08040e]">
      {/* Deep atmospheric gradient backgrounds */}
      <div className="absolute inset-0 bg-radial-[at_top_center] from-[#2a0e2d]/60 via-[#12071d]/80 to-[#08040e]" />
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-rose-950/25 blur-3xl opacity-70" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-purple-950/25 blur-3xl opacity-70" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full bg-rose-900/15 blur-[90px] opacity-60" />

      {/* Ambient starlight / bokeh canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-70"
        aria-hidden="true"
      />

      {/* 
        Controlled Atmosphere Overlay:
        - 'dimmed': Stages 1, 2, 3 (Modal focus)
        - 'clear': Stages 4, 5 (Gift box reveal)
        - 'quiet': Stage 6 (Intimate, serene reading surface)
      */}
      <div
        className={`absolute inset-0 transition-all duration-1000 ease-out ${
          mode === 'dimmed'
            ? 'backdrop-blur-md bg-black/45 opacity-100'
            : mode === 'quiet'
            ? 'backdrop-blur-[3px] bg-black/60 opacity-100'
            : 'backdrop-blur-none bg-black/0 opacity-0'
        }`}
        aria-hidden="true"
      />
    </div>
  );
};
