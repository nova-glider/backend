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


const axios = require("axios");
const express = require("express");
const app = express();

function getLatestSensorData() {
  const url = "http://localhost:3001/api/sensor-data/get";
  const api_key = "YOUR_API_KEY_HERE"; // not needed yet, but will be used in the future

  const headers = {
    "Content-Type": "application/json",
    // "Authorization": `Bearer ${api_key}`
  };

  return axios
    .get(url, { headers })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error.response) {
        return error.response.data;
      } else {
        return { error: "Couldnt reach API endpoint" };
      }
    });
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// homepage which displays the latest sensor data
app.get("/", (req, res) => {
  getLatestSensorData().then((latestData) => {
    console.log("Latest Sensor Data:", latestData);
    res.send("Sensor Data Client Example<br><br>" + JSON.stringify(latestData));
  });
  return;
});

// Start the Express server
app.listen(3001, () => {
  console.log("Server is running on http://localhost:3001");
});