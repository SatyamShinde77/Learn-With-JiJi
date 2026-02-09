require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");

const app = express();

/* ---------- MIDDLEWARE ---------- */
app.use(cors());
app.use(express.json());

/* ---------- SUPABASE CONNECTION ---------- */
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

/* ---------- SEARCH API ---------- */
app.post("/ask-jiji", async (req, res) => {
  try {
    const { query } = req.body;

    if (!query || query.trim() === "") {
      return res.status(400).json({
        error: "Query is required",
      });
    }

    const searchText = query.trim();

    const { data, error } = await supabase
      .from("resources")
      .select("*")
      .or(
        `title.ilike.%${searchText}%,topic.ilike.%${searchText}%,description.ilike.%${searchText}%`
      );

    if (error) {
      console.error("Supabase error:", error);
      throw error;
    }

    if (!data || data.length === 0) {
      return res.json({
        answer: `No results found for "${searchText}"`,
        resources: [],
      });
    }

    res.json({
      answer: `Results related to "${searchText}"`,
      resources: data,
    });

  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({
      error: "Server error",
    });
  }
});

/* ---------- ADD RESOURCE API ---------- */
app.post("/add-resource", async (req, res) => {
  try {
    const { title, topic, description, url, type } = req.body;

    if (!title || !topic || !description || !url || !type) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }

    const { data, error } = await supabase
      .from("resources")
      .insert([{ title, topic, description, url, type }])
      .select();

    if (error) {
      console.error("Insert error:", error);
      throw error;
    }

    res.json({
      message: "Resource added successfully",
      data,
    });

  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({
      error: "Server error",
    });
  }
});

/* ---------- HEALTH CHECK ---------- */
app.get("/", (req, res) => {
  res.send("Jiji Backend Running");
});

/* ---------- FALLBACK ROUTE ---------- */
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
  });
});

/* ---------- SERVER START ---------- */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
