const { app, BrowserWindow } = require("electron");
const os = require("os");

const path = require("path");

const createWindwo = () => {
  // create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.loadFile(path.join(__dirname, "index.html"));

  mainWindow.webContents.openDevTools();

  const totalmem = (os.totalmem() / 1024 / 1024 / 1024).toFixed(3);
  // console.log(totalmem);

  let memuses = Array(10).fill("");
  // setInterval(() => {
  const freeMem = (os.freemem() / 1024 / 1024 / 1024).toFixed(3);
  memuses.unshift((totalmem - freeMem).toFixed(3));
  memuses.pop();
  mainWindow.webContents.send("memuses", (totalmem - freeMem).toFixed(3));
  mainWindow.webContents.send("freeMem", freeMem);
  // if (memuses.length >= 5) console.log(memuses);
  // }, 1000);
};

app.on("ready", createWindwo);
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindwo();
  }
});
