import { BrowserWindow, ipcMain } from "electron";

import { getTicketInvoice } from "../api/endpoints/getTicketInvoice";
import { addProducts } from "../api/endpoints/addProducts";
import { getAdditionalProducts } from "../api/endpoints/getAdditionalProducts";
import { changeAdditionalProductQuantity } from "../api/endpoints/changeAdditionalProductQuantity";

import { getRFIDTags } from "../utils/getRFIDTags";
import GlobalStore from "../utils/globalStore";

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

const sendErrorToast = (message: string): void => {
  overviewWindow?.webContents.send("showToastMessage", {
    type: "error",
    message,
  });
};

/**
 * Refreshes the ticket invoice data in the overview UI.
 * Fetches the latest ticket invoice information and sends it to the front-end.
 */
const refreshTicketInvoice = async (): Promise<void> => {
  const ticketId = GlobalStore.getTicketId();
  if (!ticketId) {
    console.error("No ticket ID found. Cannot refresh ticket invoice.");

    // Send an error message to the UI
    sendErrorToast("Couldn't find ticket ID. Contact support.");

    return;
  }

  try {
    const data = await getTicketInvoice(ticketId);
    if (!data) {
      console.error("Failed to retrieve ticket invoice data.");

      // Send an error message to the UI
      sendErrorToast("Failed to get ticket invoice. Contact support.");

      return;
    }

    if (overviewWindow) {
      overviewWindow.webContents.send("ticketInvoiceChanged", data);
    }
  } catch (error: any) {
    console.error("Error when getting ticket invoice:", error.message);

    // Send an error message to the UI
    sendErrorToast("Failed to get ticket invoice. Contact support.");
  }
};

/**
 * Retrieves the additional products associated with the current ticket.
 * @returns {Promise<any>} The additional products data.
 */
const getTicketAdditionalProducts = async (): Promise<any> => {
  const ticketId = GlobalStore.getTicketId();
  if (!ticketId) {
    console.error("No ticket ID found. Cannot get additional products.");

    // Send an error message to the UI
    sendErrorToast("Couldn't find ticket ID. Contact support.");
    return null;
  }

  try {
    const data = await getAdditionalProducts(ticketId);
    return data;
  } catch (error: any) {
    console.error("Error when getting additional products:", error.message);

    // Send an error message to the UI
    sendErrorToast("Failed to get additional products. Contact support.");

    return null;
  }
};

/**
 * Handles the change in quantity of an additional product.
 * Updates the backend, then refreshes the UI with the new data.
 * @param {Electron.BrowserWindow} overviewUIWindow The window to send UI updates to.
 * @param {{ id: string; quantity: number }} params The product ID and the new quantity.
 */
const handleAdditionalProductQuantityChange = async (
  overviewUIWindow: BrowserWindow,
  { id, quantity }: { id: string; quantity: number }
): Promise<void> => {
  const ticketId = GlobalStore.getTicketId();
  if (!ticketId) {
    console.error(
      "No ticket ID found. Cannot change additional product quantity."
    );

    // Send an error message to the UI
    sendErrorToast("Couldn't find ticket ID. Contact support.");

    return;
  }

  try {
    const data = await changeAdditionalProductQuantity(id, quantity, ticketId);
    if (!data) {
      console.error("Failed to change additional product quantity.");

      // Send an error message to the UI
      sendErrorToast("Failed to change additional product quantity. Contact support.");

      return;
    }

    overviewUIWindow.webContents.send("additionalProductsChanged", data);
    await refreshTicketInvoice();
  } catch (error: any) {
    console.error(
      "Error when changing additional product quantity:",
      error.message
    );

    // Send an error message to the UI
    sendErrorToast("Failed to change additional product quantity. Contact support.");
  }
};

/**
 * Scans for RFID tags and adds the corresponding products to the cart.
 * @returns {Promise<any>} The data containing products and categories related to the scanned RFID tags.
 */
const getProductsInCart = async (): Promise<any> => {
  try {
    console.log("Starting RFID tag scan...");
    
    const tags = await getRFIDTags(
      RFID_SCAN_CONFIG.SCAN_TIME,
      RFID_SCAN_CONFIG.EXTEND_TIME
    );
    console.log("Scan complete. Tags collected:", Array.from(tags));

    const ticketId = GlobalStore.getTicketId();
    if (!ticketId) {
      console.error("No ticket ID found. Cannot add products.");

      // Send an error message to the UI
      sendErrorToast("Couldn't find ticket ID. Contact support.");

      return null;
    }

    const data = await addProducts(Array.from(tags), ticketId);
    return data;
  } catch (error: any) {
    console.error("Error during RFID tag scan:", error.message);

    // Send an error message to the UI
    sendErrorToast("Failed to scan RFID tags. Contact support.");

    return null;
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
const handleOrderStart = async (
  overviewUIWindow: BrowserWindow
): Promise<void> => {
  // Get additional products
  const additionalProducts = await getTicketAdditionalProducts();
  if (!additionalProducts) {
    console.error("Error when getting additional products.");

    // Send an error message to the UI
    sendErrorToast("Failed to get additional products. Contact support.");
  }

  // Change route to home with state
  overviewUIWindow.webContents.send("changeRoute", {
    route: "/home",
    state: { additionalProducts },
  });

  /*
    Distinguish between shopping methods:
    1. Shopping cart: Wait until no human presence on sensor & we have weight on scale, 
       wait 2 secs and start scanning. 
       Loop check if human presence returns, stop scanning if so.
    2. Shopping basket: Same as cart.
    3. By hand: Start scanning immediately once human presence is detected.

    NOTE: The logic for detection is not implemented here.
  */

  // Get products based on RFID scan
  const data = await getProductsInCart();
  if (!data) {
    console.error("Error when adding products.");

    // Send an error message to the UI
    sendErrorToast("Failed to add products to the cart. Contact support.");

    return;
  }

  overviewUIWindow.webContents.send("setProducts", data.products);
  overviewUIWindow.webContents.send("setCategories", data.categories);

  await refreshTicketInvoice();

  console.log("Products added:", data.products);
  console.log("Categories added:", data.categories);
};

/**
 * Registers IPC listeners for events triggered from the Overview UI.
 * @param {Electron.BrowserWindow} startUIWindow The start UI window.
 * @param {Electron.BrowserWindow} overviewUIWindow The overview UI window.
 */
const registerOverviewUIListeners = (
  _startUIWindow: BrowserWindow,
  overviewUIWindow: BrowserWindow
): void => {
  overviewWindow = overviewUIWindow;

  // Listen for quantity change events for additional products
  ipcMain.on("additionalProductChange", (_event, args) =>
    handleAdditionalProductQuantityChange(overviewUIWindow, args)
  );
};

export { registerOverviewUIListeners, handleOrderStart };
