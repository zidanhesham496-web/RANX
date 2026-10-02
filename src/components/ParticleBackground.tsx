import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  sprite: HTMLCanvasElement;
}

const neonColors = [
  { fill: '#c084fc', glow: '#a855f7' },
  { fill: '#e879f9', glow: '#d946ef' },
  { fill: '#818cf8', glow: '#6366f1' },
  { fill: '#38bdf8', glow: '#0284c7' },
];

const makeSprite = (fill: string, glow: string) => {
  const size = 64;
  const c = document.createElement('canvas');
  c.width = size;
  c.height = size;
  const g = c.getContext('2d');
  if (!g) return c;
  const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, fill);
  grad.addColorStop(0.25, fill);
  grad.addColorStop(0.3, glow + '99');
  grad.addColorStop(1, glow + '00');
  g.fillStyle = grad;
  g.fillRect(0, 0, size, size);
  return c;
};

export const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const isMobile = window.innerWidth < 640;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const frameInterval = isMobile ? 1000 / 30 : 0;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const baseCount = Math.min(Math.floor((width * height) / 10000), 85);
    const particleCount = Math.max(12, Math.floor(isMobile ? baseCount * 0.7 : baseCount));
    const connectionDistance = 135;
    const connectionDistanceSq = connectionDistance * connectionDistance;

    const sprites = neonColors.map((c) => makeSprite(c.fill, c.glow));
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.4,
        vy: (Math.random() - 0.5) * 1.4,
        radius: Math.random() * 2 + 1.2,
        sprite: sprites[Math.floor(Math.random() * sprites.length)],
      });
    }

    const draw = (step: number) => {
      ctx.clearRect(0, 0, width, height);
      ctx.lineWidth = 0.85;

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        p1.x += p1.vx * step;
        p1.y += p1.vy * step;
        if (p1.x < 0 || p1.x > width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > height) p1.vy *= -1;

        const r = p1.radius * 4;
        ctx.drawImage(p1.sprite, p1.x - r, p1.y - r, r * 2, r * 2);

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < connectionDistanceSq) {
            const alpha = (1 - Math.sqrt(d2) / connectionDistance) * 0.65;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(168, 85, 247, ${alpha})`;
            ctx.stroke();
          }
        }
      }
    };

    if (reduceMotion) {
      draw(0);
      return () => window.removeEventListener('resize', handleResize);
    }

    let frameId = 0;
    let last = performance.now();

    const animate = (now: number) => {
      frameId = requestAnimationFrame(animate);
      const elapsed = now - last;
      if (elapsed < frameInterval - 1) return;
      last = now;
      draw(Math.min(elapsed / 16.667, 3));
    };
    frameId = requestAnimationFrame(animate);

    const onVisibility = () => {
      cancelAnimationFrame(frameId);
      if (!document.hidden) {
        last = performance.now();
        frameId = requestAnimationFrame(animate);
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', onVisibility);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-80"
    />
  );
};
