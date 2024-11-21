import { contextBridge, ipcRenderer } from "electron";

export type ContextBridgeApi = {
  handleShoppingMethod: (shoppingMethod: string) => void;
  onOrderStarted: (callback: (value: string) => void) => void;
};

const exposedApi: ContextBridgeApi = {
  handleShoppingMethod: (shoppingMethod: string) =>
    ipcRenderer.send("shoppingMethodSelected", shoppingMethod),
  onOrderStarted: (callback: (value: string) => void) =>
    ipcRenderer.on("orderStarted", (_event, value) => callback(value)),
};

contextBridge.exposeInMainWorld("electron", exposedApi);
