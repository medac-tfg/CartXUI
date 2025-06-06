import { BrowserWindow, ipcMain } from "electron";
import Ticket from "../state/Ticket";
import Windows from "../state/Windows";

import { getRFIDTags } from "../utils/getRFIDTags";
import { checkAdminPin } from "../api/endpoints/checkAdminPin";
import { getHumanPresence } from "../utils/getHumanPresence";
import { asyncWait } from "../utils/asyncWait";

let overviewWindow: Electron.BrowserWindow | null = null;

/**
 * Configuration for RFID scanning.
 * @property {number} SCAN_TIME - Initial scan duration in ms.
 * @property {number} EXTEND_TIME - Additional time added for each detected RFID tag in ms.
 */
const RFID_SCAN_CONFIG = {
  SCAN_TIME: 5000, // 5 seconds
  EXTEND_TIME: 2000, // 2 seconds
};

/**
 * Scans for RFID tags and adds the corresponding products to the cart.
 * @returns {Promise<any>} The data containing products and categories related to the scanned RFID tags.
 */
const getProductsInCart = async (): Promise<string[] | null> => {
  try {
    console.log("Starting RFID tag scan...");

    const tags = await getRFIDTags(
      RFID_SCAN_CONFIG.SCAN_TIME,
      RFID_SCAN_CONFIG.EXTEND_TIME
    );

    console.log("Scan complete. Tags collected:", tags);

    return tags;
  } catch (error: any) {
    Windows.sendErrorToastToWindow(
      "overview",
      "Failed to scan RFID tags. Contact support."
    );

    return null;
  }
};

/**
 * Retrieves the instruction route based on the shopping method selected.
 * @param {string} shoppingMethod - The selected shopping method.
 * @returns {string} The corresponding instruction route.
 */
const getMethodInstructions = (shoppingMethod: string): string => {
  switch (shoppingMethod) {
    case "shopping-cart":
      return "go_secondary_screen_cart";
    case "shopping-basket":
      return "go_secondary_screen_basket";
    default:
      return "go_secondary_screen_hand";
  }
};

/**
 * Handles the start of an order process:
 * 1. Loads additional products.
 * 2. Navigates to the home route.
 * 3. Initiates an RFID scan to get the products in the cart.
 * 4. Sends products and categories to the UI.
 * @param {Electron.BrowserWindow} overviewUIWindow The window to send UI updates to.
 */
const handleOrderStart = async (): Promise<void> => {
  // Get additional products and change route to home (with state)
  const additionalProducts = await Ticket.fetchAdditionalProducts();
  overviewWindow.webContents.send("changeRoute", {
    route: "/home",
    state: { additionalProducts },
  });

  // First, we wait till a human is inside the detection area
  while (!(await getHumanPresence())) {
    console.log("Waiting for human presence...");
    await asyncWait(1000); // Wait 1 seconds before checking again
  }

  console.log("Human presence detected, starting order...");

  const shoppingMethod = Ticket.getShoppingMethod();
  if (
    shoppingMethod === "shopping-cart" ||
    shoppingMethod === "shopping-basket"
  ) {
    // After human presence is detected, if the shopping method is cart or basket,
    // we wait for 2 seconds to ensure the person exits the detection area
    while (await getHumanPresence()) {
      console.log("Human still present...");
      await asyncWait(2000);
    }
  }

  const startWindow = Windows.getWindow("start");
  startWindow.webContents.send("changeRoute", {
    route: "/instructions",
    state: { instructions: "scanning_products" },
  });

  // Get products based on RFID scan
  const tags = await getProductsInCart();
  if (!tags) {
    console.error("Error when scanning products.");

    // Send an error message to the UI
    Windows.sendErrorToastToWindow(
      "overview",
      "Failed to scan products in the cart. Contact support."
    );

    return;
  }

  Ticket.addProducts(tags);

  const shoppingMethodInstructions = getMethodInstructions(shoppingMethod);
  startWindow.webContents.send("changeRoute", {
    route: "/instructions",
    state: { instructions: shoppingMethodInstructions },
  });
};

const handleAdminPinEntered = async (pin: string): Promise<void> => {
  const isCorrectPin = await checkAdminPin(pin);
  if (isCorrectPin) {
    overviewWindow.webContents.send("openAdminModal");
  } else {
    Windows.sendErrorToastToWindow("overview", "Incorrect admin pin.");
  }
};

/**
 * Registers IPC listeners for events triggered from the Overview UI.
 * @param {Electron.BrowserWindow} overviewUIWindow The overview UI window.
 */
const registerOverviewUIListeners = (overviewUIWindow: BrowserWindow): void => {
  overviewWindow = overviewUIWindow;
  Windows.setWindow("overview", overviewUIWindow);

  // Listen for quantity change events for additional products
  ipcMain.on("additionalProductChange", (_event, args) => {
    const { id, quantity } = args;
    Ticket.changeAdditionalProductQuantity(id, quantity);
  });

  // Listen for order finished events
  ipcMain.on("orderFinished", () => {
    Ticket.clear();

    overviewWindow.webContents.send("changeRoute", { route: "/" });

    const startWindow = Windows.getWindow("start");
    if (startWindow) {
      startWindow.webContents.send("changeRoute", { route: "/" });
    }
  });

  // Listen for admin pin entered events
  ipcMain.on("adminPinEntered", (_event, pin) => handleAdminPinEntered(pin));
};

export { registerOverviewUIListeners, handleOrderStart };
