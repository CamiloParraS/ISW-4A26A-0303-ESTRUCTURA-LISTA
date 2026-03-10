import { state } from "./state";
import { renderMenu } from "./renderMenu";
import { renderOrderSummary } from "./renderOrderSummary";

export function changeQty(itemId: string, delta: number): void {
  const current = state.cartQty[itemId] ?? 0;
  const newQty = Math.max(0, current + delta);
  if (newQty === 0) delete state.cartQty[itemId];
  else state.cartQty[itemId] = newQty;
  renderMenu();
  renderOrderSummary();
}
