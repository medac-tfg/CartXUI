import { ipcMain } from "electron";
import { startOrder } from "../api/endpoints/startOrder";

// remember (invoke / handle) is for two way communication between main and renderer processes
// rembember (send / on) is for one way communication between main and renderer processes

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
  browserWindow: Electron.BrowserWindow,
  shoppingMethod: string
) => {
  // primero checkeamos si hay una compra en curso

  shoppingMethod = shoppingMethod.replace("option_", "");

  try {
    const data = await startOrder(shoppingMethod);
    if (!data) {
      // show error in ui
      console.log("Error when starting order");
      return;
    }

    const shoppingMethodInstructions = getMethodInstructions(shoppingMethod);
    browserWindow.webContents.send("orderStarted", {
      shoppingMethodInstructions,
      ticketId: data.ticketId,
    });
  } catch (error) {
    // show error in ui
    console.log("Error when starting order", error.message);
  }

  console.log("shoppingMethodSelected", shoppingMethod);
};

const registerStartUIListeners = (window: Electron.BrowserWindow): void => {
  ipcMain.on("shoppingMethodSelected", (_event, args) =>
    handleShoppingMethodSelection(window, args)
  );
};

export { registerStartUIListeners };
