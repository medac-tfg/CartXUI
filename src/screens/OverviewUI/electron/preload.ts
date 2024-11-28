import { contextBridge, ipcRenderer } from "electron";

export type ContextBridgeApi = {
  onOrderStarted: (callback: (value: string) => void) => void;
};

const exposedApi: ContextBridgeApi = {
  onOrderStarted: (callback: (value: string) => void) =>
    ipcRenderer.on("orderStarted", (_event, value) => callback(value)),
};

contextBridge.exposeInMainWorld("electron", exposedApi);
