"use client";

import { useState } from "react";
import { Dialog } from "@headlessui/react";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import NavLink from "./NavLinks";
import { siteConfig } from "@/config/site";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/40 dark:bg-gray-900/40 backdrop-blur-lg border-b border-white/20 dark:border-gray-700/30 shadow-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
        
        {/* Лого */}
        <div className="flex items-center flex-shrink-0">
          <Link
            href="/"
            className="group flex items-center gap-2 font-semibold"
          >
            <Sparkles className="w-5 h-5 text-indigo-500 dark:text-indigo-400 group-hover:scale-110 group-hover:rotate-6 transition-transform" />
            <span className="text-base sm:text-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 bg-clip-text text-transparent group-hover:opacity-90 transition">
              {siteConfig.name}
              <span className="text-gray-800 dark:text-gray-100 font-light">
                .Dev
              </span>
            </span>
          </Link>
        </div>

        {/* Навигация (desktop) */}
        <div className="hidden lg:flex lg:gap-x-10">
          {siteConfig.navLinks.map(({ label, href }) => (
            <NavLink key={href} href={href} label={label} />
          ))}
        </div>

        {/* Тема + меню */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-200/60 dark:hover:bg-gray-800/60 transition lg:hidden"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
            >
              <path
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* Мобильное меню */}
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity" />

        <Dialog.Panel className="fixed top-0 right-0 z-50 h-full w-4/5 max-w-xs bg-white/90 dark:bg-gray-900/90 p-6 sm:p-8 shadow-2xl backdrop-blur-md transition-all border-l border-white/20 dark:border-gray-800/30">
          <div className="flex items-center justify-between mb-6">
            <span className="text-base font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              {siteConfig.name}.Dev
            </span>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-200/60 dark:hover:bg-gray-800/60 transition"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
              >
                <path
                  d="M6 18 18 6M6 6l12 12"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          <nav className="flex flex-col mt-6 space-y-4">
            {siteConfig.navLinks.map(({ label, href }) => (
              <NavLink key={href} href={href} label={label} />
            ))}
          </nav>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
