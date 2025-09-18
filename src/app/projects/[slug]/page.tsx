"use client";

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Globe, ArrowLeft, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useState, use } from "react";

interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  date: string;
  technologies: string[];
  github?: string;
  deploy?: string;
  screenshots?: { src: string; alt?: string }[];
}

export default function ProjectDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  // Lightbox
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

  if (loading) return <p className="text-center py-20">Загрузка...</p>;
  const project: Project | undefined = projects.find((p) => p.slug === slug);
  if (!project) return notFound();

  const date = new Date(project.date).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <main className="min-h-screen mt-20">
      {/* Back button */}
      <div className="max-w-5xl mx-auto px-4 pt-6">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Projects
        </Link>
      </div>

      {/* Hero image */}
      <div className="max-w-5xl mx-auto px-4 pt-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative w-full h-72 sm:h-96 rounded-xl overflow-hidden shadow-lg border border-gray-200/50 dark:border-gray-700/50 bg-white/40 dark:bg-gray-900/40 backdrop-blur-md"
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover hover:scale-105 transition-transform duration-700"
          />
        </motion.div>
      </div>

      {/* Header */}
      <section className="max-w-5xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-xl border border-gray-200/50 dark:border-gray-700/50 bg-white/40 dark:bg-gray-900/40 backdrop-blur-md shadow-md p-6 md:p-8"
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                {project.title}
              </h1>
              <p className="mt-2 text-gray-600 dark:text-gray-400">{project.description}</p>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{date}</p>

              {/* Tech badges */}
              <div className="mt-4 flex flex-wrap gap-2">
                {project.technologies?.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-gray-200/60 dark:bg-gray-800/50 text-gray-800 dark:text-gray-200 border border-gray-300/50 dark:border-gray-700/50"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              {project.github && (
                <Link
                  href={project.github}
                  target="_blank"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-500/90 hover:bg-indigo-600 dark:hover:bg-indigo-500 text-white text-sm font-medium shadow-md transition-transform hover:scale-105"
                >
                  <Github className="h-4 w-4" /> GitHub
                </Link>
              )}
              {project.deploy && (
                <Link
                  href={project.deploy}
                  target="_blank"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-700/80 hover:bg-gray-800 dark:bg-gray-100/10 dark:hover:bg-gray-100/20 text-white dark:text-gray-100 text-sm font-medium shadow-md transition-transform hover:scale-105"
                >
                  <Globe className="h-4 w-4" /> Live Demo
                </Link>
              )}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Gallery */}
      {project.screenshots && project.screenshots.length > 0 && (
        <section className="max-w-5xl mx-auto px-4 pb-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {project.screenshots.map((shot, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="relative w-full h-52 sm:h-64 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-100/60 dark:bg-gray-800/50 shadow-md cursor-pointer"
              onClick={() => setLightboxIndex(i)}
            >
              <Image
                src={shot.src}
                alt={shot.alt || `Screenshot ${i + 1}`}
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </motion.div>
          ))}
        </section>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && project.screenshots && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxIndex(null)} // 👈 закрытие по клику на фон
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()} // чтобы клик по картинке не закрывал
            >
              {/* Close button */}
              <button
                type="button"
                onClick={() => setLightboxIndex(null)}
                className="absolute top-2 right-2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition z-50"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Image */}
              {lightboxIndex !== null && (
                <div className="relative w-full h-[70vh] rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src={project.screenshots[lightboxIndex].src}
                    alt={project.screenshots[lightboxIndex].alt || "Screenshot"}
                    fill
                    className="object-contain"
                  />
                </div>
              )}

              {/* Navigation arrows */}
              {lightboxIndex > 0 && (
                <button
                  type="button"
                  onClick={() =>
                    setLightboxIndex((prev) => (prev !== null ? prev - 1 : prev))
                  }
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
              )}
              {lightboxIndex < project.screenshots.length - 1 && (
                <button
                  type="button"
                  onClick={() =>
                    setLightboxIndex((prev) => (prev !== null ? prev + 1 : prev))
                  }
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Description */}
      <section className="max-w-5xl mx-auto px-4 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="rounded-xl border border-gray-200/50 dark:border-gray-700/50 bg-white/40 dark:bg-gray-900/40 backdrop-blur-md shadow-md p-6 md:p-8"
        >
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Overview</h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-3 text-gray-700 dark:text-gray-300 leading-relaxed"
          >
            {project.longDescription ||
              "This project highlights a modern, clean design with responsive layout, light/dark mode support, and elegant transitions."}
          </motion.p>
        </motion.div>
      </section>
    </main>
  );
}
