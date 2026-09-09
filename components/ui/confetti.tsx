"use client";

import { useEffect, useRef } from "react";

interface ConfettiProps {
  duration?: number;
}

export default function Confetti({ duration = 3500 }: ConfettiProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const startTime = Date.now();

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const colors = [
      "#4b93ff",
      "#60a5fa",
      "#38bdf8",
      "#facc15",
      "#ffffff",
      "#4ade80",
      "#c084fc",
    ];

    const particles = Array.from({ length: 90 }, () => {
      const angle = Math.random() * Math.PI * 2;
      const velocity = 5 + Math.random() * 9;
      return {
        x: canvas.width / 2,
        y: canvas.height / 2 - 50,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity - 4,
        size: 5 + Math.random() * 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 12,
        opacity: 1,
      };
    });

    const render = () => {
      const elapsed = Date.now() - startTime;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let alive = false;
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.16; // gravity
        p.vx *= 0.98; // air drag
        p.rotation += p.rotationSpeed;

        if (elapsed > duration * 0.65) {
          p.opacity = Math.max(
            0,
            1 - (elapsed - duration * 0.65) / (duration * 0.35)
          );
        }

        if (p.opacity > 0 && p.y < canvas.height + 20) {
          alive = true;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.globalAlpha = p.opacity;
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.7);
          ctx.restore();
        }
      });

      if (alive && elapsed < duration) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
    };
  }, [duration]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[110]"
    />
  );
}
