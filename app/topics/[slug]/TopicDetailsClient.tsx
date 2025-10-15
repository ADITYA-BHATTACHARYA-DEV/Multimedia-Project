'use client';

import VideoPlayer from "@/components/VideoPlayer";
import { Topic } from "@/lib/topics";
import { motion } from "framer-motion";
import Link from "next/link";

type Props = { topic: Topic };

export default function TopicDetailsClient({ topic }: Props) {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeInOut" } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white py-12 px-4 md:px-12">
      <motion.div initial="hidden" animate="visible" variants={fadeIn} className="space-y-12 max-w-5xl mx-auto">

        {/* Header */}
        <header className="text-center space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600"
          >
            {topic.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-gray-300 max-w-3xl mx-auto text-lg md:text-xl"
          >
            {topic.summary}
          </motion.p>
        </header>

        {/* Video Player */}
        <section className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10">
          <motion.div className="absolute inset-0 bg-gradient-to-br from-cyan-600/20 via-blue-700/10 to-black/20 animate-pulse rounded-3xl pointer-events-none" />
          <div className="relative z-10">
            <VideoPlayer
              src={topic.videoUrl}
              poster={topic.posterUrl}
              captions={topic.captions}
              title={topic.title}
            />
          </div>
          <div className="text-sm text-gray-400 mt-4 text-center">
            Use <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">k</kbd> to play/pause, <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">←</kbd> / <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">→</kbd> to seek.
          </div>
        </section>

        {/* Description & Transcript */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 pt-8">
          <motion.section initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="prose prose-invert prose-lg bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl p-6">
            <h2 className="text-2xl font-bold mb-4 text-cyan-400">Description</h2>
            <p>{topic.description}</p>
          </motion.section>

          {topic.transcript && (
            <motion.section initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="prose prose-invert prose-lg bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl p-6">
              <h2 className="text-2xl font-bold mb-4 text-blue-400">Transcript</h2>
              <details className="bg-black/10 border border-white/10 rounded-lg p-4">
                <summary className="cursor-pointer font-medium">Show transcript</summary>
                <pre className="whitespace-pre-wrap mt-4 text-gray-300 text-sm">{topic.transcript}</pre>
              </details>
            </motion.section>
          )}
        </div>

        {/* Back Link */}
        <div className="text-center mt-12">
          <Link
            href="/"
            className="inline-block px-6 py-3 rounded-lg font-semibold bg-cyan-500/80 hover:bg-cyan-600 transition-colors duration-300"
          >
            ← Back to Topics
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
