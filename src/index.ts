import { app, BrowserWindow, ipcMain } from "electron";
import registerStartUIListeners from "./controllers/startController";

declare const OVERVIEWUI_WEBPACK_ENTRY: string;
declare const OVERVIEWUI_PRELOAD_WEBPACK_ENTRY: string;
declare const STARTUI_WEBPACK_ENTRY: string;
declare const STARTUI_PRELOAD_WEBPACK_ENTRY: string;

const windowConfig = {
  resizable: false,
  frame: false,
  //fullscreen: true,
};

const createWindows = (): void => {
  const overviewWindow = new BrowserWindow({
    height: 480,
    width: 800,
    webPreferences: {
      preload: OVERVIEWUI_PRELOAD_WEBPACK_ENTRY,
    },
    ...windowConfig,
  });

  overviewWindow.loadURL(OVERVIEWUI_WEBPACK_ENTRY);

  overviewWindow.webContents.openDevTools();

  const startWindow = new BrowserWindow({
    height: 480,
    width: 800,
    webPreferences: {
      preload: STARTUI_PRELOAD_WEBPACK_ENTRY,
    },
    ...windowConfig,
  });

  startWindow.loadURL(STARTUI_WEBPACK_ENTRY);

  startWindow.webContents.openDevTools();
};

app.on("ready", () => {
  registerStartUIListeners(ipcMain);
  
  createWindows();
});

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
