"use client";

import { Meteors } from "@/components/ui/meteors"; // make sure the path is correct
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function AboutPage() {
  const fullHeading = "About Symposia";
  const [displayText, setDisplayText] = useState("");
  const [colorIndex, setColorIndex] = useState(0);
  const colors = ["from-cyan-400", "via-blue-400", "to-purple-500"];

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      setDisplayText(fullHeading.slice(0, i + 1));
      i++;
      if (i === fullHeading.length) clearInterval(typingInterval);
    }, 120);

    const colorInterval = setInterval(() => {
      setColorIndex((prev) => (prev + 1) % colors.length);
    }, 1000);

    return () => {
      clearInterval(typingInterval);
      clearInterval(colorInterval);
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white py-12 px-4 md:px-12">
      {/* Meteor background */}
      <Meteors number={30} />

      <article className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Typewriter + glowing gradient heading */}
        <h1
          className={`text-5xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r ${colors[colorIndex]} animate-textGlow`}
        >
          {displayText}
          <span className="blinking-cursor">|</span>
        </h1>

        {/* Animated paragraphs */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-8 text-lg md:text-xl text-gray-300"
        >
          The <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent font-semibold">Symposia</span> is a multimedia-first magazine concept. Each topic pairs a short video with a concise, accessible description and an optional transcript.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="mt-4 text-lg md:text-xl text-gray-300"
        >
          This prototype demonstrates: a topic list, an accessible video player with captions, keyboard navigation, and responsive design.
        </motion.p>
      </article>

      {/* Styles for typewriter, glow, and cursor */}
      <style jsx>{`
        .blinking-cursor {
          display: inline-block;
          width: 1ch;
          background-color: currentColor;
          animation: blink 1s step-end infinite;
        }
        @keyframes blink {
          0%, 50%, 100% { opacity: 1; }
          25%, 75% { opacity: 0; }
        }
        .animate-textGlow {
          text-shadow: 0 0 8px #00ffff, 0 0 15px #00bfff, 0 0 20px #7f00ff;
          transition: all 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
}
