import { ipcMain } from "electron";
import { startOrder } from "../api/endpoints/startOrder";
import GlobalStore from "../utils/globalStore";
import { handleOrderStart } from "./overviewController";

let startWindow: Electron.BrowserWindow | null = null;

const sendErrorToast = (message: string): void => {
  startWindow?.webContents.send("showToastMessage", {
    type: "error",
    message,
  });
};

const getMethodInstructions = (shoppingMethod: string): string => {
  switch (shoppingMethod) {
    case "shopping-cart":
      return "enter_cart";
    case "shopping-basket":
      return "enter_basket";
    default:
      return "enter_products_hand";
  }
};

const handleShoppingMethodSelection = async (
  startUIWindow: Electron.BrowserWindow,
  overviewUIWindow: Electron.BrowserWindow,
  shoppingMethod: string
) => {
  const cleanedMethod = shoppingMethod.replace("option_", "");

  try {
    const data = await startOrder(cleanedMethod);
    if (!data) {
      console.log("Error when starting order");

      // Send an error message to the UI
      sendErrorToast("Failed to start order. Contact support.");

      return;
    }

    GlobalStore.setTicketId(data.ticketId);

    const shoppingMethodInstructions = getMethodInstructions(cleanedMethod);
    startUIWindow.webContents.send("changeRoute", {
      route: "/instructions",
      state: { shoppingMethodInstructions },
    });

    handleOrderStart(overviewUIWindow);
  } catch (error) {
    console.log("Error when starting order", error.message);

    // Send an error message to the UI
    sendErrorToast("Failed to start order. Contact support.");
  }
};

const registerStartUIListeners = (
  startUIWindow: Electron.BrowserWindow,
  overviewUIWindow: Electron.BrowserWindow
): void => {
  startWindow = startUIWindow;
  ipcMain.on("shoppingMethodSelected", (_event, args) =>
    handleShoppingMethodSelection(startUIWindow, overviewUIWindow, args)
  );
};

export { registerStartUIListeners };
