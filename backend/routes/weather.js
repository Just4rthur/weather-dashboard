import express from "express";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

const OPENWEATHER_KEY = process.env.OPENWEATHER_KEY;

//GET /api/weather?lat=...&lon=...
router.get("/weather", async (req, res) => {
  const { lat, lon } = req.query;

  try {
    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather",
      {
        params: {
          lat,
          lon,
          units: "metric",
          appid: OPENWEATHER_KEY,
        },
      },
    );

    res.json(response.data);
  } catch (error) {
    console.error("/weather error: ", error);
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

// GET /api/forecast?lat=...&lon=...
router.get("/forecast", async (req, res) => {
  const { lat, lon } = req.query;

  try {
    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/forecast",
      {
        params: {
          lat,
          lon,
          units: "metric",
          appid: OPENWEATHER_KEY,
        },
      },
    );

    res.json(response.data);
  } catch (error) {
    console.error("/forecast error: ", error);
    res.status(500).json({ error: "Failed to fetch forecast" });
  }
});

// GET /api/geo?q=city%limit=5
router.get("/geo", async (req, res) => {
  const { q, limit = 5 } = req.query;

  try {
    const response = await axios.get(
      "https://api.openweathermap.org/geo/1.0/direct",
      {
        params: {
          q,
          limit,
          appid: OPENWEATHER_KEY,
        },
      },
    );

    console.log("OpenWeather Geo API Response:", response.data);
    res.json(response.data);
  } catch (error) {
    console.error("/geo error: ", error);
    res.status(500).json({ error: "Failed to fetch location suggestions" });
  }
});

export default router;
