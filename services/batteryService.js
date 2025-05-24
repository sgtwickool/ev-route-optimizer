import { findChargingStations } from "./chargingService.js";
import polyline from "@mapbox/polyline";

export function estimateRangeLeft(initialBattery, vehicleRange, distanceTravelled) {
  const used = (distanceTravelled / vehicleRange) * 100;
  return initialBattery - used;
}

export async function insertChargingStops(route, initialBattery, vehicleRange) {
  const distanceKm = route.distance / 1000;
  const remainingBattery = estimateRangeLeft(initialBattery, vehicleRange, distanceKm);

  if (remainingBattery < 15) {
    let coordinates = [];
    if (route.points && route.points_encoded && route.points) {
      coordinates = polyline.decode(route.points);
    }
    if (coordinates.length > 0) {
      const midpoint = coordinates[Math.floor(coordinates.length / 2)];
      return findChargingStations(midpoint[0], midpoint[1]);
    } else {
      console.error("Route object structure unexpected:", JSON.stringify(route, null, 2));
      throw new Error("Route points or coordinates are missing or invalid.");
    }
  }
  return [];
}
