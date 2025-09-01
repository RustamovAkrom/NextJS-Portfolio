// app/not-found.tsx
"use client"; // если есть интерактивность на клиенте

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <main className="grid min-h-full place-items-center bg-transform px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold black:text-indigo-400">404</p>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance black:text-white sm:text-7xl">
            Page not found
          </h1>
          <p className="mt-6 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
                  <Link
                    href="/"
                    className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold black:text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                    Go back home
                </Link>
                  <Link
                    href="/contact"
                    className="text-sm font-semibold black:text-white"
                >
                    Contact support <span aria-hidden="true">&rarr;</span>
                </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
