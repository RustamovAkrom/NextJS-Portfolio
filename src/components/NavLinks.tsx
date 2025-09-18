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
        "relative text-sm font-medium transition px-1",
        "text-gray-700 dark:text-gray-200 hover:text-indigo-500 dark:hover:text-indigo-400",
        isActive &&
          "text-indigo-600 dark:text-indigo-400 font-semibold after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-indigo-500 after:rounded-full"
      )}
    >
      {label}
    </Link>
  );
}
