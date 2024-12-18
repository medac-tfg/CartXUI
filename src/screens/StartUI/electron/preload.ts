import { contextBridge, ipcRenderer } from "electron";

export type ContextBridgeApi = {
  onToast: (callback: (value: string) => void) => void;
  handleShoppingMethod: (shoppingMethod: string) => void;
  onChangeRoute: (callback: (value: string) => void) => void;
};

const exposedApi: ContextBridgeApi = {
  onToast: (callback: (value: string) => void) =>
    ipcRenderer.on("showToastMessage", (_event, value) => callback(value)),
  handleShoppingMethod: (shoppingMethod: string) =>
    ipcRenderer.send("shoppingMethodSelected", shoppingMethod),
  onChangeRoute: (callback: (value: string) => void) =>
    ipcRenderer.on("changeRoute", (_event, value) => callback(value)),
};

contextBridge.exposeInMainWorld("electron", exposedApi);
