import { ipcMain } from "electron";
import { startOrder } from "../api/endpoints/startOrder";

// remember (invoke / handle) is for two way communication between main and renderer processes
// rembember (send / on) is for one way communication between main and renderer processes

const getTargetRoute = (shoppingMethod: string): string => {
  switch (shoppingMethod) {
    case "shopping-cart":
      return "/shopping-cart-instructions";
    case "shopping-basket":
      return "/shopping-basket-instructions";
    default:
      return "/by-hand-instructions";
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

    const targetRoute = getTargetRoute(shoppingMethod);
    browserWindow.webContents.send("orderStarted", {
      targetRoute,
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
