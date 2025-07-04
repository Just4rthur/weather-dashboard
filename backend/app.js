// backend/app.js
import express from "express";
import cors from "cors";
import weatherRoutes from "./routes/weather.js";
import aiRoutes from "./routes/ai-generative-model.js";

const app = express();

// Enable JSON and CORS
app.use(cors());
app.use(express.json());

// Mount your routes under /api
app.use("/api", weatherRoutes);
app.use("/api/ai", aiRoutes);

// Optional: Base route for testing
app.get("/", (req, res) => {
  res.send("🌦️ Weather API is running");
});

export default app;
