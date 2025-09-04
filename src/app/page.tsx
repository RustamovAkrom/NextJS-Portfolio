"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import ScrollDownButton from "@/components/ScrollDownButton";

interface Link {
  name: string;
  url: string;
  icon: React.ReactNode;
  color: string;
}

interface Stat {
  id: number;
  name: string;
  value: number | string;
}

interface HomeContent {
  title: string;
  description: string;
  resume: string;
  image: string;
  links: Link[];
  stats: Stat[];
}


export default function Home() {
  const [data, setData] = useState<HomeContent[] | null>(null);

  useEffect(() => {
    fetch("/api/home") // твой API
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("Ошибка загрузки:", err));
  }, []);

  if (!data || data.length === 0) {
    return <p className="text-center">Loading...</p>;
  }

  const content = data[0]; // теперь точно есть

  if (!data) return <p className="text-center">Loading...</p>;

  return (
    <div>
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="bg-gray900 w-full text-black dark:text-white py-8 sm:py-12">
          <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center">

            {/* Левая часть - текст */}
            <motion.div
              className="space-y-5 order-1 text-center md:text-left"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-balance black:text-white">
                  {content.title}
                </h1>

                <motion.p
                  className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl font-medium text-pretty text-gray-400"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  {content.description}
                </motion.p>

                <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3 sm:gap-x-5">
                  <Link
                    href="/projects"
                    className="rounded-md bg-indigo px-4 py-2 text-sm font-semibold black:text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                  >
                    Go To Portfolio <span aria-hidden="true">→</span>
                  </Link>
                  <Link
                    href={content.resume}
                    className="text-sm font-semibold black:text-white bg-transform hover:text-indigo-400"
                  >
                    Download CV <span aria-hidden="true">⇲</span>
                  </Link>
                </div>
              </motion.div>
            </motion.div>

            {/* Правая часть - фото */}
            <motion.div
              className="flex justify-center md:justify-end items-center order-2"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <div
                className="relative flex justify-center"
                onMouseMove={e => {
                  const img = e.currentTarget.querySelector('img');
                  if (!img) return;
                  const rect = img.getBoundingClientRect();
                  const x = e.clientX - rect.left - rect.width / 2;
                  const y = e.clientY - rect.top - rect.height / 2;
                  const rotateY = (x / (rect.width / 2)) * 10;
                  const rotateX = -(y / (rect.height / 2)) * 10;
                  img.style.transform = `perspective(800px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(1.2)`;
                }}
                onMouseLeave={e => {
                  const img = e.currentTarget.querySelector('img');
                  if (!img) return;
                  img.style.transform = `perspective(800px) rotateY(0deg) rotateX(0deg) scale(1)`;
                }}
              >
                <Image
                  className="rounded-full w-44 h-44 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 object-cover shadow-lg cursor-pointer"
                  width={320}
                  height={320}
                  src={content.image}
                  alt="Akrom Rustamov"
                  priority
                  style={{
                    transform: 'perspective(800px) rotateY(0deg) rotateX(0deg) scale(1)',
                    transition: 'transform 0.2s'
                  }}
                />
              </div>
            </motion.div>

          </div>
        </div>

        {/* Follow me + Scroll Down */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center">
          <ScrollDownButton />
        </div>
      </section>



      <section className="py-20 relative">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            My Favorite Platforms
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
            {content.links.map((link: Link, idx: number) => (
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
                {/* Анимация свечения вокруг иконки */}
                <div className="absolute inset-0 rounded-md bg-gradient-to-br from-indigo-400 via-pink-400 to-purple-400 opacity-0 group-hover:opacity-50 blur-2xl transition-all duration-500 pointer-events-none" />

                <div className="relative z-10 text-primary">{link.icon}</div>
                <p className="relative z-10 font-medium">{link.name}</p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
