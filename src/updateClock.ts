import { el } from "./el";

export function updateClock(): void {
  el("clock").textContent = new Date().toTimeString().slice(0, 8);
}
