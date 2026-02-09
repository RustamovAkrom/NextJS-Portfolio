"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white dark:bg-black flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center max-w-lg"
      >
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
          404
        </p>

        <h1 className="text-4xl sm:text-5xl font-semibold text-gray-900 dark:text-white">
          Page not found
        </h1>

        <p className="mt-4 text-gray-600 dark:text-gray-400">
          The page you’re looking for doesn’t exist or has been moved.
        </p>

        <div className="mt-10 flex items-center justify-center gap-4">
          <Link
            href="/"
            className="px-5 py-2 rounded-md bg-gray-900 text-white dark:bg-white dark:text-black text-sm font-medium hover:opacity-90 transition"
          >
            Go home
          </Link>

          <Link
            href="/contact"
            className="px-5 py-2 rounded-md border border-gray-300 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900 transition"
          >
            Contact
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
