'use client';

import VideoPlayer from "@/components/VideoPlayer";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

// Types
type CaptionTrack = {
  label: string;
  src: string;
  srclang: string;
  default?: boolean;
};

type Topic = {
  slug: string;
  title: string;
  summary: string;
  videoUrl: string;
  posterUrl?: string;
  captions?: CaptionTrack[];
  description?: string;
  transcript?: string;
};

// Load topics JSON
import topicsData from "data/topics.json"; // adjust path if needed

type Props = {
  params: { slug: string };
};

export default function TopicPage({ params }: Props) {
  const [topic, setTopic] = useState<Topic | null>(null);

  // Chatbot state
  const [messages, setMessages] = useState<{ from: "user" | "bot"; text: string }[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const found = (topicsData as Topic[]).find(t => t.slug === params.slug);
    setTopic(found ?? null);
  }, [params.slug]);

  if (!topic) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-black">
        <h1 className="text-3xl">Topic not found</h1>
      </div>
    );
  }

  // Dummy images and captions for demonstration
  const images = [
    { src: "https://upload.wikimedia.org/wikipedia/en/1/1d/Indian_Institute_of_Technology_Bombay_Logo.svg", caption: "IIT Bombay Logo" },
    { src: "https://iisc.ac.in/wp-content/uploads/2020/08/IISc_Master_Seal.jpg", caption: "IISc Seal" },
    { src: "https://medicine.iisc.ac.in/wp-content/uploads/2024/04/iisc-main-building-1.jpg", caption: "Main Building" },
    { src: "https://upload.wikimedia.org/wikipedia/en/a/a3/IIT_Kanpur_Logo.svg", caption: "IIT Kanpur Logo" }
  ];

  const dummyParagraphs = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus.",
    "Ut vulputate semper dui. Fusce erat odio, sollicitudin vel erat vel, interdum mattis neque.",
    "Integer in volutpat libero. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas."
  ];

  const handleSend = async () => {
  if (!input.trim()) return;

  const newMsg = { from: "user" as const, text: input };
  setMessages(prev => [...prev, newMsg]);
  setInput("");

  try {
    const response = await fetch("/api/groq-chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: newMsg.text,
        history: messages,       // send previous messages for context
        topic: topic.slug        // optional: useful if your bot responds differently per topic
      })
    });

    const data = await response.json();
    const botMsg = { from: "bot" as const, text: data.reply || "No response from bot." };
    setMessages(prev => [...prev, botMsg]);
  } catch (err) {
    console.error(err);
    setMessages(prev => [...prev, { from: "bot" as const, text: "Error: Unable to get response." }]);
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white py-12 px-4 md:px-12">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} className="space-y-12 max-w-6xl mx-auto">

        {/* Header */}
        <header className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600">
            {topic.title}
          </h1>
          <p className="text-gray-300 max-w-3xl mx-auto text-lg md:text-xl">{topic.summary}</p>
        </header>

        {/* Video Player */}
        <section className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10">
          <VideoPlayer
            src={topic.videoUrl}
            poster={topic.posterUrl ?? ""}
            captions={topic.captions ?? []}
            title={topic.title}
          />
          <div className="text-sm text-gray-400 mt-4 text-center">
            Use <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border rounded-lg">k</kbd> to play/pause, <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border rounded-lg">←</kbd> / <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border rounded-lg">→</kbd> to seek.
          </div>
        </section>

        {/* Transcript + Chatbot Section */}
        <section className="grid md:grid-cols-2 gap-6 mt-8">
          {/* Transcript */}
          <div className="prose prose-invert prose-lg bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl p-6 max-h-[400px] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4 text-blue-400">Transcript</h2>
            {topic.transcript ? (
              <pre className="whitespace-pre-wrap text-gray-300 text-sm">{topic.transcript}</pre>
            ) : (
              <p className="text-gray-400">No transcript available.</p>
            )}
          </div>

          {/* Chatbot */}
          <div className="flex flex-col bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl p-4 max-h-[400px]">
            <h2 className="text-2xl font-bold mb-4 text-green-400">Ask Symp: <span className="text-red-400">The Enlightenment Bot</span></h2>
            <div className="flex-1 overflow-y-auto space-y-2 mb-4">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`px-3 py-2 rounded-lg text-sm max-w-[80%] ${
                    msg.from === "user" ? "bg-cyan-600 self-end text-white" : "bg-gray-800 text-gray-200 self-start"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a question..."
                className="flex-1 px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <button
                onClick={handleSend}
                className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-lg font-semibold text-white"
              >
                Send
              </button>
            </div>
          </div>
        </section>

        {/* Description with images */}
        <section className="space-y-8 mt-8">
          <h2 className="text-3xl font-bold text-cyan-400 mb-4">Description</h2>
          {dummyParagraphs.map((p, idx) => (
            <p key={idx} className="prose prose-invert max-w-full">{p}</p>
          ))}

          <div className="space-y-8 mt-6">
            {images.map((img, idx) => (
              <div
                key={idx}
                className={`flex flex-col md:flex-row items-center gap-6
                  ${idx % 2 === 0 ? "" : "md:flex-row-reverse"}`}
              >
                <div className="bg-black/30 backdrop-blur-md border border-white/20 rounded-xl overflow-hidden w-full md:w-1/3 shadow-lg">
                  <img src={img.src} alt={img.caption} className="w-full h-auto object-cover" />
                  <p className="text-center text-gray-300 text-sm p-2">{img.caption}</p>
                </div>
                <p className="prose prose-invert md:w-2/3 text-gray-300 text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac vehicula sapien. Suspendisse potenti. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.
                </p>
              </div>
            ))}
          </div>
        </section>

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
