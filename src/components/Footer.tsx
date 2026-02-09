"use client";

import Link from "next/link";
import { Github, Linkedin, Mail, Instagram } from "lucide-react";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";

export default function Footer() {
  const pathname = usePathname();

  return (
    <footer className="bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid md:grid-cols-3 gap-10">
        
        {/* Brand */}
        <div className="space-y-4">
          <Link
            href="/"
            className="text-xl font-semibold text-gray-900 dark:text-white"
          >
            {siteConfig.name}
            <span className="text-gray-400 font-normal">.dev</span>
          </Link>

          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed max-w-sm">
            Backend Python engineer focused on APIs, architecture and AI-driven
            products. Building systems for startups and scalable platforms.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
            Navigation
          </h3>

          <ul className="space-y-2">
            {siteConfig.footerLinks.map(({ label, href }) => {
              const isActive = pathname === href;

              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`text-sm transition ${
                      isActive
                        ? "text-gray-900 dark:text-white font-medium"
                        : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
            Connect
          </h3>

          <div className="flex gap-4">
            <Link
              href="https://github.com/RustamovAkrom"
              target="_blank"
              className="p-2 rounded-md border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 transition"
            >
              <Github className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </Link>

            <Link
              href="https://www.linkedin.com/in/akrom-rustamov-255b372b7/"
              target="_blank"
              className="p-2 rounded-md border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 transition"
            >
              <Linkedin className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </Link>

            <Link
              href="mailto:rustamovakromjon327@gmail.com"
              className="p-2 rounded-md border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 transition"
            >
              <Mail className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </Link>

            <Link
              href="https://www.instagram.com/rustamovakromjon327/"
              target="_blank"
              className="p-2 rounded-md border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 transition"
            >
              <Instagram className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="text-center text-xs text-gray-500 dark:text-gray-400 py-6 border-t border-gray-200 dark:border-gray-800">
        © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
      </div>
    </footer>
  );
}
