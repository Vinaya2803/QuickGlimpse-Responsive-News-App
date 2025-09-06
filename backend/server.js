import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const API_KEY = process.env.NEWS_API_KEY;
const BASE_URL = "https://newsdata.io/api/1/news";

app.use(cors());

// Route to fetch news


app.get("/api/news", async (req, res) => {
  try {
    const query = req.query.q || "technology";
    const url = `${BASE_URL}?apikey=${API_KEY}&language=en&q=${encodeURIComponent(query)}`;

    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Error fetching news:", err);
    res.status(500).json({ error: "Failed to fetch news" });
  }
});


app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
