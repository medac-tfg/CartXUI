import { contextBridge, ipcRenderer } from "electron";

export type ContextBridgeApi = {
  onChangeRoute: (callback: (value: string) => void) => void;
  onToast: (callback: (value: string) => void) => void;
  onSetProducts: (callback: (value: string) => void) => void;
  onSetCategories: (callback: (value: string) => void) => void;
  onTicketInvoiceChange: (callback: (value: string) => void) => void;
  onAdditionalProductChange: (callback: (value: string) => void) => void;
  handleAdditionalProductChange: (id: string, quantity: number) => void;
  handleAdminPinEntered: (pin: string) => void;
  onOpenAdminModal: (callback: (value: string) => void) => void;
};

const exposedApi: ContextBridgeApi = {
  onChangeRoute: (callback: (value: string) => void) =>
    ipcRenderer.on("changeRoute", (_event, value) => callback(value)),
  onToast: (callback: (value: string) => void) =>
    ipcRenderer.on("showToastMessage", (_event, value) => callback(value)),
  onSetProducts: (callback: (value: string) => void) =>
    ipcRenderer.on("setProducts", (_event, value) => callback(value)),
  onSetCategories: (callback: (value: string) => void) =>
    ipcRenderer.on("setCategories", (_event, value) => callback(value)),
  onTicketInvoiceChange: (callback: (value: string) => void) =>
    ipcRenderer.on("ticketInvoiceChanged", (_event, value) => callback(value)),
  onAdditionalProductChange: (callback: (value: string) => void) =>
    ipcRenderer.on("additionalProductsChanged", (_event, value) =>
      callback(value)
    ),
  handleAdditionalProductChange: (id: string, quantity: number) => {
    ipcRenderer.send("additionalProductChange", { id, quantity });
  },
  handleAdminPinEntered: (pin: string) => {
    ipcRenderer.send("adminPinEntered", pin);
  },
  onOpenAdminModal: (callback: (value: string) => void) =>
    ipcRenderer.on("openAdminModal", (_event, value) => callback(value)),
};

contextBridge.exposeInMainWorld("electron", exposedApi);
