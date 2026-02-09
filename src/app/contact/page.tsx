"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { contactCards, socialLinks } from "@/config/contact";
import { iconMap } from "@/lib/iconMap";

/* ================= CONTACT INFO ================= */

function ContactInfoSection() {
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Contact information
        </h2>

        <p className="text-gray-600 dark:text-gray-400 max-w-md">
          Open to backend roles, startup collaborations and AI projects.
        </p>
      </div>

      <div className="space-y-4">
        {contactCards.map((card) => {
          const Icon = iconMap[card.icon];

          return (
            <div
              key={card.title}
              className="flex items-center gap-4 border border-gray-200 dark:border-gray-800 rounded-xl p-5"
            >
              <div className="p-2 rounded-md border border-gray-200 dark:border-gray-800">
                <Icon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </div>

              <div>
                <h3 className="text-sm text-gray-500">{card.title}</h3>
                <p className="font-medium text-gray-900 dark:text-white">
                  {card.value}
                </p>
                <p className="text-sm text-gray-500">{card.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ================= FORM ================= */

function SendMessageForm() {
  const [status, setStatus] = useState<string>("");
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

      setStatus("Message sent successfully.");
    } catch {
      setStatus("Something went wrong.");
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
      className="border border-gray-200 dark:border-gray-800 rounded-xl p-8 space-y-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
        Send a message
      </h2>

      <p className="text-gray-600 dark:text-gray-400">
        Tell me about your project or opportunity.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          name="first-name"
          placeholder="First name"
          required
          className="rounded-md border border-gray-300 dark:border-gray-700 px-4 py-2 bg-white dark:bg-black"
        />
        <input
          name="last-name"
          placeholder="Last name"
          required
          className="rounded-md border border-gray-300 dark:border-gray-700 px-4 py-2 bg-white dark:bg-black"
        />
      </div>

      <input
        name="email"
        type="email"
        placeholder="Email"
        required
        className="w-full rounded-md border border-gray-300 dark:border-gray-700 px-4 py-2 bg-white dark:bg-black"
      />

      <input
        name="phone"
        placeholder="Phone"
        className="w-full rounded-md border border-gray-300 dark:border-gray-700 px-4 py-2 bg-white dark:bg-black"
      />

      <textarea
        name="message"
        rows={4}
        placeholder="Message"
        required
        className="w-full rounded-md border border-gray-300 dark:border-gray-700 px-4 py-2 bg-white dark:bg-black"
      />

      <button
        type="submit"
        className="w-full py-3 rounded-md bg-gray-900 text-white dark:bg-white dark:text-black font-medium hover:opacity-90 transition"
      >
        Send message
      </button>

      {status && (
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
          {status}
        </p>
      )}
    </motion.form>
  );
}

/* ================= PAGE ================= */

export default function ContactPage() {
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
            Contact
          </h1>

          <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            Available for backend roles, AI projects and startup collaborations.
          </p>
        </motion.div>
      </section>

      {/* Content */}
      <section className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 pb-24">
        <ContactInfoSection />
        <SendMessageForm />
      </section>

      {/* Social */}
      <section className="max-w-3xl mx-auto text-center pb-20">
        <div className="flex justify-center gap-4">
          {socialLinks.map((link) => {
            const Icon = iconMap[link.icon];

            return (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-md border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 transition"
              >
                <Icon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </a>
            );
          })}
        </div>
      </section>
    </main>
  );
}
