"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import ScrollDownButton from "@/components/ScrollDownButton";
import { HomeContentType } from "@/types/home";

export default function Home() {
  const [content, setContent] = useState<HomeContentType | null>(null);
  const [randomImage, setRandomImage] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/home")
      .then((res) => res.json())
      .then((json) => {
        if (json?.length) {
          const home = json[0];
          setContent(home);
          if (home.images?.length) {
            const idx = Math.floor(Math.random() * home.images.length);
            setRandomImage(home.images[idx]);
          }
        }
      })
      .catch((err) => console.error("Ошибка загрузки:", err));
  }, []);

  if (!content || !randomImage)
    return <p className="text-center mt-20 text-gray-500">Loading...</p>;

  return (
    <main>
      {/* === Hero Section === */}
      <section className="relative min-h-screen flex flex-col justify-center items-center md:flex-row max-w-7xl mx-auto px-6 sm:px-8 gap-10">
        {/* Текст */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-xl text-center md:text-left space-y-6"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
            {content.title}
          </h1>

          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            {content.description}
          </p>

          {/* Кнопки */}
          <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-6">
            {[
              {
                href: "/projects",
                text: "View Portfolio",
                color:
                  "bg-blue-600/20 dark:bg-blue-600/30 text-blue-800 dark:text-white hover:bg-blue-500/80",
              },
              {
                href: content.resume,
                text: "Download Resume",
                color:
                  "bg-gray-200/40 dark:bg-gray-700/30 text-gray-900 dark:text-white hover:bg-gray-300/70 dark:hover:bg-gray-600/50",
              },
              {
                href: "/about",
                text: "About Me",
                color:
                  "bg-green-600/20 dark:bg-green-600/30 text-green-800 dark:text-white hover:bg-green-500/80",
              },
            ].map(({ href, text, color }) => (
              <motion.div key={href} whileHover={{ scale: 1.05 }}>
                <Link
                  href={href}
                  className={`px-5 py-2 rounded-md font-semibold text-sm sm:text-base shadow-md hover:shadow-lg transition-all duration-300 ${color}`}
                >
                  {text}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Фото */}
        <motion.div
          className="relative flex justify-center md:justify-end"
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Glow effect */}
          <motion.div
            className="absolute w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-full 
                      bg-indigo-500/30 dark:bg-indigo-400/30 blur-2xl"
            animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={randomImage}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8 }}
              whileHover={{ scale: 1.05, rotateY: 5, rotateX: -5 }}
              whileTap={{ scale: 0.97 }}
              className="relative z-10"
            >
              <Image
                src={randomImage}
                alt="Hero Image"
                width={320}
                height={320}
                priority
                className="rounded-full object-cover w-44 h-44 sm:w-56 sm:h-56 md:w-72 md:h-72 shadow-lg cursor-pointer"
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <ScrollDownButton />
        </div>
      </section>

      {/* === Favorite Platforms === */}
      <section className="py-20 px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          My Favorite Platforms
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {content.links.map((link, idx) => (
            <motion.a
              key={idx}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="relative p-6 flex flex-col items-center gap-3 border border-gray-300/20 dark:border-gray-700/20 bg-white/10 dark:bg-black/10 backdrop-blur-xl rounded-lg shadow-lg group hover:shadow-2xl transition-all duration-300"
            >
              <div
                className={`absolute inset-0 rounded-lg bg-gradient-to-br ${link.color} opacity-0 group-hover:opacity-50 blur-2xl transition-all`}
              />
              <div className="relative z-10">{link.icon}</div>
              <p className="relative z-10 font-medium">{link.name}</p>
            </motion.a>
          ))}
        </div>
      </section>

      {/* === Mention === */}
      <footer className="max-w-4xl mx-auto px-4 pb-16 text-center">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent mb-6" />
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Want to know more{" "}
          <Link
            href="/about"
            className="text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            about me
          </Link>
          ? Let’s move on!
        </p>
      </footer>
    </main>
  );
}
