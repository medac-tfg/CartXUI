import { BrowserWindow } from "electron";

class Windows {
  private static instance: Windows;
  private windows: { [key: string]: BrowserWindow } = {};

  public static getInstance(): Windows {
    if (!Windows.instance) {
      Windows.instance = new Windows();
    }
    return Windows.instance;
  }

  public getWindow(type: string): BrowserWindow {
    return this.windows[type];
  }

  public setWindow(type: string, window: BrowserWindow): void {
    this.windows[type] = window;
  }

  public sendErrorToastToWindow(type: string, message: string): void {
    this.windows[type]?.webContents.send("showToastMessage", {
      type: "error",
      message,
    });
  }
}

export default Windows.getInstance();
