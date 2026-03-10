import { state } from "./state";
import { el } from "./el";
import { OrderState } from "./model";

export function updateMagi(): void {
  const orders = Array.from(state.ordersMap.values());
  const hasKitchen = orders.some((o) => o.state === OrderState.EN_PREPARACION);
  const hasCash = orders.some((o) => o.state === OrderState.CALCULANDO);
  const highLoad = orders.length > 3;

  const magi1 = el("magi1");
  magi1.textContent = hasKitchen ? "ALERTA" : "NOMINAL";
  magi1.className = `magi-status ${hasKitchen ? "warn" : "ok"}`;

  const magi2 = el("magi2");
  magi2.textContent = hasCash ? "CRÍTICO" : "NOMINAL";
  magi2.className = `magi-status ${hasCash ? "warn" : "ok"}`;

  const magi3 = el("magi3");
  magi3.textContent = highLoad ? "CARGA ALTA" : "NOMINAL";
  magi3.className = `magi-status ${highLoad ? "warn" : "ok"}`;

  el("alertBanner").style.display = hasKitchen ? "block" : "none";
}
