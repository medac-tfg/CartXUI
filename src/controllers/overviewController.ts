const handleOrderStart = (overviewUIWindow: Electron.BrowserWindow) => {
  overviewUIWindow.webContents.send("orderStarted");

  // Aquí empezamos con el escaneo
};

export { handleOrderStart };
