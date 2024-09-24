import { app, BrowserWindow } from "electron";

declare const OVERVIEWUI_WEBPACK_ENTRY: string;
declare const OVERVIEWUI_PRELOAD_WEBPACK_ENTRY: string;
declare const STARTUI_WEBPACK_ENTRY: string;
declare const STARTUI_PRELOAD_WEBPACK_ENTRY: string;

const createWindows = (): void => {
  const mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      preload: OVERVIEWUI_PRELOAD_WEBPACK_ENTRY,
    },
  });

  mainWindow.loadURL(OVERVIEWUI_WEBPACK_ENTRY);

  mainWindow.webContents.openDevTools();

  const secondWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      preload: STARTUI_PRELOAD_WEBPACK_ENTRY,
    },
  });

  secondWindow.loadURL(STARTUI_WEBPACK_ENTRY);

  secondWindow.webContents.openDevTools();
};

app.on("ready", createWindows);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindows();
  }
});
