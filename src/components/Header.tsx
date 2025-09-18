"use client";

import { useState } from "react";
import { Dialog } from "@headlessui/react";
import ThemeToggle from "./ThemeToggle";
import { Sparkles } from "lucide-react";
import { siteConfig } from "@/config/site";
import NavLink from "./NavLinks";
import Link from "next/link";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      className="fixed top-0 left-0 w-full z-50 
                 bg-white/70 dark:bg-gray-900/80 
                 backdrop-blur-md border-b 
                 border-gray-200/50 dark:border-gray-800/50"
    >
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between 
                   px-4 py-3 lg:px-8"
      >
        {/* Лого */}
        <div className="flex items-center lg:flex-1">
          <Link
            href="/"
            className="flex items-center gap-1 text-gray-800 dark:text-gray-100 font-semibold"
          >
            <Sparkles className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />
            <span className="text-sm sm:text-base tracking-wide">
              {siteConfig.name}
              <span className="text-indigo-500 dark:text-indigo-400">.Dev</span>
            </span>
          </Link>
        </div>

        {/* Кнопка для мобильного меню */}
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 rounded-md text-gray-600 dark:text-gray-300 
                       hover:bg-gray-200/60 dark:hover:bg-gray-800/60 transition"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
              className="w-6 h-6"
            >
              <path
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Десктопное меню */}
        <div className="hidden lg:flex lg:gap-x-8">
          {siteConfig.navLinks.map(({ label, href }) => (
            <NavLink key={href} href={href} label={label} />
          ))}
        </div>

        {/* Тема (dark/light toggle) */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <ThemeToggle />
        </div>
      </nav>

      {/* Мобильное меню */}
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        {/* Задний фон */}
        <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm" />

        {/* Панель меню */}
        <Dialog.Panel
          className="fixed top-0 right-0 z-50 h-full w-4/5 max-w-xs 
                     bg-white dark:bg-gray-900 p-5 shadow-xl"
        >
          {/* Заголовок меню */}
          <div className="flex items-center justify-between mb-6">
            <span className="text-base font-semibold text-gray-800 dark:text-gray-100">
              {siteConfig.name}.Dev
            </span>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-md text-gray-600 dark:text-gray-300 
                           hover:bg-gray-200/60 dark:hover:bg-gray-800/60 transition"
              >
                <span className="sr-only">Close menu</span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden="true"
                  className="w-5 h-5"
                >
                  <path
                    d="M6 18 18 6M6 6l12 12"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Навигация */}
          <nav className="flex flex-col space-y-3 mt-4">
            {siteConfig.navLinks.map(({ label, href }) => (
              <NavLink
                key={href}
                href={href}
                label={label}
                
              />
            ))}
          </nav>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
