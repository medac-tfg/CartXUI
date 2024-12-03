import { ipcMain } from "electron";
import { startOrder } from "../api/endpoints/startOrder";
import GlobalStore from "../utils/globalStore";
import { handleOrderStart } from "./overviewController";

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
      // show error in ui
      console.log("Error when starting order");
      return;
    }

    GlobalStore.setTicketId(data.ticketId);

    const shoppingMethodInstructions = getMethodInstructions(cleanedMethod);
    startUIWindow.webContents.send("orderStarted", {
      shoppingMethodInstructions,
    });
    handleOrderStart(overviewUIWindow);
  } catch (error) {
    // show error in ui
    console.log("Error when starting order", error.message);
  }
};

const registerStartUIListeners = (
  startUIWindow: Electron.BrowserWindow,
  overviewUIWindow: Electron.BrowserWindow
): void => {
  ipcMain.on("shoppingMethodSelected", (_event, args) =>
    handleShoppingMethodSelection(startUIWindow, overviewUIWindow, args)
  );
};

export { registerStartUIListeners };
