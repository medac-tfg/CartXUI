import dotenv from "dotenv";
dotenv.config();

import { app, BrowserWindow, session } from "electron";
import { registerStartUIListeners } from "./controllers/startController";
import { registerOverviewUIListeners } from "./controllers/overviewController";
import { modifyCSP } from "./utils/modifyCSP";

declare const OVERVIEWUI_WEBPACK_ENTRY: string;
declare const OVERVIEWUI_PRELOAD_WEBPACK_ENTRY: string;
declare const STARTUI_WEBPACK_ENTRY: string;
declare const STARTUI_PRELOAD_WEBPACK_ENTRY: string;

const windowConfig = {
  resizable: false,
  frame: false,
  height: 600,
  width: 1024,
  //fullscreen: true,
};

const createWindows = (): {
  overviewWindow: BrowserWindow;
  startWindow: BrowserWindow;
} => {
  const overviewWindow = new BrowserWindow({
    webPreferences: {
      preload: OVERVIEWUI_PRELOAD_WEBPACK_ENTRY,
    },
    ...windowConfig,
  });

  overviewWindow.loadURL(OVERVIEWUI_WEBPACK_ENTRY);

  //overviewWindow.webContents.openDevTools();

  const startWindow = new BrowserWindow({
    webPreferences: {
      preload: STARTUI_PRELOAD_WEBPACK_ENTRY,
    },
    ...windowConfig,
  });

  startWindow.loadURL(STARTUI_WEBPACK_ENTRY);

  //startWindow.webContents.openDevTools();

  return { overviewWindow, startWindow };
};

app.on("ready", () => {
  const { overviewWindow, startWindow } = createWindows();

  registerStartUIListeners(startWindow);
  registerOverviewUIListeners(overviewWindow);

  modifyCSP(session.defaultSession);
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
