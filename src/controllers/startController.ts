import { ipcMain } from "electron";
import { startOrder } from "../api/endpoints/startOrder";
import { handleOrderStart } from "./overviewController";

import Ticket from "../state/Ticket";
import Windows from "../state/Windows";

let startWindow: Electron.BrowserWindow | null = null;

/**
 * Retrieves the instruction route based on the shopping method selected.
 * @param {string} shoppingMethod - The selected shopping method.
 * @returns {string} The corresponding instruction route.
 */
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

/**
 * Handles the shopping method selection process:
 * 1. Cleans the shopping method string.
 * 2. Initiates the order using the selected method.
 * 3. Updates the UI with relevant instructions.
 * 4. Calls the order start process.
 * @param {string} shoppingMethod - The shopping method selected by the user.
 */
const handleShoppingMethodSelection = async (shoppingMethod: string) => {
  const cleanedMethod = shoppingMethod.replace("option_", "");

  try {
    const data = await startOrder(cleanedMethod);
    if (!data) {
      console.log("Error when starting order");

      // Send an error message to the UI
      Windows.sendErrorToastToWindow(
        "start",
        "Failed to start order. Contact support."
      );

      return;
    }

    Ticket.setTicketId(data.ticketId);

    const shoppingMethodInstructions = getMethodInstructions(cleanedMethod);
    startWindow.webContents.send("changeRoute", {
      route: "/instructions",
      state: { shoppingMethodInstructions },
    });

    handleOrderStart();
  } catch (error) {
    console.log("Error when starting order", error.message);

    // Send an error message to the UI
    Windows.sendErrorToastToWindow(
      "start",
      "Failed to start order. Contact support."
    );
  }
};

/**
 * Registers IPC listeners for events triggered from the Start UI.
 * @param {Electron.BrowserWindow} startUIWindow - The Start UI window.
 */
const registerStartUIListeners = (
  startUIWindow: Electron.BrowserWindow
): void => {
  startWindow = startUIWindow;
  Windows.setWindow("start", startUIWindow);

  ipcMain.on("shoppingMethodSelected", (_event, args) =>
    handleShoppingMethodSelection(args)
  );
};

export { registerStartUIListeners };
