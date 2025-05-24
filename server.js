import express from 'express';
import { getRoute } from './services/routeService.js';
import { insertChargingStops } from './services/batteryService.js';

const app = express();

app.get('/plan-route', async (req, res) => {
  const { start, end, battery, range } = req.query;
  const route = await getRoute(start, end);
  const stations = await insertChargingStops(route, parseFloat(battery), parseFloat(range));
  res.json({ route, stations });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
