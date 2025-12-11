"use client";

import { useEffect, useState } from "react";
import { motion, easeOut,easeInOut } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { HomeContentType } from "@/types/home";
import { FaGithub, FaCoffee, FaCode } from "react-icons/fa";
import { ChevronDown } from "lucide-react";

const underlineVariants = {
  hidden: { width: 0 },
  visible: { width: "100%", transition: { duration: 0.8, ease: easeOut } },
};

const badgeFloat = (delay = 0) => ({
  y: ["0%", "-8%", "0%"],
  transition: { delay, duration: 2.6 + delay, repeat: Infinity, ease: easeInOut },
});

// ScrollDownButton встроенный
function ScrollDownButton() {
  const handleScroll = () => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };

  return (
    <motion.button
      onClick={handleScroll}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="group relative flex flex-col items-center justify-center px-4 py-2 rounded-full backdrop-blur-md bg-white/10 dark:bg-gray-800/30 border border-white/20 dark:border-gray-700/40 shadow-lg transition-all duration-300 hover:bg-white/20 hover:shadow-[0_0_15px_rgba(99,102,241,0.4)]"
    >
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="w-6 h-6 text-indigo-500 dark:text-indigo-400 drop-shadow-[0_0_4px_rgba(99,102,241,0.4)]" />
      </motion.div>
      <span className="mt-1 text-xs font-medium bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 bg-clip-text text-transparent animate-gradient-x">
        Scroll Down
      </span>
      <span className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 opacity-0 group-hover:opacity-10 blur-md transition-opacity duration-500" />
    </motion.button>
  );
}

export default function Home() {
  const [content, setContent] = useState<HomeContentType | null>(null);
  const [randomImage, setRandomImage] = useState<string>("");

  useEffect(() => {
    fetch("/api/home")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const home = data[0] as HomeContentType;
          setContent(home);
          if (home.images?.length) {
            const randomIdx = Math.floor(Math.random() * home.images.length);
            setRandomImage(home.images[randomIdx]);
          }
        }
      })
      .catch((err) => console.error("Ошибка загрузки контента:", err));
  }, []);

  if (!content || !randomImage) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-500 animate-pulse">Loading...</p>
      </div>
    );
  }

  const floatingIcons = [
    { icon: <FaGithub size={18} />, label: "GitHub", delay: 0 },
    { icon: <FaCoffee size={18} />, label: "Coffee", delay: 0.35 },
    { icon: <FaCode size={18} />, label: "Code", delay: 0.7 },
  ];

  return (
    <main className="relative overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex flex-col-reverse md:flex-row items-center justify-center max-w-7xl mx-auto px-6 py-8 md:py-16 gap-8 md:gap-20 pt-20">
        {/* STATUS BADGE */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="
            z-80 flex items-center gap-4
            bg-white/20 dark:bg-black/40 backdrop-blur-md border border-white/24 rounded-full
            px-8 py-4 text-xs sm:text-sm font-medium shadow-md
            sm:mx-auto sm:mb-8 sm:mt-4 sm:self-center
            md:absolute md:top-12 md:right-12
          "
          aria-label="Open to new projects"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="text-gray-900 dark:text-gray-100">Open to new projects</span>
        </motion.div>

        {/* TEXT */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/2 text-center md:text-left space-y-6 md:pr-6"
        >
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
              {content.title}
            </h1>
            <motion.div
              variants={underlineVariants}
              initial="hidden"
              animate="visible"
              className="h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full max-w-xs mx-auto md:mx-0"
              aria-hidden
            />
          </div>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto md:mx-0 leading-relaxed">
            {content.description}
          </p>

          {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center justify-center md:justify-start gap-3 sm:gap-3 mt-2">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
              <Link href="/projects" className="block text-center px-6 py-3 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow transition">
                View Portfolio
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
              <a href={content.resume} target="_blank" rel="noopener noreferrer" className="block text-center px-5 py-3 rounded-md border border-gray-200/30 dark:border-gray-700/30 bg-white/6 dark:bg-white/4 text-gray-800 dark:text-gray-100 font-medium transition">
                Download Resume
              </a>
            </motion.div>

            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
              <Link href="/about" className="block text-center px-5 py-3 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                About Me →
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* IMAGE */}
        <div className="w-full md:w-auto flex justify-center md:justify-end relative">
          <div className="relative">
            {/* Glow */}
            <div
              aria-hidden
              className="absolute -z-10 rounded-full"
              style={{
                width: "420px",
                height: "420px",
                filter: "blur(36px)",
                background: "radial-gradient(circle at center, rgba(99,102,241,0.12), rgba(139,92,246,0.04) 45%, transparent 60%)",
                opacity: 0.95,
                right: "-20%",
                top: "-10%",
              }}
            />

            {/* Main Image */}
            <div className="relative rounded-full overflow-hidden shadow-2xl mx-auto w-40 h-40 sm:w-56 sm:h-56 md:w-80 md:h-80 ring-2 ring-indigo-400/20">
              <Image src={randomImage} alt="Portrait" width={640} height={640} priority className="w-full h-full object-cover block" />
            </div>

            {/* Floating icons only md+ */}
            <div className="hidden md:block">
              {floatingIcons.map((it, idx) => {
                const posStyles = [
                  { top: "-12%", left: "50%", transform: "translate(-50%,-50%)" },
                  { top: "50%", left: "-12%", transform: "translate(-50%,-50%)" },
                  { top: "50%", left: "112%", transform: "translate(-50%,-50%)" },
                ];
                const s = posStyles[idx];
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 0 }}
                    animate={badgeFloat(idx * 0.2)}
                    className="absolute z-20 w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md border border-white/10 shadow"
                    style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))", color: "var(--tw-prose-links)", ...s }}
                    aria-label={it.label}
                  >
                    <span className="text-indigo-600 dark:text-indigo-300">{it.icon}</span>
                  </motion.div>
                );
              })}
            </div>

            {/* Scroll Down Button */}
            <div className="absolute bottom-[-2rem] left-1/2 -translate-x-1/2 md:bottom-[-2rem]">
              <ScrollDownButton />
            </div>
          </div>
        </div>
      </section>
       {/* === Favorite Platforms === */}
      <section className="py-20 px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          My Favorite Platforms
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {content.links.map((link, idx) => (
            <motion.a
              key={idx}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="relative p-6 flex flex-col items-center gap-3 border border-gray-300/20 dark:border-gray-700/20 bg-white/10 dark:bg-black/10 backdrop-blur-xl rounded-lg shadow-lg group hover:shadow-2xl transition-all duration-300"
            >
              <div
                className={`absolute inset-0 rounded-lg bg-gradient-to-br ${link.color} opacity-0 group-hover:opacity-50 blur-2xl transition-all`}
              />
              <div className="relative z-10">{link.icon}</div>
              <p className="relative z-10 font-medium">{link.name}</p>
            </motion.a>
          ))}
        </div>
      </section>

      {/* FOOTER CTA */}
      <footer className="py-16 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent mb-8" />
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Want to learn more about my journey?{" "}
            <Link href="/about" className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
              Let’s continue →
            </Link>
          </p>
        </div>
      </footer>
    </main>
  );
}
