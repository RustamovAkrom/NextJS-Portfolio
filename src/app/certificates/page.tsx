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

  useEffect(() => {
    fetch("/api/certificates", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => setCertificates(data))
      .catch((err) => console.error("Error fetching certificates:", err));
  }, []);

  const handleCopy = async (cert: CertificateType) => {
    const link = `${window.location.origin}${cert.image}`;
    await navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleDownload = (cert: CertificateType) => {
    const link = document.createElement("a");
    link.href = cert.image;
    link.download = cert.title.replace(/\s+/g, "_") + ".jpg";
    link.click();
  };

  if (!certificates.length) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 dark:text-gray-400">
        No certificates available.
      </div>
    );
  }

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
            Certificates
          </h1>

          <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            Learning progress and verified achievements.
          </p>
        </motion.div>
      </section>

      {/* Grid */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-24">
        {certificates.map((cert, idx) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.05 }}
            className="border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden bg-white dark:bg-black cursor-pointer"
            onClick={() => setSelected(cert)}
          >
            <div className="relative w-full aspect-video">
              <Image
                src={cert.image}
                alt={cert.title}
                fill
                className="object-contain"
              />
            </div>

            <div className="p-5">
              <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                {cert.title}
              </h3>

              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {cert.organization}
              </p>

              <p className="text-xs text-gray-500 mt-1">{cert.date}</p>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden w-[95%] max-w-4xl"
            >
              {/* Close */}
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 p-2 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-900 transition"
              >
                <X size={16} />
              </button>

              {/* Image */}
              <div className="relative w-full h-[70vh] bg-black">
                <Image
                  src={selected.image}
                  alt={selected.title}
                  fill
                  className="object-contain"
                />
              </div>

              {/* Info */}
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {selected.title}
                </h3>

                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  {selected.organization} — {selected.date}
                </p>

                <div className="flex justify-center gap-4 mt-6">
                  <button
                    onClick={() => handleCopy(selected)}
                    className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 text-sm hover:bg-gray-100 dark:hover:bg-gray-900 transition"
                  >
                    {copied ? "Copied" : "Copy link"}
                  </button>

                  <button
                    onClick={() => handleDownload(selected)}
                    className="px-4 py-2 rounded-md bg-gray-900 text-white dark:bg-white dark:text-black text-sm hover:opacity-90 transition"
                  >
                    Download
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
