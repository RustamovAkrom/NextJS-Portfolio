"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Github, ExternalLink } from "lucide-react";

interface Project {
  title: string;
  description: string;
  image: string;
  github: string;
  deploy: string;
  slug: string;
  date: string;
  technologies: string[];
  screenshots: string[];
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filterYear, setFilterYear] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects", { cache: "no-store" });
        const data = await res.json();
        setProjects(data);
      } catch (err) {
        console.error("Failed to fetch projects:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const years = Array.from(new Set(projects.map((p) => p.date.slice(0, 4)))).sort(
    (a, b) => Number(b) - Number(a)
  );
  const filteredProjects =
    filterYear === "all"
      ? projects
      : projects.filter((p) => p.date.startsWith(filterYear));

  return (
    <main className="min-h-screen">
      {/* Header Section */}
      <section className="py-16 lg:py-24 text-center px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-4"
        >
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-100/50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-300 text-sm font-medium">
            My Work
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100">
            Featured{" "}
            <span className="text-indigo-600 dark:text-indigo-400">Projects</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
            A curated list of my projects showcasing modern web applications,
            clean UIs, and creative ideas.
          </p>
        </motion.div>
      </section>

      {/* Filter */}
      <div className="max-w-4xl mx-auto px-4 mb-10 flex flex-wrap justify-center gap-3">
        {["all", ...years].map((year) => (
          <motion.button
            whileTap={{ scale: 0.95 }}
            key={year}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              filterYear === year
                ? "bg-indigo-500 text-white shadow-sm"
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/40"
            }`}
            onClick={() => setFilterYear(year)}
          >
            {year === "all" ? "All" : year}
          </motion.button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-4 pb-20">
        <AnimatePresence>
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="h-64 rounded-lg bg-gray-200 dark:bg-gray-800 animate-pulse"
                />
              ))
            : filteredProjects.map((project, idx) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.08 }}
                  className="group flex flex-col rounded-xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/70 backdrop-blur-sm shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
                >
                  {/* Image */}
                  <div className="relative w-full h-44 sm:h-52 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      priority={idx === 0}
                    />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1 p-4 sm:p-5">
                    <h2 className="text-indigo-600 dark:text-indigo-400 font-semibold text-lg mb-1">
                      {project.title}
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-2 group-hover:line-clamp-3 transition-all duration-300 mb-3">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.technologies?.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-indigo-100/60 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="mt-auto flex gap-2">
                      <Link
                        href={`projects/${project.slug}`}
                        className="flex-1 text-center py-2 rounded-md bg-indigo-500/90 hover:bg-indigo-600 dark:hover:bg-indigo-500 text-white text-sm font-medium transition-colors"
                      >
                        Details
                      </Link>
                      {project.github && (
                        <Link
                          href={project.github}
                          target="_blank"
                          className="p-2 rounded-md border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                        >
                          <Github className="w-4 h-4" />
                        </Link>
                      )}
                      {project.deploy && (
                        <Link
                          href={project.deploy}
                          target="_blank"
                          className="p-2 rounded-md border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
        </AnimatePresence>
      </div>

      {/* Mention Section */}
      <div className="max-w-4xl mx-auto px-4 pb-14 text-center">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent mb-6" />
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          All projects are open-source on my{" "}
          <Link
            href="https://github.com/rustamovakrom"
            target="_blank"
            className="text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            GitHub
          </Link>
          . Feel free to explore, contribute, or reach out for collaboration!
        </p>
      </div>
    </main>
  );
}
