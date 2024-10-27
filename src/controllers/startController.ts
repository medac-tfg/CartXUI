const registerStartUIListeners = (ipcMain: Electron.IpcMain): void => {
  ipcMain.on("shoppingMethodSelected", (_event, startShop) => {
    console.log("shoppingMethodSelected", startShop);
  });
};

export default registerStartUIListeners;