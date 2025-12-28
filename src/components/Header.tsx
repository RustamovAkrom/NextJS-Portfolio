"use client";

import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import NavLink from "./NavLinks";
import { siteConfig } from "@/config/site";
import { motion } from "framer-motion";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-sm border-b border-gray-200/40 dark:border-gray-800/40">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        
        {/* Logo */}
        <Link
          href="/"
          className="text-lg sm:text-xl font-semibold tracking-tight text-gray-900 dark:text-white"
          aria-label={`${siteConfig.name} home`}
        >
          {siteConfig.name}
          <span className="font-light text-gray-400">.dev</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-6">
          {siteConfig.navLinks.map(({ label, href }) => (
            <NavLink key={href} href={href} label={label} />
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <Transition.Child
          as={Fragment}
          enter="transition-opacity duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40" />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="transition-transform duration-300 ease-out"
          enterFrom="translate-x-full"
          enterTo="translate-x-0"
          leave="transition-transform duration-200 ease-in"
          leaveFrom="translate-x-0"
          leaveTo="translate-x-full"
        >
          <Dialog.Panel className="fixed right-0 top-0 h-full w-full max-w-sm bg-white dark:bg-black p-5 sm:p-6">
            
            {/* Mobile header */}
            <div className="flex items-center justify-between mb-8 sm:mb-10">
              <span className="text-lg sm:text-xl font-semibold">
                {siteConfig.name}
                <span className="font-light text-gray-400">.dev</span>
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* Links */}
            <nav className="space-y-5 sm:space-y-6">
              {siteConfig.navLinks.map(({ label, href }, idx) => (
                <motion.div
                  key={href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.06 }}
                >
                  <NavLink
                    href={href}
                    label={label}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-xl sm:text-2xl font-medium text-gray-900 dark:text-white"
                  />
                </motion.div>
              ))}
            </nav>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </header>
  );
}
