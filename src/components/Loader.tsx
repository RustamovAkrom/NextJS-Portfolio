"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Loader({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // клиент смонтировался
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // пока сервер рендерит → показываем простой div (совпадет с клиентом)
  if (!mounted || loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen w-full transition-colors duration-300 bg-white dark:bg-gray-900">
        <motion.div
          className="w-16 h-16 sm:w-20 sm:h-20 border-4 border-indigo-500 border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        />
        <motion.span
          className="mt-6 text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Loading <span className="text-indigo-500">Portfolio</span>...
        </motion.span>
      </div>
    );
  }

  return <>{children}</>;
}
