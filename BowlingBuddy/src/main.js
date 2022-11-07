const {app, BrowserWindow, ipcMain} = require('electron')
const url = require("url");
const path = require("path");
const fs = require("fs");
const REPLY = "-reply";

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

const GETPATH = "GetPath";
ipcMain.on(GETPATH,(event, args) => {
  try{
    event.reply(GETPATH + REPLY, {content:app.getPath(args), error: false});
  }
  catch(error){
    event.reply(GETPATH + REPLY, {error: true, errorMessage:error});
  }
});

const GETALLFILES = "GetAllFiles";
ipcMain.on(GETALLFILES, (event, args) => {
  fs.readdir(args, (error, files) => {
    if(error){
      event.reply(GETALLFILES + REPLY, {errorMessage:error, error: true});
      return;
    }
    event.reply(GETALLFILES + REPLY, {content: files, error:false, errorMessage: null});
  });
});

const READFILE = "ReadFile";
ipcMain.on(READFILE, (event, args) => {
  if (!fs.existsSync(args)) {
    event.reply(READFILE + REPLY, {error: true, errorMessage: "File Not Found."});
    return;
  }

  var data  = fs.readFileSync(args, 'utf8');
  event.reply(READFILE + REPLY, {content: data, error: false, errorMessage: null});
});

const SAVEFILE = "SaveFile";
ipcMain.on(SAVEFILE, (event, args) => {
  var folderPath = args[0];
  var pathToFile = folderPath + "\\" + args[1];
  var data = args[2];

  try{
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }
  
    fs.writeFileSync(pathToFile, data+"\n");
    event.reply(SAVEFILE + REPLY, {error: false, errorMessage: null});
  }
  catch (error) {
    console.error('ERROR', error);
    event.reply(SAVEFILE + REPLY, {error: true, errorMessage: error});
  }
});

const FILEEXISTS = "FileExists";
ipcMain.on(FILEEXISTS, (event, path) => {
  event.reply(MOVEFILE + REPLY, {content: fs.existsSync(path)});
});

const MOVEFILE = "MoveFile";
ipcMain.on(MOVEFILE, (event, args) => {
  var sourceFolderPath = args[0];
  var destFolderPath = args[1];
  var sourcePathToFile = sourceFolderPath + "\\" + args[2];
  var destPathToFile = destFolderPath + "\\" + args[3];

  try{
    if (!fs.existsSync(destPathToFile)) {
      fs.mkdirSync(destFolderPath, { recursive: true });
    }
  
    let errorOccurred = false;
    fs.rename(sourcePathToFile, destPathToFile, (error) => {
      errorOccurred = true;
      event.reply(MOVEFILE + REPLY, {error: true, errorMessage: error});
    });

    if(errorOccurred){
      return;
    }
    event.reply(MOVEFILE + REPLY, {content: "", error: false, errorMessage: null});
  }
  catch (error) {
    console.error('ERROR', error);
    event.reply(MOVEFILE + REPLY, {error: true, errorMessage: error});
  }
});