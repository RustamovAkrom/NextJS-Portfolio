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

const iconMap: Record<string,  React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
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
      setData(json[0]);
    };
    fetchSkills();
  }, []);

  if (!data) return <p className="text-center py-20">Loading...</p>;

  return (
    <div>

      {/* Skills Grid */}
      <section className="relative py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100">
              Development Arsenal
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
              Tools, frameworks, and technologies I use to craft digital experiences with performance and elegance.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {data.skills.map((skill, i) => {
              const IconComponent = iconMap[skill.icon];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 p-5 flex flex-col items-center text-center"
                >
                  {IconComponent && <IconComponent className="w-8 h-8 mb-3 text-gray-700 dark:text-gray-300" />}
                  <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2 text-base sm:text-lg">{skill.title}</h3>
                  <div className="flex flex-wrap justify-center gap-2">
                    {skill.items.map((item, j) => (
                      <span
                        key={j}
                        className="px-2 py-1 text-xs sm:text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full"
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
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h3 className="text-2xl font-bold mb-8 text-center text-gray-900 dark:text-gray-100">
              Mastery Levels
            </h3>
            <div className="space-y-5">
              {data.progressSkills.map((skill, i) => (
                <div key={i}>
                  <div className="flex justify-between mb-1 text-sm sm:text-base">
                    <span className="text-gray-800 dark:text-gray-200 font-medium">{skill.name}</span>
                    <span className="text-gray-600 dark:text-gray-400">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: i * 0.15 }}
                      className="h-3 bg-gray-800 dark:bg-gray-300 rounded-full"
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
