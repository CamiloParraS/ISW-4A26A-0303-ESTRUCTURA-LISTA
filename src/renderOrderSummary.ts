import { el } from "./el";
import { allItems } from "./allItems";
import { state } from "./state";

export function renderOrderSummary(): void {
  const linesEl = el<HTMLDivElement>("orderLines");
  const totalEl = el<HTMLSpanElement>("orderTotal");
  const items = allItems();
  const keys = Object.keys(state.cartQty);

  if (keys.length === 0) {
    linesEl.innerHTML =
      '<div style="font-size:10px;color:var(--green-dark)">// sin items seleccionados</div>';
    totalEl.textContent = "S/ 0.00";
    return;
  }

  let total = 0;
  let html = "";

  for (const id of keys) {
    const item = items.find((i) => i.id === id);
    if (!item) continue;
    const subtotal = item.price * (state.cartQty[id] ?? 0);
    total += subtotal;
    html += `<div class="order-line">
      <span>${item.emoji} ${item.name} ×${state.cartQty[id]}</span>
      <span>S/${subtotal.toFixed(2)}</span>
    </div>`;
  }

  linesEl.innerHTML = html;
  totalEl.textContent = `S/ ${total.toFixed(2)}`;
}
