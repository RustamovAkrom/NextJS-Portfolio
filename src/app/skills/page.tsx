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

function SkillCard({ skill, index }: { skill: SkillType; index: number }) {
  const IconComponent = iconMap[skill.icon];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="relative p-6 rounded-2xl border border-gray-200/40 dark:border-gray-700/40
                 bg-gradient-to-br from-white/60 to-gray-100/20 dark:from-gray-900/60 dark:to-gray-800/20 
                 backdrop-blur-lg shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 
                 flex flex-col items-center text-center overflow-hidden"
    >
      {/* Градиентный фон за иконкой */}
      <div className="absolute inset-0 opacity-20 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 blur-2xl" />
      <div className="relative z-10 flex flex-col items-center">
        {IconComponent && (
          <div className="p-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 mb-4 shadow-md">
            <IconComponent className="w-7 h-7 text-white" />
          </div>
        )}
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
          {skill.title}
        </h3>
        <div className="flex flex-wrap justify-center gap-2">
          {skill.items.map((item, j) => (
            <span
              key={j}
              className="px-3 py-1 text-xs sm:text-sm bg-gray-100/70 dark:bg-gray-800/70 
                         text-gray-700 dark:text-gray-300 rounded-full font-medium"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function ProgressBar({ skill, index }: { skill: ProgressSkillType; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      viewport={{ once: true }}
      className="relative group"
    >
      <div className="flex justify-between mb-2 text-sm sm:text-base">
        <span className="text-gray-800 dark:text-gray-200 font-semibold">{skill.name}</span>
        <span className="text-gray-600 dark:text-gray-400 font-medium">{skill.level}%</span>
      </div>
      <div className="w-full h-3 bg-gray-200/70 dark:bg-gray-700/70 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          transition={{ duration: 1, delay: index * 0.15 }}
          className="h-3 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full"
        />
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const [data, setData] = useState<SkillsDataType | null>(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetch("/api/skills")
      .then((res) => res.json())
      .then((json) => setData(json[0]));
  }, []);

  if (!data) return <p className="text-center py-20 text-gray-500">Loading...</p>;

  const visibleSkills = showAll ? data.progressSkills : data.progressSkills.slice(0, 6);

  return (
    <div className="relative overflow-hidden">
      {/* Фон с плавным градиентом */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-indigo-50/40 to-white dark:from-gray-900 dark:via-gray-950/60 dark:to-gray-900 -z-10" />

      {/* Header */}
      <section className="py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
            My Skillset
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            💡 Exploring the art of coding — from logic to design, one skill at a time.
          </p>
        </motion.div>
      </section>

      {/* Skills Grid */}
      <section className="relative py-20">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {data.skills.map((skill, i) => (
            <SkillCard key={i} skill={skill} index={i} />
          ))}
        </div>
      </section>

      {/* Mastery Progress */}
      <section className="relative py-28 bg-gradient-to-b from-white/60 to-gray-50/80 dark:from-gray-900/60 dark:to-gray-950/80 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
              Mastery Levels
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-base">
              🚀 Measuring consistency, focus, and the joy of building something meaningful.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {visibleSkills.map((skill, i) => (
              <ProgressBar key={i} skill={skill} index={i} />
            ))}
          </div>

          {data.progressSkills.length > 6 && (
            <div className="text-center mt-10">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAll(!showAll)}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 
                           text-white font-semibold shadow-md hover:shadow-lg transition-all"
              >
                {showAll ? "Show Less" : "Show More"}
              </motion.button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
