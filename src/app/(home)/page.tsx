"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import ScrollDownButton from "@/components/ScrollDownButton";
import { HomeContentType } from "@/types/home";

export default function Home() {
  const [data, setData] = useState<HomeContentType[] | null>(null);

  useEffect(() => {
    fetch("/api/home")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("Ошибка загрузки:", err));
  }, []);

  if (!data?.length) {
    return <p className="text-center">Loading...</p>;
  }

  const content = data[0];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="bg-gray900 w-full text-black dark:text-white py-8 sm:py-12">
          <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center">
            
            {/* Текстовая часть */}
            <motion.div
              className="space-y-5 order-1 text-center md:text-left"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-balance">
                {content.title}
              </h1>

              <motion.p
                className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl font-medium text-pretty text-gray-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                viewport={{ once: true }}
              >
                {content.description}
              </motion.p>

              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3 sm:gap-x-5">
                <Link
                  href="/projects"
                  className="rounded-md bg-indigo px-4 py-2 text-sm font-semibold shadow hover:bg-indigo-400/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                  View Portfolio
                </Link>
                <Link
                  href={content.resume}
                  className="rounded-md bg-indigo px-4 py-2 text-sm font-semibold shadow hover:bg-indigo-400/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                  Download Resume
                </Link>
              </div>
            </motion.div>

            {/* Фото */}
            <motion.div
              className="flex justify-center md:justify-end items-center order-2"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="relative flex justify-center"
                whileHover={{ scale: 1.05, rotateY: 5, rotateX: -5 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                <Image
                  className="rounded-full w-44 h-44 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 object-cover shadow-lg cursor-pointer"
                  width={320}
                  height={320}
                  src={content.image}
                  alt="Akrom Rustamov profile photo"
                  priority
                />
              </motion.div>
            </motion.div>
          </div>
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
