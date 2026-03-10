import { MENU } from "./model";
import type { MenuItem } from "./model";

export function allItems(): MenuItem[] {
  return [...MENU.sandias, ...MENU.bebidas, ...MENU.acomp];
}
