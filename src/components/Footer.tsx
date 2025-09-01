import Link from "next/link";
import { Code2Icon } from "lucide-react";


export default function Footer() {
  return (
    <footer className="black:bg-white rounded-lg shadow-sm dark:bg-gray-900 m-4 mt-20">
    <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
            <Link 
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
            href="#">
                <Code2Icon className="w-10 h-10 text-gray-900 dark:text-white animate-pulse" />
                {/* <img src="/globe.svg" alt="Globe Icon" className="w-10 h-10 animate-pulse animate" /> */}

                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Portfolio</span>

            </Link>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                <li>
                    <Link
                    className="hover:underline me-4 md:me-6"
                    href="/about">
                    About
                    </Link>
                </li>
                <li>
                    <Link
                    className="hover:underline me-4 md:me-6"
                    href="#">
                    Privacy Policy
                    </Link>
                </li>
                <li>
                    <Link
                    className="hover:underline me-4 md:me-6"
                    href="#">
                    Licensing
                    </Link>
                </li>
                <li>
                    <Link
                    className="hover:underline"
                    href="/contact">
                    Contact
                    </Link>
                </li>
            </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2025 <a href="#" className="hover:underline">AkromRustamov™</a>. All Rights Reserved.</span>
    </div>
</footer>

    );
}
