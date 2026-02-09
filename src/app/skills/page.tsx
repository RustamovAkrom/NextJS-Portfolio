"use client";

import { motion } from "framer-motion";
import { Code, Database, Settings, Palette } from "lucide-react";
import { useEffect, useState } from "react";
import type {
  SkillType,
  ProgressSkillType,
  SkillsDataType,
} from "@/types/skills";

const iconMap: Record<
  string,
  React.ComponentType<React.SVGProps<SVGSVGElement>>
> = {
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
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="border border-gray-200 dark:border-gray-800 rounded-xl p-6 bg-white dark:bg-black"
    >
      <div className="flex items-center gap-3 mb-4">
        {Icon && (
          <div className="p-2 rounded-md border border-gray-200 dark:border-gray-800">
            <Icon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </div>
        )}

        <h3 className="text-base font-semibold text-gray-900 dark:text-white">
          {skill.title}
        </h3>
      </div>

      <div className="flex flex-wrap gap-2">
        {skill.items.map((item, j) => (
          <span
            key={j}
            className="px-3 py-1 text-sm rounded-md border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300"
          >
            {item}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

/* ================================
   Progress Bar
================================ */
function ProgressBar({
  skill,
  index,
}: {
  skill: ProgressSkillType;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
      className="space-y-2"
    >
      <div className="flex justify-between text-sm">
        <span className="text-gray-800 dark:text-gray-200">{skill.name}</span>
        <span className="text-gray-500">{skill.level}%</span>
      </div>

      <div className="h-2 rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          transition={{ duration: 0.8 }}
          className="h-full bg-gray-900 dark:bg-white"
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
      .then((json: SkillsDataType[]) => setData(json[0]));
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading...
      </div>
    );
  }

  const visible = showAll
    ? data.progressSkills
    : data.progressSkills.slice(0, 6);

  return (
    <main className="min-h-screen bg-white dark:bg-black px-4 sm:px-6 lg:px-8">

      {/* Header */}
      <section className="max-w-6xl mx-auto py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <h1 className="text-4xl sm:text-5xl font-semibold text-gray-900 dark:text-white">
            Skills & technologies
          </h1>

          <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            Tools and technologies I use to build backend systems and APIs.
          </p>
        </motion.div>
      </section>

      {/* Skill cards */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-20">
        {data.skills.map((skill, i) => (
          <SkillCard key={i} skill={skill} index={i} />
        ))}
      </section>

      {/* Progress */}
      <section className="max-w-4xl mx-auto pb-24">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-2xl font-semibold text-gray-900 dark:text-white mb-8"
        >
          Proficiency
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {visible.map((skill, i) => (
            <ProgressBar key={i} skill={skill} index={i} />
          ))}
        </div>

        {data.progressSkills.length > 6 && (
          <div className="text-center mt-10">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-5 py-2 rounded-md border border-gray-300 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900 transition"
            >
              {showAll ? "Show less" : "Show more"}
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
