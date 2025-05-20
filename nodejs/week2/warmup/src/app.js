import "dotenv/config";
import express from "express";
import fs from "fs";
import { StatusCodes } from "http-status-codes";

const app = express();
const port = process.env.PORT || 3000;

// Support parsing JSON requests
app.use(express.json());

app.get("/search", async (req, res) => {
  const { q } = req.query;
  try {
    fs.readFile("./documents.json", "utf-8", (err, data) => {
      if (err) {
        console.error("Error reading file:", err);
        return res.status(500).json({ error: "Internal server error" });
      }
      const results = JSON.parse(data);
      if (!q) {
        res.json(results);
      } else {
        const filteredResults = results.filter((item) => {
          return Object.values(item).some((value) =>
            value.toString().toLowerCase().includes(q.toLowerCase())
          );
        });
        res.json(filteredResults);
      }
    });
  } catch (error) {
    console.error("Error reading file:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/documents/:id", async (req, res) => {
  const { id } = req.params;
  try {
    fs.readFile("./documents.json", "utf-8", (err, data) => {
      if (err) {
        console.error("Error reading file:", err);
        return res.status(500).json({ error: "Internal server error" });
      }
      const results = JSON.parse(data);
      const document = results.find((item) => item.id === Number(id));
      if (!document) {
        return res.status(404).json({ error: "Document not found" });
      }
      res.json(document);
    });
  } catch (error) {
    console.error("Error reading file:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/search", async (req, res) => {
  const { q } = req.query;

  const { fields } = req.body || {};
  // Check if both q and fields are provided
  if (q && fields) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Cannot provide both query and body" });
  }
  try {
    fs.readFile("./documents.json", "utf-8", (err, data) => {
      if (err) {
        console.error("Error reading file:", err);
        return res.status(500).json({ error: "Internal server error" });
      }
      const results = JSON.parse(data);

      if (q) {
        const filteredResults = results.filter((item) => {
          return Object.values(item).some((value) =>
            value.toString().toLowerCase().includes(q.toLowerCase())
          );
        });
        return res.json(filteredResults);
      }
      if (fields) {
        const filteredResults = results.filter((item) =>
          Object.entries(fields).every(([key, value]) => item[key] === value)
        );
        return res.json(filteredResults);
      }
      // If neither q nor fields are provided, return all results
      res.json(results);
    });
  } catch (error) {
    console.error("Error reading file:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.listen(port, () => {
  console.log(`Tje server running at http://localhost:${port}`);
});
