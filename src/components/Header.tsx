"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { siteConfig } from "@/config/site";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header
      className="
        fixed inset-x-0 top-0 z-50
        bg-white/0 dark:bg-black/0
        md:bg-white/30 md:dark:bg-black/30 md:backdrop-blur
        border-b border-gray-200/30 dark:border-gray-800/30
      "
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between h-20 px-4">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
          {siteConfig.name}
          <span className="ml-1 text-gray-400 font-light">.dev</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {siteConfig.navLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="
                relative text-gray-700 dark:text-gray-300
                hover:text-black dark:hover:text-white
                after:absolute after:left-0 after:-bottom-1
                after:h-px after:w-0 after:bg-current
                after:transition-all hover:after:w-full
              "
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setOpen(true)}
            className="md:hidden p-1.5 rounded-md"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/40">
          <div
            className="
              absolute top-0 inset-x-0
              bg-white/90 dark:bg-black/90 backdrop-blur
              border-b border-gray-200/30 dark:border-gray-800/30
            "
          >
            <div className="flex items-center justify-between h-12 px-4">
              <span className="text-sm font-semibold">
                {siteConfig.name}
                <span className="font-light text-gray-400">.dev</span>
              </span>
              <button onClick={() => setOpen(false)} className="p-1.5">
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex flex-col px-4 pb-4">
              {siteConfig.navLinks.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="
                    py-3 text-sm font-medium
                    text-gray-800 dark:text-gray-200
                    border-b border-gray-200/30 dark:border-gray-800/30
                  "
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
