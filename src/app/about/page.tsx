"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { AboutContentType, TimelineItemType, LinkType, StatType } from "@/types/about";

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
    <section id="experience-section" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl font-bold mb-3">My Journey</h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base">
            A timeline of my professional growth and education.
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex justify-center gap-3 mb-10 flex-wrap">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`capitalize px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all
                ${
                  filter === f
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow"
                    : "bg-transparent border border-gray-300 dark:border-gray-700 text-muted-foreground hover:bg-gray-100/40 dark:hover:bg-gray-800/40"
                }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div className="space-y-10">
          {filteredTimeline.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="relative flex flex-col sm:flex-row gap-6 sm:gap-10 items-start sm:items-center"
            >
              {/* Icon */}
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm shadow">
                {item.icon}
              </div>

              {/* Content */}
              <div className="flex-1 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-xl p-5 shadow-sm hover:shadow-md transition-all">
                <h3 className="text-lg font-semibold">{item.role}</h3>
                <span className="text-xs text-primary font-medium">{item.period}</span>
                <p className="text-muted-foreground text-sm mt-1 font-medium">
                  {item.company}
                </p>
                <p className="text-muted-foreground text-sm mt-2 leading-relaxed">
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
    return <p className="text-center">Loading...</p>;
  }
  const content = data[0];

  return (
    <div className="container">
      {/* Hero section: Image + Links */}
      <section className="relative py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-14 items-center">
          {/* Image */}
          <motion.div
            initial={{ rotate: -5, opacity: 0 }}
            whileInView={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-2xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-700"
            >
              <Image
                src={content.image}
                alt={content.alt}
                width={288}
                height={288}
                priority
                className="object-cover"
              />
            </motion.div>
          </motion.div>

          {/* Links */}
          <div className="grid sm:grid-cols-2 gap-4">
            {content.links.map((link: LinkType, idx: number) => (
              <motion.a
                key={idx}
                href={link.href}
                whileHover={{ scale: 1.05, y: -3 }}
                className="block rounded-lg bg-white/40 dark:bg-gray-800/40 backdrop-blur border border-gray-200 dark:border-gray-700 p-5 shadow-sm hover:shadow-md transition-all"
              >
                <h3 className="text-base font-semibold mb-1">{link.name}</h3>
                <p className="text-muted-foreground text-xs">
                  Learn more about {link.name.toLowerCase()}.
                </p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

        {/* About Me + Stats */}
        <section className="relative py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h2 className="text-4xl sm:text-5xl font-extrabold mb-4">
                About Me
              </h2>
              <p className="text-muted-foreground text-lg sm:text-xl mb-12 max-w-3xl mx-auto">
                A quick look into my journey, skills, and passion for building modern digital solutions.
              </p>
            </motion.div>

            {/* Content Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border border-gray-200 dark:border-gray-700 shadow-xl rounded-2xl p-10 mb-14"
            >
              <div className="prose dark:prose-invert max-w-none text-lg leading-relaxed space-y-6">
                <p>
                  I am a <span className="font-semibold">software developer</span> with a strong foundation in
                  <span className="font-semibold"> backend development using Python, Django, and DRF</span>.  
                  I specialize in designing <span className="font-semibold">scalable, secure, and production-ready APIs</span>, 
                  always focusing on clean and maintainable code.
                </p>

                <p>
                  At the same time, I don’t limit myself to backend only.  
                  I actively explore <span className="font-semibold">frontend frameworks like React and Next.js</span>, 
                  building <span className="font-semibold">fullstack projects</span> that combine performance with great user experience.  
                  This allows me to understand the full cycle of product development — from database design to user-facing interfaces.
                </p>

                <p>
                  I constantly study and apply <span className="font-semibold">advanced technologies</span>, always looking 
                  for new challenges to grow as a versatile engineer.  
                  For me, technology is not just about writing code — it’s about solving problems, creating impact, 
                  and delivering real value to both users and businesses.
                </p>

                <p>
                  My goal is to bring <span className="font-semibold">creativity, responsibility, and technical expertise</span> 
                  into every project I work on, ensuring results that are both reliable and innovative.
                </p>
              </div>
            </motion.div>

            {/* Stats */}
            <dl className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto mb-12">
              {content.stats.map((stat: StatType) => (
                <motion.div
                  key={stat.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: stat.id * 0.15 }}
                  className="flex flex-col gap-y-1 bg-white/40 dark:bg-gray-800/40 backdrop-blur rounded-lg p-5 shadow-sm"
                >
                  <dd className="text-3xl font-bold">{stat.value}</dd>
                  <dt className="text-muted-foreground text-sm">{stat.name}</dt>
                </motion.div>
              ))}
            </dl>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium shadow hover:shadow-lg transition"
              >
                Let’s connect
              </motion.a>
              <motion.a
                href="/cv.pdf"
                download
                whileHover={{ scale: 1.05 }}
                className="px-6 py-3 rounded-full border border-gray-300 dark:border-gray-700 bg-transparent text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                Download CV
              </motion.a>
            </div>
          </div>
        </section>



      {/* Timeline */}
      <MyJourneySection timeline={content.timeline} filters={content.filters} />
    </div>
  );
}
