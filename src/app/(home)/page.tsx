"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import ScrollDownButton from "@/components/ScrollDownButton";

import { HomeContentType } from "@/types/home";

export default function Home() {
  const [data, setData] = useState<HomeContentType[] | null>(null);
  const [randomImage, setRandomImage] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/home")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        // Выбираем рандомное изображение из API
        if (json.length && json[0].images?.length) {
          const imgs = json[0].images;
          const idx = Math.floor(Math.random() * imgs.length);
          setRandomImage(imgs[idx]);
        }
      })
      .catch((err) => console.error("Ошибка загрузки:", err));
  }, []);

  if (!data?.length || !randomImage) {
    return <p className="text-center mt-20">Loading...</p>;
  }

  const content = data[0];

  return (
    <div className="">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center px-4 sm:px-6 lg:px-8">

          {/* Текстовая часть */}
          <motion.div
            className="space-y-5 text-center md:text-left max-w-xl mx-auto md:mx-0"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 dark:text-white leading-snug text-balance"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              {content.title}
            </motion.h1>

            <motion.p
              className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl font-medium text-gray-600 dark:text-gray-300 leading-relaxed text-balance"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              {content.description}
            </motion.p>

            {/* Кнопки */}
            <motion.div
              className="mt-6 sm:mt-8 flex flex-wrap justify-center md:justify-start gap-3 sm:gap-x-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              {/* Зеленая кнопка */}
              <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 200 }}>
                <Link
                  href="/projects"
                  className="rounded-md bg-blue-600/20 dark:bg-blue-600/30 px-5 py-2 text-sm sm:text-base font-semibold text-blue-800 dark:text-white shadow-md hover:bg-blue-500/80 hover:shadow-lg transition-all duration-300 whitespace-nowrap"
                >
                  View Portfolio
                </Link>
              </motion.div>

              {/* Белая кнопка */}
              <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 200 }}>
                <Link
                  href={content.resume}
                  className="rounded-md bg-white-600/20 dark:bg-white/20 px-5 py-2 text-sm sm:text-base font-semibold text-dark-800 dark:text-dark-900 shadow-md hover:bg-white/80 dark:hover:bg-gray-200/80 hover:shadow-lg transition-all duration-300 whitespace-nowrap"
                >
                  Download Resume
                </Link>
              </motion.div>

              {/* Синяя кнопка */}
              <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 200 }}>
                <Link
                  href="/about"
                  className="rounded-md bg-green-600/20 dark:bg-green-600/30 px-5 py-2 text-sm sm:text-base font-semibold text-green-800 dark:text-white shadow-md hover:bg-green-500/80 hover:shadow-lg transition-all duration-300 whitespace-nowrap"
                >
                  About Me
                </Link>
              </motion.div>
            </motion.div>

          </motion.div>

          {/* Фото */}
          <motion.div
            className="flex justify-center md:justify-end items-center relative"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            {/* Glow effect */}
            <motion.div
              className="absolute rounded-full w-44 h-44 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 bg-indigo-500/30 dark:bg-indigo-400/30 blur-2xl"
              animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            />

            {/* Image with fade and tilt */}
            <AnimatePresence>
              <motion.div
                key={randomImage}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.8 }}
                className="relative flex justify-center"
                whileHover={{ scale: 1.05, rotateY: 5, rotateX: -5 }}
              >
                <Image
                  className="rounded-full w-44 h-44 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 object-cover shadow-lg cursor-pointer relative z-10"
                  width={320}
                  height={320}
                  src={randomImage}
                  alt="Random Hero"
                  priority
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>

        </div>

        {/* Scroll Down */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center">
          <ScrollDownButton />
        </div>
      </section>

      {/* Favorite Platforms */}
      <section className="py-20 relative">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            My Favorite Platforms
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 w-full">
            {content.links.map((link, idx) => (
              <motion.a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="relative p-6 flex flex-col items-center justify-center gap-3
                  border border-white/20 dark:border-black/20
                  bg-white/10 dark:bg-black/10
                  backdrop-blur-xl shadow-lg
                  transition-all duration-300 hover:shadow-2xl hover:border-white/40 dark:hover:border-black/40
                  group"
              >
                <div
                  className={`absolute inset-0 rounded-md bg-gradient-to-br ${link.color} opacity-0 group-hover:opacity-50 blur-2xl transition-all duration-500 pointer-events-none`}
                />
                <div className="relative z-10 text-primary">{link.icon}</div>
                <p className="relative z-10 font-medium">{link.name}</p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>


      {/* Mention Section */}
      <div className="max-w-4xl mx-auto px-4 pb-14 text-center">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent mb-6" />
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Do you want to know {" "}
          <Link
            href="/about"
            className="text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            About Me?
          </Link>
          . So let`s move on...
        </p>
      </div>
    </div>
  );
}
