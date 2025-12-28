"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { HomeContentType } from "@/types/home";
import { FaGithub, FaCoffee, FaCode } from "react-icons/fa";

export default function Home() {
  const [content, setContent] = useState<HomeContentType | null>(null);
  const [image, setImage] = useState<string>("");

  useEffect(() => {
    fetch("/api/home")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setContent(data[0]);
          if (data[0].images?.length) setImage(data[0].images[0]);
        }
      });
  }, []);

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading...
      </div>
    );
  }

  const floatingIcons = [
    { icon: <FaGithub size={20} />, angle: 0 },
    { icon: <FaCoffee size={20} />, angle: 120 },
    { icon: <FaCode size={20} />, angle: 240 },
  ];

  return (
    <main className="relative overflow-hidden min-h-screen px-4 sm:px-6 lg:px-8">
      {/* HERO SECTION */}
      <section className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-10 md:gap-16 items-center min-h-screen py-12 md:py-24">
        {/* LEFT: TEXT */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-4 sm:space-y-5 md:space-y-6"
        >
          {/* Status */}
          <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-4 sm:py-2 rounded-full border border-gray-200 dark:border-gray-700 text-xs sm:text-sm md:text-base">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            Open to new projects
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
            {content.title}
          </h1>

          {/* Description */}
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-md md:max-w-lg">
            {content.description}
          </p>

          {/* Actions */}
          <div className="flex flex-wrap gap-3 mt-3">
            <Link
              href="/projects"
              className="px-5 sm:px-6 py-2 sm:py-3 rounded-md bg-indigo-600 text-white text-sm sm:text-base md:text-lg font-medium hover:bg-indigo-700 transition"
            >
              View Projects
            </Link>
            <Link
              href="/about"
              className="px-5 sm:px-6 py-2 sm:py-3 rounded-md border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm sm:text-base md:text-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              About Me
            </Link>
            {content.resume && (
              <a
                href={content.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 sm:px-6 py-2 sm:py-3 rounded-md border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm sm:text-base md:text-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                Resume
              </a>
            )}
          </div>
        </motion.div>

        {/* RIGHT: IMAGE + FLOATING ICONS */}
        <div className="relative flex justify-center md:justify-end mt-8 md:mt-0">
          {image && (
            <>
              {/* Floating icons */}
              {floatingIcons.map((it, idx) => {
                const radius = 60; // базовое расстояние
                const radiusMd = 90; // для веб
                const angleRad = (it.angle * Math.PI) / 180;
                const x = radius + (radiusMd - radius) * (window.innerWidth >= 768 ? 1 : 0) * Math.cos(angleRad);
                const y = radius + (radiusMd - radius) * (window.innerWidth >= 768 ? 1 : 0) * Math.sin(angleRad);

                return (
                  <motion.div
                    key={idx}
                    animate={{ y: ["0%", "-6%", "0%"] }}
                    transition={{ duration: 2 + idx * 0.3, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 rounded-full flex items-center justify-center bg-white/10 dark:bg-black/20 border border-white/20 dark:border-gray-700 shadow"
                    style={{
                      top: "50%",
                      left: "50%",
                      transform: `translate(${x}px, ${y}px)`,
                    }}
                  >
                    <span className="text-indigo-600 dark:text-indigo-300">{it.icon}</span>
                  </motion.div>
                );
              })}

              {/* Profile Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="relative w-40 sm:w-56 md:w-72 lg:w-80 h-40 sm:h-56 md:h-72 lg:h-80 rounded-full overflow-hidden border border-gray-200 dark:border-gray-700"
              >
                <Image src={image} alt="Profile" fill className="object-cover" priority />
              </motion.div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
