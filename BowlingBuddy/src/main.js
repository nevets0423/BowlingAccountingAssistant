const {app, BrowserWindow, ipcMain} = require('electron')
const url = require("url");
const path = require("path");
const fs = require("fs");

let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({
    show: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation : false
    }
  });
  mainWindow.maximize();
  mainWindow.show();
  
  mainWindow.loadURL(
    path.resolve(
        path.join(__dirname, `../dist/bowling-buddy/index.html`)
    )
  );
  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  mainWindow.on('closed', function () {
    mainWindow = null
  })
};

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
});

app.on('activate', function () {
  if (mainWindow === null) createWindow()
});

ipcMain.on("GetPath",(event, args) => {
  try{
    event.reply("GetPath-reply", {path:app.getPath(args), error: false});
  }
  catch(error){
    event.reply("GetPath-reply", {error: true, errorMessage:error});
  }
});

ipcMain.on("GetAllFiles", (event, args) => {
  fs.readdir(args, (error, files) => {
    if(error){
      event.reply("GetAllFiles-reply", {errorMessage:error, error: true});
      return;
    }
    event.reply("GetAllFiles-reply", {files: files, error:false, errorMessage: null});
  });
});

ipcMain.on("ReadFile", (event, args) => {
  if (!fs.existsSync(args)) {
    event.reply("ReadFile-reply", {error: true, errorMessage: "File Not Found."});
    return;
  }

  var data  = fs.readFileSync(args, 'utf8');
  event.reply("ReadFile-reply", {fileContent: data, error: false, errorMessage: null});
});

ipcMain.on("SaveFile", (event, args) => {
  var folderPath = args[0];
  var pathToFile = folderPath + "\\" + args[1];
  var data = args[2];

  try{
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }
  
    fs.writeFileSync(pathToFile, data+"\n");
    event.reply("SaveFile-reply", {error: false, errorMessage: null});
  }
  catch (error) {
    console.error('ERROR', error);
    event.reply("SaveFile-reply", {error: true, errorMessage: error});
  }
});