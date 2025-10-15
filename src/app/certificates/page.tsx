"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Download, X } from "lucide-react";
import type { CertificateType } from "@/types/certificates";

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState<CertificateType[]>([]);
  const [selected, setSelected] = useState<CertificateType | null>(null);
  const [copied, setCopied] = useState(false);

  // 🧩 Fetch API
  useEffect(() => {
    fetch("/api/certificates")
      .then((res) => res.json())
      .then((data) => setCertificates(data))
      .catch((err) => console.error("Error fetching certificates:", err));
  }, []);

  // 🧠 Copy link
  const handleCopy = async (cert: CertificateType) => {
    const link = `${window.location.origin}${cert.image}`;
    await navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  // 📥 Download
  const handleDownload = (cert: CertificateType) => {
    const link = document.createElement("a");
    link.href = cert.image;
    link.download = cert.title.replace(/\s+/g, "_") + ".jpg";
    link.click();
  };

  if (!certificates || certificates.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500 dark:text-gray-400 text-lg">
        No certificates found.
      </div>
    );
  }

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* 🌈 Фон */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-950 dark:to-indigo-950 opacity-70" />

      {/* 🔹 Заголовок */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white">
          My{" "}
          <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
            Certificates
          </span>
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Proof of my achievements and continuous learning journey.
        </p>
        <div className="mx-auto mt-6 h-1 w-24 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" />
      </motion.div>

      {/* 🧾 Сетка карточек */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {certificates.map((cert, idx) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="group relative rounded-2xl overflow-hidden bg-white/70 dark:bg-gray-900/50 
                       border border-gray-200/50 dark:border-gray-800/70 shadow-md 
                       hover:shadow-xl backdrop-blur-md transition-all cursor-pointer"
            onClick={() => setSelected(cert)}
          >
            {/* 🖼️ Фото */}
            <div className="relative w-full aspect-video">
              <Image
                src={cert.image}
                alt={cert.title}
                width={1000}
                height={600}
                className="object-contain rounded-t-2xl w-full h-full"
              />
            </div>

            {/* 🧠 Инфо */}
            <div className="p-5 text-center">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                {cert.title}
              </h3>
              <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">
                {cert.organization}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500">
                {cert.date}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 🪩 Modal — просмотр сертификата */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-2xl w-[95%] max-w-4xl"
            >
              {/* 🔘 Закрыть */}
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 z-10 bg-gray-900/70 dark:bg-gray-700/70 text-white p-2 rounded-full hover:bg-gray-800 transition"
              >
                <X size={18} />
              </button>

              {/* 🖼️ Фото */}
              <div className="relative w-full h-[70vh] bg-black">
                <Image
                  src={selected.image}
                  alt={selected.title}
                  fill
                  className="object-contain"
                />
              </div>

              {/* 📋 Инфо */}
              <div className="p-6 text-center">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {selected.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  {selected.organization} — {selected.date}
                </p>

                {/* ⚙️ Кнопки */}
                <div className="flex justify-center gap-4 mt-6">
                  <button
                    onClick={() => handleCopy(selected)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white transition"
                  >
                    <Copy size={16} />
                    {copied ? "Copied!" : "Copy Link"}
                  </button>
                  <button
                    onClick={() => handleDownload(selected)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-500 hover:bg-purple-600 text-white transition"
                  >
                    <Download size={16} />
                    Download
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
