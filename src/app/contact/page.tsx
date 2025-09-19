"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { contactCards, socialLinks } from "@/config/contact";
import { iconMap } from "@/lib/iconMap";

// Контактные карточки
function ContactInfoSection() {
  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="space-y-4">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Contact Information
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-lg">
          Feel free to reach out through any of these channels. Always open to
          new opportunities and creative projects.
        </p>
      </div>

      <div className="space-y-4">
        {contactCards.map((card, idx) => {
          const Icon = iconMap[card.icon];
          return (
            <motion.div
              key={card.title}
              className="flex items-center gap-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-sm hover:shadow-md transition-all"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + idx * 0.1, duration: 0.6 }}
            >
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-lg bg-indigo-50 dark:bg-indigo-900/30">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-sm text-gray-500 dark:text-gray-400">
                  {card.title}
                </h3>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {card.value}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {card.desc}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

// Форма
function SendMessageForm() {
  const [status, setStatus] = useState("");
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("Sending...");

    const form = new FormData(e.currentTarget);
    const data = Object.fromEntries(form.entries());

    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setStatus("Message sent successfully ✅");
    } catch (err) {
      console.error(err);
      setStatus("Something went wrong ❌");
    } finally {
      formRef.current?.reset();
      setTimeout(() => setStatus(""), 3000);
      router.refresh();
    }
  };

  return (
    <motion.form
      ref={formRef}
      onSubmit={handleSubmit}
      className="mx-auto max-w-xl space-y-6 bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.7 }}
    >
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center">
        Send me a message
      </h2>

      <p className="text-center text-gray-600 dark:text-gray-400">
        I’d love to hear from you! Just fill out this form.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <input
          name="first-name"
          type="text"
          placeholder="First name"
          required
          className="rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
        />
        <input
          name="last-name"
          type="text"
          placeholder="Last name"
          required
          className="rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <input
        name="email"
        type="email"
        placeholder="example@gmail.com"
        required
        className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
      />

      <input
        name="phone"
        type="text"
        placeholder="+998 (01) 234-56-78"
        className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
      />

      <textarea
        name="message"
        rows={4}
        placeholder="Write your message..."
        required
        className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
      />

      <button
        type="submit"
        className="w-full rounded-lg bg-indigo-600 px-4 py-3 text-white font-semibold hover:bg-indigo-500 transition"
      >
        Send Message
      </button>
      
      {status && <p className="text-center mt-2">{status}</p>}
    </motion.form>
  );
}

// Главная страница
export default function ContactPage() {
  return (
    <motion.div
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-foreground"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Заголовок */}
      <div className="text-center mb-16">
        <motion.div
          className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-5"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          ✨ Get In Touch
        </motion.div>

        <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
          Let’s Build Something <span className="text-primary">Amazing</span>
        </h1>

        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Ready to bring your ideas to life? I’d love to hear about your project
          and discuss how we can work together.
        </p>
      </div>

      {/* Контент */}
      <div className="grid lg:grid-cols-2 gap-16">
        <ContactInfoSection />
        <SendMessageForm />
      </div>

{/* 🌐 Социальные ссылки */}
<div className="mt-16 text-center space-y-4">
  <h3 className="text-lg font-medium text-muted-foreground tracking-wide">
    Follow Me
  </h3>

  <div className="flex items-center justify-center gap-4 flex-wrap">
    {socialLinks.map((link, idx) => {
      const Icon = iconMap[link.icon];
      return (
        <motion.a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center justify-center h-10 w-10 rounded-full 
                     border border-primary/10 bg-background/40 
                     shadow-sm hover:border-primary/30
                     transition-all duration-300"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 + idx * 0.08, duration: 0.25 }}
        >
          {/* ✨ легкое свечение при hover */}
          <span className="absolute inset-0 rounded-full bg-blue-500/10 blur-md opacity-0 
                           group-hover:opacity-100 transition-opacity duration-300"></span>

          {/* иконка */}
          <Icon className="relative z-10 h-4 w-4 text-muted-foreground group-hover:text-blue-400 transition-colors duration-300" />
          <span className="sr-only">{link.label}</span>
        </motion.a>
      );
    })}
  </div>
</div>


    </motion.div>
  );
}
