"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { AboutContentType, TimelineItemType, StatType } from "@/types/about";

/* =======================
   Timeline Section
======================= */
function Journey({
  timeline,
  filters,
}: {
  timeline: TimelineItemType[];
  filters: string[];
}) {
  const [filter, setFilter] = useState("all");

  const items =
    filter === "all" ? timeline : timeline.filter((i) => i.type === filter);

  return (
    <section className="relative py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            My Journey
          </h2>
          <p className="mt-3 text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            Education and professional experience over time.
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex justify-center gap-3 flex-wrap mb-14">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 text-sm rounded-full transition
                ${
                  filter === f
                    ? "bg-black dark:bg-white text-white dark:text-black shadow"
                    : "border border-gray-300/60 dark:border-gray-700/60 text-gray-600 dark:text-gray-400 hover:bg-gray-100/40 dark:hover:bg-gray-800/40"
                }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div className="space-y-10">
          {items.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08, duration: 0.6 }}
              className="flex gap-6 items-start group"
            >
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white shadow-md">
                {item.icon}
              </div>

              <div className="flex-1 bg-white/80 dark:bg-gray-800/60 border border-gray-200/30 dark:border-gray-700/30 rounded-2xl p-6 transition group-hover:-translate-y-1 group-hover:shadow-lg">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {item.role}
                </h3>
                <p className="text-sm text-indigo-500 mt-0.5">{item.period}</p>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {item.company}
                </p>
                <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
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

/* =======================
   About Page
======================= */
export default function AboutPage() {
  const [data, setData] = useState<AboutContentType[] | null>(null);

  useEffect(() => {
    fetch("/api/about")
      .then((res) => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  if (!data) {
    return <p className="text-center mt-32 text-gray-500">Loading...</p>;
  }

  const content = data[0];

  return (
    <div className="relative mt-20 bg-gradient-to-b from-white via-gray-50 to-gray-100 dark:from-black dark:via-gray-950 dark:to-gray-900">

      {/* ================= HERO ================= */}
      <section className="relative py-24 sm:py-32">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
              <span className="block text-gray-900 dark:text-white">
                Hi, I’m Akrom Rustamov
              </span>
              <span className="block mt-2 text-gray-400 text-2xl sm:text-3xl">
                Backend Engineer
              </span>
            </h1>

            <p className="max-w-md text-gray-600 dark:text-gray-400 text-lg">
              I build scalable backend systems with clean architecture and
              production mindset.
            </p>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="relative w-56 h-56 sm:w-64 sm:h-64 lg:w-96 lg:h-96 mx-auto rounded-3xl overflow-hidden shadow-xl"
          >
            <Image
              src={content.image}
              alt={content.alt}
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section className="relative py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl font-bold mb-8 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent"
          >
            About Me
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="bg-white/60 dark:bg-gray-900/40 border border-gray-200/40 dark:border-gray-700/40 rounded-3xl p-8 sm:p-12 shadow"
          >
            <div className="space-y-5 text-gray-700 dark:text-gray-300 text-base sm:text-lg leading-relaxed">
              <p>
                I’m a <b>Backend Python Developer</b> focused on building scalable,
                reliable, production-ready systems.
              </p>
              <p>
                My stack includes <b>Python</b>, <b>FastAPI</b>, <b>Django</b>,
                <b>PostgreSQL</b>, <b>Docker</b>, <b>Redis</b> and CI/CD pipelines.
              </p>
              <p className="italic text-gray-500 dark:text-gray-400">
                I engineer backends that grow with the product.
              </p>
            </div>
          </motion.div>

          {/* Stats */}
          <dl className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-14">
            {content.stats.map((stat: StatType) => (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: stat.id * 0.1 }}
                className="bg-white/50 dark:bg-gray-800/30 border border-gray-200/30 dark:border-gray-700/30 rounded-xl p-5 text-center hover:-translate-y-1 transition"
              >
                <dd className="text-3xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </dd>
                <dt className="text-sm text-gray-500 dark:text-gray-400">
                  {stat.name}
                </dt>
              </motion.div>
            ))}
          </dl>
        </div>
      </section>

      {/* ================= TIMELINE ================= */}
      <Journey timeline={content.timeline} filters={content.filters} />
    </div>
  );
}
