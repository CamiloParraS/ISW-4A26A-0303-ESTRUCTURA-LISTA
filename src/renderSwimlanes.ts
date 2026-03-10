import { state } from "./state";
import { el } from "./el";
import { LANE_MAP } from "./model";

export function renderSwimlanes(): void {
  const lanes: Array<string> = ["CLIENTE", "MOZO", "COCINA", "CAJA"];
  for (const lane of lanes) {
    el(`lane-${lane}`).innerHTML = "";
  }

  const orders = Array.from(state.ordersMap.values());
  for (const order of orders) {
    const lane = LANE_MAP[order.state];
    const container = el<HTMLDivElement>(`lane-${lane}`);
    if (!container) continue;

    const div = document.createElement("div");
    div.className = `swimlane-order state-${order.state}`;
    div.innerHTML = `
      <div class="order-id-label">${order.id}</div>
      <div class="order-item-label">${order.items[0]?.emoji ?? ""} ${order.customer}</div>`;
    container.appendChild(div);
  }

  for (const lane of lanes) {
    const container = el(`lane-${lane}`);
    if ((container as HTMLElement).children.length === 0) {
      container.innerHTML = '<div style="font-size:9px;color:var(--green-dark);padding:4px;">// IDLE</div>';
    }
  }
}
