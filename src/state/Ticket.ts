import { BrowserWindow } from "electron";
import { changeAdditionalProductQuantity } from "../api/endpoints/changeAdditionalProductQuantity";
import { getTicketInvoice } from "../api/endpoints/getTicketInvoice";
import { getAdditionalProducts } from "../api/endpoints/getAdditionalProducts";
import { addProducts } from "../api/endpoints/addProducts";
import Global from "./Global";

class Ticket {
  private static instance: Ticket;
  private ticketId: string | null = null;
  private additionalProducts: Array<any> | null = null;
  private products: Array<any> | null = null;
  private categories: Array<any> | null = null;

  public static getInstance(): Ticket {
    if (!Ticket.instance) {
      Ticket.instance = new Ticket();
    }
    return Ticket.instance;
  }

  /**
   * Gets the ticket ID for the ticket state.
   * @returns {string | null} The ticket ID.
   */
  public getTicketId(): string | null {
    return this.ticketId;
  }

  /**
   * Sets the ticket ID for the ticket state.
   * @param {string} ticketId - The ticket ID to set.
   * @returns {void}
   */
  public setTicketId(ticketId: string): void {
    this.ticketId = ticketId;
  }

  /**
   * Sends an error toast message to the overview window.
   * @param {string} message - The error message to display.
   */
  private sendErrorToast(message: string): void {
    const overviewWindow = Global.getWindow("overview");
    if (!overviewWindow) return;

    overviewWindow?.webContents.send("showToastMessage", {
      type: "error",
      message,
    });
  }

  /**
   * Sends an update to the overview window.
   * @param {string} event - The event to send.
   * @param {any} data - The data to send.
   * @returns {void}
   */
  private sendUpdate(event: string, data: any): void {
    const overviewWindow = Global.getWindow("overview");
    if (!overviewWindow) return;

    overviewWindow?.webContents.send(event, data);
  }

  /**
   * Refreshes the ticket invoice data in the overview UI.
   * Fetches the latest ticket invoice information and sends it to the front-end.
   */
  async refreshInvoice(): Promise<void> {
    if (!this.ticketId) return this.sendErrorToast("No ticket ID available.");

    try {
      const data = await getTicketInvoice(this.ticketId);
      if (!data) {
        this.sendErrorToast("Failed to refresh invoice. Contact support.");

        return;
      }

      this.sendUpdate("ticketInvoiceChanged", data);
    } catch (error: any) {
      console.error("Error refreshing invoice:", error.message);
      this.sendErrorToast("Failed to refresh invoice. Contact support.");
    }
  }

  /**
   * Handles the change in quantity of an additional product.
   * Updates the backend, then refreshes the UI with the new data.
   * @param {string} productId The ID of the product to change.
   * @param {number} quantity The new quantity of the product.
   */
  async changeAdditionalProductQuantity(
    productId: string,
    quantity: number
  ): Promise<void> {
    if (!this.ticketId) return this.sendErrorToast("No ticket ID available.");

    try {
      const data = await changeAdditionalProductQuantity(
        productId,
        quantity,
        this.ticketId
      );
      if (!data) {
        this.sendErrorToast(
          "Failed to change additional product quantity. Contact support."
        );

        return;
      }

      this.sendUpdate("additionalProductsChanged", data);
      await this.refreshInvoice();
    } catch (error: any) {
      console.error("Error changing product quantity:", error.message);
      this.sendErrorToast(
        "Failed to change additional product quantity. Contact support."
      );
    }
  }

  /*
   * Retrieves the additional products associated with the current ticket.
   * @returns {Promise<any>} The additional products data.
   */
  async fetchAdditionalProducts(): Promise<Array<any> | null> {
    if (!this.ticketId) {
      this.sendErrorToast("No ticket ID available.");
      return null;
    }

    if (this.additionalProducts) return this.additionalProducts;

    try {
      const data = await getAdditionalProducts(this.ticketId);
      if (!data) {
        this.sendErrorToast(
          "Failed to fetch additional products. Contact support."
        );
        return null;
      }

      this.additionalProducts = data;
      return data;
    } catch (error: any) {
      console.error("Error fetching additional products:", error.message);
      this.sendErrorToast(
        "Failed to fetch additional products. Contact support."
      );
      return null;
    }
  }

  public getProducts(): Array<any> {
    return this.products;
  }

  public setProducts(products: Array<any>): void {
    this.products = products;
    this.sendUpdate("setProducts", this.products);
  }

  public getCategories(): Array<any> {
    return this.categories;
  }

  public setCategories(categories: Array<any>): void {
    this.categories = categories;
    this.sendUpdate("setCategories", this.categories);
  }

  async addProducts(tags: Array<string>): Promise<void> {
    try {
      const data = await addProducts(tags, this.ticketId);
      if (!data) {
        this.sendErrorToast("Failed to add products. Contact support.");
        return;
      }

      this.setProducts(data.products);
      this.setCategories(data.categories);
      this.refreshInvoice();
    } catch (error: any) {
      console.error("Error adding products:", error.message);
      this.sendErrorToast("Failed to add products. Contact support.");
    }
  }
}

export default Ticket.getInstance();
