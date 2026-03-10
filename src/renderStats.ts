import { state } from "./state";
import { el } from "./el";
import { OrderState } from "./model";

export function renderStats(): void {
  const orders = Array.from(state.ordersMap.values());
  el("statActive").textContent = String(orders.length);
  el("statCompleted").textContent = String(state.completedCount);
  el("statKitchen").textContent = String(
    orders.filter((o) => o.state === OrderState.EN_PREPARACION).length,
  );
  el("statRevenue").textContent = state.totalRevenue.toFixed(0);
}
