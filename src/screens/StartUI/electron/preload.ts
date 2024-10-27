import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electron", {
  handleShoppingMethod: (shoppingMethod: string) => ipcRenderer.send("shoppingMethodSelected", shoppingMethod),
});
