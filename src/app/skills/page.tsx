"use client";

import { motion } from "framer-motion";
import { Code, Database, Palette, Settings } from "lucide-react";
import { useEffect, useState } from "react";


interface Skill {
  icon: string;
  title: string;
  items: string[];
}

interface ProgressSkill {
  name: string;
  level: number;
}

interface SkillsData {
  skills: Skill[];
  progressSkills: ProgressSkill[];
}

const iconMap: Record<string, any> = {
  Database: Database,
  Settings: Settings,
  Code: Code,
  Palette: Palette,
}


export default function Skills() {
  const [data, setData] = useState<SkillsData | null>(null);

  useEffect(() => {
    const fetchSkills = async () => {
      const res = await fetch("/api/skills");
      const json = await res.json();
      // Берём первый элемент массива
      setData(json[0]);
    };
    fetchSkills();
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
<div>
      {/* Skills Grid */}
      <section className="relative py-20 bg-gradient-to-b from-gray-100/50 to-gray-200/20 dark:from-gray-900/40 dark:to-gray-800/20">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-medium">
              My Skills
            </span>
            <h2 className="text-4xl font-bold mt-4 text-gray-900 dark:text-gray-100">
              Development Arsenal
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-2">
              Tools, frameworks, and technologies I use to craft digital
              experiences with performance and elegance.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {data.skills.map((skill, i) => {
              const IconComponent = iconMap[skill.icon];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.6 }}
                  className="relative rounded-2xl border border-white/30 dark:border-gray-700/50 bg-white/40 dark:bg-gray-900/40 backdrop-blur-md shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6 text-center"
                >
                  <div className="flex justify-center mb-4">
                    {IconComponent && <IconComponent className="w-10 h-10 text-blue-500" />}
                  </div>
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100 mb-4">
                    {skill.title}
                  </h3>
                  <div className="flex flex-wrap justify-center gap-2">
                    {skill.items.map((item, j) => (
                      <span
                        key={j}
                        className="px-3 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm rounded-full"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Progress Skills */}
      <section className="mt-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h3 className="text-2xl font-bold mb-8 text-gray-900 dark:text-gray-100 text-center">
              Mastery Levels
            </h3>
            <div className="space-y-6">
              {data.progressSkills.map((skill, i) => (
                <div key={i}>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-800 dark:text-gray-200 font-medium">
                      {skill.name}
                    </span>
                    <span className="text-gray-600 dark:text-gray-400">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-300/30 dark:bg-gray-700/40 rounded-full h-3 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: i * 0.2 }}
                      className="h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>

  );
}
