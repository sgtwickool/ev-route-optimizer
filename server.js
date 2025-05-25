import express from 'express';
import { getRoute } from './services/routeService.js';
import { insertChargingStops } from './services/batteryService.js';
import path from 'path';
import { fileURLToPath } from 'url';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.get('/plan-route', async (req, res) => {
  const { start, end, battery, range } = req.query;
  const route = await getRoute(start, end);
  const stations = await insertChargingStops(route, parseFloat(battery), parseFloat(range));
  res.json({ route, stations });
});

// Serve OpenAPI spec
app.get('/openapi.json', (req, res) => {
  res.sendFile(path.join(__dirname, 'openapi.json'));
});

let openapiSpec = null;
try {
  openapiSpec = JSON.parse(fs.readFileSync(path.join(__dirname, 'openapi.json'), 'utf8'));
} catch (e) {
  console.error('Failed to load openapi.json:', e);
}
if (openapiSpec) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpec));
} else {
  app.get('/api-docs', (req, res) => {
    res.status(500).send('OpenAPI spec not found or invalid.');
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
