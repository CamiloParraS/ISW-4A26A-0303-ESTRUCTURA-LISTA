export enum OrderState {
  SOLICITADO = 0,
  RECOGIDO = 1,
  EN_PREPARACION = 2,
  SERVIDO = 3,
  CUENTA_SOLICITADA = 4,
  CALCULANDO = 5,
  PAGADO = 6,
}

export type Lane = "CLIENTE" | "MOZO" | "COCINA" | "CAJA";
export type LogType = "ok" | "warn" | "crit" | "";

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  emoji: string;
}

export interface MenuCatalog {
  sandias: MenuItem[];
  bebidas: MenuItem[];
  acomp: MenuItem[];
}

export interface OrderItem extends MenuItem {
  qty: number;
  subtotal: number;
}

export interface Order {
  id: string;
  customer: string;
  items: OrderItem[];
  state: OrderState;
  createdAt: number;
  total: number;
}

export interface LogEntry {
  time: string;
  msg: string;
  type: LogType;
}

export interface CartQty {
  [itemId: string]: number;
}

export const STATE_LABELS: string[] = [
  "SOLICITADO",
  "RECOGIDO",
  "EN PREPARACIÓN",
  "SERVIDO",
  "CUENTA SOLICIT.",
  "CALCULANDO",
  "PAGADO",
];

export const LANE_MAP: Lane[] = [
  "CLIENTE",
  "MOZO",
  "COCINA",
  "MOZO",
  "CLIENTE",
  "CAJA",
  "CLIENTE",
];

export const PROGRESS_MAP: number[] = [14, 28, 42, 57, 71, 85, 100];

export const MENU: MenuCatalog = {
  sandias: [
    { id: "s1", name: "Sandía Entera Grande", price: 25.0, emoji: "🍉" },
    { id: "s2", name: "Sandía Entera Mediana", price: 18.0, emoji: "🍉" },
    { id: "s3", name: "Tajada de Sandía XL", price: 8.5, emoji: "🍉" },
    { id: "s4", name: "Tajada de Sandía", price: 5.5, emoji: "🍉" },
    { id: "s5", name: "Bowl Sandía + Limón", price: 9.0, emoji: "🍉" },
    { id: "s6", name: "Jugo de Sandía 500ml", price: 7.0, emoji: "🍉 " },
    { id: "s7", name: "Sandía con Tajín", price: 6.5, emoji: "🍉" },
    { id: "s8", name: "Ensalada de Sandía", price: 12.0, emoji: "🍉" },
  ],
  bebidas: [{ id: "b1", name: "Agua De Sandia", price: 3.0, emoji: "" }],
  acomp: [{ id: "a2", name: "Tostadas", price: 3.5, emoji: "" }],
};
