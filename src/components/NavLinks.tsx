"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

interface NavLinkProps {
  href: string;
  label: string;
  className?: string;
  onClick?: () => void;
}

export default function NavLink({
  href,
  label,
  className,
  onClick,
}: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      prefetch={true} // Предзагрузка при наведении — мгновенные переходы
      onClick={onClick}
      aria-current={isActive ? "page" : undefined}
      className={clsx(
        "group relative inline-flex items-center px-3 py-2 text-sm font-medium transition-all duration-300",
        "text-gray-600 dark:text-gray-300",
        "hover:text-indigo-600 dark:hover:text-indigo-400",
        isActive && "text-indigo-600 dark:text-indigo-400 font-semibold",
        className
      )}
    >
      <span className="relative z-10">{label}</span>

      {/* Анимированная подчёркивающая полоска */}
      <span
        className={clsx(
          "absolute left-0 bottom-0 h-0.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500 ease-out",
          "origin-left",
          isActive
            ? "w-full opacity-100"
            : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100"
        )}
      />
      
      {/* Тонкая точка при активном состоянии (тренд 2025) */}
      {isActive && (
        <span className="absolute -left-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-indigo-500 opacity-80" />
      )}
    </Link>
  );
}