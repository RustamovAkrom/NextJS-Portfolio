"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import type { ServiceType } from "@/types/services";

export default function ServicesPage() {
  const [services, setServices] = useState<ServiceType[]>([]);

  useEffect(() => {
    async function fetchServices() {
      const res = await fetch("/api/services", { cache: "no-store" });
      const data = await res.json();
      setServices(data);
    }
    fetchServices();
  }, []);

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
            Services
          </h1>

          <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            Backend development, API architecture and AI integrations for modern products and startups.
          </p>
        </motion.div>
      </section>

      {/* Services grid */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-24">
        {services.map((service, index) => {
          const Icon = (Icons[service.icon] ??
            Icons.Settings) as LucideIcon;

          return (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="border border-gray-200 dark:border-gray-800 rounded-xl p-6 bg-white dark:bg-black"
            >
              {/* Title */}
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-md border border-gray-200 dark:border-gray-800">
                  <Icon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                </div>

                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {service.title}
                </h2>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-2">
                {service.features.map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-start text-sm text-gray-700 dark:text-gray-400"
                  >
                    <CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 text-gray-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto pb-20 text-center">
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Looking for backend development or AI integration?{" "}
          <Link
            href="/contact"
            className="underline hover:text-gray-900 dark:hover:text-white"
          >
            Contact me
          </Link>
          .
        </p>
      </section>
    </main>
  );
}
