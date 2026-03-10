import { state } from "./state";
import { addLog } from "./addLog";
import { renderAll } from "./renderAll";

export function removeOrder(orderId: string): void {
  state.ordersMap.delete(orderId);
  addLog(`✕ ${orderId} cancelado y eliminado del sistema`, "warn");
  renderAll();
}
