/*
 * This file is part of the NovaCan project.
 *
 * Copyright (C) 2025 NovaCan, Wannes Ghysels
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

const url = "http://localhost:3000/api/sensor-data/add";
const api_key = "YOUR_API_KEY_HERE"; // not needed yet, but will be used in the future

const data = {
  device_id: "sensor-001",
  timestamp: "2025-06-05T14:23:45Z",
  location: {
    latitude: 37.7749,
    longitude: -122.4194,
    altitude: 15.5,
  },
  readings: {
    temperature_celsius: 22.8,
    humidity_percent: 58.3,
    air_pressure_hpa: 1013.2,
    air_quality_index: 42,
    co2_ppm: 415,
  },
  status: {
    battery_level_percent: 76,
    signal_strength_dbm: -67,
    operational: true,
  },
};

const headers = {
  "Content-Type": "application/json",
  // "Authorization": `Bearer ${api_key}`
};

axios
  .post(url, data, { headers })
  .then((response) => {
    console.log("Status Code:", response.status);
    console.log("Response Body:", response.data);
  })
  .catch((error) => {
    if (error.response) {
      console.log("Status Code:", error.response.status);
      console.log("Response Body:", error.response.data);
    } else {
      console.error("Error:", error.message);
    }
  });
