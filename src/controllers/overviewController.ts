import { getRFIDTags } from "../utils/getRFIDTags";
import { addProducts } from "../api/endpoints/addProducts";
import GlobalStore from "../utils/globalStore";

const RFID_SCAN_CONFIG = {
  SCAN_TIME: 5000, // Initial scan duration (5 seconds)
  EXTEND_TIME: 2000, // Additional time for each detected tag
};

const getProductsInCart = async () => {
  try {
    const tags = await getRFIDTags(
      RFID_SCAN_CONFIG.SCAN_TIME,
      RFID_SCAN_CONFIG.EXTEND_TIME
    );

    console.log("Scan complete. Tags collected:", Array.from(tags));

    const ticketId = GlobalStore.getTicketId();
    const data = await addProducts(Array.from(tags), ticketId);
    if (!data) {
      // show error in ui
      console.log("Error when adding products");
      return;
    }

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
  overviewUIWindow.webContents.send("changeRoute", {
    route: "/home",
    state: {},
  });

  /*
    Here we must distinguish between shopping methods:
    1: Shopping cart (wait till there is no human presence on the sensor & we have weight in the scale, wait 2 secs 
    and start scanning (we must loop check if there is human presence and stop scanning if so)
    2. Shopping basket (same as cart)
    3. By hand (start scanning immediately once we detect human presence)
  */
  console.log("Starting RFID tag scan...");

  const products = await getProductsInCart();
  console.log("added products. Return data:", products);
};

export { handleOrderStart };
