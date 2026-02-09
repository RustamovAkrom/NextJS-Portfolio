"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { HomeContentType } from "@/types/home";

export default function Home() {
  const [content, setContent] = useState<HomeContentType | null>(null);
  const [image, setImage] = useState<string>("");

  useEffect(() => {
    fetch("/api/home")
      .then((res) => res.json())
      .then((data: HomeContentType[]) => {
        if (Array.isArray(data) && data.length > 0) {
          setContent(data[0]);
          if (data[0].images?.length) setImage(data[0].images[0]);
        }
      });
  }, []);

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading...
      </div>
    );
  }

  return (
    <main className="min-h-screen px-4 sm:px-6 lg:px-8 bg-white dark:bg-black">
      <section className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center min-h-screen py-16">
        
        {/* LEFT SIDE */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* Status */}
          <div className="inline-block px-4 py-1 rounded-full border text-sm text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700">
            Available for projects
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-gray-900 dark:text-white leading-tight">
            {content.title}
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-xl">
            {content.description}
          </p>

          {/* Actions */}
          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              href="/projects"
              className="px-6 py-3 rounded-md bg-black text-white dark:bg-white dark:text-black text-sm sm:text-base font-medium hover:opacity-90 transition"
            >
              Projects
            </Link>

            <Link
              href="/about"
              className="px-6 py-3 rounded-md border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 text-sm sm:text-base hover:bg-gray-100 dark:hover:bg-gray-900 transition"
            >
              About
            </Link>

            {content.resume && (
              <a
                href={content.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-md border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 text-sm sm:text-base hover:bg-gray-100 dark:hover:bg-gray-900 transition"
              >
                Resume
              </a>
            )}
          </div>
        </motion.div>

        {/* RIGHT SIDE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center md:justify-end"
        >
          {image && (
            <div className="relative w-52 sm:w-64 md:w-80 lg:w-96 h-52 sm:h-64 md:h-80 lg:h-96 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-sm">
              <Image
                src={image}
                alt="Profile"
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
        </motion.div>
      </section>
    </main>
  );
}
