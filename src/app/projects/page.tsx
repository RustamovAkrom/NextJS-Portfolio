"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Github, ExternalLink } from "lucide-react";
import type { ProjectType } from "@/types/projects";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<ProjectType[]>([]);
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
    <main className="relative min-h-screen overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-indigo-50 via-transparent to-gray-50 dark:from-gray-900 dark:via-gray-950 dark:to-black" />
      <motion.div
        className="absolute inset-0 -z-10"
        style={{ background: "radial-gradient(circle at 50% 20%, rgba(79,70,229,0.15), transparent 70%)" }}
      />

      {/* Header Section */}
      <section className="py-20 lg:py-28 text-center px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-4"
        >
          <div className="inline-flex items-center px-4 py-1 rounded-full bg-indigo-100/60 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 text-sm font-medium shadow-sm">
            ✨ My Work
          </div>
          <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
              Creative Projects
            </span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-base sm:text-lg">
            A showcase of my best web applications — where design meets performance and creativity.
          </p>
        </motion.div>
      </section>

      {/* Filter Buttons */}
      <div className="max-w-4xl mx-auto px-4 mb-12 flex flex-wrap justify-center gap-3">
        {["all", ...years].map((year) => (
          <motion.button
            key={year}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            className={`px-5 py-1.5 rounded-full text-sm font-medium transition-all ${
              filterYear === year
                ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md"
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/40"
            }`}
            onClick={() => setFilterYear(year)}
          >
            {year === "all" ? "All Projects" : year}
          </motion.button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4 pb-28">
        <AnimatePresence>
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="h-72 rounded-xl bg-gray-200 dark:bg-gray-800 animate-pulse"
                />
              ))
            : filteredProjects.map((project, idx) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="group relative flex flex-col rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/60 backdrop-blur-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative w-full h-48 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      priority={idx === 0}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1 p-5 relative z-10">
                    <h2 className="text-lg font-semibold text-indigo-600 dark:text-indigo-400 mb-1">
                      {project.title}
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-2 group-hover:line-clamp-4 transition-all duration-300 mb-3">
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
                        className="flex-1 text-center py-2 rounded-md bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-medium hover:opacity-90 transition"
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
      <div className="max-w-4xl mx-auto px-4 pb-20 text-center">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent mb-6" />
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          💡 All projects are open-source on{" "}
          <Link
            href="https://github.com/rustamovakrom"
            target="_blank"
            className="text-indigo-500 dark:text-indigo-400 hover:underline"
          >
            GitHub
          </Link>
          . Feel free to explore, contribute, or collaborate!
        </p>
      </div>
    </main>
  );
}
