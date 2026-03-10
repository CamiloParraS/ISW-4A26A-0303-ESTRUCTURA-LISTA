import { state } from "./state";
import { el } from "./el";
import { PROGRESS_MAP, OrderState, STATE_LABELS, LANE_MAP } from "./model";

export function renderOrdersTable(): void {
  const tbody = el<HTMLTableSectionElement>("ordersBody");
  const orders = Array.from(state.ordersMap.values());

  if (orders.length === 0) {
    tbody.innerHTML = '<tr><td colspan="8"><div class="empty-state">// SISTEMA EN ESPERA — SIN ÓRDENES ACTIVAS</div></td></tr>';
    return;
  }

  tbody.innerHTML = orders
    .map((o) => {
      const elapsed = Math.floor((Date.now() - o.createdAt) / 1000);
      const timeStr =
        elapsed < 60
          ? `${elapsed}s`
          : `${Math.floor(elapsed / 60)}m${elapsed % 60}s`;
      const pct = PROGRESS_MAP[o.state];
      const lane = LANE_MAP[o.state];
      const barColor =
        o.state === OrderState.EN_PREPARACION
          ? "var(--orange)"
          : o.state === OrderState.CALCULANDO
          ? "var(--yellow)"
          : "var(--green)";
      const itemSummary = o.items.map((i) => `${i.emoji}×${i.qty}`).join(" ");

      return `<tr>
      <td style="color:var(--orange);font-size:10px">${o.id}</td>
      <td style="font-size:10px;color:var(--cyan)">${o.customer}</td>
      <td style="font-size:10px;color:var(--green-dim)">${itemSummary}</td>
      <td><span class="state-badge badge-${o.state}">${STATE_LABELS[o.state]}</span></td>
      <td><span class="lane-indicator lane-${lane}">${lane}</span></td>
      <td>
        <div class="progress-bar-wrap">
          <div class="progress-bar-fill" style="width:${pct}%;background:linear-gradient(90deg,${barColor}44,${barColor})"></div>
        </div>
      </td>
      <td style="font-size:10px;color:var(--green-dim)">${timeStr}</td>
      <td>
        ${
          o.state < OrderState.PAGADO
            ? `<button class="action-btn advance" onclick="advanceOrder('${o.id}')">▶ AVANZAR</button>`
            : ""
        }
        <button class="action-btn remove" onclick="removeOrder('${o.id}')">✕</button>
      </td>
    </tr>`;
    })
    .join("");
}
