import { contextBridge, ipcRenderer } from "electron";

export type ContextBridgeApi = {
  onChangeRoute: (callback: (value: string) => void) => void;
  onSetProductsAndCategories: (callback: (value: string) => void) => void;
  onTicketInvoiceChange: (callback: (value: string) => void) => void;
  onAdditionalProductChange: (callback: (value: string) => void) => void;
  handleAdditionalProductChange: (id: string, quantity: number) => void;
};

const exposedApi: ContextBridgeApi = {
  onChangeRoute: (callback: (value: string) => void) =>
    ipcRenderer.on("changeRoute", (_event, value) => callback(value)),
  onSetProductsAndCategories: (callback: (value: string) => void) =>
    ipcRenderer.on("setProductsAndCategories", (_event, value) =>
      callback(value)
    ),
  onTicketInvoiceChange: (callback: (value: string) => void) =>
    ipcRenderer.on("ticketInvoiceChanged", (_event, value) => callback(value)),
  onAdditionalProductChange: (callback: (value: string) => void) =>
    ipcRenderer.on("additionalProductsChanged", (_event, value) =>
      callback(value)
    ),
  handleAdditionalProductChange: (id: string, quantity: number) => {
    ipcRenderer.send("additionalProductChange", { id, quantity });
  },
};

contextBridge.exposeInMainWorld("electron", exposedApi);
