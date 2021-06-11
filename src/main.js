const { app, BrowserWindow } = require("electron");
// const { Notification } = require("electron");

//Notification

const NOTIFICATION_TITLE = "Basic Notification";
const NOTIFICATION_BODY = "Notification from the Main process";

// function showNotification() {
//   new Notification({
//     title: NOTIFICATION_TITLE,
//     body: NOTIFICATION_BODY,
//   }).show();
// }

let progressInterval;

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
  });

  win.loadFile(__dirname + "/index.html");

  const INCREMENT = 0.4;
  const INTERVAL_DELAY = 10000; // ms

  let c = 0;
  progressInterval = setInterval(() => {
    // update progress bar to next value
    // values between 0 and 1 will show progress, >1 will show indeterminate or stick at 100%
    win.setProgressBar(c);

    // increment or reset progress bar
    if (c < 2) c += INCREMENT;
    else c = 0;
  }, INTERVAL_DELAY);
}

app.whenReady().then(createWindow);

// before the app is terminated, clear both timers
app.on("before-quit", () => {
  clearInterval(progressInterval);
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
