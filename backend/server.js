import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Root route for testing
app.get("/", (req, res) => {
  res.send("Weather API Backend is running 🚀");
});

// Weather route
app.get("/api/weather", async (req, res) => {
  const { city } = req.query;

  if (!city) {
    return res.status(400).json({ message: "City is required" });
  }

  try {
    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/forecast",
      {
        params: {
          q: city,
          units: "metric",
          appid: process.env.OPENWEATHER_API_KEY,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      res.status(404).json({ message: "City not found" });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
