import { contextBridge, ipcRenderer } from "electron";

// electronAPI
const electronAPI = {
  send: (channel: string, ...args: any[]) => ipcRenderer.invoke(channel, ...args),
  on: (channel: string, listener: (...args: any[]) => void) =>
    ipcRenderer.on(channel, (_event, ...args) => listener(...args)),
};

// Custom APIs for renderer
const api = {
  getConfirmationFromDesktopApp: () => ipcRenderer.invoke("getConfirmationFromDesktopApp"),
};

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (!process.contextIsolated) {
  throw new Error("contextIsolation is disabled");
}

try {
  contextBridge.exposeInMainWorld("electronAPI", electronAPI);
  contextBridge.exposeInMainWorld("api", api);
} catch (error) {
  console.error(error);
}
