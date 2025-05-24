import { getRoute } from "./services/routeService.js";
import { insertChargingStops } from "./services/batteryService.js";

(async () => {
  const start = "51.5074,-0.1278"; // London
  const end = "53.4808,-2.2426";   // Manchester
  const route = await getRoute(start, end);
  const stations = await insertChargingStops(route, 60, 250);
  console.log("Suggested charging stops:", stations);
})();
