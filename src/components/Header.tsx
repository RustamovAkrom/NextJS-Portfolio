'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogPanel,
} from '@headlessui/react'
import ThemeToggle from './ThemeToggle'
import Link from 'next/link'
import { Code2Icon } from 'lucide-react'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (

    <header
      className="fixed top-0 left-0 w-full z-50 
    bg-white/70 dark:bg-gray-900/900 
    backdrop-blur-md shadow-sm border-b border-gray-200/50 dark:border-gray-800/50
    transition-colors duration-300"
    >
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      >
        <div className="flex lg:flex-1 items-center">
          <Link href="/" className="flex items-center gap-3">
            <span className="text-1xl font-bold text-gray-900 dark:text-white tracking-wide">
              Akrom.R
            </span>
            <Code2Icon className="w-10 h-10 text-gray-900 dark:text-white animate-pulse" />

            {/* Текст рядом */}
            <span className="text-1xl font-bold text-gray-900 dark:text-white tracking-wide">
              Dev
            </span>
          </Link>
        </div>


        {/* Mobile button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 
          text-gray-600 hover:bg-gray-200/60 
          dark:text-gray-300 dark:hover:bg-gray-800/60 
          transition"
          >
            <span className="sr-only">Open main menu</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" data-slot="icon" aria-hidden="true" className="size-6">
              <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <div className="hidden lg:flex lg:gap-x-12">
          <Link
            href="/"
            prefetch={true}
            className="text-sm font-semibold text-gray-800 dark:text-gray-100 className="
          >Home</Link>
          <Link
            href="/about"
            prefetch={true}
            className="text-sm font-semibold text-gray-800 dark:text-gray-100 className="
          >About</Link>
          <Link
            href="/skills"
            prefetch={true}
            className="text-sm font-semibold text-gray-800 dark:text-gray-100 className="
          >Skills</Link>
          <Link
            href="/projects"
            prefetch={true}
            className="text-sm font-semibold text-gray-800 dark:text-gray-100 className="
          >Portfolio</Link>
          <Link
            href="/contact"
            prefetch={true}
            className="text-sm font-semibold text-gray-800 dark:text-gray-100 className="
          >Contact</Link>
          {/* <Link
            href="/blog"
            prefetch={true}
            className="text-sm font-semibold text-gray-800 dark:text-gray-100 className="
          >Blog</Link> */}
        </div>

        {/* Theme Button */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <ThemeToggle />
        </div>
      </nav>

      {/* Mobile menu */}
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-50" />
        <DialogPanel
          className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto 
        bg-white/80 dark:bg-gray-900/90 backdrop-blur-md 
        p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-200/50 dark:sm:ring-white/10"
        >
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <span className="text-1xl font-bold text-gray-900 dark:text-white tracking-wide">
                Akrom.R
              </span>
              {/* Лого */}
              {/* <Image
                src="/globe.svg"
                width={50}
                height={50}
                alt="Portfolio Logo"
                className="h-9 w-9 animate-pulse animate"
              /> */}
              <Code2Icon className="w-10 h-10 text-gray-900 dark:text-white animate-pulse" />
              {/* Текст рядом */}
              <span className="text-1xl font-bold text-gray-900 dark:text-white tracking-wide">
                Dev
              </span>
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-600 hover:bg-gray-200/50 
            dark:text-gray-300 dark:hover:bg-gray-800/60 transition"
            >
              <span className="sr-only">Close menu</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" data-slot="icon" aria-hidden="true" className="size-6">
                <path d="M6 18 18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-200/50 dark:divide-white/10">
              <div className="space-y-2 py-6">
                <Link href="/"
                  prefetch={true}
                  className='-mx-3 block rounded-lg px-3 py-2 text-base font-semibold 
                text-gray-800 dark:text-white 
                hover:bg-gray-100/60 dark:hover:bg-white/5 transition'>Home</Link>
                <Link href="/about"
                  prefetch={true}
                  className='-mx-3 block rounded-lg px-3 py-2 text-base font-semibold 
                text-gray-800 dark:text-white 
                hover:bg-gray-100/60 dark:hover:bg-white/5 transition'>About</Link>
                <Link href="/skills"
                  prefetch={true}
                  className='-mx-3 block rounded-lg px-3 py-2 text-base font-semibold 
                text-gray-800 dark:text-white 
                hover:bg-gray-100/60 dark:hover:bg-white/5 transition'>Skills</Link>
                <Link href="/projects"
                  prefetch={true}
                  className='-mx-3 block rounded-lg px-3 py-2 text-base font-semibold 
                text-gray-800 dark:text-white 
                hover:bg-gray-100/60 dark:hover:bg-white/5 transition'>Portfolio</Link>
                <Link href="/contact"
                  prefetch={true}
                  className='-mx-3 block rounded-lg px-3 py-2 text-base font-semibold 
                text-gray-800 dark:text-white 
                hover:bg-gray-100/60 dark:hover:bg-white/5 transition'>Contact</Link>
                {/* <Link href="/blog"
                  prefetch={true}
                  className='-mx-3 block rounded-lg px-3 py-2 text-base font-semibold 
                text-gray-800 dark:text-white 
                hover:bg-gray-100/60 dark:hover:bg-white/5 transition'>Blog</Link> */}
              </div>

              <div className="py-6">
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold 
                text-gray-800 dark:text-white 
                hover:bg-gray-100/60 dark:hover:bg-white/5 transition"
                >
                  <ThemeToggle />
                </a>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}
