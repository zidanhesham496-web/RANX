import React, { useEffect, useRef } from 'react';

export const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

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

    // Dynamic density & speed setup
    const particleCount = Math.min(Math.floor((width * height) / 10000), 85);
    const connectionDistance = 135;

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      glowColor: string;
    }

    const neonColors = [
      { fill: '#c084fc', glow: '#a855f7' },
      { fill: '#e879f9', glow: '#d946ef' },
      { fill: '#818cf8', glow: '#6366f1' },
      { fill: '#38bdf8', glow: '#0284c7' },
    ];

    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const colorScheme = neonColors[Math.floor(Math.random() * neonColors.length)];
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 2.4, // Faster random motion
        vy: (Math.random() - 0.5) * 2.4,
        radius: Math.random() * 2 + 1.2,
        color: colorScheme.fill,
        glowColor: colorScheme.glow,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Render Particles & Connect Neon Poly-Lines
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        // Position Updates
        p1.x += p1.vx;
        p1.y += p1.vy;

        // Bounce from boundaries
        if (p1.x < 0 || p1.x > width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > height) p1.vy *= -1;

        // Draw Individual Glowing Particle Dot
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = p1.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p1.glowColor;
        ctx.fill();

        // Connect distance-triggered geometric neon web lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const alpha = (1 - dist / connectionDistance) * 0.65;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(168, 85, 247, ${alpha})`;
            ctx.lineWidth = 0.85;
            ctx.shadowBlur = 6;
            ctx.shadowColor = '#c084fc';
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-80"
    />
  );
};
