"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <motion.button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      whileHover={{ scale: 1.2, rotate: 15 }}
      whileTap={{ scale: 0.9, rotate: -15 }}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="p-3 rounded-full bg-gray-200 dark:bg-gray-800 shadow-lg flex items-center justify-center cursor-pointer"
    >
      <AnimatePresence mode="wait">
        {theme === "light" ? (
          <motion.div
            key="moon"
            initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
            transition={{ duration: 0.5 }}
          >
            <Moon className="w-6 h-6 text-gray-900 dark:text-white" />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
            transition={{ duration: 0.5 }}
          >
            <Sun className="w-6 h-6 text-yellow-400" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
