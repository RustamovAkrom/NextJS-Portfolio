"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import ScrollDownButton from "@/components/ScrollDownButton";



export default function Home() {
  const [data, setData] = useState<any[] | null>(null);

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
      <section className="relative min-h-screen flex items-center justify-center">
        <div className="bg-gray900 w-full text-black dark:text-white p-6">
          <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

            <motion.div
              className="space-y-6 order-2 md:order-1 text-center md:text-left"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <div className="mb-4">
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-balance black:text-white">
                    {content.title}
                  </h1>

                  <motion.p
                    className="mt-6 sm:mt-8 text-base sm:text-lg md:text-xl font-medium text-pretty text-gray-400"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                  >
                    {content.description}
                  </motion.p>

                  <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 sm:gap-x-6">
                    <Link
                      href="/projects"
                      className="rounded-md bg-transform px-4 py-2.5 text-sm font-semibold black:text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                    >
                      Go To Portfolio <span aria-hidden="true">➡️</span>
                    </Link>
                    <Link
                      href="#" className="text-sm font-semibold black:text-white bg-transform hover:text-indigo-400"
                    >
                      Download CV <span aria-hidden="true">🔽</span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Правая часть - фото */}
            <motion.div
              className="flex justify-center md:justify-end items-center lg:pl-8 order-1 md:order-2"
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
                  className="rounded-full w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 object-cover shadow-lg animate-pulse cursor-pointer"
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
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center">
          <ScrollDownButton />
        </div>
      </section>


      <section className="py-20 relative">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            My Favorite Platforms
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {content.links.map((link: any, idx: number) => (
              <motion.a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.08, rotate: 1 }}
                whileTap={{ scale: 0.96 }}
                className={`relative rounded-2xl p-6 flex flex-col items-center justify-center gap-3 
                bg-white/20 dark:bg-black/20 backdrop-blur-xl shadow-lg border 
                border-white/30 dark:border-gray-700/40 transition-all duration-300 
                hover:shadow-[0_0_25px_rgba(0,0,0,0.2)] group`}
              >
                {/* Свечение при наведении */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${link.color} opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500`}
                />

                {/* Контент */}
                <div className="relative z-10 text-primary">{link.icon}</div>
                <p className="relative z-10 font-medium">{link.name}</p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 relative">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16">
            My Achievements
          </h2>

          <dl className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 text-center">
            {content.stats.map((stat: any, idx: number) => (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="relative mx-auto flex max-w-xs flex-col gap-y-3 p-6 rounded-2xl 
                bg-white/20 dark:bg-black/30 backdrop-blur-xl shadow-lg border 
                border-white/30 dark:border-gray-800/40 transition-all duration-500 group"
              >
                {/* Аура при наведении */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 blur-2xl transition-all duration-700" />

                <dd className="order-first text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight relative z-10">
                  {stat.value}
                </dd>
                <dt className="text-sm sm:text-base text-gray-600 dark:text-gray-300 relative z-10">
                  {stat.name}
                </dt>
              </motion.div>
            ))}
          </dl>
        </div>
      </section>

    </div>
  );
}
