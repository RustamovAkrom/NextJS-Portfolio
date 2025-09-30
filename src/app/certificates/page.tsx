"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { CertificateType } from "@/types/certificates";

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState<CertificateType[]>([]);

  useEffect(() => {
    fetch("/api/certificates")
      .then((res) => res.json())
      .then((data) => setCertificates(data))
      .catch((err) => console.error("Error fetching certificates:", err));
  }, []);

  if (!certificates || certificates.length === 0) {
    return <p className="text-center py-10">No certificates found.</p>;
  }

  return (
    <div className="container py-16">
      {/* Заголовок */}
      <motion.h2
        initial={{ y: 40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-3xl sm:text-4xl font-bold text-center mb-12"
      >
        Certificates
      </motion.h2>

      {/* Сетка карточек */}
<div className="pt-10 border-t border-gray-200 dark:border-gray-700">
  {certificates.map((cert, idx) => (
<motion.div
  key={cert.id}
  initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
  whileInView={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.6, delay: idx * 0.1 }}
  className="text-center"
>
      <div className="relative w-full max-w-3xl mx-auto mt-5">
        <Image
          src={cert.image}
          alt={cert.title}
          width={1000}
          height={600}
          className="rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm object-contain"
        />
      </div>
<p className="mt-4 text-base font-medium text-gray-800 dark:text-gray-200">
  {cert.title}
</p>
<div className="mx-auto mt-2 h-0.5 w-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
    </motion.div>
  ))}
</div>

    </div>
  );
}
