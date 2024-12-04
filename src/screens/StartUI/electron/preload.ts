import { contextBridge, ipcRenderer } from "electron";

export type ContextBridgeApi = {
  handleShoppingMethod: (shoppingMethod: string) => void;
  onChangeRoute: (callback: (value: string) => void) => void;
};

const exposedApi: ContextBridgeApi = {
  handleShoppingMethod: (shoppingMethod: string) =>
    ipcRenderer.send("shoppingMethodSelected", shoppingMethod),
  onChangeRoute: (callback: (value: string) => void) =>
    ipcRenderer.on("changeRoute", (_event, value) => callback(value)),
};

contextBridge.exposeInMainWorld("electron", exposedApi);
