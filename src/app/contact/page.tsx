"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { contactCards, socialLinks } from "@/config/contact";
import { iconMap } from "@/lib/iconMap";

// ✅ Контактные карточки
function ContactInfoSection() {
  return (
    <motion.div
      className="space-y-8 relative z-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="space-y-4">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Contact Information
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-lg">
          Feel free to reach out — I’m always open to new opportunities and creative ideas.
        </p>
      </div>

      <div className="space-y-4">
        {contactCards.map((card, idx) => {
          const Icon = iconMap[card.icon];
          return (
            <motion.div
              key={card.title}
              className="flex items-center gap-4 rounded-xl border border-gray-200/60 dark:border-gray-700/60 
                         bg-gradient-to-tr from-white/70 to-indigo-50/40 dark:from-gray-800/70 dark:to-indigo-900/20 
                         backdrop-blur-md p-5 shadow-sm hover:shadow-lg transition-all"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + idx * 0.1, duration: 0.6 }}
            >
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-lg 
                              bg-gradient-to-tr from-indigo-500 to-purple-500 text-white shadow-md">
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm text-gray-500 dark:text-gray-400">{card.title}</h3>
                <p className="font-semibold text-gray-900 dark:text-white">{card.value}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{card.desc}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

// ✅ Форма отправки сообщения
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
      setStatus("✅ Message sent successfully!");
    } catch {
      setStatus("❌ Something went wrong.");
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
      className="relative mx-auto max-w-xl space-y-6 rounded-2xl p-8 shadow-lg 
                 bg-gradient-to-br from-white/80 to-indigo-50/60 dark:from-gray-900/80 dark:to-gray-800/70 
                 backdrop-blur-md border border-gray-200/40 dark:border-gray-700/40"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.7 }}
    >
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center">
        Send Me a Message
      </h2>
      <p className="text-center text-gray-600 dark:text-gray-400">
        I’d love to hear from you. Just fill out the form below.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <input
          name="first-name"
          placeholder="First name"
          required
          className="rounded-lg border border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70 
                     px-4 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
        />
        <input
          name="last-name"
          placeholder="Last name"
          required
          className="rounded-lg border border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70 
                     px-4 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <input
        name="email"
        type="email"
        placeholder="example@gmail.com"
        required
        className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70 
                   px-4 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
      />

      <input
        name="phone"
        type="text"
        placeholder="+998 (01) 234-56-78"
        className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70 
                   px-4 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
      />

      <textarea
        name="message"
        rows={4}
        placeholder="Write your message..."
        required
        className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70 
                   px-4 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
      />

      <button
        type="submit"
        className="w-full rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 
                   px-4 py-3 text-white font-semibold shadow-md hover:shadow-lg hover:scale-[1.02] 
                   transition-transform duration-300"
      >
        Send Message
      </button>

      {status && <p className="text-center text-sm mt-2 text-gray-600 dark:text-gray-300">{status}</p>}
    </motion.form>
  );
}

// ✅ Главная страница
export default function ContactPage() {
  return (
    <section className="relative overflow-hidden py-20 mt-20">
      {/* 🔹 Фон */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-50 via-white to-indigo-100 
                      dark:from-gray-900 dark:via-gray-950 dark:to-gray-900" />
      <div className="absolute -top-20 left-1/2 w-[600px] h-[600px] bg-indigo-500/20 dark:bg-indigo-700/20 
                      rounded-full blur-3xl -translate-x-1/2" />

      <motion.div
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Заголовок */}
        <div className="text-center mb-16">
          <motion.div
            className="inline-flex items-center px-4 py-1.5 rounded-full bg-indigo-100/60 dark:bg-indigo-900/30 
                       text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-5"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            ✨ Get In Touch
          </motion.div>

          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 
                         bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
                         bg-clip-text text-transparent">
            Let’s Build Something Amazing
          </h1>

          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Ready to bring your ideas to life? Let’s connect and make it happen.
          </p>
        </div>

        {/* Контент */}
        <div className="grid lg:grid-cols-2 gap-16 relative z-10">
          <ContactInfoSection />
          <SendMessageForm />
        </div>

        {/* 🌐 Социальные ссылки */}
        <div className="mt-20 text-center space-y-4 relative z-10">
          <h3 className="text-lg font-medium text-gray-600 dark:text-gray-400 tracking-wide">
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
                  className="group relative flex items-center justify-center h-11 w-11 rounded-full 
                             border border-indigo-200/20 dark:border-indigo-700/40 bg-white/50 dark:bg-gray-800/60 
                             shadow-sm hover:border-indigo-400/40 transition-all duration-300"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + idx * 0.08, duration: 0.25 }}
                >
                  <span className="absolute inset-0 rounded-full bg-indigo-500/10 blur-md opacity-0 
                                   group-hover:opacity-100 transition-opacity duration-300" />
                  <Icon className="relative z-10 h-5 w-5 text-gray-600 dark:text-gray-300 group-hover:text-indigo-400 transition-colors" />
                  <span className="sr-only">{link.label}</span>
                </motion.a>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
