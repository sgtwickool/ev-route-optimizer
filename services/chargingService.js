import fetch from "node-fetch";
import { OPENCHARGEMAP_API_KEY } from "../utils/config.js";

export async function findChargingStations(lat, lon, radiusKm = 10) {
  const res = await fetch(
    `https://api.openchargemap.io/v3/poi/?output=json&countrycode=GB&latitude=${lat}&longitude=${lon}&maxresults=10&distance=${radiusKm}&distanceunit=KM&key=${OPENCHARGEMAP_API_KEY}`
  );
  return await res.json();
}
