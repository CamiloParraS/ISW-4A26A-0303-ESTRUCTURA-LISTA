import { el } from "./el";
import { allItems } from "./allItems";
import { state } from "./state";
import { OrderState, Order } from "./model";
import { addLog } from "./addLog";
import { renderAll } from "./renderAll";
import { renderMenu } from "./renderMenu";
import { renderOrderSummary } from "./renderOrderSummary";

export function submitOrder(): void {
  const customerInput = el<HTMLInputElement>("customerName");
  const customer = customerInput.value.trim() || `MESA-${state.orderCounter}`;
  const items = allItems();

  const selectedItems = Object.entries(state.cartQty)
    .filter(([, q]) => q > 0)
    .map(([id, qty]) => {
      const item = items.find((i) => i.id === id)!;
      return { ...item, qty, subtotal: item.price * qty };
    });

  if (selectedItems.length === 0) {
    addLog("⚠ Sin items — seleccione al menos 1 producto", "warn");
    return;
  }

  const order: Order = {
    id: `ORD-${String(state.orderCounter).padStart(3, "0")}`,
    customer,
    items: selectedItems,
    state: OrderState.SOLICITADO,
    createdAt: Date.now(),
    total: selectedItems.reduce((s, i) => s + i.subtotal, 0),
  };

  state.orderCounter++;
  state.ordersMap.set(order.id, order);

  for (const k of Object.keys(state.cartQty)) delete state.cartQty[k];
  customerInput.value = "";
  renderMenu();
  renderOrderSummary();

  addLog(
    `✦ Nueva orden ${order.id} [${customer}] — S/${order.total.toFixed(2)}`,
    "ok",
  );
  renderAll();
}
