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
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
      <motion.button
        onClick={handleScroll}
        className="flex flex-col items-center justify-center px-4 py-2 rounded-full backdrop-blur-md bg-white/20 dark:bg-gray-800/40 border border-white/30 shadow-lg hover:bg-white/30 transition"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-6 h-6 text-primary" />
        </motion.div>
        <span className="text-xs font-medium text-gray-600 dark:text-gray-300 mt-1">
          Scroll
        </span>
      </motion.button>
    </div>
  );
}
