import React, { useEffect, useRef } from 'react';

interface CelebrationCanvasProps {
  active: boolean;
}

interface Balloon {
  x: number;
  y: number;
  radius: number;
  color: string;
  stringLength: number;
  speedY: number;
  swaySpeed: number;
  swayAmp: number;
  phase: number;
}

interface Confetti {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
  flip: number;
  flipSpeed: number;
  alpha: number;
}

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
  size: number;
  decay: number;
}

/**
 * CelebrationCanvas
 * 
 * High-performance mobile celebration effect:
 * - Floating balloons drifting gracefully upward with realistic strings & 3D specular shine
 * - Fluttering confetti flakes with 3D tumble physics
 * - Stylized firework starbursts exploding outward
 * - Light on GPU/CPU, capped particle counts, clean disposal
 */
export const CelebrationCanvas: React.FC<CelebrationCanvasProps> = ({ active }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const balloonColors = [
      '#e11d48', // crimson rose
      '#f43f5e', // bright rose
      '#fb7185', // soft blush
      '#f59e0b', // warm gold
      '#fbbf24', // champagne yellow
      '#c084fc', // soft lilac
      '#f472b6', // pink
    ];

    const confettiColors = [
      '#f43f5e',
      '#fda4af',
      '#fbbf24',
      '#fde047',
      '#ffffff',
      '#e879f9',
      '#a855f7',
    ];

    const sparkColors = ['#fde047', '#fbbf24', '#f43f5e', '#ffffff'];

    // 1. Initialize Balloons
    const balloons: Balloon[] = [];
    const balloonCount = Math.min(18, Math.floor(width / 24)); // Mobile-friendly count
    for (let i = 0; i < balloonCount; i++) {
      balloons.push({
        x: Math.random() * width,
        y: height + Math.random() * (height * 0.9) + 20,
        radius: Math.random() * 12 + 20, // 20-32px radius
        color: balloonColors[Math.floor(Math.random() * balloonColors.length)],
        stringLength: Math.random() * 20 + 35,
        speedY: -(Math.random() * 1.5 + 1.2),
        swaySpeed: Math.random() * 1.5 + 1,
        swayAmp: Math.random() * 18 + 10,
        phase: Math.random() * Math.PI * 2,
      });
    }

    // 2. Initialize Confetti
    const confettis: Confetti[] = [];
    const confettiCount = 55;
    for (let i = 0; i < confettiCount; i++) {
      confettis.push({
        x: width * 0.5 + (Math.random() - 0.5) * 80,
        y: height * 0.5 + (Math.random() - 0.5) * 60,
        width: Math.random() * 8 + 6,
        height: Math.random() * 14 + 8,
        color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
        speedX: (Math.random() - 0.5) * 12,
        speedY: -(Math.random() * 10 + 6),
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.2,
        flip: Math.random() * Math.PI,
        flipSpeed: Math.random() * 0.15 + 0.05,
        alpha: 1,
      });
    }

    // 3. Firework sparks
    const sparks: Spark[] = [];
    const spawnFirework = (originX: number, originY: number) => {
      const sparkNum = 28;
      for (let i = 0; i < sparkNum; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 7 + 2;
        sparks.push({
          x: originX,
          y: originY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          color: sparkColors[Math.floor(Math.random() * sparkColors.length)],
          size: Math.random() * 3 + 1.5,
          decay: Math.random() * 0.02 + 0.015,
        });
      }
    };

    // Trigger stylized firework bursts over time
    const fireworkTimer1 = setTimeout(() => spawnFirework(width * 0.25, height * 0.32), 200);
    const fireworkTimer2 = setTimeout(() => spawnFirework(width * 0.75, height * 0.28), 700);
    const fireworkTimer3 = setTimeout(() => spawnFirework(width * 0.5, height * 0.2), 1300);

    let lastTime = performance.now();

    const loop = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      // --- Draw & Update Confetti ---
      for (let i = 0; i < confettis.length; i++) {
        const c = confettis[i];
        c.x += c.speedX * dt * 60;
        c.y += c.speedY * dt * 60;
        c.speedY += 0.22 * dt * 60; // gravity
        c.speedX *= 0.985; // air drag
        c.rotation += c.rotationSpeed * dt * 60;
        c.flip += c.flipSpeed * dt * 60;

        // Reset if fallen off bottom
        if (c.y > height + 20) {
          c.y = -10;
          c.x = Math.random() * width;
          c.speedY = Math.random() * 2 + 1.5;
          c.speedX = (Math.random() - 0.5) * 3;
        }

        ctx.save();
        ctx.translate(c.x, c.y);
        ctx.rotate(c.rotation);
        ctx.scale(1, Math.cos(c.flip));
        ctx.fillStyle = c.color;
        ctx.globalAlpha = Math.max(0, c.alpha);
        ctx.fillRect(-c.width / 2, -c.height / 2, c.width, c.height);
        ctx.restore();
      }

      // --- Draw & Update Fireworks Sparks ---
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += s.vx * dt * 60;
        s.y += s.vy * dt * 60;
        s.vy += 0.08 * dt * 60; // gravity
        s.vx *= 0.97;
        s.alpha -= s.decay * dt * 60;

        if (s.alpha <= 0) {
          sparks.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = s.alpha;
        ctx.fillStyle = s.color;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();

        // Sparkle glint
        ctx.strokeStyle = s.color;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(s.x - s.size * 1.5, s.y);
        ctx.lineTo(s.x + s.size * 1.5, s.y);
        ctx.moveTo(s.x, s.y - s.size * 1.5);
        ctx.lineTo(s.x, s.y + s.size * 1.5);
        ctx.stroke();

        ctx.restore();
      }

      // --- Draw & Update Balloons ---
      for (let i = 0; i < balloons.length; i++) {
        const b = balloons[i];
        b.y += b.speedY * dt * 60;
        b.phase += b.swaySpeed * dt;
        const currentX = b.x + Math.sin(b.phase) * b.swayAmp;

        // Wrap to bottom if drifted off top
        if (b.y < -b.radius * 2 - b.stringLength) {
          b.y = height + 40 + Math.random() * 100;
          b.x = Math.random() * width;
        }

        ctx.save();
        ctx.translate(currentX, b.y);

        // Balloon string (gentle curve)
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, b.radius * 1.15);
        const wave = Math.sin(b.phase * 1.5) * 6;
        ctx.quadraticCurveTo(wave, b.radius * 1.15 + b.stringLength * 0.5, 0, b.radius * 1.15 + b.stringLength);
        ctx.stroke();

        // Balloon body (egg/oval shape)
        ctx.beginPath();
        ctx.ellipse(0, 0, b.radius * 0.88, b.radius * 1.15, 0, 0, Math.PI * 2);
        ctx.fillStyle = b.color;
        ctx.fill();

        // Specular highlight for 3D glossy look
        ctx.beginPath();
        ctx.ellipse(
          -b.radius * 0.35,
          -b.radius * 0.4,
          b.radius * 0.25,
          b.radius * 0.45,
          -Math.PI / 4,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
        ctx.fill();

        // Knot at bottom
        ctx.beginPath();
        ctx.moveTo(-b.radius * 0.18, b.radius * 1.15);
        ctx.lineTo(b.radius * 0.18, b.radius * 1.15);
        ctx.lineTo(0, b.radius * 1.25);
        ctx.closePath();
        ctx.fillStyle = b.color;
        ctx.fill();

        ctx.restore();
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(fireworkTimer1);
      clearTimeout(fireworkTimer2);
      clearTimeout(fireworkTimer3);
      cancelAnimationFrame(animId);
    };
  }, [active]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-30 w-full h-full"
      aria-hidden="true"
    />
  );
};
