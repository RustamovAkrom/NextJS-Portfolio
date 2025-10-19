"use client";

import Link from "next/link";
import { Sparkles, Github, Linkedin, Mail, Instagram } from "lucide-react";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";

export default function Footer() {
  const pathname = usePathname();

  return (
    <footer className="relative bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border-t border-transparent shadow-inner">
      {/* Верхняя градиентная линия */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500" />

      {/* Основной контент футера */}
      <div className="max-w-screen-xl mx-auto px-6 py-14 grid md:grid-cols-3 gap-10 text-center md:text-left">
        
        {/* Блок About */}
        <div>
          <Link
            href="/"
            className="group flex items-center justify-center md:justify-start gap-2 font-semibold text-gray-800 dark:text-gray-100 mb-3"
          >
            <Sparkles className="w-5 h-5 text-indigo-500 dark:text-indigo-400 group-hover:scale-110 transition-transform" />
            <span className="text-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 bg-clip-text text-transparent group-hover:opacity-90 transition">
              {siteConfig.name}
              <span className="text-gray-700 dark:text-gray-300 font-light">.Dev</span>
            </span>
          </Link>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            Creating powerful, elegant, and user-focused digital experiences.  
            Full-stack developer passionate about design, performance, and AI.
          </p>
        </div>

        {/* Навигация */}
        <div>
          <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-3 text-lg">
            Quick Links
          </h3>
          <ul className="flex flex-col gap-2">
            {siteConfig.footerLinks.map(({ label, href }) => {
              const isActive = pathname === href;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`transition-all duration-200 ${
                      isActive
                        ? "text-indigo-500 dark:text-indigo-400 font-medium"
                        : "text-gray-500 dark:text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400"
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Соцсети */}
        <div>
          <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-3 text-lg">
            Connect
          </h3>
          <div className="flex justify-center md:justify-start gap-4">
            <Link href="https://github.com/RustamovAkrom" target="_blank">
              <Github className="w-5 h-5 text-gray-600 dark:text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-transform hover:scale-110" />
            </Link>
            <Link href="https://www.linkedin.com/in/akrom-rustamov-255b372b7/" target="_blank">
              <Linkedin className="w-5 h-5 text-gray-600 dark:text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-transform hover:scale-110" />
            </Link>
            <Link href="mailto:rustamovakromjon327@gmail.com">
              <Mail className="w-5 h-5 text-gray-600 dark:text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-transform hover:scale-110" />
            </Link>
            <Link href="https://www.instagram.com/rustamovakromjon327/" target="_blank">
              <Instagram className="w-5 h-5 text-gray-600 dark:text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-transform hover:scale-110" />
            </Link>
          </div>
        </div>
      </div>

      {/* Нижняя полоса */}
      <div className="text-center text-xs text-gray-500 dark:text-gray-400 py-6 border-t border-gray-200/30 dark:border-gray-800/30">
        © {new Date().getFullYear()}{" "}
        <span className="font-medium bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 bg-clip-text text-transparent hover:opacity-80 transition">
          Akrom Rustamov
        </span>{" "}
        — All Rights Reserved.
      </div>
    </footer>
  );
}
