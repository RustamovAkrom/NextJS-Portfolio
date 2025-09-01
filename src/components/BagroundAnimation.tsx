"use client";

import { useEffect, useRef } from "react";

export default function BackgroundAnimation({ children }: { children: React.ReactNode }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let stars: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      baseRadius: number;
    }[] = [];
    const numStars = 100;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      stars = Array.from({ length: numStars }).map(() => {
        const radius = Math.random() * 1.6 + 0.6;
        return {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          radius,
          baseRadius: radius,
        };
      });
    };
    resize();
    window.addEventListener("resize", resize);

    let mouseX = -1000;
    let mouseY = -1000;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      if (!ctx) return;

      const isDark = document.documentElement.classList.contains("dark");

      // 🎨 чистый фон
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      if (isDark) {
        gradient.addColorStop(0, "#0a0a0a");
        gradient.addColorStop(1, "#1a1a1a");
      } else {
        gradient.addColorStop(0, "#fafafa");
        gradient.addColorStop(1, "#eaeaea");
      }
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // ⭐ звёзды
      stars.forEach((star) => {
        star.x += star.vx;
        star.y += star.vy;

        if (star.x < 0 || star.x > canvas.width) star.vx *= -1;
        if (star.y < 0 || star.y > canvas.height) star.vy *= -1;

        star.radius = star.baseRadius + Math.sin(Date.now() / 600 + star.x) * 0.25;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = isDark
          ? "rgba(255,255,255,0.85)"
          : "rgba(40,40,40,0.75)";
        ctx.fill();
      });

      // ⚡ линии
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i].x - stars[j].x;
          const dy = stars[i].y - stars[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            let opacity = 1 - dist / 120;

            const mx = (stars[i].x + stars[j].x) / 2 - mouseX;
            const my = (stars[i].y + stars[j].y) / 2 - mouseY;
            const mouseDist = Math.sqrt(mx * mx + my * my);
            if (mouseDist < 150) opacity += 0.3;

            ctx.beginPath();
            ctx.moveTo(stars[i].x, stars[i].y);
            ctx.lineTo(stars[j].x, stars[j].y);

            // иногда линии "вспыхивают" как молния
            const lightning = Math.random() < 0.002;

            ctx.strokeStyle = lightning
              ? isDark
                ? `rgba(0,200,255,${opacity + 0.3})`
                : `rgba(255,180,50,${opacity + 0.3})`
              : isDark
              ? `rgba(255,255,255,${opacity * 0.5})`
              : `rgba(0,0,0,${opacity * 0.4})`;
            ctx.lineWidth = lightning ? 1.3 : 0.6;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 -z-10 h-full w-full" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

// // components/BackgroundAnimation.tsx
// "use client";

// import { useEffect, useRef } from "react";

// export default function BackgroundAnimation({ children }: { children: React.ReactNode }) {
//   const canvasRef = useRef<HTMLCanvasElement>(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     let stars: { x: number; y: number; vx: number; vy: number; radius: number }[] = [];
//     const numStars = 120;

//     const resize = () => {
//       canvas.width = window.innerWidth;
//       canvas.height = window.innerHeight;
//       stars = Array.from({ length: numStars }).map(() => ({
//         x: Math.random() * canvas.width,
//         y: Math.random() * canvas.height,
//         vx: (Math.random() - 0.5) * 0.3,
//         vy: (Math.random() - 0.5) * 0.3,
//         radius: Math.random() * 1.3 + 0.3,
//       }));
//     };
//     resize();
//     window.addEventListener("resize", resize);

//     let mouseX = -1000;
//     let mouseY = -1000;
//     const handleMouseMove = (e: MouseEvent) => {
//       mouseX = e.clientX;
//       mouseY = e.clientY;
//     };
//     window.addEventListener("mousemove", handleMouseMove);

//     const animate = () => {
//       if (!ctx) return;

//       const isDark = document.documentElement.classList.contains("dark");

//       // Фон градиентный
//       const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
//       if (isDark) {
//         gradient.addColorStop(0, "#050505");
//         gradient.addColorStop(1, "#111111");
//       } else {
//         gradient.addColorStop(0, "#f0f4f8");
//         gradient.addColorStop(1, "#d0e7ff");
//       }
//       ctx.fillStyle = gradient;
//       ctx.fillRect(0, 0, canvas.width, canvas.height);

//       // Звёзды
//       stars.forEach((star) => {
//         star.x += star.vx;
//         star.y += star.vy;
//         if (star.x < 0 || star.x > canvas.width) star.vx *= -1;
//         if (star.y < 0 || star.y > canvas.height) star.vy *= -1;

//         ctx.beginPath();
//         ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
//         ctx.fillStyle = isDark ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.7)";
//         ctx.fill();
//       });

//       // Линии между звёздами
//       for (let i = 0; i < stars.length; i++) {
//         for (let j = i + 1; j < stars.length; j++) {
//           const dx = stars[i].x - stars[j].x;
//           const dy = stars[i].y - stars[j].y;
//           const dist = Math.sqrt(dx * dx + dy * dy);

//           if (dist < 120) {
//             let opacity = 1 - dist / 120;

//             const mx = stars[i].x - mouseX;
//             const my = stars[i].y - mouseY;
//             const mouseDist = Math.sqrt(mx * mx + my * my);
//             if (mouseDist < 150) opacity += 0.3;

//             ctx.beginPath();
//             ctx.moveTo(stars[i].x, stars[i].y);
//             ctx.lineTo(stars[j].x, stars[j].y);
//             ctx.strokeStyle = isDark
//               ? `rgba(255,255,255,${opacity * 0.5})`
//               : `rgba(0,0,0,${opacity * 0.5})`;
//             ctx.lineWidth = 0.6;
//             ctx.stroke();
//           }
//         }
//       }

//       requestAnimationFrame(animate);
//     };

//     animate();

//     return () => {
//       window.removeEventListener("resize", resize);
//       window.removeEventListener("mousemove", handleMouseMove);
//     };
//   }, []);

//   return (
//     <div className="relative w-full min-h-screen overflow-hidden">
//       <canvas ref={canvasRef} className="absolute inset-0 -z-10 h-full w-full" />
//       <div className="relative z-10">{children}</div>
//     </div>
//   );
// }


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
