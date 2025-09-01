"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Link {
  href: string;
  name: string;
}

interface Stat {
  id: number;
  name: string;
  value: number | string;
}

interface TimelineItem {
  id: number;
  type: string;
  role: string;
  company: string;
  period: string;
  description: string;
  icon: React.ReactNode;
}

interface AboutContent {
  image: string;
  alt: string;
  links: Link[];
  stats: Stat[];
  timeline: TimelineItem[];
  filters: string[];
}

function MyJourneySection({ 
  timeline, 
  filters 
}: { 
  timeline: TimelineItem[]; 
  filters: string[];
}) {
  const [filter, setFilter] = useState("all");

  const filteredTimeline =
    filter === "all" ? timeline : timeline.filter((item) => item.type === filter);

  return (
    <section id="experience-section" className="py-24 relative bg-transparent">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 text-sm rounded-full 
            bg-gradient-to-r from-blue-500/20 to-purple-500/20 
            text-primary font-semibold mb-4 backdrop-blur-md shadow-md">
            Experience & Education
          </span>
          <h2 className="text-4xl font-bold mb-4">My Journey</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A creative timeline of my professional growth and education.
          </p>
        </div>

        {/* Filters */}
        <div className="flex justify-center gap-3 sm:gap-4 mb-12 flex-wrap">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`capitalize px-5 py-2 rounded-full text-sm font-medium transition-all 
                ${
                  filter === f
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                    : "bg-white/30 dark:bg-gray-800/30 backdrop-blur-md text-muted-foreground hover:shadow-md"
                }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 top-0 h-full w-1 
            bg-gradient-to-b from-blue-500/40 via-purple-500/40 to-pink-500/40 
            rounded-full -translate-x-1/2 blur-[1px]" />

          <div className="space-y-16 relative">
            {filteredTimeline.map((item, idx) => {
              const isLeft = idx % 2 === 0;

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className={`relative flex ${
                    isLeft ? "justify-start md:pr-12" : "justify-end md:pl-12"
                  } md:items-center`}
                >
                  <div
                    className={`w-full md:w-5/12 p-6 sm:p-8 rounded-2xl shadow-xl border 
                      backdrop-blur-xl bg-white/40 dark:bg-gray-800/40 
                      relative hover:scale-[1.02] transition-transform`}
                  >
                    {/* Icon */}
                    <div
                      className={`absolute top-6 ${
                        isLeft ? "right-[-1.8rem] md:right-[-2.5rem]" : "left-[-1.8rem] md:left-[-2.5rem]"
                      } w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 
                      flex items-center justify-center shadow-lg text-white text-lg`}
                    >
                      {item.icon}
                    </div>

                    <h3 className="text-xl font-semibold mb-1">{item.role}</h3>
                    <span className="text-sm text-primary font-medium">{item.period}</span>
                    <p className="text-muted-foreground mt-2 font-medium">{item.company}</p>
                    <p className="text-muted-foreground text-sm mt-3 leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function AboutPage() {
  const [data, setData] = useState<AboutContent[] | null>(null);

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

  if (!data) return <p className="text-center">Loading...</p>;

  return (
    <div>
      <section className="relative py-24 sm:py-32 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
          {/* Image with 3D floating animation */}
          <motion.div
            initial={{ rotate: -5, opacity: 0 }}
            whileInView={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative flex justify-center"
          >
            <motion.div
              animate={{
                rotate: [0, 5, -5, 0],
                scale: [1, 1.05, 0.95, 1],
              }}
              transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
              className="relative w-80 h-80 rounded-3xl overflow-hidden shadow-2xl border-2 border-white/20 dark:border-gray-700"
            >
              
              <Image
                src={content.image}
                alt={content.alt}
                width={320}
                height={320}
                priority
                className="object-cover"
              />
            </motion.div>
  
            {/* Glowing 3D effect circles */}
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ repeat: Infinity, duration: 6 }}
              className="absolute w-96 h-96 rounded-full bg-blue-500/20 blur-3xl -z-10"
            />
            <motion.div
              animate={{ scale: [1.2, 1, 1.2], opacity: [0.4, 0.7, 0.4] }}
              transition={{ repeat: Infinity, duration: 10 }}
              className="absolute w-80 h-80 rounded-full bg-purple-500/20 blur-3xl -z-10"
            />
          </motion.div>
  
          {/* Text content */}
          <div>
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl mb-6">
                About Me
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-xl">
                I’m passionate about creating seamless digital experiences.  
                With strong knowledge in backend, frontend, and design tools,  
                I strive to blend creativity with performance-driven code.
              </p>
            </motion.div>
  
            {/* Links */}
            <div className="grid sm:grid-cols-2 gap-6 mb-12">
              {content.links.map((link: Link, idx: number) => (
                <motion.a
                  key={idx}
                  href={link.href}
                  whileHover={{ scale: 1.05, y: -4 }}
                  className="block rounded-xl bg-white/40 dark:bg-gray-800/40 backdrop-blur-lg border border-white/20 dark:border-gray-700 p-6 shadow-lg hover:shadow-xl transition-all"
                >
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {link.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Learn more about {link.name.toLowerCase()}.
                  </p>
                </motion.a>
              ))}
            </div>
  
            {/* Stats */}
            <dl className="grid grid-cols-2 gap-8 text-center">
              {content.stats.map((stat: Stat) => (
                <motion.div
                  key={stat.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: stat.id * 0.2 }}
                  className="flex flex-col gap-y-2 bg-white/30 dark:bg-gray-800/30 backdrop-blur-md rounded-xl p-6 shadow-md"
                >
                  <dd className="text-3xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </dd>
                  <dt className="text-gray-600 dark:text-gray-400 text-sm">
                    {stat.name}
                  </dt>
                </motion.div>
              ))}
            </dl>
          </div>
        </div>
      </section>
      <MyJourneySection timeline={content.timeline} filters={content.filters}/>
    </div>
  );
}
