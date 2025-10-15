// components/ui/Chatbot.tsx
'use client';
import axios from "axios";
import { useState } from "react";

type ChatbotProps = {
  topicSlug?: string;
};

const Chatbot: React.FC<ChatbotProps> = ({ topicSlug }) => {
  const [messages, setMessages] = useState<{ from: string; text: string }[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { from: "user", text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");

    try {
      const response = await axios.post("/api/groq-chat", {
        message: input,
        history: messages,
        topic: topicSlug, // optional: send topicSlug if needed in backend
      });

      setMessages(prev => [...prev, { from: "bot", text: response.data.reply }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { from: "bot", text: "Sorry, something went wrong." }]);
    }
  };

  return (
    <div className="chatbot flex flex-col w-full max-w-md bg-black/70 backdrop-blur-md p-4 rounded-xl shadow-lg">
      <div className="messages flex flex-col gap-2 mb-4 overflow-y-auto max-h-96">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-2 rounded-lg text-sm ${
              msg.from === "user" ? "self-end bg-cyan-600 text-white" : "self-start bg-blue-600 text-white"
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
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Ask me anything..."
          className="flex-grow p-2 rounded-lg text-black"
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-cyan-500 rounded-lg text-white"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
