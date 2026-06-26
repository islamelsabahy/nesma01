import { useEffect, useRef, useCallback } from "react";
import { useUIStore } from "@/stores/useUIStore";
import { useLanguageStore } from "@/stores/useLanguageStore";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  rotation: number;
  rotSpeed: number;
  type: "circle" | "petal";
  life: number;
  maxLife: number;
}

interface Streak {
  x: number;
  y: number;
  length: number;
  speed: number;
  amplitude: number;
  frequency: number;
  opacity: number;
  phase: number;
}

export function WindParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const startTimeRef = useRef(0);
  const particlesRef = useRef<Particle[]>([]);
  const streaksRef = useRef<Streak[]>([]);
  const { easterEggActive } = useUIStore();
  const isRTL = useLanguageStore((state: { isRTL: () => boolean }) => state.isRTL());

  const initParticles = useCallback(
    (w: number, h: number) => {
      const isMobile = w < 768;
      const count = isMobile ? 20 : 40;
      const dir = isRTL ? -1 : 1;

      const particles: Particle[] = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: isRTL ? w + Math.random() * 200 : -Math.random() * 200,
          y: Math.random() * h,
          vx: (dir * (100 + Math.random() * 200)) / 60,
          vy: (Math.random() - 0.5) * 30 / 60,
          size: 3 + Math.random() * 5,
          opacity: 0.15 + Math.random() * 0.25,
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.04,
          type: Math.random() > 0.5 ? "circle" : "petal",
          life: 0,
          maxLife: 180 + Math.random() * 120,
        });
      }

      const streakCount = isMobile ? 8 : 15;
      const streaks: Streak[] = [];
      for (let i = 0; i < streakCount; i++) {
        streaks.push({
          x: isRTL ? w + Math.random() * 300 : -Math.random() * 300,
          y: Math.random() * h,
          length: 200 + Math.random() * 400,
          speed: (dir * (200 + Math.random() * 300)) / 60,
          amplitude: 10 + Math.random() * 30,
          frequency: 0.005 + Math.random() * 0.01,
          opacity: 0.05 + Math.random() * 0.15,
          phase: Math.random() * Math.PI * 2,
        });
      }

      particlesRef.current = particles;
      streaksRef.current = streaks;
    },
    [isRTL]
  );

  useEffect(() => {
    if (!easterEggActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;
    startTimeRef.current = performance.now();

    initParticles(w, h);

    const animate = (now: number) => {
      const elapsed = now - startTimeRef.current;
      if (elapsed > 3500) {
        useUIStore.getState().deactivateEasterEgg();
        return;
      }

      ctx.clearRect(0, 0, w, h);

      // Global fade
      let globalAlpha = 1;
      if (elapsed < 500) globalAlpha = elapsed / 500;
      else if (elapsed > 2500) globalAlpha = 1 - (elapsed - 2500) / 1000;
      ctx.globalAlpha = globalAlpha;

      const dir = isRTL ? -1 : 1;

      // Draw streaks
      streaksRef.current.forEach((streak) => {
        streak.x += streak.speed;
        ctx.beginPath();
        ctx.strokeStyle = `rgba(200,169,106,${streak.opacity})`;
        ctx.lineWidth = 1 + streak.opacity * 2;

        const startX = streak.x;
        const startY = streak.y;
        const cpX = startX + streak.length * 0.5;
        const cpY = startY + Math.sin(streak.phase) * streak.amplitude;
        const endX = startX + streak.length;
        const endY = startY + Math.sin(streak.phase + streak.length * streak.frequency) * streak.amplitude;

        ctx.moveTo(startX, startY);
        ctx.quadraticCurveTo(cpX, cpY, endX, endY);
        ctx.stroke();

        // Reset if off screen
        if ((dir > 0 && startX > w + 100) || (dir < 0 && startX + streak.length < -100)) {
          streak.x = dir > 0 ? -streak.length - Math.random() * 300 : w + Math.random() * 300;
          streak.y = Math.random() * h;
        }
      });

      // Draw particles
      particlesRef.current.forEach((p) => {
        p.life++;
        p.x += p.vx;
        p.y += p.vy + Math.sin(p.life * 0.03) * 0.5;
        p.rotation += p.rotSpeed;

        const lifeRatio = p.life / p.maxLife;
        const fadeIn = Math.min(1, p.life / 30);
        const fadeOut = lifeRatio > 0.7 ? 1 - (lifeRatio - 0.7) / 0.3 : 1;
        const alpha = p.opacity * fadeIn * fadeOut;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = alpha;

        if (p.type === "circle") {
          const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size);
          gradient.addColorStop(0, "rgba(200,169,106,0.8)");
          gradient.addColorStop(1, "rgba(232,216,195,0.2)");
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Petal shape
          ctx.fillStyle = "rgba(200,169,106,0.4)";
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size * 1.5, p.size * 0.6, 0, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();

        // Reset if off screen or dead
        if (
          p.life >= p.maxLife ||
          (dir > 0 && p.x > w + 50) ||
          (dir < 0 && p.x < -50)
        ) {
          p.x = dir > 0 ? -50 : w + 50;
          p.y = Math.random() * h;
          p.life = 0;
          p.vx = (dir * (100 + Math.random() * 200)) / 60;
        }
      });

      ctx.globalAlpha = 1;
      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animRef.current);
    };
  }, [easterEggActive, isRTL, initParticles]);

  if (!easterEggActive) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-canvas"
      style={{ width: "100%", height: "100%" }}
    />
  );
}
