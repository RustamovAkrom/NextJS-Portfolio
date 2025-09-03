"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface Project {
  title: string;
  description: string;
  image: string;
  github: string;
  deploy: string;
  slug: string;
  date: string;
  technologies: string[];
  screenshots: [];
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filterYear, setFilterYear] = useState<string>("all");

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

  const years = Array.from(new Set(projects.map((p) => p.date.slice(0, 4))));
  const filteredProjects =
    filterYear === "all"
      ? projects
      : projects.filter((p) => p.date.startsWith(filterYear));

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
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
            A collection of my recent work showcasing web applications, user
            interfaces, and digital experiences crafted with modern
            technologies.
          </p>
        </motion.div>
      </section>

      {/* Filter */}
      <div className="max-w-4xl mx-auto px-4 mb-10 flex flex-wrap justify-center gap-3">
        <button
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
            filterYear === "all"
              ? "bg-indigo-500 text-white"
              : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
          }`}
          onClick={() => setFilterYear("all")}
        >
          All
        </button>
        {years.map((year) => (
          <button
            key={year}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-4 pb-20">
        <AnimatePresence>
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
              className="group flex flex-col rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
            >
              {/* Image */}
              <div className="relative w-full h-48 sm:h-52 overflow-hidden">
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
                <h2 className="text-indigo-600 dark:text-indigo-400 font-semibold text-base sm:text-lg mb-1">
                  {project.title}
                </h2>
                <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-2 mb-3">
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
                <Link
                  href={`projects/${project.slug}`}
                  className="mt-auto w-full text-center py-2 rounded-md border border-gray-200 dark:border-gray-700 bg-indigo-500/90 hover:bg-indigo-600 dark:hover:bg-indigo-500 text-white text-sm font-medium transition-colors"
                >
                  Details
                </Link>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Mention Section */}
      <div className="max-w-4xl mx-auto px-4 pb-14 text-center">
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-300 text-xs font-medium mb-2">
          Mention
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          All projects are open-source and available on my GitHub. Feel free to
          explore, contribute, or reach out for collaboration!
        </p>
      </div>
    </main>
  );
}

// "use client";

// import Image from "next/image";
// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import Link from "next/link";


// interface Project {
//     title: string;
//     description: string;
//     image: string;
//     link: string;
//     date: string;
//     technologies: string[];
// }

// export default function ProjectsPage() {
//   const [projects, setProjects] = useState<Project[]>([]);
//   const [filterYear, setFilterYear] = useState<string>("all");

//   useEffect(() => {
//     const fetchProjects = async () => {
//       try {
//         const res = await fetch("/api/projects");
//         const data = await res.json();
//         setProjects(data);
//       } catch (err) {
//         console.error("Failed to fetch projects:", err);
//       }
//     };
//     fetchProjects();
//   }, []);

//   const years = Array.from(new Set(projects.map(p => p.date.slice(0, 4))));
//   const filteredProjects =
//     filterYear === "all"
//       ? projects
//       : projects.filter(p => p.date.startsWith(filterYear));

//   return (
//     <main className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      
//       {/* Header Section */}
//       <section className="py-16 lg:py-28 text-center px-4 sm:px-6 lg:px-8">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="space-y-4"
//         >
//           <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-100/20 dark:bg-indigo-900/20 text-indigo-500 dark:text-indigo-300 text-sm font-medium">
//             My Work
//           </div>
//           <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100">
//             Featured <span className="text-indigo-500 dark:text-indigo-400">Projects</span>
//           </h1>
//           <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
//             A collection of my recent work showcasing web applications, user interfaces, and digital experiences crafted with modern technologies.
//           </p>
//         </motion.div>
//       </section>

//       {/* Filter */}
//       <div className="max-w-4xl mx-auto px-4 mb-8 flex flex-wrap justify-center gap-3">
//         <button
//           className={`px-4 py-2 rounded-full font-medium transition-colors ${
//             filterYear === "all"
//               ? "bg-indigo-500 text-white"
//               : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
//           }`}
//           onClick={() => setFilterYear("all")}
//         >
//           All
//         </button>
//         {years.map(year => (
//           <button
//             key={year}
//             className={`px-4 py-2 rounded-full font-medium transition-colors ${
//               filterYear === year
//                 ? "bg-indigo-500 text-white"
//                 : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
//             }`}
//             onClick={() => setFilterYear(year)}
//           >
//             {year}
//           </button>
//         ))}
//       </div>

//       {/* Projects Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-4 pb-20">
//         <AnimatePresence>
//           {filteredProjects.map((project, idx) => (
//             <motion.div
//               key={project.title}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.6, delay: idx * 0.1 }}
//               className="group relative overflow-hidden rounded-xl sm:rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-300 border border-white/10 dark:border-gray-700/30 bg-white/30 dark:bg-gray-900/30 backdrop-blur-sm"
//             >
//               {/* Image */}
//               <div className="relative w-full h-52 sm:h-64">
//                 <Image
//                   src={project.image}
//                   alt={project.title}
//                   fill
//                   className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
//                   sizes="(max-width: 768px) 100vw, 33vw"
//                   priority={idx === 0}
//                 />

//                 {/* Overlay текст для mobile */}
//                 <div className="absolute inset-0 bg-black/25 flex flex-col justify-end p-3 sm:hidden">
//                   <h2 className="text-white font-semibold text-lg line-clamp-1">{project.title}</h2>
//                   <p className="text-white text-sm line-clamp-2 mt-1">{project.description}</p>
//                   <Link
//                     href={project.link}
//                     className="mt-2 w-full text-center py-1 rounded-md bg-white/20 text-white font-medium hover:bg-white/30 transition-colors"
//                   >
//                     Details
//                   </Link>
//                 </div>
//               </div>

//               {/* Web текст */}
//               <div className="hidden sm:flex flex-col p-4 sm:p-6">
//                 <h2 className="text-indigo-500 dark:text-indigo-400 font-semibold text-lg mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors">
//                   {project.title}
//                 </h2>
//                 <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">{project.description}</p>
//                 <div className="flex flex-wrap gap-1 mb-2">
//                   {project.technologies?.map((tech: string) => (
//                     <span
//                       key={tech}
//                       className="px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-100/40 dark:bg-indigo-900/30 text-indigo-500 dark:text-indigo-300"
//                     >
//                       {tech}
//                     </span>
//                   ))}
//                 </div>
//                 <Link
//                   href={project.link}
//                   className="mt-auto text-center py-2 rounded-lg border border-white/20 dark:border-gray-600/40 bg-white/10 dark:bg-gray-700/20 text-white font-medium hover:bg-white/20 dark:hover:bg-gray-700/30 transition-all duration-300"
//                 >
//                   Details
//                 </Link>
//               </div>
//             </motion.div>
//           ))}
//         </AnimatePresence>
//       </div>



//       {/* Mention Section */}
//       <div className="max-w-4xl mx-auto px-4 pb-12 text-center">
//         <div className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-300 text-xs font-medium mb-2">
//           Mention
//         </div>
//         <p className="text-gray-500 dark:text-gray-400 text-sm">
//           All projects are open-source and available on my GitHub. Feel free to explore, contribute, or reach out for collaboration!
//         </p>
//       </div>
//     </main>
//   );
// }
