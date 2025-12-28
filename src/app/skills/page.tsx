"use client";

import { motion } from "framer-motion";
import { Code, Database, Palette, Settings } from "lucide-react";
import { useEffect, useState } from "react";
import type { SkillType, ProgressSkillType, SkillsDataType } from "@/types/skills";

const iconMap: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  Database,
  Settings,
  Code,
  Palette,
};

/* ================================
   Skill Card (same style, cleaner)
================================ */
function SkillCard({ skill, index }: { skill: SkillType; index: number }) {
  const Icon = iconMap[skill.icon];

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.6 }}
      className="
        relative rounded-2xl p-6
        border border-indigo-500/10 dark:border-indigo-400/10
        bg-gradient-to-br from-white/60 to-indigo-50/20
        dark:from-indigo-950/60 dark:to-indigo-900/20
        backdrop-blur-xl
        shadow-sm hover:shadow-lg hover:-translate-y-1
        transition-all
      "
    >
      {/* soft glow */}
      <div className="absolute inset-0 rounded-2xl bg-indigo-500/10 blur-2xl opacity-30" />

      <div className="relative z-10 text-center">
        {Icon && (
          <div className="mx-auto mb-4 w-fit rounded-xl p-3
                          bg-gradient-to-r from-indigo-500 to-purple-600
                          shadow-md">
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
                bg-white/70 dark:bg-indigo-900/60
                text-gray-700 dark:text-indigo-200
                border border-indigo-500/10
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
   Progress Bar (same logic, softer)
================================ */
function ProgressBar({ skill, index }: { skill: ProgressSkillType; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="space-y-2"
    >
      <div className="flex justify-between text-sm font-medium">
        <span className="text-gray-800 dark:text-gray-200">{skill.name}</span>
        <span className="text-indigo-400">{skill.level}%</span>
      </div>

      <div className="h-3 rounded-full bg-indigo-200/40 dark:bg-indigo-900/60 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          transition={{ duration: 1, delay: index * 0.1 }}
          className="
            h-full rounded-full
            bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-600
          "
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
    fetch("/api/skills")
      .then((res) => res.json())
      .then((json) => setData(json[0]));
  }, []);

  if (!data) {
    return <p className="text-center py-24 text-gray-500">Loading...</p>;
  }

  const visible = showAll
    ? data.progressSkills
    : data.progressSkills.slice(0, 6);

  return (
    <div className="relative mt-20 overflow-hidden">

      {/* ===== background (restored) ===== */}
      <div className="absolute inset-0 -z-10
        bg-gradient-to-b
        from-indigo-950 via-indigo-900/40 to-indigo-950
        dark:from-black dark:via-indigo-950/50 dark:to-black
      " />

      {/* ===== header ===== */}
      <section className="py-24 text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="
            text-4xl sm:text-5xl font-extrabold
            bg-gradient-to-r from-indigo-400 to-purple-400
            bg-clip-text text-transparent
          "
        >
          Skills
        </motion.h1>

        <p className="mt-4 max-w-xl mx-auto text-indigo-200/80 text-base sm:text-lg">
          Tools and technologies I use to build scalable backend systems.
        </p>
      </section>

      {/* ===== cards ===== */}
      <section className="max-w-6xl mx-auto px-6 grid
                          grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-24">
        {data.skills.map((skill, i) => (
          <SkillCard key={i} skill={skill} index={i} />
        ))}
      </section>

      {/* ===== progress ===== */}
      <section className="relative py-28 bg-indigo-950/40 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-6">

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-center
                       bg-gradient-to-r from-indigo-300 to-purple-300
                       bg-clip-text text-transparent mb-14"
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
                  bg-indigo-500/20 hover:bg-indigo-500/30
                  text-indigo-200
                  border border-indigo-400/20
                  backdrop-blur
                  transition
                "
              >
                {showAll ? "Show Less" : "Show More"}
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
