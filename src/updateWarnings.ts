import { state } from "./state";
import { el } from "./el";
import { OrderState } from "./model";

export function updateWarnings(): void {
  const overlay = el<HTMLDivElement>("warningOverlay");
  const orders = Array.from(state.ordersMap.values());
  const kitchenOrders = orders.filter(
    (o) => o.state === OrderState.EN_PREPARACION,
  );
  const cashOrders = orders.filter((o) => o.state === OrderState.CALCULANDO);

  let html = "";
  for (const o of kitchenOrders) {
    html += `<div class="warn-block">⚠ WARNING // ${o.id} EN COCINA</div>`;
  }
  for (const o of cashOrders) {
    html += `<div class="warn-block" style="border-color:var(--yellow);color:var(--yellow)">
      ‼ CRITICAL // ${o.id} CALCULANDO</div>`;
  }
  overlay.innerHTML = html;
}
