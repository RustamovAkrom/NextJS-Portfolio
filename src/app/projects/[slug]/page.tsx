"use client";

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Globe, ArrowLeft, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useState, use } from "react";
import type { ProjectType } from "@/types/projects";

export default function ProjectDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [loading, setLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch("/api/projects");
        if (!res.ok) throw new Error("Ошибка загрузки");
        const data = await res.json();
        setProjects(data);
      } catch (error) {
        console.error("Ошибка:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  if (loading) return <p className="text-center py-20 text-gray-500">Loading...</p>;

  const project = projects.find((p) => p.slug === slug);
  if (!project) return notFound();

  const date = new Date(project.date).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <main className="min-h-screen pt-20 relative overflow-hidden">
      {/* 🌀 Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[80vw] h-[80vw] bg-indigo-500/10 dark:bg-indigo-700/20 rounded-full blur-3xl" />
      </div>

      {/* 🔙 Back */}
      <div className="max-w-5xl mx-auto px-4 pt-6">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Projects
        </Link>
      </div>

      {/* 🖼 Hero */}
      <section className="max-w-7xl mx-auto px-4 pt-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative w-full h-[400px] sm:h-[600px] rounded-2xl overflow-hidden border border-gray-300/40 dark:border-gray-700/40 shadow-2xl backdrop-blur-xl bg-gradient-to-br from-white/30 to-gray-100/10 dark:from-gray-900/40 dark:to-gray-800/20"
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            priority
            className="object-cover hover:scale-105 transition-transform duration-700"
          />
        </motion.div>
      </section>

      {/* 🧠 Description Header */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="p-8 rounded-2xl bg-white/60 dark:bg-gray-900/50 border border-gray-200/50 dark:border-gray-700/50 shadow-lg backdrop-blur-lg hover:shadow-indigo-500/10 transition-all"
        >
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
                {project.title}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mb-2">{project.description}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{date}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {project.technologies?.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs font-medium rounded-full bg-indigo-100/70 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200/30 dark:border-indigo-700/30"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {project.github && (
                <Link
                  href={project.github}
                  target="_blank"
                  className="flex items-center gap-2 px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow-lg shadow-indigo-500/20 transition-transform hover:scale-105"
                >
                  <Github className="h-4 w-4" /> GitHub
                </Link>
              )}
              {project.deploy && (
                <Link
                  href={project.deploy}
                  target="_blank"
                  className="flex items-center gap-2 px-5 py-2 rounded-lg bg-gray-900 hover:bg-gray-800 text-white font-medium shadow-md transition-transform hover:scale-105"
                >
                  <Globe className="h-4 w-4" /> Live Demo
                </Link>
              )}
            </div>
          </div>
        </motion.div>
      </section>

      {/* 📸 Gallery with Lightbox */}
      {project.screenshots && project.screenshots.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 pb-20">
          <h2 className="text-2xl font-semibold text-center mb-8">Gallery</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {project.screenshots.map((shot, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="relative rounded-xl overflow-hidden border border-gray-300/40 dark:border-gray-700/40 bg-white/20 dark:bg-gray-900/30 backdrop-blur-md shadow-md cursor-pointer"
                onClick={() => setLightboxIndex(i)}
              >
                <Image
                  src={shot.src}
                  alt={shot.alt || `Screenshot ${i + 1}`}
                  width={500}
                  height={350}
                  className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                />
              </motion.div>
            ))}
          </div>

          {/* Lightbox */}
          <AnimatePresence>
            {lightboxIndex !== null && (
              <motion.div
                className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setLightboxIndex(null)}
              >
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="relative max-w-5xl w-full p-4"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => setLightboxIndex(null)}
                    className="absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white hover:bg-black/70"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <div className="relative w-full h-[70vh] rounded-xl overflow-hidden">
                    <Image
                      src={project.screenshots[lightboxIndex].src}
                      alt={project.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                  {lightboxIndex > 0 && (
                    <button
                      onClick={() => setLightboxIndex(lightboxIndex - 1)}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                  )}
                  {lightboxIndex < project.screenshots.length - 1 && (
                    <button
                      onClick={() => setLightboxIndex(lightboxIndex + 1)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      )}

      {/* 🧩 Overview */}
      <section className="max-w-6xl mx-auto px-4 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="p-8 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 bg-white/50 dark:bg-gray-900/50 backdrop-blur-lg shadow-md"
        >
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Overview</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {project.longDescription ||
              "This project showcases a blend of performance, elegant design, and seamless interaction between backend and frontend."}
          </p>
        </motion.div>
      </section>

      {/* 🧭 Navigation */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <Link
            href={`/projects/${projects[projects.indexOf(project) - 1]?.slug || ""}`}
            className={`flex-1 text-center px-6 py-4 rounded-xl border border-gray-300/50 dark:border-gray-700/50 bg-white/20 dark:bg-gray-900/30 text-gray-800 dark:text-gray-200 font-medium hover:scale-[1.03] hover:bg-indigo-100/30 dark:hover:bg-indigo-900/30 transition-all ${
              projects.indexOf(project) === 0 ? "pointer-events-none opacity-40" : ""
            }`}
          >
            ← Previous Project
          </Link>
          <Link
            href={`/projects/${projects[projects.indexOf(project) + 1]?.slug || ""}`}
            className={`flex-1 text-center px-6 py-4 rounded-xl border border-gray-300/50 dark:border-gray-700/50 bg-white/20 dark:bg-gray-900/30 text-gray-800 dark:text-gray-200 font-medium hover:scale-[1.03] hover:bg-indigo-100/30 dark:hover:bg-indigo-900/30 transition-all ${
              projects.indexOf(project) === projects.length - 1
                ? "pointer-events-none opacity-40"
                : ""
            }`}
          >
            Next Project →
          </Link>
        </div>
      </section>
    </main>
  );
}
