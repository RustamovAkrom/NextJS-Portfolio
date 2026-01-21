"use client";

import { motion } from "framer-motion";
import { Code, Database, Palette, Settings } from "lucide-react";
import { useEffect, useState } from "react";
import type { SkillType, ProgressSkillType, SkillsDataType } from "@/types/skills";

const iconMap: Record<string, React.ComponentType<any>> = {
  Database,
  Settings,
  Code,
  Palette,
};

/* ================================
   Skill Card
================================ */
function SkillCard({ skill, index }: { skill: SkillType; index: number }) {
  const Icon = iconMap[skill.icon];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="
        group relative rounded-2xl p-6
        border border-gray-200 dark:border-indigo-500/10
        bg-white/80 dark:bg-indigo-950/60
        backdrop-blur-xl
        shadow-md hover:shadow-xl hover:-translate-y-1
        transition-all
      "
    >
      {/* Glow */}
      <div className="absolute inset-0 rounded-2xl bg-indigo-500/10 opacity-0 group-hover:opacity-40 blur-2xl transition" />

      <div className="relative z-10 text-center">
        {Icon && (
          <div
            className="mx-auto mb-4 w-fit rounded-xl p-3
                       bg-gradient-to-r from-indigo-500 to-purple-600
                       shadow-md"
          >
            <Icon className="w-7 h-7 text-white" />
          </div>
        )}

        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          {skill.title}
        </h3>

        <div className="flex flex-wrap justify-center gap-2">
          {skill.items.map((item, j) => (
            <span
              key={j}
              className="
                px-3 py-1 rounded-full text-xs sm:text-sm
                bg-gray-100 dark:bg-indigo-900/50
                text-gray-700 dark:text-indigo-200
                border border-gray-200 dark:border-indigo-500/10
              "
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ================================
   Progress Bar
================================ */
function ProgressBar({ skill, index }: { skill: ProgressSkillType; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="space-y-2"
    >
      <div className="flex justify-between text-sm font-medium">
        <span className="text-gray-800 dark:text-gray-200">{skill.name}</span>
        <span className="text-indigo-500">{skill.level}%</span>
      </div>

      <div className="h-3 rounded-full bg-gray-200 dark:bg-indigo-900/60 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          transition={{ duration: 1 }}
          className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-600"
        />
      </div>
    </motion.div>
  );
}

/* ================================
   Page
================================ */
export default function Skills() {
  const [data, setData] = useState<SkillsDataType | null>(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetch("/api/skills", { cache: "no-store" })
      .then((res) => res.json())
      .then((json) => setData(json[0]));
  }, []);

  if (!data) {
    return (
      <p className="text-center py-24 text-gray-500 dark:text-gray-400">
        Loading...
      </p>
    );
  }

  const visible = showAll
    ? data.progressSkills
    : data.progressSkills.slice(0, 6);

  return (
    <main className="relative min-h-screen overflow-hidden mt-20">

      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-indigo-50 via-transparent to-gray-50 dark:from-black dark:via-indigo-950/40 dark:to-black" />

      {/* Header */}
      <section className="py-20 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="space-y-4"
        >
          <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
              Skills
            </span>
          </h1>

          <p className="max-w-xl mx-auto text-gray-600 dark:text-gray-400">
            Tools and technologies I use to build scalable backend systems.
          </p>
        </motion.div>
      </section>

      {/* Cards */}
      <section className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-24">
        {data.skills.map((skill, i) => (
          <SkillCard key={i} skill={skill} index={i} />
        ))}
      </section>

      {/* Progress */}
      <section className="py-24 bg-gray-100/70 dark:bg-indigo-950/40 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-4">

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-14
                       bg-gradient-to-r from-indigo-500 to-purple-500
                       bg-clip-text text-transparent"
          >
            Mastery Level
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {visible.map((skill, i) => (
              <ProgressBar key={i} skill={skill} index={i} />
            ))}
          </div>

          {data.progressSkills.length > 6 && (
            <div className="text-center mt-12">
              <button
                onClick={() => setShowAll(!showAll)}
                className="
                  px-6 py-2.5 rounded-full
                  bg-indigo-500/10 hover:bg-indigo-500/20
                  text-indigo-600 dark:text-indigo-300
                  border border-indigo-500/20
                  transition
                "
              >
                {showAll ? "Show Less" : "Show More"}
              </button>
            </div>
          )}

        </div>
      </section>
    </main>
  );
}
