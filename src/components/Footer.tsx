"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";

export default function Footer() {
  const pathname = usePathname();

  return (
    <footer className="relative bg-white/40 dark:bg-gray-900/40 backdrop-blur-lg border-t border-transparent shadow-inner">
      {/* Градиентная линия сверху */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500" />

      <div className="max-w-screen-xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        
        {/* Лого */}
        <Link
          href="/"
          className="group flex items-center gap-2 font-semibold text-gray-800 dark:text-gray-100"
        >
          <Sparkles className="w-5 h-5 text-indigo-500 dark:text-indigo-400 group-hover:scale-110 transition-transform" />
          <span className="text-base bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 bg-clip-text text-transparent group-hover:opacity-90 transition">
            {siteConfig.name}
            <span className="text-gray-700 dark:text-gray-300 font-light">
              .Dev
            </span>
          </span>
        </Link>

        {/* Навигация */}
        <ul className="flex flex-wrap items-center gap-6 text-sm">
          {siteConfig.footerLinks.map(({ label, href }) => {
            const isActive = pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`relative transition-all duration-200 ${
                    isActive
                      ? "text-indigo-500 dark:text-indigo-400 font-medium"
                      : "text-gray-500 dark:text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400"
                  }`}
                >
                  {label}
                  <span className="absolute bottom-[-2px] left-0 w-0 h-[1px] bg-gradient-to-r from-indigo-500 to-blue-500 transition-all duration-300 group-hover:w-full" />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Нижний текст */}
      <div className="text-center text-xs text-gray-500 dark:text-gray-400 py-4 border-t border-gray-200/30 dark:border-gray-800/30">
        © {new Date().getFullYear()}{" "}
        <span className="font-medium bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 bg-clip-text text-transparent hover:opacity-80 transition">
          Akrom Rustamov
        </span>{" "}
        — All Rights Reserved.
      </div>
    </footer>
  );
}
