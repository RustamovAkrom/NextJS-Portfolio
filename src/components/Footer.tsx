"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { PersonStanding } from "lucide-react";

export default function Footer() {
  const pathname = usePathname();

  return (
    <footer className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border-t border-gray-200/50 dark:border-gray-800/50">
      <div className="max-w-screen-xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Logo */}
        <Link 
          href="/"
          className="flex items-center gap-2 text-gray-800 dark:text-gray-100 font-semibold"
        >
          <Sparkles className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />
          <span className="text-base tracking-wide">
            {siteConfig.name}
            <span className="text-indigo-500 dark:text-indigo-400">.Dev</span>
          </span>
        </Link>

        {/* Links */}
        <ul className="flex flex-wrap items-center gap-5 text-sm">
          {siteConfig.footerLinks.map(({ label, href }) => {
            const isActive = pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`transition ${
                    isActive
                      ? "text-indigo-500 dark:text-indigo-400 font-medium"
                      : "text-gray-500 dark:text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400"
                  }`}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Bottom text */}
      <div className="text-center text-xs text-gray-500 dark:text-gray-400 py-3 border-t border-gray-200/40 dark:border-gray-800/40">
        © {new Date().getFullYear()}{" "}
        <span className="font-medium hover:text-indigo-500 dark:hover:text-indigo-400 transition">
          Akrom Rustamov
        </span>
        . All Rights Reserved.
      </div>
    </footer>
  );
}
