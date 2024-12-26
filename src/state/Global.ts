import { BrowserWindow } from "electron";

class Global {
  private static instance: Global;
  private windows: { [key: string]: BrowserWindow } = {};

  public static getInstance(): Global {
    if (!Global.instance) {
      Global.instance = new Global();
    }
    return Global.instance;
  }

  public getWindow(type: string): BrowserWindow {
    return this.windows[type];
  }

  public setWindow(type: string, window: BrowserWindow): void {
    this.windows[type] = window;
  }
}

export default Global.getInstance();
