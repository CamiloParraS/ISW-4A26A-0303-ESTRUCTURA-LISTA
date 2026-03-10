import { state } from "./state";
import { el } from "./el";

export function renderRadarBlips(): void {
  const container = el<HTMLDivElement>("radarBlips");
  container.innerHTML = "";

  const orders = Array.from(state.ordersMap.values());
  const colors = [
    "var(--green)",
    "var(--cyan)",
    "var(--orange)",
    "var(--yellow)",
    "var(--red)",
  ];

  orders.forEach((o, i) => {
    const angle = (i / Math.max(orders.length, 1)) * Math.PI * 2 - Math.PI / 2;
    const radius = 30 + (o.state / 6) * 15;
    const x = 50 + Math.cos(angle) * radius;
    const y = 50 + Math.sin(angle) * radius;
    const color = colors[o.state % colors.length];

    const blip = document.createElement("div");
    blip.className = "radar-blip";
    blip.style.cssText = `left:${x}%;top:${y}%;background:${color};
      box-shadow:0 0 6px ${color};animation-delay:${i * 0.3}s`;
    container.appendChild(blip);
  });
}
