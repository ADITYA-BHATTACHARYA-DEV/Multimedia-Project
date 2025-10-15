// app/api/groq-chat/route.ts
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { message, history } = await req.json();

  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          ...(history || []).map((msg: any) => ({
            role: msg.from === "user" ? "user" : "assistant",
            content: msg.text,
          })),
          { role: "user", content: message },
        ],
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const reply = response.data.choices[0].message.content;
    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Groq API error:", error);
    return NextResponse.json({ reply: "Sorry, something went wrong." }, { status: 500 });
  }
}
