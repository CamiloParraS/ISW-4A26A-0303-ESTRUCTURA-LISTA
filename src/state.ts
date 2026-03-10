import { CartQty, LogEntry, Order } from "./model";

export const state: {
  ordersMap: Map<string, Order>;
  orderCounter: number;
  completedCount: number;
  totalRevenue: number;
  cartQty: CartQty;
  systemLog: LogEntry[];
} = {
  ordersMap: new Map<string, Order>(),
  orderCounter: 1,
  completedCount: 0,
  totalRevenue: 0,
  cartQty: {},
  systemLog: [],
};
