"use client";

import { useEffect, useRef } from "react";

interface BackgroundAnimationProps {
  children: React.ReactNode;
  config?: {
    numParticles?: number;
    speed?: number;
    lineColor?: string;
    pointColor?: string;
    interactionRadius?: number; // радиус влияния курсора
    attractionStrength?: number; // сила притяжения
  };
}

export default function BackgroundAnimation({ children, config }: BackgroundAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const {
      numParticles = 80,
      speed = 0.3,
      lineColor = "rgba(255,255,255,0.15)",
      pointColor = "rgba(255,255,255,0.5)",
      interactionRadius = 100,
      attractionStrength = 0.05,
    } = config || {};

    let particles: { x: number; y: number; vx: number; vy: number; radius: number }[] = [];

    const mouse = { x: 0, y: 0, isInside: false };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = Array.from({ length: numParticles }).map(() => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
        radius: Math.random() * 2 + 1,
      }));
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseEnter = () => (mouse.isInside = true);
    const handleMouseLeave = () => (mouse.isInside = false);

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mouseleave", handleMouseLeave);

    resize();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Рисуем линии между близкими точками
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Рисуем точки
      particles.forEach((p) => {
        // Притяжение к мыши
        if (mouse.isInside) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < interactionRadius) {
            p.vx += (dx / dist) * attractionStrength;
            p.vy += (dy / dist) * attractionStrength;
          }
        }

        ctx.fillStyle = pointColor;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        p.x += p.vx;
        p.y += p.vy;

        // Отражение от границ
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [config]);

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 -z-10 h-full w-full" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
