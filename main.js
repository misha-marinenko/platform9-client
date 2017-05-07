const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow
const remote = require('electron').remote;
const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 1024, height: 720, titleBarStyle: 'hidden-inset', frame: false})
  
  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})
// When work makes progress, show the progress bar
function onProgress (progess) {
  // Use values 0 to 1, or -1 to hide the progress bar
  win.setProgressBar(progress || -1) // Progress bar works on all platforms
}

// When work completes while the app is in the background, show a badge
var numDoneInBackground = 0
function onDone () {
  var dock = electron.app.dock // Badge works only on Mac
  if (!dock || win.isFocused()) return
  numDoneInBackground++
  dock.setBadge('' + numDoneInBackground)
}

// Subscribe to the window focus event. When that happens, hide the badge
function onFocus () {
  numDoneInBackground = 0
  dock.setBadge('')
}
// In the main process, check whether the app is starting
// because the user dragged files onto the app icon
process.argv.forEach(onOpen)

// Open handlers should be added on the first tick.
// These fire if the app is already running and the user
// drags files or URLs onto the dock icon, or if they set
// the app as a handler for a file type and then open a file
app.on('open-file', onOpen)
app.on('open-url', onOpen)
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

