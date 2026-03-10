import { el } from "./el";
import { state } from "./state";
import { LogType } from "./model";

export function addLog(msg: string, type: LogType = ""): void {
  const now: string = new Date().toTimeString().slice(0, 8);
  state.systemLog.unshift({ time: now, msg, type });
  if (state.systemLog.length > 50) state.systemLog.pop();

  el("logBox").innerHTML = state.systemLog
    .slice(0, 20)
    .map(
      (e) => `<div class="log-entry">
      <span class="log-time">[${e.time}]</span>
      <span class="log-msg ${e.type}">${e.msg}</span>
    </div>`,
    )
    .join("");
}
