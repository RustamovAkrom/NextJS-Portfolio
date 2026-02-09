"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { siteConfig } from "@/config/site";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition
        ${
          scrolled
            ? "bg-white/80 dark:bg-black/80 backdrop-blur border-b border-gray-200 dark:border-gray-800"
            : "bg-transparent"
        }
      `}
    >
      <div className="max-w-6xl mx-auto h-20 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white"
        >
          {siteConfig.name}
          <span className="text-gray-400 font-normal">.dev</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm">
          {siteConfig.navLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          <button
            onClick={() => setOpen(true)}
            className="md:hidden p-2 rounded-md border border-gray-200 dark:border-gray-800"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mobile */}
      {open && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50">
          <div className="absolute top-0 inset-x-0 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between h-16 px-4">
              <span className="font-semibold">
                {siteConfig.name}
                <span className="text-gray-400">.dev</span>
              </span>

              <button onClick={() => setOpen(false)} className="p-2">
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex flex-col px-4 pb-6">
              {siteConfig.navLinks.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="py-3 text-base text-gray-800 dark:text-gray-200"
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
