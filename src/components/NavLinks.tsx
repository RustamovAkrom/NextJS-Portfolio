"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

interface NavLinkProps {
  href: string;
  label: string;
}

export default function NavLink({ href, label }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={clsx(
        "relative px-2 py-1 text-sm font-medium tracking-wide transition-colors duration-300",
        "text-gray-700 dark:text-gray-200 hover:text-indigo-500 dark:hover:text-indigo-400",
        "after:absolute after:left-1/2 after:-bottom-[2px] after:h-[2px] after:w-0 after:-translate-x-1/2 after:rounded-full after:bg-gradient-to-r after:from-indigo-500 after:to-purple-500 after:transition-all after:duration-300 hover:after:w-full",
        isActive &&
          "text-indigo-600 dark:text-indigo-400 after:w-full after:from-indigo-500 after:to-purple-500"
      )}
    >
      {label}
    </Link>
  );
}
