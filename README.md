## BackEnd

backend for the NocaCan project

[TODO.md](https://github.com/nova-glider/backend/blob/main/TODO.md) | [deployment guide](https://github.com/nova-glider/backend/blob/main/deployment.md)

NodeJS + Express

#### API Usage

<details><summary>/api/sensor-data/add</summary>

Will store data in memory and db/sensor-data-YYYYMMDDHHMMSS.json

example request body:

```json
{
  "device_id": "sensor-001",           
  "timestamp": "2025-06-05T14:23:45Z", // required for saving!
  "location": {
    "latitude": 37.7749,
    "longitude": -122.4194,
    "altitude": 15.5
  },
  "readings": {
    "temperature_celsius": 22.8,
    "humidity_percent": 58.3,
    "air_pressure_hpa": 1013.2,
    "air_quality_index": 42,
    "co2_ppm": 415
  },
  "status": {
    "battery_level_percent": 76,
    "signal_strength_dbm": -67,
    "operational": true
  }
}
```

</details>

<details><summary>/api/sensor-data/get</summary>
Retrieves latest sensor data.

It first queries the memory for fast serving, otherwise it reads the latest data in db/

</details>

#### Examples

Example client

```bash
# Run the backend first
pnpm dev

# In a new terminal
pnpm dev:client
```
Access it at `http://localhost:3001`

Example API call to add sensor data:

```bash
# Run the backend first
pnpm dev

# In a new terminal
pnpm test:sensor-data
```
