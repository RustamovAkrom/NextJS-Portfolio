"use client";

import { useEffect, useRef } from "react";

interface BackgroundAnimationProps {
  children: React.ReactNode;
  config?: {
    density?: number;
    speed?: number;
    lineOpacity?: number;
    pointOpacity?: number;
  };
}

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
};

export default function BackgroundAnimation({
  children,
  config,
}: BackgroundAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const {
      density = 0.00006,
      speed = 0.15,
      lineOpacity = 0.08,
      pointOpacity = 0.35,
    } = config || {};

    let particles: Particle[] = [];
    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const area = canvas.width * canvas.height;
      const count = Math.floor(area * density);

      particles = Array.from({ length: count }).map(() => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
        size: Math.random() * 1.5 + 0.5,
      }));
    };

    const drawLines = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = dx * dx + dy * dy;

          if (dist < 14000) {
            ctx.strokeStyle = `rgba(150,150,150,${lineOpacity})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      drawLines();

      particles.forEach((p) => {
        ctx.fillStyle = `rgba(180,180,180,${pointOpacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        p.x += p.vx;
        p.y += p.vy;

        if (p.x <= 0 || p.x >= canvas.width) p.vx *= -1;
        if (p.y <= 0 || p.y >= canvas.height) p.vy *= -1;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    resize();
    animate();

    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [config]);

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 -z-10 w-full h-full" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
