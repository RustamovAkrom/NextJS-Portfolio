"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
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

  const years = Array.from(
    new Set(projects.map((p) => p.date.slice(0, 4)))
  ).sort((a, b) => Number(b) - Number(a));

  const filteredProjects =
    filterYear === "all"
      ? projects
      : projects.filter((p) => p.date.startsWith(filterYear));

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
            Projects
          </h1>

          <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            Selected backend systems, APIs and engineering-focused applications.
          </p>
        </motion.div>
      </section>

      {/* Filters */}
      <div className="max-w-4xl mx-auto mb-12 flex flex-wrap justify-center gap-3">
        {["all", ...years].map((year) => (
          <button
            key={year}
            onClick={() => setFilterYear(year)}
            className={`px-4 py-1.5 text-sm rounded-md border transition ${
              filterYear === year
                ? "bg-gray-900 text-white dark:bg-white dark:text-black"
                : "border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900"
            }`}
          >
            {year === "all" ? "All" : year}
          </button>
        ))}
      </div>

      {/* Projects grid */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-24">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-72 rounded-xl bg-gray-200 dark:bg-gray-800 animate-pulse"
              />
            ))
          : filteredProjects.map((project, idx) => (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="flex flex-col border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden bg-white dark:bg-black"
              >
                {/* Image */}
                <div className="relative w-full h-44">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority={idx === 0}
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-5">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {project.title}
                  </h2>

                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tech */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies?.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs rounded-md border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="mt-auto flex gap-2">
                    <Link
                      href={`projects/${project.slug}`}
                      className="flex-1 text-center py-2 rounded-md border border-gray-300 dark:border-gray-700 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-900 transition"
                    >
                      Details
                    </Link>

                    {project.github && (
                      <Link
                        href={project.github}
                        target="_blank"
                        className="p-2 rounded-md border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-900 transition"
                      >
                        <Github className="w-4 h-4" />
                      </Link>
                    )}

                    {project.deploy && (
                      <Link
                        href={project.deploy}
                        target="_blank"
                        className="p-2 rounded-md border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-900 transition"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
      </section>

      {/* Footer note */}
      <section className="max-w-3xl mx-auto pb-20 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          All projects are open-source and available on{" "}
          <Link
            href="https://github.com/rustamovakrom"
            target="_blank"
            className="underline hover:text-gray-900 dark:hover:text-white"
          >
            GitHub
          </Link>
          .
        </p>
      </section>
    </main>
  );
}
