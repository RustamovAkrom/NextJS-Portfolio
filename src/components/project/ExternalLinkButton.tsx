// components/project/ExternalLinkButton.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function ExternalLinkButton({
  href,
  icon,
  children,
}: {
  href: string;
  icon?: ReactNode;
  children: ReactNode;
}) {
  return (
    <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}>
      <Link
        href={href}
        target="_blank"
        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-md border border-gray-300/70 dark:border-gray-600/70 bg-white/60 dark:bg-gray-800/60 text-gray-800 dark:text-gray-100 hover:bg-white/80 dark:hover:bg-gray-800 transition-colors"
      >
        {icon}
        <span className="text-sm font-medium">{children}</span>
      </Link>
    </motion.div>
  );
}
