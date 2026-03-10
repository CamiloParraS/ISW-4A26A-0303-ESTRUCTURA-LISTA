import { state } from "./state";
import { OrderState, STATE_LABELS, LANE_MAP } from "./model";
import { addLog } from "./addLog";
import { renderAll } from "./renderAll";

export function advanceOrder(orderId: string): void {
  const order = state.ordersMap.get(orderId);
  if (!order) return;
  if (order.state >= OrderState.PAGADO) return;

  order.state += 1;
  state.ordersMap.set(orderId, order);

  const stateLabel = STATE_LABELS[order.state];
  const lane = LANE_MAP[order.state];

  if (order.state === OrderState.PAGADO) {
    addLog(`✔ ${order.id} PAGADO — cerrando en 2s`, "ok");
    state.totalRevenue += order.total;
    state.completedCount++;
    setTimeout(() => {
      state.ordersMap.delete(orderId);
      addLog(`⟫ ${orderId} eliminado del array`, "ok");
      renderAll();
    }, 2000);
  } else if (order.state === OrderState.EN_PREPARACION) {
    addLog(`⚠ ${order.id} → COCINA // WARNING ACTIVO`, "warn");
  } else if (order.state === OrderState.CALCULANDO) {
    addLog(`‼ ${order.id} → CAJA // CRITICAL SYNC`, "crit");
  } else {
    addLog(`→ ${order.id} → ${stateLabel} [${lane}]`, "");
  }

  renderAll();
}
