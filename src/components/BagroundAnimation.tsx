"use client";

import { useEffect, useRef } from "react";

interface BackgroundAnimationProps {
  children: React.ReactNode;
  config?: {
    numStars?: number;
    speed?: number;
    darkGradient?: [string, string];
    lightGradient?: [string, string];
  };
}

export default function BackgroundAnimation({ children, config }: BackgroundAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Настройки (по умолчанию + кастомизация)
    const {
      numStars = 120,
      speed = 0.15,
      darkGradient = ["#050510", "#0a0a2a"],
      lightGradient = ["#f5f9ff", "#dbeafe"],
    } = config || {};

    let stars: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
      flicker: number;
    }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      stars = Array.from({ length: numStars }).map(() => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
        radius: Math.random() * 1.3 + 0.3,
        alpha: Math.random() * 0.6 + 0.4,
        flicker: Math.random() * 0.015 + 0.005,
      }));
    };

    resize();
    window.addEventListener("resize", resize);

    const animate = () => {
      const isDark = document.documentElement.classList.contains("dark");

      // Градиентный фон
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      const [g1, g2] = isDark ? darkGradient : lightGradient;
      gradient.addColorStop(0, g1);
      gradient.addColorStop(1, g2);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Анимация звёзд
      stars.forEach((star) => {
        star.x += star.vx;
        star.y += star.vy;

        // Отражение от границ
        if (star.x < 0 || star.x > canvas.width) star.vx *= -1;
        if (star.y < 0 || star.y > canvas.height) star.vy *= -1;

        // Эффект мерцания
        star.alpha += star.flicker * (Math.random() > 0.5 ? 1 : -1);
        star.alpha = Math.min(1, Math.max(0.3, star.alpha));

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = isDark
          ? `rgba(255,255,255,${star.alpha})`
          : `rgba(0,0,0,${star.alpha * 0.8})`;
        ctx.fill();
      });

      // Лёгкий слой для "глубины"
      ctx.fillStyle = isDark
        ? "rgba(15,15,35,0.25)"
        : "rgba(255,255,255,0.18)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      requestAnimationFrame(animate);
    };

    animate();

    return () => window.removeEventListener("resize", resize);
  }, [config]);

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 -z-10 h-full w-full"
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}


// // components/BackgroundAnimation.tsx
// "use client";

// import { ReactNode } from "react";

// export default function BackgroundAnimation({ children }: { children: ReactNode }) {
//   return (
//     <div className="">
//       <div className="relative isolate px-6 pt-14 lg:px-8">
//         {/* Верхний фон */}
//         <div
//           aria-hidden="true"
//           className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
//         >
//           <div
//             style={{
//               clipPath:
//                 "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
//             }}
//             className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72rem]"
//           />
//         </div>

//         {/* Здесь твой контент */}
//         {children}

//         {/* Нижний фон */}
//         <div
//           aria-hidden="true"
//           className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
//         >
//           <div
//             style={{
//               clipPath:
//                 "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
//             }}
//             className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72rem]"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }
