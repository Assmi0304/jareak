import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client
const ai = process.env.GEMINI_API_KEY
  ? new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

// Health API
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

// AI Thought Reflection Companion Endpoint
app.post("/api/gemini/thought", async (req, res) => {
  try {
    const { chapterTitle, intention, recentNotes, totalMemories, daysCompleted } = req.body;

    if (!ai) {
      // Fallback gentle thoughts if no key
      const fallbackThoughts = [
        "Consistency is not about perfection; it is the quiet willingness to return to your craft each morning.",
        "Every small note added today is a love letter to your future self.",
        "Rest when you need, but remember the warmth of why you began this chapter.",
        "Notice how the jar slowly captures the light of your small wins.",
        "You don't need giant leaps today. A single genuine thought is enough."
      ];
      const randomThought = fallbackThoughts[Math.floor(Math.random() * fallbackThoughts.length)];
      return res.json({ thought: randomThought });
    }

    const prompt = `
You are Jareak's Companion — a calm, warm, poetic, and non-judgmental presence in a personal study room.
You speak like a wise friend resting at a wooden desk with tea.
Avoid hustle culture, corporate buzzwords, productivity metrics, or aggressive motivational speech.

User Context:
- Chapter Title: "${chapterTitle || 'My Journey'}"
- Personal Intention: "${intention || 'To grow steadily'}"
- Days Completed: ${daysCompleted || 1}
- Total Memories in Jar: ${totalMemories || 0}
- Recent Sticky Notes / Reflections: ${JSON.stringify(recentNotes || [])}

Task:
Write a brief, comforting, 1-2 sentence reflection or gentle question for the user's thought card on their desk today.
Focus on personal growth, human rhythm, remembering progress, and self-compassion.
Do not use bullet points or emojis. Speak warmly and plainly.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
    });

    const thoughtText = response.text ? response.text.trim() : "Progress deserves to be remembered with kindness.";
    res.json({ thought: thoughtText });
  } catch (err: any) {
    const isQuotaError =
      err?.status === 429 ||
      err?.code === 429 ||
      (err?.message && (err.message.includes("429") || err.message.includes("quota") || err.message.includes("RESOURCE_EXHAUSTED")));

    if (isQuotaError) {
      console.warn("Gemini API quota reached. Serving warm fallback thought.");
    } else {
      console.error("Gemini thought card error:", err);
    }

    // Always serve a peaceful, encouraging reflection
    res.json({
      thought: "Even on quiet days, the gentle rhythm of your effort leaves an unmistakable glow inside the jar."
    });
  }
});

// Vite Middleware or Production Serve
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Jareak server running on http://localhost:${PORT}`);
  });
}

startServer();
