"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import type {
  AboutContentType,
  TimelineItemType,
  StatType,
} from "@/types/about";

/* ================= Timeline ================= */
function Journey({ timeline }: { timeline: TimelineItemType[] }) {
  return (
    <section className="py-20">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-10">
          Experience & projects
        </h2>

        <div className="space-y-6">
          {timeline.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="border border-gray-200 dark:border-gray-800 rounded-xl p-6"
            >
              <h3 className="font-medium text-gray-900 dark:text-white">
                {item.role}
              </h3>

              <p className="text-sm text-gray-500 mt-1">{item.period}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {item.company}
              </p>

              <p className="mt-3 text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================= About Page ================= */
export default function AboutPage() {
  const [data, setData] = useState<AboutContentType[] | null>(null);

  useEffect(() => {
    fetch("/api/about")
      .then((res) => res.json())
      .then((resData: AboutContentType[]) => setData(resData));
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading...
      </div>
    );
  }

  const content = data[0];

  return (
    <main className="min-h-screen bg-white dark:bg-black px-4 sm:px-6 lg:px-8">
      {/* HERO */}
      <section className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center py-24">
        <div className="space-y-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-gray-900 dark:text-white">
            Backend Python Engineer
          </h1>

          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md">
            Building APIs, backend architecture and AI-integrated systems for modern products.
          </p>
        </div>

        <div className="flex justify-center lg:justify-end">
          <div className="relative w-64 lg:w-96 h-64 lg:h-96 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800">
            <Image src={content.image} alt={content.alt} fill className="object-cover" />
          </div>
        </div>
      </section>

      {/* CORE DESCRIPTION */}
      <section className="max-w-4xl mx-auto py-16 space-y-6 text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
        <p>
          Backend engineer specializing in Python ecosystem, API architecture and scalable systems.
        </p>

        <p>
          I develop backend platforms, automation tools and AI-powered services focused on performance and reliability.
        </p>

        <p className="italic text-gray-500">
          My goal is building backend infrastructure for startups and AI products.
        </p>
      </section>

      {/* STACK */}
      <section className="max-w-4xl mx-auto py-10">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
          Core stack
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-gray-700 dark:text-gray-300">
          <div>Python</div>
          <div>Django</div>
          <div>FastAPI</div>
          <div>PostgreSQL</div>
          <div>Redis</div>
          <div>Docker</div>
          <div>Celery</div>
          <div>AI integrations</div>
          <div>API architecture</div>
        </div>
      </section>

      {/* STATS */}
      <section className="max-w-4xl mx-auto py-10">
        <dl className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {content.stats.map((stat: StatType) => (
            <div
              key={stat.id}
              className="border border-gray-200 dark:border-gray-800 rounded-xl p-6 text-center"
            >
              <dd className="text-2xl font-semibold text-gray-900 dark:text-white">
                {stat.value}
              </dd>
              <dt className="text-sm text-gray-500 dark:text-gray-400">
                {stat.name}
              </dt>
            </div>
          ))}
        </dl>
      </section>

      {/* TIMELINE */}
      <Journey timeline={content.timeline} />
    </main>
  );
}
