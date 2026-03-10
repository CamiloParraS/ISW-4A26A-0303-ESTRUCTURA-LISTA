import { renderOrdersTable } from "./renderOrdersTable";
import { renderSwimlanes } from "./renderSwimlanes";
import { renderSyncBars } from "./renderSyncBars";
import { renderStats } from "./renderStats";
import { renderRadarBlips } from "./renderRadarBlips";
import { updateMagi } from "./updateMagi";
import { updateWarnings } from "./updateWarnings";

export function renderAll(): void {
  renderOrdersTable();
  renderSwimlanes();
  renderSyncBars();
  renderStats();
  renderRadarBlips();
  updateMagi();
  updateWarnings();
}
