import fetch from "node-fetch";
import { GRAPH_HOPPER_KEY } from "../utils/config.js";

export async function getRoute(start, end) {
  const res = await fetch(
    `https://graphhopper.com/api/1/route?point=${start}&point=${end}&vehicle=car&locale=en&instructions=true&key=${GRAPH_HOPPER_KEY}`
  );
  const data = await res.json();
  return data.paths[0];
}
