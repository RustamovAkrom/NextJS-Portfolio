// components/project/ProjectGallery.tsx
"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

type Shot = { src: string; alt?: string; width?: number; height?: number };

export default function ProjectGallery({ screenshots }: { screenshots: Shot[] }) {
  const [active, setActive] = useState<number | null>(null);

  if (!screenshots || screenshots.length === 0) {
    return (
      <div className="rounded-xl border border-gray-200/60 dark:border-gray-700/60 bg-white/50 dark:bg-gray-900/50 p-8 text-center text-sm text-gray-500 dark:text-gray-400">
        No screenshots available.
      </div>
    );
  }

  return (
    <>
      {/* Mobile: горизонтальный скролл, Web: сетка */}
      <div className="sm:hidden -mx-4 px-4 overflow-x-auto scrollbar-none">
        <div className="flex gap-4 snap-x snap-mandatory">
          {screenshots.map((s, i) => (
            <motion.button
              key={i}
              onClick={() => setActive(i)}
              whileHover={{ scale: 1.02 }}
              className="relative min-w-[85%] h-60 snap-center overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-900/50"
            >
              <Image
                src={s.src}
                alt={s.alt ?? `Screenshot ${i + 1}`}
                fill
                className="object-cover"
                sizes="85vw"
                priority={i === 0}
              />
            </motion.button>
          ))}
        </div>
      </div>

      <div className="hidden sm:grid grid-cols-2 lg:grid-cols-3 gap-4">
        {screenshots.map((s, i) => (
          <motion.button
            key={i}
            onClick={() => setActive(i)}
            whileHover={{ scale: 1.01 }}
            className="relative h-52 lg:h-56 overflow-hidden rounded-md border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-900/50"
          >
            <Image
              src={s.src}
              alt={s.alt ?? `Screenshot ${i + 1}`}
              fill
              className="object-cover"
              sizes="(max-width:1024px) 50vw, 33vw"
              priority={i === 0}
            />
          </motion.button>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active !== null && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-[2px] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              className="relative w-full max-w-5xl aspect-[16/10] bg-black rounded-md overflow-hidden"
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={screenshots[active].src}
                alt={screenshots[active].alt ?? "Screenshot"}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
              <button
                onClick={() => setActive(null)}
                className="absolute top-2 right-2 inline-flex h-9 w-9 items-center justify-center rounded-md bg-white/80 text-gray-800 hover:bg-white"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
