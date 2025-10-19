"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { AboutContentType, TimelineItemType, LinkType, StatType } from "@/types/about";
import ScrollDownButton from "@/components/ScrollDownButton";

function MyJourneySection({
  timeline,
  filters,
}: {
  timeline: TimelineItemType[];
  filters: string[];
}) {
  const [filter, setFilter] = useState("all");
  const filteredTimeline =
    filter === "all" ? timeline : timeline.filter((item) => item.type === filter);

  return (
    <section className="relative py-28 overflow-hidden bg-gradient-to-b from-gray-100/30 to-white dark:from-gray-900/50 dark:to-black">
      {/* Мягкий фон */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.07),transparent_70%)] blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-6 sm:px-8">
        {/* Заголовок */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            My Journey
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-3 text-base max-w-xl mx-auto">
            A timeline of my professional growth and education.
          </p>
        </motion.div>

        {/* Фильтры */}
        <div className="flex justify-center gap-3 mb-12 flex-wrap">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`capitalize px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                filter === f
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md"
                  : "bg-transparent border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-100/20 dark:hover:bg-gray-800/40"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Таймлайн */}
        <div className="space-y-10">
          {filteredTimeline.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="relative flex flex-col sm:flex-row gap-6 sm:gap-10 items-start sm:items-center group"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white shadow-lg">
                {item.icon}
              </div>

              <div className="flex-1 bg-white/70 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm group-hover:shadow-lg transition-all">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {item.role}
                </h3>
                <span className="text-xs font-medium text-indigo-500">{item.period}</span>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1 font-medium">
                  {item.company}
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-sm mt-2 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function AboutPage() {
  const [data, setData] = useState<AboutContentType[] | null>(null);

  useEffect(() => {
    fetch("/api/about")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error("Error fetching about data:", err));
  }, []);

  if (!data || data.length === 0) {
    return <p className="text-center mt-20 text-gray-500">Loading...</p>;
  }

  const content = data[0];

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-white via-gray-50 to-gray-100 dark:from-black dark:via-gray-950 dark:to-gray-900 mt-20">
      {/* === Hero === */}
      <section className="relative py-28 sm:py-36">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(59,130,246,0.1),_transparent_70%)] blur-2xl" />

        <div className="relative max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          {/* Фото */}
          <motion.div
            initial={{ rotate: -5, opacity: 0 }}
            whileInView={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-3xl overflow-hidden shadow-2xl border border-white/20 backdrop-blur-md"
            >
              <Image src={content.image} alt={content.alt} fill className="object-cover" />
            </motion.div>
          </motion.div>

          {/* Ссылки */}
          <div className="grid sm:grid-cols-2 gap-5">
            {content.links.map((link: LinkType, idx: number) => (
              <motion.a
                key={idx}
                href={link.href}
                whileHover={{ scale: 1.05, y: -3 }}
                className="block rounded-xl bg-gradient-to-br from-white/40 to-white/10 dark:from-gray-800/40 dark:to-gray-900/30 backdrop-blur-lg border border-gray-200/30 dark:border-gray-700/40 p-5 shadow-sm hover:shadow-md transition-all"
              >
                <h3 className="text-base font-semibold mb-1 text-gray-900 dark:text-white">
                  {link.name}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-xs">
                  Learn more about {link.name.toLowerCase()}.
                </p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

        
      {/* === Smooth Transition === */}
      <div className="h-32 bg-gradient-to-b from-gray-50/0 via-gray-100/50 to-gray-100 dark:from-gray-900/0 dark:via-gray-900/50 dark:to-black blur-3xl" />

      {/* === About Me === */}
      <section className="relative py-28">
        
        <div className="max-w-5xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent mb-6"
          >
            About Me
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-gray-700 dark:text-gray-300 text-lg sm:text-xl mb-12 max-w-3xl mx-auto"
          >
            I’m a backend developer focused on building reliable, scalable, and intelligent systems with a touch of creativity.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-gray-200/30 dark:border-gray-700/30 rounded-3xl shadow-xl p-10 mb-16"
          >
            <div className="text-gray-800 dark:text-gray-300 leading-relaxed space-y-6 text-lg text-left sm:text-center">
              <p>
                Hey, I’m <b>Akrom Rustamov</b> — a passionate <b>backend developer</b> who loves transforming raw ideas into reliable, scalable, and intelligent systems.
              </p>
              <p>
                I specialize in <b>Python</b>, <b>Django</b>, and <b>DRF</b>, creating solutions that are clean, secure, and built to last. Curiosity drives me to explore <b>AI technologies</b> and <b>frontend frameworks</b> like React and Next.js to deliver full-stack experiences.
              </p>
              <p>
                For me, writing code isn’t just about solving problems — it’s about designing digital logic that feels alive. Every project I build reflects a balance between <b>architecture</b>, <b>performance</b>, and <b>human experience</b>.
              </p>
              <p className="italic text-gray-500 dark:text-gray-400">
                “I don’t just build apps — I build systems that think, adapt, and evolve.”
              </p>
            </div>
          </motion.div>

          {/* Статистика */}
          <dl className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto mb-12">
            {content.stats.map((stat: StatType) => (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: stat.id * 0.1 }}
                className="flex flex-col gap-y-1 bg-white/60 dark:bg-gray-800/60 backdrop-blur-md border border-gray-200/30 dark:border-gray-700/30 rounded-xl p-5 shadow-sm hover:shadow-md transition"
              >
                <dd className="text-3xl font-bold bg-gradient-to-r from-black to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
                  {stat.value}
                </dd>
                <dt className="text-gray-600 dark:text-gray-400 text-sm">{stat.name}</dt>
              </motion.div>
            ))}
          </dl>

          {/* Кнопки */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              className="px-6 py-3 rounded-full bg-black dark:bg-white text-white dark:text-black font-medium shadow hover:shadow-lg transition"
            >
              Let’s connect
            </motion.a>
            <motion.a
              href="/resumes/resume-1.pdf"
              download
              whileHover={{ scale: 1.05 }}
              className="px-6 py-3 rounded-full border border-gray-300 dark:border-gray-700 bg-transparent text-gray-800 dark:text-gray-300 hover:bg-gray-100/20 dark:hover:bg-gray-800/40 transition"
            >
              Download CV
            </motion.a>
          </div>
        </div>
      </section>

      {/* === Smooth Transition to Timeline === */}
      <div className="h-32 bg-gradient-to-b from-gray-100/0 via-gray-100/50 to-white dark:from-gray-900/0 dark:via-gray-900/50 dark:to-black blur-3xl" />

      {/* === Timeline === */}
      <MyJourneySection timeline={content.timeline} filters={content.filters} />
    </div>
  );
}
