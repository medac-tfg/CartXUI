class GlobalStore {
  private static instance: GlobalStore;
  private ticketId: string | null = null;

  public static getInstance(): GlobalStore {
    if (!GlobalStore.instance) {
      GlobalStore.instance = new GlobalStore();
    }
    return GlobalStore.instance;
  }

  public setTicketId(ticketId: string): void {
    this.ticketId = ticketId;
  }

  public getTicketId(): string | null {
    return this.ticketId;
  }
}

export default GlobalStore.getInstance();
