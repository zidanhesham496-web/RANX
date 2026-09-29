import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  angle: number;
  targetAngle: number;
  speed: number;
  directionTime: number;
  radius: number;
}

const linkDistance = 154;

export function AuthNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let frameId = 0;
    let previousFrame = 0;

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const nextWidth = bounds.width;
      const nextHeight = bounds.height;
      const ratioX = width ? nextWidth / width : 1;
      const ratioY = height ? nextHeight / height : 1;
      width = nextWidth;
      height = nextHeight;

      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      if (!particles.length) {
        const count = Math.max(24, Math.min(58, Math.round((width * height) / 32000)));
        particles = Array.from({ length: count }, () => {
          const angle = Math.random() * Math.PI * 2;
          return {
            x: Math.random() * width,
            y: Math.random() * height,
            angle,
            targetAngle: Math.random() * Math.PI * 2,
            speed: 10 + Math.random() * 16,
            directionTime: 1.5 + Math.random() * 4,
            radius: 1 + Math.random() * 0.8,
          };
        });
      } else {
        particles.forEach((particle) => {
          particle.x *= ratioX;
          particle.y *= ratioY;
        });
      }
      draw();
    };

    const draw = (delta = 0) => {
      context.clearRect(0, 0, width, height);

      particles.forEach((particle) => {
        particle.directionTime -= delta;
        if (particle.directionTime <= 0) {
          particle.targetAngle = Math.random() * Math.PI * 2;
          particle.directionTime = 2 + Math.random() * 4;
        }

        const turn = Math.atan2(
          Math.sin(particle.targetAngle - particle.angle),
          Math.cos(particle.targetAngle - particle.angle),
        );
        particle.angle += turn * Math.min(1, delta * 0.16);
        particle.x += Math.cos(particle.angle) * particle.speed * delta;
        particle.y += Math.sin(particle.angle) * particle.speed * delta;

        if (particle.x < 0 || particle.x > width) {
          particle.angle = Math.PI - particle.angle;
          particle.x = Math.max(0, Math.min(width, particle.x));
        }
        if (particle.y < 0 || particle.y > height) {
          particle.angle = -particle.angle;
          particle.y = Math.max(0, Math.min(height, particle.y));
        }
      });

      for (let firstIndex = 0; firstIndex < particles.length; firstIndex += 1) {
        const first = particles[firstIndex];
        for (let secondIndex = firstIndex + 1; secondIndex < particles.length; secondIndex += 1) {
          const second = particles[secondIndex];
          const distance = Math.hypot(first.x - second.x, first.y - second.y);
          if (distance >= linkDistance) continue;

          const opacity = (1 - distance / linkDistance) * 0.17;
          context.beginPath();
          context.moveTo(first.x, first.y);
          context.lineTo(second.x, second.y);
          context.strokeStyle = `rgba(181, 237, 235, ${opacity})`;
          context.lineWidth = 0.75;
          context.stroke();
        }
      }

      particles.forEach((particle) => {
        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fillStyle = "rgba(205, 249, 245, 0.48)";
        context.fill();
      });
    };

    const animate = (time: number) => {
      const delta = previousFrame ? Math.min((time - previousFrame) / 1000, 0.05) : 0;
      previousFrame = time;
      draw(delta);
      frameId = window.requestAnimationFrame(animate);
    };

    const updateMotion = () => {
      window.cancelAnimationFrame(frameId);
      previousFrame = 0;
      if (motionPreference.matches) {
        draw();
      } else {
        frameId = window.requestAnimationFrame(animate);
      }
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    motionPreference.addEventListener("change", updateMotion);
    updateMotion();

    return () => {
      window.cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      motionPreference.removeEventListener("change", updateMotion);
    };
  }, []);

  return <canvas className="auth-network" ref={canvasRef} aria-hidden="true" />;
}