const { app, BrowserWindow, Menu } = require("electron");
let win;
function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
  });

  win.loadURL(`http://localhost:4200/login`);

  //win.loadFile('index.html');

  //win.loadURL(`http://localhost:8080`);

  win.on("close", () => {
    win = null;
  });
  var menu = Menu.buildFromTemplate([
    {
      label: "",
    },
  ]);
  Menu.setApplicationMenu(menu);
}
app.on("ready", createWindow);
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
app.on("activate", () => {
  if (win === null) {
    createWindow();
  }
});
