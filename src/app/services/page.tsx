"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Sparkles } from "lucide-react";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import type { ServiceType } from "@/types/services";

export default function ServicesPage() {
  const [services, setServices] = useState<ServiceType[]>([]);

  useEffect(() => {
    async function fetchServices() {
      const res = await fetch("/api/services");
      const data = await res.json();
      setServices(data);
    }
    fetchServices();
  }, []);

  return (
    <section className="relative overflow-hidden py-20">
      {/* 🔹 Градиентный фон с мягким свечением */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-50 via-white to-indigo-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900" />
      <div className="absolute -top-20 left-1/2 w-[600px] h-[600px] bg-indigo-400/20 dark:bg-indigo-600/20 rounded-full blur-3xl -translate-x-1/2" />

      <div className="relative container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Заголовок */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight 
                       bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
                       bg-clip-text text-transparent"
          >
            My Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-4 text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-400 
                       max-w-2xl mx-auto"
          >
            I offer modern, scalable and creative digital solutions — from idea
            to launch.
          </motion.p>
        </div>

        {/* Список сервисов */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {services.map((service, index) => {
            const Icon = (Icons[service.icon] ?? Sparkles) as LucideIcon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
              >
                <Card
                  className="group h-full rounded-2xl shadow-md hover:shadow-xl 
                             bg-gradient-to-br from-white/60 to-white/30 
                             dark:from-gray-800/50 dark:to-gray-900/40 
                             backdrop-blur-md border border-gray-200/40 dark:border-gray-700/40 
                             transition-transform hover:-translate-y-1 hover:scale-[1.03]"
                >
                  <CardHeader className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 text-white">
                      <Icon className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                      {service.description}
                    </p>
                    <ul className="space-y-2">
                      {service.features.map((feature, i) => (
                        <li
                          key={i}
                          className="flex items-start text-sm sm:text-base text-gray-700 dark:text-gray-400"
                        >
                          <CheckCircle2 className="w-4 h-4 text-indigo-500 mr-2 mt-0.5 shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>

                  {/* Подсветка при наведении */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity 
                               bg-gradient-to-r from-indigo-400/10 via-purple-400/10 to-pink-400/10"
                  />
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Mention Section */}
        <div className="max-w-4xl mx-auto text-center mt-24 relative z-10">
          <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent mb-6" />
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Want to start a project?{" "}
            <Link
              href="/contact"
              className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
            >
              Contact me
            </Link>{" "}
            and let’s create something amazing ✨
          </p>
        </div>
      </div>
    </section>
  );
}
