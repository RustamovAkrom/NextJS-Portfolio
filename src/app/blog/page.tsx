"use client";
import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

type SortKey = "title" | "category" | "date";

interface Post {
  id: number;
  title: string,
  description: string;
  date: string;
  datetime: string;
  category: { title: string; href: string };
  href: string;
  author: {
    name: string;
    role: string;
    imageUrl: string;
  };
}


function sortPosts(posts: Post[], key: SortKey) {
  switch (key) {
    case "title":
      return [...posts].sort((a, b) => a.title.localeCompare(b.title));
    case "category":
      return [...posts].sort((a, b) =>
        a.category.title.localeCompare(b.category.title)
      );
    case "date":
      return [...posts].sort(
        (a, b) =>
          new Date(b.datetime).getTime() - new Date(a.datetime).getTime()
      );
    default:
      return posts;
  }
}


export default function Posts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortKey, setSortKey] = useState<SortKey>("date");

  // const [sortKey, setSortKey] = useState<SortKey>("date");
  // const sortedPosts = sortPosts(posts, sortKey);
  useEffect(() => {
      async function fetchPosts() {
        try {
          const res = await fetch("/api/blog"); // 🔗 твой API роут
          if (!res.ok) throw new Error("Failed to fetch posts");
          const data = await res.json();
          setPosts(data);
        } catch (err) {
          console.error("Error fetching posts:", err);
        } finally {
          setLoading(false);
        }
      }
      fetchPosts();
  }, []);

  const sortedPosts = useMemo(() => sortPosts(posts, sortKey), [posts, sortKey]);

  if (loading) {
    return <p className="text-center mt-20">Loading blog posts...</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 mt-20">
      {/* Header */}
      <header className="mb-12 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <svg
            className="w-12 h-12 text-blue-600 dark:text-blue-400"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 21H5a2 2 0 01-2-2V7a2 2 0 012-2h4l2-2h6a2 2 0 012 2v12a2 2 0 01-2 2z"
            />
          </svg>
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-1">
              Our Blog
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Insights, stories, and updates from our team.
            </p>
          </div>
        </div>
      </header>

      {/* Content Layout */}
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Left: Posts */}
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
            Blog Posts
          </h2>
          <div className="grid grid-cols-1 gap-8">
            {sortedPosts.map((post, i) => (
              <motion.article
                key={post.id}
                className="relative rounded-xl border border-gray-200 dark:border-gray-700 bg-white/40 dark:bg-gray-900/40 backdrop-blur-lg shadow-md transition hover:shadow-xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="p-6">
                  <div className="flex items-center gap-x-3 text-xs mb-2">
                    <time
                      dateTime={post.datetime}
                      className="text-gray-500 dark:text-gray-400"
                    >
                      {post.date}
                    </time>
                    <span className="px-2 py-0.5 rounded bg-gray-100/70 dark:bg-gray-800/70 text-gray-700 dark:text-gray-300">
                      {post.category.title}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-1">
                    <a href={post.href}>{post.title}</a>
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    {post.description}
                  </p>
                  <div className="flex items-center gap-x-2 mt-4">
                    <Image
                      className="size-8 rounded-full border border-gray-300 dark:border-gray-700"
                      src={post.author.imageUrl}
                      alt={post.author.name}
                      width={320}
                      height={320}
                      priority
                    />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-gray-100">
                        {post.author.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {post.author.role}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>

        {/* Right: Sidebar */}
        <motion.aside
          className="w-full lg:w-80 flex-shrink-0 space-y-10"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          {/* Sort */}
          <div className="rounded-xl bg-white/40 dark:bg-gray-900/40 backdrop-blur-lg p-5 shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Sort Posts
            </h3>
            <select
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent backdrop-blur px-3 py-2 text-gray-800 dark:text-gray-200"
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value as SortKey)}
            >
              <option value="date">By Date</option>
              <option value="title">By Title</option>
              <option value="category">By Category</option>
            </select>
          </div>

          {/* Latest News */}
          <div className="rounded-xl bg-white/40 dark:bg-gray-900/40 backdrop-blur-lg p-5 shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Latest News
            </h3>
            <ul className="space-y-4">
              {posts
                .slice()
                .sort(
                  (a, b) =>
                    new Date(b.datetime).getTime() -
                    new Date(a.datetime).getTime()
                )
                .slice(0, 3)
                .map((post) => (
                  <motion.li
                    key={post.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <a
                      href={post.href}
                      className="block text-blue-600 dark:text-blue-400 hover:underline font-medium"
                    >
                      {post.title}
                    </a>
                    <span className="block text-xs text-gray-500 dark:text-gray-400">
                      {post.date}
                    </span>
                  </motion.li>
                ))}
            </ul>
          </div>
        </motion.aside>
      </div>
    </div>
  );
}
