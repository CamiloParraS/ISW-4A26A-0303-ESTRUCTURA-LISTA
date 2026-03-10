import { state } from "./state";
import { el } from "./el";
import { LANE_MAP } from "./model";

export function renderSyncBars(): void {
  const orders = Array.from(state.ordersMap.values());
  const total = orders.length || 1;

  const laneCount: Record<string, number> = {
    CLIENTE: 0,
    MOZO: 0,
    COCINA: 0,
    CAJA: 0,
  };
  for (const o of orders) {
    const lane = LANE_MAP[o.state];
    laneCount[lane]++;
  }

  const pairs: Array<[string, string]> = [
    ["CLIENTE", "c"],
    ["MOZO", "m"],
    ["COCINA", "k"],
    ["CAJA", "x"],
  ];

  for (const [lane, key] of pairs) {
    const pct = Math.round((laneCount[lane] / total) * 100);
    (el(`sync-${key}`) as HTMLElement).style.width = `${pct}%`;
    el(`pct-${key}`).textContent = `${pct}%`;
  }
}
