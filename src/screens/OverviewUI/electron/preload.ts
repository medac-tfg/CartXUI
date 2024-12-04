import { contextBridge, ipcRenderer } from "electron";

export type ContextBridgeApi = {
  onChangeRoute: (callback: (value: string) => void) => void;
};

const exposedApi: ContextBridgeApi = {
  onChangeRoute: (callback: (value: string) => void) =>
    ipcRenderer.on("changeRoute", (_event, value) => callback(value)),
};

contextBridge.exposeInMainWorld("electron", exposedApi);
