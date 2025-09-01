import Link from "next/link";
import { Code2Icon } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-screen-xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        
        <Link 
          href="/"
          className="flex items-center space-x-2 rtl:space-x-reverse text-gray-900 dark:text-white"
        >
          <Code2Icon className="w-8 h-8 text-gray-900 dark:text-white animate-pulse" />
          <span className="text-lg font-semibold">Portfolio</span>
        </Link>

        <ul className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 justify-center sm:justify-end">
          <li>
            <Link href="/about" className="hover:underline">About</Link>
          </li>
          <li>
            <Link href="https://rustamovakrom.github.io/NextJS-Portfolio/docs/privacy_policy.html" className="hover:underline">Privacy Policy</Link>
          </li>
          <li>
            <Link href="https://rustamovakrom.github.io/NextJS-Portfolio/docs/licencing.html" className="hover:underline">Licensing</Link>
          </li>
          <li>
            <Link href="/contact" className="hover:underline">Contact</Link>
          </li>
        </ul>
      </div>

      <div className="text-center text-sm text-gray-500 dark:text-gray-400 py-2">
        © 2025 <a href="#" className="hover:underline">AkromRustamov™</a>. All Rights Reserved.
      </div>
    </footer>
  );
}
