"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Sparkles } from "lucide-react";
import * as  Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";


interface Service {
  title: string;
  description: string;
  icon: keyof typeof Icons;
  features: string[];
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    async function fetchServices() {
      const res = await fetch("/api/services");
      const data = await res.json();
      setServices(data);
    }
    fetchServices();
  }, []);

  return (
    <section className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      {/* Заголовок */}
      <div className="text-center mb-14">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight 
                     text-gray-900 dark:text-white"
        >
          My <span className="text-indigo-500">Services</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-4 text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-400 
                     max-w-2xl mx-auto"
        >
          I provide professional and high-quality services to help businesses
          and individuals succeed in the digital world.
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
                className="h-full rounded-2xl shadow-md hover:shadow-2xl 
                           transition-transform transform hover:scale-[1.03]
                           bg-white/40 dark:bg-gray-800/40 
                           backdrop-blur-md border border-gray-200/40 dark:border-gray-700/40"
              >
                <CardHeader className="flex items-center gap-3">
                  <Icon className="w-8 h-8 text-indigo-500 shrink-0" />
                  <CardTitle className="text-lg sm:text-xl text-gray-900 dark:text-white">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-start text-sm sm:text-base text-gray-700 dark:text-gray-400"
                      >
                        <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 mt-0.5 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
