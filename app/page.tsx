'use client';

import { allTopics, Topic } from "@/lib/topics";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";

export default function TopicsPage() {
  const topics: Topic[] = allTopics();

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white p-6 md:p-12">
      {/* Hero Title */}
      <section className="text-center mb-12">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600"
        >
          Explore Topics
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-4 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto"
        >
          Discover immersive video tutorials paired with detailed descriptions and interactive content.
        </motion.p>
      </section>

      {/* Topics Grid */}
      <section className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {topics.map((topic, index) => {
          const delay = index * 0.1;
          return (
            <motion.div
              key={topic.slug}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay }}
              className={cn(
                "relative rounded-2xl overflow-hidden border border-white/10 shadow-lg hover:shadow-cyan-500/30 transition-shadow duration-300",
                "bg-gradient-to-br from-cyan-800/30 via-blue-900/30 to-black/20"
              )}
            >
              <div className="aspect-video w-full overflow-hidden rounded-t-2xl">
                {topic.posterUrl && (
                  <img
                    src={topic.posterUrl}
                    alt={topic.title}
                    className="w-full h-full object-cover object-center brightness-90 hover:brightness-110 transition-all duration-500"
                  />
                )}
              </div>

              <div className="p-6 space-y-2 backdrop-blur-md bg-black/40">
                <h2 className="text-xl font-bold text-white">{topic.title}</h2>
                <p className="text-sm text-gray-300">{topic.summary}</p>
                {/* Navigate to the video player page */}
                <Link
                  href={`/topics/${topic.slug}`}
                  className="inline-block mt-2 px-4 py-2 bg-cyan-500/80 hover:bg-cyan-600 rounded-lg font-medium text-white text-sm transition-colors duration-300"
                >
                  View Topic
                </Link>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                className="absolute top-0 right-0 w-32 h-32 rounded-full bg-blue-500/20 mix-blend-screen pointer-events-none"
              />
            </motion.div>
          );
        })}
      </section>

      {/* CTA Section */}
      <section className="mt-20 text-center relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="p-12 rounded-3xl bg-gradient-to-r from-cyan-600/20 to-blue-700/20 backdrop-blur-md border border-white/20 shadow-lg"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Start Learning Today
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-6">
            Immerse yourself in high-quality video tutorials with rich interactive content. Each topic is designed to engage and educate.
          </p>
          {/* Button removed */}
        </motion.div>
      </section>
    </div>
  );
}
