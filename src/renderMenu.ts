import { state } from "./state";
import { MenuCatalog, MENU } from "./model";
import { el } from "./el";

export function renderMenu(): void {
  const cats: Array<{ key: keyof MenuCatalog; containerId: string }> = [
    { key: "sandias", containerId: "menuSandias" },
    { key: "bebidas", containerId: "menuBebidas" },
    { key: "acomp", containerId: "menuAcomp" },
  ];

  for (const cat of cats) {
    const container = el<HTMLDivElement>(cat.containerId);
    container.innerHTML = "";

    for (const item of MENU[cat.key]) {
      const qty = state.cartQty[item.id] ?? 0;
      const div = document.createElement("div");
      div.className = "menu-item" + (qty > 0 ? " selected" : "");
      div.id = `menu-item-${item.id}`;
      div.innerHTML = `
        <span class="menu-item-name">${item.emoji} ${item.name}</span>
        <div class="item-qty-ctrl">
          <span class="menu-item-price">S/${item.price.toFixed(2)}</span>
          <button class="qty-btn" onclick="changeQty('${item.id}', -1)">−</button>
          <span class="qty-display">${qty}</span>
          <button class="qty-btn" onclick="changeQty('${item.id}', 1)">+</button>
        </div>`;
      container.appendChild(div);
    }
  }
}
