"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function ScrollDownButton() {
  const handleScroll = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30">
      <motion.button
        onClick={handleScroll}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="group relative flex flex-col items-center justify-center px-4 py-2 rounded-full backdrop-blur-md bg-white/10 dark:bg-gray-800/30 border border-white/20 dark:border-gray-700/40 shadow-lg transition-all duration-300 hover:bg-white/20 hover:shadow-[0_0_15px_rgba(99,102,241,0.4)]"
      >
        {/* Анимированная стрелка */}
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-6 h-6 text-indigo-500 dark:text-indigo-400 drop-shadow-[0_0_4px_rgba(99,102,241,0.4)]" />
        </motion.div>

        {/* Текст с эффектом перелива */}
        <span className="mt-1 text-xs font-medium bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 bg-clip-text text-transparent animate-gradient-x">
          Scroll Down
        </span>

        {/* Свечение (только при hover) */}
        <span className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 opacity-0 group-hover:opacity-10 blur-md transition-opacity duration-500" />
      </motion.button>
    </div>
  );
}
