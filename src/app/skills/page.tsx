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

// ✅ Карточка
function SkillCard({ skill, index }: { skill: SkillType; index: number }) {
  const IconComponent = iconMap[skill.icon];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="rounded-xl border border-gray-200/50 dark:border-gray-700/50 
                 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm
                 hover:shadow-lg hover:-translate-y-1 
                 transition-all duration-300 p-6 flex flex-col items-center text-center"
    >
      {IconComponent && (
        <IconComponent className="w-10 h-10 mb-4 text-indigo-500 dark:text-indigo-400" />
      )}
      <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-lg mb-3">
        {skill.title}
      </h3>
      <div className="flex flex-wrap justify-center gap-2">
        {skill.items.map((item, j) => (
          <span
            key={j}
            className="px-3 py-1 text-xs sm:text-sm bg-gray-100/80 dark:bg-gray-800/80 
                       text-gray-700 dark:text-gray-300 rounded-full"
          >
            {item}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

// ✅ Прогресс-бар
function ProgressBar({ skill, index }: { skill: ProgressSkillType; index: number }) {
  return (
    <div>
      <div className="flex justify-between mb-2 text-sm sm:text-base">
        <span className="text-gray-800 dark:text-gray-200 font-medium">{skill.name}</span>
        <span className="text-gray-600 dark:text-gray-400">{skill.level}%</span>
      </div>
      <div className="w-full bg-gray-200/70 dark:bg-gray-700/70 rounded-full h-3 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          transition={{ duration: 1, delay: index * 0.15 }}
          className="h-3 bg-indigo-500 dark:bg-indigo-400 rounded-full"
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const [data, setData] = useState<SkillsDataType | null>(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchSkills = async () => {
      const res = await fetch("/api/skills");
      const json = await res.json();
      setData(json[0]);
    };
    fetchSkills();
  }, []);

  if (!data) return <p className="text-center py-20">Loading...</p>;

  const visibleSkills = showAll ? data.progressSkills : data.progressSkills.slice(0, 6);

  return (
    <div className="container">
      {/* 🔹 Заголовок */}
      <section className="relative py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
              My Skillset
            </h2>
            <p className="mt-3 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-base">
              A carefully curated stack of tools and technologies I use to build
              performant, elegant, and modern digital experiences.
            </p>
          </motion.div>

          {/* 🔹 Карточки */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {data.skills.map((skill, i) => (
              <SkillCard key={i} skill={skill} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* 🔹 Прогресс */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-14 text-center"
          >
            <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Mastery Levels
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              🎯 A snapshot of my learning journey — from beginner sparks to pro mastery.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {visibleSkills.map((skill, i) => (
              <ProgressBar key={i} skill={skill} index={i} />
            ))}
          </div>

          {data.progressSkills.length > 6 && (
            <div className="text-center mt-10">
              <button
                onClick={() => setShowAll(!showAll)}
                className="px-6 py-2 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 transition"
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
