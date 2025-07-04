import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post("/generate-summary", async (req, res) => {
  try {
    const { weatherData } = req.body;

    if (!weatherData) {
      return res.status(400).json({ message: "Weather data is required" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `You are a helpful weather assistant. Based on the following data, write a short, conversational summary (1-2 sentences) for a user. Focus on the most important information for the day, be friendly and try to add emojis. Data: ${JSON.stringify(weatherData)}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ summary: text });
  } catch (error) {
    console.error("Error generating summary:", error);
    res.status(500).json({ message: "Error generating summary" });
  }
});

export default router;
