/*
 * This file is part of the NovaGlider project.
 *
 * Copyright (C) 2025 NovaGlider, Wannes Ghysels
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 */

const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure CORS
// If you want to restrict origins, set ALLOWED_ORIGINS to a comma-separated list, e.g. "https://example.com,http://localhost:3000"
// If ALLOWED_ORIGINS is not set, fallback to allowing localhost:3000 (adjust as needed).
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",")
  : ["http://localhost:3000"];

// If you want to allow everything (not recommended for production), set ALLOWED_ORIGINS='*'
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) {
      // non-browser requests (e.g., curl, server-to-server) have no origin; allow them
      return callback(null, true);
    }
    if (allowedOrigins.includes("*") || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("CORS not allowed for origin: " + origin));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// Apply CORS middleware
app.use(cors(corsOptions));
// Allow preflight for all routes
app.options("*", cors(corsOptions));

let latestData = {};

// if the db directory does not exist, create it
if (!fs.existsSync("./db")) {
  fs.mkdirSync("./db");
}

app.get("/", (req, res) => {
  res.send("Backend operational.");
});

// TODO:
// - API token
// - Database connection
app.post("/api/sensor-data/add", (req, res) => {
  const { timestamp } = req.body;

  // update in-memory latestData (do not shadow the outer variable)
  latestData = req.body;

  // Clean the timestamp to use as a filename (e.g., "20250605142345" from "2025-06-05T14:23:45Z")
  const timestampCleaned = timestamp.replace(/[-:T]/g, "").slice(0, 14);

  // save to ./db/sensor-data-${timestamp}.json
  fs.writeFile(
    `./db/sensor-data-${timestampCleaned}.json`,
    JSON.stringify(latestData),
    (err) => {
      if (err) {
        console.error("Error saving sensor data:", err);
        return res.status(500).send("Error saving sensor data");
      }
      res.status(200).send("Sensor data saved successfully");
    }
  );
});

app.get("/api/sensor-data/get", (req, res) => {
  // fetch the latest sensor data and show it on the homepage
  if (Object.keys(latestData).length === 0) {
    console.log("No latest data found, reading from db directory...");
    fs.readdir("./db", (err, files) => {
      if (err) {
        console.error("Error reading directory:", err);
        return res.status(500).send({ error: "Error reading sensor data" });
      }

      // Sort files by timestamp (assuming filenames are in the format sensor-data-YYYYMMDDHHMMSS.json)
      files.sort((a, b) => {
        const timeA = a.match(/sensor-data-(\d+)\.json/)[1];
        const timeB = b.match(/sensor-data-(\d+)\.json/)[1];
        return timeB.localeCompare(timeA); // Sort descending
      });

      if (files.length > 0) {
        fs.readFile(`./db/${files[0]}`, "utf8", (err, data) => {
          if (err) {
            console.error("Error reading file:", err);
            return res.status(500).send({ error: "Error reading sensor data" });
          }
          latestData = JSON.parse(data);
          res.send(latestData);
        });
      } else {
        res.send({ error: "No sensor data available." });
      }
    });
  } else {
    res.send(latestData);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
