# EV Route Optimizer

A Node.js Express API for planning electric vehicle (EV) routes and suggesting charging stops along the way. It integrates with GraphHopper for route planning and OpenChargeMap for charging station data.

## Features
- Plan a route between two locations (latitude,longitude).
- Suggests charging stops based on your battery percentage and vehicle range.
- OpenAPI/Swagger documentation available at `/api-docs`.
- Ready for containerization with Docker and Podman.

## Prerequisites
- Node.js 18+
- npm
- (For containerization) Docker or Podman
- API keys for [GraphHopper](https://graphhopper.com/) and [OpenChargeMap](https://openchargemap.org/)

## Environment Variables
Create a `.env` file in the project root with:
```
GRAPH_HOPPER_KEY=your-graphhopper-api-key
OPENCHARGEMAP_API_KEY=your-openchargemap-api-key
```

## Local Development
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the server:
   ```bash
   node server.js
   ```
3. Access the API docs at: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## API Usage
### Plan a Route
`GET /plan-route?start=LAT,LON&end=LAT,LON&battery=60&range=250`

- `start`: Start coordinates (e.g., `51.5074,-0.1278`)
- `end`: End coordinates (e.g., `53.4808,-2.2426`)
- `battery`: Initial battery percentage (e.g., `60`)
- `range`: Vehicle range in km (e.g., `250`)

Example:
```
curl "http://localhost:3000/plan-route?start=51.5074,-0.1278&end=53.4808,-2.2426&battery=60&range=250"
```

## OpenAPI/Swagger Docs
- View and test the API at: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## Containerization

### Build and Run with Podman
```bash
podman build -t ev-route-api .
podman run --env-file .env -p 3000:3000 ev-route-api
```

Or with Docker
```bash
docker build -t ev-route-api .
docker run --env-file .env -p 3000:3000 ev-route-api
```

### Build and Run with Podman Compose
```bash
podman-compose up --build
```

Or with Docker Compose:
```bash
docker-compose up --build
```

## Project Structure
- `server.js` - Main Express server
- `services/` - Business logic for routing, battery, and charging
- `utils/config.js` - Loads environment variables
- `openapi.json` - OpenAPI spec for the API

## Notes
- Do **not** commit your `.env` file to version control.
- For production, consider using `NODE_ENV=production` and a process manager like PM2.

---
MIT License
