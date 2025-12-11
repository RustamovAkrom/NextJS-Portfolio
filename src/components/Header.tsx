"use client";

import { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import NavLink from "./NavLinks";
import { siteConfig } from "@/config/site";
import { Fragment } from "react";
import { motion } from "framer-motion";


export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav className="flex items-center justify-between px-4 py-3 lg:px-8 max-w-7xl mx-auto">
  {/* Logo */}
  <div className="flex lg:flex-1">
    <Link
      href="/"
      className="-m-1.5 p-1.5 group flex items-center gap-2.5 font-bold text-lg"
      aria-label={`${siteConfig.name} — Главная`}
    >
      <Sparkles className="w-6 h-6 text-indigo-600 dark:text-indigo-400 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12 animate-bounce-slow" />
      <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
        {siteConfig.name}
      </span>
      <span className="text-gray-900 dark:text-gray-100 font-extralight">
        .Dev
      </span>
    </Link>
  </div>

  {/* Desktop Navigation */}
  <div className="hidden lg:flex lg:gap-x-10 xl:gap-x-12">
    {siteConfig.navLinks.map(({ label, href }) => (
      <NavLink key={href} href={href} label={label} />
    ))}
  </div>

  {/* Right side: Theme + Mobile menu button */}
  <div className="flex items-center gap-3 lg:gap-4 flex-1 justify-end">
    <ThemeToggle />
    <button
      type="button"
      onClick={() => setMobileMenuOpen(true)}
      className="p-2.5 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100/80 dark:hover:bg-gray-800/80 transition-colors lg:hidden"
      aria-label="Открыть меню"
    >
      <Menu className="w-6 h-6" />
    </button>
  </div>
</nav>

{/* Mobile Menu */}
<Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="relative z-50 lg:hidden">
  <Transition.Child
    as={Fragment}
    enter="ease-out duration-300"
    enterFrom="opacity-0"
    enterTo="opacity-100"
    leave="ease-in duration-200"
    leaveFrom="opacity-100"
    leaveTo="opacity-0"
  >
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
  </Transition.Child>

  <div className="fixed inset-0 overflow-hidden">
    <div className="absolute inset-0 overflow-hidden">
      <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
        <Transition.Child
          as={Fragment}
          enter="transform transition ease-in-out duration-[400ms]"
          enterFrom="translate-x-full"
          enterTo="translate-x-0"
          leave="transform transition ease-in-out duration-300"
          leaveFrom="translate-x-0"
          leaveTo="translate-x-full"
        >
          <Dialog.Panel className="pointer-events-auto w-screen max-w-sm">
            <div className="flex h-full flex-col overflow-y-auto bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-2xl border-l border-white/20 dark:border-gray-800/50">
              {/* Header */}
              <div className="flex items-center justify-between px-6 pt-6 pb-4">
                <div className="flex items-center gap-2.5 font-bold text-lg">
                  <Sparkles className="w-6 h-6 text-indigo-600 dark:text-indigo-400 animate-bounce-slow" />
                  <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    {siteConfig.name}.Dev
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 rounded-lg hover:bg-gray-100/80 dark:hover:bg-gray-800/80 transition-colors"
                  aria-label="Закрыть меню"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Navigation Links with stagger */}
              <nav className="flex-1 px-6 py-8 space-y-6">
                {siteConfig.navLinks.map(({ label, href }, idx) => (
                  <motion.div
                    key={href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1, duration: 0.4 }}
                  >
                    <NavLink
                      href={href}
                      label={label}
                      className="block text-2xl font-medium text-gray-900 dark:text-gray-100 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    />
                  </motion.div>
                ))}
              </nav>

              {/* Footer */}
              <div className="border-t border-gray-200/50 dark:border-gray-800/50 px-6 py-6">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  © {new Date().getFullYear()} {siteConfig.name}. Все права защищены.
                </p>
              </div>
            </div>
          </Dialog.Panel>
        </Transition.Child>
      </div>
    </div>
  </div>
</Dialog>

    </header>
  );
}