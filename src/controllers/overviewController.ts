import { ipcMain } from "electron";

import { getTicketInvoice } from "../api/endpoints/getTicketInvoice";
import { addProducts } from "../api/endpoints/addProducts";
import { getAdditionalProducts } from "../api/endpoints/getAdditionalProducts";
import { changeAdditionalProductQuantity } from "../api/endpoints/changeAdditionalProductQuantity";

import { getRFIDTags } from "../utils/getRFIDTags";
import GlobalStore from "../utils/globalStore";

let overviewWindow: Electron.BrowserWindow | null = null;

const RFID_SCAN_CONFIG = {
  SCAN_TIME: 5000, // Initial scan duration (5 seconds)
  EXTEND_TIME: 2000, // Additional time for each detected tag
};

const refreshTicketInvoice = async () => {
  const ticketId = GlobalStore.getTicketId();
  const data = await getTicketInvoice(ticketId);
  if (!data) {
    // show error in ui
    console.log("Error when getting ticket invoice");
    return;
  }

  overviewWindow?.webContents.send("ticketInvoiceChanged", data);
}

const getTicketAdditionalProducts = async () => {
  const ticketId = GlobalStore.getTicketId();
  const data = await getAdditionalProducts(ticketId);

  return data;
};

const handleAdditionalProductQuantityChange = async (
  overviewUIWindow: Electron.BrowserWindow,
  {
    id,
    quantity,
  }: {
    id: string;
    quantity: number;
  }
) => {
  const ticketId = GlobalStore.getTicketId();
  const data = await changeAdditionalProductQuantity(id, quantity, ticketId);
  if (!data) {
    // show error in ui
    console.log("Error when changing additional product quantity");
    return;
  }

  overviewUIWindow.webContents.send("additionalProductsChanged", data);

  refreshTicketInvoice();
};

const getProductsInCart = async () => {
  try {
    console.log("Starting RFID tag scan...");
    const tags = await getRFIDTags(
      RFID_SCAN_CONFIG.SCAN_TIME,
      RFID_SCAN_CONFIG.EXTEND_TIME
    );

    console.log("Scan complete. Tags collected:", Array.from(tags));

    const ticketId = GlobalStore.getTicketId();
    const data = await addProducts(Array.from(tags), ticketId);

    return data;
  } catch (error) {
    console.error("Error during RFID tag scan:", error.message);
  }
};

/**
 * Handles the start of an order by scanning for RFID tags and sending them to the UI.
 * @param {Electron.BrowserWindow} overviewUIWindow The window instance to send messages to.
 */
const handleOrderStart = async (overviewUIWindow: Electron.BrowserWindow) => {
  const additionalProducts = await getTicketAdditionalProducts();
  if (!additionalProducts) {
    // show error in ui
    console.log("Error when getting additional products");
  }

  overviewUIWindow.webContents.send("changeRoute", {
    route: "/home",
    state: { additionalProducts },
  });

  /*
    Here we must distinguish between shopping methods:
    1: Shopping cart (wait till there is no human presence on the sensor & we have weight in the scale, wait 2 secs 
    and start scanning (we must loop check if there is human presence and stop scanning if so)
    2. Shopping basket (same as cart)
    3. By hand (start scanning immediately once we detect human presence)
  */

  const data = await getProductsInCart();
  if (!data) {
    // show error in ui
    console.log("Error when adding products");
    return;
  }

  overviewUIWindow.webContents.send("setProductsAndCategories", {
    products: data.products,
    categories: data.categories,
  });

  refreshTicketInvoice();

  console.log("Products added:", data.products);
  console.log("Categories added:", data.categories);
};

const registerOverviewUIListeners = (
  startUIWindow: Electron.BrowserWindow,
  overviewUIWindow: Electron.BrowserWindow
): void => {
  overviewWindow = overviewUIWindow;

  ipcMain.on("additionalProductChange", (_event, args) =>
    handleAdditionalProductQuantityChange(overviewUIWindow, args)
  );
};

export { registerOverviewUIListeners, handleOrderStart };
