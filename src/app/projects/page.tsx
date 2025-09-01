"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Project {
    title: string;
    description: string;
    image: string;
    link: string;
    date: string;
    technologies: string[];
}

export default function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [filterYear, setFilterYear] = useState<string>("all");

    // Загружаем проекты с API
    useEffect(() => {
        const fetchProjects = async () => {
        try {
            const res = await fetch("/api/projects");
            const data = await res.json();
            setProjects(data);
        } catch (err) {
            console.error("Failed to fetch projects:", err);
        }
        };
        fetchProjects();
    }, []);

    // Получаем все уникальные годы
    const years = Array.from(new Set(projects.map(p => p.date.slice(0, 4))));

    const filteredProjects =
        filterYear === "all"
        ? projects
        : projects.filter(p => p.date.startsWith(filterYear));
    return (
        <main className="min-h-screen bg-gradient-to-br from-green-50/50 via-background to-green-50/30 dark:from-green-950/20 dark:via-background dark:to-green-900/10 transition-colors">
            {/* Header Section */}
            <section className="py-20 lg:py-32">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-6"
                    >
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-100/10 dark:bg-indigo-900/20 text-indigo-500 dark:text-indigo-300 text-sm font-medium">
                            My Work
                        </div>
                        <h1 className="text-4xl lg:text-5xl font-bold leading-tight text-gray-900 dark:text-gray-100">
                            Featured <span className="text-indigo-500 dark:text-indigo-400">Projects</span>
                        </h1>
                        <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
                            A collection of my recent work showcasing web applications, user interfaces, and digital experiences crafted with modern technologies and creative problem-solving.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Filter */}
            <div className="max-w-4xl mx-auto px-4 mb-8 flex justify-center gap-4">
                <button
                    className={`px-4 py-2 rounded-full font-medium transition-colors ${
                        filterYear === "all"
                            ? "bg-indigo-500 text-white"
                            : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                    }`}
                    onClick={() => setFilterYear("all")}
                >
                    All
                </button>
                {years.map(year => (
                    <button
                        key={year}
                        className={`px-4 py-2 rounded-full font-medium transition-colors ${
                            filterYear === year
                                ? "bg-indigo-500 text-white"
                                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                        }`}
                        onClick={() => setFilterYear(year)}
                    >
                        {year}
                    </button>
                ))}
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 w-full max-w-7xl mx-auto px-4 pb-20">
                <AnimatePresence>
                    {filteredProjects.map((project, idx) => (
                        <motion.a
                            key={project.title}
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 40 }}
                            transition={{ duration: 0.6, delay: idx * 0.15 }}
                            className="group bg-white/70 dark:bg-neutral-900/70 rounded-3xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl flex flex-col items-center backdrop-blur-md border border-white/10 dark:border-indigo-900/20"
                            style={{ minHeight: 430 }}
                        >
                            <div className="w-full h-64 relative">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover w-full h-full transition-all duration-300 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                    priority={idx === 0}
                                />
                            </div>
                            <div className="p-10 flex flex-col flex-1 justify-between w-full">
                                <h2 className="text-2xl font-semibold text-indigo-500 dark:text-indigo-400 mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors">
                                    {project.title}
                                </h2>
                                <p className="text-gray-700 dark:text-gray-300 mb-4">
                                    {project.description}
                                </p>
                                {/* Technologies Badges */}
                                {project.technologies && (
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.technologies.map((tech: string) => (
                                            <span
                                                key={tech}
                                                className="px-3 py-1 rounded-full bg-indigo-100/60 dark:bg-indigo-900/30 text-indigo-500 dark:text-indigo-300 text-xs font-medium border border-indigo-200/40 dark:border-indigo-900/40"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                )}
                                <span className="text-sm text-gray-400 dark:text-gray-500 mb-6">
                                    {new Date(project.date).toLocaleDateString(undefined, {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                    })}
                                </span>
                                <span className="mt-auto inline-block px-5 py-2 rounded-full bg-indigo-400/60 dark:bg-indigo-700/60 text-white font-medium shadow hover:bg-indigo-500 dark:hover:bg-indigo-600 transition-all border border-white/10">
                                    Details
                                </span>
                            </div>
                        </motion.a>
                    ))}
                </AnimatePresence>
            </div>

            {/* Mention Section */}
            <div className="max-w-4xl mx-auto px-4 pb-12 text-center">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-300 text-xs font-medium mb-2">
                    Mention
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                    All projects are open-source and available on my GitHub. Feel free to explore, contribute, or reach out for collaboration!
                </p>
            </div>
        </main>
    );
}
